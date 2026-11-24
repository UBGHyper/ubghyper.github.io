# UBGHyper — Claude Code Context

## Project Type
Static GitHub Pages site. No framework, no build step, no Node. Pure HTML/CSS/JS.
Deploy = push to main. Live at https://ubghyper.github.io

## Architecture

### Entry Points
- `index.html` — main game browser/hub (games grid, search, filters)
- `play.html` — game player (loads iframe via query param `?game=url`)
- `about.html` — about page
- `404.html` — custom 404 (includes search bar + random game suggestion)

### Data Layer
- `assets/games.json` — single source of truth for all games (id, title, url, tags, icon, etc.)
- `assets/js/icons.js` — maps game IDs to icon paths
- `assets/js/camo.js` — URL obfuscation layer (disguises game URLs to bypass content filters)

### User Features
- `favorites.html` — localStorage-based favourites
- `saves.html` — save editor (localStorage inspection/export/import)
- `stats.html` — playtime charts, heatmap, top games (all localStorage)

### SEO
- `google23d3e6f24565b734.html` — Search Console verification
- `sitemap.xml` — submitted sitemap
- `robots.txt` — crawler rules
- `.github/workflows/indexnow.yml` — submits every `<loc>` in `sitemap.xml` to Bing/IndexNow on push. It reads the sitemap rather than keeping its own list: the previous hand-maintained version capped games at `head -500` and named 9 of 19 landing pages, so ~133 canonical URLs were never submitted. **Bing is ~45% of this site's organic sessions**, so that was the expensive half to miss.

### Analytics & promotions (consolidated 2026-07-31, funnel layer 2026-08-01)
- GA4 runs on **direct gtag only** — `G-VE9J0CCHWZ`. The GTM container `GTM-KBPRR2NP` was **empty** (`tags:[]`, `rules:[]`) and was removed from all 651 pages that carried it. **Do NOT reintroduce a GTM loader** — a second configuration surface can silently double-count every page view with no repo change to show for it.
- **`assets/js/analytics.js` is the single config owner and funnel layer.** It disables GA4's automatic page view (`send_page_view:false`) and sends exactly one manual canonical page view. Pages load it **synchronously in `<head>`, immediately after the gtag loader** — it must run before `camo.js`/`play-new.js` so it captures the real page title. If it were deferred, a camouflaged tab could report "Google Classroom" as the page title. Never move it below those scripts.
- Track events with `window.ubgTrack(name, params)` and the player helpers on `window.ubgAnalytics`. Required params per event are declared in `analytics.js`; missing ones are stamped as `param_incomplete` rather than silently dropped.
- Card impressions/clicks are **delegated** — every grid renders `<a href="/games/{slug}.html">`, so `analytics.js` instruments the home grid, shelves, category/landing pages, A–Z index and player recs without any change to `render.js`/`app.js`. Don't add per-surface tracking.
- Only slugs matching `^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$` are forwarded; anything else becomes `invalid_slug`. Never send raw search text, full referrers, or arbitrary paths to GA4.
- `TEST_MODE` (`?ubg_test=1`, `navigator.webdriver`, headless UA, localhost) buffers events locally and **sends nothing** — keep it that way so tests never pollute the property.
- Redirect stubs carry **no** GA tag (they `location.replace()` instantly); they hand their legacy slug to the destination via `sessionStorage`, and the destination reports the hop.
- Every page-type generator emits the analytics module (`gen-game-pages.js`, `gen-landing-pages.js`, `gen-cat-pages.js`). Only `ad-test.html` and the Search Console verification file are deliberately untagged.
- **Run the QA harnesses after touching analytics or ads**: `node scripts/qa-analytics.js` (119 checks), `node scripts/qa-isolation.js` (36), `node scripts/qa-links.js`. All use a stubbed DOM with no network, so they can never send analytics or ad traffic. `qa-promo.js` was **deleted on 2026-08-26** along with the promo it tested.
- Test mode is **never** switchable by URL — a `?ubg_test` style parameter would be a public, shareable, permanent ad/analytics opt-out. Use `localStorage.ubg_test = '1'` (or sessionStorage) instead. In test mode analytics.js does not configure GA4 at all.
- Automated checks must route requests through `scripts/lib/net-guard.js`, which **fails closed**: unknown hosts are blocked, as are redirects into prohibited ones. Adding any new external host to the site fails `qa-isolation.js` until it is classified as prohibited or benign — that tripwire is deliberate, so don't bypass it.
- `scripts/` has its own `package.json` (jimp, a local image tool). The "no npm/no build step" rule is about the **site**, not this folder.
- **There is NO promotion layer any more.** `assets/js/promo.js` (the HyperTunnel modal) was deleted on 2026-08-26 because HyperTunnel itself is gone; its `<script>` tag came off all 669 files (28 root + 618 game + 20 category pages + the 3 generators). Its `promo_impression` / `promo_dismiss` / `promo_click` definitions are gone from `analytics.js`, which carries a tombstone comment so they don't get re-added. `qa-deployed.js` now asserts `/assets/js/promo.js` 404s on the live site, the same way it guards the removed popunder. Never add a page-local promo.
- **`ad_script` event (2026-09-26)** — `{network: adsterra|mondiad, status: loaded|blocked}`, once per network per page view, via `window.ubgAdScript()`. Mondiad's loader tag calls it from `onload`/`onerror` (emitted by `set-ad-units.js`); each Adsterra frame calls `parent.ubgAdScript`. It measures how often ad domains are unreachable (blockers, home/school filters) — segment by OS (Chrome OS) and weekday school hours. It does NOT measure fill. The owner's home router blocks every ad domain, so local testing always shows `blocked`.
- **Ad-partner head tag (2026-10-02):** `set-ad-units.js` inlines the partner's head code at `<!-- UBG-CMP -->`, straight after the `analytics.js` tag, in `index.html` and `play.html` (so every game page). It is currently Pubfuture's request: Google Publisher Tag (`gpt.js`), which its header bidding renders through and which it serves its consent manager through. Only one CMP may be on a page, so The Moneytizer's InMobi CMP was removed (The Moneytizer rejected the site: GitHub Pages). `CMP_ENABLED` turns the block off; `--clear` removes it with the ads.
- **Ad layout review (2026-10-24).** A multi-size unit above the player won 300x250s, pushing the game 264px down (below the fold at 1280x720) and scoring CLS 0.24–0.35 on game pages. Now: `top` = pf-24489-1 on the HOMEPAGE only (game pages carry no ad above the player since 2026-11-04: its refreshes flip between 300x250 and 300x90, which moved the game 160px mid-play; the homepage box reserves 250px). Rails clip their creative to 160px (`overflow: clip`), because Pubfuture fills them with 300x600s that covered the game and widened the page. Desktop only (`ad-w728`, never requested below 760px), min-height 90 — never a fixed height, which cropped a 300x250 in testing. Phones get no ad above the game. The multi-size pf-24431-1 moved to `sidebar-top` (play.html only). Homepage phones get the fixed Adsterra 320x50 right under the top slot; the bottom billboard is gone. `COLLAPSE_TAG` (in the CMP block, so `--clear` drops it) hides an unfilled `.ad-aads` wrapper only while it is off screen; it never touches Pubfuture's own div (IO clause 2(d)). Pubfuture still fills pf-24489-1 with 300x250s until they lock it to 728x90; if they can't, a fixed-size Adsterra 728x90 iframe is the no-shift fallback. Measured with a CDP audit script (slot boxes + CLS + screenshots at 1440/1280/390): CLS game-mob 0.35→0, home-mob 0.08→0.
- **`ads.txt` is generated — never hand-edit it.** `.github/workflows/update-ads-txt.yml` rebuilds it **hourly** (was 6-hourly until 2026-10-08) from Pubfuture's ads.txt manager (account `6ab66232727ae7003ca623e6`) and appends `scripts/ads-txt-extra.txt`, which is where any other network's lines go. It refuses a download that lacks our Pubfuture DIRECT line, so a Pubfuture outage leaves the last good file in place. Pubfuture's "dynamic ads.txt" asks for a permanent 301 from /ads.txt to its hosted URL; GitHub Pages cannot send one, so this synced copy is the substitute (worst case a little over an hour behind). Missing lines mean those bidders cannot bid, so a stale file costs revenue.
- The promo exposure keys (`ubg_htp_seen`, legacy `htp_seen_v1`/`htp_seen_v2`) and `window.ubgPromoState` are dead — nothing writes or reads them now. Old visitors keep a harmless orphan localStorage key; do not add code to clear it, and do not reuse the names.

