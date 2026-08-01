---
id: 16
title: Rewrite DESIGN.md + design.json to The Yakuza Ink world
status: done
priority: high
created: 2026-08-01T00:37:02.3941406+06:00
updated: 2026-08-01T01:31:30.2350053+06:00
started: 2026-08-01T00:37:44.4868343+06:00
completed: 2026-08-01T01:31:30.2453721+06:00
tags:
    - docs
    - homepage
estimate: "3"
parent: 9
depends_on:
    - 14
class: standard
---

Docs-only task, zero code conflict, fully parallel-safe. frontend/DESIGN.md and frontend/.impeccable/design.json currently describe the RETIRED Reading Shelf world (EB Garamond, leather, brass, oxblood seal #9c3b2a) - code is The Yakuza Ink. Ground truth: app.css @theme + @layer components (tokens), +layout.svelte contract comment (thesis), motion.js, HomepageHero.svelte. Write DESIGN.md: name 'The Yakuza Ink - Sakib Ahamed Shahon Portfolio'; colors sumi #0f0d0a, lacquer #171310, lacquerdeep #0a0806, paper #e9e2d2, paperdim #d8cfbb, inktext #f0ead9, inktextdim #a99f8d, gold #c9a25e, goldbright #e8c47e, golddeep #8d6d3a, cinnabar #c02818, neon #ff3d6e, inkonpaper #241c12; typography Yuji Syuku display / Zen Kaku Gothic New body / Red Hat Mono marginalia; rules: Hanko Rule (cinnabar only for seals), Neon Rim Rule (neon only at rims, never as text fill), Gold Rule (same gold for same purpose); shadows lacquer/deep/gold; motion register 100-150 feedback, 150-300 states, 300-500 layout, 500-800 hero focal, arrivals cubic-bezier(0.22,1,0.36,1), no bounce. Regenerate .impeccable/design.json sidecar (schemaVersion 2) to match. Then run node .agents\skills\impeccable\scripts\detect.mjs frontend/src and report how many findings drop. Verify: pnpm check/lint/build.

[[2026-08-01]] Sat 01:09
Branch task/16-design-docs; docs only: DESIGN.md + design.json rewritten to The Yakuza Ink (sumi/lacquer/gold/cinnabar/neon, Yuji Syuku/Zen Kaku Gothic New/Red Hat Mono, Hanko/Neon Rim/Gold/Ink-Surface/Marginalia/Brush/Sumi Shadow rules, lacquer/deep/gold shadows, full motion register + reduced-motion contract). Detector frontend/src: 27 findings before (17 color, 2 font, 8 font-size) -> 0 after; verified detector reads new sidecar (107 allowed colors) and scan works (scratch-file probe flagged 2). pnpm check 0/0, lint clean, build ok from worktree frontend/. No remaining findings.
