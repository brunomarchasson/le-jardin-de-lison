import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Catégorie',
    plural: 'Catégories',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Boutique',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      admin: {
        position: 'sidebar',
        description: 'Généré automatiquement à partir du titre',
      },
    },
  ],
}
