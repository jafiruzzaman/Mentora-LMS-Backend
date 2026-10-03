/**
 * @file auth-routes.ts
 * @description auth routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/sign-up", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    method: req.method,
    message: `sign-up successfully.`,
    data: {},
  });
});

router.post("/sign-in", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-in successfully.`,
    data: {},
  });
});

router.post("/sign-out", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-out successfully.`,
    data: {},
  });
});

router.post("/refresh", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `token refreshed successfully.`,
    data: {},
  });
});

router.post("/forgot-password", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-up successfully.`,
    data: {},
  });
});

router.post("/reset-password", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-up successfully.`,
    data: {},
  });
});

router.post("/send-verification-email", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `We send a verification email to your email.`,
    data: {},
  });
});

router.post("/verify-email", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `email verified successfully.`,
    data: {},
  });
});

router.post("/resend-email", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    method: req.method,
    message: `We send a verification email to your email.`,
    data: {},
  });
});

export { router as authRoutes };
