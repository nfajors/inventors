/* ============================================================
   BADGES — the merit badge map. Badges are the currency Scouts,
   parents, and the council already count in, so the guidebook shows
   which ones each stage builds toward and where to earn them.
   Fields:
     id      stable slug (used by STAGES[].badges and LADDER)
     name    badge name as Scouting America spells it
     tier    'core'       the Invention & Enterprise set (the program's instruments)
             'supporting' making badges already taught in the arenas
             'emerging'   newer badges and Stage 4 helpers
     stages  guidebook stages it serves (1–4)
     why     one line: why an inventor earns it
     where   where it is usually offered locally
     eagle   true if Eagle-required (shown as a note)
     url     the official page; requirements change, so the page is the source
   Requirements are deliberately NOT copied here: they are revised often
   (Inventing was updated in 2025 and again for 2026). Link, don't copy.
   ============================================================ */
const BADGE_ALL_URL = 'https://www.scouting.org/skills/merit-badges/all/';

const BADGES = [
  // --- Core: the Invention & Enterprise set ---
  { id: 'inventing', name: 'Inventing', tier: 'core', stages: [1, 2, 3],
    why: 'Problem, users, sketch, model, prototype, and evaluation: the whole Find it → Build it loop in one badge. Earning it opens your Inventor\'s Notebook.',
    where: 'Invention Jamboree, summer camp, merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/inventing/' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', tier: 'core', stages: [3, 4],
    why: 'Generating and choosing ideas, interviewing a business founder, and writing a real business plan. It is the business case for your invention.',
    where: 'Merit badge sessions; Trulaske mentors can counsel',
    url: 'https://www.scouting.org/merit-badges/entrepreneurship/' },
  { id: 'salesmanship', name: 'Salesmanship', tier: 'core', stages: [4],
    why: 'Understanding a customer and making a real sale. The first-sale step of Launch it.',
    where: 'Merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/salesmanship/' },
  { id: 'american-business', name: 'American Business', tier: 'core', stages: [4],
    why: 'How businesses are organized, financed, and run: what you need to know before you sell or license anything.',
    where: 'Merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/american-business/' },
  { id: 'personal-management', name: 'Personal Management', tier: 'core', stages: [3, 4], eagle: true,
    why: 'Budgeting, saving, and planning a project over time. The money and time skills every inventor needs, and it counts toward Eagle.',
    where: 'Your troop, merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/personal-management/' },
  { id: 'communication', name: 'Communication', tier: 'core', stages: [3], eagle: true,
    why: 'Telling people what you built and why it matters, in writing and out loud. That is a pitch.',
    where: 'A/V/Design Studio, merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/communication/' },
  { id: 'public-speaking', name: 'Public Speaking', tier: 'core', stages: [3],
    why: 'Standing up in front of judges without your voice shaking. Practice for every competition round.',
    where: 'Merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/public-speaking/' },
  { id: 'graphic-arts', name: 'Graphic Arts', tier: 'core', stages: [3, 4],
    why: 'Logos, packaging, and the flyer for your product. On the A/V/Design Studio poster.',
    where: 'A/V/Design Studio',
    url: 'https://www.scouting.org/merit-badges/graphic-arts/' },

  // --- Supporting: making badges already in the arenas ---
  { id: 'engineering', name: 'Engineering', tier: 'supporting', stages: [1, 2],
    why: 'How engineers define a problem, design under constraints, and test.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/engineering/' },
  { id: 'drafting', name: 'Drafting', tier: 'supporting', stages: [2],
    why: 'Drawings other people can build from, by hand and in CAD.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/drafting/' },
  { id: 'model-design', name: 'Model Design and Building', tier: 'supporting', stages: [2],
    why: 'Turning an idea into a scale model: the step before a full prototype.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/model-design-and-building/' },
  { id: 'electronics', name: 'Electronics', tier: 'supporting', stages: [2],
    why: 'Circuits, soldering, and the parts inside most gadgets.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/electronics/' },
  { id: 'robotics', name: 'Robotics', tier: 'supporting', stages: [2],
    why: 'Sensors, motors, and code working together.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/robotics/' },
  { id: 'programming', name: 'Programming', tier: 'supporting', stages: [2],
    why: 'If your invention is an app or has a brain, you need this.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/programming/' },
  { id: 'digital-technology', name: 'Digital Technology', tier: 'supporting', stages: [2],
    why: 'How digital devices work, and how to use them responsibly.',
    where: 'Engineering & Programming Arena',
    url: 'https://www.scouting.org/merit-badges/digital-technology/' },
  { id: 'composite-materials', name: 'Composite Materials', tier: 'supporting', stages: [2],
    why: 'Strong, light materials, and choosing the right one for the job.',
    where: 'Science & Nature Lab',
    url: 'https://www.scouting.org/merit-badges/composite-materials/' },
  { id: 'woodwork', name: 'Woodwork', tier: 'supporting', stages: [2],
    why: 'Real shop skills for real prototypes.',
    where: 'Invention Campus woodworking shop',
    url: 'https://www.scouting.org/merit-badges/woodwork/' },
  { id: 'metalwork', name: 'Metalwork', tier: 'supporting', stages: [2],
    why: 'Cutting, shaping, and joining metal. Taught in the Metalworking Building at the Lake.',
    where: 'Invention Campus Metalworking Building',
    url: 'https://www.scouting.org/merit-badges/metalwork/' },
  { id: 'welding', name: 'Welding', tier: 'supporting', stages: [2],
    why: 'Joining metal parts that have to hold. Older Scouts, with trained supervision.',
    where: 'Invention Campus Skills & Trades Lab',
    url: 'https://www.scouting.org/merit-badges/welding/' },
  { id: 'game-design', name: 'Game Design', tier: 'supporting', stages: [2, 3],
    why: 'Designing for a player is designing for a user: test, watch, fix.',
    where: 'A/V/Design Studio',
    url: 'https://www.scouting.org/merit-badges/game-design/' },
  { id: 'photography', name: 'Photography', tier: 'supporting', stages: [3],
    why: 'Product photos for the poster, the pitch, and the sales page.',
    where: 'A/V/Design Studio',
    url: 'https://www.scouting.org/merit-badges/photography/' },
  { id: 'moviemaking', name: 'Moviemaking', tier: 'supporting', stages: [3],
    why: 'The 60-second pitch video. The studio has the backdrop.',
    where: 'A/V/Design Studio',
    url: 'https://www.scouting.org/merit-badges/moviemaking/' },
  { id: 'journalism', name: 'Journalism', tier: 'supporting', stages: [3],
    why: 'Telling your invention\'s story so other people retell it.',
    where: 'A/V/Design Studio',
    url: 'https://www.scouting.org/merit-badges/journalism/' },
  { id: 'sustainability', name: 'Sustainability', tier: 'supporting', stages: [1],
    why: 'A rich source of problems worth solving: water, energy, food, and waste. One of the two Eagle options, with Environmental Science.',
    where: 'Science & Nature Lab',
    url: 'https://www.scouting.org/merit-badges/sustainability/' },
  { id: 'energy', name: 'Energy', tier: 'supporting', stages: [1, 2],
    why: 'How power is made and used. Useful for anything that plugs in or runs on a battery.',
    where: 'Science & Nature Lab',
    url: 'https://www.scouting.org/merit-badges/energy/' },

  // --- Emerging and Stage 4 helpers ---
  { id: 'artificial-intelligence', name: 'Artificial Intelligence', tier: 'emerging', stages: [2, 3],
    why: 'New in 2025. How AI works, what it gets wrong, and how to use it well. See the AI section of this guidebook.',
    where: 'Ask the council; counselors are still being added',
    url: 'https://www.scouting.org/merit-badges/artificial-intelligence/' },
  { id: 'cybersecurity', name: 'Cybersecurity', tier: 'emerging', stages: [2, 4],
    why: 'New in 2025. Anything connected to the internet needs to be safe to use.',
    where: 'Ask the council; counselors are still being added',
    url: 'https://www.scouting.org/merit-badges/cybersecurity/' },
  { id: 'law', name: 'Law', tier: 'emerging', stages: [4],
    why: 'How laws, courts, and contracts work, including the rules that protect inventions.',
    where: 'Merit badge sessions; alumni attorneys can counsel',
    url: 'https://www.scouting.org/merit-badges/law/' },
  { id: 'chess', name: 'Chess', tier: 'emerging', stages: [1],
    why: 'Thinking several moves ahead. Dr. Sinquefield persuaded the BSA to create this badge in 2011, and Chess2Go, the founding story of Invention Scouts, is a portable chess set.',
    where: 'Merit badge sessions',
    url: 'https://www.scouting.org/merit-badges/chess/' }
];

