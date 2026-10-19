/* ============================================================
   KNOWLEDGE HUB — reading and watching for young inventors.
   Items with a url render as links; items without one render as a book
   with an optional note.
   ============================================================ */
const KNOWLEDGE = [
  {
    icon: '✎', title: 'Read', sub: 'Books worth your time',
    note: 'Ask your school or public library first. Most of these are easy to find.',
    items: [
      { text: 'The Boy Who Harnessed the Wind (Young Readers Edition) — William Kamkwamba', note: 'Built a windmill at 14' },
      { text: 'Girls Think of Everything — Catherine Thimmesh', note: 'Inventions by women and girls' },
      { text: 'Make: Electronics — Charles Platt', note: 'Learn by building' },
      { text: 'The Design of Everyday Things — Don Norman', note: 'Why some things are easy to use' },
      { text: 'Creative Confidence — Tom and David Kelley', note: 'From the founders of IDEO' },
      { text: 'The Mom Test — Rob Fitzpatrick', note: 'Asking questions that get honest answers' }
    ]
  },
  {
    icon: '◎', title: 'Learn', sub: 'Free and official',
    items: [
      { text: 'USPTO: Kids & Teens', url: 'https://www.uspto.gov/kids' },
      { text: 'USPTO: Patent Basics', url: 'https://www.uspto.gov/patents/basics' },
      { text: 'Lemelson-MIT: invention education', url: 'https://lemelson.mit.edu/' },
      { text: 'National Inventors Hall of Fame', url: 'https://www.invent.org/' },
      { text: 'Stanford d.school: design thinking', url: 'https://dschool.stanford.edu/' },
      { text: 'Khan Academy: computing and engineering', url: 'https://www.khanacademy.org/' }
    ]
  },
  {
    icon: '★', title: 'Where this program came from', sub: 'Invention Scouts',
    note: 'Invention Scouts was started by <strong>Dr. Jeanne Cairns Sinquefield</strong> within the Great Rivers Council after two high-school inventors told her what held them back: equipment, and mentors.',
    items: [
      { text: 'Sinquefield, "The Importance of Mentorship in the Innovation Space" (Technology and Innovation, 2026)', url: 'https://doi.org/10.1080/19498241.2025.2609530' },
      { text: 'The Sinquefield Invention Campus', url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/' },
      { text: 'Great Rivers Council, Scouting America', url: 'https://greatriversscouting.org/' }
    ]
  }
];
