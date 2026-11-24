#!/usr/bin/env node
// Re-host a game whose third-party host died, into the GameList shard.
//
// Games here are not all self-hosted: a number were wired up as a one-line stub
// that iframes somebody else's copy. Those hosts vanish without notice, and when
// one does the game is dead while the stub still answers 200 — which is exactly
// the failure qa-playable.js was written to catch. On 2026-08-14 it reported six:
// four on the deleted tbg95.github.io, two on Google's retired OpenSocial gadget
// proxy.
//
// This is the repair tool. It pulls a real copy into the shard so the game stops
// depending on a stranger's uptime, and strips whatever tracking or advertising
// the source copy carried on the way through.
//
// Usage:
//   node scripts/recover-game.js            # all recoveries below
//   node scripts/recover-game.js Iron-Snout # just one
//
// After it runs the shard has new files, so finish the job with:
//   1. commit + push GameList.github.io
//   2. node scripts/gen-cdn-manifest.js   (re-pins the shard's jsDelivr SHA)
//   3. node scripts/gen-play-shell.js     (rebuilds /g/ shells)
//   4. clear status/statusnote in games.json, then the page generators
//   5. node scripts/qa-playable.js        (confirm, do not assume)

const fs = require('fs');
const path = require('path');
const https = require('https');

const SHARD = 'd:/UBGHyper/GameList.github.io';
const CLONES = 'd:/UBGHyper/_git_clones';

// Two shapes of source.
//
//   gadget: an OpenSocial gadget spec. Google retired the proxy that used to
//     render these, but the spec itself is just an XML wrapper with the whole
//     game HTML inside a CDATA block, and the asset CDNs it points at are still
//     up. Extracting the CDATA gives a working standalone page — the proxy was
//     never doing anything but unwrapping it.
//
//   mirror: a live copy hosted by someone else, fetched file by file. Only for
//     games whose asset list can be fully enumerated; a partial copy is worse
//     than the stub, because it fails halfway into play instead of immediately.
//
//   local: a build already sitting in _git_clones.
const RECOVERIES = {
  // Assets: cdn.jsdelivr.net/gh/MopNop/jello@<pinned sha>. jsDelivr is already
  // this site's own asset CDN post-migration and the SHA is pinned, so this
  // introduces no new dependency and cannot drift.
  'Jelly-Truck': {
    kind: 'gadget',
    url: 'https://cdn.jsdelivr.net/gh/bobydob/JSEngine@32bf8bcf04d4935e382da1d5be96cebb84875700/build/j-tr/jt.xml',
    was: 'images-opensocial.googleusercontent.com (retired gadget proxy)',
  },

  // Assets stay on googleusercontent.b-cdn.net, which net-guard already
  // classifies BENIGN. Carries a GA4 property that is not ours plus an "sdk"
  // that injects a floating promo button — both removed by the strip rules.
  'Eggy-Car': {
    kind: 'gadget',
    url: 'https://googleusercontent.b-cdn.net/eggy-car/ec.xml',
    was: 'google-opensocial.googleusercontent.com (retired gadget proxy)',
  },

  // GameMaker HTML5 build: one script plus five texture pages, and the runtime
  // names all six, so the copy is provably complete. The mirror ships Poki's ad
  // SDK and a cloak script; neither is wanted.
  'Iron-Snout': {
    kind: 'mirror',
    base: 'https://classroom8.github.io/iron-snout/',
    was: 'tbg95.github.io (repo deleted)',
    files: [
      'html5game/IronSnout.js',
      'html5game/IronSnout_texture_0.png',
      'html5game/IronSnout_texture_1.png',
      'html5game/IronSnout_texture_2.png',
      'html5game/IronSnout_texture_3.png',
      'html5game/IronSnout_texture_4.png',
    ],
  },

  // The one game here whose asset list is not printed anywhere: motox3m2.min.js
  // builds every path at runtime from "assets/levels/" + name, so the bundle
  // names directories and nothing else. The list in recover-manifest.json was
  // recovered by probing the mirror with the file names from Moto3XM — already
  // vendored locally, same engine, same layout — and keeping the 200s: 83 of 99
  // hit, the misses being v1-only art and the lib folder, which v2 calls
  // assets/lib rather than assets/box2dweb. The nine libs are named directly in
  // its index.html, so those are certain.
  //
  // Its ima3.js is a real 353 KB Google IMA build that talks to
  // pagead2.googlesyndication.com and pubads.g.doubleclick.net — both on the
  // PROHIBITED list — so it is stripped rather than copied. Nothing in the game
  // bundle references google.ima, and gameBreakBeta.js (which defines the
  // showNextAd the game does call) only pushes onto an adsbygoogle array that
  // stays an inert plain array with no loader present.
  'Moto3XM-2': {
    kind: 'mirror',
    base: 'https://classroom8.github.io/moto-x3m-2/',
    was: 'tbg95.github.io (repo deleted)',
    files: require('./recover-manifest.json')['Moto3XM-2'],
  },

  // Already cloned, so this one becomes fully self-hosted with no third-party
  // asset host at all — the best outcome available of the four.
  'Idle-Mining-Empire': {
    kind: 'local',
    from: path.join(CLONES,
      'fork-so-the-site-i-take-wont-be-deleted__bulbasaurchat.github.io__main',
      'games/idle-mining-empire-main/idle-mining-empire-main'),
    was: 'tbg95.github.io (repo deleted)',
  },
};

