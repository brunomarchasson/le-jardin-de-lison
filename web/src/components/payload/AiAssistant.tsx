'use client'

import React, { useState } from 'react'
import { useForm, useField, useFormFields } from '@payloadcms/ui'
import { Sparkles, Loader2, Wand2, Copy, Check } from 'lucide-react'
import { markdownToLexical } from '../../lib/ai/utils'

export const AiAssistant: React.FC = () => {
  const form = useForm()
  const titleField = useField<string>({ path: 'title' })
  
  const currentTitle = useFormFields(([fields]) => fields.title?.value as string)
  const currentContent = useFormFields(([fields]) => fields.content?.value as { root: { children: any[] } })
  
  const [loading, setLoading] = useState(false)
  const [briefing, setBriefing] = useState('')
  const [preview, setPreview] = useState<{ title: string, markdown: string } | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGenerate = async () => {
    if (!briefing) return alert("Dites à l'IA ce qu'elle doit faire.")
    setLoading(true)
    setPreview(null)
    
    try {
      let existingText = ""
      if (currentContent?.root?.children) {
        existingText = currentContent.root.children
          .map((child: { children?: { text?: string }[] }) => child.children?.map((c: { text?: string }) => c.text).join('') || "")
          .join('\n\n')
      }

      const response = await fetch('/api/ai/generate-full-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: briefing,
          currentTitle: currentTitle || '',
          currentContent: existingText
        }),
      })
      
      const data = await response.json()
      if (data.title || data.markdown) {
        setPreview({
          title: data.title || currentTitle || 'Sans titre',
          markdown: data.markdown || ''
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const applyToForm = () => {
    if (!preview) return
    
    // 1. Titre
    titleField.setValue(preview.title)
    
    // 2. Contenu Lexical
    if (preview.markdown) {
      const lexicalValue = markdownToLexical(preview.markdown)
      
      console.log("Applying Lexical Value via dispatchFields...");
      
      // On utilise dispatchFields qui est l'API la plus directe du formulaire
      form.dispatchFields({
        type: 'UPDATE',
        path: 'content',
        value: lexicalValue,
      })

      // On marque le formulaire comme modifié
      form.setModified(true)
    }
    
    setPreview(null)
    setBriefing('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid var(--theme-elevation-200)', borderRadius: '10px', backgroundColor: 'var(--theme-elevation-50)' }}>
      <header style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Wand2 size={18} color="#d97757" />
        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Assistant IA</span>
      </header>

      <textarea 
        value={briefing}
        onChange={(e) => setBriefing(e.target.value)}
        placeholder="Décrivez ce que vous voulez écrire ou modifier..."
        style={{ 
          width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--theme-elevation-300)',
          fontSize: '13px', minHeight: '60px', backgroundColor: 'var(--theme-elevation-0)', color: 'var(--theme-text)',
          marginBottom: '10px', resize: 'vertical'
        }}
      />
      
      <button 
        type="button"
        onClick={handleGenerate} 
        disabled={loading} 
        style={{ 
          width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: 'var(--theme-elevation-800)',
          color: 'var(--theme-elevation-0)', border: 'none', cursor: 'pointer', fontWeight: 'bold',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
        {loading ? 'Génération...' : 'Générer une proposition'}
      </button>

      {preview && (
        <div style={{ marginTop: '15px', padding: '12px', borderRadius: '6px', border: '1px dashed #d97757', backgroundColor: '#d9775705' }}>
          <div style={{ fontSize: '12px', marginBottom: '8px' }}>
            <strong>Titre :</strong> {preview.title}
          </div>
          <button 
            type="button"
            onClick={applyToForm}
            style={{ 
              width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#d97757',
              color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            <Copy size={14} /> Appliquer à l&apos;article
          </button>
        </div>
      )}

      {success && (
        <div style={{ marginTop: '10px', color: '#10a37f', fontSize: '12px', textAlign: 'center' }}>
          <Check size={14} /> Proposition appliquée !
        </div>
      )}
    </div>
  )
}