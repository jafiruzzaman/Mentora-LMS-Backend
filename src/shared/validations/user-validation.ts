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

type signUpDTO = z.infer<typeof signUpSchema>;
type signInDTO = z.infer<typeof singInSchema>;

export { type signUpDTO, type signInDTO, signUpSchema, singInSchema };
