---
id: 30
title: Answer-ready copy pass (hero subline + services line)
status: done
priority: medium
created: 2026-08-01T11:36:48.7700578+06:00
updated: 2026-08-01T12:20:41.1258203+06:00
started: 2026-08-01T12:20:41.1339734+06:00
completed: 2026-08-01T12:20:41.1339734+06:00
tags:
    - aeo
    - copy
parent: 18
class: standard
---

Goal: make the site answerable for LLM extractors. (a) frontend/src/lib/components/HomepageHero.svelte hero subline: append a hiring-relevant sentence mentioning availability for freelance and contract work, worldwide, based in Gazipur, Bangladesh (e.g. 'Available for freelance and contract work - worldwide, based in Gazipur, Bangladesh.'). (b) frontend/src/lib/components/ServiceSection.svelte: make the intro a scannable 'I build:' services line (AI features for WordPress and SaaS, performance and reliability work, full-stack products from API to UI). (c) If siteMeta copy in frontend/src/lib/data.js hides the location, expose it in crawlable text (data.js owns the location field - EPIC 1 #22 adds it; read from there if merged). Do not invent metrics; do not change H1s, titles, or meta descriptions. Acceptance: grep built HTML for 'available for' and 'Gazipur' hits on the homepage; pnpm check/lint/build pass. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
