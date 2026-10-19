#!/usr/bin/env node
/* Consistency check: the static <head> tags, robots.txt, and sitemap.xml must
   all carry the same permanent address as SITE.url in data/site.js, and every
   id one data file uses from another (stage resources, stage badges, ladder
   badges, door contacts) must exist. Run: node scripts/check-site.mjs */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const files = ['site', 'stages', 'resources', 'badges', 'ladder', 'challenges', 'opportunities', 'glossary', 'contacts', 'beyond', 'inventors', 'stories', 'wins', 'prompts', 'knowledge', 'spotlight', 'changelog'].map(f => `data/${f}.js`);
const D = new Function(files.map(read).join('\n') + '\nreturn { SITE, STAGES, PATH_STEPS, RESOURCES, BADGES, ARENAS, LADDER, CHALLENGES, OPPORTUNITIES, GLOSSARY, CONTACTS, DOORS, BEYOND, INVENTORS, STORIES, WINS, STUDIO_PROMPTS, CHANGELOG };')();
const html = read('index.html');
const problems = [];
const expect = (cond, msg) => { if (!cond) problems.push(msg); };

const url = D.SITE.url;
expect(/\/$/.test(url), 'SITE.url should end with a slash');
expect(html.includes(`<link rel="canonical" href="${url}" />`), `canonical tag does not match SITE.url (${url})`);
expect(html.includes(`<meta property="og:url" content="${url}" />`), 'og:url does not match SITE.url');
expect(html.includes(`"url": "${url}"`), 'JSON-LD url does not match SITE.url');
expect(read('robots.txt').includes(`Sitemap: ${url}sitemap.xml`), 'robots.txt sitemap line does not match SITE.url');
expect(read('sitemap.xml').includes(`<loc>${url}</loc>`), 'sitemap.xml loc does not match SITE.url');
expect(!/googletagmanager|gtag\(/.test(html), 'an analytics tag is in index.html; see docs/PRIVACY.md before adding one');

const unique = (list, label) => { const s = new Set(list.map(x => x.id)); expect(s.size === list.length, `duplicate ${label} ids`); return s; };
const res = unique(D.RESOURCES, 'resource'), badges = unique(D.BADGES, 'badge'), contacts = unique(D.CONTACTS, 'contact');
unique(D.CHALLENGES, 'challenge');
for (const s of D.STAGES) {
  for (const id of s.resources) expect(res.has(id), `stage ${s.n} references unknown resource "${id}"`);
  for (const id of s.badges || []) expect(badges.has(id), `stage ${s.n} references unknown badge "${id}"`);
  if (s.n > 0) expect((D.PATH_STEPS[s.n] || []).length > 0, `stage ${s.n} has no PATH_STEPS`);
}
for (const r of D.RESOURCES) expect(r.who && r.cost && r.time, `resource "${r.id}" is missing who/cost/time`);
for (const b of D.BADGES) expect(/^https:\/\//.test(b.url) && b.stages.length, `badge "${b.id}" needs a url and stages`);
const reqIds = new Set();
for (const r of D.LADDER) {
  if (r.badge) expect(badges.has(r.badge), `ladder rung "${r.id}" references unknown badge "${r.badge}"`);
  for (const q of r.reqs) { expect(!reqIds.has(q.id), `duplicate ladder requirement id "${q.id}"`); reqIds.add(q.id); }
}
for (const d of D.DOORS) for (const id of d.contacts) expect(contacts.has(id), `door "${d.id}" references unknown contact "${id}"`);
const names = new Set();
for (const o of D.OPPORTUNITIES) {
  expect(!names.has(o.name), `duplicate calendar entry "${o.name}"`); names.add(o.name);
  expect(['tbd', 'rolling', 'annual', 'dated'].includes(o.cycle), `calendar entry "${o.name}" has an unknown cycle`);
  if (o.cycle === 'tbd') expect(o.season, `calendar entry "${o.name}" is tbd but has no season text`);
  if (o.cycle === 'annual') expect(o.opens && o.closes, `calendar entry "${o.name}" has no opens/closes`);
  if (o.cycle === 'dated') expect(o.closesOn && o.confirmed, `calendar entry "${o.name}" is dated but not confirmed`);
}
expect(D.GLOSSARY.some(g => g.start), 'no glossary term is marked start: true');
for (const d of Object.values(D.SITE.reviewed)) expect(/^\d{4}-\d{2}-\d{2}$/.test(d), `bad reviewed date ${d}`);
for (const n of D.SITE.nav) expect(html.includes(`id="${n.id}"`), `nav item "${n.id}" has no section in index.html`);
for (const c of D.CHANGELOG) expect(/^\d{4}-\d{2}-\d{2}$/.test(c.date), `bad changelog date ${c.date}`);

if (problems.length) { console.error('check-site: ' + problems.length + ' problem(s)\n - ' + problems.join('\n - ')); process.exit(1); }
console.log(`check-site: ok (${D.RESOURCES.length} resources, ${D.BADGES.length} badges, ${D.CHALLENGES.length} challenges, ${D.OPPORTUNITIES.length} calendar entries, ${D.GLOSSARY.length} glossary terms, url ${url})`);
