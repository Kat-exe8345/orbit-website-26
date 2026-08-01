CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_media" (
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
	"sizes_logo_url" varchar,
	"sizes_logo_width" numeric,
	"sizes_logo_height" numeric,
	"sizes_logo_mime_type" varchar,
	"sizes_logo_filesize" numeric,
	"sizes_logo_filename" varchar
);
--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_media_id" integer;--> statement-breakpoint
CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "site_media_updated_at_idx" ON "site_media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "site_media_created_at_idx" ON "site_media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "site_media_filename_idx" ON "site_media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "site_media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "site_media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
CREATE INDEX "site_media_sizes_logo_sizes_logo_filename_idx" ON "site_media" USING btree ("sizes_logo_filename");--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_media_fk" FOREIGN KEY ("site_media_id") REFERENCES "public"."site_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_site_media_id_idx" ON "payload_locked_documents_rels" USING btree ("site_media_id");