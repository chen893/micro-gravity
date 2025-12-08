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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  XCircle,
  Smile,
  Meh,
  Frown,
  ChevronDown,
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  Sparkles,
  Star,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { toast } from "sonner";
import { type CompletionLevel } from "generated/prisma";

interface Log {
  id: string;
  loggedAt: Date;
  completed: boolean;
  completionLevel: CompletionLevel;
  actualBehavior: string | null;
  wantedMore: boolean | null;
  feltEasy: boolean | null;
  shineScore: number | null;
  moodBefore: number | null;
  moodAfter: number | null;
  note: string | null;
}

interface HabitLogHistoryProps {
  logs: Log[];
  hasMore: boolean;
  habitId: string;
}

export function HabitLogHistory({
  logs: initialLogs,
  hasMore: initialHasMore,
  habitId,
}: HabitLogHistoryProps) {
  const utils = api.useUtils();
  const [offset, setOffset] = useState(10);
  const [editingLog, setEditingLog] = useState<Log | null>(null);
  const [deletingLogId, setDeletingLogId] = useState<string | null>(null);

  // 编辑表单状态
  const [editForm, setEditForm] = useState({
    completed: true,
    completionLevel: "STANDARD" as CompletionLevel,
    moodBefore: 3,
    moodAfter: 3,
    note: "",
  });

  const { data: moreLogsData, isFetching } = api.log.getByHabit.useQuery(
    { habitId, limit: 10, offset },
    { enabled: offset > 10 },
  );

  // 更新日志
  const updateMutation = api.log.update.useMutation({
    onSuccess: () => {
      toast.success("记录已更新");
      setEditingLog(null);
      void utils.log.getByHabit.invalidate({ habitId });
      void utils.habit.getStats.invalidate({ id: habitId });
    },
    onError: () => {
      toast.error("更新失败");
    },
  });

  // 删除日志
  const deleteMutation = api.log.delete.useMutation({
    onSuccess: () => {
      toast.success("记录已删除");
      setDeletingLogId(null);
      void utils.log.getByHabit.invalidate({ habitId });
      void utils.habit.getStats.invalidate({ id: habitId });
    },
    onError: () => {
      toast.error("删除失败");
    },
  });

  const allLogs =
    offset > 10 && moreLogsData
      ? [...initialLogs, ...moreLogsData.logs]
      : initialLogs;
  const hasMore = moreLogsData ? moreLogsData.hasMore : initialHasMore;

  const loadMore = () => {
    setOffset((prev) => prev + 10);
  };

  const openEditDialog = (log: Log) => {
    setEditingLog(log);
    setEditForm({
      completed: log.completed,
      completionLevel: log.completionLevel ?? "STANDARD",
      moodBefore: log.moodBefore ?? 3,
      moodAfter: log.moodAfter ?? 3,
      note: log.note ?? "",
    });
  };

  const handleUpdate = () => {
    if (!editingLog) return;
    updateMutation.mutate({
      id: editingLog.id,
      completed: editForm.completed,
      completionLevel: editForm.completionLevel,
      moodBefore: editForm.moodBefore,
      moodAfter: editForm.moodAfter,
      note: editForm.note || undefined,
    });
  };

  const handleDelete = () => {
    if (!deletingLogId) return;
    deleteMutation.mutate({ id: deletingLogId });
  };

  const getMoodIcon = (mood: number | null) => {
    if (mood === null) return null;
    if (mood >= 4) return <Smile className="h-4 w-4 text-green-500" />;
    if (mood >= 3) return <Meh className="h-4 w-4 text-amber-500" />;
    return <Frown className="h-4 w-4 text-red-500" />;
  };

  const getCompletionLevelLabel = (level: CompletionLevel) => {
    switch (level) {
      case "MINIMUM":
        return "最小版";
      case "STANDARD":
        return "标准版";
      case "EXCEEDED":
        return "超额完成";
      default:
        return "标准版";
    }
  };

  const getCompletionLevelColor = (level: CompletionLevel) => {
    switch (level) {
      case "MINIMUM":
        return "bg-blue-100 text-blue-700";
      case "STANDARD":
        return "bg-green-100 text-green-700";
      case "EXCEEDED":
        return "bg-amber-100 text-amber-700";
      default:
        return "";
    }
  };

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
              完成今天的习惯，开启你的记录之旅
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">打卡历史</CardTitle>
          <CardDescription>最近的打卡记录</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-1">
              {allLogs.map((log) => (
                <div
                  key={log.id}
                  className="hover:bg-muted/50 group flex items-center justify-between rounded-lg p-3 transition-colors"
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
                        {log.actualBehavior && (
                          <span className="max-w-[150px] truncate">
                            {log.actualBehavior}
                          </span>
                        )}
                        {log.note && (
                          <span className="max-w-[150px] truncate">
                            {log.note}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* 发光感评分 */}
                    {log.shineScore && (
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-xs">{log.shineScore}</span>
                      </div>
                    )}

                    {/* 情绪变化 */}
                    {(log.moodBefore !== null || log.moodAfter !== null) && (
                      <div className="flex items-center gap-1">
                        {getMoodIcon(log.moodBefore)}
                        {log.moodBefore !== null && log.moodAfter !== null && (
                          <span className="text-muted-foreground text-xs">
                            →
                          </span>
                        )}
                        {getMoodIcon(log.moodAfter)}
                      </div>
                    )}

                    {/* 完成程度 */}
                    {log.completed && (
                      <Badge
                        variant="outline"
                        className={getCompletionLevelColor(log.completionLevel)}
                      >
                        {getCompletionLevelLabel(log.completionLevel)}
                      </Badge>
                    )}

                    {/* 完成状态 */}
                    <Badge variant={log.completed ? "default" : "secondary"}>
                      {log.completed ? "已完成" : "未完成"}
                    </Badge>

                    {/* 操作菜单 */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(log)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeletingLogId(log.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* 编辑对话框 */}
      <Dialog open={!!editingLog} onOpenChange={() => setEditingLog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑打卡记录</DialogTitle>
            <DialogDescription>
              {editingLog &&
                format(new Date(editingLog.loggedAt), "yyyy年M月d日 EEEE", {
                  locale: zhCN,
                })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* 完成状态 */}
            <div className="flex items-center gap-4">
              <Label>完成状态</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={editForm.completed ? "default" : "outline"}
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, completed: true }))
                  }
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  已完成
                </Button>
                <Button
                  size="sm"
                  variant={!editForm.completed ? "destructive" : "outline"}
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, completed: false }))
                  }
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  未完成
                </Button>
              </div>
            </div>

            {/* 完成程度 */}
            <div className="space-y-2">
              <Label>完成程度</Label>
              <div className="flex gap-2">
                {(["MINIMUM", "STANDARD", "EXCEEDED"] as CompletionLevel[]).map(
                  (level) => (
                    <Button
                      key={level}
                      size="sm"
                      variant={
                        editForm.completionLevel === level
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setEditForm((prev) => ({
                          ...prev,
                          completionLevel: level,
                        }))
                      }
                    >
                      {getCompletionLevelLabel(level)}
                    </Button>
                  ),
                )}
              </div>
            </div>

            {/* 情绪 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>完成前情绪</Label>
                  <span className="text-muted-foreground text-sm">
                    {editForm.moodBefore}/5
                  </span>
                </div>
                <Slider
                  value={[editForm.moodBefore]}
                  onValueChange={([v]) =>
                    setEditForm((prev) => ({ ...prev, moodBefore: v ?? 3 }))
                  }
                  min={1}
                  max={5}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>完成后情绪</Label>
                  <span className="text-muted-foreground text-sm">
                    {editForm.moodAfter}/5
                  </span>
                </div>
                <Slider
                  value={[editForm.moodAfter]}
                  onValueChange={([v]) =>
                    setEditForm((prev) => ({ ...prev, moodAfter: v ?? 3 }))
                  }
                  min={1}
                  max={5}
                  step={1}
                />
              </div>
            </div>

            {/* 备注 */}
            <div className="space-y-2">
              <Label>备注</Label>
              <Textarea
                value={editForm.note}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="记录一些心得或感受..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLog(null)}>
              取消
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              {updateMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <AlertDialog
        open={!!deletingLogId}
        onOpenChange={() => setDeletingLogId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后无法恢复，确定要删除这条打卡记录吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
