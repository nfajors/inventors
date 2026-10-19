/* ============================================================
   UNIT CHALLENGES — short invention challenges a patrol leader or an
   Invention Ranger can run at a troop meeting. Each fits in about 45
   minutes, needs cheap materials, and ends with the same prompt: anyone
   who wants to keep going opens a notebook and tells someone.
   Fields:
     id, title, minutes, stage   the card (stage = guidebook stage 1–4)
     goal                        one sentence
     materials                   what to gather
     steps                       the run sheet, in order
     safety                      optional safety note
     source                      optional credit for a borrowed format
   ============================================================ */
const CHALLENGES = [
  {
    id: 'problem-hunt', title: 'Problem Hunt', minutes: 45, stage: 1,
    goal: 'Find twenty real problems from your last campout and pick the one worth solving.',
    materials: 'Sticky notes, markers, a wall or table',
    steps: [
      'Ten minutes: everyone silently writes one annoyance per sticky note from the last campout. Wet socks, smoky fires, lost tent stakes. Aim for twenty as a patrol.',
      'Five minutes: group the notes. Duplicates are good news: more people have that problem.',
      'Ten minutes: each Scout gets three dot votes. Vote for problems that bug lots of people, often.',
      'Ten minutes: for the top problem, write one sentence: "[Who] has trouble [doing what] because [why]."',
      'Ten minutes: share sentences across patrols. Which one would you most want fixed?'
    ]
  },
  {
    id: 'cardboard-sprint', title: 'Cardboard Sprint', minutes: 45, stage: 2,
    goal: 'Build a rough working model of a fix in thirty minutes, with nothing but cardboard and tape.',
    materials: 'Cardboard boxes, masking tape, scissors, string, rubber bands',
    steps: [
      'Five minutes: each patrol picks a problem (use one from Problem Hunt).',
      'Five minutes: everyone sketches a different solution. No talking yet.',
      'Five minutes: show sketches, pick one, or combine two.',
      'Twenty minutes: build it. Ugly is fine. It only has to show how it would work.',
      'Ten minutes: another patrol tries to use it. Watch, don\'t explain. Write down what confused them.'
    ],
    safety: 'Scissors only, no box cutters, unless an adult is running the cutting station.'
  },
  {
    id: 'five-interviews', title: 'Five Interviews', minutes: 45, stage: 3,
    goal: 'Learn to ask questions that get honest answers, not polite ones.',
    materials: 'Paper and pencil for each pair',
    steps: [
      'Ten minutes: read the three rules: ask about what people did last time, not what they would do; never describe your idea first; ask "why" twice.',
      'Five minutes: each pair writes five questions about a problem.',
      'Twenty minutes: pairs interview Scouts from another patrol (one asks, one writes). Swap halfway.',
      'Ten minutes: report back. What surprised you? Did anyone say they would buy it? That doesn\'t count. Did anyone say what they already tried? That does.'
    ],
    source: 'Question rules adapted from Rob Fitzpatrick, The Mom Test'
  },
  {
    id: 'mess-kit-makeover', title: 'Mess Kit Makeover', minutes: 45, stage: 2,
    goal: 'Improve an everyday piece of camp gear using the SCAMPER prompts.',
    materials: 'A few real items (mess kit, flashlight, water bottle, tent stake), paper',
    steps: [
      'Five minutes: each patrol takes one item.',
      'Twenty minutes: work through SCAMPER, one idea each: Substitute a material, Combine it with something, Adapt it from another use, Modify its size or shape, Put it to another use, Eliminate a part, Reverse or rearrange it.',
      'Ten minutes: pick the best idea and sketch it with labels.',
      'Ten minutes: pitch it to the troop in thirty seconds.'
    ],
    source: 'SCAMPER is Bob Eberle\'s checklist, built on Alex Osborn\'s'
  },
  {
    id: 'marshmallow-tower', title: 'Marshmallow Tower', minutes: 30, stage: 2,
    goal: 'Learn why you build and test early, by building the tallest tower that holds a marshmallow.',
    materials: 'Per team: 20 spaghetti sticks, one yard of tape, one yard of string, one marshmallow',
    steps: [
      'Two minutes: rules. Eighteen minutes. The marshmallow goes on top. The tower must stand on its own.',
      'Eighteen minutes: build.',
      'Ten minutes: measure, then talk: teams that tested the marshmallow early usually beat teams that planned for fifteen minutes and put it on at the end. Why?'
    ],
    source: 'The Marshmallow Challenge, as popularized by Tom Wujec'
  },
  {
    id: 'price-it', title: 'Price It', minutes: 45, stage: 3,
    goal: 'Work out what something costs to make, and what you would charge for it.',
    materials: 'A simple product (a paracord bracelet, a 3D-printed keychain), a parts list with prices, calculators',
    steps: [
      'Ten minutes: list every part and what it costs. Don\'t forget packaging.',
      'Ten minutes: time how long it takes to make one. What is your time worth per hour?',
      'Ten minutes: add it up in the Workbench "Price it" tab. That is your cost per unit.',
      'Fifteen minutes: what would people pay? Ask five Scouts what they paid for something similar. Set a price and work out your profit on ten.'
    ]
  },
  {
    id: 'patent-detectives', title: 'Patent Detectives', minutes: 45, stage: 4,
    goal: 'Find out whether an idea already exists, and learn from how someone else solved it.',
    materials: 'A few phones, tablets, or laptops with an adult\'s permission',
    steps: [
      'Five minutes: each pair picks a camp gadget idea from an earlier challenge.',
      'Twenty minutes: search Google Patents and two online stores with plain words ("tent stake puller", "collapsible camp cup").',
      'Ten minutes: find the closest match. What did that inventor do differently?',
      'Ten minutes: share one thing that is still new about your idea, or one way you would change it now.'
    ],
    safety: 'Devices on the unit\'s rules. Search; don\'t sign up for anything.'
  },
  {
    id: 'reverse-engineer', title: 'Take It Apart', minutes: 45, stage: 2,
    goal: 'Learn how products are designed by taking a broken one apart and drawing how it works.',
    materials: 'Broken flashlights, toys, or kitchen gadgets (no batteries inside), small screwdrivers, safety glasses',
    steps: [
      'Five minutes: safety glasses on. Batteries out.',
      'Twenty minutes: take it apart. Lay every part out in order on paper and label it.',
      'Ten minutes: draw how it works. Where does the power go? What moves?',
      'Ten minutes: why did the designer make each part the way they did? What would you change?'
    ],
    safety: 'Never open anything that plugs into a wall, a microwave, a TV, a lithium battery pack, or anything with a capacitor larger than your thumb.'
  },
  {
    id: 'ninety-second-pitch', title: '90-Second Pitch', minutes: 45, stage: 3,
    goal: 'Practice telling the story of an invention in ninety seconds, then get scored like a competition.',
    materials: 'A timer, printed copies of the practice rubric from this guidebook',
    steps: [
      'Ten minutes: each patrol picks its best idea from any challenge.',
      'Fifteen minutes: write the pitch using the five beats: the problem, who has it, the fix, proof it works, what you need next.',
      'Fifteen minutes: pitch to the troop. Ninety seconds, hard stop. Other patrols score with the rubric.',
      'Five minutes: every patrol gets one thing that worked and one thing to fix.'
    ]
  }
];
