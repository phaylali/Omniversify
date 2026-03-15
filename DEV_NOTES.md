# Developer Notes — Omniversify

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Styling System](#styling-system)
- [Key Features](#key-features)
- [Development Commands](#development-commands)
- [Build & Deployment](#build--deployment)
- [Performance Considerations](#performance-considerations)
- [Future Improvements](#future-improvements)

---

## Project Overview

Omniversify is a promotional landing page for a creative studio building a unified multiverse across multiple media (games, anime, series, books). The website showcases the studio's vision, current projects, lore/characters, and provides contact/support channels.

**Type**: Static marketing website with interactive elements  
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
| Icons | [Lucide React](https://lucide.dev/) v0.577.0 |
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
│   │   ├── ModeToggle.tsx             # Theme toggle (future use)
│   │   ├── ProjectsCarousel.astro     # Projects carousel wrapper
│   │   ├── ProjectsCarousel.tsx        # Game projects carousel
│   │   ├── Section.astro              # Reusable section wrapper
│   │   ├── Vision.astro               # Studio vision section
│   │   └── Welcome.astro              # Default Astro component
│   ├── layouts/
│   │   └── Layout.astro               # Base HTML layout with theme
│   ├── pages/
│   │   └── index.astro                # Main page (assembles all sections)
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

### Section Components

- **Section.astro** — Reusable full-viewport section wrapper with:
  - CSS scroll-snap alignment
  - Flexbox centering
  - Responsive padding

- **BackgroundPattern.astro** — Fixed SVG geometric pattern overlay

### Feature Components

| Component | Type | Purpose |
|-----------|------|---------|
| Hero | Astro | Logo, title, tagline with pulse animation |
| Vision | Astro | Studio mission statement |
| ProjectsCarousel | React | Horizontal scrolling project cards |
| LoreCarousel | React | Horizontal scrolling lore/character cards |
| Contact | Astro | Support options + contact form |
| Footer | Astro | Navigation links, licenses, copyright |

### React Components (Interactive)

- **ProjectsCarousel.tsx** — Embla-powered carousel with:
  - 5 project cards (Alpha through Epsilon)
  - Split layout (image + info)
  - Tags for each project
  - Loop scrolling
  - Navigation buttons

- **LoreCarousel.tsx** — Embla-powered carousel with:
  - 6 lore entries (characters, events, eras)
  - Color-coded cards
  - Loop scrolling
  - Navigation buttons

---

## Styling System

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the Vite plugin (`@tailwindcss/vite`). Configuration is done via CSS:

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";  /* shadcn/ui compatibility */
```

### Design Tokens (CSS Variables)

**Light Theme** (`:root`):
- Background: `oklch(1 0 0)` (white)
- Foreground: `oklch(0.145 0 0)` (near black)

**Dark Theme** (`.dark`):
- Background: `oklch(0.145 0 0)` (near black)
- Foreground: `oklch(0.985 0 0)` (near white)

### Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Gold | `#C2B067` | Main accent, text, borders |
| Gold Dark | `#8a7a3a` | Gradient endpoints |
| Gold Light | `#f6eee3` | Highlights |

### Gradient Text Effect

```css
background: radial-gradient(circle at 35% 35%, #8a7a3a 0%, #C2B067 50%, #8a7a3a 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Project Color Palette

| Project | Primary Color | Gradient |
|---------|---------------|----------|
| Alpha | `#4a90d9` | `#1a3a5c` → `#4a90d9` |
| Beta | `#9b59b6` | `#2d1f4a` → `#9b59b6` |
| Gamma | `#e74c3c` | `#3d1f20` → `#e74c3c` |
| Delta | `#2ecc71` | `#0f3d2a` → `#2ecc71` |
| Epsilon | `#f39c12` | `#3d2e0f` → `#f39c12` |

---

## Key Features

### 1. Scroll Snap Navigation

Full-page sections with CSS scroll-snap:

```css
.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
```

### 2. Dark Mode Support

Theme detection with localStorage persistence:

```javascript
const getThemePreference = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
```

### 3. Embla Carousel Integration

Both carousels use `embla-carousel-react` with:
- Loop mode enabled
- Previous/Next navigation buttons
- Responsive slide widths

### 4. Responsive Design

- Mobile-first approach via Tailwind
- Flexbox layouts with wrap support
- Responsive padding (2rem base)

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

Running `bun build` produces a static `./dist/` folder containing:

- `index.html` — Main HTML file
- `_astro/` — Bundled JS, CSS, fonts
- `favicon.svg` — Copied from public/

### Deployment

The built `dist/` folder can be deployed to any static host:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

Example for Vercel:
```bash
npx vercel deploy dist
```

---

## Performance Considerations

### Optimizations Already Applied

1. **Static Generation** — Astro generates static HTML by default
2. **Partial Hydration** — Only React components hydrate (carousels)
3. **Font Optimization** — Self-hosted Geist font via @fontsource
4. **SVG Assets** — Vector graphics (no raster images)
5. **CSS Gradients** — No external background images

### Potential Improvements

- Add image optimization for project screenshots
- Implement lazy loading for below-fold content
- Add service worker for offline support
- Consider View Transitions API for smooth navigation

---

## Future Improvements

- **CMS Integration** — Connect to headless CMS for dynamic content
- **Project Detail Pages** — Individual pages for each project
- **Lore Database** — Searchable lore encyclopedia
- **Newsletter Signup** — Email collection integration
- **Multi-language Support** — i18n for international audiences
- **Analytics** — Add visitor tracking
- **Blog/News Section** — Regular updates and announcements

---

## License & Credits

### Open Source Licenses

- Astro — [MIT](https://github.com/withastro/astro/blob/main/LICENSE)
- React — [MIT](https://github.com/facebook/react/blob/main/LICENSE)
- Tailwind CSS — [MIT](https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE)
- Embla Carousel — [MIT](https://github.com/davidbernson/embla-carousel/blob/master/LICENSE)
- Lucide Icons — [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE)

### Asset Credits

- Logo/favicon: Custom design (included in public/favicon.svg)

---

## Getting Started for Contributors

1. Clone the repository
2. Run `bun install` to install dependencies
3. Run `bun dev` to start the development server
4. Make changes to components in `src/components/`
5. Test with `bun build` before submitting

---

*Last updated: March 2026*
