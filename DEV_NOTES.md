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

Omniversify is a multi-page website for a creative studio building a unified multiverse. The site features a landing page, projects showcase, blog, news section, and wiki with full-text search.

**Type**: Static multi-page website  
**Target Users**: Gamers, lore enthusiasts, potential collaborators, and supporters  
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
| Deployment | Cloudflare Pages |

---

## Project Structure

```
/
├── public/
│   ├── favicon.svg              # Custom logo
│   └── images/covers/           # Project cover images
├── src/
│   ├── assets/
│   │   ├── corner.svg           # Corner decoration for hero
│   │   └── covers/             # Source cover images (not used directly)
│   ├── components/
│   │   ├── BackgroundPattern.astro    # Fixed geometric background
│   │   ├── Contact.astro              # Support/contact section
│   │   ├── Footer.astro              # Site footer with links
│   │   ├── Hero.astro                # Landing hero section with corners
│   │   ├── LoreCarousel.astro        # Lore carousel wrapper
│   │   ├── LoreCarousel.tsx          # Character/event carousel
│   │   ├── Navbar.astro              # Navigation bar with search
│   │   ├── ProjectsCarousel.astro    # Projects carousel wrapper
│   │   ├── ProjectsCarousel.tsx      # Game projects carousel
│   │   ├── Search.astro              # Pagefind search overlay
│   │   ├── Section.astro             # Reusable section wrapper
│   │   └── Vision.astro              # Studio vision section
│   ├── content/
│   │   ├── blog/                     # Blog posts (markdown)
│   │   ├── news/                     # News articles (markdown)
│   │   ├── projects/                 # Project entries (mdx)
│   │   └── wiki/                     # Wiki content (markdown)
│   │       ├── characters/
│   │       ├── events/
│   │       ├── realms/
│   │       └── weapons/
│   ├── content.config.ts         # Astro content collections config
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML layout with SEO
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog feed
│   │   │   └── [id].astro       # Individual blog post
│   │   ├── news/
│   │   │   ├── index.astro      # News feed
│   │   │   └── [id].astro       # Individual news article
│   │   ├── projects/
│   │   │   ├── index.astro      # Projects feed
│   │   │   └── [id].astro       # Individual project page
│   │   ├── wiki/
│   │   │   ├── index.astro      # Wiki main page
│   │   │   └── [category]/
│   │   │       ├── index.astro  # Category listing
│   │   │       └── [id].astro   # Individual wiki entry
│   │   └── index.astro          # Home page
│   └── styles/
│       └── global.css           # Tailwind + custom CSS variables
├── astro.config.mjs            # Astro configuration
├── package.json                 # Dependencies and scripts
├── wrangler.jsonc              # Cloudflare Pages config
└── DEV_NOTES.md                # This file
```

---

## Component Architecture

### Layout Layer

- **Layout.astro** — Root layout component handling:
  - Theme detection and persistence (dark/light mode)
  - Global CSS imports
  - SEO meta tags (Open Graph, Twitter Cards)
  - Font loading (Geist Variable)
  - Background pattern (applies to all pages)

### Navigation

- **Navbar.astro** — Fixed navigation bar with:
  - Logo
  - Search trigger (magnifying glass icon)
  - Menu dropdown (Home, Projects, Wiki, Blog, News)

### Page Components

| Component | Type | Purpose |
|-----------|------|---------|
| Hero | Astro | Logo, title, tagline with pulse animation, corner decorations |
| Vision | Astro | Studio mission statement |
| ProjectsCarousel | React | Horizontal scrolling project cards |
| LoreCarousel | React | Horizontal scrolling lore/character cards |
| Contact | Astro | Support options (Ko-Fi, Patreon) |
| Footer | Astro | Navigation links, copyright |
| Search | Astro | Pagefind search overlay modal |
| Section | Astro | Reusable section wrapper with fullHeight option |

### React Components (Interactive)

- **ProjectsCarousel.tsx** — Embla-powered carousel displaying project cards with cover image support
- **LoreCarousel.tsx** — Embla-powered carousel displaying wiki entries

---

## Content Collections

The site uses Astro 6's content collections with the loader API:

### Collections

