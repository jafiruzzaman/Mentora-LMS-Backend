CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"message" varchar(2000) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_student_course_unique" UNIQUE("course_id","student_id")
);
--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "cart_student_unique" UNIQUE("student_id");--> statement-breakpoint
CREATE INDEX "reviews_course_id_idx" ON "reviews" ("course_id");--> statement-breakpoint
CREATE INDEX "reviews_student_id_idx" ON "reviews" ("student_id");--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_student_id_users_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE;