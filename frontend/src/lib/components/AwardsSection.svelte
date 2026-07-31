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

<section id="awards" class="scroll-mt-24 relative bg-lacquer text-inktext py-20 lg:py-28 overflow-hidden" data-reveal>
  <div class="needle-line-h absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">The spoils</h2>
      <p class="marginalia text-inktextdim mt-5">Competitive programming and global hackathons</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
      {#each awards as award (award.title)}
        <div class="lacquer-raised gold-edge p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-deep neon-rim flex flex-col">
          <div class="flex items-center justify-between mb-5">
            <span class="medallion flex items-center justify-center w-14 h-14" aria-hidden="true">
              <svg class="w-7 h-7 text-sumi" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d={iconPaths[award.icon] ?? iconPaths.trophy}></path>
              </svg>
            </span>
            <span class="marginalia text-inktextdim bg-black/25 px-2.5 py-1">{award.year}</span>
          </div>

          <h3 class="brush text-xl text-inktext leading-snug mb-3">
            {#if award.href}
              <a
                href={award.href}
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-goldbright transition-colors duration-200"
              >
                {award.title}
              </a>
            {:else}
              {award.title}
            {/if}
          </h3>

          <p class="text-inktextdim leading-relaxed">{award.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
