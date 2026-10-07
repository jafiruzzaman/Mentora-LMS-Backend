/**
 * @file modules-routes.ts
 * @description modules API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { Router } from "express";
import { CourseModuleController } from "@/modules/modules/modules-controller.ts";
import { ModuleService } from "@/modules/modules/modules-service.ts";
import { ModuleRepository } from "@/modules/modules/modules-repository.ts";
import { authMiddleware } from "@/shared/middlewares/auth.middleware.ts";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware.ts";
import { Roles } from "@/constants";

const router = Router();

const moduleRepository = new ModuleRepository();
const moduleService = new ModuleService(moduleRepository);
const moduleController = new CourseModuleController(moduleService);

router.post(
  "/course/:course_id/",
  authMiddleware,
  roleMiddlewares([Roles.instructor]),
  moduleController.createModule
);

router.get("/course/:course_id/", moduleController.getAllModules);

router.get("/:module_id", moduleController.getModule);

router.patch(
  "/:module_id",
  authMiddleware,
  roleMiddlewares([Roles.instructor]),
  moduleController.updateModule
);

router.delete(
  "/:module_id",
  authMiddleware,
  roleMiddlewares([Roles.instructor]),
  moduleController.deleteModule
);

export { router as moduleRoutes };
