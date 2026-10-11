/**
 * @file review-routes.ts
 * @description review API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 10th October
 */

import { Router } from "express";

import { ReviewController } from "./review-controller";

const router = Router();

const reviewController = new ReviewController();
router.post("/course/:course_id/", reviewController.addReview);
router.get("/course/:course_id/", reviewController.getReviews);
router.get("/:review_id", reviewController.getReview);
router.patch("/:review_id", reviewController.updateReview);
router.delete("/:review_id", reviewController.deleteReview);

export { router as reviewRoutes };
