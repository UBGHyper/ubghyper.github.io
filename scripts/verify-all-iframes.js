#!/usr/bin/env node
// For every game in games.json, find its local wrapper index.html, extract the
// EXACT iframe src (no normalization, no trailing-slash modification), and
// GET-check it. Report any that don't return 200.
const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_JSON = 'C:/UBGHyper/UBGHyper.github.io/assets/games.json';
const GAMELIST_DIR = 'C:/UBGHyper/Games/GameList.github.io';

function checkOnce(url) {
  return new Promise(resolve => {
    const req = https.get(url, { headers: { 'User-Agent': 'ubghyper-verify' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        res.resume();
        return resolve({ code: res.statusCode, redirect: res.headers.location });
      }
      let bytes = 0;
      res.on('data', c => { bytes += c.length; if (bytes > 200) req.destroy(); });
      res.on('end', () => resolve({ code: res.statusCode, bytes }));
      res.on('close', () => resolve({ code: res.statusCode, bytes }));
    });
    req.on('error', e => resolve({ code: 0, err: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ code: 0, err: 'timeout' }); });
  });
}
async function check(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await checkOnce(url);
    if (r.code === 200) return r;
    if (r.code >= 400 && r.code < 500) return r; // hard 4xx -> trust it
    await new Promise(r => setTimeout(r, 800));
  }
  return await checkOnce(url);
}

(async () => {
  const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'));
  console.log(`Verifying ${games.length} games...\n`);

  const noLocalFolder = [];
  const noIframeButFolder = [];
  const broken = [];
  const ok = [];

  const tasks = games.map(g => async () => {
    const dir = path.join(GAMELIST_DIR, g.url);
    if (!fs.existsSync(dir)) { noLocalFolder.push(g.url); return; }
    const idx = path.join(dir, 'index.html');
    if (!fs.existsSync(idx)) { noLocalFolder.push(g.url); return; }
    const html = fs.readFileSync(idx, 'utf8');
    const m = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
    if (!m) { noIframeButFolder.push(g.url); return; }
    const url = m[1];
    if (!/^https?:\/\//.test(url)) { noIframeButFolder.push(g.url + ` (relative: ${url})`); return; }
    const r = await check(url);
    if (r.code === 200) ok.push(g.url);
    else broken.push({ url: g.url, iframeSrc: url, ...r });
  });

  // Run with limited parallelism
  let i = 0;
  const PARALLEL = 5;
  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      await tasks[idx]();
      if (idx % 50 === 0 && idx > 0) process.stdout.write(`  ...${idx}/${tasks.length}\r`);
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker));
  console.log(`  ...${tasks.length}/${tasks.length}    `);

  console.log(`\n=== RESULTS ===`);
  console.log(`OK (iframe loads 200):       ${ok.length}`);
  console.log(`Self-hosted (no iframe):      ${noIframeButFolder.length}`);
  console.log(`Missing local folder:         ${noLocalFolder.length}`);
  console.log(`BROKEN iframes:              ${broken.length}`);
  if (noLocalFolder.length) {
    console.log(`\n--- Missing local folder ---`);
    for (const u of noLocalFolder) console.log(`  ${u}`);
  }
  if (broken.length) {
    console.log(`\n--- BROKEN ---`);
    for (const b of broken) console.log(`  ${b.url}: ${b.iframeSrc} (${b.code} ${b.err || ''})`);
  }
})();
