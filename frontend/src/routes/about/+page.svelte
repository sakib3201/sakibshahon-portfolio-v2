<script>
  import AboutTimeline from "../../lib/components/AboutTimeline.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
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

    <!-- Additional content section -->
    <section id="skills" class="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 reveal" data-reveal>
          <h2 class="brush gold-text tracking-[0.02em] text-4xl md:text-6xl mb-6">
            Beyond the Code
          </h2>
          <p class="text-lg text-inktextdim leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open source projects,
            or sharing knowledge with the developer community. I believe in continuous learning and staying
            up-to-date with the latest industry trends.
          </p>
        </div>

        <!-- Skills or values section -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="lacquer-raised gold-edge p-6 text-center reveal" data-reveal>
            <div class="medallion w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-sumi" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="brush text-xl text-inktext mb-2">Performance</h3>
            <p class="text-inktextdim">Optimized solutions that deliver exceptional user experiences</p>
          </div>

          <div class="lacquer-raised gold-edge p-6 text-center reveal" data-reveal data-reveal-delay="150">
            <div class="medallion w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-sumi" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="brush text-xl text-inktext mb-2">Quality</h3>
            <p class="text-inktextdim">Clean, maintainable code following best practices and standards</p>
          </div>

          <div class="lacquer-raised gold-edge p-6 text-center reveal" data-reveal data-reveal-delay="300">
            <div class="medallion w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-sumi" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="brush text-xl text-inktext mb-2">Collaboration</h3>
            <p class="text-inktextdim">Working effectively with teams to achieve shared goals</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</main>
