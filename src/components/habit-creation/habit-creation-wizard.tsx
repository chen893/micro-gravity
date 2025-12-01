"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "@/trpc/react";

import { AspirationStep } from "./aspiration-step";
import { BehaviorClusterStep } from "./behavior-cluster-step";
import { FocusMapStep } from "./focus-map-step";
import { EasyStrategyStep, type EasyStrategy } from "./easy-strategy-step";
import { RecipeStep } from "./recipe-step";
import { RehearsalStep } from "./rehearsal-step";

import type { BehaviorAssessment, FocusMapResult } from "@/lib/ai/focus-map";

type Step =
  | "aspiration"
  | "behaviors"
  | "focusMap"
  | "easyStrategy"
  | "recipe"
  | "rehearsal";

const STEPS: Step[] = [
  "aspiration",
  "behaviors",
  "focusMap",
  "easyStrategy",
  "recipe",
  "rehearsal",
];

const STEP_TITLES: Record<Step, string> = {
  aspiration: "明确愿望",
  behaviors: "探索行为",
  focusMap: "焦点地图",
  easyStrategy: "容易做",
  recipe: "习惯配方",
  rehearsal: "配方演练",
};

export function HabitCreationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("aspiration");

  // 数据状态
  const [aspirationId, setAspirationId] = useState<string | null>(null);
  const [aspiration, setAspiration] = useState<string>("");
  const [_clarifiedAspiration, setClarifiedAspiration] = useState<
    string | undefined
  >();
  const [clusterId, setClusterId] = useState<string | null>(null);
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [_selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const [focusMapResult, setFocusMapResult] = useState<FocusMapResult | null>(
    null,
  );
  const [selectedBehavior, setSelectedBehavior] =
    useState<BehaviorAssessment | null>(null);
  const [easyStrategy, setEasyStrategy] = useState<EasyStrategy | null>(null);
  const [starterStep, setStarterStep] = useState<{
    starterStep: string;
    explanation: string;
  } | null>(null);
  const [scaledBehavior, setScaledBehavior] = useState<{
    scaledBehavior: string;
    explanation: string;
  } | null>(null);
  const [easyResult, setEasyResult] = useState<string>("");
  const [recipe, setRecipe] = useState<{
    anchor: string;
    behavior: string;
    celebration: string;
    fullRecipe: string;
  } | null>(null);
  const [rehearsalCount, setRehearsalCount] = useState(0);

  // tRPC mutations
  const createAspiration = api.aspiration.create.useMutation();
  const clarifyAspiration = api.aspiration.clarify.useMutation();
  const generateBehaviors = api.aspiration.generateBehaviors.useMutation();
  const generateFocusMap = api.aspiration.generateFocusMap.useMutation();
  const generateStarterStepMutation =
    api.aspiration.generateStarterStep.useMutation();
  const generateScaledBehaviorMutation =
    api.aspiration.generateScaledBehavior.useMutation();
  const generateRecipe = api.aspiration.generateRecipe.useMutation();
  const createHabit = api.aspiration.createHabitFromAspiration.useMutation();
  const recordRehearsal = api.aspiration.recordRehearsal.useMutation();

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goBack = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]!);
    }
  };

  // Step handlers
  const handleAspirationComplete = useCallback(
    async (asp: string, clarified?: string) => {
      setAspiration(asp);
      setClarifiedAspiration(clarified);

      const result = await createAspiration.mutateAsync({
        description: asp,
      });
      setAspirationId(result.id);

      if (clarified) {
        await clarifyAspiration.mutateAsync({
          id: result.id,
          clarified,
        });
      }

      setCurrentStep("behaviors");
    },
    [createAspiration, clarifyAspiration],
  );

  const handleGenerateBehaviors = useCallback(async () => {
    if (!aspirationId) return;

    const result = await generateBehaviors.mutateAsync({ aspirationId });
    setBehaviors(result.behaviors);
    setClusterId(result.clusterId);
  }, [aspirationId, generateBehaviors]);

  const handleBehaviorsComplete = useCallback((selected: string[]) => {
    setSelectedBehaviors(selected);
    setCurrentStep("focusMap");
  }, []);

  const handleGenerateFocusMap = useCallback(async () => {
    if (!aspirationId || !clusterId) return;

    const result = await generateFocusMap.mutateAsync({
      aspirationId,
      clusterId,
    });
    setFocusMapResult(result);
  }, [aspirationId, clusterId, generateFocusMap]);

  const handleSelectBehavior = useCallback((behavior: BehaviorAssessment) => {
    setSelectedBehavior(behavior);
  }, []);

  const handleFocusMapComplete = useCallback(() => {
    if (selectedBehavior) {
      setCurrentStep("easyStrategy");
    }
  }, [selectedBehavior]);

  const handleGenerateStarter = useCallback(async () => {
    if (!selectedBehavior) return;

    const result = await generateStarterStepMutation.mutateAsync({
      behavior: selectedBehavior.name,
    });
    setStarterStep(result);
  }, [selectedBehavior, generateStarterStepMutation]);

  const handleGenerateScaled = useCallback(async () => {
    if (!selectedBehavior) return;

    const result = await generateScaledBehaviorMutation.mutateAsync({
      behavior: selectedBehavior.name,
    });
    setScaledBehavior(result);
  }, [selectedBehavior, generateScaledBehaviorMutation]);

  const handleEasyStrategyComplete = useCallback(
    (strategy: EasyStrategy, result: string) => {
      setEasyStrategy(strategy);
      setEasyResult(result);
      setCurrentStep("recipe");
    },
    [],
  );

  const handleGenerateRecipe = useCallback(
    async (anchor: string) => {
      const behavior = easyResult || selectedBehavior?.name;
      if (!behavior) return;

      const result = await generateRecipe.mutateAsync({
        behavior,
        anchor,
      });
      setRecipe(result);
    },
    [easyResult, selectedBehavior, generateRecipe],
  );

  const handleRecipeComplete = useCallback(
    (recipeData: { anchor: string; behavior: string; celebration: string }) => {
      setRecipe({ ...recipeData, fullRecipe: "" });
      setCurrentStep("rehearsal");
    },
    [],
  );

  const handleRehearsal = useCallback(() => {
    setRehearsalCount((prev) => prev + 1);
  }, []);

  const handleCreateHabit = useCallback(async () => {
    if (!aspirationId || !selectedBehavior || !easyStrategy || !recipe) return;

    const habit = await createHabit.mutateAsync({
      aspirationId,
      behaviorName: selectedBehavior.name,
      behaviorDescription: selectedBehavior.description,
      easyStrategy,
      starterStep:
        easyStrategy === "STARTER_STEP" ? starterStep?.starterStep : undefined,
      scaledBehavior:
        easyStrategy === "SCALE_DOWN"
          ? scaledBehavior?.scaledBehavior
          : undefined,
      recipeAnchor: recipe.anchor,
      recipeBehavior: recipe.behavior,
      recipeCelebration: recipe.celebration,
    });

    // Record rehearsals if any
    if (rehearsalCount > 0 && habit.id) {
      for (let i = 0; i < rehearsalCount; i++) {
        await recordRehearsal.mutateAsync({ habitId: habit.id });
      }
    }

    router.push(`/habits/${habit.id}`);
  }, [
    aspirationId,
    selectedBehavior,
    easyStrategy,
    starterStep,
    scaledBehavior,
    recipe,
    rehearsalCount,
    createHabit,
    recordRehearsal,
    router,
  ]);

  const isLoading =
    createAspiration.isPending ||
    clarifyAspiration.isPending ||
    generateBehaviors.isPending ||
    generateFocusMap.isPending ||
    generateStarterStepMutation.isPending ||
    generateScaledBehaviorMutation.isPending ||
    generateRecipe.isPending ||
    createHabit.isPending;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 头部 */}
      <div className="flex items-center gap-4">
        {stepIndex > 0 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/habits">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">创建新习惯</h2>
          <p className="text-muted-foreground text-sm">
            步骤 {stepIndex + 1}/{STEPS.length}：{STEP_TITLES[currentStep]}
          </p>
        </div>
      </div>

      {/* 进度条 */}
      <Progress value={progress} className="h-1" />

      {/* 步骤内容 */}
      {currentStep === "aspiration" && (
        <AspirationStep
          onComplete={handleAspirationComplete}
          initialAspiration={aspiration}
        />
      )}

      {currentStep === "behaviors" && (
        <BehaviorClusterStep
          behaviors={behaviors}
          isLoading={generateBehaviors.isPending}
          onGenerate={handleGenerateBehaviors}
          onComplete={handleBehaviorsComplete}
        />
      )}

      {currentStep === "focusMap" && (
        <div className="space-y-4">
          <FocusMapStep
            focusMapResult={focusMapResult}
            isLoading={generateFocusMap.isPending}
            onGenerate={handleGenerateFocusMap}
            onSelectBehavior={handleSelectBehavior}
            selectedBehaviorName={selectedBehavior?.name ?? null}
          />
          {selectedBehavior && (
            <Button onClick={handleFocusMapComplete} className="w-full">
              继续设计习惯
            </Button>
          )}
        </div>
      )}

      {currentStep === "easyStrategy" && selectedBehavior && (
        <EasyStrategyStep
          behavior={selectedBehavior.name}
          starterStep={starterStep}
          scaledBehavior={scaledBehavior}
          isLoadingStarter={generateStarterStepMutation.isPending}
          isLoadingScaled={generateScaledBehaviorMutation.isPending}
          onGenerateStarter={handleGenerateStarter}
          onGenerateScaled={handleGenerateScaled}
          onComplete={handleEasyStrategyComplete}
        />
      )}

      {currentStep === "recipe" && (
        <RecipeStep
          behavior={easyResult ? easyResult : (selectedBehavior?.name ?? "")}
          recipe={recipe}
          isLoading={generateRecipe.isPending}
          onGenerate={handleGenerateRecipe}
          onComplete={handleRecipeComplete}
        />
      )}

      {currentStep === "rehearsal" && recipe && (
        <RehearsalStep
          recipe={recipe}
          rehearsalCount={rehearsalCount}
          onRehearsal={handleRehearsal}
          onComplete={handleCreateHabit}
        />
      )}

      {/* 全局 loading */}
      {createHabit.isPending && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-lg font-medium">正在创建习惯...</p>
          </div>
        </div>
      )}
    </div>
  );
}
