'use client'

import React from 'react'

const GuideSection = ({ 
  title, 
  url, 
  steps, 
  color, 
  cost, 
  freeTier 
}: { 
  title: string, 
  url: string, 
  steps: string[], 
  color: string,
  cost: string,
  freeTier: string
}) => (
  <div className="mb-6 p-4 border rounded bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
    <h4 className="font-bold mb-2 flex items-center justify-between gap-2" style={{ color }}>
      <span>{title}</span>
      <span className="text-[10px] font-normal px-2 py-0.5 rounded-full border border-current opacity-80">
        {freeTier === 'Aucun' ? 'Payant' : 'Gratuit possible'}
      </span>
    </h4>
    
    <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 dark:bg-gray-800/50 p-2 rounded border border-gray-100 dark:border-gray-800">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Coût estimé / article</span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cost}</span>
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Limite Gratuite</span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{freeTier}</span>
      </div>
    </div>

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
      
      <p className="text-sm text-gray-500 mb-6 italic border-l-4 border-gray-200 pl-4 py-1">
        Une demande d&apos;article complet (800 mots) consomme environ 2500 tokens. 
        Les coûts ci-dessous sont des estimations basées sur les tarifs actuels des modèles Flash/Mini.
      </p>

      <GuideSection 
        title="Google Gemini (Flash 2.0)" 
        url="https://aistudio.google.com/app/apikey"
        color="#1a73e8"
        cost="~0,0007 € (Négligeable)"
        freeTier="15 req/min (1500/jour)"
        steps={[
          "Connectez-vous avec votre compte Google.",
          "Cliquez sur le bouton 'Create API Key'.",
          "Copiez la clé qui commence par 'AIza...'.",
          "Collez-la dans le champ ci-dessus."
        ]}
      />

      <GuideSection 
        title="OpenAI (GPT-4o-mini)" 
        url="https://platform.openai.com/api-keys"
        color="#10a37f"
        cost="~0,001 € (10 articles / centime)"
        freeTier="Aucun (Nécessite prépaiement)"
        steps={[
          "Créez un compte OpenAI Platform.",
          "Ajoutez du crédit (Settings > Billing - 5$ min).",
          "Cliquez sur 'Create new secret key'.",
          "Copiez la clé qui commence par 'sk-...'."
        ]}
      />

      <GuideSection 
        title="Anthropic Claude (3.5 Sonnet)" 
        url="https://console.anthropic.com/settings/keys"
        color="#d97757"
        cost="~0,025 € (Plume de haute qualité)"
        freeTier="Aucun"
        steps={[
          "Créez un compte sur Anthropic Console.",
          "Ajoutez du crédit (Billing > Add Funds - 5$ min).",
          "Allez dans 'API Keys' et cliquez sur 'Create Key'.",
          "Copiez la clé qui commence par 'sk-ant...'."
        ]}
      />
    </div>
  )
}