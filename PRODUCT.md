# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing SvelteKit 2 (Svelte 5) + Tailwind CSS 4 + Vite 7, deployed to Netlify via `@sveltejs/adapter-netlify`, package manager pnpm (`frontend/`). Content lives in `frontend/src/lib/data.js`. No new dependencies unless unavoidable.

## Users

Two primary audiences, weighted equally:

1. **Recruiters and hiring managers at product companies** scanning for full-stack + AI engineers. They arrive from LinkedIn/GitHub, skim in 30 seconds, and check claims against the resume PDF.
2. **Clients / freelance prospects** evaluating whether he can build their WordPress or SaaS product. They care about shipped commercial products and proven impact.

## Product Purpose

A personal portfolio for Sakib Ahamed Shahon, Software Engineer at Arraytics, that earns him interviews for AI engineering roles and trust from clients. Success means: a visitor understands what he builds, why it matters, and acts (contact, resume download, GitHub/LinkedIn) — within seconds on the first viewport.

## Positioning

The engineer who ships AI into real products — a unified AI backend powering 20k+ plugin installs, ~35% lower AI integration cost, ~2× faster feature delivery via harness engineering — with commercial WordPress and SaaS products (timetics.ai, Aisentic, Eventin, WP Timetics, Booktics, WPCafe) as proof, not promises. Visitors should remember "The AI that ships."

## Operating Context

- Primary artifact the visitor may download: `frontend/static/assets/sakib_shahon_resume.pdf`.
- Claims must stay resume-accurate. Company/product-scale facts may appear only as labeled product context, never as personal KPIs. No fabricated metrics, testimonials, or benchmarks. No phone number on the site.
- Socials are locked: GitHub `sakib3201`, LinkedIn `sakib-shahon`, YouTube `@sakibshahon`, Blog dev.to `sakib3201`.
- Contact via Web3Forms (client-side form) + email + LinkedIn.
- YouTube featured grid may stay empty until the owner supplies video IDs; empty state must be valid.

## Capabilities and Constraints

- Routes: `/` (home), `/about`, `/projects`. Homepage IA (locked): hero → impact stats → products shipped → featured projects → skills → experience → awards → YouTube → contact → footer.
- Portfolio content sections are driven by `frontend/src/lib/data.js` (siteMeta, socialLinks, impactStats, productsShipped, projects, archiveProjects, skills, experience, awards, youtube, aboutTimeline). Components must keep reading from data, no hardcoded strings.
- 4+ years professional experience (Arraytics Apr 2025–present; Incevio Nov 2023–Feb 2025; Data Sapience Jan 2022–Nov 2023).
- Awards: ICPC 2023 Mymensingh Division Champion (top 4% nationally); NASA Space Apps 2019 Regional Champion + 2020 2nd Runner-up; 15+ official LightOJ tutorials.
- Featured projects: Find My Race Pace (React/Node/Python ML; −21% load, +18% retention) and ICTBJ-2023 conference site. Archive: Decentralized Voting App, Amar Shop.
- Assets available: `professional.webp` (portrait), `headshotprofile.jpg`, project screenshots (ictbj, evoting, amarshop), company logos (arraytics, incevio, datasapience). Missing: product logos for the six shipped products, Find My Race Pace screenshot — text/initials fallback required.
- Technical: prefers-reduced-motion respected; WCAG contrast ≥ 4.5:1; skip link; SEO/OG meta in place per route.

## Brand Commitments

- Name: Sakib Ahamed Shahon; monogram "SA"; favicon exists.
- Tagline identity: The "CAN DO" Software Artisan — keep the personality, voice, and tagline usage.
- Role line: Software Engineer · Full-Stack & AI.
- Dark theme is a standing visual commitment; the rest of the visual world is explicitly replaceable ("nothing is sacred visually").
- Personality register: bold and distinctive. Visual risk appetite: high ("go bold, accept risk").
- Audience weighting: recruiters and clients equally.
- Positioning priority: the AI that ships — metrics are the story (20k+ installs, ~35% cost, ~2× delivery).

## Evidence on Hand

- `frontend/static/assets/sakib_shahon_resume.pdf` — the canonical source for all claims.
- `improvement_plan.md` (repo root) — owner-confirmed content decisions from prior session.
- Real project screenshots and company logos in `frontend/static/assets/`.
- No testimonials, no press, no client logos — must not fabricate.

## Product Principles

1. Truth wins: every number is resume-sourced; product scale stays labeled as product context.
2. AI ships first: the ~35% / 20k+ / ~2× story leads every surface.
3. Serve both audiences: recruiter skimmability and client trust in the same page.
4. One identity: the CAN DO artisan — bold, confident, memorable, never corporate-flat.
5. Dark by commitment, everything else replaceable if it sharpens the message.
