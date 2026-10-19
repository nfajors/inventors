/* ============================================================
   THE YOUNG INVENTOR'S GUIDEBOOK — core page behaviour
   (navigation, accordions, printing, the resource index, the badge
   filter, the self-assessment, Season Math, the glossary, and the
   Prompt Studio). Loads after data/*.js and assets/js/render.js.
   ============================================================ */

function toggleHowto(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.nextElementSibling.classList.toggle('open', !expanded);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Print a single section: scope the print to just that section, then restore.
// Collapsed <details> (the challenges) are opened for the print and closed after.
function printSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const opened = [];
  target.querySelectorAll('details:not([open])').forEach(d => { d.open = true; opened.push(d); });
  document.body.classList.add('printing-section');
  target.classList.add('print-target');
  let done = false;
  const cleanup = () => {
    if (done) return; done = true;
    document.body.classList.remove('printing-section');
    target.classList.remove('print-target');
    opened.forEach(d => { d.open = false; });
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
  setTimeout(cleanup, 1000);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('navToggle');
  const isOpen = menu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('navToggle');
  menu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}
function mobileNav(id) { closeMobileMenu(); scrollToSection(id); }
function mobileFindStage() { closeMobileMenu(); openAssessment(); }

// Nav scroll behaviour + scrollspy active-section highlighting
const NAV_SECTION_IDS = SITE.nav.map(function (n) { return n.id; });
function updateActiveNav() {
  const trigger = window.innerHeight / 3;
  let activeId = null;
  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el || el.hidden) continue;
    if (el.getBoundingClientRect().top <= trigger) activeId = id;
  }
  document.querySelectorAll('.nav-links button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick') === "scrollToSection('" + activeId + "')");
  });
}
function updateStageTimeline() {
  const trigger = window.innerHeight / 2;
  let active = -1;
  STAGES.forEach(s => {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top <= trigger) active = s.n;
  });
  document.querySelectorAll('.phase-overview-item').forEach(item => {
    item.classList.toggle('active', +item.dataset.phase === active);
  });
}
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 80);
  updateActiveNav();
  updateStageTimeline();
}, { passive: true });
window.addEventListener('resize', updateActiveNav);
window.addEventListener('load', () => { updateActiveNav(); updateStageTimeline(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('assessmentModal');
    if (modal && modal.classList.contains('open')) closeAssessment();
  }
});

/* ---------- resource index ---------- */
function filterResources() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const stageFilter = document.getElementById('phaseFilter').value;
  const tagFilter = document.getElementById('tagFilter').value;
  let visible = 0;
  document.querySelectorAll('.resource-card.master').forEach(card => {
    const stage = card.dataset.phase;
    let show = true;
    // "all" on a card means it applies in every stage; "throughout" shows only those.
    if (stageFilter === 'throughout') { if (stage !== 'all') show = false; }
    else if (stageFilter !== 'all') { if (stage !== 'all' && stage.split(' ').indexOf(stageFilter) === -1) show = false; }
    if (tagFilter !== 'all' && card.dataset.tag !== tagFilter) show = false;
    if (search && !card.dataset.search.includes(search)) show = false;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('resultsCount').textContent = visible + ' ' + (visible === 1 ? 'resource' : 'resources');
  document.getElementById('noResults').style.display = visible === 0 ? '' : 'none';
  document.getElementById('resourceGrid').style.display = visible === 0 ? 'none' : '';
  document.getElementById('clearBtn').style.display = (search || stageFilter !== 'all' || tagFilter !== 'all') ? '' : 'none';
}
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('phaseFilter').value = 'all';
  document.getElementById('tagFilter').value = 'all';
  filterResources();
}
if (document.getElementById('resultsCount')) filterResources();
(function countResources() {
  const el = document.getElementById('resourceCount');
  if (el) el.textContent = RESOURCES.length;
})();

/* ---------- badge map filter ---------- */
function filterBadges(btn) {
  const f = btn.dataset.bt;
  document.querySelectorAll('#badgeChips .cei-chip').forEach(c => c.classList.toggle('on', c === btn));
  document.querySelectorAll('#badgeGrid .badge-card').forEach(card => {
    let show = f === 'all';
    if (/^s\d$/.test(f)) show = card.dataset.stages.split(' ').indexOf(f.slice(1)) !== -1;
    else if (f !== 'all') show = card.dataset.tier === f;
    card.style.display = show ? '' : 'none';
  });
}

