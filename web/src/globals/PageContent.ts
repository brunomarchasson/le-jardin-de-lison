import type { GlobalConfig } from 'payload'
import { PAGE_DEFAULTS } from '../constants/defaults'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Contenu des Pages',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'accueil',
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
                  admin: { width: '50%' },
                },
                {
                  name: 'meteoFleurs',
                  label: 'Météo des Fleurs',
                  type: 'text',
                  admin: { 
                    width: '50%',
                    placeholder: 'La nature se repose...',
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
              admin: {
                description: 'Par défaut : hero-accueil.png',
              }
            },
            {
              name: 'heroSubText',
              label: 'Slogan sous le titre',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.accueil.heroSubText,
                description: 'Laissez vide pour utiliser la valeur par défaut.',
              }
            },
            {
              name: 'philosophieTitle',
              label: 'Titre Philosophie',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.accueil.philosophieTitle,
                description: 'Laissez vide pour utiliser la valeur par défaut.',
              }
            },
            {
              name: 'philosophieText',
              label: 'Texte Philosophie',
              type: 'textarea',
              admin: {
                placeholder: PAGE_DEFAULTS.accueil.philosophieText,
                description: 'Laissez vide pour utiliser la valeur par défaut.',
              }
            },
          ]
        },
        {
          name: 'laFerme',
          label: 'La Ferme',
          fields: [
            {
              name: 'title',
              label: 'Titre de la page',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.laFerme.title,
              }
            },
            {
              name: 'subText',
              label: 'Sous-titre Header',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.laFerme.subText,
              }
            },
            {
              name: 'histoireTitre',
              label: 'Titre de l\'histoire',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.laFerme.histoireTitre,
              }
            },
            {
              name: 'histoireTexte',
              label: 'Texte de l\'histoire',
              type: 'richText',
              admin: {
                description: 'Si vide, affiche l\'histoire par défaut (Cécile & Lison).',
              }
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
              admin: {
                placeholder: PAGE_DEFAULTS.laFerme.ecologieTitre,
              }
            },
            {
              name: 'ecologieItems',
              label: 'Points Forts Écologie',
              type: 'array',
              admin: {
                description: 'Si vide, affiche les 3 points par défaut (Zéro Déchet, Biodiversité, Local).',
              },
              fields: [
                { name: 'title', type: 'text', label: 'Titre' },
                { name: 'description', type: 'text', label: 'Description' },
              ]
            }
          ]
        },
        {
          name: 'fleurs',
          label: 'Fleurs',
          fields: [
            {
              name: 'title',
              label: 'Titre page Fleurs',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.fleurs.title,
              }
            },
            {
              name: 'subText',
              label: 'Sous-titre page Fleurs',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.fleurs.subText,
              }
            }
          ]
        },
        {
          name: 'leMarche',
          label: 'Le Marché',
          fields: [
            {
              name: 'title',
              label: 'Titre page Le Marché',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.leMarche.title,
              }
            },
            {
              name: 'subText',
              label: 'Sous-titre page Le Marché',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.leMarche.subText,
              }
            }
          ]
        },
        {
          name: 'blog',
          label: 'Blog',
          fields: [
            {
              name: 'title',
              label: 'Titre page Blog',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.blog.title,
              }
            },
            {
              name: 'subText',
              label: 'Sous-titre page Blog',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.blog.subText,
              }
            }
          ]
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [
            {
              name: 'title',
              label: 'Titre page Contact',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.title,
              }
            },
            {
              name: 'subText',
              label: 'Sous-titre page Contact',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.subText,
              }
            },
            {
              name: 'adresse',
              label: 'Adresse',
              type: 'textarea',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.adresse,
              }
            },
            {
              name: 'telephone',
              label: 'Téléphone',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.telephone,
              }
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.email,
              }
            },
            {
              name: 'horaires',
              label: 'Horaires',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.contact.horaires,
              }
            }
          ]
        }
      ]
    }
  ],
}
