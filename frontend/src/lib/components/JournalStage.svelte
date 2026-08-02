<script>
  import { onMount, onDestroy } from 'svelte';
  import { bakeLeaf, disposeTexture, shouldReBake, throttle } from '$lib/journalTexture.js';
  import TimelineItem from './TimelineItem.svelte';

  /**
   * The WebGL journal stage (plan §3/§6). Owns the canvas and the lazy
   * three.js engine load; renders the DOM leaves as the content source of
   * truth (layout placeholders + snapshot source). The parent
   * (AboutTimeline) keeps the flip() state machine, controls, and
   * announcements; this component watches `page`/`turning` and drives the
   * engine. `html.webgl-journal` is added only when the engine reports a
   * live first frame — failure keeps the CSS book untouched.
   */
  let { leaves, page, turning } = $props();

  const last = leaves.length - 1;

  /** @type {any} the shared three namespace (lazy import) */
  let THREE = null;

  /** @type {HTMLDivElement | undefined} */
  let bookEl;
  /** @type {HTMLCanvasElement | undefined} */
  let canvasEl;
  /** @type {Array<HTMLElement>} */
  let leafEls = [];

  /** @type {import('$lib/journal3d.js').Journal3D | null} */
  let engine = null;
  /** @type {Record<string, any>} textures by `${page}:${face}` */
  let texCache = {};
  /** @type {Record<string, Promise<any> | undefined>} in-flight bakes */
  let bakePending = {};
  let started = false;
  let disposed = false;
  let prevStageWidth = 0;
  /** @type {IntersectionObserver | null} */
  let startObserver = null;
  /** @type {ResizeObserver | null} */
  let resizeObserver = null;
  /** @type {MutationObserver | null} */
  let classObserver = null;

  /** @param {number} i */
  function leafState(i) {
    if (i < page) return 'left';
    if (i === page) return 'current';
    if (i === page + 1) return 'next';
    return 'hidden';
  }

  /**
   * Bake (or return the cached) texture for a leaf face. The bake canvas is
   * sized to the current leaf rect — text renders 1:1 at ≤ 2× DPR.
   * @param {number} pageIdx
   * @param {'front' | 'back'} face
   * @param {number} w
   * @param {number} h
   * @returns {Promise<any>}
   */
  async function bake(pageIdx, face, w, h) {
    const key = `${pageIdx}:${face}`;
    if (texCache[key]) return texCache[key];
    if (bakePending[key]) return bakePending[key];
    const leafEl = leafEls[pageIdx];
    if (!leafEl || !THREE) return null;
    const job = bakeLeaf(leafEl, face, { width: w, height: h, THREE })
      .then((res) => {
        const tex = res?.texture ?? null;
        if (tex) texCache[key] = tex;
        return tex;
      })
      .finally(() => {
        delete bakePending[key];
      });
    bakePending[key] = job;
    return job;
  }

  /** Fire-and-forget look-ahead bakes for the pages that may enter the scene.
   * @param {[number, number]} range
   */
  function ensureBaked(range) {
    const leafEl = leafEls[page];
    const book = bookEl;
    if (!leafEl || !book || !THREE) return Promise.resolve();
    const lw = Math.round(leafEl.getBoundingClientRect().width);
    const lh = Math.round(leafEl.getBoundingClientRect().height);
    const jobs = [];
    for (let p = Math.max(0, range[0]); p <= Math.min(last, range[1]); p++) {
      jobs.push(bake(p, 'front', lw, lh), bake(p, 'back', lw, lh));
    }
    return Promise.all(jobs).then(() => null);
  }

  function teardownEngine() {
    if (engine) {
      engine.dispose();
      engine = null;
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('webgl-journal');
    }
    started = false;
    for (const tex of Object.values(texCache)) disposeTexture(tex);
    texCache = {};
    bakePending = {};
  }

  function startEngine() {
    if (started || disposed) return;
    const html = document.documentElement;
    if (!html.classList.contains('motion-init') || !html.classList.contains('book-enabled')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    started = true;

    let cancelled = false;
    (async () => {
      const [{ Journal3D }, three] = await Promise.all([
        import('../journal3d.js'),
        import('three')
      ]);
      if (cancelled || disposed || !bookEl || !canvasEl) return;
      THREE = three;
      const bookRect = bookEl.getBoundingClientRect();
      const leafEl = leafEls[page];
      const leafRect = leafEl ? leafEl.getBoundingClientRect() : bookRect;
      const currentPage = page;
      await ensureBaked([Math.max(0, currentPage - 2), Math.min(last, currentPage + 2)]);
      if (cancelled || disposed || !bookEl) return;
      engine = new Journal3D({
        canvas: canvasEl,
        width: Math.round(bookRect.width),
        height: Math.round(bookRect.height),
        leafWidth: Math.round(leafRect.width),
        leafHeight: Math.round(leafRect.height),
        pageCount: leaves.length,
        getTexture: (p, face) => texCache[`${p}:${face}`] ?? null,
        onReady: () => document.documentElement.classList.add('webgl-journal')
      });
      if (currentPage !== 0) engine.setSpread(currentPage);
    })().catch(() => {
      // WebGL init / raster failure → the CSS book stays; never upgrade.
      engine = null;
    });
  }

  onMount(() => {
    const html = document.documentElement;

    // Load the engine lazily when the stage approaches the viewport — the
    // three chunk never enters the initial bundle and never loads off-page.
    if ('IntersectionObserver' in window) {
      startObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            startEngine();
            startObserver?.disconnect();
          }
        },
        { rootMargin: '400px 0px' }
      );
      if (bookEl) startObserver.observe(bookEl);
    }

    const onResize = throttle(() => {
      if (!engine || !bookEl) return;
      const book = bookEl.getBoundingClientRect();
      if (!shouldReBake(prevStageWidth, book.width)) return;
      prevStageWidth = book.width;
      const leafEl = leafEls[page];
      if (!leafEl) return;
      ensureBaked([Math.max(0, page - 2), Math.min(last, page + 2)]).then(() => {
        if (!engine || disposed) return;
        const leafRect = leafEl.getBoundingClientRect();
        engine.resize(
          Math.round(book.width),
          Math.round(book.height),
          Math.round(leafRect.width),
          Math.round(leafRect.height)
        );
      });
    }, 200);
    resizeObserver = new ResizeObserver(() => onResize());
    if (bookEl) resizeObserver.observe(bookEl);

    // Motion loss (reduced-motion toggle or book mode drop) → dispose.
    classObserver = new MutationObserver(() => {
      if (!started) return;
      if (!html.classList.contains('motion-init') || !html.classList.contains('book-enabled')) {
        teardownEngine();
      }
    });
    classObserver.observe(html, { attributes: true, attributeFilter: ['class'] });
  });

  $effect(() => {
    const p = page;
    if (engine) {
      engine.setSpread(p);
      ensureBaked([Math.max(0, p - 2), Math.min(last, p + 2)]);
    }
  });

  $effect(() => {
    const dir = turning;
    if (dir && engine) engine.turn(dir);
  });

  onDestroy(() => {
    disposed = true;
    startObserver?.disconnect();
    resizeObserver?.disconnect();
    classObserver?.disconnect();
    teardownEngine();
  });
