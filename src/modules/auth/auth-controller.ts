/**
 * @file auth-controller.ts
 * @description auth controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { apiResponse } from "@/shared/lib/api-response";
import type { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 201,
    message: "sign-up successfully",
    data: {},
  });
};
const signIn = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `sign-in successfully.`,
    data: {},
  });
};
const signOut = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `sign-out successfully.`,
    data: {},
  });
};
const refresh = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `token refreshed successfully.`,
    data: {},
  });
};
const forgotPassword = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `We send a password reset email to your email.`,
    data: {},
  });
};
const sendVerificationEmail = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `We send a verification email to your email.`,
    data: {},
  });
};
const verifyEmail = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `email verified successfully.`,
    data: {},
  });
};
const resendEmail = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `We send a verification email to your email.`,
    data: {},
  });
};
const changePassword = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `password changed successfully.`,
    data: {},
  });
};
const resetPassword = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
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
