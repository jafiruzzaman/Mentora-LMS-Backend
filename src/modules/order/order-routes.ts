/**
 * @file order-routes.ts
 * @description order API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { Router } from "express";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderRepository } from "./order-repository";
import { CourseRepository } from "../course/course-repository";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();
const orderRepository = new OrderRepository();
const courseRepository = new CourseRepository();
const orderService = new OrderService(orderRepository, courseRepository);
const orderController = new OrderController(orderService);

router.post(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  orderController.createOrder
);
router.get(
  "/",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  orderController.getAllOrders
);
router.get(
  "/:order_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  orderController.getOrder
);

export { router as orderRoutes };
