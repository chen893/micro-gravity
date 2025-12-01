/**
 * 成就徽章系统 tRPC 路由
 * 提供徽章查询、解锁检测等功能
 */

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  BADGE_DEFINITIONS,
  BADGE_CATEGORIES,
  getBadgesByCategory,
} from "@/lib/achievement/badges";
import { checkBadgeUnlocks, type UnlockResult } from "@/lib/achievement/engine";

export const badgeRouter = createTRPCRouter({
  /**
   * 获取所有徽章定义（包含用户获取状态）
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // 获取用户已解锁的徽章
    const userBadges = await ctx.db.userBadge.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        badge: true,
      },
    });

    const unlockedCodes = new Set(userBadges.map((ub) => ub.badge.code));

    // 构建带状态的徽章列表
    const badges = BADGE_DEFINITIONS.map((def) => {
      const userBadge = userBadges.find((ub) => ub.badge.code === def.code);
      return {
        ...def,
        isUnlocked: unlockedCodes.has(def.code),
        unlockedAt: userBadge?.unlockedAt,
        habitId: userBadge?.habitId,
      };
    });

    return {
      badges,
      totalCount: BADGE_DEFINITIONS.length,
      unlockedCount: unlockedCodes.size,
    };
  }),

  /**
   * 按分类获取徽章
   */
  getByCategory: protectedProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const definitions = getBadgesByCategory(input.category);

      // 获取用户已解锁的徽章
      const userBadges = await ctx.db.userBadge.findMany({
        where: { userId: ctx.session.user.id },
        include: { badge: true },
      });

      const unlockedCodes = new Set(userBadges.map((ub) => ub.badge.code));

      return definitions.map((def) => {
        const userBadge = userBadges.find((ub) => ub.badge.code === def.code);
        return {
          ...def,
          isUnlocked: unlockedCodes.has(def.code),
          unlockedAt: userBadge?.unlockedAt,
        };
      });
    }),

  /**
   * 获取用户已解锁的徽章
   */
  getUserBadges: protectedProcedure.query(async ({ ctx }) => {
    const userBadges = await ctx.db.userBadge.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        badge: true,
      },
      orderBy: { unlockedAt: "desc" },
    });

    return userBadges.map((ub) => ({
      id: ub.id,
      code: ub.badge.code,
      name: ub.badge.name,
      description: ub.badge.description,
      icon: ub.badge.icon,
      rarity: ub.badge.rarity,
      category: ub.badge.category,
      unlockedAt: ub.unlockedAt,
      habitId: ub.habitId,
    }));
  }),

  /**
   * 获取最近解锁的徽章
   */
  getRecentUnlocks: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(5) }))
    .query(async ({ ctx, input }) => {
      const userBadges = await ctx.db.userBadge.findMany({
        where: { userId: ctx.session.user.id },
        include: { badge: true },
        orderBy: { unlockedAt: "desc" },
        take: input.limit,
      });

      return userBadges.map((ub) => ({
        code: ub.badge.code,
        name: ub.badge.name,
        icon: ub.badge.icon,
        rarity: ub.badge.rarity,
        unlockedAt: ub.unlockedAt,
      }));
    }),

  /**
   * 获取徽章分类统计
   */
  getCategoryStats: protectedProcedure.query(async ({ ctx }) => {
    const userBadges = await ctx.db.userBadge.findMany({
      where: { userId: ctx.session.user.id },
      include: { badge: true },
    });

    const unlockedCodes = new Set(userBadges.map((ub) => ub.badge.code));

    // 按分类统计
    const stats = Object.entries(BADGE_CATEGORIES).map(([key, label]) => {
      const categoryBadges = getBadgesByCategory(label);
      const unlockedInCategory = categoryBadges.filter((b) =>
        unlockedCodes.has(b.code),
      ).length;

      return {
        key,
        label,
        total: categoryBadges.length,
        unlocked: unlockedInCategory,
        progress:
          categoryBadges.length > 0
            ? (unlockedInCategory / categoryBadges.length) * 100
            : 0,
      };
    });

    return stats;
  }),

  /**
   * 手动触发徽章检测
   * 用于在关键操作后检测新解锁的徽章
   */
  checkUnlocks: protectedProcedure.mutation(
    async ({ ctx }): Promise<UnlockResult[]> => {
      return checkBadgeUnlocks({
        userId: ctx.session.user.id,
        db: ctx.db,
      });
    },
  ),

  /**
   * 获取下一个即将解锁的徽章提示
   */
  getNextBadgeHint: protectedProcedure.query(async ({ ctx }) => {
    // 获取用户已解锁的徽章
    const userBadges = await ctx.db.userBadge.findMany({
      where: { userId: ctx.session.user.id },
      include: { badge: true },
    });
    const unlockedCodes = new Set(userBadges.map((ub) => ub.badge.code));

    // 获取用户统计数据
    const [habitCount, checkinCount, celebrationCount, maxStreak] =
      await Promise.all([
        ctx.db.habit.count({ where: { userId: ctx.session.user.id } }),
        ctx.db.habitLog.count({
          where: { userId: ctx.session.user.id, completed: true },
        }),
        ctx.db.habitLog.count({
          where: { userId: ctx.session.user.id, celebratedAt: { not: null } },
        }),
        // 简化的最大连续天数计算
        ctx.db.habitLog.count({
          where: { userId: ctx.session.user.id, completed: true },
        }),
      ]);

    // 找到最接近解锁的徽章
    const hints: Array<{
      badge: (typeof BADGE_DEFINITIONS)[0];
      progress: number;
      hint: string;
    }> = [];

    for (const badge of BADGE_DEFINITIONS) {
      if (unlockedCodes.has(badge.code)) continue;

      const condition = badge.unlockCondition;
      let progress = 0;
      let hint = "";

      switch (condition.type) {
        case "FIRST_HABIT":
          if (habitCount === 0) {
            progress = 0;
            hint = "创建你的第一个习惯即可解锁";
          }
          break;

        case "FIRST_CHECKIN":
          if (checkinCount === 0) {
            progress = 0;
            hint = "完成第一次打卡即可解锁";
          }
          break;

        case "TOTAL_CELEBRATIONS":
          progress = (celebrationCount / (condition.value ?? 10)) * 100;
          hint = `再庆祝 ${(condition.value ?? 10) - celebrationCount} 次即可解锁`;
          break;

        case "STREAK":
          // 简化处理
          progress = Math.min(100, (maxStreak / (condition.value ?? 7)) * 100);
          hint = `保持连续 ${condition.value ?? 7} 天打卡即可解锁`;
          break;
      }

      if (progress > 0 && progress < 100) {
        hints.push({ badge, progress, hint });
      }
    }

    // 返回进度最高的几个
    return hints
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3)
      .map((h) => ({
        code: h.badge.code,
        name: h.badge.name,
        icon: h.badge.icon,
        progress: Math.round(h.progress),
        hint: h.hint,
      }));
  }),

  /**
   * 初始化系统徽章（管理功能）
   * 将徽章定义写入数据库
   */
  initializeBadges: protectedProcedure.mutation(async ({ ctx }) => {
    let created = 0;

    for (const def of BADGE_DEFINITIONS) {
      const existing = await ctx.db.badge.findUnique({
        where: { code: def.code },
      });

      if (!existing) {
        await ctx.db.badge.create({
          data: {
            code: def.code,
            name: def.name,
            description: def.description,
            icon: def.icon,
            rarity: def.rarity,
            category: def.category,
            // 将 unlockCondition 转为纯 JSON 对象
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            unlockCondition: JSON.parse(JSON.stringify(def.unlockCondition)),
          },
        });
        created++;
      }
    }

    return {
      success: true,
      message: `初始化完成，新增 ${created} 个徽章`,
      total: BADGE_DEFINITIONS.length,
    };
  }),
});
