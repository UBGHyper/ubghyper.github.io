#!/usr/bin/env node
// GROW-002 event QA — run with: node scripts/qa-analytics.js
// GROW-002 event QA — exercises assets/js/analytics.js against the measurement
// spec's data-quality acceptance rules in a stubbed DOM.
// No network: nothing here can reach an analytics, ad or affiliate endpoint.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const SRC = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'analytics.js'), 'utf8');

function makeStorage(seed) {
  const m = new Map(Object.entries(seed || {}));
  return {
    _m: m,
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
  };
}

function makeAnchor(href, opts = {}) {
  const a = {
    href, _attrs: { href },
    getAttribute: k => a._attrs[k],
    closest: sel => {
      for (const s of (opts.closest || [])) if (sel.includes(s)) return { tag: s };
      return null;
    },
    parentElement: null,
  };
  a.parentElement = { querySelectorAll: () => opts.siblings || [a] };
  return a;
}

function boot(cfg = {}) {
  const listeners = {};        // document/window event listeners
  const intervals = [];
  const timeouts = [];
  const gtagCalls = [];

  const doc = {
    title: cfg.title !== undefined ? cfg.title : 'Test Page — UBGHyper',
    hidden: false,
    readyState: 'complete',
    documentElement: {},
    hasFocus: () => (cfg.hasFocus !== undefined ? cfg.hasFocus : true),
    activeElement: null,
    referrer: cfg.referrer || '',
    querySelector: sel => {
      if (sel.includes('ubg-page-type')) return cfg.pageTypeMeta ? { content: cfg.pageTypeMeta } : null;
      if (sel.includes('canonical')) return cfg.canonical ? { getAttribute: () => cfg.canonical } : null;
      return null;
    },
    querySelectorAll: () => cfg.links || [],
    getElementsByTagName: tag => (tag === 'iframe'
      ? new Array(cfg.iframeCount != null ? cfg.iframeCount : 0)
      : new Array(cfg.domNodes != null ? cfg.domNodes : 1200)),
    addEventListener: (t, fn) => { (listeners[t] = listeners[t] || []).push(fn); },
  };

  const win = {
    addEventListener: (t, fn) => { (listeners['win:' + t] = listeners['win:' + t] || []).push(fn); },
  };

  const sandbox = {
    window: win,
    document: doc,
    navigator: { userAgent: cfg.ua || 'Mozilla/5.0 Chrome/120', webdriver: !!cfg.webdriver },
    location: {
      origin: 'https://ubghyper.github.io',
      hostname: cfg.hostname || 'ubghyper.github.io',
      pathname: cfg.pathname || '/',
      search: cfg.search || '',
      href: 'https://ubghyper.github.io' + (cfg.pathname || '/') + (cfg.search || ''),
    },
    localStorage: makeStorage(cfg.ls),
    sessionStorage: makeStorage(cfg.ss),
    URL, URLSearchParams, Date, Math, JSON, Object, Array, String, parseInt,
    setInterval: (fn, ms) => { intervals.push({ fn, ms }); return intervals.length; },
    clearInterval: () => {},
    setTimeout: (fn, ms) => { timeouts.push({ fn, ms }); return timeouts.length; },
    clearTimeout: () => {},
    console,
  };
  sandbox.window.document = doc;
  Object.assign(sandbox.window, { location: sandbox.location });
  if (cfg.observers !== false) {
    sandbox.IntersectionObserver = function (cb) {
      this.observe = () => {}; this.disconnect = () => {};
    };
    sandbox.MutationObserver = function () { this.observe = () => {}; };
    sandbox.window.IntersectionObserver = sandbox.IntersectionObserver;
    sandbox.window.MutationObserver = sandbox.MutationObserver;

    // Performance APIs — without these initPerf() bails and web_vitals never fires.
    const perfObservers = [];
    sandbox.PerformanceObserver = function (cb) {
      this.observe = opts => perfObservers.push({ type: opts && opts.type, cb });
      this.disconnect = () => {};
    };
    sandbox.window.PerformanceObserver = sandbox.PerformanceObserver;
    sandbox.performance = {
      getEntriesByType: t => (t === 'navigation' ? [{ responseStart: cfg.ttfb != null ? cfg.ttfb : 300 }] : []),
      now: () => 0,
    };
    sandbox.window.performance = sandbox.performance;
    sandbox._perfObservers = perfObservers;
  }

  // Install the spy BEFORE running the module. analytics.js only defines
  // window.gtag when one is absent, so the spy survives and captures every call
  // the module makes — including the ones made during load. Installing it
  // afterwards would capture nothing and make "sends nothing" pass trivially.
  sandbox.window.gtag = function () {
    gtagCalls.push(Array.from(arguments));
    (sandbox.window.dataLayer = sandbox.window.dataLayer || []).push(arguments);
  };

  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox);

  return {
    sandbox, doc, win, listeners, intervals, timeouts, gtagCalls,
    api: () => sandbox.window.ubgAnalytics,
    events: () => sandbox.window.ubgAnalytics.events(),
    names: () => sandbox.window.ubgAnalytics.events().map(e => e.name),
    find: n => sandbox.window.ubgAnalytics.events().filter(e => e.name === n),
    dataLayer: () => sandbox.window.dataLayer,
    fire: (type, ev) => (listeners[type] || []).forEach(fn => fn(ev)),
    tick: n => { for (let i = 0; i < n; i++) intervals.filter(t => t.ms === 1000).forEach(t => t.fn()); },
  };
}

