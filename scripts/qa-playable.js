#!/usr/bin/env node
// Is every active game actually PLAYABLE, not merely present?
//
// This exists because the analytics funnel cannot answer the question. As
// play-new.js notes, an iframe's `load` event fires when the OUTER frame
// document loads, which proves nothing about the game inside it. Most games here
// are reached through a GameList stub that iframes a gamelist{N} shard, so the
// stub answering 200 makes iframe_loaded report success while the real game is a
// 404. That is exactly how six games (Idle Mining Empire, Iron Snout, Moto X3M
// 2/3 on the deleted tbg95.github.io, plus Eggy Car and Jelly Truck on Google's
// retired gadget proxy) sat broken without any signal.
//
// So follow each game to the URL the browser really ends up fetching — reading
// the local stub to find its target — and check THAT. Run it periodically: these
// games depend on third-party hosts that vanish without warning.
//
// Usage: node scripts/qa-playable.js
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = 'd:/UBGHyper';
const GAMES_JSON = path.join(ROOT, 'UBGHyper.github.io/assets/games.json');
const GAMELIST = path.join(ROOT, 'GameList.github.io');
const CONCURRENCY = 6;

const all = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'));
const games = all.filter(g => g && g.url && g.status !== 'broken');
// Games already carrying a statusnote are known-bad and shown separately. A check
// that keeps reporting breakage you have already acknowledged trains you to ignore
// it, so only UNFLAGGED failures are treated as findings.
const flagged = new Set(all.filter(g => g.status === 'buggy').map(g => g.url));

function shardBase(g) {
  const s = g.shard || 'GameList.github.io';
  return s.includes('://') ? s.replace(/\/$/, '') : `https://ubghyper.github.io/${s}`;
}

// Read the local stub to find where it actually points.
function resolveTarget(g) {
  const direct = `${shardBase(g)}/${g.url}/`;
  if (g.shard) return { url: direct, kind: 'shard-direct' };
  const stub = path.join(GAMELIST, g.url, 'index.html');
  if (!fs.existsSync(stub)) return { url: direct, kind: 'NO-LOCAL-FOLDER' };
  const html = fs.readFileSync(stub, 'utf8');
  const m = html.match(/<iframe[^>]+src="(https?:\/\/[^"]+)"/i);
  if (m) return { url: m[1], kind: 'stub->' + new URL(m[1]).hostname.split('.')[0] };
  // localBytes lets the caller tell "this folder serves 200" apart from "this
  // folder serves what we actually have" — see the sync check below.
  return { url: direct, kind: 'self-contained', localBytes: Buffer.byteLength(html) };
}

function check(url) {
  return new Promise(resolve => {
    let done = false;
    const finish = v => { if (!done) { done = true; resolve(v); } };
    const req = https.get(url, { headers: { 'User-Agent': 'ubghyper-livecheck' } }, res => {
      const code = res.statusCode;
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume();
        return finish({ code, redirect: res.headers.location });
      }
      let bytes = 0;
      res.on('data', c => { bytes += c.length; if (bytes > 4096) req.destroy(); });
      res.on('end', () => finish({ code, bytes }));
      res.on('close', () => finish({ code, bytes }));
    });
    req.on('error', e => finish({ code: 0, err: e.code || e.message }));
    req.setTimeout(20000, () => { req.destroy(); finish({ code: 0, err: 'timeout' }); });
  });
}

