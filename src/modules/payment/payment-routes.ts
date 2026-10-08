/**
 * @file payment-routes
 * @description payment routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { Router, raw } from "express";
import { PaymentController } from "./payment-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";

const router = Router();
const paymentController = new PaymentController();
router.post(
  "/webhook",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  raw({ type: "application/json" }),
  paymentController.handleWebhook
);
router.post(
  "/checkout",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  paymentController.createCheckoutSession
);
router.get(
  "/my-payments",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  paymentController.getStudentPayments
);
router.get(
  "/:payment_id",
  authMiddleware,
  roleMiddlewares([Roles.student]),
  paymentController.getPaymentById
);

export { router as paymentRoutes };
