import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'

export default async function FleursPage() {
  const payload = await getPayload({ config })
  const { docs: flowers } = await payload.find({
    collection: 'flowers',
    where: {
      status: { equals: 'published' }
    }
  })

  const seasonLabels = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver',
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-primary">Nos Fleurs</h1>
        <p className="text-xl text-muted-foreground font-light italic max-w-2xl mx-auto">
          Découvrez les variétés qui s'épanouissent actuellement au jardin.
        </p>
      </header>

      {flowers.length === 0 ? (
        <div className="text-center py-24 bg-muted/20 rounded-3xl italic text-muted-foreground font-serif">
          Le catalogue est en cours de préparation. Revenez bientôt !
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flowers.map((flower) => {
            // Safe image handling
            const mainImageObj = flower.images && flower.images.length > 0 ? flower.images[0].image : null;
            const imageUrl = mainImageObj && typeof mainImageObj === 'object' && 'url' in mainImageObj ? mainImageObj.url : null;
            const imageAlt = mainImageObj && typeof mainImageObj === 'object' && 'alt' in mainImageObj ? mainImageObj.alt : flower.name;
            
            // Link target (Slug or ID)
            const linkHref = flower.slug ? `/fleurs/${flower.slug}` : `/fleurs/${flower.id}`;

            return (
            <Link key={flower.id} href={linkHref}>
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full bg-card/60 backdrop-blur-sm">
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  {imageUrl ? (
                     <Image 
                       src={imageUrl} 
                       alt={typeof imageAlt === 'string' ? imageAlt : flower.name}
                       fill
                       className="object-cover transition-transform duration-700 hover:scale-105"
                     />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground italic font-serif">
                      [Photo à venir]
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="font-serif text-2xl text-primary">{flower.name}</CardTitle>
                    <span className="font-bold font-sans text-lg">{flower.price}€</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {flower.season?.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal font-sans bg-secondary/30 text-secondary-foreground hover:bg-secondary/50">
                        {seasonLabels[s as keyof typeof seasonLabels]}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 font-sans">
                    {flower.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )})}
        </div>
      )}
    </div>
  )
}
