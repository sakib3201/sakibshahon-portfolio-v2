<script>
  import { impactStats } from '$lib/data.js';
</script>

<section class="relative overflow-hidden bg-gray-900 text-white py-16 lg:py-20">
  <div class="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {#each impactStats as stat (stat.value)}
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {stat.value}
          </div>
          <div class="text-sm text-slate-400">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
