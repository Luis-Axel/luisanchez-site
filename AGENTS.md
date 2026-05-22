# Repo notes for AI assistants

Standard Next.js 15 (App Router) + Tailwind v4 + TypeScript project.

## History note

Originally scaffolded on Next.js 16.2.6 (latest at the time of `create-next-app`). Downgraded to Next 15 on 2026-05-22 after a Vercel build failure: the new Next 16 Adapters API (`modifyConfig` hook) hit a path resolution bug in Vercel's build runner — `TypeError: The "path" argument must be of type string. Received undefined`. Next 15 is stable on Vercel. Revisit Next 16 once Vercel's adapter has settled.

## Conventions

- **shadcn/ui not installed via CLI.** Hand-rolled the one Button we needed plus `cn()` from clsx + tailwind-merge. `npx shadcn@latest init` will work from this scaffold if you want the full registry later.
- **Theme handling** uses a small `useSyncExternalStore`-based provider in `src/components/theme-provider.tsx` instead of `next-themes` — cleaner under React 19 lint rules, no hydration drift.
- **Design tokens** (3 colors + cream accent + Geist Sans/Mono) live in `src/app/globals.css` as CSS variables. Token system ported from a benshih.design teardown.
- **Content modules** under `src/content/` are typed TS (case-study, testimonials, press). Not MDX.
