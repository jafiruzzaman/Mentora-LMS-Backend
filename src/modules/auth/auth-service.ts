/**
 * @file auth-service.ts
 * @description auth service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import crypto from "node:crypto";

import type {
  resetPasswordDTO,
  signInDTO,
  signUpDTO,
} from "@/modules/auth/auth-validation";

import { UserRepository } from "@/modules/user/user.repository";

import { AppError } from "@/shared/lib/app-error.lib";
import { comparePassword, hashPassword } from "@/shared/lib/password";

import { token } from "@/shared/lib/token";

import type { JwtPayload } from "@/types/express.types";

import {
  emailVerifiedTemplate,
  generateWelcomeEmailTemplate,
  passwordResetEmailTemplate,
  resetPasswordConfirmationTemplate,
  sendEmail,
  verificationEmailTemplate,
} from "@/shared/lib/email/send-email";

import { logger } from "@/config/logger";
import { env } from "@/config/env";

export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async signUp({
    first_name,
    last_name,
    user_name,
    email,
    password,
  }: signUpDTO) {
    // Check email
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new AppError(409, "Email already exists.");
    }

    // Check username
    const existingUserName = await this.userRepo.findByUserName(user_name);

    if (existingUserName) {
      throw new AppError(409, "Username already exists.");
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const createdUser = await this.userRepo.create({
      first_name,
      last_name,
      user_name,
      email,
      password: passwordHash,
    });

    if (!createdUser) {
      throw new AppError(400, "Failed to create user.");
    }

    // Generate tokens
    const accessToken = token.generateAccessToken({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    const refreshToken = token.generateRefreshToken({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    // Store refresh token
    const updatedUser = await this.userRepo.update(createdUser.id, {
      refresh_token: refreshToken,
    });

    // Send welcome email
    const welcomeEmail = generateWelcomeEmailTemplate(createdUser.first_name);

    await sendEmail({
      to: createdUser.email,
      subject: "Welcome to Mentora LMS",
      html: welcomeEmail,
    }).catch((err) => {
      logger.error("Failed to send welcome email:", err);
    });

    return {
      updatedUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signIn({ email, password }: signInDTO) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (!existingUser) {
      throw new AppError(404, "User not found.");
    }

    // Compare password
    const matchedPassword = await comparePassword(
      password,
      existingUser.password_hash!
    );

    if (!matchedPassword) {
      throw new AppError(400, "Invalid user credentials.");
    }

    // Generate access token
    const accessToken = token.generateAccessToken({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    // Generate refresh token
    const refreshToken = token.generateRefreshToken({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    // Store refresh token
    const user = await this.userRepo.update(existingUser.id, {
      refresh_token: refreshToken,
    });

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signOut({ id, email }: JwtPayload) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (!existingUser) {
      throw new AppError(404, "User not found.");
    }

    await this.userRepo.update(id, {
      refresh_token: null,
    });
  }

  async refresh(refreshToken: string) {
    const { email } = (await token.verifyRefreshToken(
      refreshToken
    )) as JwtPayload;

    const existingUser = await this.userRepo.findByEmail(email);

    if (!existingUser) {
      throw new AppError(404, "User not found.");
    }

    // Generate new access token
    const accessToken = token.generateAccessToken({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    // Rotate refresh token
    const newRefreshToken = token.generateRefreshToken({
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    const user = await this.userRepo.update(existingUser.id, {
      refresh_token: newRefreshToken,
    });

    return {
      user,
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }

  async forgotPassword(email: string) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (!existingUser) {
      throw new AppError(404, "User not found.");
    }

    // Generate raw token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await this.userRepo.update(existingUser.id, {
      reset_password_verification_token: hashedToken,

      reset_password_verification_expires_at: new Date(
        Date.now() + 15 * 60 * 1000
      ),
    });

    const resetUrl =
      `${env.FRONTEND_DOMAIN}` + `/reset-password?token=${rawToken}`;

    await sendEmail({
      to: existingUser.email,
      subject: "Reset your Mentora password",
      html: passwordResetEmailTemplate(resetUrl),
    });
  }

  async resetPassword({
    confirmedPassword,
    token: rawToken,
  }: resetPasswordDTO) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await this.userRepo.findByResetPasswordToken(hashedToken);

    if (!user) {
      throw new AppError(400, "Invalid or expired verification token.");
    }

    if (
      !user.reset_password_verification_expires_at ||
      user.reset_password_verification_expires_at.getTime() < Date.now()
    ) {
      throw new AppError(400, "Verification token has expired.");
    }

    const passwordHash = await hashPassword(confirmedPassword);

    await this.userRepo.update(user.id, {
      password_hash: passwordHash,

      reset_password_verification_token: null,

      reset_password_verification_expires_at: null,
    });

    // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: resetPasswordConfirmationTemplate(user.first_name),
    });
  }

  async sendVerificationEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await this.userRepo.update(user.id, {
      email_verification_token: hashedToken,

      email_verification_expires_at: new Date(Date.now() + 15 * 60 * 1000),
    });

    const url = `${env.FRONTEND_DOMAIN}` + `/verify-email?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      html: verificationEmailTemplate(user.first_name, url),
    });
  }

  async verifyEmail(rawToken: string) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await this.userRepo.findByVerificationToken(hashedToken);

    if (!user) {
      throw new AppError(400, "Invalid or expired verification token.");
    }

    if (user.is_verified === true) {
      throw new AppError(400, "Email is already verified.");
    }

    if (
      !user.email_verification_expires_at ||
      user.email_verification_expires_at.getTime() <= Date.now()
    ) {
      throw new AppError(400, "Verification token has expired.");
    }

    await this.userRepo.update(user.id, {
      is_verified: true,
      email_verification_token: null,
      email_verification_expires_at: null,
    });

    await sendEmail({
      to: user.email,
      subject: "Your Mentora email has been verified",
      html: emailVerifiedTemplate(user.first_name),
    });
  }

  async changePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    const passwordHash = await hashPassword(password);

    return await this.userRepo.update(user.id, {
      password_hash: passwordHash,
    });
  }

  async resendEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    if (user.is_verified) {
      throw new AppError(400, "User is already verified.");
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await this.userRepo.update(user.id, {
      email_verification_token: hashedToken,

      email_verification_expires_at: new Date(Date.now() + 15 * 60 * 1000),
    });

    const url = `${env.FRONTEND_DOMAIN}` + `/verify-email?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      html: verificationEmailTemplate(user.first_name, url),
    });
  }
}
