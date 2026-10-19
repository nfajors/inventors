/* ============================================================
   SPOTLIGHT — one featured badge, event, or program, shown under the
   stories. Set SPOTLIGHT = null to hide the band.
   Fields: eyebrow, title, titleGold, lede, facts [{value,label}] (up to
   four), steps (How to start), fit (one line), cta {label,url},
   more {label,to} (a section id).
   ============================================================ */
const SPOTLIGHT = {
  eyebrow: 'Start with one badge',
  title: 'Inventing',
  titleGold: 'The merit badge that opens your notebook',
  lede: 'Inventing walks you through the whole loop: a problem, the people who have it, a design, a prototype, and an honest look at whether it works. Earn it and you have already done Stages 1 and 2 of this guidebook, and the first rung of the ladder after Tinkerer.',
  facts: [
    { value: '100+', label: 'Scouts earned Inventing at the 2025 Invention Jamboree' },
    { value: '2026', label: 'Requirements recently revised. Use the official page.' },
    { value: 'Builder', label: 'The ladder rung it anchors' },
    { value: 'Stages 1–2', label: 'Find it and Build it' }
  ],
  steps: [
    'Ask your Scoutmaster for an Inventing counselor, or sign up at a council merit badge session.',
    'Open your Inventor\'s Notebook in this guidebook and make your first entry.',
    'Talk to people who have your problem before you design anything.',
    'Show your counselor your design and plans, and get approval before you build the prototype.',
    'Build, test, and record what you would change.'
  ],
  fit: 'Some requirements need a parent\'s or guardian\'s permission and your counselor\'s approval. Check the current requirements first.',
  cta: { label: 'Current Inventing requirements', url: 'https://www.scouting.org/merit-badges/inventing/' },
  more: { label: 'See every badge on the map', to: 'badges' }
};
