<script>
  import { impactStats } from '$lib/data.js';
</script>

<section class="relative bg-ink text-paper py-16 lg:py-20 overflow-hidden">
  <div
    class="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
    style="background: radial-gradient(80% 100% at 50% 100%, rgba(201,162,94,0.08) 0%, transparent 70%);"
    aria-hidden="true"
  ></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each impactStats as stat (stat.value)}
        <li class="plate rounded-sm px-6 py-7 text-center">
          <span class="block serif font-semibold text-4xl md:text-5xl text-foilbright" style="text-shadow: 0 1px 0 rgba(255,240,205,0.3), 0 -1px 1px rgba(0,0,0,0.75);">
            {stat.value}
          </span>
          <span class="mt-3 block h-px bg-foil/30 mx-auto max-w-16" aria-hidden="true"></span>
          <span class="mt-3 block marginalia text-paper/85 leading-relaxed">{stat.label}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
