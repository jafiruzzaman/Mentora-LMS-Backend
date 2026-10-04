/**
 * @file auth.middleware.ts
 * @description auth middleware configuration
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th october
 */

import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/lib/app-error.lib";
import type { JwtPayload } from "@/types/express.types";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    throw new AppError(401, "Authorization header is required");
  }
  if (!authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Bearer token is required");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AppError(401, "Token is required");
  }
  const decodedToken = verify(token, env.ACCESS_TOKEN_SECRET);
  console.log(`bearer token `, decodedToken);
  req.user = decodedToken as JwtPayload;
  next();
};
