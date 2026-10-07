ALTER TABLE "lessons" RENAME COLUMN "video_url" TO "video_key";--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "video_key" SET DATA TYPE varchar(150) USING "video_key"::varchar(150);