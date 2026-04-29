# Hybrid Concept — Technical Debt Audit & Rebuild Brief

> **Status:** This document replaces the previous marketing-style README. It is an honest technical audit of the codebase as it currently stands, intended as a **brief for a complete rebuild** from a clean slate.

**Repo:** `zefparis/hybrid-concept`
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · next-intl 4 · Framer Motion 12 · Lucide React
**Footprint:** ~600 KB source (excluding `node_modules`/`.next`) · 26 client components · ~6 300 lines of i18n JSON across 3 locales

---

## 1. Executive Summary

The application **works** (TypeScript compiles, pages render, i18n routes correctly), but it is the result of **7 stacked phases of additive development** without any consolidation pass. Symptoms:

- **3 conflicting brand identities** coexist in a single codebase (HMH, HC-1, Hybrid Concepts).
- **~40% of the components are dead code** (orphan exports never imported by any page).
- **~30% of the i18n keys are stale** (point to removed sections or carry legacy duplicates).
- **Brittle global typography** in `globals.css` silently breaks every `text-white` on `<h1>` because of an unscoped `-webkit-text-fill-color: transparent`.
- **Two parallel routing strategies** for `/sectors/*` (dynamic `[slug]` vs hardcoded folders) overlap and duplicate work.
- **Two sources of truth** for sector data (`lib/constants.ts` SECTORS array + i18n JSON `sectors.*` namespace) drift apart.
- The README in repo (now this document) was **outdated** — documented colors, sizes, and structure that no longer match `globals.css` or `src/`.

A targeted refactor is technically possible but the cumulative drag is high. **A clean rebuild on a fresh Next.js 16 scaffold is recommended.** This document inventories what to keep, what to rewrite, and what to discard.

---

## 2. Brand Identity Conflict (must resolve first)

| Source | Brand value |
|---|---|
| `package.json` `name` | `temp-next` |
| `README.md` (old) headline | `HC-1 \| Hybrid Concepts` |
| `src/lib/constants.ts` `SITE_METADATA.siteName` | `HMH \| Hybrid Mobility Holdings` |
| `src/lib/constants.ts` `SITE_METADATA.siteUrl` | `https://hmh-africa.com` |
| `src/components/layout/Header.tsx` logo | `HMH` + "Hybrid Mobility Holdings" |
| `src/app/[locale]/layout.tsx` titles | `HMH \| Hybrid Mobility Holdings — …` |
| `src/i18n/locales/*.json` | mixes "Hybrid Concepts", "HC-1", "HMH" |
| Sector pages content | "HC-1 unifies sovereign security…" |
| Production URL | `hybridconc.com` (per browser address bar) |

**Action for rebuild:** Pick **one** brand (recommended: HMH | Hybrid Mobility Holdings, since the live URL and Header agree on it). Define it once, in one constant. Everything else inherits.

---

## 3. Dead Code Inventory

### 3.1 Components exported but never imported

| File | Lines | Status |
|---|---:|---|
| `src/components/sections/Hero.tsx` | 243 | Generic full-screen hero. Homepage uses an **inline** hero in `app/[locale]/page.tsx` instead. Other pages don't import it. **Dead.** |
| `src/components/sections/WhatWeDo.tsx` | 175 | "Plan / Integrate / Assure" pillars. Removed from homepage during pivot to Divisions. **Dead.** |
| `src/components/sections/OperatingModel.tsx` | 202 | "Anticipate -> Assure -> Continuity -> Revenue" flow. **Dead.** |
| `src/components/sections/DivisionsSection.tsx` | 252 | Older Divisions UI superseded by `DivisionGrid.tsx` (193 L). Both still exported from `sections/index.ts`. **Dead.** |
| `src/components/ui/VideoTransition.tsx` | 50 | Used **only** by the dead `DivisionsSection.tsx`. Transitively dead. |
| `src/components/divisions/AECGatewayPage.tsx` | 296 | Bespoke AEC division page. No corresponding route. **Verify before delete.** |
| `src/components/divisions/AgentOSPage.tsx` | 292 | Bespoke AgentOS division page. No corresponding route. **Verify before delete.** |

> Dead client code still ships in the bundle if exported through a barrel (`index.ts`). Removing the dead exports alone does not strip them from the build until imports are cleaned upstream.

### 3.2 Sector page architecture (`src/components/sections/sector/`)

