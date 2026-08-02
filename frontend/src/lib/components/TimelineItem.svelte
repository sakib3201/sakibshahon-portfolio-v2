<script>
  export let item;
  export let extraClass = '';
</script>

<article class={`skin-sheet p-6 md:p-8 ${extraClass}`}>
  <time class="gold-plate px-3 py-1.5 marginalia text-sumi inline-block mb-4">
    {item.time}
  </time>

  <h3 class="brush text-2xl text-inkonpaper leading-tight mb-3">
    {item.title}
  </h3>

  <div class="text-inkonpaper/85 leading-relaxed text-[1.02rem] whitespace-pre-line">
    {item.description}
  </div>
</article>
