/**
 * @file order-routes.ts
 * @description order API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { Router } from "express";
import { OrderController } from "./order-controller";

const router = Router();

const orderController = new OrderController();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:order_id", orderController.getOrder);

export { router as orderRoutes };
