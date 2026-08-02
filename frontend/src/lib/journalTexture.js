/**
 * DOM → CanvasTexture snapshot pipeline for the curled journal (plan §5).
 *
 * The journal pages are the live DOM leaves — the single authoritative
 * styled source. Instead of redrawing text, we snapshot the styled face:
 *
 *   clone face → off-screen fixed host (width = stage width) → wait one
 *   frame + document.fonts.ready → inline computed styles (an SVG-image
 *   document never inherits the page stylesheet) → serialize to
 *   <svg><foreignObject> → rasterize via Image → drawImage onto a canvas
 *   whose CSS size is exactly the stage width × page-aspect height, backing
 *   store at device-pixel-ratio capped at 2 — text renders 1:1, crisp.
 *
 * No snapshot library — plain canvas + DOM APIs (~60 lines of canvas code).
 * `THREE` is injected, never imported: the `three` dependency stays owned by
 * journal3d.js, and when THREE is missing the raster still completes with
 * `texture: null` so callers degrade gracefully.
 */

const DPR_CAP = 2;
const RESIZE_THRESHOLD = 0.1;

/** Resolves on the next animation frame (one frame for style/layout). */
const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));

/** Resolves once the page's fonts are loaded (they already load for the page). */
const fontsReady = () =>
  typeof document.fonts?.ready?.then === 'function' ? document.fonts.ready : Promise.resolve();

/**
 * Inline every element's computed style onto it. foreignObject content inside
 * an SVG-as-image document is isolated — the page stylesheet does not reach
 * it — so the live computed styles are frozen into inline styles instead.
 * Existing inline styles are kept and win (they are intentional).
 * @param {HTMLElement} root
 */
function inlineComputedStyles(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = /** @type {Node | null} */ (walker.currentNode);
  while (node) {
    const el = /** @type {HTMLElement} */ (node);
    const cs = window.getComputedStyle(el);
    const inline = el.getAttribute('style') || '';
    el.setAttribute('style', inline ? `${cs.cssText};${inline}` : cs.cssText);
    node = walker.nextNode();
  }
}

/**
 * Materialize rendered ::before/::after as real child elements — serialized
 * pseudos would otherwise be lost. The journal only has one (the cover's
 * inner gold frame), but this stays generic. Computed styles keep the raster
 * identical to the live DOM.
 * @param {HTMLElement} root
 */
function materializePseudos(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = /** @type {Node | null} */ (walker.currentNode);
  while (node) {
    const el = /** @type {HTMLElement} */ (node);
    for (const pseudo of ['::before', '::after']) {
      const cs = window.getComputedStyle(el, pseudo);
      if (cs.content === 'none' || cs.display === 'none') continue;
      const ghost = document.createElement('div');
      ghost.textContent = (cs.content || '').replace(/^"|"$/g, '');
      ghost.setAttribute('style', cs.cssText);
      if (pseudo === '::before') el.insertBefore(ghost, el.firstChild);
      else el.appendChild(ghost);
    }
    node = walker.nextNode();
  }
}

/**
 * Wrap the rasterized canvas in a three CanvasTexture — crisp text: no
 * mipmaps, linear filtering, sRGB color space.
 * @param {HTMLCanvasElement} canvas
 * @param {any} THREE injected namespace (never statically imported)
 */
