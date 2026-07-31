---
name: The Reading Shelf — Sakib Ahamed Shahon Portfolio
description: A walnut-black study at lamplight — shipped work as leather volumes, impact in brass plates, the career as a ledger.
colors:
  ink: "#16110b"
  ground: "#1e1610"
  wood: "#2e2116"
  woodlight: "#4a3524"
  leatherdeep: "#4f2e18"
  leatherdark: "#261708"
  thread: "#d8bd90"
  foil: "#c9a25e"
  foilbright: "#e8c47e"
  paper: "#f1e8d8"
  paperdim: "#e2d6c0"
  inkonpaper: "#2c2117"
  linen: "#c9bfad"
  linendim: "#a89c87"
  seal: "#9c3b2a"
typography:
  display:
    fontFamily: "'EB Garamond', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.25rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'EB Garamond', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'EB Garamond', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "'EB Garamond', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Red Hat Mono', 'Courier New', monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  sm: "2px"
  md: "6px"
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
  button-ribbon:
    backgroundColor: "#8a5a35"
    textColor: "{colors.foilbright}"
    typography: "body"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-ribbon-hover:
    backgroundColor: "#6b4123"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.linen}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-seal:
    backgroundColor: "{colors.seal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  plate-card:
    backgroundColor: "#8d6d3a"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "24px 32px"
  paper-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.inkonpaper}"
    rounded: "{rounded.sm}"
    padding: "24px 32px"
  leather-card:
    backgroundColor: "#6d4327"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "24px 28px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.inkonpaper}"
  chip-tag:
    backgroundColor: "transparent"
    textColor: "{colors.inkonpaper}"
    rounded: "{rounded.sm}"
---

# Design System: The Reading Shelf — Sakib Ahamed Shahon Portfolio

## Overview

**Creative North Star: "The Reading Shelf"**

This is the library of work already delivered — not a developer-portfolio demo reel. The portfolio is a walnut-black study at lamplight: shipped products are leather volumes standing on a wood shelf, impact is stamped into brass plates, the career is a ledger of ruled paper, and contact is a letter written on a torn sheet at the desk. Every surface is a physical material — saddle leather, engraved brass, ruled paper, dark wood — rendered with layered gradients and cast shadows from a single warm light source.

The system is deliberately dense and warm. Ground is near-black warm brown, text is cream paper, and the only bright voices are gilded foil for names and numbers and a deep oxblood seal for achievements. There is no glass, no blur, no neon: depth is conveyed by material gradients and book-thickness shadows, and the only glow permitted anywhere is the lamplight wash — a wide radial foil tint that fades from the top or bottom of a section. Visual emphasis comes from material weight (brass, leather, paper), not from brightness or glow.

Voice is typographic first: EB Garamond serif carries identity and argument, Red Hat Mono is confined to marginalia — the small uppercase annotations that frame each section ("On the shelf — shipped and running", "N°01" spine numbers, ledger captions). Headings sit embossed on the dark ground; the few paper sheets in the layout are rotated a fraction of a degree so nothing on the desk is perfectly aligned with the world.

**Key Characteristics:**
- Physical-material surfaces (leather, brass, ruled paper, wood) with layered gradient shading and cast shadows; no glass, no blur, no neon glow.
- Warm dark by default: `ink` ground with cream `paper` type; lamplight is a radial foil wash, the only glow in the world.
- Gilded EB Garamond for titles, Red Hat Mono marginalia for annotation — serif argues, mono annotates.
- Near-square corners: 2px sheets and plates, 6px spine edges, full circles only for medallion marks.
- Stitching (dashed thread lines) appears at material seams: nav top and bottom, card spines, ledger spine.
- Cards lift on hover with a translate and a deeper shadow — books pulled toward the reader.
- A `stitch-t` seam divides banded sections; sections alternate `ink` and `ground`, so the page reads as bound chapters.

## Colors

One warm, dark, leather-and-brass family: cream `paper` and brass `foil` voices on a near-black brown base, with a single oxblood `seal` for stamps and one CTA. The palette lives entirely in the warm quadrant — no cool grays, no blues, no pure whites.

