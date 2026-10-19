/* ============================================================
   RESOURCES — every card in the stage grids and the searchable index.
   One entry per resource (no duplicates). Which stage grids show a card
   is decided by STAGES[].resources in data/stages.js.
   Fields:
     id         stable slug, used by STAGES[].resources and by deep links
     name, url  card title and destination (a #section for a page section)
     tag        type shown on the card and in the Type filter:
                Place | Program | Event | Online tool | Learn | Safety | Mentors
     throughout true = relevant in every stage ("Throughout" in the index)
     blurb      one or two sentences, written for a Scout
     keywords   extra search words
     who        who can use it, in a few words
     cost       "Free", "Camp fee", "Varies"
     time       "One afternoon", "Weekly", "Self-paced"
     council    true for Great Rivers Council programs (marked on the card)
     age        optional age note for online tools ("13+, or a parent sets it up")
   ============================================================ */
const RESOURCES = [
  // --- Places and programs run by the Great Rivers Council ---
  {
    id: 'sinquefield-innovation-space',
    name: 'Sinquefield Innovation Space',
    url: 'https://greatriversscouting.org/',
    tag: 'Place',
    blurb: 'Inside the Scouting Adventure Center in Columbia, just off I-70. Four arenas (Engineering & Programming, Science & Nature, Health & Safety, and an Audio/Visual/Design Studio), a bank of 3D printers, a 26-foot climbing wall, and merit badge sessions all year.',
    keywords: 'columbia adventure center 3d printer arena lab studio',
    who: 'Scouts and units across the council',
    cost: 'Varies by session',
    time: 'Year-round sessions',
    council: true
  },
  {
    id: 'sinquefield-invention-campus',
    name: 'Sinquefield Invention Campus',
    url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/',
    tag: 'Place',
    blurb: 'At Lake of the Ozarks Scout Reservation: the Invention Lab, a Program Building, a Metalworking Building, and a Skills & Trades Lab, with laser engravers, 3D printers, electronics, CNC, woodworking, and welding. The only campus of its kind in Scouting.',
    keywords: 'lake ozarks camp hohn summer camp metalwork welding laser cnc woodworking',
    who: 'Scouts at summer camp and council events',
    cost: 'Camp or event fee',
    time: 'Summer camp week, weekends',
    council: true
  },
  {
    id: 'invention-lab-trailers',
    name: 'Sinquefield Invention Lab trailers',
    url: 'https://greatriversscouting.org/',
    tag: 'Place',
    blurb: 'A makerspace on wheels. The trailers bring printers, engravers, and electronics to units and events across the council\'s 33 counties. Ask your unit leader to request a visit.',
    keywords: 'mobile lab trailer rural districts',
    who: 'Units and districts in the council',
    cost: 'Ask the council',
    time: 'By request',
    council: true
  },
  {
    id: 'merit-badge-series',
    name: 'Merit badge sessions at the Scouting Adventure Center',
    url: 'https://greatriversscouting.org/',
    tag: 'Program',
    blurb: 'Weekend and evening merit badge classes in the Innovation Space arenas. Over 1,800 Scouts attended council merit badge college workshops in 2025.',
    keywords: 'merit badge university college workshops classes',
    who: 'Scouts BSA, with unit registration',
    cost: 'Per-session fee',
    time: 'Half or full day',
    council: true
  },
  {
    id: 'startup-program',
    name: 'Invention Scouts Startup program',
    url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/',
    tag: 'Program',
    blurb: 'At summer camp, small teams pick an invention, build a prototype with the camp\'s equipment, write a business plan with marketing and sales, and pitch it, with adult mentors alongside. Not everyone becomes an inventor; everyone learns to work as a team.',
    keywords: 'summer camp team pitch business plan prototype',
    who: 'Scouts BSA at summer camp',
    cost: 'Part of the camp program',
    time: 'One week of summer camp',
    council: true
  },
  {
    id: 'invention-jamboree',
    name: 'Invention Jamboree',
    url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/',
    tag: 'Event',
    blurb: 'A weekend at the Invention Campus every other October. In 2025, nearly 200 Scouts from Missouri\'s five councils rotated through laser, 3D-printing, metalworking, and electronics stations, met working inventors and engineers, and more than 100 earned Inventing.',
    keywords: 'jamboree october lake competition inventing badge',
    who: 'Scouts from any Missouri council',
    cost: 'Event fee',
    time: 'One weekend, odd-numbered years',
    council: true
  },
  {
    id: 'invention-rangers',
    name: 'Invention Rangers',
    url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/',
    tag: 'Mentors',
    blurb: 'Adult leaders trained on the equipment and on how to run Invention Scouts back home. If your unit has a Ranger, they are the first adult to show your notebook to. If it does not, ask your Scoutmaster to become one.',
    keywords: 'adult leader training ranger advisor unit',
    who: 'Adult leaders (ask yours)',
    cost: 'Free to ask',
    time: 'At your unit meetings',
    council: true
  },
  {
    id: 'trulaske-mentors',
    name: 'Trulaske invention mentors',
    url: '#people',
    tag: 'Mentors',
    blurb: 'University of Missouri students, faculty, and alumni founders from the Trulaske College of Business who help with the business half: who would buy it, what to charge, how to pitch, and, later, patents and licensing. Every mentor completes Youth Protection Training.',
    keywords: 'mentor mizzou university business pitch patent alumni cei',
    who: 'Scouts with a notebook project',
    cost: 'Free',
    time: 'Sessions at the Innovation Space',
    council: false
  },

  // --- Learn ---
  {
    id: 'inventors-notebook-guide',
    name: 'Your Inventor\'s Notebook',
    url: '#notebook',
    tag: 'Learn',
    throughout: true,
    blurb: 'The record of your invention: dated entries, sketches, versions, and the people you talked to. It is what counselors, mentors, and judges look at, and it lives right here in the guidebook.',
    keywords: 'notebook log journal sie supervised invention experience record',
    who: 'Every Scout',
    cost: 'Free',
    time: 'Ten minutes a session'
  },
  {
    id: 'uspto-kids',
    name: 'USPTO Kids & Teens',
    url: 'https://www.uspto.gov/kids',
    tag: 'Learn',
    blurb: 'The U.S. Patent and Trademark Office\'s own pages for young inventors: what patents and trademarks protect, stories of young inventors, and activities.',
    keywords: 'patent office government young inventors',
    who: 'Anyone',
    cost: 'Free',
    time: 'Self-paced'
  },
  {
    id: 'uspto-patent-basics',
    name: 'USPTO Patent Basics',
    url: 'https://www.uspto.gov/patents/basics',
    tag: 'Learn',
    blurb: 'What a patent is, the different kinds, what they cost, and how the process works, from the people who grant them. Read it with a parent before you spend a dollar.',
    keywords: 'patent provisional utility design application fees',
    who: 'Older Scouts, with a parent',
    cost: 'Free to read',
    time: 'An evening'
  },
  {
    id: 'uspto-scam-warning',
    name: 'USPTO: invention-promotion scams',
    url: 'https://www.uspto.gov/PatentScamPrevention',
    tag: 'Safety',
    blurb: 'Companies that advertise "Got an idea? We\'ll patent and sell it!" often charge thousands and deliver little. The Patent Office explains the warning signs and publishes complaints. Read this before anyone asks you or your family for money.',
    keywords: 'scam fraud promoter warning money',
    who: 'Scouts and parents',
    cost: 'Free',
    time: 'Ten minutes'
  },
  {
    id: 'google-patents',
    name: 'Google Patents',
    url: 'https://patents.google.com/',
    tag: 'Online tool',
    blurb: 'Search millions of patents from around the world in plain words. The fastest way to find out whether your idea already exists, and to learn from how other inventors solved it.',
    keywords: 'prior art search patent database',
    who: 'Anyone',
    cost: 'Free',
    time: 'Twenty minutes a search'
  },
  {
    id: 'mom-test',
    name: 'The Mom Test (Rob Fitzpatrick)',
    url: 'https://www.momtestbook.com/',
    tag: 'Learn',
    blurb: 'A short book on asking questions that get honest answers, even from people who want to be nice to you. The interviewing method behind the Prove it stage.',
    keywords: 'interview questions customers users feedback',
    who: 'Older Scouts',
    cost: 'Low-cost book',
    time: 'A weekend read'
  },
  {
    id: 'lemelson-mit',
    name: 'Lemelson-MIT Program',
    url: 'https://lemelson.mit.edu/',
    tag: 'Learn',
    blurb: 'MIT\'s program for young inventors: invention curricula, stories of inventors, and InvenTeams, which funds high-school teams to build an invention over a school year.',
    keywords: 'mit inventeams high school grants curriculum',
    who: 'Middle and high school students',
    cost: 'Free',
    time: 'Self-paced; InvenTeams run a school year'
  },
  {
    id: 'nai',
    name: 'National Academy of Inventors',
    url: 'https://academyofinventors.org/',
    tag: 'Learn',
    blurb: 'The professional home of academic inventors, and the source of the NAI certificate training the Invention Scouts patent stage points toward. Good reading on how real inventors work.',
    keywords: 'nai academy certificate patent stage 3',
    who: 'Older Scouts and mentors',
    cost: 'Free to read',
    time: 'Self-paced'
  },

  // --- Online tools (check each tool's age rules) ---
  {
    id: 'tinkercad',
    name: 'Tinkercad',
    url: 'https://www.tinkercad.com/',
    tag: 'Online tool',
    blurb: 'Free, browser-based 3D design by Autodesk. Drag shapes together, export a file, and print it on the Innovation Space printers. Also does simple circuits and code blocks.',
    keywords: '3d design cad stl print circuits beginner',
    who: 'Beginners',
    cost: 'Free',
    time: 'An hour to learn',
    age: 'Under 13: a parent or teacher sets up the account'
  },
  {
    id: 'onshape',
    name: 'Onshape (education plan)',
    url: 'https://www.onshape.com/en/education/',
    tag: 'Online tool',
    blurb: 'Professional-grade CAD that runs in a browser, free for students and educators. The next step after Tinkercad when your parts need real dimensions and moving pieces.',
    keywords: 'cad 3d design parametric engineering',
    who: 'Older Scouts ready for real CAD',
    cost: 'Free education plan',
    time: 'A few weekends to learn',
    age: 'Check the age rules; a parent may need to sign up'
  },
  {
    id: 'arduino',
    name: 'Arduino documentation',
    url: 'https://docs.arduino.cc/',
    tag: 'Online tool',
    blurb: 'Small, cheap programmable boards that read sensors and drive motors and lights. The official tutorials take you from blinking one LED to building a working gadget.',
    keywords: 'electronics microcontroller sensor code circuit',
    who: 'Anyone with a starter kit',
    cost: 'Free to read; kits cost',
    time: 'Self-paced'
  },
  {
    id: 'scratch',
    name: 'Scratch',
    url: 'https://scratch.mit.edu/',
    tag: 'Online tool',
    blurb: 'MIT\'s block-based programming. Prototype an app idea, a game, or the logic of a gadget before you build the real thing.',
    keywords: 'code programming blocks app game prototype',
    who: 'Anyone',
    cost: 'Free',
    time: 'Self-paced'
  },
  {
    id: 'app-inventor',
    name: 'MIT App Inventor',
    url: 'https://appinventor.mit.edu/',
    tag: 'Online tool',
    blurb: 'Build a real phone app with blocks. If your invention is an app, this is the fastest way to a working version you can put in someone\'s hand.',
    keywords: 'app phone android mobile code',
    who: 'Anyone',
    cost: 'Free',
    time: 'An afternoon for a first app'
  },
  {
    id: 'instructables',
    name: 'Instructables',
    url: 'https://www.instructables.com/',
    tag: 'Online tool',
    blurb: 'Hundreds of thousands of step-by-step builds posted by makers. Great for learning a technique; check every project\'s safety with an adult, because anyone can post.',
    keywords: 'diy maker how to build projects',
    who: 'Anyone, with an adult for shop work',
    cost: 'Free',
    time: 'Self-paced',
    age: '13+ to post; anyone can read'
  },
  {
    id: 'canva',
    name: 'Canva',
    url: 'https://www.canva.com/',
    tag: 'Online tool',
    blurb: 'Make the flyer, the logo, the pitch slides, and the poster for your invention. Many schools give students an education account.',
    keywords: 'design flyer logo slides poster pitch graphic arts',
    who: 'Anyone',
    cost: 'Free plan',
    time: 'An hour',
    age: '13+, or through a school account'
  },

  // --- Safety (throughout) ---
  {
    id: 'guide-to-safe-scouting',
    name: 'Guide to Safe Scouting',
    url: 'https://www.scouting.org/health-and-safety/gss/',
    tag: 'Safety',
    throughout: true,
    blurb: 'Scouting\'s safety rules for activities, tools, and equipment. Your leaders follow it; it is worth knowing what it says about the tools you want to use.',
    keywords: 'safety rules tools equipment',
    who: 'Scouts and leaders',
    cost: 'Free',
    time: 'Reference'
  },
  {
    id: 'youth-protection',
    name: 'Scouting America Youth Protection',
    url: 'https://www.scouting.org/training/youth-protection/',
    tag: 'Safety',
    throughout: true,
    blurb: 'The rules every adult in this program follows, including every mentor. Know them so you know what normal looks like, and who to tell if something isn\'t.',
    keywords: 'youth protection ypt two-deep safety rules adults',
    who: 'Scouts and families',
    cost: 'Free',
    time: 'Reference'
  }
];
