import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { FlowerGallery } from '@/components/FlowerGallery'
import { RichText } from '@/components/RichText'
import type { Media, Category } from '@/payload-types'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string) {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: slug }
    },
    limit: 1,
  })
  let product = products.docs[0];
  if (!product) {
    try {
      product = await payload.findByID({ collection: 'products', id: slug })
    } catch (_e) {
      return null
    }
  }
  return product
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return {}

  return {
    title: product.name,
    description: (product.name) + " - Disponible au jardin de Lison.",
    alternates: {
      canonical: `/le-marche/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Au jardin de Lison`,
      description: `Découvrez ${product.name} sur notre marché local.`,
      images: (product.images || []).map(img => {
        const i = img.image as Media
        return { url: i.url || '' }
      }),
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return notFound()

  // JSON-LD pour le Produit
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.name,
    image: (product.images || []).map(img => (img.image as Media).url),
    offers: {
      '@type': 'Offer',
      price: product.price || 0,
      priceCurrency: 'EUR',
      availability: product.stock && product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  // Prepare images for the gallery component
  const galleryImages = (product.images || [])
    .filter(imgObj => imgObj.image && typeof imgObj.image === 'object' && 'url' in imgObj.image)
    .map(imgObj => {
       const img = imgObj.image as Media;
       return {
         url: img.url || '',
         alt: typeof img.alt === 'string' ? img.alt : product.name
       }
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/le-marche" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-spirax">
        <ArrowLeft className="w-4 h-4" />
        Retour au marché
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Colonne GAUCHE : Galerie Photos Interactive */}
        <FlowerGallery images={galleryImages} />

        {/* Colonne DROITE : Informations */}
        <div className="flex flex-col gap-6">
           <div>
             <div className="flex flex-wrap gap-2 mb-4">
                {product.categories?.map((cat) => {
                    const catData = cat as Category;
                    return (
                        <Badge key={catData.id} variant="secondary" className="font-sans bg-secondary/30 text-secondary-foreground">
                          {catData.title}
                        </Badge>
                    )
                })}
             </div>
             <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-4">{product.name}</h1>
             {product.price && (
                <div className="text-3xl font-sans font-bold text-foreground/80">
                    {product.price} €
                </div>
             )}
           </div>

           <div className="prose prose-stone max-w-none text-muted-foreground font-lora leading-relaxed">
             {product.description ? (
                <RichText content={product.description} />
             ) : (
                <p>{product.name} disponible au jardin de Lison.</p>
             )}
           </div>

           <div className="mt-auto pt-8 border-t border-border">
              <div className="flex items-center gap-4 mb-6 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                 <div className={`w-3 h-3 rounded-full ${product.stock && product.stock > 0 ? 'bg-green-500' : 'bg-amber-500'}`} />
                 <span className="font-lora text-sm text-muted-foreground">
                    {product.stock && product.stock > 0 ? `${product.stock} articles disponibles` : 'Disponible sur commande / au jardin'}
                 </span>
              </div>
              
              <Link href="/contact" className="block">
                <Button className="w-full md:w-auto font-spirax text-lg py-6 bg-primary hover:bg-primary/90 px-8">
                    <ShoppingBasket className="mr-2 h-5 w-5" />
                    Commander (Contact)
                </Button>
              </Link>
              <p className="mt-4 text-xs text-muted-foreground italic">
                * Les produits ne sont pas vendus en ligne directement. Contactez Cécile pour réserver.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
