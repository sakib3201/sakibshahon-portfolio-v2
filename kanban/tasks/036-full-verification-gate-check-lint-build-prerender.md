---
id: 36
title: Full verification gate (check/lint/build + prerender spot-check)
status: done
priority: high
created: 2026-08-01T11:37:18.9207041+06:00
updated: 2026-08-01T12:42:39.8217511+06:00
started: 2026-08-01T12:42:39.8275928+06:00
completed: 2026-08-01T12:42:39.8275928+06:00
tags:
    - qa
parent: 20
depends_on:
    - 17
    - 18
    - 19
class: standard
---

Goal: after EPIC 1-3 all merged to main. From frontend/ run: pnpm check, pnpm lint, pnpm build - fix any fallout with minimal commits directly on main (only mechanical fixes; park in review if a fix needs judgment). Then spot-check the built output: prerendered HTML exists for /, /about, /projects; built head has title/description/canonical/OG/twitter/JSON-LD; llms.txt exists in the build; sitemap.xml valid. Acceptance: all three commands green + spot-checks listed in this body. Files: none expected; fixes only if fallout. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.

[[2026-08-01]] Sat 12:42
GATE PASSED 2026-08-01T12:47Z: pnpm check OK (0 errors/warnings), pnpm lint OK, pnpm build OK. Spot-checks: prerendered index.html/about.html/projects.html present; head has title/meta description/canonical/og:image/twitter:image/ld+json (@graph: Person/ProfilePage/WebSite on /); llms.txt present; sitemap.xml well-formed (3 URLs).
