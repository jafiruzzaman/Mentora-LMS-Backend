CREATE TYPE "status" AS ENUM('PENDING', 'PAID', 'FAILED');--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"price" numeric NOT NULL,
	"total" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"total" numeric NOT NULL,
	"sub_total" numeric NOT NULL,
	"currency" varchar(10) NOT NULL,
	"status" "status" DEFAULT 'PENDING'::"status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id");--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_student_id_users_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id");