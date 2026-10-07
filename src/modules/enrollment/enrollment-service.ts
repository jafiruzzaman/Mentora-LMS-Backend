/**
 * @file enrollment-service.ts
 * @description enrollment service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { AppError } from "@/shared/lib/app-error.lib";
import type { EnrollmentRepository } from "./enrollment-repository";
import { userRepository } from "@/modules/user/user.repository";
import { courseRepository } from "@/modules/course/course-repository";
// TODO: convert functional user repository to classed based
const userRepo = userRepository;
const courseRepo = courseRepository;
class EnrollmentService {
  constructor(
    private readonly enrollmentRepo: EnrollmentRepository
    // private readonly userRepo: userRepository
  ) {}
  async enroll({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    // check if student exist or not
    const student = await userRepo.findById(student_id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    // check if course is exist or not
    const course = await courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "Student not found");
    }

    // check if student is already exist
    const existingEnrollment =
      await this.enrollmentRepo.findByStudentIdAndCourse({
        student_id,
        course_id,
      });

    if (existingEnrollment) {
      throw new AppError(409, "Already enrolled this course");
    }
    // check if course is free or nor
    if (course.price === 0) {
      await this.enrollmentRepo.create({
        student_id,
        course_id,
        status: "completed",
      });
      return;
    }
    // CALL order & payment module later
  }
  async getEnrollment({
    enrollment_id,
    student_id,
  }: {
    enrollment_id: string;
    student_id: string;
  }) {
    // check enrollment exist or not
    const enrollment = await this.enrollmentRepo.findById(enrollment_id);
    if (!enrollment) {
      throw new AppError(404, "Not enrolled");
    }
    if (enrollment.student_id !== student_id) {
      throw new AppError(403, "Access denied.");
    }
    return enrollment;
  }
  async getAllEnrollments(student_id: string) {
    return this.enrollmentRepo.findByStudentId(student_id);
  }
}

export { EnrollmentService };
