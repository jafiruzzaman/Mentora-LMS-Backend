/**
 * @file lessons-schema.ts
 * @description lesson Drizzle schema
 * @author Mohammad-Jafiruzzaman
 * @date 7th October 2026
 */

import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  integer,
  index,
} from "drizzle-orm/pg-core";

import { modules } from "@/database/schema/modules-schema.ts";

const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    module_id: uuid("module_id").references(() => modules.id, {
      onDelete: "cascade",
    }),
    title: varchar("title", {
      length: 255,
    }).notNull(),
    video_key: varchar("video_key", { length: 150 }).notNull(),
    description: text("description"),
    duration: integer().notNull(),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("lesson_module_id_idx").on(table.module_id)]
);

export { lessons };
