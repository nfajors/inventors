/* ============================================================
   RENDER — turns the editable lists in data/*.js into the page.
   Runs synchronously at the end of <body>, before assets/js/guidebook.js,
   so everything the core script counts, filters, or wires (the resource
   index, the glossary) already exists in the DOM.
   ============================================================ */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function byId(id) { return document.getElementById(id); }
function resourceById(id) { return RESOURCES.find(function (r) { return r.id === id; }); }
function badgeById(id) { return BADGES.find(function (b) { return b.id === id; }); }
function isExternal(url) { return /^https?:/i.test(url || ''); }
function linkAttrs(url) { return isExternal(url) ? ' target="_blank" rel="noopener"' : ''; }

/* ---------- site identity (data/site.js) ---------- */
function stampSite() {
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    var val = SITE[key];
    if (val == null) return;
    if (el.tagName === 'A' && key === 'email') { el.href = 'mailto:' + val; el.textContent = val; }
    else if (el.tagName === 'A' && key === 'phone') { el.href = SITE.phoneHref; el.textContent = val; }
    else if (el.tagName === 'A' && key === 'councilPhone') { el.href = SITE.councilPhoneHref; el.textContent = val; }
    else if (el.tagName === 'A') { el.href = val; }
    else if (key === 'nextReview') { var nd = new Date(val + 'T12:00:00'); el.textContent = nd.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); el.setAttribute('datetime', val); }
    else el.textContent = val;
  });
  document.querySelectorAll('[data-reviewed]').forEach(function (el) {
    var iso = SITE.reviewed[el.getAttribute('data-reviewed')];
    if (!iso) return;
    var d = new Date(iso + 'T12:00:00');
    el.textContent = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    el.setAttribute('datetime', iso);
  });
}

/* ---------- navigation (SITE.nav) ---------- */
function renderNav() {
  var items = SITE.nav.filter(function (n) { var el = byId(n.id); return el && !el.hidden; });
  var links = byId('navLinks'), mobile = byId('mobileMenuLinks'), foot = byId('footerNav');
  if (links) links.innerHTML = items.filter(function (n) { return !n.more; }).map(function (n) {
    return '<button onclick="scrollToSection(\'' + n.id + '\')">' + esc(n.label) + '</button>';
  }).join('');
  if (mobile) mobile.innerHTML = items.map(function (n) {
    return '<button onclick="mobileNav(\'' + n.id + '\')">' + esc(n.label) + '</button>';
  }).join('');
  if (foot) foot.innerHTML = items.concat([{ id: 'adults', label: 'For adults' }, { id: 'feedback', label: 'Feedback' }]).map(function (n) {
    return '<li><button onclick="scrollToSection(\'' + n.id + '\')">' + esc(n.label) + '</button></li>';
  }).join('');
}

/* ---------- badge chips (data/badges.js) ---------- */
function badgeChip(id) {
  var b = badgeById(id);
  if (!b) return '';
  return '<a class="badge-chip ' + esc(b.tier) + '" href="#badge-' + esc(b.id) + '" onclick="showBadge(\'' + esc(b.id) + '\'); return false;">' + esc(b.name) + '</a>';
}

/* ---------- resource cards (data/resources.js) ---------- */
function stageLabel(r) {
  if (r.throughout) return 'Throughout';
  if (!r.stages.length) return '';
  if (r.stages.length === 1) return 'Stage ' + r.stages[0];
  return 'Stages ' + r.stages.join(', ');
}
function resourceMeta(r) {
  var bits = [];
  if (r.who) bits.push('<span><b>Who</b> ' + esc(r.who) + '</span>');
  if (r.cost) bits.push('<span><b>Cost</b> ' + esc(r.cost) + '</span>');
  if (r.time) bits.push('<span><b>Time</b> ' + esc(r.time) + '</span>');
  if (r.age) bits.push('<span><b>Age</b> ' + esc(r.age) + '</span>');
  return bits.length ? '<div class="rc-meta">' + bits.join('') + '</div>' : '';
}
function resourceCard(r, master) {
  var ext = isExternal(r.url);
  var search = [r.name, r.blurb, r.tag, r.keywords, r.who, r.cost, r.age, r.council ? 'council great rivers' : ''].join(' ').toLowerCase();
  var council = r.council ? '<span class="pill-open">Council</span>' : '';
  var onclick = ext ? '' : ' onclick="scrollToSection(\'' + esc(r.url.replace('#', '')) + '\'); return false;"';
  if (master) {
    var stage = r.throughout ? 'all' : r.stages.join(' ');
    return '<a href="' + esc(r.url) + '"' + linkAttrs(r.url) + onclick + ' class="resource-card master" id="res-' + esc(r.id) + '" data-tag="' + esc(r.tag) + '" data-phase="' + esc(stage) + '" data-search="' + esc(search) + '">'
      + '<div class="rc-top"><span class="tag">' + esc(r.tag) + '</span>' + council + '<span class="phase-pill">' + stageLabel(r) + '</span></div>'
      + '<h3>' + esc(r.name) + '</h3><p>' + esc(r.blurb) + '</p>' + resourceMeta(r) + '</a>';
  }
  return '<a href="' + esc(r.url) + '"' + linkAttrs(r.url) + onclick + ' class="resource-card">'
    + '<div class="rc-top"><span class="tag">' + esc(r.tag) + '</span>' + council + '<span class="ext" aria-hidden="true">' + (ext ? '↗' : '→') + '</span></div>'
    + '<h4>' + esc(r.name) + '</h4><p>' + esc(r.blurb) + '</p>' + resourceMeta(r) + '</a>';
}

