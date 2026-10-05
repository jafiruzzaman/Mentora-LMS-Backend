/**
 * @file course-repository.ts
 * @description course repository for database operations
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { db } from "@/config/db";
import { courses } from "@/database/schema/course-schema";
import { and, asc, desc, eq, gte, ilike, lte } from "drizzle-orm";
import type { courseFilter } from "./course-validation";

const create = async (data: typeof courses.$inferInsert) => {
  const [course] = await db.insert(courses).values(data).returning();
  return course;
};

const findById = async (id: string) => {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id))
    .limit(1);
  return course;
};

const findBySlug = async (slug: string) => {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);
  return course;
};

const findAll = async (filters: courseFilter) => {
  const conditions = [eq(courses.status, "PUBLISHED")];
  // if user filter by category
  if (filters.category_id) {
    conditions.push(eq(courses.category_id, filters.category_id));
  }
  // if user filter by sub-category
  if (filters.sub_category_id) {
    conditions.push(eq(courses.sub_category_id, filters.sub_category_id));
  }
  // filter by level
  if (filters.level) {
    conditions.push(eq(courses.level, filters.level));
  }

  // filter by min price
  if (filters.min_price !== undefined) {
    conditions.push(gte(courses.price, filters.min_price));
  }
  // filter by max price
  if (filters.max_price !== undefined) {
    conditions.push(lte(courses.price, filters.max_price));
  }
  // filter by search
  if (filters.search) {
    conditions.push(ilike(courses.title, `%${filters.search}%`));
  }

  // sorting
  let orderBy;

  switch (filters.sort) {
    case "oldest":
      orderBy = asc(courses.created_at);
      break;
    case "price_asc":
      orderBy = asc(courses.price);
      break;
    case "price_desc":
      orderBy = desc(courses.price);
      break;
    case "title_asc":
      orderBy = asc(courses.title);
      break;
    case "title_desc":
      orderBy = desc(courses.title);
      break;
    case "newest":
    default:
      orderBy = desc(courses.created_at);
  }

  // pagination
  const offset = (filters.page - 1) * filters.limit;

  return await db
    .select()
    .from(courses)
    .where(and(...conditions))
    .orderBy(orderBy)
    .limit(filters.limit)
    .offset(offset);
};

const findByIdAndUpdate = async (
  id: string,
  data: Partial<typeof courses.$inferInsert>
) => {
  const [course] = await db
    .update(courses)
    .set({ ...data, updated_at: new Date() })
    .where(eq(courses.id, id))
    .returning();
  return course;
};

const findByIdAndDelete = async (id: string) => {
  const [course] = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();
  return course;
};

export const courseRepository = {
  create,
  findById,
  findBySlug,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
};
