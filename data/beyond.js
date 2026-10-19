/* ============================================================
   BEYOND THE GUIDEBOOK — national competitions and programs open to
   Scouts aged 12–18. Rendered by renderBeyond() in assets/js/render.js.
   group: 'invention' | 'business' | 'build'
   ages: who can enter, in a few words (confirm on the organizer's site;
         rules change each year). Dates are deliberately left out until
         someone confirms them for the year and moves the entry onto the
         calendar (data/opportunities.js).
   ============================================================ */
const BEYOND = [
  // --- Invention and science competitions ---
  { group: 'invention', name: 'Invention Convention Worldwide', host: 'The Henry Ford', ages: 'K–12',
    focus: 'Invent a fix for a problem in your life or community; local, state, and national rounds',
    url: 'https://inhub.thehenryford.org/icw/home' },
  { group: 'invention', name: 'Lemelson-MIT InvenTeams', host: 'Lemelson-MIT Program', ages: 'High school teams',
    focus: 'Grants for a team to build an invention over a school year, then show it at MIT',
    url: 'https://lemelson.mit.edu/inventeams' },
  { group: 'invention', name: 'Conrad Challenge', host: 'Conrad Foundation', ages: 'About 13–18, teams with an adult coach',
    focus: 'Innovation for aerospace, energy, health, and the environment',
    url: 'https://www.conradchallenge.org/' },
  { group: 'invention', name: '3M Young Scientist Challenge', host: 'Discovery Education and 3M', ages: 'Grades 5–8',
    focus: 'A one- to two-minute video of an idea that solves an everyday problem',
    url: 'https://www.youngscientistlab.com/challenge' },
  { group: 'invention', name: 'Thermo Fisher Scientific Junior Innovators Challenge', host: 'Society for Science', ages: 'Middle school',
    focus: 'National middle-school science and engineering, through affiliated fairs',
    url: 'https://www.societyforscience.org/jic/' },
  { group: 'invention', name: 'Regeneron International Science and Engineering Fair', host: 'Society for Science', ages: 'High school',
    focus: 'The world\'s largest pre-college science and engineering fair, through affiliated fairs',
    url: 'https://www.societyforscience.org/isef/' },
  { group: 'invention', name: 'Congressional App Challenge', host: 'U.S. House of Representatives', ages: 'Middle and high school',
    focus: 'Build an app; winners are chosen in each congressional district',
    url: 'https://www.congressionalappchallenge.us/' },

  // --- Business and entrepreneurship ---
  { group: 'business', name: 'Diamond Challenge', host: 'University of Delaware', ages: 'High school teams',
    focus: 'Business and social-innovation pitch competition with a nine-month cycle',
    url: 'https://diamondchallenge.org/' },
  { group: 'business', name: 'NFTE World Series of Innovation', host: 'Network for Teaching Entrepreneurship', ages: 'Teens and young adults',
    focus: 'Short online challenges set by companies; pitch a solution',
    url: 'https://www.nfte.com/world-series-of-innovation/' },
  { group: 'business', name: 'JA Company Program', host: 'Junior Achievement', ages: 'High school',
    focus: 'Run a real student company for a semester, with volunteer advisers',
    url: 'https://jausa.ja.org/' },
  { group: 'business', name: 'DECA', host: 'DECA Inc.', ages: 'High school chapters',
    focus: 'Entrepreneurship and marketing events from district to international level',
    url: 'https://www.deca.org/' },

  // --- Build and robotics ---
  { group: 'build', name: 'FIRST Tech Challenge and FIRST Robotics Competition', host: 'FIRST', ages: 'Grades 7–12',
    focus: 'Design, build, and code robots on a team with mentors',
    url: 'https://www.firstinspires.org/' },
  { group: 'build', name: 'Davidson Fellows Scholarship', host: 'Davidson Institute', ages: 'Under 18',
    focus: 'Scholarships for a significant piece of work in science, technology, engineering, and more',
    url: 'https://www.davidsongifted.org/gifted-programs/fellows-scholarship/' }
];
