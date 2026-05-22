# luisanchez-site

Personal portfolio for **Lui Sanchez** — data engineer & analytics builder.

> _"I build the data and automation systems that turn messy operations into scalable decisions."_

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-variable token system)
- **next/font** — Geist Sans + Geist Mono (Vercel's free typeface; defensible substitute for the paywalled Acorn/Roobert pair from the design teardown)
- Custom theme provider (light/dark) via `useSyncExternalStore` + `data-theme` on `<html>`
- All components hand-built — no shadcn CLI dependency at runtime (`clsx` + `tailwind-merge` for the `cn()` helper)
- Static export-friendly: every route is prerendered (`○ Static` / `● SSG`)

## Dev / build / lint

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (Next.js + React rules)
```

> If you have `pnpm` installed, `pnpm install / pnpm dev / pnpm build / pnpm lint` work identically — the project was scaffolded with npm only because pnpm wasn't on the build box.

## Routes

| Route | What |
| --- | --- |
| `/` | Homepage — hero, stat banner, about teaser, 3 hero case studies (with year rail), 5 "More Work" entries, contact |
| `/about` | Bio, current role, work timeline, side projects, contact details |
| `/case-studies/[slug]` | Case study detail — hero → metadata grid → 3 stat callouts → constraint chips → OnThisPageNav → Symptom / Diagnosis / Hypothesis / Implementation / Results → Before/After → MoreCaseStudies |

Three case studies ship out of the box:

- `/case-studies/pricing-intelligence-platform`
- `/case-studies/enterprise-analytics-platform`
- `/case-studies/causal-inference-evaluation-framework`

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, ThemeProvider, NavPill, Footer
│   ├── globals.css                 # Tailwind import + design tokens (light + dark)
│   ├── page.tsx                    # Homepage
│   ├── about/page.tsx              # About page
│   └── case-studies/[slug]/page.tsx# Dynamic case study (uses generateStaticParams)
├── components/                     # All 14 components from the teardown spec
│   ├── nav-pill.tsx                # Top pill nav + mobile bottom-tab pill
│   ├── section.tsx                 # px-5 py-10 md:px-8 lg:px-[120px] wrapper, max-w-[1200px]
│   ├── hero.tsx                    # H1 + intro
│   ├── button.tsx                  # Primary / outline / ghost; renders <Link> or <a>
│   ├── year-rail.tsx               # 2-col grid, year at 25% opacity in left rail
│   ├── case-study-card.tsx         # Title above media, absolute <Link> overlay, button below
│   ├── stat-callout.tsx            # 3-up big numbers, tabular-nums, primary color
│   ├── metadata-grid.tsx           # 4-cell Stack / Scale / SLA / Outcome grid
│   ├── before-after.tsx            # 2-up captioned figure
│   ├── constraint-chip.tsx         # bg-primary/10 text-primary pill (was "How Might We")
│   ├── on-this-page-nav.tsx       # Inline anchor TOC
│   ├── more-case-studies.tsx       # 3-card grid at bottom of detail pages
│   ├── footer.tsx                  # Site + Elsewhere link columns
│   ├── theme-provider.tsx          # Light/dark via useSyncExternalStore + localStorage
│   └── theme-toggle.tsx            # The switch itself
├── content/
│   └── case-studies.ts             # All case study content + "More Work" entries
└── lib/
    └── utils.ts                    # cn() helper
```

## Adding visuals

Every spot that needs imagery is rendered today as a labeled `[TODO: ...]` placeholder so it's obvious where to drop the real asset. Two patterns:

1. **Dark media frame** (case study hero, case study card, inline section visuals, MoreCaseStudies cards) — `bg-black/90 rounded-[12px]` with the TODO text overlaid in white/40 mono. Replace with `<Image />` or `<video autoPlay muted loop playsInline>`.
2. **Bordered figure** (`BeforeAfter`, More Work strip on homepage) — light card with the TODO text in muted mono.

To swap a placeholder for a real asset:

```tsx
// Before
<div className="aspect-[1948/1080] bg-black/90 rounded-[12px] grid place-items-center">
  <span>[Hero visual placeholder — TODO: ...]</span>
</div>

// After
import Image from "next/image";

<div className="aspect-[1948/1080] overflow-hidden rounded-[12px] bg-black/90">
  <Image
    src="/case-studies/pricing/hero.png"
    alt="Pricing platform — broker quoting view"
    width={1948}
    height={1080}
    className="h-full w-full object-cover"
    priority
  />
</div>
```

Drop static assets in `public/` (e.g. `public/case-studies/pricing/hero.png`) and reference them with leading-slash paths.

## Adding or editing case studies

All case-study copy lives in **`src/content/case-studies.ts`** as a typed array. To add a new study:

1. Push a new `CaseStudy` object onto `CASE_STUDIES`. The shape is enforced by TypeScript.
2. `generateStaticParams()` in `src/app/case-studies/[slug]/page.tsx` will pick up the new slug automatically — no other wiring needed.
3. To surface it on the homepage's Selected Work strip, it's already included (homepage iterates `CASE_STUDIES`).
4. To add a secondary entry (no detail page), append to `MORE_WORK` in the same file.

Each case study uses the **Symptom / Diagnosis / Hypothesis / Implementation / Results** narrative arc lifted from the benshih.design teardown. Stick to that shape — it's load-bearing for the OnThisPageNav anchors.

## Design tokens

All colors and shadow are CSS variables defined in `src/app/globals.css`, both for `:root` (light) and `[data-theme="dark"]`. Tailwind v4 exposes them via `@theme inline` so you can write `text-[var(--color-primary)]` or `bg-[var(--color-bg-cream)]` directly in JSX.

Key tokens:

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#fafafa` | `#0a0e0d` | Page background |
| `--color-bg-cream` | `#f9f4ed` | `#11201d` | Accent sections only (e.g. Contact CTA) |
| `--color-primary` | `#02594e` | `#02594e` | Brand accent, links, buttons |
| `--color-text-strong` | `#101828` | `#f2f5f4` | H1, H2, emphasized text |
| `--color-text-primary` | `#4c6763` | `#c8d4d1` | Body |
| `--color-text-secondary` | `#344054` | `#a0aeac` | Secondary nav, captions |

## Fonts

The teardown spec called for **Acorn** (Indian Type Foundry) for display and **Roobert** for body. Both are paywalled, so this build ships **Geist Sans + Geist Mono** via `next/font/google` — Vercel's own typeface, free, and a defensible visual substitute. To swap:

1. Self-host the licensed font files under `public/fonts/`.
2. Replace `next/font/google` import in `src/app/layout.tsx` with `next/font/local`.
3. Keep the same `--font-geist-sans` / `--font-geist-mono` CSS-variable names, or update the references in `globals.css` (`--font-sans`, `--font-display`, `--font-mono`).

## Deploy

Built for Vercel. Just connect the repo and it deploys with zero config — the build is already static (`generateStaticParams` covers the dynamic route).

## TODOs left in the build

- Replace every `[TODO: ...]` visual placeholder with real diagrams / screenshots (see "Adding visuals" above).
- Two stat values on enterprise-analytics + causal-inference case studies are marked `TODO` pending confirmation of exact counts.
- ✓ Domain set to luissanchez.io (replaces earlier placeholder).
- Optional: swap Geist for licensed Acorn/Roobert if budget allows.
