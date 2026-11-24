#!/usr/bin/env node
// Emit the play shells: one small index.html per game, served from our own
// origin, with a <base href> pointing every relative asset URL at jsDelivr.
//
// Why the entry HTML has to live here and not on the CDN: jsDelivr serves HTML
// as `Content-Type: text/plain` deliberately, so a browser will never execute a
// game's index.html fetched from it. Everything else in the folder — .js, .wasm,
// .unityweb, images — it serves with correct types and `Access-Control-Allow-
// Origin: *`. So we host the few KB of HTML and let the CDN carry the ~23GB.
//
// Output goes to /g/{slug}/ in this repo, so the Render site already deployed
// from it serves the shells with no extra infrastructure. They must not be
// indexed — they are iframe targets, not destinations, and /games/{slug}.html
// is the page we want ranking — but that is enforced per-page with a noindex
// meta, never a robots.txt Disallow. See forceNoindex for why.
//
// Usage: node scripts/gen-play-shell.js [outDir]

const fs = require('fs');
const path = require('path');
const { stripInjected } = require('./strip-injected-ads.js'); // gn-math sidebar ads + pasted AdSense units

const ROOT      = 'd:/UBGHyper';
const GAMELIST  = path.join(ROOT, 'GameList.github.io');
const SHARD_DIR = path.join(ROOT, 'GamesLists(Active)');
const SITE_DIR  = path.resolve(__dirname, '..');
const MANIFEST  = path.join(__dirname, 'cdn-manifest.json');
// Shells live in this repo under /g/ so the Render site already deployed from it
// serves them. A second host would be another domain to get past school filters
// for no gain, and same-origin beats today's cross-origin hop to the shards.
const OUT       = process.argv[2] || path.join(SITE_DIR, 'g');

// A game whose entry HTML is itself enormous (everything base64-inlined) gains
// nothing from a CDN base and would make us serve tens of MB per play. Those
// are held back for object storage instead.
const MAX_ENTRY = 2 * 1024 * 1024;

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

// Some game pages hard-code absolute github.io URLs to our own shards: all ~190 Flash games load
// `https://ubghyper.github.io/GameList.github.io/ruffle/ruffle.js` and their .swf that way. The
// <base> never touches an absolute URL, so on the Render host (where github.io is blocked at
// school) those games failed to start (2026-10-23). Point each at the shard's pinned jsDelivr copy.
// Only real asset files are rewritten: an .html page or a folder URL would come back from
// jsDelivr as text/plain and never run, so those are left as they are.
const SHARD_REPOS = fs.existsSync(path.join(__dirname, 'cdn-repos.json'))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, 'cdn-repos.json'), 'utf8')) : {};
const REPO_BY_LOWER = Object.fromEntries(Object.keys(SHARD_REPOS).map(r => [r.toLowerCase(), r]));
const SW_OK = new Set(['Sandboxels', 'Google-Feud', 'Block-Blast', 'Protektor', 'LastBreath',
  'Candy-Jump', 'Bridd-Jump', 'SonicExe', 'Andys-Apple-Farm']);
const SW_SHIM ='<script>try{var sw=navigator.serviceWorker;if(sw)sw.register=function(){return Promise.reject(new Error("ubg: service worker disabled in play shell"))}}catch(e){}</script>';

