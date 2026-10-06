/**
 * @file modules-routes.ts
 * @description modules API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { Router } from "express";
import { CourseModuleController } from "@/modules/modules/modules-controller.ts";

const router = Router();


const courseMooduleController = new CourseModuleController();

/**
 * Create module
 * POST /api/v1/modules/courses/:courseId
 */
router.post("/course/:courseId/", courseMooduleController.createModule);

/**
 * Get all modules of a course
 * GET /api/v1/modules/courses/:courseId
 */
router.get("/course/:courseId/", courseMooduleController.getAllModules);

/**
 * Get a single module
 * GET /api/v1/modules/:moduleId
 */
router.get("/:moduleId", courseMooduleController.getModule);

/**
 * Update module
 * PATCH /api/v1/modules/:moduleId
 */
router.patch("/:moduleId", courseMooduleController.updateModule);

/**
 * Delete module
 * DELETE /api/v1/modules/:moduleId
 */
router.delete("/:moduleId", courseMooduleController.deleteModule);

export { router as moduleRoutes };
