import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function LaFermePage() {
  const payload = await getPayload({ config })
  
  // Tentative de récupération de la page dans Payload
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'la-ferme' },
      status: { equals: 'published' }
    }
  })

  const cmsPage = pages[0]

  // Si une page est définie dans le CMS, on l'affiche
  if (cmsPage) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
         <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">{cmsPage.title}</h1>
         </header>
         <div className="prose prose-lg max-w-none font-lora">
            <RichText content={cmsPage.content} />
         </div>
      </div>
    )
  }

  // FALLBACK : Design actuel en dur
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-4xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">La Ferme</h1>
        <p className="text-xl text-muted-foreground font-light italic font-lora">
          Une démarche engagée pour une floriculture douce et respectueuse.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-spirax text-primary">Notre Histoire</h2>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Je m’appelle Cécile je suis fleuriste depuis quelques années et l’envie c’est imposée à moi de travailler avec mes fleurs, pas celles du bout du monde, mais celles de mon jardin. 
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
           Et si j’ai choisi ce nom, ce n’est pas un hasard.<br/>
          Lison, c’était ma grand-mère. ( enfin son petit surnom … France Elisabeth ça fait un peu long )
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Quand j’étais enfant, aller dans son jardin était un vrai bonheur.<br/>
            On y trouvait des fleurs partout, des parfums délicats, des légumes et des fruits ,des couleurs qui changeaient au fil des saisons… et surtout, une sensation de calme et de joie simple.
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            C’est dans ce jardin que j’ai appris à aimer la nature, à observer, à prendre le temps.
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Aujourd’hui, avec ma microferme florale, j’ai envie de faire vivre cet héritage.<br />
            <strong>Au jardin de Lison</strong>, je cultive des fleurs avec soin, au rythme des saisons, dans le respect de la terre. ( en agriculture biologique ) 
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Chaque bouquet, chaque fleur, raconte une histoire :
            <br />
            Celle d’un souvenir d’enfance, d’un moment de douceur, d’un petit bonheur à offrir ou à s’offrir.
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Le jardin évolue en fonction des saisons et surtout en fonction de nous, petit a petit vous découvrirai des surprises … parce que dans le jardin de Lison il n’y aura peut être pas que des fleurs 😉
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Bienvenue dans mon jardin. 🌿
          </p>
        </div>
        <div className="bg-muted aspect-square rounded-3xl overflow-hidden shadow-inner flex items-center justify-center text-muted-foreground italic font-spirax text-xl">
          [Photo de la ferme]
        </div>
      </section>

      <section className="bg-secondary/20 p-8 md:p-12 rounded-[2rem] border border-secondary/20">
        <h2 className="text-3xl font-spirax mb-8 text-center text-primary">Démarche Écologique</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-lora">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary/80">Zéro Déchet</h3>
            <p className="text-muted-foreground">Sac à bouquets et emballages naturels.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary/80">Biodiversité</h3>
            <p className="text-muted-foreground">Variétés de fleurs milifère  et aucun pesticide chimique.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary/80">Local & Saison</h3>
            <p className="text-muted-foreground">Fleurs cultivées sur place en pleine terre.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
