# HC-1 | Hybrid Concepts

**Strategic Command & Integration Authority**

> HC-1 anticipates and secures systems upstream to prevent disruption, reduce operational risk, eliminate the cost and inefficiency of reactive response, and protect and maximize revenue through assured continuity and operational efficiency.

Enterprise-grade institutional website built with Next.js 14+, delivering sovereign security, systems integration, and operational continuity solutions. Design inspired by Palantir — calm authority, dark minimalism.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Custom Properties
- **Animations:** Framer Motion (subtle, scroll-triggered)
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
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── capabilities/      # Capabilities index + [slug]
│   ├── contact/           # Contact page
│   ├── insights/          # Insights/blog page
│   ├── sectors/           # Sectors index + [slug]
│   ├── globals.css        # Global styles + design tokens
│   ├── layout.tsx         # Root layout with Header/Footer
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, SectorGrid, WhatWeDo, OperatingModel, TrustSignals, CTASection
│   └── ui/                # Button, and other primitives
├── lib/
│   ├── constants.ts       # Navigation, sectors, capabilities, services, operating model data
│   └── utils.ts           # Utility functions (cn, formatDate, etc.)
└── types/
    └── index.ts           # TypeScript interfaces
```

## Homepage Sections

| Section | Component | Description |
|---------|-----------|-------------|
| **Hero** | `Hero.tsx` | Full-screen with gradient background, core statement, CTA |
| **What We Do** | `WhatWeDo.tsx` | 3 pillars: Plan, Integrate, Assure with geometric icons |
| **Sectors** | `SectorGrid.tsx` | 6 sector cards with hover effects and navigation |
| **Operating Model** | `OperatingModel.tsx` | Flow diagram: Anticipate → Assure → Continuity → Revenue |
| **Trust Signals** | `TrustSignals.tsx` | 5 governance items: sovereignty, zero-trust, SLA, traceability, compliance |
| **CTA** | `CTASection.tsx` | Final call-to-action |

## Design System

### Colors (Dark Theme)

```css
--background: #0a0a0a;
--surface: #141414;
--surface-elevated: #1a1a1a;
--accent: #2563eb;
--accent-hover: #3b82f6;
--text-primary: #f5f5f5;
--text-secondary: #a3a3a3;
--text-muted: #737373;
--border: rgba(255, 255, 255, 0.1);
```

### Typography Scale

- **xs:** 12px
- **sm:** 14px
- **base:** 16px
- **lg:** 20px
- **xl:** 28px
- **2xl:** 36px
- **3xl:** 48px
- **4xl:** 64px

### Animation Patterns

```typescript
// Fade in + slide up (reusable)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Stagger container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

```
/                           # Homepage
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

## Development Status

### Phase 1 ✅ Complete
- [x] Hero section with core statement
- [x] What We Do section (Plan, Integrate, Assure)
- [x] Sector Grid with 6 sectors
- [x] Operating Model flow diagram
- [x] Trust Signals section

### Phase 2 (Planned)
- [ ] Sector detail pages content
- [ ] Capabilities detail pages content
- [ ] About page content
- [ ] Contact form functionality

### Future Enhancements
- [ ] Sanity CMS integration for Insights
- [ ] i18n support (FR/EN)
- [ ] Plausible Analytics
- [ ] Contact form backend
- [ ] Search functionality

## License

Proprietary - HC-1 | Hybrid Concepts

---

Built with precision for those who protect what matters.
