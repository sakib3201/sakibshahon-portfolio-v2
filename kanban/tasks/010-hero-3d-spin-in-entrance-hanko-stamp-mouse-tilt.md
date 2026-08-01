---
id: 10
title: 'Hero: 3D spin-in entrance + hanko stamp + mouse tilt'
status: done
priority: high
created: 2026-08-01T00:25:20.4883596+06:00
updated: 2026-08-01T01:31:28.5170303+06:00
started: 2026-08-01T00:25:36.7737516+06:00
completed: 2026-08-01T01:31:28.5225356+06:00
tags:
    - homepage
    - motion
estimate: "4"
parent: 9
class: standard
---

Files owned: frontend/src/lib/components/HomepageHero.svelte + app.css hero-* keyframes + the existing @media (prefers-reduced-motion: reduce) block (append to it). SINGLE AUTHORED MOMENT: the hanko stamp-in with soft ink bloom (use existing .hanko clip-path). Back piece enters with a RESTRAINED rotateX(4deg)-to-0 settle (600ms, cubic-bezier(0.22,1,0.36,1)) - NOT a 3D spin. h1 name (HomepageHero.svelte:28-32, the so-called name medallion - no medallion element exists, wrap the h1 to inherit .medallion-float styling, keep its text byte-identical) rises 500ms. The BOTTOM motto-band (2nd motto-band div, :75) fades up last; the tagline pill (:38) stays static. Total load choreography max 1.6s. Run once per session (sessionStorage guard) unless reduced-motion. TRANSFORM OWNERSHIP: entrance animation on the .perspective-scene container ONLY; data-tilt stays exclusively on per-panel .depth-card links; remove the animation class on animationend so tilt owns transform afterward; never leave fill-forwards keyframes on the tilt element. Hanko: decorative aria-hidden span.hanko + brush character beside the name or bottom-right of motto band - seal text is NEW decorative copy, do not modify existing copy/aria. Reduced motion: append animation-delay: 0.01ms !important; transition-delay: 0.01ms !important; to the global reduce block, show final state instantly. Verify: pnpm check/lint/build; browser: pnpm dev load /, choreography plays ONCE, reload does not replay, pointer over N01-N06 tilts AFTER settle, DevTools emulate prefers-reduced-motion: reduce renders final state instantly; screenshots.

[[2026-08-01]] Sat 00:49
Branch task/10-hero (commit fb33c44). Files: HomepageHero.svelte + app.css hero-* block + reduce block append. Choreography (<=1.35s total): top perspective-scene settle rotateX(4deg)->0 @600ms cubic-bezier(0.22,1,0.36,1); h1 wrapped in .medallion-float + rises 500ms; hanko stamp (span.hanko + brush char 雅, aria-hidden) stamps in beside name @800ms with ink-bloom ::after; bottom motto-band fades up last @850ms; tagline pill static. entrancePlayed gated by prefers-reduced-motion + sessionStorage once-per-session; entrance classes removed on animationend so transform ownership reverts to tilt (.depth-card data-tilt untouched, no fill-forwards on tilt). Reduced motion: animation-delay/transition-delay 0.01ms appended to global reduce block. Verify: pnpm check 0/0, pnpm lint clean, pnpm build ok. Browser verify pending at sprint gate (dev run not done in worktree per rules).
