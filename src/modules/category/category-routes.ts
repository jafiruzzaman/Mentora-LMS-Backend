/**
 * @file category-routes.ts
 * @description category routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import { Router } from "express";

import { categoryController } from "./category-controller";

const router = Router();

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.patch("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

export { router as categoryRoutes };
