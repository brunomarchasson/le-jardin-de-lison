import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import type { Media, Category } from '@/payload-types'
import { PAGE_DEFAULTS } from '@/constants/defaults'
import { RichText } from '@/components/RichText'
import { ShoppingBag } from 'lucide-react'
import { Metadata } from 'next'

export const revalidate = 3600 // La page sera régénérée au maximum toutes les heures

export const metadata: Metadata = {
  title: 'Le Marché',
  description: 'Découvrez nos bouquets de saison, nos créations artisanales et les produits de notre micro-ferme florale bio.',
  alternates: {
    canonical: '/le-marche',
  },
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function MarchePage({ searchParams }: Props) {
  const { category: categorySlug } = await searchParams
  const payload = await getPayload({ config })

  // Récupération du contenu global
  const content = await payload.findGlobal({
    slug: 'page-content',
  })
  
  const p = content.leMarche || {}
  const pageTitle = p.title || PAGE_DEFAULTS.leMarche.title
  const subText = p.subText || PAGE_DEFAULTS.leMarche.subText
  const catalogueTitle = p.catalogueTitle || PAGE_DEFAULTS.leMarche.catalogueTitle

  // Récupération des catégories pour le filtre
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  // Construction de la requête
  const whereQuery: Record<string, any> = {
    status: { equals: 'published' }
  }

  if (categorySlug) {
    whereQuery['categories.slug'] = { equals: categorySlug }
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 100,
    where: whereQuery,
  })

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">{pageTitle}</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-muted-foreground font-light italic max-w-2xl mx-auto">
            {subText}
          </p>
        </FadeIn>
      </header>

      {/* Message sur la vente en ligne */}
      <FadeIn delay={0.25}>
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-3xl p-8 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
          </div>
          {p.infoVenteEnLigne ? (
            <RichText content={p.infoVenteEnLigne} className="text-base text-muted-foreground" />
          ) : (
            <>
              <p className="text-lg text-primary font-spirax mb-2">Pas de vente en ligne pour le moment</p>
              <p className="text-muted-foreground font-lora">
                Pour toute commande ou information sur nos produits, n&apos;hésitez pas à nous contacter directement. 
                <Link href="/contact" className="text-primary underline underline-offset-4 ml-1 hover:text-primary/80 transition-colors">
                  Page de contact
                </Link>
              </p>
            </>
          )}
        </div>
      </FadeIn>

      {/* Filtres par catégorie */}
      <FadeIn delay={0.3}>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Link href="/le-marche">
            <Badge 
              variant={!categorySlug ? "default" : "outline"} 
              className="cursor-pointer px-4 py-1 text-sm rounded-full transition-all"
            >
              Tout
            </Badge>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/le-marche?category=${cat.slug}`}>
              <Badge 
                variant={categorySlug === cat.slug ? "default" : "outline"}
                className="cursor-pointer px-4 py-1 text-sm rounded-full transition-all"
              >
                {cat.title}
              </Badge>
            </Link>
          ))}
        </div>
      </FadeIn>

      {products.length === 0 ? (
        <FadeIn delay={0.4}>
          <div className="text-center py-24 bg-muted/20 rounded-3xl italic text-muted-foreground font-spirax">  
            Aucun article trouvé dans cette catégorie.
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.3}>
          <div className="space-y-8">
            <h2 className="text-3xl font-spirax text-primary text-center md:text-left border-b border-primary/10 pb-4">
              {catalogueTitle}
            </h2>
            <FadeInStagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, idx) => {

              const mainImageObj = product.images && product.images.length > 0 ? product.images[0].image : null;   
              const imageData = mainImageObj && typeof mainImageObj === 'object' ? mainImageObj as Media : null;
              const imageUrl = imageData?.sizes?.card?.url || imageData?.url;
              const imageAlt = imageData?.alt || product.name;

              return (
              <FadeIn key={product.id} delay={idx * 0.05}>
                <Link href={`/le-marche/${product.slug}`} aria-label={`Détails du produit ${product.name}`}>
                  <span className="sr-only">{product.name} - Voir le produit</span>
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full bg-card/60 backdrop-blur-sm group">
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      {imageUrl ? (
                        <>
                          <Image
                            src={imageUrl}
                            alt={typeof imageAlt === 'string' ? imageAlt : product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {imageData?.attribution && (
                            <div className="absolute bottom-0 right-0 bg-black/40 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded-tl-md italic">
                              {imageData.attribution}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground italic font-spirax">
                          [Photo à venir]
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="font-spirax text-2xl text-primary group-hover:text-primary/80 transition-colors">{product.name}</CardTitle>      
                        {product.price && <span className="font-bold font-sans text-lg">{product.price}€</span>}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.categories?.map((cat) => {
                          const catData = cat as Category;
                          return (
                            <Badge key={catData.id} variant="secondary" className="font-normal font-sans bg-secondary/20 text-secondary-foreground text-[10px] uppercase tracking-wider">
                              {catData.title}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 font-sans">
                        {product.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            )})}
            </div>
          </FadeInStagger>
        </div>
      </FadeIn>
      )}
    </div>
  )
}
