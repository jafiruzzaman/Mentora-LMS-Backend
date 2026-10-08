/**
 * @file payment-schema.ts
 * @description payment drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { orders } from "./order-schema";
import { users } from "./user-schema";

export const paymentProviderEnum = pgEnum("payment_provider", [
  "STRIPE",
  "SSLCOMMERZ",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "PENDING",
  "COMPLETED",
  "FAILED",
]);

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: uuid("order_id")
    .notNull()
    .references(() => orders.id, {
      onDelete: "cascade",
    }),
  student_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  stripe_session_id: varchar("stripe_session_id").notNull().unique(),
  payment_status: paymentStatusEnum("payment_status")
    .notNull()
    .default("PENDING"),
  stripe_payment_intent_id: varchar("stripe_payment_intent_id"),
  amount: integer("amount").notNull(),
  currency: varchar("currency").default("usd").notNull(),
  payment_provider: paymentProviderEnum("payment_provider")
    .default("STRIPE")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type NewPayment = typeof payments.$inferInsert;
export type Payment = typeof payments.$inferSelect;
