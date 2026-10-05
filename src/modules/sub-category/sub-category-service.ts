/**
 * @file sub-category-service.ts
 * @description sub-category service
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import slugify from "slugify";

import { AppError } from "@/shared/lib/app-error.lib";
import { subCategoryRepository } from "./sub-category-repository";
import { categoryRepository } from "@/modules/category/category-repository";

const createSubCategory = async (categoryId: string, name: string) => {
  // first check category exist or not
  const category = await categoryRepository.findById(categoryId);
  if (!category) {
    throw new AppError(404, "category not found");
  }
  const existingSubCategoryName = await subCategoryRepository.findByName(name);
  if (existingSubCategoryName) {
    throw new AppError(409, "sub-category already exist");
  }
  const slug = slugify(name).trim().toLocaleLowerCase();
  const existingSubCategorySlug = await subCategoryRepository.findBySlug(slug);
  if (existingSubCategorySlug) {
    throw new AppError(409, "sub-category already exist");
  }
  const response = await subCategoryRepository.create({
    category_id: categoryId,
    name,
    slug,
  });
  return response
};

export const subCategoryService = {
  createSubCategory,
};
