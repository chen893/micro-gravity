/**
 * 习惯替换 AI 实现
 * 用好习惯替代坏习惯，满足相同的深层需求
 */

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

// ============ 类型定义 ============

// 深层需求类型
export type DeepNeedType =
  | "STRESS_RELIEF" // 压力释放
  | "BOREDOM_ESCAPE" // 无聊逃避
  | "SOCIAL_CONNECTION" // 社交连接
  | "REWARD_SEEKING" // 奖励追求
  | "COMFORT_SEEKING" // 舒适寻求
  | "IDENTITY_EXPRESSION" // 身份表达
  | "CONTROL_FEELING" // 控制感
  | "STIMULATION"; // 刺激寻求

// 替代行为
export interface SubstituteBehavior {
  name: string;
  description: string;
  needsSatisfied: DeepNeedType[]; // 满足的需求类型
  timeRequired: string; // 所需时间，如 "1分钟"
  resourcesNeeded: string[]; // 所需资源
  effectivenessScore: number; // 1-10 效果评分
  easeScore: number; // 1-10 容易程度
  tips: string;
}

// 习惯替换配方
export interface SwapRecipe {
  badHabit: string;
  deepNeeds: {
    type: DeepNeedType;
    explanation: string;
  }[];
  substitutes: SubstituteBehavior[];
  swapFormula: string; // "当我想要[坏习惯]时，我会[替代行为]"
  transitionPlan: string[]; // 过渡计划
  successIndicators: string[]; // 成功指标
}

// 需求分析结果
export interface NeedAnalysis {
  primaryNeed: DeepNeedType;
  secondaryNeeds: DeepNeedType[];
  needDescription: string;
  evidenceFromBehavior: string[];
}

// ============ Schema 定义 ============

const deepNeedTypeSchema = z.enum([
  "STRESS_RELIEF",
  "BOREDOM_ESCAPE",
  "SOCIAL_CONNECTION",
  "REWARD_SEEKING",
  "COMFORT_SEEKING",
  "IDENTITY_EXPRESSION",
  "CONTROL_FEELING",
  "STIMULATION",
]);

const substituteBehaviorSchema = z.object({
  name: z.string().describe("替代行为名称"),
  description: z.string().describe("行为描述"),
  needsSatisfied: z.array(deepNeedTypeSchema).describe("满足的需求类型"),
  timeRequired: z.string().describe("所需时间"),
  resourcesNeeded: z.array(z.string()).describe("所需资源"),
  effectivenessScore: z.number().min(1).max(10).describe("效果评分 1-10"),
  easeScore: z.number().min(1).max(10).describe("容易程度 1-10"),
  tips: z.string().describe("执行提示"),
});

const swapRecipeSchema = z.object({
  badHabit: z.string().describe("坏习惯名称"),
  deepNeeds: z
    .array(
      z.object({
        type: deepNeedTypeSchema,
        explanation: z.string().describe("需求解释"),
      }),
    )
    .describe("深层需求列表"),
  substitutes: z.array(substituteBehaviorSchema).describe("替代行为列表"),
  swapFormula: z.string().describe("替换配方公式"),
  transitionPlan: z.array(z.string()).describe("过渡计划步骤"),
  successIndicators: z.array(z.string()).describe("成功指标"),
});

const needAnalysisSchema = z.object({
  primaryNeed: deepNeedTypeSchema.describe("主要需求"),
  secondaryNeeds: z.array(deepNeedTypeSchema).describe("次要需求"),
  needDescription: z.string().describe("需求描述"),
  evidenceFromBehavior: z.array(z.string()).describe("行为证据"),
});

// ============ 核心函数 ============

/**
 * 分析坏习惯背后的深层需求
 */
export async function analyzeDeepNeeds(params: {
  habitName: string;
  triggerContexts: string[];
  emotionalStates?: string[];
}): Promise<NeedAnalysis> {
  const { habitName, triggerContexts, emotionalStates } = params;

  const { object } = await generateObject({
    model,
    schema: needAnalysisSchema,
    prompt: `分析这个坏习惯背后的深层需求。

坏习惯：${habitName}

触发情境：
${triggerContexts.map((c) => `- ${c}`).join("\n")}

${emotionalStates ? `相关情绪状态：\n${emotionalStates.map((e) => `- ${e}`).join("\n")}` : ""}

深层需求类型说明：
- STRESS_RELIEF：压力释放 - 缓解紧张、焦虑
- BOREDOM_ESCAPE：无聊逃避 - 填补空虚、打发时间
- SOCIAL_CONNECTION：社交连接 - 归属感、被接纳
- REWARD_SEEKING：奖励追求 - 即时满足、多巴胺
- COMFORT_SEEKING：舒适寻求 - 熟悉感、安全感
- IDENTITY_EXPRESSION：身份表达 - 自我认同、形象
- CONTROL_FEELING：控制感 - 掌控感、自主权
- STIMULATION：刺激寻求 - 兴奋、新鲜感

请分析这个坏习惯满足了什么深层需求，并提供行为证据。`,
  });

  return object;
}

/**
 * 生成习惯替换配方
 */
