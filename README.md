# Sakib Shahon — Portfolio

A personal portfolio for **Sakib Ahamed Shahon** (Software Engineer, full-stack & AI) — a dark, physical-ink site in the **Yakuza Ink** design world, and a repo deliberately wired for agent-driven development (kanban board, worktree loop, AI skills, context router).

- App: SvelteKit 2 (Svelte 5) + Tailwind CSS 4 + Vite 7, in `frontend/`, deployed to Netlify (fully prerendered static HTML).
- Harness: kanban-md board + git worktrees + agent skills — the repo is built *by* agents using the same conventions it documents.

---

## Repo Map

| Path | What it is |
|---|---|
| `frontend/` | The SvelteKit app (pnpm). All application code. See `frontend/AGENTS.md`. |
| `netlify.toml` | Deploy + header rules. Lives at the **repo root**, not in `frontend/`. |
| `PRODUCT.md` | Product truth document: audiences, positioning, locked decisions, claim policy. |
| `AGENTS.md` | Agent context router — maps task domains to rule files (lazy loading). |
| `agent_rules/` | Domain rule files (content-truth, site-standards, git-workflow, board-workflow). |
| `docs/` | Plans, research, notes, and design decision artifacts. |
| `.agents/skills/` | Canonical agent skills (kanban, worktrees, copywriting, impeccable). |
| `kanban/` | kanban-md board — git-tracked. Board home is this repo root. |
| `.worktrees/` | Task worktrees for branches (gitignored). |
| `.github/workflows/verify.yml` | CI: `pnpm check` + `lint` + `build` on push/PR. |

---

## Design Philosophy — "The Yakuza Ink"

The site's creative north star, in one sentence: **a yakuza boss's back piece at night** — shipped work is ink already worn, impact is set in gold leaf, the career reads as the family ledger, contact is an audience with the boss.

It deliberately refuses the dark-gradient/code-motif dev-portfolio default. Surfaces are physical: sumi-black lacquer under golden-black paper sheets, gold-leaf engraving, cinnabar hanko seals, needle linework, and a single neon rim light after dark.

### The three voices (typography)

- **Yuji Syuku (brush)** — identity only: the name, the "CAN DO" motto, vertical panel titles, the seal glyph. Never body copy; never more than once per viewport.
- **Zen Kaku Gothic New (gothic sans)** — all argument: body, headings, UI.
- **Red Hat Mono (mono)** — annotation only: marginalia, captions, N° numbering, tags.

Brush argues, sans explains, mono files.

### The named rules

- **The Gold Rule** — one gold, one purpose: `gold` = material (borders, lines), `goldbright` = voice (gilded text), `golddeep` = engraving depth (gradient stops only).
- **The Hanko Rule** — cinnabar is seal ink and nothing else: stamps and blooms, never text or fills.
- **The Neon Rim Rule** — neon is a rim light after dark, never a fill: edges and focus rims only, never brighter than 55% alpha.
- **The Ink-Surface Rule** — gold belongs on dark, ink belongs on the sheet: gilded text only on lacquer/sumi, `inkonpaper` text on paper sheets.
- **The Marginalia Rule** — mono is annotation, never headlines.
- **The Sumi Shadow Rule** — all shadows black-based, one light source (high, slightly left); colored light exists only at rims and stamps.
- **Motion register** — 100–150ms feedback, 150–300ms states, 300–500ms layout, 500–800ms hero focal; arrivals use `cubic-bezier(0.22,1,0.36,1)`; stagger capped at 240ms; ambient loops pause off-screen.

**Reduced motion is a contract, not a nicety:** under `prefers-reduced-motion` the site is fully static and fully readable — durations collapse, reveals show immediately, parallax/tilt are disabled, and the hero entrance never plays.

The full system (tokens, components, motion, do's and don'ts) lives in `frontend/DESIGN.md`. The direction decision artifacts are in `docs/impeccable/`.

---

## The AI Harness

This repo is set up for agents to work on it autonomously and in parallel. Everything below is what makes that possible — and everything below is tinkerable.

### Context routing (progressive loading)

- `AGENTS.md` (root) is the **context router**: a short repo map + a lazy-loading contract — agents read `@agent_rules/<file>.md` only when their task matches that domain, never all at once.
- `frontend/AGENTS.md` is auto-loaded when working in the app (progressive rules for the frontend domain).
- `agent_rules/` holds the rule files: `content-truth` (resume-accurate claims), `site-standards` (SEO/AEO/a11y invariants), `git-workflow`, `board-workflow`.

### Skills (`.agents/skills/` — canonical)