### Styling
- `assets/css/style.css` — single stylesheet, no preprocessor

### Game hosting — shards
Game files are NOT in this repo. Each lives in a separate "shard" repo under the same GitHub account. A project repo named `X` is published by GitHub Pages at `https://ubghyper.github.io/X/`, so every shard shares the site's origin and a game folder resolves to:

```
https://ubghyper.github.io/{shard}/{slug}/          ← the player iframe loads this
https://ubghyper.github.io/{shard}/{slug}/{image}   ← the thumbnail
```

- Default shard is `GameList.github.io`. A game in any other shard sets a `shard` field in its `games.json` entry (e.g. `"shard": "gamelist9.github.io"`). Entries without the field use the default, so existing games need no change.
- **Never build these URLs by hand.** Use the helpers: `gameFolder(g)` (the iframe target) and `gameThumb(g)` (the thumbnail). Defined in `assets/js/utils.js`, and duplicated in each generator + the inline script in `stats.html` — keep those copies in sync.
- A shard folder just needs `{slug}/index.html` (self-contained game) plus the thumbnail file named in `image`.
- `?cdn=PORT` on localhost points every shard at `http://localhost:PORT` for local testing. It is remembered in `sessionStorage.ubg_cdn` for the tab (grid cards link to `/games/{slug}.html` without it), and only on localhost/127.0.0.1.
- **Testing unpushed games locally:** `node scripts/serve-local-games.js` (port 5601) serves the games from disk the way the shards will once pushed: `NewGames/to-host/{slug}` first, then `GameList/{slug}`, with thumbnails falling back to `to-host/_thumbs/`. GameList wrappers that iframe a shard are pointed at the local shard clone (`/_shard/gamelistN.github.io/…`). Open the site (the owner uses VS Code Live Preview) with `?cdn=5601`. Missing files are logged by the server.
- **Pre-push guard:** `.git/hooks/pre-push` runs `scripts/check-before-push.js`. It blocks a site push that would newly list a game whose GameList folder isn't on GameList's origin, has unpushed changes, or is still staged for self-hosting (a `pending-games.json` record with `hosting: "self"` and no `hostedOn`). The hook is local to this clone, not committed; the Render mirror repo has no such guard.

**Adding a new shard:** create the repo, enable Pages, confirm `https://ubghyper.github.io/{repo}/` serves, drop game folders in, then add `games.json` entries with `"shard": "{repo}"` and run the generators. No code change needed.

### Play shells + the jsDelivr CDN (migrated 2026-08-10)
Games no longer load straight from a shard's github.io. Each game gets a **play shell** at `/g/{slug}/index.html` in this repo, and the shell carries a `<base href>` pointing at the shard's **pinned jsDelivr commit SHA**, so the CDN serves the ~23GB of assets while we serve a few KB of HTML.

