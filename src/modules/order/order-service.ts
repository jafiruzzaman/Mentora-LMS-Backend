/**
 * @file order-service.ts
 * @description order API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { AppError } from "@/shared/lib/app-error.lib";
import type { CourseRepository } from "../course/course-repository";
import { OrderRepository } from "./order-repository";

type OrderInput = {
  student_id: string;
  course_id: string[] | string;
};

class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly courseRepo: CourseRepository
  ) {}
  async createOrder({ student_id, course_id }: OrderInput) {
    // remove unique courses
    const uniqueCourseIds = [...new Set(course_id)];
    // find all the requested courses
    const courses = await this.courseRepo.findByIds(uniqueCourseIds);
    if (courses.length !== uniqueCourseIds.length) {
      throw new Error("One or more courses not found");
    }
    // check all courses are published
    const unavailableCourse = courses.find(
      (course) => course.status !== "PUBLISHED"
    );
    if (unavailableCourse) {
      throw new Error(
        `Course "${unavailableCourse.title}" is not available for purchase`
      );
    }
    // calculate order item
    const order_items = courses.map((course) => ({
      course_id: course.id,
      unit_price: course.price.toString(),
      total_price: course.price.toString(),
    }));
    // calculate sub-total
    const sub_total = courses.reduce(
      (sum, course) => sum + Number(course.price),
      0
    );
    // TODO: add discount/tax/free
    const total = sub_total;
    const order = await this.orderRepo.createOrderWithItems(
      {
        student_id,
        sub_total: sub_total.toString(),
        total: total.toString(),
        currency: "BDT",
        order_status: "PENDING",
      },
      order_items
    );
    return { order };
  }
  async getAllOrder(student_id: string) {
    const orders = await this.orderRepo.findAll(student_id);
    return orders;
  }
  async getOrder(order_id: string) {
    const order = await this.orderRepo.findById(order_id);
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    return order;
  }
}

export { OrderService };
