<script>
  import { siteMeta, productsShipped } from "$lib/data.js";

  const name = siteMeta.name;

  /** @param {string} title */
  const spineLabel = (title) => title.replace('AI', 'AI').replace('Timetics AI', 'Timetics AI').slice(0, 12);

  const ctas = [
    { href: "#products", text: "View the shelf" },
    { href: siteMeta.resumeUrl, text: "Download résumé", external: true },
    { href: "#contact", text: "Write to me" }
  ];
</script>

<section class="relative bg-ink text-paper overflow-hidden">
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.16) 0%, rgba(201,162,94,0.05) 55%, transparent 100%);"
    aria-hidden="true"
  ></div>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(120% 60% at 50% 110%, rgba(0,0,0,0.55) 0%, transparent 60%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">
    <div class="text-center">
      <h1 class="gilded serif font-semibold leading-tight text-5xl md:text-7xl lg:text-[5.5rem] tracking-[-0.02em]">
        {name}
      </h1>

      <p class="marginalia text-foil mt-5">{siteMeta.role}</p>

      <div
        class="paper-sheet inline-block mt-7 px-6 py-3 rounded-sm rotate-[-0.6deg]"
        aria-label={siteMeta.tagline}
      >
        <p class="serif text-xl md:text-2xl text-inkonpaper">
          The <span class="font-semibold text-leatherdeep">“CAN DO”</span> Software Artisan
        </p>
      </div>

      <p class="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-linen leading-relaxed">
        I ship AI-powered WordPress and SaaS products — including systems behind 20k+ plugin installs — and I can build
        yours.
      </p>

      <div class="flex flex-wrap justify-center gap-4 md:gap-5 mt-10 pb-16">
        {#each ctas as item (item.href)}
          <a
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            class={`inline-flex items-center gap-2 px-7 py-3 serif text-lg transition-all duration-300 ${
              item.text === "View the shelf"
                ? "ribbon text-foilbright hover:text-white hover:-translate-y-0.5 hover:shadow-xl"
                : "border border-thread/50 text-linen hover:text-foilbright hover:border-foil/80 hover:-translate-y-0.5"
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

    <div class="wood-shelf rounded-t-sm px-4 sm:px-8 pt-6 pb-1">
      <div class="stitch-t mb-5 opacity-60" aria-hidden="true"></div>
      <p class="marginalia text-foil/80 text-center mb-4">On the shelf — shipped and running</p>
      <ul
        class="flex flex-wrap justify-center items-end gap-4 md:gap-5"
        aria-label="Products on the shelf"
      >
        {#each productsShipped as product, i (product.name)}
          <li class="group relative">
            <a
              href="#products"
              class="block"
              aria-label="{product.name} — view product"
            >
              <span class="sr-only">{product.name}</span>
              <span
                class="volume block w-[2.9rem] md:w-14 h-40 md:h-52 rounded-r-md transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl"
                style="background: linear-gradient(90deg, #2a1a0e 0%, #3c2413 12%, #6d4327 45%, #5a351e 100%); box-shadow: inset 3px 0 0 rgba(255,205,150,0.14), 4px 6px 12px rgba(0,0,0,0.5);"
                aria-hidden="true"
              >
                <span
                  class="flex flex-col items-center justify-between h-full py-4"
                >
                  <span class="stitch-v h-4 opacity-60"></span>
                  <span
                    class="serif text-foilbright/95 text-sm md:text-base font-medium"
                    style="writing-mode: vertical-rl; transform: rotate(180deg); text-shadow: 0 1px 0 rgba(255,240,205,0.25);"
                  >
                    {spineLabel(product.name)}
                  </span>
                  <span class="marginalia text-thread/70 text-[0.55rem]">N°{String(i + 1).padStart(2, "0")}</span>
                </span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
      <div class="mt-2 h-2 wood-shelf" aria-hidden="true"></div>
    </div>
  </div>
</section>
