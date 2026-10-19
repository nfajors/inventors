/* ============================================================
   PROMPT STUDIO — prompts for young inventors, read by the AI section.
   [invention], [user], [problem], and [stage] are filled from the
   Studio's fields; any other [bracket] stays for the Scout to edit.
   Every prompt asks the AI to coach, not to do the work: a merit badge
   counselor needs to see the Scout's own thinking.
   ============================================================ */
const STUDIO_PROMPTS = [
  { title: 'Find problems worth solving',
    text: 'I am a Scout looking for a problem to invent a solution for. I spend time on [where you spend time: camping, a sport, school, home]. Ask me ten questions, one at a time, that help me notice problems I run into there. Do not suggest inventions. After my answers, help me pick the three problems that affect the most people most often.' },
  { title: 'Sharpen my problem statement',
    text: 'Here is the problem I want to solve: [problem]. The people who have it are [user]. Help me rewrite it as one sentence in the form "[who] has trouble [doing what] because [why]." Then ask me two questions that would show whether this problem is real and common.' },
  { title: 'Plan my user interviews',
    text: 'I am working on [invention] for [user]. Write eight interview questions about their past experience with [problem], following The Mom Test: ask about what they actually did last time, never describe my idea, and never ask if they would buy it. Explain in one line why each question is useful.' },
  { title: 'Has this been invented?',
    text: 'I have an idea for [invention] that solves [problem]. Give me ten different plain-English search phrases I could type into Google Patents and online stores to find anything similar. Do not tell me whether my idea is new; I will search myself and bring back what I find.' },
  { title: 'Explain how something works',
    text: 'I want to understand how [a part or mechanism, e.g. a ratchet, a solar cell, a hinge] works so I can use it in [invention]. Explain it like I am 13, with an everyday comparison. Then give me one simple experiment I could do at home or in the Innovation Space to see it work.' },
  { title: 'Review my design for problems',
    text: 'My design for [invention] works like this: [describe your design]. Act as a friendly engineering mentor. Ask me five questions that would reveal weak spots: what breaks first, what is hard to make, what could hurt someone. Do not redesign it for me.' },
  { title: 'Price it',
    text: 'My parts for one [invention] are: [list parts and prices]. It takes me [minutes] to make one. Show me how to calculate the cost per unit, step by step, and what to check before I set a price. Do not pick the price for me; ask me what similar products sell for.' },
  { title: 'Practice my pitch',
    text: 'I am pitching [invention] to judges at a Scout invention competition. It solves [problem] for [user], and I am at the [stage] stage. Here is my 90-second pitch: [paste]. Score it out of 10 on clarity, proof, and confidence, give me the one change that would help most, then play a judge and ask me three tough questions one at a time.' },
  { title: 'Explain patents in plain words',
    text: 'I am a teenage inventor. Explain the difference between a utility patent, a design patent, a provisional application, a trademark, and a copyright, using [invention] as the example each time. Keep it short. End with the three questions I should ask a parent and a mentor before spending any money.' },
  { title: 'Plan my next two weeks',
    text: 'I am a Scout working on [invention] at the [stage] stage. I have about [hours] hours a week, and my next event is [event and date]. Help me make a two-week plan with small tasks I can finish in under an hour each. Be realistic; I also have school.' }
];
const STUDIO_MAP = { 'invention': 'invention', 'user': 'user', 'problem': 'problem', 'stage': 'stage' };
