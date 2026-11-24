// ── Play State ────────────────────────────────────────────────
const params  = new URLSearchParams(location.search);
if (!window.gameUrl) window.gameUrl = params.get('game');
window.currentGame = null;

// ── Camo ─────────────────────────────────────────────────────
const ORIG_PAGE_TITLE = 'Play Game - UBGHyper';
if (window.initCamo) window.initCamo(ORIG_PAGE_TITLE);

function setPageTitle(t) {
  if (!localStorage.getItem('ubg_camo')) document.title = t;
}

// ── Render Info ───────────────────────────────────────────────
function updateFavBtn(active) {
  const btn = document.getElementById('favBtn');
  if (!btn) return;
  btn.classList.toggle('fav-active', active);
  btn.innerHTML = active
    ? '<svg class="icon" aria-hidden="true"><use href="#icon-heart-solid"/></svg>'
    : '<svg class="icon" aria-hidden="true"><use href="#icon-heart-outline"/></svg>';
  btn.title = active ? 'Remove from favourites' : 'Favourite';
  btn.setAttribute('aria-label', btn.title);
}
window.updateFavBtn = updateFavBtn;

function renderInfo(g) {
  const isFav = favSet.has(g.url);
  const tags  = (g.tags || []).map(t =>
    `<a href="/?cat=${encodeURIComponent(t)}" class="tag tag-link">${cap(t)}</a>`
  ).join('');
  const ratings = JSON.parse(localStorage.getItem(RATING_KEY) || '{}');
  const myRating = ratings[g.url] || 0;
  const stars = [1,2,3,4,5].map(n =>
    `<button class="star-btn${n <= myRating ? ' active' : ''}" data-star="${n}" aria-label="Rate ${n} star${n !== 1 ? 's' : ''}">★</button>`
  ).join('');

  const infoCard = document.getElementById('gameInfoCard');
  if (!infoCard) return;

  infoCard.innerHTML = `
    <img class="sidebar-thumb" src="${gameThumb(g)}" alt="${g.name}" width="280" height="140" loading="lazy" onerror="this.style.display='none'">
    <p class="game-title">${g.name}</p>
    ${g.credits ? `<p class="game-author">${g.credits}</p>` : ''}
    ${tags ? `<div class="tags-row">${tags}</div>` : ''}
    ${g.gamedesc ? `<p class="game-desc" id="gameDesc">${g.gamedesc}</p><button class="desc-toggle" id="descToggle" hidden>Read more</button>` : ''}
    <p class="rate-label">Rate this game</p>
    <div class="star-row" aria-label="Rate this game">${stars}</div>
    <a href="/games/${encodeURIComponent(g.url)}.html" class="game-page-link">More info &amp; tips &#8250;</a>
  `;

  requestAnimationFrame(() => {
    const desc = document.getElementById('gameDesc');
    const toggle = document.getElementById('descToggle');
    if (desc && toggle && desc.scrollHeight > desc.clientHeight + 2) {
      toggle.hidden = false;
      toggle.addEventListener('click', () => {
        const expanded = desc.classList.toggle('expanded');
        toggle.textContent = expanded ? 'Show less' : 'Read more';
      });
    }
  });

  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const n = +btn.dataset.star;
      document.querySelectorAll('.star-btn').forEach(b => b.classList.toggle('hover', +b.dataset.star <= n));
    });
    btn.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('hover'));
    });
    btn.addEventListener('click', () => {
      const n = +btn.dataset.star;
      const store = JSON.parse(localStorage.getItem(RATING_KEY) || '{}');
      store[g.url] = n;
      localStorage.setItem(RATING_KEY, JSON.stringify(store));
      document.querySelectorAll('.star-btn').forEach(b =>
        b.classList.toggle('active', +b.dataset.star <= n));
    });
  });
  updateFavBtn(isFav);
}

function renderRecs(games) {
  const recCard = document.getElementById('recCard');
  const recList = document.getElementById('recList');
  if (!recCard || !recList) return;
  recCard.style.display = '';
  recList.innerHTML = games.map(g => `
    <a href="/games/${encodeURIComponent(g.url)}.html" class="rec-item">
      <img class="rec-thumb" src="${gameThumb(g)}" alt="${g.name}" width="42" height="42" loading="lazy" onerror="this.style.display='none'">
      <div class="rec-info">
        <p class="rec-name">${g.name}</p>
        <p class="rec-tag">${g.tags?.[0] ? cap(g.tags[0]) : ''}</p>
      </div>
    </a>`).join('');
}