/* ---------- "where are you?" self-assessment ---------- */
const ASSESS_OPTIONS = [
  [0, "I like building things, but I don't have an invention idea yet."],
  [1, "I've noticed a problem I'd like to solve, but I haven't built anything."],
  [2, "I'm sketching or building a prototype right now."],
  [3, 'It works. I want other people to try it, or to enter a competition.'],
  [4, 'People want it. I\'m thinking about patents, making more, or selling it.']
];
function assessmentHtml() {
  return '<div class="section-label" style="color: var(--black)"><div class="line"></div><span class="lbl">Where are you?</span></div>'
    + '<h3>Pick the sentence that sounds most like you.</h3>'
    + '<p class="modal-instruction">One tap takes you to your stage.</p><div class="modal-options">'
    + ASSESS_OPTIONS.map(o => '<button class="modal-option" onclick="answerAssessment(' + o[0] + ')"><span>' + o[1] + '</span><span class="arrow">→</span></button>').join('')
    + '</div>';
}
function openAssessment() {
  const modal = document.getElementById('assessmentModal');
  document.getElementById('modalContent').innerHTML = assessmentHtml();
  modal.classList.add('open');
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}
function closeAssessment(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('assessmentModal').classList.remove('open');
}
// Stage 0 does not set the saved path (it has no checklist); stages 1–4 do,
// through the wrapper features.js puts around this function.
function answerAssessment(stage) {
  const t = STAGE_TITLES[stage];
  document.getElementById('modalContent').innerHTML = '<div class="modal-result"><div class="num">0' + stage + '</div>'
    + '<h3>Start with Stage ' + stage + '</h3><p>' + t.title + ' · ' + t.sub + '</p>'
    + '<div class="going">' + (stage === 0 ? 'No idea required. Taking you there.' : 'Your checklist is saved in My Path.') + '</div></div>';
  setTimeout(() => {
    document.getElementById('assessmentModal').classList.remove('open');
    scrollToSection('stage-' + stage);
  }, 1400);
}

/* ---------- Season Math (Stage 0) ----------
   What fits between now and your next camp, Jamboree, or competition.
   Values persist in this browser only. */
