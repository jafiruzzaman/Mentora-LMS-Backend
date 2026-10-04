CREATE TYPE "role" AS ENUM('student', 'admin', 'instructor');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'student'::"role" NOT NULL;