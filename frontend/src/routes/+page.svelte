<script>
  import { siteMeta } from "$lib/data.js";
  import Navbar from "../lib/components/Navbar.svelte";
  import HomepageHero from "../lib/components/HomepageHero.svelte";
  import ImpactStats from "../lib/components/ImpactStats.svelte";
  import ProductsShipped from "../lib/components/ProductsShipped.svelte";
  import ProjectSlider from "../lib/components/ProjectSlider.svelte";
  import ServiceSection from "../lib/components/ServiceSection.svelte";
  import ExperienceTimeline from "../lib/components/ExperienceTimeline.svelte";
  import AwardsSection from "../lib/components/AwardsSection.svelte";
  import YouTubeSection from "../lib/components/YouTubeSection.svelte";
  import HomepageContactMe from "../lib/components/HomepageContactMe.svelte";
  import Footer from "../lib/components/Footer.svelte";

  const title = "Sakib Ahamed Shahon — Software Engineer · Full-Stack & AI";
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    url: siteMeta.url,
    email: `mailto:${siteMeta.email}`,
    jobTitle: "Software Engineer",
    worksFor: { "@type": "Organization", name: "Arraytics" },
    sameAs: [
      "https://github.com/sakib3201",
      "https://www.linkedin.com/in/sakib-shahon/",
      "https://www.youtube.com/@sakibshahon",
      "https://dev.to/sakib3201"
    ]
  };
  const personLdJson = JSON.stringify(personLd).replace(/</g, '\\u003c');
  const personLdScript = '<script type="application/ld+json">' + personLdJson + '</scr' + 'ipt>';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={siteMeta.description} />
  <meta name="author" content="Sakib Ahamed Shahon" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={siteMeta.description} />
  <meta property="og:url" content="{siteMeta.url}/" />
  <meta property="og:image" content="{siteMeta.url}/assets/professional.webp" />
  <meta property="og:site_name" content={siteMeta.name} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={siteMeta.description} />
  <link rel="canonical" href="{siteMeta.url}/" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html personLdScript}
</svelte:head>

<main id="main-content" tabindex="-1" class="bg-gray-900">
  <Navbar />
  <HomepageHero />
  <ImpactStats />
  <ProductsShipped />
  <ProjectSlider />
  <ServiceSection />
  <ExperienceTimeline />
  <AwardsSection />
  <YouTubeSection />
  <HomepageContactMe />
  <Footer />
</main>