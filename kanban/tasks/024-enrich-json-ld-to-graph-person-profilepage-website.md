---
id: 24
title: Enrich JSON-LD to @graph (Person/ProfilePage/WebSite)
status: done
priority: high
created: 2026-08-01T11:36:36.8348905+06:00
updated: 2026-08-01T12:16:29.6110732+06:00
started: 2026-08-01T12:16:29.6175972+06:00
completed: 2026-08-01T12:16:29.6175972+06:00
tags:
    - seo
    - schema
parent: 17
class: standard
---

Goal: replace the single Person script in frontend/src/routes/+page.svelte (schema block only - do not touch the meta tags, task #22 owns them) with one application/ld+json @graph containing: Person (name, url, image = og image URL, description, email, jobTitle, worksFor = Organization Arraytics, alumniOf = JKKNIU, knowsAbout = skill keywords from data.js, address = Gazipur Bangladesh, sameAs = GitHub/LinkedIn/YouTube/dev.to, ContactPoint email), ProfilePage (mainEntity = Person), WebSite (name, url). Read values from siteMeta + skills in frontend/src/lib/data.js - no duplicated literals. Keep the < escaping (replace </ with \u003c). Acceptance: Rich Results Test validates Person + ProfilePage; build passes. Merge order: land after #22 (config) since it reads the new fields. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