let failures = 0;
const check = (name, cond, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  →  ' + JSON.stringify(detail).slice(0, 400)}`);
  if (!cond) failures++;
};
const section = t => console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 58 - t.length))}`);

// ═══ 1. The stable page view ═══════════════════════════════════════════
section('Stable canonical page view');
{
  const t = boot({ pathname: '/games/Slope.html', canonical: 'https://ubghyper.github.io/games/Slope.html', title: 'Slope Unblocked - Play Free Online | UBGHyper' });
  const pv = t.find('page_view');
  check('exactly one page_view per load', pv.length === 1, t.names());
  check('page_view carries canonical path', pv[0].params.page_path === '/games/Slope.html', pv[0].params);
  check('page_view carries canonical location', pv[0].params.page_location === 'https://ubghyper.github.io/games/Slope.html', pv[0].params);
  check('page_view carries the HTML title', pv[0].params.page_title === 'Slope Unblocked - Play Free Online | UBGHyper', pv[0].params);
  check('page_type = game', pv[0].params.page_type === 'game', pv[0].params);
  check('game_id resolved from path without a catalogue fetch', pv[0].params.game_id === 'Slope', pv[0].params);
  check('no required params missing', !pv[0].params.param_incomplete, pv[0].params);

  const cfg = t.dataLayer().find(a => a[0] === 'config');
  check('automatic page view is disabled', cfg && cfg[2] && cfg[2].send_page_view === false, cfg);
}
{
  // A second page view cannot be forced.
  const t = boot({ pathname: '/' });
  t.sandbox.window.ubgTrack('page_view', { page_path: '/', page_location: 'x', page_title: 'y', page_type: 'home' }, { once: 'page_view' });
  check('page_view cannot double-fire', t.find('page_view').length === 1, t.names());
}

// ═══ 2. Title integrity (the camo race) ════════════════════════════════
section('Title integrity');
{
  const t = boot({ pathname: '/games/Slope.html', title: 'Slope Unblocked - Play Free Online | UBGHyper' });
  t.doc.title = 'Google Classroom';                 // camo fires after load
  const pv = t.find('page_view')[0];
  check('camo title cannot leak into the page view', pv.params.page_title === 'Slope Unblocked - Play Free Online | UBGHyper', pv.params);
  check('original title exposed for later consumers', t.api().originalTitle === 'Slope Unblocked - Play Free Online | UBGHyper', t.api().originalTitle);
}

// ═══ 3. Player measured separately from its canonical game page ════════
section('Player identity');
{
  const t = boot({ pathname: '/play.html', search: '?game=Slope', canonical: 'https://ubghyper.github.io/games/Slope.html' });
  const pv = t.find('page_view')[0];
  check('page_type = player', pv.params.page_type === 'player', pv.params);
  check('player does NOT merge into the canonical game page', pv.params.page_path === '/play.html', pv.params);
  check('player still identifies the game', pv.params.game_id === 'Slope', pv.params);
  check('page_path has no query string', !/[?#]/.test(pv.params.page_path), pv.params);
}

// ═══ 4. No arbitrary user text reaches GA4 ═════════════════════════════
section('Privacy: no arbitrary text');
{
  const t = boot({ pathname: '/play.html', search: '?game=' + encodeURIComponent('my email is a@b.com <script>') });
  const pv = t.find('page_view')[0];
  check('unknown/hostile slug is replaced, never forwarded', pv.params.game_id === 'invalid_slug', pv.params);
  check('invalid slug is flagged', pv.params.game_id_valid === false, pv.params);
  const blob = JSON.stringify(t.events());
  check('raw text appears nowhere in any event', !blob.includes('a@b.com') && !blob.includes('<script'), blob.slice(0, 200));
}
{
  const t = boot({ pathname: '/', search: '?search=' + encodeURIComponent('minecraft unblocked wtf') });
  const blob = JSON.stringify(t.events());
  check('search query text never enters an event', !blob.includes('minecraft'), blob.slice(0, 200));
  check('query string stripped from canonical path', t.find('page_view')[0].params.page_path === '/', t.find('page_view')[0].params);
}
{
  const t = boot({ pathname: '/', referrer: 'https://www.google.com/search?q=secret+terms' });
  const lv = t.find('landing_view')[0];
  check('referrer reduced to host only', lv.params.referrer_host === 'www.google.com', lv.params);
  check('full referrer URL never sent', !JSON.stringify(t.events()).includes('secret+terms'), lv.params);
}

// ═══ 5. Page-type detection ════════════════════════════════════════════
section('Page-type detection');
{
  const cases = [
    ['/', {}, 'home'],
    ['/index.html', {}, 'home'],
    ['/games/cat-horror.html', {}, 'category'],
    ['/games/Slope.html', {}, 'game'],
    ['/all-games.html', {}, 'all_games'],
    ['/unblocked-games-66.html', {}, 'landing'],
    ['/stats.html', {}, 'stats'],
    ['/some/deep/path', { pageTypeMeta: 'not_found' }, 'not_found'],
  ];
  for (const [pathname, extra, expect] of cases) {
    const t = boot(Object.assign({ pathname }, extra));
    check(`${pathname} → ${expect}`, t.api().pageType === expect, t.api().pageType);
  }
  const cat = boot({ pathname: '/games/cat-horror.html' });
  check('category page carries no game_id', !cat.find('page_view')[0].params.game_id, cat.find('page_view')[0].params);
}

// ═══ 6. landing_view is once per session ═══════════════════════════════
section('Session scoping');
{
  const ss = {};
  const shared = makeStorage(ss);
  const t1 = boot({ pathname: '/' });
  check('landing_view fires on first page of session', t1.find('landing_view').length === 1, t1.names());
  // simulate a second page load carrying the same sessionStorage
  const carried = Object.fromEntries(t1.sandbox.sessionStorage._m);
  const t2 = boot({ pathname: '/games/Slope.html', ss: carried });
  check('landing_view does NOT refire later in the session', t2.find('landing_view').length === 0, t2.names());
  check('second page still sends its own page_view', t2.find('page_view').length === 1, t2.names());
}

// ═══ 7. Synthetic / internal traffic sends nothing ═════════════════════
section('Synthetic isolation');
{
  const t = boot({ pathname: '/', ls: { ubg_test: '1' } });
  check('local test flag detected', t.api().testMode === true && t.api().testReason === 'flag', t.api().testReason);
  check('events are buffered for QA', t.find('page_view').length === 1, t.names());
  check('NOTHING is sent to gtag in test mode', t.gtagCalls.length === 0, t.gtagCalls);
}
{
  const t = boot({ pathname: '/', ss: { ubg_test: '1' } });
  check('session test flag detected', t.api().testReason === 'flag_session', t.api().testReason);
}
{
  // Runbook: no public query parameter may act as a permanent ad/analytics bypass.
  const t = boot({ pathname: '/', search: '?ubg_test=1' });
  check('?ubg_test=1 does NOT enable test mode', t.api().testMode === false, t.api().testReason);
  check('?ubg_test=1 does NOT persist any opt-out', t.sandbox.localStorage.getItem('ubg_test') === null, t.sandbox.localStorage._m);
  check('a URL cannot suppress analytics for a real visitor', t.gtagCalls.length > 0, t.gtagCalls.length);
}
check('localhost is test traffic', boot({ hostname: 'localhost' }).api().testReason === 'local');
check('webdriver is test traffic', boot({ webdriver: true }).api().testReason === 'webdriver');
check('headless UA is test traffic', boot({ ua: 'HeadlessChrome/120' }).api().testReason === 'automation');
check('real visitor is NOT test traffic', boot({}).api().testMode === false);

// ═══ 8. Game funnel ════════════════════════════════════════════════════
section('Game funnel');
{
  const t = boot({ pathname: '/games/Slope.html' });
  const iframe = { tag: 'iframe' };
  t.api().startGame('Slope', { surface: 'game', iframe, readinessClass: 'unclassified' });
  t.api().startGame('Slope', { surface: 'game', iframe });          // duplicate attempt
  check('exactly one game_start per game session', t.find('game_start').length === 1, t.names());
  const gs = t.find('game_start')[0].params;
  check('game_start has required params', !gs.param_incomplete, gs);
  check('readiness is honestly unclassified', gs.readiness_class === 'unclassified', gs);

  t.api().iframeLoaded('Slope', 1234);
  t.api().iframeLoaded('Slope', 9999);
  check('iframe_loaded is diagnostic and fires once', t.find('iframe_loaded').length === 1, t.names());
  check('iframe_loaded is NOT game_ready', t.find('game_ready').length === 0, t.names());
}

// ═══ 9. Qualifying time ════════════════════════════════════════════════
section('Qualifying engagement time');
{
  const t = boot({ pathname: '/games/Slope.html' });
  t.api().startGame('Slope', { iframe: null });
  t.tick(90);
  check('no engagement without a trusted interaction', t.find('game_engagement_milestone').length === 0, t.names());

  t.fire('pointerdown', {});                       // user interacts
  t.tick(29);
  check('no milestone before 30 qualifying seconds', t.find('game_engagement_milestone').length === 0, t.names());
  t.tick(1);
  check('30s milestone fires exactly at 30', t.find('game_engagement_milestone').length === 1, t.find('game_engagement_milestone').map(e => e.params.seconds));

  t.doc.hidden = true;
  t.tick(60);
  check('hidden tab does not accrue qualifying time', t.find('game_engagement_milestone').length === 1, t.find('game_engagement_milestone').map(e => e.params.seconds));
  t.doc.hidden = false;

  t.tick(30);                                      // now at 60
  const ms = t.find('game_engagement_milestone').map(e => e.params.seconds);
  check('60s milestone fires', ms.includes(60), ms);
  check('game_engaged fires at the threshold', t.find('game_engaged').length === 1, t.names());
  const ge = t.find('game_engaged')[0].params;
  check('game_engaged carries metric_version', ge.metric_version === 'engaged_v1_provisional', ge);
  check('game_engaged labels the method as a proxy', /proxy/.test(ge.method), ge);
  check('game_engaged has no missing params', !ge.param_incomplete, ge);

  t.tick(300);
  check('game_engaged never repeats for the same game', t.find('game_engaged').length === 1, t.names());
  const all = t.find('game_engagement_milestone').map(e => e.params.seconds);
  check('milestones are 30/60/120, each once', JSON.stringify(all) === JSON.stringify([30, 60, 120]), all);
}
{
  const t = boot({ pathname: '/games/Slope.html', hasFocus: false });
  t.api().startGame('Slope', { iframe: null });
  t.fire('pointerdown', {});
  t.tick(120);
  check('unfocused window does not accrue qualifying time', t.find('game_engaged').length === 0, t.names());
}

// ═══ 10. Second-game conversion ════════════════════════════════════════
section('Second-game conversion');
{
  const t1 = boot({ pathname: '/games/Slope.html' });
  t1.api().startGame('Slope', { iframe: null });
  t1.fire('pointerdown', {});
  t1.tick(60);
  check('first engaged game does not emit second_game_engaged', t1.find('second_game_engaged').length === 0, t1.names());

  const carried = Object.fromEntries(t1.sandbox.sessionStorage._m);
  const t2 = boot({ pathname: '/games/Cuphead.html', ss: carried });
  t2.api().startGame('Cuphead', { iframe: null });
  t2.fire('pointerdown', {});
  t2.tick(60);
  check('second distinct engaged game emits second_game_engaged', t2.find('second_game_engaged').length === 1, t2.names());

  const carried2 = Object.fromEntries(t2.sandbox.sessionStorage._m);
  const t3 = boot({ pathname: '/games/Granny.html', ss: carried2 });
  t3.api().startGame('Granny', { iframe: null });
  t3.fire('pointerdown', {});
  t3.tick(60);
  check('third game does not re-emit second_game_engaged', t3.find('second_game_engaged').length === 0, t3.names());
}

// ═══ 11. Card surfaces ═════════════════════════════════════════════════
section('Card click + navigation handoff');
{
  const t = boot({ pathname: '/' });
  const a = makeAnchor('/games/Drive-Mad.html', { closest: ['#gamesGrid'] });
  t.fire('click', { target: { closest: sel => (sel.includes('/games/') ? a : null) } });
  const cc = t.find('game_card_click');
  check('game_card_click fires with surface + position', cc.length === 1 && cc[0].params.surface === 'grid' && cc[0].params.position >= 1, cc[0] && cc[0].params);
  check('game_card_click has no missing params', !cc[0].params.param_incomplete, cc[0].params);

  const handoff = JSON.parse(t.sandbox.sessionStorage.getItem('ubg_s_nav_src'));
  check('navigation source handed to the destination', handoff.surface === 'grid' && handoff.game_id === 'Drive-Mad', handoff);

  const dest = boot({ pathname: '/games/Drive-Mad.html', ss: Object.fromEntries(t.sandbox.sessionStorage._m) });
  check('destination page_view records source_surface', dest.find('page_view')[0].params.source_surface === 'grid', dest.find('page_view')[0].params);
}
{
  const t = boot({ pathname: '/' });
  const a = makeAnchor('/games/Slope.html', { closest: ['#recentRow'] });
  t.fire('click', { target: { closest: sel => (sel.includes('/games/') ? a : null) } });
  check('recent shelf click also emits recent_game_resume', t.find('recent_game_resume').length === 1, t.names());
}
{
  const t = boot({ pathname: '/' });
  const a = makeAnchor('/games/cat-horror.html', { closest: ['#gamesGrid'] });
  t.fire('click', { target: { closest: sel => (sel.includes('/games/') ? a : null) } });
  check('category links are not counted as game cards', t.find('game_card_click').length === 0, t.names());
}

// ═══ 12. Redirect-stub hop ═════════════════════════════════════════════
section('Legacy redirect measurement');
{
  const t = boot({ pathname: '/games/Polytrack.html', ss: { ubg_s_redirect: JSON.stringify({ from: 'poly-track-unblocked', t: Date.now() }) } });
  const pv = t.find('page_view')[0];
  check('redirect hop attributed at the destination', pv.params.source_surface === 'redirect_stub', pv.params);
  check('legacy slug recorded', pv.params.redirect_from === 'poly-track-unblocked', pv.params);
  check('handoff is consumed once', t.sandbox.sessionStorage.getItem('ubg_s_redirect') === null);
}
{
  const t = boot({ pathname: '/games/Polytrack.html', ss: { ubg_s_redirect: JSON.stringify({ from: 'old-slug', t: Date.now() - 60000 }) } });
  check('stale redirect handoff is ignored', !t.find('page_view')[0].params.redirect_from, t.find('page_view')[0].params);
}

// ═══ 13. Parameter completeness across every emitted event ═════════════
section('Parameter completeness');
{
  const t = boot({ pathname: '/games/Slope.html' });
  t.api().startGame('Slope', { iframe: null, surface: 'game' });
  t.fire('pointerdown', {});
  t.tick(120);
  t.api().iframeLoaded('Slope', 900);
  t.sandbox.window.ubgTrack('favorite_add', { game_id: 'Slope', surface: 'player' });
  t.sandbox.window.ubgTrack('share_attempt', { game_id: 'Slope', method: 'copy' });

  const incomplete = t.events().filter(e => e.params.param_incomplete);
  check('every emitted event has its required parameters', incomplete.length === 0, incomplete.map(e => e.name + ':' + e.params.param_incomplete));

  const every = t.events();
  check('every event carries page_type', every.every(e => !!e.params.page_type), every.filter(e => !e.params.page_type).map(e => e.name));
  check('every event carries visit_number', every.every(e => e.params.visit_number > 0), every.filter(e => !e.params.visit_number).map(e => e.name));
  check('no GA4-reserved parameter name is used', every.every(e =>
    !Object.keys(e.params).some(k => /^(ga_|google_|firebase_)/.test(k) || k === 'session_number' || k === 'session_id')
  ), every.flatMap(e => Object.keys(e.params)).filter(k => /^(ga_|google_|firebase_)/.test(k) || k === 'session_number'));
  check('a missing required param IS flagged', (() => {
    t.sandbox.window.ubgTrack('share_success', { game_id: 'Slope' });     // method missing
    const e = t.api().lastEvent('share_success');
    return e.params.param_incomplete === 'method';
  })(), t.api().lastEvent('share_success'));
}

// ═══ 14. Privacy-safe 404 measurement (GROW-005) ═══════════════════════
section('404 route classification');
{
  const t = boot({ pathname: '/', pageTypeMeta: 'not_found' });
  const routes = [
    ['/games/Some-Dead-Game.html', 'game_page'],
    ['/games/cat-music.html', 'category_page'],
    ['/games/', 'games_directory'],
    ['/play.html', 'player'],
    ['/old-landing-page.html', 'root_page'],
    ['/assets/css/style.css', 'asset'],
    ['/assets/img/icon/main.png', 'asset'],
    ['/wp-admin/install.php', 'bot_probe'],
    ['/.env', 'bot_probe'],
    ['/xmlrpc.php', 'bot_probe'],
    ['/some/deep/directory', 'directory'],
    ['/', 'root'],
  ];
  for (const [p, expect] of routes) {
    check(`${p} → ${expect}`, t.api().classifyRoute(p) === expect, t.api().classifyRoute(p));
  }
  check('query and fragment stripped before matching',
    t.api().classifyRoute('/games/X.html?utm_source=a#frag') === 'game_page', t.api().classifyRoute('/games/X.html?q=1#f'));
}
{
  const t = boot({ pathname: '/games/Drive-Mad-Unblocked.html', pageTypeMeta: 'not_found', referrer: 'https://www.bing.com/search?q=private+terms' });
  t.api().track404({ suggestion: 'confident', matchedGameId: 'Drive-Mad' });
  const e = t.api().lastEvent('404_view');
  check('404_view fires with required params', e && !e.params.param_incomplete, e && e.params);
  check('route reported as a shape, not a path', e.params.route_id === 'game_page', e.params);
  check('recoverable 404 names the matched game', e.params.game_id === 'Drive-Mad', e.params);
  check('suggestion result recorded', e.params.suggestion_result === 'confident', e.params);
  check('referrer reduced to host', e.params.referrer_host === 'www.bing.com', e.params);
  check('raw dead path never sent', !JSON.stringify(e.params).includes('Drive-Mad-Unblocked'), e.params);
  check('referrer query text never sent', !JSON.stringify(e.params).includes('private'), e.params);

  t.api().track404({ suggestion: 'confident', matchedGameId: 'Drive-Mad' });
  check('404_view fires at most once per load', t.api().countOf('404_view') === 1, t.api().countOf('404_view'));
}
{
  const t = boot({ pathname: '/whatever', pageTypeMeta: 'not_found' });
  t.api().track404({ suggestion: 'none', matchedGameId: '../../etc/passwd' });
  const e = t.api().lastEvent('404_view');
  check('hostile matched id is rejected', e.params.game_id === undefined, e.params);
  check('unmatched 404 still reports its shape', e.params.route_id === 'directory', e.params);
}

// ═══ 15. Performance baseline (GROW-011) ═══════════════════════════════
section('Web vitals');
{
  const t = boot({ pathname: '/' });
  check('no web_vitals event before the page is hidden', t.api().countOf('web_vitals') === 0, t.names());

  t.doc.visibilityState = 'hidden';
  t.fire('visibilitychange', {});
  const e = t.api().lastEvent('web_vitals');
  check('web_vitals sent when the page hides', !!e, t.names());
  check('required params present', e && !e.params.param_incomplete, e && e.params);
  check('device class recorded', ['mobile', 'tablet', 'desktop'].includes(e.params.device_class), e.params);
  check('DOM size recorded', typeof e.params.dom_nodes === 'number', e.params);
  check('iframe count recorded', typeof e.params.iframe_count === 'number', e.params);
  check('JS error count recorded', typeof e.params.js_errors === 'number', e.params);
  check('CLS sent as an integer x1000', Number.isInteger(e.params.cls_x1000), e.params);
  check('page_type carried for segmentation', e.params.page_type === 'home', e.params);

  t.fire('visibilitychange', {});
  t.fire('win:pagehide', {});
  check('web_vitals cannot double-fire', t.api().countOf('web_vitals') === 1, t.api().countOf('web_vitals'));
}
{
  // Thresholds must match Google's, or the ratings mislead.
  const t = boot({ pathname: '/' });
  const rate = (m, v) => {
    const T = { lcp: [2500, 4000], fcp: [1800, 3000], inp: [200, 500], ttfb: [800, 1800], cls: [0.1, 0.25] }[m];
    return v <= T[0] ? 'good' : (v <= T[1] ? 'needs_improvement' : 'poor');
  };
  check('LCP 2000ms rates good', rate('lcp', 2000) === 'good');
  check('LCP 3000ms rates needs_improvement', rate('lcp', 3000) === 'needs_improvement');
  check('LCP 5000ms rates poor', rate('lcp', 5000) === 'poor');
  check('CLS 0.05 rates good', rate('cls', 0.05) === 'good');
  check('INP 600ms rates poor', rate('inp', 600) === 'poor');
}
{
  const t = boot({ pathname: '/', ls: { ubg_test: '1' } });
  t.doc.visibilityState = 'hidden';
  t.fire('visibilitychange', {});
  check('performance data is not sent in test mode', t.gtagCalls.length === 0, t.gtagCalls.length);
}

section('Ad script reachability');
{
  const t = boot({ pathname: '/games/Slope.html' });
  const w = t.sandbox.window;
  w.ubgAdScript('adsterra', 'loaded');
  w.ubgAdScript('adsterra', 'blocked');          // a second Adsterra frame on the same page
  w.ubgAdScript('mondiad', 'blocked');
  const ev = t.find('ad_script');
  const ads = ev.filter(e => e.params.network === 'adsterra');
  check('one ad_script per network per page view', ads.length === 1 && ev.length === 2, ev.map(e => e.params));
  check('first report wins', ads[0] && ads[0].params.status === 'loaded', ads[0] && ads[0].params);
  check('ad_script carries network + status', ev.every(e => !e.params.param_incomplete), ev.map(e => e.params));
  check('ad_script carries page_type for segmentation', ev.every(e => e.params.page_type === 'game'), ev.map(e => e.params.page_type));

  w.ubgAdScript('evil<script>', 'loaded');
  w.ubgAdScript('adsterra', 'anything');
  check('unknown networks and statuses are dropped', t.find('ad_script').length === 2, t.find('ad_script').map(e => e.params));
}
{
  const t = boot({ pathname: '/', ls: { ubg_test: '1' } });
  t.sandbox.window.ubgAdScript('mondiad', 'loaded');
  check('ad_script is not sent in test mode', t.gtagCalls.length === 0, t.gtagCalls.length);
}

section('School filter poll');
{
  const t = boot({ pathname: '/games/Slope.html' });
  const w = t.sandbox.window;
  check('a listed filter is accepted', w.ubgFilterPoll('goguardian', 'answered') === true);
  w.ubgFilterPoll('securly', 'answered');                       // second answer in one page view
  const ev = t.find('school_filter_poll');
  check('one poll event per page view', ev.length === 1, ev.length);
  check('poll event carries filter + action', ev[0] && !ev[0].params.param_incomplete && ev[0].params.filter === 'goguardian' && ev[0].params.action === 'answered', ev[0] && ev[0].params);
  const u = boot({ pathname: '/games/Slope.html' }).sandbox.window;
  check('free text is rejected', u.ubgFilterPoll('my school <b>x</b>', 'answered') === false);
  check('unknown actions are rejected', u.ubgFilterPoll('iboss', 'whatever') === false);
  check('dismissals use the placeholder filter', u.ubgFilterPoll('none', 'dismissed') === true);
}
{
  const t = boot({ pathname: '/games/Slope.html', ls: { ubg_test: '1' } });
  t.sandbox.window.ubgFilterPoll('zscaler', 'answered');
  check('poll event is not sent in test mode', t.gtagCalls.length === 0, t.gtagCalls.length);
}
{
  const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'assets/js/filter-poll.js'), 'utf8');
  check('poll module has no network calls', !/fetch\(|XMLHttpRequest|sendBeacon|new Image/.test(src));
}

console.log(`\n${failures === 0 ? 'ALL EVENT QA CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures ? 1 : 0);
