<script>
  import { onMount, onDestroy } from 'svelte';
  import TimelineItem from './TimelineItem.svelte';

  /**
   * The WebGL journal stage. The DOM leaves are always rendered first so the
   * static book is a real fallback and remains available to assistive tech.
   * The canvas is only an enhancement; it renders the same `leaves` data with
   * the self-contained three.js flipbook in journal3d.js.
   */
  let { leaves, page, turning } = $props();

  /** @type {HTMLDivElement | undefined} */
  let bookEl;
  /** @type {HTMLCanvasElement | undefined} */
  let canvasEl;
  /** @type {import('$lib/journal3d.js').Journal3D | null} */
  let engine = null;
  let started = false;
  let disposed = false;
  let failed = false;
  let startToken = 0;
  let nearViewport = false;
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

  /** @param {boolean} permanent */
  function teardownEngine(permanent = false) {
    startToken += 1;
    engine?.dispose();
    engine = null;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('webgl-journal');
      document.documentElement.classList.toggle('webgl-journal-failed', permanent);
    }
    started = false;
    if (permanent) failed = true;
  }

  function canStart() {
    const html = document.documentElement;
    return (
      html.classList.contains('motion-init') &&
      html.classList.contains('book-enabled') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !failed
    );
  }

  function startEngine() {
    if (started || disposed || !nearViewport || !canStart() || !bookEl || !canvasEl) return false;
    const rect = bookEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    started = true;
    const token = ++startToken;

    import('../journal3d.js')
      .then(({ Journal3D }) => {
        if (disposed || token !== startToken || !canStart() || !bookEl || !canvasEl) {
          if (token === startToken) started = false;
          return;
        }
        const currentPage = page;
        try {
          engine = new Journal3D({
            canvas: canvasEl,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            pages: leaves,
            onReady: () => {
              document.documentElement.classList.remove('webgl-journal-failed');
              document.documentElement.classList.add('webgl-journal');
            },
            onError: () => teardownEngine(true)
          });
          engine.setPage(currentPage);
          if (turning) engine.turn(turning);
        } catch {
          teardownEngine(true);
        }
      })
      .catch(() => {
        // WebGL failure leaves the CSS book untouched and is not retried on
        // every class mutation.
        teardownEngine(true);
      });
    return true;
  }

  onMount(() => {
    const html = document.documentElement;
    html.classList.remove('webgl-journal', 'webgl-journal-failed');

    // Load the engine lazily when the stage approaches the viewport. The
    // three chunk never enters the initial bundle and never loads off-page.
    if ('IntersectionObserver' in window) {
      startObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            nearViewport = true;
            if (startEngine()) startObserver?.disconnect();
          }
        },
        { rootMargin: '400px 0px' }
      );
      if (bookEl) startObserver.observe(bookEl);
    } else {
      nearViewport = true;
      startEngine();
    }

    resizeObserver = new ResizeObserver(() => {
      if (!engine || !bookEl) return;
      const rect = bookEl.getBoundingClientRect();
      engine.resize(Math.round(rect.width), Math.round(rect.height));
    });
    if (bookEl) resizeObserver.observe(bookEl);

    // Wait for motion.js and AboutTimeline to finish adding their html classes;
    // both can happen after this component's onMount on the first navigation.
    classObserver = new MutationObserver(() => {
      if (!started && nearViewport && canStart()) startEngine();
      if (started && !canStart()) {
        teardownEngine();
      }
    });
    classObserver.observe(html, { attributes: true, attributeFilter: ['class'] });
    if (nearViewport && canStart()) startEngine();
  });

  $effect(() => {
    const p = page;
    try {
      engine?.setPage(p);
    } catch {
      teardownEngine(true);
    }
  });

  $effect(() => {
    const dir = turning;
    if (dir) {
      try {
        engine?.turn(dir);
      } catch {
        teardownEngine(true);
      }
    }
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
      class="journal-leaf"
      class:journal-leaf-left={leafState(i) === 'left'}
      class:journal-leaf-current={leafState(i) === 'current'}
      class:journal-leaf-next={leafState(i) === 'next'}
      class:journal-leaf-hidden={leafState(i) === 'hidden'}
      class:journal-leaf-turning-forward={turning === 'forward' && i === page}
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
