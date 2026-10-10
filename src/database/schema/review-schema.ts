/**
 * @file review-schema.ts
 * @description review drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */
import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  integer,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { courses } from "./course-schema";
import { users } from "./user-schema";

const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    course_id: uuid("course_id")
      .notNull()
      .references(() => courses.id, {
        onDelete: "cascade",
      }),
    student_id: uuid("student_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    rating: integer("rating").notNull(),
    message: varchar("message", { length: 2000 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    unique("reviews_student_course_unique").on(
      table.course_id,
      table.student_id
    ),
    // index
    index("reviews_course_id_idx").on(table.course_id),
    index("reviews_student_id_idx").on(table.student_id),
  ]
);

export { reviews };
