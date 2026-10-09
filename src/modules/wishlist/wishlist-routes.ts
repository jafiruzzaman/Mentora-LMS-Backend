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
import { WishlistService } from "@/modules/wishlist/wishlist-service.ts";
import { WishlistRepository } from "@/modules/wishlist/wishlist-repository.ts";
import { CourseRepository } from "@/modules/course/course-repository.ts";
import { UserRepository } from "@/modules/user/user.repository.ts";

const router = Router();
const wishlistRepository = new WishlistRepository();
const courseRepository = new CourseRepository();
const userRepository = new UserRepository();
const wishlistService = new WishlistService(
  wishlistRepository,
  courseRepository,
  userRepository
);
const wishlistController = new WishlistController(wishlistService);

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
