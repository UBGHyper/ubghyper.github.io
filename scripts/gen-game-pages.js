#!/usr/bin/env node
// Generates /games/{url}.html — full play pages with rich SEO content.
// Removes /games/ pages for broken games.
// Syncs /games/ + play.html?game= entries in sitemap.xml.
// Run with: node scripts/gen-game-pages.js

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const GAMES_JSON = path.join(ROOT, 'assets', 'games.json');
const OUT_DIR    = path.join(ROOT, 'games');
const SITEMAP    = path.join(ROOT, 'sitemap.xml');
const SITE_URL   = 'https://ubghyper.github.io';
// Game files live in shard repos served at ubghyper.github.io/{shard}/. A game
// names its shard with an optional `shard` field in games.json; without one it
// lives in the original GameList.github.io shard. Keep in sync with utils.js.
const SHARD_DEFAULT = 'GameList.github.io';
const IMG_BASE   = `${SITE_URL}/${SHARD_DEFAULT}`;
// `shard` may be a bare repo name or a full base URL (numbered shards live on
// another account, e.g. https://freeonlinewebtools.github.io/gamelist9.github.io).
const gameBase   = g => { const s = (g && g.shard) || SHARD_DEFAULT; return s.includes('://') ? s.replace(/\/$/, '') : `${SITE_URL}/${s}`; };
const gameFolder = g => `${gameBase(g)}/${g.url}/`;
const gameThumb  = g => (g && g.image ? `${gameFolder(g)}${g.image}` : '');
// Visible thumbnails: the shard's pinned jsDelivr copy, as utils.js gameThumb() does (github.io is blocked
// by most school filters). SEO metadata keeps gameThumb()'s github.io URL.
const CDN_REPOS = (() => { try { return require('./cdn-repos.json'); } catch { return {}; } })();
const gameThumbView = g => { if (!g || !g.image) return ''; const s = g.shard || SHARD_DEFAULT; const b = CDN_REPOS[s.includes('://') ? s.replace(/\/$/, '').split('/').pop() : s]; return b ? `${b}/${g.url}/${g.image}` : gameThumb(g); };

// Direct gtag is the SINGLE GA4 configuration owner (GROW-001). The old
// GTM-KBPRR2NP container was empty (tags:[], rules:[]) and was removed site-wide:
// a second config surface risks silently double-counting page views. Do not
// reintroduce a GTM loader here or in play.html.
const GA_ID      = 'G-VE9J0CCHWZ';

const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'));
const topContent = require('./top-game-content');
const NOINDEX_LANDING = require('./noindex-landing'); // rival-named landing pages kept out of the index and the sitemap

// play.html is the single source of truth for the player UI — game pages are
// generated from it via marker-based transforms in buildPage(). If play.html
// changes structurally, rep() throws and the build fails loudly.
const PLAY_SRC = fs.readFileSync(path.join(ROOT, 'play.html'), 'utf8');
function rep(html, find, replace) {
  if (!html.includes(find)) {
    throw new Error('gen-game-pages: play.html anchor missing → ' + JSON.stringify(find.slice(0, 80)));
  }
  return html.split(find).join(replace);
}

// Real rating aggregates snapshot (from scripts/gen-ratings.js → Firestore).
// AggregateRating schema is only emitted for games with >= RATING_THRESHOLD
// genuine votes — never fabricated, so it's Google-guideline-safe.
let ratings = {};
try { ratings = require(path.join(ROOT, 'assets', 'ratings.json')); } catch { /* no snapshot yet */ }
const RATING_THRESHOLD = 5;

fs.mkdirSync(OUT_DIR, { recursive: true });

const today = new Date().toISOString().slice(0, 10);

// Preserve real per-URL <lastmod>: only bump the date when a page's content
// actually changes. Restamping every URL on every run trains Google to
// distrust the sitemap and crawl it inefficiently.
const prevLastmod = {};
try {
  const oldSitemap = fs.readFileSync(SITEMAP, 'utf8');
  for (const m of oldSitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    prevLastmod[m[1]] = m[2];
  }
} catch { /* no existing sitemap — first run */ }
const changedUrls = new Set();

