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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  Briefcase,
  Smartphone,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

interface EnvironmentDesignProps {
  habitId: string;
  habitName: string;
}

const environmentCategories = [
  {
    id: "physical",
    label: "物理环境",
    icon: <Home className="h-4 w-4" />,
    description: "改变你周围的物理空间",
  },
  {
    id: "digital",
    label: "数字环境",
    icon: <Smartphone className="h-4 w-4" />,
    description: "优化数字设备和应用",
  },
  {
    id: "social",
    label: "社交环境",
    icon: <Users className="h-4 w-4" />,
    description: "利用社交关系获得支持",
  },
  {
    id: "temporal",
    label: "时间安排",
    icon: <Clock className="h-4 w-4" />,
    description: "调整时间和日程安排",
  },
];

const defaultStrategies = {
  physical: [
    { id: "p1", text: "移除家中/办公室中与坏习惯相关的物品", priority: "high" },
    { id: "p2", text: "在触发地点放置提醒卡片或替代物品", priority: "medium" },
    { id: "p3", text: "重新布置经常触发的空间", priority: "medium" },
    { id: "p4", text: "准备健康替代品放在显眼位置", priority: "high" },
  ],
  digital: [
    { id: "d1", text: "删除或限制触发性应用", priority: "high" },
    { id: "d2", text: "设置应用使用时间限制", priority: "high" },
    { id: "d3", text: "关闭不必要的通知", priority: "medium" },
    { id: "d4", text: "使用专注模式或勿扰模式", priority: "medium" },
  ],
  social: [
    { id: "s1", text: "告诉朋友/家人你的戒除计划", priority: "high" },
    { id: "s2", text: "找到志同道合的伙伴互相监督", priority: "medium" },
    { id: "s3", text: "避免与可能触发坏习惯的人群接触", priority: "medium" },
    { id: "s4", text: "加入相关的支持社群", priority: "low" },
  ],
  temporal: [
    { id: "t1", text: "在高风险时段安排其他活动", priority: "high" },
    { id: "t2", text: "建立固定的健康作息时间", priority: "medium" },
    { id: "t3", text: "设置定时提醒进行替代行为", priority: "medium" },
    { id: "t4", text: "规划每日替代活动清单", priority: "low" },
  ],
};

type CategoryKey = keyof typeof defaultStrategies;

export function EnvironmentDesign({ habitId, habitName }: EnvironmentDesignProps) {
  const [completedStrategies, setCompletedStrategies] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["physical"]);

  const { data: aiSuggestions, isLoading } = api.analytics.getEnvironmentDesign.useQuery(
    { habitId },
    { staleTime: 10 * 60 * 1000 } // 10分钟缓存
  );

  const toggleStrategy = (id: string) => {
    setCompletedStrategies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalStrategies = Object.values(defaultStrategies).flat().length;
  const completedCount = completedStrategies.size;
  const progressPercent = Math.round((completedCount / totalStrategies) * 100);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">重要</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">推荐</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">可选</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* 进度概览 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                环境设计
              </CardTitle>
              <CardDescription>
                优化环境，降低触发概率
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progressPercent}%</div>
              <div className="text-xs text-muted-foreground">
                {completedCount}/{totalStrategies} 已完成
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI 个性化建议 */}
      {isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              AI 个性化建议
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ) : aiSuggestions && aiSuggestions.suggestions.length > 0 ? (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              AI 个性化建议
            </CardTitle>
            <CardDescription>
              基于你的触发模式，AI 为你定制的环境优化建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiSuggestions.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-background p-3"
                >
                  <Target className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm">{suggestion.suggestion}</p>
                    {suggestion.reason && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        原因：{suggestion.reason}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {/* 环境设计清单 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            环境优化清单
          </CardTitle>
          <CardDescription>
            逐步完成这些改变，为戒除坏习惯创造有利环境
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            type="multiple"
            value={expandedCategories}
            onValueChange={setExpandedCategories}
          >
            {environmentCategories.map((category) => {
              const strategies = defaultStrategies[category.id as CategoryKey];
              const categoryCompleted = strategies.filter((s) =>
                completedStrategies.has(s.id)
              ).length;

              return (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">{category.icon}</div>
                      <div className="text-left">
                        <div className="font-medium">{category.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.description}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto mr-2">
                        {categoryCompleted}/{strategies.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {strategies.map((strategy) => (
                        <div
                          key={strategy.id}
                          className={`flex items-start gap-3 rounded-lg border p-3 transition-all ${
                            completedStrategies.has(strategy.id)
                              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <Checkbox
                            id={strategy.id}
                            checked={completedStrategies.has(strategy.id)}
                            onCheckedChange={() => toggleStrategy(strategy.id)}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={strategy.id}
                            className={`flex-1 cursor-pointer text-sm ${
                              completedStrategies.has(strategy.id)
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {strategy.text}
                          </label>
                          {getPriorityBadge(strategy.priority)}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* 完成提示 */}
      {progressPercent >= 75 && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="flex items-center gap-4 py-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                环境优化进展顺利！
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                你已完成大部分环境设计，这将大大降低触发概率
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
