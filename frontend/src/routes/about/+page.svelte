<script>
  import AboutTimeline from "../../lib/components/AboutTimeline.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
</script>

<main class="bg-gradient-to-br from-gray-900 via-slate-800 to-black min-h-screen">
  <!-- Background decorative elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/10 rounded-full blur-3xl"></div>
  </div>

  <!-- Navbar spacing -->
  <div class="h-16 md:h-20"></div>

  <!-- Page content -->
  <div class="relative z-10">
    <Navbar />

    <!-- Hero section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <div class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-2xl">
            <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <img
                src="/assets/professional.webp"
                alt="Sakib Shahon"
                class="w-28 h-28 object-cover rounded-full shadow-inner"
              />
            </div>
          </div>
          <h1 class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            About Me
          </h1>
          <p class="text-xl text-slate-300 leading-relaxed">
            Passionate full-stack developer crafting exceptional digital experiences
          </p>
        </div>
      </div>
    </section>

    <AboutTimeline />

    <!-- Additional content section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-6">Beyond the Code</h2>
          <p class="text-lg text-slate-300 leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open source projects,
            or sharing knowledge with the developer community. I believe in continuous learning and staying
            up-to-date with the latest industry trends.
          </p>
        </div>

        <!-- Skills or values section -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/30">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Performance</h3>
            <p class="text-slate-400">Optimized solutions that deliver exceptional user experiences</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/30">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Quality</h3>
            <p class="text-slate-400">Clean, maintainable code following best practices and standards</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/30">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Collaboration</h3>
            <p class="text-slate-400">Working effectively with teams to achieve shared goals</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</main>
