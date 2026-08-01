# Content Truth Rules

`PRODUCT.md` (repo root) is the product truth document. `frontend/static/assets/sakib_shahon_resume.pdf` is the canonical source for all claims about the owner.

## Non-negotiables

- **Never fabricate** metrics, testimonials, or benchmarks. Every number must be traceable to the resume or explicitly labeled as product context.
- Company/product-scale facts (e.g., download counts, organizer counts) may appear only as labeled product context, **never as personal KPIs**.
- Socials are locked: GitHub `sakib3201`, LinkedIn `sakib-shahon`, YouTube `@sakibshahon`, Blog dev.to `sakib3201`.
- No phone number anywhere on the site.
- Awards (resume-accurate): ICPC 2023 Mymensingh Division Champion (top 4% nationally); NASA Space Apps 2019 Regional Champion + 2020 2nd Runner-up; 15+ official LightOJ tutorials.
- If a fact is missing or ambiguous, ask the owner — do not invent a placeholder.

## Workflow

- Copy/content changes: edit `frontend/src/lib/data.js` first; components render from data.
- FAQ answers must be strictly data-backed (no invented availability/stat claims).
- For persuasion-heavy copy passes, load the copywriting skill (`.agents/skills/copywriting/`).
