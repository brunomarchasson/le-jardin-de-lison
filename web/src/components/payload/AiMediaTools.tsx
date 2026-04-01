'use client'

import React, { useState } from 'react'
import { useField, Button } from '@payloadcms/ui'
import { Sparkles, Loader2 } from 'lucide-react'

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
    <div className="my-6">
      <button
        onClick={(e) => { e.preventDefault(); handleAiAction(); }}
        disabled={loading || !filename}
        className={`
          flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl
          transition-all duration-300 font-medium text-sm shadow-sm
          ${loading || !filename 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white hover:shadow-md active:scale-[0.98]'
          }
        `}
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        <span>Optimiser avec la Magie IA</span>
      </button>
      {!filename && (
        <p className="text-[10px] text-gray-400 mt-2 text-center italic">
          Uploadez une image pour activer l'IA
        </p>
      )}
    </div>
  )
}
