/**
 * @file course-routes.ts
 * @description course API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { Router } from "express";

import { CourseController } from "./course-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";
import { CourseService } from "./course-service";
import { CourseRepository } from "./course-repository";
import { UserRepository } from "../user/user.repository";
import { CategoryRepository } from "../category/category-repository";
import { SubCategoryRepository } from "../sub-category/sub-category-repository";

const router = Router();
const courseRepository = new CourseRepository();
const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();
const subCategoryRepository = new SubCategoryRepository();

const courseService = new CourseService(
  courseRepository,
  userRepository,
  categoryRepository,
  subCategoryRepository
);
const courseController = new CourseController(courseService);
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
