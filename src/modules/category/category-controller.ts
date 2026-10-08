/**
 * @file category-controller.ts
 * @description category controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October 2026
 */

import type { Request, Response } from "express";

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import { AppError } from "@/shared/lib/app-error.lib";

import { categoryIdSchema, categorySchema } from "./category-validation";

import { CategoryService } from "./category-service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = categorySchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category data.");
    }

    const response = await this.categoryService.createCategory(
      parsedData.data.name
    );

    apiResponse({
      res,
      statusCode: 201,
      message: "Category created successfully.",
      data: response,
    });
  });

  getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const response = await this.categoryService.getAllCategories();

    apiResponse({
      res,
      statusCode: 200,
      message: "Categories fetched successfully.",
      data: response,
    });
  });

  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = categoryIdSchema.safeParse(req.params["id"]);

    if (!parsedParams.success) {
      const message = parsedParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category ID.");
    }

    const response = await this.categoryService.getCategory(parsedParams.data);

    apiResponse({
      res,
      statusCode: 200,
      message: "Category fetched successfully.",
      data: response,
    });
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = categoryIdSchema.safeParse(req.params["id"]);

    if (!parsedParams.success) {
      const message = parsedParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category ID.");
    }

    const parsedData = categorySchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category data.");
    }

    const response = await this.categoryService.updateCategory(
      parsedParams.data,
      parsedData.data.name
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Category updated successfully.",
      data: response,
    });
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const parsedParams = categoryIdSchema.safeParse(req.params["id"]);

    if (!parsedParams.success) {
      const message = parsedParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category ID.");
    }

    await this.categoryService.deleteCategory(parsedParams.data);

    apiResponse({
      res,
      statusCode: 204,
      message: "Category deleted successfully.",
    });
  });
}
