---
id: 46
title: three.js dependency + curl engine (journal3d.js)
status: todo
priority: high
created: 2026-08-02T12:54:19.0659309+06:00
updated: 2026-08-02T12:54:19.0659309+06:00
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
