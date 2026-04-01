'use client'

import React from 'react'
import { ShieldCheck, Info, ExternalLink, AlertTriangle } from 'lucide-react'

export const ImageLicenseGuide: React.FC = () => {
  return (
    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4 my-4 font-sans text-sm leading-relaxed">
      <div className="flex items-center gap-2 text-blue-800 font-bold text-base">
        <ShieldCheck className="w-5 h-5" />
        Comment choisir vos images ?
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-bold text-primary flex items-center gap-2">
            <Info className="w-4 h-4" /> 1. Où trouver des images gratuites ?
          </h4>
          <p>Utilisez ces sites "CC0" (Domaine Public), ils sont les plus sûrs :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="https://unsplash.com/fr" target="_blank" className="underline hover:text-primary">Unsplash</a> (Haute qualité)</li>
            <li><a href="https://pixabay.com/fr/" target="_blank" className="underline hover:text-primary">Pixabay</a> (Très varié)</li>
            <li><a href="https://www.pexels.com/fr-fr/" target="_blank" className="underline hover:text-primary">Pexels</a> (Moderne)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-amber-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> 2. Ce qu'il faut éviter
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google Images</strong> : La plupart sont protégées.</li>
            <li><strong>Pinterest</strong> : C'est un nid à copyright.</li>
            <li><strong>Photos avec filigranes</strong> : (Adobe Stock, Getty) Interdit sans achat.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-blue-100 mt-4">
        <p className="font-bold mb-2 uppercase text-[10px] tracking-widest text-blue-400">Le réflexe à avoir :</p>
        <p>Si vous n'êtes pas sûre, copiez l'URL où vous avez trouvé l'image dans le champ <strong>"URL d'origine"</strong> et cliquez sur <strong>"Magie IA"</strong>. L'IA cherchera des indices visuels de copyright pour vous alerter.</p>
      </div>
    </div>
  )
}
