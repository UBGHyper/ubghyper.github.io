/* UBGHyper — optional "what does your school use to block sites?" poll.
 *
 * One small dismissible card on game pages, shown once per browser after 60 s of
 * visible play. Answers come from a FIXED list and are reported through
 * window.ubgFilterPoll (analytics.js), which drops anything not on that list, so no
 * free text ever reaches GA4. Nothing is sent in test mode (analytics.js handles that).
 *
 * Local preview: on localhost, add ?poll=1 to show the card immediately, ignoring the
 * "already answered" flag. The parameter is ignored on every other host.
 */
(function () {
  'use strict';
  var KEY = 'ubg_poll_filter';
  var SHOW_AFTER_MS = 60000;

  var OPTIONS = [
    ['goguardian', 'GoGuardian'], ['securly', 'Securly'], ['lightspeed', 'Lightspeed'],
    ['linewize', 'Linewize'], ['cisco_umbrella', 'Cisco Umbrella'], ['iboss', 'iboss'],
    ['blocksi', 'Blocksi'], ['zscaler', 'Zscaler'], ['smoothwall', 'Smoothwall'],
    ['fortiguard', 'FortiGuard'], ['palo_alto', 'Palo Alto'], ['contentkeeper', 'ContentKeeper'],
    ['not_sure', 'Not sure'], ['none_home', 'No filter (home)'], ['other', 'Other']
  ];

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var host = location.hostname;
  var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  var preview = isLocal && /[?&]poll=1(&|$)/.test(location.search);

  if (!preview && lsGet(KEY)) return;                      // answered or dismissed already
  if (!preview && !/^(game|player)$/.test((window.ubgAnalytics || {}).pageType || '')) return;

  var css = '' +
    '#ubg-poll{position:fixed;left:16px;bottom:16px;z-index:9000;width:min(360px,calc(100vw - 32px));' +
    'background:var(--surface,#1c1c1c);color:var(--text,#e8e8e8);border:1px solid var(--border,#2e2e2e);' +
    'border-radius:var(--r-lg,14px);padding:14px 14px 12px;font:14px/1.4 var(--font,system-ui,sans-serif);' +
    'box-shadow:0 10px 30px rgba(0,0,0,.35);transform:translateY(20px);opacity:0;' +
    'transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .35s}' +
    '#ubg-poll.on{transform:none;opacity:1}' +
    '#ubg-poll h3{font-size:14px;font-weight:700;margin:0 24px 2px 0}' +
    '#ubg-poll p{margin:0 0 10px;color:var(--muted,#888);font-size:12.5px}' +
    '#ubg-poll .opts{display:flex;flex-wrap:wrap;gap:6px}' +
    '#ubg-poll .opts button{padding:6px 10px;border-radius:999px;border:1px solid var(--border,#2e2e2e);' +
    'background:var(--surface-2,#222);color:inherit;font-size:12.5px;cursor:pointer}' +
    '#ubg-poll .opts button:hover,#ubg-poll .opts button:focus-visible{border-color:var(--accent,#f07220);' +
    'background:var(--accent-soft,rgba(240,114,32,.1));outline:none}' +
    '#ubg-poll .x{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;' +
    'color:var(--muted,#888);font-size:16px;cursor:pointer;background:none;border:none}' +
    '#ubg-poll .x:hover{color:var(--text,#e8e8e8)}' +
    '#ubg-poll .no{margin-top:10px;color:var(--muted,#888);font-size:12px;text-decoration:underline;cursor:pointer;background:none;border:none;padding:0}' +
    '#ubg-poll .ty{padding:6px 0;font-weight:600}' +
    '@media (max-width:540px){#ubg-poll{left:8px;right:8px;bottom:8px;width:auto}}' +
    '@media (prefers-reduced-motion:reduce){#ubg-poll{transition:none}}';

  var card = null;

  function report(filter, action) {
    if (typeof window.ubgFilterPoll === 'function') window.ubgFilterPoll(filter, action);
  }

  function close(delay) {
    if (!card) return;
    var c = card; card = null;
    setTimeout(function () {
      c.classList.remove('on');
      setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 400);
    }, delay || 0);
  }

  function answer(code) {
    if (!preview) lsSet(KEY, code);
    report(code, 'answered');
    card.innerHTML = '<div class="ty">Thanks! That helps us keep the games working. ✓</div>';
    close(1800);
  }

  function dismiss() {
    if (!preview) lsSet(KEY, 'dismissed');
    report('none', 'dismissed');
    close(0);
  }

  function show() {
    if (card || document.getElementById('ubg-poll')) return;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    card = document.createElement('div');
    card.id = 'ubg-poll';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Optional poll');

    var h = document.createElement('h3');
    h.textContent = 'Quick one (optional)';
    var p = document.createElement('p');
    p.textContent = 'What does your school use to block sites? Anonymous, one tap.';
    var opts = document.createElement('div');
    opts.className = 'opts';
    OPTIONS.forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = o[1];
      b.addEventListener('click', function () { answer(o[0]); });
      opts.appendChild(b);
    });
    var x = document.createElement('button');
    x.type = 'button'; x.className = 'x'; x.setAttribute('aria-label', 'Close'); x.textContent = '✕';
    x.addEventListener('click', dismiss);
    var no = document.createElement('button');
    no.type = 'button'; no.className = 'no'; no.textContent = 'No thanks';
    no.addEventListener('click', dismiss);

    card.appendChild(x); card.appendChild(h); card.appendChild(p); card.appendChild(opts); card.appendChild(no);
    document.body.appendChild(card);
    requestAnimationFrame(function () { requestAnimationFrame(function () { card.classList.add('on'); }); });
  }

  if (preview) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
    else show();
    return;
  }

  // Count visible time only, so a backgrounded tab does not trigger it.
  var visibleMs = 0, last = Date.now();
  var timer = setInterval(function () {
    var now = Date.now();
    if (!document.hidden) visibleMs += now - last;
    last = now;
    if (visibleMs >= SHOW_AFTER_MS) { clearInterval(timer); show(); }
  }, 1000);
})();
