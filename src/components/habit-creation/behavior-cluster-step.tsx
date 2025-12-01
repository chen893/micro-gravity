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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wand2, ChevronRight, Loader2, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BehaviorClusterStepProps {
  behaviors: string[];
  isLoading: boolean;
  onGenerate: () => void;
  onComplete: (selectedBehaviors: string[]) => void;
}

export function BehaviorClusterStep({
  behaviors,
  isLoading,
  onGenerate,
  onComplete,
}: BehaviorClusterStepProps) {
  const [selectedBehaviors, setSelectedBehaviors] = useState<Set<string>>(
    new Set(),
  );
  const [customBehavior, setCustomBehavior] = useState("");
  const [allBehaviors, setAllBehaviors] = useState<string[]>(behaviors);

  // Update allBehaviors when behaviors prop changes
  if (behaviors.length > 0 && allBehaviors.length === 0) {
    setAllBehaviors(behaviors);
  }

  const handleToggle = (behavior: string) => {
    const newSelected = new Set(selectedBehaviors);
    if (newSelected.has(behavior)) {
      newSelected.delete(behavior);
    } else {
      newSelected.add(behavior);
    }
    setSelectedBehaviors(newSelected);
  };

  const handleAddCustom = () => {
    if (
      customBehavior.trim() &&
      !allBehaviors.includes(customBehavior.trim())
    ) {
      setAllBehaviors([...allBehaviors, customBehavior.trim()]);
      setSelectedBehaviors(
        new Set([...selectedBehaviors, customBehavior.trim()]),
      );
      setCustomBehavior("");
    }
  };

  const handleRemoveBehavior = (behavior: string) => {
    setAllBehaviors(allBehaviors.filter((b) => b !== behavior));
    const newSelected = new Set(selectedBehaviors);
    newSelected.delete(behavior);
    setSelectedBehaviors(newSelected);
  };

  const handleNext = () => {
    onComplete(Array.from(selectedBehaviors));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950">
          <Wand2 className="h-8 w-8 text-violet-600" />
        </div>
        <h2 className="text-2xl font-bold">挥舞魔法棒</h2>
        <p className="text-muted-foreground mt-2">
          想象你有一根魔法棒，可以让自己做任何事...
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">探索可能的行为</CardTitle>
          <CardDescription>
            AI 会帮你生成各种可能的行为，包括新习惯、一次性行动、想停止的行为等
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {allBehaviors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4 text-center">
                点击下方按钮，AI 会帮你探索各种可能的行为
              </p>
              <Button onClick={onGenerate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    正在探索...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    开始探索
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {allBehaviors.map((behavior, index) => (
                    <div
                      key={index}
                      className="group hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-3 transition-colors"
                    >
                      <Checkbox
                        id={`behavior-${index}`}
                        checked={selectedBehaviors.has(behavior)}
                        onCheckedChange={() => handleToggle(behavior)}
                      />
                      <label
                        htmlFor={`behavior-${index}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {behavior}
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleRemoveBehavior(behavior)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={customBehavior}
                  onChange={(e) => setCustomBehavior(e.target.value)}
                  placeholder="添加自定义行为..."
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddCustom}
                  disabled={!customBehavior.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    已选择 {selectedBehaviors.size} 个
                  </Badge>
                  {selectedBehaviors.size > 0 && selectedBehaviors.size < 3 && (
                    <span className="text-muted-foreground text-xs">
                      建议选择 3-5 个进行评估
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      重新生成
                    </>
                  )}
                </Button>
              </div>

              <Button
                onClick={handleNext}
                disabled={selectedBehaviors.size === 0}
                className="w-full"
              >
                评估这些行为
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
