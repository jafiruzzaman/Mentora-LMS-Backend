/**
 * @file order-repository.ts
 * @description order Repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { db } from "@/config/db";
import { orderItems, orders } from "@/database/schema/order-schema";
import { AppError } from "@/shared/lib/app-error.lib";
import { eq } from "drizzle-orm";

class OrderRepository {
  async createOrderWithItems(
    order_data: typeof orders.$inferInsert,
    items_data: Array<Omit<typeof orderItems.$inferInsert, "order_id">>
  ) {
    return await db.transaction(async (tx) => {
      const [order] = await tx.insert(orders).values(order_data).returning();
      if (!order) {
        throw new AppError(400, "Failed to create Order");
      }
      const order_item_data = items_data.map((item) => ({
        ...item,
        order_id: order.id,
      }));
      const items = await tx
        .insert(orderItems)
        .values(order_item_data)
        .returning();
      return { order, items };
    });
  }
  async findById(order_id: string) {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, order_id))
      .limit(1);
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.order_id, order_id));

    return { order, items };
  }
  async findAll(student_id: string) {
    const studentOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.student_id, student_id));

    const result = await Promise.all(
      studentOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.order_id, order.id));
        return {
          items,
          order,
        };
      })
    );
    return result;
  }
}

export { OrderRepository };