const SM_KEY = 'yig_season_v1';
const SM_FIELDS = ['smWeeks', 'smHours', 'smBudget'];
function smNum(id) { const el = document.getElementById(id); const v = parseFloat(el && el.value); return isFinite(v) ? v : null; }
function calcSeason() {
  const v = document.getElementById('smVerdict');
  if (!v) return;
  const set = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = String(t); };
  const weeks = smNum('smWeeks'), hours = smNum('smHours'), budget = smNum('smBudget');
  try { localStorage.setItem(SM_KEY, JSON.stringify(SM_FIELDS.reduce((o, id) => { o[id] = (document.getElementById(id) || {}).value || ''; return o; }, {}))); } catch (e) {}
  const fits = document.getElementById('smFits');
  if (weeks === null || hours === null) {
    v.className = 'wb-verdict idle';
    v.innerHTML = '<b>Put in your weeks and hours</b><span>Most first inventions take less time than a merit badge and cost less than a pizza. Find out what fits before your next event.</span>';
    ['smTotal', 'smSessions', 'smPerWeek'].forEach(id => set(id, '—'));
    if (fits) fits.textContent = '';
    return;
  }
  const total = Math.round(weeks * hours);
  set('smTotal', total);
  set('smSessions', Math.max(0, Math.floor(total / 1.5)));
  set('smPerWeek', budget === null || weeks <= 0 ? '—' : '$' + Math.round(budget / weeks));
  let plan;
  if (total < 4) plan = 'Under four hours: run the Problem Hunt with your patrol, write your problem in one sentence, and make your first notebook entry. That is a real start.';
  else if (total < 12) plan = 'Four to twelve hours: problem, five user conversations, and a cardboard model. Enough to know whether the idea is worth building properly.';
  else if (total < 30) plan = 'Twelve to thirty hours: the Inventing merit badge and a first real prototype, with a version 2 if you keep your sessions short and regular.';
  else if (total < 60) plan = 'Thirty to sixty hours: two or three prototype versions, the one-page business case, and a competition entry with a practiced pitch.';
  else plan = 'Sixty hours or more: a polished prototype, a small batch to test with real users, and a strong competition entry. Schedule school first, then this.';
  if (fits) fits.textContent = plan;
  if (hours > 10) {
    v.className = 'wb-verdict bad';
    v.innerHTML = '<b>That is a lot of hours</b><span>' + hours + ' hours a week is more than most Scouts can keep up alongside school, sports, and family. Try planning at three to five hours a week. You can always do more.</span>';
  } else if (weeks <= 0) {
    v.className = 'wb-verdict idle';
    v.innerHTML = '<b>Pick a future event</b><span>Count the weeks until your next camp, Jamboree, competition, or troop meeting where you could show it.</span>';
  } else {
    v.className = 'wb-verdict good';
    v.innerHTML = '<b>You have about ' + total + ' hours</b><span>That is roughly ' + Math.max(1, Math.floor(total / 1.5)) + ' build sessions of an hour and a half. Put them on a calendar now, and pick one goal you can show at the event.</span>';
  }
}
(function initSeason() {
  const run = () => {
    if (!document.getElementById('smVerdict')) return;
    try {
      const saved = JSON.parse(localStorage.getItem(SM_KEY) || '{}');
      SM_FIELDS.forEach(id => { const el = document.getElementById(id); if (el && saved[id]) el.value = saved[id]; });
    } catch (e) {}
    calcSeason();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

/* ---------- glossary ---------- */
let glossActiveCat = 'all';
function filterGlossary() {
  const q = document.getElementById('glossSearch').value.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('#glossGrid .gloss-term').forEach(t => {
    const matchCat = glossActiveCat === 'all' || (glossActiveCat === 'start' ? t.dataset.start === '1' : t.dataset.cat === glossActiveCat);
    const show = (!q || t.dataset.search.includes(q)) && matchCat;
    t.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('glossGrid').style.display = visible === 0 ? 'none' : '';
  document.getElementById('glossEmpty').style.display = visible === 0 ? 'block' : 'none';
  document.getElementById('glossCount').textContent = visible + (visible === 1 ? ' term' : ' terms');
}
function filterGlossCat(btn) {
  glossActiveCat = btn.dataset.cat;
  document.querySelectorAll('.gloss-chip').forEach(c => {
    const on = c === btn;
    c.classList.toggle('active', on);
    c.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  filterGlossary();
}
function toggleGloss(btn) {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (panel) panel.hidden = open;
}
if (document.getElementById('glossGrid')) filterGlossary();

/* ---------- Prompt Studio (data/prompts.js) ---------- */
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
(function initStudio() {
  const sel = document.getElementById('studioPrompt');
  if (!sel) return;
  STUDIO_PROMPTS.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = p.title;
    sel.appendChild(opt);
  });
  const grid = document.getElementById('promptGrid');
  if (grid) grid.innerHTML = STUDIO_PROMPTS.map(p => '<div class="prompt-card"><h4>' + escapeHtml(p.title) + '</h4><pre>' + escapeHtml(p.text) + '</pre><button class="prompt-copy" onclick="copyPrompt(this)">Copy prompt</button></div>').join('');
  updateStudio();
})();
function buildStudioText() {
  const idx = parseInt(document.getElementById('studioPrompt').value, 10) || 0;
  const vals = {};
  ['invention', 'user', 'problem', 'stage'].forEach(k => { vals[k] = document.getElementById('studio-' + k).value.trim(); });
  return STUDIO_PROMPTS[idx].text.replace(/\[([^\]]+)\]/g, (match, label) => {
    const field = STUDIO_MAP[label];
    return field && vals[field] ? vals[field] : match;
  });
}
function updateStudio() {
  document.getElementById('studioOutput').innerHTML = escapeHtml(buildStudioText()).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
}
function copyText(btn, text) {
  const done = () => { const o = btn.textContent; btn.textContent = 'Copied ✓'; btn.classList.add('copied'); setTimeout(() => { btn.textContent = o; btn.classList.remove('copied'); }, 1800); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => window.prompt('Copy this:', text));
  else window.prompt('Copy this:', text);
}
function copyStudio() { copyText(document.getElementById('studioCopy'), buildStudioText()); }
function copyPrompt(btn) { copyText(btn, btn.parentElement.querySelector('pre').textContent); }
