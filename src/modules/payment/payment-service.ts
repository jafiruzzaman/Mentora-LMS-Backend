/**
 * @file payment-service.ts
 * @description payment service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import Stripe from "stripe";
import { stripe } from "@/config/stripe";
import type { PaymentRepository } from "./payment-repository";
import type { OrderRepository } from "@/modules/order/order-repository";
import type { EnrollmentRepository } from "@/modules/enrollment/enrollment-repository";
import { AppError } from "@/shared/lib/app-error.lib";
import { env } from "@/config/env";

export class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly orderRepo: OrderRepository,
    private readonly enrollmentRepo: EnrollmentRepository
  ) {}
  /**
   * Create a Stripe Checkout Session for an existing order
   */
  async createCheckoutSession(student_id: string, order_id: string) {
    // check order details from database
    const order = await this.orderRepo.findById(order_id);
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    // authorization check
    if (order.order.student_id !== student_id) {
      throw new AppError(403, "Unauthorized access to this order");
    }

    // prevent repaying completed order
    if (order.order.order_status === "COMPLETED") {
      throw new AppError(400, "The Order has already completed");
    }
    // convert order items into stipe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      order.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Course Enrollment (${item.order_id})`,
          },
          unit_amount: Math.round(Number.parseFloat(item.unit_price) * 100),
        },
        quantity: 1,
      }));

    // create checkout session on stripe
    const session = await stripe.checkout.sessions.create({
      allowed_payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: env.FRONTEND_SUCCESS_URL,
      cancel_url: env.FRONTEND_CANCEL_URL,
      metadata: {
        orderId: order.order.id,
        studentId: student_id,
      },
    });
    // save in payment repository
    await this.paymentRepo.createPayment({
      order_id: order.order.id,
      student_id,
      stripe_session_id: session.id,
      amount: Math.round(Number.parseFloat(order.order.total) * 100),
      currency: order.order.currency.toLocaleLowerCase(),
      payment_status: "PENDING",
      payment_provider: "STRIPE",
    });
    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  }
  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.handleSuccessfulPayment(session);
        break;
      }
      default:
        break;
    }
  }
  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.orderId;
    const studentId = session.metadata?.studentId;
    if (!orderId || !studentId) {
      return;
    }
    // update payment status
    await this.paymentRepo.updatePaymentBySessionId(session.id, {
      payment_status: "COMPLETED",
      stripe_payment_intent_id: session.payment_intent as string,
    });
    // fetch order items and & update order status to paid
    const { items } = await this.orderRepo.findById(orderId);
    await this.orderRepo.updateOrderStatus(orderId, "COMPLETED");
    // create course enrollment for student
    for (const item of items) {
      const existing = this.enrollmentRepo.findByStudentIdAndCourse({
        student_id: studentId,
        course_id: item.course_id,
      });
      if (!existing) {
        this.enrollmentRepo.create({
          student_id: studentId,
          course_id: item.course_id,
          status: "completed",
        });
      }
    }
  }
  async getPaymentsByStudentId(student_id: string) {
    return await this.paymentRepo.findPaymentsByUserId(student_id);
  }
}
