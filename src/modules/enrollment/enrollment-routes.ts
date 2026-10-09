/**
 * @file enrollment-routes.ts
 * @description enrollment routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router } from "express";
import { EnrollmentController } from "./enrollment-controller";
import { EnrollmentService } from "./enrollment-service";
import { EnrollmentRepository } from "./enrollment-repository";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";
import { UserRepository } from "../user/user.repository";
import { CourseRepository } from "@/modules/course/course-repository";
import { OrderRepository } from "@/modules/order/order-repository";
import { PaymentService } from "@/modules/payment/payment-service";
import { PaymentRepository } from "../payment/payment-repository";

const router = Router();
const enrollmentRepository = new EnrollmentRepository();
const userRepository = new UserRepository();
const courseRepository = new CourseRepository();
const orderRepository = new OrderRepository();
const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(
  paymentRepository,
  orderRepository,
  enrollmentRepository
);
const enrollmentService = new EnrollmentService(
  enrollmentRepository,
  userRepository,
  courseRepository,
  orderRepository,
  paymentService
);
const enrollmentController = new EnrollmentController(enrollmentService);
// course_id
router.post(
  "/:id/enroll",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  enrollmentController.enroll
);
router.get(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  enrollmentController.getAllEnrollments
);

router.get(
  "/course/:id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  enrollmentController.getEnrolledCourse
);
// enrollment_id
router.get(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  enrollmentController.getEnrollment
);

export { router as enrollmentRoutes };
