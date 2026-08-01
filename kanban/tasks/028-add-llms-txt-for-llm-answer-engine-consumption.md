---
id: 28
title: Add llms.txt for LLM/answer-engine consumption
status: done
priority: high
created: 2026-08-01T11:36:48.4966345+06:00
updated: 2026-08-01T12:19:43.6222693+06:00
started: 2026-08-01T12:19:43.6392395+06:00
completed: 2026-08-01T12:19:43.6392395+06:00
tags:
    - aeo
parent: 18
class: standard
---

Goal: NEW file frontend/static/llms.txt following the llms.txt standard (see llmstxt.org): '# Sakib Ahamed Shahon' H1, intro paragraph (software engineer, full-stack and AI, WordPress + SaaS, based in Gazipur Bangladesh, available for freelance/contract work), then sections with one-line summaries + absolute URLs: Home (/), About (/about), Projects (/projects), Resume (https://sakibshahon.netlify.app/assets/sakib_shahon_resume.pdf), Socials (GitHub, LinkedIn, YouTube, dev.to). Keep every fact consistent with frontend/src/lib/data.js - no new metrics. Acceptance: valid llms.txt format; served at /llms.txt after build; absolute URLs. Files: frontend/static/llms.txt (NEW) only. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
