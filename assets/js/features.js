/* ============================================================
   RETURN-VISIT FEATURES — What's New, My Inventor Path, the
   Inventor's Notebook, the Ladder, the Calendar, and the Workbench.
   All state is kept in the visitor's own browser (localStorage) and is
   never transmitted. The editable data these read from lives in
   data/changelog.js, data/stages.js (PATH_STEPS), data/badges.js,
   data/ladder.js, and data/opportunities.js.
   ============================================================ */

/* ---------- storage (safe in private mode / blocked storage) ---------- */
function yigGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function yigSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { return false; }
}
function yigDel(key) { try { localStorage.removeItem(key); } catch (e) {} }
function todayIso() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function shortDate(iso) { return iso ? new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''; }
function savedAgo(iso) {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  return 'Last saved ' + (days <= 0 ? 'today' : days === 1 ? 'yesterday' : days + ' days ago') + '.';
}
function download(name, text, type) {
  const blob = new Blob([text], { type: type || 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- 1. What's New (CHANGELOG, RESOURCE_ADDED) ---------- */
function renderWhatsNew() {
  const ul = document.getElementById('whatsnewList');
  if (!ul) return;
  ul.innerHTML = CHANGELOG.slice(0, 3).map(function (c) {
    const label = new Date(c.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return '<li><time datetime="' + c.date + '">' + label + '</time><span>' + c.text + '</span></li>';
  }).join('');
}
function badgeNewResources() {
  const cutoff = Date.now() - 45 * 864e5;
  document.querySelectorAll('#resources .resource-card.master h3').forEach(function (h) {
    const when = RESOURCE_ADDED[h.textContent.trim()];
    if (!when || new Date(when + 'T12:00:00').getTime() < cutoff || h.querySelector('.new-badge')) return;
    const b = document.createElement('span');
    b.className = 'new-badge'; b.textContent = 'New';
    h.appendChild(b);
  });
}
function stampLastUpdated() {
  const el = document.getElementById('lastUpdatedText');
  if (!el || !CHANGELOG.length) return;
  el.textContent = 'Updated ' + shortDate(CHANGELOG[0].date);
}

/* ---------- 2. My Inventor Path (PATH_STEPS in data/stages.js) ---------- */
const PATH_KEY = 'yig_path_v1';
function pathState() { return yigGet(PATH_KEY, { stage: null, done: [], updated: null }); }
function pathSave(s) { s.updated = new Date().toISOString(); yigSet(PATH_KEY, s); }
function pathSetStage(stage) {
  const s = pathState();
  if (s.stage !== stage) { s.stage = stage; s.done = []; }
  pathSave(s);
  renderPath();
}
function pathPick(stage) { pathSetStage(stage); }
function pathToggle(i) {
  const s = pathState();
  if (!s.stage) return;
  const at = s.done.indexOf(i);
  if (at === -1) s.done.push(i); else s.done.splice(at, 1);
  pathSave(s);
  renderPath();
}
function pathReset() { yigDel(PATH_KEY); renderPath(); }
function pathGoToStage() {
  const s = pathState();
  if (!s.stage) { openAssessment(); return; }
  scrollToSection('stage-' + s.stage);
}
function renderPath() {
  const list = document.getElementById('pathList');
  if (!list) return;
  const s = pathState();
  const $ = id => document.getElementById(id);
  document.querySelectorAll('#pathPicker .cei-chip').forEach(c => c.classList.toggle('on', +c.dataset.stage === s.stage));
  if (!s.stage) {
    $('pathNum').textContent = '—';
    $('pathName').textContent = 'No stage picked yet';
    $('pathSub').textContent = 'Pick a stage above, or take the ten-second "where are you?" quiz.';
    $('pathBar').style.width = '0%';
    $('pathDone').textContent = '0'; $('pathLeft').textContent = '—'; $('pathPct').textContent = '0%';
    $('pathJump').hidden = true; $('pathResetBtn').hidden = true; $('pathSaved').textContent = '';
    list.innerHTML = '<li><div class="cei-empty" style="border:none;padding:28px 0;text-align:left"><strong>Your checklist appears here.</strong>Pick a stage and you get the six moves that matter most right now.</div></li>';
    return;
  }
  const steps = PATH_STEPS[s.stage] || [];
  const t = STAGE_TITLES[s.stage] || { title: '', sub: '' };
  const done = s.done.filter(i => i < steps.length);
  const pct = steps.length ? Math.round(done.length / steps.length * 100) : 0;
  $('pathNum').textContent = '0' + s.stage;
  $('pathName').textContent = t.title;
  $('pathSub').textContent = t.sub;
  $('pathBar').style.width = pct + '%';
  $('pathDone').textContent = String(done.length);
  $('pathLeft').textContent = String(steps.length - done.length);
  $('pathPct').textContent = pct + '%';
  $('pathJump').hidden = false; $('pathResetBtn').hidden = false;
  $('pathJump').textContent = 'Go to Stage ' + s.stage;
  $('pathSaved').textContent = pct === 100
    ? (s.stage < 4 ? 'Stage ' + s.stage + ' done. Pick Stage ' + (s.stage + 1) + ' when you are ready.' : 'All four stages done. Tell us what you built.')
    : savedAgo(s.updated);
  list.innerHTML = steps.map(function (step, i) {
    const on = done.indexOf(i) !== -1;
    return '<li><button class="path-check" aria-pressed="' + on + '" onclick="pathToggle(' + i + ')">'
      + '<span class="path-box" aria-hidden="true">✓</span><span class="path-text">' + esc(step) + '</span></button></li>';
  }).join('');
}

/* ---------- 3. The Inventor's Notebook ----------
   The record the program plan calls a Supervised Invention Experience:
   one project, kept across seasons, that mentors review and judges score. */
const NB_KEY = 'yig_notebook_v1';
const NB_KINDS = {
  idea: 'Idea', research: 'Research', talk: 'Talked to a user', sketch: 'Sketch',
  build: 'Built', test: 'Tested', change: 'Changed the design', pitch: 'Pitched', other: 'Other'
};
const NB_FIELDS = ['nbName', 'nbProblem', 'nbWho', 'nbStarted', 'nbMentor'];
function nbState() { return yigGet(NB_KEY, { project: {}, badges: [], entries: [], updated: null }); }
function nbSave(s) { s.updated = new Date().toISOString(); yigSet(NB_KEY, s); }
function nbSaveProject() {
  const s = nbState();
  NB_FIELDS.forEach(id => { const el = document.getElementById(id); if (el) s.project[id] = el.value; });
  nbSave(s);
  nbStats(s);
}
function nbToggleBadge(id) {
  const s = nbState();
  const at = s.badges.indexOf(id);
  if (at === -1) s.badges.push(id); else s.badges.splice(at, 1);
  nbSave(s);
  renderNotebook();
}
function nbAdd() {
  const did = document.getElementById('neDid').value.trim();
  const learned = document.getElementById('neLearned').value.trim();
  const msg = document.getElementById('neMsg');
  if (!did && !learned) { msg.textContent = 'Write what you did, or what you learned, first.'; return; }
  const s = nbState();
  s.entries.push({
    id: Date.now().toString(36),
    date: document.getElementById('neDate').value || todayIso(),
    hours: parseFloat(document.getElementById('neHours').value) || 0,
    kind: document.getElementById('neKind').value,
    version: parseInt(document.getElementById('neVersion').value, 10) || null,
    did: did, learned: learned
  });
  if (!s.project.nbStarted) s.project.nbStarted = s.entries[0].date;
  nbSave(s);
  ['neDid', 'neLearned', 'neHours'].forEach(id => { document.getElementById(id).value = ''; });
  msg.textContent = 'Saved. Entry ' + s.entries.length + ' is in your notebook.';
  setTimeout(() => { msg.textContent = ''; }, 2500);
  renderNotebook();
}
function nbRemove(id) {
  if (!window.confirm('Delete this entry? This cannot be undone.')) return;
  const s = nbState();
  s.entries = s.entries.filter(e => e.id !== id);
  nbSave(s);
  renderNotebook();
}
function nbClear() {
  if (!window.confirm('Clear the whole notebook on this device? Download a backup first if you want to keep it.')) return;
  yigDel(NB_KEY);
  NB_FIELDS.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderNotebook();
}
function nbStats(s) {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const hours = s.entries.reduce((t, e) => t + (e.hours || 0), 0);
  const versions = s.entries.reduce((m, e) => Math.max(m, e.version || 0), 0);
  set('nbEntries', s.entries.length);
  set('nbHours', Math.round(hours * 10) / 10);
  set('nbVersions', versions || '—');
  set('nbTalks', s.entries.filter(e => e.kind === 'talk').length);
  set('nbSaved', s.updated ? savedAgo(s.updated) : 'Nothing saved yet.');
}
function nbText(s) {
  const p = s.project, lines = [];
  lines.push('INVENTOR\'S NOTEBOOK — ' + (p.nbName || 'My invention'));
  lines.push('');
  if (p.nbProblem) lines.push('Problem: ' + p.nbProblem);
  if (p.nbWho) lines.push('Who has it: ' + p.nbWho);
  if (p.nbStarted) lines.push('Started: ' + shortDate(p.nbStarted));
  if (p.nbMentor) lines.push('Mentor: ' + p.nbMentor);
  const badges = s.badges.map(id => (badgeById(id) || {}).name).filter(Boolean);
  if (badges.length) lines.push('Badges this project earned: ' + badges.join(', '));
  const hours = s.entries.reduce((t, e) => t + (e.hours || 0), 0);
  lines.push(s.entries.length + ' entries · ' + Math.round(hours * 10) / 10 + ' hours · ' + s.entries.filter(e => e.kind === 'talk').length + ' user conversations');
  lines.push('');
  s.entries.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach(e => {
    lines.push(shortDate(e.date) + ' · ' + (NB_KINDS[e.kind] || e.kind) + (e.version ? ' · v' + e.version : '') + (e.hours ? ' · ' + e.hours + ' h' : ''));
    if (e.did) lines.push('  Did: ' + e.did);
    if (e.learned) lines.push('  Learned / changed and why: ' + e.learned);
  });
  return lines.join('\n');
}
function nbDownload() {
  const s = nbState();
  download(((s.project.nbName || 'inventors-notebook').replace(/[^a-z0-9]+/gi, '-').toLowerCase()) + '.txt', nbText(s));
}
function nbBackup() { download('inventors-notebook-backup.json', JSON.stringify(nbState(), null, 2), 'application/json'); }
function nbRestore(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const data = JSON.parse(reader.result);
      if (!data || !Array.isArray(data.entries) || typeof data.project !== 'object') throw new Error('shape');
      if (!window.confirm('Replace the notebook on this device with the backup (' + data.entries.length + ' entries)?')) return;
      yigSet(NB_KEY, { project: data.project || {}, badges: Array.isArray(data.badges) ? data.badges : [], entries: data.entries, updated: new Date().toISOString() });
      renderNotebook();
    } catch (e) { window.alert('That file is not a notebook backup from this guidebook.'); }
    input.value = '';
  };
  reader.readAsText(file);
}
function nbSummaryLines() {
  const s = nbState(), p = s.project;
  const recent = s.entries.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return ['', 'From my Inventor\'s Notebook:',
    'Invention: ' + (p.nbName || '[ ]'),
    'Problem: ' + (p.nbProblem || '[ ]'),
    'Entries so far: ' + s.entries.length + ' · user conversations: ' + s.entries.filter(e => e.kind === 'talk').length,
    'Most recent: ' + (recent.length ? recent.map(e => shortDate(e.date) + ' ' + (NB_KINDS[e.kind] || '') + ': ' + (e.did || e.learned).slice(0, 120)).join(' | ') : '[ ]')];
}
function nbEmailMentor(a) { a.href = mentorHref(nbSummaryLines()); }
function nbBuilt(a) { a.href = builtHref(nbSummaryLines()); }
function renderNotebook() {
  const list = document.getElementById('nbList');
  if (!list) return;
  const s = nbState();
  NB_FIELDS.forEach(id => { const el = document.getElementById(id); if (el && document.activeElement !== el) el.value = s.project[id] || ''; });
  const chips = document.getElementById('nbBadges');
  if (chips) chips.innerHTML = BADGES.map(b => '<button type="button" class="nb-badge" aria-pressed="' + (s.badges.indexOf(b.id) !== -1) + '" onclick="nbToggleBadge(\'' + b.id + '\')">' + esc(b.name) + '</button>').join('');
  nbStats(s);
  const entries = s.entries.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  list.innerHTML = entries.length ? entries.map(e => '<li class="nb-entry">'
    + '<div class="nb-entry-top"><time datetime="' + esc(e.date) + '">' + esc(shortDate(e.date)) + '</time>'
    + '<span class="tag">' + esc(NB_KINDS[e.kind] || e.kind) + '</span>'
    + (e.version ? '<span class="nb-v">v' + e.version + '</span>' : '') + (e.hours ? '<span class="nb-hr">' + e.hours + ' h</span>' : '')
    + '<button class="nb-del" type="button" aria-label="Delete entry" onclick="nbRemove(\'' + esc(e.id) + '\')">×</button></div>'
    + (e.did ? '<p><b>Did</b> ' + esc(e.did) + '</p>' : '')
    + (e.learned ? '<p><b>Learned · changed · why</b> ' + esc(e.learned) + '</p>' : '')
    + '</li>').join('')
    : '<li><div class="cei-empty"><strong>No entries yet.</strong>Your first entry can be one line: the problem you noticed and who has it.</div></li>';
}

/* ---------- 4. The Young Inventor Ladder (data/ladder.js) ---------- */
const LADDER_KEY = 'yig_ladder_v1';
function ladderState() { return yigGet(LADDER_KEY, { done: [], updated: null }); }
function ladderToggle(id) {
  const s = ladderState();
  const at = s.done.indexOf(id);
  if (at === -1) s.done.push(id); else s.done.splice(at, 1);
  s.updated = new Date().toISOString();
  yigSet(LADDER_KEY, s);
  renderLadder();
}
function renderLadder() {
  const grid = document.getElementById('ladderGrid');
  if (!grid) return;
  const s = ladderState();
  let current = null;
  const html = LADDER.map(function (r, i) {
    const n = r.reqs.filter(q => s.done.indexOf(q.id) !== -1).length;
    const complete = n === r.reqs.length;
    if (!complete && current === null) current = i;
    const pct = Math.round(n / r.reqs.length * 100);
    return '<div class="rung' + (complete ? ' complete' : '') + '" data-rung="' + i + '">'
      + '<div class="rung-head"><div class="rung-num">' + (i + 1) + '</div><div><h3>' + esc(r.name) + '</h3><div class="rung-stage">' + esc(r.stage) + (r.badge ? ' · anchored on ' + badgeChip(r.badge) : '') + '</div></div></div>'
      + '<p class="rung-sum">' + esc(r.sum) + '</p>'
      + '<div class="cei-bar"><i style="width:' + pct + '%"></i></div><div class="rung-count">' + n + ' of ' + r.reqs.length + (complete ? ' · complete' : '') + '</div>'
      + '<ul class="path-checklist">' + r.reqs.map(q => {
        const on = s.done.indexOf(q.id) !== -1;
        return '<li><button class="path-check" aria-pressed="' + on + '" onclick="ladderToggle(\'' + q.id + '\')"><span class="path-box" aria-hidden="true">✓</span><span class="path-text">' + esc(q.text) + '</span></button></li>';
      }).join('') + '</ul>'
      + '<div class="rung-sign" aria-hidden="true"><span>Leader signature</span><span>Date</span></div>'
      + '</div>';
  }).join('');
  grid.innerHTML = html;
  if (current !== null) { const el = grid.querySelector('[data-rung="' + current + '"]'); if (el) el.classList.add('current'); }
  const st = document.getElementById('ladderStatus'); if (st) st.textContent = LADDER_STATUS;
  const now = document.getElementById('ladderNow');
  if (now) now.textContent = current === null ? 'All four rungs checked off. Ask your leader to sign the sheet.' : 'Working on: ' + LADDER[current].name + '.';
}

/* ---------- 5. The Calendar (data/opportunities.js) ---------- */
const DAY = 864e5;
function atNoon(y, m, d) { return new Date(y, m - 1, d, 12, 0, 0).getTime(); }
function parseMD(md, year) { const p = md.split('-'); return atNoon(year, +p[0], +p[1]); }
/* Resolve an entry to { state, closeAt, openAt } for right now. */
function dlResolve(o, now) {
  if (o.cycle === 'tbd') return { state: 'tbd' };
  if (o.cycle === 'rolling') return { state: 'rolling' };
  if (o.cycle === 'dated') {
    const c = new Date(o.closesOn + 'T12:00:00').getTime();
    return c < now ? { state: 'closed', closeAt: c } : { state: 'open', closeAt: c };
  }
  const y = new Date(now).getFullYear();
  let best = null;
  for (let k = -1; k <= 1; k++) {
    const open = parseMD(o.opens, y + k);
    let close = parseMD(o.closes, y + k);
    if (close < open) close = parseMD(o.closes, y + k + 1);
    if (now >= open && now <= close) return { state: 'open', openAt: open, closeAt: close };
    if (open > now && (!best || open < best.openAt)) best = { state: 'soon', openAt: open, closeAt: close };
  }
  return best || { state: 'closed' };
}
function fmtDate(ms) { return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
let dlFilter = 'all';
function renderDeadlines() {
  const grid = document.getElementById('dlGrid');
  if (!grid) return;
  const now = Date.now();
  const rank = { open: 0, soon: 1, tbd: 2, rolling: 3, closed: 4 };
  const rows = OPPORTUNITIES.map(o => {
    const r = dlResolve(o, now);
    return { o: o, r: r, days: r.closeAt ? Math.ceil((r.closeAt - now) / DAY) : null, toOpen: r.openAt && r.state === 'soon' ? Math.ceil((r.openAt - now) / DAY) : null };
  }).sort((a, b) => (rank[a.r.state] - rank[b.r.state]) || ((a.days || 0) - (b.days || 0)) || a.o.name.localeCompare(b.o.name));
  const shown = rows.filter(x => dlFilter === 'all' || x.o.type === dlFilter);
  document.getElementById('dlEmpty').style.display = shown.length ? 'none' : '';
  grid.innerHTML = shown.map(function (x) {
    const o = x.o, r = x.r;
    let cls, label, when;
    if (r.state === 'tbd') { cls = 'soon'; label = 'Date TBA'; when = esc(o.season || '') + '<div class="dl-unconfirmed">Date to be announced. Check with your unit.</div>'; }
    else if (r.state === 'rolling') { cls = 'rolling'; label = 'Year-round'; when = '<b>Runs all year</b>'; }
    else if (r.state === 'open') { cls = x.days <= 21 ? 'urgent' : 'open'; label = x.days <= 0 ? 'Today' : x.days + (x.days === 1 ? ' day' : ' days'); when = '<b>' + fmtDate(r.closeAt) + '</b>'; }
    else if (r.state === 'soon') { cls = 'soon'; label = 'Opens in ' + x.toOpen + 'd'; when = 'Opens ' + fmtDate(r.openAt) + '<br><b>Closes ' + fmtDate(r.closeAt) + '</b>'; }
    else { cls = 'closed'; label = 'Passed'; when = 'This year\'s date has passed'; }
    if (!o.confirmed && (r.state === 'open' || r.state === 'soon')) when += '<div class="dl-unconfirmed">Usual timing, not confirmed. Check with your unit.</div>';
    const canIcs = o.confirmed && r.closeAt;
    return '<div class="dl-row"><div><span class="dl-status ' + cls + '">' + label + '</span></div>'
      + '<div><div class="dl-name"><a href="' + esc(o.url) + '" target="_blank" rel="noopener">' + esc(o.name) + '</a></div>'
      + '<div class="dl-meta"><span class="dl-tag">' + esc(o.type) + '</span>' + esc(o.org) + ' — ' + esc(o.note) + '</div></div>'
      + '<div class="dl-when">' + when + '</div>'
      + '<div><button class="dl-ics" ' + (canIcs ? '' : 'disabled title="Available once the date is confirmed"') + ' onclick="downloadIcs(' + OPPORTUNITIES.indexOf(o) + ')">+ Calendar</button></div></div>';
  }).join('');
}
function filterDeadlines(btn) {
  dlFilter = btn.dataset.dl;
  document.querySelectorAll('#dlChips .cei-chip').forEach(c => c.classList.toggle('on', c === btn));
  renderDeadlines();
}
function downloadIcs(idx) {
  const o = OPPORTUNITIES[idx];
  if (!o) return;
  const r = dlResolve(o, Date.now());
  if (!r.closeAt) return;
  const stamp = dt => dt.getFullYear() + String(dt.getMonth() + 1).padStart(2, '0') + String(dt.getDate()).padStart(2, '0');
  const d = new Date(r.closeAt), end = new Date(r.closeAt + DAY);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Young Inventors Guidebook//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    'UID:' + stamp(d) + '-' + idx + '@young-inventors-guidebook', 'DTSTAMP:' + stamp(new Date()) + 'T090000Z',
    'DTSTART;VALUE=DATE:' + stamp(d), 'DTEND;VALUE=DATE:' + stamp(end), 'SUMMARY:' + o.name,
    'DESCRIPTION:' + (o.org + '. ' + o.note + ' Confirm details at ' + o.url).replace(/[,;]/g, ' '), 'URL:' + o.url,
    'BEGIN:VALARM', 'TRIGGER:-P7D', 'ACTION:DISPLAY', 'DESCRIPTION:One week to go — ' + o.name, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  download(o.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.ics', ics, 'text/calendar;charset=utf-8');
}

/* ---------- 6. The Workbench ---------- */
const WB_KEY = 'yig_workbench_v1';
const WB_FIELDS = ['pMat', 'pPack', 'pMin', 'pRate', 'pPrice', 'bQty', 'bUnit', 'bOnce', 'bPrice', 'bMin', 'gGrams', 'gSpool', 'gHours', 'gRate', 'gFail'];
function wbRestore() {
  const s = yigGet(WB_KEY, {});
  WB_FIELDS.forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (s[id] !== undefined && s[id] !== '') el.value = s[id];
    el.addEventListener('input', function () { const st = yigGet(WB_KEY, {}); st[id] = el.value; yigSet(WB_KEY, st); });
  });
}
function num(id) { const el = document.getElementById(id); const v = parseFloat(el && el.value); return isFinite(v) ? v : null; }
function money(n) {
  if (n === null || !isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e4) return (n < 0 ? '-$' : '$') + Math.round(abs / 1e3) + 'k';
  if (abs >= 100) return (n < 0 ? '-$' : '$') + Math.round(abs);
  return (n < 0 ? '-$' : '$') + abs.toFixed(2);
}
function wbTab(btn) {
  document.querySelectorAll('.wb-tab').forEach(t => { const on = t === btn; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
  document.querySelectorAll('.wb-panel').forEach(p => p.classList.toggle('on', p.id === btn.dataset.wb));
}
function wbSet(id, t) { document.getElementById(id).textContent = String(t); }
function wbVerdict(id, cls, title, text) { const v = document.getElementById(id); v.className = 'wb-verdict ' + cls; v.innerHTML = '<b>' + title + '</b><span>' + text + '</span>'; }

/* --- Price it --- */
function calcPrice() {
  const mat = num('pMat'), pack = num('pPack') || 0, min = num('pMin') || 0, rate = num('pRate') || 0, price = num('pPrice');
  if (mat === null) {
    wbVerdict('pVerdict', 'idle', 'Put in your parts cost', 'Add up every part for one unit. Then what your time is worth, and the price you have in mind.');
    ['pCost', 'pProfit', 'pMargin', 'pMult'].forEach(id => wbSet(id, '—'));
    return;
  }
  const cost = mat + pack + min / 60 * rate;
  wbSet('pCost', money(cost));
  if (price === null || price <= 0) {
    ['pProfit', 'pMargin', 'pMult'].forEach(id => wbSet(id, '—'));
    wbVerdict('pVerdict', 'idle', 'It costs ' + money(cost) + ' to make one', 'Now add the price you are thinking of. Ask five people what they paid for something similar first.');
    return;
  }
  const profit = price - cost, margin = profit / price * 100, mult = price / cost;
  wbSet('pProfit', money(profit)); wbSet('pMargin', Math.round(margin) + '%'); wbSet('pMult', cost > 0 ? mult.toFixed(1) + '×' : '—');
  if (profit <= 0) wbVerdict('pVerdict', 'bad', 'You lose money on every one', 'Raise the price, find cheaper parts, or make it faster. Your time counts: if you left it out, put it in.');
  else if (margin < 40) wbVerdict('pVerdict', 'bad', 'Thin: ' + Math.round(margin) + '% margin', 'One broken unit, one discount, or one booth fee wipes this out. Many makers aim to charge at least twice what one costs to make.');
  else wbVerdict('pVerdict', 'good', 'Room to work with: ' + Math.round(margin) + '% margin', 'You keep ' + money(profit) + ' on each one. That covers mistakes, a few giveaways, and a booth fee. Check that people will actually pay ' + money(price) + '.');
}
/* --- Batch and break-even --- */
function calcBatch() {
  const qty = num('bQty'), unit = num('bUnit'), once = num('bOnce') || 0, price = num('bPrice'), min = num('bMin') || 0;
  if (qty === null || unit === null || price === null) {
    wbVerdict('bVerdict', 'idle', 'Plan a batch', 'How many will you make, what each costs (from Price it), your one-time costs, and your price.');
    ['bTotal', 'bRevenue', 'bProfit', 'bBreak', 'bHours'].forEach(id => wbSet(id, '—'));
    return;
  }
  const total = once + qty * unit, revenue = qty * price, profit = revenue - total, each = price - unit;
  const breakeven = each > 0 ? Math.ceil(once / each) : null;
  wbSet('bTotal', money(total)); wbSet('bRevenue', money(revenue)); wbSet('bProfit', money(profit));
  wbSet('bBreak', breakeven === null ? 'Never' : breakeven + ' sold'); wbSet('bHours', min ? Math.round(qty * min / 60 * 10) / 10 + ' h' : '—');
  if (breakeven === null) wbVerdict('bVerdict', 'bad', 'Each sale loses money', 'Your price is below what one costs to make, so selling more makes it worse. Fix the price first.');
  else if (breakeven > qty) wbVerdict('bVerdict', 'bad', 'You need ' + breakeven + ' sales to break even', 'That is more than the ' + qty + ' you plan to make. Cut one-time costs, raise the price, or make a bigger batch only once you know they sell.');
  else wbVerdict('bVerdict', 'good', 'You break even at sale ' + breakeven + ' of ' + qty, 'Sell them all and you clear ' + money(profit) + '. Before you make all ' + qty + ', make ten and see how fast they go.');
}
/* --- 3D print cost --- */
function calcPrint() {
  const grams = num('gGrams'), spool = num('gSpool'), hours = num('gHours') || 0, rate = num('gRate') || 0, fail = Math.min(90, num('gFail') || 0);
  if (grams === null || spool === null) {
    wbVerdict('gVerdict', 'idle', 'Put in the slicer numbers', 'The slicer shows the grams of filament and the print time before you print.');
    ['gFil', 'gMach', 'gEach'].forEach(id => wbSet(id, '—'));
    return;
  }
  const fil = grams / 1000 * spool, mach = hours * rate, each = (fil + mach) / (1 - fail / 100);
  wbSet('gFil', money(fil)); wbSet('gMach', money(mach)); wbSet('gEach', money(each));
  wbVerdict('gVerdict', 'good', money(each) + ' per good print', 'Filament ' + money(fil) + ' plus ' + money(mach) + ' of machine time' + (fail ? ', spread over the ' + fail + '% of prints that fail' : '') + '. Use this as the parts cost in Price it.');
}

/* ============================================================
   INIT
   ============================================================ */
(function () {
  // Save the stage whenever the self-assessment returns Stage 1–4.
  if (typeof answerAssessment === 'function') {
    const original = answerAssessment;
    window.answerAssessment = function (stage) {
      if (stage > 0) { try { pathSetStage(stage); } catch (e) {} }
      return original.apply(this, arguments);
    };
  }
  function boot() {
    renderWhatsNew();
    badgeNewResources();
    stampLastUpdated();
    renderPath();
    const nd = document.getElementById('neDate'); if (nd && !nd.value) nd.value = todayIso();
    renderNotebook();
    renderLadder();
    renderDeadlines();
    wbRestore();
    calcPrice(); calcBatch(); calcPrint();
    setInterval(renderDeadlines, 60 * 60 * 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
