/**
 * @file lessons-service.ts
 * @description Lesson service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import type { LessonRepository } from "./lessons-repository";
import { AppError } from "@/shared/lib/app-error.lib";
import type { ModuleRepository } from "@/modules/modules/modules-repository";
import { courseRepository } from "@/modules/course/course-repository";
import {
  deleteFileFromStorage,
  getSignedUrlFromStorage,
  uploadFileToStorage,
} from "@/shared/lib/store";

type LessonInput = {
  instructor_id: string;
  module_id: string;
  title: string;
  description?: string;
  duration: number;
  video: Express.Multer.File;
};

type updateLessonInput = {
  title?: string;
  description?: string;
  duration?: number;
  video?: Express.Multer.File;
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
  async getAllLessons() {
    const lessons = await this.lessonRepo.findAll();

    const lessonsWithSignedUrl = await Promise.all(
      lessons.map(async ({ video_key, ...lesson }) => {
        const singed_url = await getSignedUrlFromStorage({
          key: video_key,
          expires_in: 3600,
        });
        return {
          ...lesson,
          video_url: singed_url,
        };
      })
    );
    return lessonsWithSignedUrl;
  }
  async updateLesson(id: string, data: updateLessonInput) {
    const lesson = await this.lessonRepo.findById(id);
    if (!lesson) {
      throw new AppError(404, "Lesson not found");
    }
    const module = await this.moduleRepo.findById(lesson.module_id!);
    if (!module) {
      throw new AppError(404, "Module not found");
    }

    let video_key = lesson.video_key;
    const { video } = data;
    if (data) {
      const extension = video?.originalname.split(".").pop();
      const key = `lessons/video/${crypto.randomUUID()}.${extension}`;
      const uploadedVideo = await uploadFileToStorage({
        buffer: video?.buffer!,
        content_type: video?.mimetype!,
        key,
      });
      video_key = uploadedVideo.key;
    }

    const updatedLesson = await this.lessonRepo.findByIdAndUpdate(id, {
      ...data,
      video_key,
    });

    if (video && lesson.video_key) {
      await deleteFileFromStorage(lesson.video_key);
    }
    return updatedLesson;
  }
  async deleteLesson(lesson_id: string) {
    const lesson = await this.lessonRepo.findById(lesson_id);
    // check lesson exist or not
    if (!lesson) {
      throw new AppError(404, "Lesson not found");
    }
    const module = await this.moduleRepo.findById(lesson.module_id!);
    if (!module) {
      throw new AppError(404, "Module not found");
    }
    if (lesson.video_key) {
      await deleteFileFromStorage(lesson.video_key);
    }
    await this.lessonRepo.findByAndDelete(lesson_id);
  }
}

export { LessonService };
//