/* ============================================================
   ARENAS — the posted arenas of the Sinquefield Innovation Space, with
   the Scouts BSA merit badges and Nova awards on each wall poster
   (copied from the posters, October 2026). `proposed: true` marks the
   fifth arena that Trulaske has proposed to the council and equip.
   ============================================================ */
const ARENAS = [
  { id: 'engineering', name: 'Engineering & Programming Arena',
    badges: ['Architecture', 'Digital Technology', 'Drafting', 'Electronics', 'Engineering', 'Model Design & Building', 'Pioneering', 'Programming', 'Railroading', 'Robotics', 'Surveying', 'Space Exploration'],
    nova: ['Start Your Engines!', 'Next Big Thing', 'Up and Away', 'Whoosh!'],
    gear: 'Mechanics, sensor, and drone kits; the 3D printer bank' },
  { id: 'science', name: 'Science & Nature Lab',
    badges: ['Animal Science', 'Astronomy', 'Bird Study', 'Chemistry', 'Composite Materials', 'Energy', 'Environmental Science', 'Fish & Wildlife Management', 'Forestry', 'Gardening', 'Insect Study', 'Mammal Study', 'Nature', 'Nuclear Science', 'Oceanography', 'Plant Science', 'Soil & Water Conservation', 'Sustainability'],
    nova: ["Mendel's Minions", 'Splash!', 'Let It Grow!', 'Shoot!'],
    gear: 'A dozen microscopes, lab coats, and chemistry kits' },
  { id: 'health', name: 'Health & Safety Arena',
    badges: ['Athletics', 'Crime Prevention', 'Dentistry', 'Disabilities Awareness', 'Emergency Preparedness', 'Fire Safety', 'First Aid', 'Health Care Professions', 'Personal Fitness', 'Public Health', 'Safety', 'Search and Rescue', 'Traffic Safety', 'Veterinary Medicine', 'Wilderness Survival'],
    nova: [],
    gear: 'First-aid and emergency training equipment. A great place to find problems people need solved.' },
  { id: 'av', name: 'Audio/Visual/Design Studio',
    badges: ['Animation', 'Communication', 'Graphic Arts', 'Game Design', 'Journalism', 'Moviemaking', 'Photography', 'Radio', 'Theater'],
    nova: ['Hello, World'],
    gear: 'A large-format printer and a photo backdrop: your pitch-video and product-photo studio' },
  { id: 'enterprise', name: 'Invention & Enterprise Arena', proposed: true,
    badges: ['Inventing', 'Entrepreneurship', 'Salesmanship', 'American Business', 'Personal Management', 'Communication', 'Public Speaking', 'Graphic Arts', 'Law'],
    nova: [],
    gear: 'Starter kits for your notebook project, a pitch backdrop, and mentor office hours' }
];
