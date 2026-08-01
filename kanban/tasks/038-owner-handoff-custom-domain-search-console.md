---
id: 38
title: 'Owner handoff: custom domain + Search Console + approvals'
status: review
priority: medium
created: 2026-08-01T11:37:19.2650149+06:00
updated: 2026-08-01T12:47:40.8550219+06:00
tags:
    - owner
    - qa
parent: 20
depends_on:
    - 37
blocked: true
block_reason: 'Waiting on owner: custom domain purchase + Search Console + logo assets (see checklist in note)'
class: standard
---

Goal: hand off blocking owner actions as a review task - it cannot complete without the owner. Steps to document in the handoff note: (a) buy a custom domain (suggest sakibshahon.dev or .com), add it in Netlify, then change siteOrigin in frontend/src/lib/data.js to the new domain and redeploy (one-line swap thanks to task #22); (b) verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap; (c) confirm/convert the OG image if task #23 parked an SVG; (d) optionally list the site in llmstxt.org directory. Use kanban-md handoff with --block and a note containing exactly these steps. Acceptance: task parked in review with the full owner checklist. WORKFLOW: board home = repo root (run kanban-md here). All code changes in a worktree: git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug} (from main). Verify in frontend/ with pnpm check, pnpm lint, pnpm build. Commit in worktree, merge to main from board home, then: kanban-md edit {ID} --release, kanban-md move {ID} done.

[[2026-08-01]] Sat 12:10
## Owner backlog (collected so far)
- Provide real brand logo assets for: timetics, aisentic, booktics, eventin, wpcafe, findracepace (image refs nulled in data.js - fallback medallions render) - add as /assets/<name>-logo.webp and un-null the refs.
- Convert og-image.svg fallback to PNG if task #23 parked an SVG (it did not - PNG landed).

[[2026-08-01]] Sat 12:47
## Owner checklist (complete in order)
1. Custom domain: buy one (e.g. sakibshahon.dev), add it in Netlify Site settings, then one-line swap: frontend/src/lib/data.js -> siteMeta.siteOrigin -> new domain, redeploy. ALSO update the hardcoded netlify URLs in frontend/static/llms.txt and frontend/static/sitemap.xml (they currently point at sakibshahon.netlify.app).
2. Google Search Console + Bing Webmaster Tools: verify the domain, submit https://<domain>/sitemap.xml.
3. Run Google Rich Results Test on the deployed site (JSON-LD validated locally: @graph Person/ProfilePage/WebSite + FAQPage - no warnings expected).
4. Provide real brand logo assets (currently nulled in data.js, medallion fallbacks render): timetics, aisentic, booktics, eventin, wpcafe, findracepace. Drop as frontend/static/assets/<name>-logo.webp and un-null the refs in frontend/src/lib/data.js.
5. Optional: list the site in the llmstxt.org directory; follow-up perf candidate - self-host the Google Fonts (render-blocking; desktop perf 85/100, LCP 1.6s desktop / 5.4s lab-mobile).
