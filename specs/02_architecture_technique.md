# Spécifications Techniques - Projet "Le Jardin"

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

### B. Performance & Images
*   Redimensionnement et conversion WebP au moment de l'upload via **Hooks Payload**.

### C. Automatisation Réseaux Sociaux
*   Publication auto sur FB/Insta via Hook Payload et API Meta.

### D. Communication B2B (Mailing & WhatsApp)
*   Endpoints dédiés et helper UI (Clipboard) pour WhatsApp.

### E. QR Codes
*   Génération dynamique des QR codes basée sur les URLs des produits.