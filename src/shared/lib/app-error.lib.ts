/**
 * @file app-error.lib.ts
 * @description handle app error
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October 2026
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true
  ) {
    super(message);
    ((this.name = "app-error"), (this.statusCode = statusCode));
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
