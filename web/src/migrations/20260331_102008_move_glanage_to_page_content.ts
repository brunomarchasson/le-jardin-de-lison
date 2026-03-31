import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- 1. Création des tables avec glanage en TEXT
  CREATE TABLE IF NOT EXISTS "page_content_ecologie_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"glanage" text, 
  	"meteo_fleurs" varchar,
  	"hero_image_id" integer, 
  	"hero_sub_text" varchar DEFAULT 'Cultiver la beauté sauvage, au rythme lent des saisons.',
  	"philosophie_title" varchar DEFAULT 'Des fleurs qui ont du sens',
  	"philosophie_text" varchar DEFAULT 'Cultivées avec amour et respect de la biodiversité, nos fleurs suivent le cycle naturel des saisons...',
  	"ferme_sub_text" varchar,
  	"histoire_titre" varchar DEFAULT 'Notre Histoire',
  	"histoire_texte" jsonb,
  	"histoire_image_id" integer,
  	"ecologie_titre" varchar DEFAULT 'Démarche Écologique',
  	"fleurs_sub_text" varchar,
  	"blog_sub_text" varchar,
  	"contact_sub_text" varchar,
  	"adresse" varchar DEFAULT 'Au jardin de Lison\n13610 Le puy sainte réparade',
  	"telephone" varchar,
  	"email" varchar,
  	"horaires" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  -- 2. TRANSFERT DES DONNÉES (Safe)
  DO $$ BEGIN
    INSERT INTO "page_content" ("id", "glanage", "meteo_fleurs", "updated_at", "created_at")
    SELECT 1, "glanage"::text, "meteo_fleurs", now(), now() FROM "site_settings"
    ON CONFLICT (id) DO UPDATE SET 
      "glanage" = EXCLUDED.glanage, 
      "meteo_fleurs" = EXCLUDED.meteo_fleurs;
  EXCEPTION WHEN others THEN NULL; END $$;

  -- 3. Mise en place du type Enum correct
  DO $$ BEGIN
    DROP TYPE IF EXISTS "public"."enum_page_content_glanage" CASCADE;
    CREATE TYPE "public"."enum_page_content_glanage" AS ENUM('open', 'closed', 'soon');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  -- 4. Conversion de la colonne vers l'Enum (Version corrigée sans conflit de default)
  DO $$ BEGIN
    -- On s'assure que les données sont valides pour l'enum
    UPDATE "page_content" SET "glanage" = 'closed' WHERE "glanage" NOT IN ('open', 'closed', 'soon') OR "glanage" IS NULL;
    
    -- On supprime toute valeur par défaut avant de changer le type
    ALTER TABLE "page_content" ALTER COLUMN "glanage" DROP DEFAULT;
    
    -- On change le type
    ALTER TABLE "page_content" ALTER COLUMN "glanage" SET DATA TYPE "public"."enum_page_content_glanage" USING "glanage"::"public"."enum_page_content_glanage";
    
    -- On remet la valeur par défaut avec le bon type
    ALTER TABLE "page_content" ALTER COLUMN "glanage" SET DEFAULT 'closed'::"public"."enum_page_content_glanage";
  EXCEPTION WHEN others THEN 
    RAISE NOTICE 'Erreur lors de la conversion de glanage, conservation du type text';
  END $$;

  -- 5. Nettoyage final
  DO $$ BEGIN
    DROP TABLE IF EXISTS "pages" CASCADE;
    DROP TABLE IF EXISTS "_pages_v" CASCADE;
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "glanage";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "meteo_fleurs";
    DROP TYPE IF EXISTS "public"."enum_pages_status" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_status" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_site_settings_glanage" CASCADE;
  EXCEPTION WHEN others THEN NULL; END $$;

  -- Index et Contraintes
  DO $$ BEGIN
    ALTER TABLE "page_content_ecologie_items" ADD CONSTRAINT "page_content_ecologie_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "page_content" ADD CONSTRAINT "page_content_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "page_content" ADD CONSTRAINT "page_content_histoire_image_id_media_id_fk" FOREIGN KEY ("histoire_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "page_content_ecologie_items_order_idx" ON "page_content_ecologie_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "page_content_ecologie_items_parent_id_idx" ON "page_content_ecologie_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "page_content_hero_image_idx" ON "page_content" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "page_content_histoire_image_idx" ON "page_content" USING btree ("histoire_image_id");
  EXCEPTION WHEN others THEN NULL; END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "page_content_ecologie_items" CASCADE;
  DROP TABLE IF EXISTS "page_content" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_page_content_glanage" CASCADE;
  `)
}
