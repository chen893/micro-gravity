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
import { getHabitCoachPrompt } from "@/lib/ai/prompts";
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
    aspirationId: z.string().nullable().optional(),
    goldenBehavior: z.string().nullable().optional(),
  });
  const { messages, aspirationId, goldenBehavior } = requestSchema.parse(
    await req.json(),
  );
  console.log("messages", JSON.stringify(messages, null, 2));
  console.log(
    " convertToModelMessages(messages)",
    JSON.stringify(convertToModelMessages(messages), null, 2),
  );
  console.log("aspirationId:", aspirationId);
  console.log("goldenBehavior:", goldenBehavior);

  // 根据是否有黄金行为选择不同的系统提示词
  const systemPrompt = getHabitCoachPrompt(goldenBehavior);

  // 创建流式响应
  const result = streamText({
    model,
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningEffort: "none",
      },
    },
    tools: {
      /**
       * 创建习惯工具
       * 使用简化的 abc 配方：Anchor + Behavior + Celebration
       */
      createHabit: tool({
        description:
          "当收集完习惯信息后，创建习惯配置。使用 abc 配方：锚点 + 微行为 + 庆祝。",
        inputSchema: z.object({
          name: z.string().describe("习惯名称"),
          type: z.enum(["BUILD", "BREAK"]).describe("养成(BUILD)或戒除(BREAK)"),
          description: z.string().optional().describe("习惯描述"),
          category: z
            .string()
            .optional()
            .describe("习惯分类，如健康、学习、工作等"),
          anchor: z
            .string()
            .describe("锚点习惯：新习惯附着的已有习惯，如「刷完牙后」"),
          behavior: z
            .string()
            .describe("微行为：2分钟内可完成的最小行动，如「做2个俯卧撑」"),
          celebration: z
            .string()
            .optional()
            .describe("庆祝方式：完成后的即时庆祝，如「对自己说太棒了」"),
          aspirationId: z.string().optional().describe("关联的愿望ID"),
        }),
        execute: async (habitConfig) => {
          try {
            // 使用 Prisma 创建习惯
            const habit = await db.habit.create({
              data: {
                userId: userId,
                name: habitConfig.name,
                type: habitConfig.type,
                description: habitConfig.description,
                category: habitConfig.category,
                anchor: habitConfig.anchor,
                behavior: habitConfig.behavior,
                celebration: habitConfig.celebration,
                aspirationId: habitConfig.aspirationId ?? aspirationId,
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
            .enum(["ACTIVE", "PAUSED", "GRADUATED", "ARCHIVED"])
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
                anchor: true,
                behavior: true,
                celebration: true,
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
          completionLevel: z
            .enum(["MINIMUM", "STANDARD", "EXCEEDED"])
            .optional()
            .describe(
              "完成程度：最小(MINIMUM)、标准(STANDARD)、超额(EXCEEDED)",
            ),
          actualBehavior: z.string().optional().describe("实际执行的行为"),
          wantedMore: z.boolean().optional().describe("是否想做更多"),
          feltEasy: z.boolean().optional().describe("是否感觉轻松"),
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
          note: z.string().optional().describe("备注"),
        }),
        execute: async ({
          habitId,
          completed,
          completionLevel,
          actualBehavior,
          wantedMore,
          feltEasy,
          moodBefore,
          moodAfter,
          note,
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
                completionLevel: completionLevel ?? "STANDARD",
                actualBehavior,
                wantedMore,
                feltEasy,
                moodBefore,
                moodAfter,
                note,
              },
              create: {
                habitId: habitId,
                userId: userId,
                loggedAt: today,
                completed,
                completionLevel: completionLevel ?? "STANDARD",
                actualBehavior,
                wantedMore,
                feltEasy,
                moodBefore,
                moodAfter,
                note,
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
    stopWhen: stepCountIs(5),
  });

  // 返回流式响应
  return result.toUIMessageStreamResponse();
}
