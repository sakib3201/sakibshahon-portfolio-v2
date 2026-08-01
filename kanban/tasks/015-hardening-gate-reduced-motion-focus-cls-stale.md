---
id: 15
title: 'Hardening gate: reduced-motion, focus, CLS, stale classes, full verify'
status: done
priority: medium
created: 2026-08-01T00:25:31.0028272+06:00
updated: 2026-08-01T01:31:29.9519414+06:00
started: 2026-08-01T00:25:36.8521211+06:00
completed: 2026-08-01T01:31:29.9590965+06:00
tags:
    - homepage
    - hardening
estimate: 4h
parent: 9
depends_on:
    - 10
    - 11
    - 12
    - 13
    - 14
    - 16
class: standard
---

Depends on 010,011,012,013,014,016. Final gate. STALE-CLASS SCAN (corrected list): rg -n 'leather|leatherdeep|stitch|paper-sheet|ribbon|embossed|torn|fox|linen|seal|thread|wood|woodlight|foil' frontend/src - remove matches ONLY if the class is not defined in app.css. LIVE classes that must NEVER be renamed/deleted: .motto-band, .gold-plate, .needle-line(-h), .hanko, .skin-sheet, .neon-rim, .shimmer, .lacquer-*, .depth-card, .perspective-scene, .medallion*. Scan copy for dead-world strings (shelf, brass, foil) - scan and report, do NOT auto-fix copy. VERIFY: pnpm check (0 errors/0 warnings), pnpm lint clean, pnpm build ok; run node .agents\skills\impeccable\scripts\detect.mjs frontend/src - expect findings to drop to 0 after 014+016, every remaining finding either fixed or documented; browser pass: reduced-motion emulation instant everywhere, focus-visible on every interactive element, no layout shift from animations, click-through Navbar / - About - Projects - back with all content visible, Web3Forms form fields byte-identical and functional, content visible when JS is disabled (no reveal opacity-0 default). Estimate 4h. Verify: pnpm check/lint/build.

[[2026-08-01]] Sat 01:24
Branch task/15-gate; gate results
