# Spécifications Techniques - Projet "Au jardin de Lison"

## 1. Architecture Globale : "Le Monolithe Modulaire"

### Philosophie
*   **100% Self-Hosted** : Indépendance totale, hébergement sur VPS.
*   **0€ de Frais Récurrents** : Usage de logiciels open-source.
*   **Performance & SEO** : Priorité absolue.

### La Stack Technique
*   **Frontend & Backend** : **Next.js (App Router)**.
*   **CMS Headless Intégré** : **Payload CMS 3.0**.
    *   **Note Responsivité** : L'interface d'administration de Payload est nativement responsive, permettant une gestion complète sur smartphone.
*   **Base de Données** : **PostgreSQL**.
*   **Design & UI** : **Tailwind CSS**.
    *   Approche **Mobile-First** systématique.
    *   Composants UI accessibles via `shadcn/ui`.

---

## 2. Infrastructure & Déploiement
*   **Prod** : VPS Linux géré via **Coolify**.
*   **Sauvegarde** : Automatisée vers **Cloudflare R2** (Stockage externe gratuit < 10Go).

---

## 3. Détails d'Implémentation

### A. SEO Local & Sémantique
*   Injection de données structurées **Schema.org `LocalBusiness`**.
*   Gestion dynamique des Meta-tags (Titres, Descriptions, OpenGraph) via Payload.
*   Sitemap automatique et robots.txt optimisé.

### B. Accessibilité (A11y)
*   Respect des ratios de contraste pour la lisibilité.
*   Support du mode `prefers-reduced-motion` (déjà implémenté).
*   Structure HTML sémantique et attributs ARIA là où c'est nécessaire.
*   Focus visible pour la navigation au clavier.

### C. Performance & Images
*   Redimensionnement et conversion WebP au moment de l'upload via **Hooks Payload**.

### C. Automatisation Réseaux Sociaux
*   Publication auto sur FB/Insta via Hook Payload et API Meta.

### D. Communication B2B (Mailing & WhatsApp)
*   Endpoints dédiés et helper UI (Clipboard) pour WhatsApp.

### E. QR Codes
*   Génération dynamique des QR codes basée sur les URLs des produits.

### F. Assistant IA (Hybride)
*   **Stratégie** : Architecture multi-fournisseurs pour optimiser coût et qualité.
*   **Fournisseur par défaut** : **Google Gemini 1.5 Pro**.
    *   **Coût** : Gratuit (Free Tier : 50 requêtes/jour).
    *   **Gestion** : Clé API configurée côté serveur (env `GEMINI_API_KEY`).
*   **Fournisseur Optionnel** : **Anthropic Claude 3.5 Sonnet**.
    *   **Usage** : Pour une qualité rédactionnelle "Luxe".
    *   **Gestion** : Champ dans `SiteSettings` pour que l'utilisatrice puisse saisir sa propre clé API si elle le souhaite.
*   **Coût estimé** : 0€/mois par défaut. ~0.50€/mois pour 10 articles avec Claude.
*   **Implémentation** : Custom Endpoint Payload (`/api/ai/generate`) avec pattern Adapter pour changer de modèle dynamiquement.