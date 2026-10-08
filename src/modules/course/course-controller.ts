/**
 * @file course-controller.ts
 * @description course API controllers
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import type { Request, Response } from "express";

import { apiResponse } from "@/shared/lib/api-response";
import { AppError } from "@/shared/lib/app-error.lib";

import {
  courseFilterSchema,
  courseParamsSchema,
  createCourseSchema,
} from "./course-validation";

import { CourseService } from "./course-service";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  async createCourse(req: Request, res: Response) {
    const instructor = req.user;

    const parsedData = createCourseSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course data.");
    }

    const response = await this.courseService.createCourse({
      instructor_id: instructor.id.toString(),
      data: parsedData.data,
    });

    apiResponse({
      res,
      statusCode: 201,
      message: "Course created successfully.",
      data: response,
    });
  }

  async getAllCourses(req: Request, res: Response) {
    const validatedQuery = courseFilterSchema.safeParse(req.query);

    if (!validatedQuery.success) {
      const message = validatedQuery.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course filters.");
    }

    const response = await this.courseService.getAllCourses(
      validatedQuery.data
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Courses fetched successfully.",
      data: response,
    });
  }

  async getCourse(req: Request, res: Response) {
    const validatedParam = courseParamsSchema.safeParse(req.params);

    if (!validatedParam.success) {
      const message = validatedParam.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course ID.");
    }

    const { id: courseId } = validatedParam.data;

    const response = await this.courseService.getCourse(courseId);

    apiResponse({
      res,
      statusCode: 200,
      message: "Course details fetched successfully.",
      data: response,
    });
  }

  async updateCourse(req: Request, res: Response) {
    const validatedParam = courseParamsSchema.safeParse(req.params);

    if (!validatedParam.success) {
      const message = validatedParam.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course ID.");
    }

    const instructorId = req.user.id;

    const parsedData = createCourseSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course data.");
    }

    const response = await this.courseService.updateCourse({
      instructor_id: instructorId,
      course_id: validatedParam.data.id,
      data: parsedData.data,
    });

    apiResponse({
      res,
      statusCode: 200,
      message: "Course updated successfully.",
      data: response,
    });
  }

  async deleteCourse(req: Request, res: Response) {
    const validatedParam = courseParamsSchema.safeParse(req.params);

    if (!validatedParam.success) {
      const message = validatedParam.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid course ID.");
    }

    const instructorId = req.user.id;
    const courseId = validatedParam.data.id;

    await this.courseService.deleteCourse({
      instructor_id: instructorId,
      course_id: courseId,
    });

    apiResponse({
      res,
      statusCode: 204,
      message: "Course deleted successfully.",
    });
  }
}
