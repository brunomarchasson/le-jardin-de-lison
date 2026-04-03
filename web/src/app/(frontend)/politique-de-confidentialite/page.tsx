import React from 'react'

export const metadata = {
  title: 'Politique de Confidentialité - Au jardin de Lison',
  description: 'Politique de confidentialité concernant l\'absence de collecte de données sur le site Au jardin de Lison.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-6">Politique de Confidentialité</h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
      </header>

      <div className="prose prose-lg max-w-none font-lora text-muted-foreground space-y-8 leading-relaxed text-center">
        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4 text-left text-center">Engagement de confidentialité</h2>
          <p>
            Le site <strong>Au jardin de Lison</strong> accorde une importance primordiale au respect de la vie privée.
          </p>
          <p className="text-xl font-bold text-primary">
            Nous ne collectons aucune donnée personnelle sur ce site.
          </p>
          <ul className="list-none pl-0 space-y-4 inline-block text-left">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Pas de compte utilisateur ni de formulaire de connexion.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Pas de formulaire de contact direct (le contact se fait par email externe).</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Pas de cookies de pistage ou de marketing.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Pas d&apos;analyse d&apos;audience intrusive.</span>
            </li>
          </ul>
        </section>

        <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10 mt-12">
          <p className="text-sm italic">
            Votre navigation est totalement anonyme. Si vous nous contactez par email à l&apos;adresse <strong>hello@aujardindelison.fr</strong>, votre adresse email ne sera utilisée que pour vous répondre et ne sera jamais cédée à des tiers.
          </p>
        </section>
      </div>
    </div>
  )
}
