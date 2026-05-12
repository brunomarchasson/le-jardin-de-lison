import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import { Badge } from "@/components/ui/badge"
import type { Media, Category } from '@/payload-types'
import { Metadata } from 'next'

// On retire force-dynamic pour permettre la génération statique avec revalidation
export const revalidate = 3600 // La page sera régénérée au maximum toutes les heures

type Props = {
  params: Promise<{
    id: string
  }>
}

async function getPost(id: string) {
  const payload = await getPayload({ config })
  try {
    return await payload.findByID({
      collection: 'posts',
      id,
    })
  } catch (_e) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)

  if (!post) return {}

  return {
    title: post.title,
    description: post.title + " - Le journal du jardin de Lison.",
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: `${post.title} | Au jardin de Lison`,
      description: `Découvrez notre dernier article : ${post.title}`,
      images: post.coverImage ? [{ url: (post.coverImage as Media).url || '' }] : [],
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPost(id)

  if (!post || post.status !== 'published') {
    return notFound()
  }

  const coverImage = post.coverImage as Media

  // JSON-LD pour l'article de Blog
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: coverImage?.url,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Cécile',
    },
  }

  return (
    <article className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Image */}
      <div className="relative h-[50vh] w-full bg-muted">
        {coverImage && coverImage.url ? (
           <Image 
             src={coverImage.url} 
             alt={coverImage.alt || post.title} 
             fill 
             className="object-cover"
             priority
           />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic">
             [Sans image de couverture]
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          
          <div className="flex flex-col gap-6 text-center mb-12">
            <div className="flex items-center justify-center gap-4">
               {post.category && (
                 <Badge variant="secondary" className="font-serif">
                   {(post.category as Category).title}
                 </Badge>
               )}
               <span className="text-sm text-muted-foreground uppercase tracking-widest">
                  {new Date(post.publishedDate || '').toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-spirax italic text-primary leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-stone prose-lg max-w-none font-serif">
             <RichText content={post.content} />
          </div>

        </div>
      </div>
    </article>
  )
}
