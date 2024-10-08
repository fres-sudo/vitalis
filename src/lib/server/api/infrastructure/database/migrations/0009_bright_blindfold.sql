CREATE TABLE IF NOT EXISTS "passwordResetTable" (
	"id" text PRIMARY KEY NOT NULL,
	"hashed_token" text NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "passwordResetTable_user_id_unique" UNIQUE("user_id")
);

DO $$ BEGIN
 ALTER TABLE "passwordResetTable" ADD CONSTRAINT "passwordResetTable_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
