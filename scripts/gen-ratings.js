#!/usr/bin/env node
// Snapshots live Firestore rating aggregates into assets/ratings.json.
// gen-game-pages.js reads that file and bakes AggregateRating into each game's
// VideoGame schema (only for games at/above RATING_THRESHOLD votes — see that
// file), so real review stars can appear in search results.
//
// Run periodically and commit:  node scripts/gen-ratings.js
// (then re-run gen-game-pages.js and push). A GitHub Action cron can automate this.
//
// Reads config from assets/firebase-config.json. Reads are public per firestore.rules,
// so no service-account key is needed.

const fs   = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const cfg  = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'firebase-config.json'), 'utf8'));

// Only snapshot ratings for slugs that are real, active games. This drops any
// stray/test docs (e.g. health-check writes) so they can never bake into schema.
const validSlugs = new Set(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'games.json'), 'utf8'))
    .filter(g => g && g.url && g.status !== 'broken')
    .map(g => g.url)
);

if (!cfg.projectId || cfg.projectId.startsWith('YOUR_')) {
  console.log('Firebase not configured (assets/firebase-config.json) — leaving ratings.json unchanged.');
  process.exit(0);
}

const base = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/ratings`;

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

function num(v) {
  if (!v) return 0;
  if (v.integerValue != null) return parseFloat(v.integerValue);
  if (v.doubleValue  != null) return parseFloat(v.doubleValue);
  return 0;
}

(async () => {
  const out = {};
  let pageToken = '';
  try {
    do {
      const url = `${base}?pageSize=300&key=${cfg.apiKey}` + (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '');
      const j = await getJson(url);
      if (j.error) { console.error('Firestore error:', j.error.message); process.exit(1); }
      for (const doc of (j.documents || [])) {
        const slug = doc.name.split('/').pop();
        if (!validSlugs.has(slug)) continue; // skip stray/test docs and removed games
        const f = doc.fields || {};
        const sum = num(f.sum), count = num(f.count);
        if (count > 0) out[slug] = { sum, count, avg: +(sum / count).toFixed(2) };
      }
      pageToken = j.nextPageToken || '';
    } while (pageToken);
  } catch (e) {
    console.error('Failed to fetch ratings:', e.message);
    process.exit(1);
  }

  fs.writeFileSync(path.join(ROOT, 'assets', 'ratings.json'), JSON.stringify(out));
  console.log(`Wrote assets/ratings.json with ${Object.keys(out).length} rated games. Now run gen-game-pages.js.`);
})();
