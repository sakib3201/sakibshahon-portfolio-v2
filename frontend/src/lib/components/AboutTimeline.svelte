
<script>
  import { aboutTimeline } from '$lib/data.js';
  import TimelineItem from './TimelineItem.svelte';
</script>

<section class="relative bg-sumi text-inktext py-20 lg:py-28">
  <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 reveal" data-reveal>
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">
        My Journey
      </h2>
      <p class="marginalia text-inktextdim mt-5">The chapters that bound this shelf together</p>
    </div>

    <div class="text-center mb-16 reveal" data-reveal data-reveal-delay="200">
      <blockquote class="brush italic text-lg md:text-xl text-inktextdim max-w-2xl mx-auto leading-relaxed">
        Programming has been an amazing journey for me. It&apos;s not just about writing code, but a
        passion that burns bright in my soul. Each line of code I write is a step towards turning
        ideas into reality. It&apos;s a constant learning process that never ceases to amaze me.
      </blockquote>
    </div>

    <div class="relative">
      <div
        class="needle-line absolute left-5 md:left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-60"
        aria-hidden="true"
      ></div>

      <div class="space-y-12 md:space-y-16">
        {#each aboutTimeline as item (item.title)}
          <div class="relative md:grid md:grid-cols-2 md:gap-16">
            <div class="absolute left-5 md:left-1/2 top-2 -translate-x-1/2" aria-hidden="true">
              <span class="medallion block w-3 h-3"></span>
            </div>

            <div class={`ml-12 md:ml-0 ${item.align === 'start' ? 'md:col-start-1' : 'md:col-start-2'}`}>
              <TimelineItem {item} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
