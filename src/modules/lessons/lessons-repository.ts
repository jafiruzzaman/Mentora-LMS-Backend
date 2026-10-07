/**
 * @file lessons-repository.ts
 * @description Lesson Repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { db } from "@/config/db";
import { lessons } from "@/database/schema/lessons-schema";
import { and, asc, eq } from "drizzle-orm";

class LessonRepository {
  async create(data: typeof lessons.$inferInsert) {
    const [lesson] = await db.insert(lessons).values(data).returning();
    return lesson;
  }
  async findById(id: string) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id))
      .limit(1);
    return lesson;
  }
  async findByModuleIdAndTitle({
    module_id,
    title,
  }: {
    module_id: string;
    title: string;
  }) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.module_id, module_id), eq(lessons.title, title)))
      .limit(1);
    return lesson;
  }
  async findAll() {
    return await db.select().from(lessons).orderBy(asc(lessons.created_at));
  }
  async findByIdAndUpdate(
    id: string,
    data: Partial<typeof lessons.$inferInsert>
  ) {
    const [lesson] = await db
      .update(lessons)
      .set(data)
      .where(eq(lessons.id, id))
      .returning();
    return lesson;
  }
  async findByAndDelete(id: string) {
    const [lesson] = await db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();
    return lesson;
  }
}

export { LessonRepository };
