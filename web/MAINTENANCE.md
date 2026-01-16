# Guide de Maintenance - Au jardin de Lison

Ce document recense les informations essentielles pour maintenir et faire évoluer le projet "Au jardin de Lison" (Partie Web).

## 1. Architecture Technique
Le projet est un **Monolithe Modulaire** basé sur :
*   **Framework** : Next.js 15 (App Router).
*   **CMS** : Payload CMS 3.0 (Headless, intégré dans Next.js).
*   **Base de données** : PostgreSQL (via Docker).
*   **UI/Design** : Tailwind CSS v4 + shadcn/ui.
*   **Langage** : TypeScript.

## 2. Personnalisation du Design (Thème Global)
L'identité visuelle est centralisée dans un seul fichier pour faciliter les changements sans toucher au code complexe.

*   **Fichier** : `src/app/(frontend)/theme.css`
*   **Ce que vous pouvez modifier** :
    *   **Couleurs** : Palette définie en format `oklch` (Luminosité, Chroma, Teinte).
        *   `--primary` : Vert Forêt (Boutons, titres majeurs).
        *   `--secondary` : Rose Ancien (Badges, éléments décoratifs).
        *   `--background` : Crème/Papier (Fond du site).
    *   **Polices** : Variables `--font-serif` (Titres) et `--font-sans` (Textes).
    *   **Arrondis** : Variable `--radius` (Coins des boutons et cartes).

**Note** : Le fichier `styles.css` gère les aspects techniques et importe `theme.css`. Évitez de le modifier sauf pour des besoins avancés.

## 3. Gestion du Contenu (CMS)
L'interface d'administration est accessible via : `http://localhost:3000/admin`

### Collections Principales
*   **Pages** : Pour créer/modifier les pages libres (Mentions légales, etc.) ou modifier le contenu des pages existantes si configuré.
*   **Articles (Blog)** : Rédaction des actualités. Image de couverture requise.
*   **Fleurs** : Catalogue. Chaque fleur a un stock, un prix et une saison.
*   **Catégories** : Pour classer les articles.

### Paramètres Globaux
*   **Site Settings** :
    *   **Météo des fleurs** : Petite phrase affichée sur l'accueil.
    *   **Feu Tricolore Glanage** : Statut (Ouvert/Fermé/Bientôt) affiché en temps réel.

## 4. Développement & Commandes
L'application se trouve dans le dossier `web/`.

### Pré-requis
*   Node.js (v18+)
*   Docker Desktop (pour la base de données)
*   pnpm (recommandé) ou npm

### Lancer le projet
1.  **Démarrer la base de données** :
    ```bash
    cd web
    docker-compose up -d
    ```
    *Note : Le port PostgreSQL est configuré sur `5433` pour éviter les conflits.*

2.  **Lancer le serveur de développement** :
    ```bash
    pnpm dev
    ```
    Le site sera accessible sur `http://localhost:3000`.

### Autres commandes utiles
*   `pnpm dlx shadcn@latest add [composant]` : Ajouter un composant UI (ex: `dialog`, `input`).
*   `pnpm build` : Construire l'application pour la production.

## 5. Structure des Dossiers
```
web/
├── src/
│   ├── app/
│   │   ├── (frontend)/      # Le Site Web (Next.js)
│   │   │   ├── layout.tsx   # Structure globale (Header, Footer, Fontes)
│   │   │   ├── theme.css    # LE FICHIER DE CONFIGURATION DESIGN
│   │   │   └── page.tsx     # Page d'accueil
│   │   └── (payload)/       # L'Admin Panel (CMS)
│   ├── collections/         # Définition des types de contenu (Schema DB)
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/              # Composants de base (Boutons, Cards...)
│   │   └── RichText.tsx     # Afficheur de contenu riche
│   └── globals/             # Paramètres globaux (Config site)
├── public/                  # Images statiques
└── payload.config.ts        # Configuration du CMS
```
