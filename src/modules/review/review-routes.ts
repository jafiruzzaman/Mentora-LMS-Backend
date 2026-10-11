/**
 * @file review-routes.ts
 * @description review API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 11th October 2026
 */

import { Router } from "express";

import { ReviewController } from "./review-controller";
import { ReviewRepository } from "./review-repository";
import { ReviewService } from "./review-service";
import { CourseRepository } from "../course/course-repository";
import { EnrollmentRepository } from "../enrollment/enrollment-repository";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();
const reviewRepo = new ReviewRepository();
const courseRepo = new CourseRepository();
const enrollmentRepo = new EnrollmentRepository();
const reviewService = new ReviewService(reviewRepo, courseRepo, enrollmentRepo);
const reviewController = new ReviewController(reviewService);
router.post(
  "/course/:course_id/",
  authMiddleware,
  roleMiddlewares([Roles.admin, Roles.student]),
  reviewController.addReview
);
router.get("/course/:course_id/", reviewController.getReviews);
router.get("/:review_id", reviewController.getReview);
router.patch(
  "/course/:course_id/:review_id",
  authMiddleware,
  roleMiddlewares([Roles.admin, Roles.student]),
  reviewController.updateReview
);
router.delete(
  "/:review_id",
  authMiddleware,
  roleMiddlewares([Roles.admin, Roles.student]),
  reviewController.deleteReview
);

export { router as reviewRoutes };
