'use client'

import React, { useState } from 'react'
import { useField } from '@payloadcms/ui'
import { Sparkles, Loader2, Wand2 } from 'lucide-react'

export const AiMediaTools: React.FC = () => {
  const { value: filename } = useField<string>({ path: 'filename' })
  const { value: mimeType } = useField<string>({ path: 'mimeType' })
  const { setValue: setAlt } = useField<string>({ path: 'alt' })
  const { setValue: setCaption } = useField<string>({ path: 'caption' })
  const { setValue: setLicenseNotes } = useField<string>({ path: 'licenseNotes' })
  const { setValue: setLicenseType } = useField<string>({ path: 'licenseType' })
  
  const [loading, setLoading] = useState(false)

  const handleAiAction = async () => {
    if (!filename) return
    setLoading(true)
    try {
      const response = await fetch('/api/ai/analyze-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, mimeType }),
      })
      const data = await response.json()
      if (data.alt) setAlt(data.alt)
      if (data.caption) setCaption(data.caption)
      if (data.licenseNotes) setLicenseNotes(data.licenseNotes)
      if (data.licenseType) setLicenseType(data.licenseType)
    } catch (err) {
      console.error("Erreur IA Media:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sidebar-ai-tools mb-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
      <div className="flex items-center gap-3 mb-6 text-primary font-bold text-[11px] uppercase tracking-[0.2em]">
        <Wand2 className="w-4 h-4" />
        <span>Assistant IA</span>
      </div>

      <button
        onClick={(e) => { e.preventDefault(); handleAiAction(); }}
        disabled={loading || !filename}
        className={`
          flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-xl border
          transition-all duration-300 font-bold text-[11px] uppercase tracking-widest shadow-sm
          ${loading || !filename 
            ? 'bg-transparent text-gray-300 border-gray-200 cursor-not-allowed shadow-none' 
            : 'bg-primary text-white border-primary hover:bg-primary/90 hover:shadow-md active:scale-[0.98]'
          }
        `}
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        <span>Optimiser via l'IA</span>
      </button>

      <div className="mt-6 space-y-2 text-center">
        <p className="text-[10px] text-muted-foreground font-medium">
          {!filename 
            ? "En attente d'une image..." 
            : "Analyse des droits & SEO"
          }
        </p>
        <p className="text-[9px] text-muted-foreground/60 leading-relaxed italic">
          Génère automatiquement vos textes SEO et détecte les risques de copyright.
        </p>
      </div>
    </div>
  )
}
