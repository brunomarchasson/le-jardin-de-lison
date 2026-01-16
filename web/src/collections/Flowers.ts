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
    read: () => true, // Tout le monde peut lire (on filtrera les champs privés en front)
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- ONGLET 1 : VITRINE (PUBLIC) ---
        {
          label: 'Vitrine (Public)',
          fields: [
            {
              name: 'name',
              label: 'Nom de la variété',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              label: 'Slug (URL)',
              type: 'text',
              admin: {
                position: 'sidebar',
                description: 'Identifiant unique pour l\'URL (ex: dahlia-cafe)',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (value) return value.toLowerCase().replace(/ /g, '-') .replace(/[^\w-]+/g, '')
                    if (data?.name) return data.name.toLowerCase().replace(/ /g, '-') .replace(/[^\w-]+/g, '')
                    return value
                  }
                ]
              }
            },
            {
              name: 'description',
              label: 'Description commerciale',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  label: 'Prix (€)',
                  type: 'number',
                  min: 0,
                  admin: { width: '50%' },
                },
                {
                  name: 'stock',
                  label: 'Stock disponible',
                  type: 'number',
                  min: 0,
                  defaultValue: 0,
                  admin: { width: '50%' },
                },
              ]
            },
            {
              name: 'images',
              label: 'Galerie Photos',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  label: 'Photo',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'season',
              label: 'Saison de floraison',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Printemps', value: 'spring' },
                { label: 'Été', value: 'summer' },
                { label: 'Automne', value: 'autumn' },
                { label: 'Hiver', value: 'winter' },
              ],
            },
          ],
        },
        
        // --- ONGLET 2 : ITINÉRAIRE TECHNIQUE (PRIVÉ) ---
        {
          label: 'Culture (Interne)',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'waterNeeds',
                  label: 'Besoins en eau',
                  type: 'select',
                  options: [
                    { label: 'Faible', value: 'low' },
                    { label: 'Moyen', value: 'medium' },
                    { label: 'Important', value: 'high' },
                  ],
                  admin: { width: '50%' }
                },
                {
                  name: 'sunExposure',
                  label: 'Exposition',
                  type: 'select',
                  options: [
                    { label: 'Ombre', value: 'shadow' },
                    { label: 'Mi-ombre', value: 'part_shade' },
                    { label: 'Plein soleil', value: 'sun' },
                  ],
                  admin: { width: '50%' }
                },
              ]
            },
            {
              label: 'Calendrier Cultural',
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sowingPeriod',
                      label: 'Période de semis',
                      type: 'select',
                      hasMany: true,
                      options: [
                        { label: 'Janvier', value: 'jan' }, { label: 'Février', value: 'feb' }, { label: 'Mars', value: 'mar' },
                        { label: 'Avril', value: 'apr' }, { label: 'Mai', value: 'may' }, { label: 'Juin', value: 'jun' },
                        { label: 'Juillet', value: 'jul' }, { label: 'Août', value: 'aug' }, { label: 'Septembre', value: 'sep' },
                        { label: 'Octobre', value: 'oct' }, { label: 'Novembre', value: 'nov' }, { label: 'Décembre', value: 'dec' },
                      ],
                    },
                    {
                      name: 'harvestPeriod',
                      label: 'Période de récolte',
                      type: 'select',
                      hasMany: true,
                      options: [
                        { label: 'Janvier', value: 'jan' }, { label: 'Février', value: 'feb' }, { label: 'Mars', value: 'mar' },
                        { label: 'Avril', value: 'apr' }, { label: 'Mai', value: 'may' }, { label: 'Juin', value: 'jun' },
                        { label: 'Juillet', value: 'jul' }, { label: 'Août', value: 'aug' }, { label: 'Septembre', value: 'sep' },
                        { label: 'Octobre', value: 'oct' }, { label: 'Novembre', value: 'nov' }, { label: 'Décembre', value: 'dec' },
                      ],
                    },
                  ]
                }
              ]
            },
            {
              name: 'technicalNotes',
              label: 'Notes techniques (Espacement, pincement...)',
              type: 'textarea',
            }
          ]
        }
      ]
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        { value: 'draft', label: 'Brouillon' },
        { value: 'published', label: 'Publié' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
