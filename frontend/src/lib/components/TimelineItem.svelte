<script>
  export let item;
</script>

<article class="paper-sheet rounded-sm p-6 md:p-8">
  <time class="plate rounded-sm px-3 py-1.5 marginalia text-paper/90 inline-block mb-4">
    {item.time}
  </time>

  <h3 class="serif text-2xl font-semibold text-inkonpaper leading-tight mb-3">
    {item.title}
  </h3>

  <div class="serif text-inkonpaper/85 leading-relaxed text-[1.02rem]">
    <!-- static content from $lib/data.js, not user input -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html item.description}
  </div>
</article>
