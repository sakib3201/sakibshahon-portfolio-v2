---
id: 31
title: 'Mobile menu: focus trap + focus restore + inert background'
status: done
priority: high
created: 2026-08-01T11:37:05.3386139+06:00
updated: 2026-08-01T12:29:34.7166968+06:00
started: 2026-08-01T12:29:34.7233401+06:00
completed: 2026-08-01T12:29:34.7233401+06:00
tags:
    - a11y
parent: 19
class: standard
---

Goal: fix WCAG issue X1 in frontend/src/lib/components/Navbar.svelte (mobile dialog at lines ~142-192). On menu open: move focus into the dialog (first link); trap Tab/Shift+Tab within the menu (focusable element query + keydown handler); restore focus to the hamburger toggle on every close path (close button, Escape, backdrop click, resize >= 768px). Mark the page background inert while the menu is open (Svelte 5 supports the inert attribute) so nothing behind is interactive. Keep existing aria-expanded, aria-controls, body scroll lock, and window Escape handling. Acceptance: keyboard-only walk - Tab cycles inside the menu only, cannot reach the page behind; Escape closes and focus returns to the hamburger; screen reader announces the dialog. Files: Navbar.svelte only. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
