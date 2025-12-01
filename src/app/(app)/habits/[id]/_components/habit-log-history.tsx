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
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  XCircle,
  Smile,
  Meh,
  Frown,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface Log {
  id: string;
  loggedAt: Date;
  completed: boolean;
  completionTime: Date | null;
  durationMinutes: number | null;
  difficultyRating: number | null;
  moodBefore: number | null;
  moodAfter: number | null;
  notes: string | null;
}

interface HabitLogHistoryProps {
  logs: Log[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  habitId: string;
  habitType: "BUILD" | "BREAK";
}

export function HabitLogHistory({
  logs: initialLogs,
  total,
  hasMore: initialHasMore,
  isLoading,
  habitId,
  habitType,
}: HabitLogHistoryProps) {
  const [offset, setOffset] = useState(10);

  const { data: moreLogsData, isFetching } = api.log.getByHabit.useQuery(
    { habitId, limit: 10, offset },
    { enabled: offset > 10 },
  );

  const allLogs =
    offset > 10 && moreLogsData
      ? [...initialLogs, ...moreLogsData.logs]
      : initialLogs;
  const hasMore = moreLogsData ? moreLogsData.hasMore : initialHasMore;

  const loadMore = () => {
    setOffset((prev) => prev + 10);
  };

  const getMoodIcon = (mood: number | null) => {
    if (mood === null) return null;
    if (mood >= 4) return <Smile className="h-4 w-4 text-green-500" />;
    if (mood >= 3) return <Meh className="h-4 w-4 text-amber-500" />;
    return <Frown className="h-4 w-4 text-red-500" />;
  };

  const getDifficultyColor = (rating: number | null) => {
    if (rating === null) return "";
    if (rating <= 2) return "text-green-600";
    if (rating <= 3) return "text-amber-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">打卡历史</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (allLogs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">打卡历史</CardTitle>
          <CardDescription>还没有打卡记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="text-muted-foreground h-12 w-12" />
            <p className="text-muted-foreground mt-4 text-sm">
              {habitType === "BUILD"
                ? "完成今天的习惯，开启你的记录之旅"
                : "记录每一次抵抗冲动的时刻"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">打卡历史</CardTitle>
        <CardDescription>共 {total} 条记录</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-1">
            {allLogs.map((log) => (
              <div
                key={log.id}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {log.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-400" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {format(new Date(log.loggedAt), "M月d日 EEEE", {
                          locale: zhCN,
                        })}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatDistanceToNow(new Date(log.loggedAt), {
                          addSuffix: true,
                          locale: zhCN,
                        })}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      {log.completionTime && (
                        <span>
                          {format(new Date(log.completionTime), "HH:mm")}
                        </span>
                      )}
                      {log.durationMinutes && (
                        <span>耗时 {log.durationMinutes} 分钟</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* 情绪变化 */}
                  {(log.moodBefore !== null || log.moodAfter !== null) && (
                    <div className="flex items-center gap-1">
                      {getMoodIcon(log.moodBefore)}
                      {log.moodBefore !== null && log.moodAfter !== null && (
                        <span className="text-muted-foreground text-xs">→</span>
                      )}
                      {getMoodIcon(log.moodAfter)}
                    </div>
                  )}

                  {/* 难度评分 */}
                  {log.difficultyRating !== null && (
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(log.difficultyRating)}
                    >
                      难度 {log.difficultyRating}
                    </Badge>
                  )}

                  {/* 完成状态 */}
                  <Badge variant={log.completed ? "default" : "secondary"}>
                    {log.completed
                      ? habitType === "BUILD"
                        ? "已完成"
                        : "已坚持"
                      : habitType === "BUILD"
                        ? "未完成"
                        : "复发"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          {hasMore && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={loadMore}
                disabled={isFetching}
              >
                {isFetching ? (
                  "加载中..."
                ) : (
                  <>
                    加载更多
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
