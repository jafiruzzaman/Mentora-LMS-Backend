/**
 * @file cart-routes.ts
 * @description cart API routes
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import { Router } from "express";
import { CartController } from "./cart-controller";

const router = Router();
const cartController = new CartController();
router.post("/:course_id", cartController.addToCart);
router.get("/", cartController.getAllCartItems);
router.delete("/:course_id", cartController.removeFromCart);
router.delete("/clear", cartController.clearCart);

export { router as cartRoutes };
