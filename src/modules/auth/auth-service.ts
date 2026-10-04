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
import { userRepository } from "@/modules/user/user.repository";
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

const signUp = async ({
  first_name,
  last_name,
  user_name,
  email,
  password,
}: signUpDTO) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError(409, "Email already exists.");
  }
  const userName = await userRepository.findByUserName(user_name);
  if (userName) {
    throw new AppError(409, "Username already exists.");
  }
  const password_hash = await hashPassword(password);
  const createdUser = await userRepository.create({
    first_name,
    last_name,
    user_name,
    email,
    password: password_hash,
  });
  if (!createdUser) {
    throw new AppError(400, "Failed to created user");
  }
  const access_token = token.generateAccessToken({
    id: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
  });
  const refresh_token = token.generateRefreshToken({
    id: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
  });
  const updatedUser = await userRepository.updateUser(createdUser.id, {
    refresh_token,
  });
  // send welcome email
  const welcomeEmail = generateWelcomeEmailTemplate(createdUser.first_name);
  await sendEmail({
    to: createdUser.email,
    subject: "Welcome to Mentora LMS",
    html: welcomeEmail,
  }).catch((err) => {
    logger.error("Failed to send welcome email:", err);
  });
  return { updatedUser, access_token, refresh_token };
};

const signIn = async ({ email, password }: signInDTO) => {
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }
  const matchedPassword = await comparePassword(
    password,
    existingUser.password_hash!
  );
  if (!matchedPassword) {
    throw new AppError(400, "Invalid user credentials.");
  }
  const access_token = token.generateAccessToken({
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
  const refresh_token = token.generateAccessToken({
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
  const user = await userRepository.updateUser(existingUser.id, {
    refresh_token,
  });
  return { user, access_token, refresh_token };
};
const signOut = async ({ id, email }: JwtPayload) => {
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }
  await userRepository.updateUser(id, {
    refresh_token: null,
  });
};
const refresh = async (refreshToken: string) => {
  const { id, email } = (await token.verifyRefreshToken(
    refreshToken
  )) as JwtPayload;
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }
  const access_token = token.generateAccessToken({
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
  const refresh_token = token.generateAccessToken({
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
  const user = await userRepository.updateUser(existingUser.id, {
    refresh_token,
  });
  await userRepository.updateUser(id, {
    refresh_token,
  });
  return { user, access_token, refresh_token };
};

const forgotPassword = async (email: string) => {
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  await userRepository.updateUser(existingUser.id, {
    reset_password_verification_token: hashedToken,
    reset_password_verification_expires_at: new Date(
      Date.now() + 15 * 60 * 1000
    ),
  });
  const resetUrl = `${env.FRONTEND_DOMAIN}/reset-password?token=${rawToken}`;

  await sendEmail({
    to: existingUser.email,
    subject: "Reset your Mentora password",
    html: passwordResetEmailTemplate(resetUrl),
  });
};

const resetPassword = async ({
  confirmedPassword,
  token,
}: resetPasswordDTO) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await userRepository.findByResetPasswordToken(hashedToken);
  // TODO: compare time its a huge mistake
  if (!user) {
    throw new AppError(400, "Invalid or expired verification token");
  }
  if (
    !user.reset_password_verification_expires_at ||
    user.reset_password_verification_expires_at.getTime() < Date.now()
  ) {
    throw new AppError(400, "Verification token has expired");
  }
  const password_hash = await hashPassword(confirmedPassword);
  await userRepository.updateUser(user.id, {
    password_hash,
    reset_password_verification_token: null,
    reset_password_verification_expires_at: null,
  });
  // send password reset email confirmation
  sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: resetPasswordConfirmationTemplate(user.first_name),
  });
};

const sendVerificationEmail = async (email: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  // send verification email
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  await userRepository.updateUser(user.id, {
    email_verification_token: hashedToken,
    email_verification_expires_at: new Date(Date.now() + 15 * 60 * 1000),
  });
  const url = `${env.FRONTEND_DOMAIN}/verify-email?token=${rawToken}`;
  sendEmail({
    to: user.email,
    subject: `Email Verification`,
    html: verificationEmailTemplate(user.first_name, url),
  });
};
const verifyEmail = async (token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await userRepository.findByVerificationToken(hashedToken);

  if (!user) {
    throw new AppError(400, "Invalid or expired verification token");
  }

  if (user.is_verified === true) {
    throw new AppError(400, "Email is already verified.");
  }

  if (
    !user.email_verification_expires_at ||
    user.email_verification_expires_at.getTime() <= Date.now()
  ) {
    throw new AppError(400, "Verification token has expired");
  }

  await userRepository.updateUser(user.id, {
    is_verified: true,
    email_verification_token: null,
    email_verification_expires_at: null,
  });
  await sendEmail({
    to: user.email,
    subject: "Your Mentora email has been verified",
    html: emailVerifiedTemplate(user.first_name),
  });
};

export const authService = {
  signUp,
  signIn,
  signOut,
  refresh,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
