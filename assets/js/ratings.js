// ── Real cross-user star ratings via Firestore REST API ───────────────
// No SDK, no build step. Reads the live aggregate (sum, count) for the current
// game and lets each device cast one vote. Config comes from
// /assets/firebase-config.json: { projectId, apiKey } (the web API key is a
// public identifier — security is enforced by Firestore rules, see firestore.rules).
//
// The build script scripts/gen-ratings.js snapshots these aggregates into
// assets/ratings.json, which gen-game-pages.js bakes into each page's
// AggregateRating schema (so real review stars can appear in search results).
//
// Coexists with the existing star widget in play.js: play.js handles the local
// visual state; this module submits the vote to Firestore and shows the average.
(function () {
  var slug = window.gameUrl;
  if (!slug) return;

  var cfg, FS, aggEl;
  var VOTED_KEY = 'ubg_rated';

  function num(v) {
    if (!v) return 0;
    if (v.integerValue != null) return parseFloat(v.integerValue);
    if (v.doubleValue != null) return parseFloat(v.doubleValue);
    return 0;
  }

  function render(sum, count) {
    if (!aggEl) return;
    if (count > 0) {
      aggEl.textContent = '★ ' + (sum / count).toFixed(1) + ' · ' + count + ' rating' + (count === 1 ? '' : 's');
      aggEl.hidden = false;
    } else {
      aggEl.textContent = 'Be the first to rate this game';
      aggEl.hidden = false;
    }
  }

  function readDoc() {
    return fetch(FS + '/ratings/' + encodeURIComponent(slug) + '?key=' + cfg.apiKey)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.fields) return { sum: num(d.fields.sum), count: num(d.fields.count) };
        return { sum: 0, count: 0 };
      })
      .catch(function () { return { sum: 0, count: 0 }; });
  }

  function submitVote(stars) {
    var body = {
      writes: [{
        transform: {
          document: 'projects/' + cfg.projectId + '/databases/(default)/documents/ratings/' + slug,
          fieldTransforms: [
            { fieldPath: 'sum',   increment: { integerValue: String(stars) } },
            { fieldPath: 'count', increment: { integerValue: '1' } }
          ]
        }
      }]
    };
    return fetch(FS + ':commit?key=' + cfg.apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }

  function votedStore() { try { return JSON.parse(localStorage.getItem(VOTED_KEY) || '{}'); } catch (e) { return {}; } }
  function hasVoted()    { return !!votedStore()[slug]; }
  function markVoted(n)  { try { var s = votedStore(); s[slug] = n; localStorage.setItem(VOTED_KEY, JSON.stringify(s)); } catch (e) {} }

  function init() {
    aggEl = document.getElementById('rateAggregate');
    readDoc().then(function (d) { render(d.sum, d.count); });

    document.querySelectorAll('.star-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (hasVoted()) return;                 // one vote per device per game
        var n = +btn.dataset.star;
        if (!(n >= 1 && n <= 5)) return;
        markVoted(n);
        readDoc().then(function (d) {
          render(d.sum + n, d.count + 1);       // optimistic update
          submitVote(n).catch(function () {});
        });
      });
    });
  }

  fetch('/assets/firebase-config.json')
    .then(function (r) { return r.json(); })
    .then(function (c) {
      if (!c || !c.projectId || c.projectId.indexOf('YOUR_') === 0) return; // not configured yet
      cfg = c;
      FS = 'https://firestore.googleapis.com/v1/projects/' + cfg.projectId + '/databases/(default)/documents';
      if (document.readyState !== 'loading') init();
      else document.addEventListener('DOMContentLoaded', init);
    })
    .catch(function () { /* offline / not configured — widget stays local-only */ });
})();
