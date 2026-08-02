<script>
  import { onMount } from 'svelte';
  import { aboutTimeline } from '$lib/data.js';
  import JournalStage from './JournalStage.svelte';

  let page = $state(0);
  let turning = $state(/** @type {null | 'forward' | 'back'} */ (null));
  let bookEnabled = $state(false);
  let announce = $state('');
  let startX = 0;
  let hintVisible = $state(false);
  let hintFading = $state(false);

  const JOURNAL_TURN_MS = 840;
  const JOURNAL_HINT_KEY = 'about-journal-flip-hint-seen';

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
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let hintTimer;

  function dismissHint() {
    if (!hintVisible || hintFading) return;
    hintFading = true;
    try {
      window.sessionStorage.setItem(JOURNAL_HINT_KEY, '1');
    } catch {
      // Session storage can be unavailable in privacy-restricted contexts.
    }
    hintTimer = setTimeout(() => {
      hintVisible = false;
      hintFading = false;
    }, 320);
  }

  /** @param {'forward' | 'back'} dir */
  function flip(dir) {
    if (turning || !bookEnabled) return false;
    const next = page + (dir === 'forward' ? 1 : -1);
    if (next < 0 || next > last) return false;
    turning = dir;
    dismissHint();
    clearTimeout(flipTimer);
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
    }, JOURNAL_TURN_MS);
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
    try {
      hintVisible = window.sessionStorage.getItem(JOURNAL_HINT_KEY) !== '1';
    } catch {
      hintVisible = true;
    }
    sync();
    reduced.addEventListener('change', sync);
    window.addEventListener('keydown', onKeydown);
    return () => {
      reduced.removeEventListener('change', sync);
      window.removeEventListener('keydown', onKeydown);
      clearTimeout(flipTimer);
      clearTimeout(hintTimer);
      document.documentElement.classList.remove('book-enabled');
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
      <JournalStage {leaves} {page} {turning} />

      {#if bookEnabled}
        <div class="journal-hit-layer" aria-label="Journal page controls">
          <button
            type="button"
            class="journal-hit-zone journal-hit-zone-left"
            onclick={() => flip('back')}
            disabled={page === 0 || Boolean(turning)}
            aria-label="Click the left page to turn back"
          >
            <span class="sr-only">Previous page</span>
          </button>
          <button
            type="button"
            class="journal-hit-zone journal-hit-zone-right"
            onclick={() => flip('forward')}
            disabled={page === last || Boolean(turning)}
            aria-label="Click the right page to turn forward"
          >
            <span class="sr-only">Next page</span>
          </button>
        </div>
      {/if}
    </div>

    {#if bookEnabled}
      <div class="journal-hint-slot">
        {#if hintVisible}
          <p class="journal-hint marginalia" class:journal-hint-fading={hintFading}>Click a page to flip</p>
        {/if}
      </div>
      <div class="journal-counter marginalia text-inktextdim" aria-label={`Leaf ${page + 1} of ${leaves.length}`}>
        Leaf {String(page + 1).padStart(2, '0')} / {String(leaves.length).padStart(2, '0')}
      </div>
    {/if}

    <p class="sr-only" aria-live="polite">{announce}</p>
  </div>
</section>
