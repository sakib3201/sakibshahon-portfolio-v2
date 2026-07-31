<script>
  import AboutTimeline from "../../lib/components/AboutTimeline.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import { siteMeta, skills } from "../../lib/data.js";

  const icons = /** @type {Record<string, string>} */ ({
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    ai: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    chart:
      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    brain:
      'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  });

  const proofs = /** @type {Record<string, string>} */ ({
    "Web Development": "WP Timetics load −0.45s (~50%) · WPCafe analytics −0.24s (~14%)",
    "AI Engineering": "Unified AI backend — ~35% lower integration cost · ~2× delivery speed",
    "Data Analytics & Visualization": "Multi-threaded pipelines — −34% server cost",
    "Machine Learning": "ML race analytics — +18% user retention (Find My Race Pace)"
  });
</script>

<svelte:head>
  <title>About — Sakib Ahamed Shahon</title>
  <meta
    name="description"
    content="About Sakib Ahamed Shahon — software engineer, competitive programmer, and problem solver."
  />
  <link rel="canonical" href="https://sakibshahon.netlify.app/about" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="About — Sakib Ahamed Shahon" />
  <meta
    property="og:description"
    content="About Sakib Ahamed Shahon — software engineer, competitive programmer, and problem solver."
  />
  <meta property="og:url" content="https://sakibshahon.netlify.app/about" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="About — Sakib Ahamed Shahon" />
  <meta
    name="twitter:description"
    content="About Sakib Ahamed Shahon — software engineer, competitive programmer, and problem solver."
  />
</svelte:head>

<main id="main-content" tabindex="-1" class="relative bg-sumi text-inktext min-h-screen overflow-hidden">
  <!-- Lamplight glow -->
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.16) 0%, rgba(201,162,94,0.05) 55%, transparent 100%);"
    aria-hidden="true"
  ></div>

  <!-- Page content -->
  <div class="relative z-10">
    <Navbar />

    <!-- Hero section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="perspective-scene w-56 h-56 md:w-64 md:h-64 mx-auto mb-10">
          <div class="medallion-float w-full h-full">
            <div class="lacquer-raised gold-edge p-2.5 w-full h-full">
              <div class="relative w-full h-full overflow-hidden bg-sumi border border-gold/30 p-2">
                <img
                  src="/assets/professional.webp"
                  alt="Sakib Ahamed Shahon"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-2 border border-gold/30 pointer-events-none" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
        <h1 class="brush gold-text tracking-[0.02em] text-4xl md:text-6xl">
          About Me
        </h1>
        <p class="text-lg md:text-xl text-inktextdim mt-4">
          Passionate full-stack developer crafting exceptional digital experiences
        </p>
      </div>
    </section>

    <AboutTimeline />

    <!-- Skills section -->
    <section id="skills" class="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 reveal" data-reveal>
          <h2 class="brush gold-text tracking-[0.02em] text-4xl md:text-6xl mb-6">
            The disciplines
          </h2>
          <p class="marginalia text-inktextdim mb-6">Four working disciplines, each proven on work that ships</p>
          <p class="max-w-2xl mx-auto text-lg text-inktextdim leading-relaxed">
            Four years, three companies, and every metric in the ledger above came from these hands-on disciplines —
            web engineering from API to polished UI, AI features engineered to cost less, pipelines that pay for
            themselves, and ML that survives contact with production.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {#each skills as skill, i (skill.title)}
            <article
              class="lacquer-raised gold-edge group relative flex flex-col p-7 md:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-deep neon-rim"
              data-reveal
              data-reveal-delay={i * 60}
            >
              <div class="flex items-start justify-between gap-4 mb-5">
                <span class="medallion reveal-pulse flex items-center justify-center w-14 h-14" aria-hidden="true">
                  <svg class="w-7 h-7 text-sumi" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d={icons[skill.icon] ?? icons.code}></path>
                  </svg>
                </span>
                <span class="marginalia text-goldbright bg-black/25 px-2.5 py-1" aria-hidden="true">
                  N°{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 class="brush gold-text text-2xl mb-2">{skill.title}</h3>
              <p class="text-inktextdim leading-relaxed mb-5">{skill.blurb}</p>

              <ul class="space-y-2.5 pt-4 border-t border-gold/25 mb-6">
                {#each skill.items as item (item)}
                  <li class="flex items-start gap-2.5 text-[0.95rem] text-inktextdim leading-snug">
                    <svg class="w-[0.6rem] h-[0.6rem] mt-1.5 flex-shrink-0 text-gold" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" /></svg>
                    <span>{item}</span>
                  </li>
                {/each}
              </ul>

              {#if proofs[skill.title]}
                <p class="marginalia mt-auto pt-3 border-t border-gold/25 text-gold/80 normal-case">
                  <span class="text-goldbright">Shipped:</span> {proofs[skill.title]}
                </p>
              {/if}
            </article>
          {/each}
        </div>

        <div class="text-center mt-16" data-reveal data-reveal-delay="200">
          <p class="marginalia text-inktextdim mb-6">
            And when the terminal is closed: mentoring the Mymensingh programming community, 15+ LightOJ tutorials,
            and a dev.to blog.
          </p>
          <a
            href={siteMeta.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="gold-plate inline-flex items-center gap-2 px-8 py-3.5 brush text-lg text-sumi hover:text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Download the résumé
            <svg class="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</main>
