/**
 * @file course-routes.ts
 * @description course API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { Router } from "express";

import { courseController } from "./course-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  courseController.createCourse
);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  courseController.updateCourse
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  courseController.deleteCourse
);

export { router as courseRoutes };
