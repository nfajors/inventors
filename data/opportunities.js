/* ============================================================
   THE CALENDAR — read by assets/js/features.js (renderDeadlines).
   -----------------------------------------------------------------
   HOW TO MAINTAIN THIS LIST
   Each entry needs: name, org, url, type, stage, and a cycle.
     cycle: 'tbd'      -> no date published yet; shows `season` (the usual
                          timing in words) and "Date to be announced"
     cycle: 'rolling'  -> open year-round, no countdown
     cycle: 'annual'   -> opens/closes are 'MM-DD', repeating every year
     cycle: 'dated'    -> closesOn is a single 'YYYY-MM-DD' (the event
                          date or the sign-up deadline; say which in `note`)
   confirmed: true  -> a date you have verified with the council or on the
                       organizer's site. Shows a countdown and an "Add to
                       calendar" button, and goes into calendar.ics.
   confirmed: false -> the usual timing only. The calendar button stays off,
                       because a wrong date in a family's calendar is worse
                       than none.
   When the council publishes a date: switch the entry to 'dated', set
   closesOn, confirmed: true, verifiedOn, then run node scripts/build-ics.mjs.
   National competitions live in data/beyond.js until someone confirms
   their dates for the year.
   ============================================================ */
const OPPORTUNITIES = [
  { name: 'Invention Jamboree 2027', org: 'Great Rivers Council · Sinquefield Invention Campus', type: 'Event', stage: 3,
    url: 'https://inventionscouts.org/',
    cycle: 'tbd', season: 'Usually early October in odd-numbered years. The 2025 Jamboree ran October 3–5.', confirmed: false,
    note: 'A weekend of invention stations, inventors and engineers to talk to, and the Inventing merit badge. Open to Scouts from Missouri\'s councils.' },
  { name: 'Summer camp and the Startup program', org: 'Lake of the Ozarks Scout Reservation', type: 'Camp', stage: 3,
    url: 'https://lakeoftheozarksscoutreservation.org/about/sinquefield-invention-campus/',
    cycle: 'tbd', season: 'Camp runs in June and July. Units register in the spring.', confirmed: false,
    note: 'A week at the Invention Campus. Ask your Scoutmaster to sign your unit up for the Invention Scouts Startup program.' },
  { name: 'Mizzou Merit Badge University', org: 'University of Missouri with the Great Rivers Council', type: 'Event', stage: 1,
    url: 'https://greatriversscouting.org/',
    cycle: 'tbd', season: 'Held once a year at the Scouting Adventure Center. Trulaske has asked to add Inventing, Entrepreneurship, and Salesmanship sessions.', confirmed: false,
    note: 'A day of merit badge classes taught with Mizzou. Your unit registers you.' },
  { name: 'Merit badge sessions in the Innovation Space', org: 'Scouting Adventure Center, Columbia', type: 'Program', stage: 2,
    url: 'https://greatriversscouting.org/',
    cycle: 'rolling', confirmed: true,
    note: 'Sessions run through the year in the four arenas. Check the council calendar and register through your unit.' },
  { name: 'Council invention competition', org: 'Great Rivers Council with Trulaske CEI', type: 'Competition', stage: 3,
    url: 'https://inventionscouts.org/',
    cycle: 'tbd', season: 'Proposed. Unit and district rounds would feed a council final.', confirmed: false,
    note: 'The competition ladder runs unit → district → council → area → national. The practice rubric in the Playbook shows how judges are likely to score.' },
  { name: 'Invention Scouts Awards Day', org: 'Scouting Adventure Center, Columbia', type: 'Event', stage: 4,
    url: 'https://inventionscouts.org/',
    cycle: 'tbd', season: 'Proposed for October in years without a Jamboree, starting 2028.', confirmed: false,
    note: 'Ladder rungs presented, the award slate, and council competition finals, in the Adventure Center\'s main hall.' }
];
