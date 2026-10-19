# Adopting this guidebook for another council

The guidebook is council-agnostic by design: any council adding Invention Scouts can stand up its own edition, and any business school can plug in as the mentor partner, without touching the code.

## Steps

1. **Fork or copy the repository.** Turn on GitHub Pages for `main` (Settings → Pages). Your edition is live at `https://<you>.github.io/<repo>/`.
2. **Set your identity** in `data/site.js`: names, the permanent `url`, the email that receives "I built something" and mentor requests, the council's site and phone, and the menu. Update the same address in the `<head>` of `index.html`, `robots.txt`, and `sitemap.xml`; `node scripts/check-site.mjs` tells you if they disagree.
3. **Replace the local content**, one file at a time. Each file's header comment explains its fields:
   - `data/resources.js` — your makerspaces, camps, trailers, and programs (mark them `council: true`)
   - `data/badges.js` — keep the badge list; replace `ARENAS` with your own spaces, or empty it
   - `data/opportunities.js` — your events, as `tbd` until dates are confirmed
   - `data/contacts.js` — your council's contacts and your mentor partner
   - `data/stories.js`, `data/wins.js` — your own Scouts' stories, with family consent
   - `data/stages.js`, `data/ladder.js`, `data/challenges.js`, `data/glossary.js`, `data/beyond.js`, `data/inventors.js`, `data/prompts.js` — keep, trim, or extend; little of it is Missouri-specific
   - `data/changelog.js` — start fresh with one line
4. **Rewrite the prose that names Missouri.** Search `index.html` for "Great Rivers", "Sinquefield", "Columbia", "Lake", "Trulaske", and "Mizzou": the hero, the People callout, For adults, the footer, and the flyer. Keep the credit to Invention Scouts and its founder, Dr. Jeanne Cairns Sinquefield.
5. **Colors** are the tokens at the top of `assets/css/guidebook.css`. Fonts load in the `<head>` of `index.html`.
6. **Keep the youth-privacy defaults** described in `docs/PRIVACY.md`: no analytics, nothing collected, parent-copied email drafts. Change them only after your council's review.
7. **Keep the two workflows** in `.github/workflows/`: the weekly link check and the editorial reminders. Adjust `EDITORIAL.md` to your calendar.

## What to keep untouched

`assets/js/` is the behaviour. If your data files validate (`node scripts/check-site.mjs`), the page renders.

## Credit and licence

Invention Scouts was created by Dr. Jeanne Cairns Sinquefield within the Great Rivers Council, Scouting America. This guidebook was built by the Center for Entrepreneurship & Innovation at the Robert J. Trulaske, Sr. College of Business, University of Missouri, on the platform of the [CEI Entrepreneur's Guidebook](https://github.com/nfajors/CEI). Keep the credit line in the For adults section and the footer. The QR library in `assets/vendor/` is MIT-licensed (Kazuhiko Arase). This is not an official publication of Scouting America; do not add Scouting America logos or marks without the council's permission. This repository does not yet carry a licence file; ask the CEI before publishing an edition.
