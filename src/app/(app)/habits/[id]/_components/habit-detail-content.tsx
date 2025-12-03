"use client";

import { useState, useCallback, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import { api, type RouterOutputs } from "@/trpc/react";
import { toast } from "sonner";
import { HabitHeader } from "./habit-header";
import { HabitStatsCard } from "./habit-stats-card";
import { HabitMapInfo } from "./habit-map-info";
import { HabitPhaseProgress } from "./habit-phase-progress";
import { HabitLogHistory } from "./habit-log-history";
import { ProliferationPrompt } from "@/components/habit/proliferation-prompt";
import { HabitDoctor } from "@/components/habit/habit-doctor";
import type {
  ProliferationSuggestion,
  HabitStability,
} from "@/lib/ai/habit-proliferation";
import type { PhaseConfig as AiPhaseConfig } from "@/lib/ai/phase-design";
import { PhasePath as PhasePathTimeline } from "@/components/phase/phase-path";
import {
  AdvanceStatus,
  PhaseStatusSummary,
  RetreatStatus,
} from "@/components/phase/phase-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Clock3, History } from "lucide-react";

type PhaseHistoryItem =
  RouterOutputs["phase"]["getPhaseHistory"]["history"][number];

interface HabitDetailContentProps {
  habitId: string;
}

export function HabitDetailContent({ habitId }: HabitDetailContentProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [showProliferation, setShowProliferation] = useState(true);
  const [suggestions, setSuggestions] = useState<ProliferationSuggestion[]>([]);
  const [phaseDraft, setPhaseDraft] = useState<AiPhaseConfig[] | null>(null);

  // 使用 useSuspenseQuery 让 Suspense 处理加载状态
  const [habit] = api.habit.getById.useSuspenseQuery({ id: habitId });

  const [stats] = api.habit.getStats.useSuspenseQuery({ id: habitId });

  const [logsData] = api.log.getByHabit.useSuspenseQuery({
    habitId,
    limit: 10,
  });

  const phaseEnabled = !!habit;

  const { data: phaseOverview, isLoading: phaseOverviewLoading } =
    api.phase.getCurrentPhase.useQuery({ habitId }, { enabled: phaseEnabled });

  const { data: advanceData } = api.phase.assessAdvance.useQuery(
    { habitId },
    { enabled: phaseEnabled },
  );

  const { data: retreatData } = api.phase.assessRetreat.useQuery(
    { habitId },
    { enabled: phaseEnabled },
  );

  const { data: phaseSuggestionData } = api.phase.getSuggestion.useQuery(
    { habitId },
    { enabled: phaseEnabled },
  );

  const { data: phaseHistoryData } = api.phase.getPhaseHistory.useQuery(
    { habitId, limit: 5 },
    { enabled: phaseEnabled },
  );

  // 习惯繁殖相关查询
  const { data: shouldPromptData } = api.proliferation.shouldPrompt.useQuery(
    { habitId },
    { retry: false },
  );

  const { data: stabilityData } = api.proliferation.assessStability.useQuery(
    { habitId },
    { enabled: !!shouldPromptData?.shouldPrompt, retry: false },
  );

  const getSuggestionsMutation = api.proliferation.getSuggestions.useMutation({
    onSuccess: (data) => {
      setSuggestions(data.suggestions);
    },
    onError: () => {
      toast.error("获取扩展建议失败");
    },
  });

  const recordResponseMutation =
    api.proliferation.recordPromptResponse.useMutation();

  const designPathMutation = api.phase.designPath.useMutation({
    onSuccess: (data) => {
      setPhaseDraft(
        data.phases.map((phase, index) => ({
          ...phase,
          phase: index + 1,
        })),
      );
      toast.success("已生成阶段路径草稿");
    },
    onError: () => {
      toast.error("生成阶段路径失败");
    },
  });

  const quickPathMutation = api.phase.designQuickPath.useMutation({
    onSuccess: (data) => {
      setPhaseDraft(
        data.phases.map((phase, index) => ({
          ...phase,
          phase: index + 1,
        })),
      );
      toast.success("已生成快速阶段路径");
    },
    onError: () => {
      toast.error("生成快速路径失败");
    },
  });

  const savePhasePathMutation = api.phase.savePhasePath.useMutation({
    onSuccess: () => {
      toast.success("阶段路径已保存");
      setPhaseDraft(null);
      void utils.habit.getById.invalidate({ id: habitId });
      void utils.phase.getCurrentPhase.invalidate({ habitId });
      void utils.phase.assessAdvance.invalidate({ habitId });
      void utils.phase.assessRetreat.invalidate({ habitId });
      void utils.phase.getSuggestion.invalidate({ habitId });
      void utils.phase.getPhaseHistory.invalidate({ habitId });
    },
    onError: () => {
      toast.error("保存阶段路径失败");
    },
  });

  const advanceMutation = api.phase.advance.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      void utils.habit.getById.invalidate({ id: habitId });
      void utils.phase.getCurrentPhase.invalidate({ habitId });
      void utils.phase.assessAdvance.invalidate({ habitId });
      void utils.phase.assessRetreat.invalidate({ habitId });
      void utils.phase.getSuggestion.invalidate({ habitId });
      void utils.phase.getPhaseHistory.invalidate({ habitId });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const retreatMutation = api.phase.retreat.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      void utils.habit.getById.invalidate({ id: habitId });
      void utils.phase.getCurrentPhase.invalidate({ habitId });
      void utils.phase.assessAdvance.invalidate({ habitId });
      void utils.phase.assessRetreat.invalidate({ habitId });
      void utils.phase.getSuggestion.invalidate({ habitId });
      void utils.phase.getPhaseHistory.invalidate({ habitId });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 习惯繁殖处理函数
  const handleLoadSuggestions = useCallback(() => {
    getSuggestionsMutation.mutate({ habitId });
  }, [habitId, getSuggestionsMutation]);

  const handleSelectSuggestion = useCallback(
    async (suggestion: ProliferationSuggestion) => {
      await recordResponseMutation.mutateAsync({
        habitId,
        response: "ACCEPTED",
        selectedSuggestionType: suggestion.type,
      });
      toast.success(`已选择：${suggestion.title}`);
      // 跳转到创建新习惯页面
      router.push(
        `/habits/new?from=${habitId}&suggestion=${encodeURIComponent(suggestion.title)}`,
      );
    },
    [habitId, recordResponseMutation, router],
  );

  const handleDismissProliferation = useCallback(async () => {
    await recordResponseMutation.mutateAsync({
      habitId,
      response: "DISMISSED",
    });
    setShowProliferation(false);
  }, [habitId, recordResponseMutation]);

  // 提前提取数据以便在 hooks 中使用
  const phases = habit.phases as Array<{
    phase: number;
    name: string;
    duration: string;
    microHabit: string;
    successCriteria: string;
    difficultyScore: number;
  }> | null;

  const motivation = habit.motivation as {
    primaryType: string;
    deepReason: string;
    visionStatement: string;
    painPoints?: string[];
    motivationScore: number;
  };

  const ability = habit.ability as {
    currentLevel: string;
    targetLevel: string;
    microHabit: string;
    difficultyScore: number;
    barriers?: string[];
    simplificationTips?: string[];
  };

  // 所有 useMemo 和 useCallback 必须在条件返回之前
  const normalizedPhasePath: AiPhaseConfig[] | null = useMemo(() => {
    if (phaseOverview?.phases && phaseOverview.phases.length > 0) {
      return phaseOverview.phases;
    }

    if (phases && phases.length > 0) {
      return phases.map((phase) => ({
        phase: phase.phase,
        name: phase.name,
        microHabit: phase.microHabit,
        successCriteria: phase.successCriteria,
        estimatedDuration: phase.duration ?? "—",
        advanceSignals: [],
        tips: [],
      }));
    }

    return null;
  }, [phaseOverview?.phases, phases]);

  const phaseProgressData = useMemo(() => {
    if (phaseOverview?.phases && phaseOverview.phases.length > 0) {
      return phaseOverview.phases as Array<{
        phase: number;
        name: string;
        duration?: string;
        estimatedDuration?: string;
        microHabit: string;
        successCriteria: string;
        difficultyScore?: number;
      }>;
    }
    return phases ?? null;
  }, [phaseOverview?.phases, phases]);

  const currentPhaseValue =
    phaseOverview?.currentPhase ?? habit?.currentPhase ?? 1;

  const hasPhasePath = normalizedPhasePath && normalizedPhasePath.length > 0;

  const handleDesignFullPath = useCallback(() => {
    if (!habit) return;
    designPathMutation.mutate({
      targetHabit: habit.name,
      userContext: {
        currentLevel: ability?.currentLevel,
        constraints: ability?.barriers,
        pastAttempts: motivation?.painPoints,
      },
    });
  }, [
    habit,
    ability?.currentLevel,
    ability?.barriers,
    motivation?.painPoints,
    designPathMutation,
  ]);

  const handleDesignQuickPath = useCallback(() => {
    if (!habit) return;
    quickPathMutation.mutate({
      targetHabit: habit.name,
      targetDuration: ability?.targetLevel,
    });
  }, [habit, ability?.targetLevel, quickPathMutation]);

  const handleSavePhaseDraft = useCallback(() => {
    if (!phaseDraft) return;
    const normalized = phaseDraft.map((phase, index) => ({
      ...phase,
      phase: index + 1,
    }));
    savePhasePathMutation.mutate({
      habitId,
      phases: normalized,
    });
  }, [phaseDraft, habitId, savePhasePathMutation]);

  const handleDiscardPhaseDraft = useCallback(() => {
    setPhaseDraft(null);
  }, []);

  const handleAdvance = useCallback(
    (params?: { reason?: string; signals?: string[] }) => {
      advanceMutation.mutate({
        habitId,
        reason: params?.reason,
        signals: params?.signals,
      });
    },
    [habitId, advanceMutation],
  );

  const handleRetreat = useCallback(
    (params?: { reason?: string }) => {
      retreatMutation.mutate({
        habitId,
        reason: params?.reason,
      });
    },
    [habitId, retreatMutation],
  );

  // 构建稳定性数据
  const stability: HabitStability | null = stabilityData
    ? {
        isStable: stabilityData.stabilityScore >= 70,
        readyForProliferation: stabilityData.readyForProliferation,
        stabilityScore: stabilityData.stabilityScore,
        factors: stabilityData.factors,
        recommendation: stabilityData.recommendation,
      }
    : null;

  // 条件返回 - 所有 hooks 已在上方定义
  if (!habit) {
    notFound();
  }

  const prompt = habit.prompt as {
    anchorHabit: string;
    triggerType: string;
    preferredTime: string;
    contextCues?: string[];
    reminderStyle?: string;
  };

  return (
    <div className="space-y-6">
      {/* 头部：名称、类型、操作按钮 */}
      <HabitHeader
        habit={{
          id: habit.id,
          name: habit.name,
          type: habit.type,
          status: habit.status,
          description: habit.description,
          category: habit.category,
        }}
      />

      {/* 统计卡片 */}
      <HabitStatsCard stats={stats} isLoading={false} habitType={habit.type} />

      {/* MAP 模型配置信息 */}
      <HabitMapInfo motivation={motivation} ability={ability} prompt={prompt} />

      {/* 阶段进度 */}
      <HabitPhaseProgress
        currentPhase={currentPhaseValue}
        phases={phaseProgressData}
        habitId={habit.id}
        advanceData={advanceData}
        retreatData={retreatData}
        onAdvance={handleAdvance}
        onRetreat={handleRetreat}
        isAdvancePending={advanceMutation.isPending}
        isRetreatPending={retreatMutation.isPending}
      />

      {/* 阶段路径与建议 */}
      <div className="space-y-4">
        {phaseSuggestionData && phaseOverview && (
          <Card>
            <CardContent className="space-y-3">
              <PhaseStatusSummary
                currentPhase={currentPhaseValue}
                currentPhaseName={
                  phaseOverview.currentPhaseConfig?.name ??
                  `阶段 ${currentPhaseValue}`
                }
                isAdvanceReady={
                  phaseSuggestionData.recommendation === "ADVANCE"
                }
                hasRetreatSignals={
                  phaseSuggestionData.recommendation === "RETREAT"
                }
              />
              <div>
                <p className="text-foreground text-sm font-medium">
                  {phaseSuggestionData.reason}
                </p>
                <p className="text-muted-foreground text-xs">
                  {phaseSuggestionData.encouragement}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {phaseOverviewLoading ? (
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle>加载阶段路径...</CardTitle>
              <CardDescription>正在拉取 AI 规划的阶段数据</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted h-2 w-full rounded-full" />
            </CardContent>
          </Card>
        ) : hasPhasePath && normalizedPhasePath ? (
          <>
            <PhasePathTimeline
              phases={normalizedPhasePath}
              currentPhase={currentPhaseValue}
              habitName={habit.name}
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <AdvanceStatus
                isReady={advanceData?.isReady ?? false}
                confidence={advanceData?.confidence ?? 0}
                signals={advanceData?.signals ?? []}
                recommendation={
                  advanceData?.recommendation ?? "继续巩固当前阶段"
                }
                encouragement={advanceData?.encouragement ?? "保持当下节奏即可"}
                nextPhaseName={advanceData?.nextPhaseConfig?.name}
                onAdvance={() =>
                  handleAdvance({
                    reason: "阶段控制面板发起进阶",
                    signals: advanceData?.signals?.map((s) => s.type) ?? [],
                  })
                }
                isLoading={advanceMutation.isPending}
              />
              <RetreatStatus
                shouldRetreat={retreatData?.shouldRetreat ?? false}
                urgency={retreatData?.urgency ?? "NONE"}
                signals={retreatData?.signals ?? []}
                recommendation={
                  retreatData?.recommendation ?? "当前状态良好，继续保持"
                }
                encouragement={
                  retreatData?.encouragement ?? "若有波动，可随时调回舒适区"
                }
                alternativeActions={retreatData?.alternativeActions ?? []}
                previousPhaseName={retreatData?.previousPhaseConfig?.name}
                onRetreat={() =>
                  handleRetreat({
                    reason: retreatData?.signals?.[0]?.evidence,
                  })
                }
                isLoading={retreatMutation.isPending}
              />
            </div>
          </>
        ) : (
          <PhasePathEmptyState
            onGenerateFull={handleDesignFullPath}
            onGenerateQuick={handleDesignQuickPath}
            loading={
              designPathMutation.isPending || quickPathMutation.isPending
            }
          />
        )}

        {phaseDraft && (
          <Card>
            <CardHeader>
              <CardTitle>AI 阶段路径草稿</CardTitle>
              <CardDescription>确认后将替换当前阶段路径</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PhasePathTimeline
                phases={phaseDraft}
                currentPhase={1}
                habitName={`${habit.name}（草稿）`}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleSavePhaseDraft}
                  disabled={savePhasePathMutation.isPending}
                >
                  保存到习惯
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDiscardPhaseDraft}
                  disabled={savePhasePathMutation.isPending}
                >
                  放弃草稿
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {phaseHistoryData?.history?.length ? (
          <PhaseHistoryCard
            history={phaseHistoryData.history}
            stats={phaseHistoryData.stats}
          />
        ) : null}
      </div>

      {/* 习惯繁殖提示 */}
      {showProliferation && shouldPromptData?.shouldPrompt && stability && (
        <ProliferationPrompt
          habitName={habit.name}
          stability={stability}
          suggestions={suggestions}
          isLoading={getSuggestionsMutation.isPending}
          onSelectSuggestion={handleSelectSuggestion}
          onDismiss={handleDismissProliferation}
          onLoadSuggestions={handleLoadSuggestions}
        />
      )}

      {/* 习惯医生 - 问题诊断 */}
      <HabitDoctor habitId={habit.id} habitName={habit.name} />

      {/* 打卡历史 */}
      <HabitLogHistory
        logs={logsData.logs}
        total={logsData.total}
        hasMore={logsData.hasMore}
        isLoading={false}
        habitId={habit.id}
        habitType={habit.type}
      />
    </div>
  );
}

function PhasePathEmptyState({
  onGenerateFull,
  onGenerateQuick,
  loading,
}: {
  onGenerateFull: () => void;
  onGenerateQuick: () => void;
  loading: boolean;
}) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-5 w-5" />
          <CardTitle className="text-base">尚未创建阶段路径</CardTitle>
        </div>
        <CardDescription>
          使用 AI 一键拆解习惯，生成 3-8
          个循序渐进的阶段，并自动接入进阶/退阶判断。
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button onClick={onGenerateFull} disabled={loading}>
          <Wand2 className="mr-2 h-4 w-4" />
          AI 生成完整路径
        </Button>
        <Button variant="outline" onClick={onGenerateQuick} disabled={loading}>
          <Clock3 className="mr-2 h-4 w-4" />
          快速 3-5 阶段
        </Button>
      </CardContent>
    </Card>
  );
}

function PhaseHistoryCard({
  history,
  stats,
}: {
  history: PhaseHistoryItem[];
  stats?: { totalChanges: number; advanceCount: number; retreatCount: number };
}) {
  if (!history?.length) return null;

  const formatter = new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="text-muted-foreground h-5 w-5" />
          <CardTitle className="text-base">阶段变更记录</CardTitle>
          {stats && (
            <Badge variant="secondary" className="ml-auto">
              进 {stats.advanceCount} ・ 退 {stats.retreatCount}
            </Badge>
          )}
        </div>
        <CardDescription>最近 5 次的进阶 / 退阶动作</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-lg border p-3"
          >
            <div>
              <p className="text-sm font-medium">
                {item.changeType === "ADVANCE" ? "进阶" : "退阶"}：
                {item.fromPhase}→{item.toPhase}
              </p>
              <p className="text-muted-foreground text-xs">
                {item.reason ?? "无特别说明"}
              </p>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatter.format(new Date(item.changedAt))}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
