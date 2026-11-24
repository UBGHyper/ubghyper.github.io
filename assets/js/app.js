// ── Constants from utils.js: IMG_BASE, PT_KEY, FAV_KEY, cap, favSet, saveFavs

// ── State ─────────────────────────────────────────────────────
let allGames       = [];
let filtered       = [];
let activeCategory = 'all';
let activeSort     = 'default';
let searchQ        = '';
let gridPainted    = false;
let acMatches      = [];   // current autocomplete suggestions
let acIndex        = -1;   // highlighted suggestion (keyboard nav)

const PLACEHOLDER = "Search games";

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupSort();
  setupRandom();
  setupNav();
  init();
});

function applyPlaceholder() {
  const inp = document.getElementById('searchInput');
  if (inp) inp.placeholder = PLACEHOLDER;
}

// ── Init ──────────────────────────────────────────────────────
async function init() {
  const grid = document.getElementById('gamesGrid');
  if (grid) grid.innerHTML = buildSkel(24);

  // Restore filter state from URL
  const urlP = new URLSearchParams(location.search);
  const urlQ   = urlP.get('search') || '';
  const urlCat = urlP.get('cat')    || 'all';
  if (urlQ) {
    searchQ = urlQ;
    const inp = document.getElementById('searchInput');
    if (inp) inp.value = urlQ;
    document.getElementById('searchWrap')?.classList.add('has-value');
  }
  if (urlCat !== 'all') activeCategory = urlCat;

  try {
    allGames = (await loadGamesList()).filter(g => g && g.name && g.url && g.status !== 'broken');
  } catch {
    if (grid) {
      grid.innerHTML = `<div class="idx-empty"><h2>Failed to load games</h2><p>Please refresh the page.</p></div>`;
    }
    return;
  }

  // Update subtitle with real count
  const sub = document.getElementById('pageSubtitle');
  if (sub) {
    sub.textContent = `${allGames.length} cool unblocked games (UBG) — free, no downloads, runs on Chromebook. Built-in tab disguise for school.`;
  }

  buildChips();
  renderRecent();
  applyFilter();
  applyPlaceholder();
}

// ── Skeleton ──────────────────────────────────────────────────
function buildSkel(n) {
  return Array(n).fill(0).map(() => `
    <div class="idx-card-skel" aria-hidden="true">
      <div class="skel-r idx-skel-thumb"></div>
      <div class="idx-skel-info">
        <div class="skel-r idx-skel-name"></div>
        <div class="skel-r idx-skel-tag"></div>
      </div>
    </div>`).join('');
}

// ── Recent shelf (only renders if user has actual history) ───
function renderRecent() {
  const recent = JSON.parse(localStorage.getItem('ubg_recent') || '[]');
  if (!recent.length) return;
  const games = recent.slice(0, 12).map(u => allGames.find(g => g.url === u)).filter(Boolean);
  if (!games.length) return;

  const shelf = document.getElementById('recentShelf');
  const track = document.getElementById('recentTrack');
  if (!shelf || !track) return;

  track.innerHTML = games.map(g => shelfCard(g)).join('');
  shelf.hidden = false;

  document.getElementById('recentClear')?.addEventListener('click', () => {
    localStorage.removeItem('ubg_recent');
    shelf.hidden = true;
  });
}

function shelfCard(g) {
  const tag = g.tags?.[0] ? `<p class="idx-shelf-tag">${cap(g.tags[0])}</p>` : '';
  return `<a href="/games/${encodeURIComponent(g.url)}.html" class="idx-shelf-card" title="${g.name}">
    <div class="idx-shelf-art-wrap">
      <img class="idx-shelf-art" src="${gameThumb(g)}" alt="${g.name}" width="140" height="105" loading="lazy" onerror="this.style.display='none'">
    </div>
    <p class="idx-shelf-name">${g.name}</p>
    ${tag}
  </a>`;
}

// ── Category chips ────────────────────────────────────────────
function buildChips() {
  const cats = new Set();
  allGames.forEach(g => (g.tags || []).forEach(t => cats.add(t)));
  const track = document.getElementById('chipsTrack');
  if (!track) return;

  const hasNew = allGames.some(g => g.new);
  const hasFixed = allGames.some(isRecentlyFixed);
  const sorted = [...cats].sort();

  const chips = [
    chipBtn('all', 'All'),
    ...(hasNew ? [chipBtn('new', 'New ✦')] : []),
    ...(hasFixed ? [chipBtn('fixed', 'Fixed ✓')] : []),
    ...sorted.map(c => chipBtn(c, cap(c)))
  ];
  track.innerHTML = chips.join('');

  track.querySelectorAll('.idx-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      track.querySelectorAll('.idx-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      updateURL();
      applyFilter();
    });
  });
}

