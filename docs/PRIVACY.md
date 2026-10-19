# Privacy and youth safety

The Young Inventor's Guidebook is written for Scouts aged 12 to 18. Some readers are under 13. These are the decisions that follow from that, and what to check before changing any of them.

## What the page does and doesn't do

- **No analytics or tracking.** The CEI Guidebook uses a GA4 tag; this edition does not. `track()` is kept as a no-op so the shared code runs unchanged. `scripts/check-site.mjs` fails if a Google tag appears in `index.html`.
- **Nothing is collected.** My Path, the Inventor's Notebook, the Ladder, Season Math, and the Workbench save to the visitor's own browser (`localStorage`, keys starting `yig_`). Nothing is sent to a server. Clearing browser data clears them. The notebook offers a text download and a JSON backup so a Scout can move devices.
- **Emails are drafts.** "I built something", "Ask for a mentor", nominations, and reminders open the visitor's own email app with a prefilled draft addressed to `SITE.email`. Every draft asks for a parent or guardian on the CC line, and the "I built something" draft asks the Scout to confirm their parent has read it. Nothing is sent until someone presses send.
- **Minimal personal details.** The drafts ask for a first name, unit, council, and age. The notebook tells Scouts to use first names only and to leave out addresses, schools, and phone numbers.
- **Third parties.** Fonts load from Google Fonts. Outbound links go to Scouting America, the council, the USPTO, and the online tools listed in Resources, each with its own age rules (noted on the card).

## Youth Protection, as the page states it

The page states the rules every mentor follows so Scouts know what normal looks like: Youth Protection Training and council registration before contact, two-deep leadership, no one-on-one contact in person or online, a parent or another leader copied on every message, and meetings in program spaces. It lists the Scouts First Helpline (1-844-SCOUTS1). The People section lists roles and organizations, not individual adults' personal contact details.

## Before you change any of this

- **Adding analytics:** get the council's privacy review first. Consider COPPA (some readers are under 13), use a cookieless configuration that records no personal data, and update the "Your privacy on this page" card in `index.html` and this file. Remove the check in `scripts/check-site.mjs` only once that is done.
- **Replacing email drafts with forms** (`builtUrl`, `mentorUrl`, `nominationUrl` in `data/site.js`): the form must collect a parent's or guardian's consent and contact, store only what the registry needs, and be covered by the council–CEI agreement on data sharing.
- **Publishing a Scout's name, photo, or project:** written consent from the family first. The data files say so where it applies (`stories.js`, `wins.js`, `inventors.js`).
