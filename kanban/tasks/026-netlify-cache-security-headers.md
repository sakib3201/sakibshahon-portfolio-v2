---
id: 26
title: Netlify cache + security headers
status: done
priority: medium
created: 2026-08-01T11:36:37.0357659+06:00
updated: 2026-08-01T12:04:46.1592158+06:00
started: 2026-08-01T12:04:46.1699992+06:00
completed: 2026-08-01T12:04:46.1699992+06:00
tags:
    - perf
    - seo
parent: 17
class: standard
---

Goal: extend frontend/netlify.toml (keep the [build] block untouched) with [[headers]] rules: /_app/* -> Cache-Control: public, max-age=31536000, immutable; /assets/* -> public, max-age=31536000; /* -> public, max-age=3600 plus X-Content-Type-Options: nosniff and Referrer-Policy: strict-origin-when-cross-origin on the catch-all. Acceptance: toml is valid (build still passes; adapter-netlify does not choke) and headers are applied to built output. Files: frontend/netlify.toml only. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
