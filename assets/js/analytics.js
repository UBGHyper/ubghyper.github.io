/* UBGHyper analytics — the single GA4 configuration owner and shared funnel layer.
 *
 * GROW-001 made direct gtag the sole configuration owner (the GTM container was
 * empty and was removed). GROW-002 is this file: it disables GA4's automatic page
 * view and sends exactly one stable, canonical page view per load, then exposes a
 * validated event API that every other script uses.
 *
 * Loaded SYNCHRONOUSLY in <head>, immediately after the gtag loader, for two
 * reasons that are not stylistic:
 *   1. document.title must be captured before camo.js disguises the tab and before
 *      play-new.js rewrites it to the game name. GA4's automatic page view races
 *      both — a camouflaged session could report "Google Classroom" as the page
 *      title. Reading the title here, first, makes that impossible.
 *   2. window.ubgTrack must exist before any deferred script wants to call it.
 * The cost is one small same-origin cached request; measure it in GROW-011.
 *
 * Rules this file enforces (measurement spec, "Data-quality acceptance"):
 *   - exactly one page view per load, never automatic;
 *   - canonical page_path with no query or fragment;
 *   - no arbitrary user text (search terms, unknown slugs, paths) ever reaches GA4;
 *   - synthetic/CI/local traffic sends nothing at all;
 *   - once-per-scope events cannot double-fire.
 */
