import { Suspense } from "react";
import { api, HydrateClient } from "@/trpc/server";
import { HabitsList } from "./_components/habits-list";
import { HabitsListSkeleton } from "./_components/habits-list-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function HabitsPage() {
  void api.habit.list.prefetch();

  return (
    <HydrateClient>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">我的习惯</h2>
            <p className="text-muted-foreground">
              管理和追踪你的所有习惯
            </p>
          </div>
          <Button asChild>
            <Link href="/habits/new">
              <Plus className="mr-2 h-4 w-4" />
              创建习惯
            </Link>
          </Button>
        </div>

        <Suspense fallback={<HabitsListSkeleton />}>
          <HabitsList />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
