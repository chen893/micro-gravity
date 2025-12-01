"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Zap, Bell, Lightbulb, Target, Clock } from "lucide-react";

interface HabitMapInfoProps {
  motivation: {
    primaryType: string;
    deepReason: string;
    visionStatement: string;
    painPoints?: string[];
    motivationScore: number;
  };
  ability: {
    currentLevel: string;
    targetLevel: string;
    microHabit: string;
    difficultyScore: number;
    barriers?: string[];
    simplificationTips?: string[];
  };
  prompt: {
    anchorHabit: string;
    triggerType: string;
    preferredTime: string;
    contextCues?: string[];
    reminderStyle?: string;
  };
}

const motivationTypeLabels: Record<string, string> = {
  PLEASURE: "愉悦驱动",
  HOPE: "希望驱动",
  SOCIAL: "社会认同",
};

const triggerTypeLabels: Record<string, string> = {
  SIGNAL: "信号型",
  FACILITATOR: "便利型",
  SPARK: "火花型",
};

const reminderStyleLabels: Record<string, string> = {
  GENTLE: "温和",
  FIRM: "坚定",
  PLAYFUL: "有趣",
};

export function HabitMapInfo({
  motivation,
  ability,
  prompt,
}: HabitMapInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* 动机 (M) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <CardTitle className="text-base">动机 (Motivation)</CardTitle>
          </div>
          <CardDescription>为什么要养成这个习惯</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">动机类型</span>
              <Badge variant="secondary">
                {motivationTypeLabels[motivation.primaryType] ??
                  motivation.primaryType}
              </Badge>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">动机强度</span>
              <span className="font-medium">
                {motivation.motivationScore}/10
              </span>
            </div>
            <Progress value={motivation.motivationScore * 10} className="h-2" />
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">深层原因</p>
            <p className="text-sm">{motivation.deepReason}</p>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Lightbulb className="h-3 w-3" />
              愿景声明
            </div>
            <p className="text-sm italic">
              &ldquo;{motivation.visionStatement}&rdquo;
            </p>
          </div>

          {motivation.painPoints && motivation.painPoints.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">痛点</p>
              <div className="flex flex-wrap gap-1">
                {motivation.painPoints.map((point, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {point}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 能力 (A) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base">能力 (Ability)</CardTitle>
          </div>
          <CardDescription>如何让习惯更容易执行</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">当前水平</p>
              <p className="text-sm font-medium">{ability.currentLevel}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">目标水平</p>
              <p className="text-sm font-medium">{ability.targetLevel}</p>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">难度评估</span>
              <span className="font-medium">{ability.difficultyScore}/10</span>
            </div>
            <Progress value={ability.difficultyScore * 10} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Target className="h-3 w-3" />
              微习惯定义
            </div>
            <p className="bg-muted rounded-md p-2 text-sm font-medium">
              {ability.microHabit}
            </p>
          </div>

          {ability.barriers && ability.barriers.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">障碍</p>
              <ul className="list-inside list-disc text-sm">
                {ability.barriers.map((barrier, i) => (
                  <li key={i}>{barrier}</li>
                ))}
              </ul>
            </div>
          )}

          {ability.simplificationTips &&
            ability.simplificationTips.length > 0 && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">简化建议</p>
                <ul className="list-inside list-disc text-sm text-green-600">
                  {ability.simplificationTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
        </CardContent>
      </Card>

      {/* 提示 (P) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-base">提示 (Prompt)</CardTitle>
          </div>
          <CardDescription>什么时候触发这个习惯</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">锚定习惯</p>
            <p className="text-sm font-medium">{prompt.anchorHabit}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">触发类型</p>
              <Badge variant="outline">
                {triggerTypeLabels[prompt.triggerType] ?? prompt.triggerType}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">提醒风格</p>
              <Badge variant="outline">
                {prompt.reminderStyle
                  ? (reminderStyleLabels[prompt.reminderStyle] ??
                    prompt.reminderStyle)
                  : "默认"}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3" />
              偏好时间
            </div>
            <p className="text-sm font-medium">{prompt.preferredTime}</p>
          </div>

          {prompt.contextCues && prompt.contextCues.length > 0 && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">情境线索</p>
              <div className="flex flex-wrap gap-1">
                {prompt.contextCues.map((cue, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {cue}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
