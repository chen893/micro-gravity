"use client";

/**
 * 去激励因素识别步骤
 * 帮助用户识别和处理阻碍习惯养成的心理因素
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertCircle,
  ChevronRight,
  Heart,
  Lightbulb,
  Shield,
  Loader2,
  Check,
} from "lucide-react";
import {
  type DemotivatorType,
  type DemotivatorAnalysis,
  DEMOTIVATOR_DEFINITIONS,
} from "@/lib/ai/demotivator-analysis";
import { api } from "@/trpc/react";

// 常见顾虑选项
const COMMON_CONCERNS = [
  { id: "time", label: "没有时间", type: "TIME_CONCERN" as DemotivatorType },
  { id: "energy", label: "没有精力", type: "ENERGY_CONCERN" as DemotivatorType },
  { id: "failed", label: "之前失败过", type: "PAST_FAILURE" as DemotivatorType },
  { id: "doubt", label: "不确定能坚持", type: "SELF_DOUBT" as DemotivatorType },
  { id: "perfect", label: "怕做不好", type: "PERFECTIONISM" as DemotivatorType },
  { id: "pressure", label: "感到压力", type: "EXTERNAL_PRESSURE" as DemotivatorType },
];

interface DemotivatorStepProps {
  habitName: string;
  onComplete: (analysis?: DemotivatorAnalysis) => void;
  onBack?: () => void;
}

export function DemotivatorStep({
  habitName,
  onComplete,
  onBack,
}: DemotivatorStepProps) {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [additionalConcerns, setAdditionalConcerns] = useState("");
  const [pastAttempts, setPastAttempts] = useState("");
  const [analysis, setAnalysis] = useState<DemotivatorAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyzeMutation = api.aspiration.analyzeDemotivators.useMutation({
    onSuccess: (result) => {
      setAnalysis(result);
      setShowAnalysis(true);
    },
    onError: (error) => {
      console.error("分析去激励因素失败:", error);
      toast.error("分析失败，请稍后重试", {
        description: "将跳过此步骤继续创建习惯",
      });
      // 分析失败时继续流程
      onComplete(undefined);
    },
  });

  const toggleConcern = (id: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    // 如果没有任何顾虑，直接跳过
    if (selectedConcerns.length === 0 && !additionalConcerns.trim()) {
      onComplete(undefined);
      return;
    }

    // 构建用户顾虑描述
    const concernLabels = selectedConcerns
      .map((id) => COMMON_CONCERNS.find((c) => c.id === id)?.label)
      .filter(Boolean);

    const userConcerns = [
      ...concernLabels,
      additionalConcerns.trim(),
    ]
      .filter(Boolean)
      .join("、");

    analyzeMutation.mutate({
      habitName,
      userConcerns,
      pastAttempts: pastAttempts.trim() || undefined,
    });
  };

  const isAnalyzing = analyzeMutation.isPending;

  const handleSkip = () => {
    onComplete(undefined);
  };

  const handleContinue = () => {
    onComplete(analysis ?? undefined);
  };

  // 显示分析结果
  if (showAnalysis && analysis) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-green-500" />
            我们理解你的顾虑
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 主要去激励因素 */}
          {analysis.primaryDemotivator && (
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">
                    主要顾虑：
                    {DEMOTIVATOR_DEFINITIONS[analysis.primaryDemotivator]?.label}
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    {
                      DEMOTIVATOR_DEFINITIONS[analysis.primaryDemotivator]
                        ?.description
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 个性化策略 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              <Label className="text-sm font-medium">应对策略</Label>
            </div>
            <div className="space-y-2">
              {analysis.personalizedStrategies.map((strategy, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-lg border bg-white p-3"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <p className="text-sm">{strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 鼓励语 */}
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 shrink-0 text-green-600" />
              <p className="text-sm text-green-800">{analysis.encouragement}</p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onBack} className="flex-1">
              返回
            </Button>
            <Button onClick={handleContinue} className="flex-1 gap-2">
              继续 <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 输入顾虑
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-blue-500" />
          有什么顾虑吗？
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          识别可能阻碍你的因素，帮助我们更好地设计你的习惯
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* 常见顾虑选择 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">常见顾虑（可多选）</Label>
          <div className="flex flex-wrap gap-2">
            {COMMON_CONCERNS.map((concern) => (
              <button
                key={concern.id}
                type="button"
                onClick={() => toggleConcern(concern.id)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm transition-all",
                  selectedConcerns.includes(concern.id)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                {concern.label}
              </button>
            ))}
          </div>
        </div>

        {/* 其他顾虑 */}
        <div className="space-y-2">
          <Label htmlFor="additionalConcerns" className="text-sm font-medium">
            还有其他顾虑吗？（可选）
          </Label>
          <Textarea
            id="additionalConcerns"
            placeholder="分享你的担忧，我们会帮你想办法..."
            value={additionalConcerns}
            onChange={(e) => setAdditionalConcerns(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>

        {/* 过往尝试 */}
        {selectedConcerns.includes("failed") && (
          <div className="space-y-2">
            <Label htmlFor="pastAttempts" className="text-sm font-medium">
              之前尝试过什么方法？
            </Label>
            <Textarea
              id="pastAttempts"
              placeholder="告诉我们之前的经历，这次我们用不同的方法..."
              value={pastAttempts}
              onChange={(e) => setPastAttempts(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>
        )}

        {/* 提示信息 */}
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-muted-foreground text-xs">
            没有顾虑也很正常！如果你已经准备好了，可以直接跳过这一步。
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2 pt-2">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex-1">
              返回
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isAnalyzing}
            className="flex-1"
          >
            跳过
          </Button>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex-1 gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                分析 <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DemotivatorStep;
