// ── Constants from utils.js: IMG_BASE, PT_KEY, FAV_KEY, cap, favSet, saveFavs

let allGames   = [];
let favGames   = [];
let activeSort = 'recent';

document.addEventListener('DOMContentLoaded', () => {
  setupSort();
  setupNav();
  init();
});

async function init() {
  const grid = document.getElementById('gamesGrid');

  if (!favSet.size) {
    renderEmptyState();
    return;
  }

  if (grid) grid.innerHTML = buildSkel(Math.min(favSet.size, 18));

  try {
    allGames = (await loadGamesList()).filter(g => g && g.name && g.url);
  } catch {
    if (grid) grid.innerHTML = `<div class="idx-empty"><h2>Failed to load games</h2><p>Please refresh the page.</p></div>`;
    return;
  }

  const favOrder = [...favSet];
  favGames = favOrder
    .map(url => allGames.find(g => g.url === url))
    .filter(Boolean);

  if (!favGames.length) {
    renderEmptyState('Your saved games are no longer available.');
    return;
  }

  renderFavGrid();
}

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

function renderEmptyState(msg) {
  const grid = document.getElementById('gamesGrid');
  const bar  = document.getElementById('favSortBar');
  if (bar) bar.style.display = 'none';
  if (!grid) return;
  grid.removeAttribute('aria-busy');
  grid.classList.remove('idx-grid');
  grid.style.display = 'block';

  grid.innerHTML = `<div class="hub-fav-empty">
    <svg class="hub-fav-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    <h2>No favourites yet</h2>
    <p>${msg || 'Tap the heart on any game card to save it here for quick access later.'}</p>
    <a href="/" class="hub-fav-empty-btn">Browse all games</a>
  </div>`;

  const sub = document.getElementById('favSub');
  if (sub) sub.textContent = 'Games you\'ve hearted';
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
  return games;
}

function renderFavGrid() {
  const grid = document.getElementById('gamesGrid');
  const bar  = document.getElementById('favSortBar');
  const cnt  = document.getElementById('favCount');
  const sub  = document.getElementById('favSub');
  if (!grid) return;

  grid.removeAttribute('aria-busy');
  grid.classList.add('idx-grid');
  grid.style.display = '';

  if (bar) bar.style.display = '';
  if (cnt) cnt.textContent = `${favGames.length} saved game${favGames.length !== 1 ? 's' : ''}`;
  if (sub) sub.textContent = `${favGames.length} game${favGames.length !== 1 ? 's' : ''} you've hearted.`;

  const sorted = getSorted(favGames);
  grid.innerHTML = sorted.map((g, i) => favCard(g, i)).join('');

  grid.querySelectorAll('.idx-card-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const url = btn.dataset.url;
      const card = btn.closest('.idx-card');
      if (!card || !url) return;

      card.style.transition = 'opacity .2s ease';
      card.style.opacity = '0';
      setTimeout(() => {
        favSet.delete(url);
        saveFavs();
        window.ubgTrack?.('favorite_remove', { game_id: url, surface: 'favorites_page' });
        favGames = favGames.filter(g => g.url !== url);
        if (!favGames.length) {
          renderEmptyState();
        } else {
          renderFavGrid();
        }
      }, 200);
    });
  });
}

function favCard(g, i) {
  const img      = `${gameThumb(g)}`;
  const loadAttr = i < 12 ? '' : 'loading="lazy"';
  const fetchPri = i < 6  ? 'fetchpriority="high"' : '';
  const tag      = g.tags?.[0] ? `<span class="idx-card-tag">${cap(g.tags[0])}</span>` : '';
  const animDel  = i < 36 ? `style="animation-delay:${Math.min(i * 14, 300)}ms"` : '';
  return `<a href="/games/${encodeURIComponent(g.url)}.html" class="idx-card" aria-label="Play ${g.name}" ${animDel}>
    <div class="idx-card-art">
      <img class="idx-card-img" src="${img}" alt="${g.name}" width="170" height="170" ${loadAttr} ${fetchPri} decoding="async" onerror="this.style.display='none'">
      <div class="idx-card-play" aria-hidden="true">
        <div class="idx-card-play-icon">
          <svg class="icon" aria-hidden="true"><use href="#icon-play"/></svg>
        </div>
      </div>
      <button class="idx-card-fav active" data-url="${g.url}" aria-label="Remove ${g.name} from favourites" title="Remove from favourites">
        <svg class="icon" aria-hidden="true"><use href="#icon-heart-solid"/></svg>
      </button>
    </div>
    <div class="idx-card-info">
      <span class="idx-card-name">${g.name}</span>
      ${tag}
    </div>
  </a>`;
}

function setupSort() {
  document.querySelectorAll('.idx-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.idx-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSort = btn.dataset.sort;
      if (favGames.length) renderFavGrid();
    });
  });
}

function setupNav() {
  // The hamburger is owned by camo.js (initCamo runs on this page). A second toggle here flipped the menu
  // open and shut again on every tap, so it never opened on phones (2026-10-24).
}
