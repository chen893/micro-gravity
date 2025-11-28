/**
 * 坏习惯戒除分析模块
 * 识别触发模式、设计替代行为
 */

import { generateObject } from "ai";
import { BREAK_HABIT_PROMPT } from "./prompts";
import {
  type TriggerRecord,
  triggerAnalysisSchema,
  type TriggerAnalysis,
  type TriggerPatternType,
} from "@/lib/types";
import { modelMini } from "./model";

/**
 * 触发模式统计
 */
interface TriggerPatternStats {
  type: TriggerPatternType;
  count: number;
  percentage: number;
  examples: string[];
  avgIntensity: number;
  resistanceRate: number;
}

/**
 * 统计触发记录的模式
 */
export function analyzeTriggerPatterns(
  records: TriggerRecord[]
): TriggerPatternStats[] {
  if (records.length === 0) {
    return [];
  }

  const patternMap = new Map<
    TriggerPatternType,
    {
      count: number;
      contexts: string[];
      intensities: number[];
      resisted: number;
    }
  >();

  // 初始化所有类型
  const types: TriggerPatternType[] = [
    "TEMPORAL",
    "CONTEXTUAL",
    "EMOTIONAL",
    "BEHAVIORAL",
  ];
  types.forEach((type) => {
    patternMap.set(type, {
      count: 0,
      contexts: [],
      intensities: [],
      resisted: 0,
    });
  });

  // 统计每种类型
  records.forEach((record) => {
    const stats = patternMap.get(record.triggerType)!;
    stats.count++;
    stats.contexts.push(record.context);
    stats.intensities.push(record.intensity);
    if (record.resisted) stats.resisted++;
  });

  // 转换为结果数组
  const results: TriggerPatternStats[] = [];
  patternMap.forEach((stats, type) => {
    if (stats.count > 0) {
      results.push({
        type,
        count: stats.count,
        percentage: Math.round((stats.count / records.length) * 100),
        examples: stats.contexts.slice(0, 3),
        avgIntensity:
          stats.intensities.reduce((a, b) => a + b, 0) / stats.intensities.length,
        resistanceRate: Math.round((stats.resisted / stats.count) * 100),
      });
    }
  });

  // 按频率排序
  return results.sort((a, b) => b.count - a.count);
}

/**
 * 识别时间模式
 */
export function identifyTemporalPatterns(
  records: TriggerRecord[]
): {
  peakHours: number[];
  peakDays: number[];
  timeInsights: string[];
} {
  if (records.length === 0) {
    return { peakHours: [], peakDays: [], timeInsights: [] };
  }

  // 统计小时分布
  const hourCounts = new Map<number, number>();
  const dayCounts = new Map<number, number>();

  records.forEach((record) => {
    const date = new Date(record.timestamp);
    const hour = date.getHours();
    const day = date.getDay();

    hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1);
    dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
  });

  // 找出高峰时段
  const avgHourCount = records.length / 24;
  const peakHours = Array.from(hourCounts.entries())
    .filter(([, count]) => count > avgHourCount * 1.5)
    .map(([hour]) => hour)
    .sort((a, b) => a - b);

  // 找出高峰日
  const avgDayCount = records.length / 7;
  const peakDays = Array.from(dayCounts.entries())
    .filter(([, count]) => count > avgDayCount * 1.5)
    .map(([day]) => day)
    .sort((a, b) => a - b);

  // 生成时间洞察
  const timeInsights: string[] = [];
  const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  if (peakHours.length > 0) {
    const hourRanges = peakHours.map((h) => `${h}:00`).join("、");
    timeInsights.push(`触发高峰时段：${hourRanges}`);
  }

  if (peakDays.length > 0) {
    const dayList = peakDays.map((d) => dayNames[d]).join("、");
    timeInsights.push(`触发高峰日：${dayList}`);
  }

  // 识别工作日/周末模式
  const weekdayCount = Array.from(dayCounts.entries())
    .filter(([day]) => day >= 1 && day <= 5)
    .reduce((sum, [, count]) => sum + count, 0);
  const weekendCount = Array.from(dayCounts.entries())
    .filter(([day]) => day === 0 || day === 6)
    .reduce((sum, [, count]) => sum + count, 0);

  if (weekdayCount > weekendCount * 2) {
    timeInsights.push("工作日触发更频繁，可能与工作压力有关");
  } else if (weekendCount > weekdayCount * 0.8) {
    timeInsights.push("周末触发较多，可能与空闲时间有关");
  }

  return { peakHours, peakDays, timeInsights };
}

