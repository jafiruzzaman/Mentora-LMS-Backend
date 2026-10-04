/**
 * @file category-repository.ts
 * @description category repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */
import { db } from "@/config/db";
import { categories } from "@/database/schema/category-schema";
import { eq } from "drizzle-orm";

const create = async (data: Partial<typeof categories.$inferInsert>) => {
  const [category] = await db
    .insert(categories)
    .values({
      ...data,
    })
    .returning();
  return category;
};

const findById = async (id: string) => {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  return category;
};
const findBySlug = async (slug: string) => {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return category;
};
const findByIdAndUpdate = async (
  id: string,
  data: Partial<typeof categories.$inferInsert>
) => {
  const [category] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
  return category;
};

const findByIdAndDelete = async (id: string) => {
  const [category] = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();
  return category;
};

export const categoryRepository = {
  create,
  findById,
  findBySlug,
  findByIdAndUpdate,
  findByIdAndDelete,
};
