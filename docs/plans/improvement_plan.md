# Sakib Shahon Portfolio — Improvement Plan

> Implementation-ready plan for updating the portfolio at `E:\GithubRepo\sakibshahon-portfolio-v2`.
> This document is the single source of truth for subagents. Each task block is self-contained (files, data shapes, copy, acceptance criteria) and can be delegated independently.
>
> **Last reviewed:** 2026-07-31 (v2 — resume-accurate awards/metrics, social URLs locked, product-stat policy)

---

## 1. Context & Goals

### Stack
- SvelteKit 2 (Svelte 5) + Tailwind CSS 4 + Vite 7
- Adapter: `@sveltejs/adapter-netlify` (Netlify)
- Package manager: `pnpm` (`frontend/package.json`)
- Content is mostly hardcoded in components; partial data layer at `frontend/src/lib/data.js`
- Verify from `frontend/`: `pnpm check`, `pnpm lint`, `pnpm build`

### Goals (approved)
1. Fix broken links, missing components, and dead UI.
2. Update content to match resume: `frontend/static/assets/sakib_shahon_resume.pdf`.
3. Add **Products Shipped** for Arraytics products (WP Timetics, Booktics, Eventin, WPCafe, Aisentic, Timetics AI SaaS).
4. Add **YouTube** section (`https://www.youtube.com/@sakibshahon`) — featured grid + subscribe CTA.
5. Add **Awards** from resume (ICPC 2023 champion, NASA Space Apps, LightOJ 15+ tutorials).
6. Serve **recruiters and clients** equally (metrics + contact/case-study CTAs).
7. Raise design quality (visual rhythm, WCAG, performance, motion) per §7.
8. Add SEO/OG meta; keep dark theme.

### Decisions locked in
| Topic | Decision |
|---|---|
| Plan filename | `improvement_plan.md` (this file) |
| Products | Dedicated homepage **Products Shipped** section |
| YouTube | Featured video grid (3–6 placeholders) + channel CTA; no API key |
| Audience | Recruiters **and** clients |
| Personal projects | Featured: **Find My Race Pace** + **ICTBJ-2023**; archive: Evoting, Amar Shop |
| Awards | Homepage strip + optional About expansion |
| YouTube URL | `https://www.youtube.com/@sakibshahon` |
| GitHub | `https://github.com/sakib3201` (resume canonical; replace site’s `sakibshahon`) |
| LinkedIn | `https://www.linkedin.com/in/sakib-shahon/` (resume canonical) |
| Blog | `https://dev.to/sakib3201` |
| Phone | **Do not** show on portfolio |
| Company product stats | **Product context only** (label as product scale); personal metrics stay personal |
| Codolio | Awards may include optional `href`; leave empty until owner provides URL |
| YouTube video IDs | Owner fills later; empty `featured` is valid |

---

## 2. Current-State Audit

### Routes
| Route | File | Sections | Notes |
|---|---|---|---|
| `/` | `src/routes/+page.svelte` | Navbar → Hero → ProjectSlider → ServiceSection → ExperienceTimeline → Contact → Footer | Resume CTA broken |
| `/about` | `src/routes/about/+page.svelte` | Navbar → hero → AboutTimeline → values → Footer | No awards; timeline ends 2024 |
| `/projects` | `src/routes/projects/+page.svelte` | **LegacyNavbar (missing)** → ProjectsHero → ProjectLibrary → Footer | Build/runtime break |

### Critical bugs
| # | Bug | Location | Fix |
|---|---|---|---|
| B1 | Resume href `/assets/Sakib-Ahamed-Shahon-Resume.pdf` — file is `sakib_shahon_resume.pdf` | `HomepageHero.svelte:26` | Use `siteMeta.resumeUrl` |
| B2 | Imports nonexistent `LegacyNavbar.svelte` | `projects/+page.svelte` | Use `Navbar.svelte` |
| B3 | Nav `#contact` has no target | `Navbar.svelte` | `id="contact"` + `scroll-mt-24` on contact section |
| B4 | “View Skills in Detail” is a dead button | `ServiceSection.svelte` | Link to `/about#skills` or remove |
| B5 | Theme toggle no-ops (dark-only site) | `Navbar.svelte` | Remove; replace with YouTube icon link |
| B6 | No SEO (title/meta/OG) | `app.html` / layout | Task 7 `<svelte:head>` + JSON-LD |
| B7 | Nested `<a><button>` | Hero, ProjectSlider | Single `<a>` styled as button |
| B8 | Mixed socials: GitHub `sakibshahon`, LinkedIn `sakib-ahamed-shahon`, YouTube channel ID | Footer, Contact | Centralize per locked URLs in §1 |
| B9 | Web3Forms key in client | Contact | OK for Web3Forms; add honeypot field |
| B10 | Monogram “SA” (nav) vs “SS” (footer) | Navbar, Footer | Use `siteMeta.monogram` = `"SA"` |

