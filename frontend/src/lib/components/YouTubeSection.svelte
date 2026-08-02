<script>
  import { youtube } from '$lib/data.js';

  /** @type {{ id: string; title: string; description: string }[]} */
  const featured = youtube.featured;

  /** @type {Record<string, boolean>} */
  const imageFailed = $state({});
</script>

<section id="youtube" class="scroll-mt-24 relative bg-lacquer text-inktext py-20 lg:py-28 overflow-hidden" data-reveal>
  <div class="needle-line-h absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">
        Watch on YouTube
      </h2>
      <p class="marginalia text-inktextdim mt-5">{youtube.handle}</p>

      <div class="skin-sheet inline-block mt-6 px-5 py-2 rounded-sm rotate-[0.4deg]">
        <p class="brush text-inkonpaper text-base md:text-lg">{youtube.blurb}</p>
      </div>

      {#if youtube.freeNote}
        <p class="marginalia inline-flex items-center gap-2 mt-5 px-3.5 py-1.5 border border-gold/50 text-goldbright">
          <svg class="w-[0.6rem] h-[0.6rem] text-gold" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" /></svg>
          {youtube.freeNote}
        </p>
      {/if}

      <div class="mt-8">
        <a
          href={youtube.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2.5 gold-plate text-sumi px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:text-black"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span class="brush font-semibold tracking-wide">Subscribe on YouTube</span>
        </a>
      </div>
    </div>

    {#if featured.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
        {#each featured as item (item.id)}
          <a
            href={`https://www.youtube.com/watch?v=${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            class="lacquer-raised gold-edge group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-deep neon-rim"
          >
            <div class="relative aspect-video overflow-hidden bg-sumi">
              {#if !imageFailed[item.id]}
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                  alt="{item.title} thumbnail"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onerror={() => (imageFailed[item.id] = true)}
                />
              {:else}
                <div class="flex h-full items-center justify-center">
                  <span
                    class="medallion flex items-center justify-center w-16 h-16"
                    aria-hidden="true"
                  >
                    <svg class="w-6 h-6 text-sumi ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span class="sr-only">{item.title}</span>
                </div>
              {/if}

            </div>

            <div class="flex flex-1 flex-col p-5 md:p-6">
              <h3 class="brush text-xl text-inktext mb-2 transition-colors duration-200 group-hover:text-goldbright">
                {item.title}
              </h3>
              <p class="text-inktextdim text-[0.95rem] leading-relaxed">{item.description}</p>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="empty-seal" aria-hidden="true">
        <svg class="empty-seal__glyph" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p class="brush italic text-inktextdim text-center mt-4">New videos dropping soon — subscribe to catch them.</p>
    {/if}
  </div>
</section>

<style>
  .empty-seal {
    position: relative;
    width: 5rem;
    height: 5rem;
    margin: 1.25rem auto 0;
    border: 1.5px dashed rgba(192, 40, 24, 0.55);
    border-radius: 2px;
    transform: rotate(6deg);
    background: radial-gradient(80% 80% at 50% 50%, rgba(192, 40, 24, 0.08), transparent 70%);
  }

  .empty-seal__glyph {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 2rem;
    height: 2rem;
    color: rgba(192, 40, 24, 0.45);
  }
</style>
