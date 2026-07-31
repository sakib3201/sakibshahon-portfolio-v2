<script>
  import { onMount } from 'svelte';
  import { productsShipped } from '$lib/data.js';

  const imageFailed = /** @type {Record<string, boolean>} */ ($state({}));

  /** @param {string} name */
  const monogram = (name) =>
    name
      .split(' ')
      .filter((w) => /[A-Za-z]/.test(w[0]))
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  onMount(() => {
    for (const product of productsShipped) {
      const img = /** @type {HTMLImageElement | null} */ (
        document.querySelector(`img[src="${product.image}"]`)
      );
      if (product.image && img && img.complete && img.naturalWidth === 0) {
        imageFailed[product.name] = true;
      }
    }
  });
</script>

<section id="products" class="scroll-mt-24 relative bg-ground text-paper py-20 lg:py-28 overflow-hidden">
  <div class="stitch-t absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="embossed serif font-semibold text-4xl md:text-6xl tracking-[-0.02em]">
        Products I've Shipped
      </h2>
      <div class="paper-sheet inline-block mt-6 px-5 py-2 rounded-sm rotate-[0.4deg]">
        <p class="serif text-inkonpaper text-base md:text-lg">
          Work at Arraytics across SaaS and WordPress — booking, events, restaurants, and AI. Metrics below are from my
          contributions unless labeled as product context.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
      {#each productsShipped as product (product.name)}
        <article
          class="leather-sheet group relative flex rounded-r-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="w-10 flex-shrink-0 flex flex-col items-center justify-between py-4 bg-black/25" aria-hidden="true">
            <span class="stitch-v h-8 opacity-50"></span>
            <span
              class="serif text-foilbright/90 text-xs font-medium"
              style="writing-mode: vertical-rl; transform: rotate(180deg);"
            >
              {product.name}
            </span>
            <span class="marginalia text-thread/60 text-[0.55rem]">N°</span>
          </div>

          <div class="flex-1 p-6 md:p-7 min-w-0">
            <div class="flex items-start justify-between gap-3 mb-4">
              <h3 class="embossed serif text-2xl leading-tight">{product.name}</h3>
              <span class="paper-sheet rounded-sm px-2.5 py-1 marginalia text-inkonpaper flex-shrink-0">
                {product.tag}
              </span>
            </div>

            <div class="h-24 mb-5 overflow-hidden rounded-sm bg-paper/95 border border-black/30">
              {#if product.image && !imageFailed[product.name]}
                <img
                  src={product.image}
                  alt="{product.name} logo"
                  class="h-full w-full object-contain p-3"
                  loading="lazy"
                  onerror={() => (imageFailed[product.name] = true)}
                />
              {:else}
                <div class="flex items-center justify-center h-full">
                  <span
                    class="plate flex items-center justify-center w-16 h-16 rounded-sm serif text-2xl font-semibold text-foilbright"
                    aria-hidden="true"
                  >
                    {monogram(product.name)}
                  </span>
                  <span class="sr-only">{product.name}</span>
                </div>
              {/if}
            </div>

            <p class="serif text-linen leading-relaxed mb-4 text-[1.05rem]">{product.description}</p>

            <p class="serif italic text-foilbright mb-4 text-[1.02rem]">{product.role}</p>

            <ul class="space-y-2 mb-5">
              {#each product.metrics as metric (metric)}
                <li class="flex items-start gap-2.5 text-sm md:text-[0.95rem] text-linen">
                  <svg class="diamond text-foil mt-1.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" /></svg>
                  <span>{metric}</span>
                </li>
              {/each}
            </ul>

            {#if product.productContext}
              <p class="marginalia text-linendim italic normal-case mb-4">{product.productContext}</p>
            {/if}

            <a
              href={product.links.product}
              target="_blank"
              rel="noopener noreferrer"
              class="ribbon inline-flex items-center gap-2 px-4 py-2 text-foilbright hover:text-white serif transition-all duration-300 hover:-translate-y-0.5"
            >
              Visit product
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
