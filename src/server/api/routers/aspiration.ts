/**
 * 愿望管理 tRPC 路由
 * 处理愿望创建、行为探索、焦点地图等功能
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { type Prisma } from "generated/prisma";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generateBehaviorCluster,
  generateFocusMap,
  generateStarterStep,
  generateScaledBehavior,
  generateHabitRecipe,
} from "@/lib/ai/focus-map";

// 探索数据类型定义
interface ExplorationData {
  behaviors: Array<{
    name: string;
    description: string;
  }>;
  focusMap?: Array<{
    name: string;
    description: string;
    impactScore: number;
    feasibilityScore: number;
    quadrant: "GOLDEN" | "HIGH_IMPACT" | "EASY_WIN" | "AVOID";
    recommendation: string;
  }>;
  goldenBehavior?: {
    name: string;
    microVersion: string;
    reason: string;
  };
  summary?: string;
}

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
          status: "EXPLORING",
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

        // 存储到 explorationData
        const explorationData: ExplorationData = {
          behaviors: behaviors.map((name) => ({
            name,
            description: "",
          })),
        };

        await ctx.db.aspiration.update({
          where: { id: aspiration.id },
          data: {
            explorationData: explorationData as unknown as Prisma.InputJsonValue,
          },
        });

        return {
          aspirationId: aspiration.id,
          behaviors,
        };
      } catch (error) {
        console.log("err", error);
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

      const currentData = aspiration.explorationData as ExplorationData | null;
      if (!currentData?.behaviors?.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "请先生成行为集群",
        });
      }

      // 从已有数据中提取行为名称
      const behaviorNames = currentData.behaviors.map((b) => b.name);

      // 调用 AI 生成焦点地图
      const focusMapResult = await generateFocusMap(
        aspiration.clarified ?? aspiration.description,
        behaviorNames,
        input.userContext,
      );

      // 更新 explorationData
      const updatedData: ExplorationData = {
        ...currentData,
        focusMap: focusMapResult.behaviors,
        goldenBehavior: focusMapResult.goldenBehavior,
        summary: focusMapResult.summary,
      };

      await ctx.db.aspiration.update({
        where: { id: input.aspirationId },
        data: {
          explorationData: updatedData as unknown as Prisma.InputJsonValue,
        },
      });

      return focusMapResult;
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
   * 从愿望创建习惯（完整流程）
   */
  createHabitFromAspiration: protectedProcedure
    .input(
      z.object({
        aspirationId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        anchor: z.string(),
        behavior: z.string(),
        celebration: z.string().optional(),
        category: z.string().optional(),
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
          name: input.name,
          description: input.description,
          category: input.category ?? aspiration.category,
          anchor: input.anchor,
          behavior: input.behavior,
          celebration: input.celebration,
        },
      });

      // 更新愿望状态为进行中
      await ctx.db.aspiration.update({
        where: { id: input.aspirationId },
        data: { status: "ACTIVE" },
      });

      return habit;
    }),

  /**
   * 更新愿望状态
   */
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["EXPLORING", "ACTIVE", "ACHIEVED", "ABANDONED"]),
      }),
    )
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

      return ctx.db.aspiration.update({
        where: { id: input.id },
        data: {
          status: input.status,
          achievedAt: input.status === "ACHIEVED" ? new Date() : null,
        },
      });
    }),

  /**
   * 更新愿望进度
   */
  updateProgress: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        progress: z.number().min(0).max(100),
      }),
    )
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

      return ctx.db.aspiration.update({
        where: { id: input.id },
        data: {
          progress: input.progress,
          status: input.progress >= 100 ? "ACHIEVED" : aspiration.status,
          achievedAt: input.progress >= 100 ? new Date() : null,
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
