/**
 * @file category-repository.ts
 * @description category repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October 2026
 */

import { db } from "@/config/db";
import { categories } from "@/database/schema/category-schema";
import { eq } from "drizzle-orm";

export class CategoryRepository {
  async create(data: Partial<typeof categories.$inferInsert>) {
    const [category] = await db.insert(categories).values(data).returning();

    return category;
  }

  async findById(id: string) {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    return category;
  }

  async findAll() {
    return await db.select().from(categories);
  }

  async findByName(name: string) {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name))
      .limit(1);

    return category;
  }

  async findBySlug(slug: string) {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    return category;
  }

  async update(id: string, data: Partial<typeof categories.$inferInsert>) {
    const [category] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();

    return category;
  }

  async delete(id: string) {
    const [category] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    return category;
  }
}
