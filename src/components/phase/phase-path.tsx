"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Target, Sparkles } from "lucide-react";

interface PhaseConfig {
  phase: number;
  name: string;
  microHabit: string;
  successCriteria: string;
  estimatedDuration: string;
  advanceSignals: string[];
  tips: string[];
}

interface PhasePathProps {
  phases: PhaseConfig[];
  currentPhase: number;
  habitName?: string;
  onPhaseClick?: (phase: PhaseConfig) => void;
}

export function PhasePath({
  phases,
  currentPhase,
  habitName,
  onPhaseClick,
}: PhasePathProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="text-primary h-5 w-5" />
          <CardTitle className="text-base">习惯进阶路径</CardTitle>
        </div>
        {habitName && (
          <CardDescription>
            {habitName} - 共 {phases.length} 个阶段
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* 连接线 */}
          <div className="bg-muted absolute top-0 left-4 h-full w-0.5" />

          {/* 阶段列表 */}
          <div className="space-y-4">
            {phases.map((phase) => {
              const isCompleted = phase.phase < currentPhase;
              const isCurrent = phase.phase === currentPhase;
              const isNext = phase.phase === currentPhase + 1;

              return (
                <div
                  key={phase.phase}
                  className={cn(
                    "relative flex gap-4 pl-2",
                    onPhaseClick &&
                      "hover:bg-muted/50 -ml-2 cursor-pointer rounded-lg p-2",
                  )}
                  onClick={() => onPhaseClick?.(phase)}
                >
                  {/* 阶段指示器 */}
                  <div
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                      isCompleted &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary bg-primary/10 text-primary ring-primary/20 ring-4",
                      !isCompleted &&
                        !isCurrent &&
                        "border-muted bg-background",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{phase.phase}</span>
                    )}
                  </div>

                  {/* 阶段内容 */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2">
                      <h4
                        className={cn(
                          "font-medium",
                          isCurrent && "text-primary",
                          isCompleted && "text-muted-foreground",
                        )}
                      >
                        {phase.name}
                      </h4>
                      {isCurrent && <Badge className="text-xs">当前</Badge>}
                      {isNext && (
                        <Badge variant="outline" className="text-xs">
                          下一步
                        </Badge>
                      )}
                    </div>

                    <p
                      className={cn(
                        "mt-1 text-sm",
                        isCompleted
                          ? "text-muted-foreground"
                          : "text-foreground",
                      )}
                    >
                      {phase.microHabit}
                    </p>

                    {/* 成功标准 */}
                    <p className="text-muted-foreground mt-1 text-xs">
                      {phase.successCriteria}
                    </p>

                    {/* 当前阶段显示更多信息 */}
                    {isCurrent && phase.tips.length > 0 && (
                      <div className="bg-primary/5 mt-2 rounded-lg p-2">
                        <p className="text-primary text-xs font-medium">
                          小贴士：
                        </p>
                        <ul className="text-muted-foreground mt-1 space-y-0.5 text-xs">
                          {phase.tips.slice(0, 2).map((tip, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <Sparkles className="text-primary mt-0.5 h-3 w-3 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 下一阶段显示进阶信号 */}
                    {isNext && phase.advanceSignals.length > 0 && (
                      <div className="text-muted-foreground mt-2 text-xs">
                        <span className="font-medium">进阶信号：</span>
                        {phase.advanceSignals.slice(0, 2).join("、")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 简化版阶段路径（只显示进度条）
 */
interface PhaseProgressProps {
  currentPhase: number;
  totalPhases: number;
  currentPhaseName?: string;
}

export function PhaseProgress({
  currentPhase,
  totalPhases,
  currentPhaseName,
}: PhaseProgressProps) {
  const progress = (currentPhase / totalPhases) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          阶段 {currentPhase}/{totalPhases}
        </span>
        {currentPhaseName && (
          <span className="font-medium">{currentPhaseName}</span>
        )}
      </div>
      <div className="bg-muted h-2 rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: totalPhases }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i + 1 <= currentPhase ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
