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
  text,
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

export const roleEnum = pgEnum("role", ["student", "admin", "instructor"]);

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
  role: roleEnum("role").notNull().default("student"),
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

  email_verification_token: varchar("email_verification_token", {
    length: 255,
  }),

  email_verification_expires_at: timestamp({
    withTimezone: true,
  }),
  reset_password_verification_token: varchar(
    "reset_password_verification_token",
    {
      length: 255,
    }
  ),

  reset_password_verification_expires_at: timestamp({
    withTimezone: true,
  }),

  refresh_token: text("refresh_token"),

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
