/**
 * @file course-repository.ts
 * @description course repository for database operations
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { db } from "@/config/db";
import { courses } from "@/database/schema/course-schema";

import { and, asc, desc, eq, gte, ilike, inArray, lte } from "drizzle-orm";

import type { courseFilter } from "./course-validation";

export class CourseRepository {
  async create(data: typeof courses.$inferInsert) {
    const [course] = await db.insert(courses).values(data).returning();

    return course;
  }

  async findById(id: string) {
    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);

    return course;
  }

  async findBySlug(slug: string) {
    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);

    return course;
  }

  async findByIds(ids: string[]) {
    return await db.select().from(courses).where(inArray(courses.id, ids));
  }

  async findAll(filters: courseFilter) {
    const conditions = [eq(courses.status, "PUBLISHED")];

    // Filter by category
    if (filters.category_id) {
      conditions.push(eq(courses.category_id, filters.category_id));
    }

    // Filter by sub-category
    if (filters.sub_category_id) {
      conditions.push(eq(courses.sub_category_id, filters.sub_category_id));
    }

    // Filter by level
    if (filters.level) {
      conditions.push(eq(courses.level, filters.level));
    }

    // Filter by minimum price
    if (filters.min_price !== undefined) {
      conditions.push(gte(courses.price, filters.min_price));
    }

    // Filter by maximum price
    if (filters.max_price !== undefined) {
      conditions.push(lte(courses.price, filters.max_price));
    }

    // Search by course title
    if (filters.search) {
      conditions.push(ilike(courses.title, `%${filters.search}%`));
    }

    // Sorting
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
        break;
    }

    // Pagination
    const offset = (filters.page - 1) * filters.limit;

    return await db
      .select()
      .from(courses)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(filters.limit)
      .offset(offset);
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<typeof courses.$inferInsert>
  ) {
    const [course] = await db
      .update(courses)
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where(eq(courses.id, id))
      .returning();

    return course;
  }

  async findByIdAndDelete(id: string) {
    const [course] = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();

    return course;
  }
}
