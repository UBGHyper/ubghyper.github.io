// ── Helpers ────────────────────────────────────────────────

function countUp(el, target, duration) {
  duration = duration || 700;
  if (!target) { el.textContent = target === 0 ? '0' : '—'; return; }
  const start = performance.now();
  const step = t => {
    const p = Math.min((t - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function getDailyTotals(ptRaw) {
  const daily = {};
  for (const days of Object.values(ptRaw)) {
    for (const [date, secs] of Object.entries(days)) {
      daily[date] = (daily[date] || 0) + secs;
    }
  }
  return daily;
}

function calcStreak(daily) {
  const today = new Date(); today.setHours(0,0,0,0);
  const todayKey = today.toISOString().slice(0, 10);
  const startOff = (daily[todayKey] || 0) > 0 ? 0 : 1;
  let streak = 0;
  for (let i = startOff; i < 365; i++) {
    const d = new Date(+today - i * 864e5).toISOString().slice(0, 10);
    if ((daily[d] || 0) > 0) streak++;
    else break;
  }
  return streak;
}

function buildHeatmap(daily) {
  const today = new Date(); today.setHours(0,0,0,0);
  const N = 84;
  const vals = [], keys = [];
  for (let i = N - 1; i >= 0; i--) {
    const key = new Date(+today - i * 864e5).toISOString().slice(0, 10);
    keys.push(key);
    vals.push(daily[key] || 0);
  }
  const max = Math.max(...vals, 1);
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';
  vals.forEach((secs, idx) => {
    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    if (secs > 0) {
      const r = secs / max;
      cell.dataset.level = r > 0.8 ? 5 : r > 0.55 ? 4 : r > 0.3 ? 3 : r > 0.08 ? 2 : 1;
    }
    cell.title = `${keys[idx]}: ${fmtTime(secs)}`;
    grid.appendChild(cell);
  });
}

// ── Charts ─────────────────────────────────────────────────
let actChart = null, catChart = null;
let lastActData = null, lastCatData = null;
const PALETTE = ['#f07220','#e85252','#7c6bff','#3bbdb4','#f5c842','#4ac98f','#e87bba','#6699ff'];

function chartColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    grid: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
    tick: dark ? '#666' : '#999',
    border: dark ? '#1c1c1c' : '#ffffff',
  };
}

function drawActivity(labels, values) {
  lastActData = { labels, values };
  const c = chartColors();
  if (actChart) actChart.destroy();
  const el = document.getElementById('activityChart');
  if (!el) return;
  actChart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: values.map((_, i) => i === values.length - 1 ? '#f07220' : 'rgba(240,114,32,0.38)'),
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} min` } }
      },
      scales: {
        x: { grid: { color: c.grid }, ticks: { color: c.tick, font: { size: 10 }, maxRotation: 0 } },
        y: { beginAtZero: true, grid: { color: c.grid }, ticks: { color: c.tick, font: { size: 10 }, callback: v => v + 'm' } }
      }
    }
  });
}

function drawCategory(labels, values) {
  lastCatData = { labels, values };
  const c = chartColors();
  if (catChart) catChart.destroy();
  const el = document.getElementById('categoryChart');
  if (!el) return;
  catChart = new Chart(el, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: PALETTE.slice(0, labels.length),
        borderWidth: 2,
        borderColor: c.border,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });
  const legendEl = document.getElementById('donutLegend');
  if (legendEl) {
    legendEl.innerHTML = labels.map((l, i) =>
      `<div class="donut-leg-item">
        <div class="donut-leg-dot" style="background:${PALETTE[i]}"></div>
        <span class="donut-leg-name">${l}</span>
        <span class="donut-leg-pct">${values[i]}%</span>
      </div>`
    ).join('');
  }
}

// Intercept `toggleTheme` re-rendering logic from utils.js
window.waitForChart = async () => {};
window.renderChart = () => {
  if (lastActData) drawActivity(lastActData.labels, lastActData.values);
  if (lastCatData) drawCategory(lastCatData.labels, lastCatData.values);
};

// ── Init ───────────────────────────────────────────────────
async function initStats() {
  const ptRaw = JSON.parse(localStorage.getItem('ubg_pt') || '{}');
  const favs  = JSON.parse(localStorage.getItem('ubg_fav') || localStorage.getItem('favorites') || '[]');

  // Aggregate
  const totals = {};
  const daily  = getDailyTotals(ptRaw);
  let grandTotal = 0;
  for (const [url, days] of Object.entries(ptRaw)) {
    const sum = Object.values(days).reduce((a, b) => a + b, 0);
    if (sum > 0) { totals[url] = sum; grandTotal += sum; }
  }
  const gamesPlayed = Object.keys(totals).length;
  const streak = calcStreak(daily);

  // KPI values
  const kpiGames = document.getElementById('kpiGames');
  if (kpiGames) countUp(kpiGames, gamesPlayed);
  
  const kpiTime = document.getElementById('kpiTime');
  if (kpiTime) kpiTime.textContent = grandTotal > 0 ? fmtTime(grandTotal) : '0m';
  
  const kpiFavs = document.getElementById('kpiFavs');
  if (kpiFavs) countUp(kpiFavs, favs.length);
  
  const kpiStreak = document.getElementById('kpiStreak');
  if (kpiStreak) kpiStreak.textContent = streak > 0 ? streak + 'd' : '—';

  const statsList = document.getElementById('statsList');
  if (gamesPlayed === 0) {
    if (statsList) {
      statsList.innerHTML = `
        <div class="stats-empty">
          <p>No playtime recorded yet.</p>
          <a href="/" class="btn">
            <svg class="icon" aria-hidden="true"><use href="#icon-gamepad"/></svg> Play some games
          </a>
        </div>`;
    }
    return;
  }

  // Show panels
  const chartsRow = document.getElementById('chartsRow');
  const heatmapPanel = document.getElementById('heatmapPanel');
  if (chartsRow) chartsRow.style.display = '';
  if (heatmapPanel) heatmapPanel.style.display = '';
  buildHeatmap(daily);

  // Game metadata
  let gameMap = {};
  try {
    const cached = sessionStorage.getItem('ubg_gamesData');
    let all = [];
    if (cached) {
      all = JSON.parse(cached);
    } else {
      const res = await fetch('assets/games.json');
      all = await res.json();
      sessionStorage.setItem('ubg_gamesData', JSON.stringify(all));
    }
    all.forEach(g => { if (g && g.url) gameMap[g.url] = g; });
  } catch (e) {}

  // Activity chart data (last 14 days)
  const actLabels = [], actValues = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    actLabels.push(d.slice(5));
    actValues.push(Math.round((daily[d] || 0) / 60 * 10) / 10);
  }

  // Wait for Chart.js (deferred CDN)
  await new Promise(resolve => {
    if (typeof Chart !== 'undefined') return resolve();
    const t = setInterval(() => { if (typeof Chart !== 'undefined') { clearInterval(t); resolve(); } }, 50);
    setTimeout(resolve, 4000); // fallback
  });

  drawActivity(actLabels, actValues);

  // Category chart data
  const tagMap = {};
  for (const [url, secs] of Object.entries(totals)) {
    const tag = gameMap[url]?.tags?.[0] || 'other';
    tagMap[tag] = (tagMap[tag] || 0) + secs;
  }
  const sortedCats = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
  let catLabels, catVals;
  if (sortedCats.length > 6) {
    const top = sortedCats.slice(0, 5);
    const otherSecs = sortedCats.slice(5).reduce((a, [, s]) => a + s, 0);
    catLabels = [...top.map(([t]) => t), 'other'];
    catVals   = [...top.map(([, s]) => Math.round(s / grandTotal * 100)), Math.round(otherSecs / grandTotal * 100)];
  } else {
    catLabels = sortedCats.map(([t]) => t);
    catVals   = sortedCats.map(([, s]) => Math.round(s / grandTotal * 100));
  }
  // Fix rounding drift
  const catSum = catVals.reduce((a, b) => a + b, 0);
  if (catSum !== 100 && catVals.length > 0) catVals[0] += 100 - catSum;

  if (catLabels.length >= 2) drawCategory(catLabels, catVals);

  // Top games list
  const escStats = v => String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const sorted  = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const maxSecs = sorted[0][1];
  
  if (statsList) {
    statsList.innerHTML = `<div class="stats-list">${
      sorted.map(([url, secs], i) => {
        const g    = gameMap[url];
        // Only games on the site are listed. A playtime key is browser data anyone can plant (a "save" file
        // imported on the Saves page, or any game on this origin), so it must never reach innerHTML raw.
        if (!g) return '';
        const name = escStats(g.name);
        const img  = g ? `${gameThumb(g)}` : '';
        const barPct  = Math.round(secs / maxSecs * 100);
        const timePct = Math.round(secs / grandTotal * 100);
        const rankCls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        return `<a href="/games/${encodeURIComponent(url)}.html" class="stats-row">
          <span class="stats-rank ${rankCls}">${i + 1}</span>
          <img class="stats-thumb" src="${img}" alt="${name}" loading="lazy" width="40" height="40" onerror="this.style.display='none'">
          <div class="stats-info"><p class="stats-game-name">${name}</p></div>
          <div class="stats-bar-wrap"><div class="stats-bar-fill" data-w="${barPct}"></div></div>
          <span class="stats-pct">${timePct}%</span>
          <span class="stats-time">${fmtTime(secs)}</span>
        </a>`;
      }).join('')
    }</div>`;
  }

  // Animate bars in after paint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.stats-bar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  initCamo('Your Stats - UBGHyper');
  initStats();
});