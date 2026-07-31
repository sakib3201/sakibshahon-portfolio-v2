<script>
	import { afterNavigate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import { initMotion, initParallax } from '../lib/motion.js';

	let { children } = $props();

	let destroyMotion = () => {};

	afterNavigate(() => {
		destroyMotion();
		destroyMotion = initMotion();
	});

	onDestroy(() => destroyMotion());

	let destroyParallax = () => {};

	onMount(() => {
		destroyParallax = initParallax();
	});

	afterNavigate(() => {
		destroyParallax();
		destroyParallax = initParallax();
	});

	onDestroy(() => destroyParallax());
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<!--
THESIS: The portfolio is a yakuza boss's back piece: work already delivered is ink already worn. Six product panels run down the spine, impact is set in gold leaf, the career reads as the family ledger, and contact is an audience with the boss. It refuses the dark-hero-gradient dev-portfolio default and its code-motif hero.
OWN-WORLD: Sumi-black lacquer and golden-black paper, gold-leaf engraving and cinnabar hanko seals, needle linework, a neon rim light after dark. Brush calligraphy (Yuji Syuku) for the name, Zen Kaku Gothic New for text, Red Hat Mono for marginalia. Dark, physical ink, restrained neon.
STORY: A visitor reads the back piece panel by panel: each product a scene inked with its true figures in gold, the ledger carrying the numbers, and believes the engineer who ships AI into real products before reading a single claim.
FIRST VIEWPORT: The back piece turning in 3D: the name as the central medallion, six ink panels along the spine, the CAN DO motto band, impact metrics as gold-leaf engravings. The work leads; identity frames it.
FORM: The Yakuza Ink — hand-crafted cyberpunk mafia anime world, user-pinned (override of roll ce6a033e round 1).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-goldbright focus:text-sumi"
>Skip to main content</a>

{@render children?.()}
