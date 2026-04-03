import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "Conditions Générales d'Utilisation (CGU) - Au jardin de Lison",
  description: "Conditions générales d'utilisation du site Au jardin de Lison.",
}

export default function CGUPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-6">Conditions Générales d&apos;Utilisation</h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
      </header>

      <div className="prose prose-lg max-w-none font-lora text-muted-foreground space-y-10 leading-relaxed">
        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">1. Présentation du site</h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (CGU) encadrent l&apos;accès et l&apos;utilisation du site <strong>Au jardin de Lison</strong> (ci-après « le Site »). 
          </p>
          <p>
            Le Site a pour objet de présenter l&apos;activité de micro-ferme florale de Cécile Luzel, de proposer un blog d&apos;information et, à terme, des services de réservation ou de vente en ligne.
          </p>
          <p>
            En accédant au Site, tout utilisateur accepte sans réserve les présentes CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">2. Accès au site</h2>
          <p>
            Le Site est accessible gratuitement en tout lieu à tout utilisateur ayant un accès à Internet. Tous les frais supportés par l&apos;utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
          </p>
          <p>
            L&apos;Éditeur s&apos;efforce de permettre l&apos;accès au Site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d&apos;un événement hors du contrôle de l&apos;Éditeur, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du Site et des services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du Site (textes, images, logos, design, sons, vidéos) est protégé par le droit d&apos;auteur, le droit des marques et plus généralement par la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;Éditeur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">4. Responsabilité</h2>
          <p>
            Les sources des informations diffusées sur le Site sont réputées fiables mais le Site ne garantit pas qu&apos;il soit exempt de défauts, d&apos;erreurs ou d& omissions. 
          </p>
          <p>
            L&apos;Éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du Site ou des informations qu&apos;il contient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">5. Données personnelles et Cookies</h2>
          <p>
            L&apos;Éditeur s&apos;engage à traiter les données personnelles des utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p>
            Pour connaître le détail de notre politique de gestion des données et des cookies, l&apos;utilisateur est invité à consulter notre <Link href="/politique-de-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">6. Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens hypertextes vers d&apos;autres sites web. L&apos;Éditeur n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques en matière de protection des données personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">7. Modification des CGU</h2>
          <p>
            L&apos;Éditeur se réserve le droit de modifier les présentes CGU à tout moment afin de les adapter aux évolutions du Site et/ou de sa législation. L&apos;utilisateur est invité à les consulter régulièrement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">8. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  )
}
