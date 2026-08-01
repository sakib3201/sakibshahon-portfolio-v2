---
name: The Yakuza Ink — Sakib Ahamed Shahon Portfolio
description: A yakuza boss's back piece at night — shipped work as ink already worn, impact in gold leaf, the career as the family ledger, contact as an audience with the boss.
colors:
  sumi: "#0f0d0a"
  lacquer: "#171310"
  lacquerdeep: "#0a0806"
  paper: "#201a12"
  paperdim: "#18130c"
  inktext: "#f0ead9"
  inktextdim: "#a99f8d"
  gold: "#c9a25e"
  goldbright: "#e8c47e"
  golddeep: "#8d6d3a"
  cinnabar: "#c02818"
  neon: "#ff3d6e"
  inkonpaper: "#ece5d3"
  blacktint: "#000000"
typography:
  scale:
    micro: "0.55rem"
    marginalia: "0.72rem"
    small: "0.95rem"
    body: "1.05rem"
  display:
    fontFamily: "'Yuji Syuku', 'Zen Kaku Gothic New', serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Zen Kaku Gothic New', 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.01em"
  title:
    fontFamily: "'Zen Kaku Gothic New', 'Segoe UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Zen Kaku Gothic New', 'Segoe UI', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Red Hat Mono', 'Courier New', monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "5rem"
  section-lg: "7rem"
components:
  gold-plate:
    backgroundColor: "gradient(150deg, #8d6d3a, #c9a25e, #6d5228, #e8c47e)"
    textColor: "{colors.sumi}"
    typography: "body"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  gold-edge:
    backgroundColor: "transparent"
    textColor: "{colors.goldbright}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  hanko-seal:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.inktext}"
    rounded: "{rounded.sm}"
  lacquer-panel:
    backgroundColor: "gradient(165deg, #1d1813, #14100c, #0e0b08)"
    textColor: "{colors.inktext}"
    rounded: "{rounded.md}"
  skin-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.inkonpaper}"
    rounded: "{rounded.sm}"
---

# Design System: The Yakuza Ink — Sakib Ahamed Shahon Portfolio

## Overview

**Creative North Star: "The Yakuza Ink"**

The portfolio is a yakuza boss's back piece (irezumi), read at night. Work already delivered is ink already worn: six product panels run down the spine, impact is set in gold leaf, the career reads as the family ledger, and contact is an audience with the boss. The visitor reads the back piece panel by panel — each product a scene inked with its true figures in gold, the ledger carrying the numbers — and believes the engineer who ships AI into real products before reading a single claim.

The system refuses the dark-hero-gradient dev-portfolio default and its code-motif hero. Surfaces are physical: sumi-black lacquer under golden-black paper sheets, gold-leaf engraving, cinnabar hanko seals, needle linework, and a single neon rim light after dark. Depth is built from layered material gradients and black-based cast shadows; the only glows in the world are the gold-leaf sheen, the cinnabar stamp's bloom, and the neon rim at the edges of interactive panels after dark.

Voice is typographic first, but the brushes are Japanese rather than serif: Yuji Syuku brush calligraphy carries identity — the name, the "CAN DO" motto, vertical panel titles, the seal glyph — Zen Kaku Gothic New carries argument and body text, and Red Hat Mono is confined to marginalia, the small uppercase annotations that frame each section ("Inked on the back piece — shipped and running", "N°01" panel numbers, ledger captions). Dark, physical ink; restrained neon.

