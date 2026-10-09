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
import { courseRoutes } from "@/modules/course/course-routes";
import { moduleRoutes } from "@/modules/modules/modules-routes";
import { lessonRoutes } from "@/modules/lessons/lessons-routes";
import { enrollmentRoutes } from "@/modules/enrollment/enrollment-routes";
import { orderRoutes } from "@/modules/order/order-routes";
import { paymentRoutes } from "@/modules/payment/payment-routes";
import { wishlistRoutes } from "@/modules/wishlist/wishlist-routes";

const router = Router();
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/sub-category", subCategoryRoutes);
router.use("/api/v1/course", courseRoutes);
router.use("/api/v1/modules", moduleRoutes);
router.use("/api/v1/lessons", lessonRoutes);
router.use("/api/v1/enrollment", enrollmentRoutes);
router.use("/api/v1/orders", orderRoutes);
router.use("/api/v1/payments", paymentRoutes);
router.use("/api/v1/wishlist", wishlistRoutes);

export { router as rootRoutes };
