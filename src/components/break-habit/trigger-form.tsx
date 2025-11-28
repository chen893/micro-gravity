"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MapPin, Brain, Zap, CheckCircle2, XCircle } from "lucide-react";

interface TriggerFormProps {
  habitId: string;
  onSuccess?: () => void;
}

type TriggerType = "TEMPORAL" | "CONTEXTUAL" | "EMOTIONAL" | "BEHAVIORAL";

const triggerTypeOptions: { value: TriggerType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "TEMPORAL",
    label: "时间触发",
    icon: <Clock className="h-4 w-4" />,
    description: "特定时间段容易触发"
  },
  {
    value: "CONTEXTUAL",
    label: "情境触发",
    icon: <MapPin className="h-4 w-4" />,
    description: "特定地点或场景触发"
  },
  {
    value: "EMOTIONAL",
    label: "情绪触发",
    icon: <Brain className="h-4 w-4" />,
    description: "特定情绪状态触发"
  },
  {
    value: "BEHAVIORAL",
    label: "行为触发",
    icon: <Zap className="h-4 w-4" />,
    description: "其他行为连带触发"
  },
];

const emotionOptions = [
  "焦虑", "无聊", "压力", "疲劳", "孤独",
  "沮丧", "愤怒", "兴奋", "开心", "紧张"
];

export function TriggerForm({ habitId, onSuccess }: TriggerFormProps) {
  const utils = api.useUtils();

  const [triggerType, setTriggerType] = useState<TriggerType>("EMOTIONAL");
  const [context, setContext] = useState("");
  const [location, setLocation] = useState("");
  const [emotion, setEmotion] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const [resisted, setResisted] = useState(true);
  const [copingStrategy, setCopingStrategy] = useState("");

  const createTriggerMutation = api.log.create.useMutation({
    onSuccess: () => {
      void utils.log.getByHabit.invalidate({ habitId });
      void utils.habit.getStats.invalidate({ id: habitId });
      // 重置表单
      setContext("");
      setLocation("");
      setEmotion("");
      setIntensity([5]);
      setResisted(true);
      setCopingStrategy("");
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.trim()) return;

    // 构建触发记录数据
    const triggerData = {
      timestamp: new Date().toISOString(),
      triggerType,
      context: context.trim(),
      location: location.trim() || undefined,
      emotion: emotion || undefined,
      intensity: intensity[0],
      resisted,
      copingStrategy: copingStrategy.trim() || undefined,
    };

    createTriggerMutation.mutate({
      habitId,
      completed: resisted,
      notes: JSON.stringify(triggerData),
      difficultyRating: intensity[0],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">记录触发时刻</CardTitle>
        <CardDescription>
          记录每次冲动的触发情况，帮助识别模式
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* 触发类型选择 */}
          <div className="space-y-3">
            <Label>触发类型</Label>
            <div className="grid grid-cols-2 gap-2">
              {triggerTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTriggerType(option.value)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                    triggerType === option.value
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/50"
                  }`}
                >
                  <div className={`mt-0.5 ${triggerType === option.value ? "text-primary" : "text-muted-foreground"}`}>
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 场景描述 */}
          <div className="space-y-2">
            <Label htmlFor="context">发生了什么？ *</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="描述当时的情况，例如：刚吃完午饭，坐在办公桌前..."
              rows={3}
              required
            />
          </div>

          {/* 地点 */}
          <div className="space-y-2">
            <Label htmlFor="location">地点（可选）</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="例如：办公室、家里、咖啡厅"
            />
          </div>

          {/* 情绪状态 */}
          <div className="space-y-2">
            <Label>当时的情绪（可选）</Label>
            <Select value={emotion} onValueChange={setEmotion}>
              <SelectTrigger>
                <SelectValue placeholder="选择情绪状态" />
              </SelectTrigger>
              <SelectContent>
                {emotionOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 冲动强度 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>冲动强度</Label>
              <span className="text-sm font-medium">{intensity[0]}/10</span>
            </div>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>轻微冲动</span>
              <span>强烈冲动</span>
            </div>
          </div>

          {/* 是否抵抗成功 */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              {resisted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <div className="font-medium">
                  {resisted ? "成功抵抗" : "未能抵抗"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {resisted ? "这次没有执行坏习惯" : "这次执行了坏习惯"}
                </div>
              </div>
            </div>
            <Switch
              checked={resisted}
              onCheckedChange={setResisted}
            />
          </div>

          {/* 使用的应对策略（如果成功抵抗） */}
          {resisted && (
            <div className="space-y-2">
              <Label htmlFor="strategy">你使用了什么策略？</Label>
              <Input
                id="strategy"
                value={copingStrategy}
                onChange={(e) => setCopingStrategy(e.target.value)}
                placeholder="例如：深呼吸、喝水、走动..."
              />
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={createTriggerMutation.isPending || !context.trim()}
          >
            {createTriggerMutation.isPending ? "记录中..." : "记录这次触发"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
