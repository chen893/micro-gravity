/**
 * 能力评估与任务拆解模块
 * 基于福格行为模型的能力链设计微习惯
 */

import { generateObject, Output } from "ai";
import { ABILITY_ANALYZER_PROMPT } from "./prompts";
import {
  taskBreakdownSchema,
  type TaskBreakdown,
  type PhaseConfig,
} from "@/lib/types";
import { modelMini } from "./model";

/**
 * 六维能力评估框架（福格模型）
 */
export interface AbilityDimensions {
  time: number; // 时间成本 1-10（10最难）
  money: number; // 金钱成本 1-10
  physical: number; // 体力要求 1-10
  mental: number; // 脑力要求 1-10
  socialDeviance: number; // 社会偏差 1-10
  nonRoutine: number; // 非常规性 1-10
}

/**
 * 习惯简化输入
 */
export interface HabitForBreakdown {
  name: string;
  type: "BUILD" | "BREAK";
  targetBehavior: string;
  currentLevel: string;
  targetLevel: string;
  barriers?: string[];
}

/**
 * 评估六维能力
 * 根据习惯描述评估各维度的难度
 */
export function assessAbilityDimensions(
  habit: HabitForBreakdown,
): AbilityDimensions {
  // 基础评估逻辑（实际可以用 AI 来做更精准的评估）
  const isBreakHabit = habit.type === "BREAK";

  // 默认中等难度
  const base: AbilityDimensions = {
    time: 5,
    money: 3,
    physical: 5,
    mental: 5,
    socialDeviance: 3,
    nonRoutine: 5,
  };

  // 根据习惯类型调整
  if (isBreakHabit) {
    base.mental += 2; // 戒除习惯需要更多意志力
    base.socialDeviance += 1; // 可能面临社交压力
  }

  // 根据障碍调整
  if (habit.barriers) {
    if (habit.barriers.some((b) => b.includes("时间"))) base.time += 2;
    if (habit.barriers.some((b) => b.includes("钱") || b.includes("费用")))
      base.money += 2;
    if (habit.barriers.some((b) => b.includes("累") || b.includes("体力")))
      base.physical += 2;
    if (habit.barriers.some((b) => b.includes("难") || b.includes("复杂")))
      base.mental += 2;
  }

  // 确保在1-10范围内
  return {
    time: Math.min(10, Math.max(1, base.time)),
    money: Math.min(10, Math.max(1, base.money)),
    physical: Math.min(10, Math.max(1, base.physical)),
    mental: Math.min(10, Math.max(1, base.mental)),
    socialDeviance: Math.min(10, Math.max(1, base.socialDeviance)),
    nonRoutine: Math.min(10, Math.max(1, base.nonRoutine)),
  };
}

/**
 * 计算综合难度分数
 */
export function calculateDifficultyScore(
  dimensions: AbilityDimensions,
): number {
  // 加权平均，时间和心理难度权重更高
  const weights = {
    time: 0.25,
    money: 0.1,
    physical: 0.15,
    mental: 0.25,
    socialDeviance: 0.1,
    nonRoutine: 0.15,
  };

  const score =
    dimensions.time * weights.time +
    dimensions.money * weights.money +
    dimensions.physical * weights.physical +
    dimensions.mental * weights.mental +
    dimensions.socialDeviance * weights.socialDeviance +
    dimensions.nonRoutine * weights.nonRoutine;

  return Math.round(score * 10) / 10;
}

/**
 * 生成默认阶段配置
 * 当 AI 生成失败时使用
 */
function generateDefaultPhases(habit: HabitForBreakdown): PhaseConfig[] {
  return [
    {
      phase: 1,
      name: "准备阶段",
      duration: "7天",
      microHabit: `准备${habit.name}所需的物品或环境`,
      successCriteria: "每天完成准备动作",
      difficultyScore: 2,
    },
    {
      phase: 2,
      name: "入门阶段",
      duration: "14天",
      microHabit: `进行2分钟的${habit.name}`,
      successCriteria: "每天至少2分钟",
      difficultyScore: 4,
    },
    {
      phase: 3,
      name: "基础阶段",
      duration: "21天",
      microHabit: `进行5-10分钟的${habit.name}`,
      successCriteria: "每天5-10分钟",
      difficultyScore: 5,
    },
    {
      phase: 4,
      name: "进阶阶段",
      duration: "持续",
      microHabit: habit.targetBehavior,
      successCriteria: "达到目标水平",
      difficultyScore: 7,
    },
  ];
}

/**
 * AI 智能任务拆解
 * 将复杂习惯拆解为渐进式微习惯
 */
