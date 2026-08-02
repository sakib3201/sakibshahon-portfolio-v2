# Plan — The Curled Journal: three.js page-turn for the /about journey

Status: draft for approval. Companion to the shipped CSS-3D journal
(`feat(about): journey reads as a turnable journal`). The CSS book stays as the
mid-tier fallback; this plan layers a WebGL renderer above it.

## 1. Goal

The current journal flip is a rigid CSS plane pivoting around the spine
(`rotateY 0 → -180°`). Replace that motion with a real page **curl**: the leaf
bends around a fold line that sweeps from its right edge to the spine, with
paper curvature, fold shading, a gold edge catch, and a soft drop — the iOS
Books turn, in this world's materials. Result: the "blocky" pivot becomes
smooth, continuous 3D.

Acceptance in one sentence: the turn is a curved, lit, textured sheet bending
into the binding; content stays crisp; everything degrades gracefully.

## 2. Library decision

**Primary: `three` (dynamic import, code-split chunk, ~170 kB gzip).** It is
the ask, gives real per-vertex deformation + lighting, and its `CanvasTexture`
+ `BufferGeometry` APIs fit the curl math below directly. No addons needed —
we use core only (`three` package, no `three/examples`).

Alternatives considered:

| Option | Size (gzip) | Notes |
|---|---|---|
| `three` (core) | ~170 kB chunk | Real 3D, lighting, per-vertex curl. Chosen. |
| PixiJS | ~45 kB | 2D WebGL; curl needs hand-rolled shading; no real lighting. |
| Canvas 2D curl | ~8 kB, zero deps | Classic page-curl algorithm; 2D look, weaker depth. |
| `page-flip` (StPageFlip) | ~15 kB | Prebuilt library; fights our custom world styling. |

Cost mitigation: the chunk loads **only** on `/about`, **lazily** when the
journal stage approaches the viewport (IntersectionObserver), never in the
initial bundle. `PRODUCT.md`'s "no new dependencies unless unavoidable" is
overridden by an explicit user request; the tradeoff is documented here.

## 3. Architecture — three layers, one stage

The DOM stays the single source of truth for content (SEO, a11y,
content-truth). Rendering layers, tried in order:

1. **WebGL journal** (new) — three.js curl; the DOM leaves become
   `visibility: hidden` layout placeholders (the stage keeps its height) and
   the WebGL canvas fills the same slot.
2. **CSS book** (existing) — used when WebGL fails to init or is unsupported.
3. **Static stack** (existing) — no-JS / `prefers-reduced-motion`.

New files:

- `frontend/src/lib/components/JournalStage.svelte` — the WebGL wrapper.
  Owns the canvas, the render loop, resize, dispose; imports the engine
  lazily: `const { Journal3D } = await import('../journal3d.js')`.
- `frontend/src/lib/journal3d.js` — the engine (scene, curl, textures, loop).
- `frontend/src/lib/journalTexture.js` — DOM → CanvasTexture pipeline.
- Modify `AboutTimeline.svelte`: stage renders `JournalStage` (which renders
  the canvas + the hidden DOM leaves for layout/snapshot), keeps the `flip()`
  state machine, and hands `page`/`turning` to the engine.

`AboutTimeline`'s existing `html.motion-init.book-enabled` gating is reused;
the WebGL layer adds its own `html.webgl-journal` class gate (added when the
engine reports a live first frame) so CSS never conflicts mid-upgrade.

## 4. The curl engine (`journal3d.js`)

### Scene

- **Camera**: perspective, `fov ≈ 22°`, positioned to frame the stage,
  fixed; a hair of pointer parallax (the world already tilts — reuse the
  `data-tilt` feel, `pointer: fine` only).
- **Lights**: one warm directional (gold family, `#e8c47e`-tinted at low
  intensity) + one cool-dim fill, both subtle; black ambient. No colored
  glows — the Neon Rim Rule doesn't apply inside the journal; gold light
  only.
