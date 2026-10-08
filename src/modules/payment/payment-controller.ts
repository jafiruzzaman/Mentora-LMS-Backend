/**
 * @file payment-controller.ts
 * @description payment controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";

export class PaymentController {
  /**
   * Create a Stripe Checkout session for an order
   */
  createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "Checkout session created successfully",
    });
  });
  /*
   * Handing Incoming Stripe webhook events
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "payment completed successfully",
    });
  });
  // get payment history for the authenticated user
  getStudentPayments = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "User payments retrieved successfully",
    });
  });
  // get single payment record by id
  getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "payment retrieved successfully",
    });
  });
}
