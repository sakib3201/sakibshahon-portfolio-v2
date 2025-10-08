<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { slide } from 'svelte/transition';
  
  let isOpen = false;
  let scrolled = false;
  
  const menuItems = [
    { href: '/', text: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '#contact', text: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
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
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav 
  class={`fixed w-full z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
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
          <span class="text-2xl">SA</span>
          <span class="hidden sm:inline-block">Sakib Shahon</span>
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        {#each menuItems as item}
          <a
            href={item.href}
            class={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400' 
                : 'text-white hover:text-blue-200'
            }`}
            target={item.target || ''}
            rel={item.rel || ''}
          >
            {item.text}
          </a>
        {/each}
        
        <!-- Theme Toggle -->
        <button 
          class="ml-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          on:click={() => document.documentElement.classList.toggle('dark')}
          aria-label="Toggle dark mode"
        >
          <svg 
            class="w-5 h-5 text-gray-600 dark:text-gray-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        </button>
      </div>
      
      <!-- Mobile menu button -->
      <div class="flex md:hidden items-center">
        <button
          type="button"
          class={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
            !scrolled 
              ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white' 
              : 'text-gray-900 dark:text-white'
          }`}
          on:click={toggleMenu}
          aria-expanded="false"
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
      class="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-40 pt-16"
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
        {#each menuItems as item}
          <a
            href={item.href}
            class={`group flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
              !item.target
                ? 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800' 
                : 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800'
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
              <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            {/if}
          </a>
        {/each}
        
        <!-- Theme Toggle for Mobile -->
        <button 
          class="w-full flex items-center px-3 py-3 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 transition-colors duration-200"
          on:click={() => {
            document.documentElement.classList.toggle('dark');
            closeMenu();
          }}
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
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
          Toggle Theme
        </button>
      </div>
    </div>
  {/if}
</nav>

<!-- Add padding to account for fixed navbar -->
<div class="h-16 md:h-20"></div>