"use client";

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
  BellOff,
  Loader2,
  Trash2,
  EyeOff,
  Ban,
  Check,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PromptStrategy } from "@/lib/ai/break-habit-flow";
import { PROMPT_STRATEGY_LABELS } from "@/lib/ai/break-habit-flow";

interface PromptStrategyStepProps {
  habitName: string;
  triggerContexts: string[];
  strategies: PromptStrategy[];
  selectedStrategies: PromptStrategy[];
  isLoading: boolean;
  onGenerate: () => void;
  onSelectStrategy: (strategy: PromptStrategy) => void;
  onComplete: () => void;
}

const STRATEGY_ICONS = {
  REMOVE: Trash2,
  AVOID: Ban,
  IGNORE: EyeOff,
};

export function PromptStrategyStep({
  habitName,
  triggerContexts,
  strategies,
  selectedStrategies,
  isLoading,
  onGenerate,
  onSelectStrategy,
  onComplete,
}: PromptStrategyStepProps) {
  const isSelected = (strategy: PromptStrategy) =>
    selectedStrategies.some((s) => s.name === strategy.name);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <BellOff className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold">提示策略</h2>
        <p className="text-muted-foreground mt-2">
          减少或消除触发「{habitName}」的提示
        </p>
      </div>

      {/* 已知触发情境 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">已知触发情境</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {triggerContexts.map((context, index) => (
              <Badge key={index} variant="outline">
                {context}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {strategies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              AI 将为你设计三种类型的提示策略
            </p>
            <Button onClick={onGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <BellOff className="mr-2 h-4 w-4" />
                  生成提示策略
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* 策略说明 */}
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium">三种策略类型：</p>
            <ul className="text-muted-foreground mt-2 space-y-1">
              <li>
                🗑️ <strong>移除</strong>：完全移除触发物
              </li>
              <li>
                🚫 <strong>规避</strong>：避开触发环境
              </li>
              <li>
                🙈 <strong>忽略</strong>：训练不响应提示
              </li>
            </ul>
          </div>

          {/* 策略列表 */}
          <ScrollArea className="h-[300px]">
            <div className="space-y-3 pr-4">
              {strategies.map((strategy, index) => {
                const Icon = STRATEGY_ICONS[strategy.type];
                const label = PROMPT_STRATEGY_LABELS[strategy.type];
                const selected = isSelected(strategy);

                return (
                  <button
                    key={index}
                    onClick={() => onSelectStrategy(strategy)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all",
                      selected
                        ? "border-primary bg-primary/5 ring-primary ring-2"
                        : "hover:bg-muted/50",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          strategy.type === "REMOVE" &&
                            "bg-red-100 dark:bg-red-950",
                          strategy.type === "AVOID" &&
                            "bg-amber-100 dark:bg-amber-950",
                          strategy.type === "IGNORE" &&
                            "bg-blue-100 dark:bg-blue-950",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            strategy.type === "REMOVE" && "text-red-600",
                            strategy.type === "AVOID" && "text-amber-600",
                            strategy.type === "IGNORE" && "text-blue-600",
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {label.emoji} {label.name}
                          </Badge>
                          {selected && (
                            <Check className="text-primary h-4 w-4" />
                          )}
                        </div>
                        <h4 className="mt-1 font-medium">{strategy.name}</h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {strategy.description}
                        </p>
                        <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
                          <span>难度: {strategy.difficulty}/5</span>
                          <span>效果: {strategy.effectiveness}/5</span>
                        </div>
                      </div>
                    </div>

                    {selected && (
                      <div className="mt-3 border-t pt-3">
                        <p className="mb-2 text-xs font-medium">具体步骤：</p>
                        <ul className="text-muted-foreground space-y-1 text-xs">
                          {strategy.specificActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-primary">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 flex items-start gap-1 text-xs">
                          <Lightbulb className="h-3 w-3 shrink-0 text-amber-500" />
                          <span className="text-muted-foreground">
                            {strategy.tips}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* 继续按钮 */}
          <Button
            onClick={onComplete}
            disabled={selectedStrategies.length === 0}
            className="w-full"
          >
            继续设计能力障碍
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
