---
id: 43
title: 'Project images: ink-wash hover with cursor gold bloom'
status: done
priority: high
created: 2026-08-01T15:11:21.0990249+06:00
updated: 2026-08-01T15:35:58.2980082+06:00
started: 2026-08-01T15:35:58.3121507+06:00
completed: 2026-08-01T15:35:58.3121507+06:00
tags:
    - visual
    - motion
class: standard
---

Objective: Give project screenshot wells an ink-wash hover: idle desaturated and darkened, hover colorizes with a cursor-following gold bloom.

Acceptance criteria:
- Applied to ProjectCard.svelte and ProjectLibraryCard.svelte image wells: idle filter about saturate(0.78) brightness(0.9); hover removes the filter over about 0.5s; existing hover scale preserved.
- Cursor bloom is a faint gold radial following the pointer via --x/--y custom properties, rAF-throttled, only on pointer:fine devices; the fallback medallion state receives the same bloom.
- Shared helper initInkWash added to frontend/src/lib/motion.js; per-card scoped styles; no new dependencies.
- Reduced motion: no bloom or pointer tracking; colorize-only on hover.

Output format: ProjectCard.svelte, ProjectLibraryCard.svelte, motion.js.

Done: Verify loop passes; reviewer disposition pass; merged to main.
