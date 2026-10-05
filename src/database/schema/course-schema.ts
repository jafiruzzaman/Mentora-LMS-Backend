/**
 * @file course-schema.ts
 * @description Course Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { categories } from "./category-schema";
import { subCategories } from "./sub-category-schema";
import { users } from "./user-schema";

const courseStatusEnum = pgEnum("course_status", [
  "DRAFT",
  "PENDING",
  "PUBLISHED",
  "ARCHIVED",
  "BANNED",
  "REJECTED",
]);

const courseLevelEnum = pgEnum("course_level", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),

  instructor_id: uuid("instructor_id")
    .references(() => users.id, {
      onDelete: "restrict",
    })
    .notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  slug: varchar("slug", {
    length: 255,
  })
    .unique()
    .notNull(),

  category_id: uuid("category_id")
    .references(() => categories.id, {
      onDelete: "restrict",
    })
    .notNull(),

  sub_category_id: uuid("sub_category_id").references(() => subCategories.id, {
    onDelete: "set null",
  }),

  description: text("description"),

  thumbnail: text("thumbnail"),

  trailer: text("trailer"),

  level: courseLevelEnum("level"),

  status: courseStatusEnum("status").notNull().default("DRAFT"),

  price: integer("price").notNull(),

  discount_price: integer("discount_price"),

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
});

export { courses, courseLevelEnum, courseStatusEnum };
