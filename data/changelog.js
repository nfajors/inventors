/* ============================================================
   WHAT'S NEW + NEW BADGES — read by assets/js/features.js.
   EDITING: add a line at the top of CHANGELOG whenever the guidebook
   changes. Newest first. Dates are ISO (YYYY-MM-DD). The footer
   "Updated …" stamp and the What's New strip both read from it.
   ============================================================ */
const CHANGELOG = [
  { date: '2026-10-19', text: 'First edition, for review: the four stages, an <a href="#notebook">Inventor\'s Notebook</a> that saves on your device, the pilot <a href="#ladder">Young Inventor Ladder</a>, the <a href="#badges">badge and arena map</a>, nine patrol challenges, and a Playbook of the questions every young inventor asks.' }
];

/* Resources added recently, by exact card title -> ISO date.
   Anything dated within the last 45 days gets a NEW badge automatically. */
const RESOURCE_ADDED = {};
