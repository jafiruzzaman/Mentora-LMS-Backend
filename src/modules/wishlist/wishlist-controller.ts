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
import type { WishlistService } from "./wishlist-service";
import { AppError } from "@/shared/lib/app-error.lib";

class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  addToWishlist = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const course_id = req.params["course_id"]?.toString();
    if (!course_id) {
      throw new AppError(400, "course id is required");
    }
    const response = await this.wishlistService.addToWishlist({
      student_id,
      course_id,
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "added to wishlist",
      data: response,
    });
  });
  getAllFromWishlists = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const response = await this.wishlistService.getAllFromWishlists(student_id);
    apiResponse({
      res,
      statusCode: 200,
      message: "added to wishlist",
      data: response,
    });
  });
  removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const course_id = req.params["course_id"]?.toString();
    if (!course_id) {
      throw new AppError(400, "course id is required");
    }
    const response = await this.wishlistService.removeFromWishlist({
      student_id,
      course_id,
    });
    apiResponse({
      res,
      statusCode: 204,
      message: "remove from wishlist",
      data: response,
    });
  });
}
export { WishlistController };
