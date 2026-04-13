import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente (CGV) - Au jardin de Lison',
  description: 'Consultez les conditions générales de vente du jardin de Lison pour les particuliers et les professionnels.',
  alternates: {
    canonical: '/cgv',
  },
}

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-8 text-center">Conditions Générales de Vente</h1>
      
      <div className="prose prose-stone max-w-none font-lora text-muted-foreground leading-relaxed space-y-12">
        
        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <h2 className="text-2xl font-spirax text-primary mt-0">Note importante</h2>
          <p>
            Le site <strong>aujardindelison.fr</strong> est une vitrine de notre production. Il ne permet pas le paiement en ligne direct pour le moment. 
            Toute commande s&apos;effectue par contact direct (téléphone, e-mail ou messagerie dédiée).
          </p>
        </section>

        {/* --- SECTION PROFESSIONNELS --- */}
        <section>
          <h2 className="text-3xl font-spirax text-primary border-b border-primary/10 pb-2">1. Conditions pour les Professionnels</h2>
          <p className="italic mb-4 text-sm">(Fleuristes, décorateurs, restaurateurs, etc.)</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground/80">Commandes et Disponibilités</h3>
              <p>
                La nature étant notre seul maître, nous ne garantissons pas de stock fixe à l&apos;avance. Les disponibilités réelles sont communiquées deux fois par semaine via notre groupe <strong>WhatsApp dédié aux professionnels</strong>. 
                Les commandes sont prises en compte par ordre d&apos;arrivée, dans la limite des tiges disponibles.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground/80">Livraisons Pro</h3>
              <p>
                Les livraisons sont assurées actuellement les <strong>lundis et mercredis</strong>. Ce planning est susceptible d&apos;évoluer selon la saison et l&apos;organisation de la ferme. 
                La livraison est possible dans un rayon géographique limité autour du Puy-Sainte-Réparade (nous contacter pour valider votre zone).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground/80">Modalités de Paiement</h3>
              <p>
                Pour soutenir le développement de notre jeune structure et préserver notre trésorerie, le <strong>paiement comptant</strong> à la livraison (ou par virement immédiat) est privilégié et fortement recommandé.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION PARTICULIERS --- */}
        <section>
          <h2 className="text-3xl font-spirax text-primary border-b border-primary/10 pb-2">2. Conditions pour les Particuliers</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground/80">Retrait et Réception</h3>
              <p>
                <strong>L&apos;accueil du public à la ferme n&apos;est pas encore possible.</strong><br />
                La récupération de vos fleurs s&apos;effectue soit en <strong>point relais</strong> chez nos partenaires locaux, soit par <strong>livraison</strong> à domicile (selon conditions et zone géographique). Les points de retrait vous seront communiqués lors de votre commande.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground/80">Droit de rétractation</h3>
              <p>
                Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les produits susceptibles de se détériorer ou de se périmer rapidement. 
                Les fleurs coupées étant des produits périssables par nature, aucune annulation ou retour ne sera accepté après la préparation de la commande.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground/80">Garantie "Produit Vivant"</h3>
              <p>
                Nos fleurs sont cultivées en plein champ, sans produits chimiques de synthèse. Des variations naturelles de couleur, de taille ou de forme par rapport aux photos du catalogue sont normales et garantissent l&apos;authenticité de nos fleurs paysannes.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center pt-12">
          <p className="text-sm">
            Pour toute question, n&apos;hésitez pas à nous contacter directement sur notre <Link href="/contact" className="text-primary underline">page contact</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
