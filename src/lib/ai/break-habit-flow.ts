/**
 * 三步戒除流程 AI 实现
 * 基于福格行为模型：提示策略 → 能力障碍 → 动机调整
 */

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

// ============ 类型定义 ============

// 提示策略类型
export type PromptStrategyType = "REMOVE" | "AVOID" | "IGNORE";

// 提示策略
export interface PromptStrategy {
  type: PromptStrategyType;
  name: string;
  description: string;
  difficulty: number; // 1-5 执行难度
  effectiveness: number; // 1-5 预期效果
  specificActions: string[]; // 具体行动步骤
  tips: string;
}

// 能力障碍维度
export type AbilityBarrierDimension =
  | "TIME" // 时间：增加执行所需时间
  | "MONEY" // 金钱：增加执行成本
  | "PHYSICAL" // 体力：增加体力消耗
  | "MENTAL" // 脑力：增加认知负担
  | "ROUTINE"; // 习惯：打破自动化流程

// 能力障碍设计
export interface AbilityBarrier {
  dimension: AbilityBarrierDimension;
  name: string;
  description: string;
  implementation: string[]; // 实施步骤
  frictionLevel: number; // 1-5 摩擦程度
}

// 戒除流程结果
export interface BreakFlowResult {
  promptStrategies: PromptStrategy[];
  abilityBarriers: AbilityBarrier[];
  recommendedOrder: string[]; // 推荐执行顺序
  summary: string;
}

// ============ Schema 定义 ============

const promptStrategySchema = z.object({
  type: z.enum(["REMOVE", "AVOID", "IGNORE"]).describe("策略类型"),
  name: z.string().describe("策略名称"),
  description: z.string().describe("策略描述"),
  difficulty: z.number().min(1).max(5).describe("执行难度 1-5"),
  effectiveness: z.number().min(1).max(5).describe("预期效果 1-5"),
  specificActions: z.array(z.string()).describe("具体行动步骤"),
  tips: z.string().describe("执行提示"),
});

const abilityBarrierSchema = z.object({
  dimension: z
    .enum(["TIME", "MONEY", "PHYSICAL", "MENTAL", "ROUTINE"])
    .describe("障碍维度"),
  name: z.string().describe("障碍名称"),
  description: z.string().describe("障碍描述"),
  implementation: z.array(z.string()).describe("实施步骤"),
  frictionLevel: z.number().min(1).max(5).describe("摩擦程度 1-5"),
});

const breakFlowResultSchema = z.object({
  promptStrategies: z.array(promptStrategySchema).describe("提示策略列表"),
  abilityBarriers: z.array(abilityBarrierSchema).describe("能力障碍列表"),
  recommendedOrder: z.array(z.string()).describe("推荐执行顺序"),
  summary: z.string().describe("整体建议总结"),
});

// ============ 核心函数 ============

/**
 * 生成三步戒除流程方案
 * Step 1: 提示策略（移除/规避/忽略触发提示）
 * Step 2: 能力障碍（增加执行难度）
 * Step 3: 动机调整（作为最后手段）
 */
export async function generateBreakFlow(params: {
  habitName: string;
  triggerContexts: string[]; // 已知的触发情境
  currentEnvironment?: string; // 当前环境描述
}): Promise<BreakFlowResult> {
  const { habitName, triggerContexts, currentEnvironment } = params;

  const { object } = await generateObject({
    model,
    schema: breakFlowResultSchema,
    prompt: `作为习惯设计专家，为戒除坏习惯设计三步流程方案。

坏习惯：${habitName}

已知触发情境：
${triggerContexts.map((c) => `- ${c}`).join("\n")}

${currentEnvironment ? `当前环境：${currentEnvironment}` : ""}

## 福格行为模型戒除策略（按优先级）

### Step 1: 提示策略（最优先）
三种方法处理触发提示：
1. **REMOVE（移除）**：完全移除触发提示
   - 例：删除游戏APP、扔掉零食
2. **AVOID（规避）**：避开触发环境
   - 例：走另一条路、不进超市零食区
3. **IGNORE（忽略）**：训练忽略提示
   - 例：设置手机静音、练习不响应冲动

### Step 2: 能力障碍（增加执行难度）
五个维度增加"摩擦"：
1. **TIME（时间）**：增加执行所需时间
   - 例：把零食藏到很远的柜子
2. **MONEY（金钱）**：增加执行成本
   - 例：不买大包装、只带现金
3. **PHYSICAL（体力）**：增加体力消耗
   - 例：把电视遥控器放到另一个房间
4. **MENTAL（脑力）**：增加认知负担
   - 例：需要解密码、需要记住复杂步骤
5. **ROUTINE（习惯）**：打破自动化流程
   - 例：改变手机APP位置、调整路线

### Step 3: 动机调整（最后手段）
通常不推荐作为主要手段，因为：
- 动机容易波动
- 需要持续的意志力
- 成功率相对较低

请设计：
1. 至少3个提示策略（每种类型至少1个）
2. 至少3个能力障碍（覆盖不同维度）
3. 推荐的执行顺序
4. 整体建议总结`,
  });

  return object;
}

