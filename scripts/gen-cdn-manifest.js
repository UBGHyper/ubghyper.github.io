#!/usr/bin/env node
// Build the jsDelivr migration manifest.
//
// Every game resolves to a real folder in one of the shard repos. This script
// works out which, then decides whether that game's assets can be served by
// jsDelivr. Two hard constraints from testing against the live CDN:
//
//   1. jsDelivr serves HTML as `Content-Type: text/plain` on purpose, to stop
//      being used as a web host. So a game's ENTRY index.html can never come
//      from jsDelivr — it has to be served from our own origin, with a <base>
//      tag pointing the relative asset URLs at the CDN.
//   2. jsDelivr refuses files over 20MB with a 403 (verified: Subway Surfers'
//      27.9MB .data.unityweb and 25.7MB .wasm.code.unityweb both 403, while the
//      521KB framework file returns 200). A game with ANY oversized required
//      asset therefore cannot be migrated — it needs object storage instead.
//
// Output: scripts/cdn-manifest.json + a summary table on stdout. Kept in
// scripts/ rather than assets/ because nothing loads it at runtime — it's a
// build input for the <base href> injector, and assets/ deploys publicly.

const fs = require('fs');
const path = require('path');

const ROOT       = 'd:/UBGHyper';
const SITE       = path.join(ROOT, 'UBGHyper.github.io');
const GAMELIST   = path.join(ROOT, 'GameList.github.io');
const SHARD_DIR  = path.join(ROOT, 'GamesLists(Active)');
const OUT        = path.join(__dirname, 'cdn-manifest.json');

const JSD        = 'https://cdn.jsdelivr.net/gh';
const MAX_BYTES  = 20 * 1024 * 1024;   // jsDelivr /gh/ per-file ceiling

// owner per shard repo. GameList went public 2026-08-09.
const REPO = {
  'GameList.github.io':  { owner: 'UBGHyper',            local: GAMELIST },
  'gamelist2.github.io': { owner: 'freeonlinewebtools' },
  'gamelist3.github.io': { owner: 'freeonlinewebtools' },
  'gamelist4.github.io': { owner: 'freeonlinewebtools' },
  'gamelist5.github.io': { owner: 'freeonlinewebtools' },
  'gamelist6.github.io': { owner: 'freeonlinewebtools' },
  'gamelist7.github.io': { owner: 'freeonlinewebtools' },
  'gamelist8.github.io': { owner: 'freeonlinewebtools' },
  // 9 used to have no local clone and a hand-pinned SHA (Minecraft only); it now has a clone
  // (Angry-Birds-2 was added 2026-10-03) so it pins from HEAD like the rest.
  'gamelist9.github.io': { owner: 'freeonlinewebtools' },
  // 2026-10-03: 10 holds the staged self-hosted builds (Apotheon, Brotato, ...); 11-13 are the
  // new shards for the GameReady batch (13 = the two multi-GB games, Fallout and Amanda).
  'gamelist10.github.io': { owner: 'freeonlinewebtools' },
  'gamelist11.github.io': { owner: 'freeonlinewebtools' },
  'gamelist12.github.io': { owner: 'freeonlinewebtools' },
  'gamelist13.github.io': { owner: 'freeonlinewebtools' },
  // 2026-10-04: fresh ad-free Eggy Car, Magic Tiles 3 and Run 3.
  'gamelist14.github.io': { owner: 'freeonlinewebtools' },
  'gamelist15.github.io': { owner: 'freeonlinewebtools' },   // Granny 3 (2026-10), How To Fish, Among Us Legacy
  'gamelist16.github.io': { owner: 'freeonlinewebtools' },   // Among Us (latest)
  'gamelist17.github.io': { owner: 'freeonlinewebtools' },   // 2026-11-15: Aground, Scary Teacher 3D, Steal a Brainrot, Battle Cats (Scratch)...
  'gamelist18.github.io': { owner: 'freeonlinewebtools' },   // 2026-11-15: YouTube Playables batch + Roblox-style obbies, Tung Sahur Horror
};