/**
 * AI 深度分析触发模式
 */
export async function analyzeTriggersDeep(
  records: TriggerRecord[],
  habitName: string
): Promise<TriggerAnalysis> {
  if (records.length < 3) {
    // 数据太少，返回默认分析
    return {
      patterns: [],
      deepNeed: "数据不足，需要更多触发记录来分析",
      substituteBehaviors: [
        "深呼吸10次",
        "喝一杯水",
        "起身走动5分钟",
        "与朋友聊天",
      ],
      environmentDesign: [
        "移除触发物品",
        "改变环境布置",
        "设置提醒卡片",
      ],
    };
  }

  const patternStats = analyzeTriggerPatterns(records);
  const temporalPatterns = identifyTemporalPatterns(records);

  const prompt = `
坏习惯：${habitName}

触发记录统计（共${records.length}条）：
${patternStats
  .map(
    (p) => `
- ${p.type === "TEMPORAL" ? "时间触发" : p.type === "CONTEXTUAL" ? "情境触发" : p.type === "EMOTIONAL" ? "情绪触发" : "行为触发"}：${p.count}次（${p.percentage}%）
  - 平均冲动强度：${p.avgIntensity.toFixed(1)}/10
  - 抵抗成功率：${p.resistanceRate}%
  - 示例：${p.examples.join("；")}`
  )
  .join("\n")}

时间模式分析：
${temporalPatterns.timeInsights.join("\n")}

最近5条触发记录：
${records
  .slice(-5)
  .map(
    (r) => `
- 时间：${new Date(r.timestamp).toLocaleString()}
- 类型：${r.triggerType}
- 场景：${r.context}
- 情绪：${r.emotion ?? "未记录"}
- 冲动强度：${r.intensity}/10
- 是否抵抗：${r.resisted ? "是" : "否"}
- 使用策略：${r.copingStrategy ?? "无"}`
  )
  .join("\n")}

请分析这些触发模式，找出深层需求，并提供替代行为和环境设计建议。
`;

  try {
    const { object } = await generateObject({
      model: modelMini,
      system: BREAK_HABIT_PROMPT,
      prompt,
      schema: triggerAnalysisSchema,
    });

    return object;
  } catch (error) {
    console.error("触发模式分析失败:", error);
    // 返回基于统计的基础分析
    return {
      patterns: patternStats.map((p) => ({
        type: p.type,
        description: `${p.type === "TEMPORAL" ? "时间" : p.type === "CONTEXTUAL" ? "情境" : p.type === "EMOTIONAL" ? "情绪" : "行为"}触发，占比${p.percentage}%`,
        confidence: p.percentage / 100,
        evidence: p.examples,
      })),
      deepNeed: "需要进一步分析",
      substituteBehaviors: [
        "深呼吸10次，让身体平静",
        "喝一杯水，转移注意力",
        "进行5分钟轻度运动",
        "与朋友或家人交流",
      ],
      environmentDesign: [
        "移除可能触发坏习惯的物品",
        "在常见触发地点放置提醒",
        "准备替代活动的工具",
      ],
    };
  }
}

/**
 * 复发分析
 */
export interface RelapseAnalysis {
  isRelapse: boolean;
  daysSinceLastRelapse: number;
  relapseCount: number;
  relapsePattern: string | null;
  recoveryAdvice: string[];
}

