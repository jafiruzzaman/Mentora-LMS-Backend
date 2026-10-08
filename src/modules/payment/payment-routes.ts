import { Router, raw } from "express";
import { PaymentController } from "./payment-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { roleMiddlewares } from "@/shared/middlewares/role.middleware";
import { Roles } from "@/constants";
import { PaymentService } from "./payment-service";
import { PaymentRepository } from "./payment-repository";
import { OrderRepository } from "../order/order-repository";
import { EnrollmentRepository } from "../enrollment/enrollment-repository";

const router = Router();
const paymentRepository = new PaymentRepository();
const orderRepository = new OrderRepository();
const enrollmentRepository = new EnrollmentRepository();
const paymentService = new PaymentService(
  paymentRepository,
  orderRepository,
  enrollmentRepository
);
const paymentController = new PaymentController(paymentService);

// ✅ PUBLIC ENDPOINT: No auth middleware, using raw body parser specifically for Stripe
router.post(
  "/webhook",
  raw({ type: "application/json" }),
  paymentController.handleWebhook
);

// ✅ PROTECTED ENDPOINTS: Require authenticated student JWT
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
