/**
 * journal3d.js — WebGL curl engine for the /about journal.
 *
 * Implements plan `docs/plans/journal-threejs.md` §2 + §4. The DOM stays the
 * single source of truth; this engine only renders. JournalStage (task #48)
 * owns the canvas, the lazy `await import('../journal3d.js')`, and the
 * texture wiring; this module is engine-only.
 *
 * Design decisions (contract notes):
 * - Front/back faces are combined into one 2:1 vertical atlas per leaf
 *   (front top half, back bottom half). Per-vertex face switching is done by
 *   remapping UVs in the buffer update, which is the only way to get a
 *   two-faced leaf with a standard (non-shader) lit material.
 * - `getTexture(page, face)` must be synchronous and return the pipeline's
 *   CanvasTexture (see journalTexture.js). The stage pre-warms textures for
 *   leaves that enter the scene; a `null` during the first spread throws
 *   (stage falls back to the CSS book), later `null`s reuse the last atlas.
 * - Turn motion is driven by a unified progress `p ∈ [0,1]` (0 = flat on the
 *   right, 0.5 = fold complete, 1 = flat in the left pile). The fold phase
 *   (p < 0.5) uses the plan's curl math with the existing flip easing over
 *   720 ms; the settle phase (p ≥ 0.5, 140 ms) un-curls the leaf flat onto
 *   the pile — the "soft drop" of the plan's goal.
 * - Three leaf meshes are recycled (current / next / pile-top) plus two
 *   static dark slabs that suggest the deeper pile (each level is only a
 *   4 px sliver; rendering them individually would need 9 meshes).
 */

import * as THREE from 'three';

const SEG_X = 64;
const SEG_Y = 96;
const FOLD_RADIUS = 18; // bend radius, world px
const CREASE_START = 5; // gold edge band width, world px
const CREASE_END = 26; // crease shadow reach, world px
const CREASE_DARKEN = 0.25; // max fold crease darkening
const FLAT_LIFT = 1.5; // flat-side lift during a fold, world px
const PILE_OFFSET = 4; // px per pile depth level
const NEXT_Z = -1; // next leaf rests a hair beneath the current
const DESK_Z = -2;
const TURN_MS = 720; // fold phase, matches AboutTimeline's 720 ms flip
const SETTLE_MS = 140; // un-curl onto the pile
const EASE = [0.22, 1, 0.36, 1]; // the site's arrival curve
const HALF_PI = Math.PI / 2;

const GOLD = new THREE.Color('#e8c47e');
const PILE_DARKEN = 0.9; // pile-top brightness (depth 1)
const SLAB_COLORS = ['#19130c', '#141009'];

/**
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @returns {(t: number) => number}
 */
function cubicBezier(p1x, p1y, p2x, p2y) {
  return (t) => {
    let lo = 0;
    let hi = 1;
    let x = t;
    for (let i = 0; i < 12; i++) {
      const m = (lo + hi) / 2;
      const mt = 1 - m;
      const bx = 3 * mt * mt * m * p1x + 3 * mt * m * m * p2x + m * m * m;
      if (bx < x) lo = m;
      else hi = m;
    }
    const m = (lo + hi) / 2;
    const mt = 1 - m;
    return 3 * mt * mt * m * p1y + 3 * mt * m * m * p2y + m * m * m;
  };
}

const easeFlip = cubicBezier(EASE[0], EASE[1], EASE[2], EASE[3]);
/** @param {number} t */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** Per-vertex state pushed to a leaf mesh's buffers. */
class GridWriter {
  /**
   * @param {THREE.Mesh} mesh
   * @param {number} segX
   * @param {number} segY
   */
  constructor(mesh, segX, segY) {
    this.mesh = mesh;
    this.segX = segX;
    this.segY = segY;
    this.cols = segX + 1;
    this.rows = segY + 1;
    this.i = 0;
    this.pos = mesh.geometry.attributes.position;
    this.uv = mesh.geometry.attributes.uv;
    this.color = mesh.geometry.attributes.color;
    this.normal = mesh.geometry.attributes.normal;
    this.index = mesh.geometry.index;
  }

