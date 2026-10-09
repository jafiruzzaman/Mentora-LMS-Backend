CREATE TABLE "wishlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "wishlist_unique" UNIQUE("student_id","course_id")
);
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "order_status";--> statement-breakpoint
CREATE TYPE "order_status" AS ENUM('PENDING', 'COMPLETED', 'FAILED');--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" SET DATA TYPE "order_status" USING "order_status"::"order_status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_status" SET DEFAULT 'PENDING'::"order_status";--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_student_id_users_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE;