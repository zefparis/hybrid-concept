# HC-1 | Hybrid Concepts

**Strategic Command & Integration Authority**

> HC-1 anticipates and secures systems upstream to prevent disruption, reduce operational risk, eliminate the cost and inefficiency of reactive response, and protect and maximize revenue through assured continuity and operational efficiency.

Enterprise-grade institutional website built with Next.js 14+, delivering sovereign security, systems integration, and operational continuity solutions.

**Design inspiration:** Palantir, Stripe, Linear — calm authority, dark minimalism, premium visual effects.

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS Custom Properties
- **Animations:** Framer Motion (subtle, scroll-triggered)
- **i18n:** next-intl (EN, FR, PT)
- **Icons:** Lucide React
- **Utilities:** class-variance-authority (CVA)
- **Fonts:** Geist Sans & Geist Mono (next/font)
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/zefparis/hybrid-concept.git
cd hybrid-concept

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # i18n dynamic routing
│   │   ├── layout.tsx      # Locale layout with NextIntlClientProvider
│   │   └── page.tsx        # Homepage
│   ├── globals.css         # Global styles + design tokens
│   └── layout.tsx          # Root layout (fonts, html/body)
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, SectorGrid, WhatWeDo, OperatingModel, TrustSignals, CTASection
│   └── ui/                 # Button, LanguageSwitcher
├── i18n/
│   ├── config.ts           # Locale configuration (en, fr, pt)
│   ├── request.ts          # Server-side i18n setup
│   └── locales/
│       ├── en.json         # English translations
│       ├── fr.json         # French translations
│       └── pt.json         # Portuguese translations
├── lib/
│   ├── constants.ts        # Navigation, sectors, capabilities data
│   └── utils.ts            # Utility functions (cn, formatDate, etc.)
├── middleware.ts           # i18n routing middleware
└── types/
    └── index.ts            # TypeScript interfaces
```

## Homepage Sections

| Section | Component | Description |
|---------|-----------|-------------|
| **Hero** | `Hero.tsx` | Full-screen with background image, gradient overlays, core statement, CTA |
| **What We Do** | `WhatWeDo.tsx` | 3 pillars: Plan, Integrate, Assure with geometric icons (translated) |
| **Sectors** | `SectorGrid.tsx` | 6 sector cards with hover effects and navigation (translated) |
| **Operating Model** | `OperatingModel.tsx` | Flow diagram: Anticipate → Assure → Continuity → Revenue (translated) |
| **Trust Signals** | `TrustSignals.tsx` | 5 governance items: sovereignty, zero-trust, SLA, traceability, compliance (translated) |
| **CTA** | `CTASection.tsx` | Final call-to-action (translated) |

## Design System

### Colors (Dark Theme)

```css
/* Base */
--background: #0a0a0a;
--surface: #141414;
--surface-elevated: #1a1a1a;
--surface-hover: #1f1f1f;

/* Accent */
--accent: #2563eb;
--accent-hover: #3b82f6;
--accent-muted: #1e40af;

/* Foreground (text) */
--foreground: #f5f5f5;
--foreground-secondary: #a3a3a3;
--foreground-muted: #737373;

/* Borders */
--border: rgba(255, 255, 255, 0.1);
--border-strong: rgba(255, 255, 255, 0.15);

/* Shadows */
--shadow-glow-sm: 0 0 20px rgba(37, 99, 235, 0.3);
--shadow-glow-md: 0 0 40px rgba(37, 99, 235, 0.4);
--shadow-elevated: 0 4px 20px rgba(0, 0, 0, 0.7);
```

### Typography Scale

| Token | Size | Usage |
|-------|------|-------|
| `display-lg` | 4rem (64px) | Hero title desktop |
| `display-md` | 3rem (48px) | Hero title mobile, section headings |
| `display-sm` | 2.25rem (36px) | Section headings mobile |
| `heading-lg` | 1.75rem (28px) | Card titles |
| `heading-md` | 1.25rem (20px) | Subheadings |
| `body-lg` | 1.125rem (18px) | Lead paragraphs |
| `body` | 1rem (16px) | Body text |
| `body-sm` | 0.875rem (14px) | Small text |
| `caption` | 0.75rem (12px) | Labels, captions |

### Premium CSS Utilities

```css
/* Glass morphism */
.glass { background: rgba(20, 20, 20, 0.8); backdrop-filter: blur(8px); }
.glass-elevated { background: rgba(26, 26, 26, 0.9); backdrop-filter: blur(12px); }

