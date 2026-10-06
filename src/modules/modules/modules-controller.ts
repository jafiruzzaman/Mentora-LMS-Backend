/**
 * @file modules-controller.ts
 * @description modules API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import type { Request, Response } from "express";

import { asyncHandler } from "@/shared/lib/async-handler";
import { apiResponse } from "@/shared/lib/api-response.ts";

class CourseModuleController {
  createModule = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 201,
      message: "Module created successfully.",
      data: {},
    });
  });
  //
  getAllModules = asyncHandler(async (req: Request, res: Response) => {
    apiResponse({
      res,
      statusCode: 200,
      message: "Fetch All Module successfully.",
      data: {},
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
      statusCode:204,
      message: "Module deleted successfully.",
      data: {},
    })
  })
}

export  {CourseModuleController}

