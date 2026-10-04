/**
 * @file auth-service.ts
 * @description auth service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import type {
  signInDTO,
  signUpDTO,
} from "@/shared/validations/user-validation";
import { userRepository } from "@/modules/user/user.repository";
import { AppError } from "@/shared/lib/app-error.lib";
import { comparePassword, hashPassword } from "@/shared/lib/password";
import { token } from "@/shared/lib/token";

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
  const response = await userRepository.create({
    first_name,
    last_name,
    user_name,
    email,
    password: password_hash,
  });
  return response;
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

export const authService = {
  signUp,
  signIn,
};