</script>

<div class="journal-book" bind:this={bookEl}>
  {#each leaves as leaf, i (i)}
    <div
      bind:this={leafEls[i]}
      class="journal-leaf"
      class:journal-leaf-left={leafState(i) === 'left'}
      class:journal-leaf-current={leafState(i) === 'current'}
      class:journal-leaf-next={leafState(i) === 'next'}
      class:journal-leaf-hidden={leafState(i) === 'hidden'}
      class:journal-leaf-returning={turning === 'back' && i === page - 1}
      style={`--depth: ${Math.max(0, page - i)}`}
    >
      {#if leaf.kind === 'entry'}
        <TimelineItem item={leaf.item} extraClass="journal-leaf-front" />
        <div class="journal-leaf-back journal-colophon" aria-hidden="true">
          <div class="journal-colophon-inner">
            <span class="hanko journal-year-seal">
              <span class="brush">{leaf.item.time}</span>
            </span>
            <div class="needle-line-h w-16 opacity-60"></div>
            <h4 class="brush text-xl text-inkonpaper/80">{leaf.item.title}</h4>
          </div>
        </div>
      {:else if leaf.kind === 'cover'}
        <div class="journal-leaf-front journal-cover">
          <div class="journal-cover-inner">
            <span class="hanko journal-seal" aria-hidden="true">
              <span class="brush">誌</span>
            </span>
            <div class="needle-line-h w-24 opacity-60"></div>
            <h3 class="brush gold-text text-4xl md:text-5xl tracking-[0.02em]">My Journey</h3>
            <p class="marginalia text-inktextdim">The chapters that bound this shelf together</p>
          </div>
        </div>
        <div class="journal-leaf-back journal-inside-cover" aria-hidden="true">
          <div class="journal-colophon-inner">
            <p class="brush text-2xl text-inkonpaper/60">Sakib Ahamed Shahon</p>
            <div class="needle-line-h w-16 opacity-40"></div>
            <p class="marginalia text-inktextdim/70">The family ledger, bound</p>
          </div>
        </div>
      {:else}
        <div class="journal-leaf-front journal-fin skin-sheet">
          <div class="journal-colophon-inner">
            <span class="hanko journal-seal" aria-hidden="true">
              <span class="brush">完</span>
            </span>
            <h3 class="brush text-3xl text-inkonpaper">The story is still being written</h3>
            <p class="marginalia text-inktextdim">fin</p>
          </div>
        </div>
        <div class="journal-leaf-back journal-inside-cover" aria-hidden="true"></div>
      {/if}
    </div>
  {/each}
</div>

<canvas
  bind:this={canvasEl}
  class="journal-canvas"
  aria-hidden="true"
></canvas>
