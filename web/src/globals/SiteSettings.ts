import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du Site',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Général',
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
          ]
        },
        {
          label: 'Assistant IA',
          fields: [
            {
              name: 'aiProvider',
              label: 'Fournisseur d\'Intelligence Artificielle',
              type: 'select',
              defaultValue: 'gemini',
              options: [
                { label: 'Google Gemini (Gratuit / Recommandé)', value: 'gemini' },
                { label: 'Anthropic Claude (Qualité Plume)', value: 'anthropic' },
                { label: 'OpenAI GPT-4 (Standard)', value: 'openai' },
              ],
              admin: {
                description: 'Choisissez "Gemini" pour utiliser le quota gratuit inclus, ou un autre fournisseur si vous avez votre propre clé.',
              }
            },
            {
              name: 'aiApiKey',
              label: 'Clé API Personnelle (Optionnel)',
              type: 'text',
              admin: {
                description: 'Laissez vide pour utiliser la clé système par défaut (Gemini uniquement).',
              },
            },
            {
              name: 'aiSystemPrompt',
              label: 'Instructions de Style (System Prompt)',
              type: 'textarea',
              defaultValue: 'Tu es un rédacteur professionnel pour "Au jardin de Lison", une micro-ferme florale bio et poétique. Ton style est doux, inspirant et met en avant le respect de la terre. \n\nLONGUEUR : Rédige des articles longs et détaillés (environ 600-800 mots). Développe chaque idée avec profondeur.\n\nRÈGLE DE GRAMMAIRE CRITIQUE : Ne dis JAMAIS "À Au jardin de Lison". Dis simplement "Au jardin de Lison". \n\nSTRUCTURE : Utilise obligatoirement des titres de section (##) riches.',
              admin: {
                description: 'Définissez ici comment l\'IA doit s\'exprimer par défaut.',
              }
            },
            {
              name: 'aiExamples',
              label: 'Articles de référence (Style)',
              type: 'textarea',
              admin: {
                description: 'Collez ici un ou deux articles que vous aimez particulièrement pour que l\'IA s\'en inspire (ton, vocabulaire, longueur).',
              }
            },
            {
              name: 'aiGuide',
              type: 'ui',
              admin: {
                components: {
                  Field: '/components/payload/ApiKeyGuide.tsx#ApiKeyGuide',
                },
              },
            }
          ]
        }
      ]
    }
  ],
}
