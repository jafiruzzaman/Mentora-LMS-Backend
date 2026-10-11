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
import { reviewSchema, updateReviewSchema } from "./review-validation";
import { AppError } from "@/shared/lib/app-error.lib";
import type { ReviewService } from "./review-service";

class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  addReview = asyncHandler(async (req: Request, res: Response) => {
    const course_id = req.params["course_id"] as string;
    const student_id = req.user.id;
    if (!course_id) {
      throw new AppError(400, "course id is required");
    }
    const parsedData = reviewSchema.safeParse(req.body);
    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid review data.");
    }
    const data = await this.reviewService.addReview({
      student_id,
      course_id,
      data: parsedData.data,
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "review posted successfully.",
      data,
    });
  });
  getReviews = asyncHandler(async (req: Request, res: Response) => {
    const course_id = req.params["course_id"] as string;
    if (!course_id) {
      throw new AppError(400, "course id is required");
    }
    const data = await this.reviewService.getReviews(course_id);
    apiResponse({
      res,
      statusCode: 200,
      message: "retrieved all the reviews successfully.",
      data,
    });
  });
  getReview = asyncHandler(async (req: Request, res: Response) => {
    const review_id = req.params["review_id"] as string;
    if (!review_id) {
      throw new AppError(400, "review id is required.");
    }
    const data = await this.reviewService.getReview(review_id);
    apiResponse({
      res,
      statusCode: 200,
      message: "fetch review successfully.",
      data,
    });
  });
  updateReview = asyncHandler(async (req: Request, res: Response) => {
    const review_id = req.params["review_id"] as string;
    const course_id = req.params["course_id"] as string;
    if (!review_id) {
      throw new AppError(400, "review id is required.");
    }
    const parsedData = updateReviewSchema.safeParse(req.body);
    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;
      throw new AppError(400, message ?? "Invalid review data.");
    }
    const student_id = req.user.id as string;
    const data = await this.reviewService.updateReview({
      review_id,
      student_id,
      course_id,
      data: parsedData.data,
    });
    apiResponse({
      res,
      statusCode: 200,
      message: "review updated successfully.",
      data,
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
