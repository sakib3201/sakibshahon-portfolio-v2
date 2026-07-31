<script>
  /** @typedef {{ title: string, description: string, imageSrc: string, altText: string, technologies?: string[], githubLink?: string, liveLink?: string, youtubeLink?: string, highlights?: string[] }} Project */

  /** @type {{ project: Project }} */
  let { project } = $props();

  let imageFailed = $state(false);

  /** @returns {void} */
  const handleImageError = () => {
    imageFailed = true;
  };
</script>

<article class="paper-sheet rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl group">
  <div class="grid md:grid-cols-2">
    <div class="relative md:min-h-full">
      <div class="p-5 md:p-6 h-full">
        <div class="relative h-64 md:h-full min-h-64 overflow-hidden bg-woodlight border border-black/30">
          {#if project.imageSrc && !imageFailed}
            <img
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              src={project.imageSrc}
              alt={project.altText}
              loading="lazy"
              onerror={handleImageError}
            />
          {:else}
            <div class="flex items-center justify-center h-full p-8 bg-wood">
              <div class="text-center">
                <span class="plate inline-flex items-center justify-center w-20 h-20 rounded-sm serif text-3xl font-semibold text-foilbright" aria-hidden="true">
                  {project.title.slice(0, 1)}
                </span>
                <p class="serif text-lg font-medium text-paper mt-4">{project.title}</p>
              </div>
            </div>
          {/if}
          <div class="absolute inset-3 border border-paper/30 pointer-events-none" aria-hidden="true"></div>
        </div>
      </div>
    </div>

    <div class="p-6 md:p-8">
      <h3 class="serif text-2xl md:text-3xl font-semibold text-inkonpaper leading-tight mb-3">
        {project.title}
      </h3>

      <p class="serif text-inkonpaper/85 leading-relaxed mb-5 text-[1.05rem]">
        {project.description}
      </p>

      {#if project.highlights && project.highlights.length > 0}
        <ul class="space-y-2 mb-5">
          {#each project.highlights as highlight (highlight)}
            <li class="flex items-start gap-2.5 text-[0.95rem] text-inkonpaper/90">
              <span class="text-leatherdeep mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
              <span>{highlight}</span>
            </li>
          {/each}
        </ul>
      {/if}

      <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div class="flex items-center gap-3">
          {#if project.githubLink}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 border border-inkonpaper/25 rounded-sm text-inkonpaper hover:bg-inkonpaper hover:text-paper transition-colors duration-200"
              aria-label="View {project.title} on GitHub"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          {/if}

          {#if project.liveLink}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 border border-inkonpaper/25 rounded-sm text-inkonpaper hover:bg-inkonpaper hover:text-paper transition-colors duration-200"
              aria-label="Visit {project.title} live"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
              </svg>
            </a>
          {/if}

          {#if project.youtubeLink}
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 border border-inkonpaper/25 rounded-sm text-inkonpaper hover:bg-inkonpaper hover:text-paper transition-colors duration-200"
              aria-label="Watch {project.title} on YouTube"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          {/if}
        </div>

        {#if project.liveLink}
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            class="ribbon px-5 py-2.5 serif text-foilbright hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Visit site
          </a>
        {:else if project.youtubeLink}
          <a
            href={project.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            class="ribbon px-5 py-2.5 serif text-foilbright hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Watch on YouTube
          </a>
        {/if}
      </div>
    </div>
  </div>
</article>
