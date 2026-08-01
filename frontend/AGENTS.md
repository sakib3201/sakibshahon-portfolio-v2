# Frontend — SvelteKit App

SvelteKit 2 (Svelte 5) + Tailwind CSS 4 + Vite 7, `pnpm`, `@sveltejs/adapter-netlify`. Loaded automatically when working in this directory.

## Commands (run in this directory)

- `pnpm check` — svelte-check (must pass)
- `pnpm lint` — eslint (must pass)
- `pnpm build` — vite build (must pass; strict — the site prerenders)
- All three before any merge. PowerShell: chain with `;`, not `&&`.

## Conventions

- `src/lib/data.js` is the single source of truth (siteMeta, socialLinks, productsShipped, projects, skills, experience, awards, aboutTimeline, faq). Components read from data — never hardcode copy in components.
- Static prerender is a hard requirement: `src/routes/+layout.js` sets `export const prerender = true`. Do not add client-only or CSR-dependent routes without approval.
- Per-route head/meta/OG/JSON-LD goes through the shared `Seo.svelte` component (`src/lib/components/Seo.svelte`).
- Keep `static/sitemap.xml` and `static/llms.txt` in sync when routes change (currently `/`, `/about`, `/projects`).
- Dark theme is a standing commitment (see `PRODUCT.md`); respect `prefers-reduced-motion`.
- Assets live in `static/assets/`; missing logos must render their fallback (never block on assets).
