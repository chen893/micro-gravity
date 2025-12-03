/**
 * 阶段路径设计模块
 * 基于福格原理："不要过早提高标准。让动机来告诉你该做多少。"
 *
 * 核心理念：
 * - 微习惯是"最低标准"，用户可以随时做更多
 * - 进阶是"自然生长"，不是"强制升级"
 * - 保持灵活性，状态不好时可以回退到最低标准
 */

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

// ============ 类型定义 ============

/**
 * 单个阶段配置
 */
export interface PhaseConfig {
  phase: number;
  name: string;
  microHabit: string; // 这个阶段的最低标准
  successCriteria: string; // 什么算完成
  estimatedDuration: string; // 建议持续时间（仅参考）
  advanceSignals: string[]; // 可以进阶的信号
  tips: string[];
}

/**
 * 完整阶段路径
 */
export interface PhasePath {
  targetHabit: string;
  totalPhases: number;
  phases: PhaseConfig[];
  notes: string; // 设计说明
}

/**
 * 用户上下文（用于个性化设计）
 */
export interface UserContext {
  currentLevel?: string; // 当前水平
  availableTime?: string; // 可用时间
  constraints?: string[]; // 限制条件
  pastAttempts?: string[]; // 过去的尝试
}

// ============ Schema 定义 ============

const phaseConfigSchema = z.object({
  phase: z.number().describe("阶段编号，从1开始"),
  name: z.string().describe("阶段名称，如「准备阶段」"),
  microHabit: z.string().describe("这个阶段的最低标准，必须2分钟内能完成"),
  successCriteria: z.string().describe("明确的成功标准"),
  estimatedDuration: z.string().describe("建议持续时间，如「7-14天」"),
  advanceSignals: z
    .array(z.string())
    .describe("可以进阶的信号，如「连续5天轻松完成」"),
  tips: z.array(z.string()).describe("这个阶段的小贴士"),
});

const phasePathSchema = z.object({
  targetHabit: z.string().describe("目标习惯"),
  totalPhases: z.number().describe("总阶段数"),
  phases: z.array(phaseConfigSchema).describe("阶段配置数组"),
  notes: z.string().describe("设计说明和注意事项"),
});

// ============ 核心函数 ============

/**
 * AI 设计阶段路径
 * 将目标习惯拆解为渐进式阶段
 */
export async function designPhasePath(params: {
  targetHabit: string;
  userContext?: UserContext;
}): Promise<PhasePath> {
  const { targetHabit, userContext } = params;

  
  const { object } = await generateObject({
    model,
    schema: phasePathSchema,
    prompt: `你是微习惯设计专家。根据福格行为模型，将目标习惯拆解为渐进式阶段。

目标习惯：${targetHabit}

${userContext?.currentLevel ? `用户当前水平：${userContext.currentLevel}` : ""}
${userContext?.availableTime ? `可用时间：${userContext.availableTime}` : ""}
${userContext?.constraints?.length ? `限制条件：${userContext.constraints.join("、")}` : ""}
${userContext?.pastAttempts?.length ? `过去尝试：${userContext.pastAttempts.join("、")}` : ""}

## 设计原则

1. **第一阶段必须是"2分钟规则"内能完成的微习惯**
   - 不是目标习惯的缩小版，而是"准备动作"
   - 例如：目标"跑步30分钟" → 阶段1"穿上运动鞋"

2. **每个阶段的难度提升不超过20%**
   - 每次只增加一点点
   - 保持"不可能失败"的感觉

3. **阶段之间不设固定时间，由用户自然生长**
   - 时间只是参考，不是要求
   - 用户感觉"想多做"时才进阶

4. **每个阶段都可以是"最终状态"**
   - 用户可以停在任何阶段
   - 没有必须达到的终点

5. **进阶信号要具体可观察**
   - "连续5天轻松完成"
   - "开始觉得不够了"
   - "主动想做更多"

## 阶段设计模式

示例：目标「每天运动1小时」

阶段1：穿好运动鞋站起来（微习惯）
阶段2：穿好装备走出门
阶段3：走10分钟
阶段4：走20分钟或慢跑5分钟
阶段5：运动30分钟
阶段6：运动45分钟
阶段7：运动1小时

请为这个目标习惯设计5-8个渐进式阶段。`,
  });

  return object;
}

