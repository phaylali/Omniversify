# Developer Notes — Omniversify

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Content Collections](#content-collections)
- [Styling System](#styling-system)
- [Key Features](#key-features)
- [Development Commands](#development-commands)
- [Build & Deployment](#build--deployment)
- [Performance Considerations](#performance-considerations)
- [Future Improvements](#future-improvements)

---

## Project Overview

Omniversify is a multi-page website for a creative studio building a unified multiverse across games, anime, series, and books. The site features a landing page, projects showcase, blog, news section, and wiki with full-text search.

**Type**: Static multi-page website  
**Target Users**: Gamers, anime fans, potential collaborators, and supporters  
**Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

---

## Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | [Astro](https://astro.build/) v6.0.4 |
| UI Library | [React](https://react.dev/) v19.2.4 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4.2.1 |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) v8.6.0 |
| Search | [Pagefind](https://pagefind.app/) (via astro-pagefind) |
| Animation | [tw-animate-css](https://github.com/nicokempe/tw-animate-css) v1.4.0 |
| Fonts | Geist Variable (via @fontsource-variable/geist) |
| Package Manager | Bun |
| Runtime | Node.js >= 22.12.0 |

---

## Project Structure

```
/
├── public/
│   └── favicon.svg              # Custom logo (star character design)
├── src/
│   ├── assets/                  # Static assets (SVG decorations)
│   ├── components/
│   │   ├── BackgroundPattern.astro    # Fixed geometric background
│   │   ├── Contact.astro              # Support/contact section
│   │   ├── Footer.astro                # Site footer with links
│   │   ├── Hero.astro                 # Landing hero section
│   │   ├── LoreCarousel.astro         # Lore carousel wrapper
│   │   ├── LoreCarousel.tsx           # Character/event carousel
│   │   ├── Navbar.astro               # Navigation bar with search
│   │   ├── ProjectsCarousel.astro     # Projects carousel wrapper
│   │   ├── ProjectsCarousel.tsx        # Game projects carousel
│   │   ├── Search.astro               # Pagefind search overlay
│   │   ├── Section.astro              # Reusable section wrapper
│   │   └── Vision.astro               # Studio vision section
│   ├── content/
│   │   ├── blog/                     # Blog posts (markdown)
│   │   ├── news/                     # News articles (markdown)
│   │   ├── projects/                 # Project entries (markdown)
│   │   └── wiki/                     # Wiki content (markdown)
│   │       ├── characters/
│   │       ├── events/
│   │       ├── realms/
│   │       └── weapons/
│   ├── content.config.ts         # Astro content collections config
│   ├── layouts/
│   │   └── Layout.astro               # Base HTML layout with theme
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro            # Blog feed
│   │   │   └── [id].astro             # Individual blog post
│   │   ├── news/
│   │   │   ├── index.astro            # News feed
│   │   │   └── [id].astro             # Individual news article
│   │   ├── projects/
│   │   │   ├── index.astro            # Projects feed
│   │   │   └── [id].astro             # Individual project page
│   │   ├── wiki/
│   │   │   ├── index.astro            # Wiki main page
│   │   │   └── [category]/
│   │   │       ├── index.astro        # Category listing
│   │   │       └── [id].astro         # Individual wiki entry
│   │   └── index.astro                # Home page
│   └── styles/
│       └── global.css                  # Tailwind + custom CSS variables
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## Component Architecture

### Layout Layer

- **Layout.astro** — Root layout component handling:
  - Theme detection and persistence (dark/light mode)
  - Global CSS imports
  - Meta tags and SEO
  - Font loading (Geist Variable)
  - Background pattern (applies to all pages)

### Navigation

- **Navbar.astro** — Fixed navigation bar with:
  - Logo
  - Search trigger (magnifying glass icon)
  - Menu dropdown (Home, News, About, Team, Careers)
  - Language dropdown (English, العربية, ⴽⵉⴼⵉⵏⴰⵖ)
  - Navigation links (Blog, Projects, Wiki, Shop)

### Page Components

| Component | Type | Purpose |
|-----------|------|---------|
| Hero | Astro | Logo, title, tagline with pulse animation |
| Vision | Astro | Studio mission statement |
| ProjectsCarousel | React | Horizontal scrolling project cards |
| LoreCarousel | React | Horizontal scrolling lore/character cards |
| Contact | Astro | Support options + contact form |
| Footer | Astro | Navigation links, licenses, copyright |
| Search | Astro | Pagefind search overlay modal |

### React Components (Interactive)

- **ProjectsCarousel.tsx** — Embla-powered carousel displaying project cards
- **LoreCarousel.tsx** — Embla-powered carousel displaying wiki entries

---

## Content Collections

The site uses Astro 6's content collections with the loader API:

### Collections

| Collection | Path | Purpose |
|-----------|------|---------|
| projects | `src/content/projects/*.md` | Game projects |
| wiki | `src/content/wiki/[category]/*.md` | Lore entries |
| blog | `src/content/blog/*.md` | Blog posts |
| news | `src/content/news/*.md` | News articles |

### Wiki Categories

- **characters/** — Character profiles (Aether, Lyra, Kairos)
- **events/** — Historical events (Nexus War, The Fracture)
- **realms/** — Locations and realms (Crystal Age)
- **weapons/** — Weapons and artifacts (Void Blade)

---

## Styling System

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the Vite plugin:

```css
@import "tailwindcss";
```

### Design Tokens (CSS Variables)

**Dark Theme** (default):
- Background: `oklch(0.145 0 0)` (near black)
- Foreground: `oklch(0.985 0 0)` (near white)

### Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Gold | `#C2B067` | Main accent, text, borders |
| Gold Dark | `#8a7a3a` | Gradient endpoints |
| Content Text | `#F8F5FA` | Body text on content pages |

### Content Page Colors

Content pages (Wiki, Blog, News, Projects) use `#F8F5FA` for body text while keeping headings/titles in gold `#C2B067`.

---

## Key Features

### 1. Scroll Snap Navigation

Full-page sections on the home page with CSS scroll-snap.

### 2. Dark Mode Support

Theme detection with localStorage persistence.

### 3. Embla Carousel Integration

Interactive carousels for projects and wiki entries with:
- Loop mode enabled
- Previous/Next navigation buttons
- Color-coded cards

### 4. Pagefind Search

- Full-text search across all content
- Overlay modal triggered by magnifying glass icon
- Dark-themed UI matching the website

### 5. Reader Mode Support

Content pages use semantic `<article>` tags for native browser reader mode:
- Safari: View → Show Reader (⌘⇧R)
- Firefox: View → Reader View (F9)

### 6. Responsive Design

- Mobile-first approach
- Flexbox layouts
- Responsive breakpoints

---

## Development Commands

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun dev` | Start dev server at `localhost:4321` |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview production build locally |
| `bun astro --help` | Get Astro CLI help |

---

## Build & Deployment

### Build Output

Running `bun build` produces:
- Static HTML pages for all routes
- Bundled JS, CSS, fonts in `_astro/`
- Pagefind search index in `pagefind/`

### Deployment

The `dist/` folder can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

---

## Performance Considerations

### Optimizations Applied

1. **Static Generation** — Astro generates static HTML
2. **Partial Hydration** — Only React components hydrate
3. **Font Optimization** — Self-hosted Geist font
4. **SVG Assets** — No raster images
5. **Pagefind** — Client-side search with minimal bandwidth

---

## Future Improvements

- CMS Integration for dynamic content
- Multi-language support expansion
- Analytics tracking
- Shop functionality
- More wiki content

---

## License & Credits

### Open Source Licenses

- Astro — MIT
- React — MIT
- Tailwind CSS — MIT
- Embla Carousel — MIT
- Pagefind — MIT
- astro-pagefind — MIT

---

## Getting Started for Contributors

1. Clone the repository
2. Run `bun install` to install dependencies
3. Run `bun dev` to start the development server
4. Make changes to components in `src/components/`
5. Test with `bun build` before submitting

---

*Last updated: March 2026*
