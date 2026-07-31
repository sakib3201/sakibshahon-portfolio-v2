<script>
  import { skills } from "$lib/data.js";

  const icons = /** @type {Record<string, string>} */ ({
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    ai: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    chart:
      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    brain:
      'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  });
</script>

<section
  id="skills"
  class="scroll-mt-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-20 relative overflow-hidden"
>
  <!-- Background decorative elements -->
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        My Skillset
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Comprehensive expertise across multiple domains, delivering end-to-end solutions from concept to deployment.
      </p>
    </div>

    <!-- Skills Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {#each skills as skill (skill.title)}
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2">
          <!-- Card Header -->
          <div class="p-6 pb-4">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[skill.icon] ?? icons.code}></path>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-3">
              {skill.title}
            </h3>

            <p class="text-slate-300 text-center leading-relaxed mb-6">
              {skill.blurb}
            </p>
          </div>

          <!-- Skills List -->
          <div class="px-6 pb-6">
            <ul class="space-y-3 text-slate-400">
              {#each skill.items as item (item)}
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span class="text-sm leading-relaxed">{item}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
        </div>
      {/each}
    </div>

    <!-- Enhanced CTA Button -->
    <div class="text-center">
      <a href="/about#skills" class="group relative inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105">
        <span class="flex items-center justify-center">
          View Skills in Detail
          <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </span>
      </a>
    </div>
  </div>
</section>
