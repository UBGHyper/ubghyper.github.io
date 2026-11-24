#!/usr/bin/env node
/* Synthetic-test network guard (GROW-003).
 *
 * Automated checks must never create analytics, ad, affiliate or promotion
 * traffic. Every node-based checker in this repo routes its requests through
 * `guardedFetch` / `assertAllowed` here, so a prohibited host raises instead of
 * quietly generating a real impression, click or page view in production data.
 *
 * The blocklist is also the contract that `qa-isolation.js` enforces: it scans
 * the whole repo for external hosts and fails if one is neither listed here nor
 * explicitly classified as benign. A newly added ad network therefore cannot
 * silently escape the guard — the QA fails until someone classifies it.
 *
 * No dependencies: this repo has no npm, no package.json, no build step.
 */
'use strict';

// Hosts that must never be requested by an automated check.
const PROHIBITED = {
  analytics: [
    'google-analytics.com',
    'analytics.google.com',
    'googletagmanager.com',
    'stats.g.doubleclick.net',
  ],
  ads: [
    'monetag.com',         // ad network — integration removed 2026-08-01, kept blocked
    'a-ads.com',
    'ad.a-ads.com',
    'acceptable.a-ads.com',
    'omg10.com',           // Monetag direct link (popunder removed 2026-08-01)
    'nap5k.com',           // Monetag tag
    'acscdn.com',          // Adcash library
    'adcash.com',
    'doubleclick.net',
    'googlesyndication.com',
    'legal.clickio.com',   // Clickio ad network — rejected the site 2026-09-25, kept blocked
    'ss.mrmnd.com',        // Mondiad — live banner.js loader (rail/billboard/strip/mobile units)
    'mondiad.com',         // Mondiad — privacy policy link on privacy.html (members.mondiad.com)
    'highrevenueformat.com', // Adsterra — invoke.js banner loader, inside /assets/ads/adsterra.html
    'adsterra.com',        // Adsterra — privacy policy link on privacy.html
    'pubfuture-ssp.com',   // Pubfuture — pt.js loader (cdn.pubfuture-ssp.com), sidebar 300x250 unit
    'pubfuture.com',       // Pubfuture — dashboard / privacy links
    'rlcdn.com',           // LiveRamp identity sync, called by Pubfuture's account bundle
    'px-sync.com',         // traffic-quality (IVT) check, called by Pubfuture's script
    'cmp.inmobi.com',      // InMobi Choice — The Moneytizer's consent manager (scripts/inmobi-cmp.html)
  ],
  affiliate: [
    'g2a.com',
    'admitad.com',
    'ad.admitad.com',
  ],
  promotion: [
    'hypertunnel.github.io',
  ],
  // Production data stores. A synthetic check that reached these would write
  // fake star ratings into the live aggregate — contaminating the very data
  // gen-ratings.js bakes into VideoGame schema.
  backend: [
    'firestore.googleapis.com',
  ],
};

