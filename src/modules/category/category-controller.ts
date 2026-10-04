/**
 * @file category-controller.ts
 * @description category controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import type { Request, Response } from "express";

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 201,
    message: "Category created successfully",
  });
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "Categories fetched successfully",
  });
});

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "Category fetched successfully",
  });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "Category updated successfully",
  });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "Category deleted successfully",
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
