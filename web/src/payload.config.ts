import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { fr } from '@payloadcms/translations/languages/fr'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Flowers } from './collections/Flowers'
import { CultivationLogs } from './collections/CultivationLogs'
import { Categories } from './collections/Categories'
import { SiteSettings } from './globals/SiteSettings'
import { AIFactory } from './lib/ai/AIFactory'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  endpoints: [
    {
      path: '/ai/generate-full-post',
      method: 'post',
      handler: async (req) => {
        if (!req.user || !req.json) return Response.json({ error: 'Unauthorized or missing body' }, { status: 401 })
        
        const { prompt, currentTitle, currentContent, provider: requestedProvider } = await req.json() as any
        const settings = await req.payload.findGlobal({ slug: 'site-settings' })
        
        const config = {
          googleKey: (settings.geminiApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY) || undefined,
          claudeKey: settings.claudeApiKey || undefined,
          openaiKey: settings.openaiApiKey || undefined,
          systemPrompt: settings.aiSystemPrompt || undefined,
          examples: settings.aiExamples || undefined
        }

        const provider = requestedProvider || settings.aiDefaultProvider || 'gemini'

        const enrichedPrompt = `
          ${currentTitle || currentContent ? `Voici l'article ACTUEL :
          TITRE : ${currentTitle}
          CONTENU : ${currentContent}
          
          CONSIGNE DE MODIFICATION : ${prompt}` : `SUJET : ${prompt}`}
        `

        try {
          const aiProvider = AIFactory.getTextProvider(provider, config)
          const result = await aiProvider.generate(enrichedPrompt, config)
          
          return Response.json({
            title: result.title,
            markdown: result.content 
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : "Erreur inconnue"
          return Response.json({ error: message }, { status: 500 })
        }
      }
    }
  ],
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr', 
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Flowers,
    CultivationLogs,
    Categories,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})