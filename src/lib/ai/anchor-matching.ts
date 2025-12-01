/**
 * 锚点匹配 AI 实现
 * 基于福格行为模型，通过三维匹配（位置×频率×主题）推荐最佳锚点
 */

import { generateObject } from "ai";
import { z } from "zod";

// 活动类型定义
export interface RoutineActivity {
  name: string;
  time?: string; // 可选的时间点，如 "07:00"
  frequency: "DAILY" | "WEEKDAYS" | "WEEKENDS" | "OCCASIONAL";
  location?: string; // 可选的地点，如 "家里"、"办公室"
}

// 锚点匹配结果
export interface AnchorMatch {
  anchorName: string; // 锚点行为名称
  matchScore: number; // 匹配度 1-10
  matchReasons: {
    location: string; // 位置匹配说明
    frequency: string; // 频率匹配说明
    theme: string; // 主题关联说明
  };
  recipePreview: string; // 配方预览："在我【锚点】之后..."
  tips: string; // 使用建议
}

// 锚点验证结果
export interface AnchorValidation {
  isReliable: boolean; // 是否足够可靠
  reliabilityScore: number; // 可靠性评分 1-10
  concerns: string[]; // 潜在问题
  suggestions: string[]; // 改进建议
  alternativeAnchors?: string[]; // 备选锚点
}

// Schema 定义
const routineActivitySchema = z.object({
  name: z.string().describe("活动名称"),
  time: z.string().optional().describe("时间点，如 07:00"),
  frequency: z
    .enum(["DAILY", "WEEKDAYS", "WEEKENDS", "OCCASIONAL"])
    .describe("频率"),
  location: z.string().optional().describe("地点"),
});

const anchorMatchSchema = z.object({
  anchorName: z.string().describe("推荐的锚点行为"),
  matchScore: z.number().min(1).max(10).describe("匹配度评分 1-10"),
  matchReasons: z.object({
    location: z.string().describe("位置匹配说明"),
    frequency: z.string().describe("频率匹配说明"),
    theme: z.string().describe("主题关联说明"),
  }),
  recipePreview: z.string().describe("配方预览文案"),
  tips: z.string().describe("使用建议"),
});

const anchorValidationSchema = z.object({
  isReliable: z.boolean().describe("是否足够可靠"),
  reliabilityScore: z.number().min(1).max(10).describe("可靠性评分 1-10"),
  concerns: z.array(z.string()).describe("潜在问题列表"),
  suggestions: z.array(z.string()).describe("改进建议列表"),
  alternativeAnchors: z.array(z.string()).optional().describe("备选锚点列表"),
});

/**
 * 从用户描述中提取日程活动
 * 帮助用户梳理每日既有习惯
 */
export async function extractRoutineActivities(
  userDescription: string,
  timeSlot: "MORNING" | "WORK" | "EVENING" | "NIGHT",
): Promise<RoutineActivity[]> {
  const timeSlotDescriptions = {
    MORNING: "早晨（起床到出门）",
    WORK: "工作时段",
    EVENING: "傍晚（下班到晚餐）",
    NIGHT: "夜间（晚餐后到睡前）",
  };

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: z.object({
      activities: z
        .array(routineActivitySchema)
        .describe("提取出的日常活动列表"),
    }),
    prompt: `作为习惯教练，帮助用户梳理 ${timeSlotDescriptions[timeSlot]} 的日常活动。

用户描述：
${userDescription}

请从用户的描述中提取出具体的日常活动，每个活动包括：
- 活动名称（具体、简洁）
- 大致时间（如有）
- 频率（每天/工作日/周末/偶尔）
- 地点（如有）

注意：
- 只提取真正日常发生的行为，不是愿望或计划
- 活动要具体，如"刷牙"而不是"早间护理"
- 一个描述可能包含多个活动，请分开列出`,
  });

  return object.activities;
}

/**
 * 智能匹配锚点
 * 基于三维度（位置×频率×主题）为新习惯推荐最佳锚点
 */
export async function matchAnchors(params: {
  targetBehavior: string; // 目标行为
  targetFrequency?: "DAILY" | "WEEKDAYS" | "WEEKENDS"; // 期望频率
  preferredTimeSlot?: "MORNING" | "WORK" | "EVENING" | "NIGHT"; // 偏好时段
  routineActivities: RoutineActivity[]; // 用户的日常活动
}): Promise<AnchorMatch[]> {
  const {
    targetBehavior,
    targetFrequency,
    preferredTimeSlot,
    routineActivities,
  } = params;

  if (routineActivities.length === 0) {
    return [];
  }

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: z.object({
      matches: z
        .array(anchorMatchSchema)
        .describe("按匹配度排序的锚点推荐列表"),
    }),
    prompt: `作为习惯设计专家，为新习惯推荐最佳锚点。

目标新习惯：${targetBehavior}
${targetFrequency ? `期望频率：${targetFrequency}` : ""}
${preferredTimeSlot ? `偏好时段：${preferredTimeSlot}` : ""}

用户的日常活动：
${routineActivities.map((a) => `- ${a.name}${a.time ? ` (${a.time})` : ""}${a.location ? ` @ ${a.location}` : ""} [${a.frequency}]`).join("\n")}

三维匹配原则：
1. **位置匹配**：新习惯的执行地点与锚点相近
2. **频率匹配**：锚点的发生频率 ≥ 新习惯的期望频率
3. **主题关联**：锚点与新习惯有逻辑或情感关联

锚点选择标准（福格行为模型）：
- 锚点必须是已经稳定存在的行为（不是愿望）
- 锚点最好有明确的结束点（如"喝完咖啡后"比"喝咖啡时"更好）
- 锚点频率要能支撑新习惯的频率

请推荐最多5个最佳锚点，按匹配度从高到低排序。`,
  });

  return object.matches;
}