/**
 * 生成快速阶段路径
 * 用于简单习惯，生成3-5个阶段
 */
export async function designQuickPath(params: {
  targetHabit: string;
  targetDuration?: string; // 目标时长，如 "30分钟"
}): Promise<PhasePath> {
  const { targetHabit, targetDuration } = params;

  const { object } = await generateObject({
    model,
    schema: phasePathSchema,
    prompt: `快速设计习惯阶段路径。

目标习惯：${targetHabit}
${targetDuration ? `目标时长：${targetDuration}` : ""}

设计3-5个简洁的阶段，从"30秒能完成的准备动作"开始，逐步接近目标。

原则：
1. 阶段1必须是准备动作（穿衣服、打开app、走到某处等）
2. 每个阶段只增加一点点难度
3. 进阶信号要具体（"连续X天轻松完成"）`,
  });

  return object;
}

/**
 * 建议下一阶段
 * 根据当前阶段和用户状态，建议是否进阶或退阶
 */
export async function suggestNextPhase(params: {
  habitName: string;
  currentPhase: PhaseConfig;
  nextPhase?: PhaseConfig;
  recentStats: {
    completionRate: number; // 近7天完成率
    avgDifficulty: number; // 平均难度评分 1-5
    consecutiveDays: number; // 连续完成天数
    wantToDoMore: boolean; // 用户是否表示想做更多
  };
}): Promise<{
  recommendation: "STAY" | "ADVANCE" | "RETREAT";
  reason: string;
  encouragement: string;
}> {
  const { currentPhase, nextPhase, recentStats } = params;

  // 规则1：完成率低于70%，建议保持或退阶
  if (recentStats.completionRate < 0.7) {
    return {
      recommendation: "RETREAT",
      reason: "近期完成率偏低，建议先稳固当前阶段",
      encouragement: "没关系，回到舒适区重新积累力量。习惯的根基比高度更重要！",
    };
  }

  // 规则2：难度评分高（>=4），建议保持
  if (recentStats.avgDifficulty >= 4) {
    return {
      recommendation: "STAY",
      reason: "当前阶段还有挑战性，继续巩固",
      encouragement: "你正在适应这个阶段，坚持下去会越来越轻松！",
    };
  }

  // 规则3：连续完成5天以上 + 难度低 + 想做更多 → 建议进阶
  if (
    recentStats.consecutiveDays >= 5 &&
    recentStats.avgDifficulty <= 2 &&
    recentStats.wantToDoMore &&
    nextPhase
  ) {
    return {
      recommendation: "ADVANCE",
      reason: `连续${recentStats.consecutiveDays}天完成，而且你想做更多，时机成熟了`,
      encouragement: `太棒了！你已经准备好迎接下一步：「${nextPhase.name}」`,
    };
  }

  // 规则4：连续完成7天以上 + 难度低 → 轻度建议进阶
  if (
    recentStats.consecutiveDays >= 7 &&
    recentStats.avgDifficulty <= 2 &&
    nextPhase
  ) {
    return {
      recommendation: "ADVANCE",
      reason: "已经连续完成一周且感觉轻松，可以考虑下一步",
      encouragement: `这个阶段已经成为你的一部分了！想不想试试「${nextPhase.name}」？`,
    };
  }

  // 默认：保持当前阶段
  return {
    recommendation: "STAY",
    reason: "当前节奏刚刚好，继续保持",
    encouragement: `「${currentPhase.name}」正在成为你的习惯，每一天都在生根！`,
  };
}

// ============ 辅助常量 ============

/**
 * 常见习惯的阶段模板
 */
