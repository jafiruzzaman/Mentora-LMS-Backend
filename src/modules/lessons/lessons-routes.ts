/**
 * @file lessons-routes.ts
 * @description Lesson API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router } from "express";
import { Roles } from "@/constants";
import { LessonService } from "./lessons-service";
import { LessonController } from "./lessons-controller";
import { LessonRepository } from "./lessons-repository";
import { upload } from "@/shared/middlewares/multer.middleware";
import { ModuleRepository } from "../modules/modules-repository";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";

const router = Router();
const lessonRepository = new LessonRepository();
const moduleRepository = new ModuleRepository();
const lessonService = new LessonService(lessonRepository, moduleRepository);
const lessonController = new LessonController(lessonService);

router.post(
  "/modules/:module_id/",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  upload.single("video"),
  lessonController.createLesson
);
router.get("/modules/:module_id/", lessonController.getLessons);
router.get("/:lesson_id", lessonController.getLesson);
router.patch(
  "/:lesson_id",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  upload.single("video"),
  lessonController.updateLesson
);
router.delete(
  "/:lesson_id",
  authMiddleware,
  roleMiddlewares([Roles.instructor, Roles.admin]),
  lessonController.deleteLesson
);

export { router as lessonRoutes };