function chipBtn(cat, label) {
  const active = cat === activeCategory ? ' active' : '';
  return `<button class="idx-chip${active}" data-cat="${cat}">${label}</button>`;
}

// ── Sort ──────────────────────────────────────────────────────
function setupSort() {
  document.querySelectorAll('.idx-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.idx-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSort = btn.dataset.sort;
      renderGrid();
    });
  });
}

function getSorted(games) {
  if (activeSort === 'az') return [...games].sort((a, b) => a.name.localeCompare(b.name));
  if (activeSort === 'played') {
    const pt = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
    return [...games].sort((a, b) => {
      const sa = Object.values(pt[a.url] || {}).reduce((x, y) => x + y, 0);
      const sb = Object.values(pt[b.url] || {}).reduce((x, y) => x + y, 0);
      return sb - sa;
    });
  }
  if (activeSort === 'new') return [...games].sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  return games;
}

// ── Filter & render ───────────────────────────────────────────
function applyFilter() {
  const q = searchQ.toLowerCase().trim();
  filtered = allGames.filter(g => {
    const matchCat = activeCategory === 'all' ||
      (activeCategory === 'new' ? g.new === true
        : activeCategory === 'fixed' ? isRecentlyFixed(g)
        : (g.tags || []).includes(activeCategory));
    const matchQ = !q || g.name.toLowerCase().includes(q) ||
      (g.tags || []).some(t => t.includes(q)) ||
      (g.gamedesc || '').toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const cnt = document.getElementById('resultsCount');
  if (cnt) cnt.textContent = `${filtered.length} game${filtered.length !== 1 ? 's' : ''}`;

  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.removeAttribute('aria-busy');

  if (!filtered.length) {
    renderEmpty(grid);
    return;
  }

  const sorted = getSorted(filtered);
  grid.innerHTML = sorted.map((g, i) => gameCard(g, i)).join('');

  // Stagger the entrance only on the first paint; re-filtering while the user
  // types should swap cards instantly, not re-fade the whole grid each keystroke.
  grid.classList.toggle('idx-anim', !gridPainted);
  gridPainted = true;

  // One delegated click handler for all favourite buttons — attached once and
  // survives every re-render, instead of binding 600+ listeners per render.
  if (!grid.dataset.favBound) {
    grid.dataset.favBound = '1';
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.idx-card-fav');
      if (!btn) return;
      e.preventDefault(); e.stopPropagation();
      const url = btn.dataset.url;
      const on  = favSet.has(url);
      if (on) favSet.delete(url); else favSet.add(url);
      saveFavs();
      window.ubgTrack?.(on ? 'favorite_remove' : 'favorite_add', { game_id: url, surface: 'grid' });
      btn.classList.toggle('active', !on);
      btn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-heart-${!on ? 'solid' : 'outline'}"/></svg>`;
      if (!on) { btn.classList.remove('fav-pop'); void btn.offsetWidth; btn.classList.add('fav-pop'); }
    });
  }
}

function renderEmpty(grid) {
  const q = searchQ.trim().toLowerCase();
  let dymHtml = '';
  if (q && q.length >= 2) {
    const suggestions = fuzzyMatch(q, allGames, 3);
    if (suggestions.length) {
      dymHtml = `<div class="hub-dym">
        <p class="hub-dym-label">Did you mean…</p>
        <div class="hub-dym-chips">
          ${suggestions.map(g => `<a href="/games/${encodeURIComponent(g.url)}.html" class="hub-dym-chip">${g.name}</a>`).join('')}
        </div>
      </div>`;
    }
  }
  grid.innerHTML = `<div class="idx-empty">
    <svg class="idx-empty-icon icon" viewBox="0 0 24 24" width="44" height="44" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <h2>No games found</h2>
    <p>Try a different search or category.</p>
    <button class="btn" onclick="window.ubgClearFilters()">Clear filters</button>
    ${dymHtml}
  </div>`;
}

// A game gets a "Fixed" badge for 30 days after the date in its `fixed` field (YYYY-MM-DD in games.json):
// it was broken, or replaced with a working copy, and can be played now. Never shown on a game still flagged
// buggy, and it expires on its own so old repairs don't pile up on the grid.
const FIXED_BADGE_DAYS = 30;
function isRecentlyFixed(g) {
  if (!g || !g.fixed || g.status === 'buggy' || g.status === 'broken') return false;
  const t = Date.parse(g.fixed + 'T00:00:00Z');
  return !isNaN(t) && (Date.now() - t) / 864e5 <= FIXED_BADGE_DAYS;
}

