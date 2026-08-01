---
id: 3
title: Re-skin HomepageContactMe as the desk letter
status: done
priority: high
created: 2026-07-31T22:12:50.0260215+06:00
updated: 2026-07-31T22:30:04.3599134+06:00
started: 2026-07-31T22:30:04.3654722+06:00
completed: 2026-07-31T22:30:04.3654722+06:00
claimed_by: hail-delta
claimed_at: 2026-07-31T22:30:04.3599134+06:00
class: standard
---

File: frontend/src/lib/components/HomepageContactMe.svelte. Rebuild as 'The Desk': portrait (professional.webp) in a wood frame (bg-wood border, paper mat) + contact form as a letter on paper (paper-sheet card). Form fields = ruled lines: labels marginalia text-inkonpaper, inputs transparent bg, border-b only, serif text-inkonpaper. Submit button = ribbon with foilbright text 'Send the letter'. PRESERVE EXACTLY: action https://api.web3forms.com/submit, hidden access_key/subject/from_name fields, honeypot botcheck, required email+message fields. Below form: email + LinkedIn links as outline buttons. No phone anywhere. id=contact + scroll-mt-24. See ProductsShipped.svelte for grammar reference.

[[2026-07-31]] Fri 22:29
Ready to merge: branch task/3-readingshelf-3. HomepageContactMe rebuilt as 'The Desk': bg-ink section (id=contact, scroll-mt-24) with embossed 'Write to me' header + marginalia line; left portrait (professional.webp) in wood frame (bg-wood + border-4 border-woodlight, paperdim mat, border-paper/30 hairline) with plate caption; right paper-sheet letter card with ruled-line inputs (bg-transparent, border-b ink-on-paper/30, serif ink-on-paper, placeholder at 40%), ribbon 'Send the letter' button with arrow SVG; below the letter: Email + LinkedIn outline links (border-thread/50, hover foil). Web3Forms wiring preserved exactly (access_key, subject, from_name, botcheck honeypot, required email+message). No phone, no new deps, tokens/classes only. Verified: pnpm check 0 errors/0 warnings, pnpm lint clean (no Navbar or other-file errors).
