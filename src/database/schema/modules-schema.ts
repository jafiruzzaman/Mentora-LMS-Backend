/**
 * @file modules-schema.ts
 * @description Modules Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */
import {
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { courses } from "./course-schema";
const modules = pgTable(
  "course_modules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    course_id: uuid()
      .references(() => courses.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: varchar("title", {
      length: 100,
    }).notNull(),
    description: varchar("description", {
      length: 255,
    }).notNull(),
    position: integer().notNull(),
    created_at: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updated_at: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("course_module_position_unique").on(table.course_id, table.position),
  ]
);

export { modules };
