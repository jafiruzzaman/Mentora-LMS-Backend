/**
 * @file auth-controller.ts
 * @description Auth controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import type { Request, Response } from "express";

import { env } from "@/config/env";
import {
  changePasswordSchema,
  emailSchema,
  resetPasswordSchema,
  signUpSchema,
  singInSchema,
  verifyEmailSchema,
} from "@/modules/auth/auth-validation";
import { apiResponse } from "@/shared/lib/api-response";
import { asyncHandler } from "@/shared/lib/async-handler";
import { AppError } from "@/shared/lib/app-error.lib";

import { AuthService } from "./auth-service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  signUp = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = signUpSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sign-up data.");
    }

    const { updatedUser, access_token, refresh_token } =
      await this.authService.signUp(parsedData.data);

    res.cookie("token", refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    apiResponse({
      res,
      statusCode: 200,
      message: "Sign-up successfully.",
      data: {
        updatedUser,
        access_token,
      },
    });
  });

  signIn = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = singInSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid sign-in data.");
    }

    const { user, access_token, refresh_token } = await this.authService.signIn(
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
      message: "Sign-in successfully.",
      data: {
        user,
        access_token,
      },
    });
  });

  signOut = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    await this.authService.signOut(user);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
    });

    apiResponse({
      res,
      statusCode: 200,
      message: "Sign-out successfully.",
    });
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies["token"];

    if (!refreshToken) {
      throw new AppError(401, "Refresh token is required.");
    }

    const { user, access_token, refresh_token } =
      await this.authService.refresh(refreshToken);

    res.cookie("token", refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    apiResponse({
      res,
      statusCode: 200,
      message: "Token refreshed successfully.",
      data: {
        user,
        access_token,
      },
    });
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = emailSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid email.");
    }

    await this.authService.forgotPassword(parsedData.data.email);

    apiResponse({
      res,
      statusCode: 200,
      message: "We sent a password reset email to your email.",
    });
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = resetPasswordSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid password reset data.");
    }

    await this.authService.resetPassword(parsedData.data);

    apiResponse({
      res,
      statusCode: 200,
      message: "Password reset successfully.",
    });
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const email = req.user.email;

    const parsedData = changePasswordSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid password data.");
    }

    const response = await this.authService.changePassword({
      email,
      password: parsedData.data.newPassword,
    });

    apiResponse({
      res,
      statusCode: 200,
      message: "Password changed successfully.",
      data: {
        response,
      },
    });
  });

  sendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
    const userEmail = req.user.email;

    await this.authService.sendVerificationEmail(userEmail);

    apiResponse({
      res,
      statusCode: 200,
      message: "We sent a verification email to your email.",
    });
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = verifyEmailSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid verification token.");
    }

    const response = await this.authService.verifyEmail(parsedData.data.token);

    apiResponse({
      res,
      statusCode: 200,
      message: "Email verified successfully.",
      data: {
        response,
      },
    });
  });

  resendEmail = asyncHandler(async (req: Request, res: Response) => {
    const parsedData = emailSchema.safeParse(req.body);

    if (!parsedData.success) {
      const message = parsedData.error.issues[0]?.message;

      throw new AppError(400, message ?? "Invalid email.");
    }

    await this.authService.resendEmail(parsedData.data.email);

    apiResponse({
      res,
      statusCode: 200,
      message: "We sent a verification email to your email.",
      data: {},
    });
  });
}
