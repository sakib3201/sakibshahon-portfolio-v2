<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { siteMeta, socialLinks } from '$lib/data.js';

  let isOpen = false;
  let scrolled = false;

  $: contactHref = $page.url.pathname === '/' ? '#contact' : '/#contact';

  $: menuItems = [
    { href: '/', text: 'Home' },
    { href: contactHref, text: 'Contact' },
    { href: '/projects', text: 'Projects' },
    { href: 'https://dev.to/sakib3201', text: 'Blog', target: '_blank', rel: 'noopener noreferrer' },
    { href: '/about', text: 'About' }
  ];

  const youtube = socialLinks.find((link) => link.name === 'YouTube');

  const toggleMenu = () => {
    isOpen = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    isOpen = false;
    document.body.style.overflow = '';
  };

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 10;
    };

    /** @param {KeyboardEvent} event */
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (isOpen && window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<nav
  aria-label="Main navigation"
  class={`fixed w-full z-50 transition-all duration-300 leather-band border-b border-black/60 ${
    scrolled ? 'shadow-lg' : ''
  }`}
  in:fade={{ duration: 300 }}
>
  <div class="stitch-t absolute inset-x-0 top-0" aria-hidden="true"></div>
  <div class="stitch-t absolute inset-x-0 bottom-0 opacity-50" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 md:h-20">
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center gap-3 group" aria-label="{siteMeta.name} — home">
          <span
            class="flex items-center justify-center w-11 h-11 plate rounded-sm serif text-xl font-semibold text-foilbright group-hover:text-white transition-colors duration-200"
            aria-hidden="true"
          >
            {siteMeta.monogram}
          </span>
          <span class="hidden sm:inline-block serif text-lg text-paper group-hover:text-foilbright transition-colors duration-200">
            Sakib Shahon
          </span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-1">
        {#each menuItems as item (item.href)}
          <a
            href={item.href}
            class={`px-4 py-2 serif text-base tracking-wide transition-colors duration-200 border-b-2 border-transparent ${
              scrolled ? 'text-linen hover:text-foilbright' : 'text-paper hover:text-foilbright'
            } hover:border-foil/60`}
            target={item.target || ''}
            rel={item.rel || ''}
          >
            {item.text}
          </a>
        {/each}

        {#if youtube}
          <a
            href={youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={youtube.label}
            class="ml-2 p-2 rounded-full border border-thread/40 text-linen hover:text-foilbright hover:border-foil/70 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
          </a>
        {/if}
      </div>

      <div class="flex md:hidden items-center">
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md border border-thread/40 text-paper hover:text-foilbright focus:outline-none"
          on:click={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span class="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          {#if isOpen}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if isOpen}
    <div
      id="mobile-navigation-menu"
      class="md:hidden fixed inset-0 leather-band z-40 pt-20"
      in:fade={{ duration: 200 }}
      on:click|self={closeMenu}
      on:keydown={(e) => e.key === 'Escape' && closeMenu()}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      tabindex="-1"
    >
      <div class="max-w-7xl mx-auto px-6 pt-6 pb-8">
        <div class="space-y-1 border-b border-thread/20 pb-6">
          {#each menuItems as item (item.href)}
            <a
              href={item.href}
              class={`group flex items-center justify-between px-4 py-3.5 serif text-xl border-b border-thread/10 ${
                !item.target ? 'text-paper' : 'text-foilbright'
              } hover:bg-leatherdark/60 transition-colors duration-200`}
              target={item.target || ''}
              rel={item.rel || ''}
              on:click={closeMenu}
            >
              <span>{item.text}</span>
              {#if item.target}
                <svg class="w-4 h-4 text-linendim" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              {/if}
            </a>
          {/each}
        </div>

        {#if youtube}
          <a
            href={youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between px-4 py-3.5 serif text-lg text-foilbright hover:bg-leatherdark/60 transition-colors duration-200"
            on:click={closeMenu}
          >
            <span>YouTube</span>
            <svg class="w-4 h-4 text-linendim" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>

<div class="h-16 md:h-20"></div>
