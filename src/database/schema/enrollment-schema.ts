/**
 * @file enrollment-schema.ts
 * @description enrollment Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { courses } from "./course-schema";
import { users } from "./user-schema";

const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "pending",
  "completed",
  "active",
  "failed",
]);

const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    course_id: uuid("course_id")
      .notNull()
      .references(() => courses.id),
    student_id: uuid("student_id")
      .notNull()
      .references(() => users.id),
    status: enrollmentStatusEnum("status").notNull().default("pending"),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("student_course_index").on(table.course_id, table.student_id),
    index("enrollment_student_id_idx").on(table.student_id),
    index("enrollment_course_id_idx").on(table.course_id),
  ]
);

export { enrollments, enrollmentStatusEnum };
