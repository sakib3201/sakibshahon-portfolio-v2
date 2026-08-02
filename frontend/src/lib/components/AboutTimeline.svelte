<script>
  import { onMount } from 'svelte';
  import { aboutTimeline } from '$lib/data.js';
  import TimelineItem from './TimelineItem.svelte';

  let page = $state(0);
  let turning = $state(/** @type {null | 'forward' | 'back'} */ (null));
  let bookEnabled = $state(false);
  let announce = $state('');
  let startX = 0;

  const leaves = /** @type {Array<
    | { kind: 'cover' }
    | { kind: 'entry'; item: (typeof aboutTimeline)[number] }
    | { kind: 'fin' }
  >} */ ([
    { kind: 'cover' },
    ...aboutTimeline.map((item) => ({ kind: 'entry', item })),
    { kind: 'fin' }
  ]);
  const last = leaves.length - 1;

  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let flipTimer;

  /** @param {number} i */
  function leafState(i) {
    if (i < page) return 'left';
    if (i === page) return 'current';
    if (i === page + 1) return 'next';
    return 'hidden';
  }

  /** @param {'forward' | 'back'} dir */
  function flip(dir) {
    if (turning || !bookEnabled) return false;
    const next = page + (dir === 'forward' ? 1 : -1);
    if (next < 0 || next > last) return false;
    turning = dir;
    flipTimer = setTimeout(() => {
      page = next;
      turning = null;
      const leaf = leaves[next];
      if (leaf.kind === 'entry') {
        const n = aboutTimeline.indexOf(leaf.item) + 1;
        announce = `Chapter ${n} of ${aboutTimeline.length}: ${leaf.item.title}`;
      } else if (leaf.kind === 'cover') {
        announce = 'The journal is closed. Turn the page to read the first chapter.';
      } else {
        announce = 'The final leaf — the story is still being written.';
      }
    }, 720);
    return true;
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (e.key === 'ArrowRight') {
      if (flip('forward')) e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      if (flip('back')) e.preventDefault();
    }
  }

  /** @param {PointerEvent} e */
  function onPointerDown(e) {
    startX = e.clientX;
  }

  /** @param {PointerEvent} e */
  function onPointerUp(e) {
    if (turning || !bookEnabled) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 48) {
      if (dx < 0) flip('forward');
      else flip('back');
    }
  }

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const on = !reduced.matches;
      bookEnabled = on;
      document.documentElement.classList.toggle('book-enabled', on);
      if (!on) {
        page = 0;
        turning = null;
        clearTimeout(flipTimer);
      }
    };
    sync();
    reduced.addEventListener('change', sync);
    window.addEventListener('keydown', onKeydown);
    return () => {
      reduced.removeEventListener('change', sync);
      window.removeEventListener('keydown', onKeydown);
      clearTimeout(flipTimer);
    };
  });
</script>

<section class="relative bg-sumi text-inktext py-20 lg:py-28">
  <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 reveal" data-reveal>
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">
        My Journey
      </h2>
      <p class="marginalia text-inktextdim mt-5">The chapters that bound this shelf together</p>
    </div>

    <div class="text-center mb-14 reveal" data-reveal data-reveal-delay="200">
      <blockquote class="brush italic text-lg md:text-xl text-inktextdim max-w-2xl mx-auto leading-relaxed">
        Programming has been an amazing journey for me. It&apos;s not just about writing code, but a
        passion that burns bright in my soul. Each line of code I write is a step towards turning
        ideas into reality. It&apos;s a constant learning process that never ceases to amaze me.
      </blockquote>
    </div>

    <div
      class="journal-stage relative mx-auto max-w-3xl reveal"
      data-reveal
      onpointerdown={onPointerDown}
      onpointerup={onPointerUp}
    >
      <div class="journal-book">
        {#each leaves as leaf, i (i)}
          <div
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

      {#if bookEnabled}
        {#if page > 0}
          <button
            type="button"
            class="journal-tab journal-tab-left"
            onclick={() => flip('back')}
            aria-label="Turn to the previous page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        {/if}
        {#if page < last}
          <button
            type="button"
            class="journal-tab journal-tab-right"
            onclick={() => flip('forward')}
            aria-label="Turn to the next page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        {/if}
      {/if}
    </div>

    {#if bookEnabled}
      <div class="journal-controls">
        <button
          type="button"
          class="journal-turn"
          onclick={() => flip('back')}
          disabled={page === 0}
          aria-label="Turn to the previous page"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span class="marginalia text-inktextdim">
          Leaf {String(page + 1).padStart(2, '0')} / {String(leaves.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          class="journal-turn"
          onclick={() => flip('forward')}
          disabled={page === last}
          aria-label="Turn to the next page"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    {/if}

    <p class="sr-only" aria-live="polite">{announce}</p>
  </div>
</section>
