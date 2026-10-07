/**
 * @file lessons-service.ts
 * @description Lesson service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import type { Request } from "express";
import type { LessonRepository } from "./lessons-repository";
import { AppError } from "@/shared/lib/app-error.lib";
import type { ModuleRepository } from "@/modules/modules/modules-repository";
import { courseRepository } from "@/modules/course/course-repository";
import {
  getSignedUrlFromStorage,
  uploadFileToStorage,
} from "@/shared/lib/store";

let req: Request;
type LessonInput = {
  instructor_id: string;
  module_id: string;
  title: string;
  description?: string;
  duration?: any;
  video: Express.Multer.File;
};

const courseRepo = courseRepository;

class LessonService {
  constructor(
    private readonly lessonRepo: LessonRepository,
    private readonly moduleRepo: ModuleRepository
  ) {}
  async create({
    module_id,
    title,
    description,
    video,
    duration,
    instructor_id,
  }: LessonInput) {
    // check if module exist or not
    const module = await this.moduleRepo.findById(module_id);
    if (!module) {
      throw new AppError(404, "Module not found");
    }
    // check if course exist or not
    const course = await courseRepo.findById(module.course_id);
    if (!course) {
      throw new AppError(404, "Course not found");
    }

    if (course.instructor_id !== instructor_id) {
      throw new AppError(
        403,
        "Access denied you don't have this permission to perform this action."
      );
    }
    const existingLesson = await this.lessonRepo.findByModuleIdAndTitle({
      module_id,
      title,
    });
    if (existingLesson) {
      throw new AppError(409, "lesson exist with this title in this module");
    }

    const extension = video.originalname.split(".").pop();
    const key = `lessons/video/${crypto.randomUUID()}.${extension}`;
    const upload = await uploadFileToStorage({
      buffer: video.buffer,
      key,
      content_type: video.mimetype,
    });

    const response = await this.lessonRepo.create({
      module_id,
      title,
      description,
      duration,
      video_key: upload.key,
    });

    console.log("7. Database insert completed");

    return response;
  }
  async getLesson(id: string) {
    // check if lesson exist or not
    const lesson = await this.lessonRepo.findById(id);
    if (!lesson) {
      throw new AppError(404, "Lesson not found");
    }
    // check if module exist or not
    const module = await this.moduleRepo.findById(lesson.module_id!);
    if (!module) {
      throw new AppError(404, "Module not found");
    }
    const singed_url = await getSignedUrlFromStorage({ key: lesson.video_key });
    return { ...lesson, video_url: singed_url };
  }
}

export { LessonService };
