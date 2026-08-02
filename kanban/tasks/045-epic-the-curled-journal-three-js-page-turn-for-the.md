---
id: 45
title: 'EPIC — The Curled Journal: three.js page-turn for the /about journey'
status: todo
priority: high
created: 2026-08-02T12:54:13.7031421+06:00
updated: 2026-08-02T12:54:13.7031421+06:00
tags:
    - epic
    - threejs
    - journal
    - visual
class: standard
---

Container epic (do not claim â€” work the subtasks). Implements `docs/plans/journal-threejs.md` (draft approved for execution by the user): a three.js page-turn replaces the CSS plane pivot on `/about`'s journal â€” a real page curl with paper curvature, fold shading, gold edge catch, and soft drop. DOM stays the single source of truth; fallback ladder WebGL â†’ CSS book â†’ static stack.

Subtasks (order: 46+47 parallel â†’ 48 â†’ 49):
- #46 â€” three.js dependency + curl engine (`journal3d.js`)
- #47 â€” DOM texture snapshot pipeline (`journalTexture.js`)
- #48 â€” JournalStage.svelte + AboutTimeline wiring
- #49 â€” CSS gating, DESIGN.md, acceptance verification

Each subtask carries the delegation contract (objective / acceptance criteria / output format / done). Subtasks must each merge to main before this epic moves to done.
