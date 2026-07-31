<script>
  import ProjectsHeroSection from "../../lib/components/ProjectsHeroSection.svelte";
  import ProjectLibrary from "../../lib/components/ProjectLibrary.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
</script>

<svelte:head>
  <title>Projects — Sakib Ahamed Shahon</title>
  <meta
    name="description"
    content="Featured projects and experiments by Sakib Ahamed Shahon — Find My Race Pace, ICTBJ-2023, and more."
  />
  <link rel="canonical" href="https://sakibshahon.netlify.app/projects" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Projects — Sakib Ahamed Shahon" />
  <meta
    property="og:description"
    content="Featured projects and experiments by Sakib Ahamed Shahon — Find My Race Pace, ICTBJ-2023, and more."
  />
  <meta property="og:url" content="https://sakibshahon.netlify.app/projects" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Projects — Sakib Ahamed Shahon" />
  <meta
    name="twitter:description"
    content="Featured projects and experiments by Sakib Ahamed Shahon — Find My Race Pace, ICTBJ-2023, and more."
  />
</svelte:head>

<main id="main-content" tabindex="-1" class="bg-gray-900">
  <Navbar />
  <ProjectsHeroSection />
  <ProjectLibrary />
  <Footer />
</main>
