/**
 * @file cart-schema.ts
 * @description cart drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import { pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { users } from "./user-schema";
import { courses } from "./course-schema";

const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  student_id: uuid("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    course_id: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    cart_id: uuid("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique("cart_item_unique").on(table.cart_id, table.course_id)]
);

export { carts, cartItems };
