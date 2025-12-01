/**
 * 日程管理 tRPC 路由
 * 处理日程清单、锚点匹配等 Phase 3 功能
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
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
});

// 时段枚举
const timeSlotSchema = z.enum(["MORNING", "WORK", "EVENING", "NIGHT"]);

export const routineRouter = createTRPCRouter({
  /**
   * 获取用户的日程清单
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const routines = await ctx.db.dailyRoutine.findMany({
      where: { userId: ctx.session.user.id },
    });

    // 转换为按时段分组的格式
    const result: Record<string, RoutineActivity[]> = {
      MORNING: [],
      WORK: [],
      EVENING: [],
      NIGHT: [],
    };

    for (const routine of routines) {
      result[routine.timeSlot] =
        routine.activities as unknown as RoutineActivity[];
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
      const routine = await ctx.db.dailyRoutine.upsert({
        where: {
          userId_timeSlot: {
            userId: ctx.session.user.id,
            timeSlot: input.timeSlot,
          },
        },
        create: {
          userId: ctx.session.user.id,
          timeSlot: input.timeSlot,
          activities: input.activities,
        },
        update: {
          activities: input.activities,
        },
      });

      return routine;
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
      const operations = Object.entries(input.routines).map(
        ([timeSlot, activities]) =>
          ctx.db.dailyRoutine.upsert({
            where: {
              userId_timeSlot: {
                userId: ctx.session.user.id,
                timeSlot: timeSlot as "MORNING" | "WORK" | "EVENING" | "NIGHT",
              },
            },
            create: {
              userId: ctx.session.user.id,
              timeSlot: timeSlot as "MORNING" | "WORK" | "EVENING" | "NIGHT",
              activities: activities,
            },
            update: {
              activities: activities,
            },
          }),
      );

      await ctx.db.$transaction(operations);
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
      // 获取用户的所有日程
      const routines = await ctx.db.dailyRoutine.findMany({
        where: { userId: ctx.session.user.id },
      });

      // 合并所有活动
      const allActivities: RoutineActivity[] = [];
      for (const routine of routines) {
        allActivities.push(
          ...(routine.activities as unknown as RoutineActivity[]),
        );
      }

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
      const routines = await ctx.db.dailyRoutine.findMany({
        where: { userId: ctx.session.user.id },
      });

      const allActivities: Record<string, RoutineActivity[]> = {
        MORNING: [],
        WORK: [],
        EVENING: [],
        NIGHT: [],
      };

      for (const routine of routines) {
        allActivities[routine.timeSlot] =
          routine.activities as unknown as RoutineActivity[];
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
