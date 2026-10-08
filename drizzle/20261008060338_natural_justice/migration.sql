ALTER TYPE "status" RENAME TO "order_status";--> statement-breakpoint
ALTER TABLE "order_items" RENAME COLUMN "price" TO "unit_price";--> statement-breakpoint
ALTER TABLE "order_items" RENAME COLUMN "total" TO "total_price";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "status" TO "order_status";