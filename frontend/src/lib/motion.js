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
    } else if (!html.classList.contains('motion-init')) {
      html.classList.add('motion-init');
      document
        .querySelectorAll('[data-reveal].is-visible')
        .forEach((el) => el.classList.remove('is-visible'));
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

  return () => {
    baseCleanups.splice(0).forEach((fn) => fn());
    observerCleanups.splice(0).forEach((fn) => fn());
    clearTimers();
  };
}
