'use client'

import React, { useState } from 'react'
import { useField, Button, useForm, useFormFields } from '@payloadcms/ui'
import { Sparkles, Loader2, Type, CheckCircle2 } from 'lucide-react'

export const AiAssistant: React.FC = () => {
  const { setValue: setTitle } = useField<string>({ path: 'title' })
  const { setValue: setMarkdown } = useField<string>({ path: 'aiMarkdown' })
  
  // On récupère les valeurs actuelles des champs pour le contexte
  const currentTitle = useFormFields(([fields]) => fields.title?.value as string)
  const currentContent = useFormFields(([fields]) => fields.content?.value as any)
  
  const { submit } = useForm()
  
  const [loading, setLoading] = useState(false)
  const [briefing, setBriefing] = useState('')
  const [success, setSuccess] = useState(false)

  const handleGenerate = async () => {
    if (!briefing) return alert("Dites à l'IA ce qu'elle doit faire.")
    
    setLoading(true)
    setSuccess(false)
    
    try {
      // Préparation du contenu actuel pour l'IA (si existant)
      // On essaie d'extraire le texte brut du JSON Lexical
      let existingText = ""
      if (currentContent?.root?.children) {
        existingText = currentContent.root.children
          .map((child: any) => child.children?.map((c: any) => c.text).join('') || "")
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
      
      if (data.title && data.markdown) {
        setTitle(data.title)
        setMarkdown(data.markdown)
        setSuccess(true)
        
        setTimeout(() => {
          submit()
        }, 200)
        
      } else {
        alert("Réponse IA incomplète.")
      }
    } catch (err) {
      console.error("Erreur assistant IA:", err)
      alert("Erreur lors de la génération.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      marginBottom: '20px', padding: '20px', border: '2px solid var(--theme-elevation-150)', 
      borderRadius: '12px', backgroundColor: 'var(--theme-elevation-50)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#d97757' }}>
          <Sparkles size={20} /> Assistant Intelligent
        </h4>
        {success && <span style={{ fontSize: '11px', color: '#10a37f' }}><CheckCircle2 size={12}/> Modifié</span>}
      </div>

      <textarea 
        value={briefing}
        onChange={(e) => setBriefing(e.target.value)}
        placeholder="Décrivez les modifications ou le sujet... (ex: Raccourcis l'introduction)"
        style={{ 
          width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--theme-elevation-250)',
          fontSize: '14px', minHeight: '80px', backgroundColor: 'var(--theme-elevation-0)', color: 'var(--theme-text)', marginBottom: '15px'
        }}
      />
      
      <Button size="medium" onClick={handleGenerate} disabled={loading} style={{ width: '100%' }}>
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} style={{ marginRight: '8px' }} />}
        Générer / Modifier l'Article
      </Button>
    </div>
  )
}