### Content gaps vs resume (corrected)
| Resume fact | Site / old plan issue | Action |
|---|---|---|
| Arraytics Apr 2025–Present; timetics.ai, Aisentic 20k+ installs, Eventin, WPTimetics, Booktics, WPCafe | Vague; no dates/metrics | Full metrics + product list |
| Unified AI backend; **~35% lower AI integration cost** | Missing | Experience + Aisentic product role |
| **Harness engineering ~2× feature delivery** | Missing from plan v1 | Add to Arraytics metrics |
| WPTimetics **−0.45s (~50%)** page load | Missing | Personal metric |
| WPCafe analytics **−0.24s (~14%)** per API call | Missing | Personal metric |
| Incevio Nov 2023–Feb 2025; zCart; 1000+ platforms | No dates; thin metrics | Full resume bullets |
| Data Sapience **Jan 2022 – Nov 2023** | Plan wrongly said “2023” only | Correct period |
| Find My Race Pace — React/Node/Python ML training plans | Missing; plan copy was generic | Full project + metrics |
| **ICPC 2023 Mymensingh Division Champion; top 4% nationally** | Plan wrongly said “Regionalist 2020” | Fix awards |
| **NASA Space Apps: 2019 Regional Champion; 2020 2nd Runner-up** | Plan wrongly said “2020 finalist” | Fix awards |
| **15+ official LightOJ tutorials** + Codolio | Plan said “2021 tutorials” only | Fix awards + optional Codolio link |
| Skills: Postgres, Next.js, FastAPI, Docker, GHA, Bitbucket, spec-driven dev | Incomplete on site | Skills + technical list |

### Arraytics products (context for Products Shipped)
| Product | Type | Public product context (not personal claims) | URL | Your personal angle (resume) |
|---|---|---|---|---|
| Timetics AI | SaaS | Appointment/booking SaaS; AI scheduling agent | https://timetics.ai/ | Worked on SaaS for appointment & booking |
| Aisentic | WP | AI admin chat; Eventin/WPCafe/Timetics integrations | https://themewinter.com/aisentic/ | Built AI plugin powering **20k+ installs**; unified AI backend **−35% cost** |
| Booktics | WP | Service booking plugin | https://arraytics.com/booktics/ | Worked on Booktics (greenfield per existing site copy — keep if still accurate) |
| WP Timetics | WP | Appointment scheduling; calendar sync | https://arraytics.com/timetics/ | Integrations + **−0.45s load (~50%)** |
| Eventin | WP | Events/tickets | https://themewinter.com/eventin/ | Legacy product contributions |
| WPCafe | WP | Restaurant menu/order/reservation | https://themewinter.com/wp-cafe/ | Analytics query **−0.24s (~14%)** |

**Policy:** On product cards, put company/product scale in a muted “Product” line if used at all. Put **your** metrics in “What I did” / metric chips. Never present 17.5k organizers or 273k downloads as personal achievements.

---

## 3. Target Information Architecture

### Homepage (`/`) section order
1. **Navbar** — monogram SA; Home, Projects, About, Blog, Contact; YouTube icon (no theme toggle)
2. **Hero** — impact tagline + CTAs (Work / Resume / Contact)
3. **ImpactStats** — personal/credible numbers only (see §4)
4. **ProductsShipped** (`id="products"`) — 6 product cards
5. **Projects** (`id="projects"`) — Race Pace + ICTBJ; link to `/projects`
6. **Skills** (`id="skills"`) — 4 cards incl. AI Engineering
7. **Experience** — Arraytics → Incevio → Data Sapience (full dates + metrics)
8. **Awards** (`id="awards"`) — ICPC 2023, NASA 2019/2020, LightOJ 15+
9. **YouTube** — channel CTA + optional featured grid
10. **Contact** (`id="contact"`) — form + email/LinkedIn only (no phone)
11. **Footer** — unified socials from `data.js`

