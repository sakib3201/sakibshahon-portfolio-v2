<script>
  import { onDestroy, onMount } from 'svelte';

  const IDLE_OPACITY = 0.4;
  const ACTIVE_OPACITY = 0.9;
  const IDLE_DELAY_MS = 350;

  /** @type {HTMLElement | undefined} */
  let needle;
  /** @type {number} */
  let rafId = 0;
  /** @type {number} */
  let idleTimer = 0;
  /** @type {(() => void) | undefined} */
  let cleanup;

  const update = () => {
    rafId = 0;
    if (!needle) return;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    needle.style.transform = `scaleX(${progress})`;
  };

  const scheduleUpdate = () => {
    if (rafId > 0) return;
    rafId = window.requestAnimationFrame(update);
  };

  const onScroll = () => {
    if (!needle) return;
    needle.style.opacity = String(ACTIVE_OPACITY);
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      if (needle) needle.style.opacity = String(IDLE_OPACITY);
    }, IDLE_DELAY_MS);
    scheduleUpdate();
  };

  const start = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    scheduleUpdate();
  };

  const stop = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', scheduleUpdate);
    window.clearTimeout(idleTimer);
    if (rafId > 0) window.cancelAnimationFrame(rafId);
    rafId = 0;
    if (needle) {
      needle.style.transform = '';
      needle.style.opacity = String(IDLE_OPACITY);
    }
  };

  onMount(() => {
    if (!needle || typeof window === 'undefined') return;
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (reducedQuery.matches) stop();
      else start();
    };
    reducedQuery.addEventListener('change', sync);
    cleanup = () => {
      reducedQuery.removeEventListener('change', sync);
      stop();
    };
    sync();
  });

  onDestroy(() => {
    cleanup?.();
  });
</script>

<div
  bind:this={needle}
  class="needle-line-h fixed inset-x-0 top-16 md:top-20 z-40 origin-left scale-x-0"
  style="opacity: 0.4"
  aria-hidden="true"
></div>
