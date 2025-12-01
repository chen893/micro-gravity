/**
 * v1.5 进阶分析模块
 * 时间热力图、情绪关联、习惯关联、风险预测
 */

import { generateObject } from "ai";
import {
  TIME_HEATMAP_PROMPT,
  MOOD_CORRELATION_PROMPT,
  HABIT_CORRELATION_PROMPT,
  BREAK_RISK_PROMPT,
} from "./prompts";
import {
  timeHeatmapSchema,
  moodCorrelationSchema,
  habitCorrelationSchema,
  breakRiskSchema,
  type TimeHeatmap,
  type MoodCorrelation,
  type HabitCorrelation,
  type BreakRisk,
} from "@/lib/types";
import { modelMini } from "./model";

/**
 * 习惯日志简化类型
 */
interface HabitLogForAnalytics {
  habitId: string;
  loggedAt: Date;
  completed: boolean;
  completionTime?: Date | null;
  durationMinutes?: number | null;
  difficultyRating?: number | null;
  moodBefore?: number | null;
  moodAfter?: number | null;
}

// ============ 时间热力图分析 ============

/**
 * 生成时间热力图数据
 */
export function generateTimeHeatmapData(
  logs: HabitLogForAnalytics[]
): Array<{
  dayOfWeek: number;
  hourOfDay: number;
  completionRate: number;
  avgDuration: number | null;
  count: number;
}> {
  // 初始化7x24矩阵
  const matrix = new Map<
    string,
    { completed: number; total: number; durations: number[] }
  >();

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      matrix.set(`${day}-${hour}`, { completed: 0, total: 0, durations: [] });
    }
  }

  // 填充数据
  logs.forEach((log) => {
    const date = new Date(log.loggedAt);
    const day = date.getDay();
    const hour = log.completionTime
      ? new Date(log.completionTime).getHours()
      : date.getHours();

    const key = `${day}-${hour}`;
    const cell = matrix.get(key)!;
    cell.total++;
    if (log.completed) {
      cell.completed++;
      if (log.durationMinutes) {
        cell.durations.push(log.durationMinutes);
      }
    }
  });

  // 转换为结果数组
  const result: Array<{
    dayOfWeek: number;
    hourOfDay: number;
    completionRate: number;
    avgDuration: number | null;
    count: number;
  }> = [];

  matrix.forEach((cell, key) => {
    if (cell.total > 0) {
      const [day, hour] = key.split("-").map(Number);
      result.push({
        dayOfWeek: day!,
        hourOfDay: hour!,
        completionRate: Math.round((cell.completed / cell.total) * 100),
        avgDuration:
          cell.durations.length > 0
            ? Math.round(
                cell.durations.reduce((a, b) => a + b, 0) / cell.durations.length
              )
            : null,
        count: cell.total,
      });
    }
  });

  return result;
}

/**
 * AI 分析时间热力图
 */
