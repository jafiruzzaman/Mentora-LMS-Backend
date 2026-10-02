/**
 * @file logger.middleware.ts
 * @description HTTP request logger middleware
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October 2026
 */

import pinoHttp from "pino-http";
import { logger } from "@/config/logger";

export const loggerMiddleware = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) {
      return "error";
    }
    if (res.statusCode >= 400) {
      return "warn";
    }
    return "info";
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed with ${req.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed with ${req.statusCode}`;
  },
});
