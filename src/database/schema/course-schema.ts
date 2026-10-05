/**
 * @file course-schema.ts
 * @description Course Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import {
  decimal,
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
  /**
   * Primary key.
   */
  id: uuid("id").primaryKey().defaultRandom(),

  /**
   * Instructor who owns the course.
   */
  instructor_id: uuid("instructor_id")
    .references(() => users.id, {
      onDelete: "restrict",
    })
    .notNull(),

  /**
   * Course title.
   */
  title: varchar("title", {
    length: 200,
  })
    .unique()
    .notNull(),

  /**
   * URL-friendly unique course identifier.
   */
  slug: varchar("slug", {
    length: 255,
  })
    .unique()
    .notNull(),

  /**
   * Parent category.
   */
  category_id: uuid("category_id")
    .references(() => categories.id, {
      onDelete: "restrict",
    })
    .notNull(),

  /**
   * Optional sub-category.
   */
  sub_category_id: uuid("sub_category_id").references(() => subCategories.id, {
    onDelete: "set null",
  }),

  description: text("description"),

  thumbnail: text("thumbnail"),

  trailer: text("trailer"),

  level: courseLevelEnum("level"),

  status: courseStatusEnum("status").notNull().default("DRAFT"),

  price: decimal("price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  discount_price: decimal("discount_price", {
    precision: 10,
    scale: 2,
  }),

  created_at: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  /**
   * Course last update timestamp.
   */
  updated_at: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export { courses, courseLevelEnum, courseStatusEnum };
