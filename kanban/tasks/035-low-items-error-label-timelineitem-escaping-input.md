---
id: 35
title: 'Low items: error label, TimelineItem escaping, input focus states'
status: done
priority: low
created: 2026-08-01T11:37:06.0087617+06:00
updated: 2026-08-01T12:37:01.5405749+06:00
started: 2026-08-01T12:37:01.5494825+06:00
completed: 2026-08-01T12:37:01.5494825+06:00
tags:
    - a11y
parent: 19
class: standard
---

Goal: fix X6/X8 + polish. (a) frontend/src/routes/+error.svelte: remove the redundant aria-label on the p.marginalia error-details line (~line 55). (b) frontend/src/lib/components/TimelineItem.svelte: eliminate the {@html item.description} render - convert the HTML entities in aboutTimeline descriptions inside frontend/src/lib/data.js (&quot;, &apos;, <br />) to plain text (split <br /> into two sentences/paragraphs), then render {item.description} as normal text. After this, grep the codebase for {@html} - it must be gone. (c) Inputs in HomepageContactMe.svelte: add a visible focus state beyond the underline (e.g. focus:border-b-goldbright). Acceptance: /about timeline renders correctly with no raw entities; no {@html} remains; build passes. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
