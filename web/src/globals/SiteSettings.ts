import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du Site',
  access: {
    read: () => true,
  },
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
    },
    {
      name: 'meteoFleurs',
      label: 'Météo des Fleurs',
      type: 'text',
      admin: {
        description: 'Phrase courte affichée sur la page d\'accueil (ex: "Les Dahlias sont là !")',
      },
    },
  ],
}