/* ---------- stages (data/stages.js) ---------- */
function renderStages() {
  var grid = byId('phaseOverviewGrid'), stack = byId('phasesStack');
  if (!grid || !stack) return;
  var pc = byId('stageCount'); if (pc) pc.textContent = STAGES.length;
  grid.innerHTML = STAGES.map(function (p) {
    return '<a href="#' + p.id + '" onclick="scrollToSection(\'' + p.id + '\'); return false;" class="phase-overview-item' + (p.n === 0 ? ' zero' : '') + '" data-phase="' + p.n + '">'
      + '<div class="po-num"><div>' + p.n + '</div></div>'
      + '<div class="po-text"><h3>' + esc(p.title) + '</h3><p>' + esc(p.sub) + '</p></div></a>';
  }).join('');
  stack.innerHTML = STAGES.map(function (p, i) {
    var cards = p.resources.map(resourceById).filter(Boolean).map(function (r) { return resourceCard(r, false); }).join('');
    var extra = '';
    if (p.extra) { var tpl = byId(p.extra); if (tpl) { var tmp = document.createElement('div'); tmp.appendChild(tpl.content.cloneNode(true)); extra = tmp.innerHTML; } }
    var badges = (p.badges || []).map(badgeChip).join('');
    return '<div id="' + p.id + '" class="phase-block' + (i % 2 ? ' reverse' : '') + '">'
      + '<div class="phase-side"><div class="phase-side-inner">'
      + '<div class="phase-num-row"><div class="phase-num">0' + p.n + '</div><div class="vrule"></div><div class="stage-model">' + esc(p.model) + '</div></div>'
      + '<h3>' + esc(p.title) + '</h3><p class="phase-sub">' + esc(p.sub) + '</p><p class="phase-desc">' + esc(p.desc) + '</p>'
      + (badges ? '<div class="stage-badges"><div class="stage-badges-label">Badges that build this stage</div>' + badges + '</div>' : '')
      + '<div class="next-steps"><div class="next-steps-label">Next Steps</div><ul>'
      + p.next.map(function (s) { return '<li><span class="chev">›</span>' + esc(s) + '</li>'; }).join('')
      + '</ul></div></div></div>'
      + '<div class="phase-right">' + extra + '<div class="phase-resources">' + cards + '</div></div>'
      + '</div>';
  }).join('');
}

/* ---------- searchable index (data/resources.js) ---------- */
function renderResourceIndex() {
  var grid = byId('resourceGrid'), tagSel = byId('tagFilter'), stageSel = byId('phaseFilter');
  if (!grid) return;
  grid.innerHTML = RESOURCES.map(function (r) { return resourceCard(r, true); }).join('');
  if (tagSel) {
    var tags = RESOURCES.map(function (r) { return r.tag; }).filter(function (t, i, a) { return a.indexOf(t) === i; }).sort();
    tagSel.innerHTML = '<option value="all">All types</option>' + tags.map(function (t) { return '<option value="' + esc(t) + '">' + esc(t) + '</option>'; }).join('');
  }
  if (stageSel) {
    stageSel.innerHTML = '<option value="all">All stages</option>'
      + STAGES.map(function (p) { return '<option value="' + p.n + '">Stage ' + p.n + ' · ' + esc(p.title) + '</option>'; }).join('')
      + '<option value="throughout">Throughout</option>';
  }
}

