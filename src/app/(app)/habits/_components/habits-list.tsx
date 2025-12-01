"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pause,
  Play,
  Archive,
  Trash2,
  Target,
  Plus,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { CelebrationSuccessModal } from "@/components/celebration";

export function HabitsList() {
  const { data: habits, isLoading } = api.habit.list.useQuery();

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (!habits || habits.length === 0) {
    return <EmptyState />;
  }

  const activeHabits = habits.filter((h) => h.status === "ACTIVE");
  const pausedHabits = habits.filter((h) => h.status === "PAUSED");
  const archivedHabits = habits.filter(
    (h) => h.status === "ARCHIVED" || h.status === "COMPLETED",
  );

  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList>
        <TabsTrigger value="active">进行中 ({activeHabits.length})</TabsTrigger>
        <TabsTrigger value="paused">已暂停 ({pausedHabits.length})</TabsTrigger>
        <TabsTrigger value="archived">
          已归档 ({archivedHabits.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        {activeHabits.length === 0 ? (
          <Card className="py-8 text-center">
            <p className="text-muted-foreground">没有进行中的习惯</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="paused" className="space-y-4">
        {pausedHabits.length === 0 ? (
          <Card className="py-8 text-center">
            <p className="text-muted-foreground">没有暂停的习惯</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pausedHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="archived" className="space-y-4">
        {archivedHabits.length === 0 ? (
          <Card className="py-8 text-center">
            <p className="text-muted-foreground">没有归档的习惯</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archivedHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

interface HabitCardProps {
  habit: {
    id: string;
    name: string;
    type: "BUILD" | "BREAK";
    description: string | null;
    category: string | null;
    currentPhase: number;
    status: "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
    _count: {
      logs: number;
    };
  };
}

// 庆祝弹窗状态类型
interface CelebrationState {
  open: boolean;
  logId: string;
  habitName: string;
  streakDays: number;
  isMilestone: boolean;
  milestoneType?: "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100";
}

function HabitCard({ habit }: HabitCardProps) {
  const utils = api.useUtils();

  // 庆祝弹窗状态
  const [celebration, setCelebration] = useState<CelebrationState>({
    open: false,
    logId: "",
    habitName: "",
    streakDays: 0,
    isMilestone: false,
  });

  const pauseMutation = api.habit.pause.useMutation({
    onSuccess: () => void utils.habit.list.invalidate(),
  });

  const resumeMutation = api.habit.resume.useMutation({
    onSuccess: () => void utils.habit.list.invalidate(),
  });

  const archiveMutation = api.habit.archive.useMutation({
    onSuccess: () => void utils.habit.list.invalidate(),
  });

  const deleteMutation = api.habit.delete.useMutation({
    onSuccess: () => void utils.habit.list.invalidate(),
  });

  // 快速打卡
  const quickLogMutation = api.log.quickLog.useMutation({
    onSuccess: (data) => {
      void utils.habit.list.invalidate();
      // 打开庆祝弹窗
      setCelebration({
        open: true,
        logId: data.log.id,
        habitName: data.habitName,
        streakDays: data.streakDays,
        isMilestone: data.isMilestone,
        milestoneType: data.milestoneType,
      });
    },
  });

  // 记录庆祝
  const recordCelebrationMutation =
    api.celebration.recordCelebration.useMutation({
      onSuccess: () => void utils.habit.list.invalidate(),
    });

  // 跳过庆祝
  const skipCelebrationMutation = api.celebration.skipCelebration.useMutation();

  const handleQuickLog = () => {
    if (habit.status !== "ACTIVE") return;
    quickLogMutation.mutate({ habitId: habit.id, completed: true });
  };

  const handleCelebrationSubmit = async (data: {
    methodId?: string;
    shineScore: number;
    note?: string;
  }) => {
    await recordCelebrationMutation.mutateAsync({
      logId: celebration.logId,
      shineScore: data.shineScore,
      note: data.note,
    });
  };

  const handleCelebrationSkip = () => {
    skipCelebrationMutation.mutate({ logId: celebration.logId });
  };

  const handleCloseCelebration = () => {
    setCelebration((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Card className="relative">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{habit.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={habit.type === "BUILD" ? "default" : "secondary"}
                >
                  {habit.type === "BUILD" ? "养成" : "戒除"}
                </Badge>
                {habit.category && (
                  <Badge variant="outline">{habit.category}</Badge>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {habit.status === "ACTIVE" ? (
                  <DropdownMenuItem
                    onClick={() => pauseMutation.mutate({ id: habit.id })}
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    暂停
                  </DropdownMenuItem>
                ) : habit.status === "PAUSED" ? (
                  <DropdownMenuItem
                    onClick={() => resumeMutation.mutate({ id: habit.id })}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    恢复
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  onClick={() => archiveMutation.mutate({ id: habit.id })}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  归档
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    if (
                      confirm(
                        "确定要删除这个习惯吗？所有相关数据将被永久删除。",
                      )
                    ) {
                      deleteMutation.mutate({ id: habit.id });
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {habit.description && (
            <CardDescription className="line-clamp-2">
              {habit.description}
            </CardDescription>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                第 {habit.currentPhase} 阶段
              </span>
              <span className="text-muted-foreground">
                累计 {habit._count.logs} 天
              </span>
            </div>
            <Progress value={(habit.currentPhase / 5) * 100} className="h-2" />
          </div>

          <div className="flex gap-2">
            {habit.status === "ACTIVE" && (
              <Button
                onClick={handleQuickLog}
                disabled={quickLogMutation.isPending}
                className="flex-1"
              >
                {quickLogMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                打卡
              </Button>
            )}
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/habits/${habit.id}`}>详情</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 庆祝弹窗 */}
      <CelebrationSuccessModal
        open={celebration.open}
        onClose={handleCloseCelebration}
        habitName={celebration.habitName}
        streakDays={celebration.streakDays}
        isMilestone={celebration.isMilestone}
        milestoneType={celebration.milestoneType}
        _logId={celebration.logId}
        onSubmit={handleCelebrationSubmit}
        onSkip={handleCelebrationSkip}
      />
    </>
  );
}

function EmptyState() {
  return (
    <Card className="flex flex-col items-center justify-center py-12">
      <Target className="text-muted-foreground h-12 w-12" />
      <h3 className="mt-4 text-lg font-semibold">还没有习惯</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        创建你的第一个习惯，让 AI 教练帮你设计最适合的方案
      </p>
      <Button className="mt-4" asChild>
        <Link href="/habits/new">
          <Plus className="mr-2 h-4 w-4" />
          创建习惯
        </Link>
      </Button>
    </Card>
  );
}
