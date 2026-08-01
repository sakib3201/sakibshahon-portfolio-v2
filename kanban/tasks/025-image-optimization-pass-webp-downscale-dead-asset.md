---
id: 25
title: Image optimization pass (webp, downscale, dead asset)
status: done
priority: medium
created: 2026-08-01T11:36:36.936305+06:00
updated: 2026-08-01T12:06:38.9082281+06:00
started: 2026-08-01T12:06:38.9134056+06:00
completed: 2026-08-01T12:06:38.9134056+06:00
tags:
    - perf
    - seo
parent: 17
class: standard
---

Goal: cut image payload 40%+. (a) Convert frontend/static/assets/{ictbjhomepage,evotingproject,amarshopproject}.png to .webp (same folder). Tooling: npx sharp is allowed temporarily, or a small throwaway Node/PowerShell script - do not add a permanent dependency. (b) Downscale professional.webp to max 1200px wide (target ~80 KB, today 251 KB). (c) Delete unused frontend/static/assets/headshotprofile.jpg. (d) Update imageSrc references in frontend/src/lib/data.js to the new .webp paths (ONLY the project imageSrc fields - do not touch other data.js regions owned by #22/#24). Do NOT touch logo files or the resume PDF. Acceptance: every referenced image exists; build passes; combined static image bytes down at least 40%. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
