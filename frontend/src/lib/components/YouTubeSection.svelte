<script>
  import { youtube } from '$lib/data.js';

  /** @type {{ id: string; title: string; description: string }[]} */
  const featured = youtube.featured;
</script>

<section
  class="scroll-mt-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-20 relative overflow-hidden"
>
  <div class="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent mb-6">
        Watch on YouTube
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
        Engineering stories and tutorials. <span class="font-semibold text-cyan-400">{youtube.handle}</span>
      </p>
      <p class="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">{youtube.blurb}</p>

      <a
        href={youtube.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        Subscribe on YouTube
      </a>
    </div>

    {#if featured.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {#each featured as item (item.id)}
          <a
            href={`https://www.youtube.com/watch?v=${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
                src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                alt="{item.title} thumbnail"
                loading="lazy"
                class="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                {item.title}
              </h3>
              <p class="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/10 to-transparent"></div>
          </a>
        {/each}
      </div>
    {:else}
      <p class="text-center text-slate-400 mt-4">New videos dropping soon — subscribe to catch them.</p>
    {/if}
  </div>
</section>