### About (`/about`)
- Keep hero + timeline; add **2025** Arraytics entry; refresh 2024 copy so it doesn’t imply “still learning only.”
- Awards detail (years + optional Codolio link).
- `id="skills"` for Skills CTA.

### Projects (`/projects`)
- Fix Navbar; featured from `projects`; archive from `archiveProjects`.

### Section IDs (nav anchors)
| ID | Section |
|---|---|
| `#products` | Products Shipped |
| `#projects` | Featured projects (homepage) |
| `#skills` | Skillset |
| `#awards` | Awards |
| `#contact` | Contact |

Homepage navbar should prefer real routes for multi-page (`/projects`, `/about`) and hash links only for homepage sections. Contact on non-home pages: `/#contact`.

---

## 4. Data Layer Design (`frontend/src/lib/data.js`)

Single source of truth. Implement exactly (adjust only if owner corrects facts).

```js
export const siteMeta = {
  name: 'Sakib Ahamed Shahon',
  monogram: 'SA',
  tagline: 'The "CAN DO" Software Artisan',
  role: 'Software Engineer · Full-Stack & AI',
  // "installs" not "businesses" — resume: 20k+ active installations
  description:
    'Software engineer shipping AI-powered WordPress and SaaS products. Built a unified AI backend powering 20k+ plugin installs and cut AI integration cost by ~35%.',
  url: 'https://sakibshahon.netlify.app',
  email: 'sakib3201@gmail.com',
  location: 'Gazipur, Bangladesh',
  resumeUrl: '/assets/sakib_shahon_resume.pdf'
};

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/sakib3201',
    color: 'gray',
    label: 'GitHub profile'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sakib-shahon/',
    color: 'blue',
    label: 'LinkedIn profile'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@sakibshahon',
    color: 'red',
    label: 'YouTube channel'
  },
  {
    name: 'Blog',
    href: 'https://dev.to/sakib3201',
    color: 'gray',
    label: 'Dev.to blog'
  },
  {
    name: 'Email',
    href: 'mailto:sakib3201@gmail.com',
    color: 'gray',
    label: 'Send email'
  }
];

// Personal / verifiable impact only — no company vanity metrics
export const impactStats = [
  { value: '20k+', label: 'Plugin installs powered (Aisentic)' },
  { value: '~35%', label: 'Lower AI integration cost' },
  { value: '~2×', label: 'Faster feature delivery (harness eng.)' },
  { value: '4+', label: 'Years professional experience' }
];
```

