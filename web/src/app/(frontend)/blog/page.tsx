import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' }
    },
    sort: '-publishedDate'
  })

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">Le Journal du Jardin</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-muted-foreground font-light italic max-w-2xl mx-auto">
            Nouvelles de la terre, conseils de culture et vie de la micro-ferme.
          </p>
        </FadeIn>
      </header>

      {posts.length === 0 ? (
        <FadeIn delay={0.4}>
          <div className="text-center py-24 bg-muted/20 rounded-3xl italic text-muted-foreground font-spirax">
            Aucun article pour le moment. Nous écrivons la suite !
          </div>
        </FadeIn>
      ) : (
        <FadeInStagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post, idx) => {
              const coverImage = post.coverImage as Media;
              const imageUrl = coverImage?.sizes?.card?.url || coverImage?.url;
              
              return (
                <FadeIn key={post.id} delay={idx * 0.1}>
                  <Link href={`/blog/${post.id}`}>
                    <Card className="group h-full border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-card/50 backdrop-blur-sm">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        {imageUrl ? (
                          <Image 
                            src={imageUrl} 
                            alt={coverImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground italic font-spirax">
                            [Sans image]
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-sans">
                          {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : 'Date inconnue'}
                        </div>
                        <CardTitle className="font-spirax italic text-3xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-muted-foreground line-clamp-2">
                          Lire l&apos;article
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </FadeInStagger>
      )}
    </div>
  )
}
