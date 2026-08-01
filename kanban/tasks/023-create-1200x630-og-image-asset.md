---
id: 23
title: Create 1200x630 OG image asset
status: done
priority: high
created: 2026-08-01T11:36:36.7280858+06:00
updated: 2026-08-01T12:03:25.6698062+06:00
started: 2026-08-01T12:03:25.8017647+06:00
completed: 2026-08-01T12:03:25.8017647+06:00
tags:
    - seo
    - assets
parent: 17
class: standard
---

Goal: frontend/static/assets/og-image.png (1200x630 PNG) matching the brand: sumi #0f0d0a background, gold #e8c47e text 'Sakib Ahamed Shahon' + role line 'Software Engineer - Full-Stack and AI', subtle gold radial glow. Tooling (Windows, zero new deps): PowerShell with System.Drawing (draw background, render text via Graphics.DrawString with Segoe UI or a serif fallback, Save PNG). Fallback: design the same art as SVG (static/assets/og-image.svg) and park in review noting the owner must convert to PNG. Do not add npm dependencies. Acceptance: valid 1200x630 PNG under 300 KB, or an SVG + review note. Files: only the new asset. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
