"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Plus,
  Trash2,
  Loader2,
  Sunrise,
  Briefcase,
  Sunset,
  Moon,
  Sparkles,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoutineActivity } from "@/lib/ai/anchor-matching";

export type TimeSlot = "MORNING" | "WORK" | "EVENING" | "NIGHT";

interface DailyRoutineEditorProps {
  activities: Record<TimeSlot, RoutineActivity[]>;
  onActivitiesChange: (activities: Record<TimeSlot, RoutineActivity[]>) => void;
  onExtractFromText?: (
    text: string,
    timeSlot: TimeSlot,
  ) => Promise<RoutineActivity[]>;
  isExtracting?: boolean;
}

const TIME_SLOT_CONFIG: Record<
  TimeSlot,
  { label: string; description: string; icon: React.ElementType; color: string }
> = {
  MORNING: {
    label: "早晨",
    description: "起床到出门",
    icon: Sunrise,
    color: "text-amber-500",
  },
  WORK: {
    label: "工作时段",
    description: "上班/学习期间",
    icon: Briefcase,
    color: "text-blue-500",
  },
  EVENING: {
    label: "傍晚",
    description: "下班到晚餐",
    icon: Sunset,
    color: "text-orange-500",
  },
  NIGHT: {
    label: "夜间",
    description: "晚餐后到睡前",
    icon: Moon,
    color: "text-purple-500",
  },
};

const FREQUENCY_OPTIONS = [
  { value: "DAILY", label: "每天" },
  { value: "WEEKDAYS", label: "工作日" },
  { value: "WEEKENDS", label: "周末" },
  { value: "OCCASIONAL", label: "偶尔" },
] as const;

export function DailyRoutineEditor({
  activities,
  onActivitiesChange,
  onExtractFromText,
  isExtracting,
}: DailyRoutineEditorProps) {
  const [activeSlot, setActiveSlot] = useState<TimeSlot>("MORNING");
  const [freeText, setFreeText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState<RoutineActivity>({
    name: "",
    frequency: "DAILY",
  });

  const handleExtractActivities = async () => {
    if (!onExtractFromText || !freeText.trim()) return;

    const extracted = await onExtractFromText(freeText, activeSlot);
    const updatedActivities = {
      ...activities,
      [activeSlot]: [...activities[activeSlot], ...extracted],
    };
    onActivitiesChange(updatedActivities);
    setFreeText("");
  };

  const handleAddActivity = () => {
    if (!newActivity.name.trim()) return;

    const updatedActivities = {
      ...activities,
      [activeSlot]: [...activities[activeSlot], { ...newActivity }],
    };
    onActivitiesChange(updatedActivities);
    setNewActivity({ name: "", frequency: "DAILY" });
    setShowAddForm(false);
  };

  const handleRemoveActivity = (index: number) => {
    const updatedActivities = {
      ...activities,
      [activeSlot]: activities[activeSlot].filter((_, i) => i !== index),
    };
    onActivitiesChange(updatedActivities);
  };

  const currentActivities = activities[activeSlot];
  const config = TIME_SLOT_CONFIG[activeSlot];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Calendar className="text-primary h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">梳理日程</h2>
        <p className="text-muted-foreground mt-2">
          告诉我你每天做什么，我帮你找到最佳锚点
        </p>
      </div>

      {/* 时段选择 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(Object.keys(TIME_SLOT_CONFIG) as TimeSlot[]).map((slot) => {
          const slotConfig = TIME_SLOT_CONFIG[slot];
          const SlotIcon = slotConfig.icon;
          const count = activities[slot].length;

          return (
            <Button
              key={slot}
              variant={activeSlot === slot ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSlot(slot)}
              className="flex-shrink-0"
            >
              <SlotIcon
                className={cn(
                  "mr-1 h-4 w-4",
                  activeSlot !== slot && slotConfig.color,
                )}
              />
              {slotConfig.label}
              {count > 0 && (
                <Badge
                  variant={activeSlot === slot ? "secondary" : "outline"}
                  className="ml-1"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5", config.color)} />
            <CardTitle className="text-base">{config.label}</CardTitle>
          </div>
          <CardDescription>{config.description}你通常做什么？</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI 提取输入 */}
          {onExtractFromText && (
            <div className="space-y-2">
              <Textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder={`描述一下你${config.label}的日常...\n例如：起床后先喝杯温水，然后刷牙洗脸，接着做早餐吃早餐，最后出门上班`}
                className="min-h-[80px]"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleExtractActivities}
                disabled={!freeText.trim() || isExtracting}
                className="w-full"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    提取中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI 智能提取活动
                  </>
                )}
              </Button>
            </div>
          )}

          {/* 活动列表 */}
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              {currentActivities.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  还没有添加活动
                </p>
              ) : (
                currentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{activity.name}</p>
                      <div className="text-muted-foreground mt-1 flex gap-2 text-xs">
                        {activity.time && <span>{activity.time}</span>}
                        <span>
                          {
                            FREQUENCY_OPTIONS.find(
                              (f) => f.value === activity.frequency,
                            )?.label
                          }
                        </span>
                        {activity.location && (
                          <span>@ {activity.location}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveActivity(index)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* 手动添加 */}
          {showAddForm ? (
            <div className="bg-muted/30 space-y-3 rounded-lg border p-3">
              <Input
                value={newActivity.name}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, name: e.target.value })
                }
                placeholder="活动名称"
              />
              <div className="flex gap-2">
                <Input
                  value={newActivity.time ?? ""}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      time: e.target.value || undefined,
                    })
                  }
                  placeholder="时间（可选）"
                  className="flex-1"
                />
                <select
                  value={newActivity.frequency}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      frequency: e.target.value as RoutineActivity["frequency"],
                    })
                  }
                  className="bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                >
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddActivity}
                  disabled={!newActivity.name.trim()}
                  className="flex-1"
                >
                  <Check className="mr-1 h-4 w-4" />
                  添加
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(true)}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              手动添加活动
            </Button>
          )}
        </CardContent>
      </Card>

      {/* 进度指示 */}
      <div className="flex justify-center gap-2">
        {(Object.keys(TIME_SLOT_CONFIG) as TimeSlot[]).map((slot) => (
          <div
            key={slot}
            className={cn(
              "h-2 w-8 rounded-full transition-colors",
              activities[slot].length > 0 ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
