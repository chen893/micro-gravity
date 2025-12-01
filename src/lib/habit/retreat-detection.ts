/**
 * 退阶保护检测模块
 * 基于福格原理："舒适区边界不是一条直线，它更像股市走势图中起起伏伏的线条"
 *
 * 检测用户状态不好的信号，保护性建议回退到更低阶段
 * 退阶不是失败，是"回到根基重新积累力量"
 */

// ============ 类型定义 ============

/**
 * 退阶信号类型
 */
export type RetreatSignalType =
  | "STRUGGLE" // 挣扎信号：难度评分持续偏高
  | "INCONSISTENT" // 不稳定信号：完成率波动大
  | "NEGATIVE" // 负面情绪信号：沮丧、逃避、痛苦
  | "AVOIDANCE" // 回避信号：连续多天未完成
  | "DECLINING" // 下降信号：完成时长/质量下降
  | "BURNOUT"; // 倦怠信号：情绪和难度双降

/**
 * 检测到的退阶信号
 */
export interface RetreatSignal {
  type: RetreatSignalType;
  severity: "LOW" | "MEDIUM" | "HIGH"; // 严重程度
  evidence: string;
  detectedAt: Date;
}

/**
 * 退阶评估结果
 */
export interface RetreatAssessment {
  shouldRetreat: boolean; // 是否建议退阶
  urgency: "NONE" | "GENTLE" | "RECOMMENDED" | "URGENT";
  signals: RetreatSignal[];
  recommendation: string;
  encouragement: string; // 温暖的鼓励（退阶不是失败）
  alternativeActions: string[]; // 除退阶外的其他建议
}

/**
 * 习惯日志数据（用于检测）
 */
export interface HabitLogData {
  date: Date;
  completed: boolean;
  difficultyRating?: number; // 1-5 难度评分
  moodBefore?: number; // 开始前情绪 1-5
  moodAfter?: number; // 完成后情绪 1-5
  notes?: string; // 用户备注
  skipped?: boolean; // 是否跳过（主动选择不做）
  actualDuration?: number; // 实际时长
  targetDuration?: number; // 目标时长
}

// ============ 核心检测函数 ============

/**
 * 检测挣扎信号
 * 近5次平均难度 >= 4 → 习惯太难了
 */