// Pin every CDN URL to a commit SHA, not a branch. jsDelivr caches a branch ref
// for only 7 days (observed s-maxage=43200) and the ref can move under us, so a
// game silently starts fetching assets it wasn't built against. A SHA is
// immutable and gets cached permanently — which also keeps 22GB of traffic off
// jsDelivr's revalidation path. This is the form the 32 games already migrated
// on this site use (e.g. web-ports/cuphead@c9ff1b6...).
const { execFileSync } = require('child_process');
for (const [repo, meta] of Object.entries(REPO)) {
  if (meta.sha) continue;
  const dir = meta.local || path.join(SHARD_DIR, repo);
  try {
    meta.sha = execFileSync('git', ['-C', dir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    console.warn(`  warn: no SHA for ${repo} (no local clone) — falling back to @main`);
    meta.sha = 'main';
  }
}

const games = JSON.parse(fs.readFileSync(path.join(SITE, 'assets/games.json'), 'utf8'))
  .filter(g => g && g.url && g.status !== 'broken');

function localDir(repo, slug) {
  return repo === 'GameList.github.io'
    ? path.join(GAMELIST, slug)
    : path.join(SHARD_DIR, repo, slug);
}

// Walk a game folder, collecting every file with its size.
function walk(dir, base = dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name === '.git') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, base, out);
    else {
      let size = 0;
      try { size = fs.statSync(full).size; } catch { /* unreadable */ }
      out.push({ rel: path.relative(base, full).replace(/\\/g, '/'), size });
    }
  }
  return out;
}

// Where does this game's playable content actually live?
//
// Stubs CHAIN: GameList/Cuphead iframes gamelist8/Cuphead, which is itself a
// one-file stub iframing gamelist2/Cuphead where the real Unity build sits.
// Following only one hop measured those games as tiny "eligible" folders and
// silently under-reported their real size, so walk the chain to its end.
const MAX_HOPS = 6;

function stubTarget(dir) {
  const entry = path.join(dir, 'index.html');
  if (!fs.existsSync(entry)) return null;
  // A stub is tiny by construction; don't slurp a 64MB inlined game to regex it.
  if (fs.statSync(entry).size > 64 * 1024) return null;
  const m = fs.readFileSync(entry, 'utf8').match(/<iframe[^>]+src="(https?:\/\/[^"]+)"/i);
  return m ? m[1] : null;
}