8 reusable components designed for full-bleed sector pages:

| Component | Lines | Status |
|---|---:|---|
| `SectorHero.tsx` | 146 | Used by all sector pages. **Keep.** |
| `SectorCTA.tsx` | 50 | Used by all sector pages. **Keep.** |
| `SectorOverview.tsx` | 204 | Used by `/sectors/[slug]` template only. |
| `RiskLandscape.tsx` | 183 | Used by `/sectors/[slug]` template only. |
| `ApproachSection.tsx` | 143 | Used by `/sectors/[slug]` template only. |
| `ValueProposition.tsx` | 199 | Used by `/sectors/[slug]` template only. |
| `UseCases.tsx` | 215 | Used by `/sectors/[slug]` template only. |
| `index.ts` exports `CapabilitiesIntegration` | — | **Component file does not exist** (broken export). |

The new sector stub pages (`aviation/`, `modern-agriculture/`) only use `SectorHero` + `SectorCTA`. The 5 heavy `sector/*` components are only consumed by the `[slug]` dynamic route, which itself is in conflict with the hardcoded folders (see section 4).

### 3.3 Stale i18n namespaces

Each of `en.json`, `fr.json`, `pt.json` is **2 089 lines / ~100–110 KB**. Of those, an estimated 25–35% are stale:

- `whatWeDo.*` (≈50 keys × 3 locales) — section deleted from homepage.
- `operatingModel.*` (≈30 keys × 3 locales) — section deleted from homepage.
- `sectors.{government,infrastructure,energy,ports,cyber,ai}` — kept "for backward compat" alongside the new `sectors.{1..6}` namespace. **Same data twice**, in three languages.
- `homepageHero.coreStatement` — referenced once, by a dead Hero component path.
- Legacy keys for `WhatWeDo`/`OperatingModel` still consumed by their dead components, but those components are themselves unreachable.

### 3.4 Constants (`src/lib/constants.ts`, 652 lines, 22 KB)

| Export | Status |
|---|---|
| `SITE_METADATA` | Used. **Keep**, but reconcile brand. |
| `NAVIGATION` | Partially used (mobile nav references it, desktop hardcodes a subset). |
| `FOOTER_LINKS` | Used by Footer. **Keep.** |
| `SECTORS` (6 sectors with rich metadata) | Drives `[slug]/page.tsx` dynamic route. **Conflicts** with `i18n/locales/*.json sectors` namespace (double source of truth) and with the new bento `SectorGrid` which uses **different slugs** (`aviation`, `modern-agriculture`). |
| `CAPABILITIES` (6 entries × deep metadata) | Used by `[slug]` capability pages and `BackboneSection`. **Keep, simplify.** |
| `OPERATING_STEPS` | Dead — only `OperatingModel.tsx` consumed it. |
| `TRUST_SIGNALS` | Used by `TrustSignals` section. **Keep.** |
| `SERVICES` (Plan/Integrate/Assure) | Dead — only `WhatWeDo.tsx` consumed it. |
| `HOMEPAGE_CONTENT` | Largely dead — replaced by the inline hero + new sections. Some leftover. |

---

## 4. Routing Conflicts

```
src/app/[locale]/sectors/
├── [slug]/page.tsx                          ← dynamic, generateStaticParams from SECTORS
├── aec-gateway/                             ← division masquerading as a sector
├── agentos/                                 ← division masquerading as a sector
├── ai-fusion-intelligence/                  ← static, also in SECTORS -> emitted by both
├── aviation/                                ← static, NOT in SECTORS
├── critical-infrastructure/                 ← static, also in SECTORS -> emitted by both
├── cyber-resilience/                        ← static, also in SECTORS -> emitted by both
├── energy-mining/                           ← static, also in SECTORS -> emitted by both
├── government-national-programs/            ← static, also in SECTORS -> emitted by both
├── modern-agriculture/                      ← static, NOT in SECTORS
└── ports-borders-logistics/                 ← static, also in SECTORS -> emitted by both
```

**Issues**:

1. **Hardcoded folders override `[slug]`** at request time, but `generateStaticParams` in `[slug]/page.tsx` still emits the same paths -> potential build warning, redundant work.
2. **`/sectors/aec-gateway` and `/sectors/agentos` are divisions, not sectors.** They live under the wrong URL hierarchy.
3. The homepage `SectorGrid` links to slugs that mix both worlds (`aviation`, `modern-agriculture` -> static; `cyber-resilience`, `energy-mining` -> both static and dynamic).
4. No clear policy: should sectors be **data-driven** (constants + dynamic route) or **content-driven** (one folder per sector with hand-crafted JSX)?

