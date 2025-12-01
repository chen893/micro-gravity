/**
 * 数据洞察生成模块
 * 从习惯数据中发现模式和洞察
 */

import { generateObject } from "ai";
import { INSIGHTS_GENERATOR_PROMPT } from "./prompts";
import { type HabitData, insightSchema, type Insight } from "@/lib/types";
import { modelMini } from "./model";

/**
 * 基础统计数据
 */
export interface BasicStats {
  totalDays: number;
  completedDays: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  averageDifficulty: number | null;
  moodImprovement: number | null;
}

/**
 * 计算基础统计
 */
export function calculateBasicStats(
  logs: Array<{
    loggedAt: Date;
    completed: boolean;
    difficultyRating?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
  }>,
): BasicStats {
  if (logs.length === 0) {
    return {
      totalDays: 0,
      completedDays: 0,
      completionRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageDifficulty: null,
      moodImprovement: null,
    };
  }

  const completedLogs = logs.filter((log) => log.completed);
  const totalDays = logs.length;
  const completedDays = completedLogs.length;
  const completionRate = Math.round((completedDays / totalDays) * 100);

  // 计算连续天数
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime(),
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 计算当前连续天数
  for (const log of sortedLogs) {
    const logDate = new Date(log.loggedAt);
    logDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === currentStreak && log.completed) {
      currentStreak++;
    } else if (diffDays > currentStreak) {
      break;
    }
  }

  // 计算最长连续天数
  let lastDate: Date | null = null;
  for (const log of completedLogs.sort(
    (a, b) => new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime(),
  )) {
    const logDate = new Date(log.loggedAt);
    logDate.setHours(0, 0, 0, 0);

    if (lastDate) {
      const diffDays = Math.floor(
        (logDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }
    lastDate = logDate;
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // 计算平均难度
  const difficulties = completedLogs
    .map((log) => log.difficultyRating)
    .filter((d): d is number => d !== null && d !== undefined);
  const averageDifficulty =
    difficulties.length > 0
      ? Math.round(
          (difficulties.reduce((a, b) => a + b, 0) / difficulties.length) * 10,
        ) / 10
      : null;

  // 计算情绪提升
  const moodChanges = completedLogs
    .filter((log) => log.moodBefore !== null && log.moodAfter !== null)
    .map((log) => (log.moodAfter ?? 0) - (log.moodBefore ?? 0));
  const moodImprovement =
    moodChanges.length > 0
      ? Math.round(
          (moodChanges.reduce((a, b) => a + b, 0) / moodChanges.length) * 10,
        ) / 10
      : null;

  return {
    totalDays,
    completedDays,
    completionRate,
    currentStreak,
    longestStreak,
    averageDifficulty,
    moodImprovement,
  };
}

/**
 * 时间分布分析
 */
export interface TimeDistribution {
  bestDayOfWeek: number | null;
  worstDayOfWeek: number | null;
  bestHour: number | null;
  insights: string[];
}

export function analyzeTimeDistribution(
  logs: Array<{
    loggedAt: Date;
    completed: boolean;
    completionTime?: Date | null;
  }>,
): TimeDistribution {
  if (logs.length < 7) {
    return {
      bestDayOfWeek: null,
      worstDayOfWeek: null,
      bestHour: null,
      insights: ["数据不足，需要至少一周的记录"],
    };
  }

  // 按星期统计
  const dayStats = new Map<number, { completed: number; total: number }>();
  for (let i = 0; i < 7; i++) {
    dayStats.set(i, { completed: 0, total: 0 });
  }

  logs.forEach((log) => {
    const day = new Date(log.loggedAt).getDay();
    const stats = dayStats.get(day)!;
    stats.total++;
    if (log.completed) stats.completed++;
  });

  // 找出最佳和最差日
  let bestDayOfWeek: number | null = null;
  let worstDayOfWeek: number | null = null;
  let bestRate = 0;
  let worstRate = 100;

  dayStats.forEach((stats, day) => {
    if (stats.total >= 2) {
      const rate = stats.completed / stats.total;
      if (rate > bestRate) {
        bestRate = rate;
        bestDayOfWeek = day;
      }
      if (rate < worstRate) {
        worstRate = rate;
        worstDayOfWeek = day;
      }
    }
  });

  // 按小时统计（使用完成时间）
  const hourStats = new Map<number, number>();
  logs
    .filter((log) => log.completed && log.completionTime)
    .forEach((log) => {
      const hour = new Date(log.completionTime!).getHours();
      hourStats.set(hour, (hourStats.get(hour) ?? 0) + 1);
    });

  let bestHour: number | null = null;
  let maxHourCount = 0;
  hourStats.forEach((count, hour) => {
    if (count > maxHourCount) {
      maxHourCount = count;
      bestHour = hour;
    }
  });

  // 生成洞察
  const insights: string[] = [];
  const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  if (bestDayOfWeek !== null) {
    insights.push(
      `${dayNames[bestDayOfWeek]}完成率最高 (${Math.round(bestRate * 100)}%)`,
    );
  }
  if (worstDayOfWeek !== null && worstDayOfWeek !== bestDayOfWeek) {
    insights.push(
      `${dayNames[worstDayOfWeek]}完成率最低 (${Math.round(worstRate * 100)}%)`,
    );
  }
  if (bestHour !== null) {
    insights.push(`最常在${String(bestHour)}点完成习惯`);
  }

  return { bestDayOfWeek, worstDayOfWeek, bestHour, insights };
}

/**
 * AI 生成深度洞察
 */
export async function generateInsights(data: HabitData): Promise<Insight> {
  const basicStats = calculateBasicStats(data.logs);

  const prompt = `
习惯信息：
- 名称：${data.habit.name}
- 类型：${data.habit.type === "BUILD" ? "养成" : "戒除"}
- 当前阶段：第${data.habit.currentPhase}阶段
- 开始日期：${data.habit.createdAt.toLocaleDateString()}

统计数据：
- 总记录天数：${basicStats.totalDays}
- 完成天数：${basicStats.completedDays}
- 完成率：${basicStats.completionRate}%
- 当前连续：${basicStats.currentStreak}天
- 最长连续：${basicStats.longestStreak}天
${basicStats.averageDifficulty ? `- 平均难度：${basicStats.averageDifficulty}/5` : ""}
${basicStats.moodImprovement ? `- 情绪提升：${basicStats.moodImprovement > 0 ? "+" : ""}${basicStats.moodImprovement}` : ""}

用户提供的统计：
- 总天数：${data.stats.totalDays}
- 完成天数：${data.stats.completedDays}
- 当前连续：${data.stats.currentStreak}
- 最长连续：${data.stats.longestStreak}

请生成三条洞察：正向强化、模式识别、优化建议。每条不超过50字。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: INSIGHTS_GENERATOR_PROMPT,
      prompt,
      schema: insightSchema,
    });

    return object;
  } catch (error) {
    console.error("生成洞察失败:", error);
    // 返回基于统计的默认洞察
    return generateDefaultInsights(basicStats, data.habit.name);
  }
}

/**
 * 生成默认洞察
 */
function generateDefaultInsights(
  stats: BasicStats,
  habitName: string,
): Insight {
  // 正向强化
  let positiveTitle: string;
  let positiveContent: string;

  if (stats.currentStreak >= 7) {
    positiveTitle = "连续达成！";
    positiveContent = `已连续${stats.currentStreak}天，习惯正在形成`;
  } else if (stats.completionRate >= 80) {
    positiveTitle = "高完成率";
    positiveContent = `${stats.completionRate}%的完成率，非常出色`;
  } else if (stats.longestStreak >= 3) {
    positiveTitle = "有进步";
    positiveContent = `最长连续${stats.longestStreak}天，继续保持`;
  } else {
    positiveTitle = "已开始";
    positiveContent = `「${habitName}」已启动，每天进步一点点`;
  }

  // 模式识别
  let patternTitle: string;
  let patternContent: string;

  if (stats.moodImprovement !== null && stats.moodImprovement > 0.5) {
    patternTitle = "情绪提升";
    patternContent = `完成后情绪平均提升${stats.moodImprovement}分`;
  } else if (
    stats.averageDifficulty !== null &&
    stats.averageDifficulty <= 2.5
  ) {
    patternTitle = "难度适中";
    patternContent = "当前难度合适，可以考虑提升挑战";
  } else if (stats.averageDifficulty !== null && stats.averageDifficulty >= 4) {
    patternTitle = "难度偏高";
    patternContent = "建议降低难度，确保可持续性";
  } else {
    patternTitle = "稳定进行";
    patternContent = `共记录${stats.totalDays}天，保持节奏`;
  }

  // 优化建议
  let suggestionTitle: string;
  let suggestionContent: string;
  let suggestionAction: string;

  if (stats.completionRate < 50) {
    suggestionTitle = "简化习惯";
    suggestionContent = "完成率较低，建议降低门槛";
    suggestionAction = "将习惯时间缩短到2分钟";
  } else if (stats.currentStreak === 0 && stats.longestStreak > 0) {
    suggestionTitle = "重新开始";
    suggestionContent = "中断后重启，不要气馁";
    suggestionAction = "从最简单的版本重新开始";
  } else if (stats.averageDifficulty !== null && stats.averageDifficulty <= 2) {
    suggestionTitle = "提升挑战";
    suggestionContent = "当前太轻松，可以增加难度";
    suggestionAction = "尝试延长时间或提高标准";
  } else {
    suggestionTitle = "继续保持";
    suggestionContent = "当前状态良好";
    suggestionAction = "保持当前节奏，专注于一致性";
  }

  return {
    positive: {
      title: positiveTitle,
      content: positiveContent,
    },
    pattern: {
      title: patternTitle,
      content: patternContent,
    },
    suggestion: {
      title: suggestionTitle,
      content: suggestionContent,
      action: suggestionAction,
    },
  };
}

/**
 * 快速洞察（不调用 AI）
 */
export function getQuickInsights(
  logs: Array<{
    loggedAt: Date;
    completed: boolean;
    difficultyRating?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
  }>,
): string[] {
  const insights: string[] = [];
  const stats = calculateBasicStats(logs);

  // 连续天数洞察
  if (stats.currentStreak >= 21) {
    insights.push(`🎉 恭喜！已连续${stats.currentStreak}天，习惯即将固化`);
  } else if (stats.currentStreak >= 7) {
    insights.push(`🔥 连续${stats.currentStreak}天，保持住这股势头`);
  } else if (stats.currentStreak >= 3) {
    insights.push(`✨ 连续${stats.currentStreak}天，好的开始`);
  }

  // 完成率洞察
  if (stats.completionRate >= 90) {
    insights.push(`📊 ${stats.completionRate}%完成率，非常出色`);
  } else if (stats.completionRate < 50 && stats.totalDays >= 7) {
    insights.push(`💡 完成率${stats.completionRate}%，建议简化习惯`);
  }

  // 情绪洞察
  if (stats.moodImprovement !== null && stats.moodImprovement >= 1) {
    insights.push(`😊 习惯让心情提升${stats.moodImprovement}分`);
  }

  // 难度洞察
  if (stats.averageDifficulty !== null) {
    if (stats.averageDifficulty <= 2 && stats.totalDays >= 14) {
      insights.push("🚀 当前难度适应良好，可以考虑升级");
    } else if (stats.averageDifficulty >= 4.5) {
      insights.push("⚠️ 难度偏高，建议适当简化");
    }
  }

  // 里程碑洞察
  if (stats.longestStreak === 7) {
    insights.push("🏆 达成7天里程碑！");
  } else if (stats.longestStreak === 21) {
    insights.push("🏆 达成21天里程碑！习惯初步形成");
  } else if (stats.longestStreak === 66) {
    insights.push("🏆 达成66天里程碑！习惯已巩固");
  }

  return insights;
}
