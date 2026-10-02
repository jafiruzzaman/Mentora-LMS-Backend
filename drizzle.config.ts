import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";
export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/database/schema",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
