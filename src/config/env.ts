/**
 * @file env.ts
 * @description env file validation and configuration
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 */

import "dotenv/config";
import dotenv from "dotenv";
import { z } from "zod";

const nodeEnv = process.env.NODE_ENV ?? "development";

const envFileMap = {
  development: ".env.development.local",
  production: ".env.production.local",
  test: ".env.test",
} as const;

const envFile = envFileMap[nodeEnv as keyof typeof envFileMap];

dotenv.config({
  path: envFile,
});

const envSchema = z.object({
  // ============================================================
  // Application
  // ============================================================

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().min(1).max(65535).default(8080),

  API_PREFIX: z.string().min(1).default("/api/v1"),

  APP_URL: z.url().default("http://localhost:8080"),

  FRONTEND_DOMAIN: z.url().default("http://localhost:3000"),

  // ============================================================
  // Database
  // ============================================================

  DATABASE_URL: z.url().min(1, "DATABASE_URL is required"),

  // ============================================================
  // Authentication
  // ============================================================

  ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, "ACCESS_TOKEN_SECRET must be at least 32 characters"),

  ACCESS_TOKEN_EXPIRES_IN: z.string().min(1).default("15m"),

  REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, "REFRESH_TOKEN_SECRET must be at least 32 characters"),

  REFRESH_TOKEN_EXPIRES_IN: z.string().min(1).default("7d"),

  // ============================================================
  // Cloudinary
  // ============================================================

  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),

  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),

  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  // ============================================================
  // SMTP / Nodemailer
  // ============================================================

  SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),

  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),

  SMTP_EMAIL: z.email("SMTP_EMAIL must be a valid email"),

  SMTP_FROM: z.email("SMTP_FROM must be a valid email"),

  SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),

  SMTP_SECURE: z.coerce.boolean().default(false),

  // ============================================================
  // Redis
  // ============================================================

  REDIS_HOST: z.string().min(1).default("localhost"),

  REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),

  REDIS_PASSWORD: z.string().optional(),

  REDIS_URL: z.url().optional(),

  // ============================================================
  // BullMQ
  // ============================================================

  QUEUE_PREFIX: z.string().min(1).default("lms"),

  EMAIL_QUEUE_NAME: z.string().min(1).default("email"),

  NOTIFICATION_QUEUE_NAME: z.string().min(1).default("notification"),

  ANALYTICS_QUEUE_NAME: z.string().min(1).default("analytics"),

  // ============================================================
  // Stripe
  // ============================================================

  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),

  STRIPE_PUBLISHABLE_KEY: z
    .string()
    .min(1, "STRIPE_PUBLISHABLE_KEY is required"),

  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),

  STRIPE_CURRENCY: z.string().length(3).default("usd"),

  // ============================================================
  // Security
  // ============================================================

  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),

  CORS_ORIGIN: z.url().default("http://localhost:3000"),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),

  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),

  // ============================================================
  // File Upload
  // ============================================================

  MAX_FILE_SIZE: z.coerce
    .number()
    .int()
    .positive()
    .default(10 * 1024 * 1024),

  // ============================================================
  // Logging
  // ============================================================

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),

  // ============================================================
  // Email Features
  // ============================================================

  EMAIL_VERIFICATION_EXPIRES_IN: z.string().default("15m"),

  PASSWORD_RESET_EXPIRES_IN: z.string().default("15m"),

  WELCOME_EMAIL_ENABLED: z.coerce.boolean().default(true),
  LOGIN_NOTIFICATION_ENABLED: z.coerce.boolean().default(true),

  COURSE_ENROLLMENT_EMAIL_ENABLED: z.coerce.boolean().default(true),

  COURSE_COMPLETION_EMAIL_ENABLED: z.coerce.boolean().default(true),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid environment variables:");

  console.error(z.prettifyError(result.error));

  process.exit(1);
}

/**
 * Validated application environment.
 */
export const env = result.data;