export function detectStruggleSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const completedLogs = logs
    .filter((l) => l.completed && l.difficultyRating !== undefined)
    .slice(0, 5);

  if (completedLogs.length < 3) return null;

  const avgDifficulty =
    completedLogs.reduce((sum, l) => sum + (l.difficultyRating ?? 3), 0) /
    completedLogs.length;

  if (avgDifficulty >= 4.5) {
    return {
      type: "STRUGGLE",
      severity: "HIGH",
      evidence: `近${completedLogs.length}次平均难度${avgDifficulty.toFixed(1)}分，执行很吃力`,
      detectedAt: new Date(),
    };
  }

  if (avgDifficulty >= 4) {
    return {
      type: "STRUGGLE",
      severity: "MEDIUM",
      evidence: `近${completedLogs.length}次平均难度${avgDifficulty.toFixed(1)}分，有些吃力`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测不稳定信号
 * 完成率波动大（有完成也有漏掉）
 */
export function detectInconsistentSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const recentLogs = logs.slice(0, 7);
  if (recentLogs.length < 5) return null;

  const completedCount = recentLogs.filter((l) => l.completed).length;
  const completionRate = completedCount / recentLogs.length;

  // 完成率在 30%-70% 之间说明很不稳定
  if (completionRate >= 0.3 && completionRate <= 0.7) {
    return {
      type: "INCONSISTENT",
      severity: completionRate < 0.5 ? "HIGH" : "MEDIUM",
      evidence: `近7天完成${completedCount}天，时有时无很不稳定`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测负面情绪信号
 * 从备注或情绪评分检测沮丧/逃避/痛苦
 */
export function detectNegativeSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const recentLogs = logs.slice(0, 7);

  // 检测情绪下降
  const logsWithMood = recentLogs.filter(
    (l) => l.completed && l.moodAfter !== undefined,
  );

  if (logsWithMood.length >= 3) {
    const avgMoodAfter =
      logsWithMood.reduce((sum, l) => sum + (l.moodAfter ?? 3), 0) /
      logsWithMood.length;

    if (avgMoodAfter <= 2) {
      return {
        type: "NEGATIVE",
        severity: avgMoodAfter <= 1.5 ? "HIGH" : "MEDIUM",
        evidence: `完成后情绪偏低（平均${avgMoodAfter.toFixed(1)}分），可能感到沮丧`,
        detectedAt: new Date(),
      };
    }
  }

  // 从备注检测负面关键词
  const negativeKeywords = [
    "不想做",
    "好累",
    "太难",
    "做不到",
    "放弃",
    "算了",
    "没意思",
    "痛苦",
    "逃避",
    "强迫",
    "坚持不住",
  ];

  const negativeNotes = recentLogs.filter(
    (l) => l.notes && negativeKeywords.some((kw) => l.notes!.includes(kw)),
  );

  if (negativeNotes.length >= 2) {
    return {
      type: "NEGATIVE",
      severity: "MEDIUM",
      evidence: `多次备注中检测到负面情绪表达`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测回避信号
 * 连续3天以上未完成
 */
export function detectAvoidanceSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const sortedLogs = [...logs].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
  let missedDays = 0;

  for (const log of sortedLogs) {
    if (!log.completed) {
      missedDays++;
    } else {
      break;
    }
  }

  if (missedDays >= 5) {
    return {
      type: "AVOIDANCE",
      severity: "HIGH",
      evidence: `已连续${missedDays}天未完成，可能在回避`,
      detectedAt: new Date(),
    };
  }

  if (missedDays >= 3) {
    return {
      type: "AVOIDANCE",
      severity: "MEDIUM",
      evidence: `连续${missedDays}天未完成`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测下降信号
 * 完成时长/质量呈下降趋势
 */
export function detectDecliningSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const logsWithDuration = logs
    .filter((l) => l.completed && l.actualDuration)
    .slice(0, 7)
    .reverse(); // 时间正序

  if (logsWithDuration.length < 4) return null;

  // 检测下降趋势：后半段平均 < 前半段平均 80%
  const midPoint = Math.floor(logsWithDuration.length / 2);
  const firstHalf = logsWithDuration.slice(0, midPoint);
  const secondHalf = logsWithDuration.slice(midPoint);

  const firstAvg =
    firstHalf.reduce((sum, l) => sum + (l.actualDuration ?? 0), 0) /
    firstHalf.length;
  const secondAvg =
    secondHalf.reduce((sum, l) => sum + (l.actualDuration ?? 0), 0) /
    secondHalf.length;

  if (secondAvg < firstAvg * 0.7) {
    return {
      type: "DECLINING",
      severity: secondAvg < firstAvg * 0.5 ? "HIGH" : "MEDIUM",
      evidence: `完成时长呈下降趋势（-${Math.round(((firstAvg - secondAvg) / firstAvg) * 100)}%）`,
      detectedAt: new Date(),
    };
  }

  return null;
}

/**
 * 检测倦怠信号
 * 难度高 + 情绪低 = 可能倦怠
 */
export function detectBurnoutSignal(
  logs: HabitLogData[],
): RetreatSignal | null {
  const recentLogs = logs
    .filter(
      (l) =>
        l.completed &&
        l.difficultyRating !== undefined &&
        l.moodAfter !== undefined,
    )
    .slice(0, 5);

  if (recentLogs.length < 3) return null;

  const avgDifficulty =
    recentLogs.reduce((sum, l) => sum + (l.difficultyRating ?? 3), 0) /
    recentLogs.length;
  const avgMoodAfter =
    recentLogs.reduce((sum, l) => sum + (l.moodAfter ?? 3), 0) /
    recentLogs.length;

  // 难度高（>=4）且情绪低（<=2）= 倦怠
  if (avgDifficulty >= 4 && avgMoodAfter <= 2) {
    return {
      type: "BURNOUT",
      severity: "HIGH",
      evidence: `难度高（${avgDifficulty.toFixed(1)}分）且情绪低（${avgMoodAfter.toFixed(1)}分），可能出现倦怠`,
      detectedAt: new Date(),
    };
  }

  return null;
}

// ============ 综合评估 ============

/**
 * 综合评估是否需要退阶保护
 */
export function assessRetreatNeed(logs: HabitLogData[]): RetreatAssessment {
  const signals: RetreatSignal[] = [];

  // 收集所有信号
  const struggleSignal = detectStruggleSignal(logs);
  const inconsistentSignal = detectInconsistentSignal(logs);
  const negativeSignal = detectNegativeSignal(logs);
  const avoidanceSignal = detectAvoidanceSignal(logs);
  const decliningSignal = detectDecliningSignal(logs);
  const burnoutSignal = detectBurnoutSignal(logs);

  if (struggleSignal) signals.push(struggleSignal);
  if (inconsistentSignal) signals.push(inconsistentSignal);
  if (negativeSignal) signals.push(negativeSignal);
  if (avoidanceSignal) signals.push(avoidanceSignal);
  if (decliningSignal) signals.push(decliningSignal);
  if (burnoutSignal) signals.push(burnoutSignal);

  // 计算紧急程度
  const highSeverityCount = signals.filter((s) => s.severity === "HIGH").length;
  const mediumSeverityCount = signals.filter(
    (s) => s.severity === "MEDIUM",
  ).length;

  let urgency: RetreatAssessment["urgency"] = "NONE";
  let shouldRetreat = false;

  // 判断紧急程度
  if (burnoutSignal?.severity === "HIGH" || highSeverityCount >= 2) {
    urgency = "URGENT";
    shouldRetreat = true;
  } else if (highSeverityCount >= 1 || mediumSeverityCount >= 2) {
    urgency = "RECOMMENDED";
    shouldRetreat = true;
  } else if (mediumSeverityCount >= 1) {
    urgency = "GENTLE";
    shouldRetreat = false; // 只是提醒，不强制建议退阶
  }

  // 生成建议和鼓励
  let recommendation: string;
  let encouragement: string;
  const alternativeActions: string[] = [];

  if (urgency === "URGENT") {
    recommendation = "强烈建议退回上一阶段，给自己一些喘息空间";
    encouragement =
      "退一步不是失败，是聪明的选择。习惯的根基比高度更重要，回到舒适区重新积累力量！";
    alternativeActions.push("降低每日目标", "给自己放一天假", "只完成最低标准");
  } else if (urgency === "RECOMMENDED") {
    recommendation = "建议考虑退回上一阶段，巩固基础后再前进";
    encouragement =
      "发现了一些吃力的信号。记住，舒适区边界是波动的，退一步是为了更好地前进！";
    alternativeActions.push(
      "这周只完成最低标准",
      "减少每日目标时长",
      "给自己设置「恢复周」",
    );
  } else if (urgency === "GENTLE") {
    recommendation = "目前状态有些波动，可以关注一下";
    encouragement = "检测到一些小信号，但不用担心。保持觉察，随时可以调整！";
    alternativeActions.push(
      "记录一下是什么影响了执行",
      "试试更简单的版本",
      "和自己约定一个弹性规则",
    );
  } else {
    recommendation = "目前状态良好，继续保持";
    encouragement = "你正在稳步前进，每一步都算数！";
  }

  return {
    shouldRetreat,
    urgency,
    signals,
    recommendation,
    encouragement,
    alternativeActions,
  };
}

// ============ 辅助函数 ============

/**
 * 获取信号类型的中文描述
 */
export function getRetreatSignalDescription(type: RetreatSignalType): string {
  const descriptions: Record<RetreatSignalType, string> = {
    STRUGGLE: "执行吃力",
    INCONSISTENT: "完成不稳定",
    NEGATIVE: "情绪低落",
    AVOIDANCE: "连续未完成",
    DECLINING: "状态下滑",
    BURNOUT: "可能倦怠",
  };
  return descriptions[type];
}

/**
 * 获取信号类型的 emoji
 */
export function getRetreatSignalEmoji(type: RetreatSignalType): string {
  const emojis: Record<RetreatSignalType, string> = {
    STRUGGLE: "💦",
    INCONSISTENT: "📉",
    NEGATIVE: "😔",
    AVOIDANCE: "🚫",
    DECLINING: "⬇️",
    BURNOUT: "🔥",
  };
  return emojis[type];
}

/**
 * 获取紧急程度的描述
 */
export function getUrgencyDescription(
  urgency: RetreatAssessment["urgency"],
): string {
  const descriptions: Record<RetreatAssessment["urgency"], string> = {
    NONE: "状态良好",
    GENTLE: "轻微提醒",
    RECOMMENDED: "建议调整",
    URGENT: "需要关注",
  };
  return descriptions[urgency];
}
