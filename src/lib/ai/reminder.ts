/**
 * 智能提醒生成模块
 * 基于福格行为模型生成个性化提醒
 */

import { generateObject } from "ai";
import { REMINDER_GENERATOR_PROMPT } from "./prompts";
import {
  type ReminderContext,
  reminderSchema,
  type Reminder,
} from "@/lib/types";
import { modelMini } from "./model";

/**
 * 根据用户动机水平和能力门槛决定提醒类型
 */
function determinePromptType(
  motivationLevel: number,
  recentRate: number
): "SIGNAL" | "FACILITATOR" | "SPARK" {
  // 动机高（>7）且完成率高（>70%）→ 信号型
  if (motivationLevel > 7 && recentRate > 70) {
    return "SIGNAL";
  }
  // 动机低（<5）→ 火花型（需要激励）
  if (motivationLevel < 5) {
    return "SPARK";
  }
  // 完成率低（<50%）→ 便利型（降低门槛）
  if (recentRate < 50) {
    return "FACILITATOR";
  }
  // 默认信号型
  return "SIGNAL";
}

/**
 * 生成个性化提醒
 * @param context 提醒上下文
 * @returns 生成的提醒内容
 */
export async function generateReminder(
  context: ReminderContext
): Promise<Reminder> {
  const suggestedType = determinePromptType(
    context.motivationLevel,
    context.recentRate
  );

  const prompt = `
用户习惯信息：
- 习惯名称：${context.habitName}
- 习惯类型：${context.habitType === "BUILD" ? "养成" : "戒除"}
- 动机类型：${context.motivationType}
- 当前动机水平：${context.motivationLevel}/10
- 连续完成天数：${context.streakDays}天
- 最近7天完成率：${context.recentRate}%
- 当前阶段：第${context.currentPhase}阶段
${context.lastCompletedAt ? `- 上次完成时间：${context.lastCompletedAt.toLocaleString()}` : "- 尚未开始"}

建议的提醒类型：${suggestedType}
${suggestedType === "SIGNAL" ? "（简单提醒即可，用户状态良好）" : ""}
${suggestedType === "FACILITATOR" ? "（需要降低门槛，强调微小行动）" : ""}
${suggestedType === "SPARK" ? "（需要激励，唤起动机和愿景）" : ""}

请生成一条个性化提醒。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: REMINDER_GENERATOR_PROMPT,
      prompt,
      schema: reminderSchema,
    });

    return object;
  } catch (error) {
    console.error("生成提醒失败:", error);
    // 返回默认提醒
    return {
      content: `是时候${context.habitType === "BUILD" ? "完成" : "注意"}「${context.habitName}」了！`,
      promptType: suggestedType,
      actionGuidance: "现在就开始吧，只需要2分钟。",
    };
  }
}

/**
 * 批量生成多个习惯的提醒
 */
export async function generateRemindersForHabits(
  contexts: ReminderContext[]
): Promise<Map<string, Reminder>> {
  const results = new Map<string, Reminder>();

  // 并行生成提醒
  const promises = contexts.map(async (context) => {
    const reminder = await generateReminder(context);
    results.set(context.habitId, reminder);
  });

  await Promise.all(promises);
  return results;
}

/**
 * 根据时间段生成不同风格的提醒
 */
export function getReminderStyle(hour: number): "GENTLE" | "FIRM" | "PLAYFUL" {
  if (hour >= 5 && hour < 9) {
    return "GENTLE"; // 早晨温和
  } else if (hour >= 9 && hour < 18) {
    return "FIRM"; // 工作时间坚定
  } else {
    return "PLAYFUL"; // 晚间有趣
  }
}
