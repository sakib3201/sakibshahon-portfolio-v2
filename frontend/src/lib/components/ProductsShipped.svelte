<script>
  import { onMount } from 'svelte';
  import { productsShipped } from '$lib/data.js';

  const imageFailed = /** @type {Record<string, boolean>} */ ($state({}));

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

<section
  id="products"
  class="scroll-mt-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-20 relative overflow-hidden"
>
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Products I've Shipped
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Work at Arraytics across SaaS and WordPress — booking, events, restaurants, and AI. Metrics below are from my
        contributions unless labeled as product context.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each productsShipped as product (product.name)}
        <article
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2"
        >
          <div class="relative h-28 overflow-hidden bg-white">
            {#if product.image && !imageFailed[product.name]}
              <img
                src={product.image}
                alt="{product.name} logo"
                class="h-full w-full object-contain p-4"
                loading="lazy"
                onerror={() => (imageFailed[product.name] = true)}
              />
            {:else}
              <div class="flex items-center justify-center h-full">
                <span class="bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl">{product.name}</span>
              </div>
            {/if}
            <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
          </div>

          <div class="p-6 relative">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 class="text-xl font-bold text-white">{product.name}</h3>
              <span class="text-xs font-semibold text-cyan-400 bg-slate-800/60 px-3 py-1 rounded-full">
                {product.tag}
              </span>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed mb-4">{product.description}</p>

            <p class="text-sm font-medium text-cyan-400 mb-4">{product.role}</p>

            <ul class="space-y-2 mb-4">
              {#each product.metrics as metric (metric)}
                <li class="flex items-start text-sm text-slate-300">
                  <span class="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                  <span>{metric}</span>
                </li>
              {/each}
            </ul>

            {#if product.productContext}
              <p class="text-xs text-slate-400 italic mb-4">{product.productContext}</p>
            {/if}

            <a
              href={product.links.product}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
            >
              Visit product ↗
            </a>
          </div>

          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
        </article>
      {/each}
    </div>
  </div>
</section>
