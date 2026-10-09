/**
 * @file enrollment-service.ts
 * @description enrollment service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { AppError } from "@/shared/lib/app-error.lib";
import type { EnrollmentRepository } from "./enrollment-repository";
import type { UserRepository } from "@/modules/user/user.repository";
import type { CourseRepository } from "@/modules/course/course-repository";
import type { OrderRepository } from "../order/order-repository";
import type { PaymentService } from "../payment/payment-service";
class EnrollmentService {
  constructor(
    private readonly enrollmentRepo: EnrollmentRepository,
    private readonly userRepo: UserRepository,
    private readonly courseRepo: CourseRepository,
    private readonly orderRepo: OrderRepository,
    private readonly paymentService: PaymentService
  ) {}
  async enroll({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    // check if student exist or not
    const student = await this.userRepo.findById(student_id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }

    // 2. Check if course exists
    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course not found");
    }
    // 3. Check if student is already enrolled
    const existingEnrollment =
      await this.enrollmentRepo.findByStudentIdAndCourse({
        student_id,
        course_id,
      });

    if (existingEnrollment) {
      throw new AppError(409, "Already enrolled in this course");
    }
    const numericPrice = Number.parseFloat(course.price.toString());

    // 4. FREE COURSE FLOW: Direct enrollment
    if (numericPrice === 0) {
      const enrollment = await this.enrollmentRepo.create({
        student_id,
        course_id,
        status: "completed",
      });
      //
      return { isFree: true, enrollment };
    }
    // 5. PAID COURSE FLOW: Create Order + Stripe Checkout Session
    // 5. PAID COURSE FLOW: Create Order + Stripe Checkout Session
    const priceString = course.price.toString();

    const { order } = await this.orderRepo.createOrderWithItems(
      {
        student_id,
        total: priceString,
        sub_total: priceString,
        currency: "USD",
        order_status: "PENDING",
      },
      [
        {
          course_id,
          unit_price: priceString,
          total_price: priceString,
        },
      ]
    );
    // generate stripe checkout redirect url
    const checkoutData = await this.paymentService.createCheckoutSession(
      student_id,
      order.id
    );
    return {
      isFree: false,
      orderId: order.id,
      checkoutUrl: checkoutData.checkoutUrl,
    };
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
  async getEnrolledCourse({
    student_id,
    course_id,
  }: {
    student_id: string;
    course_id: string;
  }) {
    const enrollment = await this.enrollmentRepo.findByStudentIdAndCourse({
      student_id,
      course_id,
    });
    if (!enrollment) {
      throw new AppError(404, "Not Enrolled");
    }

    const course = await this.courseRepo.findById(course_id);
    if (!course) {
      throw new AppError(404, "Course not found");
    }

    return { enrollment, course };
  }
}

export { EnrollmentService };
