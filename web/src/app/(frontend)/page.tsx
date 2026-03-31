import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flower, Info, Leaf } from 'lucide-react'
import { WaveSeparator, FloralPattern } from '@/components/ui/decorative'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import type { Media } from '@/payload-types'
import { PAGE_DEFAULTS } from '@/constants/defaults'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  // Récupération du contenu global
  const content = await payload.findGlobal({
    slug: 'page-content',
  })

  const glanageStatus = {
    open: { label: 'Ouvert', color: 'bg-green-600' },
    closed: { label: 'Fermé', color: 'bg-stone-500' },
    soon: { label: 'Bientôt', color: 'bg-amber-500' },
  }

  const currentGlanage = glanageStatus[content.glanage as keyof typeof glanageStatus] || glanageStatus.closed  
  
  // Fallbacks Hero
  const heroImage = content.heroImage as Media | null
  const heroImageUrl = heroImage?.url || '/hero-accueil.png'
  const heroSubText = content.heroSubText || PAGE_DEFAULTS.accueil.heroSubText
  
  // Fallbacks Philosophie
  const philosophieTitle = content.philosophieTitle || PAGE_DEFAULTS.accueil.philosophieTitle
  const philosophieText = content.philosophieText || PAGE_DEFAULTS.accueil.philosophieText

  return (
    <div className="flex flex-col min-h-screen grainy">

      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url('${heroImageUrl}')` }}
             />
             <div className="absolute inset-0 bg-black/20" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-12">
          <FadeIn direction="down">
            <div className="inline-block p-3 border border-white/30 rounded-full mb-6 backdrop-blur-sm">        
               <Leaf className="w-8 h-8 text-white/90" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-9xl font-spirax mb-6 drop-shadow-lg tracking-wide">
              Au jardin de Lison
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md text-white/90 leading-relaxed">
              {heroSubText}
            </p>
          </FadeIn>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

              {/* Météo des Fleurs */}
              <FadeIn direction="right">
                <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm overflow-hidden h-full">    
                  <div className="h-2 bg-secondary w-full" />
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Flower className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="font-spirax text-3xl text-primary">Au jardin en ce moment</CardTitle> 
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                      &quot;{content.meteoFleurs || "La nature se repose..."}&quot;
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Statut Glanage */}
              <FadeIn direction="left">
                <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm overflow-hidden h-full">    
                  <div className="h-2 bg-primary w-full" />
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-spirax text-3xl text-primary">Cueillette & Glanage</CardTitle>   
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
                      <span className="text-muted-foreground font-medium">Statut du champ</span>
                      <Badge className={`${currentGlanage.color} hover:${currentGlanage.color} text-white px-6 py-1 text-base border-none rounded-full font-spirax tracking-wide`}>
                        {currentGlanage.label}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Le champ est ouvert à la cueillette selon les horaires et la floraison.
                      Venez composer votre bouquet directement à la source.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

            </div>
          </FadeInStagger>

          {/* Intro Section */}
          <FadeIn delay={0.3}>
            <section className="mt-24 text-center max-w-3xl mx-auto space-y-8">
              <span className="text-sm uppercase tracking-[0.2em] text-primary/60 font-bold">Philosophie</span> 
              <h2 className="text-4xl md:text-5xl font-spirax text-primary">{philosophieTitle}</h2>     
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground leading-loose font-light">
                {philosophieText}
              </p>
            </section>
          </FadeIn>

        </div>
      </div>
    </div>
  )
}
