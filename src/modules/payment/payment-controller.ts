/**
 * @file payment-controller.ts
 * @description payment controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October 2026
 */

import type { Request, Response } from "express";
import { stripe } from "@/config/stripe";
import { env } from "@/config/env";
import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import { AppError } from "@/shared/lib/app-error.lib";
import type { PaymentService } from "./payment-service";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Create a Stripe Checkout session for an order
   */
  createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    // Extract student ID attached by authMiddleware
    const student_id = req.user?.id;
    const { order_id } = req.body;

    if (!student_id) {
      throw new AppError(401, "Unauthorized");
    }

    if (!order_id) {
      throw new AppError(400, "Order ID is required");
    }

    const data = await this.paymentService.createCheckoutSession(
      student_id,
      order_id
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Checkout session created successfully",
      data,
    });
  });

  /**
   * Handling incoming Stripe webhook events
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      throw new AppError(400, "Missing stripe-signature header");
    }

    let event;
    try {
      // req.body is the raw Buffer passed from express.raw()
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      throw new AppError(
        400,
        `Webhook Signature Verification Failed: ${err.message}`
      );
    }

    // Delegate event handling to service
    await this.paymentService.handleWebhook(event);

    // Stripe expects a clean 200 acknowledgment
    res.status(200).json({ received: true });
  });

  /**
   * Get payment history for the authenticated user
   */
  getStudentPayments = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user?.id;

    if (!student_id) {
      throw new AppError(401, "Unauthorized");
    }

    const data = await this.paymentService.getPaymentsByStudentId(student_id);

    apiResponse({
      res,
      statusCode: 200,
      message: "User payments retrieved successfully",
      data,
    });
  });

  /**
   * Get single payment record by ID
   */
  getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user?.id;
    const { payment_id } = req.params;

    if (!student_id) {
      throw new AppError(401, "Unauthorized");
    }

    // // const data = await this.paymentService.getPaymentById(
    //   payment_id,
    //   student_id
    // );

    apiResponse({
      res,
      statusCode: 200,
      message: "Payment retrieved successfully",
    });
  });
}
