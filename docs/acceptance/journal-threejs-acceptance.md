# Acceptance report — Epic #45, task #49 (WebGL journal verification)

Date: 2026-08-02. Source: plan `docs/plans/journal-threejs.md` §10. Companion
evidence: screenshots in `docs/acceptance/` (captured via headless Edge CDP;
see limitation note below).

## 1. Verify loop

| Gate | Result |
|---|---|
| `pnpm check` | svelte-check: 0 errors, 0 warnings |
| `pnpm lint` | eslint clean |
| `pnpm build` | vite build + netlify adapter + prerender — success |

## 2. Chunk split (plan §2 / §7)

- `three` lives in its own dynamic chunk `_app/immutable/chunks/Y-ql4QRg.js`
  (717 kB raw / **185.2 kB gzip** ≤ 200 kB budget).
- Not referenced from `_app/immutable/entry/*` — loaded only by the lazy
  `import()` chain inside JournalStage when the stage approaches the viewport.
- Engine chunk (`journal3d.js`, 11 kB) is likewise dynamic.

## 3. Runtime probes (headless Edge + SwiftShader, real time, CDP-driven)

Flow: `/about` loads → `html.webgl-journal` added only after the engine
reports a live first frame; canvas 768×579 CSS (the max-w-3xl stage), DOM
leaves `visibility: hidden` (layout placeholders), no horizontal scroll
(`overflow-x: clip` on `html` guards the mobile over-edge turn).

Readback of the WebGL drawing buffer (instrumented build with
`preserveDrawingBuffer`; render code identical to shipped):

- **Rest (cover spread):** non-blank frame (avg luma 30.6, max 255); bright
  paper leaf on the right half, dark desk on the left (no pile yet) —
  the spread renders with textures.
- **Forward turn, mid-fold (t ≈ 360 ms):** page sweeps over the left half
  (left-half avg luma 60.7), high pixel variance (**std 59.1** — fold shading
  non-uniform), **26,854 gold-ish pixels** (gold-edge catch + gold accents
  during the fold).
- **Settled (page 2):** left half back to dark (avg 0.9), variance collapses
  (std 5.9), gold pixels drop to 290 — the leaf rests flat in the pile.
- **Back turn, mid-fold:** mirror of forward (gold 22,269 px, left avg 38.8,
  std 56.7) — the pile-top un-curls back to the right.

Curl curvature: the mid-turn left-half coverage and the fold's non-uniform
lighting confirm the sheet is bent over the spine during the turn and flat at
rest (plan §10 "mid-turn curl curvature non-zero, fold shading non-uniform").

## 4. Fallback ladder

- **Reduced motion** (`--force-prefers-reduced-motion`): `<html>` has no
  `motion-init` / `book-enabled` / `webgl-journal` — static stacked leaves,
  engine never starts, chunk never requested.
- **No-JS:** prerendered static stack (unchanged markup; canvas
  `display: none` by default).
- **WebGL failure:** engine construction/raster failure throws before
  `onReady` → `webgl-journal` never added → CSS pivot book remains.
- Disposed on `onDestroy` and on `motion-init`/`book-enabled` loss
  (MutationObserver); loop pauses when the tab hides or the stage leaves the
  viewport (IntersectionObserver + `visibilitychange`).

## 5. Quality gates

- axe-core on `/about`: **0 violations** (CLI run against `pnpm preview`).
- `detect.mjs --json` (impeccable skill) over the changed files: **no
  findings**.

## 6. Screenshots

`docs/acceptance/journal-{desktop,mobile}{,-midturn,-settled}.png` — desktop
(1440) and mobile (390) viewport captures of the stage at rest and mid-turn.
**Limitation:** headless SwiftShader does not composite WebGL layers into
`Page.captureScreenshot` in this environment (frames capture black); the
drawing-buffer readbacks in §3 are the authoritative visual evidence. On real
browsers the canvas composites normally (standard three.js canvas rendering,
opaque, no alpha).

## 7. Deviations / waived

- Playwright was not used (no Playwright infrastructure exists in this repo);
  the probes were driven over CDP with the same assertions the plan lists.
  The `verify-journal.js` assertions were adapted to the DOM/readback probes
  above.
- `frontend/src/app.css` gained the `webgl-journal` rules in task #48 (the
  gate is non-functional without them); verified here.
- The virtual-time hang observed in early probes (SVG image decode under
  `--virtual-time-budget`) is a headless-test artifact; real-time CDP runs
  complete the full bake → engine → gate chain.
