import { TextProvider, TextGenerationResult } from '../types';

export class GeminiProvider implements TextProvider {
  constructor(private apiKey: string) {}

  async generate(prompt: string, options: { systemPrompt?: string; examples?: string }): Promise<TextGenerationResult> {
    const fullPrompt = `
      ${options.systemPrompt || ''}
      ${options.examples ? `Voici des exemples de style à suivre :\n${options.examples}` : ''}
      
      CONSIGNE : À partir du sujet suivant, génère un titre poétique et un article complet de blog.
      STRUCTURE : Intro, 3 sections (## Titre), Conclusion. 
      LONGUEUR : Vise 600-800 mots. Sois verbeux et poétique.
      
      IMPORTANT : Tu dois répondre UNIQUEMENT au format JSON suivant. 
      Assure-toi que le JSON est valide et complet.
      {
        "title": "Le titre",
        "content": "Le contenu avec ## et paragraphes"
      }

      SUJET : ${prompt}
    `;

    const modelName = 'gemini-2.0-flash-001';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.8, // Légèrement augmenté pour plus de créativité/longueur
            responseMimeType: "application/json",
            maxOutputTokens: 2500, 
          }
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `HTTP ${response.status}`);

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Réponse vide de l'IA");

      // PARSING ROBUSTE
      try {
        // Nettoyage des balises markdown éventuelles
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // On cherche la première accolade ouvrante et la dernière fermante
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        
        if (firstBrace === -1 || lastBrace === -1) {
          throw new Error("Structure JSON non trouvée");
        }
        
        const jsonContent = cleaned.substring(firstBrace, lastBrace + 1);
        let parsed = JSON.parse(jsonContent);
        
        if (Array.isArray(parsed)) parsed = parsed[0];
        
        return {
          title: parsed.title || 'Génération Automatique',
          content: parsed.content || cleaned
        };
      } catch (_parseErr) {
        console.error("Erreur parsing JSON IA. Texte brut:", rawText);
        // Fallback : si le JSON est cassé mais qu'on a du texte, on essaie de sauver les meubles
        return {
          title: "Nouvel article",
          content: rawText
        };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      throw new Error(`Gemini Error: ${message}`);
    }
  }
}
