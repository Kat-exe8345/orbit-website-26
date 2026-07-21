CREATE TYPE "public"."enum_members_department" AS ENUM('cse', 'ece', 'eee', 'ice', 'me', 'mme', 'pe', 'ce', 'ch');--> statement-breakpoint
CREATE TYPE "public"."enum_members_social_links_platform" AS ENUM('instagram', 'linkedin', 'github', 'website');--> statement-breakpoint
CREATE TYPE "public"."enum_membership_study_year" AS ENUM('year1', 'year2', 'year3', 'year4');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_users_roles" AS ENUM('super-admin', 'admin', 'editor', 'user');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar
);
--> statement-breakpoint
CREATE TABLE "member_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"display_order" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"profile_picture_id" integer,
	"department" "enum_members_department" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" "enum_members_social_links_platform" NOT NULL,
	"url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "membership" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"year_id" integer NOT NULL,
	"study_year" "enum_membership_study_year" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"payload_users_id" integer,
	"media_id" integer,
	"members_id" integer,
	"membership_id" integer,
	"member_roles_id" integer,
	"teams_id" integer,
	"year_id" integer,
	"team_media_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"payload_users_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"roles" "enum_payload_users_roles" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "payload_users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_member_card_url" varchar,
	"sizes_member_card_width" numeric,
	"sizes_member_card_height" numeric,
	"sizes_member_card_mime_type" varchar,
	"sizes_member_card_filesize" numeric,
	"sizes_member_card_filename" varchar
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"team_logo_id" integer,
	"display_order" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "year" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"start_year" numeric NOT NULL,
	"end_year" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_profile_picture_id_team_media_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."team_media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members_social_links" ADD CONSTRAINT "members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_role_id_member_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."member_roles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_year_id_year_id_fk" FOREIGN KEY ("year_id") REFERENCES "public"."year"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_users_fk" FOREIGN KEY ("payload_users_id") REFERENCES "public"."payload_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_membership_fk" FOREIGN KEY ("membership_id") REFERENCES "public"."membership"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_member_roles_fk" FOREIGN KEY ("member_roles_id") REFERENCES "public"."member_roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_year_fk" FOREIGN KEY ("year_id") REFERENCES "public"."year"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_media_fk" FOREIGN KEY ("team_media_id") REFERENCES "public"."team_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_users_fk" FOREIGN KEY ("payload_users_id") REFERENCES "public"."payload_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_users_sessions" ADD CONSTRAINT "payload_users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_team_logo_id_media_id_fk" FOREIGN KEY ("team_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
CREATE INDEX "member_roles_updated_at_idx" ON "member_roles" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "member_roles_created_at_idx" ON "member_roles" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "members_profile_picture_idx" ON "members" USING btree ("profile_picture_id");--> statement-breakpoint
CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "members_social_links_order_idx" ON "members_social_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "members_social_links_parent_id_idx" ON "members_social_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "membership_member_idx" ON "membership" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "membership_team_idx" ON "membership" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "membership_role_idx" ON "membership" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "membership_year_idx" ON "membership" USING btree ("year_id");--> statement-breakpoint
CREATE INDEX "membership_updated_at_idx" ON "membership" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "membership_created_at_idx" ON "membership" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_payload_users_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_users_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_membership_id_idx" ON "payload_locked_documents_rels" USING btree ("membership_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_member_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("member_roles_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("teams_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_year_id_idx" ON "payload_locked_documents_rels" USING btree ("year_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_team_media_id_idx" ON "payload_locked_documents_rels" USING btree ("team_media_id");--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_payload_users_id_idx" ON "payload_preferences_rels" USING btree ("payload_users_id");--> statement-breakpoint
CREATE INDEX "payload_users_updated_at_idx" ON "payload_users" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_users_created_at_idx" ON "payload_users" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_users_email_idx" ON "payload_users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_users_username_idx" ON "payload_users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "payload_users_sessions_order_idx" ON "payload_users_sessions" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "payload_users_sessions_parent_id_idx" ON "payload_users_sessions" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "team_media_updated_at_idx" ON "team_media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "team_media_created_at_idx" ON "team_media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "team_media_filename_idx" ON "team_media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "team_media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "team_media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
CREATE INDEX "team_media_sizes_member_card_sizes_member_card_filename_idx" ON "team_media" USING btree ("sizes_member_card_filename");--> statement-breakpoint
CREATE INDEX "teams_team_logo_idx" ON "teams" USING btree ("team_logo_id");--> statement-breakpoint
CREATE INDEX "teams_updated_at_idx" ON "teams" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "teams_created_at_idx" ON "teams" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "year_updated_at_idx" ON "year" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "year_created_at_idx" ON "year" USING btree ("created_at");