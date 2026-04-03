import React from 'react'

export const metadata = {
  title: 'Mentions Légales - Au jardin de Lison',
  description: 'Informations légales concernant l\'éditeur et l\'hébergeur du site Au jardin de Lison.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-6">Mentions Légales</h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
      </header>

      <div className="prose prose-lg max-w-none font-lora text-muted-foreground space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Éditeur du site</h2>
          <p>
            Le site <strong>Au jardin de Lison</strong> (ci-après « le Site »), accessible à l'adresse <a href="https://aujardindelison.fr">https://aujardindelison.fr</a>, est édité par :<br />
            <strong>Cécile Luzel</strong><br />
            Domiciliée à : 13610 Le Puy-Sainte-Réparade<br />
            Téléphone : +33 7 49 59 09 94<br />
            Email : hello@aujardindelison.fr
          </p>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 my-6">
            <h3 className="text-xl font-spirax text-primary mb-2">Statut CAPE (Contrat d'Appui au Projet d'Entreprise)</h3>
            <p className="text-sm">
              Cécile Luzel est titulaire d’un Contrat d'Appui au Projet d'Entreprise (CAPE) avec la couveuse d’activités <strong>COSENS</strong>.<br />
              Conformément à l'article L127-1 du Code de commerce, l'identification de la structure d'appui est obligatoire :
            </p>
            <ul className="text-sm list-none pl-0 mt-2">
              <li><strong>Raison sociale :</strong> COSENS (association loi 1901)</li>
              <li><strong>Siège social :</strong> 2A rue de Rome, 13001 Marseille</li>
              <li><strong>SIRET :</strong> 419 369 798 000 48</li>
              <li><strong>Représentée par :</strong> M. Xavier Chantepy</li>
            </ul>
            <p className="text-sm italic mt-2">
              Le contrat a été signé le 02/02/2026 pour une durée de 1 an renouvelable.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Directeur de la publication</h2>
          <p>
            Le Directeur de la publication du Site est <strong>Cécile Luzel</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Hébergement</h2>
          <p>
            Le Site est hébergé par :<br />
            <strong>Hetzner Online GmbH</strong><br />
            Industriestr. 25, 91710 Gunzenhausen, Allemagne<br />
            Tel: +49 (0)9831 505-0<br />
            Site web : <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer">www.hetzner.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Propriété Intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant ce Site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le Site lui-même, sont la propriété exclusive de <strong>Au jardin de Lison</strong>.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'Éditeur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Crédits Photos</h2>
          <p>
            Les photographies présentes sur ce site sont soumises au droit d'auteur. Les crédits respectifs sont mentionnés directement sur ou à proximité des images utilisées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Création du site</h2>
          <p>
            Ce site a été conçu et réalisé par : <strong>Bruno Marchasson</strong> (SIRET : 44534914500026).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">Contact</h2>
          <p>
            Pour toute question ou demande d'information concernant le Site, ou tout signalement de contenu ou d'activités illicites, l'utilisateur peut contacter l'Éditeur à l'adresse suivante : <strong>hello@aujardindelison.fr</strong> ou par courrier recommandé avec accusé de réception adressé à l'Éditeur aux coordonnées précisées plus haut.
          </p>
        </section>
      </div>
    </div>
  )
}
