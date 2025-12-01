/**
 * 庆祝系统 tRPC Router
 * v2.0 核心功能：庆祝方式管理、记录庆祝、闪电庆祝
 */

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  CELEBRATION_METHODS,
  getCelebrationsByCategory,
  type CelebrationCategory,
} from "@/lib/celebration/methods";

// 庆祝分类枚举
const celebrationCategoryEnum = z.enum([
  "VERBAL",
  "PHYSICAL",
  "MENTAL",
  "SENSORY",
]);

export const celebrationRouter = createTRPCRouter({
  // ============ 庆祝方式库 ============

  /**
   * 获取所有庆祝方式（静态数据）
   * 公开接口，无需登录
   */
  getMethods: publicProcedure
    .input(
      z.object({
        category: celebrationCategoryEnum.optional(),
      }),
    )
    .query(({ input }) => {
      if (input.category) {
        return getCelebrationsByCategory(input.category as CelebrationCategory);
      }
      return CELEBRATION_METHODS;
    }),

  /**
   * 获取数据库中的庆祝方式（用于关联ID）
   * 如果数据库为空，先初始化
   */
  getDbMethods: protectedProcedure
    .input(
      z.object({
        category: celebrationCategoryEnum.optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // 检查是否已初始化
      const count = await ctx.db.celebrationMethod.count();

      // 如果数据库为空，初始化庆祝方式
      if (count === 0) {
        await ctx.db.celebrationMethod.createMany({
          data: CELEBRATION_METHODS.map((m) => ({
            category: m.category,
            content: m.content,
            emoji: m.emoji,
            isBuiltIn: true,
          })),
        });
      }

      return ctx.db.celebrationMethod.findMany({
        where: input.category ? { category: input.category } : undefined,
        orderBy: { category: "asc" },
      });
    }),

  // ============ 用户收藏管理 ============

  /**
   * 获取用户收藏的庆祝方式
   */
  getUserFavorites: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.userCelebration.findMany({
      where: { userId: ctx.session.user.id },
      include: { celebrationMethod: true },
      orderBy: [{ isDefault: "desc" }, { useCount: "desc" }],
    });
  }),

  /**
   * 添加收藏
   */
  addFavorite: protectedProcedure
    .input(z.object({ methodId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userCelebration.create({
        data: {
          userId: ctx.session.user.id,
          celebrationMethodId: input.methodId,
        },
        include: { celebrationMethod: true },
      });
    }),

  /**
   * 移除收藏
   */
  removeFavorite: protectedProcedure
    .input(z.object({ methodId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userCelebration.delete({
        where: {
          userId_celebrationMethodId: {
            userId: ctx.session.user.id,
            celebrationMethodId: input.methodId,
          },
        },
      });
    }),

  /**
   * 设置默认庆祝方式
   */
  setDefault: protectedProcedure
    .input(z.object({ methodId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // 先清除现有默认
      await ctx.db.userCelebration.updateMany({
        where: { userId: ctx.session.user.id, isDefault: true },
        data: { isDefault: false },
      });

      // 设置新默认（如果不存在则创建）
      return ctx.db.userCelebration.upsert({
        where: {
          userId_celebrationMethodId: {
            userId: ctx.session.user.id,
            celebrationMethodId: input.methodId,
          },
        },
        update: { isDefault: true },
        create: {
          userId: ctx.session.user.id,
          celebrationMethodId: input.methodId,
          isDefault: true,
        },
        include: { celebrationMethod: true },
      });
    }),

  /**
   * 获取用户默认庆祝方式
   */
  getDefaultMethod: protectedProcedure.query(async ({ ctx }) => {
    const favorite = await ctx.db.userCelebration.findFirst({
      where: { userId: ctx.session.user.id, isDefault: true },
      include: { celebrationMethod: true },
    });
    return favorite?.celebrationMethod ?? null;
  }),

  // ============ 记录庆祝 ============

  /**
   * 记录打卡庆祝
   * 在用户打卡后调用，更新 HabitLog 的庆祝字段
   */
  recordCelebration: protectedProcedure
    .input(
      z.object({
        logId: z.string(),
        methodId: z.string().optional(),
        shineScore: z.number().min(1).max(5),
        note: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 验证 log 属于当前用户
      const log = await ctx.db.habitLog.findUnique({
        where: { id: input.logId },
      });

      if (!log || log.userId !== ctx.session.user.id) {
        throw new Error("打卡记录不存在或无权限");
      }

      // 更新打卡记录的庆祝字段
      const updatedLog = await ctx.db.habitLog.update({
        where: { id: input.logId },
        data: {
          celebratedAt: new Date(),
          celebrationMethodId: input.methodId,
          shineScore: input.shineScore,
          celebrationNote: input.note,
        },
      });

      // 如果指定了庆祝方式，增加使用次数
      if (input.methodId) {
        await ctx.db.userCelebration.upsert({
          where: {
            userId_celebrationMethodId: {
              userId: ctx.session.user.id,
              celebrationMethodId: input.methodId,
            },
          },
          update: { useCount: { increment: 1 } },
          create: {
            userId: ctx.session.user.id,
            celebrationMethodId: input.methodId,
            useCount: 1,
          },
        });
      }

      return updatedLog;
    }),

  /**
   * 跳过庆祝（仅记录跳过）
   */
  skipCelebration: protectedProcedure
    .input(z.object({ logId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // 验证 log 属于当前用户
      const log = await ctx.db.habitLog.findUnique({
        where: { id: input.logId },
      });

      if (!log || log.userId !== ctx.session.user.id) {
        throw new Error("打卡记录不存在或无权限");
      }

      // 仅设置 celebratedAt 为 null，表示跳过
      return ctx.db.habitLog.update({
        where: { id: input.logId },
        data: {
          celebratedAt: null,
          celebrationMethodId: null,
          shineScore: null,
          celebrationNote: null,
        },
      });
    }),

  // ============ 闪电庆祝（P2功能） ============

  /**
   * 创建闪电庆祝
   * 随时为任何良好行为庆祝，不需要关联习惯
   */
  createFlashCelebration: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(200),
        methodId: z.string().optional(),
        shineScore: z.number().min(1).max(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.flashCelebration.create({
        data: {
          userId: ctx.session.user.id,
          content: input.content,
          celebrationMethodId: input.methodId,
          shineScore: input.shineScore,
        },
      });
    }),

  /**
   * 获取闪电庆祝历史
   */
  getFlashCelebrations: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.flashCelebration.findMany({
        where: { userId: ctx.session.user.id },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return { items, nextCursor };
    }),

  // ============ 个性化推荐 ============

  /**
   * 获取个性化推荐的庆祝方式
   * 基于用户使用历史和发光感评分推荐
   */
  getRecommendedMethods: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // 获取用户最常用的庆祝分类
    const userHistory = await ctx.db.userCelebration.findMany({
      where: { userId },
      include: { celebrationMethod: true },
      orderBy: { useCount: "desc" },
    });

    // 获取用户偏好的分类
    const categoryCount: Record<string, number> = {};
    for (const item of userHistory) {
      const cat = item.celebrationMethod.category;
      categoryCount[cat] = (categoryCount[cat] ?? 0) + item.useCount;
    }

    // 排序找出偏好分类
    const preferredCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat);

    // 推荐列表：优先高发光感 + 偏好分类 + 默认推荐
    const recommendations: Array<{
      method: (typeof CELEBRATION_METHODS)[number];
      reason: string;
      score: number;
    }> = [];

    for (const method of CELEBRATION_METHODS) {
      let score = 0;
      let reason = "";

      // 检查是否在用户收藏中
      const userFav = userHistory.find(
        (h) => h.celebrationMethod.content === method.content,
      );

      if (userFav) {
        score += userFav.useCount * 2;
        reason = "常用方式";
      }

      // 检查分类偏好
      const categoryRank = preferredCategories.indexOf(method.category);
      if (categoryRank !== -1) {
        score += (4 - categoryRank) * 3;
        if (!reason) reason = "符合你的风格";
      }

      // 检查是否带来高发光感（需要有methodId匹配）
      // 由于静态数据没有ID，这里使用分类匹配
      if (preferredCategories[0] === method.category) {
        score += 5;
        if (!reason) reason = "高发光感分类";
      }

      if (score > 0 || !reason) {
        recommendations.push({
          method,
          reason: reason || "推荐尝试",
          score,
        });
      }
    }

    // 按分数排序，取前8个
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ method, reason }) => ({ ...method, reason }));
  }),

  // ============ 统计分析 ============

  /**
   * 获取庆祝统计
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // 总庆祝次数（有发光感评分的打卡）
    const totalCelebrations = await ctx.db.habitLog.count({
      where: { userId, shineScore: { not: null } },
    });

    // 平均发光感
    const avgShineResult = await ctx.db.habitLog.aggregate({
      where: { userId, shineScore: { not: null } },
      _avg: { shineScore: true },
    });

    // 最常用的庆祝方式
    const topMethods = await ctx.db.userCelebration.findMany({
      where: { userId },
      orderBy: { useCount: "desc" },
      take: 5,
      include: { celebrationMethod: true },
    });

    // 庆祝率（有庆祝的打卡 / 总打卡）
    const totalLogs = await ctx.db.habitLog.count({
      where: { userId, completed: true },
    });

    const celebrationRate =
      totalLogs > 0 ? (totalCelebrations / totalLogs) * 100 : 0;

    // 闪电庆祝次数
    const flashCount = await ctx.db.flashCelebration.count({
      where: { userId },
    });

    return {
      totalCelebrations,
      avgShineScore: avgShineResult._avg.shineScore ?? 0,
      celebrationRate: Math.round(celebrationRate),
      topMethods: topMethods.map((m) => ({
        method: m.celebrationMethod,
        useCount: m.useCount,
      })),
      flashCount,
    };
  }),

  /**
   * 获取发光感趋势（最近30天）
   */
  getShineTrend: protectedProcedure.query(async ({ ctx }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await ctx.db.habitLog.findMany({
      where: {
        userId: ctx.session.user.id,
        shineScore: { not: null },
        loggedAt: { gte: thirtyDaysAgo },
      },
      select: {
        loggedAt: true,
        shineScore: true,
      },
      orderBy: { loggedAt: "asc" },
    });

    // 按日期分组计算平均发光感
    const dailyAvg: Record<string, { total: number; count: number }> = {};
    for (const log of logs) {
      const dateKey = log.loggedAt.toISOString().split("T")[0]!;
      dailyAvg[dateKey] ??= { total: 0, count: 0 };
      dailyAvg[dateKey].total += log.shineScore!;
      dailyAvg[dateKey].count += 1;
    }

    return Object.entries(dailyAvg).map(([date, { total, count }]) => ({
      date,
      avgShineScore: Math.round((total / count) * 10) / 10,
    }));
  }),
});
