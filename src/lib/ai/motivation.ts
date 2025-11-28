/**
 * 动机维护引擎
 * 检测动机波动并生成个性化激励
 */

import { generateObject } from "ai";
import { MOTIVATION_ENGINE_PROMPT } from "./prompts";
import {
  type MotivationContext,
  motivationMessageSchema,
  type MotivationMessage,
} from "@/lib/types";
import { modelMini } from "./model";

/**
 * 动机状态类型
 */
export type MotivationState = "STRONG" | "NORMAL" | "DECLINING" | "CRITICAL";

/**
 * 打卡记录简化类型
 */
interface HabitLogSimple {
  loggedAt: Date;
  completed: boolean;
  difficultyRating?: number | null;
  moodBefore?: number | null;
  moodAfter?: number | null;
}

/**
 * 检测动机波动
 * 基于最近的打卡数据分析动机状态
 */
export function detectMotivationDip(
  logs: HabitLogSimple[],
  daysSinceStart: number
): MotivationState {
  if (logs.length === 0) {
    return daysSinceStart > 3 ? "CRITICAL" : "NORMAL";
  }

  // 计算最近7天的数据
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentLogs = logs.filter((log) => new Date(log.loggedAt) >= sevenDaysAgo);

  if (recentLogs.length === 0) {
    return "CRITICAL";
  }

  const completedCount = recentLogs.filter((log) => log.completed).length;
  const completionRate = completedCount / recentLogs.length;

  // 计算难度趋势
  const difficultyRatings = recentLogs
    .map((log) => log.difficultyRating)
    .filter((r): r is number => r !== null && r !== undefined);

  const avgDifficulty =
    difficultyRatings.length > 0
      ? difficultyRatings.reduce((a, b) => a + b, 0) / difficultyRatings.length
      : 3;

  // 计算情绪趋势
  const moodChanges = recentLogs
    .filter((log) => log.moodBefore !== null && log.moodAfter !== null)
    .map((log) => (log.moodAfter ?? 0) - (log.moodBefore ?? 0));

  const avgMoodChange =
    moodChanges.length > 0
      ? moodChanges.reduce((a, b) => a + b, 0) / moodChanges.length
      : 0;

  // 综合评估
  if (completionRate >= 0.8 && avgDifficulty <= 3 && avgMoodChange >= 0) {
    return "STRONG";
  }
  if (completionRate >= 0.5 && avgDifficulty <= 4) {
    return "NORMAL";
  }
  if (completionRate >= 0.3 || avgDifficulty <= 4) {
    return "DECLINING";
  }
  return "CRITICAL";
}

/**
 * 获取关键干预时机
 */
export function getInterventionTiming(daysSinceStart: number): string | null {
  const keyDays: Record<number, string> = {
    3: "新鲜感消退期 - 强调初心和为什么开始",
    7: "第一周里程碑 - 庆祝成就，建立信心",
    14: "倦怠高发期 - 重燃动力，回顾进步",
    21: "习惯初步形成 - 升级挑战，设定新目标",
    30: "月度里程碑 - 深度回顾，调整策略",
    66: "习惯巩固期 - 维持稳定，防止松懈",
    100: "百日里程碑 - 重大庆祝，展望未来",
  };

  return keyDays[daysSinceStart] ?? null;
}

/**
 * 根据动机状态选择激励类型
 */
function selectMotivationType(
  state: MotivationState,
  primaryMotivationType: string
): string {
  const stateStrategies: Record<MotivationState, string[]> = {
    STRONG: ["SOCIAL_PROOF", "HOPE_FUTURE"],
    NORMAL: ["PLEASURE_GAIN", "HOPE_FUTURE"],
    DECLINING: ["FEAR_LOSS", "PAIN_AVOID"],
    CRITICAL: ["PAIN_AVOID", "FEAR_LOSS"],
  };

  const strategies = stateStrategies[state];

  // 根据用户主要动机类型调整
  if (primaryMotivationType === "PLEASURE" && state !== "CRITICAL") {
    return "PLEASURE_GAIN";
  }
  if (primaryMotivationType === "HOPE") {
    return "HOPE_FUTURE";
  }
  if (primaryMotivationType === "SOCIAL") {
    return "SOCIAL_PROOF";
  }

  return strategies[0] ?? "HOPE_FUTURE";
}

/**
 * 生成动机激励内容
 */
