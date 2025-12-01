/**
 * v2.0 报告生成模块 - 庆祝优先版
 * 基于福格行为模型："情绪创造习惯，庆祝是习惯养成的肥料"
 */

import { generateObject } from "ai";
import {
  WEEKLY_REPORT_PROMPT,
  MONTHLY_REPORT_PROMPT,
  MILESTONE_REPORT_PROMPT,
} from "./prompts";
import {
  weeklyReportSchema,
  reportSummarySchema,
  reportHighlightSchema,
  patternFindingSchema,
  milestoneReflectionSchema,
  type WeeklyReport,
  type ReportSummary,
  type ReportHighlight,
  type PatternFinding,
  type CelebrationMoment,
} from "@/lib/types";
import { z } from "zod";
import { modelMini } from "./model";

/**
 * 报告输入数据
 */
export interface ReportInputData {
  periodStart: Date;
  periodEnd: Date;
  habits: Array<{
    id: string;
    name: string;
    type: "BUILD" | "BREAK";
    currentPhase: number;
  }>;
  logs: Array<{
    habitId: string;
    loggedAt: Date;
    completed: boolean;
    difficultyRating?: number | null;
    moodBefore?: number | null;
    moodAfter?: number | null;
  }>;
  previousPeriodStats?: {
    completionRate: number;
    longestStreak: number;
  };
}

/**
 * 计算周期统计摘要
 */
