'use strict';
// 2026-10-04: swaps in new copies of Eggy Car, Magic Tiles 3 and Run 3 (the old ones rated 2.7, 2.2, 2.7),
// cloned from their GitHub sources into NewGames/SHARD/gamelist14.github.io/{slug}/ with the advertising and
// analytics they shipped with taken out:
//   Eggy Car     ubg98/EggyCar      two ubg235 scripts (remote ad loader + GA), the patch/ folder of ad-SDK adapters,
//                                   service-worker registration, and the host's ahrefs/verification junk
//   Magic Tiles  incrediblewebsite  ga.js and ima3.js (Google IMA video ads) were shipped but never loaded; skipped
//   Run 3        lekug.github.io    Google Analytics tag + the st39 "sdk" promo injector
// Every copy also gets a Content-Security-Policy that only lets it talk to our own origin, so anything missed cannot
// phone out. Sources are the clones under _git_clones (see the clone commands in the session notes).
//   node scripts/build-replacements.js
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const CLONES = path.join(ROOT, '_git_clones');
const OUT = path.join(ROOT, 'NewGames/SHARD/gamelist14.github.io');
const CSP = `<meta http-equiv="Content-Security-Policy" content="connect-src 'self' data: blob:">`;

function copyDir(from, to, skipRoot = [], depth = 0) {
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name === '.git') continue;
    if (depth === 0 && skipRoot.some(s => (s instanceof RegExp ? s.test(e.name) : s === e.name))) continue;
    const s = path.join(from, e.name), d = path.join(to, e.name);
    if (e.isDirectory()) n += copyDir(s, d, skipRoot, depth + 1); else { fs.copyFileSync(s, d); n++; }
  }
  return n;
}
function addCsp(html) {
  if (html.includes('Content-Security-Policy')) return html;
  const m = html.match(/<head\b[^>]*>/i);
  return m ? html.replace(m[0], m[0] + '\n\t' + CSP) : CSP + '\n' + html;
}
const must = (cond, msg) => { if (!cond) throw new Error('anchor missing: ' + msg); };
const GAMES = {
  'Eggy-Car': {
    from: path.join(CLONES, 'ubg98__EggyCar__gh-pages'),
    skip: ['404.html', '408.html', /^ahrefs_/, 'frame.html', 'games235.html', 'ubg235.html', 'sw.js', 'offlineClient.js',
      'appmanifest.json', 'manifest.json', 'patch', 'js'],
    edit(h) {
      for (const tag of ['<script src="js/analytics_ubg_v1_4.js"></script>', '<script src="js/ubg235_client_v1_1.js"></script>']) { must(h.includes(tag), tag); h = h.replace(tag, ''); }
      must(h.includes('<link rel="manifest" href="appmanifest.json" />'), 'manifest link');
      h = h.replace('<link rel="manifest" href="appmanifest.json" />', '');
      h = h.replace(/<meta property="og:[^>]*>\s*/gi, '');
      h = h.replace(/<title>[^<]*<\/title>/i, '<title>Eggy Car</title>');
      // the construct runtime calls this when loaded; with no sw.js shipped it must do nothing
      must(h.includes('</body>'), 'body end');
      return h.replace('</body>', '<script>window.C2_RegisterSW = function () {}; /* ubg: service worker not shipped */</script>\n</body>');
    },
  },
  'Magic-Tiles-3': {
    from: path.join(CLONES, 'incrediblewebsite__magictiles__master'),
    skip: ['.gitattributes', 'ga.js', 'ima3.js'],
    edit(h) { return h.replace(/<title>[^<]*<\/title>/i, '<title>Magic Tiles 3</title>'); },
  },
  'Run-3': {
    from: path.join(CLONES, 'lekug__lekug.github.io__sparse', 'tn6pS9dCf37xAhkJv'),
    skip: [],
    edit(h) {
      const ga = h.match(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]+"><\/script><script>[\s\S]*?<\/script>/);
      must(ga, 'ga tag'); h = h.replace(ga[0], '');
      const sdk = '<script src="https://cdn.jsdelivr.net/gh/st39/sdk@main/api.js"></script>';
      must(h.includes(sdk), 'st39 sdk'); h = h.replace(sdk, '');
      return h;
    },
  },
};

for (const [slug, g] of Object.entries(GAMES)) {
  const dest = path.join(OUT, slug);
  fs.rmSync(dest, { recursive: true, force: true });
  const n = copyDir(g.from, dest, g.skip);
  const f = path.join(dest, 'index.html');
  let h = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
  h = addCsp(g.edit(h));
  fs.writeFileSync(f, h);
  const bytes = (function size(d) { let b = 0; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); b += e.isDirectory() ? size(p) : fs.statSync(p).size; } return b; })(dest);
  console.log(slug.padEnd(14), n, 'files', (bytes / 1048576).toFixed(1), 'MB');
}
