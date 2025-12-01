import { Suspense } from "react";
import { notFound } from "next/navigation";
import { api, HydrateClient } from "@/trpc/server";
import { HabitDetailContent } from "./_components/habit-detail-content";
import { HabitDetailSkeleton } from "./_components/habit-detail-skeleton";

interface HabitDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function HabitDetailPage({
  params,
}: HabitDetailPageProps) {
  const { id } = await params;

  // 预取数据
  try {
    void api.habit.getById.prefetch({ id });
    void api.habit.getStats.prefetch({ id });
    void api.log.getByHabit.prefetch({ habitId: id, limit: 10 });
  } catch {
    notFound();
  }

  return (
    <HydrateClient>
      <Suspense fallback={<HabitDetailSkeleton />}>
        <HabitDetailContent habitId={id} />
      </Suspense>
    </HydrateClient>
  );
}
