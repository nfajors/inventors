/* ============================================================
   PEOPLE — who a Scout talks to. These are roles, not personal contact
   details: a youth-facing page lists organizations and the adults a
   Scout already knows, and every path to a new adult runs through a
   parent or a unit leader.
   Fields:
     id, icon, name, title   the card
     how                     how to reach them (HTML allowed for links)
     bestFor                 one line a Scout can match themselves to
   ============================================================ */
const CONTACTS = [
  { id: 'parent', icon: '♥', name: 'Your parent or guardian',
    title: 'Your first partner on every invention',
    how: 'At home. Show them your notebook.',
    bestFor: 'Approving accounts and tools, any money, any sale, anything about patents, and every email to a new adult' },
  { id: 'scoutmaster', icon: '⚑', name: 'Your Scoutmaster or Crew Advisor',
    title: 'Your unit leader',
    how: 'At your next meeting',
    bestFor: 'Signing up for camp, the Jamboree, and merit badge sessions; finding a counselor; running a challenge at a meeting' },
  { id: 'ranger', icon: '⚙', name: 'Your unit\'s Invention Ranger',
    title: 'An adult leader trained in Invention Scouts',
    how: 'Ask your Scoutmaster who it is. No Ranger yet? Ask them to train as one.',
    bestFor: 'Reviewing your notebook, equipment questions, and nominating you to the program' },
  { id: 'counselor', icon: '✓', name: 'Your merit badge counselor',
    title: 'Registered adult who signs off a badge',
    how: 'Your Scoutmaster connects you. Bring a buddy to every meeting.',
    bestFor: 'Inventing and Entrepreneurship requirements; approving your design before you build the prototype' },
  { id: 'council', icon: '⌂', name: 'Great Rivers Council',
    title: 'Invention Scouts, the Innovation Space, and the Invention Campus',
    how: '<a href="https://greatriversscouting.org/" target="_blank" rel="noopener">GreatRiversScouting.org</a> · <a href="tel:+15734492561">573-449-2561</a> · 6081 West Van Horn Tavern Road, Columbia, MO 65203',
    bestFor: 'Event dates, camp, Invention Lab trailer visits, and registering as a unit' },
  { id: 'cei', icon: '✦', name: 'Trulaske CEI mentor team',
    title: 'Center for Entrepreneurship & Innovation, University of Missouri',
    how: 'Use "Ask for a mentor" below, with a parent copied. We reply to the parent and the Scout together.',
    bestFor: 'Who would buy it, pricing, pitching, competitions, and, later, patents and licensing' }
];

/* "Who do I talk to first?" — the doors at the top of the People section.
   Each door lists contact ids (from CONTACTS above) in the order to try. */
const DOORS = [
  { id: 'idea', title: 'I have an idea', text: 'Write it in your notebook first. Then show the adult who already knows your project.', contacts: ['scoutmaster', 'ranger', 'parent'] },
  { id: 'tools', title: 'I need tools and a place to build', text: 'The Innovation Space in Columbia, the Invention Campus at the Lake, or a trailer visit to your unit.', contacts: ['ranger', 'council', 'scoutmaster'] },
  { id: 'mentor', title: 'I want a mentor', text: 'A Trulaske student, faculty member, or alumni founder, matched to what you need next. Always with a parent copied.', contacts: ['cei', 'parent'] },
  { id: 'compete', title: 'I want to compete or go to camp', text: 'The Startup program at summer camp, the Invention Jamboree, and the competition ladder.', contacts: ['scoutmaster', 'council'] },
  { id: 'money', title: 'I want to sell it, or someone wants money for it', text: 'Stop and talk to a parent first. Then a mentor. Never pay anyone to "patent and market" your idea.', contacts: ['parent', 'cei'] }
];