### Products shipped
```js
export const productsShipped = [
  {
    name: 'Timetics AI',
    tag: 'SaaS',
    image: '/assets/timetics-logo.webp', // optional; fallback to name chip
    description:
      'Appointment and booking management SaaS with AI-assisted scheduling workflows.',
    role: 'Software engineer on the SaaS product (timetics.ai)',
    metrics: ['SaaS booking platform', 'AI scheduling features'],
    // productContext is optional muted line — company/product scale, NOT personal
    productContext: null,
    links: { product: 'https://timetics.ai/' }
  },
  {
    name: 'Aisentic',
    tag: 'WordPress',
    image: '/assets/aisentic-logo.webp',
    description:
      'AI plugin that quietly powers WordPress products — chat-driven admin assistance across the Arraytics ecosystem.',
    role: 'Built unified AI backend infrastructure shared across company products',
    metrics: ['20k+ active installations', '~35% lower AI integration cost'],
    productContext: null,
    links: { product: 'https://themewinter.com/aisentic/' }
  },
  {
    name: 'Booktics',
    tag: 'WordPress',
    image: '/assets/booktics-logo.webp',
    description:
      'WordPress booking plugin for service businesses — services, teams, payments, and automation.',
    role: 'Product engineering on Booktics (including greenfield work)',
    metrics: ['Service booking workflows', 'Calendar & payment integrations'],
    productContext: null,
    links: { product: 'https://arraytics.com/booktics/' }
  },
  {
    name: 'WP Timetics',
    tag: 'WordPress',
    image: '/assets/arraytics-logo.webp',
    description:
      'WordPress appointment scheduling plugin with calendar sync and booking workflows.',
    role: 'Feature work, integrations, and performance improvements',
    metrics: ['−0.45s page load (~50%)', 'Google / Outlook calendar integrations'],
    productContext: null,
    links: { product: 'https://arraytics.com/timetics/' }
  },
  {
    name: 'Eventin',
    tag: 'WordPress',
    image: '/assets/eventin-logo.webp',
    description:
      'WordPress event calendar and ticketing plugin for modern events.',
    role: 'Engineering on legacy Eventin codebase',
    metrics: ['Legacy platform contributions', 'AI-related product features'],
    productContext: null, // do NOT put "17.5k organizers" as personal metric
    links: { product: 'https://themewinter.com/eventin/' }
  },
  {
    name: 'WPCafe',
    tag: 'WordPress',
    image: '/assets/wpcafe-logo.webp',
    description:
      'Restaurant menu, online ordering, and table reservation plugin for WordPress.',
    role: 'Backend performance and analytics improvements',
    metrics: ['−0.24s analytics API (~14%)', 'Query caching & optimization'],
    productContext: null,
    links: { product: 'https://themewinter.com/wp-cafe/' }
  }
];
```

### Projects
```js
export const projects = [
  {
    imageSrc: '/assets/findracepace.webp', // owner screenshot; fallback gradient card if missing
    altText: 'Find My Race Pace',
    title: 'Find My Race Pace',
    description:
      'Training plans and race analytics for long-distance runners. Built with React.js, Node.js, and Python machine learning.',
    highlights: [
      '−21% load time via caching and Web Workers',
      '+18% user retention with race data analytics',
      '~25% higher satisfaction'
    ],
    liveLink: 'https://www.findracepace.com/',
    youtubeLink: '',
    githubLink: ''
  },
  {
    imageSrc: '/assets/ictbjhomepage.png',
    altText: 'ICTBJ-2023',
    title: 'ICTBJ-2023',
    description:
      "Official site for Jatiya Kabi Kazi Nazrul Islam University's research conference on Technology, Business, and Justice — paper submission and registration for hundreds of students, teachers, and researchers.",
    highlights: [],
    liveLink: 'https://ictbj.jkkniu.edu.bd/',
    youtubeLink: '',
    githubLink: ''
  }
];

export const archiveProjects = [
  {
    imageSrc: '/assets/evotingproject.png',
    altText: 'Decentralized Voting App',
    title: 'Decentralized Voting App',
    description:
      'Blockchain voting with facial-recognition authentication (university experiment).',
    highlights: [],
    liveLink: '',
    youtubeLink: '',
    githubLink: ''
  },
  {
    imageSrc: '/assets/amarshopproject.png',
    altText: 'Amar Shop',
    title: 'Amar Shop',
    description:
      'Shop management: inventory, financial reports, customer and sales tools (university project).',
    highlights: [],
    liveLink: '',
    youtubeLink: '',
    githubLink: ''
  }
];
```

### Skills
```js
export const skills = [
  {
    title: 'Web Development',
    icon: 'code',
    blurb: 'Full-stack products from API to polished UI — WordPress plugins to SaaS.',
    items: [
      'PHP, JavaScript, Python',
      'Laravel, React.js, Next.js, Node.js, Express.js, FastAPI',
      'WordPress plugin engineering (PHP + React)',
      'Postgres, MySQL, MongoDB',
      'GitHub Actions, Docker, Bitbucket'
    ]
  },
  {
    title: 'AI Engineering',
    icon: 'ai',
    blurb: 'Production AI features — harnesses, agents, and cost-aware systems.',
    items: [
      'Harness engineering for legacy projects (~2× delivery speed)',
      'Spec-driven development',
      'Small language model fine-tuning and evaluation',
      'Cost optimization for agentic features (~35% AI cost reduction)',
      'AI features across multi-product WordPress ecosystems'
    ]
  },
  {
    title: 'Data Analytics & Visualization',
    icon: 'chart',
    blurb: 'Pipelines, scrapers, and visuals that turn data into decisions.',
    items: [
      'Pandas, NumPy, SQL analytics',
      'Seaborn & Matplotlib',
      'Selenium & Beautiful Soup',
      'Multi-threaded pipelines (Data Sapience: −34% server cost)'
    ]
  },
  {
    title: 'Machine Learning',
    icon: 'brain',
    blurb: 'Applied ML for products and research — from models to deployment.',
    items: [
      'PyTorch, TensorFlow / Keras, Scikit-learn',
      'Forecasting and classical ML',
      'NLP toolkits (NLTK, spaCy)',
      'Model-serving minded CI/CD and Docker'
    ]
  }
];
```

