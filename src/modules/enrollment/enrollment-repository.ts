/**
 * @file enrollment-repository.ts
 * @description Enrollment repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { db } from "@/config/db";
import { enrollments } from "@/database/schema/enrollment-schema";
import { and, eq } from "drizzle-orm";

class EnrollmentRepository {
  async create(data: typeof enrollments.$inferInsert) {
    const [enrollment] = await db.insert(enrollments).values(data).returning();
    return enrollment;
  }
  async findById(id: string) {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, id))
      .limit(1);
    return enrollment;
  }
  async findByStudentIdAndCourse({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    return await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.student_id, student_id),
          eq(enrollments.course_id, course_id)
        )
      );
  }
  async findByStudentId(student_id: string) {
    return await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.student_id, student_id));
  }
}

export { EnrollmentRepository };
