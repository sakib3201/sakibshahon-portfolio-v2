/**
 * The WebGL enhancement for the /about journal.
 *
 * The DOM remains the content and accessibility source of truth. This layer
 * only gives the bound book a physical spread: the current leaf sits on the
 * right, the previous leaf's colophon rests on the left, and one segmented
 * sheet curls over the binding before settling into the pile.
 */

import * as THREE from 'three';

const PAGE_WIDTH = 4.2;
const PAGE_HEIGHT = 6.2;
const PAGE_SEGMENTS_X = 64;
const PAGE_SEGMENTS_Y = 24;
const PAGE_TEXTURE_WIDTH = 768;
const PAGE_TEXTURE_HEIGHT = 1136;
const FOLD_MS = 700;
const SETTLE_MS = 140;
const TURN_MS = FOLD_MS + SETTLE_MS;
const FOLD_FRACTION = FOLD_MS / TURN_MS;
const BEND_RADIUS = 0.22;
const PILE_STEP = 0.035;
const PILE_Z_STEP = 0.025;
const DESKTOP_SPREAD_MEDIA = '(min-width: 768px)';
const EASE = [0.22, 1, 0.36, 1];

const COLORS = {
  sumi: '#0f0d0a',
  lacquer: '#171310',
  lacquerDeep: '#0a0806',
  paper: '#201a12',
  paperDim: '#18130c',
  ink: '#ece5d3',
  inkDim: '#a99f8d',
  gold: '#c9a25e',
  goldBright: '#e8c47e',
  goldDeep: '#8d6d3a',
  cinnabar: '#c02818'
};

/** @param {number} p1x @param {number} p1y @param {number} p2x @param {number} p2y */
function cubicBezier(p1x, p1y, p2x, p2y) {
  return (/** @type {number} */ x) => {
    let low = 0;
    let high = 1;
    for (let index = 0; index < 12; index += 1) {
      const t = (low + high) / 2;
      const inverse = 1 - t;
      const sample =
        3 * inverse * inverse * t * p1x + 3 * inverse * t * t * p2x + t * t * t;
      if (sample < x) low = t;
      else high = t;
    }
    const t = (low + high) / 2;
    const inverse = 1 - t;
    return 3 * inverse * inverse * t * p1y + 3 * inverse * t * t * p2y + t * t * t;
  };
}

const easeTurn = cubicBezier(EASE[0], EASE[1], EASE[2], EASE[3]);

/** @param {number} value @param {number} min @param {number} max */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** @param {number} from @param {number} to @param {number} amount */
function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

/** @param {CanvasRenderingContext2D} ctx @param {number} x @param {number} y @param {number} w @param {number} h @param {number} r */
function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** @param {CanvasRenderingContext2D} ctx @param {string} text @param {number} maxWidth */
function wrapText(ctx, text, maxWidth) {
  const lines = [];
  for (const paragraph of String(text || '').split('\n')) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    if (paragraph === '') lines.push('');
  }
  return lines;
}

