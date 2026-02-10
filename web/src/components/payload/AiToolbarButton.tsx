'use client'

import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import { $getRoot } from 'lexical'
import { useFormFields, Button, useField } from '@payloadcms/ui'
import { Sparkles, Loader2, Wand2, ChevronDown } from 'lucide-react'

export const AiToolbarButton: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [provider, setProvider] = useState('gemini')
  
  // Accès au setter du titre
  const { setValue: setTitle } = useField<string>({ path: 'title' })
  
  // On récupère le titre actuel pour le contexte
  const currentTitle = useFormFields(([fields]) => fields.title?.value as string)

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)
    
    try {
      let currentText = ""
      editor.getEditorState().read(() => {
        currentText = $getRoot().getTextContent()
      })

      const response = await fetch('/api/ai/generate-full-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt,
          currentTitle: currentTitle || '',
          currentContent: currentText,
          provider
        }),
      })
      
      const data = await response.json()
      
      if (data.error) throw new Error(data.error);

      if (data.markdown) {
        if (data.title) setTitle(data.title)

        editor.update(() => {
          const root = $getRoot()
          root.clear()
          $convertFromMarkdownString(data.markdown, TRANSFORMERS)
        })
        
        setIsModalOpen(false)
        setPrompt('')
      }
    } catch (err: any) {
      console.error("AI Feature Error:", err)
      alert(err.message || "Erreur lors de la génération.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-feature-button" style={{ display: 'inline-block', position: 'relative' }}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(!isModalOpen);
        }}
        title="Générer avec l'IA"
        style={{
          background: isModalOpen ? 'var(--theme-elevation-200)' : 'transparent',
          border: 'none',
          padding: '6px',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: '#d97757'
        }}
      >
        <Sparkles size={18} />
      </button>

      {isModalOpen && (
        <div 
          onKeyDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            zIndex: 10000,
            width: '320px',
            padding: '20px',
            backgroundColor: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-250)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97757' }}>
              <Wand2 size={16} />
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Assistant IA</span>
            </div>
            
            <select 
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid var(--theme-elevation-300)',
                backgroundColor: 'var(--theme-elevation-100)',
                color: 'var(--theme-text)',
                cursor: 'pointer'
              }}
            >
              <option value="gemini">Google Gemini</option>
              <option value="claude-sonnet">Claude 3.5 Sonnet</option>
              <option value="claude-haiku">Claude 3 Haiku</option>
              <option value="openai">OpenAI GPT-4o</option>
            </select>
          </header>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Que voulez-vous écrire ?"
            autoFocus
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-300)',
              fontSize: '13px',
              minHeight: '100px',
              backgroundColor: 'var(--theme-elevation-0)',
              color: 'var(--theme-text)',
              resize: 'none',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              size="small" 
              onClick={(e) => { e.stopPropagation(); handleGenerate(); }} 
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : 'Générer'}
            </Button>
            <Button 
              size="small" 
              buttonStyle="secondary" 
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              style={{ flex: 1 }}
            >
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}