export async function analyzeTimePatterns(
  logs: HabitLogForAnalytics[]
): Promise<TimeHeatmap> {
  const heatmapData = generateTimeHeatmapData(logs);

  // 找出最佳时间窗口（完成率最高的时段）
  const sortedByRate = [...heatmapData]
    .filter((cell) => cell.count >= 3)
    .sort((a, b) => b.completionRate - a.completionRate);

  const topCells = sortedByRate.slice(0, 5);

  const prompt = `
时间热力图数据（共${logs.length}条记录）：

高完成率时段：
${topCells
  .map(
    (cell) =>
      `- 周${cell.dayOfWeek === 0 ? "日" : cell.dayOfWeek} ${cell.hourOfDay}:00: ${cell.completionRate}% (${cell.count}次)`
  )
  .join("\n")}

低完成率时段：
${sortedByRate
  .slice(-3)
  .map(
    (cell) =>
      `- 周${cell.dayOfWeek === 0 ? "日" : cell.dayOfWeek} ${cell.hourOfDay}:00: ${cell.completionRate}% (${cell.count}次)`
  )
  .join("\n")}

请分析时间模式并给出优化建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: TIME_HEATMAP_PROMPT,
      prompt,
      schema: timeHeatmapSchema,
    });

    return object;
  } catch (error) {
    console.error("时间热力图分析失败:", error);
    // 返回基础分析
    return {
      heatmap: heatmapData.map((cell) => ({
        dayOfWeek: cell.dayOfWeek,
        hourOfDay: cell.hourOfDay,
        completionRate: cell.completionRate,
        avgDuration: cell.avgDuration ?? undefined,
      })),
      insights:
        topCells.length > 0
          ? [`最佳执行时段：周${topCells[0]!.dayOfWeek} ${topCells[0]!.hourOfDay}:00`]
          : ["数据不足，继续记录"],
      optimalWindows:
        topCells.length > 0
          ? [
              {
                dayOfWeek: topCells[0]!.dayOfWeek,
                startHour: topCells[0]!.hourOfDay,
                endHour: Math.min(23, topCells[0]!.hourOfDay + 2),
                reason: `历史完成率${topCells[0]!.completionRate}%`,
              },
            ]
          : [],
    };
  }
}

// ============ 情绪关联分析 ============

/**
 * 分析情绪与习惯的关联
 */
export async function analyzeMoodCorrelation(
  logs: HabitLogForAnalytics[]
): Promise<MoodCorrelation> {
  const logsWithMood = logs.filter(
    (log) => log.moodBefore !== null && log.moodAfter !== null
  );

  if (logsWithMood.length < 5) {
    return {
      beforeAfterCorrelation: {
        averageMoodBefore: 0,
        averageMoodAfter: 0,
        moodLift: 0,
        significance: "LOW",
      },
      moodTriggers: [],
      recommendations: ["需要更多带情绪记录的数据"],
    };
  }

  const avgBefore =
    logsWithMood.reduce((sum, log) => sum + (log.moodBefore ?? 0), 0) /
    logsWithMood.length;
  const avgAfter =
    logsWithMood.reduce((sum, log) => sum + (log.moodAfter ?? 0), 0) /
    logsWithMood.length;
  const moodLift = avgAfter - avgBefore;

  // 按初始情绪分组分析
  const lowMoodLogs = logsWithMood.filter((log) => (log.moodBefore ?? 0) <= 2);
  const highMoodLogs = logsWithMood.filter((log) => (log.moodBefore ?? 0) >= 4);

  const lowMoodCompletionRate =
    lowMoodLogs.length > 0
      ? lowMoodLogs.filter((log) => log.completed).length / lowMoodLogs.length
      : 0;
  const highMoodCompletionRate =
    highMoodLogs.length > 0
      ? highMoodLogs.filter((log) => log.completed).length / highMoodLogs.length
      : 0;

  const prompt = `
情绪关联数据（${logsWithMood.length}条有效记录）：

整体情绪变化：
- 习惯前平均情绪：${avgBefore.toFixed(1)}/5
- 习惯后平均情绪：${avgAfter.toFixed(1)}/5
- 情绪提升：${moodLift > 0 ? "+" : ""}${moodLift.toFixed(1)}

按初始情绪分析：
- 低情绪时完成率：${Math.round(lowMoodCompletionRate * 100)}% (${lowMoodLogs.length}次)
- 高情绪时完成率：${Math.round(highMoodCompletionRate * 100)}% (${highMoodLogs.length}次)

请分析情绪与习惯完成的关联，并给出建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: MOOD_CORRELATION_PROMPT,
      prompt,
      schema: moodCorrelationSchema,
    });

    return object;
  } catch (error) {
    console.error("情绪关联分析失败:", error);
    return {
      beforeAfterCorrelation: {
        averageMoodBefore: Math.round(avgBefore * 10) / 10,
        averageMoodAfter: Math.round(avgAfter * 10) / 10,
        moodLift: Math.round(moodLift * 10) / 10,
        significance: moodLift >= 0.5 ? "HIGH" : moodLift >= 0.2 ? "MEDIUM" : "LOW",
      },
      moodTriggers: [
        {
          trigger: "低情绪状态",
          impactOnCompletion: lowMoodCompletionRate - highMoodCompletionRate,
          frequency: lowMoodLogs.length,
        },
      ],
      recommendations:
        moodLift > 0
          ? ["习惯对情绪有积极影响，坚持下去！"]
          : ["考虑在情绪较好时执行习惯"],
    };
  }
}

// ============ 习惯关联分析 ============

/**
 * 分析多个习惯之间的关联
 */
