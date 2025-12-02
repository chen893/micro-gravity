/**
 * 焦点地图 AI 实现
 * 基于福格行为模型，通过影响力 × 可行性矩阵筛选黄金行为
 */

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

// 焦点地图象限
export type FocusQuadrant = "GOLDEN" | "HIGH_IMPACT" | "EASY_WIN" | "AVOID";

// 行为评估结果
export interface BehaviorAssessment {
  name: string;
  description: string;
  impactScore: number; // 1-10 影响力评分
  feasibilityScore: number; // 1-10 可行性评分
  quadrant: FocusQuadrant;
  recommendation: string;
}

// 焦点地图结果
export interface FocusMapResult {
  behaviors: BehaviorAssessment[];
  goldenBehavior: {
    name: string;
    reason: string;
    microVersion: string; // 微习惯版本
  };
  summary: string;
}

// Schema 定义
const behaviorAssessmentSchema = z.object({
  name: z.string().describe("行为名称"),
  description: z.string().describe("行为的具体描述"),
  impactScore: z
    .number()
    .min(1)
    .max(10)
    .describe("影响力评分 1-10，越高越能实现愿望"),
  feasibilityScore: z
    .number()
    .min(1)
    .max(10)
    .describe("可行性评分 1-10，越高越容易做到"),
  quadrant: z
    .enum(["GOLDEN", "HIGH_IMPACT", "EASY_WIN", "AVOID"])
    .describe("所属象限"),
  recommendation: z.string().describe("针对这个行为的一句话建议"),
});

const focusMapResultSchema = z.object({
  behaviors: z.array(behaviorAssessmentSchema),
  goldenBehavior: z.object({
    name: z.string().describe("推荐的黄金行为名称"),
    reason: z.string().describe("为什么选择这个作为黄金行为"),
    microVersion: z.string().describe("这个行为的微习惯版本，非常小且容易做"),
  }),
  summary: z.string().describe("整体分析总结"),
});

/**
 * 生成行为集群
 * 基于用户愿望，引导探索多种可能的行为
 */
export async function generateBehaviorCluster(
  aspiration: string,
  clarifiedAspiration?: string,
): Promise<string[]> {
  const { object } = await generateObject({
    model,
    schema: z.object({
      behaviors: z
        .array(z.string())
        .describe("与愿望相关的行为列表，包含新习惯、一次性行为、停止的行为等"),
    }),
    prompt: `作为习惯教练，帮助用户探索实现愿望的行为。

用户的愿望：${aspiration}
${clarifiedAspiration ? `明确后的愿望：${clarifiedAspiration}` : ""}

请像"挥舞魔法棒"一样，列出10-15个可以帮助实现这个愿望的行为，包括：
- 新的习惯性行为（如：每天运动）
- 一次性的行动（如：买个好水杯）
- 想要停止的行为（如：停止熬夜）

不要考虑是否现实，尽量多样化。`,
  });

  return object.behaviors;
}

/**
 * 评估行为并生成焦点地图
 * 对行为进行影响力和可行性评估，确定象限位置
 */
export async function generateFocusMap(
  aspiration: string,
  behaviors: string[],
  userContext?: {
    currentAbility?: string;
    timeConstraints?: string;
    environment?: string;
  },
): Promise<FocusMapResult> {
  const contextInfo = userContext
    ? `
用户背景：
- 当前能力：${userContext.currentAbility ?? "未知"}
- 时间限制：${userContext.timeConstraints ?? "未知"}
- 环境条件：${userContext.environment ?? "未知"}`
    : "";

  const { object } = await generateObject({
    model,
    schema: focusMapResultSchema,
    prompt: `作为习惯设计专家，请评估以下行为并创建焦点地图。

用户愿望：${aspiration}
待评估行为：${behaviors.join("、")}
${contextInfo}

焦点地图四象限说明：
- GOLDEN（黄金行为）：高影响力 + 高可行性 → 优先选择
- HIGH_IMPACT（高影响但难）：高影响力 + 低可行性 → 需要拆解
- EASY_WIN（简单小胜）：低影响力 + 高可行性 → 快速见效
- AVOID（避免区）：低影响力 + 低可行性 → 不建议

请：
1. 为每个行为评估影响力（对实现愿望的帮助）和可行性（执行难度）
2. 确定每个行为的象限
3. 从GOLDEN象限（或最接近的）选出一个作为推荐的黄金行为
4. 为黄金行为设计一个超级简单的微习惯版本

评分标准：
- 影响力：考虑长期效果、与愿望的关联度
- 可行性：考虑时间、精力、资源、习惯养成难度`,
  });

  return object;
}

