#!/usr/bin/env node
// Generates /games/cat-{tag}.html for every tag in games.json.
// Run with: node scripts/gen-cat-pages.js
// Re-run whenever games.json changes.

const fs   = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..');
const GAMES_JSON = path.join(ROOT, 'assets', 'games.json');
const OUT_DIR   = path.join(ROOT, 'games');
const SITE_URL  = 'https://ubghyper.github.io';
// Shard-aware game asset URLs — keep in sync with utils.js.
const SHARD_DEFAULT = 'GameList.github.io';
const IMG_BASE  = `${SITE_URL}/${SHARD_DEFAULT}`;
// `shard` may be a bare repo name or a full base URL (numbered shards live on
// another account, e.g. https://freeonlinewebtools.github.io/gamelist9.github.io).
const gameBase   = g => { const s = (g && g.shard) || SHARD_DEFAULT; return s.includes('://') ? s.replace(/\/$/, '') : `${SITE_URL}/${s}`; };
const gameFolder = g => `${gameBase(g)}/${g.url}/`;
const gameThumb  = g => (g && g.image ? `${gameFolder(g)}${g.image}` : '');
// Visible thumbnails: the shard's pinned jsDelivr copy, as utils.js gameThumb() does (github.io is blocked
// by most school filters). SEO metadata keeps gameThumb()'s github.io URL.
const CDN_REPOS = (() => { try { return require('./cdn-repos.json'); } catch { return {}; } })();
const gameThumbView = g => { if (!g || !g.image) return ''; const s = g.shard || SHARD_DEFAULT; const b = CDN_REPOS[s.includes('://') ? s.replace(/\/$/, '').split('/').pop() : s]; return b ? `${b}/${g.url}/${g.image}` : gameThumb(g); };

// Category pages shipped untagged until GROW-001 — indexable, in the sitemap,
// and completely invisible to GA4. Same direct-gtag config as every other page
// type; direct gtag is the single GA4 configuration owner (no GTM).
const GA_ID     = 'G-VE9J0CCHWZ';

const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'))
  .filter(g => g && g.name && g.url && g.status !== 'broken');
fs.mkdirSync(OUT_DIR, { recursive: true });

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Collect all unique tags
const allTags = [...new Set(games.flatMap(g => g.tags || []))].sort();
let generated = 0;

