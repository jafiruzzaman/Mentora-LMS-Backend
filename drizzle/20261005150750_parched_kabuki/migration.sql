ALTER TABLE "courses" DROP CONSTRAINT "courses_title_key";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "price" SET DATA TYPE integer USING "price"::integer;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "discount_price" SET DATA TYPE integer USING "discount_price"::integer;