# Tecnoprints

Professional 3D printing service landing page built for [Tecnoprints](https://tecnoprints.com) — a Barranquilla-based company operating 20+ Bambu Lab printers for rapid prototyping and on-demand production.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework with App Router, SSR, and automatic optimizations |
| [React 18](https://react.dev) | UI library with concurrent features |
| [TypeScript](https://typescriptlang.org) | Type-safe development |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first CSS framework |
| [Lucide React](https://lucide.dev) | Lightweight icon library with tree-shaking |

## Features

- **Client-side STL Parser** — Parses STL files (binary + ASCII) in the browser to calculate volume and estimate PLA material usage in grams, similar to slicer software. No backend required.
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop with touch-friendly interactions and safe area support for notched devices.
- **Video Backgrounds** — Autoplay muted background videos in Hero and CTA sections with mobile-specific playback handling.
- **SEO Optimized** — Structured data (LocalBusiness + Service schemas), dynamic sitemap, robots.txt, Open Graph, and Twitter cards.
- **Performance** — Component memoization, GPU-accelerated animations, image optimization (AVIF/WebP), SWC minification, and icon tree-shaking.
- **WhatsApp Integration** — Primary CTA links to WhatsApp with pre-filled messages containing quote details.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and viewport config
│   ├── page.tsx            # Home page composing all sections
│   ├── globals.css         # Global styles, CSS variables, mobile optimizations
│   ├── sitemap.ts          # Dynamic XML sitemap generation
│   └── robots.ts           # Robots.txt generation
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation with transparent header and mobile menu
│   │   └── Footer.tsx      # Footer with links, socials, and company info
│   ├── sections/
│   │   ├── Hero.tsx        # Hero with video background and CTAs
│   │   ├── Partners.tsx    # Partner company showcase
│   │   ├── Process.tsx     # How-it-works steps
│   │   ├── Equipment.tsx   # Printer fleet showcase (Bambu Lab P1S/A1)
│   │   ├── CTA.tsx         # Call-to-action with video background
│   │   ├── QuoteForm.tsx   # STL upload + quality selector + material estimator
│   │   ├── ContactForm.tsx # WhatsApp, Instagram, and email contact cards
│   │   └── FAQ.tsx         # Accordion FAQ section
│   └── ui/
│       ├── Button.tsx      # Reusable button with variants
│       ├── Card.tsx        # Card wrapper component
│       ├── FadeIn.tsx      # Page-load fade-in animation
│       ├── ScrollFadeIn.tsx # Scroll-triggered fade-in animation
│       ├── Logo.tsx        # Brand logo with Tecnoprints wordmark
│       └── AnimatedCounter.tsx # Counting animation for stats
├── hooks/
│   └── useInView.ts        # Intersection Observer hook for scroll animations
├── lib/
│   ├── constants.ts        # Centralized data (navigation, stats, partners, etc.)
│   ├── animation.ts        # Reusable easing functions and animation configs
│   ├── stl-parser.ts       # Client-side STL file parser with volume calculation
│   ├── seo.ts              # SEO metadata, structured data, and viewport config
│   └── utils.ts            # Utility functions (cn helper for class merging)
└── public/
    ├── background-video.mp4
    ├── logo.png
    ├── degentech-logo.png
    └── inca-logo.png
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## STL Parser

The quote estimator uses a client-side STL parser (`lib/stl-parser.ts`) that:

1. Detects binary vs ASCII STL format
2. Extracts triangle vertices from the mesh
3. Calculates total volume using the signed tetrahedron method
4. Estimates PLA material usage based on quality level:
   - **Low** — 15% infill, ~15% shell
   - **Medium** — 30% infill, ~15% shell
   - **High** — 50% infill, ~15% shell
5. Converts to grams using PLA density (1.24 g/cm³)

All processing happens in the browser — no server or API calls needed.

## Environment

No environment variables required. The site is fully static with no backend dependencies.

## Deployment

Optimized for [Vercel](https://vercel.com). Push to the main branch and Vercel handles the rest.

```bash
npm run build
```

## License

Private project. All rights reserved.

---

**Tecnoprints** — A [Degentech SAS](https://degentech.co) company.
