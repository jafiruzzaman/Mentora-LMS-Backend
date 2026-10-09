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

class CartController {
  addToCart = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: `added to cart successfully`,
    });
  });
  getAllCartItems = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: `cart retrieve successfully`,
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
