import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_content" ADD COLUMN "fleurs_catalogue_title" varchar;
  ALTER TABLE "page_content" ADD COLUMN "le_marche_catalogue_title" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_content" DROP COLUMN "fleurs_catalogue_title";
  ALTER TABLE "page_content" DROP COLUMN "le_marche_catalogue_title";`)
}
