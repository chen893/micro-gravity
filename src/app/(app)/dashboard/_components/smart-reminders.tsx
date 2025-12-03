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
import {
  Bell,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Reminder {
  habitId: string;
  habitName: string;
  content: string;
  promptType: string;
  actionGuidance: string;
}

export function SmartReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // 获取提醒风格建议
  const { data: styleData } = api.reminder.getStyleSuggestion.useQuery();

  // 批量生成提醒
  const generateMutation = api.reminder.generateBatch.useMutation({
    onSuccess: (data) => {
      setReminders(data);
    },
  });

  const handleRefresh = () => {
    generateMutation.mutate();
  };

  const promptTypeLabels: Record<string, string> = {
    ANCHOR: "锚点提醒",
    MOTIVATION: "动力提醒",
    PROGRESS: "进度提醒",
    RECOVERY: "恢复提醒",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-base">智能提醒</CardTitle>
          </div>
          <CardDescription>
            {styleData?.description ?? "个性化习惯提醒"}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={generateMutation.isPending}
        >
          {generateMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          生成提醒
        </Button>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Sparkles className="text-muted-foreground mb-4 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              点击&ldquo;生成提醒&rdquo;获取个性化的习惯提醒
            </p>
            {styleData && (
              <Badge variant="secondary" className="mt-2">
                当前推荐：{styleData.suggestedStyle === "GENTLE" ? "温和" : styleData.suggestedStyle === "FIRM" ? "坚定" : "有趣"}风格
              </Badge>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.habitId}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{reminder.habitName}</span>
                      <Badge variant="outline" className="text-xs">
                        {promptTypeLabels[reminder.promptType] ?? reminder.promptType}
                      </Badge>
                    </div>
                    <p className="text-sm">{reminder.content}</p>
                    <p className="text-muted-foreground text-xs">
                      {reminder.actionGuidance}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/habits/${reminder.habitId}`}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SmartRemindersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
