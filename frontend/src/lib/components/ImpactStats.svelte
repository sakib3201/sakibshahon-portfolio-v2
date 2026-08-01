<script>
  import { onDestroy, onMount } from 'svelte';
  import { impactStats } from '$lib/data.js';

  const COUNT_MS = 1200;
  const STAGGER_MS = 60;

  /**
   * @typedef {{ value: string; label: string; prefix: string; number: number | null; suffix: string }} Stat
   */

  /** @type {Stat[]} */
  const stats = impactStats.map((stat) => {
    const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(String(stat.value));
    if (!match) {
      return { ...stat, prefix: '', number: null, suffix: '' };
    }
    const [, prefix = '', number = '', suffix = ''] = match;
    return { ...stat, prefix, number: Number(number), suffix };
  });

  /** @type {HTMLElement | undefined} */
  let sectionEl;
  /** @type {HTMLSpanElement[]} */
  const displayEls = [];
  /** @type {HTMLSpanElement[]} */
  const dividerEls = [];
  /** @type {Array<() => void>} */
  let cancelFns = [];
  let destroyCountUp = () => {};

  /**
   * @param {Stat} stat
   * @param {string} rendered
   */
  function format(stat, rendered) {
    return stat.prefix + rendered + stat.suffix;
  }

  /**
   * @param {Stat} stat
   * @param {HTMLSpanElement} displayEl
   * @param {HTMLSpanElement} dividerEl
   * @param {number} delayMs
   * @returns {() => void}
   */
  function countUp(stat, displayEl, dividerEl, delayMs) {
    const target = stat.number;
    if (target === null) return () => {};
    const decimals = String(target).includes('.') ? String(target).split('.')[1].length : 0;
    const startAt = window.performance.now() + delayMs;
    let rafId = 0;

    displayEl.textContent = format(stat, (0).toFixed(decimals));
    dividerEl.style.setProperty('--drawn', '0');

    /** @param {number} now */
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / COUNT_MS));
      const eased = 1 - Math.pow(1 - t, 5);
      displayEl.textContent = format(stat, (target * eased).toFixed(decimals));
      if (t < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        displayEl.textContent = format(stat, String(target));
        dividerEl.style.setProperty('--drawn', '1');
      }
    };
    rafId = window.requestAnimationFrame(step);

    return () => {
      if (rafId > 0) window.cancelAnimationFrame(rafId);
      displayEl.textContent = format(stat, String(target));
      dividerEl.style.setProperty('--drawn', '1');
    };
  }

  function startCountUp() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {};
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedQuery.matches) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            stats.forEach((stat, i) => {
              const displayEl = displayEls[i];
              const dividerEl = dividerEls[i];
              if (displayEl && dividerEl) {
                cancelFns.push(countUp(stat, displayEl, dividerEl, i * STAGGER_MS));
              }
            });
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    if (sectionEl) observer.observe(sectionEl);

    const settle = () => {
      observer.disconnect();
      cancelFns.splice(0).forEach((fn) => fn());
    };
    const onChange = () => {
      if (reducedQuery.matches) settle();
    };
    reducedQuery.addEventListener('change', onChange);

    return () => {
      settle();
      reducedQuery.removeEventListener('change', onChange);
    };
  }

  onMount(() => {
    destroyCountUp = startCountUp();
  });

  onDestroy(() => {
    destroyCountUp();
  });
</script>

<section
  bind:this={sectionEl}
  class="relative sumi-ground text-inktext py-20 lg:py-28 overflow-hidden"
>
  <div
    class="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
    style="background: radial-gradient(80% 100% at 50% 100%, rgba(201,162,94,0.08) 0%, transparent 70%);"
    aria-hidden="true"
  ></div>

  <div class="parallax-node relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-parallax>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each stats as stat, i (stat.value)}
        <li class="lacquer-raised gold-edge neon-rim px-6 py-7 text-center transition-all duration-500 hover:-translate-y-1.5">
          <div data-reveal data-reveal-delay={i * 60}>
            <span class="block">
              <span class="sr-only">{stat.value}</span>
              <span
                bind:this={displayEls[i]}
                class="block brush font-semibold text-4xl md:text-5xl shimmer"
                aria-hidden="true"
              >{stat.value}</span>
            </span>
            <span
              bind:this={dividerEls[i]}
              class="stat-needle mt-3 block needle-line-h max-w-16 mx-auto"
              aria-hidden="true"
            ></span>
            <span class="mt-3 block marginalia text-inktextdim leading-relaxed">{stat.label}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .stat-needle {
    transform: scaleX(var(--drawn, 0));
    transform-origin: center;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
</style>
