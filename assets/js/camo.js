// camo.js — Tab disguise mode
// Keyboard shortcut: backtick ` toggles the dropdown

const CAMO_KEY = 'ubg_camo';
const ORIG_FAVICON = 'assets/img/icon/main.png';

const PRESETS = [
  { id: 'classroom', label: 'Google Classroom', title: 'Classroom',                     favicon: 'https://ssl.gstatic.com/classroom/favicon.png' },
  { id: 'khan',      label: 'Khan Academy',     title: 'Khan Academy',                  favicon: 'https://cdn.kastatic.org/images/favicon.ico' },
  { id: 'docs',      label: 'Google Docs',      title: 'Document - Google Docs',        favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
  { id: 'desmos',    label: 'Desmos',           title: 'Desmos | Graphing Calculator',  favicon: 'https://www.desmos.com/favicon.ico' },
  { id: 'slides',    label: 'Google Slides',    title: 'Presentation - Google Slides',  favicon: 'https://ssl.gstatic.com/docs/presentations/images/favicon5.ico' },
  // Microsoft (requested by players, 2026-10-24). Microsoft's own icons (Word/PowerPoint/Outlook from its
  // Fluent brand-icon CDN; Microsoft 365's tab icon is now the Copilot logo), copied into /assets/img/camo/
  // so they come from our own origin and still show where a filter blocks office.net.
  { id: 'm365',       label: 'Microsoft 365', title: 'Home | Microsoft 365',  favicon: '/assets/img/camo/m365.ico' },
  { id: 'outlook',    label: 'Outlook',       title: 'Mail - Outlook',        favicon: '/assets/img/camo/outlook.svg' },
  { id: 'word',       label: 'Word',          title: 'Document1.docx',        favicon: '/assets/img/camo/word.svg' },
  { id: 'powerpoint', label: 'PowerPoint',    title: 'Presentation1.pptx',    favicon: '/assets/img/camo/powerpoint.svg' },
];

// ── Apply / remove ───────────────────────────────────────────
function applyCamo(preset) {
  document.title = preset.title;
  const link = document.querySelector('link[rel="icon"]');
  if (link) link.href = preset.favicon;
  localStorage.setItem(CAMO_KEY, JSON.stringify(preset));
  syncBtn(true, preset.id);
}

function removeCamo(origTitle) {
  document.title = origTitle;
  const link = document.querySelector('link[rel="icon"]');
  if (link) link.href = ORIG_FAVICON;
  localStorage.removeItem(CAMO_KEY);
  syncBtn(false, null);
}

// A keyboard hint is only useful where a keyboard exists. Evaluated once at load
// rather than per call, since the input method does not change mid-session.
const KEY_HINT = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches
  ? '' : ' (`)';

function syncBtn(active, activeId) {
  const btn = document.getElementById('camoBtn');
  if (!btn) return;
  btn.classList.toggle('camo-on', active);
  btn.title = (active ? 'Camo on, tap to change' : 'Tab disguise') + KEY_HINT;
  document.querySelectorAll('.camo-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === activeId);
  });
}

