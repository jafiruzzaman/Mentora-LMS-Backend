/**
 * @file auth-controller.ts
 * @description auth controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { signUpSchema } from "@/shared/validations/user-validation";
import type { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    message: "sign-up successfully",
  });
};
const signIn = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-in successfully.`,
    data: {},
  });
};
const signOut = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-out successfully.`,
    data: {},
  });
};
const refresh = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `token refreshed successfully.`,
    data: {},
  });
};
const forgotPassword = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `sign-up successfully.`,
    data: {},
  });
};
const sendVerificationEmail = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `We send a verification email to your email.`,
    data: {},
  });
};
const verifyEmail = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    method: req.method,
    message: `email verified successfully.`,
    data: {},
  });
};
const resendEmail = async (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    method: req.method,
    message: `We send a verification email to your email.`,
    data: {},
  });
};
const changePassword = async (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    method: req.method,
    message: `password changed successfully.`,
    data: {},
  });
};
const resetPassword = async (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    method: req.method,
    message: `password changed successfully.`,
    data: {},
  });
};

export const authController = {
  signUp,
  signIn,
  signOut,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
  sendVerificationEmail,
  verifyEmail,
  resendEmail,
};
