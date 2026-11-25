#!/usr/bin/env node
// Generates the high-intent SEO landing pages targeting the
// "unblocked games 66/76/77/wtf/premium" keyword cluster.
// Run with: node scripts/gen-landing-pages.js

const fs   = require('fs');
const path = require('path');
const NOINDEX_LANDING = require('./noindex-landing'); // rival-named pages: noindex,follow

const ROOT       = path.join(__dirname, '..');
const GAMES_JSON = path.join(ROOT, 'assets', 'games.json');
const OUT_DIR    = ROOT;
const SITE_URL   = 'https://ubghyper.github.io';
// Shard-aware game asset URLs — keep in sync with utils.js.
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

// Direct gtag is the SINGLE GA4 configuration owner (GROW-001) — the empty
// GTM-KBPRR2NP container was removed site-wide. Do not reintroduce a GTM loader.
const GA_ID      = 'G-VE9J0CCHWZ';

const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'))
  .filter(g => g && g.name && g.url && g.status !== 'broken');

// Game count rounded DOWN to nearest 10 so the title stays stable for SEO
// across game additions/removals. 430-439 all render as "430+", only
// flipping to "440+" once we cross 440. Stability matters more than
// precision here — Google penalises sites whose titles keep changing.
const GAME_COUNT = Math.floor(games.length / 10) * 10;
const N = `${GAME_COUNT}+`;

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Top games by GA pageviews. Pulled from data/View_user_engagement.csv.
// Expanded to 60 entries for richer landing-page game grids.
const topUrls = [
  'Drive-Mad', 'Level-Devil', 'Slope', 'Basket-Random', 'Polytrack-New',
  '2048', 'Crossy-Road', 'Bloons-TD-5', 'Stickman-Hook', 'Gladihoppers',
  'Cookie-Clicker', 'Awesome-Planes', 'Retro-Bowl', 'AmongUs-Online-2', 'Happy-Wheels',
  'Block-Blast', 'Drift-Boss', 'AmongUs-Online', 'Blackjack', 'Line-Rider-2',
  'Basketball-Legends-2020', 'Bartender-The-Right-Mix', 'Fruit-Ninja', 'Tiny-Fishing', 'Minecraft',
  'Moto3XM', 'Tunnel-Rush-2', 'Burrito-Bison-3', 'Eggy-Car', 'Snow-Rider-3D',
  'Cuphead', 'Buckshot-Roulette', 'Plants-VS-Zombies-2', 'CrazyCattle3d', 'Run-3',
  'Jelly-Drift', 'Bendy', 'Minecraft', 'Soccer-Random', 'Paper-IO-2',
  'People-Playground', 'Basketball-Stars', 'Idle-Breakout', 'Effing-Worms', 'Stick-Merge-2',
  'Minecraft-Case-Simulator', 'Hollow-Knight', 'Sandboxels', 'Rooftop-Snipers', 'Vex-8',
  'Polytrack-Modded', 'Polytrack-Old', 'Fireboy-and-Watergirl', 'Mini-Metro', 'Doodle-Jump',
  'Mutilate-A-Doll-Two', 'Tetris', 'Bloxorz', 'Sift-Heads-1', 'Riddle-School-1',
];

const featured = topUrls
  .map(u => games.find(g => g.url === u && g.status !== 'broken'))
  .filter(Boolean);

// Recent additions (last 12 games marked `new:true` and not broken) for the
// "What's new" section on each landing page.
const recentAdditions = games
  .filter(g => g.new && g.status !== 'broken')
  .slice(0, 12);

function gameCard(g) {
  const img = `${gameThumbView(g)}`;
  const url = `games/${encodeURIComponent(g.url)}.html`;
  return `<a href="${url}" class="game-card" aria-label="Play ${esc(g.name)} Unblocked">
    <div class="game-thumb">
      <img src="${esc(img)}" alt="${esc(g.name)} Unblocked" width="160" height="160" loading="lazy" decoding="async" onerror="this.style.display='none'">
    </div>
    <div class="game-info">
      <span class="game-name">${esc(g.name)}</span>
    </div>
  </a>`;
}

const cardGrid = featured.map(gameCard).join('\n');

// A page may show its own game set instead of the global top list — a topic page
// is only credible if the games on it match the topic.
function featuredFor(p) {
  if (!p.featuredUrls) return featured;
  return p.featuredUrls
    .map(u => games.find(g => g.url === u && g.status !== 'broken'))
    .filter(Boolean);
}

