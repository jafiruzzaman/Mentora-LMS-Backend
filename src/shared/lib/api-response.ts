/**
 * @file api-response.ts
 * @description API response utility function
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import type { Request, Response } from "express";

interface ApiResponseOptions<T> {
  res: Response;
  success?: boolean;
  statusCode: number;
  req?: Request;
  message: string;
  data?: T;
}
const apiResponse = <T>({
  res,
  success = true,
  statusCode,
  req,
  message,
  data,
}: ApiResponseOptions<T>) => {
  return res.status(statusCode).json({
    success,
    method: req?.method,
    message,
    data,
  });
};

export { apiResponse };