  /**
   * @param {number} u 0..1 across the leaf width (0 = spine edge)
   * @param {number} v 0..1 down the leaf (0 = top)
   * @param {number} W leaf width (world px)
   * @param {number} H leaf height (world px)
   * @param {number} p unified turn progress (0 flat right, 0.5 fold done, 1 flat pile)
   * @param {number} offsetX pile x offset
   * @param {number} offsetY pile y offset
   * @param {number} darken pile brightness multiplier
   */
  write(u, v, W, H, p, offsetX, offsetY, darken) {
    const r = FOLD_RADIUS;
    const x0 = u * W;
    const y0 = (0.5 - v) * H;

    let x;
    let y;
    let z;
    let uvx;
    let uvy;
    let cr = 1;
    let cg = 1;
    let cb = 1;

    if (p <= 0) {
      // Rest: flat on the right (front face up).
      x = x0;
      y = y0;
      z = 0;
      uvx = u;
      uvy = 1 - v * 0.5;
    } else if (p < 0.5) {
      // Fold phase: the plan's curl math. e eases 0 → 1.
      const e = p / 0.5;
      const eased = easeFlip(e);
      const theta = Math.PI * eased;
      const uf = 1 - eased;
      const xf = uf * W;
      const d = (u - uf) * W;
      if (d <= 0) {
        // Still on the page plane, with a tiny lift.
        x = x0;
        y = y0;
        z = FLAT_LIFT;
        uvx = u;
        uvy = 1 - v * 0.5;
        const shadow = Math.max(0, Math.min(1, 1 + d / 8));
        cr = cg = cb = 0.94 + 0.06 * shadow;
      } else {
        // Wrapped around the fold axis at xf, bending radius r.
        const a = Math.min(d / r, theta);
        const straight = Math.max(d - theta * r, 0);
        x = xf + r * Math.sin(a) + straight * Math.cos(theta);
        y = y0;
        z = r * (1 - Math.cos(a)) + straight * Math.sin(theta);
        const back = a > HALF_PI;
        uvx = back ? 1 - u : u;
        uvy = back ? (1 - v) * 0.5 : 1 - v * 0.5;
        // Fold shading: gold edge catch at the fold line, crease darkening
        // beyond it, paper white past the reach.
        if (d < CREASE_START) {
          const t = d / CREASE_START;
          cr = GOLD.r + t * (1 - GOLD.r);
          cg = GOLD.g + t * (1 - GOLD.g);
          cb = GOLD.b + t * (1 - GOLD.b);
        } else if (d < CREASE_END) {
          const t = (d - CREASE_START) / (CREASE_END - CREASE_START);
          const k = 1 - CREASE_DARKEN * (1 - t);
          cr = cg = cb = k;
        }
      }
    } else {
      // Settle phase: un-curl from the fold-complete state (e = 1) flat onto
      // the pile. s eases 0 → 1.
      const s = easeOutCubic((p - 0.5) / 0.5);
      const d = u * W;
      const a = Math.min(d / r, Math.PI);
      const straight = Math.max(d - Math.PI * r, 0);
      const curlX = r * Math.sin(a) + straight * Math.cos(Math.PI);
      const curlZ = r * (1 - Math.cos(a)) + straight * Math.sin(Math.PI);
      x = curlX + (u * W - W - curlX) * s + offsetX * s;
      y = y0 + offsetY * s;
      z = curlZ * (1 - s);
      uvx = 1 - u;
      uvy = (1 - v) * 0.5;
      if (d < CREASE_START) {
        const t = d / CREASE_START;
        cr = GOLD.r + t * (1 - GOLD.r);
        cg = GOLD.g + t * (1 - GOLD.g);
        cb = GOLD.b + t * (1 - GOLD.b);
      } else if (d < CREASE_END) {
        const t = (d - CREASE_START) / (CREASE_END - CREASE_START);
        const k = 1 - CREASE_DARKEN * (1 - t);
        cr = cg = cb = k;
      } else {
        cr = cg = cb = 1;
      }
      cr += (darken - cr) * s;
      cg += (darken - cg) * s;
      cb += (darken - cb) * s;
    }

    this.pos.setXYZ(this.i, x, y, z);
    this.uv.setXY(this.i, uvx, uvy);
    this.color.setXYZ(this.i, cr, cg, cb);
  }
}

