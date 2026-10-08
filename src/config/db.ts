/**
 * @file db.ts
 * @description postgres database configuration
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October
 */

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
});
