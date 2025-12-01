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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  BellOff,
  Shield,
  RefreshCw,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptStrategyStep } from "./prompt-strategy-step";
import { AbilityBarrierStep } from "./ability-barrier-step";
import { HabitSwapStep } from "./habit-swap-step";
import type { PromptStrategy, AbilityBarrier } from "@/lib/ai/break-habit-flow";
import type { SwapRecipe, NeedAnalysis } from "@/lib/ai/habit-swap";

type Step = "prompt" | "ability" | "swap" | "summary";

const STEPS: Step[] = ["prompt", "ability", "swap", "summary"];

const STEP_CONFIG: Record<
  Step,
  { label: string; description: string; icon: React.ElementType }
> = {
  prompt: {
    label: "提示策略",
    description: "移除、规避或忽略触发提示",
    icon: BellOff,
  },
  ability: {
    label: "能力障碍",
    description: "增加执行坏习惯的难度",
    icon: Shield,
  },
  swap: {
    label: "习惯替换",
    description: "用好习惯替代坏习惯",
    icon: RefreshCw,
  },
  summary: {
    label: "方案总结",
    description: "确认你的戒除计划",
    icon: Check,
  },
};

interface BreakFlowWizardProps {
  habitName: string;
  triggerContexts: string[];
  // AI 生成函数
  onGeneratePromptStrategies: () => Promise<PromptStrategy[]>;
  onGenerateAbilityBarriers: () => Promise<AbilityBarrier[]>;
  onAnalyzeDeepNeeds: () => Promise<NeedAnalysis>;
  onGenerateSwapRecipe: (needs: NeedAnalysis) => Promise<SwapRecipe>;
  // 完成回调
  onComplete: (result: {
    selectedStrategies: PromptStrategy[];
    selectedBarriers: AbilityBarrier[];
    swapRecipe: SwapRecipe | null;
  }) => void;
}

