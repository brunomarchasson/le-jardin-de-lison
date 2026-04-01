import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import type { Media, Category, Product } from '@/payload-types'
import { PAGE_DEFAULTS } from '@/constants/defaults'

export const dynamic = 'force-dynamic'

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

  // Récupération des catégories pour le filtre
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
  })

  // Construction de la requête
  const whereQuery: any = {
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
        <FadeInStagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => {
              const mainImageObj = product.images && product.images.length > 0 ? product.images[0].image : null;   
              const imageData = mainImageObj && typeof mainImageObj === 'object' ? mainImageObj as Media : null;
              const imageUrl = imageData?.sizes?.card?.url || imageData?.url;
              const imageAlt = imageData?.alt || product.name;

              return (
              <FadeIn key={product.id} delay={idx * 0.05}>
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full bg-card/60 backdrop-blur-sm">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt={typeof imageAlt === 'string' ? imageAlt : product.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
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
                      <CardTitle className="font-spirax text-2xl text-primary">{product.name}</CardTitle>      
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
                      {product.name} disponible au jardin.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            )})}
          </div>
        </FadeInStagger>
      )}
    </div>
  )
}
