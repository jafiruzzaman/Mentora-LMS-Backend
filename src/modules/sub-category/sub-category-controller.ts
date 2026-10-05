/**
 * @file sub-category-controller.ts
 * @description Sub-category controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import type { Request, Response } from "express";

const createSubCategory = asyncHandler(async (req: Request, res: Response) => {
  // const response = await subCategoryService.createSubCategory(...);

  apiResponse({
    res,
    statusCode: 201,
    message: "Sub-category created successfully.",
    data: {},
  });
});

const getSubCategories = asyncHandler(async (req: Request, res: Response) => {
  // const response = await subCategoryService.getSubCategories(...);

  apiResponse({
    res,
    statusCode: 200,
    message: "Sub-categories fetched successfully.",
    data: {},
  });
});

const getSubCategory = asyncHandler(async (req: Request, res: Response) => {
  // const response = await subCategoryService.getSubCategory(...);

  apiResponse({
    res,
    statusCode: 200,
    message: "Sub-category fetched successfully.",
    data: {},
  });
});

const updateSubCategory = asyncHandler(async (req: Request, res: Response) => {
  // const response = await subCategoryService.updateSubCategory(...);

  apiResponse({
    res,
    statusCode: 200,
    message: "Sub-category updated successfully.",
    data: {},
  });
});

const deleteSubCategory = asyncHandler(async (req: Request, res: Response) => {
  // await subCategoryService.deleteSubCategory(...);

  apiResponse({
    res,
    statusCode: 200,
    message: "Sub-category deleted successfully.",
  });
});

export const subCategoryController = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
