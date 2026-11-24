#!/usr/bin/env node
// Fill (or clear) the ad placements in index.html and play.html.
//
// Each placement names its network in UNITS below:
//   mondiad   A shared async loader (<!-- UBG-AD-LOADER -->, once per file)
//             plus one <div data-mndbanid="..."> per placement, filled at
//             runtime. The loader is emitted only while a Mondiad slot exists.
//   adsterra  An <iframe> of /assets/ads/adsterra.html per placement, carrying
//             the unit as #k=KEY&w=W&h=H. Adsterra's invoke.js is
//             parser-blocking and reads a global atOptions, so it can't sit in
//             the page: the left rail comes before the game player in the DOM,
//             and a slow or silently dropped ad request would hold the game up.
//             In a lazy iframe it blocks nothing, and hidden slots (rails on
//             narrow screens, the billboard on phones) never load at all.
//
// Every rendered block ends with <!-- /UBG-AD:{placement} -->, so re-applying,
// or moving a placement to another network, replaces exactly that block.
//
// Usage:
//   node scripts/set-ad-units.js            # apply UNITS below
//   node scripts/set-ad-units.js --clear    # strip all ads, leave the markers
//
// Then run gen-game-pages.js to push play.html's placements to the game pages.

const fs = require('fs');
const path = require('path');
const SITE = path.resolve(__dirname, '..');

const LOADER_SRC = 'https://ss.mrmnd.com/banner.js';
const ADSTERRA_FRAME = '/assets/ads/adsterra.html';

