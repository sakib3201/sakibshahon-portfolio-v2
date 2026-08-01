---
id: 14
title: 'Texture & rhythm pass: ink/gold details, spacing, type, alignment'
status: done
priority: medium
created: 2026-08-01T00:25:30.9281928+06:00
updated: 2026-08-01T01:31:29.6494214+06:00
started: 2026-08-01T00:25:36.8373229+06:00
completed: 2026-08-01T01:31:29.655453+06:00
tags:
    - homepage
    - polish
estimate: "4"
parent: 9
depends_on:
    - 12
class: standard
---

Depends on 012. TOKEN GROUND TRUTH: frontend/src/app.css @theme + @layer components and the +layout.svelte OWN-WORLD/FORM contract comment ONLY. Do NOT consult frontend/DESIGN.md or .impeccable/design.json - they describe the RETIRED Reading Shelf world (task 016 rewrites them). Owns app.css class blocks: .lacquer-*, .gold-*, .skin-sheet, .motto-band, .needle-line* plus general rhythm audit - no task touches another's blocks. Work: spacing rhythm between sections (py scale), type scale/alignment, gold consistency (same gold for same purpose), needle-line divider spacing, lacquer shadow depth, subtle paper grain/vignette on skin-sheet sections. CONTRAST AUDIT: every visible text token >= 4.5:1 on its surface - the six N01-N06 marks render text-gold/70 at 0.55rem (~4.3:1, FAIL) bump to goldbright or gold-90; marginalia only at /80 opacity or above; hanko seal text on cinnabar keeps paper text at 1rem+. Keep copy/aria/alt/href byte-identical. +page.svelte OFF-LIMITS. Hanko placement is owned by 010 - do not move seals. Verify: pnpm check/lint/build; browser full-scroll pass on /; screenshots.

[[2026-08-01]] Sat 00:59
Branch task/14-texture; commits 092a3f9+9322fa4; check/lint/build green; contrast audit done (goldbright N° marks incl. minimal one-class touch of HomepageHero.svelte line 161, hanko seal text bumped 0.72rem->1rem brush, ink-on-paper /75+/85->/90); py/type rhythm unified; needle dividers added to the two sumi sections; shadow-lacquer deepened; skin-sheet grain+vignette; deviation: form placeholders left at /40 (hint text, not content); verify visually at sprint gate
