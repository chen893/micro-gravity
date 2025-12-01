/**
 * 报告系统 tRPC 路由
 * v1.5 周报、月报、里程碑报告
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateWeeklyReport,
  generateMonthlyReport,
  generateMilestoneReport,
  type ReportInputData,
  type MonthlyReportData,
} from "@/lib/ai/report";

export const reportRouter = createTRPCRouter({
  /**
   * 生成周报
   */
  generateWeekly: protectedProcedure
    .input(
      z.object({
        weekStart: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 计算周期
      const periodEnd = input.weekStart
        ? new Date(input.weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
        : new Date();
      const periodStart =
        input.weekStart ??
        new Date(periodEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

      // 获取习惯和日志
      const habits = await ctx.db.habit.findMany({
        where: {
          userId: ctx.session.user.id,
          status: { in: ["ACTIVE", "PAUSED"] },
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
            gte: periodStart,
            lte: periodEnd,
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

      // 获取上周数据用于对比
      const previousPeriodStart = new Date(
        periodStart.getTime() - 7 * 24 * 60 * 60 * 1000,
      );
      const previousLogs = await ctx.db.habitLog.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
          },
          loggedAt: {
            gte: previousPeriodStart,
            lt: periodStart,
          },
        },
        select: {
          completed: true,
        },
      });

      const previousCompletionRate =
        previousLogs.length > 0
          ? Math.round(
              (previousLogs.filter((l) => l.completed).length /
                previousLogs.length) *
                100,
            )
          : undefined;

      const reportData: ReportInputData = {
        periodStart,
        periodEnd,
        habits: habits.map((h) => ({
          id: h.id,
          name: h.name,
          type: h.type,
          currentPhase: h.currentPhase,
        })),
        logs: logs.map((l) => ({
          habitId: l.habitId,
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: l.difficultyRating,
          moodBefore: l.moodBefore,
          moodAfter: l.moodAfter,
        })),
        previousPeriodStats: previousCompletionRate
          ? { completionRate: previousCompletionRate, longestStreak: 0 }
          : undefined,
      };

      const report = await generateWeeklyReport(reportData);

      // 保存报告到数据库
      const savedReport = await ctx.db.report.create({
        data: {
          userId: ctx.session.user.id,
          type: "WEEKLY",
          periodStart,
          periodEnd,
          summary: report.summary,
          highlights: report.highlights,
          patterns: report.patterns,
          suggestions: report.suggestions,
          goals: report.nextWeekGoals,
        },
      });

      return {
        id: savedReport.id,
        ...report,
      };
    }),

  /**
   * 生成月报
   */
  generateMonthly: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12),
        year: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const periodStart = new Date(input.year, input.month - 1, 1);
      const periodEnd = new Date(input.year, input.month, 0, 23, 59, 59);

      // 获取习惯和日志
      const habits = await ctx.db.habit.findMany({
        where: {
          userId: ctx.session.user.id,
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
            gte: periodStart,
            lte: periodEnd,
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

      // 获取里程碑
      const milestones = await ctx.db.milestone.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
          },
          achievedAt: {
            gte: periodStart,
            lte: periodEnd,
          },
        },
        include: {
          habit: {
            select: { name: true },
          },
        },
      });

      // 获取上月数据用于对比
      const previousPeriodStart = new Date(input.year, input.month - 2, 1);
      const previousPeriodEnd = new Date(
        input.year,
        input.month - 1,
        0,
        23,
        59,
        59,
      );
      const previousLogs = await ctx.db.habitLog.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
          },
          loggedAt: {
            gte: previousPeriodStart,
            lte: previousPeriodEnd,
          },
        },
        select: {
          completed: true,
        },
      });

      const previousCompletionRate =
        previousLogs.length > 0
          ? Math.round(
              (previousLogs.filter((l) => l.completed).length /
                previousLogs.length) *
                100,
            )
          : undefined;

      // 计算周报摘要
      const weeklyReports = [];
      let weekStart = new Date(periodStart);
      let weekNumber = 1;

      while (weekStart < periodEnd) {
        const weekEnd = new Date(
          Math.min(
            weekStart.getTime() + 7 * 24 * 60 * 60 * 1000,
            periodEnd.getTime(),
          ),
        );
        const weekLogs = logs.filter(
          (l) => l.loggedAt >= weekStart && l.loggedAt < weekEnd,
        );

        const completed = weekLogs.filter((l) => l.completed).length;
        const completionRate =
          weekLogs.length > 0
            ? Math.round((completed / weekLogs.length) * 100)
            : 0;

        // 计算完美日数
        const dateSet = new Set<string>();
        weekLogs.forEach((log) => {
          if (log.completed) {
            const dateKey = log.loggedAt.toISOString().split("T")[0]!;
            dateSet.add(dateKey);
          }
        });

        weeklyReports.push({
          weekNumber,
          summary: {
            completionRate,
            rateChange: 0,
            activeHabits: habits.length,
            longestStreak: 0,
            totalCheckins: completed,
            perfectDays: dateSet.size === habits.length ? dateSet.size : 0,
          },
        });

        weekStart = weekEnd;
        weekNumber++;
      }

      const reportData: MonthlyReportData = {
        periodStart,
        periodEnd,
        habits: habits.map((h) => ({
          id: h.id,
          name: h.name,
          type: h.type,
          currentPhase: h.currentPhase,
        })),
        logs: logs.map((l) => ({
          habitId: l.habitId,
          loggedAt: l.loggedAt,
          completed: l.completed,
          difficultyRating: l.difficultyRating,
          moodBefore: l.moodBefore,
          moodAfter: l.moodAfter,
        })),
        previousPeriodStats: previousCompletionRate
          ? { completionRate: previousCompletionRate, longestStreak: 0 }
          : undefined,
        weeklyReports,
        milestones: milestones.map((m) => ({
          habitName: m.habit.name,
          type: m.type,
          achievedAt: m.achievedAt,
        })),
      };

      const report = await generateMonthlyReport(reportData);

      // 保存报告
      const savedReport = await ctx.db.report.create({
        data: {
          userId: ctx.session.user.id,
          type: "MONTHLY",
          periodStart,
          periodEnd,
          summary: report.summary,
          highlights: report.monthHighlights,
          patterns: report.keyInsights,
          suggestions: report.nextMonthFocus,
          goals: report.weeklyTrend,
        },
      });

      return {
        id: savedReport.id,
        ...report,
      };
    }),

  /**
   * 生成里程碑报告
   */
  generateMilestone: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        milestoneType: z.enum([
          "DAY_7",
          "DAY_21",
          "DAY_66",
          "DAY_100",
          "CUSTOM",
        ]),
        streakDays: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        include: {
          logs: {
            where: { completed: true },
            orderBy: { loggedAt: "asc" },
          },
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const streakDays =
        input.streakDays ??
        {
          DAY_7: 7,
          DAY_21: 21,
          DAY_66: 66,
          DAY_100: 100,
          CUSTOM: habit.logs.length,
        }[input.milestoneType];

      const report = await generateMilestoneReport({
        habitName: habit.name,
        habitType: habit.type,
        milestoneType: input.milestoneType,
        streakDays,
        startDate: habit.createdAt,
        totalLogs: habit.logs.length,
        completedLogs: habit.logs.filter((l) => l.completed).length,
      });

      // 记录里程碑
      await ctx.db.milestone.create({
        data: {
          habitId: input.habitId,
          userId: ctx.session.user.id,
          type: input.milestoneType,
          achievedAt: new Date(),
          streakDays,
          celebration: report.celebration,
          reflection: report.reflection,
          nextPhase: report.nextPhase ?? undefined,
        },
      });

      return report;
    }),

  /**
   * 获取报告列表
   */
  list: protectedProcedure
    .input(
      z.object({
        type: z.enum(["WEEKLY", "MONTHLY", "MILESTONE"]).optional(),
        limit: z.number().min(1).max(50).default(10),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const reports = await ctx.db.report.findMany({
        where: {
          userId: ctx.session.user.id,
          ...(input.type && { type: input.type }),
        },
        orderBy: { generatedAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });

      const total = await ctx.db.report.count({
        where: {
          userId: ctx.session.user.id,
          ...(input.type && { type: input.type }),
        },
      });

      return {
        reports,
        total,
        hasMore: input.offset + reports.length < total,
      };
    }),

  /**
   * 获取报告详情
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const report = await ctx.db.report.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!report) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "报告不存在",
        });
      }

      return report;
    }),

  /**
   * 获取里程碑列表
   */
  getMilestones: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const milestones = await ctx.db.milestone.findMany({
        where: {
          habit: {
            userId: ctx.session.user.id,
            ...(input.habitId && { id: input.habitId }),
          },
        },
        include: {
          habit: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
        orderBy: { achievedAt: "desc" },
      });

      return milestones;
    }),
});