---

## 5. Styling System Issues

### 5.1 `globals.css` — root cause of the visual regressions

Located at `src/app/globals.css`, ~700 lines / 17 KB. Contains:

- Design tokens (CSS custom properties) — correct.
- Container utility — fine.
- Body/html base — fine.
- **Brittle global typography** — caused all the recent debugging:
  - `h1 { background: linear-gradient(...); -webkit-text-fill-color: transparent; }` forced **every** `<h1>` site-wide to render as a gradient with transparent text fill. In WebKit/Blink, `-webkit-text-fill-color` overrides `color`, so utility classes like `text-white` were silently neutralized.
  - `h2 { color: #F8FAFC }`, `h3 { color: #CBD5E1 }`, `p { color: var(--foreground-secondary) }` — hardcoded colors competing with utility classes.
  - `h1..h6 { font-size: ... }` per-tag rules competing with `text-4xl`, `text-display-lg`.

**Already mitigated** in the current state: those rules were stripped from the typography block. But the lesson stands — **typography must be utility-driven**, not tag-driven.

- `.text-gradient`, `.text-gradient-accent` (lines 297–309) -> **opt-in** decorative utilities. Keep.
- `.glass`, `.hover-lift`, `.grid-pattern`, `.accent-line-bottom`, `.border-animated` -> premium utilities. Some used, some orphan. Audit before keeping.

### 5.2 README–code drift on the design system

The previous README documented colors that **do not match `globals.css`**:

| README (old) | Actual `globals.css` |
|---|---|
| `--accent: #2563eb` (blue) | `#00C2FF` (cyan) |
| `--background: #0a0a0a` | `#0B1120` (slate) |
| `--surface: #141414` | `#131c2e` |
| `--foreground-secondary: #a3a3a3` | `#94A3B8` (slate-400) |
| `--foreground-muted: #737373` (darker) | `#CBD5E1` (slate-300, **lighter** than secondary) |
| Typography tokens `text-display-lg = 4rem` | Defined in Tailwind config; partly overridden by tag rules. |

The naming inversion of `foreground-muted` (which is brighter than `foreground-secondary`) is itself a footgun for any developer reading the names.

### 5.3 Other CSS observations

- `text-base` already 1rem; many components additionally specify inline `style={{ fontSize: '14px' }}` instead of `text-sm`. Inconsistent.
- `text-display-*` Tailwind utilities are referenced in code but not all defined in the actual Tailwind v4 theme block — partial.
- Inline `style` objects with hex colors litter components even where CSS variables exist (`#0B1120` vs `var(--background)`).
- ~26 files marked `'use client'` — essentially the entire UI is client-rendered. No deliberate server/client boundary. Hurts initial paint and bundle size.

---

## 6. i18n Architecture

**Stack:** `next-intl@^4.7.0` with locale prefix routing (`/en`, `/fr`, `/pt`), `setRequestLocale` per page, `getMessages` per layout.

**Status:**

- 3 locale files of **identical structure** (good) and **identical line count** (2 089) -> key parity is preserved.
- Static generation works (`generateStaticParams` returns `[en, fr, pt]`).
- `LanguageSwitcher` swaps prefixes correctly.

**Pain points:**

- File size (100+ KB per locale) loaded on every page -> no namespace splitting.
- Several namespaces are dead (section 3.3).
- Some keys are duplicated across namespaces (`sectors.aviation.hero.title` and `sectors.2.title` carry the same string).
- Sector content is split between `lib/constants.ts` (slugs, icons, capabilities relations, metadata) and `i18n/locales/*.json` (titles, descriptions, content). No clear contract.
- Some sector pages render content that doesn't exist in non-`en` locales -> silent fallback to key string.

---

## 7. Component Inventory (size by lines)

### Top 15 largest source files

