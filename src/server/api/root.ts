import { habitRouter } from "@/server/api/routers/habit";
import { logRouter } from "@/server/api/routers/log";
import { celebrationRouter } from "@/server/api/routers/celebration";
import { aspirationRouter } from "@/server/api/routers/aspiration";
import { routineRouter } from "@/server/api/routers/routine";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  habit: habitRouter,
  log: logRouter,
  celebration: celebrationRouter,
  aspiration: aspirationRouter,
  routine: routineRouter,
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
