/**
 * @file course-service.ts
 * @description course business logic
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import slugify from "slugify";

import { UserRepository } from "@/modules/user/user.repository";
import { AppError } from "@/shared/lib/app-error.lib";

import { CourseRepository } from "./course-repository";
import { SubCategoryRepository } from "@/modules/sub-category/sub-category-repository";

import type {
  courseFilter,
  createCourseDTO,
  updateCourseDTO,
} from "./course-validation";
import type { CategoryRepository } from "@/modules/category/category-repository";

export class CourseService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly subCategoryRepo: SubCategoryRepository
  ) {}

  async createCourse({
    instructor_id,
    data,
  }: {
    instructor_id: string;
    data: createCourseDTO;
  }) {
    // Check instructor exists
    const user = await this.userRepo.findById(instructor_id);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    // Check category exists
    const category = await this.categoryRepo.findById(data.category_id);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    // Check sub-category exists
    if (!data.sub_category_id) {
      throw new AppError(400, "Sub-category is required.");
    }

    const subCategory = await this.subCategoryRepo.findById(
      data.sub_category_id
    );

    if (!subCategory) {
      throw new AppError(404, "Sub-category not found.");
    }

    // Make sure sub-category belongs to category
    if (subCategory.category_id !== data.category_id) {
      throw new AppError(
        400,
        "Sub-category does not belong to the selected category."
      );
    }

    // Generate slug
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    return await this.courseRepo.create({
      ...data,
      slug,
      instructor_id,
    });
  }

  async getCourse(courseId: string) {
    const course = await this.courseRepo.findById(courseId);

    if (course?.status !== "PUBLISHED") {
      throw new AppError(404, "Course not found.");
    }

    return course;
  }

  async getAllCourses(filters: courseFilter) {
    return await this.courseRepo.findAll(filters);
  }

  async updateCourse({
    instructor_id,
    course_id,
    data,
  }: {
    instructor_id: string;
    course_id: string;
    data: updateCourseDTO;
  }) {
    // Check course exists
    const course = await this.courseRepo.findById(course_id);

    if (!course) {
      throw new AppError(404, "Course not found.");
    }

    // Ownership check
    if (course.instructor_id !== instructor_id) {
      throw new AppError(403, "You are not authorized to update this course.");
    }

    // Resolve final category/sub-category
    const categoryId = data.category_id ?? course.category_id;

    const subCategoryId = data.sub_category_id ?? course.sub_category_id;

    // Validate category if changed
    if (data.category_id) {
      const category = await this.categoryRepo.findById(data.category_id);

      if (!category) {
        throw new AppError(404, "Category not found.");
      }
    }

    // Validate sub-category if changed
    if (data.category_id || data.sub_category_id) {
      if (!subCategoryId) {
        throw new AppError(400, "Sub-category is required.");
      }

      const subCategory = await this.subCategoryRepo.findById(subCategoryId);

      if (!subCategory) {
        throw new AppError(404, "Sub-category not found.");
      }

      if (subCategory.category_id !== categoryId) {
        throw new AppError(
          400,
          "Sub-category does not belong to the selected category."
        );
      }
    }

    // Resolve price
    const price = data.price ?? course.price;

    const discountPrice = data.discount_price ?? course.discount_price;

    // Generate new slug only when title changes
    let slug = course.slug;

    if (data.title && data.title !== course.title) {
      slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    return await this.courseRepo.findByIdAndUpdate(course_id, {
      ...data,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      price,
      discount_price: discountPrice,
      slug,
    });
  }

  async deleteCourse({
    course_id,
    instructor_id,
  }: {
    course_id: string;
    instructor_id: string;
  }) {
    // Check course exists
    const course = await this.courseRepo.findById(course_id);

    if (!course) {
      throw new AppError(404, "Course not found.");
    }

    // Ownership check
    if (course.instructor_id !== instructor_id) {
      throw new AppError(403, "You are not authorized to delete this course.");
    }

    // Only draft/rejected courses can be deleted
    if (course.status !== "DRAFT" && course.status !== "REJECTED") {
      throw new AppError(400, "Only draft or rejected courses can be deleted.");
    }

    await this.courseRepo.findByIdAndDelete(course_id);
  }
}
