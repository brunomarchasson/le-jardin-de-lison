import { TextProvider, TextGenerationResult } from '../types';

export class OpenAIProvider implements TextProvider {
  constructor(private apiKey: string) {}

  async generate(prompt: string, options: { systemPrompt?: string; examples?: string }): Promise<TextGenerationResult> {
    const fullPrompt = `
      ${options.systemPrompt || ''}
      ${options.examples ? `Voici des exemples de style à suivre :
${options.examples}` : ''}
      
      CONSIGNE : À partir du sujet suivant, génère un titre poétique et un article complet de blog.
      STRUCTURE : Intro, 3 sections (## Titre), Conclusion. 
      LONGUEUR : Vise 600-800 mots.
      FORMATAGE : Utilise le Markdown riche (## pour les titres).
      
      IMPORTANT : Tu dois répondre au format JSON suivant.
      {
        "title": "Le titre",
        "content": "Le contenu avec ## et paragraphes"
      }

      SUJET : ${prompt}
    `;

    const url = 'https://api.openai.com/v1/chat/completions';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Modèle très économique et performant
          messages: [
            { role: 'system', content: "Tu es un rédacteur pour 'Au jardin de Lison'. Tu réponds uniquement en JSON." },
            { role: 'user', content: fullPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `OpenAI Error ${response.status}`);

      const rawText = data.choices[0].message.content;
      const parsed = JSON.parse(rawText);
      
      return {
        title: parsed.title || 'Génération OpenAI',
        content: parsed.content || rawText
      };
    } catch (err: any) {
      throw new Error(`OpenAI Error: ${err.message}`);
    }
  }
}
