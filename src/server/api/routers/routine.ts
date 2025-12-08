/**
 * 日程管理 tRPC 路由
 * 处理日程清单、锚点匹配等功能
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { type Prisma } from "generated/prisma";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  extractRoutineActivities,
  matchAnchors,
  validateAnchor,
  suggestAnchorsFromRoutine,
  designPearlHabit,
  type RoutineActivity,
} from "@/lib/ai/anchor-matching";

// 活动 schema
const routineActivitySchema = z.object({
  name: z.string(),
  time: z.string().optional(),
  frequency: z.enum(["DAILY", "WEEKDAYS", "WEEKENDS", "OCCASIONAL"]),
  location: z.string().optional(),
  timeSlot: z.enum(["MORNING", "WORK", "EVENING", "NIGHT"]).optional(),
});

// 时段枚举
const timeSlotSchema = z.enum(["MORNING", "WORK", "EVENING", "NIGHT"]);

export const routineRouter = createTRPCRouter({
  /**
   * 获取用户的日程清单
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const routine = await ctx.db.dailyRoutine.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!routine) {
      return {
        MORNING: [],
        WORK: [],
        EVENING: [],
        NIGHT: [],
      };
    }

    // 从 JSON 转换为按时段分组的格式
    const activities = routine.activities as unknown as Array<
      RoutineActivity & { timeSlot?: string }
    >;

    const result: Record<string, RoutineActivity[]> = {
      MORNING: [],
      WORK: [],
      EVENING: [],
      NIGHT: [],
    };

    for (const activity of activities) {
      const slot = activity.timeSlot ?? "MORNING";
      if (result[slot]) {
        result[slot].push(activity);
      }
    }

    return result;
  }),

  /**
   * 保存某个时段的日程
   */
  saveTimeSlot: protectedProcedure
    .input(
      z.object({
        timeSlot: timeSlotSchema,
        activities: z.array(routineActivitySchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 获取现有数据
      const existing = await ctx.db.dailyRoutine.findUnique({
        where: { userId: ctx.session.user.id },
      });

      let allActivities: Array<RoutineActivity & { timeSlot?: string }> = [];

      if (existing) {
        allActivities = existing.activities as unknown as Array<
          RoutineActivity & { timeSlot?: string }
        >;
        // 移除该时段的现有活动
        allActivities = allActivities.filter(
          (a) => a.timeSlot !== input.timeSlot,
        );
      }

      // 添加新活动，带上时段标记
      const newActivities = input.activities.map((a) => ({
        ...a,
        timeSlot: input.timeSlot,
      }));
      allActivities.push(...newActivities);

      // 更新或创建
      return ctx.db.dailyRoutine.upsert({
        where: { userId: ctx.session.user.id },
        create: {
          userId: ctx.session.user.id,
          activities: allActivities as unknown as Prisma.InputJsonValue,
        },
        update: {
          activities: allActivities as unknown as Prisma.InputJsonValue,
        },
      });
    }),

  /**
   * 保存所有时段的日程
   */
  saveAll: protectedProcedure
    .input(
      z.object({
        routines: z.record(timeSlotSchema, z.array(routineActivitySchema)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 合并所有活动，添加时段标记
      const allActivities: Array<RoutineActivity & { timeSlot: string }> = [];

      for (const [timeSlot, activities] of Object.entries(input.routines)) {
        for (const activity of activities) {
          allActivities.push({
            ...activity,
            timeSlot,
          });
        }
      }

      await ctx.db.dailyRoutine.upsert({
        where: { userId: ctx.session.user.id },
        create: {
          userId: ctx.session.user.id,
          activities: allActivities as unknown as Prisma.InputJsonValue,
        },
        update: {
          activities: allActivities as unknown as Prisma.InputJsonValue,
        },
      });

      return { success: true };
    }),

  /**
   * AI 从文本中提取活动
   */
  extractActivities: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1).max(2000),
        timeSlot: timeSlotSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const activities = await extractRoutineActivities(
        input.text,
        input.timeSlot,
      );
      return activities;
    }),

  /**
   * AI 智能匹配锚点
   */
  matchAnchors: protectedProcedure
    .input(
      z.object({
        targetBehavior: z.string().min(1),
        targetFrequency: z.enum(["DAILY", "WEEKDAYS", "WEEKENDS"]).optional(),
        preferredTimeSlot: timeSlotSchema.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 获取用户的日程
      const routine = await ctx.db.dailyRoutine.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!routine) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "请先填写日程清单，才能进行锚点匹配",
        });
      }

      const allActivities = routine.activities as unknown as RoutineActivity[];

      if (allActivities.length === 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "请先填写日程清单，才能进行锚点匹配",
        });
      }

      const matches = await matchAnchors({
        targetBehavior: input.targetBehavior,
        targetFrequency: input.targetFrequency,
        preferredTimeSlot: input.preferredTimeSlot,
        routineActivities: allActivities,
      });

      return matches;
    }),

  /**
   * AI 验证锚点可靠性
   */
  validateAnchor: protectedProcedure
    .input(
      z.object({
        anchorBehavior: z.string().min(1),
        targetBehavior: z.string().min(1),
        context: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const validation = await validateAnchor({
        anchorBehavior: input.anchorBehavior,
        targetBehavior: input.targetBehavior,
        context: input.context,
      });

      return validation;
    }),

  /**
   * AI 从日程中建议最佳锚点
   */
  suggestFromRoutine: protectedProcedure
    .input(
      z.object({
        targetBehavior: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const routine = await ctx.db.dailyRoutine.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!routine) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "请先填写日程清单",
        });
      }

      // 按时段分组活动
      const activities = routine.activities as unknown as Array<
        RoutineActivity & { timeSlot?: string }
      >;

      const allActivities: Record<string, RoutineActivity[]> = {
        MORNING: [],
        WORK: [],
        EVENING: [],
        NIGHT: [],
      };

      for (const activity of activities) {
        const slot = activity.timeSlot ?? "MORNING";
        if (allActivities[slot]) {
          allActivities[slot].push(activity);
        }
      }

      const suggestion = await suggestAnchorsFromRoutine({
        targetBehavior: input.targetBehavior,
        allActivities,
      });

      return suggestion;
    }),

  /**
   * AI 设计珍珠习惯（将烦恼转化为正向提示）
   */
  designPearlHabit: protectedProcedure
    .input(
      z.object({
        annoyance: z.string().min(1),
        desiredOutcome: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await designPearlHabit({
        annoyance: input.annoyance,
        desiredOutcome: input.desiredOutcome,
      });

      return result;
    }),
});
