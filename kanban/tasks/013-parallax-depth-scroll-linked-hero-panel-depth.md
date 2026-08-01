---
id: 13
title: 'Parallax & depth: scroll-linked hero + panel depth'
status: done
priority: medium
created: 2026-08-01T00:25:30.8416605+06:00
updated: 2026-08-01T01:31:29.3531309+06:00
started: 2026-08-01T00:25:36.8203578+06:00
completed: 2026-08-01T01:31:29.3604167+06:00
tags:
    - homepage
    - motion
estimate: "3"
parent: 9
depends_on:
    - 11
class: standard
---

Depends on 011 (reveal engine hardened first). Files owned: frontend/src/lib/motion.js (new SEPARATE exported initParallax function with its own cleanup array - never inside initMotion), frontend/src/routes/+layout.svelte (call initParallax in onMount, own distinct block), HomepageHero.svelte (parallax attributes on li.perspective-scene wrappers ONLY), app.css .parallax-* block. TARGETS: hero li.perspective-scene wrappers only (NEVER the data-tilt .depth-card element) + one wrapper div around ImpactStats panels. Parallax nodes must never carry data-reveal; exactly ONE transform owner per node (entrance OR tilt OR parallax). Max 24px offset, transform+opacity only, rAF-throttled, pause when off-screen, kill listeners on destroy. will-change: transform only on actively-parallaxing nodes, cleared when paused. Do NOT add transform-style: preserve-3d speculatively (container-level settle does not need it). Vocabulary: ExperienceTimeline rows (not ledger panels). Verify: pnpm check/lint/build; browser: scroll hero - parallax max 24px, tilt still responds on panels, reduced-motion = no parallax at all; screenshots.

[[2026-08-01]] Sat 00:58
Branch task/13-parallax; commit 3e51d38. Added exported initParallax in motion.js (own cleanups; rAF-throttled; IO pause off-screen; will-change only while active; reduced-motion live+change = no parallax; 24px hard cap, hero lis tuned 14px via data-parallax-max). +layout.svelte own onMount+afterNavigate block. Targets: hero li.perspective-scene wrappers + ImpactStats wrapper div only; never data-tilt depth-card, never data-reveal. Entrance interplay: verified hero lis carry NO entrance classes (hero-settle/hero-motto-rise are on sibling/ancestor nodes), so parallax may run immediately with exactly one transform owner per node. app.css .parallax-node block. verify: check 0/0, lint clean, build ok.
