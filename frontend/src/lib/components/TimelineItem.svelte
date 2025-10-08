<script>
  export let item;

  const alignmentClasses = item.align === 'start'
    ? 'md:flex-row-reverse md:text-right'
    : 'md:flex-row';

  const contentAlignment = item.align === 'start'
    ? 'md:items-end'
    : 'md:items-start';

  // Enhanced color scheme for dark theme
  const dotColors = {
    default: 'bg-gradient-to-br from-slate-400 to-slate-600',
    hover: 'bg-gradient-to-br from-slate-300 to-slate-500'
  };

  const cardColors = {
    background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    border: 'border border-slate-700/50',
    hover: 'hover:border-slate-600/70 hover:shadow-2xl hover:shadow-slate-900/50'
  };
</script>

<li class={`relative mb-16 md:flex ${alignmentClasses} ${contentAlignment} group`}>
  <!-- Timeline dot -->
  <div class={`flex items-center justify-center w-12 h-12 rounded-full ${dotColors.default} text-white ring-4 ring-slate-800/30 shadow-lg transition-all duration-300 group-hover:${dotColors.hover} group-hover:scale-110 group-hover:ring-slate-700/50 absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-10`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  </div>

  <!-- Timeline content -->
  <div class="w-full md:w-5/12 mt-8 md:mt-0">
    <div class={`${cardColors.background} ${cardColors.border} rounded-2xl shadow-xl p-8 ${cardColors.hover} transition-all duration-500 ease-out hover:-translate-y-2 relative overflow-hidden`}>
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-800/10 to-transparent opacity-50"></div>

      <!-- Content -->
      <div class="relative z-10">
        <time class="inline-flex items-center text-sm font-semibold text-cyan-400 bg-slate-800/50 px-3 py-1 rounded-full mb-3">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          {item.time}
        </time>

        <h3 class="text-2xl font-bold text-white mb-3 leading-tight">
          {item.title}
        </h3>

        <div class="text-slate-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none">
          {@html item.description}
        </div>
      </div>

      <!-- Decorative corner accent -->
      <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full"></div>
    </div>
  </div>

  <!-- Timeline line -->
  <div class="hidden md:block w-1/12 relative">
    <div class="h-full w-0.5 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 mx-auto shadow-sm"></div>
  </div>

  <!-- Empty div for alignment -->
  <div class="hidden md:block w-5/12"></div>
</li>