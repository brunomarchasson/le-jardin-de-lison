import type { CollectionConfig } from 'payload'

export const Flowers: CollectionConfig = {
  slug: 'flowers',
  labels: {
    singular: 'Fleur',
    plural: 'Fleurs',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'stock', 'status'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nom',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'price',
      label: 'Prix (€)',
      type: 'number',
      min: 0,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'season',
      label: 'Saison',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Printemps', value: 'spring' },
        { label: 'Été', value: 'summer' },
        { label: 'Automne', value: 'autumn' },
        { label: 'Hiver', value: 'winter' },
      ],
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