/**
 * @file not-found.middleware.ts
 * @description Handles requests to undefined routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October 2026
 */

import type { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};
