/**
 * @file sub-category-schema.ts
 * @description category Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 4th October 2026
 */

import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { categories } from "./category-schema";

const subCategories = pgTable(
  "sub_categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    category_id: uuid("category_id")
      .notNull()
      .references(() => categories.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    name: varchar("name", {
      length: 100,
    }).notNull(),

    slug: varchar("slug", {
      length: 120,
    }).notNull(),

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
  // index
  (table) => [index("sub_categories_category_id_idx").on(table.category_id)]
);

export { subCategories };
