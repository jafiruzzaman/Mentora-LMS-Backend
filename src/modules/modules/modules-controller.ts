/**
 * @file modules-controller.ts
 * @description modules API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import type { Request, Response } from "express";
import { asyncHandler } from "@/shared/lib/async-handler.ts";
import { apiResponse } from "@/shared/lib/api-response.ts";
import {
  courseParams,
  moduleSchema,
} from "@/modules/modules/modules-validation.ts";
import { AppError } from "@/shared/lib/app-error.lib.ts";
import type { ModuleService } from "@/modules/modules/modules-service.ts";

class CourseModuleController {
  constructor(private readonly moduleService: ModuleService) {}
  createModule = asyncHandler(async (req: Request, res: Response) => {
    const instructor_id = req.user.id.toString();
    console.log(instructor_id);
    const courseParam = courseParams.safeParse(req.params);
    if (!courseParam.success) {
      const message =
        courseParam.error.issues[0]?.message ||
        "course params validation error";
      throw new AppError(400, message);
    }
    const parsedData = moduleSchema.safeParse(req.body);
    if (!parsedData.success) {
      const message =
        parsedData.error.issues[0]?.message || "module validation error";
      throw new AppError(400, message);
    }
    const response = await this.moduleService.createModule({
      instructor_id,
      course_id: courseParam.data.course_id,
      title: parsedData.data.title,
      description: parsedData.data.description,
      position: parsedData.data.position,
    });
    apiResponse({
      res,
      statusCode: 201,
      message: "Module created successfully.",
      data: response,
    });
  });
  //
  getAllModules = asyncHandler(async (req: Request, res: Response) => {
    const courseParam = courseParams.safeParse(req.params);
    if (!courseParam.success) {
      const message =
        courseParam.error.issues[0]?.message ||
        "course params validation error";
      throw new AppError(400, message);
    }
    const response = await this.moduleService.getAllModules({
      course_id: courseParam.data.course_id,
    });
    apiResponse({
      res,
      statusCode: 200,
      message: "Fetch All Module successfully.",
      data: response,
    });
  });
  //
  getModule = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "Fetch Module successfully.",
      data: {},
    });
  });
  // update Module
  updateModule = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "Module updated successfully.",
      data: {},
    });
  });

  // delete module
  deleteModule = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 204,
      message: "Module deleted successfully.",
      data: {},
    });
  });
}

export { CourseModuleController };
