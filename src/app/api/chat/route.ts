/**
 * AI 对话流式端点
 * 处理习惯教练 AI 的对话请求
 */

import {
  streamText,
  convertToModelMessages,
  tool,
  type UIMessage,
  stepCountIs,
} from "ai";
import { z } from "zod";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { HABIT_COACH_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { model } from "@/lib/ai/model";

export async function POST(req: Request) {
  // 验证用户认证
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  // 解析请求体
  const requestSchema = z.object({
    messages: z.array(z.custom<UIMessage>()),
  });
  const { messages } = requestSchema.parse(await req.json());
  console.log("messages", JSON.stringify(messages, null, 2));
  console.log(
    " convertToModelMessages(messages)",
    JSON.stringify(convertToModelMessages(messages), null, 2),
  );
  // 创建流式响应
  const result = streamText({
    model,
    system: HABIT_COACH_SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    tools: {
      /**
       * 创建习惯工具
       * 当 AI 收集完所有必要信息后调用此工具创建习惯
       */
      createHabit: tool({
        
        description:
          "当收集完习惯信息后，创建习惯配置。需要包含名称、类型、动机、能力和提示信息。",
        inputSchema: z.object({
          name: z.string().describe("习惯名称"),
          type: z.enum(["BUILD", "BREAK"]).describe("养成(BUILD)或戒除(BREAK)"),
          category: z.string().optional().describe("习惯分类，如健康、学习、工作等"),
          motivation: z.object({
            primaryType: z
              .enum(["PLEASURE", "HOPE", "SOCIAL"])
              .describe("主要动机类型：愉悦(PLEASURE)、希望(HOPE)、社会认同(SOCIAL)"),
            deepReason: z.string().describe("深层原因：用户为什么想要这个习惯"),
            visionStatement: z
              .string()
              .describe("愿景声明：达成目标后的场景描述"),
            painPoints: z
              .array(z.string())
              .optional()
              .describe("痛点：当前困扰用户的问题"),
            motivationScore: z
              .number()
              .min(1)
              .max(10)
              .describe("当前动机强度 1-10"),
          }),
          ability: z.object({
            currentLevel: z.string().describe("当前水平：用户现在的状态"),
            targetLevel: z.string().describe("目标水平：用户想达到的状态"),
            microHabit: z
              .string()
              .describe("微习惯定义：2分钟内可完成的最小行动"),
            difficultyScore: z
              .number()
              .min(1)
              .max(10)
              .describe("预估难度 1-10"),
            barriers: z
              .array(z.string())
              .optional()
              .describe("障碍：可能阻碍完成的因素"),
            simplificationTips: z
              .array(z.string())
              .optional()
              .describe("简化建议：如何让习惯更容易执行"),
          }),
          prompt: z.object({
            anchorHabit: z
              .string()
              .describe("锚定习惯：新习惯附着的已有习惯"),
            triggerType: z
              .enum(["SIGNAL", "FACILITATOR", "SPARK"])
              .describe(
                "触发类型：信号型(SIGNAL)、便利型(FACILITATOR)、火花型(SPARK)"
              ),
            preferredTime: z.string().describe("偏好时间：最佳执行时间"),
            contextCues: z
              .array(z.string())
              .optional()
              .describe("情境线索：触发习惯的环境因素"),
            reminderStyle: z
              .enum(["GENTLE", "FIRM", "PLAYFUL"])
              .optional()
              .describe("提醒风格：温和(GENTLE)、坚定(FIRM)、有趣(PLAYFUL)"),
          }),
        }),
        execute: async (habitConfig) => {
          try {
            // 使用 Prisma 创建习惯
            const habit = await db.habit.create({
              data: {
                userId: userId,
                name: habitConfig.name,
                type: habitConfig.type,
                category: habitConfig.category,
                motivation: habitConfig.motivation,
                ability: habitConfig.ability,
                prompt: habitConfig.prompt,
              },
            });

            return {
              success: true,
              habitId: habit.id,
              habitName: habit.name,
              message: `习惯「${habit.name}」已成功创建！`,
            };
          } catch (error) {
            console.error("创建习惯失败:", error);
            return {
              success: false,
              error: "创建习惯时发生错误，请稍后重试。",
            };
          }
        },
      }),

      /**
       * 获取用户习惯列表工具
       * 用于 AI 了解用户当前的习惯情况
       */
      getUserHabits: tool({
        description: "获取用户当前的习惯列表，了解用户已有的习惯情况",
        inputSchema: z.object({
          status: z
            .enum(["ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"])
            .optional()
            .describe("按状态筛选习惯"),
        }),
        execute: async ({ status }) => {
          try {
            const habits = await db.habit.findMany({
              where: {
                userId: userId,
                ...(status && { status }),
              },
              select: {
                id: true,
                name: true,
                type: true,
                category: true,
                status: true,
                currentPhase: true,
                createdAt: true,
              },
              orderBy: { createdAt: "desc" },
            });

            return {
              success: true,
              habits: habits,
              count: habits.length,
            };
          } catch (error) {
            console.error("获取习惯列表失败:", error);
            return {
              success: false,
              error: "获取习惯列表时发生错误。",
            };
          }
        },
      }),

      /**
       * 记录打卡工具
       * 用于通过对话完成习惯打卡
       */
      logHabitCompletion: tool({
        description: "记录习惯完成情况（打卡）",
        inputSchema: z.object({
          habitId: z.string().describe("习惯ID"),
          completed: z.boolean().describe("是否完成"),
          difficultyRating: z
            .number()
            .min(1)
            .max(5)
            .optional()
            .describe("难度评分 1-5"),
          moodBefore: z
            .number()
            .min(1)
            .max(5)
            .optional()
            .describe("执行前情绪 1-5"),
          moodAfter: z
            .number()
            .min(1)
            .max(5)
            .optional()
            .describe("执行后情绪 1-5"),
          notes: z.string().optional().describe("备注"),
        }),
        execute: async ({
          habitId,
          completed,
          difficultyRating,
          moodBefore,
          moodAfter,
          notes,
        }) => {
          try {
            // 验证习惯属于当前用户
            const habit = await db.habit.findFirst({
              where: {
                id: habitId,
                userId: userId,
              },
            });

            if (!habit) {
              return {
                success: false,
                error: "未找到该习惯或无权限访问。",
              };
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 创建或更新今日打卡记录
            const log = await db.habitLog.upsert({
              where: {
                habitId_loggedAt: {
                  habitId: habitId,
                  loggedAt: today,
                },
              },
              update: {
                completed,
                completionTime: completed ? new Date() : null,
                difficultyRating,
                moodBefore,
                moodAfter,
                notes,
              },
              create: {
                habitId: habitId,
                userId: userId,
                loggedAt: today,
                completed,
                completionTime: completed ? new Date() : null,
                difficultyRating,
                moodBefore,
                moodAfter,
                notes,
              },
            });

            return {
              success: true,
              logId: log.id,
              habitName: habit.name,
              completed: log.completed,
              message: completed
                ? `太棒了！「${habit.name}」今日打卡成功！`
                : `已记录「${habit.name}」今日未完成。`,
            };
          } catch (error) {
            console.error("打卡失败:", error);
            return {
              success: false,
              error: "打卡时发生错误，请稍后重试。",
            };
          }
        },
      }),
    },
    // 最大步骤数，防止无限循环
    stopWhen : stepCountIs(5),
  });

  // 返回流式响应
  return result.toUIMessageStreamResponse();
}
