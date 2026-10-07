/**
 * @file lessons-routes.ts
 * @description Lesson API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";
import type { LessonService } from "./lessons-service";
import {
  lessonParamsValidationSchema,
  lessonValidationSchema,
} from "./lessons-validation";
import { AppError } from "@/shared/lib/app-error.lib";

class LessonController {
  constructor(private readonly service: LessonService) {}
  createLesson = asyncHandler(async (req: Request, res: Response) => {
    const module_id = req.params["module_id"]?.toString()!;
    const instructor_id = req.user.id;
    const parsedData = lessonValidationSchema.safeParse(req.body);
    if (!parsedData.success) {
      const message =
        parsedData.error.issues[0]?.message || "lesson validation error";
      throw new AppError(400, message);
    }
    const video = req.file!;
    const { title, description, duration } = parsedData.data;
    const response = await this.service.create({
      module_id,
      instructor_id,
      video,
      title,
      description,
      duration,
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "lesson created successfully",
      data: response,
    });
  });
  getLessons = asyncHandler(async (req: Request, res: Response) => {
    const response = await this.service.getAllLessons();
    apiResponse({
      res,
      statusCode: 200,
      message: "fetch lessons successfully",
      data: response,
    });
  });
  getLesson = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = lessonParamsValidationSchema.safeParse(req.params);
    if (!parsedParams.success) {
      const message =
        parsedParams.error.issues[0]?.message || "lesson validation error";
      throw new AppError(400, message);
    }
    const response = await this.service.getLesson(parsedParams.data.lesson_id);

    apiResponse({
      res,
      statusCode: 200,
      message: "fetch lesson successfully",
      data: response,
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
