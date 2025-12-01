/**
 * 进阶信号检测模块
 * 基于福格原理："让动机来告诉你该做多少"
 *
 * 检测用户"想多做"的信号，自然触发进阶提示
 */

// ============ 类型定义 ============

/**
 * 进阶信号类型
 */
export type AdvanceSignalType =
  | "CONSISTENCY" // 连续完成信号
  | "EASE" // 轻松完成信号
  | "DESIRE" // 想做更多信号
  | "OVERFLOW" // 溢出完成信号（超额完成）
  | "MOMENTUM"; // 动量信号（越做越多）

/**
 * 检测到的信号
 */
export interface DetectedSignal {
  type: AdvanceSignalType;
  strength: number; // 信号强度 0-1
  evidence: string; // 证据描述
  detectedAt: Date;
}

/**
 * 进阶评估结果
 */
export interface AdvanceAssessment {
  isReady: boolean; // 是否准备好进阶
  confidence: number; // 置信度 0-1
  signals: DetectedSignal[]; // 检测到的信号
  recommendation: string; // 建议
  encouragement: string; // 鼓励语
}

/**
 * 习惯日志数据（用于检测）
 */
export interface HabitLogData {
  date: Date;
  completed: boolean;
  difficultyRating?: number; // 1-5 难度评分
  actualDuration?: number; // 实际时长（分钟）
  targetDuration?: number; // 目标时长
  moodAfter?: number; // 完成后情绪 1-5
  notes?: string; // 用户备注
  wantedToDoMore?: boolean; // 用户是否表示想做更多
}

// ============ 核心检测函数 ============

/**
 * 检测连续完成信号
 * 连续5天以上完成 → 强信号
 */
