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
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        
        const { prompt, currentTitle, currentContent } = await req.json()
        const settings = await req.payload.findGlobal({ slug: 'site-settings' })
        
        const config = {
          googleKey: settings.aiApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
          systemPrompt: settings.aiSystemPrompt,
          examples: settings.aiExamples
        }

        const enrichedPrompt = `
          ${currentTitle || currentContent ? `Voici l'article ACTUEL :
          TITRE : ${currentTitle}
          CONTENU : ${currentContent}
          
          CONSIGNE DE MODIFICATION : ${prompt}` : `SUJET : ${prompt}`}
        `

        try {
          const provider = AIFactory.getTextProvider(config)
          const result = await provider.generate(enrichedPrompt, config)
          console.log(result)
          return Response.json({
            title: result.title,
            markdown: result.content 
          })
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: 500 })
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