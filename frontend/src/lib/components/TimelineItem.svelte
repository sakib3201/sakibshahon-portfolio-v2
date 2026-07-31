<script>
  export let item;
</script>

<article class="skin-sheet p-6 md:p-8 reveal" data-reveal>
  <time class="gold-plate px-3 py-1.5 marginalia text-sumi inline-block mb-4">
    {item.time}
  </time>

  <h3 class="brush text-2xl text-inkonpaper leading-tight mb-3">
    {item.title}
  </h3>

  <div class="text-inkonpaper/85 leading-relaxed text-[1.02rem]">
    <!-- static content from $lib/data.js, not user input -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html item.description}
  </div>
</article>
