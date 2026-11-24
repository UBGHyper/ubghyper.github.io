// ── Shared State Hooks ──────────────────────────────────────
window.allGames = [];
window.filtered = [];
window.activeCategory = 'all';
window.activeSort = 'default';
window.activeSeries = null;
window.seriesMap = {};

// ── Build Categories ─────────────────────────────────────────
function buildCategories() {
  const cats = new Set();
  window.allGames.forEach(g => (g.tags || []).forEach(t => cats.add(t)));
  const sorted = [...cats].sort();
  const row = document.getElementById('filterRow');

  const hasNew = window.allGames.some(g => g.new);
  const buttons = [
    `<button class="cat-btn${window.activeCategory === 'all' ? ' active' : ''}" data-cat="all">All</button>`
  ];
  if (hasNew) {
    buttons.push(`<button class="cat-btn${window.activeCategory === 'new' ? ' active' : ''}" data-cat="new">New</button>`);
  }
  sorted.forEach(c => {
    buttons.push(
      `<button class="cat-btn${window.activeCategory === c ? ' active' : ''}" data-cat="${c}">${cap(c)}</button>`
    );
  });
  row.innerHTML = buttons.join('');

  row.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      row.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.activeCategory = btn.dataset.cat;
      window.activeSeries = null;
      document.querySelectorAll('.series-chip').forEach(b => b.classList.remove('active'));
      const st = document.getElementById('seriesToggle');
      if (st) st.classList.remove('active');
      if (window.updateURL) window.updateURL();
      if (window.applyFilter) window.applyFilter();
    });
  });
}

// ── Build Series Filter ───────────────────────────────────────
function buildSeriesFilter() {
  const PREFIX_RE = /^(.+?)[-]?\d+$/;
  const raw = {};
  window.allGames.forEach(g => {
    const m = g.url.match(PREFIX_RE);
    const base = m ? m[1] : g.url;
    if (!raw[base]) raw[base] = [];
    raw[base].push(g.url);
  });

  window.seriesMap = {};
  Object.entries(raw).forEach(([base, urls]) => {
    if (urls.length >= 2) window.seriesMap[base] = urls;
  });

  const entries = Object.entries(window.seriesMap).sort((a, b) => b[1].length - a[1].length);
  if (!entries.length) return;

  const filterRow = document.getElementById('filterRow');
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'cat-btn series-toggle-btn';
  toggleBtn.id = 'seriesToggle';
  toggleBtn.innerHTML = 'Series <svg class="series-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  filterRow.appendChild(toggleBtn);

  const btnsEl = document.getElementById('seriesBtns');
  entries.forEach(([base, urls]) => {
    const btn = document.createElement('button');
    btn.className = 'series-chip';
    btn.textContent = cap(base.replace(/-/g, ' '));
    btn.dataset.series = base;
    btn.addEventListener('click', () => {
      const isActive = window.activeSeries === base;
      window.activeSeries = isActive ? null : base;
      document.querySelectorAll('.series-chip').forEach(b => b.classList.remove('active'));
      toggleBtn.classList.toggle('active', !isActive);
      if (!isActive) btn.classList.add('active');
      if (window.applyFilter) window.applyFilter();
    });
    btnsEl.appendChild(btn);
  });

  toggleBtn.addEventListener('click', () => {
    const panel = document.getElementById('seriesPanel');
    const open = panel.style.display === '';
    panel.style.display = open ? 'none' : '';
    toggleBtn.setAttribute('aria-expanded', String(!open));
  });
}

// ── Render Recently Played ────────────────────────────────────
function renderRecent() {
  const recent = JSON.parse(localStorage.getItem('ubg_recent') || '[]');
  if (!recent.length) return;

  const games = recent.slice(0, 12).map(url => window.allGames.find(g => g.url === url)).filter(Boolean);
  if (!games.length) return;

  document.getElementById('recentRow').innerHTML = games.map((g, i) =>
    `<a href="/games/${encodeURIComponent(g.url)}.html" class="shelf-card${i === 0 ? ' shelf-resume' : ''}" title="${g.name}">
      <div class="shelf-thumb-wrap">
        <img class="shelf-thumb" src="${gameThumb(g)}" alt="${g.name}" width="80" height="80" loading="lazy" onerror="this.style.display='none'">
      </div>
      <p class="shelf-name">${g.name}</p>
    </a>`
  ).join('');

  document.getElementById('recentShelf').style.display = '';
  const shelvesEl = document.getElementById('shelves');
  shelvesEl.style.display = '';
  shelvesEl.classList.add('shelf-revealed');

  document.getElementById('recentClear').onclick = () => {
    localStorage.removeItem('ubg_recent');
    document.getElementById('shelves').style.display = 'none';
  };
}

