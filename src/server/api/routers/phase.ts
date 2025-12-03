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
import { parsePhaseConfigs, type PhaseConfigData } from "@/lib/utils";
import { ADVANCE_THRESHOLDS, TIME_RANGES } from "@/lib/constants";

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
      try {
        const result = await designPhasePath({
          targetHabit: input.targetHabit,
          userContext: input.userContext,
        });

        return result;
      } catch (error) {
        console.error("designPath error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "AI 生成阶段路径失败，请稍后重试",
        });
      }
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
      try {
        const result = await designQuickPath({
          targetHabit: input.targetHabit,
          targetDuration: input.targetDuration,
        });

        return result;
      } catch (error) {
        console.error("designQuickPath error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "AI 生成快速路径失败，请稍后重试",
        });
      }
    }),

  /**
   * 获取习惯的当前阶段信息
   */
  getCurrentPhase: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
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

      // 从 phases 字段中提取阶段信息（使用类型守卫安全解析）
      const phases = parsePhaseConfigs(habit.phases);
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
        currentPhaseConfig: currentPhaseConfig as PhaseConfig | undefined,
        nextPhaseConfig: nextPhaseConfig as PhaseConfig | undefined,
        totalPhases: phases.length,
        phases: phases as PhaseConfig[],
      };
    }),

  /**
   * 评估是否准备好进阶
   */
  assessAdvance: protectedProcedure
    .input(z.object({ habitId: z.string() }))
    .query(async ({ ctx, input }) => {
      // 获取习惯和最近的日志
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

      // 转换日志数据格式
      const logData: AdvanceLogData[] = habit.logs.map((log) => ({
        date: log.loggedAt,
        completed: log.completed,
        difficultyRating: log.difficultyRating ?? undefined,
        moodAfter: log.moodAfter ?? undefined,
        notes: log.notes ?? undefined,
        wantedToDoMore: log.wantedToDoMore ?? false, // 从数据库读取真实值
      }));

      // 评估进阶准备度
      const assessment = assessAdvanceReadiness(logData);

      // 获取阶段信息（使用类型守卫安全解析）
      const phases = parsePhaseConfigs(habit.phases);
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

      // 获取阶段信息（使用类型守卫安全解析）
      const phases = parsePhaseConfigs(habit.phases);
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
    .input(
      z.object({
        habitId: z.string(),
        reason: z.string().optional(),
        signals: z.array(z.string()).optional(),
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

      const phases = parsePhaseConfigs(habit.phases);

      // 检查是否有下一阶段
      const nextPhase = phases.find((p) => p.phase === habit.currentPhase + 1);
      if (!nextPhase) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "已经是最高阶段",
        });
      }

      // 创建阶段变更历史记录
      await ctx.db.phaseHistory.create({
        data: {
          habitId: input.habitId,
          fromPhase: habit.currentPhase,
          toPhase: habit.currentPhase + 1,
          changeType: "ADVANCE",
          reason: input.reason ?? "用户主动进阶",
          signals: input.signals,
        },
      });

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
    .input(
      z.object({
        habitId: z.string(),
        reason: z.string().optional(),
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

      // 检查是否可以退阶
      if (habit.currentPhase <= 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "已经是最低阶段",
        });
      }

      const phases = parsePhaseConfigs(habit.phases);
      const previousPhase = phases.find(
        (p) => p.phase === habit.currentPhase - 1,
      );

      // 创建阶段变更历史记录
      await ctx.db.phaseHistory.create({
        data: {
          habitId: input.habitId,
          fromPhase: habit.currentPhase,
          toPhase: habit.currentPhase - 1,
          changeType: "RETREAT",
          reason: input.reason ?? "用户主动退阶",
        },
      });

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

      const phases = parsePhaseConfigs(habit.phases);
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
      const recentLogs = habit.logs.slice(0, TIME_RANGES.RECENT_DAYS);
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

      // 计算最近是否有"想做更多"的反馈
      const wantToDoMoreCount = recentLogs.filter(
        (l) => l.completed && l.wantedToDoMore,
      ).length;
      const wantToDoMore = wantToDoMoreCount >= ADVANCE_THRESHOLDS.WANT_MORE_COUNT_READY;

      const suggestion = await suggestNextPhase({
        habitName: habit.name,
        currentPhase: currentPhaseConfig,
        nextPhase: nextPhaseConfig,
        recentStats: {
          completionRate,
          avgDifficulty,
          consecutiveDays,
          wantToDoMore,
        },
      });

      return suggestion;
    }),

  /**
   * 获取阶段变更历史
   */
  getPhaseHistory: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        limit: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
        },
        select: { id: true, name: true },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在",
        });
      }

      const history = await ctx.db.phaseHistory.findMany({
        where: { habitId: input.habitId },
        orderBy: { changedAt: "desc" },
        take: input.limit,
      });

      // 统计进阶和退阶次数
      const advanceCount = history.filter(
        (h) => h.changeType === "ADVANCE",
      ).length;
      const retreatCount = history.filter(
        (h) => h.changeType === "RETREAT",
      ).length;

      return {
        habitId: habit.id,
        habitName: habit.name,
        history,
        stats: {
          totalChanges: history.length,
          advanceCount,
          retreatCount,
        },
      };
    }),
});
