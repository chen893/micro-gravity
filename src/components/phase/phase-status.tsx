"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============ 进阶状态组件 ============

interface AdvanceSignal {
  type: string;
  strength: number;
  evidence: string;
}

interface AdvanceStatusProps {
  isReady: boolean;
  confidence: number;
  signals: AdvanceSignal[];
  recommendation: string;
  encouragement: string;
  nextPhaseName?: string;
  onAdvance?: () => void;
  isLoading?: boolean;
}

export function AdvanceStatus({
  isReady,
  confidence,
  signals,
  recommendation,
  encouragement,
  nextPhaseName,
  onAdvance,
  isLoading,
}: AdvanceStatusProps) {
  const signalEmojis: Record<string, string> = {
    CONSISTENCY: "📆",
    EASE: "😌",
    DESIRE: "🔥",
    OVERFLOW: "⭐",
    MOMENTUM: "📈",
  };

  const signalLabels: Record<string, string> = {
    CONSISTENCY: "稳定完成",
    EASE: "轻松完成",
    DESIRE: "想做更多",
    OVERFLOW: "超额完成",
    MOMENTUM: "越做越多",
  };

  return (
    <Card
      className={cn(
        isReady &&
          "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp
              className={cn(
                "h-5 w-5",
                isReady ? "text-green-600" : "text-muted-foreground",
              )}
            />
            <CardTitle className="text-base">进阶评估</CardTitle>
          </div>
          {isReady && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              准备就绪
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 检测到的信号 */}
        {signals.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {signals.map((signal, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <span>{signalEmojis[signal.type] ?? "✨"}</span>
                <span>{signalLabels[signal.type] ?? signal.type}</span>
                <span className="ml-1 text-xs opacity-70">
                  {Math.round(signal.strength * 100)}%
                </span>
              </Badge>
            ))}
          </div>
        )}

        {/* 建议和鼓励 */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium">{recommendation}</p>
          <p className="text-muted-foreground mt-1 text-xs">{encouragement}</p>
        </div>

        {/* 进阶按钮 */}
        {isReady && nextPhaseName && onAdvance && (
          <Button onClick={onAdvance} disabled={isLoading} className="w-full">
            <ArrowUp className="mr-2 h-4 w-4" />
            进阶到「{nextPhaseName}」
          </Button>
        )}

        {/* 置信度指示 */}
        {!isReady && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <div className="bg-muted h-1.5 flex-1 rounded-full">
              <div
                className="bg-primary/50 h-full rounded-full"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span>{Math.round(confidence * 100)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============ 退阶保护组件 ============

interface RetreatSignal {
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  evidence: string;
}

interface RetreatStatusProps {
  shouldRetreat: boolean;
  urgency: "NONE" | "GENTLE" | "RECOMMENDED" | "URGENT";
  signals: RetreatSignal[];
  recommendation: string;
  encouragement: string;
  alternativeActions: string[];
  previousPhaseName?: string;
  onRetreat?: () => void;
  isLoading?: boolean;
}

export function RetreatStatus({
  shouldRetreat,
  urgency,
  signals,
  recommendation,
  encouragement,
  alternativeActions,
  previousPhaseName,
  onRetreat,
  isLoading,
}: RetreatStatusProps) {
  const signalEmojis: Record<string, string> = {
    STRUGGLE: "💦",
    INCONSISTENT: "📉",
    NEGATIVE: "😔",
    AVOIDANCE: "🚫",
    DECLINING: "⬇️",
    BURNOUT: "🔥",
  };

  const signalLabels: Record<string, string> = {
    STRUGGLE: "执行吃力",
    INCONSISTENT: "完成不稳定",
    NEGATIVE: "情绪低落",
    AVOIDANCE: "连续未完成",
    DECLINING: "状态下滑",
    BURNOUT: "可能倦怠",
  };

  const urgencyColors = {
    NONE: "",
    GENTLE:
      "border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/20",
    RECOMMENDED:
      "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20",
    URGENT:
      "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20",
  };

  const urgencyLabels = {
    NONE: "状态良好",
    GENTLE: "轻微提醒",
    RECOMMENDED: "建议调整",
    URGENT: "需要关注",
  };

  if (urgency === "NONE") {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium">状态良好</p>
            <p className="text-muted-foreground text-sm">继续保持当前节奏</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={urgencyColors[urgency]}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield
              className={cn(
                "h-5 w-5",
                urgency === "URGENT" && "text-red-600",
                urgency === "RECOMMENDED" && "text-orange-600",
                urgency === "GENTLE" && "text-yellow-600",
              )}
            />
            <CardTitle className="text-base">退阶保护</CardTitle>
          </div>
          <Badge
            variant={urgency === "URGENT" ? "destructive" : "secondary"}
            className={cn(
              urgency === "RECOMMENDED" && "bg-orange-100 text-orange-800",
            )}
          >
            {urgencyLabels[urgency]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 检测到的信号 */}
        {signals.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {signals.map((signal, index) => (
              <Badge
                key={index}
                variant={
                  signal.severity === "HIGH" ? "destructive" : "secondary"
                }
                className="flex items-center gap-1"
              >
                <span>{signalEmojis[signal.type] ?? "⚠️"}</span>
                <span>{signalLabels[signal.type] ?? signal.type}</span>
              </Badge>
            ))}
          </div>
        )}

        {/* 建议和鼓励 */}
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-sm font-medium">{recommendation}</p>
          <p className="text-muted-foreground mt-1 text-xs">{encouragement}</p>
        </div>

        {/* 替代行动 */}
        {alternativeActions.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium">
              除了退阶，你还可以：
            </p>
            <div className="flex flex-wrap gap-2">
              {alternativeActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 退阶按钮 */}
        {shouldRetreat && previousPhaseName && onRetreat && (
          <Button
            variant={urgency === "URGENT" ? "default" : "outline"}
            onClick={onRetreat}
            disabled={isLoading}
            className="w-full"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            回到「{previousPhaseName}」
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ============ 综合状态组件 ============

interface PhaseStatusSummaryProps {
  currentPhase: number;
  currentPhaseName: string;
  isAdvanceReady?: boolean;
  hasRetreatSignals?: boolean;
  onViewDetails?: () => void;
}

export function PhaseStatusSummary({
  currentPhase,
  currentPhaseName,
  isAdvanceReady,
  hasRetreatSignals,
  onViewDetails,
}: PhaseStatusSummaryProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-3",
        isAdvanceReady && "border-green-200 bg-green-50/30",
        hasRetreatSignals && "border-yellow-200 bg-yellow-50/30",
      )}
      onClick={onViewDetails}
      role={onViewDetails ? "button" : undefined}
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
          {currentPhase}
        </div>
        <div>
          <p className="font-medium">{currentPhaseName}</p>
          <p className="text-muted-foreground text-xs">当前阶段</p>
        </div>
      </div>

      {isAdvanceReady && (
        <div className="flex items-center gap-1 text-green-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs">可以进阶</span>
        </div>
      )}

      {hasRetreatSignals && !isAdvanceReady && (
        <div className="flex items-center gap-1 text-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs">需要关注</span>
        </div>
      )}
    </div>
  );
}
