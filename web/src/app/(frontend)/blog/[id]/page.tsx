import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import { Badge } from "@/components/ui/badge"

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })
  
  let post;
  
  try {
    post = await payload.findByID({
      collection: 'posts',
      id,
    })
  } catch (e) {
    notFound()
  }

  if (!post || post.status !== 'published') {
    // Optionally allow drafts in preview mode
    // notFound()
  }

  const coverImage = post.coverImage as any

  return (
    <article className="min-h-screen pb-24">
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
                   {(post.category as any).title}
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
