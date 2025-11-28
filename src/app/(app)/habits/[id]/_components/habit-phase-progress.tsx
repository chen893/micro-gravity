"use client";

import { api } from "@/trpc/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Phase {
  phase: number;
  name: string;
  duration: string;
  microHabit: string;
  successCriteria: string;
  difficultyScore: number;
}

interface HabitPhaseProgressProps {
  currentPhase: number;
  phases: Phase[] | null;
  habitId: string;
}

export function HabitPhaseProgress({ currentPhase, phases, habitId }: HabitPhaseProgressProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(currentPhase);
  const utils = api.useUtils();

  const updatePhaseMutation = api.habit.updatePhase.useMutation({
    onSuccess: () => {
      void utils.habit.getById.invalidate({ id: habitId });
    },
  });

  // 如果没有阶段配置，显示简单的进度
  if (!phases || phases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">进度追踪</CardTitle>
          <CardDescription>当前处于第 {currentPhase} 阶段</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>阶段进度</span>
              <span className="font-medium">第 {currentPhase} 阶段</span>
            </div>
            <Progress value={(currentPhase / 6) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              通常习惯养成需要经历 6 个阶段，坚持下去！
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPhases = phases.length;
  const progressPercent = ((currentPhase - 1) / (totalPhases - 1 || 1)) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">阶段进度</CardTitle>
            <CardDescription>
              当前处于第 {currentPhase}/{totalPhases} 阶段
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {currentPhase > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updatePhaseMutation.mutate({
                    id: habitId,
                    currentPhase: currentPhase - 1,
                  })
                }
                disabled={updatePhaseMutation.isPending}
              >
                <ChevronDown className="mr-1 h-4 w-4" />
                降级
              </Button>
            )}
            {currentPhase < totalPhases && (
              <Button
                size="sm"
                onClick={() =>
                  updatePhaseMutation.mutate({
                    id: habitId,
                    currentPhase: currentPhase + 1,
                  })
                }
                disabled={updatePhaseMutation.isPending}
              >
                升级
                <ChevronUp className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 进度条 */}
        <div className="space-y-2">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between">
            {phases.map((phase) => (
              <div
                key={phase.phase}
                className="flex flex-col items-center"
              >
                {phase.phase < currentPhase ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : phase.phase === currentPhase ? (
                  <PlayCircle className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
                <span className="mt-1 text-xs text-muted-foreground">
                  {phase.phase}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 阶段详情列表 */}
        <div className="space-y-2">
          {phases.map((phase) => {
            const isExpanded = expandedPhase === phase.phase;
            const isCurrent = phase.phase === currentPhase;
            const isCompleted = phase.phase < currentPhase;

            return (
              <div
                key={phase.phase}
                className={`rounded-lg border p-3 transition-all ${
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : isCompleted
                    ? "border-green-200 bg-green-50/50"
                    : "border-muted"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : isCurrent ? (
                      <PlayCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{phase.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {phase.duration}
                        </Badge>
                        {isCurrent && <Badge className="text-xs">当前</Badge>}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2 pl-8">
                    <div>
                      <p className="text-xs text-muted-foreground">微习惯</p>
                      <p className="text-sm">{phase.microHabit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">成功标准</p>
                      <p className="text-sm">{phase.successCriteria}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">难度:</span>
                      <Progress value={phase.difficultyScore * 10} className="h-1.5 flex-1" />
                      <span className="text-xs">{phase.difficultyScore}/10</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
