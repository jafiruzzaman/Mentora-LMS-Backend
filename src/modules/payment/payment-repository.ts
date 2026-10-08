/**
 * @file payment-repository
 * @description payment repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { db } from "@/config/db";
import { payments, type NewPayment } from "@/database/schema/payment-schema";
import { desc, eq } from "drizzle-orm";

export class PaymentRepository {
  async createPayment(data: NewPayment) {
    const [payment] = await db.insert(payments).values(data).returning();
    return payment;
  }
  // update payment record by stripe session ID
  async updatePaymentBySessionId(
    stripeSessionId: string,
    data: Partial<NewPayment>
  ) {
    const [updated] = await db
      .update(payments)
      .set({
        ...data,
        updatedAt: new Date(Date.now()),
      })
      .where(eq(payments.stripe_session_id, stripeSessionId))
      .returning();
    return updated;
  }

  // find payment record by stripe session id
  async findPaymentBySessionId(sessionId: string) {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.stripe_session_id, sessionId));
  }

  // find payment record by stripe session id
  async findPaymentByOrderId(orderId: string) {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.order_id, orderId));
  }
  async findPaymentsByUserId(userId: string) {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.student_id, userId))
      .orderBy(desc(payments.createdAt));
  }
}
