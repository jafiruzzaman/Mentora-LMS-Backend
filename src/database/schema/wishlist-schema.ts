/**
 * @file wishlist-schema.ts
 * @description wishlist drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October
 */

import { pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { users } from "./user-schema";
import { courses } from "./course-schema";

const wishlists = pgTable(
  "wishlists",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),

    student_id: uuid("student_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    course_id: uuid("course_id")
      .notNull()
      .references(() => courses.id, {
        onDelete: "cascade",
      }),

    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique("wishlist_unique").on(table.student_id, table.course_id)]
);

export { wishlists };
