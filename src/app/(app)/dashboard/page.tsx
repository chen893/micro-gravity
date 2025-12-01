import { Suspense } from "react";
import { api, HydrateClient } from "@/trpc/server";
import { DashboardContent } from "./_components/dashboard-content";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

export default async function DashboardPage() {
  void api.habit.getActive.prefetch();

  return (
    <HydrateClient>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">仪表盘</h2>
          <p className="text-muted-foreground">追踪你的习惯进度，保持动力</p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
