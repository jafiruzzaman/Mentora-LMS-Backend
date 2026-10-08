/**
 * @file sub-category-repository.ts
 * @description Sub-category repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { eq } from "drizzle-orm";

import { db } from "@/config/db";
import { subCategories } from "@/database/schema/sub-category-schema";

export class SubCategoryRepository {
  async create(data: typeof subCategories.$inferInsert) {
    const [subCategory] = await db
      .insert(subCategories)
      .values(data)
      .returning();

    return subCategory;
  }

  async findById(id: string) {
    const [subCategory] = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.id, id))
      .limit(1);

    return subCategory;
  }

  async findAll() {
    return await db.select().from(subCategories);
  }

  async findByCategory(categoryId: string) {
    return await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.category_id, categoryId));
  }

  async findByName(name: string) {
    const [subCategory] = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.name, name))
      .limit(1);

    return subCategory;
  }

  async findBySlug(slug: string) {
    const [subCategory] = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.slug, slug))
      .limit(1);

    return subCategory;
  }

  async update(id: string, data: Partial<typeof subCategories.$inferInsert>) {
    const [subCategory] = await db
      .update(subCategories)
      .set(data)
      .where(eq(subCategories.id, id))
      .returning();

    return subCategory;
  }

  async delete(id: string) {
    const [subCategory] = await db
      .delete(subCategories)
      .where(eq(subCategories.id, id))
      .returning();

    return subCategory;
  }
}
