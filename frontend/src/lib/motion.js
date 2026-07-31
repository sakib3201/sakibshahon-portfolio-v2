const REVEAL_DURATION_MS = 700;

export function initMotion() {
  if (typeof window === 'undefined') return () => {};

  const html = document.documentElement;
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  /** @type {Array<() => void>} */
  const observerCleanups = [];
  /** @type {Array<() => void>} */
  const baseCleanups = [];
  /** @type {Array<number>} */
  const timers = [];

  const clearTimers = () => {
    while (timers.length > 0) {
      window.clearTimeout(timers.pop());
    }
  };

  const showAllReveals = () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-visible');
      const target = /** @type {HTMLElement} */ (el);
      target.style.transitionDelay = '';
    });
  };

  const observeReveals = () => {
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = /** @type {HTMLElement} */ (entry.target);
            const delay = Number(el.dataset.revealDelay ?? 0);
            if (delay > 0) {
              el.style.transitionDelay = `${delay}ms`;
              timers.push(
                window.setTimeout(() => {
                  el.style.transitionDelay = '';
                }, delay + REVEAL_DURATION_MS)
              );
            }
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    observerCleanups.push(() => observer.disconnect());
  };

  const syncWithMotionPreference = () => {
    if (reducedQuery.matches) {
      html.classList.remove('motion-init');
      observerCleanups.splice(0).forEach((fn) => fn());
      clearTimers();
      showAllReveals();
    } else {
      html.classList.add('motion-init');
      document
        .querySelectorAll('[data-reveal].is-visible')
        .forEach((el) => el.classList.remove('is-visible'));
      observerCleanups.splice(0).forEach((fn) => fn());
      observeReveals();
    }
  };

  reducedQuery.addEventListener('change', syncWithMotionPreference);
  baseCleanups.push(() => reducedQuery.removeEventListener('change', syncWithMotionPreference));

  syncWithMotionPreference();

  if (!reducedQuery.matches && window.matchMedia('(pointer: fine)').matches) {
    const tiltEls = /** @type {Array<HTMLElement>} */ (
      Array.from(document.querySelectorAll('[data-tilt]'))
    );
    /** @param {PointerEvent} e */
    const onMove = (e) => {
      const el = /** @type {HTMLElement} */ (e.currentTarget);
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const max = Number(el.dataset.tiltMax ?? 10);
      el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateZ(0)`;
    };
    /** @param {PointerEvent} e */
    const onLeave = (e) => {
      const el = /** @type {HTMLElement} */ (e.currentTarget);
      el.style.transform = '';
    };
    tiltEls.forEach((el) => {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    });
    baseCleanups.push(() => {
      tiltEls.forEach((el) => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }

  if (!reducedQuery.matches && 'IntersectionObserver' in window) {
    const loopEls = /** @type {Array<HTMLElement>} */ (
      Array.from(
        document.querySelectorAll(
          '.shimmer, .medallion-float, .draw-needle, .loop-pause, [data-loop-pause]'
        )
      )
    );
    if (loopEls.length > 0) {
      loopEls.forEach((el) => {
        el.style.animationPlayState = 'paused';
      });
      const loopObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = /** @type {HTMLElement} */ (entry.target);
            el.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
          }
        },
        { threshold: 0 }
      );
      loopEls.forEach((el) => loopObserver.observe(el));
      observerCleanups.push(() => loopObserver.disconnect());
    }
  }

  return () => {
    baseCleanups.splice(0).forEach((fn) => fn());
    observerCleanups.splice(0).forEach((fn) => fn());
    clearTimers();
  };
}

const PARALLAX_DEFAULT_MAX = 24;

export function initParallax() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {};

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nodes = /** @type {Array<HTMLElement>} */ (
    Array.from(document.querySelectorAll('[data-parallax]'))
  );
  if (nodes.length === 0) return () => {};

  /** @type {Array<() => void>} */
  const cleanups = [];
  /** @type {Map<HTMLElement, number>} */
  const maxOffsets = new Map();
  /** @type {Set<HTMLElement>} */
  const active = new Set();
  let rafId = 0;
  let framePending = false;

  nodes.forEach((el) => {
    const parsed = Number(el.dataset.parallaxMax ?? PARALLAX_DEFAULT_MAX);
    const clamped = Number.isFinite(parsed)
      ? Math.min(Math.max(parsed, 0), PARALLAX_DEFAULT_MAX)
      : PARALLAX_DEFAULT_MAX;
    maxOffsets.set(el, clamped);
  });

  /** @param {HTMLElement} el */
  const clearNode = (el) => {
    el.style.transform = '';
    el.style.willChange = '';
  };

  const update = () => {
    framePending = false;
    if (active.size === 0) return;
    const vh = window.innerHeight;
    const range = vh * 0.75;
    for (const el of active) {
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) continue;
      const centerDelta = rect.top + rect.height / 2 - vh / 2;
      const t = Math.max(-1, Math.min(1, centerDelta / range));
      const offset = Math.round(-t * (maxOffsets.get(el) ?? PARALLAX_DEFAULT_MAX));
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  };

  const scheduleUpdate = () => {
    if (framePending) return;
    framePending = true;
    rafId = window.requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = /** @type {HTMLElement} */ (entry.target);
        if (entry.isIntersecting) {
          active.add(el);
          el.style.willChange = 'transform';
        } else {
          active.delete(el);
          clearNode(el);
        }
      }
      scheduleUpdate();
    },
    { threshold: 0 }
  );

  const onViewportChange = () => scheduleUpdate();
  const start = () => {
    nodes.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange, { passive: true });
    scheduleUpdate();
  };
  const stop = () => {
    if (rafId > 0) window.cancelAnimationFrame(rafId);
    rafId = 0;
    framePending = false;
    active.clear();
    observer.disconnect();
    window.removeEventListener('scroll', onViewportChange);
    window.removeEventListener('resize', onViewportChange);
    nodes.forEach(clearNode);
  };
  const syncWithMotionPreference = () => {
    if (reducedQuery.matches) stop();
    else start();
  };

  reducedQuery.addEventListener('change', syncWithMotionPreference);
  cleanups.push(() => {
    reducedQuery.removeEventListener('change', syncWithMotionPreference);
    stop();
  });

  syncWithMotionPreference();

  return () => {
    cleanups.splice(0).forEach((fn) => fn());
  };
}
