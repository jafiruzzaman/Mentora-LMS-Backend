/**
 * @file sub-category-routes.ts
 * @description Sub-category API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { Router } from "express";

import { Roles } from "@/constants";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";

import { CategoryRepository } from "@/modules/category/category-repository";
import { SubCategoryRepository } from "./sub-category-repository";
import { SubCategoryService } from "./sub-category-service";
import { SubCategoryController } from "./sub-category-controller";

const router = Router();

const categoryRepository = new CategoryRepository();

const subCategoryRepository = new SubCategoryRepository();

const subCategoryService = new SubCategoryService(
  subCategoryRepository,
  categoryRepository
);

const subCategoryController = new SubCategoryController(subCategoryService);

router.post(
  "/category/:categoryId",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  subCategoryController.createSubCategory
);

router.get("/category/:categoryId", subCategoryController.getSubCategories);

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
