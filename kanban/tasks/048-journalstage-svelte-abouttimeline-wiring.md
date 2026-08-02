---
id: 48
title: JournalStage.svelte + AboutTimeline wiring
status: done
priority: high
created: 2026-08-02T12:54:25.0355015+06:00
updated: 2026-08-02T16:29:49.1045312+06:00
started: 2026-08-02T16:29:49.2046695+06:00
completed: 2026-08-02T16:29:49.2046695+06:00
tags:
    - threejs
    - journal
parent: 45
depends_on:
    - 46
    - 47
class: standard
---

Objective: Add `JournalStage.svelte` (canvas wrapper that lazily loads the engine + texture pipeline and owns canvas/resize/dispose) and wire `AboutTimeline.svelte` to it â€” stage swap, `webgl-journal` gate, fallback ladder â€” per plan Â§3 and Â§6 of `docs/plans/journal-threejs.md` (read it first). Depends on #46 (engine) and #47 (texture pipeline).

Acceptance criteria:
- `JournalStage.svelte`: renders the canvas + the hidden DOM leaves (layout placeholders for the stage height and snapshot source); lazy engine load `const { Journal3D } = await import('../journal3d.js')`; engine starts only when the stage approaches the viewport (IntersectionObserver) and only under `html.motion-init.book-enabled`; adds `html.webgl-journal` class only when the engine reports a live first frame.
- AboutTimeline keeps its `flip()` state machine, guards, keyboard/swipe/corner-tab controls, leaf counter, and `aria-live` announcements unchanged â€” it hands `page`/`turning` to the engine; engine animates `t` with the existing timing (cubic-bezier(0.22,1,0.36,1), ~0.7s); the component commits `page` at 720ms exactly as today; input ignored while turning.
- Fallback ladder: WebGL init failure (no context, raster failure, snapshot failure) removes `webgl-journal` and restores the CSS book â€” no user-visible break; reduced motion / no-JS behavior identical to today (static stack, never engine).
- Canvas is `aria-hidden`; DOM leaves stay in the tree as the content source of truth (SEO/a11y unchanged).
- Loop pauses when tab hidden or stage off-screen; `visibilitychange` handled; full dispose on `onDestroy` and on `book-enabled` loss.
- The `three` chunk is code-split and never in the initial bundle.

Output format: `frontend/src/lib/components/JournalStage.svelte`, `frontend/src/lib/components/AboutTimeline.svelte`.

Done: Verify loop (`pnpm check` â†’ `pnpm lint` â†’ `pnpm build`) passes; reviewer disposition pass; merged to main.
