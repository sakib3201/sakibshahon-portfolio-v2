---
id: 21
title: Prerender all routes to static HTML
status: done
priority: high
created: 2026-08-01T11:36:36.4996125+06:00
updated: 2026-08-01T12:10:20.2869497+06:00
started: 2026-08-01T12:10:20.2963527+06:00
completed: 2026-08-01T12:10:20.2963527+06:00
tags:
    - seo
parent: 17
class: standard
---

Goal: ship /, /about, /projects as static HTML from the Netlify CDN (prerendered) instead of dynamic SSR per request. Files: frontend/src/routes/+layout.js (NEW) containing: export const prerender = true; Keep +error.svelte working for 404s (it is not prerendered - verify the error page still renders on a bad URL in preview). Acceptance: pnpm build emits static HTML for the 3 routes; built / HTML still contains the full head (title, meta description, canonical, JSON-LD). Do not touch route files. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.

[[2026-08-01]] Sat 12:06
BLOCKED on prerender 404s: src/lib/data.js references 6 images that never existed in any git commit: /assets/timetics-logo.webp, aisentic-logo.webp, booktics-logo.webp, eventin-logo.webp, wpcafe-logo.webp, findracepace.webp. Under SSR these 404 silently (components ProjectCard/ProductsShipped/etc. have client-side onerror fallbacks), but SvelteKit prerender crawler hard-fails: 'Error: 404 /assets/timetics-logo.webp (linked from /)'. Task constrained to one-file change (+layout.js with export const prerender = true) - cannot add handleHttpError to svelte.config.js, patch data.js paths, or add placeholder logos without violating scope. Unblock options: (a) add the real logo assets to frontend/static/assets/, (b) repoint data.js image fields to existing assets (e.g. arraytics-logo.webp, ictbjhomepage.png), or (c) relax svelte.config.js prerender handleHttpError. State: worktree .worktrees/task-21-prerender-all-routes exists with branch task/21-prerender-all-routes; +layout.js already written (untracked, uncommitted). pnpm check + lint pass; pnpm build fails with the 404 above.

[[2026-08-01]] Sat 12:10
Note: 6 brand logo assets never existed in repo (timetics, aisentic, booktics, eventin, wpcafe, findracepace) - image refs nulled; owner should provide real logos later. Tracked in #38 owner handoff.
