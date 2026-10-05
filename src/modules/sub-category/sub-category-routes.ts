/**
 * @file sub-category-routes.ts
 * @description sub-category api routes
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import { Router } from "express";

import { subCategoryController } from "./sub-category-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();

router.post(
  "/category/:categoryId/",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  subCategoryController.createSubCategory
);

router.get("/category/:categoryId/", subCategoryController.getSubCategories);

router.get("/:id", subCategoryController.getSubCategory);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  subCategoryController.updateSubCategory
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  subCategoryController.deleteSubCategory
);

export { router as subCategoryRoutes };
