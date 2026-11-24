#!/usr/bin/env node
/* Catalogue availability check (GROW-007) — run with:
 *     node scripts/qa-games.js              full catalogue
 *     node scripts/qa-games.js --limit 40   first N games
 *     node scripts/qa-games.js --slug Slope one game
 *
 * Black-box: hits the DEPLOYED URLs, so it tests what players actually get
 * rather than a local checkout. Every request goes through net-guard, so it
 * cannot touch an analytics, ad or affiliate host.
 *
 * WHAT THIS PROVES, AND WHAT IT DOES NOT
 * It proves a game's files are reachable — folder serves, thumbnail exists, and
 * for wrapper games that the nested target is reachable too. That catches dead
 * games, moved shards and missing art.
 *
 * It does NOT prove the game is playable. A 200 is not proof a Unity build
 * boots, that controls respond, or that a save works. The measurement spec is
 * explicit: do not count a load as proof of playability. Verifying that needs a
 * real browser (GROW-004). Everything here is reachability only, and the report
 * says so.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const guard = require('./lib/net-guard');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://ubghyper.github.io';
const SHARD_DEFAULT = 'GameList.github.io';
const gameBase = g => { const s = (g && g.shard) || SHARD_DEFAULT; return s.includes('://') ? s.replace(/\/$/, '') : `${SITE_URL}/${s}`; };
const gameFolder = g => `${gameBase(g)}/${g.url}/`;
const gameThumb = g => (g && g.image ? `${gameFolder(g)}${g.image}` : null);

const args = process.argv.slice(2);
const limitArg = args.indexOf('--limit');
const slugArg = args.indexOf('--slug');
const LIMIT = limitArg >= 0 ? parseInt(args[limitArg + 1], 10) : Infinity;
const ONLY = slugArg >= 0 ? args[slugArg + 1] : null;
const CONCURRENCY = 6;          // polite: GitHub Pages rate-limits aggressive clients
const TIMEOUT_MS = 20000;

let games = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'games.json'), 'utf8'))
  .filter(g => g && g.url && g.name && g.status !== 'broken');
if (ONLY) games = games.filter(g => g.url === ONLY);
games = games.slice(0, LIMIT);

async function head(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await guard.guardedFetch(url, { signal: ctrl.signal });
    return { status: res.status, ok: res.ok, res };
  } catch (e) {
    return { status: 0, ok: false, error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally {
    clearTimeout(t);
  }
}

/** Wrapper games iframe another shard; a 200 on the wrapper says nothing about the game. */
function nestedTarget(html, baseUrl) {
  const m = html && html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (!m) return null;
  try { return new URL(m[1], baseUrl).toString(); } catch (e) { return null; }
}

async function checkGame(g) {
  const out = { name: g.name, slug: g.url, shard: g.shard ? 'shard' : 'GameList', issues: [] };
  const folder = gameFolder(g);

  const r = await head(folder);
  out.folderStatus = r.status;
  if (!r.ok) {
    out.issues.push(`folder ${r.status || r.error}`);
    return out;                                   // nothing else is meaningful
  }

  let html = '';
  try { html = await r.res.text(); } catch (e) {}
  out.bytes = html.length;
  if (html.length < 200) out.issues.push(`folder body only ${html.length}b`);

  // Every external host the hosted copy reaches out to. Some games ship with
  // the original developer's ad and tracking stack baked in — those run inside
  // our page, earn someone else money, and contradict the promise that the
  // player carries no ads. Worth an inventory, not just a pass/fail.
  out.thirdParty = [];
  const hosts = new Set();
  for (const m of html.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)) {
    hosts.add(m[1].toLowerCase().replace(/^www\./, ''));
  }
  for (const h of hosts) {
    const verdict = guard.classify(h);
    if (!verdict.allowed) out.thirdParty.push({ host: h, category: verdict.category });
  }
  if (out.thirdParty.some(t => t.category === 'ads' || t.category === 'analytics')) {
    out.issues.push('embeds third-party ads/tracking');
  }

  // Follow one level of nesting — this is where dead games actually hide.
  const inner = nestedTarget(html, folder);
  if (inner) {
    out.nested = inner;
    let innerHost = '';
    try { innerHost = new URL(inner).hostname; } catch (e) {}
    if (!guard.classify(innerHost).allowed) {
      // Not a failure: the guard is doing its job. Record it as an opaque
      // third-party frame we cannot verify, which is exactly the Class C case.
      out.nestedStatus = 'not-checked';
      out.issues.push(`nested frame on unverifiable host (${innerHost})`);
    } else {
      const r2 = await head(inner);
      out.nestedStatus = r2.status;
      if (!r2.ok) out.issues.push(`nested ${r2.status || r2.error}`);
    }
  }

  const thumb = gameThumb(g);
  if (!thumb) {
    out.issues.push('no image field');
  } else {
    const r3 = await head(thumb);
    out.thumbStatus = r3.status;
    if (!r3.ok) out.issues.push(`thumb ${r3.status || r3.error}`);
  }
  return out;
}

