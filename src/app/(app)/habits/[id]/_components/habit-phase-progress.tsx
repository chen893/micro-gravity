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
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronUp,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useState } from "react";
import type { RouterOutputs } from "@/trpc/react";

type AdvanceAssessment = RouterOutputs["phase"]["assessAdvance"];
type RetreatAssessment = RouterOutputs["phase"]["assessRetreat"];

interface Phase {
  phase: number;
  name: string;
  duration?: string;
  estimatedDuration?: string;
  microHabit: string;
  successCriteria: string;
  difficultyScore?: number;
}

interface HabitPhaseProgressProps {
  currentPhase: number;
  phases: Phase[] | null;
  habitId: string;
  advanceData?: AdvanceAssessment;
  retreatData?: RetreatAssessment;
  onAdvance?: (params?: { reason?: string; signals?: string[] }) => void;
  onRetreat?: (params?: { reason?: string }) => void;
  isAdvancePending?: boolean;
  isRetreatPending?: boolean;
}

export function HabitPhaseProgress({
  currentPhase,
  phases,
  habitId: _habitId,
  advanceData,
  retreatData,
  onAdvance,
  onRetreat,
  isAdvancePending = false,
  isRetreatPending = false,
}: HabitPhaseProgressProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(
    currentPhase,
  );
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
            <p className="text-muted-foreground text-xs">
              通常习惯养成需要经历 6 个阶段，坚持下去！
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPhases = phases.length;
  const progressPercent = ((currentPhase - 1) / (totalPhases - 1 || 1)) * 100;
  const isActionDisabled = isAdvancePending || isRetreatPending;

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
          <div className="flex items-center gap-2">
            {/* 进阶状态指示 */}
            {advanceData?.isReady && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Sparkles className="mr-1 h-3 w-3" />
                可进阶
              </Badge>
            )}
            {retreatData?.shouldRetreat && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                <AlertTriangle className="mr-1 h-3 w-3" />
                需关注
              </Badge>
            )}

            {/* 退阶按钮 */}
            {currentPhase > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onRetreat?.({
                    reason:
                      retreatData?.signals?.[0]?.evidence ?? "用户主动退阶",
                  })
                }
                disabled={isActionDisabled}
              >
                <ChevronDown className="mr-1 h-4 w-4" />
                退阶
              </Button>
            )}
            {/* 进阶按钮 */}
            {currentPhase < totalPhases && (
              <Button
                size="sm"
                onClick={() =>
                  onAdvance?.({
                    reason: advanceData?.isReady
                      ? "系统评估可进阶"
                      : "用户主动进阶",
                    signals: advanceData?.signals?.map((s) => s.type) ?? [],
                  })
                }
                disabled={isActionDisabled}
                variant={advanceData?.isReady ? "default" : "outline"}
              >
                进阶
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
              <div key={phase.phase} className="flex flex-col items-center">
                {phase.phase < currentPhase ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : phase.phase === currentPhase ? (
                  <PlayCircle className="text-primary h-6 w-6" />
                ) : (
                  <Circle className="text-muted-foreground h-6 w-6" />
                )}
                <span className="text-muted-foreground mt-1 text-xs">
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
                  onClick={() =>
                    setExpandedPhase(isExpanded ? null : phase.phase)
                  }
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : isCurrent ? (
                      <PlayCircle className="text-primary h-5 w-5" />
                    ) : (
                      <Circle className="text-muted-foreground h-5 w-5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{phase.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {phase.duration ?? phase.estimatedDuration ?? "—"}
                        </Badge>
                        {isCurrent && <Badge className="text-xs">当前</Badge>}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2 pl-8">
                    <div>
                      <p className="text-muted-foreground text-xs">微习惯</p>
                      <p className="text-sm">{phase.microHabit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">成功标准</p>
                      <p className="text-sm">{phase.successCriteria}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        难度:
                      </span>
                      <Progress
                        value={(phase.difficultyScore ?? 5) * 10}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs">
                        {phase.difficultyScore ?? 5}/10
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 进阶评估详情 */}
        {advanceData?.signals && advanceData.signals.length > 0 && (
          <div className="rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-800 dark:bg-green-950/20">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">进阶评估</span>
              {advanceData.isReady && (
                <Badge className="bg-green-100 text-xs text-green-800">
                  准备就绪
                </Badge>
              )}
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {advanceData.signals.map((signal, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {signal.type === "CONSISTENCY" && "📆 稳定完成"}
                  {signal.type === "EASE" && "😌 轻松完成"}
                  {signal.type === "DESIRE" && "🔥 想做更多"}
                  {signal.type === "OVERFLOW" && "⭐ 超额完成"}
                  {signal.type === "MOMENTUM" && "📈 越做越多"}
                  <span className="ml-1 opacity-70">
                    {Math.round(signal.strength * 100)}%
                  </span>
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              {advanceData.isReady
                ? advanceData.nextPhaseConfig
                  ? `可以进阶到「${advanceData.nextPhaseConfig.name}」`
                  : "已达到最高阶段！"
                : `置信度 ${Math.round(advanceData.confidence * 100)}%，继续保持！`}
            </p>
          </div>
        )}

        {/* 退阶保护提示 */}
        {retreatData && retreatData.shouldRetreat && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-3 dark:border-yellow-800 dark:bg-yellow-950/20">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">退阶保护</span>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-xs text-yellow-800"
              >
                {retreatData.urgency === "URGENT" ? "需要关注" : "轻微提醒"}
              </Badge>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {retreatData.signals?.map((signal, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {signal.type === "STRUGGLE" && "💦 执行吃力"}
                  {signal.type === "INCONSISTENT" && "📉 完成不稳定"}
                  {signal.type === "NEGATIVE" && "😔 情绪低落"}
                  {signal.type === "AVOIDANCE" && "🚫 连续未完成"}
                  {signal.type === "DECLINING" && "⬇️ 状态下滑"}
                  {signal.type === "BURNOUT" && "🔥 可能倦怠"}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              {retreatData.recommendation}
            </p>
            {retreatData.alternativeActions &&
              retreatData.alternativeActions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {retreatData.alternativeActions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
