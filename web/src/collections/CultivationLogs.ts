import type { CollectionConfig } from 'payload'

export const CultivationLogs: CollectionConfig = {
  slug: 'cultivation-logs',
  labels: {
    singular: 'Journal de Culture',
    plural: 'Journal de Culture',
  },
  admin: {
    useAsTitle: 'date',
    defaultColumns: ['date', 'flower', 'action'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // PRIVE : Seul lAdmin connect peut lire
  },
  fields: [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        }
      }
    },
    {
      name: 'flower',
      label: 'Variété concernée',
      type: 'relationship',
      relationTo: 'flowers',
      required: true,
    },
    {
      name: 'action',
      label: 'Type dAction',
      type: 'select',
      options: [
        { label: 'Semis', value: 'sowing' },
        { label: 'Plantation', value: 'planting' },
        { label: 'Entretien/Pincement', value: 'care' },
        { label: 'Observation/Maladie', value: 'observation' },
        { label: 'Récolte', value: 'harvest' },
      ],
      required: true,
    },
    {
      name: 'notes',
      label: 'Observations / Notes',
      type: 'textarea',
    },
    {
      name: 'photos',
      label: 'Photos (Preuve, Maladie...)',
      type: 'array',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    }
  ],
}
