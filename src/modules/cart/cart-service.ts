/**
 * @file cart-service.ts
 * @description cart API service
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import type { CourseRepository } from "@/modules/course/course-repository";
import type { CartRepository } from "./cart-repository";
import { AppError } from "@/shared/lib/app-error.lib";

class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly courseRepo: CourseRepository
  ) {}

  // add to cart
  async addToCart({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    // check if course exist or not
    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course not found");
    }
    // check if cart already created or not
    let cart = await this.cartRepo.findByStudentId(student_id);
    cart ??= await this.cartRepo.create({ student_id, course_ids: [] });
    // check if course already in cart item or not
    const existingItems = await this.cartRepo.findItemByStudentAndCourse(
      student_id,
      course_id
    );
    if (existingItems) {
      throw new AppError(409, "Course already exists in your cart");
    }
    // 6. Add the course to the cart
    const cartItem = await this.cartRepo.addItem(
      student_id,
      cart!.id,
      course_id
    );
    return cartItem;
  }
}
export { CartService };
