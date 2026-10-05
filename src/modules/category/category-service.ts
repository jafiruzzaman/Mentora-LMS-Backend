/**
 * @file category-service.ts
 * @description category validation
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import slugify from "slugify";
import { categoryRepository } from "./category-repository";
import { AppError } from "@/shared/lib/app-error.lib";

const createCategory = async (name: string) => {
  const normalizedName = name.replace(/\s+/g, " ");
  const existingCategory = await categoryRepository.findByName(normalizedName);
  if (existingCategory) {
    throw new AppError(409, "Category already exists.");
  }
  const slug = slugify(normalizedName).toLocaleLowerCase().trim();

  const existingSlug = await categoryRepository.findBySlug(slug);

  if (existingSlug) {
    throw new AppError(409, "Category slug already exists.");
  }
  return categoryRepository.create({
    name,
    slug,
  });
};

const getAllCategories = async () => {
  return await categoryRepository.findAll();
};
const getCategory = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError(404, "category not found");
  }
  return category;
};

const updateCategory = async (id: string, name: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError(404, "category not found");
  }
  const slug = slugify(name).trim().toLocaleLowerCase();
  return categoryRepository.findByIdAndUpdate(id, {
    name,
    slug,
  });
};

const deleteCategory = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) {
    throw new AppError(404, "category not found");
  }
  await categoryRepository.findByIdAndDelete(id);
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
