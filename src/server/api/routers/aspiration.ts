/**
 * 愿望管理 tRPC 路由
 * 处理愿望创建、行为集群生成、焦点地图等 Phase 2 功能
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateBehaviorCluster,
  generateFocusMap,
  generateStarterStep,
  generateScaledBehavior,
  generateHabitRecipe,
} from "@/lib/ai/focus-map";
import { analyzeDemotivators } from "@/lib/ai/demotivator-analysis";

// 行为评估 schema (保留用于未来验证)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _behaviorAssessmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  impactScore: z.number().min(1).max(10),
  feasibilityScore: z.number().min(1).max(10),
  quadrant: z.enum(["GOLDEN", "HIGH_IMPACT", "EASY_WIN", "AVOID"]),
  recommendation: z.string(),
  isSelected: z.boolean().optional(),
});

export const aspirationRouter = createTRPCRouter({
  /**
   * 创建新愿望
   */
  create: protectedProcedure
    .input(
      z.object({
        description: z.string().min(1).max(500),
        category: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const aspiration = await ctx.db.aspiration.create({
        data: {
          userId: ctx.session.user.id,
          description: input.description,
          category: input.category,
        },
      });

      return aspiration;
    }),

  /**
   * 获取用户所有愿望
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const aspirations = await ctx.db.aspiration.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: {
            habits: true,
            behaviorClusters: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return aspirations;
  }),

  /**
   * 获取单个愿望详情
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const aspiration = await ctx.db.aspiration.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          behaviorClusters: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          habits: {
            where: { status: "ACTIVE" },
          },
        },
      });

      if (!aspiration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      return aspiration;
    }),

  /**
   * 更新愿望（明确化）
   */
  clarify: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        clarified: z.string().min(1).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.aspiration.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      return ctx.db.aspiration.update({
        where: { id: input.id },
        data: { clarified: input.clarified },
      });
    }),

  /**
   * 生成行为集群（魔法棒探索）
   */
  generateBehaviors: protectedProcedure
    .input(z.object({ aspirationId: z.string() }))
    .mutation(async ({ ctx, input }) => {

      try {


      const aspiration = await ctx.db.aspiration.findFirst({
        where: {
          id: input.aspirationId,
          userId: ctx.session.user.id,
        },
      });

      if (!aspiration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      // 调用 AI 生成行为列表
      const behaviors = await generateBehaviorCluster(
        aspiration.description,
        aspiration.clarified ?? undefined,
      );

      // 创建行为集群记录
      const cluster = await ctx.db.behaviorCluster.create({
        data: {
          aspirationId: aspiration.id,
          behaviors: behaviors.map((name) => ({
            name,
            description: "",
            impactScore: 0,
            feasibilityScore: 0,
            quadrant: "AVOID" as const,
            isSelected: false,
          })),
        },
      });


      return {
        clusterId: cluster.id,
        behaviors,
      };
            }
            catch(error) {
              console.log('err', error)
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "生成行为集群失败",
              });
            }
    }),

  /**
   * 生成焦点地图（评估行为）
   */
  generateFocusMap: protectedProcedure
    .input(
      z.object({
        aspirationId: z.string(),
        clusterId: z.string(),
        userContext: z
          .object({
            currentAbility: z.string().optional(),
            timeConstraints: z.string().optional(),
            environment: z.string().optional(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const aspiration = await ctx.db.aspiration.findFirst({
        where: {
          id: input.aspirationId,
          userId: ctx.session.user.id,
        },
      });

      if (!aspiration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      const cluster = await ctx.db.behaviorCluster.findFirst({
        where: {
          id: input.clusterId,
          aspirationId: input.aspirationId,
        },
      });

      if (!cluster) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "行为集群不存在",
        });
      }

      // 从集群中提取行为名称
      const behaviorsData = cluster.behaviors as Array<{ name: string }>;
      const behaviorNames = behaviorsData.map((b) => b.name);

      // 调用 AI 生成焦点地图
      const focusMapResult = await generateFocusMap(
        aspiration.clarified ?? aspiration.description,
        behaviorNames,
        input.userContext,
      );

      // 更新行为集群数据
      await ctx.db.behaviorCluster.update({
        where: { id: input.clusterId },
        data: {
          behaviors: focusMapResult.behaviors.map((b) => ({
            ...b,
            isSelected: false,
          })),
          focusMapData: {
            goldenBehavior: focusMapResult.goldenBehavior,
            summary: focusMapResult.summary,
          },
          aiSuggestions: focusMapResult.summary,
        },
      });

      return focusMapResult;
    }),

  /**
   * 选择黄金行为
   */
  selectBehavior: protectedProcedure
    .input(
      z.object({
        clusterId: z.string(),
        behaviorName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cluster = await ctx.db.behaviorCluster.findFirst({
        where: {
          id: input.clusterId,
          aspiration: {
            userId: ctx.session.user.id,
          },
        },
        include: {
          aspiration: true,
        },
      });

      if (!cluster) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "行为集群不存在",
        });
      }

      // 更新选中状态
      const behaviorsData = cluster.behaviors as Array<{
        name: string;
        isSelected?: boolean;
      }>;
      const updatedBehaviors = behaviorsData.map((b) => ({
        ...b,
        isSelected: b.name === input.behaviorName,
      }));

      await ctx.db.behaviorCluster.update({
        where: { id: input.clusterId },
        data: { behaviors: updatedBehaviors },
      });

      return { success: true, selectedBehavior: input.behaviorName };
    }),

  /**
   * 生成入门步骤
   */
  generateStarterStep: protectedProcedure
    .input(
      z.object({
        behavior: z.string(),
        context: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await generateStarterStep(input.behavior, input.context);
      return result;
    }),

  /**
   * 生成缩小规模版本
   */
  generateScaledBehavior: protectedProcedure
    .input(
      z.object({
        behavior: z.string(),
        context: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await generateScaledBehavior(
        input.behavior,
        input.context,
      );
      return result;
    }),

  /**
   * 生成习惯配方
   */
  generateRecipe: protectedProcedure
    .input(
      z.object({
        behavior: z.string(),
        anchor: z.string(),
        celebration: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await generateHabitRecipe({
        behavior: input.behavior,
        anchor: input.anchor,
        celebration: input.celebration,
      });
      return result;
    }),

  /**
   * 分析去激励因素
   */
  analyzeDemotivators: protectedProcedure
    .input(
      z.object({
        habitName: z.string(),
        userConcerns: z.string(),
        pastAttempts: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await analyzeDemotivators({
        habitName: input.habitName,
        userConcerns: input.userConcerns,
        pastAttempts: input.pastAttempts,
      });
      return result;
    }),

  /**
   * 从愿望创建习惯（完整流程）
   */
  createHabitFromAspiration: protectedProcedure
    .input(
      z.object({
        aspirationId: z.string(),
        behaviorName: z.string(),
        behaviorDescription: z.string().optional(),
        easyStrategy: z.enum(["STARTER_STEP", "SCALE_DOWN"]),
        starterStep: z.string().optional(),
        scaledBehavior: z.string().optional(),
        recipeAnchor: z.string(),
        recipeBehavior: z.string(),
        recipeCelebration: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const aspiration = await ctx.db.aspiration.findFirst({
        where: {
          id: input.aspirationId,
          userId: ctx.session.user.id,
        },
      });

      if (!aspiration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      // 创建习惯
      const habit = await ctx.db.habit.create({
        data: {
          userId: ctx.session.user.id,
          aspirationId: input.aspirationId,
          type: "BUILD",
          name: input.behaviorName,
          description: input.behaviorDescription,
          easyStrategy: input.easyStrategy,
          starterStep: input.starterStep,
          scaledBehavior: input.scaledBehavior,
          recipeAnchor: input.recipeAnchor,
          recipeBehavior: input.recipeBehavior,
          recipeCelebration: input.recipeCelebration,
          // 默认 MAP 数据
          motivation: {
            primaryType: "INTRINSIC",
            deepReason: aspiration.clarified ?? aspiration.description,
            visionStatement: `实现「${aspiration.description}」的愿望`,
            motivationScore: 7,
          },
          ability: {
            currentLevel: 3,
            targetLevel: 8,
            microHabit: input.scaledBehavior ?? input.recipeBehavior,
            difficultyScore: 3,
          },
          prompt: {
            anchorHabit: input.recipeAnchor,
            triggerType: "EXISTING_HABIT",
            preferredTime: "ANY",
          },
        },
      });

      return habit;
    }),

  /**
   * 记录配方演练
   */
  recordRehearsal: protectedProcedure
    .input(z.object({ habitId: z.string() }))
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

      return ctx.db.habit.update({
        where: { id: input.habitId },
        data: {
          rehearsalCount: { increment: 1 },
          rehearsedAt: new Date(),
        },
      });
    }),

  /**
   * 删除愿望
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const aspiration = await ctx.db.aspiration.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!aspiration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "愿望不存在",
        });
      }

      await ctx.db.aspiration.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
