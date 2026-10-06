/**
 * @file modules-service.ts
 * @description modules service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */
import { courseRepository } from "@/modules/course/course-repository.ts";
import { AppError } from "@/shared/lib/app-error.lib.ts";
import type { ModuleRepository } from "@/modules/modules/modules-repository.ts";

type createModuleInput = {
  instructor_id: string;
  course_id: string;
  title: string;
  position: number;
  description: string;
};
class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}
  async createModule({
    course_id,
    instructor_id,
    title,
    position,
    description,
  }: createModuleInput) {
    //   check if course is exist or not
    const course = await courseRepository.findById(course_id);
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
    const course = await courseRepository.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course Not Found");
    }
    if (course.status !== "PUBLISHED") {
      throw new AppError(404, "Course Not Found");
    }
    return this.moduleRepository.findAll(course.id);
  }
}

export { ModuleService };