export function calculatePeriodSummary(
  data: ReportInputData,
  previousRate?: number,
): ReportSummary {
  const totalLogs = data.logs.length;
  const completedLogs = data.logs.filter((log) => log.completed).length;
  const completionRate =
    totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0;

  // 计算较上期变化
  const rateChange =
    previousRate !== undefined ? completionRate - previousRate : 0;

  // 活跃习惯数
  const activeHabitIds = new Set(data.logs.map((log) => log.habitId));
  const activeHabits = activeHabitIds.size;

  // 计算最长连续天数
  const dateSet = new Map<string, Set<string>>();
  data.logs.forEach((log) => {
    if (log.completed) {
      const dateKey = new Date(log.loggedAt).toISOString().split("T")[0]!;
      if (!dateSet.has(dateKey)) {
        dateSet.set(dateKey, new Set());
      }
      dateSet.get(dateKey)!.add(log.habitId);
    }
  });

  // 简化的连续天数计算（所有习惯）
  const sortedDates = Array.from(dateSet.keys()).sort();
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;

  sortedDates.forEach((dateStr) => {
    const date = new Date(dateStr);
    if (lastDate) {
      const diffDays =
        (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    lastDate = date;
  });
  longestStreak = Math.max(longestStreak, currentStreak);

  // 完美天数（所有习惯都完成的天数）
  let perfectDays = 0;
  dateSet.forEach((habitIds) => {
    if (habitIds.size === data.habits.length) {
      perfectDays++;
    }
  });

  return {
    completionRate,
    rateChange,
    activeHabits,
    longestStreak,
    totalCheckins: completedLogs,
    perfectDays,
  };
}

/**
 * 识别周期亮点
 */
export function identifyHighlights(data: ReportInputData): ReportHighlight[] {
  const highlights: ReportHighlight[] = [];

  // 按习惯统计
  const habitStats = new Map<
    string,
    { completed: number; total: number; streak: number }
  >();

  data.habits.forEach((habit) => {
    habitStats.set(habit.id, { completed: 0, total: 0, streak: 0 });
  });

  // 统计每个习惯
  data.logs.forEach((log) => {
    const stats = habitStats.get(log.habitId);
    if (stats) {
      stats.total++;
      if (log.completed) stats.completed++;
    }
  });

  // 找出表现最好的习惯
  habitStats.forEach((stats, habitId) => {
    const habit = data.habits.find((h) => h.id === habitId);
    if (!habit || stats.total === 0) return;

    const rate = stats.completed / stats.total;

    if (rate >= 0.9 && stats.completed >= 5) {
      highlights.push({
        habitId,
        habitName: habit.name,
        achievement: "高完成率",
        emoji: "🔥",
        metric: `${Math.round(rate * 100)}%完成率`,
      });
    } else if (rate === 1 && stats.completed >= 7) {
      highlights.push({
        habitId,
        habitName: habit.name,
        achievement: "完美周",
        emoji: "⭐",
        metric: `连续${stats.completed}天`,
      });
    }
  });

  // 如果没有亮点，添加一个鼓励
  if (highlights.length === 0 && data.logs.some((log) => log.completed)) {
    const mostActive = Array.from(habitStats.entries())
      .filter(([, stats]) => stats.completed > 0)
      .sort((a, b) => b[1].completed - a[1].completed)[0];

    if (mostActive) {
      const habit = data.habits.find((h) => h.id === mostActive[0]);
      if (habit) {
        highlights.push({
          habitId: mostActive[0],
          habitName: habit.name,
          achievement: "最活跃习惯",
          emoji: "💪",
          metric: `完成${mostActive[1].completed}次`,
        });
      }
    }
  }

  return highlights.slice(0, 3);
}

/**
 * 生成庆祝时刻（v2.0 新增）
 * 找出每个小胜利并用情感化语言庆祝
 */
export function generateCelebrationMoments(
  data: ReportInputData,
): CelebrationMoment[] {
  const celebrations: CelebrationMoment[] = [];

  // 按习惯统计
  const habitStats = new Map<
    string,
    { completed: number; total: number; name: string }
  >();

  data.habits.forEach((habit) => {
    habitStats.set(habit.id, { completed: 0, total: 0, name: habit.name });
  });

  data.logs.forEach((log) => {
    const stats = habitStats.get(log.habitId);
    if (stats) {
      stats.total++;
      if (log.completed) stats.completed++;
    }
  });

  // 为每个有完成记录的习惯生成庆祝
  habitStats.forEach((stats) => {
    if (stats.completed === 0) return;

    const rate = stats.total > 0 ? stats.completed / stats.total : 0;

    // 完美完成
    if (rate === 1 && stats.completed >= 7) {
      celebrations.push({
        habitName: stats.name,
        achievement: `连续${stats.completed}天全部完成`,
        celebrationText: `太棒了！「${stats.name}」整整一周都没有落下，这份坚持真的很了不起！`,
        emoji: "🏆",
      });
    }
    // 高完成率
    else if (rate >= 0.8 && stats.completed >= 5) {
      celebrations.push({
        habitName: stats.name,
        achievement: `完成了${stats.completed}次`,
        celebrationText: `「${stats.name}」本周表现出色！每一次坚持都在让你变得更强！`,
        emoji: "⭐",
      });
    }
    // 有坚持就值得庆祝
    else if (stats.completed >= 3) {
      celebrations.push({
        habitName: stats.name,
        achievement: `坚持了${stats.completed}天`,
        celebrationText: `「${stats.name}」已经做到${stats.completed}次了，这就是进步的力量！`,
        emoji: "💪",
      });
    }
    // 即使只完成1-2次
    else if (stats.completed >= 1) {
      celebrations.push({
        habitName: stats.name,
        achievement: `迈出了第一步`,
        celebrationText: `「${stats.name}」开始行动了！记住：开始永远是最难的一步，你做到了！`,
        emoji: "🌱",
      });
    }
  });

  // 整体庆祝
  const totalCompleted = data.logs.filter((log) => log.completed).length;
  if (totalCompleted > 0 && celebrations.length === 0) {
    celebrations.push({
      habitName: "本周习惯",
      achievement: `共完成${totalCompleted}次打卡`,
      celebrationText: `这周你完成了${totalCompleted}次打卡，每一次都是对未来自己的投资！`,
      emoji: "🎉",
    });
  }

  return celebrations.slice(0, 3); // 最多3个庆祝时刻
}

/**
 * 发现数据模式
 */
export function findPatterns(data: ReportInputData): PatternFinding[] {
  const patterns: PatternFinding[] = [];

  // 时间模式分析
  const dayOfWeekStats = new Map<
    number,
    { completed: number; total: number }
  >();
  for (let i = 0; i < 7; i++) {
    dayOfWeekStats.set(i, { completed: 0, total: 0 });
  }

  data.logs.forEach((log) => {
    const day = new Date(log.loggedAt).getDay();
    const stats = dayOfWeekStats.get(day)!;
    stats.total++;
    if (log.completed) stats.completed++;
  });

  // 找出最佳和最差日
  let bestDay = -1;
  let worstDay = -1;
  let bestRate = 0;
  let worstRate = 1;

  dayOfWeekStats.forEach((stats, day) => {
    if (stats.total >= 2) {
      const rate = stats.completed / stats.total;
      if (rate > bestRate) {
        bestRate = rate;
        bestDay = day;
      }
      if (rate < worstRate) {
        worstRate = rate;
        worstDay = day;
      }
    }
  });

  const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  if (bestDay !== -1 && bestRate > 0.7) {
    patterns.push({
      finding: `${dayNames[bestDay]}表现最佳`,
      implication: `${dayNames[bestDay]}的环境或状态更适合执行习惯`,
      confidence: bestRate,
      dataPoints: dayOfWeekStats.get(bestDay)!.total,
    });
  }

  if (worstDay !== -1 && worstRate < 0.5 && worstDay !== bestDay) {
    patterns.push({
      finding: `${dayNames[worstDay]}完成率较低`,
      implication: `考虑在${dayNames[worstDay]}调整计划或降低期望`,
      confidence: 1 - worstRate,
      dataPoints: dayOfWeekStats.get(worstDay)!.total,
    });
  }

  // 情绪模式
  const moodLogs = data.logs.filter(
    (log) => log.moodBefore !== null && log.moodAfter !== null,
  );
  if (moodLogs.length >= 5) {
    const avgMoodChange =
      moodLogs.reduce(
        (sum, log) => sum + ((log.moodAfter ?? 0) - (log.moodBefore ?? 0)),
        0,
      ) / moodLogs.length;

    if (avgMoodChange >= 0.5) {
      patterns.push({
        finding: "习惯显著改善情绪",
        implication: "习惯对心理健康有积极影响",
        confidence: Math.min(1, avgMoodChange / 2),
        dataPoints: moodLogs.length,
      });
    }
  }

  return patterns.slice(0, 3);
}

/**
 * 生成周报 (v2.0 庆祝优先版)
 * 核心理念：情绪创造习惯，庆祝是习惯养成的肥料
 */
export async function generateWeeklyReport(
  data: ReportInputData,
): Promise<WeeklyReport> {
  const summary = calculatePeriodSummary(
    data,
    data.previousPeriodStats?.completionRate,
  );
  const highlights = identifyHighlights(data);
  const patterns = findPatterns(data).slice(0, 2); // 最多2个洞察
  const celebrationMoments = generateCelebrationMoments(data);

  // 简化的、庆祝优先的提示词
  const prompt = `
这周的习惯数据（${data.periodStart.toLocaleDateString()} - ${data.periodEnd.toLocaleDateString()}）：

习惯：${data.habits.map((h) => h.name).join("、")}
完成情况：共打卡${summary.totalCheckins}次

已识别的庆祝时刻：
${celebrationMoments.map((c) => `${c.emoji} ${c.habitName}：${c.celebrationText}`).join("\n")}

请基于以上数据，用温暖鼓励的语言：
1. 确认这些庆祝时刻（可以润色得更温暖）
2. 找出1-2个有趣发现
3. 给出下周最重要的一个建议
4. 设定一个简单可达成的小目标

记住：庆祝优先，少即是多，情感语言！
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: WEEKLY_REPORT_PROMPT,
      prompt,
      schema: weeklyReportSchema,
    });

    // 确保返回的数据包含我们预先生成的庆祝时刻
    return {
      ...object,
      summary,
      celebrationMoments:
        object.celebrationMoments?.length > 0
          ? object.celebrationMoments
          : celebrationMoments,
    };
  } catch (error) {
    console.error("生成周报失败:", error);
    // 返回基础周报（庆祝优先）
    return {
      summary,
      celebrationMoments,
      highlights,
      patterns,
      suggestions:
        summary.completionRate < 70
          ? [
              {
                category: "TIMING" as const,
                suggestion: "试试在每天同一个时间做习惯，让它变成自然的一部分",
                expectedImpact: "更容易记住和坚持",
              },
            ]
          : [],
      nextWeekGoals: [
        {
          goal:
            summary.totalCheckins >= 7
              ? "保持这份节奏"
              : "每天至少完成一个习惯",
          measurable:
            summary.totalCheckins >= 7 ? "继续每天打卡" : "本周打卡7次以上",
        },
      ],
      encouragement:
        summary.totalCheckins > 0
          ? "你已经在路上了，每一小步都算数！"
          : "新的一周，新的开始，你可以的！",
    };
  }
}

/**
 * 月报输入数据
 */
export interface MonthlyReportData extends ReportInputData {
  weeklyReports: Array<{
    weekNumber: number;
    summary: ReportSummary;
  }>;
  milestones: Array<{
    habitName: string;
    type: string;
    achievedAt: Date;
  }>;
}

/**
 * 月报 schema
 */
const monthlyReportSchema = z.object({
  summary: reportSummarySchema,
  weeklyTrend: z.array(
    z.object({
      week: z.number(),
      completionRate: z.number(),
      highlight: z.string(),
    }),
  ),
  monthHighlights: z.array(reportHighlightSchema),
  keyInsights: z.array(patternFindingSchema),
  nextMonthFocus: z.array(
    z.object({
      area: z.string(),
      goal: z.string(),
      actions: z.array(z.string()),
    }),
  ),
});

export type MonthlyReport = z.infer<typeof monthlyReportSchema>;

/**
 * 生成月报
 */
export async function generateMonthlyReport(
  data: MonthlyReportData,
): Promise<MonthlyReport> {
  const summary = calculatePeriodSummary(
    data,
    data.previousPeriodStats?.completionRate,
  );
  const highlights = identifyHighlights(data);
  const patterns = findPatterns(data);

  // 周趋势
  const weeklyTrend = data.weeklyReports.map((w) => ({
    week: w.weekNumber,
    completionRate: w.summary.completionRate,
    highlight:
      w.summary.perfectDays > 0 ? `${w.summary.perfectDays}个完美日` : "",
  }));

  const prompt = `
月报数据（${data.periodStart.toLocaleDateString()} - ${data.periodEnd.toLocaleDateString()}）：

习惯列表：
${data.habits.map((h) => `- ${h.name}`).join("\n")}

月度统计：
- 总完成率：${summary.completionRate}%
- 较上月变化：${summary.rateChange > 0 ? "+" : ""}${summary.rateChange}%
- 总打卡次数：${summary.totalCheckins}
- 完美天数：${summary.perfectDays}

周趋势：
${weeklyTrend.map((w) => `- 第${w.week}周: ${w.completionRate}%`).join("\n")}

达成的里程碑：
${data.milestones.map((m) => `- ${m.habitName}: ${m.type}`).join("\n") || "暂无"}

请生成完整的月报，包括趋势分析和下月规划。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: MONTHLY_REPORT_PROMPT,
      prompt,
      schema: monthlyReportSchema,
    });

    return object;
  } catch (error) {
    console.error("生成月报失败:", error);
    return {
      summary,
      weeklyTrend,
      monthHighlights: highlights,
      keyInsights: patterns,
      nextMonthFocus: [
        {
          area: "一致性",
          goal: "提高整体完成率",
          actions: ["设定固定时间", "简化习惯"],
        },
      ],
    };
  }
}

