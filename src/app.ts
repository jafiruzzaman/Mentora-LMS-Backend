/**
 * @file app.ts
 * @description express app configuration & middleware setup
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October
 */

/* ================================================================= */
//  Node Modules
/* ================================================================= */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

/* ================================================================= */
//  Custom Modules
/* ================================================================= */
import { env } from "@/config/env";
import compression from "compression";
import { loggerMiddleware } from "@/shared/middlewares/logger.middleware";
import { notFoundMiddleware } from "@/shared/middlewares/not-found.middleware";
import { globalErrorMiddleware } from "@/shared/middlewares/global.middleware";

const app = express();

/* ================================================================= */
//  logger middlewares
/* ================================================================= */
app.use(loggerMiddleware);

/* ================================================================= */
// Helmet Configuration
/* ================================================================= */
app.use(helmet());

/* ================================================================= */
//  cors Configuration
/* ================================================================= */
app.use(
  cors({
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    origin: env.FRONTEND_DOMAIN,
    credentials: true,
  })
);
/* ================================================================= */
//  cookie-parser Configuration
/* ================================================================= */
app.use(cookieParser());

/* ================================================================= */
// Express Json Configuration
/* ================================================================= */
app.use(
  express.json({
    limit: "1mb",
  })
);
/* ================================================================= */
// Compression Configuration
/* ================================================================= */
app.use(compression({ threshold: "1kb" }));

/* ================================================================= */
//  API Routes
/* ================================================================= */

/* ================================================================= */
// Not Found Middleware
/* ================================================================= */
app.use(notFoundMiddleware);
/* ================================================================= */
// Global Error Handler
/* ================================================================= */
app.use(globalErrorMiddleware);
/* ================================================================= */
// Export app
/* ================================================================= */
