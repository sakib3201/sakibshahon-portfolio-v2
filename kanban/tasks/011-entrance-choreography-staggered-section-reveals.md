---
id: 11
title: 'Entrance choreography: staggered section reveals site-wide'
status: done
priority: high
created: 2026-08-01T00:25:20.5689592+06:00
updated: 2026-08-01T01:31:28.7954946+06:00
started: 2026-08-01T00:25:36.7920789+06:00
completed: 2026-08-01T01:31:28.8012308+06:00
tags:
    - homepage
    - motion
estimate: "4"
parent: 9
class: standard
---

motion.js reveal already implements once-only/unobserve/cleanup - verify, do NOT rewrite the engine (checkJs is on). Work: (a) re-run reveal observation on SPA navigation: in +layout.svelte call the reveal scan inside an effect/onNavigate after each route change, cleanup wired to layout destroy - today about/projects reached via client nav mount with opacity 0 and stay invisible; (b) after a reveal transition completes, clear the inline transitionDelay (setTimeout matching duration) - today data-reveal-delay poisons all later hovers; (c) flip .reveal to default-visible: CSS keeps content visible, motion.js adds a .motion-init class to html and only then applies the hidden state, so failed scripts never hide the page; (d) apply reveals to section roots with VARIED choreography per content type: ImpactStats fade-rise (NO count-up - figures are non-numeric strings like 20k+), ProductsShipped rise in sequence, ServiceSection medallions single pulse, ExperienceTimeline rows cascade, Awards/YouTube quiet reveal; cap cumulative stagger at 240ms (80ms steps), arrivals cubic-bezier(0.22,1,0.36,1); (e) NEVER attach reveal/stagger to the HomepageContactMe form, inputs, or labels - the sheet reveals as one unit; hidden fields access_key/botcheck untouched; (f) +page.svelte is OFF-LIMITS - decorate section roots inside their components; (g) never put .reveal on elements already carrying transform utilities or transition-all - use dedicated wrapper divs; (h) contract: copy/aria/alt/href byte-identical. Owns app.css .reveal* block only. Verify: pnpm check/lint/build; browser: click Navbar About then back (content must be visible after client nav), reduced-motion emulation shows everything instantly; screenshots.

[[2026-08-01]] Sat 00:48
Branch task/11-reveals (2 commits: cb894dd fix engine, 0e9ad42 feat choreography). Changed: motion.js (re-scan after each route via afterNavigate in +layout.svelte with onDestroy cleanup; inline transitionDelay cleared after delay+700ms so hovers unpoisoned; hidden state gated behind html.motion-init so failed JS never hides page; live prefers-reduced-motion toggle via matchMedia change listener - engine once-only/unobserve/cleanup preserved, NOT rewritten), app.css .reveal* block only (default-visible, html.motion-init [data-reveal] hidden, reveal-pulse variant + keyframes), six section components (ImpactStats 4x60ms fade-rise no count-up; ProductsShipped header+6 cards 40ms sequence via wrapper divs; ServiceSection unit reveal + medallion pulse 40ms; ExperienceTimeline header + 3 rows 60ms cascade; Awards/YouTube quiet section-root unit). No new deps; no HomepageContactMe/HomepageHero/Navbar/+page/data.js touched; copy/aria/alt/href byte-identical; stagers capped 240ms/80ms step; arrivals cubic-bezier(0.22,1,0.36,1). Verify: pnpm check 0 errors 0 warnings, pnpm lint clean, pnpm build ok (worktree frontend). Deviation: used afterNavigate (fires post-DOM-commit) instead of onNavigate/effect per constraint (a) - it is the correct SvelteKit hook for post-route-change DOM scan. Risk for gate: reduced-motion browser check - content shows instantly since motion-init never applied; also confirm ProjectCard reveal (pre-existing data-reveal on transition-all element) still reveals after merge with 010/012.
