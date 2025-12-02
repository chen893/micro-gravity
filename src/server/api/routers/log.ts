/**
 * 习惯打卡记录 tRPC 路由
 * 提供打卡记录的 CRUD 操作
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { triggerRecordSchema } from "@/lib/types";

// 完成级别枚举（对应 Prisma CompletionLevel）
const completionLevelEnum = z.enum(["MINIMUM", "STANDARD", "EXCEEDED"]);

// 情感标志枚举（对应 Prisma EmotionalMarker）
const emotionalMarkerEnum = z.enum([
  "BOREDOM",
  "FRUSTRATION",
  "AVOIDANCE",
  "PAIN",
  "JOY",
  "PRIDE",
]);

// 创建打卡记录输入 schema
const createLogInput = z.object({
  habitId: z.string(),
  loggedAt: z.date().optional(), // 默认今天
  completed: z.boolean(),
  completionTime: z.date().optional(),
  durationMinutes: z.number().min(0).optional(),
  difficultyRating: z.number().min(1).max(5).optional(),
  moodBefore: z.number().min(1).max(5).optional(),
  moodAfter: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  triggerContext: triggerRecordSchema.optional(), // 坏习惯触发记录
  // v2.0 Phase 7: 弹性打卡字段
  completionLevel: completionLevelEnum.optional(),
  actualBehavior: z.string().optional(),
  wantedToDoMore: z.boolean().optional(),
  feltEasy: z.boolean().optional(),
  emotionalMarker: emotionalMarkerEnum.optional(),
});

// 更新打卡记录输入 schema
const updateLogInput = z.object({
  id: z.string(),
  completed: z.boolean().optional(),
  completionTime: z.date().optional(),
  durationMinutes: z.number().min(0).optional(),
  difficultyRating: z.number().min(1).max(5).optional(),
  moodBefore: z.number().min(1).max(5).optional(),
  moodAfter: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  triggerContext: triggerRecordSchema.optional(),
  // v2.0 Phase 7: 弹性打卡字段
  completionLevel: completionLevelEnum.optional(),
  actualBehavior: z.string().optional(),
  wantedToDoMore: z.boolean().optional(),
  feltEasy: z.boolean().optional(),
  emotionalMarker: emotionalMarkerEnum.optional(),
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
          completionTime:
            input.completionTime ?? (input.completed ? new Date() : null),
          durationMinutes: input.durationMinutes,
          difficultyRating: input.difficultyRating,
          moodBefore: input.moodBefore,
          moodAfter: input.moodAfter,
          notes: input.notes,
          triggerContext: input.triggerContext ?? undefined,
          // v2.0 Phase 7: 弹性打卡字段
          completionLevel: input.completionLevel,
          actualBehavior: input.actualBehavior,
          wantedToDoMore: input.wantedToDoMore,
          feltEasy: input.feltEasy,
          emotionalMarker: input.emotionalMarker,
        },
        create: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
          loggedAt: logDate,
          completed: input.completed,
          completionTime:
            input.completionTime ?? (input.completed ? new Date() : null),
          durationMinutes: input.durationMinutes,
          difficultyRating: input.difficultyRating,
          moodBefore: input.moodBefore,
          moodAfter: input.moodAfter,
          notes: input.notes,
          triggerContext: input.triggerContext ?? undefined,
          // v2.0 Phase 7: 弹性打卡字段
          completionLevel: input.completionLevel ?? "MINIMUM",
          actualBehavior: input.actualBehavior,
          wantedToDoMore: input.wantedToDoMore ?? false,
          feltEasy: input.feltEasy ?? false,
          emotionalMarker: input.emotionalMarker,
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
          completionTime: input.completed ? new Date() : null,
        },
        create: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
          loggedAt: today,
          completed: input.completed,
          completionTime: input.completed ? new Date() : null,
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
      type MilestoneType = "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100";
      let isMilestone = false;
      let milestoneType: MilestoneType | undefined;

      if (MILESTONES.includes(streakDays as 7 | 21 | 66 | 100)) {
        isMilestone = true;
        milestoneType = `DAY_${streakDays}` as MilestoneType;
      }

      return {
        log,
        habitName: habit.name,
        streakDays,
        isMilestone,
        milestoneType,
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
   * 更新打卡记录
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
          ...(input.completionTime !== undefined && {
            completionTime: input.completionTime,
          }),
          ...(input.durationMinutes !== undefined && {
            durationMinutes: input.durationMinutes,
          }),
          ...(input.difficultyRating !== undefined && {
            difficultyRating: input.difficultyRating,
          }),
          ...(input.moodBefore !== undefined && {
            moodBefore: input.moodBefore,
          }),
          ...(input.moodAfter !== undefined && { moodAfter: input.moodAfter }),
          ...(input.notes !== undefined && { notes: input.notes }),
          ...(input.triggerContext !== undefined && {
            triggerContext: input.triggerContext,
          }),
          // v2.0 Phase 7: 弹性打卡字段
          ...(input.completionLevel !== undefined && {
            completionLevel: input.completionLevel,
          }),
          ...(input.actualBehavior !== undefined && {
            actualBehavior: input.actualBehavior,
          }),
          ...(input.wantedToDoMore !== undefined && {
            wantedToDoMore: input.wantedToDoMore,
          }),
          ...(input.feltEasy !== undefined && { feltEasy: input.feltEasy }),
          ...(input.emotionalMarker !== undefined && {
            emotionalMarker: input.emotionalMarker,
          }),
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

      // 计算平均难度
      const logsWithDifficulty = logs.filter(
        (log) => log.difficultyRating !== null,
      );
      const avgDifficulty =
        logsWithDifficulty.length > 0
          ? logsWithDifficulty.reduce(
              (sum, log) => sum + (log.difficultyRating ?? 0),
              0,
            ) / logsWithDifficulty.length
          : 0;

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
        avgDifficulty: Math.round(avgDifficulty * 100) / 100,
      };
    }),
});
