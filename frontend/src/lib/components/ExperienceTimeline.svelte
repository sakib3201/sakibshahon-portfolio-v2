<script>
  import { experience } from "$lib/data.js";

  const imageFailed = /** @type {Record<string, boolean>} */ ($state({}));
</script>

<section class="bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-20 relative overflow-hidden">
  <!-- Background decorative elements -->
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Professional Experience
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
        A journey through my professional development, showcasing growth and expertise across different technologies and industries.
      </p>
    </div>

    <!-- Experience Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
      {#each experience as entry (entry.company)}
        <article
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2 w-full max-w-md"
        >
          <!-- Company Logo -->
          <div class="relative h-48 overflow-hidden bg-white">
            {#if entry.logo && !imageFailed[entry.company]}
              <img
                src={entry.logo}
                alt="{entry.company} Logo"
                class="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onerror={() => (imageFailed[entry.company] = true)}
              />
            {:else}
              <!-- Fallback: gradient plate with company initial when logo fails to load -->
              <div class="flex items-center justify-center h-full">
                <span
                  class="flex items-center justify-center w-20 h-20 text-4xl font-bold text-white bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl"
                >
                  {entry.company[0]}
                </span>
              </div>
            {/if}
            <!-- Subtle corner accent -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
          </div>

          <!-- Card Content -->
          <div class="p-6 relative">
            <!-- Background pattern -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-transparent"></div>

            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4 gap-2">
                <h3 class="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  {entry.role}
                </h3>
                <div class="text-right flex-shrink-0">
                  <span class="text-slate-500 text-sm">@</span>
                  <span class="text-white font-semibold">{entry.company}</span>
                </div>
              </div>

              <div class="mb-4 flex flex-wrap gap-2 items-center">
                <span class="text-xs font-semibold text-slate-300 bg-slate-800/60 px-3 py-1 rounded-full">
                  {entry.period}
                </span>
                {#if entry.badge}
                  <span
                    class="text-xs font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full px-3 py-1 shadow-lg"
                  >
                    {entry.badge}
                  </span>
                {/if}
              </div>

              <p class="text-slate-300 leading-relaxed mb-4">
                {entry.description}
              </p>

              {#if entry.metrics.length}
                <ul class="space-y-2 mb-4">
                  {#each entry.metrics as metric (metric)}
                    <li class="flex items-start text-sm text-slate-300">
                      <span class="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                      <span>{metric}</span>
                    </li>
                  {/each}
                </ul>
              {/if}

              <!-- Technology Tags -->
              {#if entry.tags.length}
                <div class="flex flex-wrap gap-2">
                  {#each entry.tags as tag (tag)}
                    <span class="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-lg">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
