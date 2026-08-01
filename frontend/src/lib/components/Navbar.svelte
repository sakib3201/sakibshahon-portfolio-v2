<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { siteMeta, socialLinks } from '$lib/data.js';

  let isOpen = false;
  let scrolled = false;

  /** @type {HTMLElement | undefined} */
  let navElement;
  /** @type {HTMLElement | undefined} */
  let dialogElement;
  /** @type {HTMLButtonElement | undefined} */
  let hamburgerButton;

  $: contactHref = $page.url.pathname === '/' ? '#contact' : '/#contact';

  $: menuItems = [
    { href: '/', text: 'Home' },
    { href: contactHref, text: 'Contact' },
    { href: '/projects', text: 'Projects' },
    { href: 'https://dev.to/sakib3201', text: 'Blog', target: '_blank', rel: 'noopener noreferrer' },
    { href: '/about', text: 'About' }
  ];

  const youtube = socialLinks.find((link) => link.name === 'YouTube');

  /** @param {boolean} inert */
  const setBackgroundInert = (inert) => {
    const parent = navElement?.parentElement || document.body;
    /** @type {HTMLElement[]} */
    const siblings = /** @type {HTMLElement[]} */ (Array.from(parent.children));
    for (const child of siblings) {
      if (child !== navElement) child.inert = inert;
    }
  };

  const toggleMenu = () => {
    isOpen = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    setBackgroundInert(isOpen);
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    document.body.style.overflow = '';
    setBackgroundInert(false);
    hamburgerButton?.focus();
  };

  $: if (isOpen) {
    tick().then(() => {
      const firstFocusable = /** @type {HTMLElement | undefined} */ (
        dialogElement?.querySelector(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      firstFocusable?.focus();
    });
  }

  /** @param {KeyboardEvent} event */
  const handleDialogKeydown = (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }
    if (event.key !== 'Tab' || !dialogElement) return;
    const focusable = /** @type {HTMLElement[]} */ (
      Array.from(
        dialogElement.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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
  bind:this={navElement}
  aria-label="Main navigation"
  class={`fixed top-0 w-full z-50 transition-all duration-300 lacquer-panel border-b border-gold/20 ${
    scrolled ? 'shadow-deep' : ''
  }`}
  in:fade={{ duration: 300 }}
>
  <div class="needle-line-h absolute inset-x-0 top-0" aria-hidden="true"></div>
  <div class="needle-line-h absolute inset-x-0 bottom-0 opacity-50" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 md:h-20">
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center gap-3 group" aria-label="{siteMeta.name} — home">
          <span
            class="medallion flex items-center justify-center w-11 h-11 brush text-xl text-sumi group-hover:text-black transition-colors duration-200"
            aria-hidden="true"
          >
            {siteMeta.monogram}
          </span>
          <span class="hidden sm:inline-block brush text-lg gold-text group-hover:text-white transition-colors duration-200">
            Sakib Shahon
          </span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-1">
        {#each menuItems as item (item.href)}
          <a
            href={item.href}
            class={`px-4 py-2 brush text-base tracking-wide transition-colors duration-200 border-b-2 border-transparent ${
              scrolled ? 'text-inktextdim hover:text-goldbright' : 'text-inktext hover:text-goldbright'
            } hover:border-gold/60`}
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
            class="ml-2 p-2 rounded-full gold-edge text-inktextdim hover:text-goldbright transition-colors"
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
          bind:this={hamburgerButton}
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md gold-edge text-inktext hover:text-goldbright focus:outline-none"
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
      bind:this={dialogElement}
      id="mobile-navigation-menu"
      class="md:hidden fixed inset-0 lacquer-panel z-40 pt-20"
      in:fade={{ duration: 200 }}
      on:click|self={closeMenu}
      on:keydown={handleDialogKeydown}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      tabindex="-1"
    >
      <div class="max-w-7xl mx-auto px-6 pt-6 pb-8">
        <div class="space-y-1 border-b border-gold/20 pb-6">
          {#each menuItems as item (item.href)}
            <a
              href={item.href}
              class={`group flex items-center justify-between px-4 py-3.5 brush text-xl border-b border-gold/10 ${
                !item.target ? 'text-inktext' : 'text-goldbright'
              } hover:bg-lacquer transition-colors duration-200`}
              target={item.target || ''}
              rel={item.rel || ''}
              on:click={closeMenu}
            >
              <span>{item.text}</span>
              {#if item.target}
                <svg class="w-4 h-4 text-inktextdim" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            class="group flex items-center justify-between px-4 py-3.5 brush text-lg text-goldbright hover:bg-lacquer transition-colors duration-200"
            on:click={closeMenu}
          >
            <span>YouTube</span>
            <svg class="w-4 h-4 text-inktextdim" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>

<div class="h-16 md:h-20"></div>
