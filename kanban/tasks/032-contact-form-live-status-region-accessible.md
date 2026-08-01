---
id: 32
title: 'Contact form: live status region + accessible validation'
status: done
priority: high
created: 2026-08-01T11:37:05.5207761+06:00
updated: 2026-08-01T12:28:40.6065749+06:00
started: 2026-08-01T12:28:40.6173363+06:00
completed: 2026-08-01T12:28:40.6173363+06:00
tags:
    - a11y
parent: 19
class: standard
---

Goal: fix X2 in frontend/src/lib/components/HomepageContactMe.svelte. (a) Intercept submit with fetch POST to https://api.web3forms.com/submit (keep hidden access_key, subject, from_name, and botcheck honeypot fields as-is), preventDefault. (b) Add an aria-live=polite status region below the form; render success ('Letter sent - I will reply within a day or two.') or error (with retry guidance) there. (c) Client-side validation: required + email format on the email field; per-field aria-invalid + aria-describedby and visible error text; clear errors on input. (d) autocomplete=email on the email input. (e) Disable the submit button while pending. Do not remove the Web3Forms access key or honeypot. Acceptance: submit no longer navigates away; status is announced by screen readers; invalid fields are flagged; pnpm check/lint/build pass. Files: HomepageContactMe.svelte only. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.
