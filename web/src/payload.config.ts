import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { fr } from '@payloadcms/translations/languages/fr'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Flowers } from './collections/Flowers'
import { CultivationLogs } from './collections/CultivationLogs'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { SiteSettings } from './globals/SiteSettings'
import { PageContent } from './globals/PageContent'
import { AIFactory } from './lib/ai/AIFactory'
import { migrations } from './migrations'

import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/payload/AdminLogo#AdminLogo',
        Icon: '/components/payload/AdminLogo#AdminLogo',
      },
    },
    theme: 'light',
    meta: {
      titleSuffix: '- Au jardin de Lison',
    },
  },
  endpoints: [
    {
      path: '/ai/analyze-media',
      method: 'post',
      handler: async (req) => {
        if (!req.user || !req.json) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        
        const { filename, mimeType } = await req.json() as { filename: string; mimeType: string }
        const settings = await req.payload.findGlobal({ slug: 'site-settings' })
        const apiKey = (settings.geminiApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY)
        
        if (!apiKey) return Response.json({ error: 'Clé API manquante' }, { status: 500 })

        // Lecture de l'image sur le disque
        const mediaDir = process.env.PAYLOAD_MEDIA_DIR || path.resolve(dirname, '../media')
        const filePath = path.join(mediaDir, filename)
        
        if (!fs.existsSync(filePath)) return Response.json({ error: 'Fichier non trouvé' }, { status: 404 })
        
        const imageBuffer = fs.readFileSync(filePath)
        const base64Image = imageBuffer.toString('base64')

        const prompt = `
          Analyse cette image pour une micro-ferme florale bio.
          1. Génère un texte ALT (SEO) descriptif et poétique en français.
          2. Génère une légende (caption) courte.
          3. Détection de Copyright : 
             - Cherche des filigranes (watermarks) comme "Adobe Stock", "Getty", "Shutterstock".
             - Regarde le style : est-ce une photo professionnelle de studio ou une photo amateur de jardin ?
             - Si tu vois un nom d'auteur ou un logo, indique-le.
          4. Conseil de Licence : Choisis la valeur la plus probable. Si c'est une fleur dans un jardin sans logo, privilégie "public_domain". Si c'est très pro, mets "copyright" ou "purchased".

          Réponds UNIQUEMENT au format JSON suivant :
          {
            "alt": "Texte alt SEO",
            "caption": "Légende",
            "licenseType": "public_domain | cc_by | purchased | copyright | unknown",
            "licenseNotes": "Analyse visuelle : [ton analyse ici]. Conseil : [ton conseil]"
          }
        `

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`
        
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: base64Image } }
                ]
              }],
              generationConfig: { responseMimeType: "application/json" }
            })
          })

          const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
          const rawResult = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (!rawResult) throw new Error('No analysis result')
          return Response.json(JSON.parse(rawResult))
        } catch (_err) {
          return Response.json({ error: 'Erreur analyse IA' }, { status: 500 })
        }
      }
    },
    {
      path: '/ai/generate-full-post',
      method: 'post',
      handler: async (req) => {
        if (!req.user || !req.json) return Response.json({ error: 'Unauthorized or missing body' }, { status: 401 })
        
        const { prompt, currentTitle, currentContent, provider: requestedProvider } = await req.json() as { 
          prompt: string; 
          currentTitle?: string; 
          currentContent?: string; 
          provider?: string 
        }
        const settings = await req.payload.findGlobal({ slug: 'site-settings' })
        
        const config = {
          googleKey: (settings.geminiApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY) || undefined,
          claudeKey: settings.claudeApiKey || undefined,
          openaiKey: settings.openaiApiKey || undefined,
          systemPrompt: settings.aiSystemPrompt || undefined,
          examples: settings.aiExamples || undefined
        }

        const provider = (requestedProvider || settings.aiDefaultProvider || 'gemini') as 'gemini' | 'claude' | 'openai'

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
    Posts,
    Flowers,
    CultivationLogs,
    Categories,
    Products,
  ],
  globals: [
    PageContent,
    SiteSettings,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'size',
                type: 'select',
                label: 'Taille d\'affichage',
                defaultValue: 'large',
                options: [
                  { label: 'Petit (Centré)', value: 'small' },
                  { label: 'Moyen', value: 'medium' },
                  { label: 'Large', value: 'large' },
                  { label: 'Plein écran', value: 'full' },
                ],
              },
              {
                name: 'caption',
                type: 'richText',
                label: 'Légende',
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                    ]
                  },
                }),
              },
            ],
          },
        },
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrations: migrations,
  }),
  sharp,
  plugins: [],
})
