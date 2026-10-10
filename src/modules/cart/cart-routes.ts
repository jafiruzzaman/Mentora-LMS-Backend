/**
 * @file cart-routes.ts
 * @description cart API routes
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import { Router } from "express";
import { CartController } from "./cart-controller";
import { CartService } from "./cart-service";
import { CartRepository } from "./cart-repository";
import { CourseRepository } from "@/modules/course/course-repository";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();
const courseRepository = new CourseRepository();
const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository, courseRepository);
const cartController = new CartController(cartService);
router.post(
  "/:course_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  cartController.addToCart
);
router.get(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  cartController.getAllCartItems
);

router.delete(
  "/clear",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  cartController.clearCart
);

router.delete(
  "/:course_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  cartController.removeFromCart
);

export { router as cartRoutes };