/** Builds a leaf mesh: a (SEG_X × SEG_Y) grid plane, one atlas map, no index
 * (normals are recomputed numerically per frame). */
function createLeafMesh() {
  const cols = SEG_X + 1;
  const rows = SEG_Y + 1;
  const count = cols * rows;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

  const indices = new Uint32Array(SEG_X * SEG_Y * 6);
  let k = 0;
  for (let gy = 0; gy < SEG_Y; gy++) {
    for (let gx = 0; gx < SEG_X; gx++) {
      const a = gy * cols + gx;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      indices[k++] = a;
      indices[k++] = c;
      indices[k++] = b;
      indices[k++] = c;
      indices[k++] = d;
      indices[k++] = b;
    }
  }
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    side: THREE.FrontSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.visible = false;
  return mesh;
}

/**
 * Recomputes normals numerically from the deformed grid (3 differences per
 * vertex — negligible at this vertex count).
 * @param {THREE.Mesh} mesh
 * @param {number} cols
 * @param {number} rows
 */
function recomputeNormals(mesh, cols, rows) {
  const pos = mesh.geometry.attributes.position;
  const nor = mesh.geometry.attributes.normal;
  const v = new THREE.Vector3();
  const w = new THREE.Vector3();
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const i = gy * cols + gx;
      const iu = Math.min(gx + 1, cols - 1);
      const iv = Math.min(gy + 1, rows - 1);
      const i0 = gy * cols + iu;
      const i1 = iv * cols + gx;
      v.set(pos.getX(i0) - pos.getX(i), pos.getY(i0) - pos.getY(i), pos.getZ(i0) - pos.getZ(i));
      w.set(pos.getX(i1) - pos.getX(i), pos.getY(i1) - pos.getY(i), pos.getZ(i1) - pos.getZ(i));
      const n = v.cross(w).negate().normalize();
      nor.setXYZ(i, n.x, n.y, n.z);
    }
  }
  nor.needsUpdate = true;
}

