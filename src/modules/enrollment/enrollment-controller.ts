/**
 * @file enrollment-controller.ts
 * @description Enrollment Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import type { Request, Response } from "express";

import { AppError } from "@/shared/lib/app-error.lib";
import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { EnrollmentService } from "./enrollment-service";
import { enrollmentParamsSchema } from "./enrollment-validation";

class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}
  enroll = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = enrollmentParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      const message =
        parsedParams.error.issues[0]?.message ||
        "enrollment params validation error";
      throw new AppError(400, message);
    }
    const student_id = req.user.id;
    const { id: course_id } = parsedParams.data;
    await this.service.enroll({ student_id, course_id });
    apiResponse({
      res,
      statusCode: 201,
      message: "enrolled successfully",
    });
  });

  getAllEnrollments = asyncHandler(async (req: Request, res: Response) => {
    const student_id = req.user.id;
    const response = await this.service.getAllEnrollments(student_id);
    apiResponse({
      res,
      statusCode: 200,
      message: "get all enrollment",
      data: response,
    });
  });

  getEnrolledCourse = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = enrollmentParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      const message =
        parsedParams.error.issues[0]?.message ||
        "enrollment params validation error";
      throw new AppError(400, message);
    }
    const { id: course_id } = parsedParams.data;
    const student_id = req.user.id;
    const response = await this.service.getEnrolledCourse({
      student_id,
      course_id,
    });
    apiResponse({
      res,
      statusCode: 200,
      message: "get enrolled course.",
      data: response,
    });
  });
  getEnrollment = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = enrollmentParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      const message =
        parsedParams.error.issues[0]?.message ||
        "enrollment params validation error";
      throw new AppError(400, message);
    }
    const { id: enrollment_id } = parsedParams.data;
    const student_id = req.user.id;
    const response = await this.service.getEnrollment({
      enrollment_id,
      student_id,
    });
    apiResponse({
      res,
      statusCode: 200,
      message: "get enrollment details",
      data: response,
    });
  });
}
export { EnrollmentController };
