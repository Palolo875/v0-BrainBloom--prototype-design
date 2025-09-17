# 🌸 Cognos - Jardin Secret pour les Idées

Un compagnon de pensée local-first pour cultiver et connecter vos idées avec élégance.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/julius-s-projects-ba623769/v0-brain-bloom)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Fonctionnalités

### 🗂️ **Le Carnet**
- Interface épurée pour vos notes et réflexions
- Sauvegarde automatique locale
- Recherche intelligente dans vos pensées

### 🌌 **Le Cosmos**
- Visualisation des connexions entre vos idées
- Filtres par type de contenu et tags
- Interface interactive pour explorer les relations

### ✏️ **L'Éditeur**
- Éditeur de texte riche avec commandes rapides
- Barre d'outils flottante pour le formatage
- Support des raccourcis clavier

### 🔧 **L'Atelier**
- Modules personnalisables (tâches, journaling, voix)
- Configuration flexible de votre espace de travail

### ⚙️ **Les Rouages**
- Paramètres de l'application
- Préférences de synchronisation
- Thèmes et personnalisation

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm, yarn ou pnpm

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd cognos

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# Lancer en développement
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Construit l'application pour la production
npm run start        # Lance l'application en production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les erreurs ESLint
npm run format       # Formate le code avec Prettier
npm run format:check # Vérifie le formatage
npm run type-check   # Vérifie les types TypeScript

# Analyse
npm run analyze      # Analyse le bundle pour l'optimisation
```

## 🏗️ Architecture

### Structure du Projet
```
├── app/                    # App Router Next.js 14
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/             # Composants réutilisables
│   ├── common/            # Composants communs
│   ├── screens/           # Écrans de l'application
│   └── ui/                # Composants UI de base
├── hooks/                 # Hooks personnalisés
│   └── useAppState.ts     # Gestion d'état global
├── lib/                   # Utilitaires
│   └── utils.ts           # Fonctions utilitaires
└── public/                # Assets statiques
```

### Technologies Utilisées
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

## 🎨 Design System

### Palette de Couleurs
- **Toile de Lin** (#FBF9F6) - Arrière-plan principal
- **Gris Plume** (#5C5470) - Texte principal
- **Pêche du Matin** (#F3AB9A) - Accent principal
- **Lavande des Songes** (#B9B2D8) - Accent secondaire
- **Miel Doré** (#FADDAF) - Accent tertiaire

### Typographie
- **Lora** - Police serif pour les titres
- **Lexend** - Police sans-serif pour le texte

## 🔒 Sécurité

- Headers de sécurité configurés
- Validation des entrées utilisateur
- Protection CSRF
- Données stockées localement (localStorage)

## ♿ Accessibilité

- Navigation au clavier complète
- Attributs ARIA appropriés
- Contraste des couleurs optimisé
- Support des lecteurs d'écran

## 📱 Responsive Design

- Design adaptatif pour mobile, tablette et desktop
- Touch-friendly sur les appareils mobiles
- Optimisé pour les différentes tailles d'écran

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement si nécessaire
3. Déployez automatiquement à chaque push

### Autres Plateformes
L'application peut être déployée sur toute plateforme supportant Next.js :
- Netlify
- AWS Amplify
- Railway
- Docker

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Radix UI](https://www.radix-ui.com/) pour les composants accessibles
- [Lucide](https://lucide.dev/) pour les icônes