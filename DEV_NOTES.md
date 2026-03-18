# Developer Notes — Omniversify

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Content Collections](#content-collections)
- [Styling System](#styling-system)
- [Key Features](#key-features)
- [Social Sharing](#social-sharing)
- [Development Commands](#development-commands)
- [Build & Deployment](#build--deployment)
- [Performance Considerations](#performance-considerations)
- [Future Improvements](#future-improvements)

---

## Project Overview

Omniversify is a multi-page website for a **Moroccan game development studio** creating games about North African history, Amazigh heritage, and marginalized stories.

**Type**: Static multi-page website  
**Target Users**: Gamers, lore enthusiasts, potential collaborators, and supporters  
**Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Language**: English (primary)

---

## Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | [Astro](https://astro.build/) v6.x |
| UI Library | [React](https://react.dev/) v19.x |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4.x |
| Icons | [Tabler Icons](https://tabler.io/icons) (React) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) v8.x |
| Search | [Pagefind](https://pagefind.app/) |
| Animation | [tw-animate-css](https://github.com/nicokempe/tw-animate-css) |
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
│   ├── logo.webp               # Default OG image
│   └── images/covers/          # Project cover images
├── src/
│   ├── assets/
│   │   ├── corner.svg         # Corner decoration for hero
│   │   └── covers/            # Source cover images
│   ├── components/
│   │   ├── BackgroundPattern.astro  # Fixed geometric background
│   │   ├── Contact.astro            # Support/contact section
│   │   ├── Footer.astro              # Site footer with links
│   │   ├── GoldHeading.astro         # Reusable gold heading
│   │   ├── GoldLink.astro            # Reusable gold link
│   │   ├── GoldText.astro            # Reusable gold text
│   │   ├── Hero.astro                # Landing hero with corners
│   │   ├── LoreCarousel.astro        # Lore carousel wrapper
│   │   ├── LoreCarousel.tsx          # Character/event carousel
│   │   ├── Navbar.astro              # Navigation with search
│   │   ├── PageHeader.astro          # Page header component
│   │   ├── PageSection.astro         # Section wrapper
│   │   ├── ProjectsCarousel.astro    # Projects carousel wrapper
│   │   ├── ProjectsCarousel.tsx      # Game projects carousel
│   │   ├── Search.astro              # Pagefind search overlay
│   │   ├── Section.astro             # Reusable section
│   │   ├── ShareButtons.astro        # Social media sharing
│   │   └── Vision.astro               # Studio vision section
│   ├── content/
│   │   ├── blog/                     # Blog posts (markdown)
│   │   ├── news/                     # News articles (markdown)
│   │   ├── projects/                 # Project entries (mdx)
│   │   └── wiki/                     # Wiki content (markdown)
│   │       ├── characters/
│   │       ├── events/
│   │       ├── realms/
│   │       └── weapons/
│   ├── content.config.ts             # Astro content collections
│   ├── layouts/
│   │   └── Layout.astro              # Base HTML layout with SEO
│   ├── pages/
│   │   ├── about.astro               # About page
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog feed
│   │   │   └── [id].astro           # Individual blog post
│   │   ├── news/
│   │   │   ├── index.astro          # News feed
│   │   │   └── [id].astro           # Individual news article
│   │   ├── projects/
│   │   │   ├── index.astro          # Projects feed
│   │   │   └── [id].astro           # Individual project page
│   │   ├── wiki/
│   │   │   ├── index.astro          # Wiki main page
│   │   │   └── [category]/
│   │   │       ├── index.astro      # Category listing
│   │   │       └── [id].astro       # Individual wiki entry
│   │   └── index.astro               # Home page
│   └── styles/
│       └── global.css                # Tailwind + custom CSS
├── astro.config.mjs                  # Astro configuration
├── package.json                      # Dependencies and scripts
├── wrangler.jsonc                    # Cloudflare Pages config
└── DEV_NOTES.md                     # This file
```

---

## Component Architecture

### Layout Layer

- **Layout.astro** — Root layout with:
  - Theme detection (dark/light mode)
  - Global CSS imports
  - SEO meta tags (Open Graph, Twitter Cards)
  - Font loading (Geist Variable)
  - Background pattern

### Navigation

- **Navbar.astro** — Fixed navigation with logo, search, and menu

### Page Components

| Component | Type | Purpose |
|-----------|------|---------|
| Hero | Astro | Logo, title, tagline, corner decorations |
| Vision | Astro | Studio mission statement |
| ProjectsCarousel | React | Horizontal project cards |
| LoreCarousel | React | Horizontal wiki/character cards |
| Contact | Astro | Support options (Ko-Fi, Patreon) |
| Footer | Astro | Navigation links, copyright |
| Search | Astro | Pagefind search overlay |
| ShareButtons | Astro | Social media sharing with Tabler icons |

---

## Content Collections

The site uses Astro content collections:

### Collections

| Collection | Path | Purpose |
|-----------|------|---------|
| projects | `src/content/projects/*.mdx` | Game projects |
| wiki | `src/content/wiki/[category]/*.md` | Lore entries |
| blog | `src/content/blog/*.md` | Blog posts |
| news | `src/content/news/*.md` | News articles |

### Wiki Categories

- **characters/** — Character profiles (Barghawata dynasty)
- **realms/** — Locations (Barghawata Confederacy)
- **events/** — Historical events
- **weapons/** — Weapons and artifacts

### Project Schema

Projects support:
- `title` (string) - Project title
- `description` (string) - Short description
- `tags` (string[]) - Array of tags
- `color` (string) - Brand color hex
- `gradient` (string) - CSS gradient fallback
- `cover` (string, optional) - Cover image path
- `repo` (string, optional) - GitHub repository URL
- `featured` (boolean) - Featured status

---

## Styling System

### Tailwind CSS v4

```css
@import "tailwindcss";
```

### Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Gold | `#C2B067` | Main accent, text, borders |
| Gold Dark | `#8a7a3a` | Gradient endpoints |
| Content Text | `#F8F5FA` | Body text |

### Content Page Styling

- **Tables** — Gold borders, alternating rows, hover effects
- **Numbered Lists** — Gold numbers with custom counter
- **Headings** — Gold `#C2B067`, body text `#F8F5FA`

---

## Key Features

### 1. Hero Section
- Full viewport height (100vh)
- Corner SVG decorations
- Pulse animation on logo

### 2. Embla Carousels
- Interactive carousels for projects and wiki entries
- Loop mode, previous/next navigation
- Cover images or gradient backgrounds

### 3. Pagefind Search
- Full-text search across all content
- Overlay modal with dark theme

### 4. Project Features
- Optional cover images in `public/images/covers/`
- GitHub link button
- Documentation + Updates tabs

### 5. SEO Support
- Open Graph meta tags (og:title, og:description, og:image)
- Twitter Card meta tags
- Absolute URLs for images (required for social sharing)

### 6. MDX Support
Project pages support MDX with section markers.

---

## Social Sharing

All content pages (Blog, News, Projects, Wiki) include the **ShareButtons** component with:

- X (Twitter)
- Threads
- Bluesky
- WhatsApp
- Telegram
- Messenger
- Facebook
- LinkedIn
- Reddit
- Weibo (Chinese)
- LINE (Japanese/Korean)
- QQ (Chinese)
- Pinterest
- Email
- Copy Link

Uses Tabler Icons for consistent styling.

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

- Static HTML pages for all routes
- Bundled JS, CSS, fonts in `_astro/`
- Pagefind search index in `pagefind/`
- Static assets in `public/`

### Deployment

Deploys to **Cloudflare Pages**:
- Build command: `bun run build`
- Output directory: `dist`

---

## Performance Considerations

1. **Static Generation** — Astro generates static HTML
2. **Partial Hydration** — Only React components hydrate
3. **Font Optimization** — Self-hosted Geist font
4. **SVG Assets** — Vector graphics for decorations
5. **Pagefind** — Client-side search with minimal bandwidth

---

## Future Improvements

- CMS Integration for dynamic content
- Multi-language support
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
- Tabler Icons — MIT

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

### OG Images

- All detail pages use absolute URLs for OG images (domain + path)
- Projects use cover image, others fallback to `/logo.webp`

---

*Last updated: March 2026*
