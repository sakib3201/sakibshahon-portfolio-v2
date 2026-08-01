---
id: 27
title: Sitemap lastmod + sync discipline
status: done
priority: low
created: 2026-08-01T11:36:37.1435774+06:00
updated: 2026-08-01T12:04:29.5800364+06:00
started: 2026-08-01T12:04:29.597181+06:00
completed: 2026-08-01T12:04:29.597181+06:00
tags:
    - seo
parent: 17
class: standard
---

Goal: add <lastmod>2026-08-01</lastmod> to each of the 3 urls in frontend/static/sitemap.xml (keep existing loc/changefreq/priority). Append a maintenance note to the body of this task: update sitemap.xml whenever routes are added or removed. Files: frontend/static/sitemap.xml only. Acceptance: valid XML, 3 urls with lastmod. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.

[[2026-08-01]] Sat 12:04
Maintenance note: update sitemap.xml whenever routes are added or removed.