- **Book base**: a "desk" plane under the book — procedural `CanvasTexture`
  radial gold-on-black wash + the existing deep shadow drawn as a soft
  gradient — so the curled page casts onto something.

### Leaf meshes

Each leaf is one `PlaneGeometry` segmented `(64 × 96)` (~12k tris), with
**two `CanvasTexture`s** (front face, back face). The **fold transform is
computed in JS per frame** (cheap at this vertex count) and pushed to the
buffer with normals; no shader writing beyond a standard lit material:

- Local vertex param `u ∈ [0,1]` across the page width, `v ∈ [0,1]` down.
- Fold position `u_f(t)` sweeps `1 → 0` (right edge → spine) on forward,
  `0 → 1` on back; `t` is driven by the existing flip timing
  (`cubic-bezier(0.22,1,0.36,1)`, ~0.7s).
- For `u < u_f` the vertex stays on the page plane (with a tiny 1–2 px lift).
- For `u ≥ u_f` the vertex wraps around a **bend radius** `r` (≈ 18 px
  world): arc angle `α = min((u − u_f)·W / r, θ(t))` where `θ(t)` is the fold
  angle `0 → π`. Position: folded toward the spine, `z` rising through the
  arc; at `θ = π` the leaf is mirrored on the back side, resting in the left
  pile.
- **UV swap**: when a vertex's arc exceeds `α > π/2`… no — per-vertex side
  is `u ≥ u_f` → use the back texture (with `u` mirrored) once folded past
  the perpendicular; implement as UV remap in the buffer update.
- **Fold shading**: per-vertex darkening toward the fold (flex crease) and a
  gold-edge highlight on the folded edge — baked into the vertex colors
  (multiplied by the texture). Keeps the lit material cheap.
- **Normals**: recomputed numerically from the deformed grid (3-difference
  per vertex) — 12k vertices ≈ negligible per frame.

### The spread state

Visible meshes at rest: the **current** leaf (front face) on the right, the
**previous** leaves as a left pile (back faces, each offset ~4 px down-left
and darkened slightly with depth — same choreography as the CSS version), and
the **next** leaf static beneath (z = −1) so the curl reveals it exactly as a
real book does. During a turn only the current leaf deforms; when `t` hits 1
the pile/depth indices advance and the next turn reuses the same meshes
(three leaf meshes total, recycled; textures re-baked only for the leaves
that enter the scene).

### Cover & fin

Identical mechanism: the cover is a leaf whose front is the lacquer cover
texture; its back is the "inside cover" texture. The fin likewise. Total
pages stay 11 (cover + 9 + fin); no data changes.

## 5. Content pipeline (`journalTexture.js`)

**Text is not redrawn — it is snapshotted from the live DOM** (the one
authoritative styled source):

1. On texture bake, clone the corresponding DOM leaf (front or back face)
   into an off-screen `position: fixed; left: -10000px; width: <stage width>px`
   container, wait one frame + `document.fonts.ready` (fonts already load for
   the page), then serialize the clone into an `<svg><foreignObject>` and
   rasterize via `Image` → `drawImage` at **device-pixel-ratio capped at 2**
   onto the CanvasTexture's canvas.
2. The canvas is the exact stage width; the plane is the exact stage width —
   text renders 1:1, crisp at ≤ 2× DPR.
3. Bake happens **before** the first frame and **only** when a leaf becomes
   visible (current/next/left-top), then disposed; 2 textures per leaf, ~1024
   px wide max.
4. On significant resize (>10% width change), re-bake visible leaves
   (throttled).

Risks (tracked): `foreignObject` rasterization of CSS `feTurbulence` noise
and layered gradients is well supported in Chromium/Edge/Firefox; we keep the
existing texture fallback — if the snapshot raster fails (0-size image /
tainted canvas), the engine reports failure and the CSS book stays in place.
No external snapshot library; ~60 lines of canvas code.

## 6. Interaction & state

- `AboutTimeline` keeps its `flip()` machine, guards, keyboard/swipe/corner
  tabs, counter, and `aria-live` announcements **unchanged** — the engine
  observes `page`/`turning` and animates `t`, then the component commits
  `page` at 720 ms exactly as today.
