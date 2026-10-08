/**
 * @file order-schema.ts
 * @description order drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import {
  decimal,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user-schema";
import { courses } from "./course-schema";
const orderStatusEnum = pgEnum("order_status", ["PENDING", "PAID", "FAILED"]);

const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  student_id: uuid("student_id")
    .notNull()
    .references(() => users.id),
  total: decimal("total").notNull(),
  sub_total: decimal("sub_total").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  order_status: orderStatusEnum("order_status").notNull().default("PENDING"),
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

const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  course_id: uuid("course_id")
    .notNull()
    .references(() => courses.id),
  order_id: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  unit_price: decimal("unit_price").notNull(),
  total_price: decimal("total_price").notNull(),
  created_at: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export { orders, orderStatusEnum, orderItems };
