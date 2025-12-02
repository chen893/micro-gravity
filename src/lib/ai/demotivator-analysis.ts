/**
 * 去激励因素分析模块
 * 基于福格行为模型识别阻碍习惯养成的因素
 *
 * 常见去激励因素：
 * - 恐惧：害怕失败、害怕被评判
 * - 焦虑：担心无法坚持、担心浪费时间
 * - 过往失败：之前尝试过但失败了
 * - 完美主义：要么完美要么不做
 * - 外部压力：他人期望带来的压力
 */

import { generateObject } from "ai";
import { z } from "zod";
import { modelMini } from "@/lib/ai/model";

// 去激励因素类型
export type DemotivatorType =
  | "FEAR"
  | "ANXIETY"
  | "PAST_FAILURE"
  | "PERFECTIONISM"
  | "EXTERNAL_PRESSURE"
  | "TIME_CONCERN"
  | "ENERGY_CONCERN"
  | "SELF_DOUBT";

// 去激励因素定义
export const DEMOTIVATOR_DEFINITIONS: Record<
  DemotivatorType,
  {
    label: string;
    description: string;
    questions: string[];
    strategies: string[];
  }
> = {
  FEAR: {
    label: "恐惧",
    description: "害怕失败、害怕被他人评判",
    questions: [
      "你担心如果失败了会怎样？",
      "你害怕别人知道你在尝试这个习惯吗？",
    ],
    strategies: [
      "把目标设得足够小，小到不可能失败",
      "先不告诉别人，给自己一个安全的尝试空间",
      "记住：尝试本身就是成功",
    ],
  },
  ANXIETY: {
    label: "焦虑",
    description: "担心无法坚持、担心浪费时间",
    questions: [
      "你是否担心自己无法长期坚持？",
      "你会觉得花时间在这上面是浪费吗？",
    ],
    strategies: [
      "专注于今天，不去想21天或66天",
      "从2分钟版本开始，这不是浪费时间",
      "把它当作对自己的投资，而不是负担",
    ],
  },
  PAST_FAILURE: {
    label: "过往失败",
    description: "之前尝试过但失败了",
    questions: [
      "你之前尝试过类似的习惯吗？",
      "之前失败的经历会影响你现在的信心吗？",
    ],
    strategies: [
      "这次我们用完全不同的方法：微习惯",
      "过去的方法可能太难了，这次从极小开始",
      "失败不是你的问题，是方法的问题",
    ],
  },
  PERFECTIONISM: {
    label: "完美主义",
    description: "要么完美要么不做",
    questions: [
      "你是否觉得如果不能完美执行就宁愿不做？",
      "你会因为某天没做好而想要放弃吗？",
    ],
    strategies: [
      "完成比完美更重要",
      "允许自己有\"最低版本\"的一天",
      "记住：70%的执行胜过0%的完美",
    ],
  },
  EXTERNAL_PRESSURE: {
    label: "外部压力",
    description: "来自他人期望的压力",
    questions: [
      "这个习惯是你自己想要的，还是别人期望你做的？",
      "你是否感到来自家人或朋友的压力？",
    ],
    strategies: [
      "找到属于你自己的\"为什么\"",
      "即使是他人建议的，也要找到对你的意义",
      "可以调整习惯的形式，让它更符合你的需求",
    ],
  },
  TIME_CONCERN: {
    label: "时间顾虑",
    description: "觉得没有时间",
    questions: [
      "你觉得自己没有时间做这个习惯吗？",
      "你的日程是否已经很满了？",
    ],
    strategies: [
      "微习惯只需要2分钟，每个人都有2分钟",
      "可以绑定在你已有的习惯上，不需要额外找时间",
      "先从最小版本开始，有时间再扩展",
    ],
  },
  ENERGY_CONCERN: {
    label: "精力顾虑",
    description: "觉得自己没有精力",
    questions: [
      "你是否觉得自己精力不足？",
      "你担心这个习惯会让你更累吗？",
    ],
    strategies: [
      "微习惯设计得足够小，不会消耗太多精力",
      "选择精力最好的时段来做",
      "很多习惯反而会给你带来能量",
    ],
  },
  SELF_DOUBT: {
    label: "自我怀疑",
    description: "不相信自己能做到",
    questions: [
      "你是否怀疑自己能够养成这个习惯？",
      "你觉得自己是那种能坚持的人吗？",
    ],
    strategies: [
      "不需要相信自己能坚持，只需要相信今天能做到",
      "从你100%确定能做到的版本开始",
      "每次小成功都会增强你的信心",
    ],
  },
};

