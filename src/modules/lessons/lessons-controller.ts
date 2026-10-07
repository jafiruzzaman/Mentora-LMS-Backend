/**
 * @file lessons-routes.ts
 * @description Lesson API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";

class LessonController {
  createLesson = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "lesson created successfully",
    });
  });
  getLessons = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "fetch lessons successfully",
    });
  });
  getLesson = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "fetch lesson successfully",
    });
  });
  updateLesson = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "lesson updated successfully",
    });
  });
  deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 204,
      message: "lesson created successfully",
    });
  });
}
export { LessonController };
