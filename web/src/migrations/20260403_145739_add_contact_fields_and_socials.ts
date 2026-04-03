import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_license_type" AS ENUM('public_domain', 'cc_by', 'purchased', 'copyright', 'unknown');
  DROP INDEX "categories_slug_idx";
  DROP INDEX "products_slug_idx";
  ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "page_content" ALTER COLUMN "accueil_hero_sub_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "accueil_philosophie_title" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "accueil_philosophie_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_title" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_sub_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_histoire_titre" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_ecologie_titre" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "fleurs_title" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "fleurs_sub_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "blog_title" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "blog_sub_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_title" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_sub_text" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_adresse" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_telephone" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_email" DROP DEFAULT;
  ALTER TABLE "page_content" ALTER COLUMN "contact_horaires" DROP DEFAULT;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "media" ADD COLUMN "attribution" varchar;
  ALTER TABLE "media" ADD COLUMN "license_type" "enum_media_license_type" DEFAULT 'unknown';
  ALTER TABLE "media" ADD COLUMN "source_url" varchar;
  ALTER TABLE "media" ADD COLUMN "license_notes" varchar;
  ALTER TABLE "posts" ADD COLUMN "slug" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "page_content" ADD COLUMN "le_marche_title" varchar;
  ALTER TABLE "page_content" ADD COLUMN "le_marche_sub_text" varchar;
  ALTER TABLE "page_content" ADD COLUMN "contact_nom_organisation" varchar;
  ALTER TABLE "page_content" ADD COLUMN "contact_code_postal" varchar;
  ALTER TABLE "page_content" ADD COLUMN "contact_ville" varchar;
  ALTER TABLE "page_content" ADD COLUMN "contact_instagram" varchar;
  ALTER TABLE "page_content" ADD COLUMN "contact_facebook" varchar;
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "flowers_slug_idx" ON "flowers" USING btree ("slug");
  CREATE INDEX "_flowers_v_version_version_slug_idx" ON "_flowers_v" USING btree ("version_slug");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "products_slug_idx" ON "products" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "posts_slug_idx";
  DROP INDEX "_posts_v_version_version_slug_idx";
  DROP INDEX "flowers_slug_idx";
  DROP INDEX "_flowers_v_version_version_slug_idx";
  DROP INDEX "categories_slug_idx";
  DROP INDEX "products_slug_idx";
  ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "page_content" ALTER COLUMN "accueil_hero_sub_text" SET DEFAULT 'Cultiver la beauté sauvage, au rythme lent des saisons.';
  ALTER TABLE "page_content" ALTER COLUMN "accueil_philosophie_title" SET DEFAULT 'Des fleurs qui ont du sens';
  ALTER TABLE "page_content" ALTER COLUMN "accueil_philosophie_text" SET DEFAULT 'Cultivées avec amour et respect de la biodiversité, nos fleurs suivent le cycle naturel des saisons. Du premier perce-neige aux derniers dahlias d''automne, chaque tige raconte une histoire de terre, de pluie et de soleil. Pas de serres chauffées, pas de pesticides, juste la nature dans ce qu''elle a de plus beau.';
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_title" SET DEFAULT 'La Ferme';
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_sub_text" SET DEFAULT 'Une démarche engagée pour une floriculture douce et respectueuse.';
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_histoire_titre" SET DEFAULT 'Notre Histoire';
  ALTER TABLE "page_content" ALTER COLUMN "la_ferme_ecologie_titre" SET DEFAULT 'Démarche Écologique';
  ALTER TABLE "page_content" ALTER COLUMN "fleurs_title" SET DEFAULT 'Nos Fleurs';
  ALTER TABLE "page_content" ALTER COLUMN "fleurs_sub_text" SET DEFAULT 'Découvrez les variétés qui s''épanouissent actuellement au jardin.';
  ALTER TABLE "page_content" ALTER COLUMN "blog_title" SET DEFAULT 'Le Journal du Jardin';
  ALTER TABLE "page_content" ALTER COLUMN "blog_sub_text" SET DEFAULT 'Nouvelles de la terre, conseils de culture et vie de la micro-ferme.';
  ALTER TABLE "page_content" ALTER COLUMN "contact_title" SET DEFAULT 'Contact & Infos';
  ALTER TABLE "page_content" ALTER COLUMN "contact_sub_text" SET DEFAULT 'Une question ? Envie de venir nous voir ?';
  ALTER TABLE "page_content" ALTER COLUMN "contact_adresse" SET DEFAULT 'Au jardin de Lison
  13610 Le puy sainte réparade';
  ALTER TABLE "page_content" ALTER COLUMN "contact_telephone" SET DEFAULT '+33 7 49 59 09 94';
  ALTER TABLE "page_content" ALTER COLUMN "contact_email" SET DEFAULT 'hello@aujardindelison.fr';
  ALTER TABLE "page_content" ALTER COLUMN "contact_horaires" SET DEFAULT '(Ouvert selon météo des fleurs)';
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "media" DROP COLUMN "attribution";
  ALTER TABLE "media" DROP COLUMN "license_type";
  ALTER TABLE "media" DROP COLUMN "source_url";
  ALTER TABLE "media" DROP COLUMN "license_notes";
  ALTER TABLE "posts" DROP COLUMN "slug";
  ALTER TABLE "_posts_v" DROP COLUMN "version_slug";
  ALTER TABLE "page_content" DROP COLUMN "le_marche_title";
  ALTER TABLE "page_content" DROP COLUMN "le_marche_sub_text";
  ALTER TABLE "page_content" DROP COLUMN "contact_nom_organisation";
  ALTER TABLE "page_content" DROP COLUMN "contact_code_postal";
  ALTER TABLE "page_content" DROP COLUMN "contact_ville";
  ALTER TABLE "page_content" DROP COLUMN "contact_instagram";
  ALTER TABLE "page_content" DROP COLUMN "contact_facebook";
  DROP TYPE "public"."enum_media_license_type";`)
}
