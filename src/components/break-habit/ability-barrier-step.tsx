"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Loader2,
  Clock,
  Wallet,
  Dumbbell,
  Brain,
  RotateCcw,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  AbilityBarrier,
  AbilityBarrierDimension,
} from "@/lib/ai/break-habit-flow";
import { ABILITY_BARRIER_LABELS } from "@/lib/ai/break-habit-flow";

interface AbilityBarrierStepProps {
  habitName: string;
  barriers: AbilityBarrier[];
  selectedBarriers: AbilityBarrier[];
  isLoading: boolean;
  onGenerate: () => void;
  onSelectBarrier: (barrier: AbilityBarrier) => void;
  onComplete: () => void;
}

const DIMENSION_ICONS: Record<AbilityBarrierDimension, React.ElementType> = {
  TIME: Clock,
  MONEY: Wallet,
  PHYSICAL: Dumbbell,
  MENTAL: Brain,
  ROUTINE: RotateCcw,
};

const DIMENSION_COLORS: Record<AbilityBarrierDimension, string> = {
  TIME: "bg-blue-100 text-blue-600 dark:bg-blue-950",
  MONEY: "bg-green-100 text-green-600 dark:bg-green-950",
  PHYSICAL: "bg-orange-100 text-orange-600 dark:bg-orange-950",
  MENTAL: "bg-purple-100 text-purple-600 dark:bg-purple-950",
  ROUTINE: "bg-pink-100 text-pink-600 dark:bg-pink-950",
};

export function AbilityBarrierStep({
  habitName,
  barriers,
  selectedBarriers,
  isLoading,
  onGenerate,
  onSelectBarrier,
  onComplete,
}: AbilityBarrierStepProps) {
  const isSelected = (barrier: AbilityBarrier) =>
    selectedBarriers.some((b) => b.name === barrier.name);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
          <Shield className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold">能力障碍</h2>
        <p className="text-muted-foreground mt-2">
          增加执行「{habitName}」的难度，让它更难做到
        </p>
      </div>

      {barriers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              AI 将从五个维度设计能力障碍
            </p>
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {Object.entries(ABILITY_BARRIER_LABELS).map(
                ([key, { emoji, name }]) => (
                  <Badge key={key} variant="outline" className="text-xs">
                    {emoji} {name}
                  </Badge>
                ),
              )}
            </div>
            <Button onClick={onGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  设计中...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  生成能力障碍
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* 原理说明 */}
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium">增加「摩擦」的五个维度：</p>
            <ul className="text-muted-foreground mt-2 grid grid-cols-2 gap-1 text-xs">
              <li>⏰ 时间：增加执行时间</li>
              <li>💰 金钱：增加执行成本</li>
              <li>💪 体力：增加体力消耗</li>
              <li>🧠 脑力：增加认知负担</li>
              <li>🔄 习惯：打破自动化</li>
            </ul>
          </div>

          {/* 障碍列表 */}
          <ScrollArea className="h-[300px]">
            <div className="space-y-3 pr-4">
              {barriers.map((barrier, index) => {
                const Icon = DIMENSION_ICONS[barrier.dimension];
                const label = ABILITY_BARRIER_LABELS[barrier.dimension];
                const colorClass = DIMENSION_COLORS[barrier.dimension];
                const selected = isSelected(barrier);

                return (
                  <button
                    key={index}
                    onClick={() => onSelectBarrier(barrier)}
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
                          colorClass,
                        )}
                      >
                        <Icon className="h-5 w-5" />
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
                        <h4 className="mt-1 font-medium">{barrier.name}</h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {barrier.description}
                        </p>
                        <div className="mt-2">
                          <span className="text-muted-foreground text-xs">
                            摩擦程度: {"🔥".repeat(barrier.frictionLevel)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selected && (
                      <div className="mt-3 border-t pt-3">
                        <p className="mb-2 text-xs font-medium">实施步骤：</p>
                        <ul className="text-muted-foreground space-y-1 text-xs">
                          {barrier.implementation.map((step, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-primary font-medium">
                                {i + 1}.
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
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
            disabled={selectedBarriers.length === 0}
            className="w-full"
          >
            继续设计习惯替换
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
