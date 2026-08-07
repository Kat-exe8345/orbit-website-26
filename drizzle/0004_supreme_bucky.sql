CREATE TABLE "about_us_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" varchar NOT NULL,
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
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "about_us_media_id" integer;--> statement-breakpoint
CREATE INDEX "about_us_media_updated_at_idx" ON "about_us_media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "about_us_media_created_at_idx" ON "about_us_media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "about_us_media_filename_idx" ON "about_us_media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "about_us_media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "about_us_media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_us_media_fk" FOREIGN KEY ("about_us_media_id") REFERENCES "public"."about_us_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_about_us_media_id_idx" ON "payload_locked_documents_rels" USING btree ("about_us_media_id");