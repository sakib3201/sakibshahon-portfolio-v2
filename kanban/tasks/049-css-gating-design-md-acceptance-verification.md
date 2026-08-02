---
id: 49
title: CSS gating, DESIGN.md, acceptance verification
status: done
priority: high
created: 2026-08-02T12:54:25.2533038+06:00
updated: 2026-08-02T16:29:49.635828+06:00
started: 2026-08-02T16:29:49.6432405+06:00
completed: 2026-08-02T16:29:49.6432405+06:00
tags:
    - threejs
    - journal
    - qa
parent: 45
depends_on:
    - 48
class: standard
---

Objective: Finish the WebGL journal: `app.css` gating for `.webgl-journal`, DESIGN.md update per plan Â§9, and run the full acceptance verification battery of plan Â§10 (verify loop, chunk-split check, Playwright WebGL probes, fallback-ladder tests, axe, design detector, manual screenshots) with results reported. Depends on #48.

Acceptance criteria:
- `frontend/src/app.css`: under `html.webgl-journal`, the DOM leaves become `visibility: hidden` (layout preserved, stage height kept); the canvas fills the stage slot; no horizontal scroll (existing `overflow-x: clip` on `html` still guards turned pages).
- `frontend/DESIGN.md` updated per plan Â§9: The Journal entry gains the WebGL curl layer + fallback ladder; a motion-register line for the curl turn; reduced-motion contract notes unchanged.
- Verify loop green: `pnpm check` â†’ `pnpm lint` â†’ `pnpm build`; confirm the three chunk is split (not in `_app/immutable/entry` or initial CSS/JS) and sized â‰¤ 200 kB gz.
- Playwright (headless Edge â€” WebGL via SwiftShader, enabled explicitly), reusing `verify-journal.js` assertions where possible: canvas present + DOM leaves hidden + no horizontal scroll; full 11-leaf forward flip + back, titles/counter correct; mid-turn curl curvature non-zero (3 vertex z samples across the fold); fold-shading vertex colors non-uniform; baked texture `toDataURL` non-blank containing year-plate pixels; frame-time probe â€” no 3-consecutive-frame stall during a turn; WebGL-disabled context â†’ CSS book mode (class gate flips); reduced-motion â†’ static stack; no-JS â†’ static stack; axe-core on `/about` 0 violations.
- Design detector: `detect.mjs --json` over the changed files â€” no new violations introduced.
- Manual screenshots: desktop + mobile viewport mid-turn, saved under `docs/`.

Output format: `frontend/src/app.css`, `frontend/DESIGN.md`, Playwright spec additions under `frontend/`, screenshots under `docs/`.

Done: Verify loop passes; reviewer disposition pass; merged to main.
