/**
 * 32种肯定成功语言框架
 * 基于福格《Tiny Habits》- 8种情境 × 4种类型
 */

// 肯定类型
export type AffirmationType =
  | "PERFORMANCE" // 你的出色表现
  | "COMPARISON" // 与别人相比
  | "COLLABORATION" // 合作时的表现
  | "SILVER_LINING"; // 尽管表现不佳但有好消息

// 肯定情境
export type AffirmationContext =
  | "SINGLE_SUCCESS" // 仅此一次成功
  | "PERSONAL_BEST" // 最棒的一次
  | "IMPROVEMENT" // 与上次相比进步
  | "MILESTONE" // 达到里程碑
  | "TREND" // 发展趋势向好
  | "EFFORT" // 持续努力
  | "COULD_BE_WORSE" // 情况本可能更糟
  | "CHALLENGE"; // 勇于接受挑战

// 模板变量类型
export interface AffirmationVariables {
  habit?: string; // 习惯名称
  days?: number; // 天数
  percent?: number; // 百分比
  count?: number; // 次数
  streak?: number; // 连续天数
}

// 32种肯定语言模板
export const AFFIRMATION_TEMPLATES: Record<
  AffirmationContext,
  Record<AffirmationType, string>
> = {
  SINGLE_SUCCESS: {
    PERFORMANCE: "你成功完成了「{habit}」！",
    COMPARISON: "今天你比大多数人都更自律！",
    COLLABORATION: "你的坚持正在影响身边的人",
    SILVER_LINING: "虽然只完成了最低标准，但你没有放弃",
  },
  PERSONAL_BEST: {
    PERFORMANCE: "这是你「{habit}」习惯的最佳记录！",
    COMPARISON: "你创造了新纪录，连续{days}天！",
    COLLABORATION: "你是帮助自己创造新纪录的关键人物",
    SILVER_LINING: "虽然今天状态不好，但你的最佳记录依然保持着",
  },
  IMPROVEMENT: {
    PERFORMANCE: "相比上周，你的完成率提升了{percent}%！",
    COMPARISON: "你的进步速度超过了平均水平",
    COLLABORATION: "你正在帮助自己成为更好的人",
    SILVER_LINING: "虽然今天漏掉了，但整体趋势是向上的",
  },
  MILESTONE: {
    PERFORMANCE: "恭喜！你达到了{days}天的里程碑！",
    COMPARISON: "能坚持{days}天的人不到10%，你做到了！",
    COLLABORATION: "你的里程碑成就值得与朋友分享",
    SILVER_LINING: "虽然中断了，但你曾达到{days}天的里程碑",
  },
  TREND: {
    PERFORMANCE: "你的「{habit}」习惯正在稳步提升",
    COMPARISON: "你的进步曲线比大多数人都漂亮",
    COLLABORATION: "你正在成为自己最好的教练",
    SILVER_LINING: "虽然有波动，但长期趋势是积极的",
  },
  EFFORT: {
    PERFORMANCE: "你已经连续努力了{days}天！",
    COMPARISON: "你的坚持程度超过了90%的人",
    COLLABORATION: "每一天的努力都在为未来的自己加分",
    SILVER_LINING: "虽然结果还没显现，但你的努力不会白费",
  },
  COULD_BE_WORSE: {
    PERFORMANCE: "今天完成了{count}个习惯，比完全放弃好多了",
    COMPARISON: "很多人今天可能完全放弃了，但你没有",
    COLLABORATION: "你没有让自己失望",
    SILVER_LINING: "虽然不完美，但你依然在路上",
  },
  CHALLENGE: {
    PERFORMANCE: "你勇敢地接受了挑战！",
    COMPARISON: "敢于挑战的人本就不多，你是其中之一",
    COLLABORATION: "你正在帮助自己突破舒适区",
    SILVER_LINING: "虽然挑战失败了，但你敢于尝试就已经很棒",
  },
};

/**
 * 根据用户数据检测合适的肯定情境
 */
export function detectAffirmationContext(stats: {
  todayCompleted: boolean;
  currentStreak: number;
  previousStreak: number;
  completionRate: number;
  previousCompletionRate: number;
  totalDays: number;
  isMilestone: boolean;
}): AffirmationContext {
  // 里程碑达成
  if (stats.isMilestone) {
    return "MILESTONE";
  }

  // 最佳记录
  if (stats.currentStreak > stats.previousStreak && stats.currentStreak > 7) {
    return "PERSONAL_BEST";
  }

  // 明显进步
  if (stats.completionRate > stats.previousCompletionRate + 10) {
    return "IMPROVEMENT";
  }

  // 趋势向好
  if (stats.completionRate > stats.previousCompletionRate) {
    return "TREND";
  }

  // 持续努力
  if (stats.currentStreak >= 3) {
    return "EFFORT";
  }

  // 今天完成
  if (stats.todayCompleted) {
    return "SINGLE_SUCCESS";
  }

  // 接受挑战
  if (stats.totalDays <= 7) {
    return "CHALLENGE";
  }

  // 默认：情况本可能更糟
  return "COULD_BE_WORSE";
}

/**
 * 填充模板变量
 */
export function fillTemplate(
  template: string,
  variables: AffirmationVariables,
): string {
  let result = template;
  if (variables.habit) {
    result = result.replace(/{habit}/g, variables.habit);
  }
  if (variables.days !== undefined) {
    result = result.replace(/{days}/g, String(variables.days));
  }
  if (variables.percent !== undefined) {
    result = result.replace(/{percent}/g, String(variables.percent));
  }
  if (variables.count !== undefined) {
    result = result.replace(/{count}/g, String(variables.count));
  }
  if (variables.streak !== undefined) {
    result = result.replace(/{streak}/g, String(variables.streak));
  }
  return result;
}

/**
 * 生成个性化肯定语言
 */
export function generateAffirmation(
  context: AffirmationContext,
  type: AffirmationType,
  variables: AffirmationVariables,
): string {
  const template = AFFIRMATION_TEMPLATES[context][type];
  return fillTemplate(template, variables);
}

/**
 * 获取所有类型的肯定语言（同一情境下）
 */
export function getAllAffirmationsForContext(
  context: AffirmationContext,
  variables: AffirmationVariables,
): Record<AffirmationType, string> {
  const types: AffirmationType[] = [
    "PERFORMANCE",
    "COMPARISON",
    "COLLABORATION",
    "SILVER_LINING",
  ];

  return types.reduce(
    (acc, type) => {
      acc[type] = generateAffirmation(context, type, variables);
      return acc;
    },
    {} as Record<AffirmationType, string>,
  );
}

/**
 * 庆祝三时机引导文案
 */
export const CELEBRATION_TIMING_GUIDES = {
  // 想起时庆祝 - 强化提示与习惯的联结
  REMEMBER: {
    title: "想起时庆祝",
    description: "太棒了，你记得要做这件事！",
    suggestion: "先在心里为自己鼓掌，然后开始行动吧！",
    emoji: "💡",
  },
  // 执行中庆祝 - 让行为过程更愉悦
  DOING: {
    title: "执行中庆祝",
    description: "你正在做这件事，已经很棒了！",
    suggestion: "享受这个过程，不用着急",
    emoji: "🏃",
  },
  // 完成后庆祝 - 将行为固化为习惯（最重要）
  DONE: {
    title: "完成后庆祝",
    description: "你做到了！",
    suggestion: "现在，用你喜欢的方式庆祝一下！",
    emoji: "🎉",
  },
};
