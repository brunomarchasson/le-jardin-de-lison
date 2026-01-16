import React from 'react'

export default function LaFermePage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-4xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-6">La Ferme</h1>
        <p className="text-xl text-muted-foreground font-light italic">
          Une démarche engagée pour une floriculture douce et respectueuse.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif italic">Notre Histoire</h2>
          <p className="text-muted-foreground leading-relaxed">
            Au jardin de Lison est né d'une envie profonde de renouer avec la terre et de proposer une alternative aux fleurs industrielles. 
            Notre micro-ferme s'étend sur moins d'un hectare, où chaque mètre carré est pensé pour favoriser la vie.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ici, nous cultivons la patience et l'observation. Nos fleurs ne sont pas forcées sous serre chauffée, elles grandissent au rythme du vent et de la pluie.
          </p>
        </div>
        <div className="bg-muted aspect-square rounded-2xl overflow-hidden shadow-inner flex items-center justify-center text-muted-foreground italic">
          [Photo de la ferme]
        </div>
      </section>

      <section className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
        <h2 className="text-3xl font-serif italic mb-6 text-center text-green-800">Démarche Écologique</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="font-bold text-green-700">Zéro Déchet</h3>
            <p className="text-sm text-green-900/70">Compostage systématique et emballages naturels.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-green-700">Biodiversité</h3>
            <p className="text-sm text-green-900/70">Haies mellifères et aucun pesticide chimique.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-green-700">Local & Saison</h3>
            <p className="text-sm text-green-900/70">Fleurs 100% cultivées sur place en pleine terre.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