// ── Timers ────────────────────────────────────────────────────
const tabStart     = Date.now();
let activeTime     = 0;
let activeSegStart = document.visibilityState === 'visible' ? Date.now() : null;

function getActiveSecs() {
  return activeSegStart !== null
    ? activeTime + Math.floor((Date.now() - activeSegStart) / 1000)
    : activeTime;
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (activeSegStart !== null) {
      activeTime    += Math.floor((Date.now() - activeSegStart) / 1000);
      activeSegStart = null;
    }
    flushPlaytime();
  } else {
    activeSegStart = Date.now();
  }
});

setInterval(() => {
  const atEl = document.getElementById('activeTime');
  const otEl = document.getElementById('openTime');
  if (atEl) atEl.textContent = fmtTime(getActiveSecs());
  if (otEl) otEl.textContent = fmtTime(Math.floor((Date.now() - tabStart) / 1000));
}, 1000);

// ── Playtime tracking ─────────────────────────────────────────
let ptSaved = 0;

function flushPlaytime() {
  if (!window.gameUrl) return;
  const elapsed = getActiveSecs();
  const delta   = elapsed - ptSaved;
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
window.addEventListener('pagehide',     flushPlaytime);

// ── Chart ─────────────────────────────────────────────────────
window.ptChart = null;

window.waitForChart = function() {
  if (typeof Chart !== 'undefined') return Promise.resolve();
  if (window._chartJsPromise) return window._chartJsPromise;
  window._chartJsPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return window._chartJsPromise;
};

window.renderChart = function() {
  if (!window.gameUrl) return;
  const store    = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
  const gameData = store[window.gameUrl] || {};
  const totalSecs = Object.values(gameData).reduce((a, b) => a + b, 0);

  const card = document.getElementById('chartCard');
  if (!card) return;
  if (totalSecs === 0) { card.style.display = 'none'; return; }
  card.style.display = '';

  const labels = [], values = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    labels.push(d.slice(5));
    values.push(Math.round((gameData[d] || 0) / 60 * 10) / 10);
  }

  const totalMins = Math.round(totalSecs / 60);
  const lbl = document.getElementById('totalPlaytimeLabel');
  if (lbl) {
    if (totalMins < 60) {
      lbl.innerHTML = `Total: <strong>${totalMins} min</strong>`;
    } else {
      const h = Math.floor(totalMins / 60), m = totalMins % 60;
      lbl.innerHTML = `Total: <strong>${h}h ${m}m</strong>`;
    }
  }

  const isDark  = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridCol = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  const tickCol = isDark ? '#666' : '#999';

  if (window.ptChart) window.ptChart.destroy();
  const canvas = document.getElementById('ptChart');
  if (!canvas) return;

  window.ptChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: '#f07220', borderRadius: 3, borderSkipped: false }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} min` } }
      },
      scales: {
        x: { grid: { color: gridCol }, ticks: { color: tickCol, font: { size: 10 }, maxRotation: 0 } },
        y: { beginAtZero: true, grid: { color: gridCol }, ticks: { color: tickCol, font: { size: 10 }, callback: v => v + 'm' } }
      }
    }
  });
};

// ── Setup Play Page ───────────────────────────────────────────
async function initPlay() {
  if (!window.gameUrl) {
    location.href = '/';
    return;
  }

  function dismissLoading() {
    const overlay = document.getElementById('gameLoading');
    if (!overlay) return;
    overlay.classList.add('game-loading-hide');
    setTimeout(() => {
      overlay.remove();
      document.getElementById('gameIframe')?.focus();
    }, 500);
  }

  try {
    let allGames;
    const cachedGames = sessionStorage.getItem('ubg_gamesData');
    if (cachedGames) {
      allGames = JSON.parse(cachedGames);
    } else {
      const res = await fetch('/assets/games.json');
      if (!res.ok) throw new Error('Network response was not ok');
      allGames = await res.json();
      sessionStorage.setItem('ubg_gamesData', JSON.stringify(allGames));
    }
    window.currentGame = allGames.find(g => g.url === window.gameUrl);

    if (!window.currentGame) {
      dismissLoading();
      document.getElementById('gameInfoCard').innerHTML =
        '<p style="color:var(--muted);font-size:.85rem">Game not found. <a href="/" style="color:var(--accent)">Browse games</a></p>';
      return;
    }

    // Title
    setPageTitle(window.currentGame.name + ' Unblocked - UBGHyper');
    const h1 = document.getElementById('pageH1');
    if (h1) h1.textContent = `${window.currentGame.name} Unblocked - UBGHyper`;

    // SEO meta tags — canonical points to the game's SEO page, not play.html
    const canonUrl = `https://ubghyper.github.io/games/${encodeURIComponent(window.gameUrl)}.html`;
    const gameImg  = `${gameThumb(window.currentGame)}`;
    const ogTitle  = `Play ${window.currentGame.name} Unblocked - UBGHyper`;
    const ogDesc   = window.currentGame.gamedesc || `Play ${window.currentGame.name} free and unblocked. No downloads needed.`;

    // Only update meta tags on play.html — /games/ pages have these baked in
    const canonTag = document.getElementById('canonicalTag');
    if (canonTag) {
      canonTag.href = canonUrl;
      document.querySelector('meta[name="description"]').content = ogDesc;
      document.querySelector('meta[property="og:title"]').content = ogTitle;
      document.querySelector('meta[property="og:description"]').content = ogDesc;
      document.querySelector('meta[property="og:url"]').content = canonUrl;
      document.querySelector('meta[property="og:image"]').content = gameImg;
      document.querySelector('meta[name="twitter:title"]').content = ogTitle;
      document.querySelector('meta[name="twitter:description"]').content = ogDesc;
      document.querySelector('meta[name="twitter:image"]').content = gameImg;
    }

    // Structured data
    const jsonLd = document.getElementById('gameJsonLd');
    if (jsonLd) jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: window.currentGame.name,
      description: ogDesc,
      url: canonUrl,
      genre: window.currentGame.tags || [],
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'UBGHyper', url: 'https://ubghyper.github.io/' }
    });

    // Add to recent
    const r = JSON.parse(localStorage.getItem('ubg_recent') || '[]');
    localStorage.setItem('ubg_recent', JSON.stringify(
      [window.gameUrl, ...r.filter(x => x !== window.gameUrl)].slice(0, 50)
    ));

    // Loading overlay — show game name, dismiss on iframe load
    const loadTitle = document.getElementById('loadingTitle');
    if (loadTitle) loadTitle.textContent = window.currentGame.name;

    const iframe = document.getElementById('gameIframe');
    let realLoadPending = false;
    iframe.addEventListener('load', () => {
      if (!realLoadPending) return;
      realLoadPending = false;
      dismissLoading();
    });
    const hintTimer = setTimeout(() => {
      const hint = document.getElementById('loadingHint');
      if (hint) hint.hidden = false;
    }, 10000);
    setTimeout(() => { clearTimeout(hintTimer); dismissLoading(); }, 30000);
    realLoadPending = true;
    iframe.src = gamePlayUrl(window.currentGame);

    // Buggy banner
    if (window.currentGame.status === 'buggy') {
      const banner = document.getElementById('buggyBanner');
      if (banner) banner.hidden = false;
    }

    // Sidebar
    const infoCard = document.getElementById('gameInfoCard');
    renderInfo(window.currentGame);
    if (infoCard && !infoCard.dataset.baked) {
      infoCard.classList.remove('info-loaded');
      void infoCard.offsetWidth;
      infoCard.classList.add('info-loaded');
    }
    // Only fetch chart.js if this game actually has playtime data — saves ~80KB for new visitors
    const _ptStore = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
    const _hasPt = Object.values(_ptStore[window.gameUrl] || {}).reduce((a, b) => a + b, 0) > 0;
    if (_hasPt) window.waitForChart().then(window.renderChart).catch(() => {});

    // Recommendations
    const tagScore = {};
    (window.currentGame.tags || []).forEach(t => tagScore[t] = 1);
    const recs = allGames
      .filter(g => g.url !== window.gameUrl && g.status !== 'broken')
      .map(g => ({ g, score: (g.tags || []).reduce((s, t) => s + (tagScore[t] || 0), 0) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score || Math.random() - 0.5)
      .slice(0, 5).map(x => x.g);
    if (recs.length) renderRecs(recs);

  } catch (e) {
    console.error(e);
    document.getElementById('gameLoading')?.classList.add('game-loading-hide');
  }
}