export async function generateMotivation(
  context: MotivationContext
): Promise<MotivationMessage> {
  const interventionTiming = getInterventionTiming(context.daysSinceStart);
  const suggestedType = selectMotivationType(
    context.currentState,
    context.deepReason.includes("健康") ? "PLEASURE" : "HOPE"
  );

  const prompt = `
用户习惯信息：
- 习惯名称：${context.habitName}
- 深层原因：${context.deepReason}
- 愿景声明：${context.visionStatement}
- 连续完成天数：${context.streakDays}天
- 开始至今：${context.daysSinceStart}天
- 最近完成率：${context.recentCompletionRate}%
- 当前动机状态：${context.currentState}

${interventionTiming ? `关键时机：${interventionTiming}` : ""}

建议的激励类型：${suggestedType}

请生成一段能引发共鸣的激励内容。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: MOTIVATION_ENGINE_PROMPT,
      prompt,
      schema: motivationMessageSchema,
    });

    return object;
  } catch (error) {
    console.error("生成动机激励失败:", error);
    // 返回默认激励
    return {
      message: `你已经坚持了${context.streakDays}天！记住你的愿景：${context.visionStatement}。每一天的坚持都在让你更接近目标。`,
      motivationType: "HOPE_FUTURE",
      actionSuggestion: "现在就完成今天的习惯吧！",
    };
  }
}

/**
 * 计算动机分数
 * 基于多维度数据计算当前动机强度
 */
export function calculateMotivationScore(
  logs: HabitLogSimple[],
  daysSinceStart: number
): number {
  if (logs.length === 0) {
    return daysSinceStart > 7 ? 3 : 7; // 新习惯初始动机较高
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentLogs = logs.filter((log) => new Date(log.loggedAt) >= sevenDaysAgo);

  if (recentLogs.length === 0) {
    return 3;
  }

  // 完成率贡献 (0-4分)
  const completionRate =
    recentLogs.filter((log) => log.completed).length / recentLogs.length;
  const completionScore = completionRate * 4;

  // 情绪提升贡献 (0-3分)
  const moodChanges = recentLogs
    .filter((log) => log.moodBefore !== null && log.moodAfter !== null)
    .map((log) => (log.moodAfter ?? 0) - (log.moodBefore ?? 0));

  const avgMoodChange =
    moodChanges.length > 0
      ? moodChanges.reduce((a, b) => a + b, 0) / moodChanges.length
      : 0;
  const moodScore = Math.min(3, Math.max(0, avgMoodChange + 1.5));

  // 难度适应贡献 (0-3分)
  const difficulties = recentLogs
    .map((log) => log.difficultyRating)
    .filter((r): r is number => r !== null && r !== undefined);

  const avgDifficulty =
    difficulties.length > 0
      ? difficulties.reduce((a, b) => a + b, 0) / difficulties.length
      : 3;
  const difficultyScore = Math.max(0, 3 - (avgDifficulty - 2) * 0.75);

  const totalScore = Math.round(completionScore + moodScore + difficultyScore);
  return Math.min(10, Math.max(1, totalScore));
}

/**
 * 动机波动检测结果
 */
export interface MotivationAnalysis {
  currentScore: number;
  state: MotivationState;
  trend: "UP" | "STABLE" | "DOWN";
  interventionNeeded: boolean;
  interventionTiming: string | null;
  suggestedAction: string;
}

/**
 * 完整的动机分析
 */
export function analyzeMotivation(
  logs: HabitLogSimple[],
  daysSinceStart: number
): MotivationAnalysis {
  const currentScore = calculateMotivationScore(logs, daysSinceStart);
  const state = detectMotivationDip(logs, daysSinceStart);
  const interventionTiming = getInterventionTiming(daysSinceStart);

  // 计算趋势（比较最近3天和前3天）
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);

  const recentLogs = logs.filter((log) => new Date(log.loggedAt) >= threeDaysAgo);
  const olderLogs = logs.filter(
    (log) =>
      new Date(log.loggedAt) >= sixDaysAgo &&
      new Date(log.loggedAt) < threeDaysAgo
  );

  const recentRate =
    recentLogs.length > 0
      ? recentLogs.filter((log) => log.completed).length / recentLogs.length
      : 0;
  const olderRate =
    olderLogs.length > 0
      ? olderLogs.filter((log) => log.completed).length / olderLogs.length
      : 0;

  let trend: "UP" | "STABLE" | "DOWN" = "STABLE";
  if (recentRate - olderRate > 0.2) trend = "UP";
  else if (olderRate - recentRate > 0.2) trend = "DOWN";

  const interventionNeeded =
    state === "CRITICAL" ||
    state === "DECLINING" ||
    interventionTiming !== null;

  let suggestedAction = "继续保持当前状态";
  if (state === "CRITICAL") {
    suggestedAction = "建议降低习惯难度，重新建立信心";
  } else if (state === "DECLINING") {
    suggestedAction = "建议回顾初心，重温愿景";
  } else if (interventionTiming) {
    suggestedAction = interventionTiming;
  }

  return {
    currentScore,
    state,
    trend,
    interventionNeeded,
    interventionTiming,
    suggestedAction,
  };
}
