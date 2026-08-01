<script>
  import ProjectsHeroSection from "../../lib/components/ProjectsHeroSection.svelte";
  import ProjectLibrary from "../../lib/components/ProjectLibrary.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Seo from "../../lib/components/Seo.svelte";
</script>

<svelte:head>
  <Seo
    title="Projects — Sakib Ahamed Shahon"
    description="Featured projects and experiments by Sakib Ahamed Shahon — Find My Race Pace, ICTBJ-2023, and more."
    canonicalPath="/projects"
  />
</svelte:head>

<main id="main-content" tabindex="-1" class="bg-sumi">
  <Navbar />
  <ProjectsHeroSection />
  <ProjectLibrary />
  <Footer />
</main>