(function () {
  'use strict';

  var GA_ID = 'G-VE9J0CCHWZ';

  // Funnel schema version — bump when event shapes change.
  var MEASUREMENT_VERSION = 1;

  // The 60s engagement threshold is PROVISIONAL (spec: "Sixty seconds is
  // provisional"). Milestones at 30/60/120 exist to validate it against
  // second-game conversion and Day-1 return before metric version 1 is frozen.
  // If the threshold changes, increment METRIC_VERSION — never restate history.
  var METRIC_VERSION = 'engaged_v1_provisional';
  var ENGAGED_SECONDS = 60;
  var MILESTONES = [30, 60, 120];

  // Readiness method. No trusted readiness bridge exists yet (that is GROW-004),
  // so engagement is explicitly labelled a proxy and must be reported as such.
  var ENGAGE_METHOD = 'proxy_focus_interaction';

  // Impression volume guard. A 620-card grid could otherwise emit hundreds of
  // events per scroll. Capped, and the cap is REPORTED rather than silent.
  var IMPRESSION_CAP = 100;
  var IMPRESSION_DWELL_MS = 1000;

  // Slugs are the only free-ish text we forward. Anything failing this is
  // replaced with a constant, so ?game=<arbitrary text> cannot reach GA4.
  var SLUG_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

  // Captured before anything can rewrite it. Never read document.title again.
  var ORIGINAL_TITLE = document.title || '';

  var SS_LANDING = 'ubg_s_landing';
  var SS_ENGAGED = 'ubg_s_engaged';
  var SS_NAV_SRC = 'ubg_s_nav_src';
  var SS_SESSION = 'ubg_s_num';
  var LS_SESSION = 'ubg_session_count';

  // ── storage helpers (never throw: private mode, blocked cookies) ──────
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  // ── synthetic / internal traffic ─────────────────────────────────────
  // Full endpoint isolation is GROW-003; this is the client-side half. Nothing
  // below sends when TEST_MODE is on — events still land in the QA buffer.
  function detectTestMode() {
    // Deliberately NO query-parameter trigger. A URL like ?ubg_test=1 would be a
    // public, shareable, permanent opt-out of analytics and ads that any visitor
    // could pass around — the QA runbook forbids exactly that. Test state is set
    // as local/session state by the harness or by hand in devtools, never by URL.
    if (lsGet('ubg_test') === '1') return 'flag';
    if (ssGet('ubg_test') === '1') return 'flag_session';
    if (navigator.webdriver) return 'webdriver';
    if (/HeadlessChrome|Puppeteer|Playwright|Lighthouse|PTST|GTmetrix|bot|crawler|spider/i.test(navigator.userAgent || '')) return 'automation';
    var h = location.hostname;
    if (!h || h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || /\.local$/.test(h)) return 'local';
    return null;
  }
  var TEST_REASON = detectTestMode();
  var TEST_MODE = !!TEST_REASON;

  // ── page identity ────────────────────────────────────────────────────
  function detectPageType() {
    // An explicit marker always wins — 404.html is served by GitHub Pages at
    // arbitrary paths, so its own pathname tells us nothing.
    var meta = document.querySelector('meta[name="ubg-page-type"]');
    if (meta && meta.content) return meta.content;

    var path = location.pathname;
    var file = path.split('/').pop();
    if (/^\/games\/cat-/.test(path)) return 'category';
    if (/^\/games\//.test(path)) return 'game';
    if (file === 'play.html') return 'player';
    if (file === '' || file === 'index.html') return 'home';
    if (file === 'all-games.html') return 'all_games';
    if (/^(favorites|stats|saves|about|privacy|contact)\.html$/.test(file)) return file.replace('.html', '');
    if (/^(unblocked-games|cool-ubg|free-online|game-websites|github-unblocked|tyrones)/.test(file)) return 'landing';
    return 'other';
  }

  function detectGame(pageType) {
    var raw = null, source = null;
    // redirect_stub resolves its slug too: which dead URLs still take traffic is
    // exactly what the URL-recovery work needs, and page_type keeps stub hits
    // from being counted as real game-page views.
    if (pageType === 'game' || pageType === 'redirect_stub') {
      raw = path_slug();
      source = 'path';
    } else if (pageType === 'player') {
      try { raw = new URLSearchParams(location.search).get('game'); } catch (e) { raw = null; }
      source = 'query';
    }
    if (!raw) return { id: null, source: null, valid: false };
    if (!SLUG_RE.test(raw)) return { id: 'invalid_slug', source: source, valid: false };
    return { id: raw, source: source, valid: true };
  }

  function path_slug() {
    var last = location.pathname.split('/').pop().replace(/\.html$/, '');
    try { last = decodeURIComponent(last); } catch (e) {}
    return last;
  }

  var PAGE_TYPE = detectPageType();
  var GAME = detectGame(PAGE_TYPE);

  // Canonical path: no query, no fragment. The player is measured SEPARATELY
  // from the game page it canonicalises to, otherwise /play.html sessions would
  // silently merge into /games/{slug}.html and both numbers become unreadable.
  function canonicalPath() {
    if (PAGE_TYPE === 'player') return '/play.html';
    var link = document.querySelector('link[rel="canonical"]');
    var href = link && link.getAttribute('href');
    if (href) {
      try { return new URL(href, location.href).pathname; } catch (e) {}
    }
    return location.pathname;
  }

  var PAGE_PATH = canonicalPath().replace(/[?#].*$/, '');
  var PAGE_LOCATION = location.origin + PAGE_PATH;

  // ── session ──────────────────────────────────────────────────────────
  function sessionNumber() {
    var n = ssGet(SS_SESSION);
    if (n) return parseInt(n, 10) || 1;
    var total = (parseInt(lsGet(LS_SESSION) || '0', 10) || 0) + 1;
    lsSet(LS_SESSION, String(total));
    ssSet(SS_SESSION, String(total));
    return total;
  }
  var SESSION_NUM = sessionNumber();

  function engagedGames() {
    try { return JSON.parse(ssGet(SS_ENGAGED) || '[]'); } catch (e) { return []; }
  }
  function addEngagedGame(id) {
    var list = engagedGames();
    if (list.indexOf(id) === -1) { list.push(id); ssSet(SS_ENGAGED, JSON.stringify(list)); }
    return list.length;
  }

  // ── gtag configuration — automatic page view DISABLED ────────────────
  window.dataLayer = window.dataLayer || [];
  function gtagFn() { window.dataLayer.push(arguments); }
  if (typeof window.gtag !== 'function') window.gtag = gtagFn;

  // Synthetic traffic never configures GA4 at all. Skipping `js`/`config`
  // (not just the events) means gtag.js loads with no property configured and
  // has nothing to send — the client cannot contribute a single hit. Blocking
  // the loader request itself is the browser context's job; see qa-isolation.js
  // and the runbook's synthetic-isolation section.
  if (!TEST_MODE) {
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      send_page_view: false,      // the ONLY page view is the manual one below
      page_path: PAGE_PATH,
      page_location: PAGE_LOCATION,
      page_title: ORIGINAL_TITLE
    });
  }

  // ── event API ────────────────────────────────────────────────────────
  // Required parameters per the measurement spec's funnel table. Anything
  // missing is flagged on the event itself so completeness is measurable
  // rather than assumed.
  var REQUIRED = {
    page_view: ['page_path', 'page_location', 'page_title', 'page_type'],
    landing_view: ['page_type', 'page_path'],
    game_impression: ['game_id', 'surface', 'position'],
    game_card_click: ['game_id', 'surface', 'position'],
    game_start: ['game_id', 'surface', 'readiness_class'],
    iframe_loaded: ['game_id', 'elapsed_ms'],
    game_load_timeout: ['game_id', 'method', 'elapsed_ms'],
    game_engagement_milestone: ['game_id', 'seconds', 'method'],
    game_engaged: ['game_id', 'metric_version', 'method'],
    second_game_engaged: ['game_id'],
    favorite_add: ['game_id', 'surface'],
    favorite_remove: ['game_id', 'surface'],
    recent_game_resume: ['game_id', 'surface'],
    share_attempt: ['game_id', 'method'],
    share_success: ['game_id', 'method'],
    '404_view': ['route_id', 'referrer_host', 'suggestion_result'],
    web_vitals: ['device_class', 'dom_nodes'],
    // Whether an ad network's script could be fetched at all on this page view
    // (once per network). `blocked` = the request failed: an ad blocker, or a
    // home/school network filtering ad domains. It says nothing about fill.
    ad_script: ['network', 'status'],
    // Optional school-filter poll (assets/js/filter-poll.js). `filter` is one of a fixed
    // list; there is no free-text path. `none` accompanies action=dismissed.
    school_filter_poll: ['filter', 'action'],
    // The homepage/favourites game list needed a retry or the CDN copy, or failed outright
    // (utils.js loadGamesList). stage: fetch|http|parse; status: HTTP code, 0 = no response.
    games_list_error: ['stage', 'status', 'recovered']
    // `popunder_fire` is gone: the Monetag popunder was removed from the site on
    // 2026-08-01. Do not re-add the event without re-adding the ad.
    // `promo_impression` / `promo_dismiss` / `promo_click` are gone too: the
    // HyperTunnel modal (assets/js/promo.js) was removed on 2026-08-26 because
    // HyperTunnel itself is gone. Nothing can emit them. Do not re-add the
    // definitions without re-adding a promotion.
  };

  var onceKeys = {};
  var buffer = [];

  function track(name, params, opts) {
    opts = opts || {};
    if (opts.once) {
      if (onceKeys[opts.once]) return false;
      onceKeys[opts.once] = true;
    }
    if (opts.oncePerSession) {
      if (ssGet('ubg_s_once_' + opts.oncePerSession)) return false;
      ssSet('ubg_s_once_' + opts.oncePerSession, '1');
    }

    var payload = {
      page_type: PAGE_TYPE,
      measurement_version: MEASUREMENT_VERSION,
      // NOT `session_number` — GA4 reserves that (it collides with its own
      // ga_session_number) and refuses to register it as a custom definition.
      visit_number: SESSION_NUM
    };
    if (GAME.id) payload.game_id = GAME.id;
    if (params) {
      for (var k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k) &&
            params[k] !== undefined && params[k] !== null) payload[k] = params[k];
      }
    }

    var need = REQUIRED[name] || [];
    var missing = [];
    for (var i = 0; i < need.length; i++) {
      if (payload[need[i]] === undefined || payload[need[i]] === '') missing.push(need[i]);
    }
    if (missing.length) payload.param_incomplete = missing.join(',');

    buffer.push({ name: name, params: payload, ts: Date.now() });
    if (buffer.length > 300) buffer.shift();

    // Synthetic traffic is recorded locally for QA and sent nowhere.
    if (TEST_MODE) return true;
    if (typeof window.gtag === 'function') window.gtag('event', name, payload);
    return true;
  }

  // ── the one stable page view ─────────────────────────────────────────
  function navSource() {
    var raw = ssGet(SS_NAV_SRC);
    if (!raw) return null;
    try { sessionStorage.removeItem(SS_NAV_SRC); } catch (e) {}
    try {
      var d = JSON.parse(raw);
      // Only honour a handoff aimed at this page.
      if (d && d.game_id && GAME.id && d.game_id !== GAME.id) return null;
      return d;
    } catch (e) { return null; }
  }

  // A legacy-slug redirect stub hands its slug over instead of trying to send its
  // own page view — the stub calls location.replace() immediately, so any hit it
  // fired would race the navigation and land inconsistently. The destination
  // reports the hop, which is both reliable and where the traffic actually went.
  function redirectSource() {
    var raw = ssGet('ubg_s_redirect');
    if (!raw) return null;
    try { sessionStorage.removeItem('ubg_s_redirect'); } catch (e) {}
    try {
      var d = JSON.parse(raw);
      if (!d || !d.from) return null;
      if (d.t && Date.now() - d.t > 15000) return null;   // stale hop, not this navigation
      return SLUG_RE.test(d.from) ? d.from : 'invalid_slug';
    } catch (e) { return null; }
  }

  var src = navSource();
  var redirectFrom = redirectSource();
  var pv = {
    page_path: PAGE_PATH,
    page_location: PAGE_LOCATION,
    page_title: ORIGINAL_TITLE,
    page_type: PAGE_TYPE
  };
  if (GAME.id) { pv.game_id = GAME.id; pv.game_id_source = GAME.source; }
  if (GAME.id && !GAME.valid) pv.game_id_valid = false;
  if (src && src.surface) { pv.source_surface = src.surface; if (src.position != null) pv.source_position = src.position; }
  if (redirectFrom) { pv.source_surface = 'redirect_stub'; pv.redirect_from = redirectFrom; }
  if (TEST_MODE) pv.test_reason = TEST_REASON;
  track('page_view', pv, { once: 'page_view' });

  // First content page of the session.
  track('landing_view', {
    page_path: PAGE_PATH,
    source_surface: (src && src.surface) || 'external',
    referrer_host: referrerHost()
  }, { oncePerSession: 'landing_view' });

  function referrerHost() {
    // Host only — never the full referrer URL (it can carry query text).
    try { return document.referrer ? new URL(document.referrer).hostname : 'direct'; }
    catch (e) { return 'unknown'; }
  }

  // ── card surfaces: impressions + clicks, delegated ───────────────────
  // Every grid on the site renders <a href="/games/{slug}.html">, so one
  // delegated layer covers the home grid, shelves, category pages, landing
  // pages, the A–Z index and the player's recommendations — with no changes
  // to render.js or app.js.
  function surfaceOf(a) {
    if (a.closest('#recentRow, #recentTrack, #recentShelf')) return 'recent_shelf';
    if (a.closest('#recRow, #recShelf')) return 'recommended_shelf';
    if (a.closest('.ply-rec-list, #plyRecList')) return 'player_recs';
    if (a.closest('.all-games-list')) return 'all_games_index';
    if (a.closest('#gamesGrid, .games-grid')) return 'grid';
    if (a.closest('nav')) return 'nav';
    return PAGE_TYPE + '_body';
  }

  function gameIdOf(a) {
    var href = a.getAttribute('href') || '';
    var m = href.match(/\/games\/([^/?#]+)\.html/);
    var raw = m && m[1];
    if (!raw) {
      var q = href.match(/[?&]game=([^&#]+)/);
      raw = q && q[1];
    }
    if (!raw) return null;
    try { raw = decodeURIComponent(raw); } catch (e) {}
    if (/^cat-/.test(raw)) return null;          // category link, not a game
    return SLUG_RE.test(raw) ? raw : 'invalid_slug';
  }

  function positionOf(a) {
    var parent = a.parentElement;
    if (!parent) return 0;
    var sibs = parent.querySelectorAll('a[href*="/games/"], a[href*="play.html?game="]');
    for (var i = 0; i < sibs.length; i++) if (sibs[i] === a) return i + 1;
    return 0;
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="/games/"], a[href*="play.html?game="]');
    if (!a) return;
    var id = gameIdOf(a);
    if (!id) return;
    var surface = surfaceOf(a);
    var position = positionOf(a);

    // Handoff so the destination page view knows where it came from.
    ssSet(SS_NAV_SRC, JSON.stringify({ surface: surface, position: position, game_id: id }));

    track('game_card_click', { game_id: id, surface: surface, position: position });
    if (surface === 'recent_shelf') track('recent_game_resume', { game_id: id, surface: surface });
  }, true);

  var impressionCount = 0;
  function observeImpressions() {
    if (!('IntersectionObserver' in window)) return;
    var seen = {};
    var timers = new WeakMap();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = en.target;
        if (en.isIntersecting) {
          if (timers.has(a)) return;
          timers.set(a, setTimeout(function () {
            var id = gameIdOf(a);
            if (!id) return;
            var surface = surfaceOf(a);
            var key = id + '|' + surface;
            if (seen[key]) return;
            if (impressionCount >= IMPRESSION_CAP) {
              // Reported, never silent.
              track('game_impression_capped', { cap: IMPRESSION_CAP, surface: surface }, { once: 'imp_cap' });
              io.disconnect();
              return;
            }
            seen[key] = true;
            impressionCount++;
            track('game_impression', { game_id: id, surface: surface, position: positionOf(a) });
          }, IMPRESSION_DWELL_MS));
        } else {
          var t = timers.get(a);
          if (t) { clearTimeout(t); timers.delete(a); }
        }
      });
    }, { threshold: 0.5 });

    var SEL = 'a[href*="/games/"], a[href*="play.html?game="]';

    function observeIn(root) {
      if (!root || root.nodeType !== 1) return;
      if (root.matches && root.matches(SEL) && !root.__ubgObserved) {
        root.__ubgObserved = true; io.observe(root);
      }
      var links = root.querySelectorAll ? root.querySelectorAll(SEL) : [];
      for (var i = 0; i < links.length; i++) {
        if (!links[i].__ubgObserved) { links[i].__ubgObserved = true; io.observe(links[i]); }
      }
    }

    observeIn(document.body || document.documentElement);

    // Grids render asynchronously from games.json, so new cards must be picked
    // up — but only the ADDED subtrees are inspected. Re-scanning the whole
    // document on every mutation would be O(cards) per mutation on a 620-card
    // grid, and this runs on school Chromebooks.
    if ('MutationObserver' in window) {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var added = muts[i].addedNodes;
          for (var j = 0; j < added.length; j++) observeIn(added[j]);
        }
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  // ── Performance baseline (GROW-011) ──────────────────────────────────
  // Core Web Vitals from native browser APIs. No library: the site ships no
  // external scripts and has no build step, and a CDN dependency would be a new
  // third-party host on every page.
  //
  // One event per page load, sent when the page is hidden — CLS and INP are only
  // final at that point, so sending earlier would systematically under-report
  // both. Reported beside page_type and device so a growth change cannot hide a
  // slower experience, which is the whole point of the measurement.
  var VITAL_THRESHOLDS = {          // Google's good / needs-improvement bounds
    lcp: [2500, 4000],
    fcp: [1800, 3000],
    inp: [200, 500],
    ttfb: [800, 1800],
    cls: [0.1, 0.25]
  };
  function rate(metric, value) {
    var t = VITAL_THRESHOLDS[metric];
    if (!t || value == null) return null;
    return value <= t[0] ? 'good' : (value <= t[1] ? 'needs_improvement' : 'poor');
  }

  function deviceClass() {
    var w = window.innerWidth || 0;
    // Chromebooks report as desktop — which is correct, and most of the audience.
    if (w && w < 600) return 'mobile';
    if (w && w < 1024) return 'tablet';
    return 'desktop';
  }

  var jsErrors = 0;
  window.addEventListener('error', function () { jsErrors++; });
  window.addEventListener('unhandledrejection', function () { jsErrors++; });

  function initPerf() {
    if (typeof PerformanceObserver !== 'function') return;
    var v = { lcp: null, cls: 0, inp: null, fcp: null, ttfb: null };

    function observe(type, cb, extra) {
      try {
        var o = new PerformanceObserver(function (list) { list.getEntries().forEach(cb); });
        var opts = { type: type, buffered: true };
        if (extra) for (var k in extra) opts[k] = extra[k];
        o.observe(opts);
      } catch (e) { /* unsupported entry type — skip that metric, keep the rest */ }
    }

    observe('largest-contentful-paint', function (e) { v.lcp = e.startTime; });
    observe('layout-shift', function (e) { if (!e.hadRecentInput) v.cls += e.value; });
    observe('paint', function (e) { if (e.name === 'first-contentful-paint') v.fcp = e.startTime; });
    // INP proxy: worst interaction latency seen. durationThreshold keeps the
    // observer from firing on every trivial event.
    observe('event', function (e) { if (v.inp === null || e.duration > v.inp) v.inp = e.duration; },
            { durationThreshold: 40 });

    try {
      var nav = performance.getEntriesByType('navigation')[0];
      if (nav) v.ttfb = nav.responseStart;
    } catch (e) {}

    var sent = false;
    function send() {
      if (sent) return;
      sent = true;
      var p = {
        device_class: deviceClass(),
        // Top document only — iframe contents are a separate document and are NOT
        // counted here. That is deliberate: it isolates OUR page weight from the
        // game's, which a DevTools total cannot do.
        dom_nodes: document.getElementsByTagName('*').length,
        iframe_count: document.getElementsByTagName('iframe').length,
        js_errors: jsErrors
      };
      if (v.lcp != null)  { p.lcp_ms = Math.round(v.lcp);   p.lcp_rating = rate('lcp', v.lcp); }
      if (v.fcp != null)  { p.fcp_ms = Math.round(v.fcp);   p.fcp_rating = rate('fcp', v.fcp); }
      if (v.inp != null)  { p.inp_ms = Math.round(v.inp);   p.inp_rating = rate('inp', v.inp); }
      if (v.ttfb != null) { p.ttfb_ms = Math.round(v.ttfb); p.ttfb_rating = rate('ttfb', v.ttfb); }
      // CLS is a small float; sent x1000 as an integer so it survives any
      // numeric handling intact. Divide by 1000 when reading reports.
      p.cls_x1000 = Math.round(v.cls * 1000);
      p.cls_rating = rate('cls', v.cls);
      track('web_vitals', p, { once: 'web_vitals' });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') send();
    });
    window.addEventListener('pagehide', send);
  }

  // ── 404 route classification (GROW-005) ──────────────────────────────
  // A dead URL is reduced to an allowlisted SHAPE. The raw path is never sent —
  // it can contain anything a stranger or a scanner puts in a URL bar.
  //
  // The one richer value that may escape is `game_id`, and only when the dead
  // path fuzzy-matches a real catalogue entry. That makes it allowlisted by
  // definition, and unlike a raw path it is directly actionable: it names the
  // game the visitor was trying to reach, which is exactly what a redirect stub
  // needs. Recoverable 404s therefore become a work list without ever
  // collecting arbitrary text.
  function classifyRoute(pathname) {
    var p = String(pathname || '').split('?')[0].split('#')[0].toLowerCase();
    if (/(^|\/)(wp-admin|wp-login|wp-content|wp-includes|xmlrpc|phpmyadmin|vendor|admin|\.git|\.env)(\/|$|\.)/.test(p)) return 'bot_probe';
    if (/\.(php|asp|aspx|jsp|cgi|env|sql|bak|ini|sh|yml)$/.test(p)) return 'bot_probe';
    if (/\.(css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|json|xml|txt|mp3|mp4|wasm|data|unityweb)$/.test(p)) return 'asset';
    if (/^\/games\/cat-[^/]*\.html$/.test(p)) return 'category_page';
    if (/^\/games\/[^/]+\.html$/.test(p)) return 'game_page';
    if (/^\/games\/?$/.test(p)) return 'games_directory';
    if (/^\/play\.html$/.test(p)) return 'player';
    if (/^\/[^/]+\.html$/.test(p)) return 'root_page';
    if (p === '/' || p === '') return 'root';
    if (!/\.[a-z0-9]{1,8}$/.test(p)) return 'directory';
    return 'unknown_path';
  }

  // ── game session: start → loaded → qualifying engagement ─────────────
  // Qualifying time (spec): document visible, window focused, and a trusted
  // interaction has occurred. Tab-open time is NOT engagement — that is the
  // flaw in the existing playtime counter, which stays as-is for the user-facing
  // viz but is not the north-star input.
  function GameSession(gameId, opts) {
    opts = opts || {};
    this.gameId = gameId;
    this.surface = opts.surface || PAGE_TYPE;
    this.readinessClass = opts.readinessClass || 'unclassified';  // GROW-004 assigns real classes
    this.startedAt = Date.now();
    this.qualifiedSeconds = 0;
    this.interacted = false;
    this.milestonesSent = {};
    this.engagedSent = false;
    this.timer = null;
    this.iframe = opts.iframe || null;
    this.bind();
  }

  GameSession.prototype.bind = function () {
    var self = this;
    function markInteraction() { self.interacted = true; }
    document.addEventListener('pointerdown', markInteraction, { passive: true });
    document.addEventListener('keydown', markInteraction);
    // Games take focus inside the iframe; the parent sees the blur.
    window.addEventListener('blur', function () {
      if (self.iframe && document.activeElement === self.iframe) self.interacted = true;
    });
    this.timer = setInterval(function () { self.tick(); }, 1000);
  };

  GameSession.prototype.qualifying = function () {
    if (TEST_MODE) return false;
    if (document.hidden) return false;
    if (!this.interacted) return false;
    // hasFocus() is false when another window/tab is in front; when the game
    // iframe holds focus the top document still reports focus.
    if (typeof document.hasFocus === 'function' && !document.hasFocus()) {
      return this.iframe && document.activeElement === this.iframe;
    }
    return true;
  };

  GameSession.prototype.tick = function () {
    if (!this.qualifying()) return;
    this.qualifiedSeconds++;
    var s = this.qualifiedSeconds;

    for (var i = 0; i < MILESTONES.length; i++) {
      var m = MILESTONES[i];
      if (s === m && !this.milestonesSent[m]) {
        this.milestonesSent[m] = true;
        track('game_engagement_milestone', {
          game_id: this.gameId, seconds: m, method: ENGAGE_METHOD,
          readiness_class: this.readinessClass
        }, { once: 'ms_' + this.gameId + '_' + m });
      }
    }

    if (s >= ENGAGED_SECONDS && !this.engagedSent) {
      this.engagedSent = true;
      track('game_engaged', {
        game_id: this.gameId,
        metric_version: METRIC_VERSION,
        method: ENGAGE_METHOD,
        readiness_class: this.readinessClass,
        surface: this.surface
      }, { once: 'engaged_' + this.gameId + '_' + METRIC_VERSION });

      var distinct = addEngagedGame(this.gameId);
      if (distinct === 2) {
        track('second_game_engaged', { game_id: this.gameId }, { oncePerSession: 'second_game' });
      }
    }
  };

  GameSession.prototype.stop = function () {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  };

  // ── public API ───────────────────────────────────────────────────────
  var active = null;

  window.ubgTrack = track;
  // Called from ad markup: the Mondiad loader's onload/onerror, and each
  // Adsterra frame (same origin) via parent.ubgAdScript. Only these two
  // networks and two statuses are accepted, so markup can't inject free text.
  window.ubgAdScript = function (network, status) {
    if (!/^(adsterra|mondiad)$/.test(network) || !/^(loaded|blocked)$/.test(status)) return false;
    return track('ad_script', { network: network, status: status }, { once: 'ad_script_' + network });
  };
  var POLL_FILTERS = /^(goguardian|securly|lightspeed|linewize|cisco_umbrella|iboss|blocksi|zscaler|smoothwall|fortiguard|palo_alto|contentkeeper|not_sure|none_home|other|none)$/;
  window.ubgFilterPoll = function (filter, action) {
    if (!POLL_FILTERS.test(filter) || !/^(answered|dismissed)$/.test(action)) return false;
    return track('school_filter_poll', { filter: filter, action: action }, { once: 'school_filter_poll' });
  };
  window.ubgAnalytics = {
    version: MEASUREMENT_VERSION,
    metricVersion: METRIC_VERSION,
    pageType: PAGE_TYPE,
    pagePath: PAGE_PATH,
    gameId: GAME.id,
    sessionNumber: SESSION_NUM,
    testMode: TEST_MODE,
    testReason: TEST_REASON,
    originalTitle: ORIGINAL_TITLE,
    engagedSeconds: ENGAGED_SECONDS,

    // Player calls this the moment it commits to loading a game.
    startGame: function (gameId, opts) {
      if (!gameId || !SLUG_RE.test(gameId)) gameId = 'invalid_slug';
      if (active) active.stop();
      active = new GameSession(gameId, opts);
      track('game_start', {
        game_id: gameId,
        surface: (opts && opts.surface) || PAGE_TYPE,
        readiness_class: (opts && opts.readinessClass) || 'unclassified'
      }, { once: 'game_start_' + gameId });
      return active;
    },
    iframeLoaded: function (gameId, elapsedMs) {
      track('iframe_loaded', { game_id: gameId, elapsed_ms: Math.round(elapsedMs) },
            { once: 'iframe_loaded_' + gameId });
    },
    loadTimeout: function (gameId, elapsedMs) {
      track('game_load_timeout', {
        game_id: gameId, method: 'iframe_load', elapsed_ms: Math.round(elapsedMs)
      }, { once: 'load_timeout_' + gameId });
    },
    session: function () { return active; },

    classifyRoute: classifyRoute,

    /* Called by 404.html once the did-you-mean matcher has run.
       opts: { suggestion: 'confident' | 'weak' | 'none', matchedGameId } */
    track404: function (opts) {
      opts = opts || {};
      var p = {
        route_id: classifyRoute(location.pathname),
        referrer_host: referrerHost(),
        suggestion_result: opts.suggestion || 'none'
      };
      if (opts.matchedGameId && SLUG_RE.test(opts.matchedGameId)) p.game_id = opts.matchedGameId;
      return track('404_view', p, { once: '404_view' });
    },

    // One shared definition so promo (E1) and popunder (E2) segment identically.
    visitorState: function () {
      return SESSION_NUM <= 1 ? 'new' : 'returning';
    },
    hasEngagedThisSession: function () { return engagedGames().length > 0; },

    // QA surface — used by the event harness and by manual DebugView checks.
    events: function () { return buffer.slice(); },
    lastEvent: function (name) {
      for (var i = buffer.length - 1; i >= 0; i--) if (buffer[i].name === name) return buffer[i];
      return null;
    },
    countOf: function (name) {
      var n = 0;
      for (var i = 0; i < buffer.length; i++) if (buffer[i].name === name) n++;
      return n;
    }
  };

  initPerf();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeImpressions);
  } else {
    observeImpressions();
  }
})();