// Advertising and analytics that rides along in a vendored copy.
//
// gen-play-shell.js already strips the Google analytics family when it builds
// the /g/ shell, but it does not know about these two, and leaving them in the
// shard means the next person to look at the file sees a game that phones an ad
// network. Strip at the source instead, so the shard copy is clean on its own.
//
// As with the GameDistribution SDK, removal has to leave a no-op behind: the
// game keeps calling into the SDK it was built against, and an undefined symbol
// throws mid-play.
const STRIPS = [
  {
    name: 'Poki ad SDK',
    test: /poki-sdk/i,
    // Both the core SDK and the game's own patch shim that wraps it, plus the
    // spinner artwork the SDK's markup pulls from a.poki.com. That container is
    // never shown once the SDK is gone, but a CSS background is still fetched
    // the moment the rule matches, so the URL goes too.
    apply: html => html
      .replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*poki-sdk[^"']*["'][^>]*>\s*<\/script>/gi, '')
      .replace(/url\(\s*['"]?https?:\/\/[^)'"]*poki\.com[^)'"]*['"]?\s*\)/gi, 'none'),
    // A named-method stub is too brittle here: Iron Snout's loader calls
    // gameLoadingProgress on every GameMaker load tick, and a missing method
    // throws before the canvas ever appears. Different Poki builds call
    // different subsets, so the fallback answers ANY method with a resolved
    // promise and only names the two whose return value the callers branch on.
    shim: '<script>/* ubg: Poki ad SDK removed, no-op shim */' +
          'window.PokiSDK=new Proxy({' +
          'init:function(){return Promise.resolve()},' +
          'rewardedBreak:function(){return Promise.resolve(false)}' +
          '},{get:function(t,k){return k in t?t[k]:function(){return Promise.resolve()}}});</script>',
  },
  {
    name: 'cloak script',
    test: /\/cloak\.js/i,
    apply: html => html.replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*cloak\.js["'][^>]*>\s*<\/script>/gi, ''),
  },
  {
    name: 'Google Analytics',
    test: /googletagmanager\.com|google-analytics\.com/i,
    // The tag loader, and the inline gtag() bootstrap that follows it.
    apply: html => html
      .replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*(?:googletagmanager|google-analytics)\.com[^"']*["'][^>]*>\s*<\/script>/gi, '')
      .replace(/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?gtag\s*\(\s*['"]config['"][\s\S]*?<\/script>/gi, ''),
    shim: '<script>/* ubg: third-party analytics stubbed */window.dataLayer=window.dataLayer||[];' +
          'window.gtag=window.gtag||function(){};window.ga=window.ga||function(){};</script>',
  },
  {
    name: 'floating promo injector',
    test: /st39\/sdk/i,
    apply: html => html.replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*st39\/sdk[^"']*["'][^>]*>\s*<\/script>/gi, ''),
  },
  {
    name: 'Y8 portal SDK',
    // 317 KB of portal SDK that reaches googleads.g.doubleclick.net,
    // imasdk.googleapis.com, t.y8.com and account.y8.com — ads plus account
    // tracking. It is injected by an IIFE that builds its own <script> element,
    // so removing script tags does nothing; the src literal has to be replaced.
    // gen-play-shell.js already solves this shape the same way for CSGO.
    //
    // Pointing it at an empty data: URI rather than "" matters: an empty src
    // resolves to the page itself, so the browser would fetch the HTML and try
    // to execute it as JavaScript.
    //
    // Nothing needs stubbing. The SDK's entry points sit inside
    // window.idAsyncInit, which only the SDK ever calls, and the game merely
    // addEventListener's for "sdk_inited" rather than waiting on it.
    test: /y8sdk\.js/i,
    apply: html => html
      .replace(/["']y8sdk\.js["']/g, '"data:application/javascript,"')
      // The commented-out remote loader above it still names cdn.y8.com, which
      // would show up in every host audit as a dependency the game does not have.
      .replace(/^.*\/\/\s*js\.src\s*=.*y8\.com.*$/gm, ''),
  },
  {
    name: 'Google IMA ad SDK',
    // Matches the locally-served copy (src="ima3.js") as well as the usual
    // imasdk.googleapis.com one. No stub: nothing in these games touches
    // google.ima, and inventing a fake VAST pipeline would be more code than
    // the removal saves.
    test: /ima3\.js|imasdk\.googleapis\.com/i,
    apply: html => html.replace(
      /<script\b[^>]*\bsrc\s*=\s*["'][^"']*(?:ima3\.js|imasdk\.googleapis\.com[^"']*)["'][^>]*>\s*<\/script>/gi, ''),
  },
];

function get(url, binary = false) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'user-agent': 'Mozilla/5.0 UBGHyper-recover' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, binary));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

/** Run every strip rule that matches, and inject each rule's shim once. */
function clean(html, slug) {
  const applied = [];
  for (const rule of STRIPS) {
    if (!rule.test.test(html)) continue;
    html = rule.apply(html);
    if (rule.shim && !html.includes(rule.shim)) {
      // Shims must precede the game code that calls into them.
      const head = html.match(/<head\b[^>]*>/i);
      html = head ? html.replace(head[0], head[0] + '\n' + rule.shim) : rule.shim + '\n' + html;
    }
    applied.push(rule.name);
  }
  if (applied.length) console.log(`    stripped: ${applied.join(', ')}`);
  else console.log('    stripped: nothing (source was already clean)');
  return html;
}

// Chrome from the site the build was scraped off, not part of the game: error
// pages, the host portal's own nav pages, CI config. Verified unreferenced by
// both index.html and game.js before being listed here — js/, patch/, fonts/
// and branding/ all ARE referenced and must be copied.
//
// sw.js earns its place for a second reason: a service worker shipped inside a
// game folder registers against that path on our own origin, so an inert stray
// copy is still worth not serving.
const COPY_SKIP = new Set([
  '.git', '.gitlab-ci.yml', '.github',
  '404.html', '408.html', 'null.html', 'frame.html',
  'games235.html', 'ubg235.html',
  'appmanifest.json', 'sw.js', 'git-update.txt',
]);

function copyDir(from, to, depth = 0) {
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    // Only filter at the root: a game's own assets may legitimately be named
    // anything once you are inside media/ or js/.
    if (depth === 0 && COPY_SKIP.has(e.name)) continue;
    if (e.name === '.git') continue;
    const s = path.join(from, e.name), d = path.join(to, e.name);
    if (e.isDirectory()) n += copyDir(s, d, depth + 1);
    else { fs.copyFileSync(s, d); n++; }
  }
  return n;
}

async function recover(slug, spec) {
  const dest = path.join(SHARD, slug);
  if (!fs.existsSync(dest)) throw new Error(`shard folder missing: ${dest}`);
  console.log(`\n${slug}  (was: ${spec.was})`);

  // Keep the stub that is about to be replaced. Every folder here already has an
  // originals/ holding its cover art, and a dead stub is still the only record
  // of where the game used to come from.
  const entry = path.join(dest, 'index.html');
  if (fs.existsSync(entry)) {
    const keep = path.join(dest, 'originals');
    fs.mkdirSync(keep, { recursive: true });
    fs.copyFileSync(entry, path.join(keep, 'index.dead-stub.html'));
  }

  if (spec.kind === 'gadget') {
    const xml = await get(spec.url);
    const m = xml.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
    if (!m) throw new Error('no CDATA block in gadget spec');
    let html = m[1].trim();
    if (!/<\/html>/i.test(html)) throw new Error('CDATA does not contain a complete document');
    html = clean(html, slug);
    fs.writeFileSync(entry, html);
    console.log(`    wrote index.html (${(html.length / 1024).toFixed(1)} KB, assets stay on their CDN)`);
    return;
  }

  if (spec.kind === 'mirror') {
    let html = await get(spec.base);
    html = clean(html, slug);
    fs.writeFileSync(entry, html);
    let bytes = html.length;
    for (const rel of spec.files) {
      const buf = await get(new URL(rel, spec.base).href, true);
      const out = path.join(dest, rel);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buf);
      bytes += buf.length;
      console.log(`    ${rel}  ${(buf.length / 1024).toFixed(0)} KB`);
    }
    console.log(`    ${spec.files.length + 1} files, ${(bytes / 1048576).toFixed(1)} MB — fully self-hosted`);
    return;
  }

  if (spec.kind === 'local') {
    if (!fs.existsSync(spec.from)) throw new Error(`source missing: ${spec.from}`);
    const n = copyDir(spec.from, dest);
    if (!fs.existsSync(entry)) throw new Error('copied build has no index.html at its root');
    const html = clean(fs.readFileSync(entry, 'utf8'), slug);
    fs.writeFileSync(entry, html);
    console.log(`    copied ${n} files — fully self-hosted`);
    return;
  }

  throw new Error(`unknown kind: ${spec.kind}`);
}

(async () => {
  const only = process.argv[2];
  const todo = only ? { [only]: RECOVERIES[only] } : RECOVERIES;
  if (only && !RECOVERIES[only]) {
    console.error(`No recovery defined for "${only}". Known: ${Object.keys(RECOVERIES).join(', ')}`);
    process.exit(1);
  }

  const failed = [];
  for (const [slug, spec] of Object.entries(todo)) {
    try { await recover(slug, spec); }
    catch (e) { console.log(`\n${slug}  FAILED: ${e.message}`); failed.push(`${slug}: ${e.message}`); }
  }

  console.log(`\n${Object.keys(todo).length - failed.length}/${Object.keys(todo).length} recovered`);
  if (failed.length) { failed.forEach(f => console.log(`  ${f}`)); process.exit(1); }
  console.log('\nNext: push the shard, then gen-cdn-manifest.js -> gen-play-shell.js -> games.json -> qa-playable.js');
})();
