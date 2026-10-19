/* ============================================================
   MILESTONES — the feed under the stages, newest first by date, and the
   "By the numbers" tiles.
   WINS fields: date (YYYY, YYYY-MM, or YYYY-MM-DD), who, what, detail,
   to (a section id or URL), source.
   A Scout is named here only with their family's written consent.
   ============================================================ */
const WINS = [
  { date: '2025-10-05', who: 'Nearly 200 Scouts', what: 'gathered at the 2025 Invention Jamboree',
    detail: 'From Missouri\'s five councils, at the Sinquefield Invention Campus, October 3–5. More than 100 earned Inventing. Governor Mike Kehoe made his fourth visit since the Jamboree began in 2019. Missouri S&T and the University of Missouri provided mentors.',
    to: 'calendar', source: 'Great Rivers Council 2025 Annual Report' },
  { date: '2025', who: 'John Hayes, Troop 21', what: 'earned all 140 merit badges',
    detail: 'The 621st Scout in the nation\'s history to do it, more than 80 of them at the Invention Campus. His Eagle project signs now welcome travelers to Lake Ozark.',
    to: 'badges', source: 'Great Rivers Council 2025 Annual Report' },
  { date: '2025', who: 'Summer camp', what: 'had its highest attendance in 60 years',
    detail: '917 Scouts BSA and 443 Cub Scouts at camp; 3,994 merit badges earned, by Scouts from 11 states.',
    to: 'stage-3', source: 'Great Rivers Council 2025 Annual Report' },
  { date: '2023', who: 'The Scouting Adventure Center', what: 'opened in Columbia with the Sinquefield Innovation Space',
    detail: 'A donated 13,000-square-foot building with four arenas, a climbing wall, and room for year-round merit badge sessions.',
    to: 'badges', source: 'Sinquefield, Technology and Innovation (2026)' },
  { date: '2022', who: 'The Invention Campus', what: 'added a Skills & Trades Lab',
    detail: 'A 40-by-80-foot building at the Lake, after a blacksmithing and welding lab in 2019.',
    to: 'stage-2', source: 'Sinquefield, Technology and Innovation (2026)' },
  { date: '2019', who: 'The first Invention Jamboree', what: 'was held at the Lake',
    detail: 'Followed by Jamborees in 2021, 2023, and 2025, drawing support from four universities and inventors from across the country.',
    to: 'calendar', source: 'Sinquefield, Technology and Innovation (2026)' },
  { date: '2017', who: 'The Invention Lab and Woodworking Building', what: 'opened at summer camp',
    detail: 'After two years working out of a tipi and a small welcome center, and two Invention Lab trailers built in 2016 and 2017.',
    to: 'stage-2', source: 'Sinquefield, Technology and Innovation (2026)' },
  { date: '2012', who: 'Chess2Go', what: 'was dreamed up at a Missouri campsite',
    detail: 'By a Life Scout, his Scoutmaster, and Dr. Jeanne Sinquefield. It became the founding story of Invention Scouts.',
    to: 'stage-4', source: 'World Chess Hall of Fame' }
];

/* By the numbers. Every value has a source. `reported` tiles appear
   when value is not null; fill them in each June (EDITORIAL.md). */
const OUTCOMES = {
  facts: [
    { value: '~200', label: 'Scouts at the 2025 Invention Jamboree', note: 'From Missouri\'s five councils', source: 'Great Rivers Council 2025 Annual Report' },
    { value: '100+', label: 'Inventing badges earned at the 2025 Jamboree', note: 'In one weekend', source: 'Great Rivers Council 2025 Annual Report' },
    { value: '3,994', label: 'Merit badges earned at camp in 2025', note: 'By Scouts from 11 states', source: 'Great Rivers Council 2025 Annual Report' },
    { value: '1,804', label: 'Scouts BSA at merit badge college workshops', note: '2025', source: 'Great Rivers Council 2025 Annual Report' },
    { value: '139', label: 'Scouting units in the council', note: 'Across 33 counties', source: 'Great Rivers Council 2025 Annual Report' },
    { value: '100%', label: 'Volunteers trained in Youth Protection', note: '2025', source: 'Great Rivers Council 2025 Annual Report' }
  ],
  year: '2026–27',
  reported: [
    { label: 'Scouts with an open notebook project', value: null },
    { label: 'Scouts matched to a mentor', value: null },
    { label: 'Ladder rungs earned', value: null },
    { label: 'Scouts entering a competition', value: null },
    { label: 'Trained Trulaske mentors', value: null },
    { label: 'Invention Rangers trained', value: null }
  ]
};
