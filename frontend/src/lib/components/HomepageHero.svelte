<script>
  import { siteMeta, productsShipped } from "$lib/data.js";

  const name = siteMeta.name;

  const ctas = [
    { href: "#products", text: "See the ink" },
    { href: siteMeta.resumeUrl, text: "Download résumé", external: true },
    { href: "#contact", text: "Request an audience" }
  ];
</script>

<section class="relative sumi-ground text-inktext overflow-hidden">
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.14) 0%, rgba(201,162,94,0.04) 55%, transparent 100%);"
    aria-hidden="true"
  ></div>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(120% 60% at 50% 115%, rgba(255,61,110,0.06) 0%, transparent 55%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-0">
    <div class="text-center">
      <div class="perspective-scene">
        <h1
          class="brush gold-text text-5xl md:text-7xl lg:text-8xl leading-tight tracking-[0.02em]"
        >
          {name}
        </h1>
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
        I ship AI-powered WordPress and SaaS products — including systems behind 20k+ plugin installs — and I can build
        yours.
      </p>

      <div class="flex flex-wrap justify-center gap-4 md:gap-5 mt-8 pb-10">
        {#each ctas as item (item.href)}
          <a
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            class={`inline-flex items-center gap-2 px-6 py-2.5 brush text-lg transition-all duration-300 ${
              item.text === "See the ink"
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

    <div class="perspective-scene">
      <div class="motto-band px-4 sm:px-8 pt-5 pb-1">
        <div class="needle-line-h mb-4 opacity-60" aria-hidden="true"></div>
        <p class="marginalia text-gold/80 text-center mb-4">Inked on the back piece — shipped and running</p>
        <ul
          class="flex flex-wrap justify-center items-end gap-3 md:gap-4"
          aria-label="Products inked on the back piece"
        >
          {#each productsShipped as product, i (product.name)}
            <li class="group relative perspective-scene">
              <a
                href="#products"
                class="depth-card block"
                data-tilt
                data-tilt-max="12"
                aria-label="{product.name} — view product"
              >
                <span class="sr-only">{product.name}</span>
                <span
                  class="lacquer-raised gold-edge block w-[2.9rem] md:w-14 h-40 md:h-52 rounded-t-full"
                  aria-hidden="true"
                >
                  <span class="flex flex-col items-center justify-between h-full py-4">
                    <span class="needle-line h-4"></span>
                    <span
                      class="brush gold-text text-sm md:text-base"
                      style="writing-mode: vertical-rl; transform: rotate(180deg);"
                    >
                      {product.name}
                    </span>
                    <span class="marginalia text-gold/70 text-[0.55rem]">N°{String(i + 1).padStart(2, "0")}</span>
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
