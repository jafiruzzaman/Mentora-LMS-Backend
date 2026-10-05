/**
 * @file course-service.ts
 * @description course API controllers
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 */

import slugify from "slugify";

import { userRepository } from "@/modules/user/user.repository";
import { AppError } from "@/shared/lib/app-error.lib";
import { courseRepository } from "./course-repository";
import { categoryRepository } from "../category/category-repository";
import { subCategoryRepository } from "../sub-category/sub-category-repository";
import type { courseFilter, createCourseDTO } from "./course-validation";

const createCourse = async ({
  instructor_id,
  data,
}: {
  instructor_id: string;
  data: createCourseDTO;
}) => {
  // check if user exist or not
  const user = await userRepository.findById(instructor_id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  // check if category exist or not
  const category = await categoryRepository.findById(data.category_id);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  // check if sub-category exist or not
  const subCategory = await subCategoryRepository.findById(
    data.sub_category_id!
  );
  if (!subCategory) {
    throw new AppError(404, "Sub-category not found");
  }
  if (subCategory.category_id !== data.category_id) {
    throw new AppError(400, "Sub-category does not belong to the category");
  }
  const slug = slugify(data.title, {
    lower: true,
    strict: true,
    trim: true,
  });
  const response = await courseRepository.create({
    ...data,
    price: data.price.toString(),
    discount_price: data.discount_price!.toString(),
    slug,
    instructor_id,
  });
  return response;
};

const getCourse = async (courseId: string) => {
  const course = await courseRepository.findById(courseId);
  if (!course) {
    throw new AppError(404, "course not found");
  }
  if (course.status !== "PUBLISHED") {
    throw new AppError(404, "Course not found.");
  }
};
const getAllCourses = async (filters: courseFilter) => {
  return await courseRepository.findAll(filters);
};
export const courseService = {
  createCourse,
  getCourse,
  getAllCourses,
};
