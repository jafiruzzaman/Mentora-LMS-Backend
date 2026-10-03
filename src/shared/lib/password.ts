/**
 * @file password.ts
 * @description password utility function
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */
import { env } from "@/config/env";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
};
const comparePassword = async (
  password: string,
  dbPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, dbPassword);
};
export { hashPassword, comparePassword };
