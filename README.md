# HC-1 | Hybrid Concepts

**Strategic Command & Integration Authority**

Enterprise-grade institutional website built with Next.js 14+, delivering sovereign security, systems integration, and operational continuity solutions.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS Custom Properties
- **Animations:** Framer Motion
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
│   ├── sections/          # Hero, SectorGrid, WhatWeDo, etc.
│   └── ui/                # Button, and other primitives
├── lib/
│   ├── constants.ts       # Navigation, sectors, capabilities data
│   └── utils.ts           # Utility functions (cn, formatDate, etc.)
└── types/
    └── index.ts           # TypeScript interfaces
```

## Design System

### Colors (Dark Theme)

```css
--background: #0a0a0a;
--surface: #141414;
--surface-elevated: #1a1a1a;
--accent: #2563eb;
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

## Performance Targets

- **Lighthouse Score:** >90 (all categories)
- **Core Web Vitals:** Pass
- **Accessibility:** WCAG 2.1 AA

## Conventions

### Code Style

- ESLint + Prettier
- TypeScript strict mode
- Conventional Commits
- Component names: PascalCase
- Files: kebab-case (except components)

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

## Future Enhancements

- [ ] Sanity CMS integration for Insights
- [ ] i18n support (FR/EN)
- [ ] Plausible Analytics
- [ ] Contact form backend
- [ ] Search functionality

## License

Proprietary - HC-1 | Hybrid Concepts

---

Built with precision for those who protect what matters.
