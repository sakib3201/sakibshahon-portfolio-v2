<script>
  import ProjectLibraryCards from "./ProjectLibraryCard.svelte";
  import { projects } from "$lib/data.js";
</script>

<div class="project_library_collection py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
        Featured Projects
      </h2>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto">
        A collection of projects that showcase my skills and passion for creating exceptional digital experiences.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {#each projects as project (project.title)}
        <ProjectLibraryCards {project} />
      {/each}
    </div>
  </div>
</div>
