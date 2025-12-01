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
import {
  Feather,
  ChevronRight,
  Loader2,
  DoorOpen,
  Shrink,
  Check,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EasyStrategy = "STARTER_STEP" | "SCALE_DOWN";

interface EasyStrategyStepProps {
  behavior: string;
  starterStep: { starterStep: string; explanation: string } | null;
  scaledBehavior: { scaledBehavior: string; explanation: string } | null;
  isLoadingStarter: boolean;
  isLoadingScaled: boolean;
  onGenerateStarter: () => void;
  onGenerateScaled: () => void;
  onComplete: (strategy: EasyStrategy, result: string) => void;
}

export function EasyStrategyStep({
  behavior,
  starterStep,
  scaledBehavior,
  isLoadingStarter,
  isLoadingScaled,
  onGenerateStarter,
  onGenerateScaled,
  onComplete,
}: EasyStrategyStepProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<EasyStrategy | null>(
    null,
  );

  const handleSelect = (strategy: EasyStrategy) => {
    setSelectedStrategy(strategy);
  };

  const handleComplete = () => {
    if (selectedStrategy === "STARTER_STEP" && starterStep) {
      onComplete(selectedStrategy, starterStep.starterStep);
    } else if (selectedStrategy === "SCALE_DOWN" && scaledBehavior) {
      onComplete(selectedStrategy, scaledBehavior.scaledBehavior);
    }
  };

  const isComplete =
    (selectedStrategy === "STARTER_STEP" && starterStep !== null) ||
    (selectedStrategy === "SCALE_DOWN" && scaledBehavior !== null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <Feather className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">让行为容易做</h2>
        <p className="text-muted-foreground mt-2">
          福格行为模型的核心：越容易，越容易坚持
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{behavior}</Badge>
          </div>
          <CardTitle className="text-base">选择简化策略</CardTitle>
          <CardDescription>
            两种方法都能让行为更容易开始，选择更适合你的
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 入门步骤策略 */}
          <div
            className={cn(
              "cursor-pointer rounded-lg border-2 p-4 transition-all",
              selectedStrategy === "STARTER_STEP"
                ? "border-primary bg-primary/5"
                : "border-muted hover:border-primary/50",
            )}
            onClick={() => handleSelect("STARTER_STEP")}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <DoorOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">入门步骤</h3>
                  {selectedStrategy === "STARTER_STEP" && (
                    <Check className="text-primary h-4 w-4" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  关注启动行为的第一步，就像打开一扇门
                </p>
                <div className="text-muted-foreground mt-2 text-xs">
                  <p>例如：</p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5">
                    <li>运动30分钟 → 穿上运动鞋</li>
                    <li>阅读1小时 → 把书放在桌上打开</li>
                  </ul>
                </div>
              </div>
            </div>

            {selectedStrategy === "STARTER_STEP" && (
              <div className="mt-4 border-t pt-4">
                {starterStep ? (
                  <div className="space-y-2">
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        {starterStep.starterStep}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex items-start gap-2 text-sm">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <p>{starterStep.explanation}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateStarter();
                    }}
                    disabled={isLoadingStarter}
                  >
                    {isLoadingStarter ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <DoorOpen className="mr-2 h-4 w-4" />
                        生成入门步骤
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* 缩小规模策略 */}
          <div
            className={cn(
              "cursor-pointer rounded-lg border-2 p-4 transition-all",
              selectedStrategy === "SCALE_DOWN"
                ? "border-primary bg-primary/5"
                : "border-muted hover:border-primary/50",
            )}
            onClick={() => handleSelect("SCALE_DOWN")}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                <Shrink className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">缩小规模</h3>
                  {selectedStrategy === "SCALE_DOWN" && (
                    <Check className="text-primary h-4 w-4" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  把行为本身缩到最小，30秒内能完成
                </p>
                <div className="text-muted-foreground mt-2 text-xs">
                  <p>例如：</p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5">
                    <li>运动30分钟 → 做1个深蹲</li>
                    <li>阅读1小时 → 读1页书</li>
                  </ul>
                </div>
              </div>
            </div>

            {selectedStrategy === "SCALE_DOWN" && (
              <div className="mt-4 border-t pt-4">
                {scaledBehavior ? (
                  <div className="space-y-2">
                    <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
                      <p className="font-medium text-purple-800 dark:text-purple-200">
                        {scaledBehavior.scaledBehavior}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex items-start gap-2 text-sm">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <p>{scaledBehavior.explanation}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateScaled();
                    }}
                    disabled={isLoadingScaled}
                  >
                    {isLoadingScaled ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Shrink className="mr-2 h-4 w-4" />
                        生成缩小版本
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <Button
            onClick={handleComplete}
            disabled={!isComplete}
            className="w-full"
          >
            继续设计配方
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