// <lastmod> must mean "this game's content changed", not "the site was redeployed". A nav link,
// an ad tag or the order of related games rewrites every page's HTML, which restamped all ~700
// URLs with one date (2026-10-03) and teaches Google to ignore the sitemap's dates. So bump only
// when the game's OWN data changes (or the page is new), tracked by a hash of that data.
// First run with no hash file keeps the existing sitemap dates as the baseline.
const SIG_FILE = path.join(__dirname, 'sitemap-hashes.json');
let prevSigs = {};
try { prevSigs = JSON.parse(fs.readFileSync(SIG_FILE, 'utf8')); } catch { /* first run */ }
const newSigs = {};
const sigOf = g => require('crypto').createHash('sha1').update(JSON.stringify([
  g.name, g.gamedesc, g.tags, g.credits, g.image, g.status, g.statusnote, g.shard, topContent[g.url] || null,
  // star rating only counts once it is shown in the page schema (>= RATING_THRESHOLD votes)
  (ratings[g.url] && ratings[g.url].count >= RATING_THRESHOLD) ? [ratings[g.url].avg, ratings[g.url].count] : null,
])).digest('hex').slice(0, 16);

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── Deterministic variety helpers ─────────────────────────────
// Auto-generated pages must not be near-duplicates of each other (that's the
// "thin content" footprint that gets a large set of pages demoted). We vary
// the About copy + FAQ set per game using a stable hash of the URL, so the
// same game always renders the same content (no churn) but different games get
// genuinely different phrasing. All facts stay TRUE for any game in the genre —
// nothing fabricated (no fake level counts / records on auto pages).
function seedOf(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function pickOne(arr, s) { return arr[s % arr.length]; }
function pickN(arr, n, s) {
  const a = arr.slice(); const out = []; let x = (s || 1) >>> 0;
  while (out.length < n && a.length) { x = (Math.imul(x, 1103515245) + 12345) >>> 0; out.push(a.splice(x % a.length, 1)[0]); }
  return out;
}

// Genre-flavoured About sentences (true for any game in the genre).
const GENRE_BLURB = {
  racing:     ['{n} is one of the racing and driving games players keep coming back to on UBGHyper — easy to pick up, hard to put down.', '{n} earns its spot among UBGHyper\'s most-played racing titles because a single run is short enough to squeeze in between classes.'],
  physics:    ['{n} lives or dies on its physics — momentum and timing matter more than raw speed, which is exactly why it rewards a few extra attempts.', 'Half the fun of {n} is the physics: small inputs cascade into big, often hilarious, results.'],
  platformer: ['{n} is a precision platformer — the kind where you fail, learn the timing, and clear the next gap on instinct.', '{n} keeps platforming honest: tight controls, quick restarts, and levels you can actually beat with practice.'],
  puzzle:     ['{n} is a brain-teaser at heart — every level is a small problem you solve, not a reflex test.', '{n} rewards patience and pattern-spotting over twitch reactions, which makes it a great low-stress pick.'],
  shooter:    ['{n} is built around aim and positioning — quick to learn, with a skill ceiling that keeps it interesting.', '{n} sits among UBGHyper\'s most-played shooters thanks to fast rounds and instant restarts.'],
  action:     ['{n} is fast, reactive, and easy to drop into for a quick burst of action.', '{n} keeps the pace high — short sessions, instant restarts, and a difficulty curve that pulls you back in.'],
  arcade:     ['{n} is a pure arcade pick-up-and-play — one more run is always tempting.', '{n} is the kind of arcade game you start "just once" and look up twenty minutes later.'],
  idle:       ['{n} is an idle/incremental game — progress keeps ticking, and the satisfying numbers do most of the work.', '{n} is perfect for a background tab: check in, upgrade, and watch the numbers climb.'],
  strategy:   ['{n} rewards planning over speed — read the board, commit to a plan, and adapt.', '{n} is a thinking-player\'s game where the right decision beats fast fingers.'],
  multiplayer:['{n} is best with other people — quick matches make it ideal for a class break.', '{n} shines in multiplayer, where every round plays out a little differently.'],
  sports:     ['{n} distils a full sport into a few controls — easy to learn, genuinely fun to master.', '{n} is an arcade take on sports: pick-up-and-play matches, no rulebook required.'],
  horror:     ['{n} leans on atmosphere and tension rather than cheap tricks.', '{n} is a horror pick for players who like a bit of dread with their browser games.'],
  rhythm:     ['{n} is all about timing — lock into the beat and the rest follows.', '{n} rewards rhythm and reflexes in equal measure.'],
  simulation: ['{n} is a simulation you can sink real time into — small choices stack up over a run.', '{n} gives you systems to tinker with and outcomes that feel earned.'],
  sandbox:    ['{n} is a sandbox — there\'s no single way to play, just tools and your imagination.', '{n} hands you the toys and gets out of the way; experimenting is the whole point.'],
  adventure:  ['{n} is a story-driven adventure — explore, solve, and see where it leads.', '{n} is built to be explored, with a pace that suits a relaxed session.'],
  rpg:        ['{n} is an RPG at heart — grow your character, and every session builds on the last.', '{n} rewards the long game: progress carries forward and choices add up.'],
  fighting:   ['{n} is a fighter that\'s quick to learn but has real depth once the combos click.', '{n} is built for short, competitive rounds — perfect for a quick rematch.'],
  comedy:     ['{n} doesn\'t take itself seriously, and that\'s the point — it\'s here to make you laugh.', '{n} is as much about the absurd moments as the gameplay.'],
  retro:      ['{n} is a retro classic, preserved here to play instantly in the browser.', '{n} carries that old-school charm, now running straight in your tab with no plugins.'],
};
const GENRE_BLURB_FALLBACK = ['{n} is a fan favourite on UBGHyper — quick to load and easy to get into.', '{n} is one of the browser games players keep returning to on UBGHyper.'];

// Closing line variants (school/free intent, no fabricated facts).
const CLOSER = [
  'You can play {n} unblocked here for free — no download, no sign-up, and it loads straight in your browser on a school Chromebook.',
  'Play {n} unblocked at UBGHyper with no installs and no pop-up ads; it runs instantly in the tab and works on locked-down school networks.',
  '{n} runs entirely in the browser, so there\'s nothing to install — just press play. It\'s free and works at school or home.',
  'There\'s no download and no account needed for {n} — it plays right here in the browser, free, and works on Chromebooks at school.',
];

// Genre-specific FAQ (true for any game in that genre).
const GENRE_FAQ = {
  racing:     g => ({ q: `What are the controls for ${g.name}?`, a: `${g.name} is played with the arrow keys or WASD in most cases — accelerate, steer, and brake. You can start playing the moment it loads; no setup needed.` }),
  physics:    g => ({ q: `Is ${g.name} hard to control?`, a: `${g.name} takes a few tries to get a feel for. The physics reward small, deliberate inputs over button-mashing — slow down and it gets much easier.` }),
  multiplayer:g => ({ q: `Can I play ${g.name} with friends?`, a: `Yes — ${g.name} supports multiplayer, so you can jump into matches with other players. Everything runs in the browser, so there\'s nothing for anyone to install.` }),
  idle:       g => ({ q: `Does ${g.name} keep my progress if I close the tab?`, a: `${g.name} saves progress in your browser\'s local storage on the same device, so you can pick up where you left off. Use the Saves page if you want to move progress to another computer.` }),
  horror:     g => ({ q: `Is ${g.name} scary?`, a: `${g.name} is a horror game, so expect tension and a few jump-scares. It\'s designed to be atmospheric — play with sound on for the full effect.` }),
  puzzle:     g => ({ q: `Is ${g.name} good for a quick break?`, a: `Yes — ${g.name} is easy to dip into for a few minutes and just as easy to put down, which makes it a great pick between classes.` }),
  shooter:    g => ({ q: `Do I aim with the mouse in ${g.name}?`, a: `${g.name} typically uses the mouse to aim and shoot, with WASD or the arrow keys to move. It loads ready to play — no configuration required.` }),
  sports:     g => ({ q: `Is ${g.name} easy to learn?`, a: `Yes — ${g.name} keeps the controls simple so you can start playing immediately, while still leaving room to improve with practice.` }),
  rhythm:     g => ({ q: `What keys does ${g.name} use?`, a: `${g.name} is usually played with the arrow keys or WASD in time with the music. Headphones help you hit the timing.` }),
  rpg:        g => ({ q: `Does ${g.name} save my character?`, a: `${g.name} keeps your progress in your browser on the same device. To carry a save to another computer, export it from the Saves page.` }),
  adventure:  g => ({ q: `Does ${g.name} save my progress?`, a: `${g.name} stores progress locally in your browser, so you can continue on the same device. The Saves page lets you back it up or move it.` }),
  strategy:   g => ({ q: `Can I take my time in ${g.name}?`, a: `Yes — ${g.name} rewards thinking over speed, so you can plan each move at your own pace.` }),
  sandbox:    g => ({ q: `Is there a goal in ${g.name}?`, a: `${g.name} is a sandbox, so there\'s no single objective — it\'s about experimenting with the tools and seeing what you can make happen.` }),
};

// Universal FAQ pool — each returns {q,a}; answers have variants so the same
// question reads differently across games. Selected per game by hash.
const UNIVERSAL_FAQ = [
  g => ({ q: `Does ${g.name} work on a Chromebook?`, a: pickOne([`Yes. ${g.name} runs in any modern browser, and most UBGHyper players are on school Chromebooks.`, `${g.name} works on Chromebooks, Windows, Mac and Linux — anything with an up-to-date browser.`], seedOf(g.url + 'cb')) }),
  g => ({ q: `Do I need to download ${g.name}?`, a: pickOne([`No — ${g.name} loads instantly in your browser tab. There\'s nothing to install.`, `No download is required. ${g.name} streams straight into the page and is ready in seconds.`], seedOf(g.url + 'dl')) }),
  g => ({ q: `Is ${g.name} free?`, a: pickOne([`Yes, ${g.name} is 100% free on UBGHyper — no sign-up and no payment.`, `${g.name} is completely free to play here, with no account and no in-game pop-ups.`], seedOf(g.url + 'fr')) }),
  g => ({ q: `Is ${g.name} safe to play?`, a: `${g.name} runs in a clean iframe at UBGHyper with no pop-up ads, no malware, and no third-party redirects.` }),
  g => ({ q: `Do I need an account to play ${g.name}?`, a: `No. ${g.name} needs no login — your favourites and progress are saved in your browser locally.` }),
  g => ({ q: `Can I play ${g.name} on mobile?`, a: `${g.name} works in mobile browsers too, though most players run it on a desktop or Chromebook for the best controls.` }),
];

// Related games: scored by shared-tag overlap with a per-source rotated tiebreak.
function getRelated(g, count = 4) {
  const myTags = new Set(g.tags || []);
  if (!myTags.size) return [];
  const seed = seedOf(g.url);
  const scored = [];
  for (const x of games) {
    if (x.status === 'broken' || x.url === g.url) continue;
    let shared = 0;
    for (const t of (x.tags || [])) if (myTags.has(t)) shared++;
    if (!shared) continue;
    // Per-source rotated hash: same-tag candidates don't always surface in the
    // same games.json order, so inbound related-links spread across the whole
    // catalogue instead of concentrating on the first few games of each tag.
    // This is the documented lever for getting under-linked pages crawled/ranked.
    scored.push({ x, shared, rot: (seedOf(x.url) ^ seed) >>> 0 });
  }
  // Most shared tags first (relevance), then the rotating tiebreak (distribution).
  scored.sort((a, b) => b.shared - a.shared || a.rot - b.rot);
  return scored.slice(0, count).map(s => s.x);
}

// Ring links (SEO pass 2026-11-15): each page had only 4 game-to-game links, so 38 games
// (FNAF 4, Friday Night Funkin, Madalin Stunt Cars 3, Raft...) were linked from just 2 pages.
// Within each primary tag the listed games are sorted by url and every page links to the
// next RING_N, so every game is guaranteed RING_N inbound links from same-genre pages.
// Sorting by url keeps it stable: adding a game only shifts its neighbours' links.
const RING_N = 6;
const ringByTag = {};
for (const x of games) {
  if (x.status === 'broken' || !x.url || !(x.tags && x.tags[0])) continue;
  (ringByTag[x.tags[0]] = ringByTag[x.tags[0]] || []).push(x);
}
for (const t in ringByTag) ringByTag[t].sort((a, b) => a.url.localeCompare(b.url));
function ringNext(g, exclude) {
  const r = ringByTag[(g.tags || [])[0]];
  if (!r || r.length < 2) return [];
  const i = r.findIndex(x => x.url === g.url), out = [];
  for (let k = 1; k < r.length && out.length < RING_N; k++) {
    const x = r[(i + k) % r.length];
    if (!exclude.has(x.url)) out.push(x);
  }
  return out;
}

// Titles over ~60 characters get cut off in results. Keep the full pattern when it fits,
// otherwise drop "- Play Free Online", then the brand.
function buildTitle(g) {
  const full = `${g.name} Unblocked - Play Free Online | UBGHyper`;
  if (full.length <= 62) return esc(full);
  const mid = `${g.name} Unblocked | UBGHyper`;
  return esc(mid.length <= 62 ? mid : `${g.name} Unblocked`);
}

function buildMetaDesc(g) {
  const base = `Play ${g.name} online free at UBGHyper: unblocked, no download, works at school. `;
  const avail = 155 - base.length - 1;
  const excerpt = g.gamedesc.length > avail ? g.gamedesc.slice(0, avail - 1) + '…' : g.gamedesc;
  return esc(base + excerpt);
}

// ── Remove broken-game pages ──────────────────────────────────
const brokenUrls = games.filter(g => g.status === 'broken').map(g => g.url);
let deleted = 0;
for (const url of brokenUrls) {
  const p = path.join(OUT_DIR, `${url}.html`);
  if (!fs.existsSync(p)) continue;
  // A slug can be BOTH a broken games.json entry AND a legacy redirect stub.
  // Never delete a redirect stub here (gen-redirects.js owns these) — doing so
  // 404s the old indexed URL. Without this guard the automated ratings-refresh
  // job silently deleted 13 stubs every run. Same marker check the orphan sweep uses.
  if (fs.readFileSync(p, 'utf8').includes('<!-- ubg-redirect -->')) continue;
  fs.unlinkSync(p); deleted++;
}
if (deleted) console.log(`Deleted ${deleted} broken-game page(s)`);

// ── Sweep orphan pages: any /games/*.html that doesn't correspond to a
// non-broken entry in games.json. Catches the case where a game is
// deleted from games.json entirely (vs marked `status:'broken'`),
// which otherwise leaves a stale indexed page bleeding crawl budget.
// `cat-*.html` (category landing pages) are left alone — they're
// owned by gen-cat-pages.js.
const validUrlSet = new Set(
  games.filter(g => g.status !== 'broken').map(g => g.url)
);
let orphaned = 0;
for (const filename of fs.readdirSync(OUT_DIR)) {
  if (!filename.endsWith('.html')) continue;
  if (filename.startsWith('cat-')) continue;
  const slug = filename.slice(0, -5); // strip .html
  if (validUrlSet.has(slug)) continue;
  // Keep legacy-URL redirect stubs (gen-redirects.js owns these — they catch
  // old indexed URLs and pass equity to a live page). Identified by marker.
  const fp = path.join(OUT_DIR, filename);
  if (fs.readFileSync(fp, 'utf8').includes('<!-- ubg-redirect -->')) continue;
  fs.unlinkSync(fp);
  orphaned++;
  console.log(`  orphan removed: games/${filename}`);
}
if (orphaned) console.log(`Deleted ${orphaned} orphan game page(s)`);

// ── Generate pages ────────────────────────────────────────────
let generated = 0;

for (const g of games) {
  if (!g || !g.name || !g.url) continue;
  if (g.status === 'broken') continue;

  const pageUrl  = `${SITE_URL}/games/${encodeURIComponent(g.url)}.html`;
  const thumbUrl = `${gameThumb(g)}`;
  const title    = buildTitle(g);
  const metaDesc = buildMetaDesc(g);
  const tags     = g.tags || [];

  const keywords = [
    `${g.name} unblocked`,
    `${g.name} unblocked at school`,
    `play ${g.name} online`,
    `${g.name} free`,
    `${g.name} no download`,
    ...tags.map(t => `${t} games unblocked`),
    'unblocked games',
    'free online games',
    'unblocked games at school',
  ].join(', ');

  // Tag chips link to the indexable category pages (every tag in games.json
  // gets a /games/cat-{tag}.html from gen-cat-pages.js) — strengthens the
  // internal-link mesh vs the old non-indexable /index.html?cat= query URL.
  const tagLinks = tags
    .map(t => `<a href="/games/cat-${encodeURIComponent(t)}.html" class="ply-about-tag">${cap(t)}</a>`)
    .join('');

  const stars = [1,2,3,4,5].map(n =>
    `<button class="star-btn" data-star="${n}" aria-label="Rate ${n} star${n!==1?'s':''}">&#9733;</button>`
  ).join('');

  const related   = getRelated(g);
  const relatedHtml = related.map(r =>
    `<a href="/games/${encodeURIComponent(r.url)}.html" class="ply-rec-item">
      <img class="ply-rec-thumb" src="${gameThumbView(r)}" alt="${esc(r.name)}" width="44" height="44" loading="lazy" decoding="async" onerror="this.style.display='none'">
      <div class="ply-rec-info"><p class="ply-rec-name">${esc(r.name)}</p><p class="ply-rec-tag">${r.tags?.[0] ? cap(r.tags[0]) : ''}</p></div>
    </a>`
  ).join('');

  const curated = topContent[g.url];
  const primaryTag = (tags || [])[0];
  // Suppress placeholder credits ("original creators", "unknown", etc.) so they
  // don't show as a fake "Developer" fact. Keep genuine studio names.
  const realCredit = (g.credits && !/original creators?|various game develop|unknown/i.test(g.credits))
    ? g.credits : '';
  let faqs;
  if (curated && curated.faqs) {
    faqs = curated.faqs;
  } else {
    const s = seedOf(g.url);
    // Core search-intent question always first, with varied phrasing.
    const atSchool = {
      q: `Is ${g.name} unblocked at school?`,
      a: pickOne([
        `Yes. ${g.name} runs entirely in your browser at UBGHyper, so it works on most school networks without downloads, installs, or extensions.`,
        `Yes — ${g.name} loads straight in the browser, which is why it gets through most school filters. If the tab needs disguising, press the backtick key to camouflage it.`,
        `${g.name} is playable at school because it streams into the page itself — no separate app or extension for a network to block.`,
      ], s),
    };
    // One genre-specific question (if we have one for the primary tag).
    const genreFaq = GENRE_FAQ[primaryTag] ? GENRE_FAQ[primaryTag](g) : null;
    // Fill the rest from the universal pool (deterministic, distinct).
    const need = genreFaq ? 3 : 4;
    const extra = pickN(UNIVERSAL_FAQ, need, s).map(fn => fn(g));
    faqs = [atSchool, ...(genreFaq ? [genreFaq] : []), ...extra];
  }

  // ── Auto About content (varied per game; only real facts) ────
  const blurbPool = GENRE_BLURB[primaryTag] || GENRE_BLURB_FALLBACK;
  const blurb  = pickOne(blurbPool, seedOf(g.url + 'about')).replace(/\{n\}/g, esc(g.name));
  const closer = pickOne(CLOSER, seedOf(g.url + 'close')).replace(/\{n\}/g, esc(g.name));
  const likeGames = related.slice(0, 3);
  const likeLinks = likeGames
    .map(r => `<a href="${encodeURIComponent(r.url)}.html">${esc(r.name)}</a>`)
    .join(', ').replace(/, ([^,]*)$/, ' and $1');
  const likeHtml = likeGames.length
    ? `      <p>If you like ${esc(g.name)}, try ${likeLinks}${primaryTag ? ` — more ${cap(primaryTag).toLowerCase()} games to play next.` : '.'}</p>\n`
    : '';
  const modeLabel = (tags || []).includes('multiplayer') ? 'Single &amp; multiplayer' : 'Single player';
  const detailsHtml = `      <ul class="about-list game-details">
        <li><strong>Genre:</strong> ${tags.length ? tags.map(cap).join(', ') : 'Browser game'}</li>
        <li><strong>Players:</strong> ${modeLabel}</li>
        ${realCredit ? `<li><strong>Developer:</strong> ${esc(realCredit.replace(/^Developed by\s*/i, ''))}</li>` : ''}
        <li><strong>Platform:</strong> Web browser &mdash; Chromebook, Windows, Mac &amp; Linux</li>
        <li><strong>Price:</strong> Free to play, no sign-up</li>
      </ul>`;
  const aboutParas = (curated && curated.longdesc)
    ? curated.longdesc.split(/\n\s*\n/).map(p => `      <p>${esc(p.trim())}</p>`).join('\n')
    : `      <p>${esc(g.gamedesc)}</p>\n      <p>${blurb}</p>\n${likeHtml}      <p>${closer}</p>`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: g.name,
      description: g.gamedesc,
      url: pageUrl,
      image: thumbUrl,
      screenshot: thumbUrl,
      genre: tags,
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser',
      gamePlatform: 'Web Browser',
      playMode: tags.includes('multiplayer') ? 'MultiPlayer' : 'SinglePlayer',
      ...((ratings[g.url] && ratings[g.url].count >= RATING_THRESHOLD) ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ratings[g.url].avg,
          ratingCount: ratings[g.url].count,
          bestRating: 5,
          worstRating: 1,
        },
      } : {}),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      publisher: { '@type': 'Organization', name: 'UBGHyper', url: SITE_URL },
      sameAs: [`${SITE_URL}/play.html?game=${encodeURIComponent(g.url)}`],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'UBGHyper', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Games', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 3, name: `${g.name} Unblocked`, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ].map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  const faqHtml = faqs.map(f =>
    `<details class="lp-faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
  ).join('');

  // ── Build the page from play.html — the single source of truth for the
  // player UI. Marker-based transforms; rep() throws if play.html loses an
  // anchor, so the build fails loudly instead of emitting broken pages.
  let html = PLAY_SRC;

  // strip play.html's ?game= title/canonical/redirect bootstrap (baked pages don't need it)
  {
    const m = html.indexOf("var g=new URLSearchParams(location.search).get('game')");
    if (m === -1) throw new Error('gen-game-pages: play.html bootstrap script anchor missing');
    const s = html.lastIndexOf('<script>', m);
    const e = html.indexOf('</script>', m) + '</script>'.length;
    html = html.slice(0, s) + html.slice(e);
  }

  // head: title / meta / canonical / og / twitter / schema
  html = rep(html, '<title>Play Game - UBGHyper</title>', `<title>${title}</title>`);
  html = rep(html,
    '<meta name="description" content="Play free unblocked games online on UBGHyper. No downloads needed.">',
    `<meta name="description" content="${metaDesc}">\n<meta name="keywords" content="${esc(keywords)}">`);
  html = rep(html, '<meta name="robots" content="noindex,follow">',
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">');
  html = rep(html, '<link id="canonicalTag" rel="canonical" href="https://ubghyper.github.io/">',
    `<link id="canonicalTag" rel="canonical" href="${pageUrl}">`);
  html = rep(html, '<meta property="og:title" content="Play Game - UBGHyper">',
    `<meta property="og:title" content="${title}">`);
  html = rep(html, '<meta property="og:description" content="Play free unblocked games on UBGHyper. No downloads needed.">',
    `<meta property="og:description" content="${metaDesc}">`);
  html = rep(html, '<meta property="og:url" content="https://ubghyper.github.io/play.html">',
    `<meta property="og:url" content="${pageUrl}">\n<meta property="og:site_name" content="UBGHyper">`);
  html = rep(html, '<meta property="og:image" content="https://ubghyper.github.io/assets/img/og.png">',
    `<meta property="og:image" content="${esc(thumbUrl)}">`);
  html = rep(html, '<meta name="twitter:title" content="Play Game - UBGHyper">',
    `<meta name="twitter:title" content="${title}">`);
  html = rep(html, '<meta name="twitter:description" content="Play free unblocked games on UBGHyper. No downloads needed.">',
    `<meta name="twitter:description" content="${metaDesc}">`);
  html = rep(html, '<meta name="twitter:image" content="https://ubghyper.github.io/assets/img/og.png">',
    `<meta name="twitter:image" content="${esc(thumbUrl)}">`);
  html = rep(html, '<script id="gameJsonLd" type="application/ld+json"></script>', schemas);

  // root-relative paths so the page works from /games/
  html = html.split('href="assets/').join('href="/assets/');
  html = html.split('src="assets/').join('src="/assets/');
  // Home is always "/" (the canonical URL). Linking "/index.html" made Google report it as a
  // separate page with 1.3M impressions (GSC, Aug-Nov 2026), splitting the homepage's signals.
  html = html.split('href="index.html').join('href="/');
  for (const p of ['favorites.html', 'stats.html', 'saves.html', 'about.html', 'privacy.html', 'contact.html']) {
    html = html.split(`href="${p}"`).join(`href="/${p}"`);
  }

  // bake game identity into the player chrome
  html = rep(html, '<span class="ply-game-crumb"><span id="plyCrumbGame"></span></span>',
    `<span class="ply-game-crumb"><span id="plyCrumbGame">${esc(g.name)}</span></span>`);
  if (g.status === 'buggy') {
    html = rep(html, 'id="plyBuggyBanner" hidden', 'id="plyBuggyBanner"');
    // A specific, reported symptom is far more useful to a player than a generic
    // warning — and it tells them the problem is known rather than their fault.
    if (g.statusnote) {
      html = rep(html,
        '<span id="plyBuggyText">This game may have some bugs or loading issues.</span>',
        `<span id="plyBuggyText">${esc(g.statusnote)}</span>`);
    }
  }
  html = rep(html, '<div class="ply-loading-bg" id="plyLoadBg"></div>',
    `<div class="ply-loading-bg" id="plyLoadBg" style="background-image:url(${esc(gameThumbView(g) || thumbUrl)})"></div>`);
  html = rep(html, '<p class="ply-loading-name" id="plyLoadName">Loading…</p>',
    `<p class="ply-loading-name" id="plyLoadName">${esc(g.name)}</p>`);
  html = rep(html, 'title="Game"', `title="${esc(g.name)} — UBGHyper"`);
  html = rep(html, '<span class="ply-ctrl-title" id="plyCtrlTitle"></span>',
    `<span class="ply-ctrl-title" id="plyCtrlTitle">${esc(g.name)}</span>`);
  if (tags[0]) {
    html = rep(html, '<span class="ply-ctrl-tag"   id="plyCtrlTag" style="display:none"></span>',
      `<span class="ply-ctrl-tag"   id="plyCtrlTag">${cap(tags[0])}</span>`);
  }

  // about card: swap the JS skeleton for baked, crawlable game info
  {
    const startA = '<div class="ply-about" id="plyAboutCard" aria-live="polite">';
    const endA = '<!-- Sidebar: recommendations + ad -->';
    const i1 = html.indexOf(startA), i2 = html.indexOf(endA);
    if (i1 === -1 || i2 === -1 || i2 < i1) throw new Error('gen-game-pages: play.html about-card anchors missing');
    const baked = `${startA}
        <p class="ply-about-title" id="plyGameTitle">${esc(g.name)}</p>
        ${realCredit ? `<p class="ply-about-author">${esc(realCredit)}</p>` : ''}
        ${tagLinks ? `<div class="ply-about-tags">${tagLinks}</div>` : ''}
        ${g.gamedesc ? `<p class="ply-about-desc" id="plyDesc">${esc(g.gamedesc)}</p>` : ''}
      </div>

      `;
    html = html.slice(0, i1) + baked + html.slice(i2);
  }

  // recommendations: baked for SEO internal links (play-new.js re-renders live)
  if (relatedHtml) {
    html = rep(html, '<div class="ply-rec-card" id="plyRecCard" style="display:none">',
      '<div class="ply-rec-card" id="plyRecCard">');
    html = rep(html, '<div class="ply-rec-list" id="plyRecList"></div>',
      `<div class="ply-rec-list" id="plyRecList">${relatedHtml}</div>`);
  }

  // SEO content sections below the player
  // Internal-link block: pushes equity from every game page to the keyword
  // landing pages + the game's own genre category (contextual anchor text).
  const exploreTag = (g.tags && g.tags[0]) ? g.tags[0] : null;
  const ring = ringNext(g, new Set([g.url, ...related.map(r => r.url)]));
  const ringHtml = ring.length && exploreTag ? `        <p>More ${esc(cap(exploreTag).toLowerCase())} games to try: ${ring.map(r => `<a href="/games/${encodeURIComponent(r.url)}.html">${esc(r.name)}</a>`).join(', ')}.</p>\n` : '';
  const exploreHtml = `      <section class="hub-intro gp-explore" aria-label="More unblocked games">
        <h2 class="hub-intro-title">More free unblocked games</h2>
