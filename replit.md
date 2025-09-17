# Overview

Cognos is a "local-first" thought companion application designed as a "jardin secret pour les idées" (secret garden for ideas). The app helps users cultivate and connect their thoughts through multiple interfaces: a notebook for capturing ideas, a cosmic view for exploring connections, and workshop tools for organizing content. Built with Next.js and featuring a warm, French-inspired design aesthetic using the "French Dream Palette" with soft peach, lavender, and honey tones.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses Next.js 14 with App Router architecture and TypeScript for type safety. The UI is built with a component-based approach using React Server Components where appropriate and client components for interactive features.

**Design System:**
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for styling with custom CSS variables
- shadcn/ui component library for consistent UI patterns
- Custom French Dream Palette color scheme with warm, soft tones
- Lora and Lexend fonts for typography hierarchy

**State Management:**
- React useState hooks for local component state
- Client-side only architecture with no backend persistence currently
- Multi-screen navigation system with screen-based state management

## Component Structure
The app follows a modular component architecture:
- UI components in `/components/ui/` following shadcn/ui patterns
- Shared utilities in `/lib/utils.ts` 
- Theme configuration through CSS custom properties
- Icon system using Lucide React icons

## Screen Architecture
The application implements a multi-screen interface pattern:
- **Carnet (Notebook):** Note-taking and idea capture interface
- **Cosmos:** Visual exploration of idea connections
- **Atelier (Workshop):** Content organization and management tools
- **Rouages (Gears):** Settings and configuration
- **Editeur (Editor):** Dedicated editing interface

## Interaction Patterns
- Voice search capabilities with microphone integration
- Long-press interactions for context menus
- Hover states and visual feedback systems
- Side panel navigation for detailed views
- Filter and search functionality across content types

## Data Architecture
Currently implements a client-side only data model with:
- Local state management for notes and content
- No persistence layer (suitable for adding database integration later)
- Support for multiple content types (notes, tasks, links, images)
- Tag-based organization system
- Time-based filtering capabilities

# External Dependencies

## Core Framework
- **Next.js 14.2.16:** React framework with App Router for modern web application architecture
- **React:** Component-based UI library with hooks for state management
- **TypeScript:** Type safety and enhanced developer experience

## UI Components & Styling
- **Radix UI:** Complete set of accessible, unstyled UI primitives including dialogs, dropdowns, tooltips, and form components
- **Tailwind CSS:** Utility-first CSS framework with custom design tokens
- **class-variance-authority:** Type-safe component variants
- **clsx & tailwind-merge:** Conditional class name utilities

## Development Tools
- **Lucide React:** Icon library for consistent iconography
- **date-fns:** Date manipulation and formatting utilities
- **Geist font:** Typography system from Vercel

## Deployment & Analytics
- **Vercel:** Hosting platform with automatic deployments
- **@vercel/analytics:** Built-in analytics tracking
- **v0.app integration:** Automated sync with v0.app for design iterations

## Font System
- **Google Fonts (Lora & Lexend):** Custom font loading with display swap optimization for performance

The application is designed to be easily extensible with database integration (such as Drizzle ORM with PostgreSQL) and additional external services as needed for the local-first architecture goals.