// Set a placement to null to leave it empty. A placement only lands in the
// files that carry its marker (`sidebar` exists in play.html alone).
// Each Adsterra unit appears at most once per page, so a size used twice on
// one page (two rails; billboard + strip on the homepage) has two units.
// Mondiad `style` sizes its container up front (its div has no intrinsic size
// until the loader fills it); rails are sized in CSS (.ad-rail in redesign.css).
const UNITS = {
  // Rails moved to Pubfuture 2026-10-08. `hideGuard` skips the tag push when the rail is display:none (the CSS
  // hides .ad-rail below 1100px on the homepage and 1340px on the player), so hidden slots make no ad requests.
  'rail-left':  { net: 'pubfuture', unit: '6ac70c5b1d89de003d27669b', id: 'pf-24442-1', format: 'display', w: 160, h: 600,
                  box: 'width:160px;max-width:100%;min-height:600px', hideGuard: true },
  'rail-right': { net: 'pubfuture', unit: '6ac617731d89de003d24536e', id: 'pf-24438-1', format: 'display', w: 160, h: 600,
                  box: 'width:160px;max-width:100%;min-height:600px', hideGuard: true },
  // 2026-10-12: Pubfuture made one multi-size code (728x90 on desktop, 320x50 on phones) for the spot under the
  // game controls. It shows at every width (`allWidths`), so it replaces both the old 728 strip and the 320x50
  // mobile slot on the player pages. The homepage keeps its Adsterra mobile slot (`files`) because the homepage
  // strip sits far down the page; the homepage billboard moved to its own Pubfuture 728x90.
  // 2026-10-24: the homepage's phone slot now sits ABOVE the grid (it was ~80,000px down the page). A fixed
  // 320x50 frame never resizes, so it cannot shift the layout; .ad-mobile shows it below 760px only.
  'mobile':     { net: 'adsterra', key: '8c481b5970dc526b3a5d1352f9ce9b28', w: 320, h: 50, files: ['index.html'] },
  // The old bottom-of-homepage billboard: its 728x90-only unit (pf-24489-1) moved up into `top`, and a unit id
  // may appear once per page.
  'billboard':  null,
  'strip':      { net: 'pubfuture', unit: '6acb596a423062003d124259', id: 'pf-24488-1', format: 'display', w: 728, h: 50, allWidths: true,
                  box: 'width:100%;max-width:728px;min-height:50px;margin:0 auto' },
  // Pubfuture (2026-10-07): placed IN the page, not in a frame; its pt.js tag finds the div by id.
  // Each unit id appears at most once per page. `format` is what Pubfuture's dashboard calls the unit.
  'sidebar':    { net: 'pubfuture', unit: '6ac5c9071d89de003d2397e0', id: 'pf-24432-1', format: 'audio', w: 300, h: 250,
                  box: 'width:300px;max-width:100%;min-height:250px' },
  // Above the game player AND above the homepage grid (2026-10-24 ad review). This used to be the multi-size
  // pf-24431-1, which won 300x250 auctions above the player: the game started 264px down (below the fold on a
  // 1280x720 laptop) and the late resize scored CLS 0.24-0.35. It is now the 728x90-only unit, desktop only
  // (`ad-w728`: hidden, and never requested, below 760px), in an exactly reserved 90px box. Phones get no ad
  // above the game at all. A MIN-height, never a fixed one: in the first local test Pubfuture still filled this
  // "728x90" unit with a 300x250, and a fixed 90px box cropped the creative. Pubfuture is being asked to lock the
  // unit to 728x90; until then a 300x250 can still push the player down.
  'top':        { net: 'pubfuture', unit: '6acb5d3b423062003d12480a', id: 'pf-24489-1', format: 'display', w: 728, h: 90,
                  box: 'width:100%;max-width:728px;min-height:90px;margin:0 auto', hideGuard: true },
  // The multi-size unit from above the player, now at the top of the player's sidebar, beside the game info. The
  // sidebar column is 320px wide; Pubfuture is asked to serve only 300x250 into it.
  'sidebar-top': { net: 'pubfuture', unit: '6ac5c8351d89de003d23943d', id: 'pf-24431-1', format: 'audio', w: 300, h: 250,
                  box: 'width:300px;max-width:100%;min-height:250px', files: ['play.html'] },
};
// Per-file replacements of UNITS. The homepage's bottom strip used to sit at the very end of a ~29,000px page, which
// Pubfuture flagged as very low viewability (2026-10-12), so it stays empty.
// 2026-11-04 ("the ads pop up and it's really intrusive"): Pubfuture swaps creatives of different heights into
// pf-24489-1 on every refresh (300x250, then 300x90 half a minute later), so an ad ABOVE something moves it.
// Measured on the live game page: the whole player jumped 160px up and down mid-play. The game must never move,
// so game pages carry no ad above the player. On the homepage the slot reserves the tallest size it gets
// (250px), so a refresh can never shift the grid.
const FILE_OVERRIDES = {
  'index.html': {
    strip: null,
    top: { ...UNITS.top, box: 'width:100%;max-width:728px;min-height:250px;margin:0 auto' },
  },
  'play.html': {
    top: null,
  },
};
// Mondiad (paid ~$0.01 CPM against Adsterra's ~$0.67 in the Sep 2026 rail test)
// units, to switch a placement back — { net: 'mondiad', id, style }:
//   rail-left  921e3df7-9c73-4eb5-8390-0b7ac9a7454a
//   rail-right 0da5f0f4-d1ed-49d0-b9dd-9b910f6b75f2
//   mobile     b3eb5c42-62df-4863-a63b-30c4b67b2095  (style width:320px;height:50px;max-width:100%)
//   billboard  0e968f6c-f437-458c-bf68-384729d960ce  (style width:970px;height:90px;max-width:100%)
//   strip      733d8b95-ee22-4a9f-ba04-e1c3d0f41a03  (style width:100%;height:90px;max-width:728px)

// Head tags the ad partner needs, inlined at <!-- UBG-CMP --> straight after the
// analytics.js tag (analytics must run first; see CLAUDE.md). Pubfuture
// (2026-10-02) asked for Google Publisher Tag here: its header bidding renders
// through GPT and it serves its consent manager (CMP) through it as well, so no
// other CMP may sit on the page — The Moneytizer's InMobi CMP was removed for
// that reason. --clear removes these along with the ads.
const CMP_ENABLED = true;
const CMP_MARKER = '<!-- UBG-CMP -->';
const CMP_END = '<!-- /UBG-CMP -->';
const CMP_TAG = '<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>';
// Pubfuture's loader: emitted (after GPT, inside the same marker block) only on files that carry a Pubfuture slot.
const PT_TAG = '<script async data-cfasync="false" src="https://cdn.pubfuture-ssp.com/v2/unit/pt.js" type="text/javascript"></script>';

