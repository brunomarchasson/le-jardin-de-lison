import type { CollectionConfig } from 'payload'
import { 
  lexicalEditor,
  MarkdownFeature,
  HeadingFeature,
  FixedToolbarFeature
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'category', 'status'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'aiAssistant',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/payload/AiAssistant.tsx#AiAssistant',
        },
      },
    },
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      label: 'Date de publication',
      type: 'date',
    },
    {
      name: 'category',
      label: 'Catégorie',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'coverImage',
      label: 'Image de couverture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingTypes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Brouillon',
        },
        {
          value: 'published',
          label: 'Publié',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'aiMarkdown',
      type: 'textarea',
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.aiMarkdown) {
          const lines = data.aiMarkdown.split('\n').filter((l: string) => l.trim() !== '')
          
          const lexicalChildren = lines.map((line: string) => {
            let text = line.trim()
            let type = 'paragraph'
            let tag = 'p'
            
            // Détection des titres ##
            if (text.startsWith('## ')) {
              text = text.replace('## ', '')
              type = 'heading'
              tag = 'h2'
            } else if (text.startsWith('### ')) {
              text = text.replace('### ', '')
              type = 'heading'
              tag = 'h3'
            }

            // Gestion simple du gras **texte** -> on sépare en plusieurs nœuds
            // Pour faire simple et robuste, on nettoie les ** pour l'instant 
            // mais on garde la structure de bloc correcte
            // Gestion du gras **texte**
            const parts = text.split(/(\*\*.*?\*\*)/g)
            const children = parts.map(part => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return {
                  detail: 0,
                  format: 1, // 1 = Gras en Lexical
                  mode: 'normal',
                  style: '',
                  text: part.replace(/\*\*/g, ''),
                  type: 'text',
                  version: 1
                }
              }
              return {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: part,
                type: 'text',
                version: 1
              }
            }).filter(child => child.text !== '')

            return {
              type,
              tag,
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: children.length > 0 ? children : [{
                detail: 0, format: 0, mode: 'normal', style: '', text: text, type: 'text', version: 1
              }],
            }
          })

          data.content = {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: lexicalChildren,
            },
          }
          data.aiMarkdown = null
        }
        return data
      }
    ]
  },
}