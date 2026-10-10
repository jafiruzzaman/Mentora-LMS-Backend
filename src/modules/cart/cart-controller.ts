/**
 * @file cart-routes.ts
 * @description cart API routes
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */
import { type Request, type Response } from "express";

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import { AppError } from "@/shared/lib/app-error.lib";
import type { CartService } from "./cart-service";

class CartController {
  constructor(private readonly cartService: CartService) {}
  addToCart = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const course_id = req.params["course_id"] as string;
    if (!course_id) {
      throw new AppError(404, "course id is required");
    }
    const data = await this.cartService.addToCart({ student_id, course_id });
    apiResponse({
      res,
      statusCode: 201,
      message: `added to cart successfully`,
      data,
    });
  });
  getAllCartItems = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;

    const data = await this.cartService.getCart(student_id);
    apiResponse({
      res,
      statusCode: 201,
      message: `cart retrieve successfully`,
      data,
    });
  });
  removeFromCart = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: `remove to cart successfully`,
    });
  });

  clearCart = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: `cart cleared successfully`,
    });
  });
}
export { CartController };
