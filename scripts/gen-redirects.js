#!/usr/bin/env node
// Generates redirect stubs in /games/ for legacy game URLs that no longer
// exist (renamed slugs or removed games). GitHub Pages can't issue 301s, so
// each stub is a 200-status HTML page that:
//   • sets <link rel="canonical"> to the destination (consolidates ranking signal)
//   • redirects instantly via meta-refresh + JS location.replace
//   • carries a marker comment so gen-game-pages.js's orphan sweep keeps it
//
// Source of truth for legacy URLs: scripts/legacy-urls.txt (one slug per line).
// Stubs are intentionally NOT added to sitemap.xml — they only catch inbound
// links/old index entries and pass equity to a live page.
//
// Run: node scripts/gen-redirects.js   (also run automatically? no — run manually
// or before deploy; it's safe to re-run, it's idempotent.)

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const GAMES_JSON = path.join(ROOT, 'assets', 'games.json');
const OUT_DIR    = path.join(ROOT, 'games');
const LEGACY     = path.join(__dirname, 'legacy-urls.txt');
const SITE_URL   = 'https://ubghyper.github.io';
// No GA tag on redirect stubs: they call location.replace() immediately, so any
// hit would race the navigation. The stub hands its legacy slug to the
// destination via sessionStorage, and analytics.js reports the hop there.

const MARKER = '<!-- ubg-redirect -->';

const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'))
  .filter(g => g && g.url && g.name && g.status !== 'broken');

const activeUrlSet = new Set(games.map(g => g.url));

// ── Build normalized lookup tables for fuzzy matching renames ──
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const stripNoise = s => norm(s)
  .replace(/unblocked/g, '')
  .replace(/online/g, '')
  .replace(/^the/, '')
  .replace(/game(s)?$/,'');

const byNormUrl  = new Map();
const byNormName = new Map();
const byStrip    = new Map();
for (const g of games) {
  byNormUrl.set(norm(g.url), g);
  byNormName.set(norm(g.name), g);
  byStrip.set(stripNoise(g.url), g);
  byStrip.set(stripNoise(g.name), g);
}

// Keyword → category fallback (category pages are /games/cat-{tag}.html)
// First match wins, so retired *category* slugs are listed before the game
// keyword rules. `music` was renamed to `rhythm`; its page still has inbound
// links, and rhythm is its direct successor — not an unrelated category.
const CAT_RULES = [
  [/^catmusic$/, 'rhythm'],
  [/fnaf|fivenights|nightsat|slendytubbies|granny|yandere|pibby|maninthewindow|manfromthewindow|deadseat|fearsto|fearstofathom|midnight|deadplate|notmyneighbor|lethalape|christmasmassacre|backrooms|fear/i, 'horror'],
  [/fridaynightfunkin|^fnf|fnfvs|sprunki|indiecross|lullaby|miku|nonsense|tricky/i, 'rhythm'],
  [/vex|fancypants|celeste|pizzatower|jellymario|jumbomario|smb|supermario|^ovo|clusterrush|speedstars|runmo|stickmanboost|stickmanclimb|getttingoverit|gettingoverit/i, 'platformer'],
  // bitlife: removed 2026-11-14 after a DMCA takedown; its old URL lands on the simulation games instead
  [/papa|cooking|kindergarten|classof09|plagueinc|^pou|idle|idledice|idlelumber|miningempire|dadish|bitlife/i, 'simulation'],
  [/bowmasters|timeshooter|superhot|quake|doom|halflife|recoil|catgunner|^storm|gunner|gun|shoot|sniper|baseballbros|basketbros/i, 'shooter'],
  [/tunnelrush|highwayracer|mxoffroad|drift|turbostars|forcerace|cannonballs|racer|highway|moto|escaperoad|drivenwild|joustsjump/i, 'racing'],
  [/vampiresurvivors|brotato|ragdoll|tabs|knightsarena|hotlinemiami|crueltysquad|madness|fight|battle|archers|weaponupgrade/i, 'action'],
  [/gemcraft|cursed|laststand|bloons|towerdefen|defense|knightsarena|ageof|conflict/i, 'strategy'],
  [/sandbox|sandboxels|cellmachine|powder|sandtris|sandstone|terrarium|incredibox/i, 'sandbox'],
  [/fishing|tinyfishing|harvestio|io$|paperio|slither/i, 'arcade'],
];

