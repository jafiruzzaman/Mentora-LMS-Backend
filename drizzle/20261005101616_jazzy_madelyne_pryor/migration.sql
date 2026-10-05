CREATE TYPE "course_level" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "course_status" AS ENUM('DRAFT', 'PENDING', 'PUBLISHED', 'ARCHIVED', 'BANNED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "account_status" AS ENUM('active', 'banned', 'suspended');--> statement-breakpoint
CREATE TYPE "role" AS ENUM('student', 'admin', 'instructor');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100),
	"slug" varchar(150),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"instructor_id" uuid NOT NULL,
	"title" varchar(200) NOT NULL UNIQUE,
	"slug" varchar(255) NOT NULL UNIQUE,
	"category_id" uuid NOT NULL,
	"sub_category_id" uuid,
	"description" text,
	"thumbnail" text,
	"trailer" text,
	"level" "course_level",
	"status" "course_status" DEFAULT 'DRAFT'::"course_status" NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"discount_price" numeric(10,2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"category_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL UNIQUE,
	"slug" varchar(120) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"user_name" varchar(100) NOT NULL UNIQUE,
	"role" "role" DEFAULT 'student'::"role" NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255),
	"phone" varchar(50),
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"status" "account_status" DEFAULT 'active'::"account_status" NOT NULL,
	"email_verification_token" varchar(255),
	"email_verification_expires_at" timestamp with time zone,
	"reset_password_verification_token" varchar(255),
	"reset_password_verification_expires_at" timestamp with time zone,
	"refresh_token" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "categories_name_unique" ON "categories" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX "sub_categories_category_id_idx" ON "sub_categories" ("category_id");--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_users_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_sub_category_id_sub_categories_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;