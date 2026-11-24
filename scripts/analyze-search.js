#!/usr/bin/env node
/* GROW-008 — Search Console coverage and brand classification.
 *
 *   node scripts/analyze-search.js [dir]      (default: data/search)
 *
 * Reads a Search Console "Performance on Search" export. The DATA is private and
 * stays under gitignored data/; the CLASSIFIER lives here, in version control,
 * because the measurement spec requires the brand rule set to be versioned — a
 * non-brand number computed with unstated rules is not comparable to itself.
 *
 * The headline rule this enforces: the query export never covers all charted
 * clicks, so "non-brand clicks" must always be reported beside its coverage and
 * the unexplained remainder. Otherwise a coverage change reads as a demand change.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = process.argv[2] || path.join(__dirname, '..', 'data', 'search');

// ── Brand classifier ──────────────────────────────────────────────────
// Bump CLASSIFIER_VERSION on ANY rule change and re-state which version a
// reported figure used. Do not silently re-classify history.
const CLASSIFIER_VERSION = 'brand_v1';

const norm = q => String(q || '').toLowerCase().replace(/[^a-z0-9]/g, '');

function classifyQuery(q) {
  const n = norm(q);
  // The brand is "UBGHyper". Accept the common transpositions and misspellings
  // seen in the export: ugbhyper, ubg hyber, ubghypr, ubg hyper.
  const hasUbg   = /(ubg|ugb|ubj)/.test(n);
  const hasHyper = /(hyper|hyber|hypr|hype|hyoer|huper)/.test(n);
  if (/(ubg|ugb|ubj)(hyper|hyber|hypr|hype|hyoer|huper)/.test(n)) return 'brand';
  if (hasUbg && hasHyper) return 'brand';
  // "hypertunnel" is a different product of ours; count it separately so it
  // never inflates or deflates the site's brand demand.
  if (/hypertunnel/.test(n)) return 'sibling_brand';
  // "ubg games", "ubg", "cool ubg" — brand-ish token without the brand name.
  // The spec requires these be reported separately, not folded either way.
  if (hasUbg) return 'ambiguous';
  return 'non_brand';
}

// ── CSV ───────────────────────────────────────────────────────────────
function readCsv(file) {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) return null;
  const lines = fs.readFileSync(p, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
  const head = splitRow(lines[0]);
  return lines.slice(1).map(l => {
    const cells = splitRow(l);
    const row = {};
    head.forEach((h, i) => { row[h.trim()] = (cells[i] || '').trim(); });
    return row;
  });
}
function splitRow(line) {
  const out = []; let cur = '', q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
const num = v => Number(String(v || '0').replace(/[^0-9.-]/g, '')) || 0;
const pct = (a, b) => (b ? (a / b * 100) : 0).toFixed(1) + '%';
const fmt = n => n.toLocaleString('en-US');

// ── Load ──────────────────────────────────────────────────────────────
const chart = readCsv('Chart.csv');
const queries = readCsv('Queries.csv');
const pages = readCsv('Pages.csv');
const devices = readCsv('Devices.csv');
if (!chart || !queries) {
  console.error(`No export found in ${DIR}. Unzip the Search Console export there.`);
  process.exit(1);
}

const col = (row, ...names) => { for (const n of names) if (row[n] !== undefined) return row[n]; return ''; };

const chartClicks = chart.reduce((s, r) => s + num(col(r, 'Clicks')), 0);
const chartImpr   = chart.reduce((s, r) => s + num(col(r, 'Impressions')), 0);
const days        = chart.length;
const first = col(chart[0], 'Date'), last = col(chart[chart.length - 1], 'Date');

// ── Coverage ──────────────────────────────────────────────────────────
const qRows = queries.map(r => ({
  q: col(r, 'Top queries', 'Query'),
  clicks: num(col(r, 'Clicks')),
  impressions: num(col(r, 'Impressions')),
  position: num(col(r, 'Position')),
}));
const visibleClicks = qRows.reduce((s, r) => s + r.clicks, 0);
const hiddenClicks = chartClicks - visibleClicks;

console.log('═'.repeat(64));
console.log(`SEARCH COVERAGE AND BRAND MIX   (${first} → ${last}, ${days} days)`);
console.log(`classifier: ${CLASSIFIER_VERSION}`);
console.log('═'.repeat(64));
console.log(`\nTotal charted clicks        ${fmt(chartClicks).padStart(10)}`);
console.log(`Total charted impressions   ${fmt(chartImpr).padStart(10)}`);
console.log(`Visible query-export clicks ${fmt(visibleClicks).padStart(10)}`);
console.log(`Hidden / unrepresented      ${fmt(hiddenClicks).padStart(10)}   ← cannot be classified from this export`);
console.log(`QUERY CLASSIFICATION COVERAGE ${pct(visibleClicks, chartClicks).padStart(8)}`);
console.log(`Visible queries             ${fmt(qRows.length).padStart(10)}`);

// ── Brand mix ─────────────────────────────────────────────────────────
const buckets = {};
for (const r of qRows) {
  const c = classifyQuery(r.q);
  (buckets[c] = buckets[c] || { clicks: 0, impressions: 0, queries: [] });
  buckets[c].clicks += r.clicks;
  buckets[c].impressions += r.impressions;
  buckets[c].queries.push(r);
}
console.log(`\n${'BUCKET'.padEnd(16)}${'CLICKS'.padStart(10)}${'% VISIBLE'.padStart(11)}${'% CHARTED'.padStart(11)}${'IMPRESSIONS'.padStart(13)}`);
console.log('─'.repeat(64));
for (const k of ['brand', 'ambiguous', 'non_brand', 'sibling_brand']) {
  const b = buckets[k]; if (!b) continue;
  console.log(
    k.padEnd(16) + fmt(b.clicks).padStart(10) +
    pct(b.clicks, visibleClicks).padStart(11) +
    pct(b.clicks, chartClicks).padStart(11) +
    fmt(b.impressions).padStart(13)
  );
}
console.log('─'.repeat(64));
console.log('unclassifiable'.padEnd(16) + fmt(hiddenClicks).padStart(10) + ''.padStart(11) + pct(hiddenClicks, chartClicks).padStart(11));

// ── Non-brand detail: the growth surface ──────────────────────────────
const nb = (buckets.non_brand || { queries: [] }).queries.sort((a, b) => b.clicks - a.clicks);
console.log(`\nTOP NON-BRAND QUERIES  (${nb.length} distinct, ${fmt((buckets.non_brand||{clicks:0}).clicks)} clicks)`);
console.log(`${'QUERY'.padEnd(38)}${'CLICKS'.padStart(8)}${'IMPR'.padStart(9)}${'POS'.padStart(7)}`);
for (const r of nb.slice(0, 20)) {
  console.log(r.q.slice(0, 37).padEnd(38) + fmt(r.clicks).padStart(8) + fmt(r.impressions).padStart(9) + r.position.toFixed(1).padStart(7));
}

// Non-brand demand that exists but does not convert: high impressions, no clicks.
const missed = qRows.filter(r => classifyQuery(r.q) === 'non_brand' && r.clicks === 0 && r.impressions >= 50)
  .sort((a, b) => b.impressions - a.impressions);
if (missed.length) {
  console.log(`\nNON-BRAND DEMAND WITH ZERO CLICKS  (${missed.length} queries, ${fmt(missed.reduce((s, r) => s + r.impressions, 0))} impressions)`);
  console.log(`${'QUERY'.padEnd(38)}${'IMPR'.padStart(9)}${'POS'.padStart(7)}`);
  for (const r of missed.slice(0, 15)) {
    console.log(r.q.slice(0, 37).padEnd(38) + fmt(r.impressions).padStart(9) + r.position.toFixed(1).padStart(7));
  }
}

// ── Page concentration ────────────────────────────────────────────────
if (pages) {
  const pRows = pages.map(r => ({
    url: col(r, 'Top pages', 'Page'),
    clicks: num(col(r, 'Clicks')),
    impressions: num(col(r, 'Impressions')),
    ctr: num(col(r, 'CTR')),
    position: num(col(r, 'Position')),
  })).sort((a, b) => b.impressions - a.impressions);
  const pClicks = pRows.reduce((s, r) => s + r.clicks, 0);
  console.log(`\nPAGE CONCENTRATION  (${pRows.length} rows — NOT an index-coverage report)`);
  console.log(`${'PAGE'.padEnd(44)}${'CLICKS'.padStart(8)}${'IMPR'.padStart(9)}${'CTR'.padStart(8)}${'POS'.padStart(6)}`);
  for (const r of pRows) {
    console.log(r.url.replace('https://ubghyper.github.io', '').slice(0, 43).padEnd(44) +
      fmt(r.clicks).padStart(8) + fmt(r.impressions).padStart(9) +
      (r.ctr.toFixed(2) + '%').padStart(8) + r.position.toFixed(1).padStart(6));
  }
  const home = pRows.find(r => /\/$/.test(r.url));
  if (home) console.log(`\nHome page share of listed clicks: ${pct(home.clicks, pClicks)}`);

  // Utility pages earning impressions but no clicks are a ranking liability.
  const util = pRows.filter(r => /(favorites|saves|stats|about)\.html/.test(r.url));
  const utilImpr = util.reduce((s, r) => s + r.impressions, 0);
  const utilClicks = util.reduce((s, r) => s + r.clicks, 0);
  if (util.length) {
    console.log(`Utility pages (about/favorites/saves/stats): ${fmt(utilImpr)} impressions → ${fmt(utilClicks)} clicks (CTR ${pct(utilClicks, utilImpr)})`);
  }
  const gamePages = pRows.filter(r => /\/games\//.test(r.url));
  console.log(`Game pages appearing at all: ${gamePages.length}  (${fmt(gamePages.reduce((s, r) => s + r.clicks, 0))} clicks)`);
}

// ── Trend: matched complete weeks only ────────────────────────────────
console.log('\nIMPRESSION TREND');
const byDate = chart.map(r => ({ d: col(r, 'Date'), c: num(col(r, 'Clicks')), i: num(col(r, 'Impressions')) }))
  .sort((a, b) => a.d.localeCompare(b.d));
const seg = (from, to) => {
  const rows = byDate.filter(r => r.d >= from && r.d <= to);
  if (!rows.length) return null;
  return {
    days: rows.length,
    clicks: rows.reduce((s, r) => s + r.c, 0),
    impr: rows.reduce((s, r) => s + r.i, 0),
  };
};
const early = seg(byDate[0].d, '2026-05-15');
const late = seg('2026-05-16', byDate[byDate.length - 1].d);
for (const [label, s] of [['through 15 May', early], ['from 16 May', late]]) {
  if (!s) continue;
  console.log(`  ${label.padEnd(16)} ${String(s.days).padStart(3)} days   ${fmt(Math.round(s.impr / s.days)).padStart(6)} impr/day   ${fmt(Math.round(s.clicks / s.days)).padStart(5)} clicks/day`);
}
if (early && late) {
  const drop = (1 - (late.impr / late.days) / (early.impr / early.days)) * 100;
  console.log(`  impressions/day change: ${drop > 0 ? '-' : '+'}${Math.abs(drop).toFixed(1)}%`);
  console.log('  NOTE: directional only. Segments are unmatched calendar periods spanning');
  console.log('        a school-term boundary; use matched complete weeks for any decision.');
}

if (devices) {
  console.log('\nDEVICE MIX');
  for (const r of devices) {
    console.log(`  ${col(r, 'Device').padEnd(10)} ${fmt(num(col(r, 'Clicks'))).padStart(7)} clicks   ${fmt(num(col(r, 'Impressions'))).padStart(8)} impr   pos ${num(col(r, 'Position')).toFixed(1)}`);
  }
}
console.log('');
