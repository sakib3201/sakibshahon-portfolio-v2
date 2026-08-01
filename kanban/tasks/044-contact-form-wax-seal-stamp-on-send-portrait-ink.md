---
id: 44
title: 'Contact form: wax-seal stamp on send + portrait ink-wash'
status: done
priority: medium
created: 2026-08-01T15:11:28.1230804+06:00
updated: 2026-08-01T15:35:58.681066+06:00
started: 2026-08-01T15:35:58.6973219+06:00
completed: 2026-08-01T15:35:58.6973219+06:00
tags:
    - visual
class: standard
---

Objective: Stamp a cinnabar seal (kanji: sent) over the contact form status on successful send, and add a faint ink-wash behind the portrait on form focus-within.

Acceptance criteria:
- The seal appears only when statusKind is success; the aria-live status text stays unchanged (a11y contract); seal is aria-hidden.
- Stamp-in animation (hero-restamp family) with a gold bloom; reduced motion shows status text only, no seal.
- Error states remain text-only, no seal.
- Scoped styles in HomepageContactMe.svelte only.

Output format: frontend/src/lib/components/HomepageContactMe.svelte only.

Done: Verify loop passes; reviewer disposition pass; merged to main.
