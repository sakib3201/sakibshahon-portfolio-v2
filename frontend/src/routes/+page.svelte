<script>
  import { siteMeta, socialLinks, skills } from "$lib/data.js";
  import Seo from "$lib/components/Seo.svelte";
  import Navbar from "../lib/components/Navbar.svelte";
  import HomepageHero from "../lib/components/HomepageHero.svelte";
  import ImpactStats from "../lib/components/ImpactStats.svelte";
  import ProductsShipped from "../lib/components/ProductsShipped.svelte";
  import ProjectSlider from "../lib/components/ProjectSlider.svelte";
  import ServiceSection from "../lib/components/ServiceSection.svelte";
  import HomepageFaq from "../lib/components/HomepageFaq.svelte";
  import ExperienceTimeline from "../lib/components/ExperienceTimeline.svelte";
  import AwardsSection from "../lib/components/AwardsSection.svelte";
  import YouTubeSection from "../lib/components/YouTubeSection.svelte";
  import HomepageContactMe from "../lib/components/HomepageContactMe.svelte";
  import Footer from "../lib/components/Footer.svelte";

  const personId = `${siteMeta.siteOrigin}/#person`;
  const socialUrls = socialLinks.filter(({ href }) => href.startsWith("http")).map(({ href }) => href);
  const knowsAbout = skills
    .flatMap(({ items }) => items)
    .flatMap((item) => item.split(","))
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const siteLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteMeta.name,
        url: `${siteMeta.siteOrigin}/`,
        image: siteMeta.ogImage,
        description: siteMeta.description,
        email: siteMeta.email,
        jobTitle: siteMeta.role,
        worksFor: { "@type": "Organization", name: "Arraytics" },
        alumniOf: { "@type": "CollegeOrUniversity", name: siteMeta.alumniOf },
        knowsAbout,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gazipur",
          addressCountry: "BD"
        },
        sameAs: socialUrls,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteMeta.email,
          url: `${siteMeta.siteOrigin}/#contact`
        }
      },
      {
        "@type": "ProfilePage",
        mainEntity: { "@id": personId }
      },
      {
        "@type": "WebSite",
        name: siteMeta.name,
        url: siteMeta.siteOrigin
      }
    ]
  };
  const siteLdJson = JSON.stringify(siteLd).replace(/</g, "\\u003c");
  const siteLdScript = '<script type="application/ld+json">' + siteLdJson + "</scr" + "ipt>";
</script>

<svelte:head>
  <Seo
    title="Sakib Ahamed Shahon — Software Engineer · Full-Stack & AI"
    description={siteMeta.description}
    canonicalPath="/"
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html siteLdScript}
</svelte:head>

<main id="main-content" tabindex="-1" class="bg-sumi">
  <Navbar />
  <HomepageHero />
  <ImpactStats />
  <ProductsShipped />
  <ProjectSlider />
  <ServiceSection />
  <HomepageFaq />
  <ExperienceTimeline />
  <AwardsSection />
  <YouTubeSection />
  <HomepageContactMe />
  <Footer />
</main>