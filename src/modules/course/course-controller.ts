/**
 * @file course-controller.ts
 * @description course API controllers
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import type { Request, Response } from "express";
import {
  courseFilterSchema,
  courseParamsSchema,
  createCourseSchema,
} from "./course-validation";
import { courseService } from "./course-service";
import { AppError } from "@/shared/lib/app-error.lib";

const createCourse = async (req: Request, res: Response) => {
  const instructor = req.user;
  const parsedData = createCourseSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await courseService.createCourse({
    instructor_id: instructor.id.toString(),
    data: parsedData.data,
  });
  apiResponse({
    res,
    statusCode: 201,
    message: "course created successfully",
    data: response,
  });
};

const getAllCourses = async (req: Request, res: Response) => {
  const validatedQuery = courseFilterSchema.safeParse(req.query);
  if (!validatedQuery.success) {
    const message = validatedQuery.error.issues[0]?.message;

    throw new AppError(400, message ?? "Invalid course filters.");
  }
  const response = await courseService.getAllCourses(validatedQuery.data);

  apiResponse({
    res,
    statusCode: 200,
    message: "Courses fetched successfully.",
    data: response,
  });
};

const getCourse = async (req: Request, res: Response) => {
  const validatedParam = courseParamsSchema.safeParse(req.params);
  if (!validatedParam.success) {
    const message = validatedParam.error.issues[0]?.message;
    throw new Error(message);
  }
  const { id: courseId } = validatedParam.data;
  const response = await courseService.getCourse(courseId);
  apiResponse({
    res,
    statusCode: 200,
    message: "fetch course details successfully",
    data: response,
  });
};

const updateCourse = async (req: Request, res: Response) => {
  const validatedParam = courseParamsSchema.safeParse(req.params);
  if (!validatedParam.success) {
    const message = validatedParam.error.issues[0]?.message;
    throw new Error(message);
  }
  const { id: instructor_id } = req.user;
  const parsedData = createCourseSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await courseService.updateCourse({
    instructor_id,
    course_id: validatedParam.data.id,
    data: parsedData.data,
  });
  apiResponse({
    res,
    statusCode: 200,
    message: "course updated successfully",
    data: response,
  });
};

const deleteCourse = async (req: Request, res: Response) => {
  const validatedParam = courseParamsSchema.safeParse(req.params);
  if (!validatedParam.success) {
    const message = validatedParam.error.issues[0]?.message;
    throw new Error(message);
  }
  const course_id = validatedParam.data.id;
  const instructor_id = req.user.id;
  await courseService.deleteCourse({ instructor_id, course_id });
  apiResponse({
    res,
    statusCode: 204,
    message: "course deleted successfully",
  });
};

export const courseController = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
