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

<section id="products" class="scroll-mt-24 relative bg-lacquer text-inktext py-20 lg:py-28 overflow-hidden">
  <div class="needle-line-h absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16" data-reveal>
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">
        Products I've Shipped
      </h2>
      <div class="skin-sheet inline-block mt-6 px-5 py-2 rounded-sm rotate-[0.4deg]">
        <p class="brush text-inkonpaper text-base md:text-lg">
          Shipped at Arraytics across SaaS and WordPress — booking, events, restaurants, and AI. Every metric below
          comes from my own contributions unless labeled as product context.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
      {#each productsShipped as product, i (product.name)}
        <div data-reveal data-reveal-delay={i * 40}>
          <article
            class="lacquer-raised gold-edge group relative flex h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-deep neon-rim"
          >
            <div class="w-10 flex-shrink-0 flex flex-col items-center justify-between py-4 bg-black/30" aria-hidden="true">
              <span class="needle-line h-8 opacity-50"></span>
              <span
                class="brush gold-text text-xs"
                style="writing-mode: vertical-rl; transform: rotate(180deg);"
              >
                {product.name}
              </span>
              <span class="marginalia text-goldbright text-[0.55rem]">N°</span>
            </div>

            <div class="flex-1 p-6 md:p-7 min-w-0">
              <div class="flex items-start justify-between gap-3 mb-4">
                <h3 class="brush gold-text text-2xl leading-tight">{product.name}</h3>
                <span class="hanko rounded-sm px-2.5 py-1 brush text-base flex-shrink-0">
                  {product.tag}
                </span>
              </div>

              <div class="h-24 mb-5 overflow-hidden rounded-sm bg-sumi border border-gold/30">
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
                      class="medallion flex items-center justify-center w-16 h-16 brush text-2xl text-sumi"
                      aria-hidden="true"
                    >
                      {monogram(product.name)}
                    </span>
                    <span class="sr-only">{product.name}</span>
                  </div>
                {/if}
              </div>

              <p class="text-inktextdim leading-relaxed mb-4 text-[1.05rem]">{product.description}</p>

              <p class="brush italic gold-text mb-4 text-[1.02rem]">{product.role}</p>

              <ul class="space-y-2 mb-5">
                {#each product.metrics as metric (metric)}
                  <li class="flex items-start gap-2.5 text-sm md:text-[0.95rem] text-inktextdim">
                    <svg class="w-[0.6rem] h-[0.6rem] mt-1.5 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" /></svg>
                    <span>{metric}</span>
                  </li>
                {/each}
              </ul>

              {#if product.productContext}
                <p class="marginalia text-inktextdim italic normal-case mb-4">{product.productContext}</p>
              {/if}

              <a
                href={product.links.product}
                target="_blank"
                rel="noopener noreferrer"
                class="gold-plate inline-flex items-center gap-2 px-4 py-2 text-sumi hover:text-black brush transition-all duration-300 hover:-translate-y-0.5"
              >
                Visit product
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      {/each}
    </div>
  </div>
</section>