### Experience (resume-accurate)
```js
export const experience = [
  {
    company: 'Arraytics',
    logo: '/assets/arraytics-logo.webp',
    role: 'Software Engineer',
    period: 'April 2025 — Present',
    badge: 'Currently Working',
    highlight: true,
    description:
      'Worked on timetics.ai (SaaS appointment/booking), Aisentic (AI plugin powering 20k+ installs), and WordPress products Eventin, WP Timetics, Booktics, and WPCafe — powering thousands of active businesses.',
    metrics: [
      'Unified AI backend across products — ~35% lower AI integration cost',
      'Harness engineering on legacy setups — ~2× faster feature delivery',
      'WP Timetics page load improved by 0.45s (~50%)',
      'WPCafe analytics API improved by 0.24s (~14%) via cache + query optimization'
    ],
    tags: ['WordPress', 'PHP', 'React.js', 'MySQL', 'AI', 'SaaS']
  },
  {
    company: 'Incevio',
    logo: '/assets/incevio_logo.webp',
    role: 'Web Developer',
    period: 'November 2023 — February 2025',
    badge: null,
    highlight: false,
    description:
      'REST APIs, end-to-end features, and automated tests for zCart multivendor e-commerce — a top-rated product powering 1,000+ e-commerce platforms.',
    metrics: [
      'Plugins adding ~$500 value per sale (payments, shipping, Shopify, POS, affiliate, etc.)',
      'User-inputted translation system — +12% satisfaction; related code −80% via traits',
      'PhpUnit + Dusk automation — ~23% faster development',
      'Payment code −60% via strategy pattern',
      'View response time −16% (0.2s) with caching and chunking'
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'PhpUnit', 'Dusk']
  },
  {
    company: 'Data Sapience Lab',
    logo: '/assets/datasapiencelogo-nobg.png',
    role: 'Software Engineer',
    period: 'January 2022 — November 2023',
    badge: null,
    highlight: false,
    description:
      'Led teams building full-stack custom sites, machine learning and data analytics software, visualizations, and automated web scrapers.',
    metrics: [
      'Data pipeline efficiency up — server costs −34% via multi-threading',
      'Team tools streamlined — sprint cycles −9%, delivery +11%'
    ],
    tags: ['Python', 'ML', 'React.js', 'Node.js', 'MongoDB', 'Leadership']
  }
];
```

### Awards (resume-accurate)
```js
export const awards = [
  {
    title: 'ICPC 2023 Mymensingh Division Champion',
    year: '2023',
    description: 'Division champion; placed in the top 4% nationally.',
    icon: 'trophy',
    href: null // optional external link
  },
  {
    title: 'NASA Space Apps Challenge',
    year: '2019–2020',
    description: '2019 Regional Champion; 2020 2nd Runner-up.',
    icon: 'rocket',
    href: null
  },
  {
    title: 'LightOJ Official Tutorials',
    year: '—',
    description:
      'Authored 15+ official tutorials. Competitive programming profile on Codolio (link when provided).',
    icon: 'book',
    href: null // TODO(owner): Codolio URL
  }
];
```

### YouTube
```js
export const youtube = {
  channelUrl: 'https://www.youtube.com/@sakibshahon',
  handle: '@sakibshahon',
  blurb:
    'Tutorials, engineering stories, and behind-the-scenes of shipping software — WordPress, AI, and full-stack development.',
  featured: [
    // TODO(owner): 3–6 items
    // { id: 'YOUTUBE_VIDEO_ID', title: 'Title', description: 'One-line description' }
  ]
};
```

