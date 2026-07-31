<script>
  import ProjectCard from "./ProjectCard.svelte";
  import { projects } from "$lib/data.js";
</script>

<section id="projects" class="scroll-mt-24 relative bg-sumi text-inktext py-20 lg:py-28">
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14">
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">Featured projects</h2>
      <p class="marginalia text-inktextdim mt-5">Two works I built and keep referring back to</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
      {#each projects as project (project.title)}
        <ProjectCard {project} />
      {/each}
    </div>

    <div class="flex justify-center mt-14">
      <a
        href="/projects"
        class="inline-flex items-center gap-2 px-8 py-3 gold-edge border border-gold text-goldbright hover:text-white hover:border-gold/80 neon-rim brush text-lg transition-all duration-300 hover:-translate-y-0.5"
      >
        Browse the full archive
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>
