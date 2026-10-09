/**
 * @file wishlist-routes.ts
 * @description wishlist API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October 2026
 */

import { Router } from "express";
import { WishlistController } from "./wishlist-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();

const wishlistController = new WishlistController();

router.post(
  "/:course_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  wishlistController.addToWishlist
);
router.get(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  wishlistController.getAllWishlists
);
router.delete(
  "/:course_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  wishlistController.removeFromWishlist
);

export { router as wishlistRoutes };
