/**
 * @file order-controller
 * @description order API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";
import { orderParamsSchema, orderValidationSchema } from "./order-validation";
import { AppError } from "@/shared/lib/app-error.lib";
import type { OrderService } from "./order-service";

class OrderController {
  constructor(private readonly orderService: OrderService) {}
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const parsedBody = orderValidationSchema.safeParse(req.body);
    if (!parsedBody.success) {
      const message =
        parsedBody.error.issues[0]?.message || "order validation failed";
      throw new AppError(400, message);
    }

    const student_id = req.user.id;
    const response = await this.orderService.createOrder({
      student_id,
      course_id: parsedBody.data.order_items.map((items) => items.course_id),
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "order created successfully",
      data: response,
    });
  });
  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const response = await this.orderService.getAllOrder(student_id);
    apiResponse({
      res,
      statusCode: 200,
      message: "fetched all orders successfully",
      data: response,
    });
  });
  getOrder = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = orderParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      const message =
        parsedParams.error.issues[0]?.message ||
        "order params validation error";
      throw new AppError(400, message);
    }
    const response = await this.orderService.getOrder(
      parsedParams.data.order_id
    );
    apiResponse({
      res,
      statusCode: 200,
      message: "order fetch successfully",
      data: response,
    });
  });
}

export { OrderController };
