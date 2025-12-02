/**
 * 习惯医生 - 问题诊断模块
 * 按福格行为模型优先级诊断：提示 → 能力 → 动机
 */

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

// ============ 类型定义 ============

// 诊断类别（按优先级排序）
export type DiagnosisCategory = "PROMPT" | "ABILITY" | "MOTIVATION";

// 诊断结果
export interface Diagnosis {
  category: DiagnosisCategory;
  issue: string;
  confidence: number; // 0-1 置信度
  evidence: string[];
}

// 处方（解决方案）
export interface Prescription {
  category: DiagnosisCategory;
  title: string;
  description: string;
  steps: string[];
  difficulty: number; // 1-5 难度
  expectedTime: string; // 预期见效时间
}

// 诊断报告
export interface DiagnosisReport {
  habitName: string;
  mainIssue: Diagnosis;
  secondaryIssues: Diagnosis[];
  prescriptions: Prescription[];
  encouragement: string;
}

// 症状数据
export interface SymptomData {
  recentCompletionRate: number; // 0-1 近期完成率
  missedDays: number; // 最近7天漏打卡次数
  avgDifficulty?: number; // 平均难度评分
  commonMissReasons?: string[]; // 常见漏打原因
  streakBroken?: boolean; // 连续记录是否中断
  lastCompletedDaysAgo?: number; // 上次完成是几天前
}

// ============ Schema 定义 ============

const diagnosisCategorySchema = z.enum(["PROMPT", "ABILITY", "MOTIVATION"]);

const diagnosisSchema = z.object({
  category: diagnosisCategorySchema.describe("诊断类别"),
  issue: z.string().describe("问题描述"),
  confidence: z.number().min(0).max(1).describe("置信度 0-1"),
  evidence: z.array(z.string()).describe("证据列表"),
});

const prescriptionSchema = z.object({
  category: diagnosisCategorySchema.describe("对应的问题类别"),
  title: z.string().describe("处方标题"),
  description: z.string().describe("处方描述"),
  steps: z.array(z.string()).describe("执行步骤"),
  difficulty: z.number().min(1).max(5).describe("难度 1-5"),
  expectedTime: z.string().describe("预期见效时间"),
});

const diagnosisReportSchema = z.object({
  habitName: z.string().describe("习惯名称"),
  mainIssue: diagnosisSchema.describe("主要问题"),
  secondaryIssues: z.array(diagnosisSchema).describe("次要问题"),
  prescriptions: z.array(prescriptionSchema).describe("处方列表"),
  encouragement: z.string().describe("鼓励语"),
});

// ============ 核心函数 ============

/**
 * 快速诊断
 * 基于症状数据快速判断主要问题类别
 */
export function quickDiagnose(symptoms: SymptomData): DiagnosisCategory {
  // 规则1：如果漏打卡多但难度评分低，可能是提示问题
  if (symptoms.missedDays >= 3 && (symptoms.avgDifficulty ?? 3) <= 2) {
    return "PROMPT";
  }

  // 规则2：如果难度评分高，可能是能力问题
  if ((symptoms.avgDifficulty ?? 3) >= 4) {
    return "ABILITY";
  }

  // 规则3：如果完成率低且没有明显难度问题，可能是动机问题
  if (symptoms.recentCompletionRate < 0.3) {
    return "MOTIVATION";
  }

  // 默认：从提示开始检查
  return "PROMPT";
}

/**
 * AI 深度诊断
 * 全面分析问题并生成诊断报告
 */
