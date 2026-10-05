/**
 * @file course-routes.ts
 * @description course API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 */

import { Router } from "express";


import { courseController } from "./course-controller";

const router = Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

export { router as courseRoutes };
