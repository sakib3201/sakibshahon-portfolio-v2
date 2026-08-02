---
id: 46
title: three.js dependency + curl engine (journal3d.js)
status: done
priority: high
created: 2026-08-02T12:54:19.0659309+06:00
updated: 2026-08-02T14:01:21.3347106+06:00
started: 2026-08-02T14:01:21.3595097+06:00
completed: 2026-08-02T14:01:21.3595097+06:00
tags:
    - threejs
    - journal
parent: 45
class: standard
---

Objective: Add the `three` dependency and build the curl engine `journal3d.js` â€” scene, lighting, desk, leaf meshes with per-vertex JS curl deformation, spread/pile state, cover & fin leaves, gated render loop â€” per plan Â§2 and Â§4 of `docs/plans/journal-threejs.md` (read it first).

Acceptance criteria:
- `three` added to `frontend/package.json` (core only, no `three/examples`); imported only via dynamic import â€” never in the initial bundle.
- Engine exports a `Journal3D` class whose interface covers what the stage needs: init on a stage element, set spread state, start/stop a turn (direction + timing), first-frame readiness signal, per-frame tick, resize, dispose.
- Curl math per plan Â§4: local `u,v` params on `PlaneGeometry(64Ã—96)`; fold position `u_f` sweeps `1â†’0` (forward) / `0â†’1` (back); vertices with `u â‰¥ u_f` wrap around bend radius â‰ˆ 18px with arc angle `Î± â†’ Î¸(t)` (`Î¸: 0â†’Ï€`); UV remap to the back texture (mirrored `u`) once folded past the perpendicular; per-vertex fold shading + gold-edge highlight baked into vertex colors; normals recomputed numerically from the deformed grid.
- Spread state at rest: current leaf front-face right, previous leaves as a left pile (back faces, ~4px down-left offset, darkened with depth), next leaf static beneath (z = âˆ’1); three leaf meshes recycled across turns; textures re-baked only for leaves that enter the scene; total 11 pages (cover + 9 + fin) â€” no data changes.
- Scene per plan Â§4: perspective camera fov â‰ˆ 22Â° framing the stage; warm directional light (gold `#e8c47e`-tinted, low intensity) + cool-dim fill; black ambient; procedural desk plane (radial gold-on-black wash + soft shadow gradient CanvasTexture). No colored glows.
- Render loop gated by stage visibility (IntersectionObserver) and tab visibility; loop + scene + textures disposed cleanly (no leaks on dispose).

Output format: `frontend/package.json`, `frontend/src/lib/journal3d.js` (engine only).

Done: Verify loop (`pnpm check` â†’ `pnpm lint` â†’ `pnpm build`) passes; reviewer disposition pass; merged to main.

[[2026-08-02]] Sun 12:57
## Handoff (blocked before implementation) - Board claim made for executor heron-foam, but this orchestrator session cannot spawn subagents: environment subagent_depth limit = 1 (Task tool: 'Subagent depth limit reached (1)'). No code written, no worktree created. Card returned to todo. Next step: re-run orchestration with subagent_depth >= 2 (e.g. opencode.json subagent_depth: 2) or from a top-level session, then claim and execute normally.
