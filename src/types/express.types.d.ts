/**
 * @file express.types.d.ts
 * @description express type declaration file
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th october
 */

export type JwtPayload = {
  id: string;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
