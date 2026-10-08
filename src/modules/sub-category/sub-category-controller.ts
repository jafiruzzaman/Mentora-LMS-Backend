/**
 * @file sub-category-controller.ts
 * @description Sub-category controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import type { Request, Response } from "express";

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import { AppError } from "@/shared/lib/app-error.lib";

import {
  categoryIdParamsSchema,
  subCategoryIdParamsSchema,
  subCategorySchema,
} from "./sub-category-validation";
import type { SubCategoryService } from "./sub-category-service";

export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  createSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryParams = categoryIdParamsSchema.safeParse(req.params);

    if (!categoryParams.success) {
      const message = categoryParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category ID.");
    }

    const parsedData = subCategorySchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sub-category data.");
    }

    const response = await this.subCategoryService.createSubCategory(
      categoryParams.data.categoryId,
      parsedData.data.name
    );

    apiResponse({
      res,
      statusCode: 201,
      message: "Sub-category created successfully.",
      data: response,
    });
  });

  getSubCategories = asyncHandler(async (req: Request, res: Response) => {
    const categoryParams = categoryIdParamsSchema.safeParse(req.params);

    if (!categoryParams.success) {
      const message = categoryParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid category ID.");
    }

    const response = await this.subCategoryService.getSubCategories(
      categoryParams.data.categoryId
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Sub-categories fetched successfully.",
      data: response,
    });
  });

  getSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const subCategoryParams = subCategoryIdParamsSchema.safeParse(req.params);

    if (!subCategoryParams.success) {
      const message = subCategoryParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sub-category ID.");
    }

    const response = await this.subCategoryService.getSubCategory(
      subCategoryParams.data.id
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Sub-category fetched successfully.",
      data: response,
    });
  });

  updateSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const subCategoryParams = subCategoryIdParamsSchema.safeParse(req.params);

    if (!subCategoryParams.success) {
      const message = subCategoryParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sub-category ID.");
    }

    const parsedData = subCategorySchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sub-category data.");
    }

    const response = await this.subCategoryService.updateSubCategory(
      subCategoryParams.data.id,
      parsedData.data.name
    );

    apiResponse({
      res,
      statusCode: 200,
      message: "Sub-category updated successfully.",
      data: response,
    });
  });

  deleteSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const subCategoryParams = subCategoryIdParamsSchema.safeParse(req.params);

    if (!subCategoryParams.success) {
      const message = subCategoryParams.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sub-category ID.");
    }

    await this.subCategoryService.deleteSubCategory(subCategoryParams.data.id);

    res.status(204).send();
  });
}
