<script>
  import ProjectCard from "./ProjectCard.svelte";
  import ProjectLibraryCard from "./ProjectLibraryCard.svelte";
  import { projects, archiveProjects } from "$lib/data.js";
</script>

<section class="relative bg-sumi text-inktext pb-20 lg:pb-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 lg:gap-10 max-w-6xl mx-auto">
      {#each projects as project (project.title)}
        <ProjectCard {project} />
      {/each}
    </div>

    <div class="text-center mt-24 lg:mt-32">
      <h2 class="brush gold-text text-3xl md:text-5xl tracking-[0.02em]">
        University &amp; experimental
      </h2>
      <p class="marginalia text-inktextdim mt-4">Shelf copies from earlier bindings</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 max-w-6xl mx-auto">
      {#each archiveProjects as project (project.title)}
        <ProjectLibraryCard {project} />
      {/each}
    </div>
  </div>
</section>
