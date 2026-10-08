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

class OrderController {
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "order created successfully",
    });
  });
  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "fetched all orders successfully",
    });
  });
  getOrder = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "order fetch successfully",
    });
  });
}

export { OrderController };