function makeTexture(canvas, THREE) {
  const texture = new THREE.CanvasTexture(canvas);
  if (THREE.SRGBColorSpace !== undefined) texture.colorSpace = THREE.SRGBColorSpace;
  if (THREE.LinearFilter !== undefined) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Bake a journal face into a { texture, canvas } snapshot.
 *
 * The canvas CSS size is exactly `width` × `height` (the stage/plane width
 * and its page-aspect height); the backing store is that size × DPR, capped
 * at 2. The clone is pinned to the same geometry and stripped of the book
 * mode's 3D transforms (the engine owns angles), so the raster is 1:1 with
 * the live page.
 *
 * @param {HTMLElement} domNode the `.journal-leaf` (or the face itself)
 * @param {'front' | 'back'} face which face to bake
 * @param {{ width?: number, height?: number, THREE?: any }} opts
 * @returns {Promise<{ texture: any, canvas: HTMLCanvasElement } | null>}
 *   null on any raster failure (0-size image, tainted canvas, serialization
 *   error, blank result) — never a blank texture — so the fallback ladder
 *   engages. `texture` is null when THREE is missing; callers degrade.
 */
export async function bakeLeaf(
  domNode,
  face = 'front',
  /** @type {{ width?: number, height?: number, THREE?: any }} */ { width, height, THREE } = {}
) {
  if (typeof document === 'undefined' || !domNode || !width || !height) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
  const w = Math.round(width);
  const h = Math.round(height);

  const selector = face === 'back' ? '.journal-leaf-back' : '.journal-leaf-front';
  const source =
    (typeof domNode.querySelector === 'function' && domNode.querySelector(selector)) || domNode;
  const clone = /** @type {HTMLElement} */ (source.cloneNode(true));
  if (!clone) return null;

  // Off-screen fixed host; the clone renders at exactly the stage width
  // (height pinned too so the absolute back face fills the page box).
  const host = document.createElement('div');
  host.setAttribute(
    'style',
    `position:fixed;left:-10000px;top:0;width:${w}px;height:${h}px;overflow:hidden;`
  );
  document.body.appendChild(host);
  host.appendChild(clone);

  const img = new Image();
  img.decoding = 'async';

  try {
    // Pin the clone to the page geometry (faces may size as a % of the book)
    // and drop the book mode's rotateY — the engine orients its own meshes.
    clone.setAttribute(
      'style',
      `${clone.getAttribute('style') || ''};width:${w}px;height:${h}px;transform:none;`
    );
    await nextFrame();
    await fontsReady();

    materializePseudos(clone);
    inlineComputedStyles(clone);

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<foreignObject width="100%" height="100%">` +
      new XMLSerializer().serializeToString(clone) +
      `</foreignObject></svg>`;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const raster = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('foreignObject raster failed'));
    });
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await raster;

    if (!img.naturalWidth || !img.naturalHeight) return null; // 0-size raster

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let data;
    try {
      data = ctx.getImageData(0, 0, canvas.width, canvas.height).data; // throws when tainted
    } catch {
      return null; // tainted canvas — never ship a blank texture
    }
    let painted = false;
    for (let i = 3; i < data.length; i += 32) {
      if (data[i] > 0) {
        painted = true;
        break;
      }
    }
    if (!painted) return null;

    const texture = THREE?.CanvasTexture ? makeTexture(canvas, THREE) : null;
    return { texture, canvas };
  } catch {
    return null; // serialization / raster failure — caller keeps the CSS fallback
  } finally {
    host.remove();
    img.src = '';
  }
}

/** Dispose a baked texture — safe no-op on null/undefined (plan §5.3). @param {any} texture */
export function disposeTexture(texture) {
  if (texture && typeof texture.dispose === 'function') texture.dispose();
}

/**
 * True when the stage width moved more than 10% — re-bake visible leaves (plan §5.4).
 * @param {number} prevWidth @param {number} nextWidth
 */
export function shouldReBake(prevWidth, nextWidth) {
  return !prevWidth || Math.abs(nextWidth - prevWidth) > prevWidth * RESIZE_THRESHOLD;
}

/**
 * Trailing-edge throttle — keep resize re-bakes from stampeding (plan §5.4).
 * @template T
 * @param {(...args: T[]) => void} fn
 * @param {number} wait
 * @returns {(...args: T[]) => void}
 */
export function throttle(fn, wait = 200) {
  /** @type {ReturnType<typeof setTimeout> | null} */
  let timer = null;
  /** @type {T[] | null} */
  let pending = null;
  return (...args) => {
    pending = args;
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn(...(pending ?? []));
      pending = null;
    }, wait);
  };
}