/* ---------- badge map and arenas (data/badges.js) ---------- */
function renderBadges() {
  var grid = byId('badgeGrid'), arenas = byId('arenaGrid');
  if (grid) {
    var tierName = { core: 'Core', supporting: 'Supporting', emerging: 'New & Stage 4' };
    grid.innerHTML = BADGES.map(function (b) {
      return '<a class="badge-card ' + esc(b.tier) + '" id="badge-' + esc(b.id) + '" data-tier="' + esc(b.tier) + '" data-stages="' + b.stages.join(' ') + '" href="' + esc(b.url) + '" target="_blank" rel="noopener">'
        + '<div class="rc-top"><span class="tag">' + esc(tierName[b.tier]) + '</span>' + (b.eagle ? '<span class="pill-open">Eagle-required</span>' : '')
        + '<span class="phase-pill">Stage' + (b.stages.length > 1 ? 's ' : ' ') + b.stages.join(', ') + '</span></div>'
        + '<h3>' + esc(b.name) + '<span class="ext" aria-hidden="true"> ↗</span></h3><p>' + esc(b.why) + '</p>'
        + '<div class="rc-meta"><span><b>Where</b> ' + esc(b.where) + '</span></div></a>';
    }).join('');
    var all = byId('badgeAllLink'); if (all && typeof BADGE_ALL_URL !== 'undefined') all.href = BADGE_ALL_URL;
  }
  if (arenas) {
    arenas.innerHTML = ARENAS.map(function (a) {
      return '<div class="arena' + (a.proposed ? ' proposed' : '') + '">'
        + '<div class="arena-head">' + (a.proposed ? '<span class="arena-flag">Proposed</span>' : '') + '<h4>' + esc(a.name) + '</h4></div>'
        + '<p class="arena-gear">' + esc(a.gear) + '</p>'
        + '<ul class="arena-badges">' + a.badges.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>'
        + (a.nova.length ? '<p class="arena-nova"><b>Nova awards</b> ' + a.nova.map(esc).join(' · ') + '</p>' : '')
        + '</div>';
    }).join('');
  }
}
function showBadge(id) {
  var card = byId('badge-' + id);
  if (!card) return;
  if (typeof filterBadges === 'function') { var all = document.querySelector('#badgeChips [data-bt="all"]'); if (all) filterBadges(all); }
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('flash'); setTimeout(function () { card.classList.remove('flash'); }, 1600);
}

/* ---------- unit challenges (data/challenges.js) ---------- */
function renderChallenges() {
  var grid = byId('challengeGrid');
  if (!grid || typeof CHALLENGES === 'undefined') return;
  grid.innerHTML = CHALLENGES.map(function (c) {
    return '<details class="challenge" id="ch-' + esc(c.id) + '">'
      + '<summary><span class="ch-meta"><span class="tag">' + c.minutes + ' min</span><span class="phase-pill">Stage ' + c.stage + '</span></span>'
      + '<span class="ch-title">' + esc(c.title) + '</span><span class="ch-goal">' + esc(c.goal) + '</span><span class="ch-open" aria-hidden="true">+</span></summary>'
      + '<div class="ch-body"><p class="ch-mat"><b>Materials</b> ' + esc(c.materials) + '</p>'
      + '<ol class="howto-steps">' + c.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>'
      + (c.safety ? '<p class="ch-safety"><b>Safety</b> ' + esc(c.safety) + '</p>' : '')
      + '<p class="ch-end"><b>To finish</b> Ask: who wants to keep going? Those Scouts open an <a href="#notebook" onclick="scrollToSection(\'notebook\'); return false;">Inventor\'s Notebook</a> tonight and show it to the Invention Ranger or Scoutmaster.</p>'
      + (c.source ? '<p class="ch-source">' + esc(c.source) + '</p>' : '')
      + '</div></details>';
  }).join('');
  var n = byId('challengeCount'); if (n) n.textContent = CHALLENGES.length;
}

