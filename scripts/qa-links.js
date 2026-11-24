#!/usr/bin/env node
/* Internal link + sitemap integrity — run with: node scripts/qa-links.js
 *
 * Finds 404s the site inflicts on itself: internal links and sitemap entries
 * pointing at files that do not exist. These are the cheapest 404s to remove
 * because they need no external data — every one is a guaranteed dead end for
 * a user or a crawler.
 *
 * Offline: reads the working tree only, makes no network requests.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const SITE = 'https://ubghyper.github.io';
// /g/ holds the vendored play shells. Each carries a <base href> pointing at
// jsDelivr, so its relative asset paths resolve to the CDN, not to this
// filesystem. Walking them made 304 targets look broken — TemplateData/style.css,
// favicon.ico and friends — when every one of them serves 200 from the CDN.
// Verifying those is gen-play-shell.js's job (it checks each ref against both the
// CDN and the live shard); resolving them here would need a <base>-aware
// resolver for no benefit. Every broken target reported before this exclusion
// came from /g/ and none from a real site page.
const SKIP_DIRS = new Set(['.git', 'node_modules', 'data', 'scripts', 'g']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Resolve a site-relative href to a file on disk, mirroring GitHub Pages. */
function resolveTarget(href, fromFile) {
  let p = href.split('#')[0].split('?')[0];
  if (!p) return null;                                   // pure fragment/query
  let abs;
  if (p.startsWith('/')) abs = path.join(ROOT, p);
  else abs = path.resolve(path.dirname(fromFile), p);

  if (fs.existsSync(abs)) {
    if (fs.statSync(abs).isDirectory()) {
      return fs.existsSync(path.join(abs, 'index.html')) ? path.join(abs, 'index.html') : null;
    }
    return abs;
  }
  // Directory-style URL without a trailing slash
  if (fs.existsSync(abs + '.html')) return abs + '.html';
  return null;
}

const files = walk(ROOT);
const broken = new Map();      // target → [sources]
let linkCount = 0;

for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  // Strip script/style bodies: template literals like `/games/${g.url}.html`
  // are code, not links, and would read as broken targets.
  const html = fs.readFileSync(f, 'utf8')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|data:|mailto:|javascript:|#|\/\/)/i.test(href)) continue;
    if (href.includes('${')) continue;                   // unrendered template
    linkCount++;
    if (!resolveTarget(href, f)) {
      const key = href;
      if (!broken.has(key)) broken.set(key, []);
      broken.get(key).push(rel);
    }
  }
}

console.log(`Scanned ${files.length} pages, ${linkCount} internal links.\n`);

if (broken.size === 0) {
  console.log('PASS  no broken internal links');
} else {
  console.log(`FAIL  ${broken.size} distinct broken link target(s):\n`);
  const rows = [...broken.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [target, sources] of rows.slice(0, 40)) {
    console.log(`  ${target}`);
    console.log(`      referenced by ${sources.length} page(s), e.g. ${sources.slice(0, 3).join(', ')}`);
  }
  if (rows.length > 40) console.log(`  … and ${rows.length - 40} more`);
}

// ── Sitemap entries must exist on disk ────────────────────────────────
console.log('');
const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemapBroken = [];
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const loc of locs) {
    const rel = loc.replace(SITE, '') || '/';
    const target = rel === '/' ? path.join(ROOT, 'index.html') : path.join(ROOT, rel);
    if (!fs.existsSync(target)) sitemapBroken.push(loc);
  }
  console.log(sitemapBroken.length === 0
    ? `PASS  all ${locs.length} sitemap URLs exist on disk`
    : `FAIL  ${sitemapBroken.length} sitemap URL(s) have no file:\n  ${sitemapBroken.slice(0, 20).join('\n  ')}`);
}

// ── Every legacy slug must still resolve ──────────────────────────────
const legacyPath = path.join(ROOT, 'scripts', 'legacy-urls.txt');
let legacyMissing = [];
if (fs.existsSync(legacyPath)) {
  const slugs = fs.readFileSync(legacyPath, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  for (const slug of slugs) {
    if (!fs.existsSync(path.join(ROOT, 'games', `${slug}.html`))) legacyMissing.push(slug);
  }
  console.log(legacyMissing.length === 0
    ? `PASS  all ${slugs.length} historical slugs still resolve`
    : `FAIL  ${legacyMissing.length} historical slug(s) now 404:\n  ${legacyMissing.join('\n  ')}`);
}

// ── The game count says the same thing everywhere ─────────────────────
// Not a 404, but the same class of self-inflicted wound: a claim on the page
// that the site's own data contradicts. index.html, llms.txt and manifest.json
// carry the count by hand while all-games.html and the landing pages generate
// it, and the two sets drifted a full tier apart (620+ vs 610+ against a real
// 619). The homepage <title> is the site's most-seen string, so it is worth
// failing a build over. sync-game-count.js fixes it; this catches forgetting to.
let countWrong = [];
{
  const games = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'games.json'), 'utf8'));
  const active = games.filter(g => g && g.url && g.name && g.status !== 'broken');
  const label = `${Math.floor(active.length / 10) * 10}+`;
  // all-games.html is generated, but include it: if it disagrees, the generated
  // pages are stale and need a regen rather than a sync.
  for (const rel of ['index.html', 'llms.txt', 'manifest.json', 'all-games.html']) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) continue;
    const found = [...new Set(fs.readFileSync(file, 'utf8').match(/\b\d{3}\+/g) || [])];
    const bad = found.filter(f => f !== label);
    if (bad.length) countWrong.push(`${rel} says ${bad.join('/')}`);
  }
  console.log(countWrong.length === 0
    ? `PASS  game count reads "${label}" everywhere (${active.length} listed)`
    : `FAIL  game count should be "${label}" (${active.length} listed):\n  ${countWrong.join('\n  ')}\n  Fix: node scripts/sync-game-count.js`);
}

const failed = broken.size + sitemapBroken.length + legacyMissing.length + countWrong.length;
console.log(`\n${failed === 0 ? 'NO SELF-INFLICTED 404s' : failed + ' ISSUE(S) FOUND'}`);
process.exit(failed ? 1 : 0);
