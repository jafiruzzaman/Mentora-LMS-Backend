/**
 * @file role.middleware.ts
 * @description Check roles middleware
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import type { NextFunction, Request, Response } from "express";

import type { Roles } from "@/constants";
import { AppError } from "@/shared/lib/app-error.lib";

export const roleMiddlewares = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.");
    }
    if (!roles.includes(req.user.role as Roles)) {
      throw new AppError(
        403,
        "You don't have the permission to perform this action."
      );
    }
    next();
  };
};
