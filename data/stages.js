/* ============================================================
   STAGES — the spine of the guidebook. Stage 0 is for the Scout who has
   never invented anything; Stages 1–4 are Find it, Build it, Prove it,
   and Launch it.
   How they line up with the Invention Scouts four-stage model (Dr.
   Jeanne Cairns Sinquefield, Technology and Innovation, 2026):
     Stages 0–2 of this guidebook  -> Invention Scouts Stage 1 (find and grow)
     Stage 3 (Prove it)            -> Invention Scouts Stage 2 (competitions)
     Stage 4 (Launch it)           -> Invention Scouts Stages 3 and 4 (patents,
                                      commercialization and licensing)
   Fields:
     n, id, title, sub, desc   the stage block
     model                     one line naming the Invention Scouts stage
     next                      Next Steps (three short moves)
     badges                    badge ids from data/badges.js shown as chips
     resources                 resource ids from data/resources.js, in order
     extra                     id of a <template> in index.html cloned into
                               the right column (Stage 0 carries Season Math)
     cta                       optional button: action 'built' opens the
                               "I built something" form; 'mentor' the
                               mentor request; href for anything else
   STAGE_TITLES is read by the self-assessment and My Inventor Path;
   PATH_STEPS is the saved checklist for each stage.
   ============================================================ */
const STAGE_TITLES = {
  0: { title: 'Curious', sub: 'Never invented anything? Start here' },
  1: { title: 'Find it', sub: 'Spot a problem worth solving' },
  2: { title: 'Build it', sub: 'Sketch, model, prototype, repeat' },
  3: { title: 'Prove it', sub: 'Test it with real people, then pitch it' },
  4: { title: 'Launch it', sub: 'Protect it, make it, sell or license it' }
};

/* ============================================================
   MY INVENTOR PATH — the saved checklist for each stage.
   ============================================================ */
const PATH_STEPS = {
  1: [
    'Keep a problem list for two weeks: everything that bugs you at home, school, and camp',
    'Pick one problem and write it in one sentence: who has it, and why it matters',
    'Ask five people who have the problem what they do about it today',
    'Search Google Patents and online stores: has someone already solved it?',
    'Open your Inventor\'s Notebook and make the first dated entry',
    'Tell your Scoutmaster or Invention Ranger what you are working on'
  ],
  2: [
    'Draw three different ways to solve the problem before you pick one',
    'Build a rough model out of cardboard, tape, or clay in under an hour',
    'Take the equipment safety briefing before you use a printer, laser, or saw',
    'Show your counselor your plans before you build the real prototype',
    'Build version 1, test it, and write down what broke',
    'Build version 2 and record what you changed and why'
  ],
  3: [
    'Watch three people use your prototype without helping them',
    'Write down what they said and what they did (they are not the same)',
    'Fill in the one-page business case: cost to make, price, who buys it',
    'Practice a 90-second pitch out loud, five times, for a timer',
    'Enter a unit, district, or council invention competition',
    'Ask for a mentor through the guidebook (with a parent copied)'
  ],
  4: [
    'Search for prior art properly, and list what is new about yours',
    'Talk with a parent and a mentor before you show it publicly anywhere',
    'Learn the difference between a patent, a trademark, and a copyright',
    'Work out the cost to make 50, and what you would charge',
    'Make a small batch and sell or give away your first ten',
    'Decide: sell it yourself, license it, or keep improving it'
  ]
};

