---
id: 9
title: 'Sprint: Yakuza Ink homepage — cinematic motion + polish'
status: done
priority: high
created: 2026-08-01T00:25:09.7751283+06:00
updated: 2026-08-01T01:31:30.3823573+06:00
started: 2026-08-01T01:31:30.3873416+06:00
completed: 2026-08-01T01:31:30.3873416+06:00
tags:
    - sprint
    - homepage
    - yakuza-ink
due: "2026-08-05"
class: standard
---

Goal: make the homepage feel alive and expensive without new dependencies. World: The Yakuza Ink (sumi lacquer, gold leaf, hanko, needle linework). Character: RESTRAINED CINEMATIC - luxury restraint, no gimmicks. Tech: vanilla CSS keyframes + motion.js (IntersectionObserver reveals, pointer tilt, rAF parallax). Wow moment: hero back piece 3D spin-in on load + hanko seal stamp-in, then mouse tilt. Non-negotiables: never edit frontend/src/lib/data.js; keep copy/alt/aria/href/SEO blocks byte-identical; Web3Forms form fields production-critical; prefers-reduced-motion must disable all motion; verify with pnpm check (0 errors/warnings), pnpm lint, pnpm build from frontend/. Style ground truth: frontend/src/app.css (.lacquer-raised, .gold-plate, .gold-edge, .neon-rim, .hanko, .needle-line(-h), .shimmer, .medallion(-float), .perspective-scene, .depth-card, .skin-sheet). Subtasks are the 6 children. Execution: worktree subagents, one component-owning branch each, merge to main, reconcile overlaps (motion.js/app.css appends).

[[2026-08-01]] Sat 00:37
MOTION GRAMMAR (ground truth for all subtasks): durations 100-150ms feedback, 150-300ms states, 300-500ms layout/overlay, 500-800ms the single hero focal entrance; arrivals use cubic-bezier(0.22,1,0.36,1); NO bounce/elastic curves; exits at ~50% of entrance duration; cap any stagger total at 240ms (max 80ms per step); will-change only while animating, removed after; motion.js must listen for prefers-reduced-motion change events and re-disable JS choreography live. One authored moment per page: the hero hanko stamp. Never reinterpret every scrolled section as an identical staggered list - vary by content type.

[[2026-08-01]] Sat 00:37
MERGE & REVIEW CONTRACT: sequential merge order 11 - 13 - 10 - 12 - 14 - 16 - 15, each merge immediately followed by pnpm check + pnpm lint on main, conflicts resolved per the app.css class-block ownership map (010 hero-* keyframes + reduce block; 011 .reveal*; 012 *:hover/*:focus-visible + loop-pause; 013 .parallax-*; 014 .lacquer-*/.gold-*/.skin-sheet/.motto-band/.needle-line*). Every subtask lands in review with a handoff note and its branch reference; only the orchestrator moves review to done after the merge is verified on main. Worktree rules: junctions to frontend/node_modules already exist - NEVER run pnpm install in a worktree, NEVER run dev servers in a worktree (shared .vite cache), verify with pnpm check/lint/build only. Ground-truth class list (append .motto-band): .lacquer-raised, .gold-plate, .gold-edge, .neon-rim, .hanko, .needle-line(-h), .shimmer, .medallion(-float), .perspective-scene, .depth-card, .skin-sheet, .motto-band.
