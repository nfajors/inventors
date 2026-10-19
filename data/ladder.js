/* ============================================================
   THE YOUNG INVENTOR LADDER — four rungs laid over the four stages,
   borrowed from the way FFA degrees work: published requirements, each
   anchored on a merit badge the Scout earns anyway, so the ladder adds
   almost nothing new beyond keeping the notebook project alive and
   competing.
   STATUS: a pilot proposal from Trulaske CEI to the Great Rivers
   Council. The council and CEI set the final names, requirements, and
   recognition together; until then the page labels it "pilot". If the
   council already uses its own Invention Scouts levels, rename the rungs
   here and the page follows.
   Fields:
     id, name, stage, badge   the rung; `badge` is a data/badges.js id
     sum                      one line shown under the name
     reqs                     [{ id, text }] — ids are saved in the
                              visitor's browser, so do not reuse an id
                              for a different requirement
   ============================================================ */
const LADDER_STATUS = 'Pilot: proposed by Trulaske CEI to the Great Rivers Council. Final requirements and recognition are set by the council.';

const LADDER = [
  {
    id: 'tinkerer', name: 'Tinkerer', stage: 'Stages 0–1', badge: null,
    sum: 'You found a problem and started a notebook.',
    reqs: [
      { id: 't1', text: 'Earn any one making badge from the supporting list (Engineering, Drafting, Electronics, Robotics, Woodwork, and others)' },
      { id: 't2', text: 'Take part in two unit invention challenges' },
      { id: 't3', text: 'Open your Inventor\'s Notebook with a named problem' },
      { id: 't4', text: 'Visit the Sinquefield Innovation Space, the Invention Campus, or an Invention Lab trailer' }
    ]
  },
  {
    id: 'builder', name: 'Builder', stage: 'Stages 1–2', badge: 'inventing',
    sum: 'You built it, and then you built it again.',
    reqs: [
      { id: 'b1', text: 'Earn the Inventing merit badge (its notebook, user conversations, and prototype become your notebook project)' },
      { id: 'b2', text: 'Keep the project going after the badge, with at least one more version' },
      { id: 'b3', text: 'Enter a unit- or district-level invention competition' }
    ]
  },
  {
    id: 'inventor', name: 'Inventor', stage: 'Stages 2–3', badge: 'entrepreneurship',
    sum: 'You proved other people want it, and you helped someone else start.',
    reqs: [
      { id: 'i1', text: 'Earn the Entrepreneurship merit badge (its business plan becomes your business case)' },
      { id: 'i2', text: 'Enter a council-level invention competition' },
      { id: 'i3', text: 'Mentor a younger Scout through their first challenge or notebook entry' }
    ]
  },
  {
    id: 'founder', name: 'Founder', stage: 'Stages 3–4', badge: 'salesmanship',
    sum: 'You took it out into the world.',
    reqs: [
      { id: 'f1', text: 'Earn Salesmanship or American Business, plus Personal Management' },
      { id: 'f2', text: 'Make your invention in quantity, sell it, license it, or file for protection (with a parent and a mentor)' },
      { id: 'f3', text: 'Complete the Trulaske clinic series: users, pricing, pitching, and protecting ideas' },
      { id: 'f4', text: 'Enter an area- or national-level competition, or take a step on the NAI pathway' },
      { id: 'f5', text: 'Lead an invention-focused Eagle project, or an equivalent project for Venturers' }
    ]
  }
];
