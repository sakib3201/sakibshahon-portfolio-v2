<script>
  import { experience } from "$lib/data.js";

  const imageFailed = /** @type {Record<string, boolean>} */ ($state({}));
</script>

<section class="relative bg-sumi text-inktext py-20 lg:py-28">
  <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16" data-reveal>
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">The ledger</h2>
      <p class="marginalia text-inktextdim mt-5">Four years of shipped work, inked in order</p>
    </div>

    <div class="relative">
      <div class="needle-line absolute left-5 md:left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-60" aria-hidden="true"></div>

      <div class="space-y-12 md:space-y-16">
        {#each experience as entry, i (entry.company)}
          <div class="relative md:grid md:grid-cols-2 md:gap-16" data-reveal data-reveal-delay={i * 60}>
            <div class="absolute left-5 md:left-1/2 top-2 -translate-x-1/2" aria-hidden="true">
              <span class="medallion block w-3 h-3"></span>
            </div>

            <div class={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}>
              <article
                class={`relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-deep neon-rim ${
                  entry.highlight ? "lacquer-raised gold-edge" : "skin-sheet"
                }`}
              >
                <div class={`p-6 md:p-8 ${entry.highlight ? "" : "text-inkonpaper"}`}>
                  <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 flex-shrink-0 overflow-hidden bg-sumi border border-gold/30">
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
                            class="medallion flex items-center justify-center w-full h-full brush text-lg text-sumi"
                            aria-hidden="true"
                          >
                            {entry.company[0]}
                          </span>
                        {/if}
                      </div>
                      <div>
                        <h3 class={`brush text-xl leading-tight ${entry.highlight ? "gold-text" : "text-inkonpaper"}`}>
                          {entry.company}
                        </h3>
                        <p class={`brush italic ${entry.highlight ? "text-inktextdim" : "text-inkonpaper/75"}`}>
                          {entry.role}
                        </p>
                      </div>
                    </div>
                    <span class="gold-plate px-3 py-1.5 marginalia text-sumi flex-shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  {#if entry.badge}
                    <span class="hanko inline-block px-3 py-1 marginalia mb-4">
                      {entry.badge}
                    </span>
                  {/if}

                  <p class={`leading-relaxed mb-5 text-[1.02rem] ${entry.highlight ? "text-inktextdim" : "text-inkonpaper/85"}`}>
                    {entry.description}
                  </p>

                  {#if entry.metrics.length}
                    <ul class="space-y-2 mb-5">
                      {#each entry.metrics as metric (metric)}
                        <li class={`flex items-start gap-2.5 text-[0.95rem] ${entry.highlight ? "text-inktextdim" : "text-inkonpaper/90"}`}>
                          <svg class={`w-[0.6rem] h-[0.6rem] mt-1.5 flex-shrink-0 ${entry.highlight ? "text-gold" : "text-golddeep"}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" /></svg>
                          <span>{metric}</span>
                        </li>
                      {/each}
                    </ul>
                  {/if}

                  {#if entry.tags.length}
                    <div class="flex flex-wrap gap-2">
                      {#each entry.tags as tag (tag)}
                        <span
                          class={`marginalia px-2.5 py-1 border normal-case ${
                            entry.highlight
                              ? "border-gold/40 text-inktextdim"
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
