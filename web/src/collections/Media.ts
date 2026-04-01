import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texte alternatif (SEO)',
      type: 'text',
      required: true,
    },
    {
      name: 'aiTools',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/payload/AiMediaTools.tsx#AiMediaTools',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations',
          fields: [
            {
              name: 'caption',
              label: 'Légende',
              type: 'text',
              admin: {
                description: 'S\'affiche sous l\'image si nécessaire.',
              },
            },
            {
              name: 'attribution',
              label: 'Crédits / Copyright',
              type: 'text',
              admin: {
                description: 'Ex: © Photographe Nom / Unsplash. S\'affichera sur le site.',
              },
            },
          ],
        },
        {
          label: 'Licence & Origine',
          fields: [
            {
              name: 'licenseGuide',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload/ImageLicenseGuide.tsx#ImageLicenseGuide',
                },
              },
            },
            {
              name: 'sourceUrl',
              label: 'URL d\'origine',
              type: 'text',
              admin: {
                description: 'Collez l\'adresse web où vous avez trouvé l\'image.',
              },
            },
            {
              name: 'licenseType',
              label: 'Type de Licence',
              type: 'select',
              options: [
                { label: 'Libre (Domaine Public / CC0)', value: 'public_domain' },
                { label: 'Libre avec mention (CC-BY)', value: 'cc_by' },
                { label: 'Achat (Adobe Stock, etc.)', value: 'purchased' },
                { label: 'Usage restreint / Copyright strict', value: 'copyright' },
                { label: 'Inconnue / À vérifier', value: 'unknown' },
              ],
              defaultValue: 'unknown',
            },
            {
              name: 'licenseNotes',
              label: 'Notes de vérification',
              type: 'textarea',
              admin: {
                description: 'Utilisez l\'Assistant IA pour analyser si l\'image est libre de droit.',
              }
            }
          ],
        },
      ],
    },
  ],
  upload: {
    staticDir: process.env.PAYLOAD_MEDIA_DIR || path.resolve(dirname, '../../media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
