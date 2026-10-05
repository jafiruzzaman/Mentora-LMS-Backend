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

const create = async (data: typeof subCategories.$inferInsert) => {
  const [subCategory] = await db
    .insert(subCategories)
    .values({ ...data })
    .returning();
  return subCategory;
};

const findById = async (id: string) => {
  const [subCategory] = await db
    .select()
    .from(subCategories)
    .where(eq(subCategories.id, id))
    .limit(1);
  return subCategory;
};

const findAll = async () => {
  return await db.select().from(subCategories);
};

const findByCategory = async (categoryId: string) => {
  return await db
    .select()
    .from(subCategories)
    .where(eq(subCategories.category_id, categoryId));
};

const findByName = async (name: string) => {
  const [category] = await db
    .select()
    .from(subCategories)
    .where(eq(subCategories.name, name))
    .limit(1);
  return category;
};

const findBySlug = async (slug: string) => {
  const [category] = await db
    .select()
    .from(subCategories)
    .where(eq(subCategories.slug, slug))
    .limit(1);
  return category;
};
const findByIdAndUpdate = async (
  id: string,
  data: Partial<typeof subCategories.$inferInsert>
) => {
  const [category] = await db
    .update(subCategories)
    .set(data)
    .where(eq(subCategories.id, id))
    .returning();
  return category;
};

const findByIdAndDelete = async (id: string) => {
  const [category] = await db
    .delete(subCategories)
    .where(eq(subCategories.id, id))
    .returning();
  return category;
};

export const subCategoryRepository = {
  create,
  findAll,
  findByName,
  findByCategory,
  findById,
  findBySlug,
  findByIdAndUpdate,
  findByIdAndDelete,
};