export function detectConsistencySignal(
  logs: HabitLogData[],
): DetectedSignal | null {
  const sortedLogs = [...logs].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  let consecutiveDays = 0;

  for (const log of sortedLogs) {
    if (log.completed) {
      consecutiveDays++;
    } else {
      break;
    }
  }

  if (consecutiveDays >= 5) {
    return {
      type: "CONSISTENCY",
      strength: Math.min(1, consecutiveDays / 10), // 10天达到满强度
      evidence: `连续${consecutiveDays}天完成`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测轻松完成信号
 * 近5次平均难度 <= 2 → 习惯已稳固
 */
export function detectEaseSignal(logs: HabitLogData[]): DetectedSignal | null {
  const completedLogs = logs
    .filter((l) => l.completed && l.difficultyRating !== undefined)
    .slice(0, 5);

  if (completedLogs.length < 3) return null;

  const avgDifficulty =
    completedLogs.reduce((sum, l) => sum + (l.difficultyRating ?? 3), 0) /
    completedLogs.length;

  if (avgDifficulty <= 2) {
    return {
      type: "EASE",
      strength: 1 - avgDifficulty / 5, // 难度越低，强度越高
      evidence: `近${completedLogs.length}次平均难度${avgDifficulty.toFixed(1)}分，非常轻松`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测想做更多信号
 * 用户主动表示想做更多
 */
export function detectDesireSignal(
  logs: HabitLogData[],
): DetectedSignal | null {
  const recentLogs = logs.slice(0, 7);
  const desireCount = recentLogs.filter((l) => l.wantedToDoMore).length;

  if (desireCount >= 2) {
    return {
      type: "DESIRE",
      strength: Math.min(1, desireCount / 5),
      evidence: `近7天${desireCount}次表示想做更多`,
      detectedAt: new Date(),
    };
  }

  // 从备注中检测关键词
  const desireKeywords = ["不够", "想多", "再来", "太短", "太简单", "还想"];
  const notesWithDesire = recentLogs.filter(
    (l) => l.notes && desireKeywords.some((kw) => l.notes!.includes(kw)),
  );

  if (notesWithDesire.length >= 1) {
    return {
      type: "DESIRE",
      strength: 0.6,
      evidence: `备注中检测到"想做更多"的表达`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测溢出完成信号
 * 实际完成时长经常超过目标
 */
export function detectOverflowSignal(
  logs: HabitLogData[],
): DetectedSignal | null {
  const logsWithDuration = logs.filter(
    (l) => l.completed && l.actualDuration && l.targetDuration,
  );

  if (logsWithDuration.length < 3) return null;

  const overflowCount = logsWithDuration.filter(
    (l) => l.actualDuration! > l.targetDuration! * 1.2, // 超出20%算溢出
  ).length;

  const overflowRate = overflowCount / logsWithDuration.length;

  if (overflowRate >= 0.5) {
    return {
      type: "OVERFLOW",
      strength: overflowRate,
      evidence: `${Math.round(overflowRate * 100)}%的时候超额完成`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测动量信号
 * 完成时长呈上升趋势
 */
export function detectMomentumSignal(
  logs: HabitLogData[],
): DetectedSignal | null {
  const logsWithDuration = logs
    .filter((l) => l.completed && l.actualDuration)
    .slice(0, 7)
    .reverse(); // 时间正序

  if (logsWithDuration.length < 4) return null;

  // 简单的趋势检测：后半段平均 > 前半段平均
  const midPoint = Math.floor(logsWithDuration.length / 2);
  const firstHalf = logsWithDuration.slice(0, midPoint);
  const secondHalf = logsWithDuration.slice(midPoint);

  const firstAvg =
    firstHalf.reduce((sum, l) => sum + (l.actualDuration ?? 0), 0) /
    firstHalf.length;
  const secondAvg =
    secondHalf.reduce((sum, l) => sum + (l.actualDuration ?? 0), 0) /
    secondHalf.length;

  if (secondAvg > firstAvg * 1.2) {
    return {
      type: "MOMENTUM",
      strength: Math.min(1, (secondAvg - firstAvg) / firstAvg),
      evidence: `完成时长呈上升趋势（+${Math.round(((secondAvg - firstAvg) / firstAvg) * 100)}%）`,
      detectedAt: new Date(),
    };
  }

  return null;
}

// ============ 综合评估 ============

/**
 * 综合评估是否准备好进阶
 */
export function assessAdvanceReadiness(
  logs: HabitLogData[],
): AdvanceAssessment {
  const signals: DetectedSignal[] = [];

  // 收集所有信号
  const consistencySignal = detectConsistencySignal(logs);
  const easeSignal = detectEaseSignal(logs);
  const desireSignal = detectDesireSignal(logs);
  const overflowSignal = detectOverflowSignal(logs);
  const momentumSignal = detectMomentumSignal(logs);

  if (consistencySignal) signals.push(consistencySignal);
  if (easeSignal) signals.push(easeSignal);
  if (desireSignal) signals.push(desireSignal);
  if (overflowSignal) signals.push(overflowSignal);
  if (momentumSignal) signals.push(momentumSignal);

  // 计算综合置信度
  const totalStrength = signals.reduce((sum, s) => sum + s.strength, 0);
  const confidence = Math.min(1, totalStrength / 2); // 2个强信号达到满置信度

  // 判断是否准备好
  // 条件：至少2个信号 且 置信度 >= 0.6
  // 或者：有"想做更多"信号 + 另外1个信号
  const isReady =
    (signals.length >= 2 && confidence >= 0.6) ||
    (!!desireSignal && signals.length >= 2);

  // 生成建议和鼓励
  let recommendation: string;
  let encouragement: string;

  if (isReady) {
    if (desireSignal) {
      recommendation = "你已经准备好了！内心的渴望是最好的信号";
      encouragement = "太棒了！你的身体在告诉你：它想要更多！";
    } else if (easeSignal && consistencySignal) {
      recommendation = "这个阶段已经成为你的一部分，可以轻松迈向下一步";
      encouragement = "稳扎稳打，你已经建立了坚实的基础！";
    } else {
      recommendation = "多个信号显示你已经准备好进阶";
      encouragement = "你的坚持正在开花结果！";
    }
  } else if (signals.length === 1) {
    recommendation = "继续保持，再积累一些信号就可以考虑进阶";
    encouragement = "你正在正确的轨道上，不急，让习惯自然生长！";
  } else {
    recommendation = "当前阶段还需要巩固，继续坚持";
    encouragement = "每一天的坚持都在打造更坚固的习惯根基！";
  }

  return {
    isReady,
    confidence,
    signals,
    recommendation,
    encouragement,
  };
}

// ============ 辅助函数 ============

/**
 * 获取信号类型的中文描述
 */
export function getSignalDescription(type: AdvanceSignalType): string {
  const descriptions: Record<AdvanceSignalType, string> = {
    CONSISTENCY: "稳定完成",
    EASE: "轻松完成",
    DESIRE: "想做更多",
    OVERFLOW: "超额完成",
    MOMENTUM: "越做越多",
  };
  return descriptions[type];
}

/**
 * 获取信号类型的 emoji
 */
export function getSignalEmoji(type: AdvanceSignalType): string {
  const emojis: Record<AdvanceSignalType, string> = {
    CONSISTENCY: "📆",
    EASE: "😌",
    DESIRE: "🔥",
    OVERFLOW: "⭐",
    MOMENTUM: "📈",
  };
  return emojis[type];
}