| Collection | Path | Purpose |
|-----------|------|---------|
| projects | `src/content/projects/*.mdx` | Game projects |
| wiki | `src/content/wiki/[category]/*.md` | Lore entries |
| blog | `src/content/blog/*.md` | Blog posts |
| news | `src/content/news/*.md` | News articles |

### Wiki Categories

- **characters/** — Character profiles (Barghawata dynasty)
- **events/** — Historical events (coming soon)
- **realms/** — Locations and realms (Barghawata Confederacy)
- **weapons/** — Weapons and artifacts (coming soon)

### Project Schema

Projects support the following frontmatter fields:
- `title` (string) - Project title
- `description` (string) - Short description
- `tags` (string[]) - Array of tags
- `color` (string) - Brand color hex
- `gradient` (string) - CSS gradient for fallback
- `cover` (string, optional) - Cover image path (use `/images/covers/...`)
- `featured` (boolean) - Featured status

### Wiki Schema

Characters support: title, description, category, color, alternate_names, title_role, faction, character_type, status, first_appearance, abilities, related_characters, related_events, related_realms, related_weapons

Realms support: title, description, category, color, alternate_names, realm_type, period, region, capital, founded, ended

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

### Content Page Styling

Content pages (Wiki, Blog, News, Projects) feature:
- **Tables** — Gold borders, alternating rows, hover effects
- **Numbered Lists** — Gold numbers with custom counter
- **Body Text** — Uses `#F8F5FA` while headings/titles in gold `#C2B067`

---

## Key Features

### 1. Responsive Section Heights

Sections on the home page have configurable heights:
- Hero: Full viewport height (100vh)
- Other sections: Auto height with padding

### 2. Hero Corner Decorations

The Hero section displays corner SVG decorations:
- Bottom-left: Original orientation
- Bottom-right: Horizontally mirrored

### 3. Dark Mode Support

Theme detection with localStorage persistence.

### 4. Embla Carousel Integration

Interactive carousels for projects and wiki entries with:
- Loop mode enabled
- Previous/Next navigation buttons
- Cover image or gradient backgrounds
- Color-coded cards

### 5. Pagefind Search

- Full-text search across all content
- Overlay modal triggered by magnifying glass icon
- Dark-themed UI matching the website

### 6. Project Cover Images

Projects support optional cover images:
- Place in `public/images/covers/`
- Reference as `/images/covers/filename.ext`
- Falls back to gradient if not provided

### 7. SEO Support

All pages include:
- Open Graph meta tags (og:title, og:description, og:image)
- Twitter Card meta tags
- Project pages use cover image as og:image

### 8. MDX Support

Project pages support MDX with section markers:
- `<div class="section-overview">` - Content for Overview tab
- `<div class="section-documentation">` - Content for Documentation tab

### 9. Reader Mode Support

Content pages use semantic `<article>` tags for native browser reader mode.

---

## Development Commands

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun dev` | Start dev server at `localhost:4321` |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview production build locally |
| `bun run deploy` | Deploy to Cloudflare Pages |

---

## Build & Deployment

### Build Output

Running `bun build` produces:
- Static HTML pages for all routes
- Bundled JS, CSS, fonts in `_astro/`
- Pagefind search index in `pagefind/`
- Static assets in `public/` (including images)

### Deployment

The project deploys to **Cloudflare Pages**:
- Build command: `bun run build`
- Output directory: `dist`
- Deploy command: `bun run deploy`

---

## Performance Considerations

### Optimizations Applied

1. **Static Generation** — Astro generates static HTML
2. **Partial Hydration** — Only React components hydrate (client:only="react")
3. **Font Optimization** — Self-hosted Geist font
4. **SVG Assets** — Vector graphics for decorations
5. **Pagefind** — Client-side search with minimal bandwidth
6. **Image Handling** — Cover images in public folder for direct serving

---

## Future Improvements

- CMS Integration for dynamic content
- Multi-language support expansion
- Analytics tracking
- Shop functionality
- More wiki content (weapons, events)
- Image optimization pipeline

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
6. Deploy with `bun run deploy`

---

## Notes

### Image Paths

- Cover images belong in `public/images/covers/` and are referenced as `/images/covers/filename.ext`
- Do not use `/src/assets/` paths in frontmatter - these won't work in production

### Wiki Content

The wiki currently features the Barghawata Confederacy - a historical Berber tribal confederation from Moroccan history (744-1058 CE).

---

*Last updated: March 2026*
