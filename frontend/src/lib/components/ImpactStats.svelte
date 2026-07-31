<script>
  import { impactStats } from '$lib/data.js';
</script>

<section class="relative sumi-ground text-inktext py-20 lg:py-28 overflow-hidden">
  <div
    class="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
    style="background: radial-gradient(80% 100% at 50% 100%, rgba(201,162,94,0.08) 0%, transparent 70%);"
    aria-hidden="true"
  ></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each impactStats as stat, i (stat.value)}
        <li class="lacquer-raised gold-edge neon-rim px-6 py-7 text-center transition-all duration-500 hover:-translate-y-1.5">
          <div data-reveal data-reveal-delay={i * 60}>
            <span class="block brush font-semibold text-4xl md:text-5xl shimmer">
              {stat.value}
            </span>
            <span class="mt-3 block needle-line-h max-w-16 mx-auto" aria-hidden="true"></span>
            <span class="mt-3 block marginalia text-inktextdim leading-relaxed">{stat.label}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
