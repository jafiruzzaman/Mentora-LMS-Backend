/**
 * @file auth-service.ts
 * @description auth service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import jwt from "jsonwebtoken";
import ms from "ms";

import { env } from "@/config/env";

export interface TokenData {
  id: string;
  email: string;
  role: string;
}
const generateAccessToken = (data: TokenData) => {
  return jwt.sign({ ...data }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
  });
};
const generateRefreshToken = (data: TokenData) => {
  return jwt.sign({ ...data }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
  });
};

const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
};
const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
};

export const token = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
