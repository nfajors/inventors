/* ============================================================
   SITE — one place for the guidebook's identity, addresses, and dates.
   Everything on the page that names the program, the URL, the email, or
   a "last reviewed" date reads from here (see stampSite in
   assets/js/render.js). To adopt this guidebook for another council,
   start with this file — see ADOPTING.md.
   ============================================================ */
const SITE = {
  name: "The Young Inventor's Guidebook",
  tagline: 'From "that\'s annoying" to "I made that"',
  program: 'Invention Scouts',
  council: 'Great Rivers Council, Scouting America',
  councilShort: 'Great Rivers Council',
  partner: 'Center for Entrepreneurship & Innovation, Trulaske College of Business, University of Missouri',
  partnerShort: 'Trulaske CEI',
  brand: 'Invention Scouts × Trulaske CEI',

  /* Permanent address of this page. The canonical tag, share links, the
     calendar feed, and the sitemap all read from here. */
  url: 'https://nfajors.github.io/inventors/',
  repoUrl: 'https://github.com/nfajors/inventors',

  /* Where "I built something", mentor requests, and nominations go.
     Every one of those emails is written to be sent by, or copied to, a
     parent or guardian. Confirm with the Council who receives them
     (plan Section 15) before the guidebook is announced. */
  email: 'cei@missouri.edu',
  phone: '573-882-6688',
  phoneHref: 'tel:+15738826688',
  councilUrl: 'https://greatriversscouting.org/',
  councilPhone: '573-449-2561',
  councilPhoneHref: 'tel:+15734492561',
  programUrl: 'https://inventionscouts.org/',
  partnerUrl: 'https://business.missouri.edu/centers-institutes/center-entrepreneurship-and-innovation',
  feedbackUrl: null,       // a feedback form; null falls back to an email to `email`

  /* Optional forms. Leave null and the page falls back to a prefilled
     email (with a parent copied) to `email` above. */
  builtUrl: null,          // "I built something" — the self-nomination form for the registry
  mentorUrl: null,         // a mentor-request form
  nominationUrl: null,     // nominate a Scout, a win, or a resource

  /* One sentence used by the share buttons and the printable flyer. */
  shareText: "You don't need a lab, a business, or a big idea to start inventing. Here's how Scouts go from noticing a problem to building, testing, and launching a fix.",

  /* "Last reviewed" stamps, one per section that carries one.
     ISO dates. Update the date when you re-verify the section. */
  reviewed: {
    badges: '2026-10-19',
    calendar: '2026-10-19',
    resources: '2026-10-19',
    beyond: '2026-10-19',
    ai: '2026-10-19'
  },
  /* When the next scheduled review is due (see EDITORIAL.md). */
  nextReview: '2027-01-15',

  /* Primary navigation. id = section id on the page. Sections that are
     hidden drop out of the menu automatically. `more: true` keeps an item
     out of the top bar (it still appears in the phone menu and the footer). */
  nav: [
    { id: 'stages', label: 'Stages' },
    { id: 'path', label: 'My Path' },
    { id: 'notebook', label: 'Notebook' },
    { id: 'ladder', label: 'Ladder' },
    { id: 'badges', label: 'Badges' },
    { id: 'howto', label: 'Playbook' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'tools', label: 'Workbench' },
    { id: 'ai', label: 'AI', more: true },
    { id: 'resources', label: 'Resources', more: true },
    { id: 'glossary', label: 'Glossary', more: true },
    { id: 'beyond', label: 'Beyond', more: true },
    { id: 'inventors', label: 'Inventors', more: true },
    { id: 'people', label: 'People' },
    { id: 'safety', label: 'Safety' }
  ]
};