/**
 * 单独生成提示策略
 */
export async function generatePromptStrategies(params: {
  habitName: string;
  triggerContexts: string[];
}): Promise<PromptStrategy[]> {
  const { habitName, triggerContexts } = params;

  const { object } = await generateObject({
    model,
    schema: z.object({
      strategies: z.array(promptStrategySchema).describe("提示策略列表"),
    }),
    prompt: `为戒除「${habitName}」设计提示策略。

已知触发情境：
${triggerContexts.map((c) => `- ${c}`).join("\n")}

请为每种策略类型（REMOVE/AVOID/IGNORE）提供至少1个具体方案。

策略类型说明：
- REMOVE：完全移除触发物/提示
- AVOID：避开触发环境/情境
- IGNORE：训练忽略/不响应提示`,
  });

  return object.strategies;
}

/**
 * 单独生成能力障碍设计
 */
export async function generateAbilityBarriers(params: {
  habitName: string;
  currentBehavior: string; // 当前执行行为的描述
}): Promise<AbilityBarrier[]> {
  const { habitName, currentBehavior } = params;

  const { object } = await generateObject({
    model,
    schema: z.object({
      barriers: z.array(abilityBarrierSchema).describe("能力障碍列表"),
    }),
    prompt: `为戒除「${habitName}」设计能力障碍，增加执行难度。

当前行为模式：${currentBehavior}

五个障碍维度：
1. TIME（时间）：增加执行所需时间
2. MONEY（金钱）：增加执行成本
3. PHYSICAL（体力）：增加体力消耗
4. MENTAL（脑力）：增加认知负担
5. ROUTINE（习惯）：打破自动化流程

请为至少3个维度设计具体的障碍方案。
每个方案要具体可执行，不要太复杂。`,
  });

  return object.barriers;
}

/**
 * 评估戒除方案的可行性
 */
export async function evaluateBreakPlan(params: {
  habitName: string;
  selectedStrategies: PromptStrategy[];
  selectedBarriers: AbilityBarrier[];
}): Promise<{
  feasibilityScore: number; // 1-10
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}> {
  const { habitName, selectedStrategies, selectedBarriers } = params;

  const { object } = await generateObject({
    model,
    schema: z.object({
      feasibilityScore: z.number().min(1).max(10).describe("可行性评分"),
      strengths: z.array(z.string()).describe("方案优势"),
      weaknesses: z.array(z.string()).describe("方案劣势"),
      suggestions: z.array(z.string()).describe("改进建议"),
    }),
    prompt: `评估这个戒除「${habitName}」的方案。

选择的提示策略：
${selectedStrategies.map((s) => `- ${s.name}：${s.description}`).join("\n")}

选择的能力障碍：
${selectedBarriers.map((b) => `- ${b.name}：${b.description}`).join("\n")}

评估标准：
1. 策略组合是否全面（提示+能力双管齐下）
2. 执行难度是否合理
3. 是否有明显漏洞
4. 长期可持续性

请给出评分（1-10）和详细分析。`,
  });

  return object;
}

// ============ 辅助常量 ============

export const PROMPT_STRATEGY_LABELS: Record<
  PromptStrategyType,
  { name: string; emoji: string }
> = {
  REMOVE: { name: "移除提示", emoji: "🗑️" },
  AVOID: { name: "规避提示", emoji: "🚫" },
  IGNORE: { name: "忽略提示", emoji: "🙈" },
};

export const ABILITY_BARRIER_LABELS: Record<
  AbilityBarrierDimension,
  { name: string; emoji: string }
> = {
  TIME: { name: "时间障碍", emoji: "⏰" },
  MONEY: { name: "金钱障碍", emoji: "💰" },
  PHYSICAL: { name: "体力障碍", emoji: "💪" },
  MENTAL: { name: "脑力障碍", emoji: "🧠" },
  ROUTINE: { name: "习惯障碍", emoji: "🔄" },
};