/* ---------- knowledge hub (data/knowledge.js) ---------- */
function renderKnowledge() {
  var grid = byId('knGrid');
  if (!grid) return;
  grid.innerHTML = KNOWLEDGE.map(function (k) {
    return '<div class="kn-card"><div class="kn-head"><div class="kn-icon" aria-hidden="true">' + esc(k.icon) + '</div><div><h3>' + esc(k.title) + '</h3><p class="kn-sub">' + esc(k.sub) + '</p></div></div>'
      + (k.note ? '<p class="kn-note">' + k.note + '</p>' : '')
      + '<ul>' + k.items.map(function (it) {
        if (it.url) return '<li><a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.text) + '<span class="arrow">→</span></a></li>';
        return '<li class="kn-book">' + esc(it.text) + (it.note ? ' <span class="kn-book-note">' + esc(it.note) + '</span>' : '') + '</li>';
      }).join('') + '</ul></div>';
  }).join('');
}

/* ---------- glossary (data/glossary.js) ---------- */
function renderGlossary() {
  var grid = byId('glossGrid');
  if (!grid) return;
  grid.innerHTML = GLOSSARY.map(function (g, i) {
    var search = (g.term + ' ' + g.def + ' ' + g.eg).toLowerCase();
    return '<div class="gloss-term" data-search="' + esc(search) + '" data-cat="' + esc(g.cat) + '"' + (g.start ? ' data-start="1"' : '') + '>'
      + '<button class="gloss-q" aria-expanded="false" aria-controls="gloss-' + i + '" onclick="toggleGloss(this)">'
      + '<span class="gloss-name">' + esc(g.term) + '</span><span class="gloss-phase">' + esc(g.phase) + '</span><span class="gloss-chev" aria-hidden="true">+</span></button>'
      + '<div class="gloss-a" id="gloss-' + i + '" hidden><p class="gloss-def">' + esc(g.def) + '</p><p class="gloss-eg"><strong>Example:</strong> ' + esc(g.eg) + '</p></div></div>';
  }).join('');
}

/* ---------- beyond the guidebook (data/beyond.js) ---------- */
function renderBeyond() {
  ['invention', 'business', 'build'].forEach(function (g) {
    var el = document.querySelector('[data-beyond="' + g + '"]');
    if (!el) return;
    el.innerHTML = BEYOND.filter(function (b) { return b.group === g; }).map(function (b) {
      return '<a href="' + esc(b.url) + '" target="_blank" rel="noopener" class="comp-row"><div class="comp-main">'
        + '<span class="comp-name">' + esc(b.name) + '<span class="ext" aria-hidden="true">↗</span></span>'
        + '<div class="comp-host">' + esc(b.host) + ' · <b class="comp-ages">' + esc(b.ages) + '</b></div>'
        + '<div class="comp-host"><span class="comp-focus">' + esc(b.focus) + '</span></div></div></a>';
    }).join('');
  });
}

/* ---------- inventors who started young (data/inventors.js) ---------- */
function renderInventors() {
  var grid = byId('alumniGrid');
  if (!grid) return;
  grid.innerHTML = INVENTORS.map(function (a) {
    return '<div class="alum-card"><div class="alum-top"><div class="alum-avatar" aria-hidden="true">' + esc(a.initials) + '</div>'
      + '<div><h3>' + esc(a.name) + '</h3><p class="alum-degree">Age ' + esc(a.age) + ' · ' + esc(a.year) + '</p></div></div>'
      + '<p>' + esc(a.what) + '</p><p class="alum-borrow"><b>Borrow this</b> ' + esc(a.borrow) + '</p></div>';
  }).join('') + '<div class="alum-cta" id="alumCta"><div class="iconbox" aria-hidden="true">✦</div><h3>Your name could be next.</h3>'
    + '<p>Every one of them was about your age, with a problem that bugged them and nobody telling them to start.</p>'
    + '<button onclick="scrollToSection(\'notebook\')">Open your notebook →</button></div>';
  var c = byId('inventorCount'); if (c) c.textContent = INVENTORS.length;
}

