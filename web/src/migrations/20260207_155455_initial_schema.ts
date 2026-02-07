import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, _payload, _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_flowers_season" AS ENUM('spring', 'summer', 'autumn', 'winter');
  CREATE TYPE "public"."enum_flowers_sowing_period" AS ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
  CREATE TYPE "public"."enum_flowers_harvest_period" AS ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
  CREATE TYPE "public"."enum_flowers_water_needs" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_flowers_sun_exposure" AS ENUM('shadow', 'part_shade', 'sun');
  CREATE TYPE "public"."enum_flowers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__flowers_v_version_season" AS ENUM('spring', 'summer', 'autumn', 'winter');
  CREATE TYPE "public"."enum__flowers_v_version_sowing_period" AS ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
  CREATE TYPE "public"."enum__flowers_v_version_harvest_period" AS ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');
  CREATE TYPE "public"."enum__flowers_v_version_water_needs" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum__flowers_v_version_sun_exposure" AS ENUM('shadow', 'part_shade', 'sun');
  CREATE TYPE "public"."enum__flowers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cultivation_logs_action" AS ENUM('sowing', 'planting', 'care', 'observation', 'harvest');
  CREATE TYPE "public"."enum_site_settings_glanage" AS ENUM('open', 'closed', 'soon');
  CREATE TYPE "public"."enum_site_settings_ai_provider" AS ENUM('gemini', 'anthropic', 'openai');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
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
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"content" jsonb,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published_date" timestamp(3) with time zone,
  	"category_id" integer,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_category_id" integer,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "flowers_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "flowers_season" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_flowers_season",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "flowers_sowing_period" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_flowers_sowing_period",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "flowers_harvest_period" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_flowers_harvest_period",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "flowers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"price" numeric,
  	"stock" numeric DEFAULT 0,
  	"water_needs" "enum_flowers_water_needs",
  	"sun_exposure" "enum_flowers_sun_exposure",
  	"technical_notes" varchar,
  	"status" "enum_flowers_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_flowers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_flowers_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_flowers_v_version_season" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__flowers_v_version_season",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_flowers_v_version_sowing_period" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__flowers_v_version_sowing_period",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_flowers_v_version_harvest_period" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__flowers_v_version_harvest_period",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_flowers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_price" numeric,
  	"version_stock" numeric DEFAULT 0,
  	"version_water_needs" "enum__flowers_v_version_water_needs",
  	"version_sun_exposure" "enum__flowers_v_version_sun_exposure",
  	"version_technical_notes" varchar,
  	"version_status" "enum__flowers_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__flowers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "cultivation_logs_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "cultivation_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"flower_id" integer NOT NULL,
  	"action" "enum_cultivation_logs_action" NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"flowers_id" integer,
  	"cultivation_logs_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"glanage" "enum_site_settings_glanage" DEFAULT 'closed',
  	"meteo_fleurs" varchar,
  	"ai_provider" "enum_site_settings_ai_provider" DEFAULT 'gemini',
  	"ai_api_key" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flowers_images" ADD CONSTRAINT "flowers_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flowers_images" ADD CONSTRAINT "flowers_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flowers_season" ADD CONSTRAINT "flowers_season_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flowers_sowing_period" ADD CONSTRAINT "flowers_sowing_period_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flowers_harvest_period" ADD CONSTRAINT "flowers_harvest_period_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flowers_v_version_images" ADD CONSTRAINT "_flowers_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_flowers_v_version_images" ADD CONSTRAINT "_flowers_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_flowers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flowers_v_version_season" ADD CONSTRAINT "_flowers_v_version_season_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_flowers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flowers_v_version_sowing_period" ADD CONSTRAINT "_flowers_v_version_sowing_period_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_flowers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flowers_v_version_harvest_period" ADD CONSTRAINT "_flowers_v_version_harvest_period_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_flowers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flowers_v" ADD CONSTRAINT "_flowers_v_parent_id_flowers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flowers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cultivation_logs_photos" ADD CONSTRAINT "cultivation_logs_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cultivation_logs_photos" ADD CONSTRAINT "cultivation_logs_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cultivation_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cultivation_logs" ADD CONSTRAINT "cultivation_logs_flower_id_flowers_id_fk" FOREIGN KEY ("flower_id") REFERENCES "public"."flowers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_flowers_fk" FOREIGN KEY ("flowers_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cultivation_logs_fk" FOREIGN KEY ("cultivation_logs_id") REFERENCES "public"."cultivation_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "flowers_images_order_idx" ON "flowers_images" USING btree ("_order");
  CREATE INDEX "flowers_images_parent_id_idx" ON "flowers_images" USING btree ("_parent_id");
  CREATE INDEX "flowers_images_image_idx" ON "flowers_images" USING btree ("image_id");
  CREATE INDEX "flowers_season_order_idx" ON "flowers_season" USING btree ("order");
  CREATE INDEX "flowers_season_parent_idx" ON "flowers_season" USING btree ("parent_id");
  CREATE INDEX "flowers_sowing_period_order_idx" ON "flowers_sowing_period" USING btree ("order");
  CREATE INDEX "flowers_sowing_period_parent_idx" ON "flowers_sowing_period" USING btree ("parent_id");
  CREATE INDEX "flowers_harvest_period_order_idx" ON "flowers_harvest_period" USING btree ("order");
  CREATE INDEX "flowers_harvest_period_parent_idx" ON "flowers_harvest_period" USING btree ("parent_id");
  CREATE INDEX "flowers_updated_at_idx" ON "flowers" USING btree ("updated_at");
  CREATE INDEX "flowers_created_at_idx" ON "flowers" USING btree ("created_at");
  CREATE INDEX "flowers__status_idx" ON "flowers" USING btree ("_status");
  CREATE INDEX "_flowers_v_version_images_order_idx" ON "_flowers_v_version_images" USING btree ("_order");
  CREATE INDEX "_flowers_v_version_images_parent_id_idx" ON "_flowers_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_flowers_v_version_images_image_idx" ON "_flowers_v_version_images" USING btree ("image_id");
  CREATE INDEX "_flowers_v_version_season_order_idx" ON "_flowers_v_version_season" USING btree ("order");
  CREATE INDEX "_flowers_v_version_season_parent_idx" ON "_flowers_v_version_season" USING btree ("parent_id");
  CREATE INDEX "_flowers_v_version_sowing_period_order_idx" ON "_flowers_v_version_sowing_period" USING btree ("order");
  CREATE INDEX "_flowers_v_version_sowing_period_parent_idx" ON "_flowers_v_version_sowing_period" USING btree ("parent_id");
  CREATE INDEX "_flowers_v_version_harvest_period_order_idx" ON "_flowers_v_version_harvest_period" USING btree ("order");
  CREATE INDEX "_flowers_v_version_harvest_period_parent_idx" ON "_flowers_v_version_harvest_period" USING btree ("parent_id");
  CREATE INDEX "_flowers_v_parent_idx" ON "_flowers_v" USING btree ("parent_id");
  CREATE INDEX "_flowers_v_version_version_updated_at_idx" ON "_flowers_v" USING btree ("version_updated_at");
  CREATE INDEX "_flowers_v_version_version_created_at_idx" ON "_flowers_v" USING btree ("version_created_at");
  CREATE INDEX "_flowers_v_version_version__status_idx" ON "_flowers_v" USING btree ("version__status");
  CREATE INDEX "_flowers_v_created_at_idx" ON "_flowers_v" USING btree ("created_at");
  CREATE INDEX "_flowers_v_updated_at_idx" ON "_flowers_v" USING btree ("updated_at");
  CREATE INDEX "_flowers_v_latest_idx" ON "_flowers_v" USING btree ("latest");
  CREATE INDEX "cultivation_logs_photos_order_idx" ON "cultivation_logs_photos" USING btree ("_order");
  CREATE INDEX "cultivation_logs_photos_parent_id_idx" ON "cultivation_logs_photos" USING btree ("_parent_id");
  CREATE INDEX "cultivation_logs_photos_photo_idx" ON "cultivation_logs_photos" USING btree ("photo_id");
  CREATE INDEX "cultivation_logs_flower_idx" ON "cultivation_logs" USING btree ("flower_id");
  CREATE INDEX "cultivation_logs_updated_at_idx" ON "cultivation_logs" USING btree ("updated_at");
  CREATE INDEX "cultivation_logs_created_at_idx" ON "cultivation_logs" USING btree ("created_at");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_flowers_id_idx" ON "payload_locked_documents_rels" USING btree ("flowers_id");
  CREATE INDEX "payload_locked_documents_rels_cultivation_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("cultivation_logs_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, _payload, _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "flowers_images" CASCADE;
  DROP TABLE "flowers_season" CASCADE;
  DROP TABLE "flowers_sowing_period" CASCADE;
  DROP TABLE "flowers_harvest_period" CASCADE;
  DROP TABLE "flowers" CASCADE;
  DROP TABLE "_flowers_v_version_images" CASCADE;
  DROP TABLE "_flowers_v_version_season" CASCADE;
  DROP TABLE "_flowers_v_version_sowing_period" CASCADE;
  DROP TABLE "_flowers_v_version_harvest_period" CASCADE;
  DROP TABLE "_flowers_v" CASCADE;
  DROP TABLE "cultivation_logs_photos" CASCADE;
  DROP TABLE "cultivation_logs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_flowers_season";
  DROP TYPE "public"."enum_flowers_sowing_period";
  DROP TYPE "public"."enum_flowers_harvest_period";
  DROP TYPE "public"."enum_flowers_water_needs";
  DROP TYPE "public"."enum_flowers_sun_exposure";
  DROP TYPE "public"."enum_flowers_status";
  DROP TYPE "public"."enum__flowers_v_version_season";
  DROP TYPE "public"."enum__flowers_v_version_sowing_period";
  DROP TYPE "public"."enum__flowers_v_version_harvest_period";
  DROP TYPE "public"."enum__flowers_v_version_water_needs";
  DROP TYPE "public"."enum__flowers_v_version_sun_exposure";
  DROP TYPE "public"."enum__flowers_v_version_status";
  DROP TYPE "public"."enum_cultivation_logs_action";
  DROP TYPE "public"."enum_site_settings_glanage";
  DROP TYPE "public"."enum_site_settings_ai_provider";`)
}
