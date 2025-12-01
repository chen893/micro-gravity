"use client";

import { notFound } from "next/navigation";
import { api } from "@/trpc/react";
import { HabitHeader } from "./habit-header";
import { HabitStatsCard } from "./habit-stats-card";
import { HabitMapInfo } from "./habit-map-info";
import { HabitPhaseProgress } from "./habit-phase-progress";
import { HabitLogHistory } from "./habit-log-history";

interface HabitDetailContentProps {
  habitId: string;
}

export function HabitDetailContent({ habitId }: HabitDetailContentProps) {
  const { data: habit, isLoading: habitLoading } = api.habit.getById.useQuery(
    { id: habitId },
    { retry: false },
  );

  const { data: stats, isLoading: statsLoading } = api.habit.getStats.useQuery(
    { id: habitId },
    { retry: false },
  );

  const { data: logsData, isLoading: logsLoading } =
    api.log.getByHabit.useQuery({ habitId, limit: 10 }, { retry: false });

  if (habitLoading) {
    return null; // Suspense 会处理
  }

  if (!habit) {
    notFound();
  }

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

  const prompt = habit.prompt as {
    anchorHabit: string;
    triggerType: string;
    preferredTime: string;
    contextCues?: string[];
    reminderStyle?: string;
  };

  const phases = habit.phases as Array<{
    phase: number;
    name: string;
    duration: string;
    microHabit: string;
    successCriteria: string;
    difficultyScore: number;
  }> | null;

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
      <HabitStatsCard
        stats={stats}
        isLoading={statsLoading}
        habitType={habit.type}
      />

      {/* MAP 模型配置信息 */}
      <HabitMapInfo motivation={motivation} ability={ability} prompt={prompt} />

      {/* 阶段进度 */}
      <HabitPhaseProgress
        currentPhase={habit.currentPhase}
        phases={phases}
        habitId={habit.id}
      />

      {/* 打卡历史 */}
      <HabitLogHistory
        logs={logsData?.logs ?? []}
        total={logsData?.total ?? 0}
        hasMore={logsData?.hasMore ?? false}
        isLoading={logsLoading}
        habitId={habit.id}
        habitType={habit.type}
      />
    </div>
  );
}
