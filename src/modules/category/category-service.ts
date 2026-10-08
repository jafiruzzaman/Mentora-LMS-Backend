/**
 * @file category-service.ts
 * @description category business logic
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October 2026
 */

import slugify from "slugify";

import { AppError } from "@/shared/lib/app-error.lib";
import { CategoryRepository } from "./category-repository";

export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async createCategory(name: string) {
    // Normalize category name
    const normalizedName = name.replace(/\s+/g, " ").trim();

    // Check duplicate category name
    const existingCategory = await this.categoryRepo.findByName(normalizedName);

    if (existingCategory) {
      throw new AppError(409, "Category already exists.");
    }

    // Generate slug
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate slug
    const existingSlug = await this.categoryRepo.findBySlug(slug);

    if (existingSlug) {
      throw new AppError(409, "Category slug already exists.");
    }

    return await this.categoryRepo.create({
      name: normalizedName,
      slug,
    });
  }

  async getAllCategories() {
    return await this.categoryRepo.findAll();
  }

  async getCategory(id: string) {
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    return category;
  }

  async updateCategory(id: string, name: string) {
    // Check category exists
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    // Normalize name
    const normalizedName = name.replace(/\s+/g, " ").trim();

    // Check duplicate name
    const existingCategory = await this.categoryRepo.findByName(normalizedName);

    if (existingCategory && existingCategory.id !== id) {
      throw new AppError(409, "Category already exists.");
    }

    // Generate slug
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate slug
    const existingSlug = await this.categoryRepo.findBySlug(slug);

    if (existingSlug && existingSlug.id !== id) {
      throw new AppError(409, "Category slug already exists.");
    }

    return await this.categoryRepo.update(id, {
      name: normalizedName,
      slug,
    });
  }

  async deleteCategory(id: string) {
    // Check category exists
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    await this.categoryRepo.delete(id);
  }
}