// Empty-slot collapse (2026-10-24 ad review). An unfilled slot left a blank 104px box under an "Advertisement"
// label (the strip under the player went unfilled on laptops and phones). This only touches OUR wrapper
// (.ad-aads), never Pubfuture's div or code, which the IO forbids altering (clause 2(d)). It checks 8s and 20s
// after load. A slot that is on screen is left alone, so collapsing can never shift what the visitor is looking
// at. A collapsed slot keeps its markup, and is restored the moment an ad appears in it.
const COLLAPSE_TAG = '<script>(function(){' +
  'function filled(w){return [].some.call(w.querySelectorAll("iframe,img,ins,video"),function(e){var r=e.getBoundingClientRect();return r.width>20&&r.height>20})}' +
  'function off(w){var r=w.getBoundingClientRect();return r.top>innerHeight||r.bottom<0}' +
  'function check(){[].forEach.call(document.querySelectorAll(".ad-aads:not(.ad-empty)"),function(w){' +
    'if(w.closest(".ad-rail")||!w.querySelector("[id^=pf-]")||getComputedStyle(w).display==="none")return;' +
    // collapsed = height 0 + overflow hidden, so the ad's own elements keep their size and filled() still sees them
    'if(!filled(w)&&off(w)){w.classList.add("ad-empty");new MutationObserver(function(m,o){setTimeout(function(){if(filled(w)){w.classList.remove("ad-empty");o.disconnect()}},800)}).observe(w,{childList:true,subtree:true,attributes:true})}})}' +
  'addEventListener("load",function(){setTimeout(check,8000);setTimeout(check,20000)})})()</script>';

const MARKER = p => `<!-- UBG-AD:${p} -->`;
const END = p => `<!-- /UBG-AD:${p} -->`;
const LOADER_MARKER = '<!-- UBG-AD-LOADER -->';
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function unitHtml(placement, cfg) {
  if (cfg.net === 'mondiad') {
    const style = cfg.style ? ` style="${cfg.style}"` : '';
    return `<div class="mnd-banner" data-mndbanid="${cfg.id}"${style}></div>`;
  }
  if (cfg.net === 'adsterra') {
    if (!/^[0-9a-f]{32}$/.test(cfg.key) || !cfg.w || !cfg.h) throw new Error(`${placement}: bad Adsterra unit`);
    // sandbox without allow-top-navigation: an ad can open its landing page in a
    // new tab on click, but can never send the whole tab elsewhere. Pubfuture's
    // reviewers reported the site "always redirects to YouTube" (2026-10-01) —
    // an auto-redirect creative firing from a frame that, being same-origin,
    // had the page's full authority. allow-same-origin stays because
    // invoke.js needs cookies/storage and the frame reports to ubgAdScript.
    return `<iframe class="ad-frame" src="${ADSTERRA_FRAME}#k=${cfg.key}&amp;w=${cfg.w}&amp;h=${cfg.h}" ` +
           `width="${cfg.w}" height="${cfg.h}" loading="lazy" scrolling="no" title="Advertisement" ` +
           `sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>`;
  }
  if (cfg.net === 'pubfuture') {
    if (!/^[0-9a-f]{24}$/.test(cfg.unit) || !/^pf-\d+-\d+$/.test(cfg.id) || !cfg.w || !cfg.h) throw new Error(`${placement}: bad Pubfuture unit`);
    return `<div id="${cfg.id}" data-format="${cfg.format}" style="${cfg.box || `min-width:${cfg.w}px;min-height:${cfg.h}px;max-width:100%`}">` +
           `<script>${cfg.hideGuard ? `var r=document.currentScript&&document.currentScript.closest('.ad-rail,.ad-w728,.ad-billboard');if(!r||getComputedStyle(r).display!=='none')` : ''}{window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "${cfg.unit}", id: "${cfg.id}"})}</script></div>`;
  }
  throw new Error(`${placement}: unknown ad network "${cfg.net}"`);
}