/* The stage blocks on the page. */
const STAGES = [
  {
    n: 0, id: 'stage-0',
    title: 'Curious', sub: 'Never invented anything? Start here',
    model: 'Invention Scouts Stage 1 · Find and grow',
    desc: "Every inventor started by noticing something that bugged them. You don't need an idea yet, a workshop, or any money. You need a notebook, some curiosity, and about an hour a week. Pick one thing below and do it before your next troop meeting.",
    next: ['Run the Problem Hunt challenge with your patrol', 'Read the three "start here" answers in the Playbook', 'Visit the Sinquefield Innovation Space or an Invention Lab trailer'],
    badges: ['inventing'],
    extra: 'seasonMathTpl',
    resources: ['sinquefield-innovation-space', 'invention-lab-trailers', 'merit-badge-series', 'uspto-kids', 'inventors-notebook-guide', 'tinkercad']
  },
  {
    n: 1, id: 'stage-1',
    title: 'Find it', sub: 'Spot a problem worth solving',
    model: 'Invention Scouts Stage 1 · Find and grow',
    desc: "The best inventions start with a problem, not a gadget. Your campsite, your kitchen, your sport, and your patrol are full of problems nobody has fixed well. This stage is about finding one, describing it in a sentence, and checking whether someone already solved it.",
    next: ['Keep a problem list for two weeks', 'Talk to five people who have the problem', 'Open your Inventor\'s Notebook'],
    badges: ['inventing', 'engineering', 'sustainability'],
    resources: ['inventors-notebook-guide', 'google-patents', 'uspto-kids', 'merit-badge-series', 'sinquefield-innovation-space', 'invention-rangers']
  },
  {
    n: 2, id: 'stage-2',
    title: 'Build it', sub: 'Sketch, model, prototype, repeat',
    model: 'Invention Scouts Stage 1 · Find and grow',
    desc: "Now make it real. Start ugly and fast with cardboard and tape, then move to the 3D printers, laser engravers, electronics benches, and wood and metal shops when you know what you're building. Every version teaches you something. The Scouts who keep building after the first one breaks are the inventors.",
    next: ['Build a cardboard model in under an hour', 'Take the equipment safety briefing', 'Record what changed between version 1 and version 2'],
    badges: ['inventing', 'engineering', 'model-design', 'robotics', 'electronics', 'drafting'],
    resources: ['sinquefield-innovation-space', 'sinquefield-invention-campus', 'invention-lab-trailers', 'tinkercad', 'onshape', 'arduino', 'instructables', 'guide-to-safe-scouting']
  },
  {
    n: 3, id: 'stage-3',
    title: 'Prove it', sub: 'Test it with real people, then pitch it',
    model: 'Invention Scouts Stage 2 · Competitions and higher-level growth',
    desc: "An invention isn't finished when it works for you. It's finished when it works for someone else. Put it in other people's hands, watch what happens, and fix it. Then write the one-page business case and pitch it. This is where the summer-camp Startup program, the Invention Jamboree, and the competition ladder live.",
    next: ['Watch three people use it without helping', 'Fill in the one-page business case', 'Enter a unit, district, or council competition'],
    badges: ['entrepreneurship', 'communication', 'public-speaking', 'graphic-arts'],
    cta: { label: 'Ask for a mentor', action: 'mentor' },
    resources: ['startup-program', 'invention-jamboree', 'trulaske-mentors', 'mom-test', 'canva', 'sinquefield-innovation-space']
  },
  {
    n: 4, id: 'stage-4',
    title: 'Launch it', sub: 'Protect it, make it, sell or license it',
    model: 'Invention Scouts Stages 3 and 4 · Patents, commercialization, licensing',
    desc: "Some inventions are worth taking further. This stage covers what a patent is and isn't, how to make fifty of something instead of one, how to make your first sales, and what licensing means. You won't do any of this alone: every step here happens with a parent or guardian and a mentor.",
    next: ['Talk to a parent and a mentor before showing it publicly', 'Work out the cost to make fifty', 'Sell or give away your first ten'],
    badges: ['salesmanship', 'american-business', 'personal-management', 'law'],
    cta: { label: 'I built something — tell us', action: 'built' },
    resources: ['trulaske-mentors', 'uspto-patent-basics', 'uspto-scam-warning', 'google-patents', 'nai', 'sinquefield-invention-campus']
  }
];
