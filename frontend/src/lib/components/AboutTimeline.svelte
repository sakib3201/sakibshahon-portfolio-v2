
<script>
  import { aboutTimeline } from '$lib/data.js';
  import TimelineItem from './TimelineItem.svelte';
</script>

<div class="container mx-auto px-4">
      <div
        id="Experience"
        class="flex justify-center items-center mt-10 mb-5 text-5xl font-montseratt font-bold"
      >
        My Journey
      </div>
      <div class="text-center mt-10 mb-10">
        <blockquote class="italic text-lg font-medium text-slate-500">
          Programming has been an amazing journey for me. It&apos;s not
          just about writing code, but a passion that burns bright in my soul.
          Each line of code I write is a step towards turning ideas into
          reality. It&apos;s a constant learning process that never ceases to
          amaze me.
        </blockquote>
      </div>

      <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {#each aboutTimeline as item (item.title)}
          <TimelineItem {item} />
        {/each}
      </ul>
    </div>
