CREATE TYPE "enrollment_status" AS ENUM('pending', 'completed', 'active', 'failed');--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"status" "enrollment_status" DEFAULT 'pending'::"enrollment_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_course_index" UNIQUE("course_id","student_id")
);
--> statement-breakpoint
CREATE INDEX "enrollment_student_id_idx" ON "enrollments" ("student_id");--> statement-breakpoint
CREATE INDEX "enrollment_course_id_idx" ON "enrollments" ("course_id");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_users_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id");