/* ---------- people (data/contacts.js) ---------- */
function renderContacts() {
  var grid = byId('contactsGrid');
  if (!grid) return;
  grid.innerHTML = CONTACTS.map(function (c) {
    return '<div class="contact-card" id="contact-' + esc(c.id) + '">'
      + '<div class="ct-avatar" aria-hidden="true">' + esc(c.icon) + '</div><div class="ct-body">'
      + '<div class="ct-name-row"><h3>' + esc(c.name) + '</h3></div>'
      + '<p class="ct-title">' + esc(c.title) + '</p>'
      + (c.bestFor ? '<p class="ct-best"><b>Best for:</b> ' + esc(c.bestFor) + '</p>' : '')
      + (c.how ? '<p class="ct-how"><b>How:</b> ' + c.how + '</p>' : '')
      + '</div></div>';
  }).join('');
}
function renderDoors() {
  var host = byId('doors');
  if (!host || typeof DOORS === 'undefined') return;
  host.innerHTML = '<h3 class="doors-title">Who do I talk to first?</h3><div class="doors-grid">' + DOORS.map(function (d) {
    var people = d.contacts.map(function (id) { return CONTACTS.find(function (c) { return c.id === id; }); }).filter(Boolean);
    return '<div class="door" id="door-' + esc(d.id) + '"><h4>' + esc(d.title) + '</h4><p>' + esc(d.text) + '</p><div class="door-people">'
      + people.map(function (c, i) {
        return '<a href="#contact-' + esc(c.id) + '" onclick="scrollToSection(\'contact-' + esc(c.id) + '\'); return false;">' + (i === 0 ? '<b>Start with</b> ' : '') + esc(c.name) + '</a>';
      }).join('')
      + '</div></div>';
  }).join('') + '</div>';
}

/* ---------- invented in Scouting (data/stories.js) ---------- */
function renderStories() {
  var grid = byId('storiesGrid');
  if (!grid || typeof STORIES === 'undefined') return;
  if (!STORIES.length) { byId('stories').hidden = true; return; }
  grid.innerHTML = STORIES.map(function (st) {
    var link = isExternal(st.to)
      ? '<a href="' + esc(st.to) + '" target="_blank" rel="noopener">' + esc(st.cta || 'Read more') + ' ↗</a>'
      : '<button onclick="scrollToSection(\'' + esc(st.to) + '\')">' + esc(st.cta || 'Read more') + ' →</button>';
    return '<article class="story">'
      + '<div class="story-top"><span class="story-phase">' + esc(st.kind) + '</span></div>'
      + '<h3>' + esc(st.name) + '</h3><div class="story-who">' + esc(st.who) + '</div>'
      + '<p>' + esc(st.text) + '</p>' + (st.source ? '<p class="story-source">Source: ' + esc(st.source) + '</p>' : '')
      + '<div class="story-cta">' + link + '</div></article>';
  }).join('');
}

