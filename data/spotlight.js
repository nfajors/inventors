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
  lede: 'Merit badges are awards Scouts BSA members earn by completing a set of requirements with a registered adult counselor. There are about 140 of them, and the badge map below shows the ones that build inventors. The best one to start with is Inventing: it walks you through a problem, the people who have it, a design, a prototype, and an honest look at whether it works. When you finish the Inventing merit badge, you will have done Stages 1 and 2 of this guidebook, and it counts toward Builder, the second level of the Young Inventor Ladder.',
  facts: [
    { value: '100+', label: 'Scouts earned Inventing at the 2025 Invention Jamboree' },
    { value: '2026', label: 'Requirements recently revised. Use the official page.' },
    { value: 'Builder', label: 'The Young Inventor Ladder level it counts toward' },
    { value: '1 & 2', label: 'The guidebook stages it covers: Find it and Build it' }
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
