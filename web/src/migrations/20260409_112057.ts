import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_content_accueil_seo_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "page_content" ADD COLUMN "accueil_seo_section_enabled" boolean DEFAULT true;
  ALTER TABLE "page_content_accueil_seo_items" ADD CONSTRAINT "page_content_accueil_seo_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_content_accueil_seo_items_order_idx" ON "page_content_accueil_seo_items" USING btree ("_order");
  CREATE INDEX "page_content_accueil_seo_items_parent_id_idx" ON "page_content_accueil_seo_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_content_accueil_seo_items" CASCADE;
  ALTER TABLE "page_content" DROP COLUMN "accueil_seo_section_enabled";`)
}
