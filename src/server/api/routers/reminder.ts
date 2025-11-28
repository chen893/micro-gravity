/**
 * 智能提醒 tRPC 路由
 * 个性化提醒文案生成
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateReminder,
  generateRemindersForHabits,
  getReminderStyle,
} from "@/lib/ai/reminder";
import type { ReminderContext } from "@/lib/types";

export const reminderRouter = createTRPCRouter({
  /**
   * 生成单个习惯的提醒
   */
  generate: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
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
            take: 7,
          },
          _count: {
            select: {
              logs: { where: { completed: true } },
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

      // 计算连续天数
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const log of habit.logs) {
        const logDate = new Date(log.loggedAt);
        logDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
          (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === currentStreak && log.completed) {
          currentStreak++;
        } else if (diffDays > currentStreak) {
          break;
        }
      }

      // 计算最近7天完成率
      const recentLogs = habit.logs.filter((log) => {
        const logDate = new Date(log.loggedAt);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return logDate >= sevenDaysAgo;
      });
      const recentRate =
        recentLogs.length > 0
          ? Math.round(
              (recentLogs.filter((l) => l.completed).length / recentLogs.length) * 100
            )
          : 0;

      // 获取最后完成时间
      const lastCompleted = habit.logs.find((l) => l.completed);

      // 解析 motivation JSON
      const motivation = habit.motivation as { primaryType?: string; motivationScore?: number } | null;

      const context: ReminderContext = {
        habitId: habit.id,
        habitName: habit.name,
        habitType: habit.type,
        motivationType: (motivation?.primaryType as "PLEASURE" | "HOPE" | "SOCIAL") ?? "PLEASURE",
        motivationLevel: motivation?.motivationScore ?? 5,
        streakDays: currentStreak,
        recentRate,
        lastCompletedAt: lastCompleted?.loggedAt,
        currentPhase: habit.currentPhase,
      };

      const reminder = await generateReminder(context);

      return {
        habitId: habit.id,
        habitName: habit.name,
        ...reminder,
      };
    }),

  /**
   * 批量生成提醒（用于每日推送）
   */
  generateBatch: protectedProcedure.mutation(async ({ ctx }) => {
    const habits = await ctx.db.habit.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "ACTIVE",
      },
      include: {
        logs: {
          orderBy: { loggedAt: "desc" },
          take: 7,
        },
        _count: {
          select: {
            logs: { where: { completed: true } },
          },
        },
      },
    });

    if (habits.length === 0) {
      return [];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contexts: ReminderContext[] = habits.map((habit) => {
      // 计算连续天数
      let currentStreak = 0;
      for (const log of habit.logs) {
        const logDate = new Date(log.loggedAt);
        logDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
          (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === currentStreak && log.completed) {
          currentStreak++;
        } else if (diffDays > currentStreak) {
          break;
        }
      }

      // 计算最近7天完成率
      const recentLogs = habit.logs.filter((log) => {
        const logDate = new Date(log.loggedAt);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return logDate >= sevenDaysAgo;
      });
      const recentRate =
        recentLogs.length > 0
          ? Math.round(
              (recentLogs.filter((l) => l.completed).length / recentLogs.length) * 100
            )
          : 0;

      const lastCompleted = habit.logs.find((l) => l.completed);
      const motivation = habit.motivation as { primaryType?: string; motivationScore?: number } | null;

      return {
        habitId: habit.id,
        habitName: habit.name,
        habitType: habit.type,
        motivationType: (motivation?.primaryType as "PLEASURE" | "HOPE" | "SOCIAL") ?? "PLEASURE",
        motivationLevel: motivation?.motivationScore ?? 5,
        streakDays: currentStreak,
        recentRate,
        lastCompletedAt: lastCompleted?.loggedAt,
        currentPhase: habit.currentPhase,
      };
    });

    const reminders = await generateRemindersForHabits(contexts);

    // 转换 Map 为数组
    const result: Array<{
      habitId: string;
      habitName: string;
      content: string;
      promptType: string;
      actionGuidance: string;
    }> = [];

    reminders.forEach((reminder, habitId) => {
      const habit = habits.find((h) => h.id === habitId);
      if (habit) {
        result.push({
          habitId,
          habitName: habit.name,
          ...reminder,
        });
      }
    });

    return result;
  }),

  /**
   * 获取提醒风格建议
   */
  getStyleSuggestion: protectedProcedure.query(async () => {
    const hour = new Date().getHours();
    const style = getReminderStyle(hour);

    return {
      currentHour: hour,
      suggestedStyle: style,
      description:
        style === "GENTLE"
          ? "早晨时段，建议使用温和鼓励的语气"
          : style === "FIRM"
            ? "工作时段，建议使用简洁直接的语气"
            : "晚间时段，建议使用轻松有趣的语气",
    };
  }),
});
