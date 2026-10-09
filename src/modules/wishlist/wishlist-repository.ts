/**
 * @file wishlist-repository.ts
 * @description wishlist API repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October 2026
 */

import { db } from "@/config/db";
import { courses } from "@/database/schema/course-schema";
import { wishlists } from "@/database/schema/wishlist-schema";
import { and, asc, eq } from "drizzle-orm";

class WishlistRepository {
  async create(data: typeof wishlists.$inferInsert) {
    const [wishlist] = await db.insert(wishlists).values(data).returning();
    return wishlist;
  }
  async findAll(student_id: string) {
    return await db
      .select({
        id: wishlists.id,
        // course info
        course: {
          id: courses.id,
          title: courses.title,
          thumbnail: courses.thumbnail,
          price: courses.price,
          level: courses.level,
        },

        created_at: wishlists.created_at,
      })
      .from(wishlists)
      .innerJoin(courses, eq(wishlists.course_id, courses.id))
      .where(eq(wishlists.student_id, student_id))
      .orderBy(asc(wishlists.created_at));
  }
  async findByStudentAndCourse({
    course_id,
    student_id,
  }: {
    course_id: string;
    student_id: string;
  }) {
    const [find] = await db
      .select()
      .from(wishlists)
      .where(
        and(
          eq(wishlists.course_id, course_id),
          eq(wishlists.student_id, student_id)
        )
      )
      .limit(1);
    return find;
  }
  async findByIdAndDelete({
    course_id,
    student_id,
  }: {
    course_id: string;
    student_id: string;
  }) {
    const [deleted] = await db
      .delete(wishlists)
      .where(
        and(
          eq(wishlists.course_id, course_id),
          eq(wishlists.student_id, student_id)
        )
      )
      .returning();
    return deleted;
  }
}

export { WishlistRepository };
