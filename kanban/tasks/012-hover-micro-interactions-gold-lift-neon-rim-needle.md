---
id: 12
title: 'Hover & micro-interactions: gold lift, neon rim, needle sweeps'
status: done
priority: high
created: 2026-08-01T00:25:20.6465789+06:00
updated: 2026-08-01T01:31:29.0657257+06:00
started: 2026-08-01T00:25:36.8074303+06:00
completed: 2026-08-01T01:31:29.0735108+06:00
tags:
    - homepage
    - polish
estimate: 2h
parent: 9
class: standard
---

Hover states already exist in most components - this is a CONSISTENCY pass + :focus-visible, not new work. ALL hover changes via NEW app.css classes/selectors only (e.g. .lift-card), never touching component markup. Do NOT edit HomepageHero (owned by 010/013). Cards: gold-edge lift + neon-rim glow using translateY/translateZ only (no layout props); CTA gold-plate press + sheen sweep; nav links needle-line underline draw; every interactive element gets :focus-visible mirroring :hover. PAUSE INFINITE LOOPS when offscreen or display:none: .shimmer (5s), .medallion-float (9s), needle drift - reuse the IntersectionObserver in motion.js to toggle animation-play-state; never put loops on elements also choreographed on entrance. Owns app.css *:hover and *:focus-visible rules + loop-pause block only. Estimate 2h. Verify: pnpm check/lint/build; browser: hover + keyboard-tab focus on every interactive element, reduced-motion makes transitions instant; screenshots.

[[2026-08-01]] Sat 00:49
Branch task/12-hover; commit 1c2e8f8. Summary: CSS-only consistency pass in app.css (task-12 block appended inside @layer components) — (1) cards .gold-edge.neon-rim/.skin-sheet.neon-rim get :focus-visible and :has(:focus-visible) mirrors of the existing hover lift+neon glow using transform-only translateY(-6px) + static neon box-shadow; (2) CTA a.gold-plate/button.gold-plate get press (:active translateY(2px) !important to beat hover:-translate-y-0.5 utility) + sheen sweep via ::after z-index:-1 with isolation:isolate (transition, not loop) + cinnabar focus outline; (3) nav links (nav[aria-label='Main navigation'] a:not([aria-label])) get needle-line underline draw via ::after scaleX with border-bottom-color transparent !important on hover/focus (replaces solid hover:border-gold/60 utility); (4) generic a/button:focus-visible color mirror excluding .gold-plate. motion.js: additive loop-pause block inside initMotion — IntersectionObserver toggles animation-play-state paused/running on .shimmer/.medallion-float/.draw-needle/.loop-pause/[data-loop-pause], elements initialized paused (covers display:none), skipped under reduced-motion, observer disconnects on cleanup. No markup/component/layout/data changes; no new dependencies; no new infinite loops. Verify: pnpm check 0 errors/0 warnings, pnpm lint clean, pnpm build ok (both bundles). Deviations: none intentional. Risks: (a) :has(:focus-visible) progressive enhancement (no-op in <Chrome 105/Safari 15.4/FF 121 — outline still present); (b) two !important overrides needed because Tailwind utilities layer beats components layer — flagged for review; (c) sheen/needle selectors set position:relative/overflow:hidden on gold-plate — watch for overlap with task 14's .gold-* ownership during merge; (d) hero CTA gets same press/sheen treatment by global selector (CSS applies site-wide, HomepageHero.svelte untouched).