### About timeline
Keep existing entries; **append** 2025; **edit** 2024 so it is past-tense / not “still only learning”:

```js
// append
{
  align: 'start',
  time: '2025',
  title: 'Shipping AI Products',
  description:
    'Joined Arraytics as a Software Engineer. Worked on timetics.ai, Aisentic (20k+ installs), Eventin, WP Timetics, Booktics, and WPCafe. Built unified AI backend infrastructure cutting AI integration cost by ~35%, improved delivery speed ~2× with harness engineering, and shipped measurable performance wins on Timetics and WPCafe.'
}
```

Also fix typo in 2024 entry: `acommunity` → `community` when editing.

Re-export new symbols from `src/lib/index.js` if that barrel is used.

---

## 5. Task Breakdown (subagent-ready)

All commands run in `frontend/`.

### Task 1 — Data layer foundation  
**Depends on:** none  
**Files:** `src/lib/data.js`, `src/lib/index.js`  
**Work:**
- Implement all exports in §4 (siteMeta, socialLinks, impactStats, productsShipped, projects, archiveProjects, skills, experience, awards, youtube, aboutTimeline).
- Do **not** invent metrics; use resume wording.
- Empty `youtube.featured` and null award `href`s are valid.
**Acceptance:** exports used by at least one import path; `pnpm check` + `pnpm lint` pass.

### Task 2 — Bug fixes  
**Depends on:** Task 1 preferred (can stub imports)  
**Files:** `HomepageHero.svelte`, `Navbar.svelte`, `Footer.svelte`, `HomepageContactMe.svelte`, `ServiceSection.svelte`, `ProjectSlider.svelte`, `projects/+page.svelte`  
**Work:**
- B1–B5, B7–B10 per §2.
- All socials from `socialLinks`; GitHub `sakib3201`; LinkedIn `sakib-shahon`; YouTube `@sakibshahon`.
- Contact: no phone; `id="contact"` + `scroll-mt-24`.
- Nav Contact on non-home: `href="/#contact"`.
**Acceptance:** `/projects` loads with Navbar; resume PDF opens; no theme toggle; monogram SA; check passes.

### Task 3 — ImpactStats + ProductsShipped + Awards  
**Depends on:** Task 1  
**New files:** `ImpactStats.svelte`, `ProductsShipped.svelte`, `AwardsSection.svelte`  
**Edit:** `+page.svelte`  
**Work:**
- ImpactStats after Hero — 4 personal stats.
- ProductsShipped `id="products"` — 6 cards from data; logo plate with **name fallback** if image 404; role + personal metrics; optional muted `productContext`.
- AwardsSection `id="awards"` after Experience — 3 awards; if `href`, make title a link.
- Wire homepage order per §3.
**Acceptance:** no hardcoded product/award strings in components; graceful image fallback.

### Task 4 — Experience + Skills + Hero  
**Depends on:** Task 1  
**Files:** `ExperienceTimeline.svelte`, `ServiceSection.svelte`, `HomepageHero.svelte`, `about/+page.svelte`  
**Work:**
- Experience from `experience` array (Arraytics first, full dates, metric bullets).
- Skills 4-column responsive grid from `skills`; CTA → `/about#skills`.
- Hero copy from §6; CTAs: `#products` or `#projects`, resume, `#contact`.
- `prefers-reduced-motion` disables name wave.
- About: `id="skills"`; timeline uses updated `aboutTimeline`.
**Acceptance:** Incevio/Arraytics/Data Sapience metrics match resume; Data Sapience dates Jan 2022–Nov 2023.

### Task 5 — YouTube section  
**Depends on:** Task 1  
**New:** `YouTubeSection.svelte`  
**Edit:** `+page.svelte`  
**Work:**
- Header + handle + blurb + subscribe CTA (red gradient).
- If `featured.length`: thumbnail cards via `https://i.ytimg.com/vi/{id}/hqdefault.jpg`, link to watch URL.
- If empty: CTA-only (no broken grid). No iframes by default.
**Acceptance:** works with empty `featured`.