/* Hover effects */
.hover-lift { transition: all 0.3s; }
.hover-lift:hover { transform: translateY(-4px); box-shadow: var(--shadow-elevated); }

/* Grid pattern background */
.grid-pattern { background-image: linear-gradient(...); background-size: 50px 50px; }

/* Animated border (gradient on hover) */
.border-animated::before { /* gradient border effect */ }

/* Accent line (bottom border animation) */
.accent-line-bottom::after { /* animated bottom line */ }

/* Text gradients */
.text-gradient { /* foreground gradient */ }
.text-gradient-accent { /* accent gradient */ }
```

### Animation Patterns

```typescript
// Container with stagger
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

// Item fade in + slide up
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};
```

### Spacing (8px base)

Uses a consistent 8px grid system with predefined spacing tokens.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Site Structure

All routes are prefixed with locale (`/en`, `/fr`, `/pt`):

```
/[locale]                   # Homepage (57 static pages generated)
├── /about                  # About HC-1
├── /sectors                # Sectors index
│   ├── /government-national-programs
│   ├── /critical-infrastructure
│   ├── /energy-mining
│   ├── /ports-borders-logistics
│   ├── /cyber-resilience
│   └── /ai-fusion-intelligence
├── /capabilities           # Capabilities index
│   ├── /hybrid-vector
│   ├── /hybrid-nexus
│   ├── /hybrid-axis
│   ├── /hybrid-cyber
│   ├── /hybrid-iris
│   └── /centers-of-excellence
├── /insights               # Thought leadership
└── /contact                # Contact form
```

**Example URLs:**
- `/en` or `/` → English homepage (default)
- `/fr/about` → French about page
- `/pt/sectors/energy-mining` → Portuguese energy sector page

## Data Constants

All content is centralized in `src/lib/constants.ts`:

- **SERVICES** — Plan, Integrate, Assure
- **SECTORS** — 6 sectors with metadata
- **CAPABILITIES** — 6 capabilities with features
- **OPERATING_STEPS** — Anticipate, Assure, Continuity, Revenue
- **TRUST_SIGNALS** — 5 governance signals
- **HOMEPAGE_CONTENT** — Hero, sections content

## Performance Targets

- **Lighthouse Score:** >90 (all categories)
- **Core Web Vitals:** Pass
- **Accessibility:** WCAG 2.1 AA
- **Reduced Motion:** Respects `prefers-reduced-motion`

## Conventions

### Code Style

- ESLint + Prettier
- TypeScript strict mode
- Conventional Commits
- Component names: PascalCase
- Files: kebab-case (except components)
- Constants: SCREAMING_SNAKE_CASE

### Component Pattern

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  heading?: string;
}

export function ComponentName({ heading }: ComponentNameProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className={cn("py-20 px-6", "md:py-32 md:px-12")}>
      {/* content */}
    </section>
  );
}
```

### Commits

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, no code change
refactor: code restructuring
test: adding tests
chore: maintenance
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

```env
# Optional - for future CMS integration
NEXT_PUBLIC_SITE_URL=https://hc-1.com
```

## Internationalization (i18n)

The site supports 3 languages with automatic routing:

| Locale | Language | URL |
|--------|----------|-----|
| `en` | English (default) | `/en` |
| `fr` | Français | `/fr` |
| `pt` | Português | `/pt` |

### Translation Files

Located in `src/i18n/locales/`:
- `en.json` — English translations
- `fr.json` — French translations  
- `pt.json` — Portuguese translations

