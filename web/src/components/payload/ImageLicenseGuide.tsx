'use client'

import React from 'react'
import { Collapsible } from '@payloadcms/ui'
import { ShieldCheck, Info, AlertTriangle, ExternalLink } from 'lucide-react'

export const ImageLicenseGuide: React.FC = () => {
  return (
    <div className="my-6 border-b border-border pb-8">
      <Collapsible
        initCollapsed={true}
        header={
          <div className="flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-widest py-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Aide au choix des images</span>
          </div>
        }
      >
        <div className="pt-6 pb-2 space-y-10 font-sans text-[13px] leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="font-bold text-primary flex items-center gap-2 text-xs uppercase tracking-widest border-b border-primary/10 pb-2">
                <Info className="w-4 h-4" /> 1. Sources Gratuites (CC0)
              </h4>
              <p className="text-muted-foreground">Privilégiez ces sites pour être en totale conformité :</p>
              <ul className="space-y-3">
                <li>
                  <a href="https://unsplash.com/fr" target="_blank" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    Unsplash <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[11px] text-muted-foreground italic">Photos haute qualité, idéal pour la nature.</span>
                </li>
                <li>
                  <a href="https://pixabay.com/fr/" target="_blank" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    Pixabay <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[11px] text-muted-foreground italic">Très bon catalogue pour les fleurs et jardins.</span>
                </li>
                <li>
                  <a href="https://www.pexels.com/fr-fr/" target="_blank" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    Pexels <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-amber-700 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-amber-700/10 pb-2">
                <AlertTriangle className="w-4 h-4" /> 2. Risques Copyright
              </h4>
              <p className="text-muted-foreground">Évitez absolument d&apos;utiliser des images provenant de :</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Google Images & Pinterest</strong> (les droits appartiennent à des tiers).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Images avec des <strong>Logos ou filigranes</strong> (Adobe, Getty, etc.).</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 p-5 rounded-xl border border-primary/10 space-y-2">
            <p className="font-bold text-primary uppercase text-[10px] tracking-widest">Le bon réflexe :</p>
            <p className="text-muted-foreground italic">
              Si vous avez un doute, renseignez l&apos;<strong>URL d&apos;origine</strong> et cliquez sur <strong>Magie IA</strong> dans la colonne de droite. L&apos;IA analysera les droits pour vous.
            </p>
          </div>
        </div>
      </Collapsible>
    </div>
  )
}
