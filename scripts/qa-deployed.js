#!/usr/bin/env node
/* Post-deployment verification — run with: node scripts/qa-deployed.js
 *
 * Checks the LIVE site, not the working tree. Implements the runbook's
 * "Deployment synchronization" rule: never assume a push is live, poll for the
 * release marker with bounded retries, and fail rather than validate the
 * previous deployment.
 *
 * All requests go through net-guard, so this cannot touch an analytics, ad,
 * affiliate or promotion host — verifying a release must not generate traffic
 * that pollutes the very metrics being verified.
 */
'use strict';
const guard = require('./lib/net-guard');

const SITE = 'https://ubghyper.github.io';
const MARKER = '/assets/js/analytics.js';     // the current release marker
const MAX_ATTEMPTS = 10;
const DELAY_MS = 20000;

let failures = 0;
const check = (name, cond, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  →  ' + String(JSON.stringify(detail ?? '')).slice(0, 300)}`);
  if (!cond) failures++;
};
const section = t => console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 58 - t.length))}`);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(path) {
  const res = await guard.guardedFetch(SITE + path, { headers: { 'cache-control': 'no-cache' } });
  // Always read the body — the 404 page is a non-2xx response we must inspect,
  // and an empty string would let content assertions pass vacuously.
  return { status: res.status, body: await res.text() };
}

(async () => {
  // ── Deployment synchronization ──────────────────────────────────────
  section('Deployment synchronization');
  let live = false;
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    try {
      const { status, body } = await get('/');
      if (status === 200 && body.includes(MARKER)) { live = true; console.log(`      release marker live (attempt ${i})`); break; }
      console.log(`      attempt ${i}/${MAX_ATTEMPTS}: marker not live yet (status ${status})`);
    } catch (e) {
      console.log(`      attempt ${i}/${MAX_ATTEMPTS}: ${e.message}`);
    }
    if (i < MAX_ATTEMPTS) await sleep(DELAY_MS);
  }
  check('deployed revision carries the release marker', live,
    'Timed out. Refusing to validate the previous deployment.');
  if (!live) { console.log('\nABORTED — deployment not live.'); process.exit(1); }

  // ── Page-type sample ────────────────────────────────────────────────
  section('Page-type sample returns expected content');
  const SAMPLE = [
    ['/', 'home'],
    ['/all-games.html', 'all_games'],
    ['/unblocked-games-66.html', 'landing'],
    ['/games/cat-horror.html', 'category'],
    ['/games/Slope.html', 'game'],
    ['/play.html?game=Slope', 'player'],
    ['/privacy.html', 'privacy'],
  ];
  const pages = {};
  for (const [path, label] of SAMPLE) {
    const r = await get(path);
    pages[path] = r.body;
    check(`${label} (${path}) → 200`, r.status === 200, r.status);
  }

  // ── One configuration owner, one page view ──────────────────────────
  section('Analytics configuration');
  for (const [path] of SAMPLE) {
    const b = pages[path] || '';
    check(`${path}: loads analytics.js exactly once`, (b.match(/assets\/js\/analytics\.js/g) || []).length === 1);
    check(`${path}: no GTM`, !/GTM-|gtm\.js\?id=/.test(b));
    check(`${path}: no inline gtag config`, !/gtag\('config'/.test(b));
  }
  {
    const r = await get('/assets/js/analytics.js');
    check('analytics.js is served', r.status === 200, r.status);
    check('automatic page view disabled in the deployed module', /send_page_view:\s*false/.test(r.body));
    check('deployed module uses visit_number, not the reserved name',
      /visit_number:/.test(r.body) && !/\bsession_number:/.test(r.body));
    check('test mode not reachable from a URL in the deployed module',
      !/search[\s\S]{0,120}ubg_test/.test(r.body.replace(/\/\*[\s\S]*?\*\//g, '')));
  }

  // ── Promotions and advertising ──────────────────────────────────────
  section('Promotions and advertising');
  for (const [path] of SAMPLE) {
    const b = pages[path] || '';
    check(`${path}: no promo module`, !/promo\.js|HyperTunnel announcement/.test(b));
    check(`${path}: no popunder`, !/popunder/i.test(b));
  }
  check('popunder module is gone from the deployment', (await get('/assets/js/popunder.js')).status === 404);
  check('promo module is gone from the deployment', (await get('/assets/js/promo.js')).status === 404);
  check('privacy policy no longer names Monetag', !/Monetag/i.test(pages['/privacy.html'] || ''));
  check('privacy policy states there are no pop-ups', /no pop-ups or pop-unders/i.test(pages['/privacy.html'] || ''));

  // ── Canonical integrity ─────────────────────────────────────────────
  section('Canonical integrity');
  // Attribute order varies: game pages carry id="canonicalTag" before rel.
  const canonicalOf = html => {
    const m = (html || '').match(/<link[^>]*rel="canonical"[^>]*>/i);
    const h = m && m[0].match(/href="([^"]+)"/i);
    return h ? h[1] : null;
  };
  check('home canonical is the bare origin', canonicalOf(pages['/']) === `${SITE}/`, canonicalOf(pages['/']));
  check('game page canonical is self-referential',
    canonicalOf(pages['/games/Slope.html']) === `${SITE}/games/Slope.html`, canonicalOf(pages['/games/Slope.html']));
  check('player canonical points at the game page, consolidating ranking signal',
    canonicalOf(pages['/play.html?game=Slope']) !== null, canonicalOf(pages['/play.html?game=Slope']));
  check('player stays noindex', /<meta name="robots" content="noindex,follow">/.test(pages['/play.html?game=Slope'] || ''));

  // ── Sitemap ─────────────────────────────────────────────────────────
  section('Sitemap');
  {
    const r = await get('/sitemap.xml');
    check('sitemap is served', r.status === 200, r.status);
    const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    check(`sitemap has the expected URL count (${locs.length})`, locs.length > 600 && locs.length < 700, locs.length);
    check('sitemap contains no /index.html', !locs.some(l => l.endsWith('/index.html')), locs.filter(l => l.endsWith('/index.html')));
    // Match the player path, not the substring — "SMB1-Web-Gameplay.html" is a
    // legitimate game slug that ends in "play.html".
    const playerUrls = locs.filter(l => /\/play\.html(\?|$)/.test(l));
    check('sitemap contains no player URLs', playerUrls.length === 0, playerUrls);
    check('sitemap has no duplicates', new Set(locs).size === locs.length, locs.length - new Set(locs).size);
  }

  // ── Legacy URL preservation ─────────────────────────────────────────
  section('Legacy URL preservation');
  {
    const r = await get('/games/poly-track-unblocked.html');
    check('legacy slug still resolves (no 404)', r.status === 200, r.status);
    check('legacy stub hands its slug to the destination', /ubg_s_redirect/.test(r.body));
    check('legacy stub carries no GA tag', !/gtag|analytics\.js/.test(r.body));
    check('legacy stub redirects to a real destination', /location\.replace\("https:\/\/ubghyper\.github\.io\//.test(r.body));
  }

  // ── 404 handling (GROW-005) ─────────────────────────────────────────
  section('404 measurement');
  {
    const r = await get('/this-page-definitely-does-not-exist-' + MARKER.length + '.html');
    check('dead URL returns a real 404 status', r.status === 404, r.status);
    check('404 page is served with the page-type marker',
      /<meta name="ubg-page-type" content="not_found">/.test(r.body));
    check('404 page reports through the analytics layer', /track404/.test(r.body));
    check('404 recovery links point at canonical game pages, not the noindex player',
      !/play\.html\?game=/.test(r.body), (r.body.match(/play\.html\?game=[^"']*/g) || []).slice(0, 3));
    check('404 page stays noindex', /<meta name="robots" content="noindex">/.test(r.body));
  }

  console.log(`\n${failures === 0 ? 'ALL POST-DEPLOY CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error('\nERROR: ' + e.message); process.exit(1); });