```
src/lib/constants.ts                                  652 L   22 KB
src/components/sections/SectorGrid.tsx                325 L   10 KB
src/components/divisions/AECGatewayPage.tsx           296 L   12 KB
src/components/divisions/AgentOSPage.tsx              292 L   12 KB
src/components/sections/DivisionsSection.tsx          252 L    8 KB    (dead)
src/components/sections/Hero.tsx                      243 L    8 KB    (dead)
src/types/index.ts                                    242 L    6 KB
src/components/sections/sector/SectorOverview.tsx     204 L   12 KB
src/components/sections/OperatingModel.tsx            202 L   11 KB    (dead)
src/components/sections/sector/ValueProposition.tsx   199 L   11 KB
src/components/sections/DivisionGrid.tsx              193 L    7 KB
src/components/sections/sector/RiskLandscape.tsx      183 L    9 KB
src/components/sections/WhatWeDo.tsx                  175 L    7 KB    (dead)
src/components/sections/sector/SectorHero.tsx         146 L    6 KB
src/components/sections/sector/ApproachSection.tsx    143 L    7 KB
```

### Layout & UI primitives

| File | Status |
|---|---|
| `components/layout/Header.tsx` | Working. Brand sub-label hidden < 640 px. Mobile menu functional. |
| `components/layout/Footer.tsx` | Functional. Reads `FOOTER_LINKS` from constants. |
| `components/ui/Button.tsx` | CVA-based variants. Used. |
| `components/ui/LanguageSwitcher.tsx` | Functional. |
| `components/ui/FlagIcon.tsx` | Used by LanguageSwitcher. |
| `components/ui/HCSWidgetScript.tsx` | Loads external HCS widget. **Effect on bundle and CSP unclear.** |
| `components/ui/VideoTransition.tsx` | Dead (only consumed by dead `DivisionsSection.tsx`). |

### Homepage sections (current `app/[locale]/page.tsx`)

```
<Hero inline />              ← inline JSX, NY skyline image
<DivisionGrid />             ← 3 divisions: HCS, AEC Gateway, AgentOS
<BackboneSection />          ← stats + CTA to /capabilities/hybrid-vector
<SectorGrid />               ← bento, 6 sectors
<TrustSignals />             ← 5 governance signals
<CTASection />               ← final CTA
```

This is the only page that has been redesigned in the recent pass. The other pages (`about`, `contact`, `insights`, `legal`, `privacy`, `security`, `terms`, sector pages, capability pages) are from earlier phases and **have not been audited visually**.

---

## 8. Recommended Rebuild Plan

If you decide to start over from a fresh Next.js 16 scaffold, here is a concise brief.

### 8.1 Strict scope (one brand, one source of truth)

- Decide brand: **HMH | Hybrid Mobility Holdings** (matches live URL & Header).
- One constant `BRAND` exported from `src/lib/brand.ts` with all metadata. Everything imports from there. No string literals of the brand name elsewhere.

### 8.2 Foundation rules

1. **Tailwind utility-first**, no tag-based color/size CSS rules. `globals.css` contains only:
   - CSS custom properties (design tokens)
   - Body/html base
   - Container utility
   - Opt-in decorative classes (`.glass`, `.text-gradient`, `.hover-lift`)
2. **Never** use `-webkit-text-fill-color: transparent` in a tag selector. Only on `.text-gradient` opt-in classes.
3. **Server components by default**; mark client only when interactive (`useState`, `useEffect`, `framer-motion`, `useTranslations` is fine in server with `getTranslations`).
4. **Color token renaming** to remove the `secondary > muted` confusion: `--text-primary` (white), `--text-secondary` (slate-300), `--text-tertiary` (slate-400), `--text-disabled` (slate-500).
5. Single typography scale defined in Tailwind v4 `@theme` block. No tag-based font sizing.

### 8.3 Routing

- **One strategy** for sectors: data-driven dynamic route `[locale]/sectors/[slug]` with `generateStaticParams` from a single `SECTORS` constant. **Delete all hardcoded sector folders.**
- Divisions live under their own URL space: `/divisions/aec-gateway`, `/divisions/agentos`, `/divisions/hcs-u7` (or under the homepage anchor only).
- Capabilities under `/capabilities/[slug]`.
- Legal/privacy/terms under `/legal/*` (one section, not 3 sibling folders).

### 8.4 Data contract

- Single `SECTORS` constant: `{ slug, icon, accentColor, gridSize, capabilityIds, gradientImage }`.
- All copy lives in `i18n/locales/*.json` keyed by slug: `sectors[slug].title`, `sectors[slug].description`, `sectors[slug].hero.lead`, `sectors[slug].stats.{key}`, `sectors[slug].cta.*`.
- One renderer per page type. No bespoke per-sector JSX.

