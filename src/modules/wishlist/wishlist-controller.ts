/**
 * @file wishlist-controller.ts
 * @description wishlist API controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";

class WishlistController {
  //
  addToWishlist = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "added to wishlist",
    });
  });
  getAllWishlists = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "added to wishlist",
    });
  });
  removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 204,
      message: "from from wishlist",
    });
  });
}
export { WishlistController };
