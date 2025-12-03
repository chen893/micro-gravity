"use client";

/**
 * 弹性打卡组件
 * 基于福格行为模型的弹性打卡机制，支持：
 * - 完成级别选择（最低标准/标准/超额）
 * - 进阶信号记录（想做更多/感觉轻松）
 * - 情感标志选择
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CompletionLevel, EmotionalMarker } from "@/lib/types";
import {
  Check,
  Sparkles,
  Target,
  Trophy,
  Smile,
  Frown,
  Meh,
  Heart,
  Star,
  AlertCircle,
} from "lucide-react";

// 完成级别配置
const COMPLETION_LEVELS: {
  value: CompletionLevel;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "MINIMUM",
    label: "最低标准",
    description: "完成了微习惯的最低要求",
    icon: <Check className="h-5 w-5" />,
    color: "border-green-500 bg-green-50 text-green-700",
  },
  {
    value: "STANDARD",
    label: "标准完成",
    description: "完成了当前阶段的标准要求",
    icon: <Target className="h-5 w-5" />,
    color: "border-blue-500 bg-blue-50 text-blue-700",
  },
  {
    value: "EXCEEDED",
    label: "超额完成",
    description: "超出预期，做得更多",
    icon: <Trophy className="h-5 w-5" />,
    color: "border-amber-500 bg-amber-50 text-amber-700",
  },
];

// 情感标志配置
const EMOTIONAL_MARKERS: {
  value: EmotionalMarker;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  signal: "advance" | "retreat" | "stay";
}[] = [
  {
    value: "JOY",
    label: "愉悦",
    description: "做这件事让我感到快乐",
    icon: <Smile className="h-5 w-5" />,
    color: "border-green-400 bg-green-50",
    signal: "stay",
  },
  {
    value: "PRIDE",
    label: "自豪",
    description: "完成后感到很有成就感",
    icon: <Star className="h-5 w-5" />,
    color: "border-amber-400 bg-amber-50",
    signal: "advance",
  },
  {
    value: "BOREDOM",
    label: "无聊",
    description: "感觉太简单了，有点无聊",
    icon: <Meh className="h-5 w-5" />,
    color: "border-gray-400 bg-gray-50",
    signal: "advance",
  },
  {
    value: "FRUSTRATION",
    label: "沮丧",
    description: "感觉有点难，有些沮丧",
    icon: <Frown className="h-5 w-5" />,
    color: "border-orange-400 bg-orange-50",
    signal: "retreat",
  },
  {
    value: "AVOIDANCE",
    label: "想逃避",
    description: "不太想做，想要逃避",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "border-red-300 bg-red-50",
    signal: "retreat",
  },
  {
    value: "PAIN",
    label: "痛苦",
    description: "做这件事让我感到痛苦",
    icon: <Heart className="h-5 w-5" />,
    color: "border-red-500 bg-red-50",
    signal: "retreat",
  },
];

export interface FlexibleCheckinData {
  completionLevel: CompletionLevel;
  actualBehavior?: string;
  wantedToDoMore: boolean;
  feltEasy: boolean;
  emotionalMarker?: EmotionalMarker;
}

interface FlexibleCheckinProps {
  habitName: string;
  microHabit: string;
  currentPhase?: number;
  onSubmit: (data: FlexibleCheckinData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function FlexibleCheckin({
  habitName,
  microHabit,
  currentPhase,
  onSubmit,
  onCancel,
  isLoading = false,
}: FlexibleCheckinProps) {
  const [completionLevel, setCompletionLevel] =
    useState<CompletionLevel>("MINIMUM");
  const [actualBehavior, setActualBehavior] = useState("");
  const [wantedToDoMore, setWantedToDoMore] = useState(false);
  const [feltEasy, setFeltEasy] = useState(false);
  const [emotionalMarker, setEmotionalMarker] = useState<
    EmotionalMarker | undefined
  >();

  const handleSubmit = () => {
    onSubmit({
      completionLevel,
      actualBehavior: actualBehavior.trim() || undefined,
      wantedToDoMore,
      feltEasy,
      emotionalMarker,
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-amber-500" />
          弹性打卡
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {habitName}
          {currentPhase && ` (阶段 ${currentPhase})`}
        </p>
        <p className="text-muted-foreground text-xs">微习惯：{microHabit}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 完成级别选择 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">完成级别</Label>
          <div className="grid grid-cols-1 gap-2">
            {COMPLETION_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setCompletionLevel(level.value)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all",
                  completionLevel === level.value
                    ? level.color
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    completionLevel === level.value
                      ? "bg-white/50"
                      : "bg-gray-100",
                  )}
                >
                  {level.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{level.label}</p>
                  <p className="text-xs opacity-70">{level.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 实际行为描述（可选） */}
        <div className="space-y-2">
          <Label htmlFor="actualBehavior" className="text-sm font-medium">
            实际做了什么？（可选）
          </Label>
          <Textarea
            id="actualBehavior"
            placeholder="简单描述你实际完成的内容..."
            value={actualBehavior}
            onChange={(e) => setActualBehavior(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>

        {/* 进阶信号 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">你的感受（进阶信号）</Label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setWantedToDoMore(!wantedToDoMore)}
              className={cn(
                "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm transition-all",
                wantedToDoMore
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <Sparkles className="h-4 w-4" />
              想做更多
            </button>
            <button
              type="button"
              onClick={() => setFeltEasy(!feltEasy)}
              className={cn(
                "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm transition-all",
                feltEasy
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <Check className="h-4 w-4" />
              感觉轻松
            </button>
          </div>
          {(wantedToDoMore || feltEasy) && (
            <p className="text-xs text-emerald-600">
              这是很好的进阶信号！系统会记录下来帮助评估你是否准备好进阶。
            </p>
          )}
        </div>

        {/* 情感标志（可选） */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">情感标志（可选）</Label>
          <div className="grid grid-cols-3 gap-2">
            {EMOTIONAL_MARKERS.map((marker) => (
              <button
                key={marker.value}
                type="button"
                onClick={() =>
                  setEmotionalMarker(
                    emotionalMarker === marker.value ? undefined : marker.value,
                  )
                }
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs transition-all",
                  emotionalMarker === marker.value
                    ? marker.color
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                {marker.icon}
                <span>{marker.label}</span>
              </button>
            ))}
          </div>
          {emotionalMarker &&
            (() => {
              const marker = EMOTIONAL_MARKERS.find(
                (m) => m.value === emotionalMarker,
              );
              if (!marker) return null;
              return (
                <p
                  className={cn(
                    "text-xs",
                    marker.signal === "retreat"
                      ? "text-orange-600"
                      : marker.signal === "advance"
                        ? "text-emerald-600"
                        : "text-gray-600",
                  )}
                >
                  {marker.description}
                </p>
              );
            })()}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2 pt-2">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              取消
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "提交中..." : "完成打卡"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FlexibleCheckin;
