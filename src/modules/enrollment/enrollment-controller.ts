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

class EnrollmentController {
  enroll = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "enrolled successfully",
      data: {},
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
