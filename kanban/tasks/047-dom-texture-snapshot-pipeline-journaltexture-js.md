---
id: 47
title: DOM texture snapshot pipeline (journalTexture.js)
status: todo
priority: high
created: 2026-08-02T12:54:19.1864594+06:00
updated: 2026-08-02T12:54:19.1864594+06:00
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