${ringHtml}        <p>Enjoyed ${esc(g.name)}? ${exploreTag ?`Browse more <a href="/games/cat-${encodeURIComponent(exploreTag)}.html">${esc(cap(exploreTag))} games</a> or the` : 'Browse the'} <a href="/all-games.html">full A–Z game list</a>, and explore our collections: <a href="/cool-ubg-games.html">Cool UBG Games</a>, <a href="/free-online-games.html">free online games</a>, <a href="/unblocked-games-chromebook.html">games for Chromebook</a> and <a href="/minecraft-unblocked.html">Minecraft unblocked</a>.</p>
      </section>`;

  const seoHtml = `
    <!-- SEO content: About / How to play / FAQ -->
    <div class="gp-seo">
      <section class="hub-intro">
        <h1 class="gp-seo-h1">${esc(g.name)} Unblocked</h1>
        <h2 class="hub-intro-title">About ${esc(g.name)}</h2>
${aboutParas}
${detailsHtml}
        ${realCredit ? `<p class="gp-byline">${esc(realCredit)}</p>` : ''}
      </section>
${curated && curated.controls ? `      <section class="hub-intro">
        <h2 class="hub-intro-title">How to play ${esc(g.name)}</h2>
        <p><strong>Controls.</strong> ${curated.controls}</p>
        ${curated.tips && curated.tips.length ? `<p><strong>Tips:</strong></p>
        <ul class="about-list">
          ${curated.tips.map(t => `<li>${esc(t)}</li>`).join('\n          ')}
        </ul>` : ''}
      </section>` : ''}
      <section class="lp-faq" aria-label="${esc(g.name)} FAQ">
        <h2 class="hub-intro-title">Frequently asked questions</h2>
        ${faqHtml}
      </section>
