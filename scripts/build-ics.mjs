#!/usr/bin/env node
/* Builds calendar.ics — a subscribable calendar of the confirmed dates
   on the calendar board (data/opportunities.js). Unconfirmed and to-be-announced dates are
   left out on purpose: a wrong date in a family's calendar is worse than none.
   Flip an entry to confirmed: true and it appears on the next build.
   Run: node scripts/build-ics.mjs   (the weekly workflow runs it too) */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const { SITE, OPPORTUNITIES } = new Function(read('data/site.js') + read('data/opportunities.js') + '\nreturn { SITE, OPPORTUNITIES };')();

const pad = n => String(n).padStart(2, '0');
const stamp = d => d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
const escapeText = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const fold = line => { const out = []; let s = line; while (s.length > 73) { out.push(s.slice(0, 73)); s = ' ' + s.slice(73); } out.push(s); return out.join('\r\n'); };

const now = new Date();
const year = now.getUTCFullYear();
const events = [];
for (const o of OPPORTUNITIES) {
  if (!o.confirmed) continue;
  const closes = [];
  if (o.cycle === 'dated' && o.closesOn) closes.push(new Date(o.closesOn + 'T12:00:00Z'));
  if (o.cycle === 'annual' && o.closes) {
    // this year's and next year's close dates, so a subscriber always sees the next one
    for (const y of [year, year + 1]) { const [m, d] = o.closes.split('-').map(Number); closes.push(new Date(Date.UTC(y, m - 1, d, 12))); }
  }
  for (const c of closes) {
    if (c.getTime() < now.getTime() - 864e5) continue;
    const end = new Date(c.getTime() + 864e5);
    events.push([
      'BEGIN:VEVENT',
      'UID:' + stamp(c) + '-' + o.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '@young-inventors-guidebook',
      'DTSTAMP:' + stamp(now) + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + '00Z',
      'DTSTART;VALUE=DATE:' + stamp(c),
      'DTEND;VALUE=DATE:' + stamp(end),
      fold('SUMMARY:' + escapeText(o.name)),
      fold('DESCRIPTION:' + escapeText(o.org + '. ' + (o.note || '') + ' Confirm details at ' + o.url)),
      'URL:' + o.url,
      'BEGIN:VALARM', 'TRIGGER:-P7D', 'ACTION:DISPLAY', fold('DESCRIPTION:' + escapeText('One week to go — ' + o.name)), 'END:VALARM',
      'END:VEVENT'
    ].join('\r\n'));
  }
}
const ics = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Young Inventors Guidebook//Calendar//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
  fold('X-WR-CALNAME:' + escapeText(SITE.name + ' — dates')),
  fold('X-WR-CALDESC:' + escapeText('Confirmed Invention Scouts dates from ' + SITE.name + '. Unconfirmed dates are left out until verified. ' + SITE.url)),
  'REFRESH-INTERVAL;VALUE=DURATION:P1D', 'X-PUBLISHED-TTL:P1D',
  ...events,
  'END:VCALENDAR', ''
].join('\r\n');
fs.writeFileSync(path.join(root, 'calendar.ics'), ics);
console.log('calendar.ics: ' + events.length + ' event(s) from ' + OPPORTUNITIES.filter(o => o.confirmed).length + ' confirmed entries');
