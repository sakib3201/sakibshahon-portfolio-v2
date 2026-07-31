<script>
  import { awards } from '$lib/data.js';

  const iconPaths = /** @type {Record<string, string>} */ ({
    trophy:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    rocket:
      'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  });
</script>

<section
  id="awards"
  class="scroll-mt-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-20 relative overflow-hidden"
>
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Awards & Recognition
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Recognitions from competitive programming and global hackathons.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each awards as award (award.title)}
        <div
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2 p-6"
        >
          <div class="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={iconPaths[award.icon] ?? iconPaths.trophy}
              ></path>
            </svg>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 class="text-xl font-semibold text-white">
              {#if award.href}
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-cyan-300 transition-colors duration-300"
                >
                  {award.title}
                </a>
              {:else}
                {award.title}
              {/if}
            </h3>
            <span class="text-xs font-semibold text-cyan-400 bg-slate-800/60 px-3 py-1 rounded-full">
              {award.year}
            </span>
          </div>

          <p class="text-sm text-slate-300 leading-relaxed">{award.description}</p>

          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
        </div>
      {/each}
    </div>
  </div>
</section>
