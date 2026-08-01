---
id: 41
title: Ledger page unroll for the current role card
status: done
priority: medium
created: 2026-08-01T15:11:04.053654+06:00
updated: 2026-08-01T15:35:57.7035772+06:00
started: 2026-08-01T15:35:57.710161+06:00
completed: 2026-08-01T15:35:57.710161+06:00
tags:
    - visual
    - motion
class: standard
---

Objective: Make the highlighted Arraytics ledger card unroll like a page from the spine on first view, then stamp the cinnabar badge seal.

Acceptance criteria:
- Only the highlighted experience entry animates; unroll via clip-path from the bottom (inset 0 0 100% 0 to inset 0) over about 0.7s once, on view.
- The hanko badge stamps in right after (about 0.35s hero-restamp style) with a brief gold bloom.
- Reduced motion falls back to the plain reveal with no unroll and no stamp.
- Scoped styles in ExperienceTimeline.svelte; data.js and app.css untouched.

Output format: frontend/src/lib/components/ExperienceTimeline.svelte only.

Done: Verify loop passes; reviewer disposition pass; merged to main.
