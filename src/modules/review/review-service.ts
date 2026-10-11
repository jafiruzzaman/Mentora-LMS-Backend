/**
 * @file review-service.ts
 * @description review service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 11th October 2026
 */

import type { CourseRepository } from "@/modules/course/course-repository";
import type { ReviewRepository } from "./review-repository";
import type { ReviewDTO } from "./review-validation";
import { AppError } from "@/shared/lib/app-error.lib";
import type { EnrollmentRepository } from "@/modules/enrollment/enrollment-repository";

type ReviewInput = {
  student_id: string;
  course_id: string;
  data: ReviewDTO;
};

class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly courseRepo: CourseRepository,
    private readonly enrollRepo: EnrollmentRepository
  ) {}

  async addReview({ course_id, data, student_id }: ReviewInput) {
    // check if review already exist or not
    const existingReview = await this.reviewRepo.findByCourseAndStudentId({
      student_id,
      course_id,
    });
    if (existingReview) {
      throw new AppError(400, "Already post a review");
    }
    // check course exist or not
    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course not found");
    }
    // check student enrolled the course
    const enrollment = await this.enrollRepo.findByStudentIdAndCourse({
      student_id,
      course_id,
    });
    if (!enrollment) {
      throw new AppError(403, "You are not enrolled in this course");
    }
    const response = await this.reviewRepo.create({
      student_id,
      course_id,
      data,
    });
    return response;
  }
  async getReviews(course_id: string) {
    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "course not found");
    }
    return await this.reviewRepo.findAllCourseId(course_id);
  }
}

export { ReviewService };