**Key Characteristics:**
- A back piece, not a dashboard: six ink panels down the spine, gold-leaf impact engravings, a family ledger of ruled paper, contact as an audience with the boss. No gradient-hero, no code motif.
- Sumi-black lacquer by default with golden-black `paper` sheets and cream `inkonpaper` type; gold leaf for names and true figures; cinnabar only for seals.
- Brush calligraphy (Yuji Syuku) for identity, Zen Kaku Gothic New for text, Red Hat Mono for marginalia — brush argues, sans explains, mono annotates.
- Material surfaces: lacquer panels, gold plates, ruled golden-black sheets, all finished with layered gradients and the matching black-based shadow.
- Gold is engraved (inset highlights, `shadow-gold`), never glassy; the only glow permitted is the gold-leaf sheen, the hanko bloom, and the neon rim at 40-60% of its intensity.
- Depth is both material and dimensional: 3D perspective scenes (`perspective-scene`, `depth-card`), mouse tilt, and scroll-linked parallax — the back piece turns as you read it.
- Cards lift on hover with a translate and a deeper shadow — panels lean toward the reader.

## Colors

One dark, physical ink family on golden-black sheets: sumi-black lacquer grounds, cream ink voices on dark paper, gold-leaf accents, one cinnabar seal red, and one neon rim light. The palette lives in warm black, warm cream, and brass gold — no cool grays, no blues, no pure whites — with a single restrained pink-red glow for the rim after dark.

