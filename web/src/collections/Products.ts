import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produit',
    plural: 'Produits',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status'],
    group: 'Boutique',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nom du produit',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
      admin: {
        position: 'sidebar',
        description: 'Généré automatiquement à partir du nom',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
    {
      name: 'categories',
      label: 'Catégories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'images',
      label: 'Images du produit',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'relatedFlowers',
      label: 'Fleurs associées',
      type: 'relationship',
      relationTo: 'flowers',
      hasMany: true,
      admin: {
        description: 'Si ce produit (ex: un bouquet) contient des fleurs spécifiques de votre catalogue.',
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'Prix (€)',
          type: 'number',
          admin: { width: '50%' },
        },
        {
          name: 'stock',
          label: 'Stock disponible',
          type: 'number',
          admin: { width: '50%' },
        },
      ]
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
