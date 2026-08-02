---
id: 47
title: DOM texture snapshot pipeline (journalTexture.js)
status: done
priority: high
created: 2026-08-02T12:54:19.1864594+06:00
updated: 2026-08-02T14:01:21.9590547+06:00
started: 2026-08-02T14:01:21.9806224+06:00
completed: 2026-08-02T14:01:21.9806224+06:00
tags:
    - threejs
    - journal
parent: 45
class: standard
---

Objective: Build the DOM â†’ CanvasTexture snapshot pipeline `journalTexture.js` â€” live styled leaves cloned off-screen and rasterized via `foreignObject` at DPR capped at 2, 1:1 stage width â€” per plan Â§5 of `docs/plans/journal-threejs.md` (read it first).

Acceptance criteria:
- Exports a bake function (e.g. `bakeLeaf(domNode, face, { width, height }) â†’ { texture, canvas } | null`): canvas is exactly the stage width, page aspect height, `device-pixel-ratio` capped at 2.
- Pipeline: clone the leaf into an off-screen `position: fixed; left: -10000px; width: <stage width>px` container, wait one frame + `document.fonts.ready`, serialize to `<svg><foreignObject>`, rasterize via `Image` â†’ `drawImage` onto the texture canvas.
- The clone inherits the page's stylesheet (the leaf's real CSS applies); text renders 1:1, crisp at â‰¤ 2Ã— DPR.
- Textures disposed after use; re-bake on significant resize (>10% width change), throttled.
- Failure detection: raster failure (0-size image, tainted canvas, serialization error) returns null â€” never a blank texture â€” so the fallback ladder engages.
- No external snapshot library; keep it plain canvas code (~60 lines).

Output format: `frontend/src/lib/journalTexture.js` only.

Done: Verify loop (`pnpm check` â†’ `pnpm lint` â†’ `pnpm build`) passes; reviewer disposition pass; merged to main.

[[2026-08-02]] Sun 12:57
## Handoff (blocked before implementation) - Board claim made for executor mink-linen, but this orchestrator session cannot spawn subagents: environment subagent_depth limit = 1 (Task tool: 'Subagent depth limit reached (1)'). No code written, no worktree created. Card returned to todo. Next step: re-run orchestration with subagent_depth >= 2 (e.g. opencode.json subagent_depth: 2) or from a top-level session, then claim and execute normally.
