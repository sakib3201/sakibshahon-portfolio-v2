/**
 * Hero pointer interactions — the back piece lit by the visitor's hand:
 *  - Cursor-following gold lamplight ([data-hero-lamplight]) that the pointer
 *    aims like a lamp over lacquer; springs back to the top wash on leave.
 *  - Spring lean of the name block ([data-hero-name]) toward the pointer.
 * Vanilla, single rAF loop, respects prefers-reduced-motion.
 */
export function initHeroMotion() {
  if (typeof window === 'undefined') return () => {};

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scene = /** @type {HTMLElement | null} */ (document.querySelector('[data-hero-scene]'));
  if (!scene) return () => {};

  const lamplight = /** @type {HTMLElement | null} */ (scene.querySelector('[data-hero-lamplight]'));
  const nameEl = /** @type {HTMLElement | null} */ (scene.querySelector('[data-hero-name]'));
  const maxLean = 4;
  const spring = 0.12;

  let rafId = 0;
  let running = false;
  let targetX = 50;
  let targetY = 0;
  let curX = 50;
  let curY = 0;

  const frame = () => {
    rafId = 0;
    curX += (targetX - curX) * spring;
    curY += (targetY - curY) * spring;
    const settled = Math.abs(targetX - curX) < 0.05 && Math.abs(targetY - curY) < 0.05;
    if (settled) {
      curX = targetX;
      curY = targetY;
    }
    if (lamplight) {
      lamplight.style.backgroundPosition = `${curX.toFixed(2)}% ${curY.toFixed(2)}%`;
    }
    if (nameEl) {
      const px = ((curX - 50) / 50) * maxLean;
      const py = -((curY - 50) / 50) * maxLean;
      nameEl.style.transform = `rotateY(${px.toFixed(2)}deg) rotateX(${py.toFixed(2)}deg)`;
    }
    if (!settled) {
      rafId = window.requestAnimationFrame(frame);
    } else {
      running = false;
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    rafId = window.requestAnimationFrame(frame);
  };

  /** @param {number} clientX @param {number} clientY */
  const aim = (clientX, clientY) => {
    const rect = scene.getBoundingClientRect();
    if (rect.width === 0) return;
    targetX = ((clientX - rect.left) / rect.width) * 100;
    targetY = ((clientY - rect.top) / rect.height) * 100;
    start();
  };

  /** @param {PointerEvent} e */
  const onPointerMove = (e) => aim(e.clientX, e.clientY);
  /** @param {PointerEvent} e */
  const onPointerDown = (e) => aim(e.clientX, e.clientY);
  const onPointerLeave = () => {
    targetX = 50;
    targetY = 0;
    start();
  };

  const stop = () => {
    if (rafId > 0) window.cancelAnimationFrame(rafId);
    rafId = 0;
    running = false;
    scene.removeEventListener('pointermove', onPointerMove);
    scene.removeEventListener('pointerdown', onPointerDown);
    scene.removeEventListener('pointerleave', onPointerLeave);
    if (lamplight) lamplight.style.backgroundPosition = '';
    if (nameEl) nameEl.style.transform = '';
  };

  const startListeners = () => {
    scene.addEventListener('pointermove', onPointerMove, { passive: true });
    scene.addEventListener('pointerdown', onPointerDown, { passive: true });
    scene.addEventListener('pointerleave', onPointerLeave, { passive: true });
  };

  const syncWithMotionPreference = () => {
    stop();
    if (!reducedQuery.matches) startListeners();
  };

  reducedQuery.addEventListener('change', syncWithMotionPreference);
  syncWithMotionPreference();

  return () => {
    reducedQuery.removeEventListener('change', syncWithMotionPreference);
    stop();
  };
}
