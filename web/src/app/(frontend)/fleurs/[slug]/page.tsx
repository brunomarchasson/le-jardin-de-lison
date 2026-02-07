import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { FlowerGallery } from '@/components/FlowerGallery'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function FlowerDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  // Try to find by Slug first
  const flowers = await payload.find({
    collection: 'flowers',
    where: {
      slug: { equals: slug }
    },
    limit: 1,
  })

  let flower = flowers.docs[0];

  if (!flower) {
     try {
       flower = await payload.findByID({ collection: 'flowers', id: slug })
     } catch (e) {
       notFound()
     }
  }

  if (!flower) return notFound()

  const seasonLabels = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver',
  }

  // Prepare images for the gallery component
  const galleryImages = (flower.images || [])
    .filter(imgObj => imgObj.image && typeof imgObj.image === 'object' && 'url' in imgObj.image)
    .map(imgObj => {
       const img = imgObj.image as any;
       return {
         url: img.url,
         alt: typeof img.alt === 'string' ? img.alt : flower.name
       }
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/fleurs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-spirax">
        <ArrowLeft className="w-4 h-4" />
        Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Colonne GAUCHE : Galerie Photos Interactive */}
        <FlowerGallery images={galleryImages} />

        {/* Colonne DROITE : Informations */}
        <div className="flex flex-col gap-6">
           <div>
             <div className="flex flex-wrap gap-2 mb-4">
                {flower.season?.map((s) => (
                    <Badge key={s} variant="secondary" className="font-sans bg-secondary/30 text-secondary-foreground">
                      {seasonLabels[s as keyof typeof seasonLabels]}
                    </Badge>
                ))}
             </div>
             <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-4">{flower.name}</h1>
             <div className="text-3xl font-sans font-bold text-foreground/80">{flower.price} € <span className="text-base font-normal text-muted-foreground font-lora">/ la botte</span></div>
           </div>

           <div className="prose prose-stone max-w-none text-muted-foreground font-lora leading-relaxed">
             <p>{flower.description}</p>
           </div>

           <div className="mt-auto pt-8 border-t border-border">
              <div className="flex items-center gap-4 mb-4">
                 <div className={`w-3 h-3 rounded-full ${flower.stock && flower.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                 <span className="font-lora text-sm">
                    {flower.stock && flower.stock > 0 ? `${flower.stock} bottes disponibles` : 'Rupture de stock'}
                 </span>
              </div>
              
              {/* Placeholder pour future fonctionnalité Panier */}
              <Button disabled={!flower.stock || flower.stock <= 0} className="w-full md:w-auto font-spirax text-lg py-6 bg-primary hover:bg-primary/90">
                 <ShoppingBasket className="mr-2 h-5 w-5" />
                 Ajouter au panier (Bientôt)
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
