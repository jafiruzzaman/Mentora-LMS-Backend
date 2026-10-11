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
import type { ReviewDTO } from "./review-validation";
import { courses } from "@/database/schema/course-schema";
import { users } from "@/database/schema/user-schema";

type ReviewInput = {
  student_id: string;
  course_id: string;
  data: ReviewDTO;
};
class ReviewRepository {
  async create({ data, course_id, student_id }: ReviewInput) {
    const [review] = await db
      .insert(reviews)
      .values({ ...data, student_id, course_id })
      .returning();
    return review;
  }
  async findByCourseAndStudentId({
    student_id,
    course_id,
  }: {
    course_id: string;
    student_id: string;
  }) {
    const [review] = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.course_id, course_id),
          eq(reviews.student_id, student_id)
        )
      )
      .limit(1);
    return review;
  }
  async findAllCourseId(course_id: string) {
    return await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        message: reviews.message,
        created_at: reviews.created_at,

        // courses info
        course_id: courses.id,
        course_title: courses.title,

        // students info
        student_id: users.id,
        student_first_name: users.first_name,
        student_last_name: users.last_name,
      })
      .from(reviews)
      .innerJoin(courses, eq(reviews.course_id, courses.id))
      .innerJoin(users, eq(reviews.student_id, users.id))
      .where(eq(reviews.course_id, course_id));
  }
  async findById(review_id: string) {
    const [review] = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        message: reviews.message,
        created_at: reviews.created_at,

        // courses info
        course_id: courses.id,
        course_title: courses.title,

        // students info
        student_id: users.id,
        student_first_name: users.first_name,
        student_last_name: users.last_name,
      })
      .from(reviews)
      .innerJoin(courses, eq(reviews.course_id, courses.id))
      .innerJoin(users, eq(reviews.student_id, users.id))
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