// AI 分析结果 schema
const demotivatorAnalysisSchema = z.object({
  identifiedDemotivators: z.array(
    z.object({
      type: z.enum([
        "FEAR",
        "ANXIETY",
        "PAST_FAILURE",
        "PERFECTIONISM",
        "EXTERNAL_PRESSURE",
        "TIME_CONCERN",
        "ENERGY_CONCERN",
        "SELF_DOUBT",
      ]),
      confidence: z.number().min(0).max(1),
      evidence: z.string().describe("用户输入中体现这个因素的证据"),
    })
  ),
  primaryDemotivator: z
    .enum([
      "FEAR",
      "ANXIETY",
      "PAST_FAILURE",
      "PERFECTIONISM",
      "EXTERNAL_PRESSURE",
      "TIME_CONCERN",
      "ENERGY_CONCERN",
      "SELF_DOUBT",
    ])
    .optional(),
  personalizedStrategies: z.array(z.string()).describe("针对用户情况的个性化建议"),
  encouragement: z.string().describe("鼓励的话语"),
});

export type DemotivatorAnalysis = z.infer<typeof demotivatorAnalysisSchema>;

/**
 * 分析用户输入中的去激励因素
 */
export async function analyzeDemotivators(input: {
  habitName: string;
  userConcerns: string;
  pastAttempts?: string;
}): Promise<DemotivatorAnalysis> {
  try {
    const { object } = await generateObject({
      model: modelMini,
      schema: demotivatorAnalysisSchema,
      prompt: `你是一位专业的习惯养成教练，擅长识别阻碍习惯养成的心理因素。

用户想要养成的习惯：${input.habitName}

用户表达的顾虑：
${input.userConcerns}

${input.pastAttempts ? `用户过去的尝试经历：${input.pastAttempts}` : ""}

请分析用户输入中可能存在的去激励因素（demotivators），这些因素可能阻碍他们养成习惯。

去激励因素类型包括：
- FEAR: 恐惧（害怕失败、害怕被评判）
- ANXIETY: 焦虑（担心无法坚持、担心浪费时间）
- PAST_FAILURE: 过往失败经历
- PERFECTIONISM: 完美主义
- EXTERNAL_PRESSURE: 外部压力
- TIME_CONCERN: 时间顾虑
- ENERGY_CONCERN: 精力顾虑
- SELF_DOUBT: 自我怀疑

请识别用户可能存在的去激励因素，并提供个性化的应对策略。
记住：我们的目标是帮助用户移除这些障碍，而不是评判他们。
语气要温暖、理解、鼓励。`,
    });

    return object;
  } catch (error) {
    console.error("去激励因素分析失败:", error);
    throw new Error(
      `无法分析去激励因素: ${error instanceof Error ? error.message : "未知错误"}`
    );
  }
}

/**
 * 获取去激励因素的应对策略
 */
export function getStrategiesForDemotivator(
  type: DemotivatorType
): string[] {
  return DEMOTIVATOR_DEFINITIONS[type]?.strategies ?? [];
}

/**
 * 获取去激励因素的探索问题
 */
export function getQuestionsForDemotivator(
  type: DemotivatorType
): string[] {
  return DEMOTIVATOR_DEFINITIONS[type]?.questions ?? [];
}