### Primary
- **Sumi** (#0f0d0a): The page ground — the black ink of the back piece itself. `body` background, section base, `sumi-ground` with a faint gold radial wash from the top.
- **Lacquer** (#171310): Raised panel ground — the lacquer finish of panels and bands. Alternate section bands, panel bases.
- **Lacquer Deep** (#0a0806): The darkest register — footer base, deep insets, gradient endpoints.
- **Gold** (#c9a25e): Gold-leaf mid-tone — borders (`gold-edge`, `gold-plate` border), the needle line, diamond marks on dark, radial washes at 0.05-0.16 alpha.
- **Bright Gold** (#e8c47e): The gilded voice — the name in the hero, stat numerals, panel titles, hover states, `gold-text` fills. Always on dark, never on paper.
- **Deep Gold** (#8d6d3a): The engraved gold stop — the dark end of the `gold-plate` and `medallion` gradients.
- **Cinnabar** (#c02818): Hanko seal red — the only saturated ink. Seals only (see The Hanko Rule).
- **Neon** (#ff3d6e): The rim light after dark — borders and glows at panel rims only (see The Neon Rim Rule). Never text.

### Neutral
- **Paper** (#201a12): Golden-black sheet — `skin-sheet` cards, timeline pages, portrait mat. With alpha, image-frame borders. Never a bright paper; the sheet is dark ink warmed by gold.
- **Dim Paper** (#18130c): The deeper sheet tone — mat edges, secondary sheet stops.
- **Ink on Paper** (#ece5d3): All text on paper sheets — warm cream ink on the dark sheet, never pure white.
- **Ink Text** (#f0ead9): Body type on dark — cream, slightly warmer than pure white.
- **Dim Ink Text** (#a99f8d): Tertiary text on dark — lede dims, captions, footer notes.
- **Shadow Black** (#000000): The shadow tint. Pure black only at alpha (0.38-0.8) inside the `lacquer`, `deep`, and `gold` shadow tokens — never a surface, never text.

### Material Variants
The gradient stops and borders below are deliberate in-family shades of the tokens above; they exist only inside the material component classes, never in markup:
- **Lacquer gradient stops**: #1d1813, #221b14, #16110c, #17120c, #14100c, #0e0b08 (165deg lacquer gradients).
- **Lacquer borders**: #2b241c (`lacquer-panel`), #362c20 (`lacquer-raised`).
- **Gold material stops**: #6d5228, #57401f (gold gradient mids), #3a2c13 (gold plate/medallion border), #3c280a (gold inset shadow tint).
- **Gold-leaf highlights**: #f5e3b0 (shimmer peak), #fff0cd / #ffebbe (text-shadow and inset highlights at 0.25-0.35 alpha).
- **Gold washes** (highlight washes at 0.12-0.45 alpha): rgba(201,162,94,0.12) (skin-sheet top wash), #fffaeb, #fffae6 (gold-plate sweep).
- **Sheet border**: #3a2c13 (skin-sheet gold-deep rule).
- **Neon dark rim**: #3a2030 (idle `neon-rim` border, before the light comes on).

### Named Rules
**The Hanko Rule.** `cinnabar` (#c02818) is seal ink and nothing else: the hanko stamp in the hero, achievement seals on the ledger, and the stamp's ink bloom. It never fills text, never borders a panel, never tints a button. Every other accent stays in the gold family. (Evidence: `hanko` class with the jittered seal clip-path and the `hero-ink-bloom` radial; seal badges on timeline entries.)

**The Neon Rim Rule.** `neon` (#ff3d6e) is a rim light after dark, not a fill. It appears only at edges — the `neon-rim` border-and-glow on interactive panels (idle #3a2030, hover rgba(255,61,110,0.55) border with 0.08-0.14 glows), focus rims, and the faint 0.06 wash rising from the hero's base. It is never a text color, never a panel background, and never brighter than 55% alpha.

**The Gold Rule.** One gold for one purpose: `gold` (#c9a25e) is the material — borders, needle lines, washes, diamond marks; `goldbright` (#e8c47e) is the voice — gilded text and numerals on dark; `golddeep` (#8d6d3a) is the engraving depth — gradient stops only. Never swap a voice for a material: text is never `gold`, and an engraved border is never `goldbright`.

**The Ink-Surface Rule.** Gold belongs on dark; ink belongs on the sheet. Gilded text appears only on lacquer or sumi; `skin-sheet` surfaces carry `inkonpaper` text with gold only in engraved plates set into the sheet. When the surface changes, the accent family changes with it.

## Typography

**Display/Brush Font:** Yuji Syuku (fallback Zen Kaku Gothic New, serif) — weight 400, loaded via Google Fonts. Brush calligraphy: the name in the hero, the "CAN DO" motto, vertical panel titles, the seal glyph 鍛錬 (forging discipline). Brush writes identity.
**Body Font:** Zen Kaku Gothic New (Segoe UI, sans-serif) — weights 400/500/700. All body, headings, and UI text.
**Label/Mono Font:** Red Hat Mono (Courier New, monospace) — weights 400/500, annotation only.

**Character:** A hand-cut brush against a clean gothic sans and a catalog mono. Yuji Syuku at 400 reads like a boss's seal script — deliberate, vertical, slightly imperfect; Zen Kaku Gothic New carries the argument without competing; Red Hat Mono at 0.72rem reads like the family ledger's marginalia. The pairing is ink on skin: brush argues, sans explains, mono files.

### Hierarchy
- **Display** (Yuji Syuku 400, `clamp(3rem, 7vw, 6rem)` — stepped 3rem → 4.5rem (md) → 6rem (lg), line-height 1.15, +0.02em tracking): The name in the hero, gilded with `gold-text`. Appears once per page, as the medallion at the center of the back piece.
- **Headline** (Zen Kaku Gothic New 700, `clamp(2.25rem, 5vw, 3.75rem)` — 2.25rem → 3.75rem (md), line-height 1.2): Section titles ("Products I've shipped", "The family ledger", "The audience"), centered above a marginalia subtitle.
- **Title** (Zen Kaku Gothic New 700, 1.25rem, line-height 1.3): Card headings on lacquer (inktext) or paper (inkonpaper).
- **Body** (Zen Kaku Gothic New 400, 1.02–1.05rem, line-height 1.75): Paragraphs — `inktext` on dark, `inktextdim` for the lede. Hero lede steps to 1.125–1.25rem, capped at `max-w-2xl`. `small` step (0.95rem) for compact rows and chip text.
- **Label** (Red Hat Mono 400, 0.72rem, +0.14em tracking, uppercase): Section subtitles, captions, dates, tags, panel numbering (N°01 at 0.55rem — the `micro` step), footer notes. `marginalia` class.
- **Micro** (0.55rem): The smallest mono step — N° numbering on panel spines and archive cards.

### Named Rules
**The Marginalia Rule.** Red Hat Mono is confined to annotation: captions, labels, numbering, tags, footer notes — small, uppercase, wide-tracked. It never headlines. Headings and body are Zen Kaku Gothic New; identity is Yuji Syuku. (Consequence: a `marginalia` label may never be styled as a heading or vice versa.)

**The Brush Rule.** Yuji Syuku writes only identity: the hero name, the "CAN DO" motto, vertical panel titles, the seal glyph. It never sets body copy, and it never appears more than once per viewport — brush marks, it does not explain.

## Layout

The layout is a single centered column: every section is `max-w-7xl` (80rem) with `px-4 sm:px-6 lg:px-8`, and most are further narrowed — ledes cap at `max-w-2xl`, product panels and the ledger run `max-w-6xl`, about copy runs `max-w-4xl`. All section headers are centered, with a `mb-14/16` drop.

Vertical rhythm is generous and panel-like: sections pad `py-20` (5rem) scaling to `py-28` (7rem) at lg; compact sections (impact stats, YouTube) run `py-16` → `py-20`. Bands alternate `bg-sumi` and `bg-lacquer`, and every lacquer chapter carries a `needle-line-h` seam along its top edge — the page reads as inked chapters, not a scroll.

Card grids: products run 1 → 2 (md) → 3 (lg) columns at `gap-7 lg:gap-8`; the ledger and the featured-project grid are two-column with a center spine; archive cards are a thumb + content row that collapses at sm. The ledger's spine is a `needle-line` at center at md, with gold medallion dots at each entry. Mobile collapses the spine to the left and indents entries.

Spacing rhythm: card interiors pad `p-6` → `p-7/8` at md; list rows sit `gap-2`/`space-y-2`; timeline entries breathe at `space-y-12 md:space-y-16`. Breakpoints are Tailwind defaults: sm 640px, md 768px, lg 1024px. The nav is fixed at `h-16` (md: `h-20`), and sections carry `scroll-mt-24` for anchor arrival.

## Elevation & Depth

Depth is physical and dimensional. Surfaces are built from layered material gradients (lacquer panels, gold plates, skin sheets) finished with the system's three black-based shadows; dimension comes from the 3D scene — `perspective-scene` stages with `depth-card` children that tilt toward the pointer and translate on scroll. There is no flat-by-default rule: material surfaces are always shaded, and shadows appear in two registers — engraved depth (insets) on gold, cast depth (drops) that grows on hover as cards lift `-translate-y`.

### Shadow Vocabulary
- **Lacquer** (`inset 0 1px 0 rgba(233,226,210,0.06), inset 0 -1px 2px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.45), 0 12px 28px rgba(0,0,0,0.38)`): The panel shadow — lacquer panels, panels with a faint top highlight, a deep bottom drop.
- **Deep** (`0 18px 40px rgba(0,0,0,0.6)`): Raised lacquer and paper — `lacquer-raised` cards, `skin-sheet` sheets, lifted panels, the medallion float. The heaviest cast in the system.
- **Gold** (`inset 0 1px 0 rgba(255,235,190,0.3), inset 0 -1px 2px rgba(60,40,10,0.55), 0 2px 4px rgba(0,0,0,0.5)`): Engraved gold leaf — `gold-plate` buttons, medallions, stat plates. The warm inset is engraving light, not a glow.

Hover lift deepens the cast: cards lift `-translate-y-1`/`-translate-y-1.5` and the drop deepens toward `shadow-deep` or Tailwind `shadow-xl/2xl`. The only colored light in the system is the neon rim (The Neon Rim Rule) and the hanko bloom — both are edges of the world after dark, not shadows.

### Named Rules
**The Sumi Shadow Rule.** All cast shadows are black-based and share one light source, high and slightly left: drops offset down and deepen with material thickness (2px plate < 18px panel < 40px raised). Never invert a shadow direction, and never cast a colored shadow — colored light exists only at rims (neon) and stamps (hanko bloom).

## Shapes

The form language is the tattooist's: near-square corners on panels and plates, a soft edge only where the body turns, and perfect circles only for medallion and seal marks.

- **Panels and plates** — 2px radius (`rounded-sm`): gold plates, badges, buttons, chips, portrait frames.
- **Soft edges** — 6-8px radius (`rounded-md`/`rounded-lg`): lacquer panels and raised cards.
- **Medallions and seals** — full circle (`rounded-full`): the skill/award medallions, the monogram in nav and footer, the hero seal. These and the rounded-top product panels (`rounded-t-full`) are the only circles.
- **Inputs** — no radius (`rounded-none`): the audience form's fields are ruled lines on paper, not boxes.
- **Silhouettes**: product panels are ~2.9rem wide × 40–52 tall rounded-top blocks with a vertical `needle-line` tick, vertical-rl Yuji Syuku title, and N° number; the hanko seal uses a 40-step jitter `clip-path`; the ledger spine is a 1px dashed gold needle line with medallion dots.

## Components

### Buttons
- **Shape:** 2px radius (`rounded-sm`); both buttons are strips of gold leaf or lacquer, not pills.
- **Gold plate (primary):** `gold-plate` — a 150deg gold-leaf gradient (`#8d6d3a → #c9a25e → #6d5228 → #e8c47e`) with a `#3a2c13` border and the `gold` shadow. Text is `sumi` (ink on gold, per the Ink-Surface Rule), with a light sweep (`linear-gradient` highlight translating across at 0.6s) on hover/focus. Hover lifts `-translate-y-0.5`; active presses `translate-y-0.5`.
- **Gold edge (secondary):** `gold-edge` — transparent with a `gold` border, `goldbright` text, the lacquer shadow. Hover lifts and warms text to white; on interactive targets it pairs with `neon-rim` so the edge light comes on.
- **Hover / Focus:** All buttons lift `-translate-y-0.5` over 300ms; gold-plate text deepens toward black; focus-visible lifts 0.125rem with a cinnabar outline (the seal red reads as "active engagement"). Global `:focus-visible` is a 2px `goldbright` outline with 2px offset.

### Chips
- **Style:** `marginalia` mono, uppercase, 0.72rem (`small` at 0.95rem for skill chips); hairline `gold/40` borders on dark with `inktextdim` text; on paper they are ink-outlined (`inkonpaper/25`).

### Cards / Containers
- **Lacquer panel** (nav, footer, panels): `lacquer-panel` — 165deg lacquer gradient with a `#2b241c` border and the `lacquer` shadow. Hover lifts with `lacquer-raised` treatment (`#362c20` border, `deep` shadow).
- **Lacquer raised** (products, impact, awards, service): `lacquer-raised` — the raised lacquer finish with the `deep` shadow; interactive panels add `neon-rim` so the rim light comes on at hover.
- **Gold plate** (impact stats, awards): `gold-plate` gradient with `#3a2c13` border, `gold` shadow, `marginalia` captions on `paper/80`. Stat numerals are `goldbright` Yuji Syuku with a gilded highlight shadow and a `gold/30` hairline divider beneath.
- **Skin sheet** (projects, ledger rows, YouTube cards, notes): `skin-sheet` — golden-black `paper` with a 140px-pitch noise texture, a gold top wash, 30px-pitch ruled lines at 7% gold alpha, a `#3a2c13` border, and the `deep` shadow. Titles `inkonpaper` (cream); an inset `paper/30` frame sits inside image wells. Hover lifts with `shadow-deep` and, on interactive sheets, the neon rim. Project screenshot wells carry an ink-wash hover: idle `saturate(0.78) brightness(0.9)`, hover/focus-within colorizes over 0.5s while a faint gold radial bloom follows the pointer (`--x/--y`, rAF-throttled, `pointer: fine` only, `initInkWash` in `motion.js`); the fallback medallion shares the treatment.
- **Medallion** (skills, awards, monograms): `medallion` — radial gold gradient (`#e8c47e → #c9a25e → #6d5228 → #57401f`), `#3a2c13` border, inset gold light and drop. `medallion-float` (9s ease-in-out) is reserved for the About and Contact portraits — the hero name stays perfectly steady.

### Inputs / Fields
- **Style:** The audience form sits on a `skin-sheet`. Fields are ruled lines, not boxes: transparent background, 1.125rem ink text, only a bottom border (`border-b inkonpaper/30`); placeholders at 50% ink.
- **Focus:** Bottom rule deepens to `inkonpaper/80`. The global `goldbright` focus outline applies.

### Navigation
- **Style:** A `lacquer-panel` band with a `needle-line-h` seam at the top and a bottom border. Brand is a `medallion` (44px, `goldbright` Yuji Syuku glyph) beside the name at sm+. Links are Zen Kaku Gothic New with a dashed gold needle underline that scales in from the left on hover (0.3s `cubic-bezier(0.22,1,0.36,1)`); text warms to `goldbright`. When scrolled, the band gains a shadow.
- **Scroll needle:** A 1px dashed gold `needle-line-h` fixed under the nav band (z-40, below the navbar's z-50) draws left→right with scroll (`scaleX`, passive rAF-throttled listener, origin-left). Idle at 0.4 opacity, brightens to 0.9 while scrolling, dims after 350ms idle. Decorative (`aria-hidden`), fully disabled under `prefers-reduced-motion` (stays `scale-x-0`).
- **Mobile:** A full-screen `lacquer` overlay with rows separated by needle hairlines; external rows are `goldbright`, internal `inktext`. Escape closes it; body scroll locks while open.

### Signature Components
- **The Back Piece (hero):** The first viewport is the back piece turning in 3D: the name as the central gold medallion — steady, inked in by a cinematic calligraphy entrance (words materialize blur-to-sharp one after another, 1.6s each with a 0.28s stagger, under a slow gold glow bloom; once inked the name never moves). The six product plaques run along the spine (`lacquer-raised` gold-edge pills with horizontal Yuji Syuku titles, N° numbers, needle ticks), the "CAN DO" motto band carries the engineer's punchline, and impact figures are set as gold-leaf engravings. The cinnabar hanko (鍛錬, forging discipline) stamps itself in from the top-right after the name lands (`hero-hanko-stamp` at 2.7s, ink bloom after). Short golden needle guides then appear and fade, pointing toward the seal (9s draw loop), and faint gold sakura petals drift through the air (11–20s ambient loop). The seal is alive: a generous circular hit zone around it opens a golden-black proverb strip hanging from the seal (scaleY from the seal corner, cinnabar thread, ink bloom, clamped inside the viewport). The proverb rotates on every press across six set phrases — romaji pronunciation above, brush kanji, English translation below (七転び八起き "fall seven times, rise eight", 継続は力なり, 石の上にも三年, 雨降って地固まる, 一事が万事, 千里の道も一歩から) — and pressing the name re-stamps the seal. The punchline is an impression, not a decoration: after the seal lands, the motto band slaps down like a seal pressed into paper (drop → compress → settle, `hero-punch-in` 0.6s at 3.55s), its words ink in blur-to-sharp ("CAN DO" as the bright strike point), and the strike releases a gold bloom plus two ink rings radiating from the center (`hero-punch-ring`, 1.1s + 1.3s) — the impression of the claim landing. Pressing the band re-strikes the full impression on demand — the band slams down again, the words re-ink, and the bloom and rings re-fire (near-zero delays). Entrance plays once per session (`sessionStorage`), skipped entirely under `prefers-reduced-motion`; the quote reveal is hover/pointer driven and collapses to a plain reveal under reduced motion.
- **The Family Ledger (timeline):** Entries alternate around a center needle-line spine with gold medallion dots. The current role is a `skin-sheet` page with `inkonpaper` text and a cinnabar seal badge; earlier roles are ruled `skin-sheet` pages. On first view the current role's page unrolls from the spine like a ledger leaf (clip-path `inset(0 0 100% 0)` → `inset(0)`, 0.7s), then its cinnabar badge stamps in (0.35s hero-restamp family, gold bloom); reduced motion falls back to the plain reveal.
- **The Periodical (YouTube):** Thumbnails carry a cinnabar play-glyph seal (small hanko square, inktext play triangle, slight rotation, top-right) that re-stamps with a faint gold ring on card hover/focus. The empty state is a dashed cinnabar outline seal with a dim play glyph — a stamp waiting for the first video, never a fabricated placeholder.
- **The Audience (contact):** A `skin-sheet` letter — the form as ruled lines, a portrait in a double frame (lacquer border, paper mat), and the gold-plate "Request an audience" action. A successful send stamps a cinnabar 済 seal above the status line (0.4s hero-stamp family, gold bloom); failures stay text-only — a failed letter is never sealed. The portrait gains a faint gold ink-wash while the form has focus (`:has(.contact-form:focus-within)`). About's portrait repeats the frame with a slight rotation.
- **Diamond lists:** 0.6rem outline diamonds (inline SVG, `stroke-width: 1.2`) mark every metric and highlight row — `gold` on dark, `inkonpaper` on paper.
- **Needle lines:** 1px dashed gold rules, vertical (`needle-line`) and horizontal (`needle-line-h`), at seams, spines, and section divides; SVG strokes can carry `draw-needle` drift (2.4s linear loop).

## Motion

Motion is the body's: ink settles, panels lean, the rim light switches on. All motion lives in the register below and honors `prefers-reduced-motion` — the build zeroes animation and transition durations globally, shows every reveal immediately, stops parallax and tilt, and skips the hero entrance.

### Motion Register
- **100–150ms — feedback:** color and border changes on links, chips, and icon buttons; button active presses (`translateY(2px)`).
- **150–300ms — state:** hover lifts and accent warmings (`duration-300` on CTAs, nav underline 0.3s), the neon rim's border/glow transition (0.4s sits at the top of this band for its glow), gold-plate active states, `reveal-pulse` (0.3s).
- **300–500ms — layout:** the gold-plate light sweep (0.6s spans to the next band), `depth-card` transform return (0.5s), section reveals' arrival (0.7s transitions start here).
- **500–800ms — hero focal and reveals:** the hero entrance choreography — calligraphy words 1.6s each (0.28s stagger, blur→sharp), gold glow bloom 2.8s, motto rise 0.5s (0.85s in), hanko stamp 0.4s (2.7s in), ink bloom 0.8s (2.85s in), punchline strike 0.6s (3.55s in) with words inking 0.8s each (0.22s stagger) and the gold bloom + ink rings at 3.85–4.45s — and all `[data-reveal]` transitions (0.7s opacity/transform).
- **2026-08 ink-detail batch (#39–44):** impact stat count-up (1.2s ease-out, once on view, per-card 60ms stagger ≤ 240ms cap, divider draws after settle), ledger page unroll (0.7s clip-path) then badge stamp (0.35s), play-seal restamp (0.35s) + gold ring, wax-seal stamp (0.4s) + gold bloom (0.8s), screenshot ink-wash colorize (0.5s) — all one-shots or hover states, gated off-screen and disabled under reduced motion like every ambient loop.

### Rules
- **Arrivals** use `cubic-bezier(0.22, 1, 0.36, 1)` everywhere — a fast start that decelerates to rest. No bounce, no overshoot easing, no springs.
- **Stagger** for series reveals is capped at 240ms total: steps of 40ms (6-item series) to 60ms (4-item series), with fixed 150-200ms offsets for isolated items.
- **Loops** are ambient and sparse: `shimmer` (5s, impact figures only), `medallion-float` (9s, portraits only), `needle-drift` (2.4s), the seal guides (9s draw loop), and the sakura petals (11–20s). Every looping animation is paused while off-screen via `loop-pause` (IntersectionObserver gating in `motion.js`) and disabled under reduced motion.
- **Parallax** is scroll-linked and JS-managed (`initParallax`): transforms and `will-change` are applied only while a node is on-screen, cleared when it leaves, capped at 24px (data `parallax-max`), and stopped entirely under reduced motion.
- **Tilt** (`data-tilt`) is pointer-only (`pointer: fine`), bounded by `data-tilt-max` (default 10deg), and disabled under reduced motion.
- **Reveals** (`[data-reveal]`) are gated by an `IntersectionObserver` with a 12% threshold; `html.motion-init` activates the hidden state only when motion is allowed, so no-JS and reduced-motion users always see content.

### Reduced-Motion Contract
Under `prefers-reduced-motion: reduce`, the site must be fully static and fully readable: all durations and delays collapse to ~0.01ms, the `motion-init` class is removed so every `[data-reveal]` shows at full opacity, parallax transforms are cleared, tilt listeners are never attached, the hero entrance never plays, and the sakura petals and seal guides are never created. Nothing that hides content is allowed to depend on animation completing.

## Do's and Don'ts

### Do:
- **Do** keep all accents in the ink family: gold leaf for names and numbers, cinnabar for seals, neon for rims. When in doubt, ask "would this be inked onto skin?" and render that material.
- **Do** build surfaces from layered gradients — lacquer panels, gold plates, skin sheets — and finish them with the matching shadow (`lacquer` / `deep` / `gold`).
- **Do** write identity in Yuji Syuku, body and headings in Zen Kaku Gothic New, and every annotation in Red Hat Mono marginalia — brush argues, sans explains, mono files.
- **Do** alternate `sumi` and `lacquer` bands and top each lacquer chapter with a `needle-line-h` seam.
- **Do** lift interactive cards and buttons on hover (`-translate-y`, deeper shadow) and warm their accent toward `goldbright`/white — panels lean toward the reader.
- **Do** use `skin-sheet` (ruled paper, noise texture, 2px corners) for project cards, ledger rows, and the audience form; on paper, switch the accent family to `inkonpaper` per the Ink-Surface Rule.
- **Do** keep icons as inline SVGs at 16–24px — the diamond, external-link, arrow, social marks are all drawn, never font glyphs.
- **Do** respect the motion register: 100–150ms feedback, 150–300ms states, 300–500ms layout, 500–800ms hero focal, `cubic-bezier(0.22,1,0.36,1)` arrivals, 240ms stagger cap — and honor `prefers-reduced-motion`, which the build zeroes globally.
- **Do** gate ambient loops off-screen (`loop-pause`) and cap parallax at 24px, cleared when nodes leave the viewport.

### Don't:
- **Don't** use the dark-hero-gradient dev-portfolio default, code motifs, glassmorphism, or backdrop blur — the back piece is physical ink, and the neon rim is the only light after dark.
- **Don't** set headings or body in Red Hat Mono, and don't set marginalia in gothic or brush — the Marginalia Rule holds the annotation voice apart.
- **Don't** use `cinnabar` for anything but seals, and `neon` for anything but rims — never as text fill, never as a panel fill (the Hanko Rule, the Neon Rim Rule).
- **Don't** swap the golds: text is `goldbright`, material is `gold`, engraving depth is `golddeep` — the Gold Rule holds each to its purpose.
- **Don't** use pill radii on buttons, cards, or plates; the binder is 2px panels, 6–8px soft edges, and medallion/seal circles only.
- **Don't** use pure black or pure white as surfaces or text: `shadow black` exists only inside shadow tokens; text is `inktext`/`inkonpaper`, and highlights are warm creams.
- **Don't** put unicode glyphs where an SVG belongs; every mark, including the list diamond and external-link arrow, is an inline SVG.
- **Don't** add bounce, spring, or overshoot easing to any arrival, and don't chain reveal staggers past the 240ms cap.
