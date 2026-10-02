/**
 * @file db.ts
 * @description postgres database configuration
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October
 */

import { drizzle } from "drizzle-orm/neon-http";
import { env } from "./env";

export const db = drizzle(env.DATABASE_URL);
