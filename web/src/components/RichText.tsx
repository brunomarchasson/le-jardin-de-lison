import React, { Fragment } from 'react'

const escapeHTML = (str: string) =>
  str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag))

// Basic Lexical Serializer
export const RichText = ({ content }: { content: any }) => {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div className="rich-text space-y-4">
      {serialize(content.root.children)}
    </div>
  )
}

const serialize = (children: any[]): React.ReactNode[] => {
  if (!Array.isArray(children)) {
    return []
  }

  return children.map((node, i) => {
    if (node.type === 'text') {
      let text = <span key={i} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      
      if (node.format & 1) text = <strong key={i}>{text}</strong>
      if (node.format & 2) text = <em key={i}>{text}</em>
      if (node.format & 8) text = <u key={i}>{text}</u>
      if (node.format & 16) text = <code key={i}>{text}</code>

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'heading':
        const Tag = node.tag as keyof JSX.IntrinsicElements
        return <Tag key={i} className="font-serif italic text-primary mt-6 mb-2">{serialize(node.children)}</Tag>
      
      case 'paragraph':
        return <p key={i} className="leading-relaxed text-muted-foreground">{serialize(node.children)}</p>

      case 'list':
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        return (
          <ListTag key={i} className="list-inside list-disc pl-4 space-y-1">
            {serialize(node.children)}
          </ListTag>
        )
      
      case 'listitem':
         return <li key={i}>{serialize(node.children)}</li>

      case 'link':
        return (
          <a href={node.fields.url} key={i} target={node.fields.newTab ? '_blank' : '_self'} className="text-primary underline underline-offset-4">
            {serialize(node.children)}
          </a>
        )

      default:
        // Handle cases where children might not exist on a node type
        return <Fragment key={i}>{serialize(node.children || [])}</Fragment>
    }
  })
}
