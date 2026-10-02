/**
 * @file user-schema.ts
 * @description User Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 2nd October 2026
 */

import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/* ================================================================= */
/* Enums */
/* ================================================================= */

export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "banned",
  "suspended",
]);

/* ================================================================= */
/* Users */
/* ================================================================= */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  first_name: varchar("first_name", {
    length: 100,
  }).notNull(),

  last_name: varchar("last_name", {
    length: 100,
  }).notNull(),

  user_name: varchar("user_name", {
    length: 100,
  })
    .notNull()
    .unique(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  password_hash: varchar("password_hash", {
    length: 255,
  }),

  phone: varchar("phone", {
    length: 50,
  }),

  is_verified: boolean("is_verified").notNull().default(false),

  is_active: boolean("is_active").notNull().default(true),

  status: accountStatusEnum("status").notNull().default("active"),

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
