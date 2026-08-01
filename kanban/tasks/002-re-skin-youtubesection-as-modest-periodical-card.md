---
id: 2
title: Re-skin YouTubeSection as modest periodical card
status: done
priority: low
created: 2026-07-31T22:12:49.9370036+06:00
updated: 2026-07-31T22:23:53.290284+06:00
started: 2026-07-31T22:23:53.292064+06:00
completed: 2026-07-31T22:23:53.292064+06:00
claimed_by: hail-delta
claimed_at: 2026-07-31T22:23:53.290284+06:00
class: standard
---

File: frontend/src/lib/components/YouTubeSection.svelte. Rebuild in The Reading Shelf world (see frontend/src/app.css tokens: paper-sheet, leather-sheet, plate, ribbon, marginalia, stitch-t, stitch-v, embossed, gilded, seal). Keep it modest: one compact band, header 'Watch on YouTube', handle + blurb from \/data.js youtube export, subscribe CTA in wax-seal red (bg-seal). Featured grid (if youtube.featured non-empty) as paper cards with i.ytimg.com thumbnails; keep empty-state text 'New videos dropping soon'. Keep section IDs/scroll-mt, aria labels, reduced-motion. No new deps. Do not touch data.js.
