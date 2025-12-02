/**
 * 习惯繁殖模块
 * 基于福格行为模型的习惯繁殖机制
 *
 * 核心理念：
 * - 稳定的习惯可以"繁殖"出相关的新习惯
 * - 利用已建立的锚点和动力
 * - 渐进式扩展习惯网络
 *
 * 繁殖类型：
 * - 生长类：在原习惯基础上扩展（如：2分钟冥想 → 5分钟冥想）
 * - 繁殖类：衍生出相关新习惯（如：晨跑 → 拉伸运动）
 */

import { generateObject } from "ai";
import { z } from "zod";
import { modelMini } from "@/lib/ai/model";

// 繁殖类型
export type ProliferationType = "GROWTH" | "SPAWN";

// 习惯稳定性评估结果
export interface HabitStability {
  isStable: boolean;
  stabilityScore: number; // 0-100
  factors: {
    completionRate: number;
    consecutiveDays: number;
    avgDifficulty: number;
    emotionalBalance: number; // 正面情绪比例
  };
  readyForProliferation: boolean;
  recommendation: string;
}

// 繁殖建议
export interface ProliferationSuggestion {
  type: ProliferationType;
  title: string;
  description: string;
  microHabit: string;
  anchor: string; // 锚点习惯
  estimatedDifficulty: number; // 1-10
  reason: string;
}

// AI 繁殖建议 schema
const proliferationSuggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      type: z.enum(["GROWTH", "SPAWN"]),
      title: z.string().describe("新习惯标题"),
      description: z.string().describe("习惯描述"),
      microHabit: z.string().describe("微习惯版本（2分钟内）"),
      anchor: z.string().describe("建议的锚点习惯"),
      estimatedDifficulty: z.number().min(1).max(10),
      reason: z.string().describe("为什么推荐这个习惯"),
    })
  ),
  overallRecommendation: z.string().describe("总体建议"),
});

export type ProliferationSuggestionsResult = z.infer<
  typeof proliferationSuggestionsSchema
>;

/**
 * 评估习惯稳定性
 * 判断习惯是否足够稳定，可以进行繁殖
 */
export function assessHabitStability(data: {
  completionRate: number; // 最近14天完成率
  consecutiveDays: number; // 当前连续天数
  avgDifficulty: number; // 平均难度评分
  positiveEmotionRate: number; // 正面情绪比例
  totalDays: number; // 习惯总天数
}): HabitStability {
  const {
    completionRate,
    consecutiveDays,
    avgDifficulty,
    positiveEmotionRate,
    totalDays,
  } = data;

  // 计算稳定性分数（加权）
  const completionScore = Math.min(completionRate * 100, 100) * 0.4;
  const streakScore = Math.min(consecutiveDays / 14, 1) * 100 * 0.25;
  const difficultyScore =
    avgDifficulty <= 2 ? 100 : avgDifficulty <= 3 ? 80 : avgDifficulty <= 4 ? 50 : 20;
  const emotionScore = positiveEmotionRate * 100 * 0.15;

  const stabilityScore = Math.round(
    completionScore + streakScore + difficultyScore * 0.2 + emotionScore
  );

  // 繁殖条件：
  // 1. 完成率 >= 80%
  // 2. 连续天数 >= 7
  // 3. 平均难度 <= 3（感觉轻松）
  // 4. 总天数 >= 14（至少两周）
  const readyForProliferation =
    completionRate >= 0.8 &&
    consecutiveDays >= 7 &&
    avgDifficulty <= 3 &&
    totalDays >= 14;

  let recommendation: string;
  if (readyForProliferation) {
    recommendation =
      "这个习惯已经很稳定了！你可以考虑扩展它或者尝试相关的新习惯。";
  } else if (completionRate < 0.8) {
    recommendation =
      "先专注于提高完成率，让当前习惯更稳固。不急着扩展。";
  } else if (avgDifficulty > 3) {
    recommendation =
      "当前习惯还有些挑战性，建议先让它变得更轻松再考虑扩展。";
  } else if (totalDays < 14) {
    recommendation =
      "再坚持几天，让习惯更加稳固后再考虑扩展。";
  } else {
    recommendation = "继续保持当前习惯，等它更稳定后再考虑繁殖。";
  }

  return {
    isStable: stabilityScore >= 70,
    stabilityScore,
    factors: {
      completionRate,
      consecutiveDays,
      avgDifficulty,
      emotionalBalance: positiveEmotionRate,
    },
    readyForProliferation,
    recommendation,
  };
}

/**
 * 生成习惯繁殖建议
 */
export async function generateProliferationSuggestions(input: {
  habitName: string;
  habitDescription?: string;
  category?: string;
  currentPhase: number;
  totalPhases: number;
  stabilityScore: number;
  userGoals?: string;
}): Promise<ProliferationSuggestionsResult> {
  try {
    const { object } = await generateObject({
      model: modelMini,
      schema: proliferationSuggestionsSchema,
      prompt: `你是一位专业的习惯养成教练，擅长帮助用户扩展习惯网络。

用户当前的稳定习惯：
- 习惯名称：${input.habitName}
${input.habitDescription ? `- 描述：${input.habitDescription}` : ""}
${input.category ? `- 类别：${input.category}` : ""}
- 当前阶段：${input.currentPhase}/${input.totalPhases}
- 稳定性评分：${input.stabilityScore}/100

${input.userGoals ? `用户的目标：${input.userGoals}` : ""}

请基于这个稳定习惯，提供2-3个繁殖建议：

1. 生长类（GROWTH）：在原习惯基础上适度扩展
   - 比如：增加时长、提高强度、增加频率
   - 注意：扩展幅度要小，保持可持续性

2. 繁殖类（SPAWN）：衍生出相关的新习惯
   - 比如：利用相同的锚点时间
   - 或者：利用相同的动机来源
   - 或者：形成习惯堆叠

要求：
- 每个建议都要包含具体的微习惯版本（2分钟内可完成）
- 建议的锚点习惯要明确
- 难度评分要合理（1-10）
- 解释为什么推荐这个习惯

语气要鼓励性的，让用户感到扩展习惯是自然而然的事情。`,
    });

    return object;
  } catch (error) {
    console.error("习惯繁殖建议生成失败:", error);
    throw new Error(
      `无法生成习惯繁殖建议: ${error instanceof Error ? error.message : "未知错误"}`
    );
  }
}

/**
 * 判断是否应该提示用户进行习惯繁殖
 */
export function shouldPromptProliferation(data: {
  stabilityScore: number;
  daysSinceLastPrompt?: number;
  userDismissedCount?: number;
}): boolean {
  const { stabilityScore, daysSinceLastPrompt = 999, userDismissedCount = 0 } = data;

  // 条件：
  // 1. 稳定性分数 >= 80
  // 2. 距离上次提示至少 7 天
  // 3. 用户没有连续拒绝超过 3 次
  return (
    stabilityScore >= 80 &&
    daysSinceLastPrompt >= 7 &&
    userDismissedCount < 3
  );
}