| Skill | When it loads |
|---|---|
| `kanban-based-development` | Working through board tasks / multi-agent coordination |
| `kanban-md` | Board operations |
| `using-git-worktrees` | Isolated feature work |
| `copywriting` | Marketing/persuasion copy |
| `impeccable` | Design direction, audits, polish |

`skills-lock.json` records each skill's source and content hash — update it whenever a skill changes.

### Agents (`.opencode/agents/` — subagents)

| Agent | When it loads |
|---|---|
| `reviewer` | Fresh-context review of a diff before merge — read-only, checks the task card's acceptance criteria + repo rules, runs the verify loop, returns a `disposition: pass \| fix \| rework` line with ordered gaps |
| `executor` | Executes one claimed board task end-to-end in its worktree — verifies, commits on the task branch, never merges or moves cards |

- Run a review with `/review [task-id]`; reports are saved to `docs/reviews/<task-id>.md` (the reviewer itself never edits).
- The reviewer's disposition is advisory — CI remains the hard gate.
- Executors are for parallelizable board tasks; sequential single-task work stays in the main session.

### Board + worktree loop

- Board home = this repo root; `kanban/` is **git-tracked** (board state commits as `chore(board): update task #<ID>`).
- Agents claim tasks (`kanban-md agent-name` → `pick --claim`), do code work in worktrees (`.worktrees/task-{ID}-{slug}`), verify with the check/lint/build loop, merge to `main`, and move tasks to `done`.
- Cards carry a **delegation contract** (Objective / Acceptance criteria / Output format / Done) so any executor can pick them up.
- Decisions, credentials, or external actions get parked in `review` with a handoff note.

### Verification

- Local: `pnpm check` → `pnpm lint` → `pnpm build` (from `frontend/`) — must all pass before merge.
- CI: `.github/workflows/verify.yml` runs the same loop on push/PR.
- OpenCode users: `/verify` command runs the loop on demand; `/review` runs the fresh-context reviewer on the current diff.

---

## How to Tinker

### Content (no code needed)

Everything the visitor reads lives in **`frontend/src/lib/data.js`** — one source of truth:

```js
siteMeta        // name, tagline, description, url, resumeUrl …
socialLinks     // GitHub, LinkedIn, YouTube, Blog, Email
impactStats     // hero stat plates
productsShipped // the six product panels
projects        // featured + archive projects
skills          // four skill cards
experience      // the family ledger (timeline)
awards          // medal strips
faq             // homepage FAQ (drives FAQPage JSON-LD)
youtube         // channel + featured grid
```

Edit an entry, run the verify loop, done. **Rules:** numbers must stay resume-accurate (see `PRODUCT.md` and `agent_rules/content-truth.md`); missing images must fall back to text medallions.

### The site (code)

```powershell
cd frontend
pnpm install
pnpm dev        # local dev server
pnpm check; pnpm lint; pnpm build   # verify before merge
```

- **Add a section:** create a component in `frontend/src/lib/components/`, feed it from `data.js`, wire it into `src/routes/+page.svelte`.
- **Add a route:** keep static prerendering (`src/routes/+layout.js`), give the page its own `<Seo.svelte>` head, and update `static/sitemap.xml` + `static/llms.txt`.
- **Standing invariants:** prerendered-only routes, shared `Seo.svelte`, data.js as the copy source, WCAG 2.2 with an axe baseline of 0 violations on `/` and `/about`, no `{@html}` with user input.

### Design

- The tokens (colors, type scale, radii, shadows, components) are codified in `frontend/DESIGN.md`.
- To explore directions or audit a surface, use the `impeccable` skill — it drives from `PRODUCT.md` and records decisions in `docs/impeccable/`.
- When changing visuals: stay inside the named rules (gold/hanko/neon/ink-surface), keep the motion register, and never break the reduced-motion contract.

### The harness

- **New skill:** drop it in `.agents/skills/<name>/SKILL.md` (with frontmatter `name` + `description`), update `skills-lock.json` with its hash.
- **New rule domain:** add `agent_rules/<domain>.md` and a row in the `AGENTS.md` routing table.
- **Board:** run `kanban-md` from the repo root; create tasks with `kanban-md new`, or just say "work through the board" to an agent.
- **Deploy:** push to `main` — Netlify builds from `netlify.toml` at the root.

---

## Documentation Index

- `PRODUCT.md` — product truth & constraints (read before any content change)
- `AGENTS.md` — agent context router
- `agent_rules/` — domain rules for agent tasks
- `frontend/DESIGN.md` — the Yakuza Ink design system
- `docs/` — plans (`plans/`), research baselines (`research/`), notes (`notes/`), design decision artifacts (`impeccable/`)
- `docs/plans/improvement_plan.md` — the executed SEO/AEO/a11y improvement plan (historical)