export function BreakFlowWizard({
  habitName,
  triggerContexts,
  onGeneratePromptStrategies,
  onGenerateAbilityBarriers,
  onAnalyzeDeepNeeds,
  onGenerateSwapRecipe,
  onComplete,
}: BreakFlowWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>("prompt");
  const [isLoading, setIsLoading] = useState(false);

  // 提示策略状态
  const [promptStrategies, setPromptStrategies] = useState<PromptStrategy[]>(
    [],
  );
  const [selectedStrategies, setSelectedStrategies] = useState<
    PromptStrategy[]
  >([]);

  // 能力障碍状态
  const [abilityBarriers, setAbilityBarriers] = useState<AbilityBarrier[]>([]);
  const [selectedBarriers, setSelectedBarriers] = useState<AbilityBarrier[]>(
    [],
  );

  // 习惯替换状态
  const [needAnalysis, setNeedAnalysis] = useState<NeedAnalysis | null>(null);
  const [swapRecipe, setSwapRecipe] = useState<SwapRecipe | null>(null);

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goBack = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]!);
    }
  };

  const goNext = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]!);
    }
  };

  // 生成提示策略
  const handleGenerateStrategies = async () => {
    setIsLoading(true);
    try {
      const strategies = await onGeneratePromptStrategies();
      setPromptStrategies(strategies);
    } finally {
      setIsLoading(false);
    }
  };

  // 生成能力障碍
  const handleGenerateBarriers = async () => {
    setIsLoading(true);
    try {
      const barriers = await onGenerateAbilityBarriers();
      setAbilityBarriers(barriers);
    } finally {
      setIsLoading(false);
    }
  };

  // 分析需求并生成替换方案
  const handleAnalyzeAndSwap = async () => {
    setIsLoading(true);
    try {
      const needs = await onAnalyzeDeepNeeds();
      setNeedAnalysis(needs);
      const recipe = await onGenerateSwapRecipe(needs);
      setSwapRecipe(recipe);
    } finally {
      setIsLoading(false);
    }
  };

  // 完成
  const handleComplete = () => {
    onComplete({
      selectedStrategies,
      selectedBarriers,
      swapRecipe,
    });
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center gap-4">
        {stepIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">戒除「{habitName}」</h2>
          <p className="text-muted-foreground text-sm">
            步骤 {stepIndex + 1}/{STEPS.length}：
            {STEP_CONFIG[currentStep].label}
          </p>
        </div>
      </div>

      {/* 进度条 */}
      <Progress value={progress} className="h-1" />

      {/* 步骤指示器 */}
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const config = STEP_CONFIG[step];
          const Icon = config.icon;
          const isActive = step === currentStep;
          const isCompleted = index < stepIndex;

          return (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center gap-1",
                isActive && "text-primary",
                !isActive && !isCompleted && "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-primary bg-primary/10 text-primary",
                  !isActive && !isCompleted && "border-muted",
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs">{config.label}</span>
            </div>
          );
        })}
      </div>

      {/* 步骤内容 */}
      {currentStep === "prompt" && (
        <PromptStrategyStep
          habitName={habitName}
          triggerContexts={triggerContexts}
          strategies={promptStrategies}
          selectedStrategies={selectedStrategies}
          isLoading={isLoading}
          onGenerate={handleGenerateStrategies}
          onSelectStrategy={(strategy) => {
            if (selectedStrategies.find((s) => s.name === strategy.name)) {
              setSelectedStrategies(
                selectedStrategies.filter((s) => s.name !== strategy.name),
              );
            } else {
              setSelectedStrategies([...selectedStrategies, strategy]);
            }
          }}
          onComplete={() => goNext()}
        />
      )}

      {currentStep === "ability" && (
        <AbilityBarrierStep
          habitName={habitName}
          barriers={abilityBarriers}
          selectedBarriers={selectedBarriers}
          isLoading={isLoading}
          onGenerate={handleGenerateBarriers}
          onSelectBarrier={(barrier) => {
            if (selectedBarriers.find((b) => b.name === barrier.name)) {
              setSelectedBarriers(
                selectedBarriers.filter((b) => b.name !== barrier.name),
              );
            } else {
              setSelectedBarriers([...selectedBarriers, barrier]);
            }
          }}
          onComplete={() => goNext()}
        />
      )}

      {currentStep === "swap" && (
        <HabitSwapStep
          habitName={habitName}
          needAnalysis={needAnalysis}
          swapRecipe={swapRecipe}
          isLoading={isLoading}
          onGenerate={handleAnalyzeAndSwap}
          onComplete={() => goNext()}
        />
      )}

      {currentStep === "summary" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">你的戒除计划</CardTitle>
            <CardDescription>确认以下内容，开始执行</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 提示策略摘要 */}
            <div>
              <h4 className="mb-2 text-sm font-medium">提示策略</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStrategies.length > 0 ? (
                  selectedStrategies.map((s) => (
                    <Badge key={s.name} variant="secondary">
                      {s.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">未选择</span>
                )}
              </div>
            </div>

            {/* 能力障碍摘要 */}
            <div>
              <h4 className="mb-2 text-sm font-medium">能力障碍</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBarriers.length > 0 ? (
                  selectedBarriers.map((b) => (
                    <Badge key={b.name} variant="secondary">
                      {b.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">未选择</span>
                )}
              </div>
            </div>

            {/* 习惯替换摘要 */}
            {swapRecipe && (
              <div>
                <h4 className="mb-2 text-sm font-medium">替换配方</h4>
                <p className="bg-muted rounded-lg p-3 text-sm italic">
                  {swapRecipe.swapFormula}
                </p>
              </div>
            )}

            <Button onClick={handleComplete} className="w-full">
              开始执行计划
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 全局 loading */}
      {isLoading && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-lg font-medium">AI 分析中...</p>
          </div>
        </div>
      )}
    </div>
  );
}
