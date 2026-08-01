# Site Standards — SEO / AEO / Accessibility

The site completed a full SEO/AEO/accessibility pass (see `docs/plans/`). These are invariants — do not regress them.

## Prerendering & Deployment

- All routes prerender to static HTML via `@sveltejs/adapter-netlify`. Strict builds — a 404 during prerender fails the build.
- `netlify.toml` lives at the **repo root** (asset caching, security headers, deploy settings).

## SEO / AEO

- Every route must have: title, meta description, canonical, og:image, twitter:image — via the shared `Seo.svelte` component and `siteMeta` in `data.js`.
- JSON-LD: `@graph` (Person / ProfilePage / WebSite) on `/`; FAQPage on the homepage FAQ section. Must remain valid JSON in the built output.
- `static/sitemap.xml` and `static/llms.txt` stay in sync with routes (currently `/`, `/about`, `/projects`). Update both when pages are added or renamed.
- New human-answerable facts belong in `data.js` first (see `agent_rules/content-truth.md`).

## Accessibility (WCAG 2.2)

- Baseline: axe-core reports **0 violations** on `/` and `/about` (axe-core 4.12.1). Re-verify after a11y changes.
- Mobile menu: focus trap + focus restore, `inert` on background content.
- Forms: `aria-live` status region, per-field `aria-invalid`/`aria-describedby`, `autocomplete`, disabled while pending.
- Text contrast ≥ 4.5:1; decorative microcopy is `aria-hidden`.
- No `{@html}` with user input. Static JSON-LD scripts in `svelte:head` may use `{@html}` (verified safe pattern — no interpolation).