(async () => {
  console.log(`Checking ${games.length} games (reachability only — not playability)\n`);
  const results = [];
  let done = 0;
  const queue = games.slice();

  async function worker() {
    while (queue.length) {
      const g = queue.shift();
      const r = await checkGame(g);
      results.push(r);
      done++;
      if (done % 25 === 0 || done === games.length) {
        process.stdout.write(`  ${done}/${games.length} checked, ${results.filter(x => x.issues.length).length} with issues\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const bad = results.filter(r => r.issues.length).sort((a, b) => a.name.localeCompare(b.name));
  const deadFolder = results.filter(r => r.issues.some(i => i.startsWith('folder')));
  const deadNested = results.filter(r => r.issues.some(i => /^nested \d|^nested (timeout|fetch)/.test(i)));
  const badThumb = results.filter(r => r.issues.some(i => i.startsWith('thumb') || i === 'no image field'));
  const adEmbeds = results.filter(r => r.issues.includes('embeds third-party ads/tracking'));
  const opaque = results.filter(r => r.issues.some(i => i.startsWith('nested frame on unverifiable')));

  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESULT  ${results.length - deadFolder.length - deadNested.length}/${results.length} reachable`);
  console.log('='.repeat(60));
  console.log(`  dead game folder            : ${deadFolder.length}`);
  console.log(`  dead nested target          : ${deadNested.length}`);
  console.log(`  missing thumbnail           : ${badThumb.length}`);
  console.log(`  embeds third-party ads      : ${adEmbeds.length}   <-- runs someone else's ads inside our page`);
  console.log(`  opaque nested frame         : ${opaque.length}   <-- cannot be verified without a browser`);

  const broken = [...new Set([...deadFolder, ...deadNested, ...badThumb])]
    .sort((a, b) => a.name.localeCompare(b.name));
  if (broken.length) {
    console.log(`\nBROKEN — needs fixing`);
    console.log(`${'GAME'.padEnd(38)}${'SHARD'.padEnd(10)}ISSUES`);
    console.log('-'.repeat(78));
    for (const r of broken) {
      console.log(r.name.slice(0, 37).padEnd(38) + r.shard.padEnd(10) +
        r.issues.filter(i => !i.startsWith('nested frame on unverifiable') && i !== 'embeds third-party ads/tracking').join('; '));
    }
  }
  if (adEmbeds.length) {
    console.log(`\nGAMES SERVING SOMEONE ELSE'S ADS`);
    console.log(`${'GAME'.padEnd(38)}HOSTS`);
    console.log('-'.repeat(78));
    for (const r of adEmbeds.sort((a, b) => a.name.localeCompare(b.name))) {
      console.log(r.name.slice(0, 37).padEnd(38) +
        r.thirdParty.filter(t => t.category === 'ads' || t.category === 'analytics').map(t => t.host).join(', '));
    }
  }

  const reportPath = path.join(ROOT, 'data', 'game-availability.json');
  try {
    fs.writeFileSync(reportPath, JSON.stringify({
      checkedAt: new Date().toISOString(),
      note: 'Reachability only. A 200 does not prove the game is playable — that needs a browser (GROW-004).',
      total: results.length, reachable: results.length - bad.length, results,
    }, null, 2), 'utf8');
    console.log(`\nFull report: data/game-availability.json (private)`);
  } catch (e) { console.log(`\ncould not write report: ${e.message}`); }

  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('ERROR ' + e.message); process.exit(1); });
