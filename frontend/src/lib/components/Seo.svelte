<script>
  import { siteMeta } from "$lib/data.js";

  export let title;
  export let description;
  export let canonicalPath;
  export let ogImage = siteMeta.ogImage;

  const canonicalUrl = siteMeta.siteOrigin + canonicalPath;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={siteMeta.name} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={siteMeta.ogImageAlt} />
  <meta property="og:site_name" content={siteMeta.name} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>
