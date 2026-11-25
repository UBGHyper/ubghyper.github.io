'use strict';
// Keyword landing pages kept OUT of Google's index (2026-11-25, after the November 2026 core update).
//
// These pages are named after other unblocked-games sites. Together they earned < 4 clicks a day
// (Search Console, Aug-Nov 2026: UG 76 224 clicks in 3 months, Premium 51, 66 40, the rest 0) and
// Google had already filed 77 and Premium as "Crawled - currently not indexed". A set of near-identical
// pages built around other sites' names is what Google's spam policies call doorway pages, and
// site-wide quality systems can hold the whole domain back for them.
//
// They stay online (old links and bookmarks keep working) with <meta name="robots" content="noindex,follow">,
// are left out of sitemap.xml, and game pages no longer link to them. Read by gen-landing-pages.js
// (robots tag) and gen-game-pages.js (sitemap, explore links). To bring one back, remove it here and
// regenerate.
module.exports = new Set([
  'unblocked-games-66',
  'unblocked-games-67',
  'unblocked-games-6x',
  'unblocked-games-76',
  'unblocked-games-76-ez',
  'unblocked-games-77',
  'unblocked-games-911',
  'unblocked-games-999',
  'unblocked-games-wtf',
  'unblocked-games-world',
  'unblocked-games-premium',
  'tyrones-unblocked-games',
]);