export async function analyzeHabitCorrelations(
  habits: Array<{ id: string; name: string }>,
  logs: HabitLogForAnalytics[]
): Promise<HabitCorrelation> {
  if (habits.length < 2) {
    return {
      correlations: [],
      clusters: [],
      suggestions: [],
    };
  }

  // 按日期分组
  const dateMap = new Map<string, Map<string, boolean>>();

  logs.forEach((log) => {
    const dateKey = new Date(log.loggedAt).toISOString().split("T")[0]!;
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, new Map());
    }
    dateMap.get(dateKey)!.set(log.habitId, log.completed);
  });

  // 计算习惯对之间的相关性
  const correlations: Array<{
    habit1Id: string;
    habit2Id: string;
    bothCompleted: number;
    neitherCompleted: number;
    onlyFirst: number;
    onlySecond: number;
    total: number;
  }> = [];

  for (let i = 0; i < habits.length; i++) {
    for (let j = i + 1; j < habits.length; j++) {
      const habit1 = habits[i]!;
      const habit2 = habits[j]!;

      let bothCompleted = 0;
      let neitherCompleted = 0;
      let onlyFirst = 0;
      let onlySecond = 0;

      dateMap.forEach((dayLogs) => {
        const h1Done = dayLogs.get(habit1.id) ?? false;
        const h2Done = dayLogs.get(habit2.id) ?? false;

        if (h1Done && h2Done) bothCompleted++;
        else if (!h1Done && !h2Done) neitherCompleted++;
        else if (h1Done && !h2Done) onlyFirst++;
        else onlySecond++;
      });

      correlations.push({
        habit1Id: habit1.id,
        habit2Id: habit2.id,
        bothCompleted,
        neitherCompleted,
        onlyFirst,
        onlySecond,
        total: bothCompleted + neitherCompleted + onlyFirst + onlySecond,
      });
    }
  }

  // 计算相关系数
  const correlationResults = correlations.map((c) => {
    const total = c.total;
    if (total === 0) return { ...c, score: 0 };

    // 简化的相关性计算
    const agreement = (c.bothCompleted + c.neitherCompleted) / total;
    const score = agreement * 2 - 1; // 转换到 [-1, 1] 范围

    return { ...c, score };
  });

  const prompt = `
习惯关联分析（${habits.length}个习惯，${dateMap.size}天数据）：

习惯列表：
${habits.map((h) => `- ${h.name} (${h.id})`).join("\n")}

关联数据：
${correlationResults
  .map((c) => {
    const h1 = habits.find((h) => h.id === c.habit1Id)!;
    const h2 = habits.find((h) => h.id === c.habit2Id)!;
    return `- ${h1.name} ↔ ${h2.name}: 相关性${c.score > 0 ? "+" : ""}${(c.score * 100).toFixed(0)}%
    同时完成${c.bothCompleted}次，同时未完成${c.neitherCompleted}次`;
  })
  .join("\n")}

请分析习惯之间的关联，并给出习惯堆叠或分离的建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: HABIT_CORRELATION_PROMPT,
      prompt,
      schema: habitCorrelationSchema,
    });

    return object;
  } catch (error) {
    console.error("习惯关联分析失败:", error);
    // 返回基础分析
    return {
      correlations: correlationResults.map((c) => ({
        habit1Id: c.habit1Id,
        habit2Id: c.habit2Id,
        correlationScore: Math.round(c.score * 100) / 100,
        relationship: c.score > 0.3 ? "POSITIVE" : c.score < -0.3 ? "NEGATIVE" : "NEUTRAL",
        insight: c.score > 0.3 ? "这两个习惯经常一起完成" : "这两个习惯相对独立",
      })),
      clusters: [],
      suggestions: [],
    };
  }
}

// ============ 中断风险预测 ============

/**
 * 预测习惯中断风险
 */
export async function predictBreakRisk(
  habitName: string,
  logs: HabitLogForAnalytics[],
  currentStreak: number,
  daysSinceStart: number
): Promise<BreakRisk> {
  if (logs.length < 7) {
    return {
      overallRisk: "LOW",
      riskScore: 20,
      riskFactors: [
        {
          factor: "数据不足",
          weight: 0,
          currentStatus: "需要更多数据",
        },
      ],
      warningSignals: [],
      preventiveActions: [
        {
          action: "继续记录习惯数据",
          priority: "HIGH",
          expectedImpact: "建立基线数据",
        },
      ],
    };
  }

  // 计算风险指标
  const recentLogs = logs.slice(-14); // 最近两周
  const olderLogs = logs.slice(-28, -14); // 之前两周

  // 1. 完成率变化
  const recentRate =
    recentLogs.filter((log) => log.completed).length / recentLogs.length;
  const olderRate =
    olderLogs.length > 0
      ? olderLogs.filter((log) => log.completed).length / olderLogs.length
      : recentRate;
  const rateTrend = recentRate - olderRate;

  // 2. 难度趋势
  const recentDifficulties = recentLogs
    .map((log) => log.difficultyRating)
    .filter((d): d is number => d !== null && d !== undefined);
  const avgRecentDifficulty =
    recentDifficulties.length > 0
      ? recentDifficulties.reduce((a, b) => a + b, 0) / recentDifficulties.length
      : 3;

  // 3. 连续天数稳定性
  const streakStability = currentStreak >= 7 ? 0.8 : currentStreak / 7;

  // 4. 情绪趋势
  const recentMoods = recentLogs
    .filter((log) => log.moodAfter !== null)
    .map((log) => log.moodAfter!);
  const avgMood =
    recentMoods.length > 0
      ? recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length
      : 3;

  // 综合风险评估
  let riskScore = 0;
  riskScore += rateTrend < -0.2 ? 30 : rateTrend < 0 ? 15 : 0;
  riskScore += avgRecentDifficulty > 4 ? 25 : avgRecentDifficulty > 3.5 ? 15 : 0;
  riskScore += streakStability < 0.5 ? 20 : streakStability < 0.8 ? 10 : 0;
  riskScore += avgMood < 2.5 ? 25 : avgMood < 3 ? 15 : 0;

  const overallRisk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" =
    riskScore >= 70
      ? "CRITICAL"
      : riskScore >= 50
        ? "HIGH"
        : riskScore >= 30
          ? "MEDIUM"
          : "LOW";

  const prompt = `
