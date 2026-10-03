/**
 * @file auth-service.ts
 * @description auth service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import type { signUpDTO } from "@/shared/validations/user-validation";
import { userRepository } from "@/modules/user/user.repository";
import { AppError } from "@/shared/lib/app-error.lib";

const signUp = async ({
  first_name,
  last_name,
  user_name,
  email,
  password,
}: signUpDTO) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError(409, "email already exist.");
  }
  const userName = await userRepository.findByUserName(user_name);
  if (userName) {
    throw new AppError(409, "user name already exist");
  }
  const response = await userRepository.create({
    first_name,
    last_name,
    user_name,
    email,
    password,
  });
  return response;
};

export const authService = {
  signUp,
};
