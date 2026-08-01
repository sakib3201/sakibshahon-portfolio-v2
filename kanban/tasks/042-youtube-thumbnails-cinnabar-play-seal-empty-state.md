---
id: 42
title: 'YouTube thumbnails: cinnabar play-seal + empty-state stamp'
status: done
priority: low
created: 2026-08-01T15:11:13.7538808+06:00
updated: 2026-08-01T15:35:57.9688706+06:00
started: 2026-08-01T15:35:57.9767032+06:00
completed: 2026-08-01T15:35:57.9767032+06:00
tags:
    - visual
class: standard
---

Objective: Stamp a small cinnabar play-glyph seal on YouTube thumbnails and turn the empty state into a dashed outline seal.

Acceptance criteria:
- Small hanko square seal (play triangle SVG, inktext on cinnabar) pinned to a thumbnail corner with a slight rotation; aria-hidden; link label unchanged.
- On hover/focus the seal re-stamps (compressed hero-restamp) with a faint gold ring; reduced motion keeps it static.
- Empty state (youtube.featured empty) becomes a dashed cinnabar outline seal with a dim play glyph; no fabricated content.
- Scoped styles in YouTubeSection.svelte; data.js untouched.

Output format: frontend/src/lib/components/YouTubeSection.svelte only.

Done: Verify loop passes; reviewer disposition pass; merged to main.
