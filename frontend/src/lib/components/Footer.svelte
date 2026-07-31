<script lang="ts">
  import { siteMeta, socialLinks } from '$lib/data.js';

  const currentYear = new Date().getFullYear();

  // Enhanced dark theme color scheme
  const themeColors = {
    background: 'bg-gradient-to-br from-gray-900 via-slate-800 to-black',
    card: 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30',
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      muted: 'text-slate-400',
      accent: 'text-cyan-400'
    },
    accent: {
      cyan: 'text-cyan-400 hover:text-cyan-300',
      blue: 'text-blue-400 hover:text-blue-300',
      red: 'text-red-400 hover:text-red-300',
      gray: 'text-slate-400 hover:text-slate-300'
    }
  };

  const iconPaths = Object.fromEntries([
    ['GitHub', 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'],
    ['LinkedIn', 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'],
    ['YouTube', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'],
    ['Email', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'],
    ['Blog', 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z']
  ]);

  const accentColors = Object.fromEntries(Object.entries(themeColors.accent));
</script>

<footer class={`${themeColors.background} border-t border-slate-700/30 relative overflow-hidden`}>
  <!-- Subtle background pattern -->
  <div class="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent"></div>

  <!-- Decorative elements -->
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="xl:grid xl:grid-cols-3 xl:gap-12">
      <!-- Brand Section -->
      <div class="space-y-8 xl:col-span-1">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-lg">{siteMeta.monogram}</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Sakib Shahon
            </h2>
            <p class="text-slate-400 text-sm">Full-stack Developer</p>
          </div>
        </div>

        <p class="text-slate-300 text-lg leading-relaxed">
          Passionate about creating beautiful and functional web applications with modern technologies.
        </p>

        <!-- Enhanced Social Links -->
        <div class="flex space-x-4">
          {#each socialLinks as link (link.name)}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              class={`p-3 rounded-xl ${themeColors.card} ${accentColors[link.color]} transition-all duration-300 hover:scale-110 hover:shadow-xl group`}
              aria-label={link.label}
            >
              <span class="sr-only">{link.name}</span>
              <svg
                class="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={iconPaths[link.name]} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Navigation & Connect -->
      <div class="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-sm font-bold text-white tracking-wider uppercase mb-6">
              Navigation
            </h3>
            <ul role="list" class="space-y-4">
              <li>
                <a
                  href="/"
                  class="text-base text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  class="text-base text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  class="text-base text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-12 md:mt-0">
            <h3 class="text-sm font-bold text-white tracking-wider uppercase mb-6">
              Connect
            </h3>
            <ul role="list" class="space-y-4">
              <li>
                <a
                  href="https://github.com/sakib3201"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-base text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sakib-shahon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-base text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:sakib3201@gmail.com"
                  class="text-base text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                >
                  <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Email Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="mt-16 border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-base text-slate-400">
        &copy; {currentYear} Sakib Ahamed Shahon. All rights reserved.
      </p>
      <div class="mt-4 md:mt-0 flex items-center space-x-4">
        <p class="text-sm text-slate-500">
          Built with <span class="text-red-400 animate-pulse">❤️</span> using
        </p>
        <div class="flex items-center space-x-2">
          <span class="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full">
            Svelte
          </span>
          <span class="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-full">
            Tailwind
          </span>
        </div>
      </div>
    </div>
  </div>
</footer>
