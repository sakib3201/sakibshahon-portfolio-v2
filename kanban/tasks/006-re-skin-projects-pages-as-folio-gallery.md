---
id: 6
title: Re-skin Projects pages as folio gallery
status: done
priority: medium
created: 2026-07-31T22:12:50.3087507+06:00
updated: 2026-07-31T22:30:04.5970466+06:00
started: 2026-07-31T22:30:04.6022964+06:00
completed: 2026-07-31T22:30:04.6022964+06:00
claimed_by: hail-delta
claimed_at: 2026-07-31T22:30:04.5970466+06:00
class: standard
---

Files: frontend/src/lib/components/ProjectsHeroSection.svelte, ProjectLibrary.svelte, ProjectLibraryCard.svelte, frontend/src/routes/projects/+page.svelte. Read current files first. Rebuild: hero = 'The archive' embossed heading + marginalia sub; featured projects (from \/data.js projects) as folio spreads (reuse pattern from ProjectCard.svelte); archive (archiveProjects) as smaller paper-sheet entries in a muted 'University and experimental' band. Empty links must hide buttons (no dead hrefs). Keep SEO head. Do not edit data.js.

[[2026-07-31]] Fri 22:29
Ready to merge: branch task/6-readingshelf-6. Projects pages re-skinned as folio gallery: hero 'The archive' (embossed serif + marginalia, lamplight radial glow); featured projects as full ProjectCard folio spreads; archive band 'University & experimental' (embossed + marginalia) with new paper-sheet ProjectLibraryCard primitives (framed wood thumbnails, plate-initial fallback, inkonpaper serif type, links rendered only when href non-empty — archive projects have empty links so no dead hrefs). SEO svelte:head untouched, main now bg-ink. pnpm check: 0 errors/0 warnings. pnpm lint: clean.
