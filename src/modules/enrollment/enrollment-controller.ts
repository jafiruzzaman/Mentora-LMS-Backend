/**
 * @file enrollment-controller.ts
 * @description Enrollment Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";
import { enrollmentParamsSchema } from "./enrollment-validation";
import { AppError } from "@/shared/lib/app-error.lib";
import type { EnrollmentService } from "./enrollment-service";

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
    const { course_id } = parsedParams.data;
    await this.service.enroll({ student_id, course_id });
    apiResponse({
      res,
      statusCode: 201,
      message: "enrolled successfully",
    });
  });

  getAllEnrollments = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "get all enrollment",
      data: {},
    });
  });

  getEnrolledCourse = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "get enrolled course.",
      data: {},
    });
  });
  getEnrollment = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "get enrollment details",
      data: {},
    });
  });
}
export { EnrollmentController };
