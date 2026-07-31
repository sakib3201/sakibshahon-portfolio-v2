<script>
  import { siteMeta } from "$lib/data.js";

  const name = siteMeta.name;
  const letters = name.split('');

  const navigationItems = [
    {
      href: "#products",
      text: "View products",
      icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
      description: "View products I've shipped"
    },
    {
      href: "#skills",
      text: "Skills",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      description: "Explore my expertise"
    },
    {
      href: "#contact",
      text: "Contact me",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      description: "Get in touch"
    },
    {
      href: siteMeta.resumeUrl,
      text: "Resume",
      icon: "M12 10v6m0 0l4-4m-4 4l-4-4m6-2a2 2 0 100 4 2 2 0 000-4z",
      description: "Download my CV",
      external: true
    },
    {
      href: "https://dev.to/sakib3201",
      text: "Blogs",
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      description: "Read my articles",
      external: true
    }
  ];
</script>

<div class="relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white overflow-hidden">
  <!-- Background decorative elements -->
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/10 rounded-full blur-3xl"></div>

  <!-- Hero Content -->
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="Homepage text-center py-32">
      <!-- Eyebrow -->
      <p class="text-lg md:text-xl tracking-widest uppercase text-cyan-400 font-semibold mb-6">
        {siteMeta.role}
      </p>

      <!-- Animated Name -->
      <div class="Home_page_name text-7xl md:text-8xl font-bold mb-8">
        {#each letters as letter, i (i)}
          <span
            class="inline-block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-all duration-300"
            style="animation-delay: {i * 0.1}s"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        {/each}
      </div>

      <!-- Personal Description -->
      <div id="personal_description" class="mt-6 text-2xl md:text-3xl mb-4">
        The <span class="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"><b>&quot;CAN DO&quot;</b></span> Software Artisan
      </div>

      <!-- Subline -->
      <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-16">
        I ship AI-powered WordPress and SaaS products — including systems behind 20k+ plugin installs — and I can build yours.
      </p>

      <!-- Enhanced Navigation Buttons -->
      <div class="Grp_Button flex flex-wrap justify-center gap-4 md:gap-6 pb-20">
        {#each navigationItems as item (item.href)}
          <a
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            class="group relative px-8 py-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-cyan-600 hover:to-blue-600 border border-slate-600 hover:border-cyan-400 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <span class="flex items-center justify-center space-x-3">
              <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
              <span>{item.text}</span>
              {#if item.external}
                <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              {/if}
            </span>

            <!-- Tooltip -->
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.description}
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  #personal_description {
    color: #cbd5e0;
    font-weight: 300;
    letter-spacing: 0.025em;
  }

  .Home_page_name span {
    display: inline-block;
    animation: wave 2s infinite ease-in-out;
  }

  @keyframes wave {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .Home_page_name span {
      animation: none;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .Home_page_name {
      font-size: 3.5rem;
    }

    #personal_description {
      font-size: 1.25rem;
    }
  }
</style>
