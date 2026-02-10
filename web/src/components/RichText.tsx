import React, { Fragment } from 'react'
import { cn } from '@/lib/utils'

const escapeHTML = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[tag] || tag,
  )

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  tag?: string
  text?: string
  format?: number
  fields?: {
    url?: string
    newTab?: boolean
  }
  [key: string]: any
}

export const RichText = ({ content, className }: { content: any; className?: string }) => {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div
      className={cn(
        'rich-text max-w-none font-lora text-lg leading-relaxed text-foreground/80',
        className,
      )}
    >
      {serialize(content.root.children as LexicalNode[])}
    </div>
  )
}

const serialize = (children: LexicalNode[]): React.ReactNode[] => {
  if (!Array.isArray(children)) {
    return []
  }

  return children.map((node, i) => {
    if (node.type === 'text') {
      let text = <span key={i} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text || '') }} />

      const format = node.format ?? 0

      if (format & 1)
        text = (
          <strong key={i} className="font-bold text-foreground">
            {text}
          </strong>
        )
      if (format & 2)
        text = (
          <em key={i} className="italic">
            {text}
          </em>
        )
      if (format & 8)
        text = (
          <u key={i} className="underline">
            {text}
          </u>
        )
      if (format & 16)
        text = (
          <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
            {text}
          </code>
        )

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'heading':
        const Tag = node.tag as keyof React.JSX.IntrinsicElements
        const headingStyles = {
          h1: 'text-4xl md:text-5xl font-spirax text-primary mt-12 mb-6',
          h2: 'text-3xl md:text-4xl font-spirax text-primary mt-10 mb-4 italic',
          h3: 'text-2xl md:text-3xl font-spirax text-primary/90 mt-8 mb-3',
          h4: 'text-xl font-bold mt-6 mb-2',
        }
        return (
          <Tag
            key={i}
            className={headingStyles[node.tag as keyof typeof headingStyles] || headingStyles.h2}
          >
            {serialize(node.children ?? [])}
          </Tag>
        )

      case 'paragraph':
        // Gestion des paragraphes vides (souvent utilisés pour l'espacement)
        if (node.children?.length === 0) return <br key={i} />
        return (
          <p key={i} className="mb-6 last:mb-0">
            {serialize(node.children ?? [])}
          </p>
        )

      case 'list':
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        return (
          <ListTag
            key={i}
            className={cn(
              'mb-6 pl-6 space-y-2',
              node.tag === 'ol' ? 'list-decimal' : 'list-disc marker:text-primary/50',
            )}
          >
            {serialize(node.children ?? [])}
          </ListTag>
        )

      case 'listitem':
        return (
          <li key={i} className="pl-2">
            {serialize(node.children ?? [])}
          </li>
        )

      case 'link':
        return (
          <a
            href={node.fields?.url || '#'}
            key={i}
            target={node.fields?.newTab ? '_blank' : '_self'}
            className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
          >
            {serialize(node.children ?? [])}
          </a>
        )

      case 'quote':
        return (
          <blockquote
            key={i}
            className="border-l-4 border-primary/20 pl-6 italic my-8 text-xl text-muted-foreground font-lora"
          >
            {serialize(node.children ?? [])}
          </blockquote>
        )

      default:
        return (
          <div key={i} className="mb-4">
            {serialize(node.children || [])}
          </div>
        )
    }
  })
}
