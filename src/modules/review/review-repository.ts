/**
 * @file review-repository.ts
 * @description review repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 11th October 2026
 */

import { and, eq } from "drizzle-orm";

import { db } from "@/config/db";
import { reviews } from "@/database/schema/review-schema";

class ReviewRepository {
  async create(data: typeof reviews.$inferInsert) {
    const [review] = await db.insert(reviews).values(data).returning();
    return review;
  }
  async findByCourseId(course_id: string) {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.course_id, course_id));
  }
  async findById(review_id: string) {
    const [review] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, review_id))
      .limit(1);
    return review;
  }
  async findByIdAndUpdate({
    data,
    student_id,
    review_id,
  }: {
    student_id: string;
    review_id: string;
    data: Partial<typeof reviews.$inferInsert>;
  }) {
    const [update] = await db
      .update(reviews)
      .set(data)
      .where(and(eq(reviews.id, review_id), eq(reviews.student_id, student_id)))
      .returning();
    return update;
  }
  async findByIdAndDelete(review_id: string) {
    const [deleted] = await db
      .delete(reviews)
      .where(eq(reviews.id, review_id))
      .returning();
    return deleted;
  }
}

export { ReviewRepository };
