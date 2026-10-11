/**
 * @file review-controller.ts
 * @description review API controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 11th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";

class ReviewController {
  addReview = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "review posted successfully.",
      data: {},
    });
  });
  getReviews = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "retrieved all the reviews successfully.",
      data: {},
    });
  });
  getReview = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "fetch review successfully.",
      data: {},
    });
  });
  updateReview = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "review updated successfully.",
      data: {},
    });
  });
  deleteReview = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "review deleted successfully.",
      data: {},
    });
  });
}

export { ReviewController };
