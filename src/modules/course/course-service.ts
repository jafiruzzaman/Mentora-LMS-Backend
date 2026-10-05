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
import type {
  courseFilter,
  createCourseDTO,
  updateCourseDTO,
} from "./course-validation";

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
    price: data.price,
    discount_price: data.discount_price,
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

const updateCourse = async ({
  instructor_id,
  course_id,
  data,
}: {
  instructor_id: string;
  course_id: string;
  data: updateCourseDTO;
}) => {
  // check course exist or not
  const course = await courseRepository.findById(course_id);
  if (!course) {
    throw new AppError(404, "Course not found");
  }
  // owner ship check
  if (course.instructor_id !== instructor_id) {
    throw new AppError(403, "You are not authorized to update this course");
  }
  // category and sub-category
  const category_id = data.category_id ?? course.category_id;
  const sub_category_id = data.sub_category_id ?? course.sub_category_id;
  if (data.category_id) {
    const category = await categoryRepository.findById(data.category_id);
    if (!category) {
      throw new AppError(404, "Category not found.");
    }
  }
  if (data.category_id || data.sub_category_id) {
    const subCategory = await subCategoryRepository.findByCategory(category_id);

    if (!subCategory) {
      throw new AppError(
        400,
        "Sub-category does not belong to the selected category."
      );
    }
    const price = data.price ?? course.price;

    const discount_price = data.discount_price ?? course.discount_price;
    let slug = course.slug;

    if (data.title && data.title !== course.title) {
      slug = slugify(data.title, {
        strict: true,
        lower: true,
        trim: true,
      });
    }
    // update course
    return await courseRepository.findByIdAndUpdate(course_id, {
      ...data,
      category_id,
      sub_category_id,
      price,
      discount_price,
      slug,
    });
  }
};

export const courseService = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
};
