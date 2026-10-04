/**
 * @file auth-controller.ts
 * @description auth controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signUpSchema,
  singInSchema,
  verifyEmailSchema,
} from "@/modules/auth/auth-validation";
import type { Request, Response } from "express";
import { authService } from "./auth-service";
import { env } from "@/config/env";

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = signUpSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const { updatedUser, access_token, refresh_token } = await authService.signUp(
    parsedData.data
  );
  res.cookie("token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: env.NODE_ENV === "production",
  });
  apiResponse({
    res,
    statusCode: 200,
    message: `sign-up successfully.`,
    data: { updatedUser, access_token },
  });
});
const signIn = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = singInSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const { user, access_token, refresh_token } = await authService.signIn(
    parsedData.data
  );
  res.cookie("token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: env.NODE_ENV === "production",
  });
  apiResponse({
    res,
    statusCode: 200,
    message: `sign-in successfully.`,
    data: { user, access_token },
  });
});
const signOut = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  await authService.signOut(user);
  res.clearCookie("token");
  apiResponse({
    res,
    statusCode: 200,
    message: `sign-out successfully.`,
  });
});
const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies["token"];
  console.log(`token `, token);

  const { user, access_token, refresh_token } =
    await authService.refresh(token);
  res.cookie("token", refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
  });
  apiResponse({
    res,
    statusCode: 200,
    message: `token refreshed successfully.`,
    data: {
      user,
      access_token,
    },
  });
});
const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = forgotPasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  await authService.forgotPassword(parsedData.data.email);
  apiResponse({
    res,
    statusCode: 200,
    message: `We send a password reset email to your email.`,
  });
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = resetPasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  await authService.resetPassword(parsedData.data);
  apiResponse({
    res,
    statusCode: 200,
    message: `password reset successfully.`,
  });
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const email = req.user.email;
  const parsedData = changePasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await authService.changePassword({
    email,
    password: parsedData.data.newPassword,
  });

  apiResponse({
    res,
    statusCode: 200,
    message: `password changed successfully.`,
    data: {
      response,
    },
  });
});

const sendVerificationEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const userEmail = req.user.email;
    await authService.sendVerificationEmail(userEmail);
    apiResponse({
      res,
      statusCode: 200,
      message: `We send a verification email to your email.`,
    });
  }
);
const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = verifyEmailSchema.safeParse(req.body);
  if (!parsedData.success) {
    const message = parsedData.error.issues[0]?.message;
    throw new Error(message);
  }
  const response = await authService.verifyEmail(parsedData.data.token);
  apiResponse({
    res,
    statusCode: 200,
    message: `email verified successfully.`,
    data: { response },
  });
});
const resendEmail = asyncHandler(async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: `We send a verification email to your email.`,
    data: {},
  });
});

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
