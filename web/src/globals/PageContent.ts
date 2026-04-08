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
                  admin: { width: '33%' },
                },
                {
                  name: 'meteoFleurs',
                  label: 'Météo des Fleurs',
                  type: 'text',
                  admin: { 
                    width: '33%',
                    placeholder: 'La nature se repose...',
                    description: 'Ex: "Les Dahlias sont là !"',
                  },
                },
                {
                  name: 'whereIsCecile',
                  label: 'Où est Cécile aujourd\'hui ?',
                  type: 'text',
                  admin: { 
                    width: '33%',
                    placeholder: 'Au marché de...',
                    description: 'S\'affiche sur la page d\'accueil.',
                  },
                },
              ],
            },
            {
              name: 'whereIsCecileEnabled',
              label: 'Afficher "Où est Cécile"',
              type: 'checkbox',
              defaultValue: false,
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
            },
            {
              name: 'catalogueTitle',
              label: 'Titre de la section Catalogue (H2 SEO)',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.fleurs.catalogueTitle,
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
            },
            {
              name: 'catalogueTitle',
              label: 'Titre de la section Produits (H2 SEO)',
              type: 'text',
              admin: {
                placeholder: PAGE_DEFAULTS.leMarche.catalogueTitle,
              }
            },
            {
              name: 'infoVenteEnLigne',
              label: 'Texte Info Vente (Pas de vente en ligne)',
              type: 'richText',
              admin: {
                description: 'Texte expliquant qu\'il n\'y a pas de vente en ligne et qu\'il faut contacter Cécile.',
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
              name: 'prosSection',
              label: 'Section Professionnels',
              type: 'richText',
              admin: {
                description: 'Texte dédié aux fleuristes, magasins, etc.',
              }
            },
            {
              name: 'particuliersSection',
              label: 'Section Particuliers',
              type: 'richText',
              admin: {
                description: 'Texte dédié aux particuliers.',
              }
            },
            {
              name: 'nomOrganisation',
              label: 'Nom de l\'organisation (pour le QR Code)',
              type: 'text',
              admin: {
                placeholder: 'Au jardin de Lison',
                description: 'Nom qui apparaîtra lors de l\'enregistrement du contact.',
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
              name: 'codePostal',
              label: 'Code Postal',
              type: 'text',
              admin: {
                placeholder: '13610',
                width: '50%',
              }
            },
            {
              name: 'ville',
              label: 'Ville',
              type: 'text',
              admin: {
                placeholder: 'Le Puy-Sainte-Réparade',
                width: '50%',
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
              type: 'row',
              fields: [
                {
                  name: 'instagram',
                  label: 'Lien Instagram',
                  type: 'text',
                  admin: { placeholder: 'https://instagram.com/aujardindelison' },
                },
                {
                  name: 'facebook',
                  label: 'Lien Facebook',
                  type: 'text',
                  admin: { placeholder: 'https://facebook.com/aujardindelison' },
                },
                {
                  name: 'whatsapp',
                  label: 'Numéro WhatsApp',
                  type: 'text',
                  admin: { placeholder: '+33600000000', description: 'Sans espaces ni caractères spéciaux pour le lien direct.' },
                },
              ],
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
