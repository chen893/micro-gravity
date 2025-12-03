"use client";

/**
 * 习惯繁殖提示组件
 * 当习惯足够稳定时，提示用户可以扩展或繁殖新习惯
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  GitBranch,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";
import {
  type ProliferationType,
  type ProliferationSuggestion,
  type HabitStability,
} from "@/lib/ai/habit-proliferation";

interface ProliferationPromptProps {
  habitName: string;
  stability: HabitStability;
  suggestions: ProliferationSuggestion[];
  isLoading?: boolean;
  onSelectSuggestion: (suggestion: ProliferationSuggestion) => void;
  onDismiss: () => void;
  onLoadSuggestions?: () => void;
}

export function ProliferationPrompt({
  habitName,
  stability,
  suggestions,
  isLoading = false,
  onSelectSuggestion,
  onDismiss,
  onLoadSuggestions,
}: ProliferationPromptProps) {
  const [selectedType, setSelectedType] = useState<ProliferationType | null>(
    null,
  );

  const growthSuggestions = suggestions.filter((s) => s.type === "GROWTH");
  const spawnSuggestions = suggestions.filter((s) => s.type === "SPAWN");

  // 如果习惯还没准备好繁殖
  if (!stability.readyForProliferation) {
    return null;
  }

  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            习惯已稳定！
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          「{habitName}」已经成为你的一部分了，要不要考虑扩展它？
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 稳定性指标 */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-lg bg-white/50 p-2">
            <p className="text-2xl font-bold text-emerald-600">
              {Math.round(stability.factors.completionRate * 100)}%
            </p>
            <p className="text-muted-foreground text-xs">完成率</p>
          </div>
          <div className="rounded-lg bg-white/50 p-2">
            <p className="text-2xl font-bold text-emerald-600">
              {stability.factors.consecutiveDays}天
            </p>
            <p className="text-muted-foreground text-xs">连续天数</p>
          </div>
        </div>

        {/* 繁殖类型选择 */}
        {!selectedType && suggestions.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">你想怎么扩展这个习惯？</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedType("GROWTH");
                  onLoadSuggestions?.();
                }}
                className="flex flex-col items-center gap-2 rounded-lg border-2 border-emerald-200 bg-white p-4 transition-all hover:border-emerald-400 hover:shadow-md"
              >
                <TrendingUp className="h-8 w-8 text-emerald-500" />
                <span className="font-medium">生长</span>
                <span className="text-muted-foreground text-xs">
                  在原习惯上扩展
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType("SPAWN");
                  onLoadSuggestions?.();
                }}
                className="flex flex-col items-center gap-2 rounded-lg border-2 border-teal-200 bg-white p-4 transition-all hover:border-teal-400 hover:shadow-md"
              >
                <GitBranch className="h-8 w-8 text-teal-500" />
                <span className="font-medium">繁殖</span>
                <span className="text-muted-foreground text-xs">
                  衍生新习惯
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 加载中 */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        )}

        {/* 建议列表 */}
        {!isLoading && suggestions.length > 0 && (
          <div className="space-y-3">
            {/* 生长类建议 */}
            {growthSuggestions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">生长建议</span>
                </div>
                {growthSuggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={`growth-${index}`}
                    suggestion={suggestion}
                    onSelect={() => onSelectSuggestion(suggestion)}
                  />
                ))}
              </div>
            )}

            {/* 繁殖类建议 */}
            {spawnSuggestions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-teal-500" />
                  <span className="text-sm font-medium">繁殖建议</span>
                </div>
                {spawnSuggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={`spawn-${index}`}
                    suggestion={suggestion}
                    onSelect={() => onSelectSuggestion(suggestion)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 底部提示 */}
        <p className="text-muted-foreground text-center text-xs">
          不急着扩展，等你准备好了再说
        </p>
      </CardContent>
    </Card>
  );
}

// 建议卡片组件
function SuggestionCard({
  suggestion,
  onSelect,
}: {
  suggestion: ProliferationSuggestion;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-lg border bg-white p-3 text-left transition-all hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-medium">{suggestion.title}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {suggestion.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
              微习惯：{suggestion.microHabit}
            </span>
            <span className="text-muted-foreground text-xs">
              难度 {suggestion.estimatedDifficulty}/10
            </span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
      </div>
    </button>
  );
}

// 紧凑版繁殖提示（用于习惯卡片上）
export function ProliferationBadge({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 transition-all hover:bg-emerald-200",
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      可扩展
    </button>
  );
}

export default ProliferationPrompt;
