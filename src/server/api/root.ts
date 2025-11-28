import { postRouter } from "@/server/api/routers/post";
import { habitRouter } from "@/server/api/routers/habit";
import { logRouter } from "@/server/api/routers/log";
import { analyticsRouter } from "@/server/api/routers/analytics";
import { reportRouter } from "@/server/api/routers/report";
import { reminderRouter } from "@/server/api/routers/reminder";
import { insightsRouter } from "@/server/api/routers/insights";
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