${exploreHtml}
    </div>
`;
  html = rep(html, '</div><!-- /.ply-details -->', '</div><!-- /.ply-details -->\n' + seoHtml);

  // baked game id for play-new.js (must precede the deferred scripts)
  html = rep(html, '<script src="/assets/js/icons.js"></script>',
    `<script>window.gameUrl = '${g.url}';</script>\n<script src="/assets/js/icons.js"></script>`);


  // Only write (and bump sitemap lastmod) if the page actually changed.
  const outPath = path.join(OUT_DIR, `${g.url}.html`);
  const prevHtml = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;
  if (prevHtml !== html) fs.writeFileSync(outPath, html, 'utf8');
  const sig = sigOf(g); newSigs[g.url] = sig;
  const isNewPage = !prevLastmod[`${SITE_URL}/games/${encodeURIComponent(g.url)}.html`];
  if (isNewPage || (prevSigs[g.url] !== undefined && prevSigs[g.url] !== sig)) changedUrls.add(g.url);
  generated++;
}

console.log(`Generated ${generated} game pages in /games/ (${changedUrls.size} changed)`);

// ── Rebuild sitemap.xml from scratch ──────────────────────────
// Single source of truth. Only canonical URLs are listed.
// play.html?game= URLs are intentionally excluded — they're alternate paths
// to the canonical /games/{slug}.html page (set via <link rel="canonical">).

const activeGames = games.filter(g => g && g.url && g.name && g.status !== 'broken');
const allTags = [...new Set(activeGames.flatMap(g => g.tags || []))].sort();

// Stable rounded-down-to-10 count, mirrors gen-landing-pages.js. Keeps
// titles like "430+ Unblocked Games" steady across small catalogue
// changes so Google doesn't see a churning title.
const STABLE_COUNT = Math.floor(activeGames.length / 10) * 10;

// ── Generate all-games.html — a static HTML hub linking every game ──
// Gives crawlers a pure-HTML path to every game page from one indexable
// page (the JS-rendered homepage grid is not crawl-reliable).
{
  const sorted = [...activeGames].sort((a, b) => a.name.localeCompare(b.name));
  const catLinks = allTags.map(t =>
    `<a href="games/cat-${encodeURIComponent(t)}.html">${esc(t[0].toUpperCase() + t.slice(1))}</a>`
  ).join('\n      ');
  const gameLinks = sorted.map(g =>
    `<li><a href="games/${encodeURIComponent(g.url)}.html">${esc(g.name)}</a></li>`
  ).join('\n      ');
  const allGamesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>All Games A–Z: ${STABLE_COUNT}+ Unblocked Games | UBGHyper</title>
<meta property="og:title" content="All Games A–Z: ${STABLE_COUNT}+ Unblocked Games | UBGHyper">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/all-games.html">
<meta property="og:image" content="${SITE_URL}/assets/img/og.png">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="Full A–Z index of every unblocked game on UBGHyper — ${STABLE_COUNT}+ free browser games for school and Chromebook. Browse the complete list and jump straight to any game.">
<link rel="canonical" href="${SITE_URL}/all-games.html">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="icon" href="assets/img/icon/main.svg">
<link rel="apple-touch-icon" href="assets/img/icon/main.png">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script src="/assets/js/analytics.js"></script>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav>
  <a href="/" class="logo">UBGHyper</a>
  <div class="nav-links">
    <a href="/">Games</a>
    <a href="all-games.html" class="active">All Games</a>
    <a href="favorites.html">Favorites</a>
    <a href="stats.html">Stats</a>
    <a href="about.html">About</a>
    <a href="https://discord.gg/HAzcYC52Vt" target="_blank" rel="noopener" style="color:#5865F2;font-weight:600;text-decoration:none">Discord (Fixed)</a><a href="https://isotunnel.com/" target="_blank" rel="noopener" data-nav="isotunnel" style="color:var(--text);font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px">isotunnel<span style="font-size:.74em;font-weight:500;color:var(--text);background:var(--surface-2,var(--border));border-radius:999px;padding:.15em .6em;line-height:1.3;white-space:nowrap">Out now</span></a>
  </div>
  <button class="nav-hamburger" id="navHamburger" aria-label="Toggle navigation" aria-expanded="false" style="margin-left:auto">☰</button>
</nav>

<main style="max-width:1000px;margin:0 auto;padding:1.5rem">
  <h1>All Games — Full A–Z Index</h1>
  <p style="opacity:0.85;line-height:1.6">Every one of UBGHyper's <strong>${STABLE_COUNT}+ unblocked games</strong>, listed alphabetically. Click any title to play instantly — no downloads, no sign-up. New here? Start from the <a href="/">homepage</a>.</p>
  <p style="line-height:2"><strong>Browse by category:</strong>
      ${catLinks}
  </p>
  <ul class="all-games-list" style="columns:3;column-gap:2rem;list-style:none;padding:0;line-height:1.9">
      ${gameLinks}
  </ul>
</main>

<footer>
  <div class="footer-inner">
    <p class="footer-copy">&copy; 2026 UBGHyper</p>
    <div class="footer-links">
      <a href="/">Games</a>
      <a href="all-games.html">All Games</a>
      <a href="favorites.html">Favorites</a>
      <a href="stats.html">Stats</a>
      <a href="saves.html">Saves</a>
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="contact.html">Contact</a>
      <a href="https://github.com/UBGHyper" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</footer>
<!-- binds the phone menu button (and re-applies a saved tab disguise) -->
<script src="/assets/js/camo.js"></script>
</body>
</html>
`;
  const agPath = path.join(ROOT, 'all-games.html');
  const agPrev = fs.existsSync(agPath) ? fs.readFileSync(agPath, 'utf8') : null;
  if (agPrev !== allGamesHtml) fs.writeFileSync(agPath, allGamesHtml, 'utf8');
  const agSig = require('crypto').createHash('sha1').update(sorted.map(g => g.url + '|' + g.name).sort().join(';')).digest('hex').slice(0, 16);
  newSigs.__all_games__ = agSig;
  if (prevSigs.__all_games__ !== undefined && prevSigs.__all_games__ !== agSig) changedUrls.add('__all-games__');
  console.log(`Generated all-games.html (${sorted.length} game links)`);
}

