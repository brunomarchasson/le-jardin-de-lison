import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- 1. Création des nouveaux types
  DO $$ BEGIN
    CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_page_content_accueil_glanage" AS ENUM('open', 'closed', 'soon');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  -- 2. Création des nouvelles tables
  CREATE TABLE IF NOT EXISTS "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"price" numeric,
  	"stock" numeric,
  	"status" "enum_products_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"flowers_id" integer
  );

  -- 3. RENOMMAGE SÉCURISÉ DES COLONNES
  DO $$ BEGIN
    -- Table écologie
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'page_content_ecologie_items') THEN
      ALTER TABLE "page_content_ecologie_items" RENAME TO "page_content_la_ferme_ecologie_items";
    END IF;

    -- Colonnes Accueil
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='glanage') THEN
      ALTER TABLE "page_content" RENAME COLUMN "glanage" TO "accueil_glanage";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='meteo_fleurs') THEN
      ALTER TABLE "page_content" RENAME COLUMN "meteo_fleurs" TO "accueil_meteo_fleurs";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='hero_image_id') THEN
      ALTER TABLE "page_content" RENAME COLUMN "hero_image_id" TO "accueil_hero_image_id";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='hero_sub_text') THEN
      ALTER TABLE "page_content" RENAME COLUMN "hero_sub_text" TO "accueil_hero_sub_text";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='philosophie_title') THEN
      ALTER TABLE "page_content" RENAME COLUMN "philosophie_title" TO "accueil_philosophie_title";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='philosophie_text') THEN
      ALTER TABLE "page_content" RENAME COLUMN "philosophie_text" TO "accueil_philosophie_text";
    END IF;

    -- Colonnes La Ferme
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='ferme_sub_text') THEN
      ALTER TABLE "page_content" RENAME COLUMN "ferme_sub_text" TO "la_ferme_sub_text";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='histoire_titre') THEN
      ALTER TABLE "page_content" RENAME COLUMN "histoire_titre" TO "la_ferme_histoire_titre";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='histoire_texte') THEN
      ALTER TABLE "page_content" RENAME COLUMN "histoire_texte" TO "la_ferme_histoire_texte";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='histoire_image_id') THEN
      ALTER TABLE "page_content" RENAME COLUMN "histoire_image_id" TO "la_ferme_histoire_image_id";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='ecologie_titre') THEN
      ALTER TABLE "page_content" RENAME COLUMN "ecologie_titre" TO "la_ferme_ecologie_titre";
    END IF;

    -- Colonnes Contact
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='adresse') THEN
      ALTER TABLE "page_content" RENAME COLUMN "adresse" TO "contact_adresse";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='telephone') THEN
      ALTER TABLE "page_content" RENAME COLUMN "telephone" TO "contact_telephone";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='email') THEN
      ALTER TABLE "page_content" RENAME COLUMN "email" TO "contact_email";
    END IF;
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='horaires') THEN
      ALTER TABLE "page_content" RENAME COLUMN "horaires" TO "contact_horaires";
    END IF;
  EXCEPTION WHEN others THEN NULL; END $$;

  -- 4. Conversion du type Enum pour accueil_glanage
  DO $$ BEGIN
    ALTER TABLE "page_content" ALTER COLUMN "accueil_glanage" SET DATA TYPE text;
    DROP TYPE IF EXISTS "public"."enum_page_content_glanage" CASCADE;
    ALTER TABLE "page_content" ALTER COLUMN "accueil_glanage" SET DATA TYPE "public"."enum_page_content_accueil_glanage" USING "accueil_glanage"::"public"."enum_page_content_accueil_glanage";
  EXCEPTION WHEN others THEN NULL; END $$;

  -- 5. Ajout des nouvelles colonnes de titre avec renommage si existantes
  DO $$ BEGIN
    -- Cas spécial ferme_title -> la_ferme_title
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='page_content' AND column_name='ferme_title') THEN
      ALTER TABLE "page_content" RENAME COLUMN "ferme_title" TO "la_ferme_title";
    ELSE
      ALTER TABLE "page_content" ADD COLUMN IF NOT EXISTS "la_ferme_title" varchar DEFAULT 'La Ferme';
    END IF;
    
    ALTER TABLE "page_content" ADD COLUMN IF NOT EXISTS "fleurs_title" varchar DEFAULT 'Nos Fleurs';
    ALTER TABLE "page_content" ADD COLUMN IF NOT EXISTS "blog_title" varchar DEFAULT 'Le Journal du Jardin';
    ALTER TABLE "page_content" ADD COLUMN IF NOT EXISTS "contact_title" varchar DEFAULT 'Contact & Infos';
  EXCEPTION WHEN others THEN NULL; END $$;

  -- 6. Mise à jour de Categories
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "slug" varchar;
  UPDATE "categories" SET "slug" = LOWER(REPLACE("title", ' ', '-')) WHERE "slug" IS NULL;
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "products_id" integer;

  -- 7. Contraintes et Index
  DO $$ BEGIN
    ALTER TABLE "page_content_la_ferme_ecologie_items" DROP CONSTRAINT IF EXISTS "page_content_ecologie_items_parent_id_fk";
    ALTER TABLE "page_content_la_ferme_ecologie_items" ADD CONSTRAINT "page_content_la_ferme_ecologie_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
    
    ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_flowers_fk" FOREIGN KEY ("flowers_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN others THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "products_images_order_idx" ON "products_images" ("_order");
  CREATE INDEX IF NOT EXISTS "products_images_parent_id_idx" ON "products_images" ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" ("slug");
  CREATE INDEX IF NOT EXISTS "page_content_la_ferme_ecologie_items_parent_id_idx" ON "page_content_la_ferme_ecologie_items" ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_content_accueil_accueil_hero_image_idx" ON "page_content" ("accueil_hero_image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "products_images" CASCADE;
    DROP TABLE IF EXISTS "products" CASCADE;
    DROP TABLE IF EXISTS "products_rels" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_products_status" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_page_content_accueil_glanage" CASCADE;
  `)
}
