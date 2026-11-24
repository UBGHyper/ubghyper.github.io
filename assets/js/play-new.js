// ── Constants (reuse from utils.js) ───────────────────────────
// IMG_BASE, PT_KEY, FAV_KEY, RATING_KEY, cap, fmtTime, favSet, saveFavs defined by utils.js

const params  = new URLSearchParams(location.search);
// Baked /games/ pages set window.gameUrl inline before this script; play.html relies on ?game=
window.gameUrl = params.get('game') || window.gameUrl || null;
window.currentGame = null;

const ORIG_TITLE = document.title || 'Play Game - UBGHyper';
if (window.initCamo) window.initCamo(ORIG_TITLE);

function setPageTitle(t) {
  if (!localStorage.getItem('ubg_camo')) document.title = t;
}

// ── Timers ────────────────────────────────────────────────────
const tabStart = Date.now();
let activeTime = 0;
let activeSegStart = document.visibilityState === 'visible' ? Date.now() : null;

function getActiveSecs() {
  return activeSegStart !== null
    ? activeTime + Math.floor((Date.now() - activeSegStart) / 1000)
    : activeTime;
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (activeSegStart !== null) { activeTime += Math.floor((Date.now() - activeSegStart) / 1000); activeSegStart = null; }
    flushPlaytime();
  } else {
    activeSegStart = Date.now();
  }
});

setInterval(() => {
  const at = document.getElementById('plyActiveTime');
  const ot = document.getElementById('plyOpenTime');
  if (at) at.textContent = fmtTime(getActiveSecs());
  if (ot) ot.textContent = fmtTime(Math.floor((Date.now() - tabStart) / 1000));
}, 1000);

// ── Playtime tracking ─────────────────────────────────────────
let ptSaved = 0;

function flushPlaytime() {
  if (!window.gameUrl) return;
  const elapsed = getActiveSecs();
  const delta = elapsed - ptSaved;
  if (delta <= 0) return;
  const store = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
  const today = new Date().toISOString().slice(0, 10);
  if (!store[window.gameUrl]) store[window.gameUrl] = {};
  store[window.gameUrl][today] = (store[window.gameUrl][today] || 0) + delta;
  localStorage.setItem(PT_KEY, JSON.stringify(store));
  ptSaved = elapsed;
}

setInterval(flushPlaytime, 30000);
window.addEventListener('beforeunload', flushPlaytime);
window.addEventListener('pagehide', flushPlaytime);

// ── Playtime formatting ───────────────────────────────────────
function fmtPlaytime(s) {
  const m = Math.round(s / 60);
  if (m < 60) return m + 'm';
  const h = Math.floor(m / 60), rm = m % 60;
  return rm ? `${h}h ${rm}m` : `${h}h`;
}

// ── Playtime viz (zero-dependency, theme-aware via CSS vars) ──
// Replaces the old Chart.js bar chart: no 80KB CDN fetch, instant render,
// live-updating today bar, streak / best-day / trend stats.

function isoOf(d) { return d.toISOString().slice(0, 10); }

function computePtStats(gameData) {
  const today = new Date();
  const total = Object.values(gameData).reduce((a, b) => a + b, 0);

  // 14-day series
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const iso = isoOf(d);
    days.push({ d, iso, secs: gameData[iso] || 0, isToday: i === 0 });
  }

  // Streak: consecutive played days ending today (or yesterday if today untouched)
  let streak = 0;
  for (let i = 0; ; i++) {
    const iso = isoOf(new Date(Date.now() - i * 86400000));
    if ((gameData[iso] || 0) > 0) streak++;
    else if (i === 0) continue;        // today empty doesn't break a streak yet
    else break;
  }

  // Best day (all-time)
  let best = { iso: null, secs: 0 };
  for (const [iso, secs] of Object.entries(gameData)) {
    if (secs > best.secs) best = { iso, secs };
  }

  // Trend: this 7 days vs previous 7
  const last7  = days.slice(7).reduce((a, x) => a + x.secs, 0);
  const prev7  = days.slice(0, 7).reduce((a, x) => a + x.secs, 0);
  const trend  = prev7 > 0 ? Math.round((last7 - prev7) / prev7 * 100) : (last7 > 0 ? null : 0);

  const activeDays = Object.values(gameData).filter(s => s > 0).length;
  return { total, days, streak, best, last7, prev7, trend, activeDays, today };
}