export class Journal3D {
  /**
   * @param {{
   *   canvas: HTMLCanvasElement,
   *   width: number,
   *   height: number,
   *   leafWidth: number,
   *   leafHeight: number,
   *   pageCount: number,
   *   getTexture: (page: number, face: 'front' | 'back') => THREE.Texture | null,
   *   onReady?: () => void,
   *   onTurnComplete?: (dir: 'forward' | 'back') => void
   * }} opts
   */
  constructor(opts) {
    this.opts = opts;
    this.page = 0;
    this.turning = null; // 'forward' | 'back'
    this.elapsed = 0;
    this.committed = false;
    this.ready = false;
    this.running = false;
    this.disposed = false;
    this.atlases = new Map(); // page → CanvasTexture (2:1 front/back atlas)
    this.parallaxX = 0;
    this.parallaxY = 0;
    this.pointerX = 0;
    this.pointerY = 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: true,
      alpha: false
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(opts.width, opts.height, false);
    this.renderer.setClearColor(0x0f0d0a, 1);

    this.scene = new THREE.Scene();
    this.scene.background = null;

    const fov = 22;
    const dist = (opts.height / 2 / Math.tan((fov * Math.PI) / 360)) * 1.02;
    this.camera = new THREE.PerspectiveCamera(fov, opts.width / opts.height, 1, dist * 4);
    this.camera.position.set(0, 0, dist);
    this.camera.lookAt(0, 0, 0);

    // Warm gold key + cool-dim fill on a black ambient — gold light only,
    // no colored glows (world rule).
    this.scene.add(new THREE.AmbientLight(0x000000, 1));
    this.key = new THREE.DirectionalLight(0xe8c47e, 1.15);
    this.key.position.set(300, 520, 700);
    this.scene.add(this.key);
    this.fill = new THREE.DirectionalLight(0x8fa3c9, 0.22);
    this.fill.position.set(-500, 120, -260);
    this.scene.add(this.fill);

    // Desk: procedural radial gold wash + soft shadow beneath the book.
    this.desk = new THREE.Mesh(
      new THREE.PlaneGeometry(opts.width, opts.height),
      new THREE.MeshBasicMaterial({ map: makeDeskTexture() })
    );
    this.desk.position.z = DESK_Z;
    this.scene.add(this.desk);

    this.leafMeshes = [createLeafMesh(), createLeafMesh(), createLeafMesh()];
    this.currentMesh = this.leafMeshes[0];
    this.nextMesh = this.leafMeshes[1];
    this.pileMesh = this.leafMeshes[2];
    /** @type {THREE.Mesh | null} */
    this.turnMesh = null;
    this.slabs = [];
    for (let i = 0; i < SLAB_COLORS.length; i++) {
      const slab = new THREE.Mesh(
        new THREE.PlaneGeometry(opts.leafWidth, opts.leafHeight),
        new THREE.MeshBasicMaterial({ color: SLAB_COLORS[i] })
      );
      slab.position.set(-PILE_OFFSET * (i + 2), -PILE_OFFSET * (i + 2), -1 - i);
      slab.visible = false;
      this.slabs.push(slab);
      this.scene.add(slab);
    }
    for (const mesh of this.leafMeshes) this.scene.add(mesh);

    this.last = performance.now();
    this.raf = 0;

    this.io = new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        if (on) this.resume();
        else this.pause();
      },
      { threshold: 0 }
    );
    this.io.observe(opts.canvas);

    this.onVisibility = () => {
      if (document.hidden) this.pause();
      else this.resume();
    };
    document.addEventListener('visibilitychange', this.onVisibility);

    if (window.matchMedia('(pointer: fine)').matches) {
      /** @param {PointerEvent} e */
      this.onPointer = (e) => {
        const rect = opts.canvas.getBoundingClientRect();
        this.pointerX = (e.clientX - rect.left) / rect.width - 0.5;
        this.pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      };
      opts.canvas.addEventListener('pointermove', this.onPointer);
    }

    this.setSpread(0);
  }

  /** @param {number} page */
  setSpread(page) {
    const last = this.opts.pageCount - 1;
    this.page = page;
    this.turning = null;

    /** @param {number} p @param {THREE.Mesh} fallbackMesh */
    const atlasOf = (p, fallbackMesh) => {
      const atlas = this.ensureAtlas(p);
      if (!atlas && !this.ready) {
        throw new Error('journal texture failure — falling back to the CSS book');
      }
      return atlas ?? /** @type {THREE.MeshLambertMaterial} */ (fallbackMesh.material).map ?? null;
    };

    // Current leaf (front face, right half).
    this.applyPose(this.currentMesh, { p: 0, darken: 1 });
    this.currentMesh.visible = page <= last;
    this.currentMesh.material.map = atlasOf(page, this.currentMesh);

    // Next leaf (front face, a hair beneath).
    const next = page + 1 <= last;
    this.nextMesh.visible = next;
    if (next) {
      this.applyPose(this.nextMesh, { p: 0, z: NEXT_Z, darken: 1 });
      this.nextMesh.material.map = atlasOf(page + 1, this.nextMesh);
    }

    // Pile top (back face up, offset down-left, darkened).
    const pile = page > 0;
    this.pileMesh.visible = pile;
    if (pile) {
      this.applyPose(this.pileMesh, { p: 1, offsetX: -PILE_OFFSET, offsetY: -PILE_OFFSET, darken: PILE_DARKEN });
      this.pileMesh.material.map = atlasOf(page - 1, this.pileMesh);
    }

    // Deeper pile: two static dark slabs for the 4px slivers.
    for (let i = 0; i < this.slabs.length; i++) {
      this.slabs[i].visible = page > i + 1;
    }

    if (!this.ready) {
      this.ready = true;
      this.renderer.render(this.scene, this.camera);
      this.resume();
      this.opts.onReady?.();
    }
  }

  /**
   * Rest pose for a mesh. `p: 0` flat right, `p: 1` flat pile.
   * @param {THREE.Mesh} mesh
   * @param {{ p: number, z?: number, offsetX?: number, offsetY?: number, darken?: number }} pose
   */
  applyPose(mesh, { p, z = 0, offsetX = 0, offsetY = 0, darken = 1 }) {
    const { leafWidth: W, leafHeight: H } = this.opts;
    const writer = new GridWriter(mesh, SEG_X, SEG_Y);
    let i = 0;
    for (let gy = 0; gy < writer.rows; gy++) {
      const v = gy / SEG_Y;
      for (let gx = 0; gx < writer.cols; gx++) {
        const u = gx / SEG_X;
        writer.i = i;
        writer.write(u, v, W, H, p, offsetX, offsetY, darken);
        i++;
      }
    }
    if (z !== 0) {
      const pos = mesh.geometry.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        pos.setZ(j, pos.getZ(j) + z);
      }
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.attributes.uv.needsUpdate = true;
    mesh.geometry.attributes.color.needsUpdate = true;
    recomputeNormals(mesh, writer.cols, writer.rows);
  }

  /** Per-frame pose for the turning mesh. */
  writeTurnMesh() {
    if (!this.turnMesh) return;
    const { leafWidth: W, leafHeight: H } = this.opts;
    const foldT = Math.min(this.elapsed / TURN_MS, 1);
    const settleT = Math.min(Math.max((this.elapsed - TURN_MS) / SETTLE_MS, 0), 1);
    const p =
      this.turning === 'back'
        ? 1 - 0.5 * foldT - 0.5 * settleT
        : 0.5 * foldT + 0.5 * settleT;
    const writer = new GridWriter(this.turnMesh, SEG_X, SEG_Y);
    let i = 0;
    for (let gy = 0; gy < writer.rows; gy++) {
      const v = gy / SEG_Y;
      for (let gx = 0; gx < writer.cols; gx++) {
        const u = gx / SEG_X;
        writer.i = i;
        writer.write(u, v, W, H, p, -PILE_OFFSET, -PILE_OFFSET, PILE_DARKEN);
        i++;
      }
    }
    meshNeedsUpdate(this.turnMesh);
    recomputeNormals(this.turnMesh, writer.cols, writer.rows);
  }

  /** Starts a turn of the current leaf (forward) or the pile top (back).
   * Returns false when a turn is already running or out of range.
   * @param {'forward' | 'back'} dir */
  turn(dir) {
    const last = this.opts.pageCount - 1;
    if (this.turning) return false;
    if (dir === 'forward' && this.page >= last) return false;
    if (dir === 'back' && this.page <= 0) return false;
    this.turning = dir;
    this.elapsed = 0;
    this.committed = false;
    this.turnMesh = dir === 'forward' ? this.currentMesh : this.pileMesh;
    this.turnMesh.visible = true;
    return true;
  }

  /** Called once per rAF frame. @param {number} now */
  tick(now) {
    const dt = now - this.last;
    this.last = now;
    if (this.turning) {
      this.elapsed += dt;
      if (this.elapsed >= TURN_MS && !this.committed) {
        this.committed = true;
        const dir = this.turning;
        queueMicrotask(() => this.opts.onTurnComplete?.(dir));
      }
      this.writeTurnMesh();
      if (this.elapsed >= TURN_MS + SETTLE_MS) {
        const dir = this.turning;
        this.turning = null;
        this.setSpread(this.page + (dir === 'forward' ? 1 : -1));
      }
    }
    this.applyParallax();
    this.renderer.render(this.scene, this.camera);
  }

  /** @param {number} width @param {number} height @param {number} leafWidth @param {number} leafHeight */
  resize(width, height, leafWidth, leafHeight) {
    Object.assign(this.opts, { width, height, leafWidth, leafHeight });
    this.renderer.setSize(width, height, false);
    const fov = 22;
    const dist = (height / 2 / Math.tan((fov * Math.PI) / 360)) * 1.02;
    this.camera.aspect = width / height;
    this.camera.position.set(0, 0, dist);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    this.desk.geometry.dispose();
    this.desk.geometry = new THREE.PlaneGeometry(width, height);
    this.desk.material.map?.dispose();
    this.desk.material.map = makeDeskTexture();
    this.desk.material.needsUpdate = true;
    for (const slab of this.slabs) {
      slab.geometry.dispose();
      slab.geometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
    }
    for (const tex of this.atlases.values()) tex.dispose();
    this.atlases.clear();
    this.setSpread(this.page);
  }

  applyParallax() {
    this.parallaxX += (this.pointerX - this.parallaxX) * 0.05;
    this.parallaxY += (this.pointerY - this.parallaxY) * 0.05;
    this.camera.position.x = this.parallaxX * 90;
    this.camera.position.y = this.parallaxY * 60;
    this.camera.lookAt(0, 0, 0);
  }

  resume() {
    if (this.disposed || this.running || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    /** @param {number} now */
    const loop = (now) => {
      if (!this.running || this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      this.tick(now);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /** @param {number} page */
  ensureAtlas(page) {
    if (this.atlases.has(page)) return this.atlases.get(page);
    const front = this.opts.getTexture(page, 'front');
    const back = this.opts.getTexture(page, 'back');
    if (!front || !back) return null;
    const atlas = buildAtlas(front, back);
    this.atlases.set(page, atlas);
    return atlas;
  }

  dispose() {
    this.disposed = true;
    this.pause();
    this.io.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    if (this.onPointer) this.opts.canvas.removeEventListener('pointermove', this.onPointer);
    for (const tex of this.atlases.values()) tex.dispose();
    this.atlases.clear();
    for (const mesh of this.leafMeshes) {
      mesh.geometry.dispose();
      mesh.material.map?.dispose();
      mesh.material.dispose();
    }
    for (const slab of this.slabs) {
      slab.geometry.dispose();
      slab.material.dispose();
    }
    this.desk.geometry.dispose();
    this.desk.material.map?.dispose();
    this.desk.material.dispose();
    this.renderer.dispose();
  }
}

/** @param {THREE.Mesh} mesh */
function meshNeedsUpdate(mesh) {
  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.attributes.uv.needsUpdate = true;
  mesh.geometry.attributes.color.needsUpdate = true;
}

/** Builds the 2:1 vertical atlas: front texture on top, back beneath.
 * @param {THREE.Texture} front
 * @param {THREE.Texture} back
 */
function buildAtlas(front, back) {
  const w = front.image.width;
  const h = front.image.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable for journal atlas');
  ctx.drawImage(front.image, 0, 0, w, h);
  ctx.drawImage(back.image, 0, h, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/** Procedural desk: radial gold-on-black wash plus a soft deep shadow. */
function makeDeskTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable for journal desk');

  const shadow = ctx.createRadialGradient(128, 64, 10, 128, 64, 110);
  shadow.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
  shadow.addColorStop(0.6, 'rgba(0, 0, 0, 0.28)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, 256, 128);

  const wash = ctx.createRadialGradient(128, 58, 20, 128, 58, 150);
  wash.addColorStop(0, 'rgba(232, 196, 126, 0.05)');
  wash.addColorStop(1, 'rgba(232, 196, 126, 0)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 256, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
