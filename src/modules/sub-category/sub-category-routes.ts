/**
 * @file sub-category-routes.ts
 * @description sub-category api routes
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import { Router } from "express";
import { subCategoryController } from "./sub-category-controller";

const router = Router();

router.post("/category/:categoryId/", subCategoryController.createSubCategory);

router.get("/category/:categoryId/", subCategoryController.getSubCategories);

router.get("/:id", subCategoryController.getSubCategory);

router.patch("/:id", subCategoryController.updateSubCategory);

router.delete("/:id", subCategoryController.deleteSubCategory);

export { router as subCategoryRoutes };
