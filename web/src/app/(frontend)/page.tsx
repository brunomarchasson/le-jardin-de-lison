import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import config from '@/payload.config'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flower, Info, Leaf, MapPin } from 'lucide-react'
import { WaveSeparator, FloralPattern } from '@/components/ui/decorative'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import type { Media } from '@/payload-types'
import { PAGE_DEFAULTS } from '@/constants/defaults'
import { Metadata } from 'next'
import heroDefault from '../../../public/hero-accueil.png'

// ISR: La page sera régénérée au maximum toutes les heures
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Accueil | Fleurs bio, locales et de saison',
  description:
    'Micro-ferme florale bio au Puy-Sainte-Réparade. Découvrez nos fleurs paysannes, nos bouquets de saison et notre démarche de slow floriculture.',
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const content = await payload.findGlobal({
    slug: 'page-content',
  })

  const contact = content.contact || {}

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Au jardin de Lison',
    description:
      'Micro-ferme florale bio, locale et de saison au Puy-Sainte-Réparade. Fleurs paysannes, bouquets de saison et slow floriculture en circuit court.',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://aujardindelison.fr',
    telephone: contact.telephone || PAGE_DEFAULTS.contact.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.adresse || PAGE_DEFAULTS.contact.adresse,
      addressLocality: contact.ville || 'Le Puy-Sainte-Réparade',
      postalCode: contact.codePostal || '13610',
      addressRegion: 'Bouches-du-Rhône',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6631,
      longitude: 5.4326,
    },
    areaServed: [
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'City', name: 'Le Puy-Sainte-Réparade' },
      { '@type': 'Region', name: 'Luberon' },
      { '@type': 'Region', name: 'Bouches-du-Rhône' },
    ],
    keywords:
      'fleurs bio, fleurs locales, slow floriculture, bouquets de saison, micro-ferme florale, fleurs paysannes, Provence, Aix-en-Provence, Luberon',
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }

  const glanageStatus = {
    open: { label: 'Ouvert', color: 'bg-green-600' },
    closed: { label: 'Fermé', color: 'bg-stone-500' },
    soon: { label: 'Bientôt', color: 'bg-amber-500' },
  }

  const p = content.accueil || {}
  const currentGlanage =
    glanageStatus[p.glanage as keyof typeof glanageStatus] || glanageStatus.closed
  const heroImage = p.heroImage as Media | null
  const heroImageUrl = heroImage?.url || null
  const heroSubText = p.heroSubText || PAGE_DEFAULTS.accueil.heroSubText
  const philosophieTitle = p.philosophieTitle || PAGE_DEFAULTS.accueil.philosophieTitle
  const philosophieText = p.philosophieText || PAGE_DEFAULTS.accueil.philosophieText

  const seoSectionEnabled = p.seoSectionEnabled ?? PAGE_DEFAULTS.accueil.seoSectionEnabled
  const seoItems = p.seoItems && p.seoItems.length > 0 ? p.seoItems : PAGE_DEFAULTS.accueil.seoItems

  return (
    <div className="flex flex-col min-h-screen grainy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt="Au jardin de Lison - Micro-ferme florale bio"
              fill
              priority
              fetchPriority="high"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={75}
            />
          ) : (
            <Image
              src={heroDefault}
              alt="Au jardin de Lison - Micro-ferme florale bio"
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={75}
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-12">
          {/* Ces animations sont en CSS pur (pas d'observer) pour le LCP */}
          <div className="inline-block p-3 border border-white/30 rounded-full mb-6 backdrop-blur-sm animate-in fade-in zoom-in duration-1000">
            <Leaf className="w-8 h-8 text-white/90" />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 fill-mode-both">
            <h1 className="text-6xl md:text-9xl font-spirax mb-6 drop-shadow-lg tracking-wide">
              Au jardin de Lison
            </h1>
            <h2 className="sr-only">Micro-ferme florale bio au Puy-Sainte-Réparade</h2>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300 fill-mode-both">
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md text-white/90 leading-relaxed">
              {heroSubText}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 text-background">
          <WaveSeparator flip />
        </div>
      </section>

      {/* Contenu Principal */}
      <div className="relative py-12 md:py-24">
        <FloralPattern opacity={0.03} />

        <div className="container mx-auto px-4 relative z-10">
          <FadeInStagger>
            <div
              className={`grid grid-cols-1 ${p.whereIsCecileEnabled ? 'lg:grid-cols-3 md:grid-cols-2' : 'md:grid-cols-2'} gap-8 md:gap-16 items-stretch`}
            >
              {/* Météo des Fleurs */}
              <FadeIn direction="up">
                <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                  <div className="h-2 bg-secondary w-full" />
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Flower className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="font-spirax text-3xl text-primary">
                      Au jardin en ce moment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                      &quot;{p.meteoFleurs || 'La nature se repose...'}&quot;
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Statut Glanage */}
              <FadeIn direction="up">
                <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                  <div className="h-2 bg-primary w-full" />
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-spirax text-3xl text-primary">
                      Cueillette & Glanage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6 flex-grow">
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
                      <span className="text-muted-foreground font-medium">Statut du champ</span>
                      <Badge
                        className={`${currentGlanage.color} hover:${currentGlanage.color} text-white px-6 py-1 text-base border-none rounded-full font-spirax tracking-wide`}
                      >
                        {currentGlanage.label}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-lora">
                      Le champ est ouvert à la cueillette selon les horaires et la floraison. Venez
                      composer votre bouquet directement à la source.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {p.whereIsCecileEnabled && (
                <FadeIn direction="up">
                  <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                    <div className="h-2 bg-accent w-full bg-amber-400" />
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="p-3 bg-amber-100 rounded-full">
                        <MapPin className="h-6 w-6 text-amber-600" />
                      </div>
                      <CardTitle className="font-spirax text-3xl text-primary">
                        Où me trouver aujourd&apos;hui ?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100/50 text-center">
                        <p className="text-2xl font-spirax text-primary leading-relaxed">
                          {p.whereIsCecile || 'Je suis au jardin !'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}
            </div>
          </FadeInStagger>

          {/* Intro Section */}
          <FadeIn delay={0.3}>
            <section className="mt-24 text-center max-w-3xl mx-auto space-y-8">
              <span className="text-sm uppercase tracking-[0.2em] text-primary/60 font-bold">
                Philosophie
              </span>
              <h2 className="text-4xl md:text-5xl font-spirax text-primary">{philosophieTitle}</h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground leading-loose font-light">
                {philosophieText}
              </p>
            </section>
          </FadeIn>

          {/* Section SEO / Engagements */}
          {seoSectionEnabled && (
            <FadeIn delay={0.4}>
              <section className="mt-24 py-12 border-t border-primary/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  {seoItems.map(
                    (item: { title: string; text: string; id?: string }, idx: number) => (
                      <div key={item.id || idx} className="space-y-4">
                        <h3 className="font-spirax text-2xl text-primary/80 text-center md:text-left">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-lora">
                          {item.text}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </section>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  )
}