- While `turning`, input is ignored (existing guard).
- Reduced motion: engine never starts (layer 1 skipped → CSS book skipped →
  static stack). Tab hidden: loop pauses. Stage off-screen: loop pauses
  (IntersectionObserver). `visibilitychange` handled.
- WebGL init failure (no context, raster failure, snapshot failure) → remove
  `webgl-journal`, restore CSS book, no user-visible break.

## 7. Performance budget

- `three` chunk ≈ 170 kB gzip, loaded lazily, never in the initial bundle.
- DPR cap 2; textures ≤ 1024×1536 (≈ 6 MB each transiently, 6 live max —
  regenerated on flip, disposed after).
- 3 leaf meshes × ~12k tris, static scene → trivial for any GPU; the curl
  vertex update + normals is the only per-frame JS.
- Render loop gated by visibility (stage in viewport + tab visible).
- Verify with a 60-fps frame-time probe during a turn (Playwright + rAF
  counter; target: no dropped-frame burst > 3 consecutive).

## 8. A11y / SEO / world rules

- DOM leaves remain in the tree (source of truth): screen readers, no-JS,
  SEO unchanged; the canvas is `aria-hidden`.
- The `aria-live` flip announcements and all controls are untouched.
- World rules: no neon inside the journal, gold light only, cinnabar only in
  the baked seals (already in the DOM text), black-based shadows.
- `prefers-reduced-motion` and no-JS behavior is **identical to today**.

## 9. Files

- `frontend/package.json` — add `three` (dependency).
- `frontend/src/lib/journal3d.js` — engine (new).
- `frontend/src/lib/journalTexture.js` — snapshot pipeline (new).
- `frontend/src/lib/components/JournalStage.svelte` — canvas wrapper (new).
- `frontend/src/lib/components/AboutTimeline.svelte` — stage swap, engine
  wiring, `webgl-journal` class gate.
- `frontend/src/app.css` — hide DOM leaves when `.webgl-journal` is active;
  canvas sizing rule.
- `frontend/DESIGN.md` — The Journal entry: WebGL curl layer + fallback
  ladder; motion register line; reduced-motion contract unchanged note.

## 10. Verification & acceptance

1. `pnpm check; pnpm lint; pnpm build` — green; confirm the three chunk is
   split (not in `_app/immutable/entry` or initial CSS/JS) and sized ≤ 200 kB
   gz.
2. Playwright (headless Edge — WebGL via SwiftShader, enabled explicitly):
   - canvas present, DOM leaves `visibility: hidden`, no horizontal scroll;
   - full 11-leaf forward flip + back, all titles/counter correct (reuse
     `verify-journal.js` assertions, adapted to WebGL mode);
   - mid-turn probe: curl curvature (sample 3 vertex z-values across the
     fold) non-zero, fold shading vertex colors non-uniform;
   - texture raster check: `toDataURL` of a baked texture is non-blank and
     contains the year plate pixels;
   - frame-time probe: no 3-consecutive-frame stall during a turn;
   - WebGL-disabled context → CSS book mode (class gate flips);
   - reduced-motion context → static stack; no-JS → static stack;
   - axe-core on `/about`: 0 violations.
3. Design detector: `detect.mjs --json` over the changed files.
4. Manual: desktop + mobile viewport screenshots of a mid-turn.

## 11. Risks & mitigations

- **foreignObject rasterization fidelity** (biggest): fallback ladder — if
  the raster fails, the CSS book renders; we never ship a blank journal.
- **Bundle weight**: lazy + split; measured in acceptance.
- **Loop leaks**: dispose scene/textures/loop on `onDestroy` and on
  `book-enabled` loss.
- **Scroll/overflow**: canvas is inside the existing stage slot; `overflow-x:
  clip` on `html` already guards the turned pages; verify again.

## 12. Rollback

`git revert` of the feature commit restores the CSS book (no data or content
changes are involved; the DOM was never replaced).