### Primary
- **Walnut Ink** (#16110b): Page background and body type ground — the darkness of the study itself. `body` background, section base.
- **Deep Ground** (#1e1610): Alternate band background for chapters (products, skills, awards, YouTube) — the shelves between ink pages.
- **Gilded Foil** (#c9a25e): Brass mid-tone — diamond list marks on dark, the lamplight radial wash (rgba 0.16 → transparent), small hairlines under plate numerals.
- **Bright Foil** (#e8c47e): The gilded voice — the name in the hero, stat numerals, plate text, spine titles, hover states of links and buttons. Always on dark, never on paper.
- **Oxblood Seal** (#9c3b2a): Wax-seal red — achievement badges on the ledger and the "Subscribe on YouTube" action. The only saturated color in the system; two appearances max per page.

### Neutral
- **Cream Paper** (#f1e8d8): Body text on dark surfaces and the paper of sheets and cards. With an alpha, it serves as image-frame borders (border-paper/30).
- **Pale Paper** (#e2d6c0): Portrait mat behind the photograph.
- **Ink on Paper** (#2c2117): All text on paper sheets — dark brown ink, never pure black. Also icon buttons on paper (ink fill on hover).
- **Linen** (#c9bfad): Secondary serif text on dark (paragraphs, role lines).
- **Dim Linen** (#a89c87): Tertiary text on dark — marginalia captions and footer notes.
- **Cream Thread** (#d8bd90): Stitching dashes and hairline borders on dark (nav seams, ghost-button borders, chip borders at 40-50% alpha).
- **Saddle Leather** (#7a4c2c family): `leatherdeep` (#4f2e18) — ink accent on paper ("CAN DO", diamonds on paper, hover ink) and hover for the seal button; `leatherdark` (#261708) — hover wash for mobile-nav rows.
- **Wood** (#2e2116) and **Wood Light** (#4a3524): Portrait frame and image-well backing; wood light doubles as the shelf plank gradient start.

### Named Rules
**The Lamplight Rule.** Foil belongs on dark; ink belongs on paper. `foilbright` gilding appears only on dark surfaces, and ink-on-paper only on paper sheets — when the surface changes, the accent family changes with it. (Evidence: diamonds render `text-foil` on dark cards and `text-leatherdeep` on paper cards; YouTube card titles hover to `leatherdeep`.)

**The No-Glass Rule.** The study has no glass: no backdrop blur, no frosted translucency, no neon glow, no colored shadow blooms. The only luminous effect in the world is the lamplight — a wide radial foil wash (`radial-gradient(52% 42% at 50% 0%, rgba(201,162,94,0.16) 0%, rgba(201,162,94,0.05) 55%, transparent 100%)`) at the top of heroes and a dimmer counter-wash at section bases. Depth is material, not light.

**The Seal Rule.** `seal` (#9c3b2a) is the only saturated hue. It is reserved for achievement stamps and the single subscribe action; everything else stays in the foil-and-leather family.

## Typography

**Display Font:** EB Garamond (Iowan Old Style, Georgia, serif) — weights 400–700 plus italics 400/500, loaded via Google Fonts
**Body Font:** EB Garamond (same stack)
**Label/Mono Font:** Red Hat Mono (Courier New, monospace) — weights 400/500, annotation only

**Character:** A gilded old-script serif carrying identity against a near-monochrome mono annotator. EB Garamond at semibold reads like engraved lettering on a title page; Red Hat Mono at 0.72rem reads like a librarian's catalog note. The pairing is print-shop, not digital: serif argues, mono files.

### Hierarchy
- **Display** (semibold 600, `clamp(2.25rem, 6vw, 5rem)` — stepped 2.25rem → 3.75rem (md) → 5rem (lg), line-height 1.25, -0.02em tracking): The name in the hero, gilded. Appears once per page.
- **Headline** (semibold 600, `clamp(2.25rem, 5vw, 3.75rem)` — 2.25rem → 3.75rem (md), line-height 1.2, -0.02em tracking): Section titles ("Products I've Shipped", "The ledger", "The display case"), embossed with a raised-paper text-shadow. Centered above a marginalia subtitle.
- **Title** (semibold 600, 1.5rem, line-height 1.25): Card headings on paper (ink) or leather (foilbright when highlighted). Secondary 1.25rem in archive cards.
- **Body** (regular 400, 1.02–1.05rem, line-height 1.625): Paragraphs — `linen` on dark, `inkonpaper` at 75–90% alpha on paper. Hero lede steps to 1.125–1.25rem, capped at 42rem (max-w-2xl). Italic serif (400/500) marks role lines and quotes.
- **Label** (Red Hat Mono 400, 0.72rem, +0.14em tracking, uppercase): Section subtitles, captions, dates, tags, spine numbering (N°01 at 0.55rem), footer notes. `marginalia` class.

### Named Rules
**The Marginalia Rule.** Red Hat Mono is confined to annotation: captions, labels, numbering, tags, footer notes — small, uppercase, wide-tracked. It never headlines. Every heading in the system is EB Garamond semibold; serif owns voice, mono owns marginalia. (Consequence: a `marginalia` label may never be styled as a heading or vice versa.)

## Layout

The layout is a single centered column: every section is `max-w-7xl` (80rem) with `px-4 sm:px-6 lg:px-8`, and most are further narrowed — ledes cap at `max-w-2xl`, project grids and the ledger run `max-w-6xl`, about copy runs `max-w-4xl`. All section headers are centered, with a `mb-14/16` drop.

Vertical rhythm is generous and chapter-like: sections pad `py-20` (5rem) scaling to `py-28` (7rem) at lg; compact sections (impact stats, YouTube) run `py-16` → `py-20`. Bands alternate `bg-ink` and `bg-ground`, and every `ground` chapter carries a `stitch-t` seam along its top edge — the page reads as stitched-together chapters, not a scroll.

Card grids: products and skills run 1 → 2 (md) → 3–4 (lg) columns at `gap-7 lg:gap-8`; the ledger and the featured-project grid are two-column with a center spine; archive cards are a 10rem-thumb + content row that collapses at sm. The ledger's spine is a `stitch-v` line centered at md, with brass `plate` dots at each entry. Mobile collapses the spine to the left (`left-5`) and indents entries `ml-12`.

Spacing rhythm: card interiors pad `p-6` → `p-7/8` at md; list rows sit `gap-2`/`space-y-2`; timeline entries breathe at `space-y-12 md:space-y-16`. Breakpoints are Tailwind defaults: sm 640px, md 768px, lg 1024px. The nav is fixed at `h-16` (md: `h-20`), and sections carry `scroll-mt-24` for anchor arrival.

## Elevation & Depth

Depth is physical, not luminous: surfaces are built from layered material gradients (brass plates, leather bands, wood planks, paper) and the system's three cast shadows, all warm and black-based. There is no flat-by-default rule — material surfaces are always shaded — but shadows appear in two registers: engraved depth (insets) on plates and leather, and cast depth (drops) that grows on hover as cards lift `-translate-y-1/2` and the shadow deepens to `shadow-2xl`.

### Shadow Vocabulary
- **Plate** (`inset 0 1px 0 rgba(255,235,190,0.22), inset 0 -1px 2px rgba(0,0,0,0.55), 0 2px 3px rgba(0,0,0,0.45)`): Engraved brass — plates, stat cards, badges, medallions.
- **Volume** (`6px 8px 18px rgba(0,0,0,0.5)`): Book thickness — leather-sheet cards, shelf volumes, the framed portrait. Offset down-right, like a book standing under lamplight.
- **Leaf** (`0 2px 4px rgba(0,0,0,0.35), 0 10px 24px rgba(0,0,0,0.45)`): Lifted paper — paper sheets and cards. Torn sheets add a matching drop-shadow via `filter: drop-shadow(0 10px 24px rgba(0,0,0,0.45))`.

### Named Rules
**The Lamplight Source Rule.** All cast shadows share one light source, high and slightly left: drops offset down-right and deepen with material thickness (2px plate < 18px volume < 24px leaf). Never invert a shadow direction or use a colored/glow shadow — those imply a second light that the study does not have.

## Shapes

The form language is right-angle bindery work: near-square corners on every sheet and plate, a single soft 6px edge where volumes are rounded along their spine, and perfect circles only for medallion marks.

- **Sheets and plates** — 2px radius (`rounded-sm`): paper sheets, brass plates, badges, chips, tags, buttons, icon buttons, portrait frames.
- **Spine edges** — 6px radius (`rounded-md`, applied as `rounded-r-md`/`rounded-t-sm`): leather volume cards rounded on the right (the spine) and open on the left; the shelf's `wood-shelf` top edge.
- **Medallions** — full circle (`rounded-full`): skill icon wells, award icon wells, the monogram mark in nav and footer, the YouTube icon button. These are the only circles.
- **Inputs** — no radius (`rounded-none`): the letter's form fields break the corner rule deliberately; they are ruled lines on paper, not boxes.
- **Silhouettes**: volume spines are ~2.9rem wide × 40–52 tall with a vertical stitch tick, vertical-rl title, and N° number; torn sheets use a 40-step jitter `clip-path` on both long edges plus a drop-shadow; the ledger spine is a 1px dashed thread line with 3px brass dots.

## Components

### Buttons
- **Shape:** 2px radius (`rounded-sm`); the ribbon buttons are strips of leather, not pills.
- **Ribbon (primary):** Saddle-leather gradient (`linear-gradient(180deg, #8a5a35, #6b4123)`) with `border: 1px solid #241607`, inset top highlight, and a 4px drop shadow. Text is serif 1.125rem `foilbright`, arrow icon `w-3.5/4` inline SVG. Padding `0.75rem 1.5rem` (hero) to `1rem 2rem` (archive CTA).
- **Hover / Focus:** All buttons lift `-translate-y-0.5` over 300ms; ribbon text warms to white; ghost borders warm from `thread/50` to `foil/80` and text from `linen` to `foilbright`. Global `:focus-visible` is a 2px `foilbright` outline with 2px offset.
- **Ghost / outline (secondary):** No background; `border: 1px solid thread/50`, text `linen`. Used for "Browse the full archive" and contact alternatives.
- **Seal (tertiary, one action only):** Flat `bg-seal` (no gradient), `shadow-plate` inset engraving, text `paper`; hover deepens to `leatherdeep` with a lift. The YouTube subscribe button is the only seal button in the system.

### Chips
- **Style:** `marginalia` mono, uppercase, 0.72rem; on dark they are hairline-bordered (`border-thread/40`) with `linen` text; on paper they are ink-outlined (`border-inkonpaper/25`, 80% alpha ink). Product tags instead use the `paper-sheet` treatment — a ruled cream slip with ink text.
- **State:** Static; no selection states exist in the shipped pages.

### Cards / Containers
- **Paper sheet** (projects, ledger rows, YouTube cards, notes): `bg-paper` with 28px-pitch ruled lines at 3.5% ink alpha, `border: 1px solid #c4b394`, `leaf` shadow, 2px radius, inner padding `p-6 md:p-7/8`. Titles ink on paper; an inset `border-paper/30` frame sits inside image wells at `inset-2/3`. Hover lifts 1–1.5px with `shadow-2xl`.
- **Leather sheet** (products, skills): saddle-leather gradient (`linear-gradient(160deg, #6d4327 60%, #3b2313)`), `border: 1px solid #241607`, `volume` shadow, `rounded-r-md`, with a dark spine strip (`bg-black/25`) carrying a vertical stitch, a vertical-rl title, and an N° mark. Hover lifts 2px.
- **Brass plate** (impact stats, awards): brass gradient (`linear-gradient(150deg, #8d6d3a, #57401f)`), `border: 1px solid #3a2c13`, `plate` shadow, 2px radius, padding `p-6/7`, `marginalia` captions on paper/80. Stat numerals are `foilbright` serif 2.25–3rem with a gilded highlight shadow and a `foil/30` hairline divider beneath.

### Inputs / Fields
- **Style:** The letter form sits on a torn paper sheet. Fields are ruled lines, not boxes: transparent background, serif 1.125rem ink text, and only a bottom border (`border-b inkonpaper/30`); placeholders at 40% ink.
- **Focus:** Bottom rule deepens to `inkonpaper/70`. The global `foilbright` focus outline applies.
- **Error / Disabled:** Not implemented in the shipped build; no error styling exists to document.

### Navigation
- **Style:** A `leather-band` strip (180deg leather gradient) with `stitch-t` seams at top and bottom and a `border-b black/60`. Brand is a 2px-radius brass `plate` monogram (44px, `foilbright` serif) beside the serif name at sm+. Links are serif with a 2px bottom rule that warms to `foil/60` on hover; text warms to `foilbright`. A circular thread-outlined YouTube icon button (40px) sits at the end. When scrolled, the band gains a `shadow-lg`.
- **Mobile:** A full-screen `leather-band` overlay (fades in 200ms) with serif rows separated by thread hairlines, `hover:bg-leatherdark/60`; external rows are `foilbright`, internal `paper`. Escape closes it; body scroll locks while open.

### Signature Components
- **The Reading Shelf (hero):** The first viewport is a `wood-shelf` band (180deg wood gradient, inset top highlight, 14px bottom shadow) holding six volume spines — 2.9rem × 10–13rem blocks with a leather spine gradient, an inset 3px thread edge, a vertical-rl `foilbright` title in serif, a `stitch-v` tick, and an N° number in mono. Hover pulls a volume up 12px (`-translate-y-3`) with a deeper shadow, above a `stitch-t` seam and a marginalia shelf note.
- **The Ledger (timeline):** Entries alternate left/right around a center `stitch-v` spine with 3px brass `plate` dots. The current role is bound in leather (`leather-sheet`, `foilbright` title, seal badge); earlier roles are `paper-sheet ledger-rule` pages with a 2rem vertical column rule and ink text.
- **The Portrait (contact):** A double-framed photograph — `bg-wood` with a 4px `woodlight` border and `volume` shadow, then a `paperdim` mat, then a `paper/30` inner line — with a brass `plate` name caption beneath. About's portrait repeats the frame at 56–64 with a slight `-0.8deg` rotation.
- **Diamond lists:** 0.6rem outline diamonds (inline SVG, `stroke-width: 1.2`) mark every metric and highlight row — `foil` on dark, `leatherdeep` on paper.

## Do's and Don'ts

### Do:
- **Do** keep all accents in the warm family: brass foil, saddle leather, cream thread, oxblood seal. When in doubt, ask "what would this be made of in a study?" and render that material.
- **Do** build surfaces from layered gradients — brass plates, leather bands, wood shelves — and finish them with the matching shadow (`plate` / `volume` / `leaf`).
- **Do** write every section title as EB Garamond semibold with the embossed paper shadow, centered above a Red Hat Mono marginalia subtitle — the chapter pattern of the whole site.
- **Do** alternate `ink` and `ground` bands and top each ground chapter with a `stitch-t` seam.
- **Do** lift interactive cards and buttons on hover (`-translate-y`, deeper shadow) and warm their accent toward `foilbright`/white — books get pulled toward the reader.
- **Do** use `paper-sheet` (ruled cream, 2px corners, slight rotation) for the letter form, project cards, and ledger rows; on paper, switch accent to `inkonpaper`/`leatherdeep` per the Lamplight Rule.
- **Do** keep icons as inline SVGs at 16–24px — the diamond, external-link, arrow, YouTube, GitHub, LinkedIn marks are all drawn, never font glyphs.
- **Do** respect the motion register: 200ms for color, 300ms for buttons, 500–700ms for card hover and image zoom — and honor `prefers-reduced-motion`, which the build zeroes globally.

### Don't:
- **Don't** use glassmorphism — no backdrop blur, no frosted panels, no translucent cards, no neon or colored glow shadows (the No-Glass Rule). The lamplight radial wash is the only glow.
- **Don't** set headings or body in Red Hat Mono, and don't set marginalia in serif — the Marginalia Rule holds the annotation voice apart from the argument voice.
- **Don't** use pill radii or large rounded corners on buttons, cards, or plates; the bindery is 2px sheets, 6px spine edges, and medallion circles only.
- **Don't** use pure black or pure white: text is `paper`/`linen` on dark and `inkonpaper` on paper; borders are `thread`, `foil`, or ink at low alpha.
- **Don't** scale a section without its seam: chapters open on `ink`, alternate to `ground`, and close with the next `stitch-t`.
- **Don't** widen the palette with cool hues (blues, grays, pure whites) or a second saturated accent — the Seal Rule caps saturation at `seal`.
- **Don't** put unicode glyphs where an SVG belongs; every mark, including the list diamond and external-link arrow, is an inline SVG (see not-canonized note).