function renderPlaytimeViz() {
  if (!window.gameUrl) return;
  flushPlaytime(); // so the today bar includes the current session
  const store = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
  const gameData = store[window.gameUrl] || {};

  const section = document.getElementById('plyChartSection');
  if (!section) return;
  const s = computePtStats(gameData);

  section.style.display = '';
  if (s.total === 0) {
    section.innerHTML = `
      <div class="ply-pt-head"><p class="ply-pt-title">Your playtime</p></div>
      <p class="ply-pt-empty">This is your first session. Time starts counting as you play.</p>`;
    return;
  }

  // Stat chips — capped at three. Five chips wrapped to three rows in a narrow
  // card, and "avg/session-day" was jargon nobody asked for.
  const chips = [];
  chips.push(`<span class="ply-pt-chip"><strong>${fmtPlaytime(s.total)}</strong> total</span>`);
  if (s.streak > 1) {
    chips.push(`<span class="ply-pt-chip ply-pt-chip-hot"><strong>${s.streak}</strong> days in a row</span>`);
  } else if (s.best.secs > 0 && s.activeDays > 1) {
    const bd = new Date(s.best.iso + 'T12:00:00');
    chips.push(`<span class="ply-pt-chip"><strong>${fmtPlaytime(s.best.secs)}</strong> best day (${bd.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})</span>`);
  }
  if (s.trend !== null && s.trend !== 0 && s.prev7 > 0) {
    const up = s.trend > 0;
    chips.push(`<span class="ply-pt-chip ${up ? 'ply-pt-chip-up' : 'ply-pt-chip-down'}">${up ? '▲' : '▼'} ${Math.abs(s.trend)}% vs last week</span>`);
  }

  // Bars. The old 6% floor made a 30-second day and a 3-minute day identical;
  // 2% is enough to stay visible without flattening the scale.
  const maxSecs = Math.max(...s.days.map(x => x.secs), 60);
  const barsHtml = s.days.map(x => {
    const pct = x.secs > 0 ? Math.max(2, Math.round(x.secs / maxSecs * 100)) : 0;
    // Today used to render '·' instead of its weekday letter, so the axis read
    // "S M T W T F S S M T W T F ·". Give every day its real initial.
    const lab = 'SMTWTFS'[x.d.getDay()];
    const nice = x.d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const mins = x.secs > 0 ? fmtPlaytime(x.secs) : 'No play';
    return `<div class="ply-pt-col${x.isToday ? ' today' : ''}" data-tip="${nice} · ${mins}">
      <div class="ply-pt-bar-track"><div class="ply-pt-bar" style="height:${pct}%"></div></div>
      <span class="ply-pt-lab">${lab}</span>
    </div>`;
  }).join('');

  // Real dates in the header: 14 bare weekday initials gave no anchor for
  // *which* fortnight you were looking at.
  const dFmt = { month: 'short', day: 'numeric' };
  const range = `${s.days[0].d.toLocaleDateString(undefined, dFmt)} – ${s.days[13].d.toLocaleDateString(undefined, dFmt)}`;

  section.innerHTML = `
    <div class="ply-pt-head">
      <p class="ply-pt-title">Your playtime</p>
      <span class="ply-pt-range">${range}</span>
    </div>
    <div class="ply-pt-chips">${chips.join('')}</div>
    <div class="ply-pt-chart" role="img" aria-label="Daily playtime, ${range}">${barsHtml}<div class="ply-pt-tip" id="plyPtTip" hidden></div></div>`;

  // Tooltip. It now lives inside .ply-pt-chart so it positions against the
  // chart itself; as a sibling it was offset from .ply-pt via a magic -30px
  // and landed over the stat chips.
  const chart = section.querySelector('.ply-pt-chart');
  const tip = chart.querySelector('#plyPtTip');
  chart.addEventListener('mousemove', e => {
    const col = e.target.closest('.ply-pt-col');
    if (!col) { tip.hidden = true; return; }
    tip.textContent = col.dataset.tip;
    tip.hidden = false;
    const cr = chart.getBoundingClientRect(), bb = col.getBoundingClientRect();
    const half = tip.offsetWidth / 2 + 2;
    tip.style.left = Math.min(Math.max(bb.left - cr.left + bb.width / 2, half), cr.width - half) + 'px';
    tip.style.top = Math.max(0, bb.top - cr.top - tip.offsetHeight - 4) + 'px';
  });
  chart.addEventListener('mouseleave', () => { tip.hidden = true; });
}

