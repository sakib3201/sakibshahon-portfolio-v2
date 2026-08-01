<script>
  import { page } from "$app/stores";
  import { siteMeta } from "$lib/data.js";
  import Navbar from "../lib/components/Navbar.svelte";
  import Footer from "../lib/components/Footer.svelte";

  const is404 = $page.status === 404;
</script>

<svelte:head>
  <title>{is404 ? "404 — This page was never inked" : `Error ${$page.status} — The ink ran dry`}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main id="main-content" tabindex="-1" class="relative bg-sumi text-inktext min-h-screen overflow-hidden">
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.14) 0%, rgba(201,162,94,0.04) 55%, transparent 100%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10">
    <Navbar />

    <section class="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <div class="perspective-scene inline-block">
          <div class="relative inline-block">
            <span
              class="hanko error-seal absolute -top-5 -right-5 md:-right-8 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
              aria-hidden="true"
            >
              <span class="brush text-xl md:text-2xl">無</span>
            </span>
            <p class="brush gold-text text-8xl md:text-9xl leading-none tracking-[0.04em] select-none" aria-hidden="true">
              {is404 ? "404" : $page.status}
            </p>
          </div>
        </div>

        <h1 class="brush text-inktext text-3xl md:text-5xl mt-10">
          {is404 ? "This page was never inked." : "The ink ran dry."}
        </h1>

        <p class="max-w-xl mx-auto mt-5 text-lg md:text-xl text-inktextdim leading-relaxed">
          {#if is404}
            The back piece carries six panels and a few scars — this address is not among them. The link may be broken,
            or the page was scratched from the skin.
          {:else}
            Something tore mid-entry in the family ledger. This is our fault, not yours — give the page a moment and
            strike it again, or write directly to the boss.
          {/if}
        </p>

        <p class="marginalia text-inktextdim mt-6">
          Error N°{is404 ? "404" : $page.status}
          {#if !is404 && $page.error?.message}
            · {$page.error.message}
          {/if}
        </p>

        <div class="flex flex-wrap justify-center gap-4 md:gap-5 mt-10">
          {#if is404}
            <a
              href="/"
              class="gold-plate inline-flex items-center gap-2 px-7 py-3 brush text-lg text-sumi hover:text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Return to the work
            </a>
            <a
              href="/projects"
              class="gold-edge inline-flex items-center gap-2 px-7 py-3 brush text-lg text-goldbright hover:text-white hover:-translate-y-0.5 neon-rim transition-all duration-300"
            >
              Browse the archive
            </a>
            <a
              href="/#contact"
              class="gold-edge inline-flex items-center gap-2 px-7 py-3 brush text-lg text-goldbright hover:text-white hover:-translate-y-0.5 neon-rim transition-all duration-300"
            >
              Request an audience
            </a>
          {:else}
            <button
              type="button"
              onclick={() => window.location.reload()}
              class="gold-plate inline-flex items-center gap-2 px-7 py-3 brush text-lg text-sumi hover:text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Strike the page again
            </button>
            <a
              href="/#contact"
              class="gold-edge inline-flex items-center gap-2 px-7 py-3 brush text-lg text-goldbright hover:text-white hover:-translate-y-0.5 neon-rim transition-all duration-300"
            >
              Request an audience
            </a>
          {/if}
        </div>

        <div class="mt-14 flex justify-center">
          <a href="/" class="group inline-flex items-center gap-3">
            <span
              class="medallion flex items-center justify-center w-11 h-11 brush text-xl text-sumi group-hover:text-black transition-colors duration-200"
              aria-hidden="true"
            >
              {siteMeta.monogram}
            </span>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</main>

<style>
  .error-seal {
    animation: error-seal-stamp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
  }

  @keyframes error-seal-stamp {
    from {
      opacity: 0;
      transform: scale(2.2) rotate(-14deg);
    }
    60% {
      opacity: 1;
      transform: scale(1.05) rotate(8deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(10deg);
    }
  }
</style>
