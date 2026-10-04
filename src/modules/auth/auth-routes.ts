/**
 * @file auth-routes.ts
 * @description auth routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { Router } from "express";
import { authController } from "./auth-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-out", authMiddleware, authController.signOut);

router.post("/refresh", authController.refresh);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authController.changePassword);

router.post("/send-verification-email", authController.sendVerificationEmail);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-email", authController.resendEmail);

export { router as authRoutes };