export async function breakdownHabit(
  habit: HabitForBreakdown,
): Promise<TaskBreakdown> {
  const dimensions = assessAbilityDimensions(habit);
  const overallDifficulty = calculateDifficultyScore(dimensions);

  const prompt = `
习惯信息：
- 习惯名称：${habit.name}
- 习惯类型：${habit.type === "BUILD" ? "养成" : "戒除"}
- 目标行为：${habit.targetBehavior}
- 当前水平：${habit.currentLevel}
- 目标水平：${habit.targetLevel}
${habit.barriers ? `- 主要障碍：${habit.barriers.join("、")}` : ""}

能力评估：
- 时间成本：${dimensions.time}/10
- 金钱成本：${dimensions.money}/10
- 体力要求：${dimensions.physical}/10
- 脑力要求：${dimensions.mental}/10
- 社会偏差：${dimensions.socialDeviance}/10
- 非常规性：${dimensions.nonRoutine}/10
- 综合难度：${overallDifficulty}/10

请设计一个渐进式的习惯养成计划，遵循"2分钟规则"，确保第一阶段简单到不可能失败。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: ABILITY_ANALYZER_PROMPT,
      prompt,
      schema: taskBreakdownSchema,
    });

    return object;
  } catch (error) {
    console.error("任务拆解失败:", error);
    // 返回默认拆解
    return {
      analysis: `当前综合难度评估为 ${overallDifficulty}/10，建议从微小行动开始。`,
      phases: generateDefaultPhases(habit),
      tips: [
        "从最小的行动开始，不要追求完美",
        "将新习惯与已有习惯绑定",
        "准备好所需物品，降低启动摩擦",
      ],
    };
  }
}

/**
 * 评估当前阶段是否应该升级
 */
export interface PhaseEvaluationResult {
  shouldUpgrade: boolean;
  readinessScore: number; // 0-100
  reasons: string[];
  recommendation: string;
}

export function evaluatePhaseReadiness(
  currentPhase: number,
  phases: PhaseConfig[],
  recentLogs: Array<{ completed: boolean; difficultyRating?: number | null }>,
  daysInCurrentPhase: number,
): PhaseEvaluationResult {
  const phase = phases.find((p) => p.phase === currentPhase);
  if (!phase) {
    return {
      shouldUpgrade: false,
      readinessScore: 0,
      reasons: ["未找到当前阶段配置"],
      recommendation: "请检查阶段配置",
    };
  }

  const reasons: string[] = [];
  let readinessScore = 0;

  // 1. 完成率评估 (40分)
  const completionRate =
    recentLogs.length > 0
      ? recentLogs.filter((log) => log.completed).length / recentLogs.length
      : 0;

  if (completionRate >= 0.9) {
    readinessScore += 40;
    reasons.push("完成率优秀 (90%+)");
  } else if (completionRate >= 0.8) {
    readinessScore += 30;
    reasons.push("完成率良好 (80%+)");
  } else if (completionRate >= 0.7) {
    readinessScore += 20;
    reasons.push("完成率一般 (70%+)");
  } else {
    reasons.push(`完成率较低 (${Math.round(completionRate * 100)}%)`);
  }

  // 2. 难度适应评估 (30分)
  const difficulties = recentLogs
    .map((log) => log.difficultyRating)
    .filter((r): r is number => r !== null && r !== undefined);

  if (difficulties.length > 0) {
    const avgDifficulty =
      difficulties.reduce((a, b) => a + b, 0) / difficulties.length;

    if (avgDifficulty <= 2) {
      readinessScore += 30;
      reasons.push("感觉很轻松");
    } else if (avgDifficulty <= 3) {
      readinessScore += 20;
      reasons.push("难度适中");
    } else if (avgDifficulty <= 4) {
      readinessScore += 10;
      reasons.push("有一定挑战");
    } else {
      reasons.push("当前阶段仍有难度");
    }
  }

  // 3. 持续时间评估 (30分)
  const suggestedDays = parseInt(phase.duration) || 7;

  if (daysInCurrentPhase >= suggestedDays * 1.5) {
    readinessScore += 30;
    reasons.push(`已超过建议时长 (${daysInCurrentPhase}天)`);
  } else if (daysInCurrentPhase >= suggestedDays) {
    readinessScore += 20;
    reasons.push(`已达到建议时长 (${daysInCurrentPhase}天)`);
  } else {
    const remaining = suggestedDays - daysInCurrentPhase;
    reasons.push(`距建议时长还有 ${remaining} 天`);
  }

  // 判断是否应该升级
  const shouldUpgrade = readinessScore >= 70 && daysInCurrentPhase >= 7;

  // 生成建议
  let recommendation: string;
  if (shouldUpgrade) {
    const nextPhase = phases.find((p) => p.phase === currentPhase + 1);
    recommendation = nextPhase
      ? `建议升级到第${currentPhase + 1}阶段：${nextPhase.name}`
      : "恭喜！你已完成所有阶段，可以设定新目标了";
  } else if (readinessScore >= 50) {
    recommendation = "再坚持几天，保持当前节奏";
  } else {
    recommendation = "建议继续巩固当前阶段，不急于升级";
  }

  return {
    shouldUpgrade,
    readinessScore,
    reasons,
    recommendation,
  };
}

/**
 * 获取简化建议
 * 当用户感觉困难时提供简化策略
 */
export function getSimplificationTips(dimensions: AbilityDimensions): string[] {
  const tips: string[] = [];

  if (dimensions.time > 6) {
    tips.push("将任务时间缩短到2分钟以内");
    tips.push("选择最方便的时间段执行");
  }

  if (dimensions.physical > 6) {
    tips.push("从最轻松的动作开始");
    tips.push("可以坐着或躺着完成也算");
  }

  if (dimensions.mental > 6) {
    tips.push("准备好清单或模板，减少思考");
    tips.push("在精力最好的时候执行");
  }

  if (dimensions.nonRoutine > 6) {
    tips.push("将新习惯绑定到已有的日常习惯上");
    tips.push("设置固定的时间和地点");
  }

  if (dimensions.socialDeviance > 6) {
    tips.push("找到志同道合的伙伴");
    tips.push("在私人空间练习，减少社交压力");
  }

  if (tips.length === 0) {
    tips.push("当前习惯难度适中，保持节奏即可");
  }

  return tips;
}
