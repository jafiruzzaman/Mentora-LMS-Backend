/**
 * @file global.middleware.ts
 * @description global error handler
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October 2026
 */

import type { AppError } from "@/shared/lib/app-error.lib";
import type { NextFunction, Request, Response } from "express";

export const globalErrorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    message,
  });
};