// ── Render Recommended Section ────────────────────────────────
function renderRecsSection() {
  const recent = JSON.parse(localStorage.getItem('ubg_recent') || '[]');
  if (!recent.length) return;

  const recentSet = new Set(recent);
  const tagScore = {};
  recent.slice(0, 10).forEach(url => {
    const g = window.allGames.find(x => x.url === url);
    (g?.tags || []).forEach(t => { tagScore[t] = (tagScore[t] || 0) + 1; });
  });
  if (!Object.keys(tagScore).length) return;

  const candidates = window.allGames
    .filter(g => !recentSet.has(g.url) && g.status !== 'broken')
    .map(g => ({ g, score: (g.tags || []).reduce((s, t) => s + (tagScore[t] || 0), 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || Math.random() - 0.5)
    .slice(0, 12)
    .map(x => x.g);

  if (!candidates.length) return;

  document.getElementById('recRow').innerHTML = candidates.map(g =>
    `<a href="/games/${encodeURIComponent(g.url)}.html" class="shelf-card" title="${g.name}">
      <div class="shelf-thumb-wrap">
        <img class="shelf-thumb" src="${gameThumb(g)}" alt="${g.name}" width="80" height="80" loading="lazy" onerror="this.style.display='none'">
      </div>
      <p class="shelf-name">${g.name}</p>
    </a>`
  ).join('');

  document.getElementById('recShelf').style.display = '';
  const shelvesEl2 = document.getElementById('shelves');
  shelvesEl2.style.display = '';
  shelvesEl2.classList.add('shelf-revealed');
}

// ── Render Games Grid ─────────────────────────────────────────
function render() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.removeAttribute('aria-busy');
  if (!window.filtered.length) {
    grid.classList.remove('games-grid');
    grid.innerHTML = `<div class="empty-state">
      <svg class="icon empty-icon" aria-hidden="true" viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <h2>No games found</h2>
      <p>We couldn't find any games matching your request.</p>
      <button class="btn" style="margin-top:1rem" onclick="document.getElementById('searchClear').click()">Clear Filters</button>
    </div>`;
    return;
  }
  grid.classList.add('games-grid');
  const sorted = window.getSorted ? window.getSorted(window.filtered) : window.filtered;
  grid.innerHTML = sorted.map((g, i) => {
    const isFav      = favSet.has(g.url);
    const img        = `${gameThumb(g)}`;
    const newBadge   = g.new ? '<span class="badge-new">New</span>' : '';
    const buggyBadge  = g.status === 'buggy' ? '<span class="badge-buggy" title="May not work in all browsers">!</span>' : '';
    const tag         = g.tags?.[0] ? `<span class="game-tag">${cap(g.tags[0])}</span>` : '';
    const loadAttr   = i < 16 ? '' : 'loading="lazy"';
    const fetchAttr  = i < 6  ? 'fetchpriority="high"' : '';
    return `<a href="/games/${encodeURIComponent(g.url)}.html" class="game-card" aria-label="Play ${g.name}">
      <div class="game-thumb">
        <img src="${img}" alt="${g.name}" width="160" height="160" ${loadAttr} decoding="async" ${fetchAttr} onerror="this.style.display='none'">
        ${newBadge}${buggyBadge}
        <button class="fav-btn${isFav ? ' active' : ''}" data-url="${g.url}" aria-label="Favourite ${g.name}" title="Favourite">
          <svg class="icon" aria-hidden="true"><use href="#icon-heart-${isFav ? 'solid' : 'outline'}"/></svg>
        </button>
      </div>
      <div class="game-info">
        <span class="game-name">${g.name}</span>
        ${tag}
      </div>
    </a>`;
  }).join('');

  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const url = btn.dataset.url;
      if (favSet.has(url)) {
        favSet.delete(url);
        btn.classList.remove('active');
        btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-heart-outline"/></svg>';
      } else {
        favSet.add(url);
        btn.classList.add('active');
        btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-heart-solid"/></svg>';
      }
      saveFavs();
      window.ubgTrack?.(favSet.has(url) ? 'favorite_add' : 'favorite_remove', { game_id: url, surface: 'grid' });
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
      btn.addEventListener('animationend', () => btn.classList.remove('pop'), { once: true });
    });
  });
}