export async function deepDiagnose(params: {
  habitName: string;
  habitDescription?: string;
  symptoms: SymptomData;
  userFeedback?: string;
  recentLogs?: Array<{
    date: string;
    completed: boolean;
    notes?: string;
    difficultyRating?: number;
  }>;
}): Promise<DiagnosisReport> {
  const { habitName, habitDescription, symptoms, userFeedback, recentLogs } =
    params;

  const { object } = await generateObject({
    model,
    schema: diagnosisReportSchema,
    prompt: `作为习惯医生，诊断这个习惯执行困难的原因。

习惯名称：${habitName}
${habitDescription ? `习惯描述：${habitDescription}` : ""}

症状数据：
- 近期完成率：${(symptoms.recentCompletionRate * 100).toFixed(0)}%
- 最近7天漏打卡：${symptoms.missedDays}天
${symptoms.avgDifficulty !== undefined ? `- 平均难度评分：${symptoms.avgDifficulty.toFixed(1)}/5` : ""}
${symptoms.streakBroken ? "- 连续记录已中断" : ""}
${symptoms.lastCompletedDaysAgo !== undefined ? `- 上次完成是${symptoms.lastCompletedDaysAgo}天前` : ""}
${symptoms.commonMissReasons?.length ? `- 常见漏打原因：${symptoms.commonMissReasons.join("、")}` : ""}

${userFeedback ? `用户反馈：${userFeedback}` : ""}

${
  recentLogs?.length
    ? `最近打卡记录：
${recentLogs.map((log) => `- ${log.date}: ${log.completed ? "完成" : "未完成"}${log.notes ? ` (${log.notes})` : ""}${log.difficultyRating ? ` 难度:${log.difficultyRating}` : ""}`).join("\n")}`
    : ""
}

## 福格行为模型诊断优先级

按以下顺序检查问题（从最容易解决到最难）：

### 1. 提示问题（PROMPT）- 最优先
- 锚点行为是否稳定可靠？
- 是否在正确的时机收到提示？
- 环境中是否有足够的触发线索？

### 2. 能力问题（ABILITY）- 次优先
- 行为是否足够简单（30秒内能完成）？
- 是否有资源、时间、精力障碍？
- 行为难度是否超出当前能力？

### 3. 动机问题（MOTIVATION）- 最后考虑
- 只有在提示和能力都没问题时才考虑动机
- 动机问题通常更难解决
- 可能需要重新连接深层愿望

请诊断主要问题和次要问题，并给出具体的处方建议。
处方应该具体可执行，难度从低到高排列。`,
  });

  return object;
}

/**
 * 生成针对性建议
 * 根据诊断类别生成具体建议
 */
export async function generatePrescription(params: {
  habitName: string;
  category: DiagnosisCategory;
  currentSetup?: {
    anchor?: string;
    behavior?: string;
    celebration?: string;
  };
}): Promise<Prescription[]> {
  const { habitName, category, currentSetup } = params;

  const categoryPrompts: Record<DiagnosisCategory, string> = {
    PROMPT: `针对「${habitName}」的提示问题，设计改进方案。

${currentSetup?.anchor ? `当前锚点：${currentSetup.anchor}` : ""}

重点考虑：
- 锚点是否足够稳定、可靠
- 是否需要增加额外的提示/提醒
- 环境设计是否支持习惯触发`,

    ABILITY: `针对「${habitName}」的能力问题，设计简化方案。

${currentSetup?.behavior ? `当前行为：${currentSetup.behavior}` : ""}

重点考虑：
- 如何将行为缩小到最简版本
- 如何移除执行障碍
- 是否需要准备工具/资源`,

    MOTIVATION: `针对「${habitName}」的动机问题，设计激励方案。

重点考虑：
- 如何重新连接深层愿望
- 如何增强即时满足感
- 如何通过庆祝强化正向体验

注意：动机问题通常是症状而非根因，优先检查提示和能力是否真的没问题。`,
  };

  const { object } = await generateObject({
    model,
    schema: z.object({
      prescriptions: z.array(prescriptionSchema).describe("处方列表"),
    }),
    prompt: `作为习惯医生，${categoryPrompts[category]}

请提供2-3个处方，从简单到复杂排列。
每个处方要具体可执行，不要笼统的建议。`,
  });

  return object.prescriptions;
}

// ============ 辅助常量 ============

export const DIAGNOSIS_CATEGORY_LABELS: Record<
  DiagnosisCategory,
  { name: string; emoji: string; description: string }
> = {
  PROMPT: {
    name: "提示问题",
    emoji: "🔔",
    description: "锚点不稳定或缺少触发线索",
  },
  ABILITY: {
    name: "能力问题",
    emoji: "💪",
    description: "行为太难或缺少资源",
  },
  MOTIVATION: {
    name: "动机问题",
    emoji: "❤️",
    description: "缺乏深层驱动力",
  },
};

// 常见症状与诊断映射
export const SYMPTOM_DIAGNOSIS_MAP: Record<string, DiagnosisCategory> = {
  忘记了: "PROMPT",
  没时间: "ABILITY",
  太累了: "ABILITY",
  不想做: "MOTIVATION",
  没意义: "MOTIVATION",
  太难了: "ABILITY",
  条件不允许: "ABILITY",
  没有提醒: "PROMPT",
  错过时机: "PROMPT",
};
