/**
 * @file cart-repository.ts
 * @description cart API repository
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import { db } from "@/config/db";
import { cartItems, carts } from "@/database/schema/cart-schema";
import { courses } from "@/database/schema/course-schema";
import { and, eq } from "drizzle-orm";

class CartRepository {
  async create({
    student_id,
    course_ids,
  }: {
    student_id: string;
    course_ids: string[];
  }) {
    return await db.transaction(async (tx) => {
      const [cart] = await tx.insert(carts).values({ student_id }).returning();
      if (course_ids.length > 0) {
        await tx.insert(cartItems).values(
          course_ids.map((course_id) => ({
            course_id,
            cart_id: cart!.id,
          }))
        );
      }
      return cart;
    });
  }
  async findByStudentId(student_id: string) {
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.student_id, student_id))
      .limit(1);

    return cart;
  }
  async findItemByStudentAndCourse(student_id: string, course_id: string) {
    // check cart exist or not
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.student_id, student_id));
    if (!cart) {
      return;
    }
    const [item] = await db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.course_id, course_id), eq(cartItems.cart_id, cart.id))
      )
      .limit(1);
    return item;
  }
  async addItem(student_id: string, cart_id: string, course_id: string) {
    const [item] = await db
      .insert(cartItems)
      .values({
        cart_id,
        course_id,
      })
      .returning();
    if (!item) {
      return undefined;
    }
    const [result] = await db
      .select({
        id: cartItems.id,
        cart_id: carts.id,
        cart_item_id: cartItems.id,
        course: {
          course_id: courses.id,
          title: courses.title,
          price: courses.price,
        },
      })
      .from(carts)
      .innerJoin(cartItems, eq(cartItems.cart_id, carts.id))
      .innerJoin(courses, eq(courses.id, cartItems.course_id))
      .where(eq(carts.student_id, student_id))
    return result;
  }
  async removeItemByStudentAndCourse(student_id: string, course_id: string) {
    // check cart exist or not
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.student_id, student_id));
    if (!cart) {
      return;
    }
    const [item] = await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.course_id, course_id), eq(cartItems.cart_id, cart.id))
      )
      .returning();
    return item;
  }
  /**
   * Clear all items from a student's cart.
   * The cart itself remains in the database.
   */
  async clear(student_id: string) {
    return await db.transaction(async (tx) => {
      const [cart] = await tx
        .select()
        .from(carts)
        .where(eq(carts.student_id, student_id))
        .limit(1);

      if (!cart) {
        return [];
      }

      const items = await tx
        .delete(cartItems)
        .where(eq(cartItems.cart_id, cart.id))
        .returning();

      return items;
    });
  }
}

export { CartRepository };