// A rail also carries layout: its <aside> is a flex child of .grid-rails /
// .stage-rails, so an empty one would reserve dead space. Rails therefore emit
// nothing at all when unfilled, and the grid simply widens.
function render(placement, cfg) {
  if (!cfg) return MARKER(placement);
  // A fixed 728-wide frame can't shrink the way Mondiad's div does, so it is
  // hidden (and, being lazy, never loaded) where it would be cropped.
  const cls = ['ad-aads',
    placement === 'mobile' && 'ad-mobile',
    placement === 'billboard' && 'ad-billboard',
    placement === 'top' && 'ad-top',
    placement === 'strip' && 'ad-strip',
    cfg.net !== 'mondiad' && cfg.w >= 728 && !cfg.allWidths && 'ad-w728'].filter(Boolean).join(' ');
  const inner = `<div class="${cls}"><span class="ad-aads-label">Advertisement</span>${unitHtml(placement, cfg)}</div>`;
  const block = placement.startsWith('rail') ? `<aside class="ad-rail">${inner}</aside>` : inner;
  return MARKER(placement) + block + END(placement);
}

const clear = process.argv.includes('--clear');
let touched = 0;

for (const file of ['index.html', 'play.html']) {
  const p = path.join(SITE, file);
  let s = fs.readFileSync(p, 'utf8');

  for (const placement of Object.keys(UNITS)) {
    let cfg = clear ? null : (FILE_OVERRIDES[file] && placement in FILE_OVERRIDES[file] ? FILE_OVERRIDES[file][placement] : UNITS[placement]);
    if (cfg && cfg.files && !cfg.files.includes(file)) cfg = null;   // this placement is not used in this file
    // The marker plus whatever block currently follows it: normally up to the
    // block's end marker. The two unterminated alternatives are the shapes
    // written before end markers existed (a rail <aside>, or an A-ADS single
    // div / Mondiad nested div), so a first run over old markup still lands.
    const re = new RegExp(
      esc(MARKER(placement)) +
      '(?:[\\s\\S]*?' + esc(END(placement)) +
      '|\\s*<aside class="ad-rail">[\\s\\S]*?<\\/aside>' +
      '|\\s*<div class="ad-aads[\\s\\S]*?<\\/div>(?:\\s*<\\/div>)?)?',
      'g'
    );
    if (!re.test(s)) continue;
    s = s.replace(re, render(placement, cfg));
    touched++;
  }

  // Shared Mondiad loader: present once per file, only while that file still
  // has a Mondiad placement. onload/onerror feed the ad_script event, which
  // measures how often ad domains are blocked (ubgAdScript in analytics.js).
  const needLoader = !clear && /data-mndbanid/.test(s);
  const report = st => `window.ubgAdScript&amp;&amp;ubgAdScript('mondiad','${st}')`;
  const loaderTag = `<script async src="${LOADER_SRC}" onload="${report('loaded')}" onerror="${report('blocked')}"></script>`;
  const loaderRe = new RegExp(esc(LOADER_MARKER) + '(?:\\s*<script[^>]*banner\\.js[^>]*><\\/script>)?');
  if (loaderRe.test(s)) {
    s = s.replace(loaderRe, needLoader ? LOADER_MARKER + loaderTag : LOADER_MARKER);
  }

  // Consent manager: the marker plus whatever block currently follows it.
  const cmpRe = new RegExp(esc(CMP_MARKER) + '(?:[\\s\\S]*?' + esc(CMP_END) + ')?');
  if (cmpRe.test(s)) {
    s = s.replace(cmpRe, () => (!clear && CMP_ENABLED) ? `${CMP_MARKER}\n${CMP_TAG}${/pubfuturetag/.test(s) ? '\n' + PT_TAG + '\n' + COLLAPSE_TAG : ''}\n${CMP_END}` : CMP_MARKER);
  } else if (!clear && CMP_ENABLED) {
    throw new Error(`${file}: no ${CMP_MARKER} marker — add it straight after the analytics.js <script>`);
  }

  fs.writeFileSync(p, s);
}

const filled = Object.entries(UNITS).filter(([, c]) => c)
  .map(([k, c]) => `${k}=${c.net}:${c.net === 'mondiad' ? c.id.slice(0, 8) : `${c.w}x${c.h}`}`);
console.log(clear
  ? `cleared ad placements (${touched} markers matched across index.html + play.html)`
  : `applied ${filled.length ? filled.join(', ') : 'no units (all null)'} — ${touched} markers matched`);
console.log('run: node scripts/gen-game-pages.js   # to propagate play.html to the game pages');
