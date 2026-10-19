# The Young Inventor's Guidebook · Invention Scouts × Trulaske CEI

A guidebook for Scouts aged 12 to 18 who want to invent: how to find a problem worth solving, build a fix, prove it works for other people, and launch it. It is built for the **Invention Scouts** program of the Great Rivers Council, Scouting America, with mentors from the **Center for Entrepreneurship & Innovation** at the Robert J. Trulaske, Sr. College of Business, University of Missouri.

It runs on the same platform as the [CEI Entrepreneur's Guidebook](https://github.com/nfajors/CEI): one static page, every list in a plain data file, nothing to install.

Live page (once GitHub Pages is on for `main`): https://nfajors.github.io/inventors/

## What's in it

| Section | What a Scout gets |
|---|---|
| **Stages** | Stage 0 (Curious) plus Find it, Build it, Prove it, Launch it. Each lists the badges that help, the places and tools to use, and three next steps. Stage 0 carries Season Math: what fits before your next event. |
| **My Path** | A six-step checklist for the Scout's stage, saved on their device. The "Where am I?" quiz sets it. |
| **Notebook** | The Inventor's Notebook: one project, dated entries (what I did, what I learned and changed, why), versions, hours, user conversations, and the badges the project earned. This is the record the program plan calls a Supervised Invention Experience. It prints, downloads as text, backs up and restores as JSON, and pre-fills the "I built something" and mentor-request emails. |
| **Ladder** | The pilot Young Inventor Ladder (Tinkerer, Builder, Inventor, Founder), each rung anchored on a merit badge, with a printable sign-off sheet. |
| **Badges** | The merit badge map (core Invention & Enterprise set, making badges, new and Stage 4 badges), filterable by stage, linked to the official requirement pages, plus the Innovation Space arenas and the proposed fifth arena. |
| **Playbook** | Thirteen questions young inventors run into, from "How do I find a problem worth solving?" to "Should I patent my invention?", a practice judging rubric, and the proposed award slate. |
| **Challenges** | Nine patrol challenges a patrol leader or Invention Ranger can run at a meeting, most in 45 minutes. |
| **Calendar** | Jamboree, summer camp, Merit Badge University, and the competition ladder, with a subscribable feed once dates are confirmed. |
| **Workbench** | Price it, Make a batch (break-even), and 3D print cost. |
| **AI** | Rules for using AI tools at 12 to 18 (age limits, privacy, do your own work) and a Prompt Studio of prompts that coach rather than do the work. |
| **Resources, Glossary, Beyond, Inventors** | A searchable index, 40 plain-language terms, national competitions for teens, and eleven inventors who started between 11 and 18. |
| **People, Safety, For adults** | Who to talk to first (roles, not personal contact details), the Youth Protection rules every mentor follows, privacy on the page, and guidance for parents, Scoutmasters, Invention Rangers, and mentors. |

## Layout

| Path | What it is |
|---|---|
| `index.html` | The page. Long-form prose (the Playbook, AI, Safety, For adults) is written here; every list is rendered from `data/`. |
| `data/*.js` | **The content you edit.** One plain JavaScript list per file, each with a comment explaining its fields. No build step: edit, save, refresh. |
| `assets/css/guidebook.css` | The CEI Guidebook stylesheet, with the color tokens at the top changed to blueprint navy and spark orange. |
| `assets/css/inventors.css` | Components this edition adds: notebook, ladder, badge map, arenas, challenges, rubric, safety cards. |
| `assets/js/render.js` | Turns `data/*.js` into the page; builds the parent-copied email drafts. |
| `assets/js/guidebook.js` | Navigation, accordions, printing, search and filters, the quiz, Season Math, the glossary, the Prompt Studio. |
| `assets/js/features.js` | Everything saved on the visitor's device: My Path, the Notebook, the Ladder, the Calendar, the Workbench. |
| `scripts/check-site.mjs` | Validates the data files and cross-references, checks the permanent address, and fails if an analytics tag appears. Run before committing. |
| `scripts/build-ics.mjs` | Builds `calendar.ics` from confirmed dates only. |
| `.github/workflows/` | Weekly link check and data validation; monthly and semester editorial reminders (see `EDITORIAL.md`). |
| `docs/PRIVACY.md` | The youth-privacy and safety decisions, and what to check before changing them. |
| `ADOPTING.md` | How another council, or another business school, stands up its own edition. |

## Where each editable list lives

| Want to change… | Edit |
|---|---|
| Name, URL, email, council contacts, review dates, the menu, optional form links | `data/site.js` |
| Stage text, next steps, badges and resources per stage; the My Path checklists | `data/stages.js` |
| Resource cards | `data/resources.js` |
| The badge map and the arenas | `data/badges.js` |
| Ladder rungs and requirements | `data/ladder.js` |
| Patrol challenges | `data/challenges.js` |
| Calendar | `data/opportunities.js` — switch an entry from `tbd` to `dated` with `confirmed: true` once the council publishes the date |
| What's New strip and the footer date | `data/changelog.js` — add a line at the top |
| Milestones feed and the 2025 numbers | `data/wins.js` |
| Glossary, knowledge hub, national programs, inventor profiles | `data/glossary.js`, `data/knowledge.js`, `data/beyond.js`, `data/inventors.js` |
| People and the "who do I talk to first" doors | `data/contacts.js` |
| The three stories under the hero; the Spotlight | `data/stories.js`, `data/spotlight.js` |
| Prompt Studio prompts | `data/prompts.js` |

## Before you commit

```
node scripts/check-site.mjs   # data files valid, ids resolve, permanent address consistent, no analytics tag
node scripts/build-ics.mjs    # refresh the calendar feed after editing dates
```

## Working locally

Open `index.html` in a browser, or serve the folder (`python3 -m http.server`) so the data files load over HTTP. There is nothing to install.

## Before launch: decisions for the council and CEI

This edition is a reviewable first draft. These are open, and each is marked in the data files:

1. **Who receives the emails.** "I built something", mentor requests, and nominations go to `SITE.email` (currently `cei@missouri.edu`). Confirm with the council, or point `builtUrl` / `mentorUrl` / `nominationUrl` at forms.
2. **Ladder names and requirements.** The ladder is labeled "pilot". If Invention Scouts already has its own levels, rename the rungs in `data/ladder.js`; the page follows.
3. **Consent for named Scouts.** The Chess2Go story (Life Scout Sam Goldstein) and John Hayes's story come from public sources (the World Chess Hall of Fame and the council's 2025 Annual Report). Confirm the families are happy to be featured before the page is announced.
4. **Program links.** Several council programs point at `greatriversscouting.org` or the Sinquefield Invention Campus page until program-specific pages are confirmed. `inventionscouts.org` (cited in Dr. Sinquefield's editorial) refused connections in October 2026, so nothing links to it; if it comes back, set `SITE.programUrl` and the program cards to it.
5. **Dates.** Every council date is "to be announced" until the council confirms it.
6. **Hosting and credit.** Whether the guidebook lives here, under inventionscouts.org, or both, and how Invention Scouts and Dr. Sinquefield want to be credited.
7. **Badge pages.** Badge links use the scouting.org pattern `/merit-badges/<name>/`; the weekly link check will flag any that differ. Have the council's advancement chair review the badge map.
8. **Photographs.** The page ships with no photos. A good first one is the framed photograph at the Scouting Adventure Center of the Chess merit badge launch (September 10, 2011; Rex Sinquefield, Dr. Sinquefield, and astronaut Gregory E. Chamitoff). It is a professional photograph by Lori Mattler of Lace Photography, so get written permission from the photographer (or the World Chess Hall of Fame) and use the original file, not a photo of the frame. Photos of Scouts need the family's written consent.
