"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Target,
  ChevronRight,
  Loader2,
  Star,
  AlertTriangle,
  Zap,
  Ban,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BehaviorAssessment, FocusMapResult } from "@/lib/ai/focus-map";

interface FocusMapStepProps {
  focusMapResult: FocusMapResult | null;
  isLoading: boolean;
  onGenerate: () => void;
  onSelectBehavior: (behavior: BehaviorAssessment) => void;
  selectedBehaviorName: string | null;
}

const QUADRANT_CONFIG = {
  GOLDEN: {
    label: "黄金行为",
    description: "高影响力 + 容易做",
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    badgeVariant: "default" as const,
  },
  HIGH_IMPACT: {
    label: "高影响但难",
    description: "需要拆解成更小的步骤",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    badgeVariant: "secondary" as const,
  },
  EASY_WIN: {
    label: "简单小胜",
    description: "容易做但影响有限",
    icon: Zap,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    badgeVariant: "outline" as const,
  },
  AVOID: {
    label: "避免区",
    description: "难做且影响小",
    icon: Ban,
    color: "text-gray-400",
    bgColor: "bg-gray-50 dark:bg-gray-950/30",
    borderColor: "border-gray-200 dark:border-gray-800",
    badgeVariant: "outline" as const,
  },
};

export function FocusMapStep({
  focusMapResult,
  isLoading,
  onGenerate,
  onSelectBehavior,
  selectedBehaviorName,
}: FocusMapStepProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const groupedBehaviors = focusMapResult?.behaviors.reduce(
    (acc, behavior) => {
      const quadrant = behavior.quadrant;
      acc[quadrant] ??= [];
      acc[quadrant].push(behavior);
      return acc;
    },
    {} as Record<string, BehaviorAssessment[]>,
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
          <Target className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold">焦点地图</h2>
        <p className="text-muted-foreground mt-2">
          找到影响力高且容易做到的「黄金行为」
        </p>
      </div>

      {!focusMapResult ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              AI 将评估每个行为的影响力和可行性，帮你找到最佳起点
            </p>
            <Button onClick={onGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  正在分析...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  生成焦点地图
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* AI 推荐的黄金行为 */}
          {focusMapResult.goldenBehavior && (
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base">AI 推荐的黄金行为</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-white p-3 dark:bg-gray-900">
                  <p className="font-medium">
                    {focusMapResult.goldenBehavior.name}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {focusMapResult.goldenBehavior.reason}
                  </p>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-100/50 p-3 dark:border-amber-800 dark:bg-amber-900/30">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    微习惯版本：
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {focusMapResult.goldenBehavior.microVersion}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 视图切换 */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {focusMapResult.summary}
            </p>
            <div className="flex gap-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                矩阵
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                列表
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            /* 2x2 矩阵视图 */
            <div className="grid grid-cols-2 gap-3">
              {(["GOLDEN", "HIGH_IMPACT", "EASY_WIN", "AVOID"] as const).map(
                (quadrant) => {
                  const config = QUADRANT_CONFIG[quadrant];
                  const behaviors = groupedBehaviors?.[quadrant] ?? [];
                  const Icon = config.icon;

                  return (
                    <Card
                      key={quadrant}
                      className={cn("min-h-[180px]", config.borderColor)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("h-4 w-4", config.color)} />
                          <CardTitle className="text-sm">
                            {config.label}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          {config.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ScrollArea className="h-[100px]">
                          <div className="space-y-1">
                            {behaviors.length > 0 ? (
                              behaviors.map((behavior, index) => (
                                <button
                                  key={index}
                                  onClick={() => onSelectBehavior(behavior)}
                                  className={cn(
                                    "w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                                    selectedBehaviorName === behavior.name
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-muted",
                                  )}
                                >
                                  <div className="flex items-center gap-1">
                                    {selectedBehaviorName === behavior.name && (
                                      <Check className="h-3 w-3 shrink-0" />
                                    )}
                                    <span className="line-clamp-2">
                                      {behavior.name}
                                    </span>
                                  </div>
                                </button>
                              ))
                            ) : (
                              <p className="text-muted-foreground text-xs">
                                暂无行为
                              </p>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  );
                },
              )}
            </div>
          ) : (
            /* 列表视图 */
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 pr-4">
                {focusMapResult.behaviors.map((behavior, index) => {
                  const config = QUADRANT_CONFIG[behavior.quadrant];
                  const Icon = config.icon;
                  const isSelected = selectedBehaviorName === behavior.name;

                  return (
                    <button
                      key={index}
                      onClick={() => onSelectBehavior(behavior)}
                      className={cn(
                        "w-full rounded-lg border p-3 text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 ring-primary ring-2"
                          : "hover:bg-muted/50",
                        config.borderColor,
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className={cn("h-4 w-4", config.color)} />
                            <span className="font-medium">{behavior.name}</span>
                            {isSelected && (
                              <Check className="text-primary h-4 w-4" />
                            )}
                          </div>
                          {behavior.description && (
                            <p className="text-muted-foreground mt-1 text-sm">
                              {behavior.description}
                            </p>
                          )}
                          <p className="text-muted-foreground mt-1 text-xs">
                            {behavior.recommendation}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            variant={config.badgeVariant}
                            className="text-xs"
                          >
                            {config.label}
                          </Badge>
                          <div className="text-muted-foreground flex gap-2 text-xs">
                            <span>影响力: {behavior.impactScore}</span>
                            <span>可行性: {behavior.feasibilityScore}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          {/* 提示 */}
          {!selectedBehaviorName && (
            <div className="bg-muted flex items-center gap-2 rounded-lg p-3 text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>请选择一个行为作为你的习惯目标</span>
            </div>
          )}

          {selectedBehaviorName && (
            <Button className="w-full">
              继续设计习惯
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
