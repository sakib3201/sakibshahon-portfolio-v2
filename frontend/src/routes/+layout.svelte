<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<!--
THESIS: The portfolio is a library of work already delivered. Shipped products are leather volumes on the shelf, impact is stamped in brass plates, the career is a ledger, and contact is a letter on the desk. It refuses the dark-hero-gradient dev-portfolio default and its code-motif hero.
OWN-WORLD: A walnut-black study at lamplight. Saddle leather with cream stitching, engraved brass plates, torn paper sheets, and wood shelves. Gilded serif (EB Garamond) for titles, Red Hat Mono for marginalia. Warm dark, physical material, no glass, no glow.
STORY: A visitor opens the shelf and finds installed products as books, opens the ledger and finds the numbers, and believes the engineer who ships AI into real products before reading a single claim.
FIRST VIEWPORT: The shelf itself: six tooled volumes under the gilded name, the CAN DO tagline on a bookplate, ribbon CTAs. The work leads; identity frames it.
FORM: The Reading Shelf — the user-pinned challenger (leather reading shelf) from the direction roll; seed key ce6a033e.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-foil focus:text-ink"
>Skip to main content</a>

{@render children?.()}
