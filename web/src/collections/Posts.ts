import type { CollectionConfig } from 'payload'

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
  ],
}