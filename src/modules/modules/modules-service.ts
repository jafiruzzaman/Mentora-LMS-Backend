/**
 * @file modules-service.ts
 * @description modules service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */
import { CourseRepository } from "@/modules/course/course-repository.ts";
import { AppError } from "@/shared/lib/app-error.lib.ts";
import type { ModuleRepository } from "@/modules/modules/modules-repository.ts";

type createModuleInput = {
  instructor_id: string;
  course_id: string;
  title: string;
  position: number;
  description: string;
};

type updateModuleInput = {
  instructor_id: string;
  module_id: string;
  data: {
    title?: string;
    description?: string;
  };
};

class ModuleService {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly courseRepository: CourseRepository
  ) {}
  async createModule({
    course_id,
    instructor_id,
    title,
    position,
    description,
  }: createModuleInput) {
    //   check if course is exist or not
    const course = await this.courseRepository.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course Not Found");
    }
    //   check user own the course to create module
    if (course.instructor_id !== instructor_id) {
      throw new AppError(
        403,
        "Access Denied. You don't have permission to perform this action."
      );
    }
    // Check module position
    const existingModule =
      await this.moduleRepository.findModuleByCourseAndPosition(
        course_id,
        position
      );

    if (existingModule) {
      throw new AppError(
        409,
        `Module position ${position} is already occupied.`
      );
    }
    return await this.moduleRepository.create({
      course_id,
      title,
      position,
      description,
    });
  }
  async getAllModules({ course_id }: { course_id: string }) {
    const course = await this.courseRepository.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course Not Found");
    }
    if (course.status !== "PUBLISHED") {
      throw new AppError(404, "Course Not Found");
    }
    return this.moduleRepository.findAll(course.id);
  }

  async getModule({ module_id }: { module_id: string }) {
    // check if module exist or not
    const module = await this.moduleRepository.findById(module_id);
    if (!module) {
      throw new AppError(404, "module not found");
    }
    // check if course exist or not
    const course = await this.courseRepository.findById(module.course_id);

    if (course?.status !== "PUBLISHED") {
      throw new AppError(404, "Module not found");
    }
    return module;
  }

  async updateModule({ instructor_id, module_id, data }: updateModuleInput) {
    // check if module exist or not
    const module = await this.moduleRepository.findById(module_id);
    if (!module) {
      throw new AppError(404, "Module not found");
    }
    // check if course exist or not
    const course = await this.courseRepository.findById(module.course_id);
    if (!course) {
      throw new AppError(404, "Associated course not found");
    }
    // check ownership
    if (course.instructor_id !== instructor_id) {
      throw new AppError(
        403,
        "Access denied. You don't have permission to update this module."
      );
    }
    return await this.moduleRepository.findByIdAndUpdate(module.id, data);
  }
  async deleteModule({
    instructor_id,
    module_id,
  }: {
    instructor_id: string;
    module_id: string;
  }) {
    // check if module exist or not
    const module = await this.moduleRepository.findById(module_id);
    if (!module) {
      throw new AppError(404, "Module not found");
    }
    // check if course exist or not
    const course = await this.courseRepository.findById(module.course_id);
    if (!course) {
      throw new AppError(404, "Associated course not found");
    }
    // check ownership
    if (course.instructor_id !== instructor_id) {
      throw new AppError(
        403,
        "Access denied. You don't have permission to update this module."
      );
    }

    return await this.moduleRepository.findByIdAndDelete(module.id);
  }
}

export { ModuleService };
