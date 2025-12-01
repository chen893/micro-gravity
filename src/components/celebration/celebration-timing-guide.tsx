"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 庆祝三时机 - 基于福格行为模型
 * 1. 行为后立即庆祝 (Immediately after behavior)
 * 2. 回想时庆祝 (When recalling)
 * 3. 记录时庆祝 (When recording)
 */

interface CelebrationTimingGuideProps {
  /**
   * 当前时机
   */
  currentTiming: "immediate" | "recall" | "record";
  /**
   * 尺寸
   */
  size?: "sm" | "md" | "lg";
  /**
   * 是否显示完整说明
   */
  showDescription?: boolean;
}

const TIMINGS = [
  {
    id: "immediate" as const,
    icon: Sparkles,
    label: "即时庆祝",
    shortLabel: "即时",
    description: "行为完成的瞬间，用最自然的方式庆祝",
    tip: "这是最有效的时机！让大脑将积极情绪与行为关联",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "recall" as const,
    icon: Brain,
    label: "回想庆祝",
    shortLabel: "回想",
    description: "回想起自己完成行为时，再次感受那份成就感",
    tip: "强化记忆：每次想起就庆祝，让习惯更牢固",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "record" as const,
    icon: PenLine,
    label: "记录庆祝",
    shortLabel: "记录",
    description: "打卡记录时，为自己的坚持庆祝",
    tip: "现在就是好时机！为今天的自己感到骄傲",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

export function CelebrationTimingGuide({
  currentTiming,
  size = "md",
  showDescription = true,
}: CelebrationTimingGuideProps) {
  const currentTimingData = TIMINGS.find((t) => t.id === currentTiming);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="space-y-3">
      {/* 时机指示器 */}
      <div className="flex items-center justify-center gap-2">
        {TIMINGS.map((timing, index) => {
          const Icon = timing.icon;
          const isActive = timing.id === currentTiming;
          const isPast =
            TIMINGS.findIndex((t) => t.id === currentTiming) > index;

          return (
            <div key={timing.id} className="flex items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive ? 1 : isPast ? 0.7 : 0.4,
                }}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-2 transition-colors",
                  isActive && timing.bgColor,
                )}
              >
                <div
                  className={cn(
                    "rounded-full p-1.5",
                    isActive ? timing.color : "text-muted-foreground",
                  )}
                >
                  <Icon className={iconSizeClasses[size]} />
                </div>
                <span
                  className={cn(
                    sizeClasses[size],
                    isActive ? "font-medium" : "text-muted-foreground",
                  )}
                >
                  {size === "sm" ? timing.shortLabel : timing.label}
                </span>
              </motion.div>

              {/* 连接线 */}
              {index < TIMINGS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-px w-4",
                    isPast ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 当前时机说明 */}
      {showDescription && currentTimingData && (
        <motion.div
          key={currentTiming}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-lg border p-3 text-center",
            currentTimingData.bgColor,
          )}
        >
          <p className={cn(sizeClasses[size], "text-muted-foreground")}>
            {currentTimingData.tip}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * 简化版时机提示
 */
export function CelebrationTimingTip({
  timing,
}: {
  timing: "immediate" | "recall" | "record";
}) {
  const timingData = TIMINGS.find((t) => t.id === timing);
  if (!timingData) return null;

  const Icon = timingData.icon;

  return (
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      <Icon className={cn("h-4 w-4", timingData.color)} />
      <span>{timingData.tip}</span>
    </div>
  );
}

/**
 * 获取时机配置
 */
export function getTimingConfig(timing: "immediate" | "recall" | "record") {
  return TIMINGS.find((t) => t.id === timing);
}
