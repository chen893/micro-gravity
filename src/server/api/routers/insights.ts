/**
 * 数据洞察 tRPC 路由
 * 智能模式识别与建议
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateInsights,
  getQuickInsights,
  calculateBasicStats,
  analyzeTimeDistribution,
} from "@/lib/ai/insights";

// Helper to convert null to undefined
function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}

export const insightsRouter = createTRPCRouter({
  /**
   * 获取习惯洞察（AI生成）
   */
  getHabitInsights: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        days: z.number().min(7).max(90).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          type: true,
          currentPhase: true,
          motivation: true,
          ability: true,
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
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { loggedAt: "desc" },
        select: {
          loggedAt: true,
          completed: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
          notes: true,
        },
      });

      // Calculate stats for the insights data
      const logsData = logs.map((l) => ({
        loggedAt: l.loggedAt,
        completed: l.completed,
        difficultyRating: nullToUndefined(l.difficultyRating),
        moodBefore: nullToUndefined(l.moodBefore),
        moodAfter: nullToUndefined(l.moodAfter),
      }));

      const basicStats = calculateBasicStats(logsData);

      const insights = await generateInsights({
        habit: {
          id: habit.id,
          name: habit.name,
          type: habit.type,
          currentPhase: habit.currentPhase,
          createdAt: new Date(), // Not used in insights generation
        },
        logs: logsData,
        stats: {
          totalDays: basicStats.totalDays,
          completedDays: basicStats.completedDays,
          currentStreak: basicStats.currentStreak,
          longestStreak: basicStats.longestStreak,
          averageDifficulty: nullToUndefined(basicStats.averageDifficulty),
        },
      });

      return insights;
    }),

  /**
   * 获取快速洞察（轻量级，无AI调用）
   */
  getQuickInsights: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        days: z.number().min(7).max(30).default(14),
      })
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          type: true,
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
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { loggedAt: "desc" },
        select: {
          loggedAt: true,
          completed: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return getQuickInsights(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: nullToUndefined(l.difficultyRating),
          moodBefore: nullToUndefined(l.moodBefore),
          moodAfter: nullToUndefined(l.moodAfter),
        }))
      );
    }),

  /**
   * 获取基础统计数据
   */
  getBasicStats: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
        days: z.number().min(1).max(365).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
            ...(input.habitId && { id: input.habitId }),
          },
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          loggedAt: true,
          completed: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return calculateBasicStats(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: nullToUndefined(l.difficultyRating),
          moodBefore: nullToUndefined(l.moodBefore),
          moodAfter: nullToUndefined(l.moodAfter),
        }))
      );
    }),

  /**
   * 获取时间分布分析
   */
  getTimeDistribution: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
        days: z.number().min(7).max(90).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
            ...(input.habitId && { id: input.habitId }),
          },
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          loggedAt: true,
          completed: true,
        },
      });

      return analyzeTimeDistribution(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
        }))
      );
    }),

  /**
   * 获取用户整体洞察仪表盘
   */
  getDashboard: protectedProcedure
    .input(
      z.object({
        days: z.number().min(7).max(90).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const habits = await ctx.db.habit.findMany({
        where: {
          userId: ctx.session.user.id,
          status: "ACTIVE",
        },
        select: {
          id: true,
          name: true,
          type: true,
          currentPhase: true,
        },
      });

      const logs = await ctx.db.habitLog.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
          },
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          habitId: true,
          loggedAt: true,
          completed: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      // 整体统计
      const overallStats = calculateBasicStats(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: nullToUndefined(l.difficultyRating),
          moodBefore: nullToUndefined(l.moodBefore),
          moodAfter: nullToUndefined(l.moodAfter),
        }))
      );

      // 时间分布
      const timeDistribution = analyzeTimeDistribution(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
        }))
      );

      // 每个习惯的统计
      const habitStats = habits.map((habit) => {
        const habitLogs = logs.filter((l) => l.habitId === habit.id);
        const completed = habitLogs.filter((l) => l.completed).length;

        return {
          habitId: habit.id,
          habitName: habit.name,
          habitType: habit.type,
          currentPhase: habit.currentPhase,
          totalLogs: habitLogs.length,
          completedLogs: completed,
          completionRate:
            habitLogs.length > 0 ? Math.round((completed / habitLogs.length) * 100) : 0,
        };
      });

      // 快速洞察
      const quickInsights = getQuickInsights(
        logs.map((l) => ({
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: nullToUndefined(l.difficultyRating),
          moodBefore: nullToUndefined(l.moodBefore),
          moodAfter: nullToUndefined(l.moodAfter),
        }))
      );

      return {
        periodDays: input.days,
        overallStats,
        timeDistribution,
        habitStats,
        quickInsights,
        summary: {
          totalHabits: habits.length,
          totalLogs: logs.length,
          bestHabit:
            habitStats.length > 0
              ? habitStats.reduce((best, curr) =>
                  curr.completionRate > best.completionRate ? curr : best
                )
              : null,
          needsAttention:
            habitStats.filter((h) => h.completionRate < 50).slice(0, 3) ?? [],
        },
      };
    }),
});
