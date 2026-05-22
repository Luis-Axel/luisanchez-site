# luisanchez-site

Personal portfolio for **Luis Sanchez** — data + ML engineer for operationally messy businesses.

Live at **[luissanchez.io](https://luissanchez.io)**.

> _"I build production-grade data and ML systems for operationally messy businesses, especially in logistics and supply chain."_

## Stack

- **Next.js 15** (App Router, TypeScript, Turbopack)
  - Originally scaffolded on Next 16.2.6; downgraded after a Vercel adapter (`modifyConfig`) path-resolution bug. See `AGENTS.md` for the full note. Revisit Next 16 once the adapter is stable.
- **React 19**
- **Tailwind CSS v4** — `@theme inline` + CSS-variable token system in `src/app/globals.css`
- **next/font** (Google) — four faces:
  - **Geist Sans** → body (`--font-geist-sans`)
  - **Geist Mono** → labels, eyebrows, captions (`--font-geist-mono`)
  - **Outfit** → display, free analogue to Acorn from the design teardown (`--font-outfit`, exposed as `font-display`)
  - **Caveat** → handwritten accents, e.g. the "in case you're tired of reading" hero caption (`--font-caveat`, exposed as `font-hand`)
- Custom **theme provider** (light/dark) via `useSyncExternalStore` + `data-theme` on `<html>` — chosen over `next-themes` for cleaner React 19 lint compliance and zero hydration drift. Dark mode is the default.
- All components hand-built — **no shadcn CLI dependency**. The `cn()` helper (`clsx` + `tailwind-merge`) is the only UI primitive borrowed.
- **Static export-friendly**: every route is prerendered (`○ Static` / `● SSG`). Case-study routes use `generateStaticParams`.

## Dev / build / lint

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (Next.js + React 19 rules)
```

> Project was scaffolded with npm; pnpm and yarn work too if preferred.

## Routes

| Route | What lives there |
| --- | --- |
| `/` | Homepage — intro hero with sticky-card row + introduction video, About teaser, 4 hero case studies with year rail, "Working with me" showcase, Press & recognition, Contact |
| `/about` | Hero · Right Now · How I Work (5 cards) · Journey timeline · School · Side projects · Contact |
| `/case-studies/[slug]` | Case study detail — Hero → MetadataGrid → StatCallout → ConstraintChipRow → OnThisPageNav → Symptom / Diagnosis / Hypothesis / Implementation / Results → MoreCaseStudies |

### Case studies (current, in homepage order)

1. `/case-studies/pricing-intelligence-platform` — Genpro, 2025
2. `/case-studies/etl-integration-replacement` — USCS, 2023
3. `/case-studies/smartmove-platform` — USCS, 2024
4. `/case-studies/mutuall-chrome-extension` — Personal, 2025

Order is defined by the array in `src/content/case-studies.ts`. `generateStaticParams()` picks up new slugs automatically.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Fonts, ThemeProvider, NavPill, Footer
│   ├── globals.css                 # Tailwind import + design tokens (light + dark)
│   ├── page.tsx                    # Homepage
│   ├── about/page.tsx              # About page
│   └── case-studies/[slug]/page.tsx# Dynamic case study (uses generateStaticParams)
├── components/
│   ├── nav-pill.tsx                # Top pill nav (hash-aware active state) + mobile bottom-tab pill
│   ├── section.tsx                 # px-5 py-10 md:px-8 lg:px-[120px] wrapper, max-w-[1200px]
│   ├── hero.tsx                    # HomeHero (intro + sticky-card row) and shared Hero (case studies / about)
│   ├── button.tsx                  # Primary / outline / ghost; renders <Link> or <a>
│   ├── sticky-card.tsx             # The orange/green/blue tilted hero cards
│   ├── video-block.tsx             # VideoCard + modal player (centerpiece of the hero row)
│   ├── working-with-me.tsx         # 5-card testimonial showcase with cutout centerpiece
│   ├── journey-timeline.tsx        # Diagonal staircase pills with hover detail cards (About)
│   ├── year-rail.tsx               # 2-col grid, year at 25% opacity in left rail
│   ├── case-study-card.tsx         # Title above media, absolute <Link> overlay
│   ├── stat-callout.tsx            # 3-up big numbers, tabular-nums
│   ├── metadata-grid.tsx           # 4-cell Stack / Scale / SLA / Outcome grid
│   ├── before-after.tsx            # 2-up captioned figure (kept for case studies that ship B/A)
│   ├── constraint-chip.tsx         # bg-primary/10 pill row
│   ├── on-this-page-nav.tsx        # Inline anchor TOC
│   ├── more-case-studies.tsx       # 3-card grid at the bottom of detail pages
│   ├── testimonial-card.tsx        # LinkedIn-style + cream-paper testimonial cards
│   ├── press-card.tsx              # Compact press / recognition entry
│   ├── footer.tsx                  # Site + Elsewhere link columns
│   ├── theme-provider.tsx          # Light/dark via useSyncExternalStore + localStorage
│   └── theme-toggle.tsx            # The switch itself
├── content/
│   └── case-studies.ts             # All case study content + MORE_WORK entries (typed)
└── lib/
    └── utils.ts                    # cn() helper (clsx + tailwind-merge)
```

## Design tokens

All colors and shadows are CSS variables defined in `src/app/globals.css`, both for `:root` (dark — the default) and `[data-theme="light"]`. Tailwind v4 exposes them via `@theme inline` so you can write `text-[var(--color-accent)]` or `bg-[var(--color-primary)]` directly in JSX.

The palette uses **two distinct teal tokens** by design:

| Token | Dark (default) | Light | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#0a0e0d` | `#fafafa` | Page background |
| `--color-bg-cream` | `#11201d` | `#f9f4ed` | Accent sections only (e.g. case-study CTA) |
| `--color-primary` | `#02594e` | `#02594e` | Deep teal — solid-fill backgrounds that surround white text (badges, buttons, sticky bullets) |
| `--color-accent` | `#5eead4` | `#02594e` | Bright mint **as text** in dark; falls back to deep teal in light because mint washes out on cream |
| `--color-text-strong` | `#f2f5f4` | `#101828` | H1, H2, emphasized text |
| `--color-text-primary` | `#c8d4d1` | `#4c6763` | Body |
| `--color-text-secondary` | `#a0aeac` | `#344054` | Secondary nav, captions |

**Rule of thumb**: if you're rendering colored *text*, use `--color-accent`. If you're rendering a *background fill* that will hold white text on top, use `--color-primary`. Splitting these stops mint accents from disappearing on the cream sections in light mode.

## Adding or editing case studies

Case-study copy lives in **`src/content/case-studies.ts`** as a typed array.

1. Push a new `CaseStudy` object onto `CASE_STUDIES`. The shape is TypeScript-enforced.
2. `generateStaticParams()` in `src/app/case-studies/[slug]/page.tsx` picks up the new slug automatically — no other wiring needed.
3. The homepage's Selected Work section iterates `CASE_STUDIES` directly, so the new study appears there on its own.
4. For lighter-weight entries that don't deserve a detail page, append to `MORE_WORK` in the same file.

Each case study follows the **Symptom / Diagnosis / Hypothesis / Implementation / Results** narrative arc. Keep that shape — it's load-bearing for the `OnThisPageNav` anchor IDs.

### Section visuals

Per-section visuals are declared inline on each case study via the `visuals` array. Three modes are supported:

- **`src`** — a single image (default 1948:1080 aspect, override with `aspect`).
- **`stack`** — a deck-of-cards effect for multi-platform mocks (used on Mutuall for Target / Walmart / Other).
- _(reserved)_ **`puzzle`** — placeholder slot for a future jigsaw layout; not yet rendered.

## Adding visuals

Most `[TODO: ...]` placeholders from the initial scaffold have been replaced with real assets. The conventions if you need to drop more in:

1. **Dark media frame** (case-study hero, in-section visuals, MoreCaseStudies cards) — `aspect-[1948/1080] overflow-hidden rounded-[12px] bg-black/90` with the asset inside.
2. **Bordered figure** (BeforeAfter, paper testimonials, working-with-me cards) — light card with a soft border.

Drop static assets in `public/` (e.g. `public/case-studies/pricing/hero.png`) and reference them with leading-slash paths.

## Deploy

Built for **Vercel**. Connect the repo at the dashboard and it deploys on push to `main` with zero config — the build is fully static. Domain `luissanchez.io` is registered at Cloudflare Registrar; DNS points at Vercel.

## Open TODOs

- A few stat values across case studies are marked `TODO` pending exact confirmation.
- Reserved `puzzle` visual mode in the case-study schema is defined but not yet rendered.
- Optional: swap free Outfit/Geist for licensed Acorn/Roobert if budget ever allows. The token + font-variable plumbing is already in place — see `src/app/layout.tsx`.
