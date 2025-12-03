import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============ 日期工具函数 ============

/**
 * 获取指定天数前的日期（零点）
 * @param days 天数
 * @returns 指定天数前的日期对象
 */
export function getDaysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * 获取今天零点的日期
 * @returns 今天零点的日期对象
 */
export function getToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * 计算两个日期之间的天数差
 * @param date1 日期1
 * @param date2 日期2
 * @returns 天数差（绝对值）
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / oneDay);
}

/**
 * 计算距离今天的天数
 * @param date 目标日期
 * @returns 距离今天的天数
 */
export function daysFromToday(date: Date): number {
  return daysBetween(new Date(), date);
}

// ============ 类型守卫函数 ============

/**
 * 阶段配置类型
 */
export interface PhaseConfigData {
  phase: number;
  name: string;
  microHabit: string;
  successCriteria: string;
  estimatedDuration: string;
  advanceSignals: string[];
  tips: string[];
}

/**
 * 验证是否为有效的阶段配置
 */
export function isPhaseConfig(value: unknown): value is PhaseConfigData {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.phase === "number" &&
    typeof obj.name === "string" &&
    typeof obj.microHabit === "string"
  );
}

/**
 * 安全解析阶段配置数组
 * @param value 未知类型的值
 * @returns 阶段配置数组或空数组
 */
export function parsePhaseConfigs(value: unknown): PhaseConfigData[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isPhaseConfig);
}

/**
 * 安全解析 JSON 字段
 * @param value 未知类型的值
 * @param validator 验证函数
 * @param defaultValue 默认值
 * @returns 解析后的值或默认值
 */
export function safeParseJson<T>(
  value: unknown,
  validator: (v: unknown) => v is T,
  defaultValue: T,
): T {
  if (validator(value)) return value;
  return defaultValue;
}
