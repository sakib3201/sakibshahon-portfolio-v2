---
id: 40
title: 'Impact stats: gold-leaf count-up numerals'
status: done
priority: high
created: 2026-08-01T15:10:55.6613877+06:00
updated: 2026-08-01T15:35:57.4216846+06:00
started: 2026-08-01T15:35:57.4275179+06:00
completed: 2026-08-01T15:35:57.4275179+06:00
tags:
    - visual
    - motion
class: standard
---

Objective: Animate the ImpactStats gold-leaf numerals from 0 to their value when the section scrolls into view, then draw the needle-line-h divider.

Acceptance criteria:
- Numeric value and suffix parsed from the existing impactStats display strings in frontend/src/lib/data.js (data.js unchanged; keep the shimmer styling).
- Once-only IntersectionObserver trigger; about 1.2s ease-out rAF count-up in the cubic-bezier(0.22,1,0.36,1) family feel.
- Divider (needle-line-h) draws in after the count settles.
- Reduced motion shows the final value instantly with no animation.
- Scoped styles inside ImpactStats.svelte only (do not edit app.css).

Output format: frontend/src/lib/components/ImpactStats.svelte only.

Done: Verify loop passes; reviewer disposition pass; merged to main.