// External hosts that are legitimate for a black-box check to request.
// Game assets and the site itself are the whole point of an availability check.
const BENIGN = [
  'ubghyper.github.io',
  // Our own Render mirror, linked as the "blocked at school?" backup.
  'ubghyper.onrender.com',
  // GitHub's file hosts, used by the local download tooling (scripts/mirror-gh.js, make-parts-page.js).
  'raw.githubusercontent.com',
  'media.githubusercontent.com',
  // Community invite linked from the nav on every page (replaced the
  // HyperTunnel link on 2026-08-26). A plain outbound <a href>, not an embed:
  // no ad, analytics or affiliate value for a synthetic check to contaminate.
  'discord.gg',
  // The owner's VPN app, teased in the nav next to Discord (2026-10-24). A plain outbound <a href>.
  'isotunnel.com',
  // Numbered game shards (gamelist2…9) live on this account. Game assets, not
  // tracking — a black-box availability check must be able to reach them.
  'freeonlinewebtools.github.io',
  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'schema.org',
  'www.google.com',        // Search Console verification / schema references
  'github.com',
  'www.sitemaps.org',
  'www.w3.org',
  // Tab-disguise (camo) favicons — cosmetic images, no tracking value
  'ssl.gstatic.com',
  'cdn.kastatic.org',
  'desmos.com',
  // Chart.js for the stats page, lazy-loaded
  'cdn.jsdelivr.net',
  // jsDelivr's file-listing API. Used only by the local scripts/add-game.js tool
  // to see which files a GitHub web port has (and their sizes) before pinning it;
  // the site itself never requests it.
  'data.jsdelivr.com',
  // Referenced in page copy / credits only, never fetched by the site
  'ruffle.rs',
  'forms.gle',
  'semver.org',
  'optout.aboutads.info',  // ad-industry opt-out information page, not an ad server

  // Third-party origins that a handful of games iframe directly instead of
  // being hosted on our own shards. Game content, not tracking. These were
  // always live dependencies but only became visible to this scanner when
  // cdn-manifest.json started recording each external game's real target.
  // Two are already dead and their games are broken — see the manifest's
  // `external` rows:
  'play.fancade.com',
  'serve.app.playsaurus.com',
  'googleusercontent.b-cdn.net',
  // 2026-10-03: web ports other people host on their own github.io, iframed straight from
  // our GameList wrappers rather than copied into a shard (Sonic ports, Super Star Car,
  // Unicycle Hero). Live dependencies like the ones above: if the owner deletes the repo the
  // game dies, so qa-playable.js is what catches that. Unicycle Hero's page loads the Poki
  // SDK itself - an ad network inside the frame, which we can't strip from someone else's host.
  'clarkeadg.github.io',
  'grubbyplaya.github.io',
  'tws2401.github.io',
  'chromaticpipe.github.io',
  'vinmannie.github.io',
  '23azostore.github.io',
  'unicycleheroonline.github.io',
  'tbg95.github.io',                        // DEAD (404) — was breaking 4 games
  'google-opensocial.googleusercontent.com', // DEAD — retired gadget proxy
  'images-opensocial.googleusercontent.com', // DEAD — retired gadget proxy

  // Source mirror that recover-game.js pulls dead games back from. Referenced
  // by that script only — nothing the site serves depends on it, because the
  // whole point of the tool is to copy the build into our own shard and stop
  // depending on someone else's host. Its copies ship Poki, Y8 and Google IMA
  // ad SDKs; recover-game.js strips all three on the way in.
  'classroom8.github.io',
];

const ALL_PROHIBITED = Object.values(PROHIBITED).flat();

function hostOf(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); }
  catch (e) { return null; }
}

function matches(host, list) {
  if (!host) return false;
  const h = host.toLowerCase().replace(/^www\./, '');
  return list.some(entry => {
    const e = entry.toLowerCase().replace(/^www\./, '');
    return h === e || h.endsWith('.' + e);
  });
}

function classify(host) {
  for (const [category, list] of Object.entries(PROHIBITED)) {
    if (matches(host, list)) return { allowed: false, category };
  }
  if (matches(host, BENIGN)) return { allowed: true, category: 'benign' };
  return { allowed: false, category: 'unclassified' };
}

/** Throws if the URL must not be requested by an automated check. */
function assertAllowed(url) {
  const host = hostOf(url);
  if (!host) throw new Error(`net-guard: unparseable URL ${url}`);
  const verdict = classify(host);
  if (!verdict.allowed) {
    throw new Error(
      `net-guard: BLOCKED ${verdict.category} host "${host}" (${url}). ` +
      `Automated checks must not generate analytics/ad/affiliate/promotion traffic. ` +
      `If this host is safe for black-box checks, add it to BENIGN in scripts/lib/net-guard.js.`
    );
  }
  return true;
}

/** fetch() that refuses prohibited hosts, and refuses to follow redirects into one. */
async function guardedFetch(url, options = {}) {
  assertAllowed(url);
  const res = await fetch(url, { ...options, redirect: 'manual' });
  const location = res.headers.get('location');
  if (location) {
    const next = new URL(location, url).toString();
    assertAllowed(next);                       // a redirect must not smuggle us into an ad host
    if (options.followRedirects !== false) return guardedFetch(next, options);
  }
  return res;
}

module.exports = { PROHIBITED, BENIGN, ALL_PROHIBITED, hostOf, matches, classify, assertAllowed, guardedFetch };
