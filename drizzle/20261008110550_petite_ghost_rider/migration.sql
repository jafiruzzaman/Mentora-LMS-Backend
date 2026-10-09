CREATE TYPE "payment_provider" AS ENUM('STRIPE', 'SSLCOMMERZ');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('PENDING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"stripe_session_id" varchar NOT NULL UNIQUE,
	"payment_status" "payment_status" DEFAULT 'PENDING'::"payment_status" NOT NULL,
	"stripe_payment_intent_id" varchar,
	"amount" integer NOT NULL,
	"currency" varchar DEFAULT 'usd' NOT NULL,
	"payment_provider" "payment_provider" DEFAULT 'STRIPE'::"payment_provider" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;