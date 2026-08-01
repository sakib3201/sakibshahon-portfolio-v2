---
id: 39
title: Scroll-progress needle under the navbar
status: done
priority: medium
created: 2026-08-01T15:10:49.000941+06:00
updated: 2026-08-01T15:35:57.1183227+06:00
started: 2026-08-01T15:35:57.1273935+06:00
completed: 2026-08-01T15:35:57.1273935+06:00
tags:
    - visual
    - polish
class: standard
---

Objective: Add a decorative fixed 1px dashed gold scroll-progress needle under the navbar marking the readers place on the back piece.

Acceptance criteria:
- New frontend/src/lib/components/ScrollProgressNeedle.svelte, mounted once in frontend/src/routes/+layout.svelte; aria-hidden; z-40 (below the z-50 navbar).
- Progress driven by a passive scroll listener, rAF-throttled, applied as scaleX 0 to 1 with transform-origin left; idle opacity about 0.4, brightens while scrolling.
- Disabled entirely under prefers-reduced-motion.
- No new dependencies; static prerender and axe baseline unaffected; pnpm check, pnpm lint, pnpm build all pass from frontend/.

Output format: New ScrollProgressNeedle.svelte; +layout.svelte mounts it.

Done: Verify loop passes; reviewer disposition pass; merged to main.
