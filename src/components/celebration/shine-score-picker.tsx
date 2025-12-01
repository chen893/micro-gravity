"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShineScorePickerProps {
  /**
   * 当前选中的分数
   */
  value?: number;
  /**
   * 分数变化回调
   */
  onChange: (score: number) => void;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: "sm" | "md" | "lg";
}

// 发光感表情配置
const SHINE_EMOJIS = [
  { score: 1, emoji: "😐", label: "一般" },
  { score: 2, emoji: "🙂", label: "还行" },
  { score: 3, emoji: "😊", label: "不错" },
  { score: 4, emoji: "😄", label: "很棒" },
  { score: 5, emoji: "🤩", label: "超棒" },
];

/**
 * 发光感评分组件
 * 用于记录用户庆祝后的积极情绪程度
 */
export function ShineScorePicker({
  value,
  onChange,
  disabled = false,
  size = "md",
}: ShineScorePickerProps) {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const buttonSizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2">
        {SHINE_EMOJIS.map(({ score, emoji }) => {
          const isSelected = value === score;
          const isHovered = hoveredScore === score;
          const isHighlighted =
            hoveredScore !== null
              ? score <= hoveredScore
              : score <= (value ?? 0);

          return (
            <motion.button
              key={score}
              type="button"
              disabled={disabled}
              onClick={() => onChange(score)}
              onMouseEnter={() => setHoveredScore(score)}
              onMouseLeave={() => setHoveredScore(null)}
              className={cn(
                "rounded-full transition-all duration-200",
                "flex items-center justify-center",
                buttonSizeClasses[size],
                sizeClasses[size],
                disabled && "cursor-not-allowed opacity-50",
                !disabled && "cursor-pointer hover:scale-110",
                isHighlighted
                  ? "opacity-100"
                  : "opacity-40 grayscale hover:opacity-70 hover:grayscale-0",
              )}
              whileTap={!disabled ? { scale: 0.9 } : undefined}
              animate={
                isSelected
                  ? {
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.3 },
                    }
                  : undefined
              }
            >
              <span
                className={cn(
                  "transition-transform",
                  isHovered && "animate-bounce",
                )}
              >
                {emoji}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 选中标签 */}
      <AnimatePresence mode="wait">
        {(value ?? hoveredScore) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <span className="text-muted-foreground text-sm">
              {SHINE_EMOJIS.find((e) => e.score === (hoveredScore ?? value))
                ?.label ?? ""}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 简化版发光感评分（仅显示数字）
 */
export function ShineScoreDisplay({ score }: { score: number }) {
  const config = SHINE_EMOJIS.find((e) => e.score === score);

  if (!config) return null;

  return (
    <div className="flex items-center gap-1">
      <span className="text-lg">{config.emoji}</span>
      <span className="text-muted-foreground text-sm">{config.label}</span>
    </div>
  );
}

/**
 * 获取发光感配置
 */
export function getShineConfig(score: number) {
  return SHINE_EMOJIS.find((e) => e.score === score);
}
