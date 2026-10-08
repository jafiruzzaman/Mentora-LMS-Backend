/**
 * @file sub-category-service.ts
 * @description Sub-category service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import slugify from "slugify";

import { CategoryRepository } from "@/modules/category/category-repository";
import { AppError } from "@/shared/lib/app-error.lib";

import { SubCategoryRepository } from "./sub-category-repository";

export class SubCategoryService {
  constructor(
    private readonly subCategoryRepo: SubCategoryRepository,
    private readonly categoryRepo: CategoryRepository
  ) {}

  async createSubCategory(categoryId: string, name: string) {
    // Check category exists
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    // Normalize name
    const normalizedName = name.replace(/\s+/g, " ").trim();

    // Check duplicate name
    const existingSubCategoryName =
      await this.subCategoryRepo.findByName(normalizedName);

    if (existingSubCategoryName) {
      throw new AppError(409, "Sub-category already exists.");
    }

    // Generate slug
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate slug
    const existingSubCategorySlug = await this.subCategoryRepo.findBySlug(slug);

    if (existingSubCategorySlug) {
      throw new AppError(409, "Sub-category already exists.");
    }

    return await this.subCategoryRepo.create({
      category_id: categoryId,
      name: normalizedName,
      slug,
    });
  }

  async getSubCategories(categoryId: string) {
    // Check category exists
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    return await this.subCategoryRepo.findByCategory(categoryId);
  }

  async getSubCategory(id: string) {
    const subCategory = await this.subCategoryRepo.findById(id);

    if (!subCategory) {
      throw new AppError(404, "Sub-category not found.");
    }

    return subCategory;
  }

  async updateSubCategory(id: string, name: string) {
    // Check sub-category exists
    const subCategory = await this.subCategoryRepo.findById(id);

    if (!subCategory) {
      throw new AppError(404, "Sub-category not found.");
    }

    // Normalize name
    const normalizedName = name.replace(/\s+/g, " ").trim();

    // Check duplicate name
    const existingSubCategoryName =
      await this.subCategoryRepo.findByName(normalizedName);

    if (
      existingSubCategoryName &&
      existingSubCategoryName.id !== subCategory.id
    ) {
      throw new AppError(409, "A sub-category with this name already exists.");
    }

    // Generate slug
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate slug
    const existingSubCategorySlug = await this.subCategoryRepo.findBySlug(slug);

    if (
      existingSubCategorySlug &&
      existingSubCategorySlug.id !== subCategory.id
    ) {
      throw new AppError(409, "A sub-category with this slug already exists.");
    }

    return await this.subCategoryRepo.update(id, {
      name: normalizedName,
      slug,
    });
  }

  async deleteSubCategory(id: string) {
    // Check sub-category exists
    const subCategory = await this.subCategoryRepo.findById(id);

    if (!subCategory) {
      throw new AppError(404, "Sub-category not found.");
    }

    return await this.subCategoryRepo.delete(id);
  }
}
