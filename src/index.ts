/**
 * @file index.ts
 * @description entry point of the application
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 2nd October
 */

/* ================================================================= */
//  Node Modules
/* ================================================================= */
import { Server } from "node:http";

/* ================================================================= */
//  Custom Modules
/* ================================================================= */
import { app } from "@/app";
import { db } from "@/config/db";
import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { AppError } from "@/shared/lib/app-error.lib";

let server: Server;
/* ================================================================= */
/* Graceful Shutdown */
/* ================================================================= */
const bootStrap = async (): Promise<void> => {
  try {
    await db.execute("SELECT 1");
    server = app.listen(env.PORT, () => {
      logger.info(`Mentora API is running ${env.APP_URL}${env.API_PREFIX}`);
    });
  } catch (error) {
    if (error instanceof AppError) {
      logger.error(error.message);
    }
    logger.error(error);
    process.exit(1);
  }
};

/* ================================================================= */
/* Graceful Shutdown */
/* ================================================================= */
const shutDown = async (signal: string): Promise<void> => {
  logger.info(`${signal} received. Server is shutting down...`);
  try {
    server = server.close();
    logger.info(`server shutDown successfully`);
    process.exit(0);
  } catch (error) {
    if (error instanceof AppError) {
      logger.error(error.message);
    }
    logger.error(error);
    process.exit(1);
  }
};
process.on("SIGINT", () => {
  void shutDown("SIGINT");
});
process.on("SIGTERM", () => {
  void shutDown("SIGTERM");
});
process.on("unhandledRejection", (reason) => {
  logger.error(reason, "unhandled rejection");
  void shutDown("unhandledRejection");
});
process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught exception");
  process.exit(1);
});

void bootStrap();