习惯中断风险分析：${habitName}

基础数据：
- 开始至今：${daysSinceStart}天
- 当前连续：${currentStreak}天
- 最近两周完成率：${Math.round(recentRate * 100)}%
- 完成率趋势：${rateTrend > 0 ? "上升" : rateTrend < 0 ? "下降" : "稳定"} (${rateTrend > 0 ? "+" : ""}${Math.round(rateTrend * 100)}%)
- 平均难度：${avgRecentDifficulty.toFixed(1)}/5
- 平均情绪：${avgMood.toFixed(1)}/5

初步风险评估：${overallRisk} (${riskScore}分)

请分析风险因素并给出预防建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: BREAK_RISK_PROMPT,
      prompt,
      schema: breakRiskSchema,
    });

    return object;
  } catch (error) {
    console.error("风险预测失败:", error);
    // 返回基于计算的结果
    return {
      overallRisk,
      riskScore,
      riskFactors: [
        {
          factor: "完成率趋势",
          weight: 30,
          currentStatus:
            rateTrend < 0 ? `下降${Math.abs(Math.round(rateTrend * 100))}%` : "稳定",
        },
        {
          factor: "主观难度",
          weight: 25,
          currentStatus: `${avgRecentDifficulty.toFixed(1)}/5`,
        },
        {
          factor: "连续天数",
          weight: 20,
          currentStatus: `${currentStreak}天`,
        },
        {
          factor: "情绪状态",
          weight: 25,
          currentStatus: `${avgMood.toFixed(1)}/5`,
        },
      ],
      warningSignals: [
        {
          signal: "完成率下降",
          detected: rateTrend < -0.1,
          lastOccurrence: rateTrend < -0.1 ? "最近两周" : undefined,
        },
        {
          signal: "难度感增加",
          detected: avgRecentDifficulty > 4,
        },
        {
          signal: "情绪低落",
          detected: avgMood < 3,
        },
      ],
      preventiveActions:
        overallRisk === "LOW"
          ? [
              {
                action: "保持当前节奏",
                priority: "LOW",
                expectedImpact: "维持稳定",
              },
            ]
          : [
              {
                action: "降低习惯难度",
                priority: "HIGH",
                expectedImpact: "提高完成率",
              },
              {
                action: "回顾习惯初心",
                priority: "MEDIUM",
                expectedImpact: "恢复动力",
              },
            ],
    };
  }
}