/**
 * 里程碑报告数据
 */
export interface MilestoneReportData {
  habitName: string;
  habitType: "BUILD" | "BREAK";
  milestoneType: "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100" | "CUSTOM";
  streakDays: number;
  startDate: Date;
  totalLogs: number;
  completedLogs: number;
  keyMoments?: string[];
}

/**
 * 里程碑报告 schema
 */
const milestoneReportOutputSchema = z.object({
  celebration: z.string(),
  reflection: milestoneReflectionSchema,
  nextPhase: z
    .object({
      suggestion: z.string(),
      newGoal: z.string(),
      tips: z.array(z.string()),
    })
    .optional(),
});

export type MilestoneReport = z.infer<typeof milestoneReportOutputSchema>;

/**
 * 生成里程碑报告
 */
export async function generateMilestoneReport(
  data: MilestoneReportData,
): Promise<MilestoneReport> {
  const milestoneName = {
    DAY_7: "7天",
    DAY_21: "21天",
    DAY_66: "66天",
    DAY_100: "100天",
    CUSTOM: `${data.streakDays}天`,
  }[data.milestoneType];

  const completionRate = Math.round(
    (data.completedLogs / data.totalLogs) * 100,
  );

  const prompt = `
里程碑达成：${data.habitName} - ${milestoneName}！

习惯信息：
- 习惯名称：${data.habitName}
- 习惯类型：${data.habitType === "BUILD" ? "养成" : "戒除"}
- 连续天数：${data.streakDays}天
- 开始日期：${data.startDate.toLocaleDateString()}
- 总记录：${data.totalLogs}次
- 完成率：${completionRate}%

${data.keyMoments ? `关键时刻：\n${data.keyMoments.map((m) => `- ${m}`).join("\n")}` : ""}

请生成热情的庆祝文案、深度回顾和下阶段建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: MILESTONE_REPORT_PROMPT,
      prompt,
      schema: milestoneReportOutputSchema,
    });

    return object;
  } catch (error) {
    console.error("生成里程碑报告失败:", error);
    return {
      celebration: `🎉 恭喜！你已经坚持「${data.habitName}」${data.streakDays}天了！这是一个了不起的成就，证明了你的毅力和决心。`,
      reflection: {
        journey: `从${data.startDate.toLocaleDateString()}开始，你已经走过了${data.streakDays}天的旅程。`,
        keyMoments: data.keyMoments ?? ["坚持的每一天都是关键时刻"],
        lessonsLearned: ["一致性比完美更重要", "小步骤带来大改变"],
        strengthsShown: ["毅力", "自律", "专注"],
      },
      nextPhase: {
        suggestion:
          data.milestoneType === "DAY_100"
            ? "考虑设定新的挑战目标"
            : "继续保持，向下一个里程碑进发",
        newGoal:
          data.milestoneType === "DAY_7"
            ? "挑战21天"
            : data.milestoneType === "DAY_21"
              ? "挑战66天"
              : "保持并深化习惯",
        tips: ["保持节奏", "适当奖励自己", "分享你的成就"],
      },
    };
  }
}