### Task 6 — Projects refresh  
**Depends on:** Task 1  
**Files:** ProjectSlider, ProjectLibrary, ProjectCard, ProjectLibraryCard, `projects/+page.svelte`  
**Work:**
- Featured = `projects` (Race Pace + ICTBJ); show `highlights` if present.
- `/projects` archive section = `archiveProjects` (muted, “University & experimental”).
- Empty links → hide button or disabled state (no dead hrefs).
**Acceptance:** 2 featured; 2 archive; Race Pace links to findracepace.com.

### Task 7 — SEO, a11y, design polish  
**Depends on:** Tasks 1–6  
**Files:** `app.html`, `+layout.svelte`, route pages, `app.css`, `static/robots.txt`, optional `static/sitemap.xml`  
**Work:**
- `<svelte:head>` titles/descriptions/OG/Twitter/canonical per route.
- JSON-LD `Person` with name, url, email, jobTitle, sameAs: GitHub, LinkedIn, YouTube, dev.to.
- Skip link; landmarks; focus-visible rings; reduced-motion; lazy images; alternate section blob density.
- Fix nested interactive elements if any remain.
**Acceptance:** `pnpm build` succeeds; no a11y regressions in svelte-check.

### Task 8 — QA  
**Depends on:** Tasks 1–7  
**Work:** `pnpm check && pnpm lint && pnpm build`; manual checklist in §9.  
**Acceptance:** written QA notes for owner.

---

## 6. Copy Drafts

### Hero
- Eyebrow: `Software Engineer · Full-Stack & AI`
- H1: `Sakib Ahamed Shahon`
- Subline: `I ship AI-powered WordPress and SaaS products — including systems behind 20k+ plugin installs — and I can build yours.`
- Tagline (keep): `The "CAN DO" Software Artisan`
- CTAs: `View products` → `#products` · `Download resume` → resume PDF · `Contact me` → `#contact`

### Products Shipped
- Header: `Products I've Shipped`
- Sub: `Work at Arraytics across SaaS and WordPress — booking, events, restaurants, and AI. Metrics below are from my contributions unless labeled as product context.`
- Link label: `Visit product ↗`

### Impact stats
- `20k+` — Plugin installs powered (Aisentic)
- `~35%` — Lower AI integration cost
- `~2×` — Faster feature delivery (harness eng.)
- `4+` — Years professional experience

### Awards (exact)
- `ICPC 2023 Mymensingh Division Champion — Top 4% nationally`
- `NASA Space Apps Challenge — 2019 Regional Champion; 2020 2nd Runner-up`
- `LightOJ — 15+ official tutorials authored`

### YouTube
- Header: `Watch on YouTube`
- Sub: `Engineering stories and tutorials. {handle}`
- CTA: `Subscribe on YouTube`

### Contact
- Keep existing tone; **no phone**; email + LinkedIn only.

---

## 7. Design System (impeccable-style QA)

### Palette
| Token | Value | Use |
|---|---|---|
| bg-base | gray-900 → slate-800 → black | pages |
| surface | slate-800/50 + border-slate-700/30 | cards |
| primary | cyan↔blue gradients | CTAs, headings |
| accent-red | red-600 → rose-600 | YouTube only |
| text | white / slate-300 / slate-400 | type |

### Layout
- `py-20`, `max-w-7xl`, consistent horizontal padding.
- Alternate blob density every other section (avoid identical section chrome).

### Components
- Buttons = `<a>` or real `<button type="submit">` only — never nest.
- Cards: rounded-2xl, hover lift, corner accent.
- Metric bullets: cyan `✓` or `◆`.
- Product logo plate: white bg, object-contain; fallback = initials/name chip.

### Motion & type
- Wave animation off under `prefers-reduced-motion`.
- Transitions ≤ 300ms.
- Responsive type without `!important` hacks.

### A11y & perf
- Skip link, landmarks, aria-labels on icon links, focus-visible, contrast ≥ 4.5:1.
- Lazy-load below-fold images; width/height or aspect-ratio.

---

## 8. Assets

