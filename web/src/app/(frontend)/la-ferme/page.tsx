import React from 'react'

export default function LaFermePage() {
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
            Au jardin de Lison est né d&apos;une envie profonde de renouer avec la terre et de proposer une alternative aux fleurs industrielles. 
            Notre micro-ferme s&apos;étend sur moins d&apos;un hectare, où chaque mètre carré est pensé pour favoriser la vie.
          </p>
          <p className="text-muted-foreground leading-relaxed font-lora text-lg">
            Ici, nous cultivons la patience et l&apos;observation. Nos fleurs ne sont pas forcées sous serre chauffée, elles grandissent au rythme du vent et de la pluie.
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
            <p className="text-muted-foreground">Compostage systématique et emballages naturels.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary/80">Biodiversité</h3>
            <p className="text-muted-foreground">Haies mellifères et aucun pesticide chimique.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary/80">Local & Saison</h3>
            <p className="text-muted-foreground">Fleurs 100% cultivées sur place en pleine terre.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
