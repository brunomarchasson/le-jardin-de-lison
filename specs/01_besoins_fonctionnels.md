# Cahier des Charges Fonctionnel - Projet "Au jardin de Lison"

## 1. Vision & Identité
*   **Activité** : Micro-ferme florale (< 1 hectare), fleurs coupées locales, bio, de saison.
*   **Mission** : Offrir des fleurs mais aussi un espace de "Slow life", de bien-être et de reconnexion à la nature.
*   **Public** :
    *   **Particuliers** : Achat direct, glanage (cueillette), détente, soins, ateliers.
    *   **Professionnels (B2B)** : Fleuristes locaux (circuit court), Entreprises (Green Days).
*   **Ambiance** : Fleurie, Bucolique, Zen, Naturelle, Poétique.

---

## 2. Fonctionnalités - Phase 1 (Lancement & Visibilité)
L'objectif est de se faire connaître, d'informer et de construire une communauté.

### A. Expérience Visiteur (Site Web)
*   **Responsive Design (Mobile-First)** : Le site doit être parfaitement lisible et utilisable sur smartphones, tablettes et ordinateurs. L'expérience doit être fluide même en extérieur (luminosité, connexions mobiles).
*   **Page d'accueil Immersive** :
    *   Design épuré et poétique.
    *   **Widget "Météo des Fleurs"** : Un encart visuel dynamique affichant les variétés actuellement en floraison au jardin.
    *   **Indicateur "Feu Tricolore Glanage"** : Un statut "Ouvert / Fermé" en temps réel.
*   **Page "La Ferme"** : Histoire, démarche écologique, présentation de l'équipe.
*   **Le Blog (Journal de bord)** :
    *   Articles et **Diffusion Automatique** sur Facebook/Instagram.
*   **Catalogue Vitrine** : Présentation des fleurs/bouquets et tarifs.
*   **Lien Physique/Digital (QR Codes)** : QR codes générés pour chaque plante.
*   **Newsletter** : Formulaire d'inscription simple.
*   **Infos Pratiques** : Contact, Plan d'accès, Horaires.

### B. Administration (Pour la cliente)
Une interface unique (CMS) optimisée pour le mobile pour une gestion "au champ" :
*   Rédiger et publier les articles.
*   Mettre à jour la "Météo des fleurs" et le statut Glanage en un clic.
*   Gérer les fiches fleurs (photos, descriptions, prix, stock).
*   **Communication B2B (Fleuristes)** :
    *   Génération automatique d'un rapport de stock.
    *   Bouton "Envoyer par Email aux Pros".
    *   Bouton "Copier pour WhatsApp".

### C. Assistant Éditorial (IA)
Un outil d'aide à la rédaction intégré au CMS pour faciliter la création de contenu :
*   **Suggestion de sujets** : Proposition d'idées d'articles basées sur un thème donné et l'historique des publications (pour éviter les doublons).
*   **Rédaction assistée** : Génération de brouillons respectant le ton "bucolique, bienveillant et expert" de la ferme.
*   **Aide à l'illustration** : Suggestion de prompts pour la génération d'images ou recherche de photos.
*   **Flexibilité** : Fonctionne par défaut gratuitement (Google Gemini), avec possibilité pour l'utilisatrice de connecter son propre compte (Anthropic Claude) pour une qualité supérieure.
*   **Contrôle humain** : L'utilisateur reste maître du contenu et doit valider/remanier chaque proposition.

---

## 3. Fonctionnalités - Phase 2 (Services & Vente)
*   **E-shop (Click & Collect)** : Vente, panier, commandes et codes promo.
*   **Module de Réservation** : Prise de RDV (Soins) et inscriptions (Ateliers).
*   **Green Days** : Offres B2B.

---

## 4. Contraintes & Exigences
*   **Auto-hébergement** : Pas d'abonnements mensuels (hors VPS).
*   **Évolutivité** : Structure modulaire préparée pour la Phase 2.
*   **Performance & SEO** : Optimisation maximale pour le référencement naturel (chargement rapide, balisage sémantique).
*   **Accessibilité** : Site inclusif respectant les standards WCAG (confort de lecture, contrastes, navigation clavier).