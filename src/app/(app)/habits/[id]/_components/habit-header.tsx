"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ArrowLeft,
  MoreVertical,
  Pause,
  Play,
  Archive,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { HabitEditDialog } from "./habit-edit-dialog";

interface HabitHeaderProps {
  habit: {
    id: string;
    name: string;
    type: "BUILD" | "BREAK";
    status: "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
    description: string | null;
    category: string | null;
  };
}

export function HabitHeader({ habit }: HabitHeaderProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const pauseMutation = api.habit.pause.useMutation({
    onSuccess: () => {
      void utils.habit.getById.invalidate({ id: habit.id });
      void utils.habit.list.invalidate();
    },
  });

  const resumeMutation = api.habit.resume.useMutation({
    onSuccess: () => {
      void utils.habit.getById.invalidate({ id: habit.id });
      void utils.habit.list.invalidate();
    },
  });

  const archiveMutation = api.habit.archive.useMutation({
    onSuccess: () => {
      void utils.habit.getById.invalidate({ id: habit.id });
      void utils.habit.list.invalidate();
    },
  });

  const deleteMutation = api.habit.delete.useMutation({
    onSuccess: () => {
      void utils.habit.list.invalidate();
      router.push("/habits");
    },
  });

  const statusConfig = {
    ACTIVE: { label: "进行中", variant: "default" as const },
    PAUSED: { label: "已暂停", variant: "secondary" as const },
    COMPLETED: { label: "已完成", variant: "outline" as const },
    ARCHIVED: { label: "已归档", variant: "outline" as const },
  };

  const statusInfo = statusConfig[habit.status];

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/habits">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{habit.name}</h1>
          </div>
          <div className="flex items-center gap-2 pl-11">
            <Badge variant={habit.type === "BUILD" ? "default" : "secondary"}>
              {habit.type === "BUILD" ? "养成" : "戒除"}
            </Badge>
            {habit.category && (
              <Badge variant="outline">{habit.category}</Badge>
            )}
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
          {habit.description && (
            <p className="text-muted-foreground pl-11">{habit.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {habit.status === "ACTIVE" ? (
                <DropdownMenuItem
                  onClick={() => pauseMutation.mutate({ id: habit.id })}
                  disabled={pauseMutation.isPending}
                >
                  <Pause className="mr-2 h-4 w-4" />
                  暂停习惯
                </DropdownMenuItem>
              ) : habit.status === "PAUSED" ? (
                <DropdownMenuItem
                  onClick={() => resumeMutation.mutate({ id: habit.id })}
                  disabled={resumeMutation.isPending}
                >
                  <Play className="mr-2 h-4 w-4" />
                  恢复习惯
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem
                onClick={() => archiveMutation.mutate({ id: habit.id })}
                disabled={archiveMutation.isPending}
              >
                <Archive className="mr-2 h-4 w-4" />
                归档习惯
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除习惯
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确定要删除这个习惯吗？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作不可撤销。删除后，所有相关的打卡记录、对话历史和里程碑数据都将被永久删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteMutation.mutate({ id: habit.id })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "删除中..." : "确认删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 编辑对话框 */}
      <HabitEditDialog
        habit={habit}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
