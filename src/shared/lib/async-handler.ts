/**
 * @file async-handler.ts
 * @description wraps async route handlers and forwards errors to Express
 * @author Mohammad-Jafiruzzaman * @license Apache-2.0
 * @date 3rd October
 */

import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncHandler = (handler: AsyncHandlerType): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
