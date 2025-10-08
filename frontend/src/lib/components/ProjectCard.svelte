<script lang="ts">
  interface Project {
    title: string;
    description: string;
    imageSrc: string;
    altText: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    youtubeLink?: string;
  }

  export let project: Project;

  type IconType = 'github' | 'external' | 'youtube';

  interface IconData {
    d: string;
    viewBox: string;
  }

  // Enhanced dark theme color scheme
  const themeColors = {
    card: {
      background: 'bg-gradient-to-br from-gray-900 via-slate-800 to-black',
      border: 'border border-slate-700/50',
      hover: 'hover:border-slate-600 hover:shadow-2xl hover:shadow-slate-900/30'
    },
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      accent: 'text-cyan-400'
    },
    button: {
      primary: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
      secondary: 'text-slate-400 hover:text-cyan-400'
    }
  };

  // Function to handle icon display with proper accessibility
  const getIcon = (type: IconType): IconData | null => {
    const icons: Record<IconType, IconData> = {
      github: {
        d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
        viewBox: '0 0 24 24'
      },
      external: {
        d: 'M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z',
        viewBox: '0 0 24 24'
      },
      youtube: {
        d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
        viewBox: '0 0 24 24'
      }
    };

    return type in icons ? icons[type] : null;
  };
</script>

<div class={`group relative overflow-hidden rounded-2xl ${themeColors.card.background} ${themeColors.card.border} shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2`}>
  <!-- Project Image -->
  <div class="relative h-72 overflow-hidden md:h-80">
    <img
      class="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
      src={project.imageSrc}
      alt={project.altText}
      loading="lazy"
    />

    <!-- Enhanced overlay with better gradients -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
      <div class="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {#if project.technologies}
          <div class="flex flex-wrap gap-2">
            {#each project.technologies as tech}
              <span class="text-xs font-semibold px-3 py-1.5 {themeColors.button.primary} text-white rounded-full shadow-lg backdrop-blur-sm">
                {tech}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Subtle corner accent -->
    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent"></div>
  </div>

  <!-- Project Content -->
  <div class="p-8 relative">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-transparent"></div>

    <div class="relative z-10">
      <h3 class="text-2xl font-bold {themeColors.text.primary} mb-3 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
        {project.title}
      </h3>

      <p class="text-slate-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
        {project.description}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center space-x-3">
          {#if project.githubLink}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-full {themeColors.button.secondary} hover:bg-slate-800/50 transition-all duration-300 hover:scale-110"
              aria-label="View on GitHub"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={getIcon('github')?.d || ''} />
              </svg>
            </a>
          {/if}

          {#if project.liveLink}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-full {themeColors.button.secondary} hover:bg-slate-800/50 transition-all duration-300 hover:scale-110"
              aria-label="View Live Demo"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={getIcon('external')?.d || ''} />
              </svg>
            </a>
          {/if}

          {#if project.youtubeLink}
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-full {themeColors.button.secondary} hover:bg-slate-800/50 transition-all duration-300 hover:scale-110"
              aria-label="View on YouTube"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={getIcon('youtube')?.d || ''} />
              </svg>
            </a>
          {/if}
        </div>

        <button
          class="px-6 py-3 text-sm font-semibold text-white {themeColors.button.primary} rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105"
          on:click|preventDefault
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</div>
