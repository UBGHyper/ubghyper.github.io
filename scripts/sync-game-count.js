#!/usr/bin/env node
// Write the game-count label into the three hand-maintained files.
//
// The count is claimed in four places and only one of them was generated, so it
// drifted: index.html, llms.txt and manifest.json all said "620+" while
// all-games.html — built by gen-game-pages.js from the same games.json — said
// "610+", and the real figure was 619. The homepage <title> is the site's
// most-seen string and the snippet for its top branded query, so the wrong
// number was the first thing most visitors read.
//
// CLAUDE.md used to say "index.html is hand-maintained — keep its count in sync
// manually". That instruction has now failed twice, which is the argument for
// this script rather than a more careful reminder.
//
// The rule is deliberately the SAME one the page generators already use
// (gen-game-pages.js STABLE_COUNT, gen-landing-pages.js GAME_COUNT): count every
// game that is not `status: 'broken'`, then round DOWN to a multiple of ten. The
// rounding is what makes the label stable — adding one game must not invalidate
// every page on the site. Duplicating the rule here is unavoidable (these files
// are not generated) but qa-links.js asserts all four agree, so a divergence
// fails the build instead of shipping.
//
// Usage:
//   node scripts/sync-game-count.js          # rewrite the label
//   node scripts/sync-game-count.js --check  # report only, exit 1 if stale

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Files whose count is written by hand. all-games.html and the landing pages are
// NOT here — they are generated, and editing them directly would be undone by
// the next regeneration.
const TARGETS = ['index.html', 'llms.txt', 'manifest.json',
  // hand-maintained pages that state the count too (they said "620+" for weeks, 2026-10-17)
  '404.html', 'about.html', 'cool-ubg-games.html', 'free-online-games.html'];

/** The one rule. Kept identical to the page generators on purpose. */
function stableCount(games) {
  const active = games.filter(g => g && g.url && g.name && g.status !== 'broken');
  return Math.floor(active.length / 10) * 10;
}

// Only ever touch a three-digit count immediately followed by "+". Every
// occurrence in these files is the same claim, in prose, meta tags, JSON-LD and
// the noscript fallback. Anchoring on the "+" keeps the pattern away from years,
// pixel sizes and the G-VE9J0CCHWZ style identifiers that share the files.
const COUNT_RE = /\b\d{3}\+/g;

const games = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'games.json'), 'utf8'));
const label = `${stableCount(games)}+`;

let stale = 0;
for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, 'utf8');
  const found = before.match(COUNT_RE) || [];
  const wrong = found.filter(f => f !== label);

  if (!found.length) {
    console.log(`  WARN  ${rel} claims no count at all — check the file still carries the label`);
    continue;
  }
  if (!wrong.length) {
    console.log(`  ok    ${rel}  ${found.length}x ${label}`);
    continue;
  }

  stale += wrong.length;
  if (CHECK) {
    console.log(`  STALE ${rel}  ${wrong.length}x ${[...new Set(wrong)].join('/')} should be ${label}`);
  } else {
    fs.writeFileSync(file, before.replace(COUNT_RE, label));
    console.log(`  wrote ${rel}  ${wrong.length}x ${[...new Set(wrong)].join('/')} -> ${label}`);
  }
}

const total = games.filter(g => g && g.url && g.name && g.status !== 'broken').length;
console.log(`\n  ${total} games listed (status != broken) -> label "${label}"`);

if (CHECK && stale) {
  console.log('\n  Run: node scripts/sync-game-count.js');
  process.exit(1);
}
