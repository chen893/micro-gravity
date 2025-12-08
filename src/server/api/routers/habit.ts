/**
 * 习惯管理 tRPC 路由
 * 提供习惯的 CRUD 操作
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// 习惯创建输入 schema
const createHabitInput = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["BUILD", "BREAK"]),
  description: z.string().optional(),
  category: z.string().max(50).optional(),
  anchor: z.string().optional(),
  behavior: z.string().optional(),
  celebration: z.string().optional(),
  aspirationId: z.string().optional(),
});

// 习惯更新输入 schema
const updateHabitInput = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  category: z.string().max(50).optional(),
  anchor: z.string().optional(),
  behavior: z.string().optional(),
  celebration: z.string().optional(),
  status: z.enum(["ACTIVE", "PAUSED", "GRADUATED", "ARCHIVED"]).optional(),
  currentPhase: z.number().min(1).optional(),
});

export const habitRouter = createTRPCRouter({
  /**
   * 创建新习惯
   */
  create: protectedProcedure
    .input(createHabitInput)
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          type: input.type,
          description: input.description,
          category: input.category,
          anchor: input.anchor,
          behavior: input.behavior,
          celebration: input.celebration,
          aspirationId: input.aspirationId,
        },
      });

      return habit;
    }),

  /**
   * 获取单个习惯详情
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          _count: {
            select: {
              logs: true,
            },
          },
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return habit;
    }),

  /**
   * 获取用户所有习惯列表
   */
  list: protectedProcedure
    .input(
      z
        .object({
          status: z
            .enum(["ACTIVE", "PAUSED", "GRADUATED", "ARCHIVED"])
            .optional(),
          type: z.enum(["BUILD", "BREAK"]).optional(),
          category: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const habits = await ctx.db.habit.findMany({
        where: {
          userId: ctx.session.user.id,
          ...(input?.status && { status: input.status }),
          ...(input?.type && { type: input.type }),
          ...(input?.category && { category: input.category }),
        },
        include: {
          _count: {
            select: {
              logs: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return habits;
    }),

  /**
   * 获取活跃习惯列表（快捷方法）
   */
  getActive: protectedProcedure.query(async ({ ctx }) => {
    const habits = await ctx.db.habit.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "ACTIVE",
      },
      include: {
        logs: {
          where: {
            loggedAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
          take: 1,
        },
        _count: {
          select: {
            logs: {
              where: { completed: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return habits.map((habit) => ({
      ...habit,
      todayCompleted: habit.logs.length > 0 && habit.logs[0]?.completed,
      totalCompletedDays: habit._count.logs,
    }));
  }),

  /**
   * 更新习惯
   */
  update: protectedProcedure
    .input(updateHabitInput)
    .mutation(async ({ ctx, input }) => {
      const existingHabit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!existingHabit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const updateData: Record<string, unknown> = {};

      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined)
        updateData.description = input.description;
      if (input.category !== undefined) updateData.category = input.category;
      if (input.anchor !== undefined) updateData.anchor = input.anchor;
      if (input.behavior !== undefined) updateData.behavior = input.behavior;
      if (input.celebration !== undefined)
        updateData.celebration = input.celebration;
      if (input.status !== undefined) updateData.status = input.status;
      if (input.currentPhase !== undefined)
        updateData.currentPhase = input.currentPhase;

      const habit = await ctx.db.habit.update({
        where: { id: input.id },
        data: updateData,
      });

      return habit;
    }),

  /**
   * 更新习惯阶段
   */
  updatePhase: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentPhase: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return ctx.db.habit.update({
        where: { id: input.id },
        data: { currentPhase: input.currentPhase },
      });
    }),

  /**
   * 暂停习惯
   */
  pause: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return ctx.db.habit.update({
        where: { id: input.id },
        data: { status: "PAUSED" },
      });
    }),

  /**
   * 恢复习惯
   */
  resume: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return ctx.db.habit.update({
        where: { id: input.id },
        data: { status: "ACTIVE" },
      });
    }),

  /**
   * 标记习惯毕业
   */
  graduate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return ctx.db.habit.update({
        where: { id: input.id },
        data: { status: "GRADUATED" },
      });
    }),

  /**
   * 归档习惯
   */
  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      return ctx.db.habit.update({
        where: { id: input.id },
        data: { status: "ARCHIVED" },
      });
    }),

  /**
   * 删除习惯
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      await ctx.db.habit.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * 获取习惯统计数据
   */
  getStats: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const logs = await ctx.db.habitLog.findMany({
        where: { habitId: input.id },
        orderBy: { loggedAt: "desc" },
      });

      const completedLogs = logs.filter((log) => log.completed);
      const totalDays = logs.length;
      const completedDays = completedLogs.length;

      // 计算当前连续天数
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const log of logs) {
        const logDate = new Date(log.loggedAt);
        logDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
          (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffDays === currentStreak && log.completed) {
          currentStreak++;
        } else if (diffDays > currentStreak) {
          break;
        }
      }

      // 计算最长连续天数
      let longestStreak = 0;
      let tempStreak = 0;
      let lastDate: Date | null = null;

      for (const log of completedLogs.reverse()) {
        const logDate = new Date(log.loggedAt);
        logDate.setHours(0, 0, 0, 0);

        if (lastDate) {
          const diffDays = Math.floor(
            (lastDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diffDays === 1) {
            tempStreak++;
          } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        } else {
          tempStreak = 1;
        }
        lastDate = logDate;
      }
      longestStreak = Math.max(longestStreak, tempStreak);

      // 计算最近 7 天完成率
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentLogs = logs.filter((log) => {
        const logDate = new Date(log.loggedAt);
        return logDate >= sevenDaysAgo;
      });
      const recentCompleted = recentLogs.filter((log) => log.completed).length;
      const recentRate =
        recentLogs.length > 0
          ? Math.round((recentCompleted / recentLogs.length) * 100)
          : 0;

      return {
        totalDays,
        completedDays,
        currentStreak,
        longestStreak,
        recentRate,
        completionRate:
          totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
      };
    }),

  /**
   * 检查是否可以进阶
   */
  checkAdvance: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 获取最近的打卡记录
      const recentLogs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.id,
          completed: true,
        },
        orderBy: { loggedAt: "desc" },
        take: 14,
      });

      // 进阶条件：连续7天 + 多次超额完成 + 多次觉得轻松
      const exceededCount = recentLogs.filter(
        (log) => log.completionLevel === "EXCEEDED",
      ).length;
      const feltEasyCount = recentLogs.filter((log) => log.feltEasy).length;
      const wantedMoreCount = recentLogs.filter((log) => log.wantedMore).length;

      const canAdvance =
        recentLogs.length >= 7 &&
        (exceededCount >= 3 || (feltEasyCount >= 5 && wantedMoreCount >= 3));

      return {
        canAdvance,
        exceededCount,
        feltEasyCount,
        wantedMoreCount,
        currentPhase: habit.currentPhase,
      };
    }),
});
