import { postRouter } from "@/server/api/routers/post";
import { habitRouter } from "@/server/api/routers/habit";
import { logRouter } from "@/server/api/routers/log";
import { analyticsRouter } from "@/server/api/routers/analytics";
import { reportRouter } from "@/server/api/routers/report";
import { reminderRouter } from "@/server/api/routers/reminder";
import { insightsRouter } from "@/server/api/routers/insights";
import { celebrationRouter } from "@/server/api/routers/celebration";
import { aspirationRouter } from "@/server/api/routers/aspiration";
import { routineRouter } from "@/server/api/routers/routine";
import { phaseRouter } from "@/server/api/routers/phase";
import { badgeRouter } from "@/server/api/routers/badge";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  habit: habitRouter,
  log: logRouter,
  analytics: analyticsRouter,
  report: reportRouter,
  reminder: reminderRouter,
  insights: insightsRouter,
  celebration: celebrationRouter,
  aspiration: aspirationRouter,
  routine: routineRouter,
  phase: phaseRouter,
  badge: badgeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
