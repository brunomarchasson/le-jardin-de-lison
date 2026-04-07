import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_content" ADD COLUMN "accueil_where_is_cecile" varchar;
  ALTER TABLE "page_content" ADD COLUMN "accueil_where_is_cecile_enabled" boolean DEFAULT false;
  ALTER TABLE "page_content" ADD COLUMN "le_marche_info_vente_en_ligne" jsonb;
  ALTER TABLE "page_content" ADD COLUMN "contact_pros_section" jsonb;
  ALTER TABLE "page_content" ADD COLUMN "contact_particuliers_section" jsonb;
  ALTER TABLE "page_content" ADD COLUMN "contact_whatsapp" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_content" DROP COLUMN "accueil_where_is_cecile";
  ALTER TABLE "page_content" DROP COLUMN "accueil_where_is_cecile_enabled";
  ALTER TABLE "page_content" DROP COLUMN "le_marche_info_vente_en_ligne";
  ALTER TABLE "page_content" DROP COLUMN "contact_pros_section";
  ALTER TABLE "page_content" DROP COLUMN "contact_particuliers_section";
  ALTER TABLE "page_content" DROP COLUMN "contact_whatsapp";`)
}
