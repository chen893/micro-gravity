/**
 * 习惯医生 tRPC 路由
 * 提供习惯问题诊断和处方功能
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  quickDiagnose,
  deepDiagnose,
  generatePrescription,
  type SymptomData,
} from "@/lib/troubleshoot/habit-doctor";
import { getDaysAgo } from "@/lib/utils";
import { DIAGNOSIS_THRESHOLDS, TIME_RANGES } from "@/lib/constants";

// 症状数据 schema (保留用于未来验证)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _symptomDataSchema = z.object({
  recentCompletionRate: z.number().min(0).max(1),
  missedDays: z.number().min(0),
  avgDifficulty: z.number().min(1).max(5).optional(),
  commonMissReasons: z.array(z.string()).optional(),
  streakBroken: z.boolean().optional(),
  lastCompletedDaysAgo: z.number().optional(),
});

export const habitDoctorRouter = createTRPCRouter({
  /**
   * 快速诊断 - 基于规则判断主要问题类别
   */
  quickDiagnose: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // 获取习惯
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

      // 获取最近7天的打卡记录
      const sevenDaysAgo = getDaysAgo(TIME_RANGES.RECENT_DAYS);

      const recentLogs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.habitId,
          loggedAt: { gte: sevenDaysAgo },
        },
        orderBy: { loggedAt: "desc" },
      });

      const completedLogs = recentLogs.filter((log) => log.completed);
      const missedDays = TIME_RANGES.RECENT_DAYS - completedLogs.length;
      const recentCompletionRate =
        completedLogs.length / TIME_RANGES.RECENT_DAYS;

      // 计算平均难度
      const logsWithDifficulty = recentLogs.filter(
        (log) => log.difficultyRating !== null,
      );
      const avgDifficulty =
        logsWithDifficulty.length > 0
          ? logsWithDifficulty.reduce(
              (sum, log) => sum + (log.difficultyRating ?? 0),
              0,
            ) / logsWithDifficulty.length
          : undefined;

      // 检查连续记录是否中断
      const lastLog = recentLogs.find((log) => log.completed);
      const lastCompletedDaysAgo = lastLog
        ? Math.floor(
            (Date.now() - lastLog.loggedAt.getTime()) / (1000 * 60 * 60 * 24),
          )
        : undefined;

      const symptoms: SymptomData = {
        recentCompletionRate,
        missedDays,
        avgDifficulty,
        streakBroken: missedDays >= 2,
        lastCompletedDaysAgo,
      };

      const category = quickDiagnose(symptoms);

      return {
        habitName: habit.name,
        category,
        symptoms,
        needsDeepDiagnosis:
          recentCompletionRate <
            DIAGNOSIS_THRESHOLDS.COMPLETION_RATE_CRITICAL ||
          missedDays >= DIAGNOSIS_THRESHOLDS.MISSED_DAYS_CRITICAL,
      };
    }),

  /**
   * 深度诊断 - AI 全面分析问题
   */
  deepDiagnose: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        userFeedback: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 获取习惯
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

      // 获取最近30天的打卡记录
      const thirtyDaysAgo = getDaysAgo(TIME_RANGES.LONG_DAYS);

      const recentLogs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.habitId,
          loggedAt: { gte: thirtyDaysAgo },
        },
        orderBy: { loggedAt: "desc" },
        take: 30,
      });

      const completedLogs = recentLogs.filter((log) => log.completed);

      // 计算症状数据
      const logsWithDifficulty = recentLogs.filter(
        (log) => log.difficultyRating !== null,
      );
      const avgDifficulty =
        logsWithDifficulty.length > 0
          ? logsWithDifficulty.reduce(
              (sum, log) => sum + (log.difficultyRating ?? 0),
              0,
            ) / logsWithDifficulty.length
          : undefined;

      // 收集漏打原因
      const missReasons = recentLogs
        .filter((log) => !log.completed && log.notes)
        .map((log) => log.notes!)
        .slice(0, 5);

      const symptoms: SymptomData = {
        recentCompletionRate:
          recentLogs.length > 0 ? completedLogs.length / recentLogs.length : 0,
        missedDays: Math.min(
          TIME_RANGES.RECENT_DAYS,
          recentLogs.filter((log) => !log.completed).length,
        ),
        avgDifficulty,
        commonMissReasons: missReasons,
        streakBroken: true,
      };

      // 准备最近日志数据
      const formattedLogs = recentLogs.slice(0, 10).map((log) => ({
        date: log.loggedAt.toISOString().split("T")[0]!,
        completed: log.completed,
        notes: log.notes ?? undefined,
        difficultyRating: log.difficultyRating ?? undefined,
      }));

      // 调用 AI 深度诊断
      const report = await deepDiagnose({
        habitName: habit.name,
        habitDescription: habit.description ?? undefined,
        symptoms,
        userFeedback: input.userFeedback,
        recentLogs: formattedLogs,
      });

      return report;
    }),

  /**
   * 生成针对性处方
   */
  generatePrescription: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        category: z.enum(["PROMPT", "ABILITY", "MOTIVATION"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

      // 解析当前设置
      const prompt = habit.prompt as { anchorHabit?: string } | null;
      const ability = habit.ability as { microHabit?: string } | null;

      const prescriptions = await generatePrescription({
        habitName: habit.name,
        category: input.category,
        currentSetup: {
          anchor: prompt?.anchorHabit,
          behavior: ability?.microHabit,
        },
      });

      return prescriptions;
    }),

  /**
   * 获取习惯健康状态概览
   */
  getHealthOverview: protectedProcedure.query(async ({ ctx }) => {
    // 获取所有活跃习惯
    const habits = await ctx.db.habit.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "ACTIVE",
      },
    });

    if (habits.length === 0) {
      return {
        totalHabits: 0,
        healthyHabits: 0,
        needsAttention: 0,
        critical: 0,
        habitStatuses: [],
      };
    }

    const sevenDaysAgo = getDaysAgo(TIME_RANGES.RECENT_DAYS);

    // 获取所有习惯的近7天打卡记录
    const recentLogs = await ctx.db.habitLog.findMany({
      where: {
        userId: ctx.session.user.id,
        habitId: { in: habits.map((h) => h.id) },
        loggedAt: { gte: sevenDaysAgo },
      },
    });

    // 按习惯分组计算
    const habitStatuses = habits.map((habit) => {
      const habitLogs = recentLogs.filter((log) => log.habitId === habit.id);
      const completedCount = habitLogs.filter((log) => log.completed).length;
      const completionRate =
        habitLogs.length > 0 ? completedCount / TIME_RANGES.RECENT_DAYS : 0;

      let status: "HEALTHY" | "NEEDS_ATTENTION" | "CRITICAL";
      if (completionRate >= DIAGNOSIS_THRESHOLDS.COMPLETION_RATE_HEALTHY) {
        status = "HEALTHY";
      } else if (
        completionRate >= DIAGNOSIS_THRESHOLDS.COMPLETION_RATE_ATTENTION
      ) {
        status = "NEEDS_ATTENTION";
      } else {
        status = "CRITICAL";
      }

      const symptoms: SymptomData = {
        recentCompletionRate: completionRate,
        missedDays: TIME_RANGES.RECENT_DAYS - completedCount,
      };

      return {
        habitId: habit.id,
        habitName: habit.name,
        status,
        completionRate: Math.round(completionRate * 100),
        suggestedCategory: quickDiagnose(symptoms),
      };
    });

    return {
      totalHabits: habits.length,
      healthyHabits: habitStatuses.filter((h) => h.status === "HEALTHY").length,
      needsAttention: habitStatuses.filter(
        (h) => h.status === "NEEDS_ATTENTION",
      ).length,
      critical: habitStatuses.filter((h) => h.status === "CRITICAL").length,
      habitStatuses,
    };
  }),
});
