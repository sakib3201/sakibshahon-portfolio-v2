<script>
  import { experience } from "$lib/data.js";

  const imageFailed = /** @type {Record<string, boolean>} */ ($state({}));
</script>

<section class="relative bg-ink text-paper py-20 lg:py-28">
  <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="embossed serif font-semibold text-4xl md:text-6xl tracking-[-0.02em]">The ledger</h2>
      <p class="marginalia text-linendim mt-5">Four years of shipped work, bound in order</p>
    </div>

    <div class="relative">
      <div class="stitch-v absolute left-5 md:left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-60" aria-hidden="true"></div>

      <div class="space-y-12 md:space-y-16">
        {#each experience as entry, i (entry.company)}
          <div class="relative md:grid md:grid-cols-2 md:gap-16">
            <div class="absolute left-5 md:left-1/2 top-2 -translate-x-1/2" aria-hidden="true">
              <span class="block w-3 h-3 rounded-full plate border border-black/50"></span>
            </div>

            <div class={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}>
              <article
                class={`relative rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  entry.highlight ? "leather-sheet" : "paper-sheet"
                }`}
              >
                <div class={`p-6 md:p-8 ${entry.highlight ? "" : "text-inkonpaper"}`}>
                  <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-paper border border-black/30">
                        {#if entry.logo && !imageFailed[entry.company]}
                          <img
                            src={entry.logo}
                            alt="{entry.company} logo"
                            class="h-full w-full object-contain p-1.5"
                            loading="lazy"
                            onerror={() => (imageFailed[entry.company] = true)}
                          />
                        {:else}
                          <span
                            class="plate flex items-center justify-center w-full h-full serif text-lg font-semibold text-foilbright"
                            aria-hidden="true"
                          >
                            {entry.company[0]}
                          </span>
                        {/if}
                      </div>
                      <div>
                        <h3 class={`serif text-xl font-semibold leading-tight ${entry.highlight ? "text-foilbright" : "text-inkonpaper"}`}>
                          {entry.company}
                        </h3>
                        <p class={`serif italic ${entry.highlight ? "text-linen" : "text-inkonpaper/75"}`}>
                          {entry.role}
                        </p>
                      </div>
                    </div>
                    <span class="plate rounded-sm px-3 py-1.5 marginalia text-paper/90 flex-shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  {#if entry.badge}
                    <span
                      class={`inline-block px-3 py-1 marginalia rounded-sm mb-4 ${
                        entry.highlight ? "bg-seal text-paper" : "bg-seal text-paper"
                      }`}
                    >
                      ● {entry.badge}
                    </span>
                  {/if}

                  <p class={`leading-relaxed mb-5 text-[1.02rem] ${entry.highlight ? "text-linen" : "text-inkonpaper/85"}`}>
                    {entry.description}
                  </p>

                  {#if entry.metrics.length}
                    <ul class="space-y-2 mb-5">
                      {#each entry.metrics as metric (metric)}
                        <li class={`flex items-start gap-2.5 text-[0.95rem] ${entry.highlight ? "text-linen" : "text-inkonpaper/90"}`}>
                          <span class={entry.highlight ? "text-foil" : "text-leatherdeep"} aria-hidden="true">✦</span>
                          <span>{metric}</span>
                        </li>
                      {/each}
                    </ul>
                  {/if}

                  {#if entry.tags.length}
                    <div class="flex flex-wrap gap-2">
                      {#each entry.tags as tag (tag)}
                        <span
                          class={`marginalia px-2.5 py-1 rounded-sm border normal-case ${
                            entry.highlight
                              ? "border-thread/40 text-linen"
                              : "border-inkonpaper/25 text-inkonpaper/80"
                          }`}
                        >
                          {tag}
                        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </article>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
