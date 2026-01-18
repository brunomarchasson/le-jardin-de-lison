'use client'

import React from 'react'

const GuideSection = ({ title, url, steps, color }: { title: string, url: string, steps: string[], color: string }) => (
  <div className="mb-6 p-4 border rounded bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
    <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color }}>
      {title}
    </h4>
    <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
      {steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xs inline-block px-3 py-1 rounded text-white hover:opacity-90 transition-opacity"
      style={{ backgroundColor: color }}
    >
      Obtenir ma clé {title} &rarr;
    </a>
  </div>
)

export const ApiKeyGuide: React.FC = () => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Guide : Comment obtenir une clé API ?</h3>
      
      <p className="text-sm text-gray-500 mb-6">
        Par défaut, le site utilise une clé système gratuite (Gemini). 
        Si vous souhaitez utiliser votre propre compte ou une autre IA plus performante (Claude), suivez ces guides.
      </p>

      <GuideSection 
        title="Google Gemini (Gratuit)" 
        url="https://aistudio.google.com/app/apikey"
        color="#1a73e8"
        steps={[
          "Connectez-vous avec votre compte Google.",
          "Cliquez sur le bouton 'Create API Key'.",
          "Copiez la clé qui commence par 'AIza...'.",
          "Collez-la dans le champ ci-dessus."
        ]}
      />

      <GuideSection 
        title="Anthropic Claude (Qualité Plume)" 
        url="https://console.anthropic.com/settings/keys"
        color="#d97757"
        steps={[
          "Créez un compte sur Anthropic Console.",
          "Ajoutez une carte bancaire (Billing > Add Payment Method).",
          "Allez dans 'API Keys' et cliquez sur 'Create Key'.",
          "Copiez la clé qui commence par 'sk-ant...'."
        ]}
      />

      <GuideSection 
        title="OpenAI (Standard)" 
        url="https://platform.openai.com/api-keys"
        color="#10a37f"
        steps={[
          "Créez un compte OpenAI Platform.",
          "Ajoutez du crédit (Settings > Billing).",
          "Cliquez sur 'Create new secret key'.",
          "Copiez la clé qui commence par 'sk-...'."
        ]}
      />
    </div>
  )
}
