"use client";

import { api } from "@/trpc/react";
import { HabitHeader } from "./habit-header";
import { HabitStatsCard } from "./habit-stats-card";
import { HabitLogHistory } from "./habit-log-history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anchor, Sparkles, Target } from "lucide-react";

interface HabitDetailContentProps {
  habitId: string;
}

export function HabitDetailContent({ habitId }: HabitDetailContentProps) {
  // 使用 useSuspenseQuery 让 Suspense 处理加载状态
  const [habit] = api.habit.getById.useSuspenseQuery({ id: habitId });

  const [stats] = api.habit.getStats.useSuspenseQuery({ id: habitId });

  const [logsData] = api.log.getByHabit.useSuspenseQuery({
    habitId,
    limit: 10,
  });

  // 如果习惯不存在，返回 null
  if (!habit) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
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
      <HabitStatsCard stats={stats} />

      {/* abc 配方 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base">微习惯配方</CardTitle>
          </div>
          <CardDescription>
            &ldquo;在我【锚点】之后，我会【微习惯】。然后我会【庆祝】！&rdquo;
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Anchor className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">锚点 (Anchor)</p>
              <p className="text-muted-foreground text-sm">{habit.anchor}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Target className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">微行为 (Behavior)</p>
              <p className="text-muted-foreground text-sm">{habit.behavior}</p>
            </div>
          </div>
          {habit.celebration && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Sparkles className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">庆祝 (Celebration)</p>
                <p className="text-muted-foreground text-sm">
                  {habit.celebration}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 打卡历史 */}
      <HabitLogHistory
        logs={logsData.logs}
        hasMore={logsData.hasMore}
        habitId={habitId}
      />
    </div>
  );
}
