ALTER TABLE "member_roles" RENAME TO "roles";--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "member_roles_id" TO "roles_id";--> statement-breakpoint
ALTER TABLE "membership" DROP CONSTRAINT "membership_role_id_member_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_member_roles_fk";
--> statement-breakpoint
DROP INDEX "member_roles_updated_at_idx";--> statement-breakpoint
DROP INDEX "member_roles_created_at_idx";--> statement-breakpoint
DROP INDEX "payload_locked_documents_rels_member_roles_id_idx";--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");