// ── Landing-page configs ──────────────────────────────────────
const pages = [
  {
    // Minecraft is the highest-volume non-brand term the catalogue can honestly
    // claim, and the only one with a real differentiator behind it: Eaglercraft
    // servers with no account, and online-mode Java servers over HyperTunnel.
    slug: 'minecraft-unblocked',
    h1: 'Minecraft Unblocked',
    title: 'Minecraft Unblocked — Play Minecraft Free in Your Browser at School',
    desc: 'Play Minecraft unblocked in your browser: Eaglercraft 1.12.2 and 1.8.8, Minecraft Classic and Pocket Edition. No download or account, and it works on Chromebooks.',
    featuredUrls: [
      'Minecraft', 'Eaglercraft', 'Minecraft-Pocket-Edition',
      'Minecraft-Online', 'Minecraft-Case-Simulator',
    ],
    intro: `<p><strong>Minecraft unblocked</strong> means playing real Minecraft in a browser tab — no launcher, no download, no install, and nothing for a school filter to block. UBGHyper runs <strong>Eaglercraft</strong>, a full browser port of Minecraft Java Edition, so you get actual survival and creative mode with your worlds saved in the browser.</p>
<p>Two versions are worth knowing about. <strong>1.12.2</strong> is the newer build — more blocks, more mobs, and the combat and world generation most people remember. <strong>1.8.8</strong> is the classic PvP version, lighter on older Chromebooks and still what most minigame servers run.</p>
<p>Everything below runs instantly in the browser. Pick a version and start playing, or read on for how to <a href="#servers">join multiplayer servers</a>.</p>`,
    h2: 'Every Minecraft game on UBGHyper',
    angle: `<h2 id="servers">Playing multiplayer — servers, accounts, and what actually works</h2>
<p>This is where browser Minecraft gets confusing, so here it is plainly. There are two different kinds of server, and they have different requirements.</p>
<h3>Eaglercraft servers — free, no account needed</h3>
<p>Eaglercraft has its own server network, and you can join it from the browser with <strong>no Microsoft account and no sign-up</strong>. Open a version above, go to Multiplayer, and add a server address such as <code>xena.mc</code>. That is the whole process. These servers run survival, creative, minigames and PvP, and they are the fastest way to play with other people at school.</p>
<h3>Regular Java Edition servers — needs an account and a tunnel</h3>
<p>Joining a normal online-mode Minecraft server (the kind you'd join from the desktop launcher) is harder, because browsers cannot open raw TCP connections and online-mode servers require a genuine Mojang/Microsoft login. Two things are needed:</p>
<ul>
  <li><strong>A Microsoft account that owns Minecraft Java Edition.</strong> Online-mode servers verify ownership — there is no way around this, and anyone claiming otherwise is selling something.</li>
  <li><strong>A tunnel to carry the connection.</strong> The browser talks WebSocket; the server speaks raw TCP. Something has to translate between them, which is what HyperTunnel does — it's built by us and designed for locked-down school networks. From <strong>$4/month</strong> with a 3-day money-back guarantee.</li>
</ul>
<p>If you just want to play Minecraft with friends and don't own the game, stick with the Eaglercraft servers above — they're free and they work.</p>

<h2>Which version should you play?</h2>
<ul>
  <li><strong><a href="games/Minecraft.html">Minecraft 1.12.2</a> —</strong> the best default. Newer blocks, mobs and world generation, full survival and creative. Pick this unless you have a reason not to.</li>
  <li><strong><a href="games/Eaglercraft.html">Eaglercraft 1.8.8</a> —</strong> the classic PvP version. Lighter, so it's the better choice on an older or low-RAM Chromebook, and it's what most minigame servers still run.</li>
  <li><strong><a href="games/Minecraft-Pocket-Edition.html">Pocket Edition</a> —</strong> the mobile-style version, good with a touchscreen.</li>
  <li><strong><a href="games/Minecraft-Online.html">Minecraft Classic</a> —</strong> the original 2009 creative-only version. Tiny, instant, no survival.</li>
</ul>

<h2>Does it work on a school Chromebook?</h2>
<p>Yes, and that's the point of running it in a browser. There's no installer, no launcher and no Java runtime — it's a web page, so managed Chromebooks that block downloads and app installs can still run it. Eaglercraft is demanding for a browser game, so on older hardware use 1.8.8, turn the render distance down, and close other tabs.</p>
<p>Your worlds are saved in the browser's local storage on that device. They survive closing the tab, but they don't follow you to another computer, and clearing browsing data will delete them. Use the in-game world export if you want a backup.</p>`,
    faqs: [
      { q: 'Is Minecraft unblocked free to play here?', a: 'Yes. Eaglercraft 1.12.2, 1.8.8, Minecraft Classic and Pocket Edition all run free in your browser with no account and no download. Only joining regular online-mode Java servers costs anything, because that needs a Microsoft account that owns Minecraft plus a tunnel.' },
      { q: 'Do I need a Minecraft account?', a: 'Not for singleplayer or for Eaglercraft servers — those work with no account at all. You only need a Microsoft account that owns Minecraft Java Edition to join regular online-mode servers.' },
      { q: 'Can I join multiplayer servers?', a: 'Yes. Eaglercraft servers such as xena.mc are free and need no account — open Multiplayer, add the address, and join. Regular Java Edition servers additionally need a Microsoft account and a tunnel like HyperTunnel, because browsers cannot open the raw TCP connections those servers use.' },
      { q: 'What is the difference between 1.12.2 and 1.8.8?', a: '1.12.2 is newer: more blocks, more mobs, and updated world generation and combat. 1.8.8 is the classic PvP version — lighter on older Chromebooks and still the standard for most minigame servers.' },
      { q: 'Will it run on a school Chromebook?', a: 'Yes. It runs entirely in the browser with nothing to install, so it works on managed Chromebooks that block downloads. On older hardware use 1.8.8, lower the render distance, and close other tabs.' },
      { q: 'Are my worlds saved?', a: 'Yes, in your browser\'s local storage on that device. They survive closing the tab but do not sync between devices, and clearing browsing data removes them. Export a world in-game if you want a backup.' },
      { q: 'Is this the real Minecraft?', a: 'It is Eaglercraft, an open-source browser port of Minecraft Java Edition built by lax1dude. The gameplay, blocks and worlds are the real thing running in JavaScript, not a clone or an imitation.' },
    ],
  },
  {
    slug: 'unblocked-games-66',
    h1: 'Unblocked Games 66',
    title: 'Unblocked Games 66 — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games 66 — play __GAME_COUNT__ free unblocked games at school on UBGHyper. Slope, Drive Mad, Level Devil, Retro Bowl, Bloons TD, and more. No downloads, works on Chromebooks.',
    intro: `<p><strong>Unblocked Games 66</strong> is one of the most popular search terms for free school-friendly browser games — and UBGHyper is the cleaner, faster replacement. With <strong>__GAME_COUNT__ unblocked games</strong> spanning every genre, every game runs instantly in your browser with zero downloads, sign-ups, or installations.</p>
<p>The classic Unblocked Games 66 sites are mostly dead, broken, or buried in pop-up ads. UBGHyper picks up where they left off: clean interface, fast load times, working games, no annoying redirects. Plus a built-in <strong>tab disguise</strong> that camouflages the page as Google Classroom or Khan Academy if a teacher walks by.</p>
<p>Below are the top 30 most-played games on UBGHyper right now. Or browse the <a href="/">full library of __GAME_COUNT__ games</a>, or jump straight to a category like <a href="games/cat-shooter.html">shooters</a>, <a href="games/cat-strategy.html">strategy</a>, or <a href="games/cat-puzzle.html">puzzle</a>.</p>`,
    h2: 'Most popular games on UBGHyper',
    angle: `<h2>Why UBGHyper beats the original Unblocked Games 66 sites</h2>
<ul>
  <li><strong>Zero pop-up ads on the game player.</strong> No redirect storms when you click a game. The old UG66 sites have become almost unusable on school networks because of aggressive ad networks.</li>
  <li><strong>Built-in tab disguise.</strong> One click and your tab looks like Google Classroom, Khan Academy, or a Google Doc. The old sites have no such feature.</li>
  <li><strong>Hand-tested library.</strong> Broken games are flagged or removed, not left to rot like on the legacy directories. Every game on this list works as of this week.</li>
  <li><strong>Modern HTML5 + Ruffle for Flash.</strong> Even Flash-era classics (Riddle School, Sift Heads, Bloons TD, Hobo) play smoothly via Ruffle emulation — no Adobe Flash plugin needed.</li>
</ul>

<h2>A quick history of "Unblocked Games 66"</h2>
<p>The original Unblocked Games 66 was a Google Sites page set up by a student in the early 2010s. The format — a long, lightly-organized list of free browser games on a domain school filters didn't block — caught on, and dozens of clones followed: UG 67, 76, 77, 88, 99, 911, WTF, premium, and so on. Most were built on Google Sites or simple Weebly templates, hosted Flash games via iframes, and survived on word-of-mouth between students.</p>
<p>Two things killed most of those original sites: Flash retired in December 2020 (taking ~80% of the game library with it), and the school-filter arms race got serious — IT departments started blocking entire domains, not just keyword matches. The classic UG66 sites that are still up today are mostly broken, half-empty, and weighed down by aggressive ad networks that hijack new tabs.</p>
<p>UBGHyper is a from-scratch rebuild. The library is current, every game is tested, there are no pop-ups or redirects, and the games run on Ruffle (an open-source Flash emulator) so the Flash classics work again on Chromebooks where Adobe Flash never will. We host on github.io, which is allow-listed on most school networks because it's also used for legitimate student projects.</p>

<h2>What to play first if you came from Unblocked Games 66</h2>
<p>If you remember the original UG66 catalogue, here's the UBGHyper equivalent of the most-loved titles:</p>
<ul>
  <li><strong>Run and Slope era →</strong> <a href="games/Run-3.html">Run 3</a>, <a href="games/Slope.html">Slope</a>, <a href="games/Polytrack-New.html">PolyTrack</a>, <a href="games/Snow-Rider-3D.html">Snow Rider 3D</a></li>
  <li><strong>Flash classics →</strong> <a href="games/Riddle-School-1.html">Riddle School 1-5</a>, <a href="games/Hobo-1.html">Hobo 1-7</a>, <a href="games/Sift-Heads-1.html">Sift Heads</a>, <a href="games/Bloons-TD-5.html">Bloons TD 5</a>, <a href="games/Happy-Wheels.html">Happy Wheels</a></li>
  <li><strong>Idle / clicker →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Idle-Breakout.html">Idle Breakout</a>, <a href="games/Learn-To-Fly-2.html">Learn to Fly 2</a></li>
  <li><strong>Sports →</strong> <a href="games/Retro-Bowl.html">Retro Bowl</a>, <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Soccer-Random.html">Soccer Random</a>, <a href="games/Basketball-Stars.html">Basketball Stars</a></li>
  <li><strong>Modern hits (post-Flash) →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Minecraft.html">Minecraft 1.12</a>, <a href="games/Block-Blast.html">Block Blast</a>, <a href="games/Cuphead.html">Cuphead</a></li>
</ul>
<p>Or just hit Random on the <a href="/">homepage</a> and let the library pick for you.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 66?', a: 'Unblocked Games 66 is a longstanding term for free browser games that work on school networks. UBGHyper is a modern alternative — same idea, far better selection, no ads, no broken games, and a clean interface.' },
      { q: 'Is UBGHyper the same as Unblocked Games 66?', a: 'No, but it serves the same purpose. UBGHyper is an independent unblocked games library with __GAME_COUNT__ games hand-picked and tested to work on school networks.' },
      { q: 'Are these games safe?', a: 'Yes. UBGHyper hosts games via clean iframes, has no pop-up ads, no malware, and no third-party redirects. Each game runs entirely in your browser.' },
      { q: 'Will these games work on my Chromebook?', a: 'Yes. Every game on UBGHyper runs in modern browsers including Chrome, Edge, Safari, and Firefox — including Chromebooks at school.' },
      { q: 'Do I need to log in?', a: 'No. UBGHyper requires no account. Your favourites and progress are saved in your browser locally.' },
      { q: 'Is UBGHyper related to the original UG66 / 76 / WTF sites?', a: 'No — UBGHyper is independent. Those legacy sites are aging, ad-heavy, and many are abandoned. UBGHyper is actively maintained with new games added regularly.' },
      { q: 'Can I add a game to my favourites without an account?', a: 'Yes. Favourites are stored in your browser\'s localStorage. They survive between visits on the same device but don\'t sync between devices unless you use the save export/import tool.' },
    ],
  },
  {
    slug: 'unblocked-games-76',
    h1: 'Unblocked Games 76',
    title: 'Unblocked Games 76 — __GAME_COUNT__ Free Online Games for Chromebook',
    desc: 'Unblocked Games 76 alternative — UBGHyper has __GAME_COUNT__ free unblocked games online including Slope, Run 3, Drive Mad, Cookie Clicker, Retro Bowl. Works at school, no downloads.',
    intro: `<p><strong>Unblocked Games 76</strong> has been a go-to for school browser games for years — but most of the original sites are now slow, ad-heavy, or out of date. UBGHyper is the modern alternative: <strong>__GAME_COUNT__ tested games</strong>, instant load, zero pop-ups.</p>
<p>If you're looking for the <em>76 unblocked games</em> experience but with new titles like Drive Mad, Level Devil, Polytrack, Minecraft 1.12, and Block Blast — you're in the right place. We've also kept the classics: Slope, Run 3, Cookie Clicker, Happy Wheels, Bloons TD, the Hobo series, Riddle School, Papa Louie, and dozens more Flash-era titles preserved with Ruffle.</p>
<p>Pick a game below or open the <a href="/">full UBGHyper library</a>. Want a specific genre? Try <a href="games/cat-racing.html">racing</a>, <a href="games/cat-platformer.html">platformer</a>, or <a href="games/cat-multiplayer.html">multiplayer</a>.</p>`,
    h2: 'Top 60 games on UBGHyper',
    angle: `<h2>What sets UBGHyper apart from the legacy UG76 sites</h2>
<ul>
  <li><strong>Save export / import.</strong> Most legacy sites lose your progress the moment you close a tab. UBGHyper saves to localStorage and has a built-in tool to export your saves and continue on another device.</li>
  <li><strong>Playtime stats + heatmap.</strong> A live record of which games you play, how long, and when. Useful for tracking your own time or for nostalgia trips through old sessions.</li>
  <li><strong>Continue playing shelf.</strong> The homepage shows games you played recently so you can pick up where you left off without scrolling through __GAME_COUNT__ titles.</li>
  <li><strong>Search + filter by category.</strong> 19 genre categories (racing, shooter, idle, puzzle, multiplayer, horror, etc.) with proper dedicated pages — not just a flat alphabetical list.</li>
</ul>

<h2>What's the difference between Unblocked Games 66, 76, and 77?</h2>
<p>Honestly: very little. They were all forks of the same Google Sites template, started by different students at different schools in the early-to-mid 2010s. The "66 / 76 / 77" numbers don't refer to anything specific — they're just sequence numbers picked by whoever set up the next clone. Over time each site drifted slightly: UG66 leaned toward action and shooters, UG76 became the most popular and added newer HTML5 titles, UG77 stayed closer to the Flash-era catalogue. Today the differences are mostly nostalgia — the original sites are mostly broken or ad-infested. UBGHyper unifies the whole catalogue: every classic from the 66 / 76 / 77 / WTF era plus the modern HTML5 titles released since 2020.</p>

<h2>Picks by how much time you have</h2>
<p>Different play sessions call for different games. Here's a quick-pick guide so you don't waste your free period scrolling:</p>
<ul>
  <li><strong>You have 2 minutes between classes →</strong> <a href="games/Drive-Mad.html">Drive Mad</a> (single-level retries), <a href="games/Basket-Random.html">Basket Random</a> (one match), <a href="games/2048.html">2048</a> (one game), <a href="games/Slope.html">Slope</a> (one run).</li>
  <li><strong>You have 15 minutes in a study hall →</strong> <a href="games/Retro-Bowl.html">Retro Bowl</a> (a full game), <a href="games/Polytrack-New.html">Polytrack</a> (a few championship races), <a href="games/Cuphead.html">Cuphead</a> (a couple of bosses), <a href="games/Block-Blast.html">Block Blast</a> (one session).</li>
  <li><strong>You have a full hour →</strong> <a href="games/Minecraft.html">Minecraft 1.12</a> (a full mining session), <a href="games/Cookie-Clicker.html">Cookie Clicker</a> (idle while you do other tabs), <a href="games/Bloons-TD-5.html">Bloons TD 5</a> (one map all the way through).</li>
  <li><strong>You want to compete →</strong> <a href="games/Slope.html">Slope</a>, <a href="games/Polytrack-New.html">PolyTrack</a>, <a href="games/Crossy-Road.html">Crossy Road</a>, <a href="games/Tetris.html">Tetris</a> — score-chase classics with leaderboards your friends can beat.</li>
  <li><strong>You want to play with a friend →</strong> <a href="games/Basket-Random.html">Basket Random</a> (2 players one keyboard), <a href="games/Fireboy-and-Watergirl.html">Fireboy and Watergirl</a>, <a href="games/Soccer-Random.html">Soccer Random</a>, <a href="games/AmongUs-Online-2.html">Among Us Online</a>.</li>
</ul>

<h2>Chromebook-specific notes</h2>
<p>Over half of UBGHyper traffic is from school Chromebooks. A few things that help:</p>
<ul>
  <li><strong>Fullscreen with F.</strong> Press F while in a game to go fullscreen — useful on small Chromebook screens.</li>
  <li><strong>Tab disguise.</strong> Press the backtick key (\`) or the camo button to disguise the tab as Google Classroom, Docs, Slides, Khan Academy, or Desmos. Title, favicon, and URL all change.</li>
  <li><strong>Save export.</strong> Chromebook profiles sometimes get reset by IT. The save-export tool at <a href="saves.html">/saves.html</a> lets you back up your progress to a JSON file and restore it on a different Chromebook.</li>
  <li><strong>Lower-power mode.</strong> If a game lags on an older Chromebook, try the lighter Flash-era titles (Hobo, Sift Heads, Riddle School) — they run smoothly even on 4GB Chromebooks where modern WebGL games stutter.</li>
</ul>`,
    faqs: [
      { q: 'What is Unblocked Games 76?', a: 'Unblocked Games 76 is a category of free browser games designed to bypass school network filters. UBGHyper continues that tradition with __GAME_COUNT__ working games.' },
      { q: 'How is UBGHyper different from Unblocked Games 76?', a: 'UBGHyper is faster, has no pop-ups, regularly updated, and includes modern features like tab disguise, playtime stats, and a save editor. Most original Unblocked Games 76 sites haven\'t been maintained in years.' },
      { q: 'Are all __GAME_COUNT__ games on UBGHyper free?', a: 'Yes — every single game is 100% free with no sign-up.' },
      { q: 'Can teachers see I\'m playing?', a: 'UBGHyper has a built-in tab-disguise feature: press the camo button (or the backtick key) to swap the tab title and favicon to Google Classroom, Khan Academy, or another school-friendly preset.' },
      { q: 'What\'s the most popular game right now?', a: 'Drive Mad, Retro Bowl, Slope, Subway Surfers and Granny are the five most-played games on UBGHyper right now.' },
      { q: 'Does UBGHyper have Drive Mad, Slope, and the other UG76 staples?', a: 'Yes — Drive Mad, Slope, Run 3, Cookie Clicker, Retro Bowl, Happy Wheels, Bloons TD 5, Eggy Car, Snow Rider 3D, Polytrack, Tunnel Rush 2, and all the other UG76 staples are on UBGHyper.' },
      { q: 'How often is the catalogue updated?', a: 'New games are added every few weeks. Broken or unmaintained games are removed promptly. The full library lives at /assets/games.json and is the single source of truth across the site.' },
    ],
  },
  {
    slug: 'unblocked-games-77',
    h1: 'Unblocked Games 77',
    title: 'Unblocked Games 77 — __GAME_COUNT__ Free Browser Games for Chromebook',
    desc: 'Unblocked Games 77 alternative with __GAME_COUNT__ free browser games — Slope, Drive Mad, Retro Bowl, Level Devil, Bloons TD, Minecraft 1.12, and more. No downloads, plays at school instantly.',
    intro: `<p><strong>Unblocked Games 77</strong> is yet another classic destination for school-friendly browser games. UBGHyper takes the same concept and modernises it: <strong>__GAME_COUNT__ unblocked games</strong>, fast page loads, no popup ads, automatic tab disguise.</p>
<p>Whether you remember the originals or you're just looking for free games that work at school, every UBGHyper title runs directly in your browser — no Flash plugin, no Java, no install. The catalogue covers everything from idle games to shooters to physics puzzles.</p>
<p>Browse the most popular games below, or check out the <a href="/">complete library</a>, the <a href="unblocked-games-66.html">Unblocked Games 66 list</a>, or <a href="unblocked-games-wtf.html">Unblocked Games WTF</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>Features the legacy UG77 sites can't match</h2>
<ul>
  <li><strong>Mobile-friendly responsive design.</strong> The legacy 77 sites are stuck in a desktop-only layout from 2015. UBGHyper works on phones, tablets, Chromebooks, and full desktops without breaking.</li>
  <li><strong>Light + dark mode.</strong> Light mode by default (easier on the eyes during a school day), one-tap dark mode for late-night sessions.</li>
  <li><strong>Random game button.</strong> Don't know what to play? Hit Random for an instant pick from the __GAME_COUNT__-strong library.</li>
  <li><strong>Keyboard shortcuts.</strong> Backtick to toggle tab disguise, /-key to jump to search. Faster than the mouse-only legacy sites.</li>
</ul>

<h2>Why are there so many "Unblocked Games" numbers? (66, 76, 77, 88, 99, 911...)</h2>
<p>It's the school-filter arms race. Every time IT departments block one URL, students set up the next one at a slightly different domain and a different number. The "77" branding just means "the next site after 76 got blocked." There were dozens of these forks at the peak of Flash-era unblocked games (2012-2018), but most are now defunct: the original creators graduated, hosting bills went unpaid, or Flash going away in 2020 took the catalogue with it.</p>
<p>UBGHyper is the modern consolidation: one maintained library that covers everything those scattered numbered sites used to host. Hosted on github.io (allow-listed at most schools), updated weekly, with a built-in tab cloak so a single blocked URL doesn't end the run.</p>

<h2>The complete Flash archive — playable again on Ruffle</h2>
<p>If you came to UG77 specifically for the Flash classics, here's the full archive UBGHyper has preserved via Ruffle (the open-source Flash emulator that loads automatically in your browser — no plugin needed):</p>
<ul>
  <li><strong>Adventure series:</strong> <a href="games/Riddle-School-1.html">Riddle School 1-5</a>, <a href="games/Hobo-1.html">Hobo 1-7</a>, <a href="games/Sift-Heads-1.html">Sift Heads 1-5</a>, <a href="games/Deep-Sleep-1.html">Deep Sleep 1-3</a>, <a href="games/Dont-Escape-1.html">Don't Escape 1-3</a>.</li>
  <li><strong>Tower defence:</strong> <a href="games/Bloons-Tower-Defence.html">Bloons TD 1-5</a>, <a href="games/Bubble-Tanks-TD-1.html">Bubble Tanks TD 1-2</a>, <a href="games/Bubble-Tanks-Arena.html">Bubble Tanks Arena</a>, <a href="games/Kingdom-Rush.html">Kingdom Rush</a>, <a href="games/Cursed-Treasure.html">Cursed Treasure 1-2</a>.</li>
  <li><strong>Platformers / action:</strong> <a href="games/Stick-War-1.html">Stick War 1-2</a>, <a href="games/Stick-RPG.html">Stick RPG</a>, <a href="games/Stick-Empires.html">Stick Empires</a>, <a href="games/Strikeforce-Heroes.html">Strikeforce Heroes</a>, <a href="games/Strikeforce-Kitty.html">Strikeforce Kitty 1-2</a>, <a href="games/Raze.html">Raze 1-2</a>.</li>
  <li><strong>Idle / clicker / sim:</strong> <a href="games/Learn-To-Fly-2.html">Learn to Fly 2-3</a>, <a href="games/Burrito-Bison.html">Burrito Bison 1-3</a>, <a href="games/Earn-To-Die.html">Earn to Die 1-2</a>, <a href="games/Into-Space-1.html">Into Space 1-3</a>.</li>
  <li><strong>Cooking / management (Papa Louie series):</strong> Papa's Pizzeria, Burgeria, Sushiria, Donuteria, Cheeseria, Bakeria, Cupcakeria, Hot Doggeria, Pancakeria, Wingeria, Pasteria, Scooperia, Freezeria — the whole set.</li>
  <li><strong>Reflex / arcade:</strong> <a href="games/qwop.html">QWOP</a>, <a href="games/Doodle-Jump.html">Doodle Jump</a>, <a href="games/Toss-the-turtle.html">Toss the Turtle</a>, <a href="games/Shopping-Cart-Hero.html">Shopping Cart Hero 1-3</a>, <a href="games/Achievement-Unlocked.html">Achievement Unlocked 1-3</a>.</li>
</ul>
<p>Plus the modern HTML5 catalogue that emerged after Flash — Drive Mad, Polytrack, Minecraft 1.12, Cuphead, Block Blast, Buckshot Roulette, and many more.</p>

<h2>How Ruffle works (and why it matters)</h2>
<p>Adobe officially killed Flash on December 31, 2020. Every browser shipped a final update that disabled the Flash plugin. That broke roughly 80% of the existing unblocked-games catalogue overnight — which is the real reason the legacy UG66 / 76 / 77 sites are mostly dead today.</p>
<p>Ruffle is an open-source replacement, written in Rust and compiled to WebAssembly, that runs Flash games natively in the browser without needing the plugin. UBGHyper loads Ruffle automatically when a Flash game is opened — there's nothing to install, no extension, no admin permissions needed. It just works, including on Chromebooks where Flash never worked anyway.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 77?', a: 'Unblocked Games 77 is a network of free browser games meant to work on filtered school internet. UBGHyper offers a maintained, modern version of the same idea.' },
      { q: 'Is UBGHyper better than Unblocked Games 77?', a: 'UBGHyper is regularly updated, has __GAME_COUNT__ working games, no popups, no malicious ads, and modern features like tab camouflage and progress saving. Most original 77 sites have not been maintained.' },
      { q: 'Will these games run on a school Chromebook?', a: 'Yes — all UBGHyper games are pure HTML5 or Ruffle (Flash emulation), which run on any modern browser including school Chromebooks.' },
      { q: 'Do I need an account?', a: 'No. UBGHyper requires zero sign-up. Your favourites are saved in your browser only.' },
      { q: 'How many games does UBGHyper have?', a: 'Over __GAME_COUNT__ hand-curated unblocked games across every genre.' },
      { q: 'Can I request a new game?', a: 'Yes — open a GitHub issue at github.com/UBGHyper with a link to the game source and we\'ll evaluate it. Most requests are added within a few days if a working HTML5 build exists.' },
      { q: 'What categories does UBGHyper have?', a: 'Racing, shooter, platformer, puzzle, strategy, idle, multiplayer, action, adventure, arcade, comedy, fighting, horror, physics, rpg, sandbox, simulation, sports, retro — 19 categories total, each with its own page.' },
    ],
  },
  {
    slug: 'unblocked-games-wtf',
    h1: 'Unblocked Games WTF',
    title: 'Unblocked Games WTF — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games WTF — UBGHyper has __GAME_COUNT__ free unblocked games for school. Slope, Drive Mad, Retro Bowl, Bloons TD, plus tab disguise so teachers don\'t notice.',
    intro: `<p><strong>Unblocked Games WTF</strong> is a search term used by millions of students every month looking for free school-friendly games. UBGHyper does the same job with a faster, cleaner site: <strong>__GAME_COUNT__ tested games</strong>, no random redirects, no autoplay video ads, no broken links.</p>
<p>And unlike the original Unblocked Games WTF, UBGHyper has a proper <strong>tab disguise feature</strong>: one click and the page looks like Google Classroom, Google Docs, or Khan Academy. Teachers walking past your screen see a school document, not a games site.</p>
<p>The 30 most-played games on UBGHyper are below. For more, the <a href="/">full library</a> has __GAME_COUNT__ games. You can also check our <a href="unblocked-games-66.html">UG 66</a>, <a href="unblocked-games-76.html">UG 76</a>, and <a href="unblocked-games-premium.html">UG Premium</a> collections.</p>`,
    h2: 'Top 60 games right now',
    angle: `<h2>What "WTF" actually means in this context</h2>
<p>"WTF" in Unblocked Games WTF doesn't mean anything adult — it's just been the branding for a popular school-bypass games site since the early 2010s. The actual catalogue is the same kind of family-friendly browser games you'd find on any unblocked site: physics puzzles, platformers, racing games, and idle clickers.</p>
<h2>Why students switch from Unblocked Games WTF to UBGHyper</h2>
<ul>
  <li><strong>No surprise NSFW ads.</strong> The legacy WTF sites have been infiltrated by aggressive ad networks that occasionally serve inappropriate content. UBGHyper has zero pop-ups and won't get you sent to the principal's office.</li>
  <li><strong>No tracker fingerprinting.</strong> UBGHyper uses analytics for traffic counts only — no behavioural fingerprinting, no third-party trackers selling your data.</li>
  <li><strong>Working games, not screenshots of dead games.</strong> Many of the legacy WTF listings are now links to removed Flash games with no Ruffle fallback. UBGHyper tests every game and either fixes or flags broken ones.</li>
  <li><strong>Updated for school networks.</strong> URL obfuscation (camo.js) helps games load past common school content filters that block keyword-matched URLs.</li>
</ul>

<h2>"My school blocked it" — what to do next</h2>
<p>Most school networks allow github.io because it hosts a lot of legitimate student projects, but some IT departments specifically blocklist the keyword "ubghyper" or the literal URL. Three things help:</p>
<ol>
  <li><strong>Tab cloak first, blocked-site notification second.</strong> If you can already see UBGHyper at school, hit the backtick key (\`) immediately on entry. The tab title, favicon, and URL bar all swap to Google Classroom or Khan Academy. A teacher peeking over your shoulder sees a school document, not "ubghyper.github.io".</li>
  <li><strong>Use a different network if the site itself is blocked.</strong> Many students switch to mobile data on their phone (turning Wi-Fi off on a Chromebook will fall back to a hotspot). This isn't a workaround for school policy — just an option for break time.</li>
  <li><strong>Use the GitHub project page mirror.</strong> UBGHyper is open-source — you can also reach it via the underlying github.io domain, which some filters miss when they only block the canonical URL.</li>
</ol>
<p>Either way: don't try to argue with a content filter or download a "VPN extension" from a random link. Those usually fail and sometimes get you in trouble. Tab disguise is the safest tool here.</p>

<h2>Pick a game by genre — quick links</h2>
<p>Instead of scrolling the full 60-game grid below, jump to a genre:</p>
<ul>
  <li><strong>Reflex / score-chasing →</strong> <a href="games/cat-arcade.html">arcade</a>: <a href="games/Slope.html">Slope</a>, <a href="games/Polytrack-New.html">PolyTrack</a>, <a href="games/2048.html">2048</a>, <a href="games/Tetris.html">Tetris</a>.</li>
  <li><strong>Driving / physics →</strong> <a href="games/cat-racing.html">racing</a>: <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Drift-Boss.html">Drift Boss</a>, <a href="games/Awesome-Cars.html">Awesome Cars</a>.</li>
  <li><strong>Tower defence / strategy →</strong> <a href="games/cat-strategy.html">strategy</a>: <a href="games/Bloons-TD-5.html">Bloons TD 5</a>, <a href="games/Kingdom-Rush.html">Kingdom Rush</a>, <a href="games/Stick-War-1.html">Stick War</a>.</li>
  <li><strong>Sports →</strong> <a href="games/cat-sports.html">sports</a>: <a href="games/Retro-Bowl.html">Retro Bowl</a>, <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Soccer-Random.html">Soccer Random</a>, <a href="games/Basketball-Stars.html">Basketball Stars</a>.</li>
  <li><strong>Life sim →</strong> <a href="games/cat-simulation.html">simulation</a>: <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Sandboxels.html">Sandboxels</a>.</li>
  <li><strong>Multiplayer (with a friend on one keyboard) →</strong> <a href="games/cat-multiplayer.html">multiplayer</a>: <a href="games/Fireboy-and-Watergirl.html">Fireboy and Watergirl</a>, <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/AmongUs-Online-2.html">Among Us Online</a>.</li>
  <li><strong>Spooky / horror →</strong> <a href="games/cat-horror.html">horror</a>: <a href="games/Bendy.html">Bendy</a>, <a href="games/Buckshot-Roulete.html">Buckshot Roulette</a>, <a href="games/Slender.html">Slender</a>.</li>
</ul>

<h2>What teachers should know</h2>
<p>The phrase "unblocked games" sets off alarms for a lot of school IT departments. For what it's worth: UBGHyper hosts only family-friendly browser games, runs no malicious code, contains no pop-up ads, and uses no behavioural trackers. The "unblock" framing is about getting around overly-aggressive keyword filters, not about hiding adult content. Schools that want to allow recreational browser games in study halls or after-class periods can safely allow-list ubghyper.github.io.</p>`,
    faqs: [
      { q: 'What does WTF in Unblocked Games WTF mean?', a: 'It\'s an internet meme phrase ("what the f...") used as branding for unblocked games sites since the early 2010s. The site itself is not adult-themed — it just hosts free browser games.' },
      { q: 'Is Unblocked Games WTF safe?', a: 'The original sites can be hit-or-miss with ads. UBGHyper offers a clean alternative — no popups, no malware, no third-party redirects.' },
      { q: 'Can I play these at school?', a: 'Yes. UBGHyper is built specifically to work on school networks, with a built-in tab-disguise feature for extra discretion.' },
      { q: 'Do these games cost money?', a: 'No. Every game on UBGHyper is 100% free, forever. No premium tier, no upgrades, no subscriptions.' },
      { q: 'How do I find a specific game?', a: 'Use the search bar on the homepage, or filter by category. Popular categories include racing, shooter, platformer, idle, multiplayer, and puzzle.' },
      { q: 'Will this site get blocked at my school?', a: 'UBGHyper is on a github.io domain, which is allowed on most school networks because it\'s also used for legitimate student projects. The tab-disguise feature is there in case a single school admin specifically blocks it later.' },
      { q: 'Are the WTF games on UBGHyper the same ones from the original site?', a: 'Many overlap (Slope, Run 3, Bloons TD, Happy Wheels, the Hobo series, Riddle School, Sift Heads, etc.) plus a lot of newer modern HTML5 games the legacy WTF sites never picked up.' },
    ],
  },
  {
    slug: 'unblocked-games-premium',
    h1: 'Unblocked Games Premium',
    title: 'Unblocked Games Premium — __GAME_COUNT__ Free Games for Chromebook',
    desc: 'Unblocked Games Premium alternative — UBGHyper offers __GAME_COUNT__ premium-quality unblocked games free, with no pop-ups and no sign-up. Drive Mad, Slope, Retro Bowl, and more.',
    intro: `<p><strong>Unblocked Games Premium</strong> is a newer entry in the unblocked-games space — but with UBGHyper there's no "premium" tier needed. <strong>All __GAME_COUNT__ games are free.</strong> No tiers, no upgrades, no paywalls, no sign-up.</p>
<p>If you're searching for "unblocked games premium" because you want better-quality games than the typical school-network site offers, UBGHyper has hand-curated titles including <em>Drive Mad</em>, <em>Slope</em>, <em>Retro Bowl</em>, <em>Bloons TD 5</em>, <em>Cuphead</em>, <em>Polytrack</em>, and dozens of modern HTML5 games. Every game is tested. Broken games are removed. New games are added regularly.</p>
<p>Below are the most-played games on UBGHyper. Or open the <a href="/">full library</a>.</p>`,
    h2: 'Most-played games on UBGHyper',
    angle: `<h2>What you actually get on UBGHyper that "premium" sites charge for</h2>
<ul>
  <li><strong>Nothing over the game.</strong> No video pre-rolls and no ads covering the game itself. Everything that the "premium" sites gate behind a subscription is just standard on UBGHyper.</li>
  <li><strong>Full library access from day one.</strong> No tier system — you get all __GAME_COUNT__ games immediately, no email required, no "unlock the rest with premium" prompts.</li>
  <li><strong>Modern AAA-port-quality games.</strong> Minecraft 1.12 (a full Minecraft session in a browser), Polytrack (a real racing game with tracks you build), Hollow Knight, Buckshot Roulette — these are the kind of titles "premium" sites charge for that we host free.</li>
  <li><strong>Tab disguise, save tools, stats heatmap.</strong> Quality-of-life features you only see on paid sites — free here.</li>
</ul>

<h2>Free vs "Premium" unblocked games — what you actually get</h2>
<p>Most "Unblocked Games Premium" sites pitch a $5-$10/month subscription for a small set of upgrades. Here's what they typically gate, and what UBGHyper does for free:</p>
<ul>
  <li><strong>"No pop-ups"</strong> — Premium sites: paywall. UBGHyper: free, always.</li>
  <li><strong>"Save your progress"</strong> — Premium sites: paywall via account. UBGHyper: free via browser localStorage + an export tool at <a href="saves.html">/saves.html</a> so you can move saves between devices without signing up.</li>
  <li><strong>"More games / full library"</strong> — Premium sites: free tier shows a teaser, premium unlocks the rest. UBGHyper: all __GAME_COUNT__ games are visible and playable from the homepage. No tiers.</li>
  <li><strong>"No download required"</strong> — Premium sites: all unblocked games sites are no-download. This is not a premium feature, just marketing.</li>
  <li><strong>"Works on Chromebooks"</strong> — Premium sites: same. UBGHyper: same. Also not a premium feature.</li>
  <li><strong>"Latest games"</strong> — Premium sites: pay to access. UBGHyper: <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Block-Blast.html">Block Blast</a>, <a href="games/Cuphead.html">Cuphead</a>, <a href="games/Buckshot-Roulete.html">Buckshot Roulette</a>, <a href="games/Minecraft.html">Minecraft 1.12</a> are all free here, added as soon as they're available.</li>
</ul>

<h2>The "premium-quality" games on UBGHyper</h2>
<p>Beyond the classic flash-era catalogue, UBGHyper hosts modern HTML5 ports that look and play like commercial games — the kind of titles "premium" sites use to justify their subscription:</p>
<ul>
  <li><strong><a href="games/Minecraft.html">Minecraft 1.12</a></strong> — full Minecraft 1.12 running natively in your browser. Worlds save to localStorage. Multiplayer works over WebSockets.</li>
  <li><strong><a href="games/Cuphead.html">Cuphead</a></strong> — the 1930s-cartoon boss rush. Notoriously hard, gorgeous, played as a browser port via emulation.</li>
  <li><strong><a href="games/hollowknight.html">Hollow Knight</a></strong> — the indie metroidvania classic, playable in browser. (Some browsers handle this better than others — Chrome and Edge tend to perform best.)</li>
  <li><strong><a href="games/Buckshot-Roulete.html">Buckshot Roulette</a></strong> — the recent viral horror gambling game. Tense, short, and surprisingly strategic once you learn the item interactions.</li>
  <li><strong><a href="games/Polytrack-New.html">Polytrack</a></strong> — a real racing game with a track editor, leaderboards, and competitive runs. Three versions on UBGHyper (Original, Modded, New).</li>
  <li><strong><a href="games/Retro-Bowl.html">Retro Bowl</a></strong> — the mobile-app football management classic, browser-playable here.</li>
  <li><strong><a href="games/Plants-VS-Zombies-2.html">Plants vs Zombies 2</a></strong> — the full tower-defence sequel.</li>
</ul>

<h2>Why is UBGHyper free when other sites charge?</h2>
<p>Two practical reasons. First, UBGHyper is hosted on GitHub Pages — there are no server costs, no bandwidth fees, no infrastructure bills to recoup. Second, the project is community-maintained: the game library is curated and tested in spare time, not by a paid team that needs salaries covered. The eventual revenue plan is one media.net ad slot in the sidebar (not on the game player), which keeps the site sustainable without paywalling features.</p>
<p>"Premium" pricing in the unblocked-games space mostly comes down to (a) marketing — making free features sound like paid ones — and (b) circumventing the cost of running an ad-supported site by charging users directly. Neither applies to UBGHyper.</p>`,
    faqs: [
      { q: 'Is Unblocked Games Premium really free?', a: 'On UBGHyper, yes — every one of the __GAME_COUNT__ games is free, with no premium tier, no payment, and no sign-up.' },
      { q: 'What makes UBGHyper better than other unblocked games sites?', a: 'No pop-ups or redirects, modern interface, hand-tested games (broken games are flagged), built-in tab disguise, save export/import, playtime tracking, and regular updates.' },
      { q: 'Do you have games like Drive Mad and Slope?', a: 'Yes. Drive Mad, Slope, Retro Bowl, Cookie Clicker, Bloons TD, and most other popular browser games are included.' },
      { q: 'Can I save my progress?', a: 'Yes. Progress is saved in your browser. UBGHyper also has a save export/import tool so you can move saves between devices.' },
      { q: 'How often are new games added?', a: 'New games are added regularly as they\'re identified and tested. Recent additions include Polytrack, Hollow Knight, Buckshot Roulette, and Minecraft 1.12.' },
      { q: 'Why is UBGHyper free when other sites charge?', a: 'UBGHyper is community-maintained and hosted free on GitHub Pages. No server costs to recoup, no business model, no subscription gating. Sustained by zero-cost infrastructure and an upcoming media.net ad slot in the sidebar (not on the game itself).' },
      { q: 'Are paid "premium" unblocked games sites worth it?', a: 'Almost never. The same games are typically available free on UBGHyper or similar maintained sites. "Premium" is mostly marketing.' },
    ],
  },
  {
    slug: 'github-unblocked-games',
    h1: 'Unblocked Games on GitHub',
    title: 'Unblocked Games on GitHub — __GAME_COUNT__ Free Games Hosted on github.io',
    desc: 'Unblocked games hosted on GitHub Pages: UBGHyper has __GAME_COUNT__ free browser games at ubghyper.github.io, including Slope, Drive Mad and Cuphead. No download or sign-up.',
    intro: `<p>If you're searching for <strong>unblocked games on GitHub</strong> — you found the right place. UBGHyper lives on <code>github.io</code> precisely because most school networks <em>allow GitHub Pages</em>. Schools host student coding projects on github.io, so blocking the whole domain would break legitimate classwork. That makes GitHub-hosted unblocked games sites one of the most reliable ways to play at school.</p>
<p>We have <strong>__GAME_COUNT__ free unblocked games</strong> — every one hand-tested and running directly in your browser. No downloads, no extensions, no sign-ups. The whole site is open source: <a href="https://github.com/UBGHyper" target="_blank" rel="noopener">github.com/UBGHyper</a>.</p>
<p>Pick a game below, or jump straight to <a href="all-games.html">the full A–Z list</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>Why GitHub Pages is the best place to host unblocked games</h2>
<p>Three reasons most "unblocked games" sites on github.io outlast the .com clones:</p>
<ul>
  <li><strong>GitHub Pages is on the school allow-list.</strong> Schools use GitHub Pages to host real student coding projects, hackathon submissions, club websites, and class assignments. Blocking the whole domain would break a lot of legitimate work, so most IT departments leave it alone. The .com unblocked-games sites get blocked individually as IT discovers each one — github.io subdomains are much harder to catch and play whack-a-mole with.</li>
  <li><strong>HTTPS with a real cert, free, forever.</strong> Every <code>*.github.io</code> URL gets a real GitHub TLS certificate. That matters for school filters: many school content filters block sites with self-signed or expired certs by default. A clean cert on a github.io subdomain looks identical to any other student project.</li>
  <li><strong>Zero-cost hosting = no abandonment.</strong> The legacy "Unblocked Games 66/76/WTF" sites mostly died because someone stopped paying the hosting bill. GitHub Pages is free forever as long as the repo stays under 1GB. UBGHyper has been hosted on github.io continuously and doesn't depend on subscription revenue to stay alive.</li>
</ul>

<h2>How to find unblocked games on GitHub</h2>
<p>If your school blocks UBGHyper specifically, here's how to find other working github-hosted unblocked games sites:</p>
<ol>
  <li><strong>Search Google for <code>site:github.io unblocked games</code>.</strong> This returns only github.io domains hosting unblocked games. Hundreds of student-built sites show up.</li>
  <li><strong>Search GitHub's repo list for <code>unblocked games</code>.</strong> Many of the most-starred repos on GitHub for "unblocked games" have a live GitHub Pages preview linked from their README.</li>
  <li><strong>Try the canonical short slugs.</strong> The most popular naming patterns: <code>{username}.github.io</code>, <code>{name}-games.github.io</code>, <code>only-games.github.io</code>, <code>{name}-hub.github.io</code>. A lot of working sites follow this pattern.</li>
  <li><strong>Use UBGHyper's tab cloak instead of switching sites.</strong> If your school admin specifically blocked <code>ubghyper.github.io</code>, the easier fix is to use the camo button (or press the backtick key) on first load — your tab title and favicon swap to Google Classroom, Docs, or Khan Academy. Most filters that block by URL don't re-scan tabs after the load.</li>
</ol>

<h2>What makes UBGHyper different from other github.io unblocked games sites</h2>
<p>There are dozens of github.io unblocked games sites. Most of them are forks of the same Glitch template with a flat alphabetical list. Here's what UBGHyper does differently:</p>
<ul>
  <li><strong>__GAME_COUNT__ hand-tested games.</strong> Many of the github.io clones host links to games that are now dead (Flash, removed sources, broken iframes). UBGHyper's game list is regenerated every push — broken games get flagged and removed.</li>
  <li><strong>Real categories.</strong> 19 genre pages (racing, shooter, idle, puzzle, multiplayer, horror, etc.) with their own dedicated landing pages — not just tags on a flat list.</li>
  <li><strong>Tab disguise built-in.</strong> One keypress and your tab looks like Google Classroom. Almost no other github.io site has this.</li>
  <li><strong>Save export / import.</strong> Move your Retro Bowl / Cookie Clicker / Bloons TD progress between devices. Most github.io sites use localStorage but offer no export — when your school resets your Chromebook profile, your saves are gone.</li>
  <li><strong>Playtime stats + heatmap.</strong> Live record of which games you play, how long, and when.</li>
  <li><strong>Continue playing strip.</strong> The homepage shows games you played recently. Other github.io sites either don't track this or surface it badly.</li>
  <li><strong>Open source.</strong> Every line of UBGHyper is visible at <a href="https://github.com/UBGHyper" target="_blank" rel="noopener">github.com/UBGHyper</a>. If you want to fork it and run your own site for your school, you can.</li>
</ul>

<h2>The fork-it-yourself path</h2>
<p>Worst case: your school's IT specifically blocks UBGHyper. The github.io trick is that <em>you can host your own copy</em> on your own subdomain in 5 minutes. Here's the gist:</p>
<ol>
  <li>Sign in to GitHub (it's free).</li>
  <li>Visit <a href="https://github.com/UBGHyper" target="_blank" rel="noopener">github.com/UBGHyper</a> and hit Fork.</li>
  <li>Rename the fork to <code>{your-username}.github.io</code> (any username works).</li>
  <li>Go to Settings → Pages → enable GitHub Pages on the main branch.</li>
  <li>Visit <code>{your-username}.github.io</code> — your personal mirror is live in a couple of minutes.</li>
</ol>
<p>This isn't a magic trick — it's just how GitHub Pages works for every developer. Your school filter sees a brand-new domain it has never indexed, and you've got a fresh URL it doesn't recognise. Use sparingly and with respect; the point is to give you a backup, not to start a war with your school's IT department.</p>`,
    faqs: [
      { q: 'Why are GitHub-hosted unblocked games sites harder to block?', a: 'School networks generally allow github.io because it hosts a lot of legitimate student coding projects and class assignments. Blocking the whole domain would break real schoolwork, so most IT departments leave it open. That makes github.io one of the most reliable hosts for unblocked games sites.' },
      { q: 'Is UBGHyper actually hosted on GitHub?', a: 'Yes — at ubghyper.github.io, with the full source at github.com/UBGHyper. It is a static site (HTML/CSS/JS only) deployed via GitHub Pages.' },
      { q: 'Can I see the source code?', a: 'Yes, all of it. The repo is public at github.com/UBGHyper. You can read it, fork it, or open a pull request to add a game.' },
      { q: 'Are GitHub Pages sites safe?', a: 'GitHub Pages serves static HTML/CSS/JS over HTTPS with a real cert. There is no server-side code, no database, no user accounts. UBGHyper specifically uses zero pop-up ads, no malware, and no third-party redirects.' },
      { q: 'How do I find other unblocked games sites on GitHub?', a: 'Search Google for "site:github.io unblocked games" — it returns only github.io domains. Or search the GitHub repo list at github.com/search?q=unblocked+games for source repos with live demos.' },
      { q: 'Can I host my own UBGHyper mirror?', a: 'Yes — fork the repo on GitHub, rename it to {your-username}.github.io, and enable Pages in the repo settings. The mirror is live in a couple of minutes on your own subdomain.' },
      { q: 'Does GitHub Pages cost anything?', a: 'No. GitHub Pages is free for public repos under 1GB, which is well beyond what an unblocked games site needs.' },
    ],
  },
  {
    slug: 'unblocked-games-67',
    h1: 'Unblocked Games 67',
    title: 'Unblocked Games 67 — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games 67 alternative — UBGHyper has __GAME_COUNT__ free unblocked games for school. Drive Mad, Slope, Retro Bowl, Cookie Clicker, and more. No downloads, works on Chromebook.',
    intro: `<p><strong>Unblocked Games 67</strong> is one of the dozens of forked sites in the "Unblocked Games 6X" family — but most of the originals are now broken, ad-heavy, or abandoned. UBGHyper is the modern equivalent: <strong>__GAME_COUNT__ unblocked games</strong>, instant load, zero pop-ups, hand-tested every push.</p>
<p>If you came here looking for the 67 catalogue specifically, the bad news is that most of the original 67-branded sites went dark when Flash retired in December 2020. The good news is we kept the catalogue alive via Ruffle (the open-source Flash emulator) — every classic from the 67/66/76/77 era plays here, plus modern HTML5 hits like Drive Mad, Polytrack, Cuphead, and Block Blast.</p>
<p>The top 30 most-played games on UBGHyper are below. Or browse <a href="all-games.html">the full A–Z list of __GAME_COUNT__ games</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>What "Unblocked Games 67" actually is</h2>
<p>Like UG66 and UG76, the "67" branding doesn't mean anything specific — it's just the sequence number of yet another Google Sites clone that students set up in the early-to-mid 2010s. The catalogues were nearly identical (same Flash games, same iframes, sometimes literally copy-pasted) but each site picked a slightly different number so it took school filters longer to find them. UG 6, 66, 67, 76, 77, 88, 99, 911, and dozens of others all came from the same playbook.</p>
<p>Today the 67-branded sites are mostly dead. The few that are still online are weighed down by aggressive ad networks (sometimes serving NSFW content), broken Flash links, and unmaintained codebases. UBGHyper is a from-scratch rebuild on github.io — same kind of catalogue, none of the legacy problems.</p>

<h2>What to play if you came from the original UG 67</h2>
<p>Here's the UBGHyper equivalent of the most-loved UG 67 titles, organised by genre:</p>
<ul>
  <li><strong>Physics platformer →</strong> <a href="games/Happy-Wheels.html">Happy Wheels</a>, <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Slope.html">Slope</a>, <a href="games/Snow-Rider-3D.html">Snow Rider 3D</a></li>
  <li><strong>Flash classics (now playing via Ruffle) →</strong> <a href="games/Riddle-School-1.html">Riddle School 1-5</a>, <a href="games/Hobo-1.html">Hobo 1-7</a>, <a href="games/Sift-Heads-1.html">Sift Heads 1-5</a>, <a href="games/Bloons-TD-5.html">Bloons TD 5</a></li>
  <li><strong>Idle / clicker →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Idle-Breakout.html">Idle Breakout</a>, <a href="games/Learn-To-Fly-2.html">Learn to Fly 2</a></li>
  <li><strong>Sports →</strong> <a href="games/Retro-Bowl.html">Retro Bowl</a>, <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Soccer-Random.html">Soccer Random</a>, <a href="games/Basketball-Stars.html">Basketball Stars</a></li>
  <li><strong>Modern HTML5 hits →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Block-Blast.html">Block Blast</a>, <a href="games/Cuphead.html">Cuphead</a></li>
</ul>

<h2>The 6X cluster, ranked</h2>
<p>If you're hopping between numbered sites looking for one that works, here's an honest 2026 ranking based on which still have working catalogues:</p>
<ol>
  <li><strong>UBGHyper</strong> — modern rebuild, __GAME_COUNT__ tested games, no pop-ups, github.io hosted.</li>
  <li><strong>Original UG 76</strong> — partially alive but ad-heavy and stuck in 2018 layout.</li>
  <li><strong>UG 66 / 67</strong> — mostly abandoned, broken Flash, occasional sketchy ads.</li>
  <li><strong>Various .com clones</strong> — usually one-person hobby sites that go offline within a few months.</li>
</ol>
<p>If a 67-branded site is still working for you, great — keep using it. If it's broken or feels unsafe, UBGHyper is the maintained alternative.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 67?', a: 'Unblocked Games 67 is one of the many numbered forks of the original "Unblocked Games 66" Google Sites template. The catalogues were nearly identical between numbered sites — the different numbers just helped each one survive a bit longer against school filters.' },
      { q: 'Are the original UG 67 sites still working?', a: 'Most of the 67-branded sites are now dead or unmaintained. Flash going away in December 2020 broke most of their catalogue, and many of the original creators graduated and stopped paying hosting bills. UBGHyper is the maintained modern alternative.' },
      { q: 'Does UBGHyper have the games that were on UG 67?', a: 'Yes — UBGHyper has the full Flash-era catalogue running on Ruffle (the open-source Flash emulator) plus the modern HTML5 titles released since 2020.' },
      { q: 'Will UBGHyper work on my school Chromebook?', a: 'Yes. Most users are on school Chromebooks. The site is hosted on github.io which is allowed on most school networks, and every game runs in modern browsers including Chrome on ChromeOS.' },
      { q: 'Is UBGHyper safe to use?', a: 'Yes — no popup ads, no malware, no third-party redirects, no behavioural trackers. Every game is hand-tested before being added to the catalogue.' },
      { q: 'How many games does UBGHyper have?', a: 'Over __GAME_COUNT__ hand-curated unblocked games across 19 genre categories.' },
      { q: 'How is the catalogue kept updated?', a: 'New games are added every few weeks. Broken games are flagged and removed. The full library lives at /assets/games.json as the single source of truth.' },
    ],
  },
  {
    slug: 'unblocked-games-6x',
    h1: 'Unblocked Games 6X',
    title: 'Unblocked Games 6X — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games 6X alternative — UBGHyper has __GAME_COUNT__ free unblocked games at github.io. Drive Mad, Slope, Retro Bowl, and more. No downloads, works on Chromebook.',
    intro: `<p><strong>Unblocked Games 6X</strong> (sometimes "Classroom 6X" or just "6x games") is one of the most-searched unblocked games keywords of 2026 — short, easy to remember, fits in a school filter exception. UBGHyper is the modern github.io alternative: <strong>__GAME_COUNT__ unblocked games</strong>, all hand-tested, all playable on a Chromebook in seconds.</p>
<p>If you searched "6x" expecting a specific site, the original UG 6X was a Google Sites page named for the 6x speed multiplier in old browser games. Like the rest of the numbered cluster (66, 67, 76, 77, 911, WTF), most of the original 6X sites are now dead. UBGHyper is the maintained replacement — github.io hosted, no pop-ups or ads over the game, tab-disguise built in.</p>
<p>The most-played games are below. Or jump straight to <a href="all-games.html">the full A–Z catalogue</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>Why "6x" became one of the biggest unblocked games keywords</h2>
<p>Three things pushed "6x" to the top of the unblocked-games keyword cluster:</p>
<ul>
  <li><strong>It's short.</strong> Easy to type fast in a school browser. Easy to remember. Easy to share between friends without it getting accidentally autocorrected.</li>
  <li><strong>It overlaps with "Classroom 6x" and "Google Classroom 6x"</strong>, which were originally a Google Apps Script project that hosted games inside what looked like a Google Classroom document. The naming overlap made "6x" a generic identifier for "school-friendly games hidden in plain sight."</li>
  <li><strong>School filters miss it.</strong> Most content filters blocklist specific words like "unblocked" and "games" — they don't usually have a rule for the literal string "6x" alone.</li>
</ul>

<h2>UBGHyper's 6X equivalents</h2>
<p>If you came here from a 6X-themed site, these are the closest matches in the UBGHyper catalogue, organised by what kind of session you want:</p>
<ul>
  <li><strong>Reflex / score-chasing →</strong> <a href="games/Slope.html">Slope</a>, <a href="games/Polytrack-New.html">PolyTrack</a>, <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/2048.html">2048</a>, <a href="games/Tetris.html">Tetris</a></li>
  <li><strong>Multiplayer (with a friend on one keyboard) →</strong> <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Fireboy-and-Watergirl.html">Fireboy and Watergirl</a>, <a href="games/Soccer-Random.html">Soccer Random</a>, <a href="games/AmongUs-Online-2.html">Among Us Online</a></li>
  <li><strong>Life sim →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Sandboxels.html">Sandboxels</a>, <a href="games/Retro-Bowl.html">Retro Bowl</a></li>
  <li><strong>Action / shooter →</strong> <a href="games/Cuphead.html">Cuphead</a>, <a href="games/hollowknight.html">Hollow Knight</a>, <a href="games/Buckshot-Roulete.html">Buckshot Roulette</a>, <a href="games/Karlson.html">Karlson</a></li>
  <li><strong>Driving / physics →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Drift-Boss.html">Drift Boss</a>, <a href="games/Awesome-Cars.html">Awesome Cars</a></li>
</ul>

<h2>Classroom 6X vs Unblocked Games 6X — they're not the same thing</h2>
<p>The two phrases get used interchangeably, but they originally meant different things:</p>
<ul>
  <li><strong>Classroom 6X</strong> was a Google Apps Script trick — embedding iframe games inside what looked like a Google Classroom document. The disguise was meant to fool teachers walking past your screen.</li>
  <li><strong>Unblocked Games 6X</strong> was a numbered fork of the UG 66 lineage, hosted at a domain that included "6x" somewhere in the URL.</li>
</ul>
<p>UBGHyper does both jobs better: __GAME_COUNT__ tested games (the UG side) plus a one-keypress tab cloak that swaps the page to look like Google Classroom, Khan Academy, Docs, Slides, or Desmos (the Classroom 6X side). One site, both behaviours.</p>

<h2>How to play 6X-style games on a Chromebook</h2>
<p>Most UBGHyper users are on school Chromebooks. Three quick tips:</p>
<ul>
  <li><strong>Fullscreen with F.</strong> Most games support pressing F to enter fullscreen — useful on small Chromebook screens where browser chrome eats the play area.</li>
  <li><strong>Tab cloak on first load.</strong> Press the backtick key (\`) as soon as the page loads. The tab title and favicon swap to Google Classroom (or pick from Docs, Khan Academy, Desmos in the dropdown). Even if a teacher looks at your tab list, all they see is school stuff.</li>
  <li><strong>Save export.</strong> Chromebook profiles sometimes get reset by IT. The <a href="saves.html">/saves.html</a> page lets you export your Retro Bowl / Cookie Clicker progress to a JSON file so you can restore it on a different Chromebook.</li>
</ul>`,
    faqs: [
      { q: 'What is Unblocked Games 6X?', a: 'Unblocked Games 6X is one of the most-searched unblocked games keywords — short, easy to remember, and used as a generic identifier for school-friendly free browser games. Most of the original 6X-branded sites are now dead. UBGHyper is the maintained github.io alternative.' },
      { q: 'Is Classroom 6X the same as Unblocked Games 6X?', a: 'Not exactly — Classroom 6X was originally a Google Apps Script trick that hid games inside what looked like a Google Classroom document. Unblocked Games 6X was a numbered fork of the UG 66 lineage. Today the names get used interchangeably. UBGHyper does both jobs — full game catalogue plus a built-in tab cloak that disguises the page as Google Classroom with one keypress.' },
      { q: 'Will UBGHyper work on my Chromebook?', a: 'Yes. Most of our users are on school Chromebooks. Every game runs in Chrome on ChromeOS without any extension, plugin, or admin permission.' },
      { q: 'How many games does UBGHyper have?', a: 'Over __GAME_COUNT__ hand-curated unblocked games across 19 genre categories.' },
      { q: 'Are these games safe to play at school?', a: 'Yes — no popup ads, no malware, no third-party redirects, no behavioural trackers. UBGHyper hosts games via clean iframes from tested sources only.' },
      { q: 'How do I disguise the tab so my teacher doesn\'t see?', a: 'Press the backtick key (`) or click the camo button. The tab title, favicon, and URL all swap to Google Classroom (or Docs, Khan Academy, Desmos, Slides from the dropdown). A teacher walking past sees a school document.' },
      { q: 'Why is UBGHyper hosted at github.io?', a: 'School networks generally allow github.io because it hosts a lot of legitimate student coding projects. Blocking the whole domain would break real schoolwork, so most IT departments leave it open. That makes github.io one of the most reliable hosts for unblocked games sites.' },
    ],
  },
  {
    slug: 'unblocked-games-chromebook',
    h1: 'Unblocked Games for Chromebook',
    title: 'Unblocked Games for Chromebook — __GAME_COUNT__ Free Games That Work on ChromeOS',
    desc: 'Unblocked games for Chromebook — UBGHyper has __GAME_COUNT__ free browser games tested on ChromeOS. Drive Mad, Slope, Retro Bowl, Cuphead. No downloads, no extensions needed.',
    intro: `<p><strong>UBGHyper is built for Chromebooks first.</strong> Over half of our active users are on school Chromebooks — so every game in the __GAME_COUNT__-title library is tested in Chrome on ChromeOS, every layout is optimised for the 1366×768 screens most school Chromebooks ship with, and the whole site loads in under a second on the constrained network speeds you typically get at school.</p>
<p>You don't need to install anything. No extensions, no admin permissions, no Linux container, no Android sideload. Open <a href="/">the homepage</a>, pick a game, play. Closing the tab ends the session cleanly — Chromebook profiles don't accumulate any cache or settings.</p>
<p>The top 30 Chromebook-tested games are below.</p>`,
    h2: 'Top Chromebook-tested games',
    angle: `<h2>Why most "unblocked games" sites are bad on Chromebooks</h2>
<p>Three Chromebook-specific reasons the legacy unblocked-games sites struggle:</p>
<ul>
  <li><strong>Flash games don't run.</strong> Chromebooks never had Adobe Flash properly installed — the plugin was sandboxed and unreliable even before Flash was killed in December 2020. Today, 100% of Flash-era games on the legacy sites just don't load on ChromeOS. UBGHyper runs every Flash classic via Ruffle (an open-source Flash emulator written in WebAssembly) — no plugin, no install, works natively on ChromeOS.</li>
  <li><strong>WebGL stutters on older Chromebooks.</strong> Many school Chromebooks are 4GB RAM, low-end Intel Celeron models that can't sustain 60fps WebGL games. UBGHyper has hundreds of lighter HTML5 and Ruffle titles that run smoothly even on entry-level Chromebooks — see "lighter games" picks below.</li>
  <li><strong>Popup ads break the back button.</strong> Some legacy sites have popup networks that hijack the back button or open new tabs that can't be closed properly. On a school Chromebook with limited resources, that crashes the whole browser. UBGHyper has zero popup ads on the player.</li>
</ul>

<h2>Lighter games for older Chromebooks (4GB RAM, Intel Celeron)</h2>
<p>If your Chromebook is the standard-issue 4GB Intel model, these games are the smoothest:</p>
<ul>
  <li><strong>Flash via Ruffle (very light) →</strong> <a href="games/Riddle-School-1.html">Riddle School 1-5</a>, <a href="games/Hobo-1.html">Hobo 1-7</a>, <a href="games/Sift-Heads-1.html">Sift Heads 1-5</a>, <a href="games/Cookie-Clicker.html">Cookie Clicker</a></li>
  <li><strong>Pure HTML5 (no WebGL) →</strong> <a href="games/2048.html">2048</a>, <a href="games/Tetris.html">Tetris</a>, <a href="games/Block-Blast.html">Block Blast</a></li>
  <li><strong>Single-canvas physics →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Drift-Boss.html">Drift Boss</a>, <a href="games/Stickman-Hook.html">Stickman Hook</a></li>
  <li><strong>Idle / clicker →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Idle-Breakout.html">Idle Breakout</a>, <a href="games/Idle-Mining-Empire.html">Idle Mining Empire</a></li>
</ul>

<h2>Heavier games (need a newer Chromebook with 8GB+ RAM)</h2>
<p>These look amazing but need more horsepower. If your Chromebook is a Lenovo Duet, HP x360, or Acer Spin from the last 2-3 years, you'll be fine:</p>
<ul>
  <li><a href="games/Cuphead.html">Cuphead</a> — gorgeous, demanding</li>
  <li><a href="games/hollowknight.html">Hollow Knight</a> — Metroidvania, large textures</li>
  <li><a href="games/Polytrack-New.html">Polytrack</a> — 3D racing with track editor</li>
  <li><a href="games/Minecraft.html">Minecraft 1.12</a> — full Minecraft 1.12 in browser</li>
  <li><a href="games/Plants-VS-Zombies-2.html">Plants vs Zombies 2</a> — heavy assets</li>
</ul>

<h2>Chromebook-specific keyboard shortcuts on UBGHyper</h2>
<ul>
  <li><kbd>/</kbd> — jump cursor to search box on the homepage. Faster than clicking.</li>
  <li><kbd>\`</kbd> (backtick, top-left of keyboard above Tab) — toggle tab disguise. Tab title, favicon, and URL bar all swap to Google Classroom (default), or pick from Docs, Khan Academy, Desmos, Slides in the dropdown.</li>
  <li><kbd>F</kbd> — fullscreen in most games. Useful on small Chromebook screens where the browser chrome eats too much space.</li>
  <li><kbd>Esc</kbd> — exit fullscreen.</li>
</ul>

<h2>What to do if UBGHyper is blocked at your school</h2>
<p>If you can see this page but a specific game doesn't load — that's usually a CORS issue with a single game's host, not a UBGHyper-level block. Try a different game in the same genre.</p>
<p>If the whole UBGHyper domain is blocked, your school has specifically added <code>ubghyper.github.io</code> to their blocklist. Two paths forward:</p>
<ol>
  <li><strong>Try a github.io mirror.</strong> The repo is open-source — you (or any other student) can fork it on GitHub and host the mirror at <code>{your-username}.github.io</code> in about 5 minutes. The mirror is a brand-new URL the school filter hasn't indexed.</li>
  <li><strong>Use UBGHyper at home, save progress, sync across devices.</strong> The <a href="saves.html">/saves.html</a> export tool lets you back up your saves to a JSON file, so even if school blocks one URL you can pick up where you left off elsewhere.</li>
</ol>

<h2>Save export for IT-reset Chromebooks</h2>
<p>School IT departments occasionally reset all Chromebook profiles — usually at the end of a term or when migrating to a new domain. That wipes localStorage and every game progress you've accumulated. UBGHyper's <a href="saves.html">save export</a> tool exports all your game saves as a JSON file you can email to yourself or save to Google Drive, then re-import on a fresh profile. The tool is unique to UBGHyper — none of the legacy unblocked-games sites have it.</p>`,
    faqs: [
      { q: 'Will UBGHyper work on my school Chromebook?', a: 'Yes — over half of our users are on school Chromebooks. Every game is tested on ChromeOS, the site loads under a second, and you don\'t need any extension, plugin, or admin permission.' },
      { q: 'Can I play Flash games on a Chromebook?', a: 'Yes — UBGHyper runs every Flash classic via Ruffle, an open-source Flash emulator written in WebAssembly. It loads automatically in your browser. No plugin, no install, works natively on ChromeOS where the original Flash plugin never did.' },
      { q: 'Which games are best for older 4GB Chromebooks?', a: 'The lightest options are Flash-era games via Ruffle (Riddle School, Hobo, Sift Heads, Cookie Clicker), pure HTML5 puzzlers (2048, Tetris, Block Blast), and single-canvas physics games (Drive Mad, Drift Boss, Stickman Hook). Heavy WebGL games like Cuphead, Hollow Knight, and Polytrack work better on newer 8GB+ Chromebooks.' },
      { q: 'Do I need to install an extension?', a: 'No. Zero installs. UBGHyper is a static site — every game runs in your browser tab, the same way Google Docs runs in a browser tab. Closing the tab ends the session cleanly.' },
      { q: 'My school IT reset my Chromebook and I lost progress. Can I recover it?', a: 'If you exported your saves before the reset, yes — visit /saves.html, click Import, and select the JSON file. If you didn\'t export, the local progress is unfortunately gone. Going forward, the export tool at /saves.html lets you back up all your game saves to a JSON file you can email to yourself or save in Google Drive.' },
      { q: 'How do I make a game fullscreen on a Chromebook?', a: 'Most games support pressing F to enter fullscreen mode. Useful on small Chromebook screens where the browser chrome eats the play area. Press Esc to exit fullscreen.' },
      { q: 'Will my teacher see what game I\'m playing?', a: 'Press the backtick key (`) or click the camo button. The tab title, favicon, and URL all swap to Google Classroom (or Docs, Khan Academy, Desmos from the dropdown). A teacher walking past your screen sees a school document.' },
    ],
  },
  {
    slug: 'game-websites',
    h1: 'Game Websites',
    title: 'Game Websites — __GAME_COUNT__ Free Online Games on UBGHyper',
    desc: 'Game websites that work at school: UBGHyper has __GAME_COUNT__ free online games with no pop-ups or sign-up. See how it compares with Poki, CrazyGames and Coolmath.',
    intro: `<p>"<strong>Game websites</strong>" is one of the most common Google searches of 2026 — and the answers are usually a mess. Poki and Crazy Games are ad-saturated and slow. Coolmath Games is half-blocked at school and lacks the popular new titles. The legacy unblocked-games clones are mostly dead. UBGHyper is the alternative: <strong>__GAME_COUNT__ free online games</strong>, no pop-ups, hand-tested, works at school on Chromebook.</p>
<p>If you're looking for "game websites" in the broadest sense — any site with free browser games — UBGHyper covers every genre that the bigger sites do: racing, shooter, puzzle, idle, sports, multiplayer, horror, sandbox, simulation, fighting, platformer. The catalogue is curated, not algorithmic, which means every game is tested and bad games get removed.</p>
<p>The most-played games on UBGHyper are below.</p>`,
    h2: 'Most-played games on UBGHyper',
    angle: `<h2>UBGHyper vs other major game websites</h2>
<p>Honest comparison against the sites people usually try first:</p>
<ul>
  <li><strong>vs Poki</strong> — Poki has thousands of games but most are filler. Video pre-roll ads on the player. Algorithmic homepage that buries good games. UBGHyper: __GAME_COUNT__ hand-tested games, zero pre-rolls, curated by humans.</li>
  <li><strong>vs Crazy Games</strong> — Similar to Poki — large catalogue, ad-saturated player, autoplay video ads in the sidebar. UBGHyper: clean player, no autoplay anything.</li>
  <li><strong>vs Coolmath Games</strong> — Smaller, ad-supported, often blocked at school because the domain itself is on filter blocklists. UBGHyper: github.io domain (rarely blocked), runs at school, includes the popular non-math games Coolmath skips.</li>
  <li><strong>vs Kongregate / Newgrounds</strong> — Both great historically, but Newgrounds is partially blocked at most schools and Kongregate's Flash catalogue stopped working when Flash died. UBGHyper runs all the classic Flash games via Ruffle on Chromebooks.</li>
  <li><strong>vs Y8</strong> — Older site, dated layout, ad-heavy. UBGHyper: modern interface, no popups, regular updates.</li>
  <li><strong>vs Miniclip</strong> — Mostly mobile-focused now. Many of the famous Miniclip games (Bowmasters, 8-Ball Pool, Soccer Stars) are playable on UBGHyper directly in browser.</li>
  <li><strong>vs Armor Games</strong> — Great historically, much smaller now. UBGHyper has many of the Armor Games classics (Strikeforce Heroes, Cursed Treasure, Sentry Knight, Kingdom Rush) preserved via Ruffle.</li>
  <li><strong>vs unblocked-games-66/76/77/WTF clones</strong> — Mostly dead or ad-infested. UBGHyper is the maintained replacement.</li>
</ul>

<h2>What "good game website" means in 2026</h2>
<p>The bar has moved. Five things separate a good game website from a mediocre one today:</p>
<ul>
  <li><strong>No popup ads on the game player.</strong> Hard requirement. Any popup, autoplay video, or modal during gameplay = bad site.</li>
  <li><strong>Curated catalogue, not algorithmic.</strong> A hand-tested 500-game catalogue beats a 5000-game algorithmic catalogue every time, because the algorithmic version always buries the good games under filler.</li>
  <li><strong>Works at school.</strong> If the domain itself is blocklisted at most schools, the catalogue is irrelevant to the audience that uses these sites most.</li>
  <li><strong>Save progress locally.</strong> Browser localStorage. No account, no sign-up, no email required.</li>
  <li><strong>Mobile-friendly fallback.</strong> Even though most usage is desktop, the site should at least render properly on a phone.</li>
</ul>
<p>UBGHyper does all five.</p>

<h2>Genre directory</h2>
<p>Want a specific kind of game? Each genre has its own dedicated page with the full UBGHyper catalogue for that genre:</p>
<ul>
  <li><a href="games/cat-action.html">Action</a> — fast reflex, combat, intense pacing</li>
  <li><a href="games/cat-adventure.html">Adventure</a> — exploration, story, world-building</li>
  <li><a href="games/cat-arcade.html">Arcade</a> — score-chasing, retro-style, quick sessions</li>
  <li><a href="games/cat-fighting.html">Fighting</a> — 1v1 combat games</li>
  <li><a href="games/cat-horror.html">Horror</a> — spooky, jumpscares, atmospheric</li>
  <li><a href="games/cat-idle.html">Idle</a> — clickers, automation, low-attention games</li>
  <li><a href="games/cat-multiplayer.html">Multiplayer</a> — play with a friend on one keyboard or online</li>
  <li><a href="games/cat-physics.html">Physics</a> — ragdoll, rigid-body, momentum-based</li>
  <li><a href="games/cat-platformer.html">Platformer</a> — jumping, level traversal</li>
  <li><a href="games/cat-puzzle.html">Puzzle</a> — logic, pattern-matching, brain teasers</li>
  <li><a href="games/cat-racing.html">Racing</a> — cars, trucks, drift, formula</li>
  <li><a href="games/cat-retro.html">Retro</a> — older-style or revival games</li>
  <li><a href="games/cat-rpg.html">RPG</a> — role-playing, character progression</li>
  <li><a href="games/cat-sandbox.html">Sandbox</a> — open-ended, build/destroy, no win condition</li>
  <li><a href="games/cat-shooter.html">Shooter</a> — guns, projectiles, combat</li>
  <li><a href="games/cat-simulation.html">Simulation</a> — life sim, tycoon, management</li>
  <li><a href="games/cat-sports.html">Sports</a> — football, basketball, soccer</li>
  <li><a href="games/cat-strategy.html">Strategy</a> — tower defence, real-time, turn-based</li>
</ul>`,
    faqs: [
      { q: 'What\'s the best game website right now?', a: 'It depends on what you want. For curated, pop-up-free, school-friendly browser games, UBGHyper is the strongest choice — __GAME_COUNT__ hand-tested games, no popups, github.io hosted. For massive algorithmic catalogues, Poki and Crazy Games have more games but are ad-saturated. For math-focused games at school, Coolmath Games is fine but often blocked at the domain level.' },
      { q: 'Are game websites safe?', a: 'It varies. The major sites (Poki, Crazy Games, Coolmath, UBGHyper) are generally safe — no malware, no malicious ads. The smaller unmaintained "unblocked games" clone sites can be risky because they\'re aggressive with ad networks that occasionally serve sketchy content. Stick to maintained sites with good reputations.' },
      { q: 'What game websites work at school?', a: 'The most reliable are those hosted on github.io (UBGHyper and similar) because schools rarely block the whole github.io domain — too many legitimate student projects live there. Poki, Crazy Games, and Coolmath are often blocked at the domain level. The classic unblocked-games clones are blocked by keyword.' },
      { q: 'Which game websites have the fewest ads?', a: 'UBGHyper shows banner ads beside the game to pay for hosting, but never pop-ups, video pre-rolls or ads over the game itself. Many other free game websites play a video ad before each game.' },
      { q: 'What game websites have the most games?', a: 'Poki and Crazy Games have the largest catalogues (thousands of games each), but most are low-quality filler. UBGHyper is smaller (__GAME_COUNT__ games) but curated — every game is tested and broken games are removed.' },
      { q: 'What game websites are best for Chromebooks?', a: 'UBGHyper is built Chromebook-first — 52% of our users are on ChromeOS. Every game runs in Chrome on ChromeOS without any extension or admin permission. We have a dedicated /unblocked-games-chromebook.html page with Chromebook-specific tips.' },
      { q: 'Can I save my progress on a game website?', a: 'On UBGHyper, yes — progress is saved in browser localStorage and you can export saves to JSON at /saves.html for transfer between devices. Most other game websites save progress only if you create an account.' },
    ],
  },
  {
    slug: 'unblocked-games-911',
    h1: 'Unblocked Games 911',
    title: 'Unblocked Games 911 — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games 911 alternative — UBGHyper has __GAME_COUNT__ free unblocked games for school. Drive Mad, Slope, Retro Bowl, Cuphead, and more. No downloads, works on Chromebook.',
    intro: `<p><strong>Unblocked Games 911</strong> is one of the most memorable names in the numbered unblocked-games cluster — the "911" sticks in your head, which is exactly why students kept sharing it. UBGHyper is the modern github.io rebuild of that idea: <strong>__GAME_COUNT__ unblocked games</strong>, hand-tested, zero pop-ups, and playable on a school Chromebook in seconds.</p>
<p>If you searched "911" hoping for a specific site, here's the honest picture: like UG 66, 67, 76, 77 and 99, most of the original 911-branded pages are now dead, ad-choked, or frozen in a 2018 layout. UBGHyper keeps the whole catalogue alive — Flash classics via Ruffle plus every modern HTML5 hit — on a domain schools rarely block.</p>
<p>The most-played games are below, or browse <a href="all-games.html">the full A–Z list of __GAME_COUNT__ games</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>Where the "911" name came from</h2>
<p>There's no deep meaning to it. Just like the rest of the numbered cluster, "911" was simply the next memorable number a student picked when spinning up another Google Sites clone. The emergency-services association made it easy to remember and easy to say out loud in a hallway — which, for a site that spread by word of mouth, was the whole marketing strategy. UG 66, 76, 77, 6x, 99 and 911 all came from the same copy-paste playbook, each new number buying a little more time before school filters caught up.</p>

<h2>UBGHyper's Unblocked Games 911 equivalents</h2>
<p>If you came from a 911-branded site, here are the closest matches in the UBGHyper catalogue, sorted by the kind of session you want:</p>
<ul>
  <li><strong>Quick reflex runs →</strong> <a href="games/Slope.html">Slope</a>, <a href="games/Tunnel-Rush.html">Tunnel Rush</a>, <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/OvO.html">OvO</a></li>
  <li><strong>Play with a friend →</strong> <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Fireboy-and-Watergirl.html">Fireboy and Watergirl</a>, <a href="games/Soccer-Random.html">Soccer Random</a></li>
  <li><strong>Long-session sims →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Retro-Bowl.html">Retro Bowl</a>, <a href="games/Melon-Playground.html">Melon Playground</a></li>
  <li><strong>Shooters →</strong> <a href="games/1v1-LOL.html">1v1.LOL</a>, <a href="games/Shell-Shockers.html">Shell Shockers</a>, <a href="games/Time-Shooter-3.html">Time Shooter 3</a>, <a href="games/Smash-Karts.html">Smash Karts</a></li>
</ul>

<h2>The numbered cluster in 2026, ranked honestly</h2>
<p>If you're hopping between numbered sites trying to find one that still works, here's a straight ranking by which actually have live, safe catalogues today:</p>
<ol>
  <li><strong>UBGHyper</strong> — modern rebuild, __GAME_COUNT__ tested games, no pop-ups, github.io hosted, tab-cloak built in.</li>
  <li><strong>A few surviving UG 76 mirrors</strong> — partially alive but ad-heavy and rarely updated.</li>
  <li><strong>UG 66 / 67 / 911 originals</strong> — mostly abandoned, broken Flash, occasional sketchy ads.</li>
</ol>
<p>If a 911 site is still working safely for you, keep using it. If it's broken or feels sketchy, UBGHyper is the maintained alternative.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 911?', a: 'Unblocked Games 911 is one of the many numbered forks of the original "Unblocked Games 66" template. The "911" is just a memorable sequence number — the catalogues were nearly identical between sites. Most 911-branded originals are now dead; UBGHyper is the maintained github.io alternative.' },
      { q: 'Is Unblocked Games 911 still working?', a: 'Most 911-branded sites are abandoned or broken since Flash retired in December 2020. UBGHyper keeps the same kind of catalogue alive using Ruffle for the Flash classics plus modern HTML5 games.' },
      { q: 'Does UBGHyper have the games from Unblocked Games 911?', a: 'Yes — the full Flash-era catalogue via Ruffle plus modern hits like Drive Mad, Polytrack, Cuphead and Block Blast. Over __GAME_COUNT__ games in total.' },
      { q: 'Will Unblocked Games 911 work on my school Chromebook?', a: 'UBGHyper will. It is hosted on github.io, which most school networks allow, and every game runs in Chrome on ChromeOS with no extension or admin permission.' },
      { q: 'Is UBGHyper safe?', a: 'Yes — no popup ads, no malware, no third-party redirects, no behavioural trackers. Every game is hand-tested before it is added.' },
      { q: 'How do I hide the tab from my teacher?', a: 'Press the backtick key (\`) or the camo button. The tab title and favicon switch to Google Classroom, Docs, Khan Academy or Desmos, so a passing teacher sees a school page.' },
    ],
  },
  {
    slug: 'unblocked-games-world',
    h1: 'Unblocked Games World',
    title: 'Unblocked Games World — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games World alternative — UBGHyper has __GAME_COUNT__ free unblocked games at github.io. Slope, Drive Mad, Cuphead, Retro Bowl, and more. No downloads, works on Chromebook.',
    intro: `<p><strong>Unblocked Games World</strong> was one of the largest Google Sites-hosted unblocked libraries of its era — a sprawling catalogue that a lot of students grew up on. Like most Google Sites projects, it aged badly: slow loads, dead links, and a layout that never got updated. UBGHyper is the modern replacement — <strong>__GAME_COUNT__ hand-tested games</strong>, sub-second loads, and no ads on the game player.</p>
<p>If you're searching for "Unblocked Games World" specifically, you'll find the original is mostly frozen or broken now. UBGHyper rebuilds the whole experience from scratch on github.io: the same breadth of games, minus the clutter, plus a one-key tab disguise for when a teacher walks past.</p>
<p>Start with the most-played games below, or open <a href="all-games.html">the full A–Z catalogue</a>.</p>`,
    h2: 'Most popular games on UBGHyper',
    angle: `<h2>What Unblocked Games World was</h2>
<p>Unblocked Games World followed the classic Google Sites formula: one giant page of embedded iframes, organised into loose categories, hosted on Google's free infrastructure so it slipped past school filters. Its selling point was sheer size — it tried to list everything. The downside of "everything" was that a huge share of the catalogue was broken Flash, duplicate entries, or dead embeds, and nobody was maintaining it.</p>

<h2>UBGHyper vs Unblocked Games World</h2>
<ul>
  <li><strong>Curated, not cluttered.</strong> UBGHyper lists __GAME_COUNT__ games, every one tested and playable. Broken games get flagged and removed rather than left to rot.</li>
  <li><strong>Actually fast.</strong> A modern static build on github.io loads in under a second, even on school Wi-Fi. Old Google Sites pages crawled.</li>
  <li><strong>No pop-ups.</strong> No pre-roll video, no autoplay sidebar ads, no popups over the game.</li>
  <li><strong>Built-in tab cloak.</strong> One keypress disguises the tab as Google Classroom, Docs, Khan Academy, or Desmos.</li>
</ul>

<h2>The best of what Unblocked Games World had</h2>
<p>Here's the UBGHyper version of the genres that made "World" popular, with direct links:</p>
<ul>
  <li><strong>Endless arcade →</strong> <a href="games/Slope.html">Slope</a>, <a href="games/Subway-Surfers.html">Subway Surfers</a>, <a href="games/Temple-Run-2.html">Temple Run 2</a>, <a href="games/Tomb-of-the-Mask.html">Tomb of the Mask</a></li>
  <li><strong>Platformers →</strong> <a href="games/OvO.html">OvO</a>, <a href="games/Vex-7.html">Vex 7</a>, <a href="games/Cuphead.html">Cuphead</a>, <a href="games/Cluster-Rush.html">Cluster Rush</a></li>
  <li><strong>Sports &amp; 2-player →</strong> <a href="games/Basket-Random.html">Basket Random</a>, <a href="games/Basketball-Stars.html">Basketball Stars</a>, <a href="games/Soccer-Random.html">Soccer Random</a></li>
  <li><strong>Sim &amp; idle →</strong> <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Idle-Breakout.html">Idle Breakout</a>, <a href="games/Melon-Playground.html">Melon Playground</a></li>
</ul>`,
    faqs: [
      { q: 'What happened to Unblocked Games World?', a: 'Like most Google Sites-based unblocked libraries, it stopped being maintained — Flash retiring in December 2020 broke a big chunk of its catalogue, and the layout was never modernised. UBGHyper is a from-scratch alternative on github.io.' },
      { q: 'Is UBGHyper the same as Unblocked Games World?', a: 'No — UBGHyper is an independent, maintained site. It offers the same kind of large unblocked catalogue but curated, with no pop-ups, and much faster to load.' },
      { q: 'How many games does UBGHyper have?', a: 'Over __GAME_COUNT__ hand-curated unblocked games across 19 genre categories.' },
      { q: 'Does it work on a school Chromebook?', a: 'Yes. Most UBGHyper users are on school Chromebooks. The site runs in Chrome on ChromeOS with no extension, plugin, or admin permission.' },
      { q: 'Are there ads?', a: 'None on the game player — no popups, no video pre-rolls, no autoplay sidebar ads. Every game is hand-tested before being added.' },
      { q: 'Can I disguise the tab at school?', a: 'Yes — press the backtick key (\`) or the camo button and the tab title and favicon switch to Google Classroom, Docs, Khan Academy or Desmos.' },
    ],
  },
  {
    slug: 'unblocked-games-999',
    h1: 'Unblocked Games 999',
    title: 'Unblocked Games 999 — __GAME_COUNT__ Free Games for School & Chromebook',
    desc: 'Unblocked Games 999 alternative — UBGHyper has __GAME_COUNT__ free unblocked games for school on Chromebook. Drive Mad, Slope, 1v1.LOL, Snow Rider 3D. No downloads, no sign-up.',
    intro: `<p><strong>Unblocked Games 999</strong> is the "maxed-out" entry in the numbered cluster — the biggest number, the one that felt like it must have the most games. In reality it was another Google Sites clone of the same catalogue everyone else forked. UBGHyper is the modern equivalent that actually delivers on the "999" promise: <strong>__GAME_COUNT__ hand-tested games</strong>, no pop-ups, instant load on a Chromebook.</p>
<p>Searching "999" and landing on a dead or ad-riddled page? That's the norm now — most numbered originals broke when Flash retired. UBGHyper keeps the classics alive through Ruffle and adds every modern HTML5 hit on top, all on a github.io domain schools rarely block.</p>
<p>Browse the most-played games below, or jump to <a href="all-games.html">the full A–Z catalogue of __GAME_COUNT__ games</a>.</p>`,
    h2: 'Top games on UBGHyper',
    angle: `<h2>What "999" actually means</h2>
<p>Nothing — and that's the point. The numbered unblocked sites never used their numbers to mean anything; higher numbers just signalled "newer clone that the filter hasn't found yet." 999, being the largest three-digit number, became shorthand for "the ultimate list." UBGHyper is what that name always implied but rarely delivered: a genuinely large, genuinely working catalogue that's actively maintained.</p>

<h2>Nine games to start with on UBGHyper</h2>
<p>If you want a fast tour of the catalogue, these nine cover the range:</p>
<ul>
  <li><a href="games/Drive-Mad.html">Drive Mad</a> — physics driving puzzles.</li>
  <li><a href="games/Snow-Rider-3D.html">Snow Rider 3D</a> — endless sledging dodger.</li>
  <li><a href="games/1v1-LOL.html">1v1.LOL</a> — build-and-shoot duels.</li>
  <li><a href="games/Cuphead.html">Cuphead</a> — run-and-gun boss rush.</li>
  <li><a href="games/Tomb-of-the-Mask.html">Tomb of the Mask</a> — vertical arcade maze.</li>
  <li><a href="games/Smash-Karts.html">Smash Karts</a> — kart battle arena.</li>
  <li><a href="games/Retro-Bowl.html">Retro Bowl</a> — pixel football manager.</li>
  <li><a href="games/Melon-Playground.html">Melon Playground</a> — ragdoll sandbox.</li>
</ul>

<h2>Why a maintained site beats a numbered clone</h2>
<p>The numbered sites all share the same fatal flaw: nobody's driving. When a game breaks, it stays broken. When an ad network turns predatory, it stays. When Flash died, most of the catalogue died with it. UBGHyper is a live project — new games are added every few weeks, broken ones are removed, and the whole library lives in a single tracked <code>games.json</code> file so nothing silently rots.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 999?', a: 'Unblocked Games 999 is one of the highest-numbered forks in the "Unblocked Games 66" family. The number doesn\'t mean anything specific — it just signalled a newer clone. Most 999 originals are now dead; UBGHyper is the maintained alternative.' },
      { q: 'Does Unblocked Games 999 have more games than the others?', a: 'Despite the big number, the numbered sites all forked roughly the same catalogue. UBGHyper actually maintains a large, tested library — over __GAME_COUNT__ games across 19 categories.' },
      { q: 'Is Unblocked Games 999 safe?', a: 'Many numbered originals now run aggressive or sketchy ads. UBGHyper has no popup ads, no malware, and no third-party redirects — every game is hand-tested.' },
      { q: 'Will it work on my Chromebook at school?', a: 'Yes. UBGHyper is github.io hosted and runs in Chrome on ChromeOS without any extension or admin permission. Most of our users are on school Chromebooks.' },
      { q: 'Do I need to download anything?', a: 'No — every game runs instantly in the browser. There is nothing to install and no sign-up.' },
      { q: 'How do I hide the game tab?', a: 'Press the backtick key (\`) or the camo button to disguise the tab as Google Classroom, Docs, Khan Academy or Desmos.' },
    ],
  },
  {
    slug: 'unblocked-games-76-ez',
    h1: 'Unblocked Games 76 EZ',
    title: 'Unblocked Games 76 EZ — __GAME_COUNT__ Free HTML5 Games for School',
    desc: 'Unblocked Games 76 EZ alternative — UBGHyper has __GAME_COUNT__ free HTML5 unblocked games. Drive Mad, Polytrack, 1v1.LOL, Smash Karts, Block Blast. No downloads, works on Chromebook.',
    intro: `<p><strong>Unblocked Games 76 EZ</strong> was one of the more modern-feeling unblocked sites — the "EZ" (easy) branding promised a clean, fast, mostly-HTML5 catalogue rather than the usual wall of broken Flash. UBGHyper carries that idea forward and does it properly: <strong>__GAME_COUNT__ hand-tested games</strong>, a genuinely fast static build, and no pop-ups.</p>
<p>If "76 EZ" is what you searched, you're after the newer, cleaner end of the unblocked spectrum. That's exactly UBGHyper's strength — the modern HTML5 hits load instantly, and the older classics are preserved through Ruffle so nothing's missing.</p>
<p>The top HTML5 games are below, or open <a href="all-games.html">the full A–Z catalogue</a>.</p>`,
    h2: 'Top HTML5 games on UBGHyper',
    angle: `<h2>What the "76 EZ" branding meant</h2>
<p>"76" ties it to the most famous numbered site (UG 76), while "EZ" signalled a smoother, easier experience — fewer dead links, a cleaner grid, and a focus on modern HTML5 games that run without a plugin. It was a reaction to how clunky the older numbered clones had become. UBGHyper is built around that same principle from the ground up: fast, clean, tested, and plugin-free.</p>

<h2>The modern HTML5 catalogue, 76 EZ-style</h2>
<p>These are the games that define the clean, no-Flash experience 76 EZ was known for:</p>
<ul>
  <li><strong>Driving &amp; racing →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/Polytrack-New.html">Polytrack</a>, <a href="games/Smash-Karts.html">Smash Karts</a>, <a href="games/Cluster-Rush.html">Cluster Rush</a></li>
  <li><strong>Shooters →</strong> <a href="games/1v1-LOL.html">1v1.LOL</a>, <a href="games/Shell-Shockers.html">Shell Shockers</a>, <a href="games/Time-Shooter-3.html">Time Shooter 3</a></li>
  <li><strong>Puzzle &amp; arcade →</strong> <a href="games/Block-Blast.html">Block Blast</a>, <a href="games/Tomb-of-the-Mask.html">Tomb of the Mask</a>, <a href="games/OvO.html">OvO</a></li>
  <li><strong>Sim &amp; sandbox →</strong> <a href="games/Melon-Playground.html">Melon Playground</a>, <a href="games/Cookie-Clicker.html">Cookie Clicker</a></li>
</ul>

<h2>Why UBGHyper loads faster than the old 76 EZ</h2>
<p>The original numbered sites were single giant pages that loaded every embed at once. UBGHyper is a modern static site: the homepage pulls a lightweight game index, thumbnails lazy-load as you scroll, and each game page is pre-rendered so it appears instantly. On a typical school Chromebook and network, the whole thing loads in under a second — the "EZ" experience, actually delivered.</p>`,
    faqs: [
      { q: 'What is Unblocked Games 76 EZ?', a: 'Unblocked Games 76 EZ was an unblocked site branded around a cleaner, easier, mostly-HTML5 experience — a modern take on the older UG 76 catalogue. UBGHyper is a maintained alternative built on the same principle: fast, tested, plugin-free.' },
      { q: 'Does UBGHyper have the HTML5 games 76 EZ was known for?', a: 'Yes — modern hits like Drive Mad, Polytrack, 1v1.LOL, Smash Karts, Block Blast and Time Shooter 3, plus the Flash classics preserved through Ruffle. Over __GAME_COUNT__ games total.' },
      { q: 'Is 76 EZ different from Unblocked Games 76?', a: 'The "EZ" version leaned into modern HTML5 games and a cleaner layout, versus the older, Flash-heavy UG 76. UBGHyper covers both eras in one maintained catalogue.' },
      { q: 'Does UBGHyper work on a Chromebook?', a: 'Yes — it is built Chromebook-first and runs in Chrome on ChromeOS with no extension or admin permission. Most of our users are on school Chromebooks.' },
      { q: 'Are there any downloads or sign-ups?', a: 'No — every game runs instantly in the browser with nothing to install and no account needed.' },
      { q: 'Are there ads on the games?', a: 'There are banner ads on the page around the game, but nothing covers the game itself: no pop-ups, no video pre-rolls and no autoplay video. Every game is tested before it is added.' },
    ],
  },
  {
    slug: 'tyrones-unblocked-games',
    h1: 'Tyrone\'s Unblocked Games',
    title: 'Tyrone\'s Unblocked Games — __GAME_COUNT__ Free Games Alternative | UBGHyper',
    desc: 'A Tyrone\'s Unblocked Games alternative: __GAME_COUNT__ free unblocked games for school and Chromebook, including Slope, Drive Mad, Cuphead and Retro Bowl. No pop-ups.',
    intro: `<p><strong>Tyrone's Unblocked Games</strong> was one of the best-known names in the whole unblocked scene — a widely-shared Google Sites library that a generation of students bookmarked. UBGHyper isn't Tyrone's and isn't affiliated with it; it's an independent, maintained alternative that does the same job better: <strong>__GAME_COUNT__ hand-tested games</strong>, no pop-ups, and a tab disguise built in.</p>
<p>If you're looking for Tyrone's specifically, the original — like most Google Sites unblocked pages — is largely frozen or broken today. UBGHyper rebuilds the experience on github.io: the same broad catalogue, faster, cleaner, and actively kept alive.</p>
<p>The most-played games are below, or open <a href="all-games.html">the full A–Z catalogue of __GAME_COUNT__ games</a>.</p>`,
    h2: 'Most popular games on UBGHyper',
    angle: `<h2>What Tyrone's Unblocked Games was</h2>
<p>Tyrone's was a Google Sites-hosted unblocked library that spread almost entirely by word of mouth. Its appeal was familiarity and breadth — a big, recognisable catalogue that "everyone" knew the name of. As with the numbered sites, its weakness was maintenance: once Flash retired and the original stopped being updated, a large share of the catalogue broke and never came back.</p>

<h2>UBGHyper vs Tyrone's Unblocked Games</h2>
<ul>
  <li><strong>Maintained.</strong> New games added every few weeks; broken games flagged and removed. Nothing silently rots.</li>
  <li><strong>Nothing over the game.</strong> No pop-ups, no video pre-rolls, no autoplay ads over the game.</li>
  <li><strong>Faster.</strong> A modern static build on github.io loads in under a second, even on school networks.</li>
  <li><strong>Tab cloak.</strong> One keypress swaps the tab to Google Classroom, Docs, Khan Academy or Desmos.</li>
  <li><strong>Save export.</strong> Your Retro Bowl and Cookie Clicker progress exports to a file at <a href="saves.html">/saves.html</a> so you can move it between Chromebooks.</li>
</ul>

<h2>The games people came to Tyrone's for</h2>
<p>Here's the UBGHyper equivalent of the most-loved titles, by genre:</p>
<ul>
  <li><strong>Arcade &amp; reflex →</strong> <a href="games/Slope.html">Slope</a>, <a href="games/Tunnel-Rush.html">Tunnel Rush</a>, <a href="games/Subway-Surfers.html">Subway Surfers</a>, <a href="games/Temple-Run-2.html">Temple Run 2</a></li>
  <li><strong>Physics &amp; platform →</strong> <a href="games/Drive-Mad.html">Drive Mad</a>, <a href="games/OvO.html">OvO</a>, <a href="games/Cuphead.html">Cuphead</a>, <a href="games/Getting-Over-It.html">Getting Over It</a></li>
  <li><strong>Sim &amp; strategy →</strong> <a href="games/Retro-Bowl.html">Retro Bowl</a>, <a href="games/Cookie-Clicker.html">Cookie Clicker</a>, <a href="games/Melon-Playground.html">Melon Playground</a></li>
  <li><strong>Multiplayer →</strong> <a href="games/1v1-LOL.html">1v1.LOL</a>, <a href="games/Shell-Shockers.html">Shell Shockers</a>, <a href="games/Smash-Karts.html">Smash Karts</a>, <a href="games/Basket-Random.html">Basket Random</a></li>
</ul>`,
    faqs: [
      { q: 'Is UBGHyper the same as Tyrone\'s Unblocked Games?', a: 'No. UBGHyper is an independent site and is not affiliated with Tyrone\'s Unblocked Games. It\'s a maintained alternative that offers the same kind of large unblocked catalogue, curated and with no pop-ups.' },
      { q: 'Is Tyrone\'s Unblocked Games still working?', a: 'The original, like most Google Sites unblocked libraries, is largely frozen or broken — much of its catalogue died when Flash retired in December 2020. UBGHyper keeps that kind of catalogue alive using Ruffle plus modern HTML5 games.' },
      { q: 'Does UBGHyper have the games Tyrone\'s had?', a: 'Yes — the Flash-era classics via Ruffle plus modern hits like Drive Mad, Slope, Cuphead and Retro Bowl. Over __GAME_COUNT__ games in total.' },
      { q: 'Will UBGHyper work on my school Chromebook?', a: 'Yes. It is github.io hosted, which most schools allow, and every game runs in Chrome on ChromeOS with no extension or admin permission.' },
      { q: 'Does UBGHyper have ads?', a: 'Not on the game player — no popups, no video pre-rolls, no autoplay sidebar ads. Every game is hand-tested before being added.' },
      { q: 'How do I disguise the tab from a teacher?', a: 'Press the backtick key (\`) or the camo button. The tab title and favicon switch to Google Classroom, Docs, Khan Academy or Desmos.' },
    ],
  },
];

// ── Render template ───────────────────────────────────────────
function renderPage(p) {
  const pageUrl = `${SITE_URL}/${p.slug}.html`;
  // Resolve through the shard helper so this keeps working if Drive-Mad moves shard.
  const ogImage = `${gameBase(games.find(g => g.url === 'Drive-Mad'))}/Drive-Mad/logo.png`;

  const faqHtml = p.faqs.map(f =>
    `<details class="game-faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
  ).join('\n      ');

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": p.h1,
      "description": p.desc,
      "url": pageUrl,
      "isPartOf": { "@type": "WebSite", "name": "UBGHyper", "url": SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UBGHyper", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": p.h1, "item": pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${p.h1} - Top Games`,
      "itemListElement": featuredFor(p).slice(0, 20).map((g, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `${g.name} Unblocked`,
        "url": `${SITE_URL}/games/${encodeURIComponent(g.url)}.html`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": p.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ].map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(p.title)}</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="${NOINDEX_LANDING.has(p.slug) ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:site_name" content="UBGHyper">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${ogImage}">
${schemas}
<link rel="icon" href="assets/img/icon/main.svg">
<link rel="apple-touch-icon" href="assets/img/icon/main.png">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script src="/assets/js/analytics.js"></script>
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<nav>
  <a href="/" class="logo">UBGHyper</a>
  <div class="nav-links">
    <a href="/">Games</a>
    <a href="favorites.html">Favorites</a>
    <a href="stats.html">Stats</a>
    <a href="saves.html">Saves</a>
    <a href="about.html">About</a>
    <a href="https://discord.gg/HAzcYC52Vt" target="_blank" rel="noopener" style="color:#5865F2;font-weight:600;text-decoration:none">Discord (Fixed)</a><a href="https://isotunnel.com/" target="_blank" rel="noopener" data-nav="isotunnel" style="color:var(--text);font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px">isotunnel<span style="font-size:.74em;font-weight:500;color:var(--text);background:var(--surface-2,var(--border));border-radius:999px;padding:.15em .6em;line-height:1.3;white-space:nowrap">Out now</span></a>
  </div>
  <div class="camo-wrap">
    <button class="camo-btn" id="camoBtn" title="Tab disguise (\`)">
      <svg class="icon" aria-hidden="true"><use href="#icon-mask"/></svg>
    </button>
    <div class="camo-dropdown" id="camoDropdown"></div>
  </div>
  <button class="theme-btn" id="themeToggle" aria-label="Toggle theme">
    <svg class="icon" aria-hidden="true"><use href="#icon-sun"/></svg>
  </button>
  <button class="nav-hamburger" id="navHamburger" aria-label="Toggle navigation" aria-expanded="false">
    <svg class="icon" aria-hidden="true"><use href="#icon-menu"/></svg>
  </button>
</nav>

<main>
  <div class="container">
    <nav class="game-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">&rsaquo;</span>
      <span>${esc(p.h1)}</span>
    </nav>

    <div class="page-header">
      <h1>${esc(p.h1)} - Play __GAME_COUNT__ Free Games</h1>
      <p class="subtitle">No downloads. No sign-up. Works at school.</p>
    </div>

    <section class="landing-intro">
      ${p.intro}
    </section>

    <section class="landing-angle" style="margin-top:2rem">
      ${p.angle || ''}
    </section>

    <h2 style="margin-top:2rem">${esc(p.h2)}</h2>
    <div class="games-grid">
${featuredFor(p).map(gameCard).join('\n')}
    </div>

    <div class="results-row" style="margin-top:1.5rem">
      <a href="/" style="color:var(--accent);text-decoration:none;font-weight:600">&rarr; Browse all __GAME_COUNT__ games</a>
    </div>

    ${recentAdditions.length > 0 ? `<section style="margin-top:2.5rem">
      <h2>Recently added</h2>
      <p style="opacity:0.85;margin-bottom:1rem">New games added to UBGHyper this month:</p>
      <div class="games-grid">
${recentAdditions.map(gameCard).join('\n')}
      </div>
    </section>` : ''}

    <section class="game-faq" style="margin-top:2.5rem">
      <h2>Frequently asked questions</h2>
      ${faqHtml}
    </section>

    <section class="game-about" style="margin-top:2rem">
      <h2>Browse by category</h2>
      <p>
        <a href="games/cat-action.html">Action</a> &middot;
        <a href="games/cat-adventure.html">Adventure</a> &middot;
        <a href="games/cat-arcade.html">Arcade</a> &middot;
        <a href="games/cat-comedy.html">Comedy</a> &middot;
        <a href="games/cat-fighting.html">Fighting</a> &middot;
        <a href="games/cat-horror.html">Horror</a> &middot;
        <a href="games/cat-idle.html">Idle</a> &middot;
        <a href="games/cat-multiplayer.html">Multiplayer</a> &middot;
        <a href="games/cat-physics.html">Physics</a> &middot;
        <a href="games/cat-platformer.html">Platformer</a> &middot;
        <a href="games/cat-puzzle.html">Puzzle</a> &middot;
        <a href="games/cat-racing.html">Racing</a> &middot;
        <a href="games/cat-retro.html">Retro</a> &middot;
        <a href="games/cat-rpg.html">RPG</a> &middot;
        <a href="games/cat-sandbox.html">Sandbox</a> &middot;
        <a href="games/cat-shooter.html">Shooter</a> &middot;
        <a href="games/cat-simulation.html">Simulation</a> &middot;
        <a href="games/cat-sports.html">Sports</a> &middot;
        <a href="games/cat-strategy.html">Strategy</a>
      </p>
    </section>

    <section class="game-about" style="margin-top:2rem">
      <h2>Other unblocked games collections on UBGHyper</h2>
      <p>
        ${pages.filter(o => o.slug !== p.slug).map(o => `<a href="${o.slug}.html">${o.h1}</a>`).join(' &middot; ')}
      </p>
    </section>
  </div>
</main>

<footer>
  <div class="footer-inner">
    <p class="footer-copy">&copy; 2026 UBGHyper</p>
    <div class="footer-links">
      <a href="/">Games</a>
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

<script src="assets/js/icons.js"></script>
<script src="assets/js/camo.js"></script>
<script src="assets/js/utils.js" defer></script>
</body>
</html>
`;
}

let count = 0;
for (const p of pages) {
  const html = renderPage(p).replaceAll('__GAME_COUNT__', N);
  fs.writeFileSync(path.join(OUT_DIR, `${p.slug}.html`), html, 'utf8');
  count++;
}
console.log(`Generated ${count} landing pages in ROOT (unblocked-games-*.html) — game count: ${N}`);
