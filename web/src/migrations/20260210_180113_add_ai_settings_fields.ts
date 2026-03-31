import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "ai_default_provider" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "gemini_api_key" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "claude_api_key" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "openai_api_key" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "ai_system_prompt" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "ai_examples" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "ai_default_provider";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "gemini_api_key";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "claude_api_key";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "openai_api_key";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "ai_system_prompt";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "ai_examples";
  `)
}