// Manual destination overrides for dead slugs whose best target the
// fuzzy matcher would otherwise miss (e.g. a numbered sequel that's a
// substring collision with an earlier entry).
const REDIRECT_OVERRIDE = {
  'Fireboy-and-Watergirl-2-Light-Temple': 'Fireboy-and-Watergirl-2',
  // 2026-10-05: the old third-party "Melon Sandbox" copy was dropped in favour of the real Melon Playground build
  'Melon-Sandbox': 'Melon-Playground',
  // 2026-11-15: the same game was listed twice (gamelist4 and gamelist8 copies)
  'The-Final-Earth-2': 'Final-Earth-2',
  'Five-Nights-at-Freddys-Pizzeria-Simulator': 'FNAF-Pizzeria-Simulator',
};

function destinationFor(slug) {
  // 0. Manual override → a specific live game
  if (REDIRECT_OVERRIDE[slug]) {
    const g = games.find(x => x.url === REDIRECT_OVERRIDE[slug]);
    if (g) return { type: 'game', g };
  }
  // 1. Exact/near match to a renamed live game
  const n = norm(slug);
  if (byNormUrl.has(n))  return { type: 'game', g: byNormUrl.get(n) };
  if (byNormName.has(n)) return { type: 'game', g: byNormName.get(n) };
  const s = stripNoise(slug);
  if (s && byStrip.has(s)) return { type: 'game', g: byStrip.get(s) };

  // 2. Strong substring match (e.g. "Suika-Game" → "SuikaGame", "Tiny-Fishing-1" → "Tiny-Fishing")
  if (s.length >= 5) {
    for (const g of games) {
      const gs = stripNoise(g.url);
      if (gs.length >= 5 && (gs.includes(s) || s.includes(gs))) {
        return { type: 'game', g };
      }
    }
  }

  // 3. Category fallback by keyword
  for (const [re, cat] of CAT_RULES) {
    if (re.test(n)) return { type: 'cat', cat };
  }

  // 4. Homepage
  return { type: 'home' };
}

const stubHtml = (slug, destPath, destLabel) => `<!DOCTYPE html>
<html lang="en">
${MARKER}
<head>
<meta charset="UTF-8">
<title>${destLabel} — UBGHyper</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="canonical" href="${SITE_URL}${destPath}">
<meta name="robots" content="follow">
<meta http-equiv="refresh" content="0; url=${SITE_URL}${destPath}">
<link rel="icon" href="../assets/img/icon/main.svg">
<script>try{sessionStorage.setItem('ubg_s_redirect',JSON.stringify({from:${JSON.stringify(slug)},t:Date.now()}))}catch(e){}location.replace(${JSON.stringify(SITE_URL + destPath)});</script>
</head>
<body>
<p>This game moved. Redirecting to <a href="${SITE_URL}${destPath}">${destLabel}</a>…</p>
</body>
</html>`;

const legacy = fs.readFileSync(LEGACY, 'utf8')
  .split(/\r?\n/).map(l => l.trim()).filter(Boolean);

let written = 0, skipped = 0;
const tally = { game: 0, cat: 0, home: 0 };

for (const slug of legacy) {
  // Never shadow a live game page
  if (activeUrlSet.has(slug)) { skipped++; continue; }

  const dest = destinationFor(slug);
  let destPath, destLabel;
  if (dest.type === 'game') {
    destPath  = `/games/${encodeURIComponent(dest.g.url)}.html`;
    destLabel = `${dest.g.name} Unblocked`;
    tally.game++;
  } else if (dest.type === 'cat') {
    destPath  = `/games/cat-${dest.cat}.html`;
    destLabel = `${dest.cat[0].toUpperCase() + dest.cat.slice(1)} Games`;
    tally.cat++;
  } else {
    destPath  = `/`;
    destLabel = 'UBGHyper — Unblocked Games';
    tally.home++;
  }

  const outPath = path.join(OUT_DIR, `${slug}.html`);
  // Don't overwrite a real generated game page if one somehow exists without the marker
  if (fs.existsSync(outPath)) {
    const existing = fs.readFileSync(outPath, 'utf8');
    if (!existing.includes(MARKER)) { skipped++; continue; }
  }

  const html = stubHtml(slug, destPath, destLabel);
  const prev = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;
  if (prev !== html) { fs.writeFileSync(outPath, html, 'utf8'); written++; }
}

console.log(`Redirect stubs: ${written} written, ${skipped} skipped.`);
console.log(`  → game: ${tally.game}, → category: ${tally.cat}, → home: ${tally.home}`);