export async function generateSwapRecipe(params: {
  habitName: string;
  deepNeeds: NeedAnalysis;
  userPreferences?: {
    availableTime?: string;
    physicalLimitations?: string;
    interests?: string[];
  };
}): Promise<SwapRecipe> {
  const { habitName, deepNeeds, userPreferences } = params;

  const { object } = await generateObject({
    model,
    schema: swapRecipeSchema,
    prompt: `设计习惯替换配方，用好习惯替代坏习惯。

坏习惯：${habitName}

深层需求分析：
- 主要需求：${DEEP_NEED_LABELS[deepNeeds.primaryNeed].name}
  ${deepNeeds.needDescription}
- 次要需求：${deepNeeds.secondaryNeeds.map((n) => DEEP_NEED_LABELS[n].name).join("、")}

行为证据：
${deepNeeds.evidenceFromBehavior.map((e) => `- ${e}`).join("\n")}

${
  userPreferences
    ? `
用户偏好：
${userPreferences.availableTime ? `- 可用时间：${userPreferences.availableTime}` : ""}
${userPreferences.physicalLimitations ? `- 身体限制：${userPreferences.physicalLimitations}` : ""}
${userPreferences.interests ? `- 兴趣爱好：${userPreferences.interests.join("、")}` : ""}
`
    : ""
}

替换原则：
1. 替代行为必须能满足相同的深层需求
2. 替代行为应该更健康、更有益
3. 替代行为应该容易执行（低门槛）
4. 替代行为应该能在相似情境下执行

请设计：
1. 至少3个替代行为（从简单到复杂）
2. 清晰的替换配方公式
3. 渐进式过渡计划
4. 可衡量的成功指标`,
  });

  return object;
}

/**
 * 快速推荐替代行为
 * 适用于用户已知需求类型的情况
 */
export async function quickSuggestSubstitutes(params: {
  needType: DeepNeedType;
  context?: string;
  timeAvailable?: string;
}): Promise<SubstituteBehavior[]> {
  const { needType, context, timeAvailable } = params;

  const { object } = await generateObject({
    model,
    schema: z.object({
      substitutes: z.array(substituteBehaviorSchema).describe("替代行为列表"),
    }),
    prompt: `推荐满足「${DEEP_NEED_LABELS[needType].name}」需求的健康替代行为。

${context ? `情境：${context}` : ""}
${timeAvailable ? `可用时间：${timeAvailable}` : ""}

需求说明：${DEEP_NEED_LABELS[needType].description}

请推荐5个替代行为，从最简单到最有效排序。
每个行为都要：
- 能满足这个深层需求
- 是健康的、正向的
- 具体可执行`,
  });

  return object.substitutes;
}

/**
 * 生成替换提醒卡片
 */
export async function generateSwapCard(params: {
  badHabit: string;
  substitute: SubstituteBehavior;
  triggerContext: string;
}): Promise<{
  cardTitle: string;
  triggerReminder: string;
  actionPrompt: string;
  motivation: string;
  quickTip: string;
}> {
  const { badHabit, substitute, triggerContext } = params;

  const { object } = await generateObject({
    model,
    schema: z.object({
      cardTitle: z.string().describe("卡片标题"),
      triggerReminder: z.string().describe("触发提醒"),
      actionPrompt: z.string().describe("行动提示"),
      motivation: z.string().describe("动机提醒"),
      quickTip: z.string().describe("快速提示"),
    }),
    prompt: `为习惯替换生成提醒卡片内容。

坏习惯：${badHabit}
替代行为：${substitute.name} - ${substitute.description}
触发情境：${triggerContext}

生成简洁有力的卡片内容，帮助用户在触发时刻快速切换到替代行为。`,
  });

  return object;
}

// ============ 辅助常量 ============

export const DEEP_NEED_LABELS: Record<
  DeepNeedType,
  { name: string; emoji: string; description: string }
> = {
  STRESS_RELIEF: {
    name: "压力释放",
    emoji: "😤",
    description: "缓解紧张、焦虑，让身心放松",
  },
  BOREDOM_ESCAPE: {
    name: "无聊逃避",
    emoji: "😑",
    description: "填补空虚感，打发无所事事的时间",
  },
  SOCIAL_CONNECTION: {
    name: "社交连接",
    emoji: "🤝",
    description: "获得归属感，被他人接纳和认可",
  },
  REWARD_SEEKING: {
    name: "奖励追求",
    emoji: "🎁",
    description: "获得即时满足感，多巴胺刺激",
  },
  COMFORT_SEEKING: {
    name: "舒适寻求",
    emoji: "🛋️",
    description: "获得熟悉感、安全感、稳定感",
  },
  IDENTITY_EXPRESSION: {
    name: "身份表达",
    emoji: "🎭",
    description: "表达自我认同，维护个人形象",
  },
  CONTROL_FEELING: {
    name: "控制感",
    emoji: "🎮",
    description: "获得掌控感、自主权、能力感",
  },
  STIMULATION: {
    name: "刺激寻求",
    emoji: "⚡",
    description: "追求兴奋、新鲜感、肾上腺素",
  },
};

// 常见坏习惯与需求映射（用于快速匹配）
export const COMMON_HABIT_NEEDS: Record<string, DeepNeedType[]> = {
  刷手机: ["BOREDOM_ESCAPE", "REWARD_SEEKING", "STIMULATION"],
  熬夜: ["CONTROL_FEELING", "REWARD_SEEKING", "STIMULATION"],
  吃零食: ["STRESS_RELIEF", "COMFORT_SEEKING", "REWARD_SEEKING"],
  拖延: ["STRESS_RELIEF", "CONTROL_FEELING", "COMFORT_SEEKING"],
  抽烟: ["STRESS_RELIEF", "SOCIAL_CONNECTION", "COMFORT_SEEKING"],
  喝酒: ["STRESS_RELIEF", "SOCIAL_CONNECTION", "BOREDOM_ESCAPE"],
  网购: ["REWARD_SEEKING", "STRESS_RELIEF", "BOREDOM_ESCAPE"],
  暴饮暴食: ["STRESS_RELIEF", "COMFORT_SEEKING", "REWARD_SEEKING"],
  咬指甲: ["STRESS_RELIEF", "CONTROL_FEELING", "STIMULATION"],
  打游戏: ["BOREDOM_ESCAPE", "REWARD_SEEKING", "CONTROL_FEELING"],
};