### Using Translations in Components

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

### Language Switcher

The `LanguageSwitcher` component in the Header allows users to switch languages without page reload.

## Development Status

### Phase 1 ✅ Complete — Homepage Structure
- [x] Hero section with core statement
- [x] What We Do section (Plan, Integrate, Assure)
- [x] Sector Grid with 6 sectors
- [x] Operating Model flow diagram
- [x] Trust Signals section

### Phase 2 ✅ Complete — Premium Visual Transformation
- [x] Tailwind v4 theme configuration (colors, typography, shadows)
- [x] Premium CSS utilities (glass, grid-pattern, hover-lift, accent-line-bottom)
- [x] Button component with CVA variants and glow effects
- [x] Hero with grid-pattern background, glow orb, text-gradient
- [x] Cards with hover-lift, gradient overlays, animated borders
- [x] Lucide icons integration

### Phase 3 ✅ Complete — Internationalization (i18n)
- [x] next-intl integration with App Router
- [x] 3 languages: English, French, Portuguese
- [x] Locale-based routing (`/en`, `/fr`, `/pt`)
- [x] LanguageSwitcher component in Header (desktop + mobile)
- [x] All homepage sections use translations
- [x] Header and Footer navigation translated
- [x] SEO metadata per locale with hreflang
- [x] All pages migrated to `[locale]` folder structure
- [x] Static generation for 57 pages (3 locales × 19 routes)

### Phase 4 ✅ Complete — Visual Enhancements
- [x] Hero background image with overlay system
- [x] Optimized overlay opacity for image visibility
- [x] Mobile-responsive language switcher
- [x] Translated CTASection component

### Phase 5 ✅ Complete — Sector Pages Architecture
- [x] Complete sector page architecture with 8 reusable components
- [x] SectorHero: 60vh hero with stats, breadcrumb, background image
- [x] SectorOverview: 3-column challenge overview with icons
- [x] RiskLandscape: 2-column risk analysis (production + revenue)
- [x] ApproachSection: Tabbed HC-1 approach with outcomes
- [x] ValueProposition: 3 metric cards with hover effects
- [x] UseCases: 3 operational scenarios with revenue impact
- [x] CapabilitiesIntegration: Grid of 6 capabilities with links
- [x] SectorCTA: Final call-to-action with 2 buttons
- [x] Institutional tone with quantified metrics
- [x] Premium animations and responsive design

### Phase 6 ✅ Complete — All 6 Sector Pages Created
- [x] Energy & Mining (`/sectors/energy-mining`) - Full EN/FR/PT
- [x] Government & National Programs (`/sectors/government-national-programs`) - EN complete, FR/PT partial
- [x] Critical Infrastructure (`/sectors/critical-infrastructure`) - EN complete
- [x] Cyber Resilience (`/sectors/cyber-resilience`) - EN complete
- [x] Ports, Borders & Logistics (`/sectors/ports-borders-logistics`) - EN complete
- [x] AI Fusion & Intelligence (`/sectors/ai-fusion-intelligence`) - EN complete
- [x] All pages use same 8-component architecture
- [x] ~955 lines of English translations added
- [x] TypeScript compiles without errors
- [x] All pages accessible and functional

### Phase 7 (In Progress) — Complete Translations
- [x] English translations: 6/6 sectors complete
- [ ] French translations: 2/6 sectors complete (energyMining, governmentPrograms)
- [ ] Portuguese translations: 1/6 sectors complete (energyMining)
- [ ] Remaining: 4 FR sectors + 5 PT sectors (~1800 lines)

### Phase 8 (Pending)
- [ ] Capabilities detail pages content translation
- [ ] About page content translation
- [ ] Contact page content translation
- [ ] Insights page content translation

### Future Enhancements
- [ ] Sanity CMS integration for Insights
- [ ] Plausible Analytics
- [ ] Contact form backend
- [ ] Search functionality

## License

Proprietary - HC-1 | Hybrid Concepts

---

Built with precision for those who protect what matters.
