/**
 * @file index.tx
 * @description Root Routes file
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { Router } from "express";

import { authRoutes } from "@/modules/auth/auth-routes";
import { categoryRoutes } from "@/modules/category/category-routes";
import { subCategoryRoutes } from "@/modules/sub-category/sub-category-routes";

const router = Router();
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/sub-category", subCategoryRoutes);

export { router as rootRoutes };
