CREATE TYPE "public"."enum_teams_layout" AS ENUM('grid', 'inline');--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "layout" "enum_teams_layout" DEFAULT 'grid' NOT NULL;