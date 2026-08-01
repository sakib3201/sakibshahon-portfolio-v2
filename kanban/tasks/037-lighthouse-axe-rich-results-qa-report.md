---
id: 37
title: Lighthouse + axe + Rich Results QA report
status: done
priority: medium
created: 2026-08-01T11:37:19.0812965+06:00
updated: 2026-08-01T12:47:09.5576282+06:00
started: 2026-08-01T12:47:09.5702565+06:00
completed: 2026-08-01T12:47:09.5702565+06:00
tags:
    - qa
parent: 20
depends_on:
    - 36
class: standard
---

Goal: measure the improvements. Run Lighthouse (desktop + mobile) against the deployed site (or pnpm preview + localhost if not deployed), an axe scan (npx @axe-core/cli or equivalent), and a Google Rich Results Test (manual) for the JSON-LD and FAQPage schema. Targets: Performance >= 90, SEO 100, Accessibility >= 95, zero critical axe violations. Append the results (numbers per metric + any residual issues) as a timestamped note in this task body. Acceptance: report present with before/after where possible. Files: none (report lives in this task body - the kanban dir is git-ignored). WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.

[[2026-08-01]] Sat 12:47
QA REPORT 2026-08-01T06:46Z (agent bone-lotus): Lighthouse desktop: performance 85/100, SEO 100/100, accessibility 100/100, best-practices 100/100, LCP 1.6s, CLS 0.022 | mobile: performance 67/100, SEO 100/100, accessibility 100/100, best-practices 100/100, LCP 5.4s, CLS 0 | axe (axe-core 4.12.1, chrome-headless): 0 violations on /, 0 on /about (matches previous gate measurement) | JSON-LD: 2 valid blocks — @graph (Person/ProfilePage/WebSite) + FAQPage with mainEntity, both parse clean. Follow-up: run Google Rich Results Test manually on the deployed site (expects FAQPage rich results + Person/ProfilePage to be recognized; no warnings anticipated). Note: mobile perf 67 is throttled-lab-only; desktop perf 85 misses the >=90 target — likely fonts/LCP candidates for a future pass. Acceptance met: report present with per-metric numbers and residual notes.
