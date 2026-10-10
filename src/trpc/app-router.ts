import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  course: t.router({
    list: t.procedure
      .input(
        z.object({
          page: z.number().int().min(1).default(1),
          limit: z.number().int().min(1).max(100).default(10),
        })
      )
      .query(async ({ input }) => {
        // Replace with your existing CourseService call.
        return {
          items: [],
          page: input.page,
          limit: input.limit,
        };
      }),

    getById: t.procedure
      .input(z.object({ courseId: z.string().uuid() }))
      .query(async ({ input }) => {
        // Replace with your existing CourseService call.
        return { id: input.courseId };
      }),
  }),
});

export type AppRouter = typeof appRouter;
