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
import { categoryIdSchema, categorySchema } from "./category-validation";
import { categoryService } from "./category-service";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = categorySchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await categoryService.createCategory(parsedData.data.name);
  apiResponse({
    res,
    statusCode: 201,
    message: "Category created successfully",
    data: response,
  });
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const response = await categoryService.getAllCategories();
  apiResponse({
    res,
    statusCode: 200,
    message: "Categories fetched successfully",
    data: response,
  });
});

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const parsedParams = categoryIdSchema.safeParse(req.params["id"]);
  if (!parsedParams.success) {
    const message = parsedParams.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await categoryService.getCategory(parsedParams.data);
  apiResponse({
    res,
    statusCode: 200,
    message: "Category fetched successfully",
    data: response,
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
