<script>
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { siteMeta, productsShipped } from "$lib/data.js";
  import { initHeroMotion } from "$lib/heroMotion.js";

  const name = siteMeta.name;
  const nameWords = name.split(" ");

  const ctas = [
    { href: "#products", text: "See the shipped work" },
    { href: siteMeta.resumeUrl, text: "Download résumé", external: true },
    { href: "#contact", text: "Request an audience" }
  ];

  const stampWord = "鍛錬";
  const punchWords = ["The", "“CAN DO”", "Software", "Artisan"];
  const stampQuotes = [
    { jp: "七転び八起き", romaji: "Nana korobi ya oki", en: "Fall seven times, rise eight" },
    { jp: "継続は力なり", romaji: "Keizoku wa chikara nari", en: "Persistence is power" },
    { jp: "石の上にも三年", romaji: "Ishi no ue ni mo sannen", en: "Sit on a stone for three years" },
    { jp: "雨降って地固まる", romaji: "Ame futte chi katamaru", en: "After the rain, the ground hardens" },
    { jp: "一事が万事", romaji: "Ichiji ga banji", en: "One thing reveals the whole" },
    { jp: "千里の道も一歩から", romaji: "Senri no michi mo ippo kara", en: "A thousand-mile journey begins with one step" }
  ];

  let entrancePlayed = false;
  let calligraphyOn = false;
  let entranceDone = false;
  let reducedMotion = false;
  let quoteOpen = false;
  let stampQuoteIndex = 0;
  let hankoEl = /** @type {HTMLSpanElement | undefined} */ (undefined);
  let nameH1El = /** @type {HTMLHeadingElement | undefined} */ (undefined);
  let punchlineEl = /** @type {HTMLButtonElement | undefined} */ (undefined);
  let destroyHeroMotion = () => {};
  /** @type {Array<{ left: string; size: string; dur: string; delay: string; sway: string; rot: string; opacity: string }>} */
  let sakuraPetals = [];
  /** @type {number[]} */
  const entranceTimers = [];

  function toggleQuote() {
    stampQuoteIndex = (stampQuoteIndex + 1) % stampQuotes.length;
    quoteOpen = !quoteOpen;
  }

  onMount(() => {
    destroyHeroMotion = initHeroMotion();
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) sakuraPetals = createSakura();
    if (reducedMotion) return;
    let played = false;
    try {
      played = sessionStorage.getItem("hero-entrance-played") === "1";
    } catch {
      played = false;
    }
    if (played) {
      entranceDone = true;
      return;
    }
    try {
      sessionStorage.setItem("hero-entrance-played", "1");
    } catch {
      played = false;
    }
    entrancePlayed = true;
    calligraphyOn = true;

    const words = Array.from(nameH1El?.querySelectorAll(".hero-word") ?? []);
    words.forEach((word, i) => {
      entranceTimers.push(window.setTimeout(() => word.classList.add("hero-word-in"), 350 + i * 280));
    });
    const punchWordsEls = Array.from(punchlineEl?.querySelectorAll(".punch-word") ?? []);
    punchWordsEls.forEach((word, i) => {
      entranceTimers.push(window.setTimeout(() => word.classList.add("punch-word-in"), 3700 + i * 220));
    });
    entranceTimers.push(
      window.setTimeout(() => {
        entranceDone = true;
      }, 350 + words.length * 280 + 2000)
    );
  });

  onDestroy(() => {
    destroyHeroMotion();
    entranceTimers.forEach((t) => window.clearTimeout(t));
  });

  function restampHanko() {
    if (!hankoEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hankoEl.classList.remove("hero-restamp");
    void hankoEl.offsetWidth;
    hankoEl.classList.add("hero-restamp");
  }

  function replayPunchline() {
    if (!punchlineEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(punchlineEl.querySelectorAll(".punch-word"));
    words.forEach((word) => word.classList.remove("punch-word-in"));
    punchlineEl.classList.remove("punch-entering", "punch-replay");
    void punchlineEl.offsetWidth;
    punchlineEl.classList.add("punch-entering", "punch-replay");
    words.forEach((word, i) => {
      entranceTimers.push(window.setTimeout(() => word.classList.add("punch-word-in"), 250 + i * 220));
    });
  }

  function createSakura() {
    const petals = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      petals.push({
        left: `${(2 + Math.random() * 94).toFixed(1)}%`,
        size: `${(8 + Math.random() * 8).toFixed(1)}px`,
        dur: `${(11 + Math.random() * 9).toFixed(1)}s`,
        delay: `${(Math.random() * 12).toFixed(1)}s`,
        sway: `${(Math.random() * 60 + 20).toFixed(0)}px`,
        rot: `${(Math.random() * 360 + 180).toFixed(0)}deg`,
        opacity: (0.16 + Math.random() * 0.16).toFixed(2)
      });
    }
    return petals;
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
  {#if !reducedMotion && sakuraPetals.length > 0}
    {#each sakuraPetals as petal, i (i)}
      <span
        class="hero-sakura"
        style="--s-left: {petal.left}; --s-size: {petal.size}; --s-dur: {petal.dur}; --s-delay: {petal.delay}; --s-sway: {petal.sway}; --s-rot: {petal.rot}; --s-opacity: {petal.opacity};"
        aria-hidden="true"
      ></span>
    {/each}
  {/if}
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
      <div class="relative" onpointerdown={restampHanko}>
        {#if calligraphyOn}
          <div class="hero-calligraphy-glow absolute inset-0 pointer-events-none" aria-hidden="true"></div>
        {/if}

        <h1
          bind:this={nameH1El}
          class="relative brush gold-text text-5xl md:text-7xl lg:text-8xl leading-tight tracking-[0.02em] {calligraphyOn ? 'hero-calligraphy' : ''}"
        >
          {#each nameWords as word, i (i)}
            <span class="hero-word inline-block">{word}</span>{i < nameWords.length - 1 ? ' ' : ''}
          {/each}
        </h1>

        <button
          type="button"
          class="hero-stamp-group group absolute -top-2 right-0 p-0 m-0 border-0 bg-transparent cursor-pointer"
          class:is-quote-open={quoteOpen}
          aria-label={`Motivational seal: ${stampWord} — ${stampQuotes[stampQuoteIndex].jp}: ${stampQuotes[stampQuoteIndex].en}`}
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
            {#key stampQuoteIndex}
              <span in:fade={{ duration: 220 }}>
                <span class="block marginalia text-goldbright">{stampQuotes[stampQuoteIndex].romaji}</span>
                <span class="mt-1.5 block brush gold-text text-lg">{stampQuotes[stampQuoteIndex].jp}</span>
                <span class="mt-1.5 block needle-line-h opacity-50" aria-hidden="true"></span>
                <span class="mt-2 block marginalia text-inkonpaper normal-case">{stampQuotes[stampQuoteIndex].en}</span>
              </span>
            {/key}
          </span>
        </button>

        {#if entranceDone && !reducedMotion}
          <span class="hero-guides absolute -top-2 right-0 w-0 h-0 pointer-events-none" aria-hidden="true">
            <span class="hero-guide" style="--g-rot: 26deg; left: -8.5rem; top: 0.85rem; width: 4.5rem; animation-delay: 0.2s;"></span>
            <span class="hero-guide" style="--g-rot: -10deg; left: -6.25rem; top: 1.55rem; width: 3.4rem; animation-delay: 0.8s;"></span>
            <span class="hero-guide" style="--g-rot: 56deg; left: -4.6rem; top: 2.35rem; width: 2.5rem; animation-delay: 1.4s;"></span>
          </span>
        {/if}
      </div>

      <p class="marginalia text-goldbright mt-4">{siteMeta.role}</p>

      <button
        type="button"
        bind:this={punchlineEl}
        class="hero-punchline relative motto-band inline-block mt-6 px-7 py-2.5 rotate-[-0.6deg] neon-rim cursor-pointer text-center {entrancePlayed ? 'punch-entering' : ''}"
        aria-label={siteMeta.tagline}
        onclick={replayPunchline}
      >
        <span class="punch-bloom" aria-hidden="true"></span>
        <span class="punch-ring" aria-hidden="true"></span>
        <span class="punch-ring-big" aria-hidden="true"></span>
        <p class="brush text-lg md:text-2xl gold-text">
          {#each punchWords as word, i (i)}
            <span class="punch-word {i === 1 ? 'punch-strike' : ''}">{word}</span>{i < punchWords.length - 1 ? ' ' : ''}
          {/each}
        </p>
      </button>

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