function gameCard(g, i) {
  const isFav    = favSet.has(g.url);
  const img      = `${gameThumb(g)}`;
  const loadAttr = i < 18 ? '' : 'loading="lazy"';
  const fetchPri = i < 6  ? 'fetchpriority="high"' : '';
  const badgeNew = g.new   ? '<span class="idx-card-badge-new">New</span>' : '';
  const badgeBug = g.status === 'buggy' ? '<span class="idx-card-badge-buggy">!</span>' : '';
  const badgeFix = isRecentlyFixed(g) ? '<span class="idx-card-badge-fixed" title="Fixed — this game works again">✓ Fixed</span>' : '';
  const animDel  = i < 48 ? `style="animation-delay:${Math.min(i * 12, 300)}ms"` : '';
  return `<a href="/games/${encodeURIComponent(g.url)}.html" class="idx-card" aria-label="Play ${g.name}" ${animDel}>
    <div class="idx-card-art">
      <img class="idx-card-img" src="${img}" alt="${g.name}" width="170" height="170" ${loadAttr} ${fetchPri} decoding="async" onerror="this.style.display='none'">
      ${badgeNew}${badgeBug}${badgeFix}
      <div class="idx-card-play" aria-hidden="true">
        <div class="idx-card-play-icon">
          <svg class="icon" aria-hidden="true"><use href="#icon-play"/></svg>
        </div>
      </div>
      <button class="idx-card-fav${isFav ? ' active' : ''}" data-url="${g.url}" aria-label="${isFav ? 'Remove from' : 'Add to'} favourites" title="Favourite">
        <svg class="icon" aria-hidden="true"><use href="#icon-heart-${isFav ? 'solid' : 'outline'}"/></svg>
      </button>
    </div>
    <div class="idx-card-info">
      <span class="idx-card-name">${g.name}</span>
      ${g.tags?.[0] ? `<span class="idx-card-tag">${cap(g.tags[0])}</span>` : ''}
    </div>
  </a>`;
}

// ── Fuzzy match (Levenshtein with prefix/substring boosts) ──
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array(b.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr.push(Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost));
    }
    prev = curr;
  }
  return prev[b.length];
}

function fuzzyMatch(q, games, limit) {
  const scored = games.map(g => {
    const nameLower = g.name.toLowerCase();
    let dist = levenshtein(q, nameLower);
    if (nameLower.startsWith(q))    dist -= q.length * 0.6;
    else if (nameLower.includes(q)) dist -= q.length * 0.4;
    for (const word of nameLower.split(/[\s\-]+/)) {
      if (!word) continue;
      const wDist = levenshtein(q, word);
      if (wDist - 0.5 < dist) dist = wDist - 0.5;
    }
    return { g, score: dist };
  });
  scored.sort((a, b) => a.score - b.score);
  const threshold = Math.max(2.5, q.length * 0.7);
  return scored
    .filter(x => x.score <= threshold)
    .slice(0, limit)
    .map(x => x.g);
}

// ── Search setup ──────────────────────────────────────────────
function setupSearch() {
  const inp   = document.getElementById('searchInput');
  const wrap  = document.getElementById('searchWrap');
  const clear = document.getElementById('searchClear');
  if (!inp) return;

  // Debounce filtering so fast typing doesn't re-filter 600+ games and rebuild
  // the whole grid on every keystroke (noticeable jank on school Chromebooks).
  let searchTimer = null;
  inp.addEventListener('input', () => {
    searchQ = inp.value;
    wrap?.classList.toggle('has-value', !!inp.value);
    renderAC();                                    // instant ranked suggestions
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { updateURL(); applyFilter(); }, 110);
  });
  clear?.addEventListener('click', () => window.ubgClearFilters());

  inp.addEventListener('keydown', e => {
    const open = acMatches.length > 0;
    if (e.key === 'ArrowDown' && open) { e.preventDefault(); setAcActive((acIndex + 1) % acMatches.length); return; }
    if (e.key === 'ArrowUp'   && open) { e.preventDefault(); setAcActive((acIndex - 1 + acMatches.length) % acMatches.length); return; }
    if (e.key === 'Enter') {
      const pick = acIndex >= 0 ? acMatches[acIndex] : acMatches[0];
      if (pick) { e.preventDefault(); location.href = `/games/${encodeURIComponent(pick.url)}.html`; }
      return;
    }
    if (e.key === 'Escape') {
      if (open) { e.preventDefault(); closeAC(); return; }
      if (inp.value) { e.preventDefault(); window.ubgClearFilters(); inp.blur(); }
    }
  });

  inp.addEventListener('focus', () => { if (inp.value.trim().length >= 2) renderAC(); });
  // Delay close so a click on a suggestion (which blurs the input first) still lands.
  inp.addEventListener('blur', () => setTimeout(closeAC, 150));

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '/') { e.preventDefault(); inp.focus(); }
  });
}