for (const tag of allTags) {
  const tagGames = games.filter(g => (g.tags || []).includes(tag));
  if (!tagGames.length) continue;

  const capTag   = cap(tag);
  const pageUrl  = `${SITE_URL}/games/cat-${tag}.html`;
  const title    = `${capTag} Games Unblocked - Play ${tagGames.length}+ Free Online | UBGHyper`;
  // Up to three example games, but only as many as keep the description within ~155 characters
  // (longer ones are cut off in search results; seo pass 2026-11-15).
  const descBase = `Play ${tagGames.length} free unblocked ${capTag.toLowerCase()} games online at UBGHyper, no download needed. Includes `;
  let descPicks = [];
  for (const x of tagGames.slice(0, 3)) {
    if ((descBase + [...descPicks, x.name].join(', ') + ' and more.').length > 155) break;
    descPicks.push(x.name);
  }
  const desc = descPicks.length ? descBase + descPicks.join(', ') + ' and more.'
    : `Play ${tagGames.length} free unblocked ${capTag.toLowerCase()} games online at UBGHyper. No download needed, and they work at school.`;
  const heroGame = tagGames[0];
  const heroImg  = heroGame ? `${gameThumb(heroGame)}` : `${SITE_URL}/assets/img/icon/main.png`;

  const faqs = [
    { q: `What are ${capTag.toLowerCase()} games?`, a: `${capTag} games on UBGHyper are browser-based ${capTag.toLowerCase()} titles you can play instantly without downloading. We have ${tagGames.length} ${capTag.toLowerCase()} games in our library.` },
    { q: `Are these ${capTag.toLowerCase()} games unblocked at school?`, a: `Yes. All ${capTag.toLowerCase()} games on UBGHyper run in your browser and work on most school networks without installing anything.` },
    { q: `Are they free?`, a: `Yes — every ${capTag.toLowerCase()} game on UBGHyper is 100% free. No sign-up, no payment.` },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": title,
      "description": desc,
      "url": pageUrl,
      "image": heroImg,
      "publisher": { "@type": "Organization", "name": "UBGHyper", "url": SITE_URL },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": tagGames.length,
        "itemListElement": tagGames.slice(0, 25).map((g, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${g.name} Unblocked`,
          "url": `${SITE_URL}/games/${encodeURIComponent(g.url)}.html`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UBGHyper", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Games", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 3, "name": `${capTag} Games`, "item": pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ].map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  const faqHtml = faqs.map(f =>
    `<details class="game-faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
  ).join('');

  const cards = tagGames.map(g => {
    const img = `${gameThumbView(g)}`;
    const gamePageUrl = `${encodeURIComponent(g.url)}.html`;
    const buggy = g.status === 'buggy' ? '<span class="badge-buggy" title="May not work in all browsers">!</span>' : '';
    const isNew = g.new ? '<span class="badge-new">New</span>' : '';
    return `<a href="${gamePageUrl}" class="game-card" aria-label="Play ${esc(g.name)} Unblocked">
      <div class="game-thumb">
        <img src="${esc(img)}" alt="${esc(g.name)} Unblocked" width="160" height="160" loading="lazy" decoding="async" onerror="this.style.display='none'">
        ${isNew}${buggy}
      </div>
      <div class="game-info">
        <span class="game-name">${esc(g.name)}</span>
      </div>
    </a>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(title)}</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${esc(heroImg)}">
<meta property="og:site_name" content="UBGHyper">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(heroImg)}">
${schemas}
<link rel="icon" href="../assets/img/icon/main.svg">
<link rel="apple-touch-icon" href="../assets/img/icon/main.png">
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/css/style.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script src="/assets/js/analytics.js"></script>
</head>
<body>
<nav>
  <a href="/" class="logo">UBGHyper</a>
  <div class="nav-links">
    <a href="/">Games</a>
    <a href="../favorites.html">Favorites</a>
    <a href="../stats.html">Stats</a>
    <a href="../saves.html">Saves</a>
    <a href="../about.html">About</a>
    <a href="https://discord.gg/HAzcYC52Vt" target="_blank" rel="noopener" style="color:#5865F2;font-weight:600;text-decoration:none">Discord (Fixed)</a><a href="https://isotunnel.com/" target="_blank" rel="noopener" data-nav="isotunnel" style="color:var(--text);font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px">isotunnel<span style="font-size:.74em;font-weight:500;color:var(--text);background:var(--surface-2,var(--border));border-radius:999px;padding:.15em .6em;line-height:1.3;white-space:nowrap">Out now</span></a>
  </div>
  <button class="nav-hamburger" id="navHamburger" aria-label="Toggle navigation" aria-expanded="false" style="margin-left:auto">☰</button>
</nav>

<main>
  <div class="container">
    <div class="page-header">
      <h1>${esc(capTag)} Games Unblocked</h1>
      <p class="subtitle">${tagGames.length} free ${capTag.toLowerCase()} games &mdash; play instantly, no downloads</p>
    </div>
    <div class="results-row">
      <span><a href="/?cat=${encodeURIComponent(tag)}" style="color:var(--accent);text-decoration:none">Filter by ${esc(capTag)} on Games page &rarr;</a></span>
    </div>
    <div class="games-grid">
${cards}
    </div>

    <section class="game-about">
      <h2>About ${esc(capTag.toLowerCase())} games on UBGHyper</h2>
      <p>UBGHyper has <strong>${tagGames.length} unblocked ${capTag.toLowerCase()} games</strong> ready to play in your browser — no downloads, no installs. Pick a game above and start playing instantly. Every game on this page is free, runs at school, and works on Chromebooks, Windows, and Mac.</p>
      <p>Looking for something specific? Try our <a href="/">full library of 250+ unblocked games</a>, or check out the <a href="../unblocked-games-66.html">Unblocked Games 66</a> collection.</p>
    </section>

    <section class="game-faq">
      <h2>Frequently asked questions</h2>
      ${faqHtml}
    </section>
  </div>
</main>

<footer>
  <div class="footer-inner">
    <p class="footer-copy">&copy; 2026 UBGHyper</p>
    <div class="footer-links">
      <a href="/">Games</a>
      <a href="../favorites.html">Favorites</a>
      <a href="../stats.html">Stats</a>
      <a href="../saves.html">Saves</a>
      <a href="../about.html">About</a>
      <a href="../privacy.html">Privacy</a>
      <a href="../contact.html">Contact</a>
    </div>
  </div>
</footer>

<script>
const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', saved);
</script>
<!-- binds the phone menu button (and re-applies a saved tab disguise) -->
<script src="/assets/js/camo.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT_DIR, `cat-${tag}.html`), html, 'utf8');
  generated++;
}

console.log(`Generated ${generated} category pages in /games/`);
