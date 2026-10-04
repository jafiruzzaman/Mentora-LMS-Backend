/**
 * @file user-validation.ts
 * @description user repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import { z } from "zod";

const signUpSchema = z.object({
  first_name: z.string().min(3).describe("first name is required"),
  last_name: z.string().min(3).describe("last name is required"),
  user_name: z.string().min(3).describe("user name is required"),
  email: z.email().describe("email is required"),
  password: z
    .string()
    .min(8)
    .describe("password must be at-least 8 characters long"),
});

const singInSchema = z.object({
  email: z.email().describe("email is required"),
  password: z
    .string()
    .min(8)
    .describe("password must be at-least 8 characters long"),
});

const forgotPasswordSchema = z.object({
  email: z
    .email()
    .lowercase()
    .trim()
    .describe("please enter a valid email address"),
});

const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .min(16)
      .describe("token have to be at-least 16 characters long"),
    newPassword: z
      .string()
      .min(8)
      .describe("password must be at-least 8 characters long"),
    confirmedPassword: z
      .string()
      .min(8)
      .describe("password must be at-least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: `password don't matched.`,
    path: ["confirmedPassword"],
  });

const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(16)
    .describe("token have to be at-least 16 characters long"),
});

type signUpDTO = z.infer<typeof signUpSchema>;
type signInDTO = z.infer<typeof singInSchema>;
type forgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
type resetPasswordDTO = z.infer<typeof resetPasswordSchema>;
type verifyEmailDTO = z.infer<typeof verifyEmailSchema>;

export {
  type signUpDTO,
  type signInDTO,
  type forgotPasswordDTO,
  type resetPasswordDTO,
  type verifyEmailDTO,
  signUpSchema,
  singInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
};
