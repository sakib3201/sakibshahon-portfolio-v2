<script lang="ts">
  import { siteMeta, socialLinks } from '$lib/data.js';

  const currentYear = new Date().getFullYear();

  const iconPaths = Object.fromEntries([
    ['GitHub', 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'],
    ['LinkedIn', 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'],
    ['YouTube', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'],
    ['Email', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'],
    ['Blog', 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z']
  ]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Write', href: '/#contact' }
  ];
</script>

<footer class="relative border-t border-black/60">
  <section class="leather-band relative">
    <div class="stitch-t absolute inset-x-0 top-0" aria-hidden="true"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-12">
        <div class="max-w-sm space-y-4">
          <div class="flex items-center gap-4">
            <span class="plate w-12 h-12 rounded-full flex items-center justify-center serif font-semibold text-foilbright text-lg" aria-hidden="true">
              {siteMeta.monogram}
            </span>
            <div>
              <h2 class="embossed serif font-semibold text-2xl">{siteMeta.name}</h2>
              <p class="marginalia text-linen mt-1">{siteMeta.role}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-start gap-3">
          {#each socialLinks as link (link.name)}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-col items-center gap-1.5 border border-thread/40 rounded-sm px-4 py-3 text-linen hover:text-foilbright hover:border-foil/80 transition"
              aria-label={link.label}
            >
              <span class="sr-only">{link.name}</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={iconPaths[link.name]} />
              </svg>
              <span class="marginalia">{link.label}</span>
            </a>
          {/each}
        </div>

        <nav aria-label="Footer" class="flex flex-col items-start gap-3">
          {#each navLinks as navLink (navLink.href)}
            <a href={navLink.href} class="serif text-linen hover:text-foilbright transition">
              {navLink.label}
            </a>
          {/each}
        </nav>
      </div>
    </div>
  </section>

  <div class="stitch-t" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
    <p class="marginalia text-linendim">Bound and signed by {siteMeta.name}</p>
    <p class="serif text-linen">&copy; {currentYear} {siteMeta.name}. All rights reserved.</p>
    <p class="marginalia text-linendim">Set in EB Garamond &middot; Bound with SvelteKit &amp; Tailwind</p>
  </div>
</footer>
