<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { siteMeta } from '$lib/data.js';
  
  let isOpen = false;
  let scrolled = false;

  $: contactHref = $page.url.pathname === '/' ? '#contact' : '/#contact';
  
  $: menuItems = [
    { href: '/', text: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: contactHref, text: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/projects', text: 'Projects', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { href: 'https://dev.to/sakib3201', text: 'Blog', target: '_blank', rel: 'noopener noreferrer', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { href: '/about', text: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];
  
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
  class={`fixed w-full z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-gray-900/90 backdrop-blur-md shadow-md' 
      : 'bg-transparent'
  }`}
  in:fade={{ duration: 300 }}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 md:h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a 
          href="/" 
          class="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent flex items-center space-x-2"
        >
          <span class="text-2xl">{siteMeta.monogram}</span>
          <span class="hidden sm:inline-block">Sakib Shahon</span>
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        {#each menuItems as item (item.href)}
          <a
            href={item.href}
            class={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-300 hover:text-blue-400' 
                : 'text-white hover:text-blue-200'
            }`}
            target={item.target || ''}
            rel={item.rel || ''}
          >
            {item.text}
          </a>
        {/each}
        
        <!-- YouTube Channel -->
        <a
          href="https://www.youtube.com/@sakibshahon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube channel"
          class={`ml-2 p-2 rounded-full hover:bg-slate-800/50 transition-colors ${
            scrolled 
              ? 'text-gray-300' 
              : 'text-white'
          }`}
        >
          <svg 
            class="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
            />
          </svg>
        </a>
      </div>
      
      <!-- Mobile menu button -->
      <div class="flex md:hidden items-center">
        <button
          type="button"
          class={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
            !scrolled 
              ? 'text-gray-300 hover:text-white' 
              : 'text-white'
          }`}
          on:click={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span class="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          {#if isOpen}
            <svg 
              class="block h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          {:else}
            <svg 
              class="block h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu -->
  {#if isOpen}
    <div 
      id="mobile-navigation-menu"
      class="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 pt-16"
      in:fade={{ duration: 200 }}
      on:click|self={closeMenu}
      on:keydown={(e) => e.key === 'Escape' && closeMenu()}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      tabindex="-1"
    >
      <div 
        class="px-2 pt-2 pb-3 space-y-1 sm:px-3"
        in:slide={{ duration: 200 }}
      >
        {#each menuItems as item (item.href)}
          <a
            href={item.href}
            class={`group flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
              !item.target
                ? 'text-white hover:bg-gray-800' 
                : 'text-blue-400 hover:bg-gray-800'
            }`}
            target={item.target || ''}
            rel={item.rel || ''}
            on:click={closeMenu}
          >
            <svg 
              class="mr-4 h-6 w-6 flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d={item.icon} 
              />
            </svg>
            {item.text}
            {#if item.target}
              <span class="ml-2 text-xs text-gray-400">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            {/if}
          </a>
        {/each}

        <a
          href="https://www.youtube.com/@sakibshahon"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 text-blue-400 hover:bg-gray-800"
          on:click={closeMenu}
        >
          <svg
            class="mr-4 h-6 w-6 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube
          <span class="ml-2 text-xs text-gray-400">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  {/if}
</nav>

<!-- Add padding to account for fixed navbar -->
<div class="h-16 md:h-20"></div>