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

<section id="skills" class="scroll-mt-24 relative bg-ground text-paper py-20 lg:py-28 overflow-hidden">
  <div class="stitch-t absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="embossed serif font-semibold text-4xl md:text-6xl tracking-[-0.02em]">The reference shelf</h2>
      <p class="max-w-2xl mx-auto mt-5 text-lg text-linen leading-relaxed">
        Four working disciplines, from API to polished UI — WordPress plugins to SaaS.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8 mb-16">
      {#each skills as skill (skill.title)}
        <article class="leather-sheet group relative flex flex-col rounded-r-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div class="flex items-center justify-center pt-7 pb-4">
            <span
              class="plate flex items-center justify-center w-16 h-16 rounded-full"
              aria-hidden="true"
            >
              <svg class="w-8 h-8 text-foilbright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d={icons[skill.icon] ?? icons.code}></path>
              </svg>
            </span>
          </div>

          <div class="px-7 pb-3 text-center">
            <h3 class="embossed serif text-2xl mb-2">{skill.title}</h3>
            <p class="serif text-linen leading-relaxed mb-5 text-[1.02rem]">{skill.blurb}</p>
          </div>

          <div class="mx-7 mb-7">
            <ul class="space-y-2.5 pt-4 border-t border-thread/25">
              {#each skill.items as item (item)}
                <li class="flex items-start gap-2.5 text-sm text-linen leading-snug">
                  <span class="text-foil mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </div>
        </article>
      {/each}
    </div>

    <div class="text-center">
      <a
        href="/about#skills"
        class="ribbon inline-flex items-center gap-2 px-8 py-3.5 serif text-lg text-foilbright hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      >
        View skills in detail
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>
