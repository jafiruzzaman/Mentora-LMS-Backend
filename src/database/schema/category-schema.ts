/**
 * @file category-schema.ts
 * @description category Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 4th October 2026
 */

import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }),
    slug: varchar("slug", { length: 150 }),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("categories_name_unique").on(table.name),
    uniqueIndex("categories_slug_unique").on(table.slug),
  ]
);
