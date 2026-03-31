import type { GlobalConfig } from 'payload'
import { PAGE_DEFAULTS } from '../constants/defaults'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Contenu des Pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Accueil',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'glanage',
                  label: 'Feu Tricolore Glanage',
                  type: 'select',
                  options: [
                    { label: 'Ouvert', value: 'open' },
                    { label: 'Fermé', value: 'closed' },
                    { label: 'Bientôt', value: 'soon' },
                  ],
                  defaultValue: 'closed',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'meteoFleurs',
                  label: 'Météo des Fleurs',
                  type: 'text',
                  admin: { 
                    width: '50%',
                    description: 'Ex: "Les Dahlias sont là !"',
                  },
                },
              ],
            },
            {
              name: 'heroImage',
              label: 'Image de fond (Hero)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroSubText',
              label: 'Slogan sous le titre',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.accueil.heroSubText,
            },
            {
              name: 'philosophieTitle',
              label: 'Titre Philosophie',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.accueil.philosophieTitle,
            },
            {
              name: 'philosophieText',
              label: 'Texte Philosophie',
              type: 'textarea',
              defaultValue: PAGE_DEFAULTS.accueil.philosophieText,
            },
          ]
        },
        {
          label: 'La Ferme',
          fields: [
            {
              name: 'fermeTitle',
              label: 'Titre de la page',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.laFerme.title,
            },
            {
              name: 'fermeSubText',
              label: 'Sous-titre Header',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.laFerme.subText,
            },
            {
              name: 'histoireTitre',
              label: 'Titre de l\'histoire',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.laFerme.histoireTitre,
            },
            {
              name: 'histoireTexte',
              label: 'Texte de l\'histoire',
              type: 'richText',
            },
            {
              name: 'histoireImage',
              label: 'Photo de la ferme',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'ecologieTitre',
              label: 'Titre Section Écologie',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.laFerme.ecologieTitre,
            },
            {
              name: 'ecologieItems',
              label: 'Points Forts Écologie',
              type: 'array',
              // On retire temporairement le defaultValue de l'array pour tester
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Description',
                },
              ],
            }
          ]
        },
        {
          label: 'Fleurs & Blog',
          fields: [
            {
              name: 'fleursTitle',
              label: 'Titre page Fleurs',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.fleurs.title,
            },
            {
              name: 'fleursSubText',
              label: 'Sous-titre page Fleurs',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.fleurs.subText,
            },
            {
              name: 'blogTitle',
              label: 'Titre page Blog',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.blog.title,
            },
            {
              name: 'blogSubText',
              label: 'Sous-titre page Blog',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.blog.subText,
            }
          ]
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactTitle',
              label: 'Titre page Contact',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.contact.title,
            },
            {
              name: 'contactSubText',
              label: 'Sous-titre page Contact',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.contact.subText,
            },
            {
              name: 'adresse',
              label: 'Adresse',
              type: 'textarea',
              defaultValue: PAGE_DEFAULTS.contact.adresse,
            },
            {
              name: 'telephone',
              label: 'Téléphone',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.contact.telephone,
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.contact.email,
            },
            {
              name: 'horaires',
              label: 'Horaires',
              type: 'text',
              defaultValue: PAGE_DEFAULTS.contact.horaires,
            }
          ]
        }
      ]
    }
  ],
}
