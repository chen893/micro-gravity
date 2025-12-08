/**
 * 习惯打卡记录 tRPC 路由
 * 提供打卡记录的 CRUD 操作
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// 完成级别枚举（对应 Prisma CompletionLevel）
const completionLevelEnum = z.enum(["MINIMUM", "STANDARD", "EXCEEDED"]);

// 创建打卡记录输入 schema
const createLogInput = z.object({
  habitId: z.string(),
  loggedAt: z.date().optional(), // 默认今天
  completed: z.boolean(),
  completionLevel: completionLevelEnum.optional(),
  actualBehavior: z.string().optional(),
  wantedMore: z.boolean().optional(),
  feltEasy: z.boolean().optional(),
  shineScore: z.number().min(1).max(5).optional(),
  moodBefore: z.number().min(1).max(5).optional(),
  moodAfter: z.number().min(1).max(5).optional(),
  note: z.string().optional(),
});

// 更新打卡记录输入 schema
const updateLogInput = z.object({
  id: z.string(),
  completed: z.boolean().optional(),
  completionLevel: completionLevelEnum.optional(),
  actualBehavior: z.string().optional(),
  wantedMore: z.boolean().optional(),
  feltEasy: z.boolean().optional(),
  shineScore: z.number().min(1).max(5).optional(),
  moodBefore: z.number().min(1).max(5).optional(),
  moodAfter: z.number().min(1).max(5).optional(),
  note: z.string().optional(),
});

export const logRouter = createTRPCRouter({
  /**
   * 创建打卡记录
   */
  create: protectedProcedure
    .input(createLogInput)
    .mutation(async ({ ctx, input }) => {
      // 验证习惯属于当前用户
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 默认使用今天的日期
      const logDate = input.loggedAt ?? new Date();
      logDate.setHours(0, 0, 0, 0);

      // 使用 upsert 防止重复打卡
      const log = await ctx.db.habitLog.upsert({
        where: {
          habitId_loggedAt: {
            habitId: input.habitId,
            loggedAt: logDate,
          },
        },
        update: {
          completed: input.completed,
          completionLevel: input.completionLevel,
          actualBehavior: input.actualBehavior,
          wantedMore: input.wantedMore,
          feltEasy: input.feltEasy,
          shineScore: input.shineScore,
          moodBefore: input.moodBefore,
          moodAfter: input.moodAfter,
          note: input.note,
        },
        create: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
          loggedAt: logDate,
          completed: input.completed,
          completionLevel: input.completionLevel ?? "MINIMUM",
          actualBehavior: input.actualBehavior,
          wantedMore: input.wantedMore ?? false,
          feltEasy: input.feltEasy ?? false,
          shineScore: input.shineScore,
          moodBefore: input.moodBefore,
          moodAfter: input.moodAfter,
          note: input.note,
        },
        include: {
          habit: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      });

      return log;
    }),

  /**
   * 快速打卡（简化版）- 返回庆祝所需数据
   */
  quickLog: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        completed: z.boolean().default(true),
        completionLevel: completionLevelEnum.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 验证习惯属于当前用户
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const log = await ctx.db.habitLog.upsert({
        where: {
          habitId_loggedAt: {
            habitId: input.habitId,
            loggedAt: today,
          },
        },
        update: {
          completed: input.completed,
          completionLevel: input.completionLevel ?? "MINIMUM",
        },
        create: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
          loggedAt: today,
          completed: input.completed,
          completionLevel: input.completionLevel ?? "MINIMUM",
        },
      });

      // 计算连续天数（用于庆祝）
      let streakDays = 0;
      if (input.completed) {
        const recentLogs = await ctx.db.habitLog.findMany({
          where: {
            habitId: input.habitId,
            completed: true,
          },
          orderBy: { loggedAt: "desc" },
          take: 100,
        });

        // 从今天往回数连续天数
        for (let i = 0; i < recentLogs.length; i++) {
          const logDate = new Date(recentLogs[i]!.loggedAt);
          logDate.setHours(0, 0, 0, 0);
          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);

          if (logDate.getTime() === expectedDate.getTime()) {
            streakDays++;
          } else {
            break;
          }
        }
      }

      // 检测里程碑
      const MILESTONES = [7, 21, 66, 100] as const;
      let isMilestone = false;
      let milestoneDay: number | undefined;

      if (MILESTONES.includes(streakDays as 7 | 21 | 66 | 100)) {
        isMilestone = true;
        milestoneDay = streakDays;
      }

      return {
        log,
        habitName: habit.name,
        celebration: habit.celebration,
        streakDays,
        isMilestone,
        milestoneDay,
      };
    }),

  /**
   * 获取单条打卡记录
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const log = await ctx.db.habitLog.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          habit: {
            select: {
              name: true,
              type: true,
              category: true,
            },
          },
        },
      });

      if (!log) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "打卡记录不存在",
        });
      }

      return log;
    }),

  /**
   * 获取习惯的打卡历史
   */
  getByHabit: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        limit: z.number().min(1).max(100).default(30),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      // 验证习惯属于当前用户
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
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
        where: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
        },
        orderBy: { loggedAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      const total = await ctx.db.habitLog.count({
        where: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
        },
      });

      return {
        logs,
        total,
        hasMore: input.offset + logs.length < total,
      };
    }),

  /**
   * 按日期范围获取打卡记录
   */
  getByDateRange: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const logs = await ctx.db.habitLog.findMany({
        where: {
          userId: ctx.session.user.id,
          ...(input.habitId && { habitId: input.habitId }),
          loggedAt: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        include: {
          habit: {
            select: {
              id: true,
              name: true,
              type: true,
              category: true,
            },
          },
        },
        orderBy: { loggedAt: "desc" },
      });

      return logs;
    }),

  /**
   * 获取今日打卡状态
   */
  getTodayStatus: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 获取所有活跃习惯
    const activeHabits = await ctx.db.habit.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        type: true,
        anchor: true,
        behavior: true,
        celebration: true,
      },
    });

    // 获取今日打卡记录
    const todayLogs = await ctx.db.habitLog.findMany({
      where: {
        userId: ctx.session.user.id,
        loggedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const logMap = new Map(todayLogs.map((log) => [log.habitId, log]));

    const status = activeHabits.map((habit) => ({
      habitId: habit.id,
      habitName: habit.name,
      habitType: habit.type,
      anchor: habit.anchor,
      behavior: habit.behavior,
      celebration: habit.celebration,
      log: logMap.get(habit.id) ?? null,
      completed: logMap.get(habit.id)?.completed ?? false,
    }));

    const completedCount = status.filter((s) => s.completed).length;

    return {
      habits: status,
      totalActive: activeHabits.length,
      completedToday: completedCount,
      completionRate:
        activeHabits.length > 0
          ? Math.round((completedCount / activeHabits.length) * 100)
          : 0,
    };
  }),

  /**
   * 更新打卡记录（添加庆祝信息）
   */
  update: protectedProcedure
    .input(updateLogInput)
    .mutation(async ({ ctx, input }) => {
      // 验证记录属于当前用户
      const existingLog = await ctx.db.habitLog.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!existingLog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "打卡记录不存在",
        });
      }

      const log = await ctx.db.habitLog.update({
        where: { id: input.id },
        data: {
          ...(input.completed !== undefined && { completed: input.completed }),
          ...(input.completionLevel !== undefined && {
            completionLevel: input.completionLevel,
          }),
          ...(input.actualBehavior !== undefined && {
            actualBehavior: input.actualBehavior,
          }),
          ...(input.wantedMore !== undefined && {
            wantedMore: input.wantedMore,
          }),
          ...(input.feltEasy !== undefined && { feltEasy: input.feltEasy }),
          ...(input.shineScore !== undefined && {
            shineScore: input.shineScore,
          }),
          ...(input.moodBefore !== undefined && {
            moodBefore: input.moodBefore,
          }),
          ...(input.moodAfter !== undefined && { moodAfter: input.moodAfter }),
          ...(input.note !== undefined && { note: input.note }),
        },
      });

      return log;
    }),

  /**
   * 删除打卡记录
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // 验证记录属于当前用户
      const log = await ctx.db.habitLog.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!log) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "打卡记录不存在",
        });
      }

      await ctx.db.habitLog.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * 获取打卡统计
   */
  getStats: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
        days: z.number().min(1).max(365).default(30),
      }),
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);
      startDate.setHours(0, 0, 0, 0);

      const logs = await ctx.db.habitLog.findMany({
        where: {
          userId: ctx.session.user.id,
          ...(input.habitId && { habitId: input.habitId }),
          loggedAt: { gte: startDate },
        },
        orderBy: { loggedAt: "asc" },
      });

      const totalLogs = logs.length;
      const completedLogs = logs.filter((log) => log.completed).length;

      // 按日期分组统计
      const dailyStats = new Map<
        string,
        { completed: number; total: number }
      >();

      logs.forEach((log) => {
        const dateKey = log.loggedAt.toISOString().split("T")[0]!;
        const existing = dailyStats.get(dateKey) ?? { completed: 0, total: 0 };
        dailyStats.set(dateKey, {
          completed: existing.completed + (log.completed ? 1 : 0),
          total: existing.total + 1,
        });
      });

      // 计算情绪变化
      const logsWithMood = logs.filter(
        (log) => log.moodBefore !== null && log.moodAfter !== null,
      );
      const avgMoodChange =
        logsWithMood.length > 0
          ? logsWithMood.reduce(
              (sum, log) =>
                sum + ((log.moodAfter ?? 0) - (log.moodBefore ?? 0)),
              0,
            ) / logsWithMood.length
          : 0;

      // 计算完成级别分布
      const levelCounts = {
        MINIMUM: logs.filter((l) => l.completionLevel === "MINIMUM").length,
        STANDARD: logs.filter((l) => l.completionLevel === "STANDARD").length,
        EXCEEDED: logs.filter((l) => l.completionLevel === "EXCEEDED").length,
      };

      return {
        period: input.days,
        totalLogs,
        completedLogs,
        completionRate:
          totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0,
        dailyStats: Array.from(dailyStats.entries()).map(([date, stats]) => ({
          date,
          ...stats,
        })),
        avgMoodChange: Math.round(avgMoodChange * 100) / 100,
        levelCounts,
      };
    }),
});
