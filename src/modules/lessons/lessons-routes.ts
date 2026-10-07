/**
 * @file lessons-routes.ts
 * @description Lesson API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router } from "express";
import { LessonController } from "./lessons-controller";

const router = Router();

const lessonController = new LessonController();

router.post("/modules/:module_id/", lessonController.createLesson);
router.get("/modules/:module_id/", lessonController.getLessons);
router.get("/:lesson_id", lessonController.getLesson);
router.patch("/:lesson_id", lessonController.updateLesson);
router.delete("/:lesson_id", lessonController.deleteLesson);

export { router as lessonRoutes };
