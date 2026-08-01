---
id: 33
title: Contrast fixes + decorative microcopy
status: done
priority: medium
created: 2026-08-01T11:37:05.7072493+06:00
updated: 2026-08-01T12:40:14.7870668+06:00
started: 2026-08-01T12:40:14.792953+06:00
completed: 2026-08-01T12:40:14.792953+06:00
tags:
    - a11y
parent: 19
class: standard
---

Goal: fix X3/X4/X7 contrast and decorative-text issues. (a) Replace golddeep #8d6d3a bullet icons with text-gold (8:1 contrast) in frontend/src/lib/components/ExperienceTimeline.svelte and the proofs line in frontend/src/routes/about/+page.svelte (text-gold/80 - use goldbright or text-gold). (b) N#01-style decorative labels: in ProductsShipped.svelte (vertical spine + N# chips) and HomepageHero.svelte (N# plaques) add aria-hidden=true where purely decorative and bump size to 0.7rem minimum where readable. (c) Raise low-contrast form chrome in HomepageContactMe.svelte: input bottom borders border-inkonpaper/30 - /50 and placeholders /50 - /70. Acceptance: axe (if available) reports no contrast violations; visual look preserved; pnpm check/lint/build pass. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
