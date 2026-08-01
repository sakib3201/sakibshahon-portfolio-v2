---
id: 29
title: FAQ section + FAQPage schema on homepage
status: done
priority: high
created: 2026-08-01T11:36:48.6380875+06:00
updated: 2026-08-01T12:22:40.238349+06:00
started: 2026-08-01T12:22:40.2455241+06:00
completed: 2026-08-01T12:22:40.2455241+06:00
tags:
    - aeo
    - schema
parent: 18
class: standard
---

Goal: NEW component frontend/src/lib/components/HomepageFaq.svelte with 4-6 Q and A pairs rendered as h2 + dl (dt/dd) or details/summary, plus FAQPage JSON-LD emitted from the component via its own svelte:head (mainEntity: Question/Answer pairs). Suggested questions: What does Sakib Shahon do? What products has he shipped? What is his tech stack? Is he available for freelance or contract work? How can I contact him? Answers must be self-contained, extractable sentences (AEO requirement) and strictly factual per data.js. Wire into frontend/src/routes/+page.svelte between ServiceSection and ExperienceTimeline (one import + one component line only - do not touch the JSON-LD block or meta tags, those belong to EPIC 1). Prefer adding a faq array export to data.js for the questions. Acceptance: FAQ renders on homepage; FAQPage schema validates in Google Rich Results Test; build passes. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
