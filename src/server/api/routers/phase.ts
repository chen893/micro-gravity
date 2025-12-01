/**
 * 习惯进阶系统 tRPC 路由
 * 基于福格原理："不要过早提高标准。让动机来告诉你该做多少。"
 */

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  designPhasePath,
  designQuickPath,
  suggestNextPhase,
  type PhaseConfig,
} from "@/lib/ai/phase-design";
import {
  assessAdvanceReadiness,
  type HabitLogData as AdvanceLogData,
} from "@/lib/habit/advance-detection";
import {
  assessRetreatNeed,
  type HabitLogData as RetreatLogData,
} from "@/lib/habit/retreat-detection";

// ============ 输入 Schema ============

const userContextSchema = z.object({
  currentLevel: z.string().optional(),
  availableTime: z.string().optional(),
  constraints: z.array(z.string()).optional(),
  pastAttempts: z.array(z.string()).optional(),
});

const phaseConfigSchema = z.object({
  phase: z.number(),
  name: z.string(),
  microHabit: z.string(),
  successCriteria: z.string(),
  estimatedDuration: z.string(),
  advanceSignals: z.array(z.string()),
  tips: z.array(z.string()),
});

// ============ 路由定义 ============

export const phaseRouter = createTRPCRouter({
  /**
   * AI 设计阶段路径
   */
  designPath: protectedProcedure
    .input(
      z.object({
        targetHabit: z.string(),
        userContext: userContextSchema.optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await designPhasePath({
        targetHabit: input.targetHabit,
        userContext: input.userContext,
      });

      return result;
    }),

  /**
   * 快速设计阶段路径（3-5个阶段）
   */
  designQuickPath: protectedProcedure
    .input(
      z.object({
        targetHabit: z.string(),
        targetDuration: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await designQuickPath({
        targetHabit: input.targetHabit,
        targetDuration: input.targetDuration,
      });

      return result;
    }),

  /**
   * 获取习惯的当前阶段信息
   */
  getCurrentPhase: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
        select: {
          id: true,
          name: true,
          currentPhase: true,
          phases: true,
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 从 phases 字段中提取阶段信息
      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];
      const currentPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase,
      );
      const nextPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase + 1,
      );

      return {
        habitId: habit.id,
        habitName: habit.name,
        currentPhase: habit.currentPhase,
        currentPhaseConfig,
        nextPhaseConfig,
        totalPhases: phases.length,
        phases,
      };
    }),

  /**
   * 评估是否准备好进阶
   */
  assessAdvance: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      // 获取习惯和最近的日志
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
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

      // 转换日志数据格式
      const logData: AdvanceLogData[] = habit.logs.map((log) => ({
        date: log.loggedAt,
        completed: log.completed,
        difficultyRating: log.difficultyRating ?? undefined,
        moodAfter: log.moodAfter ?? undefined,
        notes: log.notes ?? undefined,
        wantedToDoMore: false, // 需要从日志的扩展字段获取
      }));

      // 评估进阶准备度
      const assessment = assessAdvanceReadiness(logData);

      // 获取阶段信息
      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];
      const currentPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase,
      );
      const nextPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase + 1,
      );

      return {
        ...assessment,
        currentPhase: habit.currentPhase,
        currentPhaseConfig,
        nextPhaseConfig,
        hasNextPhase: !!nextPhaseConfig,
      };
    }),

  /**
   * 评估是否需要退阶保护
   */
  assessRetreat: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      // 获取习惯和最近的日志
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
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

      // 转换日志数据格式
      const logData: RetreatLogData[] = habit.logs.map((log) => ({
        date: log.loggedAt,
        completed: log.completed,
        difficultyRating: log.difficultyRating ?? undefined,
        moodBefore: log.moodBefore ?? undefined,
        moodAfter: log.moodAfter ?? undefined,
        notes: log.notes ?? undefined,
      }));

      // 评估退阶需求
      const assessment = assessRetreatNeed(logData);

      // 获取阶段信息
      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];
      const currentPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase,
      );
      const previousPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase - 1,
      );

      return {
        ...assessment,
        currentPhase: habit.currentPhase,
        currentPhaseConfig,
        previousPhaseConfig,
        hasPreviousPhase: !!previousPhaseConfig,
      };
    }),

  /**
   * 执行进阶
   */
  advance: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];

      // 检查是否有下一阶段
      const nextPhase = phases.find((p) => p.phase === habit.currentPhase + 1);
      if (!nextPhase) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "已经是最高阶段",
        });
      }

      // 更新习惯阶段
      const updated = await ctx.db.habit.update({
        where: { id: input.habitId },
        data: {
          currentPhase: habit.currentPhase + 1,
        },
      });

      return {
        success: true,
        newPhase: updated.currentPhase,
        phaseConfig: nextPhase,
        message: `恭喜！你已进阶到「${nextPhase.name}」`,
      };
    }),

  /**
   * 执行退阶
   */
  retreat: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 检查是否可以退阶
      if (habit.currentPhase <= 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "已经是最低阶段",
        });
      }

      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];
      const previousPhase = phases.find(
        (p) => p.phase === habit.currentPhase - 1,
      );

      // 更新习惯阶段
      const updated = await ctx.db.habit.update({
        where: { id: input.habitId },
        data: {
          currentPhase: habit.currentPhase - 1,
        },
      });

      return {
        success: true,
        newPhase: updated.currentPhase,
        phaseConfig: previousPhase,
        message: previousPhase
          ? `已回到「${previousPhase.name}」，继续积累力量！`
          : "已退回上一阶段",
      };
    }),

  /**
   * 保存阶段路径到习惯
   */
  savePhasePath: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        phases: z.array(phaseConfigSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      // 保存阶段路径到 phases 字段
      await ctx.db.habit.update({
        where: { id: input.habitId },
        data: {
          phases: input.phases,
          currentPhase: 1, // 保存新路径时重置到阶段1
        },
      });

      return {
        success: true,
        message: "阶段路径已保存",
        totalPhases: input.phases.length,
      };
    }),

  /**
   * 获取进阶建议
   */
  getSuggestion: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findUnique({
        where: { id: input.habitId },
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

      const phases = (habit.phases as unknown as PhaseConfig[] | null) ?? [];
      const currentPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase,
      );
      const nextPhaseConfig = phases.find(
        (p) => p.phase === habit.currentPhase + 1,
      );

      if (!currentPhaseConfig) {
        return {
          recommendation: "STAY" as const,
          reason: "暂无阶段配置",
          encouragement: "继续保持你的习惯！",
        };
      }

      // 计算统计数据
      const recentLogs = habit.logs.slice(0, 7);
      const completedCount = recentLogs.filter((l) => l.completed).length;
      const completionRate =
        recentLogs.length > 0 ? completedCount / recentLogs.length : 0;

      const difficultyRatings = recentLogs
        .filter((l) => l.completed && l.difficultyRating !== null)
        .map((l) => l.difficultyRating!);
      const avgDifficulty =
        difficultyRatings.length > 0
          ? difficultyRatings.reduce((a, b) => a + b, 0) /
            difficultyRatings.length
          : 3;

      // 计算连续完成天数
      let consecutiveDays = 0;
      const sortedLogs = [...habit.logs].sort(
        (a, b) => b.loggedAt.getTime() - a.loggedAt.getTime(),
      );
      for (const log of sortedLogs) {
        if (log.completed) {
          consecutiveDays++;
        } else {
          break;
        }
      }

      const suggestion = await suggestNextPhase({
        habitName: habit.name,
        currentPhase: currentPhaseConfig,
        nextPhase: nextPhaseConfig,
        recentStats: {
          completionRate,
          avgDifficulty,
          consecutiveDays,
          wantToDoMore: false, // 可以从用户反馈中获取
        },
      });

      return suggestion;
    }),
});
