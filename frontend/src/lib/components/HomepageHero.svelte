<script>
  import { onDestroy, onMount } from "svelte";
  import { siteMeta, productsShipped } from "$lib/data.js";
  import { initHeroMotion } from "$lib/heroMotion.js";

  const name = siteMeta.name;

  const ctas = [
    { href: "#products", text: "See the shipped work" },
    { href: siteMeta.resumeUrl, text: "Download résumé", external: true },
    { href: "#contact", text: "Request an audience" }
  ];

  let entrancePlayed = false;
  let hankoEl = /** @type {HTMLSpanElement | undefined} */ (undefined);
  let destroyHeroMotion = () => {};
  let quoteOpen = false;

  const stampWord = "鍛錬";
  const stampQuote = {
    jp: "七転び八起き",
    en: "Fall seven times, rise eight"
  };
  const stampAriaLabel = `Motivational seal: ${stampWord} — ${stampQuote.jp}: ${stampQuote.en}`;

  function toggleQuote() {
    quoteOpen = !quoteOpen;
  }

  onMount(() => {
    destroyHeroMotion = initHeroMotion();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let played = false;
    try {
      played = sessionStorage.getItem("hero-entrance-played") === "1";
    } catch {
      played = false;
    }
    if (played) return;
    try {
      sessionStorage.setItem("hero-entrance-played", "1");
    } catch {
      played = false;
    }
    entrancePlayed = true;
  });

  onDestroy(() => destroyHeroMotion());

  function restampHanko() {
    if (!hankoEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hankoEl.classList.remove("hero-restamp");
    void hankoEl.offsetWidth;
    hankoEl.classList.add("hero-restamp");
  }

  /** @param {AnimationEvent & { currentTarget: HTMLElement }} e */
  function onSettleEnd(e) {
    if (e.animationName === "hero-settle") e.currentTarget.classList.remove("hero-settle");
  }

  /** @param {AnimationEvent & { currentTarget: HTMLElement }} e */
  function onNameRiseEnd(e) {
    if (e.animationName === "hero-name-rise") e.currentTarget.classList.remove("hero-name-rise");
  }

  /** @param {AnimationEvent & { currentTarget: HTMLElement }} e */
  function onMottoRiseEnd(e) {
    if (e.animationName === "hero-motto-rise") e.currentTarget.classList.remove("hero-motto-rise");
  }

  /** @param {AnimationEvent & { currentTarget: HTMLElement }} e */
  function onHankoEnd(e) {
    if (e.animationName !== "hero-hanko-stamp") return;
    e.currentTarget.classList.replace("hero-entering", "hero-entered");
  }
</script>

<section class="relative sumi-ground text-inktext overflow-hidden" data-hero-scene>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.14) 0%, rgba(201,162,94,0.04) 55%, transparent 100%);"
    aria-hidden="true"
  ></div>
  <div
    class="hero-lamplight absolute inset-0 pointer-events-none"
    data-hero-lamplight
    aria-hidden="true"
  ></div>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(120% 60% at 50% 115%, rgba(255,61,110,0.06) 0%, transparent 55%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-0">
    <div class="text-center">
      <div
        class="perspective-scene {entrancePlayed ? 'hero-settle' : ''}"
        onanimationend={onSettleEnd}
      >
        <div class="medallion-float relative" onpointerdown={restampHanko}>
          <div class="hero-name-block" data-hero-name>
            <h1
              class="brush gold-text text-5xl md:text-7xl lg:text-8xl leading-tight tracking-[0.02em] {entrancePlayed ? 'hero-name-rise' : ''}"
              onanimationend={onNameRiseEnd}
            >
              {name}
            </h1>
            <button
              type="button"
              class="hero-stamp-group group absolute -top-2 right-0 p-0 m-0 border-0 bg-transparent cursor-pointer"
              class:is-quote-open={quoteOpen}
              aria-label={stampAriaLabel}
              aria-expanded={quoteOpen}
              onclick={toggleQuote}
            >
              <span
                bind:this={hankoEl}
                class="hanko hero-hanko inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 {entrancePlayed ? 'hero-entering' : ''}"
                aria-hidden="true"
                onanimationend={onHankoEnd}
              >
                <span class="brush flex flex-col items-center leading-none text-[0.8rem] md:text-[0.95rem]">
                  <span>{stampWord[0]}</span>
                  <span>{stampWord[1]}</span>
                </span>
              </span>
              <span class="hero-quote skin-sheet rounded-sm px-4 py-3" aria-hidden="true">
                <span class="block brush gold-text text-base md:text-lg">{stampQuote.jp}</span>
                <span class="mt-1.5 block needle-line-h opacity-50" aria-hidden="true"></span>
                <span class="mt-2 block marginalia text-inkonpaper normal-case whitespace-nowrap">{stampQuote.en}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <p class="marginalia text-goldbright mt-4">{siteMeta.role}</p>

      <div
        class="motto-band inline-block mt-6 px-7 py-2.5 rotate-[-0.6deg] neon-rim"
        aria-label={siteMeta.tagline}
      >
        <p class="brush text-lg md:text-2xl gold-text">
          The <span class="shimmer">“CAN DO”</span> Software Artisan
        </p>
      </div>

      <p class="max-w-2xl mx-auto mt-5 text-lg md:text-xl text-inktextdim leading-relaxed">
        I build AI-powered WordPress and SaaS products. The same engineering behind 20k+ plugin installs
        and ~35% lower AI costs — now available for your project.
      </p>

      <div class="flex flex-wrap justify-center gap-4 md:gap-5 mt-8 pb-10">
            {#each ctas as item (item.href)}
          <a
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            class={`inline-flex items-center gap-2 px-6 py-2.5 brush text-lg transition-all duration-300 ${
              item.text === "See the shipped work"
                ? "gold-plate text-sumi hover:text-black hover:-translate-y-0.5 hover:shadow-xl"
                : "gold-edge text-goldbright hover:text-white hover:-translate-y-0.5 neon-rim"
            }`}
          >
            {item.text}
            {#if item.external}
              <svg class="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            {/if}
          </a>
        {/each}
      </div>
    </div>

    <div
      class="perspective-scene {entrancePlayed ? 'hero-motto-rise' : ''}"
      onanimationend={onMottoRiseEnd}
    >
      <div class="motto-band px-4 sm:px-8 pt-5 pb-1">
        <div class="needle-line-h mb-4 opacity-60" aria-hidden="true"></div>
        <p class="marginalia text-gold/80 text-center mb-4">Inked on the back piece — shipped and running</p>
        <ul
          class="flex flex-wrap justify-center items-center gap-3 md:gap-4"
          aria-label="Products inked on the back piece"
        >
          {#each productsShipped as product, i (product.name)}
            <li class="group relative perspective-scene parallax-node" data-parallax data-parallax-max="14">
              <a
                href="#products"
                class="depth-card block"
                data-tilt
                data-tilt-max="12"
                aria-label="{product.name} — view product"
              >
                <span class="sr-only">{product.name}</span>
                <span
                  class="hero-plaque lacquer-raised gold-edge block rounded-full px-5 py-3 md:px-6 md:py-3.5"
                  aria-hidden="true"
                >
                  <span class="flex items-center gap-3 md:gap-4">
                    <span class="needle-line h-4 flex-shrink-0"></span>
                    <span class="brush gold-text text-sm md:text-base whitespace-nowrap">
                      {product.name}
                    </span>
                    <span class="marginalia text-goldbright text-[0.55rem]">N°{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </span>
              </a>
            </li>
          {/each}
        </ul>
        <div class="mt-2 h-1.5" style="background: linear-gradient(90deg, transparent, rgba(201,162,94,0.4), transparent);" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</section>
