---
id: 34
title: 'Hero replay buttons: keyboard-safe semantics'
status: done
priority: medium
created: 2026-08-01T11:37:05.8604618+06:00
updated: 2026-08-01T12:26:05.2903385+06:00
started: 2026-08-01T12:26:05.3024737+06:00
completed: 2026-08-01T12:26:05.3024737+06:00
tags:
    - a11y
parent: 19
class: standard
---

Goal: fix X5 in frontend/src/lib/components/HomepageHero.svelte. The punchline replay button currently replays a ~4s animation on Enter/Space keydown (focus + key = repeated animation). Make replay pointer-only: keep the element but make it non-focusable for keyboard (tabindex=-1, pointerdown-only replay handler) or intercept keydown so Enter/Space do nothing. The stamp button keeps its aria-label + aria-expanded behavior and must have a clearly visible focus-visible ring (already styled in app.css - verify it shows). Ensure prefers-reduced-motion behavior is unchanged (replay functions already early-return under reduced motion). Acceptance: tab order unchanged; pressing Enter/Space on the punchline does not replay the animation; reduced-motion intact; pnpm check/lint/build pass. Files: HomepageHero.svelte only (do not touch the hero subline copy - EPIC 2 #30 owns it). WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