// ── Autocomplete dropdown (ranked top matches, keyboard-navigable) ──
function renderAC() {
  const ac  = document.getElementById('searchAC');
  const inp = document.getElementById('searchInput');
  if (!ac || !inp) return;
  const q = inp.value.trim().toLowerCase();
  acIndex = -1;
  if (q.length < 2) { closeAC(); return; }
  acMatches = fuzzyMatch(q, allGames, 6);
  if (!acMatches.length) { closeAC(); return; }
  ac.innerHTML = acMatches.map((g, i) => `
    <a href="/games/${encodeURIComponent(g.url)}.html" class="hub-ac-item" role="option" data-i="${i}" aria-selected="false">
      <img class="hub-ac-thumb" src="${gameThumb(g)}" alt="" width="40" height="40" loading="lazy" onerror="this.style.visibility='hidden'">
      <span class="hub-ac-text">
        <span class="hub-ac-name">${g.name}</span>
        ${g.tags?.[0] ? `<span class="hub-ac-tag">${cap(g.tags[0])}</span>` : ''}
      </span>
      <span class="hub-ac-go" aria-hidden="true">↵ play</span>
    </a>`).join('');
  ac.classList.add('open');
  inp.setAttribute('aria-expanded', 'true');
  // Mouse hover drives the same highlight as the keyboard so they never fight.
  ac.querySelectorAll('.hub-ac-item').forEach((el, i) =>
    el.addEventListener('mousemove', () => setAcActive(i)));
}

function closeAC() {
  const ac  = document.getElementById('searchAC');
  const inp = document.getElementById('searchInput');
  if (ac) { ac.classList.remove('open'); ac.innerHTML = ''; }
  if (inp) inp.setAttribute('aria-expanded', 'false');
  acMatches = []; acIndex = -1;
}

function setAcActive(i) {
  const ac = document.getElementById('searchAC');
  if (!ac) return;
  const items = [...ac.querySelectorAll('.hub-ac-item')];
  items.forEach((el, j) => {
    const on = j === i;
    el.classList.toggle('active', on);
    el.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  acIndex = i;
  if (items[i]) items[i].scrollIntoView({ block: 'nearest' });
}

window.ubgClearFilters = function () {
  searchQ = '';
  activeCategory = 'all';
  const inp  = document.getElementById('searchInput');
  const wrap = document.getElementById('searchWrap');
  if (inp)  { inp.value = ''; inp.focus(); }
  wrap?.classList.remove('has-value');
  closeAC();
  document.querySelectorAll('.idx-chip').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === 'all'));
  updateURL();
  applyFilter();
};

// ── Smart Random (weighted by user's top categories) ─────────
function setupRandom() {
  const btn = document.getElementById('randomBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!allGames.length) return;
    const pt = JSON.parse(localStorage.getItem(PT_KEY) || '{}');
    const catScore = {};
    let totalPlay = 0;
    for (const [url, days] of Object.entries(pt)) {
      const g = allGames.find(x => x.url === url);
      if (!g) continue;
      const sum = Object.values(days).reduce((a, b) => a + b, 0);
      totalPlay += sum;
      (g.tags || []).forEach(t => { catScore[t] = (catScore[t] || 0) + sum; });
    }
    let pool = allGames;
    if (totalPlay > 60 && Object.keys(catScore).length) {
      const topCats = Object.entries(catScore).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0]);
      const inTop = allGames.filter(g => (g.tags || []).some(t => topCats.includes(t)));
      pool = (Math.random() < 0.7 && inTop.length) ? inTop : allGames;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    location.href = `/games/${encodeURIComponent(pick.url)}.html`;
  });
}

// ── URL sync ──────────────────────────────────────────────────
function updateURL() {
  const p = new URLSearchParams();
  if (searchQ.trim()) p.set('search', searchQ.trim());
  if (activeCategory !== 'all') p.set('cat', activeCategory);
  const qs = p.toString();
  history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
}

// ── Nav hamburger ─────────────────────────────────────────────
function setupNav() {
  // The hamburger is owned by camo.js (initCamo runs on this page). A second toggle here flipped the menu
  // open and shut again on every tap, so it never opened on phones (2026-10-24).
}