// Keep the today bar live while playing
setInterval(() => {
  if (document.hidden) return;
  if (document.querySelector('.ply-pt-chart')) renderPlaytimeViz();
}, 60000);

// ── Favourites in info card ───────────────────────────────────
function updateFavBtn(on) {
  const btn = document.getElementById('plyFavBtn');
  if (!btn) return;
  btn.classList.toggle('fav-on', on);
  btn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-heart-${on ? 'solid' : 'outline'}"/></svg> ${on ? 'Saved' : 'Favourite'}`;
  btn.title = on ? 'Remove from favourites' : 'Add to favourites';
}

// ── Render info card (skeleton → real) ────────────────────────

// ── Star ratings ──────────────────────────────────────────────
// Shared aggregate over the Firestore REST API, no SDK. The document shape is
// fixed by ratings.js and gen-ratings.js: ratings/{slug} with integer sum and
// count, updated by field-increment transforms.
const RATE_FS = 'https://firestore.googleapis.com/v1/projects';
let _rateCfg = null;

function rateTestMode() {
  // Never write to the live property from an automated or opted-out session.
  try { return localStorage.ubg_test === '1' || sessionStorage.ubg_test === '1' || navigator.webdriver; }
  catch (e) { return false; }
}

function rateCfg() {
  if (_rateCfg) return _rateCfg;
  _rateCfg = fetch('/assets/firebase-config.json')
    .then(r => r.json())
    .then(c => (c && c.projectId && c.projectId.indexOf('YOUR_') !== 0) ? c : null)
    .catch(() => null);
  return _rateCfg;
}
const rateNum = v => !v ? 0 : parseFloat(v.integerValue != null ? v.integerValue : v.doubleValue || 0) || 0;

function rateRead(cfg, slug) {
  return fetch(`${RATE_FS}/${cfg.projectId}/databases/(default)/documents/ratings/${encodeURIComponent(slug)}?key=${cfg.apiKey}`)
    .then(r => r.ok ? r.json() : null)
    .then(d => (d && d.fields) ? { sum: rateNum(d.fields.sum), count: rateNum(d.fields.count) } : { sum: 0, count: 0 })
    .catch(() => null);
}

