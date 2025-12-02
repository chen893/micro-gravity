/**
 * 习惯繁殖系统 tRPC 路由
 * 基于福格行为模型的习惯繁殖机制
 */

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  assessHabitStability,
  generateProliferationSuggestions,
  shouldPromptProliferation,
} from "@/lib/ai/habit-proliferation";

export const proliferationRouter = createTRPCRouter({
  /**
   * 评估习惯稳定性
   */
  assessStability: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        include: {
          logs: {
            orderBy: { loggedAt: "desc" },
            take: 30,
          },
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 计算最近14天的完成率
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      const recentLogs = habit.logs.filter(
        (log) => log.loggedAt >= twoWeeksAgo
      );
      const completedLogs = recentLogs.filter((log) => log.completed);
      const completionRate =
        recentLogs.length > 0 ? completedLogs.length / recentLogs.length : 0;

      // 计算连续天数
      let consecutiveDays = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedLogs = [...habit.logs].sort(
        (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime()
      );

      for (let i = 0; i < sortedLogs.length; i++) {
        const log = sortedLogs[i]!;
        const logDate = new Date(log.loggedAt);
        logDate.setHours(0, 0, 0, 0);

        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);

        if (logDate.getTime() === expectedDate.getTime() && log.completed) {
          consecutiveDays++;
        } else {
          break;
        }
      }

      // 计算平均难度
      const logsWithDifficulty = recentLogs.filter(
        (log) => log.completed && log.difficultyRating !== null
      );
      const avgDifficulty =
        logsWithDifficulty.length > 0
          ? logsWithDifficulty.reduce(
              (sum, log) => sum + (log.difficultyRating ?? 3),
              0
            ) / logsWithDifficulty.length
          : 3;

      // 计算正面情绪比例
      const logsWithEmotion = recentLogs.filter(
        (log) => log.emotionalMarker !== null
      );
      const positiveEmotions = ["JOY", "PRIDE"];
      const positiveCount = logsWithEmotion.filter((log) =>
        positiveEmotions.includes(log.emotionalMarker ?? "")
      ).length;
      const positiveEmotionRate =
        logsWithEmotion.length > 0
          ? positiveCount / logsWithEmotion.length
          : 0.5; // 默认中性

      // 计算习惯总天数
      const createdAt = new Date(habit.createdAt);
      const totalDays = Math.floor(
        (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      const stability = assessHabitStability({
        completionRate,
        consecutiveDays,
        avgDifficulty,
        positiveEmotionRate,
        totalDays,
      });

      return {
        habitId: habit.id,
        habitName: habit.name,
        ...stability,
      };
    }),

  /**
   * 获取繁殖建议
   */
  getSuggestions: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        userGoals: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        include: {
          logs: {
            orderBy: { loggedAt: "desc" },
            take: 14,
          },
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 先评估稳定性
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const recentLogs = habit.logs.filter(
        (log) => log.loggedAt >= twoWeeksAgo
      );
      const completedLogs = recentLogs.filter((log) => log.completed);
      const completionRate =
        recentLogs.length > 0 ? completedLogs.length / recentLogs.length : 0;

      const stabilityScore = Math.round(completionRate * 100);

      // 获取阶段信息
      interface PhaseInfo {
        phase: number;
        name: string;
      }
      const phases = (habit.phases as unknown as PhaseInfo[] | null) ?? [];

      const result = await generateProliferationSuggestions({
        habitName: habit.name,
        habitDescription: habit.description ?? undefined,
        category: habit.category ?? undefined,
        currentPhase: habit.currentPhase,
        totalPhases: phases.length,
        stabilityScore,
        userGoals: input.userGoals,
      });

      return result;
    }),

  /**
   * 检查是否应该提示繁殖
   */
  shouldPrompt: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        include: {
          logs: {
            orderBy: { loggedAt: "desc" },
            take: 14,
          },
          proliferationResponses: {
            orderBy: { respondedAt: "desc" },
            take: 10,
          },
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 计算稳定性分数
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const recentLogs = habit.logs.filter(
        (log) => log.loggedAt >= twoWeeksAgo
      );
      const completedLogs = recentLogs.filter((log) => log.completed);
      const completionRate =
        recentLogs.length > 0 ? completedLogs.length / recentLogs.length : 0;

      const stabilityScore = Math.round(completionRate * 100);

      // 从数据库读取上次提示时间和拒绝次数
      const lastResponse = habit.proliferationResponses[0];
      const daysSinceLastPrompt = lastResponse
        ? Math.floor(
            (Date.now() - lastResponse.respondedAt.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 999;

      const userDismissedCount = habit.proliferationResponses.filter(
        (r) => r.response === "DISMISSED"
      ).length;

      const shouldPrompt = shouldPromptProliferation({
        stabilityScore,
        daysSinceLastPrompt,
        userDismissedCount,
      });

      return {
        shouldPrompt,
        stabilityScore,
        habitName: habit.name,
      };
    }),

  /**
   * 记录用户对繁殖提示的响应
   */
  recordPromptResponse: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        response: z.enum(["ACCEPTED", "DISMISSED", "POSTPONED"]) as z.ZodEnum<["ACCEPTED", "DISMISSED", "POSTPONED"]>,
        selectedSuggestionType: (z.enum(["GROWTH", "SPAWN"]) as z.ZodEnum<["GROWTH", "SPAWN"]>).optional(),
      })
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

      // 保存响应到数据库
      await ctx.db.proliferationPromptResponse.create({
        data: {
          userId: ctx.session.user.id,
          habitId: input.habitId,
          response: input.response,
          selectedSuggestionType: input.selectedSuggestionType,
        },
      });

      return { success: true };
    }),
});
