/**
 * @file wishlist-service.ts
 * @description wishlist API service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October 2026
 */

import { AppError } from "@/shared/lib/app-error.lib";
import type { WishlistRepository } from "./wishlist-repository";
import type { CourseRepository } from "../course/course-repository";
import type { UserRepository } from "../user/user.repository";

class WishlistService {
  constructor(
    private readonly wishlistRepo: WishlistRepository,
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository
  ) {}
  async create({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    const existingWishlist = await this.wishlistRepo.findByStudentAndCourse({
      student_id,
      course_id,
    });
    if (existingWishlist) {
      throw new AppError(400, "course already added to wishlist");
    }
    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "course not found");
    }
    const user = await this.courseRepo.findById(course_id);
    if (!user) {
      throw new AppError(404, "user not found");
    }
    const response = await this.wishlistRepo.create({ course_id, student_id });
    return response;
  }
}
export { WishlistService };