(async () => {
  const targets = games.map(g => ({ g, ...resolveTarget(g) }));
  const results = [];
  let i = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < targets.length) {
      const t = targets[i++];
      const r = await check(t.url);
      results.push({ ...t, ...r });
      if (results.length % 50 === 0) process.stderr.write(`  ${results.length}/${targets.length}\n`);
    }
  }));

  const bad = results.filter(r => r.code !== 200);
  const knownBad = bad.filter(r => flagged.has(r.g.url));
  const newBad = bad.filter(r => !flagged.has(r.g.url));

  // A self-contained game's folder answering 200 proves the folder exists, not
  // that it serves the game we have locally — which is the same "stub answers
  // 200" trap this script exists to avoid, one level up. It matters most right
  // after a game is repaired: the fix sits in the shard working copy, the live
  // folder still serves the old dead stub, and the size check here is the only
  // thing that notices. Compare against the 4 KB read cap, since that is all
  // check() collects.
  // check() stops reading at 4 KB but counts whole chunks, so a live response
  // reported as 16384 only means "at least 4096" — it is truncated, not sized.
  // Comparing a truncated live read against a truncated local size is therefore
  // meaningless, and doing so flagged seven perfectly healthy games. Only judge
  // when at least one side is known exactly:
  //   both complete            -> compare directly
  //   live complete, local big -> live is smaller than local's first 4 KB, so
  //                               it cannot be the same file
  //   both truncated           -> unknowable, say nothing
  const CAP = 4096;
  const drifted = results.filter(r => {
    if (r.kind !== 'self-contained' || r.code !== 200 || !r.localBytes) return false;
    const liveComplete = r.bytes < CAP;
    const localComplete = r.localBytes < CAP;
    if (liveComplete && localComplete) {
      return Math.abs(r.bytes - r.localBytes) / r.localBytes > 0.2;
    }
    if (liveComplete && !localComplete) return true;
    return false;
  });

  console.log(`\nChecked ${results.length} active games.`);
  console.log(`  playable        ${results.length - bad.length}`);
  console.log(`  known broken    ${knownBad.length}  (already flagged buggy with a statusnote)`);
  console.log(`  NEW BREAKAGE    ${newBad.length}`);
  console.log(`  shard out of sync ${drifted.length}  (local copy differs from what is deployed)\n`);
  if (knownBad.length) console.log('  known: ' + knownBad.map(r => r.g.url).join(', ') + '\n');

  if (drifted.length) {
    console.log(`── Local shard copy not deployed  (${drifted.length})`);
    console.log('   These answer 200, so they look playable, but the live bytes do not');
    console.log('   match the local index.html. Push GameList.github.io, then re-pin:');
    console.log('   gen-cdn-manifest.js -> gen-play-shell.js\n');
    for (const d of drifted.slice(0, 20)) {
      console.log(`   local ${String(d.localBytes).padStart(6)}b  live ${String(d.bytes).padStart(5)}b   ${d.g.url}`);
    }
    if (drifted.length > 20) console.log(`   ...and ${drifted.length - 20} more`);
    console.log('');
  }

  if (newBad.length) {
    const byKind = {};
    for (const b of newBad) (byKind[b.kind] ||= []).push(b);
    for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
      console.log(`── ${kind}  (${list.length})`);
      for (const b of list.slice(0, 40)) {
        console.log(`   ${String(b.code || b.err).padEnd(8)} ${b.g.url.padEnd(34)} ${b.url.replace('https://', '').slice(0, 72)}`);
      }
      if (list.length > 40) console.log(`   ...and ${list.length - 40} more`);
    }
  }
  fs.writeFileSync(path.join(__dirname, 'playable-report.json'), JSON.stringify({
    checkedAt: new Date().toISOString(),
    newBad: newBad.map(r => r.g.url),
    knownBad: knownBad.map(r => r.g.url),
    drifted: drifted.map(r => r.g.url),
    results,
  }, null, 1));
  console.log(newBad.length
    ? `\n${newBad.length} NEW broken game(s) — flag them buggy with a statusnote, or replace the build.`
    : drifted.length
      ? `\nNo new breakage, but ${drifted.length} game(s) are not deployed yet. Report -> scripts/playable-report.json`
      : '\nNo new breakage. Report -> scripts/playable-report.json');
  // Non-zero only for unacknowledged breakage, so this is safe to run on a timer.
  process.exitCode = newBad.length ? 1 : 0;
})();
