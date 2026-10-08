/**
 * @file auth-routes.ts
 * @description auth routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { Router } from "express";
import { AuthController } from "./auth-controller";
import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import {
  forgotPasswordRateLimiter,
  resendEmailRateLimiter,
  sendEmailRateLimiter,
  signInRateLimiter,
  signUpRateLimiter,
} from "@/shared/middlewares/rate-limiter.middleware";
import { AuthService } from "./auth-service";
import { UserRepository } from "../user/user.repository";

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/sign-up", signUpRateLimiter, authController.signUp);
router.post("/sign-in", signInRateLimiter, authController.signIn);
router.post("/sign-out", authMiddleware, authController.signOut);

router.post("/refresh", authController.refresh);

router.post(
  "/forgot-password",
  forgotPasswordRateLimiter,
  authController.forgotPassword
);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authMiddleware, authController.changePassword);

router.post(
  "/send-verification-email",
  sendEmailRateLimiter,
  authMiddleware,
  authController.sendVerificationEmail
);
router.post("/verify-email", authController.verifyEmail);
router.post(
  "/resend-email",
  resendEmailRateLimiter,
  authController.resendEmail
);

export { router as authRoutes };