// Sitemap entries: <loc> + <lastmod> only.
// Google explicitly ignores <changefreq> and <priority>; keeping inflated
// values across hundreds of URLs is a trust-signal liability with no upside.
// See: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
const staticEntries = [
  { loc: `${SITE_URL}/` },
  { loc: `${SITE_URL}/all-games.html` },
  { loc: `${SITE_URL}/about.html` },
  { loc: `${SITE_URL}/privacy.html` },
  { loc: `${SITE_URL}/contact.html` },
  { loc: `${SITE_URL}/cool-ubg-games.html` },
  { loc: `${SITE_URL}/free-online-games.html` },
  { loc: `${SITE_URL}/minecraft-unblocked.html` },
  { loc: `${SITE_URL}/unblocked-games-66.html` },
  { loc: `${SITE_URL}/unblocked-games-67.html` },
  { loc: `${SITE_URL}/unblocked-games-76.html` },
  { loc: `${SITE_URL}/unblocked-games-77.html` },
  { loc: `${SITE_URL}/unblocked-games-6x.html` },
  { loc: `${SITE_URL}/unblocked-games-wtf.html` },
  { loc: `${SITE_URL}/unblocked-games-premium.html` },
  { loc: `${SITE_URL}/unblocked-games-chromebook.html` },
  { loc: `${SITE_URL}/github-unblocked-games.html` },
  { loc: `${SITE_URL}/game-websites.html` },
  { loc: `${SITE_URL}/unblocked-games-911.html` },
  { loc: `${SITE_URL}/unblocked-games-world.html` },
  { loc: `${SITE_URL}/unblocked-games-999.html` },
  { loc: `${SITE_URL}/unblocked-games-76-ez.html` },
  { loc: `${SITE_URL}/tyrones-unblocked-games.html` },
];

