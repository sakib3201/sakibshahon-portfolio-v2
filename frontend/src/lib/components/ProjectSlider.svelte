<script>
  import ProjectCard from "./ProjectCard.svelte";
  import { projects } from "$lib/data.js";
</script>

<div class="bg-gray-900 text-white py-10">
  <div
    id="projects"
    class="scroll-mt-24 flex justify-center items-center mt-10 mb-5 text-5xl font-montseratt font-bold"
  >
    Featured projects
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#each projects as project (project.title)}
      <ProjectCard {project} />
    {/each}
  </div>

  <div class="flex justify-center items-center m-5 mb-8">
    <a
      href="/projects"
      class="inline-block px-8 py-4 rounded-2xl border border-blue-400 text-white hover:bg-blue-400 hover:text-black transition-all duration-300 hover:scale-105 shadow-md"
    >
      View all Projects
    </a>
  </div>
</div>