export const PHASE_TEMPLATES: Record<string, PhaseConfig[]> = {
  exercise: [
    {
      phase: 1,
      name: "准备阶段",
      microHabit: "穿上运动服和鞋",
      successCriteria: "穿好装备站起来",
      estimatedDuration: "7天",
      advanceSignals: ["连续5天轻松完成", "穿好后想动一动"],
      tips: ["把运动服放在显眼的地方", "早上起床后立即换装"],
    },
    {
      phase: 2,
      name: "出门阶段",
      microHabit: "穿好装备走出家门",
      successCriteria: "走出门站1分钟",
      estimatedDuration: "7天",
      advanceSignals: ["出门后不想马上回去", "开始期待出门"],
      tips: ["不设运动目标", "出门就是胜利"],
    },
    {
      phase: 3,
      name: "短时运动",
      microHabit: "走路或慢跑10分钟",
      successCriteria: "完成10分钟轻度运动",
      estimatedDuration: "14天",
      advanceSignals: ["10分钟觉得不够", "呼吸和心率适应良好"],
      tips: ["不追求速度", "享受过程"],
    },
  ],
  reading: [
    {
      phase: 1,
      name: "打开书",
      microHabit: "打开书看一眼目录",
      successCriteria: "翻开书本",
      estimatedDuration: "7天",
      advanceSignals: ["打开后想看两眼内容", "连续5天轻松完成"],
      tips: ["把书放在枕头旁或固定位置", "睡前打开"],
    },
    {
      phase: 2,
      name: "读一页",
      microHabit: "读一页书",
      successCriteria: "读完一整页",
      estimatedDuration: "7天",
      advanceSignals: ["一页觉得不够", "开始对内容感兴趣"],
      tips: ["不强求记住", "享受阅读本身"],
    },
    {
      phase: 3,
      name: "读5分钟",
      microHabit: "阅读5分钟",
      successCriteria: "计时阅读5分钟",
      estimatedDuration: "14天",
      advanceSignals: ["5分钟后不想停", "开始沉浸其中"],
      tips: ["设置轻柔的计时器", "到时间可以继续也可以停"],
    },
  ],
  meditation: [
    {
      phase: 1,
      name: "坐下来",
      microHabit: "找个安静的地方坐下",
      successCriteria: "安静坐30秒",
      estimatedDuration: "7天",
      advanceSignals: ["坐下后感觉舒适", "想多待一会"],
      tips: ["固定一个冥想位置", "不用闭眼"],
    },
    {
      phase: 2,
      name: "深呼吸",
      microHabit: "做3次深呼吸",
      successCriteria: "完成3次深呼吸",
      estimatedDuration: "7天",
      advanceSignals: ["呼吸后感觉平静", "想继续呼吸"],
      tips: ["不追求完美", "自然呼吸"],
    },
    {
      phase: 3,
      name: "1分钟静坐",
      microHabit: "闭眼静坐1分钟",
      successCriteria: "完成1分钟冥想",
      estimatedDuration: "14天",
      advanceSignals: ["1分钟太短", "开始享受安静"],
      tips: ["走神是正常的", "温柔地把注意力带回"],
    },
  ],
};

/**
 * 进阶信号类型
 */
export const ADVANCE_SIGNAL_TYPES = {
  CONSISTENCY: "连续完成信号", // 连续X天完成
  EASE: "轻松完成信号", // 难度评分低
  DESIRE: "想做更多信号", // 用户主动表示
  OVERFLOW: "溢出完成信号", // 经常超额完成
};

/**
 * 退阶信号类型
 */
export const RETREAT_SIGNAL_TYPES = {
  STRUGGLE: "挣扎信号", // 难度评分高
  INCONSISTENT: "不稳定信号", // 完成率波动大
  NEGATIVE: "负面情绪信号", // 沮丧、逃避、痛苦
  AVOIDANCE: "回避信号", // 连续多天未完成
};
