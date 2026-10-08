import { Roles } from "./../../constants/index";
/**
 * @file category-routes.ts
 * @description category routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import { Router } from "express";

import { CategoryController } from "./category-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { CategoryRepository } from "./category-repository";
import { CategoryService } from "./category-service";

const router = Router();
const categoryRepo = new CategoryRepository();
const categoryService = new CategoryService(categoryRepo);
const categoryController = new CategoryController(categoryService);

router.post(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddlewares([Roles.admin]),
  categoryController.deleteCategory
);

export { router as categoryRoutes };
