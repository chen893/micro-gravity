"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HabitEditDialogProps {
  habit: {
    id: string;
    name: string;
    type: "BUILD" | "BREAK";
    status: "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
    description: string | null;
    category: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryOptions = [
  { value: "health", label: "健康" },
  { value: "fitness", label: "运动" },
  { value: "learning", label: "学习" },
  { value: "work", label: "工作" },
  { value: "social", label: "社交" },
  { value: "mindfulness", label: "冥想" },
  { value: "creativity", label: "创意" },
  { value: "finance", label: "理财" },
  { value: "other", label: "其他" },
];

export function HabitEditDialog({
  habit,
  open,
  onOpenChange,
}: HabitEditDialogProps) {
  const utils = api.useUtils();
  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description ?? "");
  const [category, setCategory] = useState(habit.category ?? "other");

  // 当 habit 变化时重置表单
  useEffect(() => {
    setName(habit.name);
    setDescription(habit.description ?? "");
    setCategory(habit.category ?? "other");
  }, [habit]);

  const updateMutation = api.habit.update.useMutation({
    onSuccess: () => {
      void utils.habit.getById.invalidate({ id: habit.id });
      void utils.habit.list.invalidate();
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateMutation.mutate({
      id: habit.id,
      name: name.trim(),
      description: description.trim() || undefined,
      category: category,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // 关闭时重置表单
      setName(habit.name);
      setDescription(habit.description ?? "");
      setCategory(habit.category ?? "other");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>编辑习惯</DialogTitle>
            <DialogDescription>
              修改习惯的基本信息。习惯类型创建后无法更改。
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">习惯名称</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：每天阅读30分钟"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">分类</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">描述（可选）</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="描述这个习惯的目标或细节..."
                rows={3}
              />
            </div>

            <div className="rounded-md bg-muted p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">习惯类型：</span>
                {habit.type === "BUILD" ? "养成型" : "戒除型"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                习惯类型在创建后无法修改
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" disabled={updateMutation.isPending || !name.trim()}>
              {updateMutation.isPending ? "保存中..." : "保存修改"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
