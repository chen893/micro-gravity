"use client";

import { useState, useEffect } from "react";
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
  Play,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Anchor,
  Sparkles,
  PartyPopper,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RehearsalStepProps {
  recipe: {
    anchor: string;
    behavior: string;
    celebration: string;
  };
  rehearsalCount: number;
  targetRehearsals?: number;
  onRehearsal: () => void;
  onComplete: () => void;
}

type RehearsalPhase = "ready" | "anchor" | "behavior" | "celebration" | "done";

const PHASE_DURATION = 3000; // 3 seconds per phase

export function RehearsalStep({
  recipe,
  rehearsalCount,
  targetRehearsals = 7,
  onRehearsal,
  onComplete,
}: RehearsalStepProps) {
  const [phase, setPhase] = useState<RehearsalPhase>("ready");
  const [currentCount, setCurrentCount] = useState(rehearsalCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = Math.min((currentCount / targetRehearsals) * 100, 100);
  const isReady = currentCount >= targetRehearsals;

  useEffect(() => {
    if (phase === "ready" || phase === "done") return;

    const timer = setTimeout(() => {
      if (phase === "anchor") setPhase("behavior");
      else if (phase === "behavior") setPhase("celebration");
      else if (phase === "celebration") {
        setPhase("done");
        setCurrentCount((prev) => prev + 1);
        onRehearsal();
      }
    }, PHASE_DURATION);

    return () => clearTimeout(timer);
  }, [phase, onRehearsal]);

  const startRehearsal = () => {
    setIsAnimating(true);
    setPhase("anchor");
  };

  const resetRehearsal = () => {
    setPhase("ready");
    setIsAnimating(false);
  };

  const getPhaseContent = () => {
    switch (phase) {
      case "anchor":
        return {
          icon: Anchor,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-100 dark:bg-blue-950",
          label: "想象锚点场景",
          content: recipe.anchor,
          hint: "闭上眼睛，想象你正在做这件事...",
        };
      case "behavior":
        return {
          icon: Sparkles,
          iconColor: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-950",
          label: "执行微习惯",
          content: recipe.behavior,
          hint: "在脑海中演练这个动作...",
        };
      case "celebration":
        return {
          icon: PartyPopper,
          iconColor: "text-amber-600",
          bgColor: "bg-amber-100 dark:bg-amber-950",
          label: "庆祝一下！",
          content: recipe.celebration,
          hint: "感受那种「太棒了」的情绪！",
        };
      default:
        return null;
    }
  };

  const phaseContent = getPhaseContent();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950">
          <Play className="h-8 w-8 text-violet-600" />
        </div>
        <h2 className="text-2xl font-bold">配方演练</h2>
        <p className="text-muted-foreground mt-2">
          在脑海中演练 {targetRehearsals} 次，让大脑记住这个配方
        </p>
      </div>

      {/* 进度 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">演练进度</span>
              <span className="font-medium">
                {currentCount} / {targetRehearsals}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {isReady && (
              <p className="text-center text-sm text-green-600">
                太棒了！你已经完成了足够的演练
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 演练区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {phase === "ready" || phase === "done" ? "准备演练" : "正在演练"}
          </CardTitle>
          <CardDescription>
            {phase === "ready"
              ? "点击开始，在脑海中跟随指引演练配方"
              : phase === "done"
                ? "完成了一次演练！继续练习或创建习惯"
                : "跟随指引，在脑海中想象每个步骤"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {phase === "ready" ? (
            <>
              {/* 配方预览 */}
              <div className="bg-muted space-y-2 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Anchor className="h-4 w-4 text-blue-600" />
                  <span>锚点：{recipe.anchor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <span>行为：{recipe.behavior}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PartyPopper className="h-4 w-4 text-amber-600" />
                  <span>庆祝：{recipe.celebration}</span>
                </div>
              </div>

              <Button onClick={startRehearsal} className="w-full">
                <Play className="mr-2 h-4 w-4" />
                开始演练
              </Button>
            </>
          ) : phase === "done" ? (
            <>
              <div className="flex flex-col items-center py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <p className="mt-4 text-lg font-medium">演练完成！</p>
                <p className="text-muted-foreground text-sm">
                  已完成 {currentCount} 次演练
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetRehearsal}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  再来一次
                </Button>
                <Button
                  className="flex-1"
                  onClick={onComplete}
                  variant={isReady ? "default" : "secondary"}
                >
                  {isReady ? "创建习惯" : "跳过，创建习惯"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            phaseContent && (
              <div className="flex flex-col items-center py-8">
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-full transition-all",
                    phaseContent.bgColor,
                    isAnimating && "animate-pulse",
                  )}
                >
                  <phaseContent.icon
                    className={cn("h-10 w-10", phaseContent.iconColor)}
                  />
                </div>

                <Badge variant="secondary" className="mt-4">
                  {phaseContent.label}
                </Badge>

                <p className="mt-4 text-center text-lg font-medium">
                  {phaseContent.content}
                </p>

                <p className="text-muted-foreground mt-2 text-center text-sm">
                  {phaseContent.hint}
                </p>

                {/* 进度指示器 */}
                <div className="mt-6 flex items-center gap-2">
                  <Timer className="text-muted-foreground h-4 w-4" />
                  <div className="flex gap-1">
                    {["anchor", "behavior", "celebration"].map((p) => (
                      <div
                        key={p}
                        className={cn(
                          "h-2 w-8 rounded-full transition-colors",
                          phase === p
                            ? "bg-primary"
                            : ["anchor", "behavior", "celebration"].indexOf(p) <
                                ["anchor", "behavior", "celebration"].indexOf(
                                  phase,
                                )
                              ? "bg-primary/30"
                              : "bg-muted",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* 提示 */}
      {phase === "ready" && currentCount < targetRehearsals && (
        <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-950/30">
          <p className="text-sm text-violet-800 dark:text-violet-200">
            <strong>为什么要演练？</strong>
            <br />
            在脑海中反复演练可以强化神经回路，让行为在真实场景中更容易被触发。
            研究表明，7-10次的心理演练效果最佳。
          </p>
        </div>
      )}
    </div>
  );
}
