import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import { $getRoot } from 'lexical'

/**
 * Convertit du markdown en structure Lexical JSON (approximatif pour dispatchFields)
 * Note: Dans un environnement idéal, on utiliserait l'instance de l'éditeur.
 * Ici on simule une structure minimale compatible avec ce que Payload attend.
 */
export function markdownToLexical(markdown: string) {
  // Pour Payload, on peut envoyer une structure simplifiée ou du Markdown si le plugin le supporte.
  // Mais ici on va renvoyer une structure qui "ressemble" à du Lexical pour le dispatch.
  // En réalité, Payload Lexical peut souvent accepter du markdown si configuré, 
  // mais la méthode la plus sûre est de laisser l'éditeur faire la conversion.
  
  // Si on est côté client et qu'on veut injecter dans l'éditeur :
  // On utilise souvent l'API de l'éditeur directement.
  
  // Pour le composant AiAssistant qui utilise dispatchFields, il attend un objet Lexical.
  // Comme on n'a pas accès à l'instance de l'éditeur facilement ici pour générer le JSON,
  // on va renvoyer une structure de secours ou utiliser un utilitaire de conversion.
  
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: markdown,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