### 8.5 i18n

- Split per page namespace: `home.json`, `sectors.json`, `capabilities.json`, `about.json`, `legal.json`, `nav.json`. Lazy-load per route.
- Reset to a minimal viable set of keys; port content over deliberately, not by copy-paste.
- Establish a TypeScript type for translation keys (e.g. via `next-intl`'s typed messages) so dead keys are caught at compile time.

### 8.6 Components to keep verbatim

- `Header.tsx` (with the mobile fix already applied).
- `Footer.tsx`.
- `Button.tsx`, `LanguageSwitcher.tsx`, `FlagIcon.tsx`.
- `BackboneSection.tsx` (already utility-driven).
- `TrustSignals.tsx` (small, focused).
- `CTASection.tsx`.

### 8.7 Components to rebuild

- Hero (homepage): unify the inline JSX into a clean `<HomepageHero />` server component. Use a darker/lighter image or an SVG illustration to remove the contrast battle entirely.
- `DivisionGrid` + `BackboneSection` + `SectorGrid` -> keep the layout patterns, but rebuild as **server components** receiving translated content via `getTranslations`. Drop client-side framer-motion in favor of CSS scroll-driven animations or a single tiny client wrapper.
- Sector pages: one shared `<SectorPage />` template fed by data + i18n; the 5 heavy sub-sections (Overview, Risk, Approach, Value, UseCases) must be auditable in 1 file each, not 200+ lines.

### 8.8 Components to delete

- `Hero.tsx`, `WhatWeDo.tsx`, `OperatingModel.tsx`, `DivisionsSection.tsx`, `VideoTransition.tsx`.
- `divisions/AECGatewayPage.tsx`, `divisions/AgentOSPage.tsx` (after content extraction).
- `[locale]/sectors/[slug]/page.tsx` OR all hardcoded sector folders — pick one.
- All stale i18n namespaces (`whatWeDo`, `operatingModel`, `sectors.{government,infrastructure,energy,ports,cyber,ai}` legacy keys).

### 8.9 Tooling

- Add ESLint rules `no-unused-exports` and `no-deprecated`.
- Add a `scripts/check-i18n.ts` that diffs key sets across `en/fr/pt` and warns on dead keys.
- Adopt a brand-name lint: a Husky pre-commit grep blocking commits that mix HMH/HC-1/Hybrid Concepts unless explicitly whitelisted.
- Lighthouse CI in PRs targeting Performance >= 90 / Accessibility >= 95.

---

## 9. Quick Wins Available Without a Rebuild

If a full rebuild is deferred, the following can be done in the current codebase to stop the bleeding (each is small and reversible):

1. **Delete dead components** (`Hero.tsx`, `WhatWeDo.tsx`, `OperatingModel.tsx`, `DivisionsSection.tsx`, `VideoTransition.tsx`) and their exports in `sections/index.ts`.
2. **Delete the broken export** of `CapabilitiesIntegration` in `sections/sector/index.ts`.
3. **Fix `package.json` name** (`temp-next` -> `hybrid-concept` or `hmh-website`).
4. **Reconcile brand** in `SITE_METADATA` and layout titles to a single value.
5. **Remove duplicate i18n keys** introduced for backward compat (legacy sector slugs).
6. **Decide** between dynamic `[slug]` and hardcoded folders for sectors. Delete the loser.
7. **Move divisions out of `/sectors/`** to `/divisions/`.

Each of these is a self-contained PR.

---

## 10. Current Working Setup (for reference until rebuild)

```bash
# install
npm install

# dev
npm run dev          # http://localhost:3000

# typecheck
npx tsc --noEmit -p tsconfig.json   # currently exits 0

# lint
npm run lint         # passes with 2 minor warnings in SectorHero (break-words -> wrap-break-word)

# build
npm run build
```

Locales: `en` (default), `fr`, `pt` — prefix routing, no rewrite. Middleware in `src/middleware.ts` redirects `/` to `/en`.

---

## 11. License & Ownership

Proprietary — Hybrid Mobility Holdings. All third-party assets (icons via Lucide, fonts via next/font, NY skyline image in `public/images/`) under their respective licenses; verify before any external publication.

---

*Document generated as a rebuild brief. Treat the previous marketing-style README as obsolete.*