const gameEntries = activeGames.map(g => ({
  loc:     `${SITE_URL}/games/${encodeURIComponent(g.url)}.html`,
  gameUrl: g.url,
  // Game thumbnail for image sitemap → Google Images discovery.
  img:     g.image ? gameThumb(g) : null,
}));

const catEntries = allTags.map(t => ({
  loc: `${SITE_URL}/games/cat-${encodeURIComponent(t)}.html`,
}));

// Static, landing and category pages: bump <lastmod> when their visible text changes (scripts, styles
// and tags stripped, so ad or nav markup alone does not count). Before 2026-11-25 these kept whatever
// date they first got, so the homepage claimed it last changed on 2026-05-23. A page with no stored
// hash yet is stamped today once, since it has certainly changed since its old date.
function staticChanged(loc) {
  if (loc.endsWith('/all-games.html')) return false;   // has its own signature above
  const rel = loc === `${SITE_URL}/` ? 'index.html' : loc.replace(`${SITE_URL}/`, '');
  let html; try { html = fs.readFileSync(path.join(ROOT, decodeURIComponent(rel)), 'utf8'); } catch { return false; }
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const key = 'page:' + rel, sig = require('crypto').createHash('sha1').update(text).digest('hex').slice(0, 16);
  newSigs[key] = sig;
  return prevSigs[key] !== sig;
}
const indexableStatic = staticEntries.filter(e => !NOINDEX_LANDING.has(e.loc.replace(`${SITE_URL}/`, '').replace(/\.html$/, '')));
const allEntries = [...indexableStatic, ...catEntries, ...gameEntries];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries.map(e => {
  // Bump lastmod only for game pages whose content changed this run;
  // everything else keeps its previous date so the sitemap stays trustworthy.
  const bumped = (e.gameUrl && changedUrls.has(e.gameUrl))
    || (e.loc.endsWith('/all-games.html') && changedUrls.has('__all-games__'))
    || (!e.gameUrl && staticChanged(e.loc));
  const lastmod = bumped ? today : (prevLastmod[e.loc] || today);
  const imageTag = e.img ? `\n    <image:image><image:loc>${esc(e.img)}</image:loc></image:image>` : '';
  return `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${lastmod}</lastmod>${imageTag}\n  </url>`;
}).join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP, sitemapXml, 'utf8');
fs.writeFileSync(SIG_FILE, JSON.stringify(newSigs, null, 1));
console.log(`Sitemap: rewrote with ${allEntries.length} URLs (${gameEntries.length} games, ${catEntries.length} categories, ${indexableStatic.length} static/landing)`);
