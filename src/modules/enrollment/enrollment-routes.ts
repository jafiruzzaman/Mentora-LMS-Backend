/**
 * @file enrollment-routes.ts
 * @description enrollment routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router } from "express";
import { EnrollmentController } from "./enrollment-controller";

const router = Router();

const enrollmentController = new EnrollmentController();

router.post("/", enrollmentController.enroll);
router.get("/", enrollmentController.getAllEnrollments);

router.get("/course/:course_id", enrollmentController.getEnrolledCourse);

router.get("/:enrollment_id", enrollmentController.getEnrollment);

export { router as enrollmentRoutes };
