# Editorial cadence

The guidebook stays trustworthy only if someone looks at it on a schedule. A GitHub workflow (`.github/workflows/editorial-review.yml`) opens an issue with the matching checklist on each date. Each pass ends with a line in `data/changelog.js`, which updates the "What's new" strip and the footer date on its own.

| When | What | Owner | Time |
|---|---|---|---|
| Every Monday (automatic) | Link check, data validation, calendar-feed rebuild | GitHub Actions | 0 |
| First Monday of the month | The monthly pass | CEI staff | ~30 min |
| 15 August | The fall refresh (Jamboree year, fall events) | CEI with the council's Invention Scouts lead | ~2 hours |
| 15 January | The spring refresh (summer camp, Merit Badge University) | CEI with the council's Invention Scouts lead | ~2 hours |
| Each June | Outcomes and the annual review | CEI director and the council | ~half a day |

`SITE.nextReview` in `data/site.js` is the date of the next semester refresh and is shown in the footer.

## The monthly pass

- [ ] Add any milestones from the last month to `data/wins.js` **with the family's written consent** for any Scout named. First names and unit are enough.
- [ ] Read the "Broken links" issue if one is open; fix or replace each link in `data/*.js` or `index.html`, then close it.
- [ ] Look at the calendar: has the council published a date? Switch the entry to `cycle: 'dated'`, set `closesOn`, `confirmed: true`, and `verifiedOn`, then run `node scripts/build-ics.mjs`.
- [ ] Check the inbox for "I built something" emails, mentor requests, and nominations, and route each to the council's Invention Scouts lead or a trained mentor.
- [ ] Add one line to the top of `data/changelog.js` describing what changed.

## The semester refresh

- [ ] **Badges.** Check every badge in `data/badges.js` against the official list (scouting.org/skills/merit-badges/all). Requirements change often; the page links rather than copies them. Update `SITE.reviewed.badges`. Ask the council's advancement chair to look at any change to the core set.
- [ ] **Arenas.** Have the Innovation Space posters changed? Update `ARENAS` in `data/badges.js`. Has the Invention & Enterprise Arena opened? Remove `proposed: true`.
- [ ] **Calendar.** Confirm the season's dates with the council: Jamboree (odd-numbered Octobers), summer camp and the Startup program, Merit Badge University, competition rounds, Awards Day. Update `SITE.reviewed.calendar`.
- [ ] **Ladder.** Any change the council and CEI agreed to the rungs? Edit `data/ladder.js`. Never reuse a requirement `id` for different text (Scouts' saved progress keys on it).
- [ ] **People and programs.** Any new program, trailer route, or mentor channel? Update `data/resources.js` and `data/contacts.js`. Update `SITE.reviewed.resources`.
- [ ] **Beyond.** Skim the national programs in `data/beyond.js` for programs that ended or changed ages. Update `SITE.reviewed.beyond`.
- [ ] **AI.** Re-read the AI rules in `index.html` (`id="ai"`), especially the age-limit line. Update `SITE.reviewed.ai`.
- [ ] **Dates.** Update `SITE.nextReview`.
- [ ] Run `node scripts/check-site.mjs`, then add the changelog line.

## The annual close (June)

- [ ] Fill in `OUTCOMES.reported` in `data/wins.js` for the year (Scouts with an open notebook project, Scouts matched to a mentor, ladder rungs earned, competition entries, trained mentors, Rangers trained) and set `OUTCOMES.year`. Tiles appear as soon as a value is not null.
- [ ] Update `OUTCOMES.facts` from the council's new annual report.
- [ ] Re-read `docs/PRIVACY.md` against what the page actually does.
- [ ] Tag a release (`git tag v2026-27`) so a known-good copy exists.

## Who can edit what

Everything a Scout sees is in `data/*.js` or `index.html`, editable in the GitHub web editor with no build step. Nothing in `assets/js/` needs to change for content work. If you are unsure, open an issue and label it `editorial`.