export function analyzeRelapse(
  records: TriggerRecord[],
  targetDaysClean: number = 7
): RelapseAnalysis {
  const failures = records.filter((r) => !r.resisted);

  if (failures.length === 0) {
    return {
      isRelapse: false,
      daysSinceLastRelapse: records.length > 0 ? calculateDaysSince(records[0]!.timestamp) : 0,
      relapseCount: 0,
      relapsePattern: null,
      recoveryAdvice: ["继续保持，你做得很好！"],
    };
  }

  const lastFailure = failures[failures.length - 1]!;
  const daysSinceLastRelapse = calculateDaysSince(lastFailure.timestamp);
  const isRelapse = daysSinceLastRelapse < targetDaysClean;

  // 分析复发模式
  let relapsePattern: string | null = null;
  if (failures.length >= 3) {
    const emotionalFailures = failures.filter(
      (r) => r.triggerType === "EMOTIONAL"
    );
    if (emotionalFailures.length > failures.length * 0.5) {
      relapsePattern = "情绪驱动型复发";
    }

    const contexts = failures.map((r) => r.context);
    const commonWords = findCommonWords(contexts);
    if (commonWords.length > 0) {
      relapsePattern = `常见场景：${commonWords.join("、")}`;
    }
  }

  // 生成恢复建议
  const recoveryAdvice: string[] = [];
  if (isRelapse) {
    recoveryAdvice.push("复发是正常的学习过程，不要过度自责");
    recoveryAdvice.push("分析这次复发的触发因素，记录下来");
    recoveryAdvice.push("重新设定一个更小的目标");

    if (lastFailure.triggerType === "EMOTIONAL") {
      recoveryAdvice.push("尝试学习情绪管理技巧");
    }
    if (lastFailure.triggerType === "CONTEXTUAL") {
      recoveryAdvice.push("考虑改变或避开触发环境");
    }
  } else {
    recoveryAdvice.push(`你已经坚持了${daysSinceLastRelapse}天，继续保持！`);
    recoveryAdvice.push("记录成功抵抗的经验，以备将来参考");
  }

  return {
    isRelapse,
    daysSinceLastRelapse,
    relapseCount: failures.length,
    relapsePattern,
    recoveryAdvice,
  };
}

/**
 * 计算距今天数
 */
function calculateDaysSince(date: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - new Date(date).getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 找出常见词汇
 */
function findCommonWords(texts: string[]): string[] {
  const wordCount = new Map<string, number>();

  texts.forEach((text) => {
    // 简单分词（实际项目可以用更好的分词库）
    const words = text.split(/[\s,，。、；;]+/).filter((w) => w.length > 1);
    words.forEach((word) => {
      wordCount.set(word, (wordCount.get(word) ?? 0) + 1);
    });
  });

  // 返回出现超过一半的词
  const threshold = texts.length * 0.5;
  return Array.from(wordCount.entries())
    .filter(([, count]) => count >= threshold)
    .map(([word]) => word)
    .slice(0, 5);
}

/**
 * 生成中断策略
 */
export function generateInterruptionStrategies(
  triggerType: TriggerPatternType
): string[] {
  const strategies: Record<TriggerPatternType, string[]> = {
    TEMPORAL: [
      "在高风险时段安排其他活动",
      "设置定时提醒，提前准备",
      "改变高风险时段的环境",
      "建立新的时间节点习惯",
    ],
    CONTEXTUAL: [
      "改变或避开触发环境",
      "在触发地点放置提醒物",
      "携带替代物品",
      "与他人一起进入触发环境",
    ],
    EMOTIONAL: [
      "学习情绪识别和命名",
      "建立情绪应对工具箱",
      "练习深呼吸或冥想",
      "寻求社会支持",
    ],
    BEHAVIORAL: [
      "打断习惯链条的前序行为",
      "用新行为替代旧行为",
      "增加行为摩擦",
      "建立新的行为触发器",
    ],
  };

  return strategies[triggerType];
}
