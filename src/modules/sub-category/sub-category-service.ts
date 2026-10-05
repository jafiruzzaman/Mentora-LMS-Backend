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
  return response;
};
const getSubCategories = async (categoryId: string) => {
  // first check category exist or not
  const category = await categoryRepository.findById(categoryId);
  if (!category) {
    throw new AppError(404, "category not found");
  }
  return await subCategoryRepository.findByCategory(categoryId);
};

const getSubCategory = async (id: string) => {
  const subCategory = await subCategoryRepository.findById(id);

  if (!subCategory) {
    throw new AppError(404, "Sub-category not found.");
  }

  return subCategory;
};

const updateSubCategory = async (id: string, name: string) => {
  const subCategory = await subCategoryRepository.findById(id);
  if (!subCategory) {
    throw new AppError(404, "Sub-category not found.");
  }
  const normalizedName = name.replace(/\s+/g, " ").trim();
  const slug = slugify(normalizedName).trim().toLocaleLowerCase();
  const existingSubCategory = await subCategoryRepository.findBySlug(slug);
  if (existingSubCategory) {
    throw new AppError(409, "A sub-category with this name already exists.");
  }
  const response = await subCategoryRepository.findByIdAndUpdate(id, {
    name: normalizedName,
    slug,
  });
  return response;
};

export const subCategoryService = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
};