| Asset | Path | Notes |
|---|---|---|
| Timetics / Aisentic / Booktics / Eventin / WPCafe logos | `static/assets/*.webp` | Optional; **fallback required** |
| Find My Race Pace screenshot | `static/assets/findracepace.webp` | Owner-provided preferred |
| Resume (existing) | `static/assets/sakib_shahon_resume.pdf` | Do not rename without updating `resumeUrl` |
| Existing logos | `arraytics-logo.webp`, `incevio_logo.webp`, `datasapiencelogo-nobg.png` | Reuse |

Subagents: if a logo URL can’t be fetched cleanly, ship with empty `image` and text fallback — do not block on assets.

---

## 9. Verification

```bash
cd frontend
pnpm install   # if needed
pnpm check
pnpm lint
pnpm build
pnpm dev
```

### Global acceptance
1. check / lint / build pass after each task.
2. No broken asset or hash links.
3. **No fabricated metrics** — resume or labeled product context only.
4. Homepage order matches §3.
5. YouTube empty-state works.
6. Social URLs: GitHub `sakib3201`, LinkedIn `sakib-shahon`, YouTube `@sakibshahon`.
7. Awards match resume years/titles (ICPC **2023** champion, NASA **2019/2020**, LightOJ **15+**).
8. No public phone number.
9. No new dependencies unless unavoidable.

### Manual QA checklist
- [ ] Resume PDF downloads
- [ ] `/projects` navbar works
- [ ] `/#contact` scrolls on home; Contact nav works from `/about` and `/projects`
- [ ] All external links open correctly
- [ ] Mobile menu open/close; body scroll lock cleared
- [ ] Reduced motion: no name wave
- [ ] Product cards render without images
- [ ] Awards text matches resume
- [ ] GitHub link is sakib3201

---

## 10. Execution Order

```
Parallel:     Task 1 (data) + Task 2 (bugs)
Then:         Task 3 (products/stats/awards)
Parallel:     Task 4 (experience/skills/hero) + Task 5 (YouTube) + Task 6 (projects)
Then:         Task 7 (SEO/a11y)
Finally:      Task 8 (QA)
```

Suggested: one subagent per task; Task 8 last after human spot-check.

---

## 11. Out of Scope

- YouTube Data API live feed
- Full light theme
- In-app blog / CMS / i18n
- Backend beyond Web3Forms
- Showing phone number
- Claiming company product vanity metrics as personal KPIs
- Full TypeScript migration

---

## 12. Open Items (owner)

- [ ] Provide 3–6 YouTube video IDs + titles + one-line descriptions for `youtube.featured`
- [ ] Provide Codolio profile URL for LightOJ / CP award link (optional `awards[2].href`)
- [ ] Provide Find My Race Pace screenshot (or approve text-only card)
- [ ] Confirm Booktics “ground up” wording still accurate for public portfolio
- [ ] Optional: product logo files in `static/assets/`
- [ ] Optional: sitemap.xml after SEO pass

---

## 13. Changelog (plan revisions)

### v2 (2026-07-31) — review pass
- Corrected **awards** to resume: ICPC 2023 Mymensingh Champion (top 4%); NASA 2019 champion + 2020 2nd runner-up; LightOJ **15+** tutorials.
- Corrected **Data Sapience** dates to Jan 2022 – Nov 2023.
- Expanded **Incevio** and **Arraytics** metrics to full resume bullets (incl. ~2× harness engineering).
- Fixed **Find My Race Pace** stack/metrics (React/Node/Python ML; −21% load; +18% retention).
- Locked socials: GitHub **sakib3201**, LinkedIn **sakib-shahon**, YouTube **@sakibshahon**.
- Product stats policy: personal metrics only; no vanity product scale as personal claims.
- Hero/impact copy: **installs**, not “20k+ businesses.”
- No phone on site; Codolio optional empty href.
- Skills aligned to resume (Postgres, Next.js, FastAPI, CI/CD, spec-driven).
- Fixed section numbering references; nav hash map; non-home contact path `/#contact`.

### v1 (2026-07-31)
- Initial plan from codebase audit + Arraytics/YouTube research + owner interview.

---

*Sources: `frontend/src/**`, `frontend/static/assets/sakib_shahon_resume.pdf`, arraytics.com / themewinter.com / timetics.ai product pages, owner interview decisions.*