/**
 * 根据评分确定象限
 */
export function determineQuadrant(
  impactScore: number,
  feasibilityScore: number,
): FocusQuadrant {
  const isHighImpact = impactScore >= 6;
  const isEasyToDoable = feasibilityScore >= 6;

  if (isHighImpact && isEasyToDoable) return "GOLDEN";
  if (isHighImpact && !isEasyToDoable) return "HIGH_IMPACT";
  if (!isHighImpact && isEasyToDoable) return "EASY_WIN";
  return "AVOID";
}

/**
 * 生成入门步骤建议
 * 将一个行为拆解为更小的启动步骤
 */
export async function generateStarterStep(
  behavior: string,
  context?: string,
): Promise<{ starterStep: string; explanation: string }> {
  const { object } = await generateObject({
    model,
    schema: z.object({
      starterStep: z
        .string()
        .describe("入门步骤：关注启动行为的第一步，非常小且具体"),
      explanation: z.string().describe("为什么这个入门步骤有效"),
    }),
    prompt: `为以下行为设计一个"入门步骤"。

目标行为：${behavior}
${context ? `背景：${context}` : ""}

入门步骤的原则（福格行为模型）：
- 关注的是"启动"行为的第一步
- 必须非常小，几乎不需要动机
- 像打开一扇门，后面的行为会自然发生

示例：
- 目标"每天运动30分钟" → 入门步骤"穿上运动鞋"
- 目标"每天阅读" → 入门步骤"打开书放在桌上"
- 目标"早起" → 入门步骤"把闹钟放在床边"`,
  });

  return object;
}

/**
 * 生成缩小规模建议
 * 将行为本身缩小到最小版本
 */
export async function generateScaledBehavior(
  behavior: string,
  context?: string,
): Promise<{ scaledBehavior: string; explanation: string }> {
  const { object } = await generateObject({
    model,
    schema: z.object({
      scaledBehavior: z.string().describe("缩小后的行为：行为本身的最小版本"),
      explanation: z.string().describe("为什么这个缩小版本有效"),
    }),
    prompt: `为以下行为设计一个"缩小规模"版本。

目标行为：${behavior}
${context ? `背景：${context}` : ""}

缩小规模的原则（福格行为模型）：
- 缩小的是行为本身，不是启动步骤
- 必须能在30秒内完成
- 即使在最糟糕的一天也能做到

示例：
- 目标"每天运动30分钟" → 缩小版本"做1个深蹲"
- 目标"每天阅读" → 缩小版本"读1页书"
- 目标"喝8杯水" → 缩小版本"喝1小口水"`,
  });

  return object;
}

/**
 * 生成完整的微习惯配方
 */
export async function generateHabitRecipe(params: {
  behavior: string;
  anchor: string;
  celebration?: string;
}): Promise<{
  anchor: string;
  behavior: string;
  celebration: string;
  fullRecipe: string;
}> {
  const { object } = await generateObject({
    model,
    schema: z.object({
      anchor: z.string().describe("锚点行为（已有的日常行为）"),
      behavior: z.string().describe("微习惯（超级小的行为）"),
      celebration: z.string().describe("庆祝方式（即时、真诚的情绪表达）"),
      fullRecipe: z.string().describe("完整配方文案"),
    }),
    prompt: `创建一个微习惯配方。

目标行为：${params.behavior}
锚点行为：${params.anchor}
${params.celebration ? `偏好的庆祝方式：${params.celebration}` : ""}

微习惯配方格式：
"在我【锚点】之后，我会【微习惯】。为了让大脑记住，我要【庆祝】。"

要求：
- 锚点：选择一个已有的、稳定的日常行为
- 微习惯：非常小，30秒内能完成
- 庆祝：即时、真诚的情绪表达（如：对自己点头说"不错"）`,
  });

  return object;
}
