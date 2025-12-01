/**
 * 进阶分析 tRPC 路由
 * v1.5 热力图、情绪分析、风险预测
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateTimeHeatmapData,
  analyzeTimePatterns,
  analyzeMoodCorrelation,
  analyzeHabitCorrelations,
  predictBreakRisk,
} from "@/lib/ai/analytics";
import {
  analyzeTriggerPatterns,
  identifyTemporalPatterns,
  analyzeTriggersDeep,
  analyzeRelapse,
  generateInterruptionStrategies,
} from "@/lib/ai/break-habit";
import type { TriggerRecord, TriggerPatternType } from "@/lib/types";

export const analyticsRouter = createTRPCRouter({
  /**
   * 获取时间热力图数据
   */
  getTimeHeatmap: protectedProcedure
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
          habitId: true,
          loggedAt: true,
          completed: true,
          completionTime: true,
          durationMinutes: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return generateTimeHeatmapData(
        logs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        }))
      );
    }),

  /**
   * 获取时间模式分析
   */
  getTimePatterns: protectedProcedure
    .input(
      z.object({
        habitId: z.string().optional(),
        days: z.number().min(14).max(90).default(30),
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
          habitId: true,
          loggedAt: true,
          completed: true,
          completionTime: true,
          durationMinutes: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return analyzeTimePatterns(
        logs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        }))
      );
    }),

  /**
   * 获取情绪相关性分析
   */
  getMoodCorrelation: protectedProcedure
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
        select: {
          habitId: true,
          loggedAt: true,
          completed: true,
          completionTime: true,
          durationMinutes: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return analyzeMoodCorrelation(
        logs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        }))
      );
    }),

  /**
   * 获取习惯间相关性分析
   */
  getHabitCorrelations: protectedProcedure
    .input(
      z.object({
        days: z.number().min(14).max(90).default(30),
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
        },
      });

      if (habits.length < 2) {
        return { correlations: [], clusters: [], suggestions: [] };
      }

      const logs = await ctx.db.habitLog.findMany({
        where: {
          habitId: { in: habits.map((h) => h.id) },
          loggedAt: {
            gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          habitId: true,
          loggedAt: true,
          completed: true,
          completionTime: true,
          durationMinutes: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      return analyzeHabitCorrelations(
        habits,
        logs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        }))
      );
    }),

  /**
   * 获取习惯中断风险预测
   */
  getBreakRisk: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
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
          createdAt: true,
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
        },
        orderBy: { loggedAt: "desc" },
        take: 30,
        select: {
          habitId: true,
          loggedAt: true,
          completed: true,
          completionTime: true,
          durationMinutes: true,
          difficultyRating: true,
          moodBefore: true,
          moodAfter: true,
        },
      });

      // 计算连续天数
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const log of logs) {
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

      // 计算从开始到现在的天数
      const daysSinceStart = Math.floor(
        (Date.now() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      return predictBreakRisk(
        habit.name,
        logs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        })),
        currentStreak,
        daysSinceStart
      );
    }),

  /**
   * 获取综合分析仪表盘数据
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
        include: {
          logs: {
            where: {
              loggedAt: {
                gte: new Date(Date.now() - input.days * 24 * 60 * 60 * 1000),
              },
            },
            orderBy: { loggedAt: "desc" },
          },
          _count: {
            select: {
              logs: true,
            },
          },
        },
      });

      // 计算总体统计
      const allLogs = habits.flatMap((h) => h.logs);
      const totalLogs = allLogs.length;
      const completedLogs = allLogs.filter((l) => l.completed).length;
      const overallRate = totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0;

      // 生成热力图数据
      const heatmapData = generateTimeHeatmapData(
        allLogs.map((log) => ({
          habitId: log.habitId,
          loggedAt: log.loggedAt,
          completed: log.completed,
          completionTime: log.completionTime,
          durationMinutes: log.durationMinutes,
          difficultyRating: log.difficultyRating,
          moodBefore: log.moodBefore,
          moodAfter: log.moodAfter,
        }))
      );

      // 计算每个习惯的风险
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const riskAssessments = await Promise.all(
        habits.slice(0, 5).map(async (habit) => {
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

          const daysSinceStart = Math.floor(
            (Date.now() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          );

          const risk = await predictBreakRisk(
            habit.name,
            habit.logs.map((log) => ({
              habitId: log.habitId,
              loggedAt: log.loggedAt,
              completed: log.completed,
              completionTime: log.completionTime,
              durationMinutes: log.durationMinutes,
              difficultyRating: log.difficultyRating,
              moodBefore: log.moodBefore,
              moodAfter: log.moodAfter,
            })),
            currentStreak,
            daysSinceStart
          );
          return {
            habitId: habit.id,
            habitName: habit.name,
            ...risk,
          };
        })
      );

      return {
        summary: {
          totalHabits: habits.length,
          totalLogs,
          completedLogs,
          overallRate,
          periodDays: input.days,
        },
        heatmapData,
        riskAssessments,
        habits: habits.map((h) => ({
          id: h.id,
          name: h.name,
          type: h.type,
          completionRate:
            h.logs.length > 0
              ? Math.round(
                  (h.logs.filter((l) => l.completed).length / h.logs.length) * 100
                )
              : 0,
          totalLogs: h._count.logs,
        })),
      };
    }),

  /**
   * 获取触发模式分析（坏习惯戒除）
   */
  getTriggerAnalysis: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
          type: "BREAK",
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在或不是戒除型习惯",
        });
      }

      // 获取所有触发记录
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.habitId,
        },
        orderBy: { loggedAt: "desc" },
        take: 100,
      });

      // 解析触发记录
      const triggerRecords: TriggerRecord[] = [];
      for (const log of logs) {
        if (log.notes) {
          try {
            const data = JSON.parse(log.notes) as Partial<TriggerRecord>;
            if (data.triggerType && data.context) {
              triggerRecords.push({
                timestamp: log.loggedAt,
                triggerType: data.triggerType,
                context: data.context,
                location: data.location,
                emotion: data.emotion,
                intensity: data.intensity ?? log.difficultyRating ?? 5,
                resisted: log.completed,
                copingStrategy: data.copingStrategy,
              });
            }
          } catch {
            // 忽略解析错误
          }
        }
      }

      if (triggerRecords.length < 3) {
        return {
          analysis: null,
          stats: {
            totalRecords: triggerRecords.length,
            patternStats: [],
            temporalPatterns: null,
          },
        };
      }

      // 统计分析
      const patternStats = analyzeTriggerPatterns(triggerRecords);
      const temporalPatterns = identifyTemporalPatterns(triggerRecords);

      // AI 深度分析
      const analysis = await analyzeTriggersDeep(triggerRecords, habit.name);

      return {
        analysis,
        stats: {
          totalRecords: triggerRecords.length,
          patternStats,
          temporalPatterns,
        },
      };
    }),

  /**
   * 获取复发分析（坏习惯戒除）
   */
  getRelapseAnalysis: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
        targetDaysClean: z.number().min(1).default(7),
      })
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
          type: "BREAK",
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在或不是戒除型习惯",
        });
      }

      // 获取所有记录
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.habitId,
        },
        orderBy: { loggedAt: "asc" },
      });

      // 解析触发记录
      const triggerRecords: TriggerRecord[] = [];
      for (const log of logs) {
        if (log.notes) {
          try {
            const data = JSON.parse(log.notes) as Partial<TriggerRecord>;
            if (data.triggerType && data.context) {
              triggerRecords.push({
                timestamp: log.loggedAt,
                triggerType: data.triggerType,
                context: data.context,
                location: data.location,
                emotion: data.emotion,
                intensity: data.intensity ?? log.difficultyRating ?? 5,
                resisted: log.completed,
                copingStrategy: data.copingStrategy,
              });
            }
          } catch {
            // 忽略解析错误
          }
        }
      }

      // 复发分析
      const relapseAnalysis = analyzeRelapse(triggerRecords, input.targetDaysClean);

      // 计算抵抗率趋势
      const totalRecords = triggerRecords.length;
      const resistedRecords = triggerRecords.filter((r) => r.resisted).length;
      const resistanceRate = totalRecords > 0 ? Math.round((resistedRecords / totalRecords) * 100) : 0;

      // 近7天抵抗率
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentRecords = triggerRecords.filter((r) => new Date(r.timestamp) > sevenDaysAgo);
      const recentResisted = recentRecords.filter((r) => r.resisted).length;
      const recentResistanceRate = recentRecords.length > 0 ? Math.round((recentResisted / recentRecords.length) * 100) : 0;

      // 计算变化
      const rateChange = recentRecords.length > 0 ? recentResistanceRate - resistanceRate : 0;

      // 阶段里程碑
      const milestones = [3, 7, 14, 21, 30, 60, 90].map((days) => ({
        days,
        reached: relapseAnalysis.daysSinceLastRelapse >= days,
      }));

      const nextMilestone = milestones.find((m) => !m.reached)?.days ?? null;

      return {
        ...relapseAnalysis,
        resistanceRate,
        recentResistanceRate,
        rateChange,
        streakProgress: {
          milestones,
          nextMilestone,
        },
      };
    }),

  /**
   * 获取环境设计建议（坏习惯戒除）
   */
  getEnvironmentDesign: protectedProcedure
    .input(
      z.object({
        habitId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const habit = await ctx.db.habit.findFirst({
        where: {
          id: input.habitId,
          userId: ctx.session.user.id,
          type: "BREAK",
        },
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "习惯不存在或不是戒除型习惯",
        });
      }

      // 获取触发记录
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habitId: input.habitId,
        },
        orderBy: { loggedAt: "desc" },
        take: 50,
      });

      // 解析触发记录
      const triggerRecords: TriggerRecord[] = [];
      for (const log of logs) {
        if (log.notes) {
          try {
            const data = JSON.parse(log.notes) as Partial<TriggerRecord>;
            if (data.triggerType && data.context) {
              triggerRecords.push({
                timestamp: log.loggedAt,
                triggerType: data.triggerType,
                context: data.context,
                location: data.location,
                emotion: data.emotion,
                intensity: data.intensity ?? log.difficultyRating ?? 5,
                resisted: log.completed,
                copingStrategy: data.copingStrategy,
              });
            }
          } catch {
            // 忽略解析错误
          }
        }
      }

      // 获取主要触发类型的策略
      const suggestions: { suggestion: string; reason?: string }[] = [];

      if (triggerRecords.length >= 3) {
        // AI 分析
        const analysis = await analyzeTriggersDeep(triggerRecords, habit.name);

        // 添加 AI 环境设计建议
        if (analysis.environmentDesign) {
          analysis.environmentDesign.forEach((design) => {
            suggestions.push({
              suggestion: design,
              reason: "基于你的触发模式分析",
            });
          });
        }

        // 基于触发类型添加针对性策略
        const patternStats = analyzeTriggerPatterns(triggerRecords);
        if (patternStats.length > 0) {
          const topPattern = patternStats[0]!;
          const strategies = generateInterruptionStrategies(topPattern.type);
          strategies.slice(0, 2).forEach((strategy) => {
            suggestions.push({
              suggestion: strategy,
              reason: `针对${topPattern.type === "TEMPORAL" ? "时间" : topPattern.type === "CONTEXTUAL" ? "情境" : topPattern.type === "EMOTIONAL" ? "情绪" : "行为"}触发模式`,
            });
          });
        }
      }

      return {
        suggestions,
        hasEnoughData: triggerRecords.length >= 3,
      };
    }),
});