/**
 * 验证锚点是否可靠
 * 检查锚点是否足够稳定、明确
 */
export async function validateAnchor(params: {
  anchorBehavior: string; // 用户选择的锚点
  targetBehavior: string; // 目标新习惯
  context?: string; // 额外上下文
}): Promise<AnchorValidation> {
  const { anchorBehavior, targetBehavior, context } = params;

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: anchorValidationSchema,
    prompt: `作为习惯教练，验证用户选择的锚点是否可靠。

锚点行为：${anchorBehavior}
目标新习惯：${targetBehavior}
${context ? `额外信息：${context}` : ""}

锚点可靠性检查清单：
1. **频率稳定性**：这个行为是否每天/每次都会发生？
2. **时间明确性**：这个行为有明确的结束点吗？
3. **地点便利性**：执行新习惯的位置方便吗？
4. **心理准备度**：这个时刻用户是否有足够的精力？
5. **干扰风险**：会不会经常被打断或跳过？

评分标准：
- 8-10分：非常可靠，强烈推荐
- 6-7分：比较可靠，可以使用
- 4-5分：一般可靠，需要注意潜在问题
- 1-3分：不太可靠，建议更换

请评估这个锚点，指出潜在问题，并给出改进建议。如果可靠性较低，请推荐备选锚点。`,
  });

  return object;
}

/**
 * 生成基于日程的锚点建议
 * 分析整体日程，主动发现最佳锚点机会
 */
export async function suggestAnchorsFromRoutine(params: {
  targetBehavior: string;
  allActivities: Record<string, RoutineActivity[]>; // 按时段分组的所有活动
}): Promise<{
  bestTimeSlot: "MORNING" | "WORK" | "EVENING" | "NIGHT";
  topAnchors: AnchorMatch[];
  reasoning: string;
}> {
  const { targetBehavior, allActivities } = params;

  const slotNames: Record<string, string> = {
    MORNING: "早晨",
    WORK: "工作时段",
    EVENING: "傍晚",
    NIGHT: "夜间",
  };

  const activitiesSummary = Object.entries(allActivities)
    .map(([slot, acts]) => {
      const slotName = slotNames[slot] ?? slot;
      return `${slotName}：${acts.map((a) => a.name).join("、") || "暂无记录"}`;
    })
    .join("\n");

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: z.object({
      bestTimeSlot: z
        .enum(["MORNING", "WORK", "EVENING", "NIGHT"])
        .describe("最佳时段"),
      topAnchors: z.array(anchorMatchSchema).max(3).describe("前3个最佳锚点"),
      reasoning: z.string().describe("选择这个时段和锚点的原因"),
    }),
    prompt: `作为习惯设计专家，分析用户的整体日程，为新习惯找到最佳的锚点时机。

目标新习惯：${targetBehavior}

用户的日程概览：
${activitiesSummary}

请：
1. 综合考虑各时段的活动密度、用户精力状态、习惯养成难度
2. 选择最适合植入新习惯的时段
3. 从该时段推荐最多3个最佳锚点
4. 解释你的推荐理由

考虑因素：
- 早晨：精力充沛，但时间紧张
- 工作时段：专注工作，但有固定节奏
- 傍晚：可能疲惫，但有过渡仪式
- 夜间：放松状态，但意志力可能较弱`,
  });

  return object;
}

/**
 * 珍珠习惯设计
 * 将烦恼转化为正向提示（P2功能）
 */
export async function designPearlHabit(params: {
  annoyance: string; // 用户的烦恼/痛点
  desiredOutcome?: string; // 期望的结果
}): Promise<{
  pearlHabit: string; // 转化后的珍珠习惯
  trigger: string; // 触发点（原来的烦恼）
  miniAction: string; // 微小行动
  reasoning: string;
}> {
  const { annoyance, desiredOutcome } = params;

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: z.object({
      pearlHabit: z.string().describe("珍珠习惯的名称"),
      trigger: z.string().describe("触发点描述"),
      miniAction: z.string().describe("微小行动"),
      reasoning: z.string().describe("转化原理说明"),
    }),
    prompt: `设计一个"珍珠习惯"——将烦恼转化为正向提示。

就像牡蛎把沙粒变成珍珠一样，我们要把生活中的烦恼转化为触发美好习惯的提示。

用户的烦恼：${annoyance}
${desiredOutcome ? `期望达成：${desiredOutcome}` : ""}

珍珠习惯设计原则：
- 烦恼本身成为触发器（而不是要消除的东西）
- 设计一个微小的正向行动
- 这个行动要能带来即时的积极感受

示例：
- 烦恼"总是觉得焦虑" → 珍珠习惯"当感到焦虑时，深呼吸3次"
- 烦恼"手机通知太多" → 珍珠习惯"每次看到通知，先喝一口水"`,
  });

  return object;
}