// ── Init (called after DOM ready) ───────────────────────────
function initCamo(origTitle) {
  const btn      = document.getElementById('camoBtn');
  const dropdown = document.getElementById('camoDropdown');
  if (!btn || !dropdown) return;

  // Build items
  dropdown.innerHTML =
    PRESETS.map(p => `<button class="camo-item" data-id="${p.id}">${p.label}</button>`).join('') +
    `<div class="camo-sep"></div>` +
    `<button class="camo-item camo-item-off" data-id="off">Turn off</button>`;

  // Sync initial state
  const saved = localStorage.getItem(CAMO_KEY);
  if (saved) {
    const p = JSON.parse(saved);
    syncBtn(true, p.id);
  }

  // Toggle dropdown
  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Item clicks
  dropdown.querySelectorAll('.camo-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdown.classList.remove('open');
      if (item.dataset.id === 'off') {
        removeCamo(origTitle);
      } else {
        const preset = PRESETS.find(p => p.id === item.dataset.id);
        if (preset) applyCamo(preset);
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', () => dropdown.classList.remove('open'));

  // Backtick shortcut
  document.addEventListener('keydown', e => {
    if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey &&
        e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });

  // First-use tooltip
  if (!localStorage.getItem('ubg_camo_seen')) {
    const tip = document.createElement('div');
    tip.className = 'camo-tooltip';
    // The key as a key cap: a bare ` glyph mid-sentence read as a rendering glitch.
    tip.innerHTML = KEY_HINT ? 'Press <kbd>`</kbd> to disguise this tab' : 'Tap to disguise this tab';
    btn.parentElement.appendChild(tip);
    const dismiss = () => {
      tip.classList.remove('visible');
      localStorage.setItem('ubg_camo_seen', '1');
      setTimeout(() => tip.remove(), 300);
    };
    setTimeout(() => tip.classList.add('visible'), 900);
    setTimeout(dismiss, 5500);
    btn.addEventListener('click', dismiss, { once: true });
  }

  bindNavHamburger();
}

// ── Hamburger nav (phones) ──────────────────────────────────
// The single owner of the menu button. It used to be bound here AND in app.js / favorites.js /
// play-new.js, so each tap toggled twice and the menu never opened; landing pages load camo.js
// without calling initCamo, so theirs was never bound at all (2026-10-24). Bound once, guarded.
function bindNavHamburger() {
  const ham = document.getElementById('navHamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!ham || !navLinks || ham.dataset.bound) return;
  ham.dataset.bound = '1';
  // Pages with the icon sprite (icons.js) get the svg icons; the rest a plain glyph.
  const icon = name => document.getElementById('icon-' + name)
    ? `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`
    : (name === 'x' ? '✕' : '☰');
  const set = open => {
    navLinks.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    ham.innerHTML = icon(open ? 'x' : 'menu');
  };
  ham.addEventListener('click', e => { e.stopPropagation(); set(!navLinks.classList.contains('open')); });
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !ham.contains(e.target)) set(false);
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindNavHamburger);
else bindNavHamburger();

// ── Auto-apply on page load (re-applies after navigation) ───
(function () {
  const saved = localStorage.getItem(CAMO_KEY);
  if (!saved) return;
  try {
    // Prefer the current preset by id, so an icon or title change reaches people who already had it on
    // (the first Microsoft icons were hand-drawn stand-ins, 2026-10-24).
    // Only a known preset is ever applied: the stored object is browser data anyone can plant, and its
    // favicon URL would otherwise load from any server (leaking the visitor's IP to it).
    const s = JSON.parse(saved);
    const p = PRESETS.find(x => x.id === (s && s.id));
    if (!p) { localStorage.removeItem(CAMO_KEY); return; }
    if (s.title !== p.title || s.favicon !== p.favicon) localStorage.setItem(CAMO_KEY, JSON.stringify(p));
    document.title = p.title;
    const link = document.querySelector('link[rel="icon"]');
    if (link) link.href = p.favicon;
  } catch { localStorage.removeItem(CAMO_KEY); }
})();

// ── isotunnel launch alert (owner's request, 2026-11-07) ─────
// A slim bar under the nav on every page that loads camo.js. Closing it is remembered, so a visitor sees it
// until they dismiss it once. No animation, no modal, nothing over the game. Turn off by setting ISO_ALERT_ON
// to false; bump ISO_ALERT_KEY to show a new message to people who closed the old one.
const ISO_ALERT_ON = true;
const ISO_ALERT_KEY = 'ubg_iso_alert_1';
function showIsoAlert() {
  if (!ISO_ALERT_ON || document.getElementById('isoAlert')) return;
  try { if (localStorage.getItem(ISO_ALERT_KEY)) return; } catch (e) { return; }
  const links = document.querySelector('.nav-links');
  const nav = links && links.closest('nav');
  if (!nav) return;
  const style = document.createElement('style');
  style.textContent =
    '.iso-alert{display:flex;align-items:center;gap:.75rem;padding:.55rem 1.25rem;background:var(--surface-2,var(--surface));' +
    'border-bottom:1px solid var(--border);color:var(--text);font-size:.9rem;line-height:1.4}' +
    '.iso-alert p{margin:0;flex:1}.iso-alert a{color:var(--accent);font-weight:600;text-decoration:none;white-space:nowrap}' +
    '.iso-alert a:hover{text-decoration:underline}' +
    '.iso-alert button{flex-shrink:0;background:none;border:0;color:var(--muted);font-size:1.15rem;line-height:1;padding:.25rem .4rem;cursor:pointer;border-radius:6px}' +
    '.iso-alert button:hover{color:var(--text)}.iso-alert button:focus-visible{outline:2px solid var(--accent)}';
  document.head.appendChild(style);
  const bar = document.createElement('div');
  bar.className = 'iso-alert';
  bar.id = 'isoAlert';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Announcement');
  bar.innerHTML = '<p><strong>isotunnel is out now.</strong> A VPN for Windows and Mac that gets you online from networks that block VPNs. ' +
    'Test your network free before you buy. <a href="https://isotunnel.com/" target="_blank" rel="noopener">Get isotunnel</a></p>' +
    '<button type="button" aria-label="Close announcement">✕</button>';
  bar.querySelector('button').addEventListener('click', () => {
    bar.remove();
    try { localStorage.setItem(ISO_ALERT_KEY, '1'); } catch (e) {}
  });
  nav.insertAdjacentElement('afterend', bar);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showIsoAlert);
else showIsoAlert();
