import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { RichText } from '@/components/RichText'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { PAGE_DEFAULTS } from '@/constants/defaults'
import { Metadata } from 'next'

export const revalidate = 3600 // La page sera régénérée au maximum toutes les heures

export const metadata: Metadata = {
  title: 'La Ferme',
  description: 'Découvrez l\'histoire du jardin de Lison, notre démarche écologique et notre passion pour la slow floriculture bio.',
  alternates: {
    canonical: '/la-ferme',
  },
}

// Fonction utilitaire pour vérifier si le RichText Lexical est réellement vide
const isRichTextEmpty = (content: Record<string, unknown> | undefined | null) => {
  if (!content) return true;
  const root = content.root as Record<string, any>;
  if (!root || !root.children) return true;
  const children = root.children as any[];
  if (children.length === 0) return true;
  if (children.length === 1 && children[0].type === 'paragraph' && (!children[0].children || children[0].children.length === 0)) return true;
  return false;
}

export default async function LaFermePage() {
  const payload = await getPayload({ config })
  
  const content = await payload.findGlobal({
    slug: 'page-content',
  })

  const p = content.laFerme || {}

  const pageTitle = p.title || PAGE_DEFAULTS.laFerme.title
  const subText = p.subText || PAGE_DEFAULTS.laFerme.subText
  const histoireTitre = p.histoireTitre || PAGE_DEFAULTS.laFerme.histoireTitre
  const ecologieTitre = p.ecologieTitre || PAGE_DEFAULTS.laFerme.ecologieTitre
  const histoireImage = p.histoireImage as Media | null
  const imageUrl = histoireImage?.url || null

  const ecologieItems = p.ecologieItems && p.ecologieItems.length > 0 
    ? p.ecologieItems 
    : PAGE_DEFAULTS.laFerme.ecologieItems

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-4xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">{pageTitle}</h1>
        <p className="text-xl text-muted-foreground font-light italic font-lora">
          {subText}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-spirax text-primary">{histoireTitre}</h2>
          
          {!isRichTextEmpty(p.histoireTexte) ? (
            <div className="prose prose-lg max-w-none font-lora text-muted-foreground leading-relaxed">
               <RichText content={p.histoireTexte} />
            </div>
          ) : (
            <div className="space-y-4 text-muted-foreground leading-relaxed font-lora text-lg">
              <p>Je m&apos;appelle Cécile je suis fleuriste depuis quelques années et l&apos;envie c&apos;est imposée à moi de travailler avec mes fleurs, pas celles du bout du monde, mais celles de mon jardin.</p>
              <p>Et si j&apos;ai choisi ce nom, ce n&apos;est pas un hasard.<br/>Lison, c&apos;était ma grand-mère. ( enfin son petit surnom … France Elisabeth ça fait un peu long )</p>
              <p>Quand j&apos;étais enfant, aller dans son jardin était un vrai bonheur.<br/>On y trouvait des fleurs partout, des parfums délicats, des légumes et des fruits ,des couleurs qui changeaient au fil des saisons… et surtout, une sensation de calme et de joie simple.</p>
              <p>C&apos;est dans ce jardin que j&apos;ai appris à aimer la nature, à observer, à prendre le temps.</p>
              <p>Aujourd&apos;hui, avec ma microferme florale, j&apos;ai envie de faire vivre cet héritage.<br /><strong>Au jardin de Lison</strong>, je cultive des fleurs avec soin, au rythme des saisons, dans le respect de la terre. ( en agriculture biologique )</p>
              <p>Chaque bouquet, chaque fleur, raconte une histoire :<br />Celle d&apos;un souvenir d&apos;enfance, d&apos;un moment de douceur, d&apos;un petit bonheur à offrir ou à s&apos;offrir.</p>
              <p>Le jardin évolue en fonction des saisons et surtout en fonction de nous, petit a petit vous découvrirai des surprises … parce que dans le jardin de Lison il n&apos;y aura peut être pas que des fleurs 😉</p>
              <p>Bienvenue dans mon jardin. 🌿</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="bg-muted aspect-square rounded-3xl overflow-hidden shadow-inner relative flex items-center justify-center text-muted-foreground italic font-spirax text-xl text-center p-8">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt={histoireImage?.alt || histoireTitre} 
                fill 
                className="object-cover"
              />
            ) : (
              "[Photo de la ferme]"
            )}
          </div>
          {histoireImage?.attribution && (
            <span className="text-[10px] text-muted-foreground/60 text-right italic px-2">
              {histoireImage.attribution}
            </span>
          )}
        </div>
      </section>

      <section className="bg-secondary/20 p-8 md:p-12 rounded-[2rem] border border-secondary/20">
        <h2 className="text-3xl font-spirax mb-8 text-center text-primary">{ecologieTitre}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-lora">
          {ecologieItems.map((item: { title?: string | null; description?: string | null; id?: string | null }, idx: number) => (
            <div key={item.id || idx} className="space-y-3">
              <h3 className="font-bold text-xl text-primary/80">{item.title || ''}</h3>
              <p className="text-muted-foreground">{item.description || ''}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
