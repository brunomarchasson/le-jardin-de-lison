import React from 'react'

export const metadata = {
  title: 'Conditions Générales de Vente (CGV) - Au jardin de Lison',
  description: 'Conditions générales de vente pour les fleurs et ateliers du jardin de Lison.',
}

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-spirax text-primary mb-6">Conditions Générales de Vente</h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
      </header>

      <div className="prose prose-lg max-w-none font-lora text-muted-foreground space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>Cécile Luzel</strong> (agissant sous contrat CAPE avec COSENS) et toute personne effectuant un achat sur le site <strong>Au jardin de Lison</strong>.
          </p>
          <p>
            L&apos;acquisition d&apos;un produit ou d&apos;un service à travers le présent site implique une acceptation sans réserve par l&apos;acheteur des présentes conditions de vente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">2. Produits et Services</h2>
          <p>
            Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site. Il s&apos;agit principalement de fleurs de saison, de bouquets, et de réservations pour des ateliers pédagogiques ou créatifs.
          </p>
          <p className="italic">
            Note sur les fleurs : Les végétaux sont des produits vivants. Les photographies du catalogue sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit livré (couleurs, épanouissement des fleurs, etc.), car chaque bouquet est unique et dépend de la récolte du jour.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">3. Tarifs</h2>
          <p>
            Les prix figurant dans le catalogue sont des prix TTC en euros tenant compte de la TVA applicable au jour de la commande. Au jardin de Lison se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l&apos;acheteur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">4. Commande et Paiement</h2>
          <p>
            L&apos;acheteur passe commande sur le site. Le paiement est exigible immédiatement au moment de la commande. Le règlement s&apos;effectue par carte bancaire via une plateforme sécurisée. La commande ne sera considérée comme définitive qu&apos;après confirmation du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">5. Modalités de retrait (Click & Collect)</h2>
          <p>
            Sauf mention contraire, les produits ne font pas l&apos;objet d&apos;une livraison à domicile. Ils sont à retirer par l&apos;acheteur au point de collecte désigné (la ferme à 13610 Le Puy-Sainte-Réparade) aux jours et horaires indiqués lors de la commande.
          </p>
          <p>
            En cas de non-retrait d&apos;un produit périssable (fleurs) à la date prévue, la commande restera due et ne pourra faire l&apos;objet d&apos;un remboursement, le produit ne pouvant être remis en vente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">6. Droit de rétractation</h2>
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
            <p className="font-semibold text-primary mb-2">Important - Produits périssables :</p>
            <p className="text-sm">
              Conformément à l&apos;article L221-28 4° du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens susceptibles de se détériorer ou de se périmer rapidement. 
              <strong> Par conséquent, les commandes de fleurs coupées et bouquets ne sont ni échangeables, ni remboursables.</strong>
            </p>
            <p className="font-semibold text-primary mt-4 mb-2">Ateliers et autres objets :</p>
            <p className="text-sm">
              Pour les prestations de services (ateliers) ou les produits non périssables, l&apos;acheteur dispose d&apos;un délai de 14 jours pour exercer son droit de rétractation, à condition que la prestation n&apos;ait pas encore eu lieu.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">7. Garanties</h2>
          <p>
            Tous les produits fournis bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d&apos;un produit vendu (hors caractère périssable), il pourra être retourné et remboursé.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-spirax text-primary mb-4">8. Règlement des litiges</h2>
          <p>
            Les présentes CGV sont soumises à la loi française. En cas de litige, l&apos;acheteur s&apos;adressera en priorité à Cécile Luzel pour obtenir une solution amiable. À défaut, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  )
}