// Always count +1 with sum +1..+5, because firestore.rules requires exactly that
// shape: `count == resource.data.count + 1`. An earlier version sent count +0 to
// let a player change their vote, which the rules would have rejected outright.
// Vote changes are therefore handled client-side instead, without a second write.
function rateWrite(cfg, slug, stars) {
  return fetch(`${RATE_FS}/${cfg.projectId}/databases/(default)/documents:commit?key=${cfg.apiKey}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes: [{ transform: {
      document: `projects/${cfg.projectId}/databases/(default)/documents/ratings/${slug}`,
      fieldTransforms: [
        { fieldPath: 'sum',   increment: { integerValue: String(stars) } },
        { fieldPath: 'count', increment: { integerValue: '1' } },
      ] } }] }),
  }).then(r => r.ok).catch(() => false);
}

function renderStars(card, g) {
  const btns = [...card.querySelectorAll('.ply-star-btn')];
  const agg  = card.querySelector('#plyRateAgg');
  const paint = n => btns.forEach(b => b.classList.toggle('active', +b.dataset.star <= n));
  const mine  = () => (JSON.parse(localStorage.getItem(RATING_KEY) || '{}'))[g.url] || 0;
  const show  = t => { if (agg) agg.textContent = t; };

  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const n = +btn.dataset.star;
      btns.forEach(b => b.classList.toggle('hover', +b.dataset.star <= n));
    });
    btn.addEventListener('mouseleave', () => btns.forEach(b => b.classList.remove('hover')));
  });

  const showAgg = r => {
    if (!r) return show('');
    if (r.count > 0) show(`${(r.sum / r.count).toFixed(1)} out of 5, from ${r.count} ${r.count === 1 ? 'player' : 'players'}`);
    else show('No ratings yet. Yours would be the first.');
  };

  paint(mine());
  if (!rateTestMode()) rateCfg().then(cfg => {
    if (!cfg) return;
    rateRead(cfg, g.url).then(r => {
      if (!r) return;
      // A returning voter should see their own vote reflected, not just the crowd.
      if (mine() && r.count > 0)
        show(`You rated this ${mine()} out of 5. Average ${(r.sum / r.count).toFixed(1)} from ${r.count} ${r.count === 1 ? 'player' : 'players'}`);
      else if (mine()) show(`You rated this ${mine()} out of 5`);
      else showAgg(r);
    });
  });

  btns.forEach(btn => btn.addEventListener('click', () => {
    const n = +btn.dataset.star, prev = mine();

    // One vote per browser. The rules allow only count+1 per write, so there is
    // no honest way to revise a vote without inflating the total — say so
    // plainly rather than accept a click that will not be counted.
    if (prev) { paint(prev); show(`You rated this ${prev} out of 5`); return; }

    const store = JSON.parse(localStorage.getItem(RATING_KEY) || '{}');
    store[g.url] = n;
    localStorage.setItem(RATING_KEY, JSON.stringify(store));
    paint(n);
    // Immediate acknowledgement. The old widget gave none, so a click that had
    // in fact been recorded still felt like nothing happened.
    show(`Thanks, ${n} out of 5 recorded`);
    if (typeof window.ubgTrack === 'function') window.ubgTrack('rate_game', { slug: g.url, stars: n });
    if (rateTestMode()) return;
    rateCfg().then(cfg => {
      if (!cfg) return;
      rateWrite(cfg, g.url, n).then(ok => {
        if (ok) rateRead(cfg, g.url).then(showAgg);
        else show(`Saved on this device. We could not reach the ratings server.`);
      });
    });
  }));
}

function renderInfo(g) {
  const card = document.getElementById('plyAboutCard');
  if (!card) return;

  const isFav = favSet.has(g.url);
  const myRating = (JSON.parse(localStorage.getItem(RATING_KEY) || '{}'))[g.url] || 0;
  const tags = (g.tags || []).map(t =>
    `<a href="/games/cat-${encodeURIComponent(t)}.html" class="ply-about-tag">${cap(t)}</a>`
  ).join('');
  const stars = [1,2,3,4,5].map(n =>
    `<button class="ply-star-btn${n <= myRating ? ' active' : ''}" data-star="${n}" aria-label="Rate ${n} star${n !== 1 ? 's' : ''}">★</button>`
  ).join('');

  // On a baked /games/ page the long-form copy is already below the player, so
  // linking to /games/{slug}.html pointed at the page you were already on: the
  // click reloaded the tab and restarted the game. Scroll to it instead, and
  // only fall back to the cross-page link on play.html, where it's a real hop.
  const seoBlock = document.querySelector('.gp-seo');
  if (seoBlock && !seoBlock.id) seoBlock.id = 'gp-tips';
  const infoLink = seoBlock
    ? `<a href="#${seoBlock.id}" class="ply-info-link" id="plyInfoLink">
         Tips &amp; FAQ
         <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"/></svg>
       </a>`
    : `<a href="/games/${encodeURIComponent(g.url)}.html" class="ply-info-link">
         More info &amp; tips
         <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"/></svg>
       </a>`;

  card.innerHTML = `
    <p class="ply-about-title" id="plyGameTitle">${g.name}</p>
    ${g.credits ? `<p class="ply-about-author">${g.credits}</p>` : ''}
    ${tags ? `<div class="ply-about-tags">${tags}</div>` : ''}
    ${g.gamedesc ? `<p class="ply-about-desc" id="plyDesc">${g.gamedesc}</p>` : ''}
    <p class="ply-rate-label">Rate this game</p>
    <div class="ply-star-row" aria-label="Rate this game">${stars}</div>
    <p class="ply-rate-agg" id="plyRateAgg" aria-live="polite"></p>
    ${infoLink}
    <div class="ply-pt" id="plyChartSection" style="display:none"></div>`;

  // Smooth-scroll the in-page variant; the hash alone would jump the player
  // out of view with no transition.
  const inPage = document.getElementById('plyInfoLink');
  if (inPage && seoBlock) {
    inPage.addEventListener('click', e => {
      e.preventDefault();
      seoBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Stars.
  //
  // These used to fill in, write to localStorage and stop there, which is why
  // they read as doing nothing: no confirmation, and no sign anyone else had
  // ever rated the game. They now read and write the shared Firestore
  // aggregate, using the same ratings/{slug} document with sum+count increments
  // that ratings.js and gen-ratings.js already use, so the baked
  // AggregateRating stays consistent. ratings.js itself is bound to the old
  // play.html selectors and would fight this UI, hence the direct call.
  renderStars(card, g);

  updateFavBtn(isFav);

  // Playtime viz (zero-dependency — render whenever any playtime exists)
  const _ptStore = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
  const _hasPt = Object.values(_ptStore[window.gameUrl] || {}).reduce((a, b) => a + b, 0) > 0;
  if (_hasPt) renderPlaytimeViz();
}

// ── Recommendations ───────────────────────────────────────────
function renderRecs(games) {
  const card = document.getElementById('plyRecCard');
  const list = document.getElementById('plyRecList');
  if (!card || !list) return;
  card.style.display = '';
  list.innerHTML = games.map(g => `
    <a href="/games/${encodeURIComponent(g.url)}.html" class="ply-rec-item">
      <img class="ply-rec-thumb" src="${gameThumb(g)}" alt="${g.name}" width="44" height="44" loading="lazy" onerror="this.style.display='none'">
      <div class="ply-rec-info">
        <p class="ply-rec-name">${g.name}</p>
        <p class="ply-rec-tag">${g.tags?.[0] ? cap(g.tags[0]) : ''}</p>
      </div>
    </a>`).join('');
}

// ── Loading overlay ───────────────────────────────────────────
function dismissLoading() {
  const overlay = document.getElementById('plyLoading');
  if (!overlay) return;
  overlay.classList.add('ply-loading-hide');
  setTimeout(() => { overlay.remove(); document.getElementById('plyIframe')?.focus(); }, 500);
}

// ── Init ──────────────────────────────────────────────────────
async function initPlay() {
  if (!window.gameUrl) { location.href = '/'; return; }

  let allGames;
  try {
    const cached = sessionStorage.getItem('ubg_gamesData');
    if (cached) {
      allGames = JSON.parse(cached);
    } else {
      const res = await fetch('/assets/games.json');
      allGames = await res.json();
      sessionStorage.setItem('ubg_gamesData', JSON.stringify(allGames));
    }
    window.currentGame = allGames.find(g => g.url === window.gameUrl);
  } catch (e) {
    console.error(e);
    dismissLoading();
    return;
  }

  if (!window.currentGame) {
    dismissLoading();
    const card = document.getElementById('plyAboutCard');
    if (card) card.innerHTML = `<p style="color:var(--muted);font-size:.85rem">Game not found. <a href="/" style="color:var(--accent)">Browse games</a></p>`;
    return;
  }

  const g = window.currentGame;

  // Title
  setPageTitle(`${g.name} Unblocked - UBGHyper`);
  const crumb = document.getElementById('plyCrumbGame');
  if (crumb) crumb.textContent = g.name;

  // Ctrl bar title + tag
  const ctrlTitle = document.getElementById('plyCtrlTitle');
  const ctrlTag   = document.getElementById('plyCtrlTag');
  if (ctrlTitle) ctrlTitle.textContent = g.name;
  if (ctrlTag && g.tags?.[0]) { ctrlTag.textContent = cap(g.tags[0]); ctrlTag.style.display = ''; }

  // Buggy banner
  if (g.status === 'buggy') {
    const banner = document.getElementById('plyBuggyBanner');
    if (banner) banner.hidden = false;
    const note = document.getElementById('plyBuggyText');
    if (note && g.statusnote) note.textContent = g.statusnote;
  }

  // Loading: show name + blurred bg
  const loadName = document.getElementById('plyLoadName');
  if (loadName) loadName.textContent = g.name;
  const loadBg = document.getElementById('plyLoadBg');
  if (loadBg) {
    loadBg.style.backgroundImage = `url(${gameThumb(g)})`;
    // Short delay so image has a moment to fetch
    setTimeout(() => loadBg.classList.add('loaded'), 300);
  }

  // Add to recent
  const rec = JSON.parse(localStorage.getItem('ubg_recent') || '[]');
  localStorage.setItem('ubg_recent', JSON.stringify([g.url, ...rec.filter(x => x !== g.url)].slice(0, 50)));

  // Load iframe
  const iframe = document.getElementById('plyIframe');
  let loadPending = false;

  // Funnel: game_start → iframe_loaded / game_load_timeout. iframe `load` is a
  // DIAGNOSTIC only — it fires when the outer frame document loads, which proves
  // nothing about whether the game itself is playable. Trusted readiness needs
  // the capability inventory (GROW-004); until then engagement is a labelled proxy.
  const loadStart = Date.now();
  let loadReported = false;
  window.ubgAnalytics?.startGame(window.gameUrl, {
    surface: window.ubgAnalytics.pageType,
    iframe,
    readinessClass: 'unclassified'
  });

  iframe.addEventListener('load', () => {
    if (!loadReported) {
      loadReported = true;
      window.ubgAnalytics?.iframeLoaded(window.gameUrl, Date.now() - loadStart);
    }
    if (!loadPending) return;
    loadPending = false;
    dismissLoading();
  });
  const hintTimer = setTimeout(() => { const h = document.getElementById('plyLoadHint'); if (h) h.hidden = false; }, 10000);
  setTimeout(() => {
    clearTimeout(hintTimer);
    if (!loadReported) {
      loadReported = true;
      window.ubgAnalytics?.loadTimeout(window.gameUrl, Date.now() - loadStart);
    }
    dismissLoading();
  }, 30000);
  loadPending = true;
  // Games with an `embed` field (e.g. GameMonetize) load from the partner's
  // host — their in-game ads pay our publisher account. Everything else is
  // self-hosted on the GameList shards.
  iframe.src = gamePlayUrl(g);

  // Sidebar info
  renderInfo(g);

  // Recommendations
  const tagScore = {};
  (g.tags || []).forEach(t => { tagScore[t] = 1; });
  const recs = allGames
    .filter(r => r.url !== g.url && r.status !== 'broken')
    .map(r => ({ r, score: (r.tags || []).reduce((s, t) => s + (tagScore[t] || 0), 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || Math.random() - 0.5)
    .slice(0, 8).map(x => x.r);
  if (recs.length) renderRecs(recs);

  // Reveal details section
  const details = document.getElementById('plyDetails');
  if (details) {
    requestAnimationFrame(() => requestAnimationFrame(() => details.classList.add('visible')));
  }

  // SEO
  const canonTag = document.getElementById('canonicalTag');
  const canonUrl = `https://ubghyper.github.io/games/${encodeURIComponent(g.url)}.html`;
  if (canonTag) canonTag.href = canonUrl;
}

// ── Controls setup ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPlay();
  const iframe     = document.getElementById('plyIframe');
  const ctrlBar    = document.getElementById('plyCtrlBar');
  const layout     = document.getElementById('plyLayout');
  if (!iframe || !ctrlBar) return;

  // Fullscreen
  const fsBtn = document.getElementById('plyFullscreen');
  // iPhone Safari has no element fullscreen at all and iPad's is inconsistent, so
  // the old no-op fallback left a button that looked functional and did nothing.
  // Hide it where unsupported: focus mode already gives the same result in CSS.
  const canFs = !!(iframe.requestFullscreen || iframe.webkitRequestFullscreen);
  if (fsBtn && !canFs) fsBtn.hidden = true;
  if (fsBtn && canFs) {
    fsBtn.addEventListener('click', () => {
      (iframe.requestFullscreen || iframe.webkitRequestFullscreen).call(iframe);
    });
    const updateFs = () => {
      const inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      fsBtn.innerHTML = inFs
        ? '<svg class="icon" aria-hidden="true"><use href="#icon-compress"/></svg> Exit'
        : '<svg class="icon" aria-hidden="true"><use href="#icon-expand"/></svg> Fullscreen';
      fsBtn.title = inFs ? 'Exit fullscreen (F)' : 'Fullscreen (F)';
    };
    document.addEventListener('fullscreenchange', updateFs);
    document.addEventListener('webkitfullscreenchange', updateFs);
  }

  // Restart
  document.getElementById('plyRestart')?.addEventListener('click', () => {
    flushPlaytime();
    activeTime = 0; activeSegStart = document.visibilityState === 'visible' ? Date.now() : null; ptSaved = 0;
    iframe.src = iframe.src;
  });

  // Focus mode (hides details, auto-hides controls)
  let focusMode = localStorage.getItem('ubg_focus') === '1';
  let hideCtrlTimer = null;

  function applyFocus(on) {
    focusMode = on;
    layout?.classList.toggle('focus-mode', on);
    localStorage.setItem('ubg_focus', on ? '1' : '0');
    const btn = document.getElementById('plyFocusBtn');
    if (btn) {
      btn.classList.toggle('focus-on', on);
      btn.innerHTML = on
        ? '<svg class="icon" aria-hidden="true"><use href="#icon-theater-exit"/></svg>'
        : '<svg class="icon" aria-hidden="true"><use href="#icon-theater"/></svg>';
      btn.title = on ? 'Exit focus mode — show details again' : 'Focus mode — hide details panel';
    }
    if (on) scheduleCtrlHide(); else {
      clearTimeout(hideCtrlTimer);
      ctrlBar.classList.remove('fade-out');
    }
  }

  function scheduleCtrlHide() {
    clearTimeout(hideCtrlTimer);
    ctrlBar.classList.remove('fade-out');
    if (focusMode) hideCtrlTimer = setTimeout(() => ctrlBar.classList.add('fade-out'), 3000);
  }

  const frameWrap = document.querySelector('.ply-frame-wrap');
  frameWrap?.addEventListener('mousemove', scheduleCtrlHide);
  frameWrap?.addEventListener('touchstart', scheduleCtrlHide, { passive: true });

  document.getElementById('plyFocusBtn')?.addEventListener('click', () => applyFocus(!focusMode));
  if (focusMode) applyFocus(true);

  // Favourite — color change is the feedback (no pop animation)
  document.getElementById('plyFavBtn')?.addEventListener('click', () => {
    if (!window.gameUrl) return;
    const on = favSet.has(window.gameUrl);
    if (on) favSet.delete(window.gameUrl); else favSet.add(window.gameUrl);
    saveFavs();
    updateFavBtn(!on);
    window.ubgTrack?.(on ? 'favorite_remove' : 'favorite_add', {
      game_id: window.gameUrl, surface: 'player'
    });
  });

  // Share
  document.getElementById('plyShareBtn')?.addEventListener('click', () => {
    const url   = location.href;
    const title = window.currentGame ? `Play ${window.currentGame.name} unblocked on UBGHyper` : 'UBGHyper';
    const shareMethod = navigator.share ? 'web_share' : 'clipboard';
    window.ubgTrack?.('share_attempt', { game_id: window.gameUrl, method: shareMethod });
    if (navigator.share) {
      navigator.share({ title, url })
        .then(() => window.ubgTrack?.('share_success', { game_id: window.gameUrl, method: shareMethod }))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        window.ubgTrack?.('share_success', { game_id: window.gameUrl, method: shareMethod });
        const btn = document.getElementById('plyShareBtn');
        if (!btn) return;
        btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-check"/></svg> Copied!';
        setTimeout(() => { btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-share"/></svg> Share'; }, 2000);
      }).catch(() => {});
    }
  });

  // Pop-out
  document.getElementById('plyPopout')?.addEventListener('click', () => {
    if (!window.currentGame) return;
    window.open(gamePlayUrl(window.currentGame), '_blank');
  });

  // Buggy dismiss
  document.getElementById('plyBuggyDismiss')?.addEventListener('click', () => {
    document.getElementById('plyBuggyBanner').hidden = true;
  });

  // Shortcut popover
  document.getElementById('plyShortcutBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const pop = document.getElementById('plyShortcutPop');
    if (pop) pop.hidden = !pop.hidden;
  });
  document.addEventListener('click', () => {
    const pop = document.getElementById('plyShortcutPop');
    if (pop) pop.hidden = true;
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'f' || e.key === 'F') document.getElementById('plyFullscreen')?.click();
    if (e.key === 'r' || e.key === 'R') document.getElementById('plyRestart')?.click();
    if (e.key === 'Escape') { const p = document.getElementById('plyShortcutPop'); if (p) p.hidden = true; }
    if (window.gameUrl && [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
  });

  // Nav hamburger: owned by camo.js (initCamo, called above). A second toggle here flipped the
  // menu open and shut again on every tap, so it never opened on phones (2026-10-24).

  // (Playtime viz colors come from CSS variables — no theme re-render needed)
});
