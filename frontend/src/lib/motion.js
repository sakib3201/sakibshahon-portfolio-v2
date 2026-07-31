export function initMotion() {
  if (typeof window === 'undefined') return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** @type {Array<() => void>} */
  const cleanup = [];

  if (!reduced && 'IntersectionObserver' in window) {
    /** @type {HTMLElement[]} */
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = /** @type {HTMLElement} */ (entry.target);
            const delay = el.dataset.revealDelay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    cleanup.push(() => observer.disconnect());
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    /** @type {HTMLElement[]} */
    const tiltEls = Array.from(document.querySelectorAll('[data-tilt]'));

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
    cleanup.push(() => {
      tiltEls.forEach((el) => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }

  return () => cleanup.forEach((fn) => fn());
}