function resolve(g) {
  let repo, slug, route, hops = 0;

  const shardField = g.shard && g.shard.match(/(gamelist\d+\.github\.io)/i);
  if (shardField) { repo = shardField[1]; slug = g.url; route = 'shard-field'; }
  else {
    if (!fs.existsSync(path.join(GAMELIST, g.url, 'index.html')))
      return { repo: null, slug: g.url, route: 'no-folder', hops };
    repo = 'GameList.github.io'; slug = g.url; route = 'self-contained';
  }

  const seen = new Set();
  while (hops < MAX_HOPS) {
    const key = `${repo}/${slug}`;
    if (seen.has(key)) break;            // cycle guard
    seen.add(key);

    const target = stubTarget(localDir(repo, slug));
    if (!target) break;                  // real content, chain ends here

    const gl = target.match(/(gamelist\d+\.github\.io)\/([^/"?#]+)/i);
    if (!gl) return { repo: null, slug, route: 'external', target, hops };

    repo = gl[1]; slug = gl[2]; hops++;
    route = hops > 1 ? `chain-${hops}` : 'stub';
  }
  return { repo, slug, route, hops };
}

const rows = [];
for (const g of games) {
  const r = resolve(g);
  const row = { url: g.url, name: g.name, route: r.route, repo: r.repo, folder: r.slug };

  if (!r.repo) {
    row.status = r.route === 'external' ? 'external' : 'missing';
    row.target = r.target || null;
    rows.push(row);
    continue;
  }

  const dir = localDir(r.repo, r.slug);
  if (!fs.existsSync(dir)) { row.status = 'missing-local'; rows.push(row); continue; }

  const files = walk(dir);
  const over = files.filter(f => f.size > MAX_BYTES);
  const total = files.reduce((a, f) => a + f.size, 0);
  const meta = REPO[r.repo];

  row.files = files.length;
  row.bytes = total;
  row.hops = r.hops;
  row.oversized = over.map(f => ({ rel: f.rel, mb: +(f.size / 1048576).toFixed(1) }));
  row.cdnBase = meta ? `${JSD}/${meta.owner}/${r.repo}@${meta.sha}/${r.slug}/` : null;
  row.entry = files.some(f => f.rel === 'index.html') ? 'index.html' : null;

  // A service worker must be served same-origin as the page that registers it.
  // Under <base href> pointing at the CDN, registration resolves cross-origin
  // and throws, so these games need the SW path pinned back to our own origin.
  row.serviceWorker = files.filter(f => /(^|\/)(service-?worker|sw)\.js$/i.test(f.rel)).map(f => f.rel);

  row.status = over.length ? 'oversized'
             : !meta ? 'unknown-repo'
             : row.serviceWorker.length ? 'needs-sw-fix'
             : 'eligible';
  rows.push(row);
}

// ── Summary ───────────────────────────────────────────────────
const by = k => rows.filter(r => r.status === k);
const gb = n => (n / 1073741824).toFixed(2) + ' GB';
const eligible = by('eligible'), oversized = by('oversized');

console.log(`\nActive games: ${rows.length}\n`);
console.log('  status          games      bytes');
console.log('  ' + '-'.repeat(38));
for (const k of ['eligible', 'needs-sw-fix', 'oversized', 'external', 'missing-local', 'missing', 'unknown-repo']) {
  const list = by(k);
  if (!list.length) continue;
  console.log(`  ${k.padEnd(15)} ${String(list.length).padStart(5)}  ${gb(list.reduce((a, r) => a + (r.bytes || 0), 0)).padStart(9)}`);
}

console.log(`\n  jsDelivr-servable assets: ${gb(eligible.reduce((a, r) => a + r.bytes, 0))} across ${eligible.length} games`);
console.log(`  needs object storage:     ${gb(oversized.reduce((a, r) => a + r.bytes, 0))} across ${oversized.length} games`);

console.log('\n  by route:');
for (const [k, v] of Object.entries(rows.reduce((m, r) => (m[r.route] = (m[r.route] || 0) + 1, m), {})))
  console.log(`    ${k.padEnd(16)} ${v}`);

console.log('\n  games needing object storage (oversized assets):');
for (const r of oversized.sort((a, b) => b.bytes - a.bytes).slice(0, 20))
  console.log(`    ${r.url.padEnd(32)} ${String(r.oversized.length).padStart(2)} file(s), largest ${Math.max(...r.oversized.map(o => o.mb))}MB`);
if (oversized.length > 20) console.log(`    ...and ${oversized.length - 20} more`);

fs.writeFileSync(OUT, JSON.stringify(rows, null, 1));

// Publish the repo -> pinned CDN base map separately. Deriving it from the rows
// would miss any shard with no eligible game — gamelist9 holds only Minecraft and
// has no local clone, so it never appears with a cdnBase, and its thumbnail would
// silently keep resolving to github.io.
const repoBases = {};
for (const [repo, meta] of Object.entries(REPO)) {
  if (meta.sha && meta.sha !== 'main') repoBases[repo] = `${JSD}/${meta.owner}/${repo}@${meta.sha}`;
}
fs.writeFileSync(path.join(__dirname, 'cdn-repos.json'), JSON.stringify(repoBases, null, 1));
console.log(`repo CDN bases -> scripts/cdn-repos.json (${Object.keys(repoBases).length})`);
console.log(`\nmanifest -> ${path.relative(SITE, OUT)}`);
