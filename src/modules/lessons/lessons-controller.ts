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

class LessonController {
  constructor(private readonly service: LessonService) {}
  createLesson = asyncHandler(async (req: Request, res: Response) => {
    const module_id = req.params["module_id"]?.toString()!;
    const instructor_id = req.user.id;
    const { title, description, duration } = req.body;
    const video = req.file!;
    const response = await this.service.create({
      module_id,
      instructor_id,
      video,
      title,
      description,
      duration: Number.parseInt(duration),
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "lesson created successfully",
      data: response,
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