// ── Controls ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('gameIframe');
  if (!iframe) return;

  initPlay();

  // Fullscreen
  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    (iframe.requestFullscreen || iframe.webkitRequestFullscreen || (() => {})).call(iframe);
  });

  function updateFullscreenBtn() {
    const btn = document.getElementById('fullscreenBtn');
    if (!btn) return;
    const inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    btn.innerHTML = inFs
      ? '<svg class="icon" aria-hidden="true"><use href="#icon-compress"/></svg>'
      : '<svg class="icon" aria-hidden="true"><use href="#icon-expand"/></svg>';
    btn.title = inFs ? 'Exit fullscreen (F)' : 'Fullscreen (F)';
    btn.setAttribute('aria-label', btn.title);
  }
  document.addEventListener('fullscreenchange', updateFullscreenBtn);
  document.addEventListener('webkitfullscreenchange', updateFullscreenBtn);

  // Theater mode
  const playLayout    = document.querySelector('.play-layout');
  const frameControls = document.querySelector('.frame-controls');
  const gameFrameWrap = document.querySelector('.game-frame-wrap');
  let theaterMode     = localStorage.getItem('ubg_theater') === '1';
  let hideCtrlTimer   = null;

  function scheduleCtrlHide() {
    clearTimeout(hideCtrlTimer);
    frameControls.classList.remove('controls-fade');
    if (theaterMode) {
      hideCtrlTimer = setTimeout(() => frameControls.classList.add('controls-fade'), 3000);
    }
  }

  function applyTheater(on) {
    theaterMode = on;
    playLayout.classList.toggle('theater', on);
    localStorage.setItem('ubg_theater', on ? '1' : '0');
    const btn = document.getElementById('theaterBtn');
    btn.classList.toggle('theater-active', on);
    btn.innerHTML = on
      ? '<svg class="icon" aria-hidden="true"><use href="#icon-theater-exit"/></svg>'
      : '<svg class="icon" aria-hidden="true"><use href="#icon-theater"/></svg>';
    btn.title = on ? 'Exit theater' : 'Theater mode';
    btn.setAttribute('aria-label', btn.title);
    if (on) {
      scheduleCtrlHide();
    } else {
      clearTimeout(hideCtrlTimer);
      frameControls.classList.remove('controls-fade');
    }
  }

  gameFrameWrap.addEventListener('mousemove', scheduleCtrlHide);
  gameFrameWrap.addEventListener('touchstart', scheduleCtrlHide, { passive: true });
  document.getElementById('theaterBtn').addEventListener('click', () => applyTheater(!theaterMode));
  if (theaterMode) applyTheater(true);

  // Refresh — resets active-play timer so the session counter starts fresh
  document.getElementById('refreshBtn').addEventListener('click', () => {
    flushPlaytime();
    activeTime     = 0;
    activeSegStart = document.visibilityState === 'visible' ? Date.now() : null;
    ptSaved        = 0;
    iframe.src = iframe.src;
  });

  // Favourite
  document.getElementById('favBtn').addEventListener('click', () => {
    if (!window.gameUrl) return;
    const isFav = favSet.has(window.gameUrl);
    if (isFav) favSet.delete(window.gameUrl);
    else favSet.add(window.gameUrl);
    saveFavs();
    updateFavBtn(!isFav);
    const fb = document.getElementById('favBtn');
    fb.classList.remove('pop');
    void fb.offsetWidth;
    fb.classList.add('pop');
    fb.addEventListener('animationend', () => fb.classList.remove('pop'), { once: true });
  });

  // Share
  document.getElementById('shareBtn').addEventListener('click', () => {
    const url   = location.href;
    const title = window.currentGame
      ? `Play ${window.currentGame.name} unblocked on UBGHyper`
      : 'UBGHyper - Free Unblocked Games';
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('shareBtn');
        btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-check"/></svg>';
        btn.title = 'Copied!';
        setTimeout(() => {
          btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-share"/></svg>';
          btn.title = 'Share';
        }, 2000);
      }).catch(() => {});
    }
  });

  // Pop-out
  document.getElementById('popoutBtn').addEventListener('click', () => {
    if (!window.currentGame) return;
    window.open(gamePlayUrl(window.currentGame), '_blank');
  });

  // Shortcut popover
  document.getElementById('shortcutBtn').addEventListener('click', e => {
    e.stopPropagation();
    const pop = document.getElementById('shortcutPopover');
    pop.hidden = !pop.hidden;
  });
  document.addEventListener('click', () => {
    const pop = document.getElementById('shortcutPopover');
    if (pop) pop.hidden = true;
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'f' || e.key === 'F') document.getElementById('fullscreenBtn').click();
    if (e.key === 'r' || e.key === 'R') document.getElementById('refreshBtn').click();
    if (e.key === 'Escape') { const pop = document.getElementById('shortcutPopover'); if (pop) pop.hidden = true; }
    if (window.gameUrl && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'PageUp', 'PageDown'].includes(e.key)) {
      e.preventDefault();
    }
  });
});
