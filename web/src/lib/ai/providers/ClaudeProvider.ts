import { TextProvider, TextGenerationResult } from '../types';

export class ClaudeProvider implements TextProvider {
  constructor(private apiKey: string, private model: string = 'claude-3-haiku-20240307') {}

  async generate(prompt: string, options: { systemPrompt?: string; examples?: string }): Promise<TextGenerationResult> {
    const fullPrompt = `
      ${options.systemPrompt || ''}
      ${options.examples ? `Voici des exemples de style à suivre :\n${options.examples}` : ''}
      
      CONSIGNE : À partir du sujet suivant, génère un titre poétique et un article complet de blog.
      STRUCTURE : Intro, 3 sections (## Titre), Conclusion. 
      LONGUEUR : Vise 600-800 mots. Sois verbeux et poétique.
      FORMATAGE : Utilise le Markdown riche (## pour les titres).
      
      IMPORTANT : Tu dois répondre au format JSON suivant.
      {
        "title": "Le titre",
        "content": "Le contenu avec ## et paragraphes"
      }

      SUJET : ${prompt}
    `;

    const url = 'https://api.anthropic.com/v1/messages';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model, 
          max_tokens: 4000,
          messages: [
            { role: 'user', content: fullPrompt }
          ],
          system: "Tu es un rédacteur professionnel pour 'Au jardin de Lison'. Tu réponds exclusivement en JSON."
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Claude API Error Response:", data);
        const errorMsg = data.error?.message || `Claude API Error ${response.status}`;
        throw new Error(errorMsg);
      }

      const rawText = data.content[0].text;
      
      try {
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        const jsonContent = cleaned.substring(firstBrace, lastBrace + 1);
        const parsed = JSON.parse(jsonContent);
        
        return {
          title: parsed.title || 'Génération Claude',
          content: parsed.content || cleaned
        };
      } catch (_parseErr) {
        return {
          title: "Nouvel article (Claude)",
          content: rawText
        };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      throw new Error(`Claude Error: ${message}`);
    }
  }
}
