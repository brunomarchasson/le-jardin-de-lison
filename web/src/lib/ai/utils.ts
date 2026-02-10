/**
 * Convertit du markdown en structure Lexical JSON (approximatif pour dispatchFields)
 * Note: Dans un environnement idéal, on utiliserait l'instance de l'éditeur.
 * Ici on simule une structure minimale compatible avec ce que Payload attend.
 */
export function markdownToLexical(markdown: string) {
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