Why the entry HTML must be ours: jsDelivr deliberately serves `.html` as `text/plain`, so a browser will never execute a game's index.html fetched from it. Everything else — js, wasm, unityweb, images — it serves with correct types and `Access-Control-Allow-Origin: *`.

- `scripts/gen-cdn-manifest.js` → `cdn-manifest.json` + `cdn-repos.json`: pins each shard to a commit and decides eligibility.
- `scripts/gen-play-shell.js` → writes `/g/{slug}/`, and **regenerates the `SHARD_CDN` / `PLAY_SHELLS` block inside `assets/js/utils.js`** between GENERATED markers. Never hand-edit that block.
- It also **strips third-party analytics** from vendored game code and forces `noindex` on every shell. Shells stay crawlable (meta, never a robots.txt Disallow) — blocking the path last time meant Google never read the noindex and indexed 12,164 empty URLs anyway.
- **Oversized files (2026-10-17).** jsDelivr refuses files over 20 MB, so ~72 games had no shell and loaded from github.io, which most school filters block (the Render mirror was useless for them). `scripts/split-oversized.js --write` cuts every such file (read at the pinned SHA, never the working tree) into <=19 MB `<file>.pNNN` parts under `NewGames/SHARD/ubg-parts1|2/<shard>/<folder>/`, pushed to the jsDelivr-only repos `freeonlinewebtools/ubg-parts1` and `ubg-parts2` (no Pages), and writes `scripts/parts-manifest.json` (its `pins` must hold each parts repo's commit). `gen-play-shell.js` then gives those games a shell carrying `partsShim()`, which answers fetch()/XHR for an oversized file by fetching and joining its parts. Not covered: a big file loaded by `<script src>` (Minecraft 1.21, Fruit Ninja) and games whose entry html is itself oversized (Among Us Online 1/2, Click the Wawas). After a shard re-pin that changes an oversized file, re-run the split and re-push the parts. Local test of unpushed parts: `PARTS_BASE=http://localhost:PORT/ node scripts/gen-play-shell.js` (never commit that output).
- **No github.io inside a shell (2026-10-24).** Players reported "games won't load on the alt site": ~190 Flash shells loaded `ubghyper.github.io/GameList.github.io/ruffle/ruffle.js` + their `.swf` by absolute URL, which `<base>` never rewrites. `rewriteOwnGithubUrls()` now points any absolute `{ubghyper|freeonlinewebtools}.github.io/{shard}/…file` at the shard's pinned jsDelivr copy (never `.html`/folder URLs — jsDelivr serves those as text/plain). `needs-sw-fix` games get a shell only if listed in `SW_OK` (verified with probe-page.js); every shell carries `SW_SHIM` so `serviceWorker.register` rejects quietly. Construct 3 games (c3runtime.js resolves against `location`), BrawlGuys, Uno, TTG Jump Jousts 2, Recoil and Nubby's still need github.io, as do the 11 `external` games (other people's github.io: the Sonic WASM ports, Unicycle Heroes…) and the 3 oversized-entry games.
- **Changing a game's files in a shard is not enough.** The shell points at a pinned SHA, so the sequence is: push the shard → `gen-cdn-manifest.js` → `gen-play-shell.js` → then the page generators. Skipping the re-pin leaves the site serving the old assets.

### Script inventory
Generators: `gen-game-pages.js` (also the sole sitemap writer), `gen-landing-pages.js`, `gen-cat-pages.js`, `gen-redirects.js`, `gen-cdn-manifest.js`, `gen-play-shell.js`, `gen-ratings.js`, `gen-og.js`.
Maintenance: `set-ad-units.js` (fill/clear ad placements), `sync-game-count.js` (the count label), `recover-game.js` (re-host a game whose third-party host died).
Tools: `add-game.js` (local app: turns GitHub web-port repos into GameList folders — see "Adding games from GitHub").
Local tooling added 2026-10-03/04 (untracked, run from this folder): `find-new-games.js` + `curate-candidates.js` (diff the big unblocked-asset repos against games.json), `scan-staged-games.js` / `check-gameready.js` / `check-layout-hosting.js` / `build-newgames-layout.js` / `repack-newgames.js` (inventory + SHARD/LINK layout for `NewGames/`), `push-shard.js <gamelistN.github.io>` (chunked ~700 MB pushes with the shard token), `split-eaglercraft.js` (a 224 MB single-file Eaglercraft page → files under GitHub's 100 MB cap), `build-replacements.js` (cloned + de-ad'd Eggy Car / Magic Tiles 3 / Run 3 on gamelist14), `strip-injected-ads.js` + `ad-clean-repos.js`, `add-newgames-entries.js` + `promote-new-games.js` (games.json entries and the top-of-grid ordering), `ratings-chart.js` (PNG charts of `assets/ratings.json` into `data/`), `probe-page.js <url> [secs]` (headless Chrome: failed requests, console errors, `HOSTS=1` lists every host contacted, `CLICKS="t:x,y;…"` clicks through menus). Added 2026-10-10: `create-shard.js <name>` (new shard repo + Pages via the shard token), `mirror-gh.js <owner/repo> <ref> <dir|.> <dest>` (COMPLETE download of a public repo folder, LFS-aware, size-checked), `make-parts-page.js` (index.html for Unity ports whose data/wasm are split into parts). probe-page.js also takes `PROBE_TMP=<dir>` (put Chrome's profile on a roomy drive — C: has ~8 GB free and big blobs failed there) and `ALLCONSOLE=1`. **Gotcha:** a 590 MB Blob assembled from thousands of small `reader.read()` chunks came out broken in Chrome (fetch(blobUrl) failed immediately); take each part with `response.blob()` instead (Among Us, gamelist16).
Sitemap `lastmod` is **content-based**: `gen-game-pages.js` keeps `scripts/sitemap-hashes.json` (a hash of each game's own data, curated text and star rating) and bumps a page's date only when that changes — a nav/ad/ordering change no longer restamps ~700 URLs.
**Melon Playground is hosted as a limited OFFLINE copy** (gamelist14, 2026-10-04): the real 27 Studio Unity build from `artefacts.melonsandbox.com/.../51416/` plus its StreamingAssets (Addressables bundles from `aa/catalog.bin`, 36 FMOD banks found by probing — the bank list is compressed, so a few SFX may be missing). Play → Maps hangs forever because the map list needs Melon's authenticated backend (`pg-proxy.playmelonpg.com` 401s without the login token their website's postMessage "MelonSiteSDK" supplies). **Do not try to spoof that auth.** The one working route is the editor's own Preview Mode: Editor → Maps → Create New → Default → eye button → Yes (full item catalog, offline). **`ubg-autostart.js` (in the shard folder, loaded by its `index.html`) drives that route automatically** ~9 s after the build finishes loading, by dispatching synthetic mouse/pointer events on `#unity-canvas`; it backs off if the player clicks, and the hint box has a "Start sandbox" button to re-run it. Click targets use Unity's UI scale `sqrt((W/1264)*(H/705))` with per-button anchors (bl/tl/tw/centre) — verified at 1264×705, 984×705 and 1684×665; if 27 Studio ships a new build (the URL contains a build number, 51416) the menu positions may move and the script must be re-measured with `probe-page.js` (`CLICKS=` / `WINDOW=`). The entry is `buggy` (online features missing), and `index.html` carries a `connect-src 'self'` CSP that stops GameAnalytics/Unity/Xsolla/Melon calls. Lesson for other builds: anything shipping a "SiteSDK" bridge to a parent page will hang on its server-driven screens; check `scripts/probe-page.js` with `HOSTS=1` and `CLICKS=` before adding.
QA: `qa-links.js` (internal links, sitemap, legacy slugs, count consistency), `qa-analytics.js`, `qa-isolation.js`, `qa-playable.js` (**network** — follows each stub to the real game), `qa-games.js`, `qa-deployed.js` (**network**).

### Icons
- `assets/img/icon/main.png` — site logo/favicon only
- Per-game thumbnails are served from the game's shard, not stored locally

## Conventions
- Game data lives ONLY in `games.json` — never hardcode game info in HTML
- No npm, no package.json, no imports — vanilla ES6 only
- LocalStorage keys: prefix all new keys with `ubg_` to avoid collisions
- **Motion rule (UI pass 2026-10-24):** hover is a colour change only (cards: border turns `--accent`). No hover lifts, drop shadows, image zooms, spring pops or per-card entrance fades; they were removed as generic "AI site" tells. Motion is kept only where it answers an action or shows loading (heart pop on favourite, spinners, skeletons).
- Primary localStorage key for favourites is `ubg_fav`; `favorites` is legacy read-only

## Current Known State (updated 2026-08-15)
- **641 entries** in `games.json`: 603 `active`, 23 `status:'broken'`, 15 `status:'buggy'`. **618 listed** (everything not `broken`) — that is the number every page generator counts, and each of them generates a /games/ page.
- **The game-count label is generated, not hand-written.** The rule is `floor(listed/10)*10` = **"610+"** — `STABLE_COUNT` in gen-game-pages.js, `GAME_COUNT` in gen-landing-pages.js. `index.html`, `llms.txt` and `manifest.json` cannot compute it, so **`node scripts/sync-game-count.js`** writes it into them, and `qa-links.js` fails the build if any of the four disagree. The old "keep index.html in sync manually" instruction is gone because it failed twice — most recently leaving "620+" in the homepage `<title>` against a real 619.
- Per-game SEO pages at `/games/{slug}.html` — VideoGame + Breadcrumb + FAQ schema, prerendered sidebar, About section, FAQ block; AggregateRating baked in only at 5+ real Firebase votes
- **Game pages are generated FROM play.html** (June 10): `gen-game-pages.js` reads `play.html` at build time (`PLAY_SRC`) and applies marker-based transforms (`rep()` throws if an anchor goes missing — build fails loudly rather than emitting broken pages). play.html is the single source of truth for the player UI; edit it and regenerate to restyle all 618 game pages. Game pages use `redesign.css` + `play-new.js` (path-safe absolute URLs), baked about-card/recs/G2A/ad-rails, SEO blocks in `.gp-seo` below the player. They do NOT load `style.css`/`play.js`/`render.js`/`ratings.js` — the Firebase rating widget needs porting to the ply-star UI when Firebase gets configured.
- **Playtime viz is zero-dependency** (June 10): `renderPlaytimeViz()` in play-new.js — pure DOM/CSS bars (`.ply-pt-*` in redesign.css), stat chips (total / streak / best day / avg / week-trend), hover tooltip, live-updating today bar (60s). Chart.js is NO LONGER loaded on play.html or game pages (only stats.html still uses it).
- Per-tag category pages at `/games/cat-{tag}.html` (20 of them) — CollectionPage + ItemList + FAQ schema
- Keyword landing pages at root: UG `66/67/76/77/6x/wtf/premium`, `unblocked-games-chromebook`, `github-unblocked-games`, `cool-ubg-games`, `free-online-games`, `game-websites` — full FAQ schema, top-30 grid, internal cross-links (generated by `gen-landing-pages.js`)
- `play.html` is `noindex,follow` — its canonical dynamically points to `/games/{slug}.html` to consolidate ranking signal (eliminates duplicate-content split)
- `sitemap.xml`: 661 canonical URLs (618 games + 20 cats + 23 static/landing) — fully regenerated by `gen-game-pages.js` on every run, fresh `lastmod` each time. Redirect stubs are intentionally excluded.
- `llms.txt` at root for AI crawlers (ChatGPT/Perplexity/etc.)
- Theme: light mode default for new visitors
- **Ads are LIVE on Adsterra only (since 2026-09-26)** — each placement in the `UNITS` table of `scripts/set-ad-units.js` names its network, and all six are Adsterra: two `rail`s (160x600 each), homepage `billboard` + `strip` (728x90 each), `mobile` (320x50), and `sidebar` (300x250, play.html only — under "More like this"). A size used twice on one page has two units. Mondiad was dropped after measuring ~$0.01 CPM (~100k impressions/school day, 22–24 Sep) against Adsterra's ~$0.67; its unit IDs are kept in a comment in `set-ad-units.js` for switching back. **Adsterra is never placed in the page directly**: its `invoke.js` is parser-blocking and reads a global `atOptions`, so each unit is a lazy `<iframe>` of `/assets/ads/adsterra.html#k=…&w=…&h=…` — in-page it would stall the game player (the left rail precedes it in the DOM). Each Adsterra unit appears at most once per page. Rails are 160px wide; the 728 strip is hidden below 760px (the 320x50 slot covers phones). Every rendered block ends with `<!-- /UBG-AD:{placement} -->` so re-applying is idempotent. Mondiad emits one shared `ss.mrmnd.com/banner.js` loader per page only while a Mondiad slot exists. History: A-ADS (Aug 26) → Mondiad (Sep 22) → cleared Sep 25 for a failed `.xyz` domain move → Mondiad restored. **Pubfuture is approved-pending** (ads.txt already synced, see Analytics above) and is the intended replacement; Clickio rejected the site, and Ezoic/GameMonetize don't accept a github.io subdomain. Unit IDs are **not per-page** — one unit per *placement*, reused across every game page, registered to `https://ubghyper.github.io/`. **Ads are GitHub Pages only**: the Render mirror has never carried them, so ad changes are the one thing not copied to the `UBGHyper` repo. Everything flows through **`scripts/set-ad-units.js`** then `gen-game-pages.js` to propagate, and `privacy.html` must name whichever network is live. Never hand-edit a unit ID or paste an A-ADS snippet into a page: a pasted 970x90 block sat in index.html from commit `00105a4a` until it was folded into the `billboard` slot on 2026-08-26, and any regen would have silently deleted it. **Adding ads made "no ads on the player" false** — that claim was removed from `gen-game-pages.js`, `top-game-content.js` (19 curated FAQs) and `gen-landing-pages.js` (11 spots), replaced with "no pop-ups", which stays true. The two surviving "ads on the player" strings in `gen-landing-pages.js` (lines ~553, ~615) describe **competitors** (legacy popup sites, Poki's pre-rolls) and must NOT be rewritten. Still **no pop-up/popunder ads** — the Monetag popunder was removed 2026-08-01 and the file deleted; do not reintroduce it. Adcash In-Page Push / Video Slider / VAST pre-roll exist only on the private, noindex, unlinked `ad-test.html` bench — NOT live. See the monetization memory.
- Sort options on index: Default, A–Z, Most Played, Newest
- Hamburger nav on all pages at ≤540px
- **Nav is identical on every page and the Discord link is part of it**: `<a href="https://discord.gg/HAzcYC52Vt" …>Discord (Fixed)</a>` replaced the HyperTunnel nav link on 2026-08-26 (the first invite, XW3keU8S, had expired; swapped for 65nbKHBNGb on 2026-10-03 and relabelled "Fixed", then for HAzcYC52Vt on 2026-10-20). It is emitted from four places — `play.html`, `gen-game-pages.js`, `gen-landing-pages.js`, `gen-cat-pages.js` — plus ten hand-maintained root pages (404, about, contact, favorites, privacy, saves, stats, index, cool-ubg-games, free-online-games). **`cool-ubg-games.html` and `free-online-games.html` are hand-maintained, NOT generated** despite sitting alongside the generated landing pages; a sweep that only edits the generators silently misses them. `ad-test.html` and the Search Console verification file deliberately have no nav. `discord.gg` is classified BENIGN in `net-guard.js` — without that, `qa-isolation.js` fails on every run.
- **isotunnel launch alert (2026-11-07, owner's request):** the nav chip now says "Out now", and `showIsoAlert()` at the end of `camo.js` puts a dismissible bar under the nav on every page that loads camo.js (all page types). Closing it sets `ubg_iso_alert_1`; `ISO_ALERT_ON = false` turns it off; bump the key to re-show a new message. It is a static bar (no modal, no animation, nothing over the game) and the one deliberate exception to "never add a promo".
- **isotunnel teaser (2026-10-24):** straight after the Discord `<a>`, every nav carries `<a href="https://isotunnel.com/" data-nav="isotunnel">isotunnel<span>Coming soon</span></a>` (sentence-case chip on the theme tokens `--text` / `--surface-2`, so it reads in both themes; the first all-caps outlined pill looked out of place) — same emitters as the Discord link. `isotunnel.com` is BENIGN in net-guard. isotunnel's terms are 18+ or parent/guardian permission, which matters for this audience.
- **Phone menu has ONE owner: `bindNavHamburger()` in camo.js** (runs on load wherever camo.js is included, guarded by `data-bound`). App.js, favorites.js, play-new.js and seven hand pages each bound a second toggle, so every tap opened and shut the menu (broken on phones until 2026-10-24); category pages and all-games.html had no button at all. Never add another `navHamburger` click handler.

## Business Goals
- Grow organic traffic via SEO (game titles, meta tags, sitemap)
- Improve retention — favourites, saves, continue-playing features
- Add more games without breaking existing URLs (canonical slugs)

## What NOT to Do
- Do NOT hand-edit generated output — `/games/*.html`, `all-games.html`, and the `unblocked-games-*` landing pages are regenerated from `scripts/`, and regeneration silently deletes anything hand-added. (On 2026-07-31 a regen wiped the HyperTunnel nav link from 16 pages because the link existed only in the deployed HTML.) Put the change in the generator, then regenerate.
- Do NOT introduce a framework or build step
- Do NOT change URL structure of existing pages (breaks indexed links). **A mid-May-2026 slug-scheme change (`poly-track-unblocked.html` → `Polytrack-New.html`, etc.) 404'd ~200 indexed game URLs and coincided with the traffic crash. If a slug MUST change, the old slug goes in `scripts/legacy-urls.txt` and gets a redirect stub — never just rename and delete.**
- Do NOT use external CDNs for game assets (CORS/filter issues)
- Do NOT commit the `data/` folder — it holds private GSC/GA4 exports and is gitignored. It must never deploy.

## URL recovery / redirects
- `scripts/legacy-urls.txt` — every game slug that has ever existed and is now dead (one per line).
- `scripts/gen-redirects.js` — generates HTTP-200 redirect stubs in `/games/` for each legacy slug (canonical → best live destination + instant client redirect; the GitHub-Pages substitute for a 301). Stubs carry a `<!-- ubg-redirect -->` marker so the `gen-game-pages.js` orphan sweep keeps them; they are intentionally NOT in the sitemap.
- When you rename or remove a game, add its old slug to `legacy-urls.txt`, then run `gen-redirects.js`.
- `gen-play-shell.js` never deletes a shell: when a game is removed, `git rm -r g/{slug}` by hand, or its old `/g/` shell keeps serving the pinned copy.
- **Copyright takedowns.** 2026-11-10: Redpoints filed a DMCA with Google for BitLife (for Candywriter) and Google delisted `/games/Bitlife.html`. Bitlife was removed on 2026-11-14 from games.json (`broken`, with the reason in `statusnote`), from GameList, from its `/g/` shell, from `top-game-content.js` and from every page and generator that named it; its old URL redirects to the simulation category. A takedown means a rights holder is scanning the site. Never re-add a taken-down game under another slug, and never file a counter notice for a game that is a copy of someone else's.

## Games hosted on someone else's server
Not every game is self-hosted. A number were wired up as a one-line stub that iframes a third-party copy, and those hosts disappear without warning — `tbg95.github.io` was deleted and took four games with it; Google retired the OpenSocial gadget proxy and took two more. The stub keeps answering 200 the whole time, so `iframe_loaded` reports success while the game is a 404. **`qa-playable.js` is the only check that catches this** — run it periodically, not just after changes.

It also reports **"shard out of sync"**: a self-contained game whose live folder answers 200 but serves different bytes than the local `index.html`, i.e. the shard has not been pushed. Without that, repairing a game locally makes it *look* fixed to every check while the dead version is still what visitors get. Exit code stays 0 for drift (it is a deploy state, not breakage) and non-zero only for unacknowledged breakage, so the script is safe to run on a timer.

`scripts/recover-game.js` is the repair tool. It pulls a real copy into the shard so the game stops depending on a stranger's uptime, from one of three source kinds: a still-live OpenSocial `gadget` XML (the game HTML sits in a CDATA block — the retired proxy was only ever unwrapping it), a `mirror` whose asset list can be **fully** enumerated, or a `local` build already in `_git_clones`. Never take a partial mirror copy: it fails halfway into play instead of immediately, which is harder to notice.

Vendored copies routinely ship someone else's advertising — Poki, Y8, Google IMA, AdSense H5 — and the script strips each on the way in, leaving a no-op shim where the game keeps calling the SDK. Removal without a shim throws mid-play. Some SDKs are injected by an IIFE that builds its own `<script>` element, so deleting script tags does nothing and the src literal has to be replaced instead.

GameMonetize's `JumpGame` wrapper is one to watch: games call `JumpGame.showInterstitial({afterShowAd: startGame})`, so without a shim whose `afterShowAd` fires immediately, the game never starts (Monster Tracks, 2026-09-29).

**Injected third-party sidebar ads (found 2026-09-29).** About 69 game pages across GameList and gl2–gl8 carry an obfuscated script (`(function(ykJYJgqRQvLQ,…`) plus two 160×600 `#sidebarad1/#sidebarad2` slots. They arrived with pages copied from gn-math-style sources (the same code sits at the end of gn-math.dev's loaders) and serve someone else's ads inside our player. One observed creative was a full-screen "Download — install Ace AI browser" overlay on Jetpack Joyride. Find them with `grep -l ykJYJgqRQvLQ */index.html`. They were stripped from the five genizy-fixed pages that had them (Jetpack-Joyride, Core-Ball-Level-4, Monster-Tracks, Minecraft-Pocket-Edition, Destroy-The-Car-3D); the other genizy-fixed pages were checked clean. Remove the whole block (script, both slot divs and the `#sidebarad…`/`.sidebar-frame` CSS), not just the script.
**Cleaned 2026-10-04** from every local shard clone and GameList (74 pages, including ~14 pasted Google AdSense units with a stranger's `ca-pub` id) by `scripts/strip-injected-ads.js`, driven across all repos by `scripts/ad-clean-repos.js` (`--push` commits only the cleaned files, skips any already-modified file, and uses the shard token from `../git.env` for the freeonlinewebtools repos). `gen-play-shell.js` also strips both kinds from the `/g/` shells as a safety net. **Re-run `node scripts/ad-clean-repos.js` after copying anything from a gn-math-style source.** Not covered: `gamelist2`'s live `fixed2` branch (the local clone sits on `main`), and a handful of pages whose own game code mentions AdSense (Krunker, Shell-Shockers, Sandboxels, There-Is-No-Game, HappySheepies) — left alone on purpose.

## When Adding a Game
1. Add entry to `assets/games.json` with: name, url, tags[], gamedesc, image, credits — plus `shard` if it is not in `GameList.github.io`
2. Game files + thumbnail live in the shard repo at `{slug}/` — no local icon file needed
   - Optional `status`: `broken` (removed from site + sitemap) or `buggy` (shows a warning banner). With `buggy`, add `statusnote` to say what is actually wrong — a specific symptom tells a player the problem is known rather than their fault.
   - Optional `fixed: "YYYY-MM-DD"`: a game that was broken or has been replaced with a working copy. The homepage grid shows a green "✓ Fixed" pill on its card and lists it under a "Fixed ✓" filter chip for 30 days (`isRecentlyFixed()` in `app.js`), then it quietly expires. Ignored while the game is `buggy`/`broken`.
3. Push the shard, then re-pin the CDN (skip only if no shard file changed):
   - `node scripts/gen-cdn-manifest.js` (re-pins the shard's jsDelivr SHA)
   - `node scripts/gen-play-shell.js` (rebuilds `/g/` shells + the generated block in utils.js)
4. Run the generators (in order):
   - `node scripts/gen-landing-pages.js` (regens keyword landing pages)
   - `node scripts/gen-cat-pages.js` (regens category pages)
   - `node scripts/gen-game-pages.js` (regens game pages **AND rewrites sitemap.xml** — sole sitemap source of truth, do not hand-edit)
   - `node scripts/gen-redirects.js` (only if you renamed/removed slugs this run)
   - `node scripts/sync-game-count.js` (only if the listed-game count crossed a multiple of ten)
5. `node scripts/qa-links.js` then `node scripts/qa-playable.js` — the second one is the only check that proves the game actually loads. A stub answering 200 proves nothing, which is how six games sat dead behind a working-looking URL.
6. Push → `indexnow.yml` submits **every URL in sitemap.xml** to Bing/IndexNow. It derives the list from the sitemap rather than its own copy, so nothing needs updating there when games are added.

## Adding games from GitHub (`scripts/add-game.js`)
A local app for the common case: someone's web port lives in a GitHub repo, and we load it from jsDelivr instead of copying it. `node scripts/add-game.js` opens `http://localhost:5178`. The owner pastes a list (names + links, any mess), every repo is checked, and for each playable one they test-play it, drop an icon and **Save**, which writes:
- `GameList.github.io/{Slug}/index.html`: the repo's entry HTML with `<base href="https://cdn.jsdelivr.net/gh/{owner}/{repo}@{sha}/{dir}/">` and a `<!-- ubg-add-game: … -->` marker. This is the same pattern as the ~20 older web-port games (Untitled-Goose-Game, Plague-Inc…), and `gen-play-shell.js` keeps third-party bases, so `/g/` shells work too.
- `GameList.github.io/{Slug}/{slug}.jpg`: 200×200, like every thumbnail.
- A record in `scripts/pending-games.json`. **It never writes `games.json`**: tags and description are left for Claude, so a regen can't publish a blank game.

Code: `scripts/add-game/` (`lib.js` pure rules, `analyze.js` per-repo check, `net.js` git + jsDelivr, `store.js` disk, `ui.html`). Tests: `node --test scripts/add-game/lib.test.js scripts/add-game/analyze.test.js scripts/add-game/store.test.js scripts/add-game/net.test.js` (offline). Test-play runs on `127.0.0.1` while the app is on `localhost`: a game is a stranger's code, and a separate origin keeps it away from the save API.

jsDelivr facts the checks encode (all observed 2026-09-28):
- A file over 20 MB returns 403.
- The **listing** API refuses repos over 50 MB but still serves their files. The tool then lists via GitHub's tree API (60 calls an hour unauthenticated; uses `GITHUB_TOKEN` if set).
- Git LFS files are served as pointer text.
- **jsDelivr bans some GitHub users outright.** `genizy` answers "User genizy is blocked", which kills every port in `genizy/web-port` (Delta Rune, Fears to Fathom…). **24 games already on the site load from genizy** (GameList: Breath-of-the-Wild, Destroy-The-Car-3D, Minecraft-Pocket-Edition, Quake-3, Yume-Nikki; shards gl2–gl8: Sprunki, Temple-Run-2, Brawl-Stars, Deltarune, FNAF-2/3, OvO-3, …). Find them with `grep -l "cdn.jsdelivr.net/gh/genizy/"`. Deltarune (gl7) was confirmed dead on 2026-09-28, and its source commit has since been deleted from GitHub.
  **Re-hosted locally 2026-09-29, awaiting push** (`<base>`/URLs made relative; missing files copied from `_git_clones/genizy__*` sparse clones; Poki SDK replaced with the recover-game shim; Monster Tracks' obfuscated `Jump_Gamemonetize.js` dropped): gl3 Ice-Dodo, Jetpack-Joyride, Tag (also restored `scripts/main.js` from `main2.js`); gl4 Sprunki, Temple-Run-2, Core-Ball-Level-4, Monster-Tracks, Gobble; gl7 Brawl-Stars; gl8 FNAF-2, FNAF-3, OvO-3; GameList Destroy-The-Car-3D, Minecraft-Pocket-Edition. Deltarune and Breath-of-the-Wild (its `BotwDS.iso` host was deleted) are marked `broken` and are legacy slugs. Still on genizy but already hidden: Quake-3, Yume-Nikki, Do-Not-Take-This-Cat-Home, and unused duplicates in gl2/gl5/gl6.
- Godot 4 builds with threads (Nodebuster, Void Whispers) need cross-origin isolation, which they can't get inside the player iframe. They fail with "features required to run Godot projects on the Web are missing".
- Many repos on the owner's lists are source code with the build hosted elsewhere (midzer's `emscripten` branches, julius, MarbleBlast). These fail the check correctly.

### "Fill the pending games"
When the owner says this, promote every record in `scripts/pending-games.json`:
1. Check GameList: each `GameList/{slug}/` must be committed **and pushed**. The thumbnail resolves through GameList's pinned jsDelivr SHA, so an unpushed icon 404s. If a folder isn't pushed, stop and ask. GameList often has unrelated uncommitted work, so never commit it wholesale on the owner's behalf.
2. For `action: "add"`, append to `games.json` `{name, image, url: slug, new: true, credits, tags, gamedesc}`, with no `shard` (GameList is the default):
   - `tags`: 1–3 from the existing 20. Most games have 2.
   - `gamedesc`: about 100–180 characters in the site's hook style ("Evolve a deadly pathogen and wipe out humanity! …"). Use only facts you can stand behind: the game itself, the repo README, the record's `note`.
   - `credits` renders as the page's **Developer** fact. `WebPort by X` alone would name the porter as developer, so make it `Developed by {real studio}, WebPort by {porter}`.
3. For `action: "fix"`, edit the existing entry. Drop `status`/`statusnote` when `previousStatus` was broken/buggy. Update `image`/`credits` if the record changed them. Keep its `gamedesc`, `tags` and `url`.
   For `action: "revive"`, the slug was retired (its GameList folder or redirect stub still exists): add the entry as for "add".
   **Any record with `legacySlug: true`**: remove that slug from `scripts/legacy-urls.txt`. The regenerated game page then replaces the redirect stub, and the old indexed URL works again.
   For **`hosting: "self"`**: the build is staged at `record.staged`, because jsDelivr can't serve it (a file over 20 MB, LFS, or a banned user). Once the owner has pushed that folder to a shard and it answers 200, write `GameList/{slug}/index.html` as the usual wrapper iframing `https://freeonlinewebtools.github.io/{shard}/{slug}/`, then copy `record.thumb` into the folder. Ask which shard if it isn't known.
   `patches` lists hand edits already made to the entry HTML; they are there to explain the diff, not to redo.
4. Delete the promoted records (delete the file once it's empty), then run the "When Adding a Game" pipeline from step 3: `gen-cdn-manifest` → `gen-play-shell` → the three page generators → `sync-game-count` if needed → `qa-links` → `qa-playable`.

## Auto game-page content (non-curated games)
- `gen-game-pages.js` generates varied, semi-unique About + FAQ per game from real data only (genre/tags, related games, dev, mode) using a stable per-URL hash — no fabricated facts (no fake level counts/records on auto pages). This avoids the near-duplicate "thin content" footprint across the ~400 non-curated pages.
- Placeholder credits ("original creators", "unknown", "various") are suppressed so they never render as a fake Developer fact.

## Curated long-form content
- `scripts/top-game-content.js` is the content overlay for the top traffic games — **~61 entries now** (keyed by game `url`), covering the most-played and trending titles (Drive Mad, Slope, Granny 2/3, Brawl Stars, Cuphead, Stickman Hook, Solar Smash, Level Devil, Snow Rider, Subway Surfers, Monkey Mart, etc.). Prioritise adding entries for games with high GA4 on-site play but no curated block.
- Each entry has: `longdesc` (300-word write-up), `controls` (HTML allowed), `tips[]`, `faqs[]` (5 specific Q&As)
- `gen-game-pages.js` substitutes these for the auto-generated About + FAQ blocks when a game URL has an entry
- To add curated content for another game: add a new entry keyed by the game's `url` from `games.json`, then re-run `gen-game-pages.js`

## Game ratings (Firebase — real, not fabricated)
- Cross-user star ratings via Firestore REST API (no SDK). Client: `assets/js/ratings.js`. Config: `assets/firebase-config.json` (`projectId` + public web `apiKey`). Rules: `firestore.rules`.
- Build snapshot: `scripts/gen-ratings.js` pulls live aggregates → `assets/ratings.json`. `gen-game-pages.js` bakes `AggregateRating` into the VideoGame schema **only for games with `RATING_THRESHOLD` (5)+ real votes** — never fabricated, so it's Google-guideline-safe.
- Until a Firebase project is configured (see `scripts/RATINGS-SETUP.md`), the widget is local-only and no AggregateRating is emitted.
- Refresh stars in search: `node scripts/gen-ratings.js && node scripts/gen-game-pages.js`, then commit.

## Performance notes
- Google Fonts load asynchronously via the `media="print" onload="this.media='all'"` trick — non-render-blocking
- `chart.js` is lazy-loaded via `window.waitForChart()` (defined in `play.js`): only fetched when the current game has playtime data, so first-time visitors never download it (saves ~80KB initial)
- Game thumbnails use `loading="lazy"` + `decoding="async"`; sidebar hero thumb uses `fetchpriority="high"` for LCP

## Key Files to Read First for Any Task
- For UI changes: `style.css` + the relevant HTML file
- For game system: `games.json` + `play.html` + `camo.js`
- For saves: `saves.html` (save-bridge.html deleted — saves use localStorage directly)
- For SEO: `sitemap.xml` + `robots.txt`