/** @param {CanvasRenderingContext2D} ctx @param {string} text @param {number} x @param {number} y @param {number} maxWidth @param {number} lineHeight @param {number} maxLines */
function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = wrapText(ctx, text, maxWidth);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines && visible.length) {
    let last = visible[visible.length - 1];
    while (last.length > 4 && ctx.measureText(`${last}...`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    visible[visible.length - 1] = `${last}...`;
  }
  visible.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return visible.length;
}

/** @param {CanvasRenderingContext2D} ctx @param {number} x @param {number} y @param {number} size @param {string} label */
function drawSeal(ctx, x, y, size, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.035);
  ctx.fillStyle = COLORS.cinnabar;
  roundedRect(ctx, -size / 2, -size / 2, size, size, size * 0.08);
  ctx.fill();
  ctx.strokeStyle = 'rgba(240, 234, 217, 0.5)';
  ctx.lineWidth = Math.max(2, size * 0.025);
  ctx.stroke();
  ctx.fillStyle = COLORS.ink;
  ctx.font = `400 ${size * 0.42}px "Yuji Syuku", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 0, size * 0.015);
  ctx.restore();
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height */
function drawPaper(ctx, width, height) {
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, width, height);

  const wash = ctx.createRadialGradient(width * 0.12, height * 0.05, 0, width * 0.12, height * 0.05, width * 0.9);
  wash.addColorStop(0, 'rgba(232, 196, 126, 0.1)');
  wash.addColorStop(0.65, 'rgba(232, 196, 126, 0.015)');
  wash.addColorStop(1, 'rgba(232, 196, 126, 0)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(201, 162, 94, 0.095)';
  ctx.lineWidth = 1;
  for (let y = 168; y < height - 90; y += 46) {
    ctx.beginPath();
    ctx.moveTo(66, y);
    ctx.lineTo(width - 66, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(201, 162, 94, 0.55)';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.strokeStyle = 'rgba(201, 162, 94, 0.16)';
  ctx.lineWidth = 1;
  ctx.strokeRect(44, 44, width - 88, height - 88);
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height @param {string} title @param {string} time @param {string} description @param {number} index @param {number} total */
function drawEntryFront(ctx, width, height, title, time, description, index, total) {
  drawPaper(ctx, width, height);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.fillStyle = COLORS.gold;
  ctx.font = '400 22px "Red Hat Mono", monospace';
  ctx.fillText(`CHAPTER ${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, 68, 78);

  const plate = ctx.createLinearGradient(68, 118, 260, 166);
  plate.addColorStop(0, COLORS.goldDeep);
  plate.addColorStop(0.52, COLORS.gold);
  plate.addColorStop(1, COLORS.goldBright);
  ctx.fillStyle = plate;
  roundedRect(ctx, 68, 118, 190, 50, 3);
  ctx.fill();
  ctx.fillStyle = COLORS.sumi;
  ctx.font = '500 24px "Red Hat Mono", monospace';
  ctx.fillText(time, 90, 132);

  ctx.fillStyle = COLORS.ink;
  ctx.font = '400 52px "Yuji Syuku", serif';
  const titleLines = drawWrapped(ctx, title, 68, 214, width - 136, 62, 2);
  const dividerY = 214 + Math.max(1, titleLines) * 62 + 24;
  ctx.strokeStyle = 'rgba(201, 162, 94, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(68, dividerY);
  ctx.lineTo(width - 68, dividerY);
  ctx.stroke();

  ctx.fillStyle = 'rgba(236, 229, 211, 0.88)';
  ctx.font = '400 26px "Zen Kaku Gothic New", sans-serif';
  drawWrapped(ctx, description, 68, dividerY + 42, width - 136, 40, 16);

  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 18px "Red Hat Mono", monospace';
  ctx.fillText('SAKIB AHAMED SHAHON  /  THE JOURNEY', 68, height - 70);
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height @param {string} title @param {string} time */
function drawEntryBack(ctx, width, height, title, time) {
  ctx.fillStyle = COLORS.paperDim;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(201, 162, 94, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawSeal(ctx, width / 2, height / 2 - 124, 122, time);
  ctx.fillStyle = 'rgba(236, 229, 211, 0.82)';
  ctx.font = '400 42px "Yuji Syuku", serif';
  drawWrapped(ctx, title, width / 2, height / 2 + 6, width - 150, 52, 2);
  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 18px "Red Hat Mono", monospace';
  ctx.fillText('A LEAF TURNED / A MEMORY KEPT', width / 2, height - 74);
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height */
function drawCoverFront(ctx, width, height) {
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, '#2a2118');
  base.addColorStop(0.5, COLORS.lacquer);
  base.addColorStop(1, COLORS.lacquerDeep);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.strokeStyle = 'rgba(201, 162, 94, 0.38)';
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, width - 96, height - 96);
  drawSeal(ctx, width / 2, height * 0.31, 128, '誌');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = COLORS.goldBright;
  ctx.font = '400 64px "Yuji Syuku", serif';
  ctx.fillText('My Journey', width / 2, height * 0.49);
  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 20px "Red Hat Mono", monospace';
  ctx.fillText('THE CHAPTERS THAT BOUND THIS SHELF TOGETHER', width / 2, height * 0.61);
  ctx.fillStyle = COLORS.gold;
  ctx.fillRect(width * 0.38, height * 0.72, width * 0.24, 2);
  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 18px "Red Hat Mono", monospace';
  ctx.fillText('SAKIB AHAMED SHAHON', width / 2, height * 0.77);
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height */
function drawInsideCover(ctx, width, height) {
  ctx.fillStyle = COLORS.paperDim;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(201, 162, 94, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(236, 229, 211, 0.6)';
  ctx.font = '400 42px "Yuji Syuku", serif';
  ctx.fillText('Sakib Ahamed Shahon', width / 2, height * 0.46);
  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 18px "Red Hat Mono", monospace';
  ctx.fillText('THE FAMILY LEDGER, BOUND', width / 2, height * 0.56);
}

/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height */
function drawFin(ctx, width, height) {
  drawPaper(ctx, width, height);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawSeal(ctx, width / 2, height * 0.34, 124, '完');
  ctx.fillStyle = COLORS.ink;
  ctx.font = '400 46px "Yuji Syuku", serif';
  drawWrapped(ctx, 'The story is still being written', width / 2, height * 0.52, width - 140, 56, 2);
  ctx.fillStyle = COLORS.inkDim;
  ctx.font = '400 18px "Red Hat Mono", monospace';
  ctx.fillText('FIN', width / 2, height * 0.74);
}

/** @param {any} page @param {'front' | 'back'} face @param {number} index @param {number} total */
function makePageCanvas(page, face, index, total) {
  const canvas = document.createElement('canvas');
  canvas.width = PAGE_TEXTURE_WIDTH;
  canvas.height = PAGE_TEXTURE_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('journal texture context unavailable');

  if (page?.kind === 'cover') {
    if (face === 'front') drawCoverFront(ctx, canvas.width, canvas.height);
    else drawInsideCover(ctx, canvas.width, canvas.height);
  } else if (page?.kind === 'fin') {
    if (face === 'front') drawFin(ctx, canvas.width, canvas.height);
    else drawInsideCover(ctx, canvas.width, canvas.height);
  } else {
    const item = page?.item || {};
    if (face === 'front') {
      drawEntryFront(
        ctx,
        canvas.width,
        canvas.height,
        item.title || 'Untitled chapter',
        item.time || '',
        item.description || '',
        Math.max(1, index),
        Math.max(1, total)
      );
    } else {
      drawEntryBack(ctx, canvas.width, canvas.height, item.title || 'Untitled chapter', item.time || '');
    }
  }

  return canvas;
}

/** @param {any} page @param {number} index @param {number} total */
function makePageTexture(page, index, total) {
  const front = makePageCanvas(page, 'front', index, total);
  const back = makePageCanvas(page, 'back', index, total);
  const atlas = document.createElement('canvas');
  atlas.width = PAGE_TEXTURE_WIDTH;
  atlas.height = PAGE_TEXTURE_HEIGHT * 2;
  const ctx = atlas.getContext('2d');
  if (!ctx) throw new Error('journal atlas context unavailable');
  ctx.drawImage(front, 0, 0);
  ctx.drawImage(back, 0, PAGE_TEXTURE_HEIGHT);

  const texture = new THREE.CanvasTexture(atlas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 2;
  return texture;
}

function makeShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('journal shadow context unavailable');
  const gradient = ctx.createRadialGradient(256, 64, 8, 256, 64, 250);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.62)');
  gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makePageGeometry() {
  const geometry = new THREE.PlaneGeometry(PAGE_WIDTH, PAGE_HEIGHT, PAGE_SEGMENTS_X, PAGE_SEGMENTS_Y);
  geometry.translate(PAGE_WIDTH / 2, 0, 0);
  const positions = geometry.attributes.position;
  geometry.userData.basePositions = Float32Array.from(positions.array);
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(positions.count * 3).fill(1), 3));
  return geometry;
}

/** @param {THREE.Material | THREE.Material[]} material @param {THREE.Texture | null} texture @param {number} tint */
function setMaterialTexture(material, texture, tint = 1) {
  if (Array.isArray(material)) return;
  const mapped = /** @type {THREE.MeshStandardMaterial} */ (material);
  mapped.map = texture;
  mapped.color.setScalar(tint);
  mapped.needsUpdate = true;
}

/** @param {THREE.BufferGeometry} geometry @param {number} forwardProgress @param {'front' | 'back' | null} face */
function writePagePose(geometry, forwardProgress, face = null) {
  const progress = clamp(forwardProgress, 0, 1);
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  const colors = geometry.attributes.color;
  const base = geometry.userData.basePositions;
  const phaseProgress = clamp(progress / FOLD_FRACTION, 0, 1);
  const phase = easeTurn(phaseProgress);
  const settle = progress <= FOLD_FRACTION ? 0 : easeTurn(clamp((progress - FOLD_FRACTION) / (1 - FOLD_FRACTION), 0, 1));
  const foldPosition = 1 - phase;
  const foldX = foldPosition * PAGE_WIDTH;
  const theta = Math.PI * phase;
  const arcLength = BEND_RADIUS * theta;

  for (let index = 0; index < positions.count; index += 1) {
    const offset = index * 3;
    const baseX = base[offset];
    const baseY = base[offset + 1];
    const u = clamp(baseX / PAGE_WIDTH, 0, 1);
    const v = clamp((PAGE_HEIGHT / 2 - baseY) / PAGE_HEIGHT, 0, 1);
    const distance = (u - foldPosition) * PAGE_WIDTH;
    let curledX = baseX;
    let curledY = baseY;
    let curledZ = 0;

    if (phase > 0 && distance > 0) {
      const wrapped = Math.min(distance, arcLength);
      const angle = wrapped / BEND_RADIUS;
      const tangent = distance - wrapped;
      curledX = foldX + BEND_RADIUS * Math.sin(angle) + tangent * Math.cos(theta);
      curledZ = BEND_RADIUS * (1 - Math.cos(angle)) + tangent * Math.sin(theta);
      curledY += Math.sin(Math.PI * u) * Math.sin(Math.PI * phase) * 0.018;
    } else if (phase > 0) {
      curledZ = Math.sin(Math.PI * u) * Math.sin(Math.PI * phase) * 0.012;
    }

    const targetX = -baseX;
    const targetY = baseY - 0.018;
    const x = lerp(curledX, targetX, settle);
    const y = lerp(curledY, targetY, settle);
    const z = lerp(curledZ, 0, settle);
    positions.setXYZ(index, x, y, z);

    let isBack = face === 'back';
    if (face === null) {
      const wrapped = Math.min(Math.max(distance, 0), arcLength);
      const angle = BEND_RADIUS ? wrapped / BEND_RADIUS : 0;
      isBack = progress >= FOLD_FRACTION || angle > Math.PI / 2;
    }
    uvs.setXY(index, isBack ? 1 - u : u, isBack ? (1 - v) * 0.5 : 1 - v * 0.5);

    const distanceFromFold = Math.abs(distance);
    const foldShade = phase * (1 - clamp(distanceFromFold / 0.7, 0, 1)) * (1 - settle * 0.75);
    const edgeCatch =
      phase > 0 ? Math.exp(-Math.max(distance, 0) / 0.14) * Math.sin(Math.PI * phase) * (1 - settle) : 0;
    const darken = 0.16 * foldShade;
    colors.setXYZ(
      index,
      1,
      clamp(1 - darken + edgeCatch * 0.06, 0.74, 1),
      clamp(1 - darken * 1.5 + edgeCatch * 0.18, 0.62, 1)
    );
  }

  positions.needsUpdate = true;
  uvs.needsUpdate = true;
  colors.needsUpdate = true;
  geometry.computeVertexNormals();
}

export class Journal3D {
  /**
   * @param {{
   *   canvas: HTMLCanvasElement,
   *   width: number,
   *   height: number,
   *   pages: Array<any>,
   *   onReady?: () => void,
   *   onError?: (error: Error) => void
   * }} opts
   */
  constructor(opts) {
    this.opts = opts;
    this.pages = opts.pages;
    this.page = 0;
    this.requestedPage = 0;
    this.turning = null;
    this.turnProgress = 0;
    this.frameFrom = 0;
    this.frameTo = 0;
    this.textureCache = new Map();
    this.activeTextureKeys = new Set();
    this.disposed = false;
    this.running = false;
    this.raf = 0;
    this.last = performance.now();
    this.pointerX = 0;
    this.pointerY = 0;
    this.tiltX = 0;
    this.tiltY = 0;
    this.aspect = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50);
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);
    this.root = new THREE.Group();
    this.scene.add(this.root);

    this.scene.add(new THREE.AmbientLight(0x18130e, 0.45));
    const key = new THREE.DirectionalLight(0xe8c47e, 1.15);
    key.position.set(3.5, 5, 8);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x667080, 0.18);
    fill.position.set(-4, 2, -5);
    this.scene.add(fill);

    this.shadowTexture = makeShadowTexture();
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(PAGE_WIDTH * 2.1, 1.45),
      new THREE.MeshBasicMaterial({
        map: this.shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.72
      })
    );
    this.shadow.position.set(0, -PAGE_HEIGHT / 2 - 0.16, -0.9);
    this.root.add(this.shadow);

    this.spine = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, PAGE_HEIGHT + 0.16, 0.22),
      new THREE.MeshStandardMaterial({ color: COLORS.goldDeep, roughness: 0.7, metalness: 0.15 })
    );
    this.spine.position.set(0, 0, -0.2);
    this.root.add(this.spine);

    this.pageMeshes = this.pages.map((page) => {
      const geometry = makePageGeometry();
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.92,
        metalness: 0,
        vertexColors: true,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = 4;
      const group = new THREE.Group();
      group.add(mesh);
      this.root.add(group);
      return { page, geometry, mesh, material, group };
    });

    try {
      this.updateCamera(opts.width, opts.height);
      this.setPage(0);
    } catch (error) {
      this.dispose();
      throw error;
    }

    this.onVisibility = () => {
      if (document.hidden) this.pause();
      else this.resume();
    };
    document.addEventListener('visibilitychange', this.onVisibility);

    /** @param {Event} event */
    this.onContextLost = (event) => {
      event.preventDefault();
      this.opts.onError?.(new Error('journal WebGL context lost'));
    };
    opts.canvas.addEventListener('webglcontextlost', this.onContextLost, false);

    this.io = null;
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) this.resume();
          else this.pause();
        },
        { threshold: 0 }
      );
      this.io.observe(opts.canvas);
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      /** @param {PointerEvent} event */
      this.onPointer = (event) => {
        const rect = opts.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        if (x < -0.5 || x > 0.5 || y < -0.5 || y > 0.5) {
          this.pointerX = 0;
          this.pointerY = 0;
          return;
        }
        this.pointerX = clamp(x, -0.5, 0.5);
        this.pointerY = clamp(y, -0.5, 0.5);
      };
      window.addEventListener('pointermove', this.onPointer, { passive: true });
    }

    const context = this.renderer.getContext();
    if (!context || context.isContextLost()) throw new Error('journal WebGL context unavailable');
    this.render();
    this.resume();
    opts.onReady?.();
  }

  /** @returns {boolean} */
  isSpread() {
    return window.matchMedia(DESKTOP_SPREAD_MEDIA).matches;
  }

  /** @param {number} page */
  frameFor(page) {
    return !this.isSpread() || page === 0 ? -PAGE_WIDTH / 2 : 0;
  }

  /** @param {number} width @param {number} height */
  updateCamera(width, height) {
    const aspect = Math.max(0.4, width / Math.max(1, height));
    this.aspect = aspect;
    const viewHeight = PAGE_HEIGHT * 1.18;
    const spreadWidth = PAGE_WIDTH * 2.28;
    const singleWidth = PAGE_WIDTH * 1.18;
    const viewWidth = this.isSpread()
      ? Math.max(viewHeight * aspect, spreadWidth)
      : Math.max(viewHeight * aspect, singleWidth);
    this.camera.left = -viewWidth / 2;
    this.camera.right = viewWidth / 2;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2;
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    if (!this.turning) this.root.position.x = this.frameFor(this.page);
  }

  /** @param {number} page */
  setPage(page) {
    const nextPage = clamp(Math.round(page), 0, this.pages.length - 1);
    this.requestedPage = nextPage;
    if (this.turning) {
      if (this.turning.target === nextPage) this.finishTurn();
      return;
    }
    this.page = nextPage;
    this.root.position.x = this.frameFor(nextPage);
    this.layout();
    this.render();
  }

  finishTurn() {
    if (!this.turning) return;
    const target = this.turning.target;
    this.turning = null;
    this.page = target;
    this.requestedPage = target;
    this.root.position.x = this.frameFor(target);
    this.layout();
  }

  layout() {
    this.activeTextureKeys.clear();
    const spread = this.isSpread();

    for (let index = 0; index < this.pageMeshes.length; index += 1) {
      const entry = this.pageMeshes[index];
      const { group } = entry;
      group.visible = false;
      group.rotation.y = 0;
      group.position.set(0, 0, 0);
      writePagePose(entry.geometry, 0, 'front');
      setMaterialTexture(entry.material, null);

      if (!spread && index !== this.page) continue;

      if (index < this.page) {
        const depth = this.page - 1 - index;
        group.visible = spread;
        group.rotation.y = -Math.PI;
        group.position.set(-depth * PILE_STEP, -depth * PILE_STEP * 0.55, -0.34 - depth * PILE_Z_STEP);
        writePagePose(entry.geometry, 0, 'back');
        if (depth === 0) this.setTexture(index, entry);
        else setMaterialTexture(entry.material, null, Math.max(0.5, 0.78 - depth * 0.035));
      } else if (index === this.page) {
        group.visible = true;
        group.position.z = 0.02;
        this.setTexture(index, entry);
      } else if (spread && index === this.page + 1) {
        group.visible = true;
        group.position.z = -0.12;
        this.setTexture(index, entry);
      }
    }

    this.pruneTextures();
  }

  /** @param {number} index @param {{page: any, mesh: THREE.Mesh}} entry */
  setTexture(index, entry) {
    const key = index;
    let texture = this.textureCache.get(key);
    if (!texture) {
      const chapterIndex = this.pages
        .slice(0, index + 1)
        .filter((page) => page.kind === 'entry').length;
      const chapterTotal = this.pages.filter((page) => page.kind === 'entry').length;
      texture = makePageTexture(entry.page, chapterIndex, chapterTotal);
      this.textureCache.set(key, texture);
    }
    this.activeTextureKeys.add(key);
    setMaterialTexture(entry.mesh.material, texture);
  }

  pruneTextures() {
    for (const [key, texture] of this.textureCache) {
      if (this.activeTextureKeys.has(key)) continue;
      texture.dispose();
      this.textureCache.delete(key);
    }
  }

  /** @param {'forward' | 'back'} direction */
  turn(direction) {
    if (this.turning) return false;
    const target = this.page + (direction === 'forward' ? 1 : -1);
    if (target < 0 || target >= this.pages.length) return false;

    const index = direction === 'forward' ? this.page : target;
    const entry = this.pageMeshes[index];
    this.turning = { direction, target, entry };
    this.requestedPage = target;
    this.turnProgress = 0;
    this.frameFrom = this.root.position.x;
    this.frameTo = this.frameFor(target);
    entry.group.visible = true;
    entry.group.rotation.y = 0;
    entry.group.position.set(0, 0, 0.16);
    writePagePose(entry.geometry, direction === 'forward' ? 0 : 1, direction === 'forward' ? 'front' : 'back');
    return true;
  }

  /** @param {number} now */
  tick(now) {
    const delta = Math.min(50, now - this.last);
    this.last = now;

    if (this.turning) {
      const time = clamp(this.turnProgress + delta / TURN_MS, 0, 1);
      this.turnProgress = time;
      const forwardProgress = this.turning.direction === 'forward' ? time : 1 - time;
      const entry = this.turning.entry;
      writePagePose(entry.geometry, forwardProgress);
      entry.group.rotation.y = 0;
      entry.group.position.set(0, 0, 0.16 + Math.sin(Math.PI * time) * 0.06);
      this.root.position.x = lerp(this.frameFrom, this.frameTo, easeTurn(time));

      if (time >= 1) {
        this.finishTurn();
      }
    }

    this.tiltX += (this.pointerY * 0.035 - this.tiltX) * 0.08;
    this.tiltY += (-this.pointerX * 0.045 - this.tiltY) * 0.08;
    this.root.rotation.x = this.tiltX;
    this.root.rotation.y = this.tiltY;
    this.render();
  }

  render() {
    if (!this.disposed) this.renderer.render(this.scene, this.camera);
  }

  resume() {
    if (this.running || this.disposed || document.hidden) return;
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

  /** @param {number} width @param {number} height */
  resize(width, height) {
    this.updateCamera(width, height);
    if (!this.turning) this.layout();
    this.render();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.pause();
    this.io?.disconnect();
    if (this.onVisibility) document.removeEventListener('visibilitychange', this.onVisibility);
    if (this.onPointer) window.removeEventListener('pointermove', this.onPointer);
    if (this.onContextLost) this.opts.canvas.removeEventListener('webglcontextlost', this.onContextLost);

    for (const texture of this.textureCache.values()) texture.dispose();
    this.textureCache.clear();
    this.shadowTexture?.dispose();
    this.shadow?.geometry.dispose();
    this.shadow?.material.dispose();
    this.spine?.geometry.dispose();
    this.spine?.material.dispose();
    for (const entry of this.pageMeshes || []) {
      entry.geometry.dispose();
      entry.material.dispose();
    }
    this.renderer?.dispose();
  }
}
