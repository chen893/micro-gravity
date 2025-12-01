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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight, Lightbulb } from "lucide-react";

interface AspirationStepProps {
  onComplete: (aspiration: string, clarified?: string) => void;
  initialAspiration?: string;
}

const ASPIRATION_EXAMPLES = [
  { icon: "💪", text: "变得更健康", clarified: "精力充沛，不容易疲劳" },
  { icon: "📚", text: "成为终身学习者", clarified: "每天都有新知识的输入" },
  { icon: "🧘", text: "减少压力和焦虑", clarified: "面对挑战时保持平静" },
  { icon: "💰", text: "改善财务状况", clarified: "有规律地储蓄和理财" },
  {
    icon: "🤝",
    text: "建立更好的人际关系",
    clarified: "与家人朋友有更深的联系",
  },
  { icon: "⚡", text: "提高工作效率", clarified: "专注做事，减少拖延" },
];

const CLARIFICATION_PROMPTS = [
  "如果实现了这个愿望，你的生活会是什么样子？",
  "什么样的感觉或状态代表你实现了这个愿望？",
  "用一个具体的场景描述实现愿望后的你",
];

export function AspirationStep({
  onComplete,
  initialAspiration = "",
}: AspirationStepProps) {
  const [aspiration, setAspiration] = useState(initialAspiration);
  const [clarified, setClarified] = useState("");
  const [step, setStep] = useState<"input" | "clarify">("input");

  const handleExampleClick = (example: (typeof ASPIRATION_EXAMPLES)[0]) => {
    setAspiration(example.text);
    setClarified(example.clarified);
    setStep("clarify");
  };

  const handleNext = () => {
    if (step === "input" && aspiration.trim()) {
      setStep("clarify");
    } else if (step === "clarify") {
      onComplete(aspiration.trim(), clarified.trim() || undefined);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Sparkles className="text-primary h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">从愿望开始</h2>
        <p className="text-muted-foreground mt-2">
          {step === "input"
            ? "告诉我，你希望自己的生活有什么改变？"
            : "让我们把愿望变得更具体"}
        </p>
      </div>

      {step === "input" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">你的愿望是什么？</CardTitle>
            <CardDescription>
              不需要想得太具体，只要表达你想要的改变
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={aspiration}
              onChange={(e) => setAspiration(e.target.value)}
              placeholder="例如：我想变得更健康..."
              className="min-h-[100px] resize-none"
            />

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                或者选择一个常见愿望：
              </p>
              <div className="flex flex-wrap gap-2">
                {ASPIRATION_EXAMPLES.map((example, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground cursor-pointer px-3 py-1.5 transition-colors"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example.icon} {example.text}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!aspiration.trim()}
              className="w-full"
            >
              继续
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{aspiration}</Badge>
            </div>
            <CardTitle className="text-base">让愿望更清晰</CardTitle>
            <CardDescription>
              明确的愿望能帮助你找到最有效的行为
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
              <div className="flex items-start gap-2">
                <Lightbulb className="mt-0.5 h-4 w-4 text-amber-600" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">思考提示：</p>
                  <p className="mt-1">
                    {
                      CLARIFICATION_PROMPTS[
                        Math.floor(Math.random() * CLARIFICATION_PROMPTS.length)
                      ]
                    }
                  </p>
                </div>
              </div>
            </div>

            <Textarea
              value={clarified}
              onChange={(e) => setClarified(e.target.value)}
              placeholder="例如：精力充沛，每天都有活力去做想做的事..."
              className="min-h-[100px] resize-none"
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("input")}
                className="flex-1"
              >
                返回修改愿望
              </Button>
              <Button onClick={handleNext} className="flex-1">
                {clarified.trim() ? "继续探索" : "跳过，直接探索"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