/* ---------- spotlight (data/spotlight.js) ---------- */
function renderSpotlight() {
  var el = byId('spotlight');
  if (!el || typeof SPOTLIGHT === 'undefined' || !SPOTLIGHT) return;
  var s = SPOTLIGHT;
  var facts = (s.facts || []).slice(0, 4).map(function (f) {
    return '<div class="sp-fact"><b>' + esc(f.value) + '</b><span>' + esc(f.label) + '</span></div>';
  }).join('');
  var steps = (s.steps || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
  var links = '<a class="btn-primary sp-cta" href="' + esc(s.cta.url) + '" target="_blank" rel="noopener">' + esc(s.cta.label) + ' <span class="arrow">↗</span></a>'
    + (s.more ? '<button class="sp-link" onclick="scrollToSection(\'' + esc(s.more.to) + '\')">' + esc(s.more.label) + ' →</button>' : '');
  el.innerHTML = '<div class="spotlight-inner">'
    + '<div class="sp-main"><div class="sp-badge"><span>' + esc(s.eyebrow) + '</span></div>'
    + '<h2 id="spotlightHead">' + esc(s.title) + (s.titleGold ? ' <span class="gold italic">' + esc(s.titleGold) + '</span>' : '') + '</h2>'
    + '<p class="sp-lede">' + esc(s.lede) + '</p>'
    + (facts ? '<div class="sp-facts">' + facts + '</div>' : '')
    + '<div class="sp-actions">' + links + '</div></div>'
    + (steps ? '<div class="sp-side"><div class="sp-side-head">How to start</div><ol class="sp-steps">' + steps + '</ol>'
      + (s.fit ? '<p class="sp-fit">' + esc(s.fit) + '</p>' : '') + '</div>' : '')
    + '</div>';
  el.hidden = false;
}

/* ---------- run ---------- */
(function renderAll() {
  // A resource's stages are wherever the stage blocks list it (data/stages.js),
  // so the index filter and the grids can never disagree.
  RESOURCES.forEach(function (r) {
    r.stages = STAGES.filter(function (p) { return p.resources.indexOf(r.id) !== -1; }).map(function (p) { return p.n; });
  });
  renderStages();
  renderStories();
  renderSpotlight();
  renderBadges();
  renderChallenges();
  renderDoors();
  renderResourceIndex();
  renderKnowledge();
  renderGlossary();
  renderBeyond();
  renderInventors();
  renderContacts();
  renderNav();
  stampSite();
  var y = byId('copyYear'); if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   EMAILS, MILESTONES, NUMBERS, SHARING. All read SITE (data/site.js).
   Every email a Scout can start from this page is addressed to the
   program and asks for a parent or guardian on the CC line: nothing
   here sends anything by itself, and nothing is collected by the page.
   ============================================================ */

/* ---------- helpers ---------- */
var PARENT_LINE = 'Parent or guardian (please add them on the CC line): [name, email]';
function mailto(subject, bodyLines) {
  return 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject + ' — ' + SITE.name) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
}
function pageUrl() {
  if (/^https?:$/.test(location.protocol)) return location.origin + location.pathname;
  return SITE.url;
}
function winDate(d) {
  var parts = String(d).split('-');
  var dt = new Date(+parts[0], parts[1] ? +parts[1] - 1 : 0, parts[2] ? +parts[2] : 1, 12);
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return dt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
function wireHref(a, href) {
  if (!a) return;
  a.setAttribute('href', href);
  if (/^https?:/.test(href)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
  else { a.removeAttribute('target'); a.removeAttribute('rel'); }
}

/* ---------- "I built something" and mentor requests ---------- */
function builtHref(extraLines) {
  if (SITE.builtUrl) return SITE.builtUrl;
  return mailto('I built something', [
    'Hi Invention Scouts team,', '',
    'I built something and I want to keep going.', '',
    'My first name: [ ]',
    'Unit (for example, Troop 21) and council: [ ]',
    'Age: [ ]', '',
    'What I made: [ ]',
    'The problem it solves, and for whom: [ ]',
    'What I need next (a mentor, tools, a competition, help with the business side): [ ]'
  ].concat(extraLines || []).concat(['', PARENT_LINE, 'My parent or guardian has read this email and agrees to it: [yes]', '', 'Thank you!']));
}
function mentorHref(extraLines) {
  if (SITE.mentorUrl) return SITE.mentorUrl;
  return mailto('Mentor request', [
    'Hi Trulaske CEI mentor team,', '',
    'I would like a mentor for my invention.', '',
    'My first name: [ ]',
    'Unit and council: [ ]',
    'Age: [ ]',
    'My invention in one sentence: [ ]',
    'Stage I am at (Find it / Build it / Prove it / Launch it): [ ]',
    'What I want help with: [ ]',
    'Where I could meet (the Innovation Space in Columbia, an event, online with my parent present): [ ]'
  ].concat(extraLines || []).concat(['', PARENT_LINE, '', 'Thank you!']));
}
function nominationHref(kind) {
  if (SITE.nominationUrl) return SITE.nominationUrl;
  var forms = {
    scout: ['Nominate a Scout inventor', ['Hi Invention Scouts team,', '', 'I would like to nominate a Scout for the Young Inventor registry.', '', 'Scout\'s first name and unit: [ ]', 'What they built or did: [ ]', 'Why they stood out: [ ]', 'My name and role (Scoutmaster, counselor, Ranger, parent): [ ]', '', 'I will share this with the Scout\'s parent or guardian before anything is published.']],
    win: ['A milestone for the guidebook', ['Hi Invention Scouts team,', '', 'A milestone for the feed:', '', 'Who (first names, unit): [ ]', 'What happened: [badge, competition, product, patent filing]', 'When: [date]', '', 'Family consent to publish: [yes / not yet]', 'My name: [ ]']],
    resource: ['A resource the guidebook is missing', ['Hi Invention Scouts team,', '', 'A resource to add:', '', 'Name and link: [ ]', 'Who it is for and what ages: [ ]', 'What it costs / how long it takes: [ ]', 'Why it belongs here: [ ]', '', 'My name: [ ]']]
  };
  var f = forms[kind] || forms.resource;
  return mailto(f[0], f[1]);
}
function feedbackHref() {
  return SITE.feedbackUrl || mailto('Feedback on the guidebook', ['Hi,', '', 'Something to add, fix, or explain better:', '', '[ ]', '', 'Section: [ ]', 'I am a: [Scout / parent / leader / mentor]']);
}
function wireForms() {
  document.querySelectorAll('[data-built]').forEach(function (a) { wireHref(a, builtHref()); a.addEventListener('click', function () { track('built_click', { via: a.getAttribute('data-built') }); }); });
  document.querySelectorAll('[data-mentor]').forEach(function (a) { wireHref(a, mentorHref()); a.addEventListener('click', function () { track('mentor_click', { via: a.getAttribute('data-mentor') }); }); });
  document.querySelectorAll('[data-feedback]').forEach(function (a) { wireHref(a, feedbackHref()); });
  [['nominateScout', 'scout'], ['nominateWin', 'win'], ['nominateResource', 'resource'], ['winSubmit', 'win']].forEach(function (pair) {
    wireHref(byId(pair[0]), nominationHref(pair[1]));
  });
}

/* ---------- milestones feed (data/wins.js) ---------- */
function sectionName(id) {
  var m = /^stage-(\d)$/.exec(id);
  if (m) return 'Stage ' + m[1];
  var n = (SITE.nav || []).filter(function (x) { return x.id === id; })[0];
  return n ? n.label : 'More';
}
function renderWins() {
  var feed = byId('winsFeed');
  if (!feed || typeof WINS === 'undefined') return;
  // The ten newest milestones, shown oldest first so the feed reads as a story.
  var sorted = WINS.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).slice(0, 10).reverse();
  feed.innerHTML = sorted.map(function (w) {
    var link = !w.to ? '' : isExternal(w.to)
      ? '<a href="' + esc(w.to) + '" target="_blank" rel="noopener">Read more ↗</a>'
      : '<button onclick="scrollToSection(\'' + esc(w.to) + '\')">' + esc(sectionName(w.to)) + ' →</button>';
    return '<li class="win"><time datetime="' + esc(w.date) + '">' + esc(winDate(w.date)) + '</time>'
      + '<div class="win-body"><div class="win-what"><b>' + esc(w.who) + '</b> ' + esc(w.what) + '</div>'
      + (w.detail ? '<div class="win-detail">' + esc(w.detail) + '</div>' : '')
      + (w.source ? '<div class="win-source">Source: ' + esc(w.source) + '</div>' : '')
      + (link ? '<div class="win-link">' + link + '</div>' : '') + '</div></li>';
  }).join('');
}

/* ---------- by the numbers (OUTCOMES in data/wins.js) ---------- */
function renderOutcomes() {
  var comp = byId('kpiComputed'), facts = byId('kpiFacts'), rep = byId('kpiReported');
  if (!comp || typeof OUTCOMES === 'undefined') return;
  var tile = function (value, label, note, to) {
    if (value === null || value === undefined) return '';
    var body = '<div class="kpi-value">' + esc(value) + '</div><div class="kpi-label">' + esc(label) + '</div>' + (note ? '<div class="kpi-note">' + esc(note) + '</div>' : '');
    return to ? '<a class="kpi" href="#' + esc(to) + '" onclick="scrollToSection(\'' + esc(to) + '\'); return false;">' + body + '</a>' : '<div class="kpi">' + body + '</div>';
  };
  comp.innerHTML = tile(STAGES.length, 'Stages, curious to launch', 'Find it, Build it, Prove it, Launch it', 'stages')
    + tile(BADGES.length, 'Merit badges on the map', BADGES.filter(function (b) { return b.tier === 'core'; }).length + ' in the core set', 'badges')
    + tile(CHALLENGES.length, 'Patrol challenges', 'Most run in 45 minutes', 'challenges')
    + tile(RESOURCES.length, 'Resources indexed', RESOURCES.filter(function (r) { return r.council; }).length + ' run by the council', 'resources')
    + tile(GLOSSARY.length, 'Glossary terms', 'Defined in plain words', 'glossary')
    + tile(INVENTORS.length, 'Inventors who started young', 'Ages 11 to 18', 'inventors');
  if (facts) facts.innerHTML = '<h3 class="kpi-heading">Invention Scouts in 2025</h3><div class="kpi-row">'
    + OUTCOMES.facts.map(function (f) { return tile(f.value, f.label, f.note); }).join('') + '</div>'
    + '<p class="cei-note">Source: <a href="' + esc(SITE.councilUrl) + '" target="_blank" rel="noopener">Great Rivers Council, Scouting America</a>, 2025 Annual Report.</p>';
  var reported = (OUTCOMES.reported || []).filter(function (t) { return t.value !== null && t.value !== undefined; });
  if (rep) rep.innerHTML = reported.length
    ? '<h3 class="kpi-heading">This guidebook, ' + esc(OUTCOMES.year) + '</h3><div class="kpi-row">' + reported.map(function (t) { return tile(String(t.value), t.label, t.note); }).join('') + '</div>'
    : '<p class="cei-note">Program numbers for ' + esc(OUTCOMES.year) + ' (Scouts with an open notebook project, Scouts matched to a mentor, ladder rungs earned, competition entries) are reported by the council and CEI each June and will appear here.</p>';
}

/* ---------- calendar subscriptions ---------- */
function wireSubscriptions() {
  var webcal = byId('dlWebcal'), email = byId('dlEmail');
  var feed = pageUrl().replace(/index\.html$/, '') + 'calendar.ics';
  if (webcal) webcal.href = feed.replace(/^https?:/, 'webcal:');
  if (email) wireHref(email, mailto('Add our family to event reminders', ['Hi,', '', 'Please email our family when Invention Scouts dates are announced.', '', 'Scout\'s first name and unit: [ ]', 'Interested in: [Jamboree / summer camp / Merit Badge University / competitions / all]', '', 'Parent or guardian name and email: [ ]']));
}

/* ---------- sharing ---------- */
function drawQr(canvas, text) {
  if (!canvas || typeof qrcode !== 'function') return;
  try {
    var qr = qrcode(0, 'M'); qr.addData(text); qr.make();
    var n = qr.getModuleCount(), size = canvas.width, cell = Math.floor(size / (n + 6)), off = Math.floor((size - cell * n) / 2);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, size, size); ctx.fillStyle = '#13233A';
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (qr.isDark(r, c)) ctx.fillRect(off + c * cell, off + r * cell, cell, cell);
  } catch (e) { /* leave the canvas blank rather than break the page */ }
}
function renderShare() {
  var url = pageUrl();
  var pretty = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  var a = byId('shareUrl'); if (a) a.textContent = pretty;
  var b = byId('flyerUrl'); if (b) b.textContent = SITE.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  var perm = byId('permanentUrl'); if (perm) { perm.href = SITE.url; perm.textContent = SITE.url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }
  var em = byId('shareEmail'); if (em) em.href = 'mailto:?subject=' + encodeURIComponent(SITE.name) + '&body=' + encodeURIComponent(SITE.shareText + '\n\n' + url);
  // The QR codes always carry the permanent address, so a printed flyer never points at a preview.
  var draw = function () { drawQr(byId('shareQr'), SITE.url); drawQr(byId('flyerQr'), SITE.url); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', draw); else draw();
  // A "copy link" beside every "Print this section" button, so a specific section can be sent.
  document.querySelectorAll('.section-print-btn').forEach(function (btn) {
    var sec = btn.closest('section'); if (!sec || !sec.id) return;
    var c = document.createElement('button');
    c.className = 'section-print-btn section-link-btn'; c.type = 'button'; c.textContent = '⧉ Copy link to this section';
    c.addEventListener('click', function () { copyLink(c, url + '#' + sec.id); });
    btn.insertAdjacentElement('afterend', c);
  });
}
function copyLink(btn, url) {
  url = url || pageUrl();
  var done = function () { if (!btn) return; var o = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(function () { btn.textContent = o; }, 1800); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copy this link:', url); });
  else window.prompt('Copy this link:', url);
}
function sharePage(btn) {
  var data = { title: SITE.name, text: SITE.shareText, url: pageUrl() };
  if (navigator.share) navigator.share(data).catch(function () {});
  else copyLink(btn);
}

/* ---------- stage CTA buttons (STAGES[].cta) ---------- */
function wireStageCtas() {
  STAGES.forEach(function (p) {
    if (!p.cta) return;
    var side = document.querySelector('#' + p.id + ' .phase-side-inner'); if (!side) return;
    var a = document.createElement('a');
    a.className = 'phase-cta'; a.textContent = p.cta.label + ' →';
    if (p.cta.action === 'mentor') a.setAttribute('data-mentor', p.id);
    else if (p.cta.action === 'built') a.setAttribute('data-built', p.id);
    else if (p.cta.href) a.href = p.cta.href;
    side.appendChild(a);
  });
}

(function renderRest() {
  renderWins();
  renderOutcomes();
  wireStageCtas();
  wireForms();
  wireSubscriptions();
  renderShare();
})();
