<script>
  import { faq } from "$lib/data.js";

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
  const faqLdJson = JSON.stringify(faqLd).replace(/</g, "\\u003c");
  const faqLdScript = '<script type="application/ld+json">' + faqLdJson + "</scr" + "ipt>";
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html faqLdScript}
</svelte:head>

<section id="faq" class="scroll-mt-24 relative bg-sumi text-inktext py-20 lg:py-28 overflow-hidden">
  <div class="needle-line-h absolute inset-x-0 top-0 opacity-40" aria-hidden="true"></div>

  <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16" data-reveal>
      <h2 class="brush gold-text text-4xl md:text-6xl tracking-[0.02em]">The answers</h2>
      <p class="marginalia text-inktextdim mt-5">Straight answers to common questions</p>
    </div>

    <dl class="space-y-6" data-reveal>
      {#each faq as item (item.question)}
        <div class="lacquer-raised gold-edge px-6 md:px-8 py-6">
          <dt>
            <h3 class="brush gold-text text-xl md:text-2xl leading-snug mb-3">{item.question}</h3>
          </dt>
          <dd class="text-inktextdim leading-relaxed">{item.answer}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>
