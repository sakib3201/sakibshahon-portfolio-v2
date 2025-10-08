<script>
  import ProjectCard from "./ProjectCard.svelte";
  import { projects } from "$lib/data.js";
</script>

<div class="bg-gray-900 text-white py-10">
  <div
    id="Projects"
    class="flex justify-center items-center mt-10 mb-5 text-5xl font-montseratt font-bold"
  >
    Featured projects
  </div>

  <div class="carousel carousel-center p-4 space-x-4">
    {#each projects as project (project.title)}
      <ProjectCard {project} />
    {/each}
  </div>

  <div class="flex justify-center items-center m-5 mb-8">
    <a href="/projects">
      <button
        class="btn btn-ghost btn-outline btn-lg rounded-full shadow-md text-white border-blue-400 hover:bg-blue-400 hover:text-black hover:border-base-100 hover:shadow-black hover:scale-110 transition duration-300 ease-in-out"
      >
        View all Projects
      </button>
    </a>
  </div>
</div>
