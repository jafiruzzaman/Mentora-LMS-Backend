ALTER TABLE "lessons" DROP CONSTRAINT "lesson_module_id_idx";--> statement-breakpoint
CREATE INDEX "lesson_module_id_idx" ON "lessons" ("module_id");