/**
 * @file course-repository.ts
 * @description course repository for database operations
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { db } from "@/config/db";
import { courses } from "@/database/schema/course-schema";
import { eq } from "drizzle-orm";

const create = async (data: typeof courses.$inferInsert) => {
  const [course] = await db.insert(courses).values(data).returning();
  return course;
};

const findById = async (id: string) => {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .limit(1);
  return course;
};

const findBySlug = async (slug: string) => {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);
  return course;
};

// TODO: add pagination and filtering later
const findAll = async () => {
  return await db.select().from(courses);
};

const findByIdAndUpdate = async (
  id: string,
  data: Partial<typeof courses.$inferInsert>
) => {
  const [course] = await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, id))
    .returning();
  return course;
};

const findByIdAndDelete = async (id: string) => {
  const [course] = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();
  return course;
};

export const courseRepository = {
  create,
  findById,
  findBySlug,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
};