function rewriteOwnGithubUrls(html) {
  let hits = 0;
  html = html.replace(/https?:\/\/(?:ubghyper|freeonlinewebtools)\.github\.io\/([A-Za-z0-9.-]+)\/([^"'\s<>)?#]*)/gi, (m, repo, rest) => {
    const r = REPO_BY_LOWER[repo.toLowerCase()];
    if (!r || !/\.[A-Za-z0-9]{1,8}$/.test(rest) || /\.html?$/i.test(rest)) return m;
    hits++;
    return `${SHARD_REPOS[r]}/${rest}`;
  });
  return { html, hits };
}

// YouTube Playables games load YouTube's SDK stand-in from bubbls/youtube-playables. On 2025-08-23
// (commit 5a8d661b, by genizy) an obfuscated block was appended to its ytgame.js that fetches
// "/pages/home.html" from the host site and, unless it finds "The Marz Library", sends the page to
// marzlib.cc; it also blanks the console. Found 2026-11-14. Loaded from @main (jsDelivr or githack),
// whoever controls that repo controls code on our origin, so every reference is pinned to the last
// clean commit, which is byte-identical to the current file minus the appended block.
const PLAYABLES_SDK_CLEAN = 'https://cdn.jsdelivr.net/gh/bubbls/youtube-playables@bd56fc0f1432d00b5a31210a2e577f8250d1ed8d/ytgame.js';
function pinPlayablesSdk(html) {
  let hits = 0;
  html = html.replace(/https?:\/\/(?:cdn\.jsdelivr\.net\/gh\/bubbls\/youtube-playables@[^\/"'\s]+|(?:raw|rawcdn)\.githack\.com\/bubbls\/youtube-playables\/[^\/"'\s]+|raw\.githubusercontent\.com\/bubbls\/youtube-playables\/[^\/"'\s]+)\/ytgame\.js/gi,
    m => { if (m === PLAYABLES_SDK_CLEAN) return m; hits++; return PLAYABLES_SDK_CLEAN; });
  return { html, hits };
}

// bubbls/UGS-Assets merge.js joins split game files. At @main (2026-11) it draws a loading box with
// links to gn-math.dev and a "UGS" Google Doc; a click during loading navigated the game frame to
// that doc (seen on Goblin Goopmaxxing and Rogue Sergeant), and @main can change at any time.
// ac5cdfc is the same API (window.fileMergerConfig: files/basePath/debug) with no links.
const UGS_MERGE_CLEAN = 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@ac5cdfc0042aca584e72619375b4aca948a9243c/merge.js';
function pinMergeJs(html) {
  let hits = 0;
  html = html.replace(/https?:\/\/(?:cdn\.jsdelivr\.net\/gh\/bubbls\/UGS-Assets@[^\/"'\s]+|(?:raw|rawcdn)\.githack\.com\/bubbls\/UGS-Assets\/[^\/"'\s]+|raw\.githubusercontent\.com\/bubbls\/UGS-Assets\/[^\/"'\s]+)\/merge\.js/gi,
    m => { if (m === UGS_MERGE_CLEAN) return m; hits++; return UGS_MERGE_CLEAN; });
  return { html, hits };
}

function localDir(repo, folder) {
  return repo === 'GameList.github.io'
    ? path.join(GAMELIST, folder)
    : path.join(SHARD_DIR, repo, folder);
}

// <base> only affects elements that come AFTER it, so it must precede every
// resource reference. Insert directly after the <head> tag; when the document
// omits <head> (several of these are bare <html><meta charset>… ), fall back to
// just after <html>, which the parser puts in the implied head anyway.
function injectBase(html, cdnBase, slug) {
  const tag = `<base href="${cdnBase}">`;
  // forceNoindex rewrites an indexable directive in place; we only need to add
  // our own when the document declared none at all.
  const r = forceNoindex(html);
  html = r.html;
  if (r.rewrote) stats.rewroteRobots++;
  const noindex = r.added ? `\n<meta name="robots" content="noindex,nofollow">` : '';
  const block = `\n${tag}${noindex}\n<!-- ubg-play-shell: assets from jsDelivr, entry served same-origin -->`;

  const head = html.match(/<head\b[^>]*>/i);
  if (head) return html.replace(head[0], head[0] + block);

  const htmlTag = html.match(/<html\b[^>]*>/i);
  if (htmlTag) return html.replace(htmlTag[0], htmlTag[0] + block);

  const doctype = html.match(/<!doctype[^>]*>/i);
  if (doctype) return html.replace(doctype[0], doctype[0] + block);

  return block + '\n' + html;
}

// Insert a snippet at the top of the document head, coping with the several
// sources here that omit <head> entirely.
function insertAtHead(html, snippet) {
  const head = html.match(/<head\b[^>]*>/i);
  if (head) return html.replace(head[0], head[0] + snippet);
  const htmlTag = html.match(/<html\b[^>]*>/i);
  if (htmlTag) return html.replace(htmlTag[0], htmlTag[0] + snippet);
  const doctype = html.match(/<!doctype[^>]*>/i);
  if (doctype) return html.replace(doctype[0], doctype[0] + snippet);
  return snippet + '\n' + html;
}

const TRACKER_HOST = /googletagmanager\.com|google-analytics\.com|googlesyndication\.com|doubleclick\.net|analytics\.google\.com/i;

// Strip third-party analytics and ad SDKs out of vendored games.
//
// Four of these games ship someone else's tracking: BASEBALL-BROS, Dadish and
// Shell-Shockers each load a GTM container with its own GA4 property ID
// (G-D67EBFNGR6, G-7L02W3ZMS5, G-79NWRZXYCB) and CSGO loads classic
// analytics.js. Served from our origin that means a second GA configuration
// surface on our own pages, which is exactly what this site bans GTM for — it
// silently double-counts page views — plus it hands our traffic to whoever owns
// those properties.
//
// Two removals are needed because the two shapes differ. The gtag ones are
// <script src=...> tags. CSGO's is an inline IIFE that BUILDS its own script
// element from a URL string, so deleting script tags does nothing — the URL
// literal has to be emptied instead.
//
// What replaces them is a no-op shim, not nothing. Game code goes on calling
// gtag()/ga() after the SDK is gone, and an undefined function would throw
// mid-game. Same approach already used for the GameDistribution ad SDK.
function stripTrackers(html) {
  let hits = 0;

  html = html.replace(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi,
    (m, src) => { if (TRACKER_HOST.test(src)) { hits++; return ''; } return m; });

  // Match ANY quoted literal naming a tracker host, not just ones starting
  // https://. Three other shapes appear in these games and all of them load:
  //   '//www.google-analytics.com/analytics.js'      protocol-relative
  //   ('https://ssl') + '.google-analytics.com/ga.js'  host split by concatenation
  // Requiring a protocol left Flappy-Bird, Hextris and HexGL still reporting to
  // Google — Hextris was calling ga('create','UA-51272720-2').
  html = html.replace(/["'][^"'\n]*["']/g,
    m => { if (TRACKER_HOST.test(m)) { hits++; return "''"; } return m; });

  // preconnect/dns-prefetch to a tracker still performs DNS and a TLS handshake
  // with Google even though it loads nothing.
  html = html.replace(/<link\b[^>]*>/gi,
    m => (/rel\s*=\s*["']?(?:preconnect|dns-prefetch)/i.test(m) && TRACKER_HOST.test(m))
      ? (hits++, '') : m);

  if (hits) {
    html = insertAtHead(html, '\n<script>/* ubg: third-party analytics stubbed */' +
      'window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){};' +
      'window.ga=window.ga||function(){};</script>');
  }
  return { html, hits };
}

// Neutralise third-party wrapper scripts that came with copied game pages (found 2026-11-15).
//
//  - static.itch.io/htmlgame.js: itch.io's hotlink check. It swaps the game for a "You should be
//    using itch.io" page anywhere but itch, so Fear Assessment, Game Inside a Game and Little Runmo
//    showed that notice instead of the (self-hosted) game.
//  - cdn.jsdelivr.net/gh/st39/sdk@main/...: someone's GameMonetize ad SDK copy (sdkjs.js) and a GA
//    loader (ga.js, UA-74658229-1) on an UNPINNED branch - whatever that account pushes would run in
//    our shells. Blade Ball, Candy Crush, Knights Arena and Moto X3M 6 loaded it.
//  - GameMonetize / Google IMA pre-roll video ads (Knights Arena showed a 22 s ad before the game).
//
// Plain tags and string literals are removed here. Knights Arena builds its loader URL inside
// jsjiami-obfuscated code, which no string match can see, so shells that carry any of these get a
// tiny runtime guard as well: a script whose src points at one of these hosts loads an empty data:
// script instead (its onload still fires). The games already test `typeof sdk` before calling the
// ad SDK, so they start normally without it.
const WRAPPER_HOST = /static\.itch\.io\/htmlgame|cdn\.jsdelivr\.net\/gh\/st39\/sdk|gamemonetize\.com|imasdk\.googleapis\.com/i;
const WRAPPER_MARK = /static\.itch\.io\/htmlgame|st39\/sdk|gamemonetize|imasdk\.googleapis|jsjiami/i;
const WRAPPER_GUARD = '<script>/* ubg: block third-party ad, analytics and hotlink-check loaders added at runtime */' +
  '(function(){var bad=/gamemonetize\\.com|st39\\/sdk|imasdk\\.googleapis\\.com|google-analytics\\.com|googletagmanager\\.com|static\\.itch\\.io\\/htmlgame/i,E="data:text/javascript,";' +
  'try{var P=HTMLScriptElement.prototype,d=Object.getOwnPropertyDescriptor(P,"src");' +
  'Object.defineProperty(P,"src",{configurable:true,enumerable:d.enumerable,get:function(){return d.get.call(this)},set:function(v){d.set.call(this,bad.test(String(v))?E:v)}});' +
  'var sa=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(this instanceof HTMLScriptElement&&String(n).toLowerCase()==="src"&&bad.test(String(v)))v=E;return sa.call(this,n,v)};' +
  '}catch(e){}})();</script>';
function stripWrappers(html) {
  if (!WRAPPER_MARK.test(html)) return { html, hits: 0 };
  let hits = 0;
  html = html.replace(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi,
    (m, src) => { if (WRAPPER_HOST.test(src)) { hits++; return ''; } return m; });
  html = html.replace(/["'][^"'\n]*["']/g,
    m => { if (WRAPPER_HOST.test(m)) { hits++; return '"data:text/javascript,"'; } return m; });
  html = insertAtHead(html, '\n' + WRAPPER_GUARD);
  return { html, hits: hits + 1 };
}

// Guarantee the shell is non-indexable.
//
// Adding a meta only when none exists is not enough: four source entries in
// these shards declare an INDEXABLE directive (`content="all"` twice,
// `index,follow` twice), and leaving those alone shipped a crawlable shell.
// An existing directive that does not say noindex is rewritten rather than
// supplemented, so the document never carries two contradictory rules.
//
// Note this is deliberately a meta and NOT a robots.txt Disallow. This repo's
// robots.txt records what happened last time: blocking the path stopped Google
// reading the noindex, so it indexed the bare URLs from links anyway and served
// them empty (12,164 impressions at 0.07% CTR). Google crawls iframe src
// targets, so these shells must stay crawlable for the directive to be seen.
function forceNoindex(html) {
  const meta = html.match(/<meta[^>]*\bname\s*=\s*["']robots["'][^>]*>/i);
  if (!meta) return { html, added: true };
  if (/noindex/i.test(meta[0])) return { html, added: false };
  return {
    html: html.replace(meta[0], '<meta name="robots" content="noindex,nofollow">'),
    added: false, rewrote: true,
  };
}

// Capture an existing base href in any attribute form, including `href =` with
// whitespace and single-quoted values. A narrower `href=` pattern missed a valid
// web-ports base and let ours override it, which would have broken that game.
function existingBase(html) {
  const m = html.match(/<base\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s">]+))/i);
  if (!m) return null;
  return (m[1] ?? m[2] ?? m[3] ?? '').trim();
}

// Usable means: absolute http(s) and a hostname that can actually resolve.
// "https://cdn..." parses fine as a URL but its host is a truncated placeholder,
// which is why those games returned ENOTFOUND rather than 404.
function isUsableBase(href) {
  if (!href || !/^https?:\/\//i.test(href)) return false;
  try {
    const host = new URL(href).hostname;
    return !host.includes('..') && /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(host);
  } catch { return false; }
}

// ── Oversized files (2026-10-17) ─────────────────────────────────────────────
// jsDelivr refuses files over 20 MB, so a game holding one used to get no shell and loaded from github.io,
// which most school filters block. scripts/split-oversized.js cuts those files into <=19 MB parts in the
// ubg-parts repos; parts-manifest.json says where. Such a game gets a shell anyway, carrying partsShim():
// fetch() and XMLHttpRequest calls for an oversized file are answered with its parts, fetched and joined.
// Not covered: a file loaded by <script src> (no request to intercept) - those games stay off the list.
const PARTS = (() => { try { return require('./parts-manifest.json'); } catch { return { pins: {}, games: {} }; } })();
// PARTS_BASE=http://localhost:PORT/ overrides the CDN for a local test of unpushed parts.
function partsBaseFor(url) {
  const e = PARTS.games[url];
  if (!e) return null;
  if (Object.keys(e.parts).some(rel => /\.m?js$/i.test(rel))) return null;
  if (process.env.PARTS_BASE) return process.env.PARTS_BASE.replace(/\/?$/, '/') + e.repo + '/' + e.prefix;
  const pin = PARTS.pins[e.repo];
  return pin ? `https://cdn.jsdelivr.net/gh/freeonlinewebtools/${e.repo}@${pin}/${e.prefix}` : null;
}
function partsShim(gameBase, partsBase, parts) {
  const map = {};
  for (const [rel, p] of Object.entries(parts)) map[rel] = { n: p.n, type: p.type };
  return '<script>/* ubg-parts: files over jsDelivr\'s 20 MB limit are fetched as parts and joined */(function(){' +
    'var GAME=' + JSON.stringify(gameBase) + ',PARTS=' + JSON.stringify(partsBase) + ',MAP=' + JSON.stringify(map) + ';' +
    'var g=new URL(GAME),gp=g.pathname;' +
    'function relOf(u){try{var x=new URL(u,document.baseURI);if(x.origin!==g.origin||x.pathname.indexOf(gp)!==0)return null;' +
      'var r=decodeURIComponent(x.pathname.slice(gp.length));return Object.prototype.hasOwnProperty.call(MAP,r)?r:null}catch(e){return null}}' +
    'var nf=window.fetch.bind(window),cache={};' +
    'function joined(rel){if(!cache[rel]){var m=MAP[rel],ps=[];for(var i=1;i<=m.n;i++)ps.push(nf(PARTS+rel+".p"+("00"+i).slice(-3)).then(function(r){if(!r.ok)throw new Error("part HTTP "+r.status);return r.blob()}));' +
      'cache[rel]=Promise.all(ps).then(function(b){return new Blob(b,{type:m.type})});cache[rel].catch(function(){delete cache[rel]})}return cache[rel]}' +
    'window.fetch=function(input,init){var u=typeof input==="string"?input:(input&&input.url)||String(input);var rel=relOf(u);' +
      'if(!rel)return nf(input,init);return joined(rel).then(function(b){return new Response(b,{status:200,headers:{"Content-Type":MAP[rel].type,"Content-Length":String(b.size)}})})};' +
    'var X=window.XMLHttpRequest;' +
    'function P(){var x=new X(),d=null,h=[],o=x.open,sh=x.setRequestHeader,se=x.send;' +
      'x.open=function(m,u){var rel=relOf(String(u));if(rel){d={m:m,rel:rel};return}d=null;return o.apply(x,arguments)};' +
      'x.setRequestHeader=function(n,v){if(d){h.push([n,v]);return}return sh.call(x,n,v)};' +
      'x.send=function(body){if(!d)return se.call(x,body);var dd=d;joined(dd.rel).then(function(b){o.call(x,dd.m,URL.createObjectURL(b),true);' +
        'h.forEach(function(p){try{sh.call(x,p[0],p[1])}catch(e){}});se.call(x,body)},function(){try{x.dispatchEvent(new Event("error"))}catch(e){}})};' +
      'return x}' +
    'P.prototype=X.prototype;["UNSENT","OPENED","HEADERS_RECEIVED","LOADING","DONE"].forEach(function(k){P[k]=X[k]});window.XMLHttpRequest=P;' +
    '})();</script>';
}

const stats = { written: 0, partsShims: 0, partsGames: [], keptTheirBase: 0, replacedBadBase: 0, rewroteRobots: 0, trackersStripped: 0, trackerGames: [], adsStripped: 0, adGames: [], heavyEntry: 0, noEntry: 0, skipped: 0, errors: [] };
const written = [];

fs.mkdirSync(OUT, { recursive: true });

for (const row of manifest) {
  const partsBase = row.status === 'oversized' ? partsBaseFor(row.url) : null;
  // A game that registers a service worker used to be held back (18 of them), which left it loading from
  // github.io, blocked at most schools. In a shell the worker can never register: its script would be on
  // jsDelivr, another origin, so the browser rejects it, and the worker only adds offline caching anyway.
  // Buckshot Roulette already ran fine with that rejection. swShim makes register() reject quietly.
  // Only games verified to play in a shell (probe-page.js, 2026-10-24). The others need their page's own
  // origin for more than the worker: Construct 3 loads c3runtime.js relative to location (Basket Random,
  // Bottle Flip 3D, Head Soccer, Blumgi Rocket), BrawlGuys draws cross-origin images into WebGL, and
  // Uno / TTG Jump Jousts 2 / Recoil / Nubby's stay black or throw. Those keep loading from github.io.
  const swFix = row.status === 'needs-sw-fix' && SW_OK.has(row.url);
  if (row.status !== 'eligible' && !partsBase && !swFix) { stats.skipped++; continue; }
  if (!row.cdnBase || !row.entry) { stats.noEntry++; continue; }

  const src = path.join(localDir(row.repo, row.folder), 'index.html');
  let html;
  try {
    const size = fs.statSync(src).size;
    if (size > MAX_ENTRY) {
      stats.heavyEntry++;
      stats.errors.push(`heavy-entry ${row.url} (${(size / 1048576).toFixed(1)}MB entry — needs object storage)`);
      continue;
    }
    html = fs.readFileSync(src, 'utf8');
  } catch (e) {
    stats.errors.push(`read-fail ${row.url}: ${e.code || e.message}`);
    continue;
  }

  // Some games already carry a <base> pointing at a third-party CDN
  // (web-ports/*, genizy/* and friends). Those assets are already off
  // github.io, so re-pointing them at our shard would break them — keep theirs.
  //
  // But an existing <base> is only trustworthy if it is actually a usable
  // absolute URL. In these shards it frequently is not: 24 games carry
  // href="./", six are truncated to "https://cdn..." or "https://cdn.../",
  // one is empty and one is root-absolute. Treating those as authoritative left
  // the shell with no CDN base at all, so its assets resolved against our own
  // origin where they do not exist. Anything unusable gets replaced.
  const tr = stripTrackers(html);
  html = tr.html;
  if (tr.hits) { stats.trackersStripped++; stats.trackerGames.push(`${row.url} (${tr.hits})`); }
  const wr = stripWrappers(html);
  if (wr.hits) { html = wr.html; stats.wrappersStripped = (stats.wrappersStripped || 0) + 1; (stats.wrapperGames = stats.wrapperGames || []).push(row.url); }
  // Safety net: even if a shard's own index.html still carries someone else's ads, the shell served to players does not.
  const ads = stripInjected(html);
  if (ads.removed.length) { html = ads.html; stats.adsStripped++; stats.adGames.push(row.url); }

  const yt = pinPlayablesSdk(html);
  if (yt.hits) { html = yt.html; stats.playablesSdkPinned = (stats.playablesSdkPinned || 0) + 1; }
  const mj = pinMergeJs(html);
  if (mj.hits) { html = mj.html; (stats.mergeJsPinned = stats.mergeJsPinned || []).push(row.url); }

  const own = rewriteOwnGithubUrls(html);
  if (own.hits) { html = own.html; stats.ownGithubRewritten = (stats.ownGithubRewritten || 0) + 1; }

  const found = existingBase(html);
  if (found !== null && isUsableBase(found)) {
    stats.keptTheirBase++;
    const r = forceNoindex(html);
    html = r.html;
    if (r.rewrote) stats.rewroteRobots++;
    if (r.added) {
      const head = html.match(/<head\b[^>]*>/i);
      if (head) html = html.replace(head[0], head[0] + `\n<meta name="robots" content="noindex,nofollow">`);
      else html = `<meta name="robots" content="noindex,nofollow">\n` + html;
    }
  } else {
    // Strip every existing <base> before injecting, not just ones with a
    // parseable href. Around 90 of these documents carry a valueless `<base>`
    // or `<base href>`; those leave the shell with two base elements. Ours wins
    // today only because it is injected first and an empty href still counts as
    // present, so the correct resolution would flip on any reordering.
    if (/<base\b[^>]*>/i.test(html)) {
      html = html.replace(/<base\b[^>]*>/gi, '');
      if (found !== null) stats.replacedBadBase++;
    }
    html = injectBase(html, row.cdnBase, row.url);
    stats.written++;
  }

  // every shell gets it: a worker registered from the shell's own origin would resolve against the CDN base
  html = html.replace('<!-- ubg-play-shell: assets from jsDelivr, entry served same-origin -->',
    m => m + '\n' + SW_SHIM);
  if (swFix) stats.swShimmed = (stats.swShimmed || 0) + 1;

  if (partsBase) {
    // straight after our <base> block, so it runs before any of the game's own scripts
    html = html.replace('<!-- ubg-play-shell: assets from jsDelivr, entry served same-origin -->',
      m => m + '\n' + partsShim(row.cdnBase, partsBase, PARTS.games[row.url].parts));
    stats.partsShims++; stats.partsGames.push(row.url);
  }

  // A game's own `connect-src 'self'` policy (added when its ads/analytics were removed) would also
  // block the game's fetch()/XHR for its assets, which in a shell live on jsDelivr, not 'self'.
  html = html.replace(/(<meta\b[^>]*Content-Security-Policy[^>]*connect-src\s+'self')(?![^"']*cdn\.jsdelivr\.net)/i, '$1 https://cdn.jsdelivr.net');

  const dir = path.join(OUT, row.url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  written.push(row.url);
}


// Publish the two lookups the client needs into utils.js, between markers so
// re-running is idempotent. Hand-maintaining these would drift the moment a
// shard is re-pinned or a game changes eligibility.
const UTILS = path.join(SITE_DIR, 'assets', 'js', 'utils.js');
{
  const reposFile = path.join(__dirname, 'cdn-repos.json');
  if (!fs.existsSync(reposFile))
    throw new Error('scripts/cdn-repos.json missing — run gen-cdn-manifest.js first');
  const repos = JSON.parse(fs.readFileSync(reposFile, 'utf8'));
  const block =
`// ── GENERATED by scripts/gen-play-shell.js — do not edit by hand ──────────────
// Shard repo -> its pinned jsDelivr mirror. Thumbnails resolve through here
// rather than github.io: on any non-github.io host, github.io is blocked by most
// school filters, so thumbnails served from it render as a grid of empty boxes.
const SHARD_CDN = ${JSON.stringify(repos, null, 2)};
// Games that actually have a shell at /g/{slug}/. Built from what was written,
// not from manifest eligibility — 8 games are eligible yet skipped (no entry
// html, oversized entry) and listing those would point the iframe at nothing.
const PLAY_SHELLS = new Set(${JSON.stringify([...written].sort())});
// ── END GENERATED ────────────────────────────────────────────────────────────`;

  let u = fs.readFileSync(UTILS, 'utf8');
  const START = '// ── GENERATED by scripts/gen-play-shell.js';
  const END   = '// ── END GENERATED ────────────────────────────────────────────────────────────';
  if (u.includes(START)) {
    const a = u.indexOf(START), b = u.indexOf(END) + END.length;
    u = u.slice(0, a) + block + u.slice(b);
  } else {
    const anchor = 'const IMG_BASE = (_isLocal && _localPort)';
    if (!u.includes(anchor)) throw new Error('utils.js anchor missing — cannot publish SHARD_CDN');
    u = u.replace(anchor, block + '\n\n' + anchor);
  }
  fs.writeFileSync(UTILS, u);
  console.log(`  utils.js: ${Object.keys(repos).length} shard CDN bases, ${written.length} shell slugs`);
}

// ── Report ────────────────────────────────────────────────────
console.log(`\nplay shells -> ${OUT}\n`);
console.log(`  oversized via parts      ${String(stats.partsShims).padStart(4)}  ${process.env.PARTS_BASE ? '(PARTS_BASE=' + process.env.PARTS_BASE + ' - LOCAL TEST, do not commit)' : ''}`);
console.log(`  <base> injected          ${String(stats.written).padStart(4)}`);
console.log(`  kept their own <base>    ${String(stats.keptTheirBase).padStart(4)}  (valid third-party CDN, left alone)`);
console.log(`  replaced unusable <base> ${String(stats.replacedBadBase).padStart(4)}  (was "./", truncated, empty or root-absolute)`);
console.log(`  trackers stripped        ${String(stats.trackersStripped).padStart(4)}  ${stats.trackerGames.join(", ")}`);
console.log(`  embedded ads stripped    ${String(stats.adsStripped).padStart(4)}  ${stats.adGames.slice(0, 12).join(", ")}${stats.adGames.length > 12 ? ", ..." : ""}`);
console.log(`  rewrote indexable robots ${String(stats.rewroteRobots).padStart(4)}  (source said "all" or "index,follow")`);
console.log(`  entry too heavy          ${String(stats.heavyEntry).padStart(4)}  (needs object storage)`);
console.log(`  no entry html            ${String(stats.noEntry).padStart(4)}`);
console.log(`  not eligible, skipped    ${String(stats.skipped).padStart(4)}`);
console.log(`  ${'-'.repeat(30)}`);
console.log(`  folders written          ${String(written.length).padStart(4)}`);

const outBytes = written.reduce((a, s) => a + fs.statSync(path.join(OUT, s, 'index.html')).size, 0);
console.log(`  total size               ${(outBytes / 1048576).toFixed(1)} MB\n`);

if (stats.errors.length) {
  console.log(`  ${stats.errors.length} note(s):`);
  for (const e of stats.errors.slice(0, 15)) console.log(`    ${e}`);
  if (stats.errors.length > 15) console.log(`    ...and ${stats.errors.length - 15} more`);
}

fs.writeFileSync(path.join(__dirname, 'play-shell-report.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), out: OUT, stats, written }, null, 1));
