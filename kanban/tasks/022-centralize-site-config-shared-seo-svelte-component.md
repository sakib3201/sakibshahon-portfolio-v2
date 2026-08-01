---
id: 22
title: Centralize site config + shared Seo.svelte component
status: done
priority: high
created: 2026-08-01T11:36:36.6149517+06:00
updated: 2026-08-01T12:13:37.3268128+06:00
started: 2026-08-01T12:13:37.3348495+06:00
completed: 2026-08-01T12:13:37.3348495+06:00
tags:
    - seo
parent: 17
class: standard
---

Goal: single source of truth for URLs/meta so the custom-domain swap later is one line. (a) Extend siteMeta in frontend/src/lib/data.js with: siteOrigin (https://sakibshahon.netlify.app), ogImage (absolute URL of /assets/og-image.png), ogImageAlt, twitterHandle (@sakibshahon), address (Gazipur, Bangladesh), nationality, alumniOf (Jatiya Kabi Kazi Nazrul Islam University). (b) NEW frontend/src/lib/components/Seo.svelte rendering via svelte:head: title, description, author, canonical, og:type/title/description/url/image/image:width(1200)/image:height(630)/image:alt/site_name, twitter:card(summary_large_image)/title/description/image. Props: title, description, canonicalPath, ogImage optional. (c) Refactor all 3 routes (+page.svelte, about/+page.svelte, projects/+page.svelte) to use Seo and drop hardcoded meta. DO NOT touch the JSON-LD block in +page.svelte (task #24 owns it). Merge order: land after #23 (og-image asset) so the ogImage reference resolves. Acceptance: built HTML head equivalent or better than today (adds twitter:image, og:image:alt/width/height); no hardcoded domain outside data.js. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
