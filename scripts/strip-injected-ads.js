'use strict';
// Removes advertising that rode in on pages copied from other sites, so it is not served inside
// OUR player on someone else's account:
//   1. the gn-math-style sidebar injector (CLAUDE.md "Injected third-party sidebar ads"): an obfuscated
//        <script>(function(ykJYJgqRQvLQ,...){...}</script>
//      plus, on some pages, two 160x600 #sidebarad1/#sidebarad2 slots and their CSS;
//   2. pasted Google AdSense units (a stranger's ca-pub id): the <ins class="adsbygoogle"> slot, the
//      loader <script>, and the inline push() call. An inert array replaces them so game code that
//      pushes to adsbygoogle keeps working.
//
//   node scripts/strip-injected-ads.js <dir> [<dir>...]          dry run: list what would change
//   node scripts/strip-injected-ads.js <dir> [<dir>...] --write  rewrite the files
//
// Walks <dir> for *.html (3 levels deep), touching only files that match. Exports stripInjected()
// so gen-play-shell.js can apply the same rules when it builds the /g/ shells.
const fs = require('fs'), path = require('path');
const MARKER = 'ykJYJgqRQvLQ';
const ADSENSE = /adsbygoogle|googlesyndication/i;

function stripAdsense(html, removed) {
  if (!ADSENSE.test(html)) return html;
  const before = html;
  html = html
    .replace(/<ins\b[^>]*class=["'][^"']*adsbygoogle[^"']*["'][^>]*>[\s\S]*?<\/ins>/gi, () => { removed.push('adsense slot'); return ''; })
    .replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*(?:adsbygoogle|googlesyndication)[^"']*["'][^>]*>\s*<\/script>/gi, () => { removed.push('adsense loader'); return ''; })
    .replace(/<script\b[^>]*>\s*\(?\s*adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\s*\)?\s*\.push\(\{[^}]*\}\)\s*;?\s*<\/script>/gi, () => { removed.push('adsense push'); return ''; });
  if (html !== before && !/window\.adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]/.test(html)) {
    const shim = '<script>/* ubg: AdSense removed, inert array */window.adsbygoogle=window.adsbygoogle||[];</script>';
    const h = html.match(/<head\b[^>]*>/i);
    html = h ? html.replace(h[0], h[0] + '\n' + shim) : shim + '\n' + html;
  }
  return html;
}

function stripInjected(html) {
  const removed = [];
  html = stripAdsense(html, removed);
  if (!html.includes(MARKER)) return { html, removed };
  // the obfuscated loader: the whole <script> element whose body contains the marker
  for (let guard = 0; guard < 8; guard++) {
    const at = html.indexOf(MARKER);
    if (at < 0) break;
    const st = html.lastIndexOf('<script', at), en = html.indexOf('</script>', at);
    if (st < 0 || en < 0) throw new Error('marker found outside a <script> element');
    removed.push(`script ${en + 9 - st} B`);
    html = html.slice(0, st) + html.slice(en + 9);
  }
  // the slots it fills (empty, or holding only the little close button)
  html = html.replace(/<div\b[^>]*\bid=["']sidebarad[12]["'][^>]*>(?:\s*<div\b[^>]*class=["']sidebar-close["'][^>]*>[^<]*<\/div>)?\s*<\/div>/gi,
    () => { removed.push('slot div'); return ''; });
  // their styling: selector lists that mention a sidebar ad / frame / close button
  html = html.replace(/(^|[}\s])((?:[#.][\w-]*sidebar[\w-]*\s*,?\s*)+)\{[^{}]*\}/gi, (m, pre) => { removed.push('css rule'); return pre; });
  return { html, removed };
}
module.exports = { stripInjected, MARKER, ADSENSE };

if (require.main === module) {
  const args = process.argv.slice(2), write = args.includes('--write'), dirs = args.filter(a => !a.startsWith('--'));
  if (!dirs.length) { console.error('usage: strip-injected-ads.js <dir>... [--write]'); process.exit(1); }
  let files = 0, bytes = 0; const bad = [], leftovers = [];
  const walk = (d, depth) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (depth < 3) walk(p, depth + 1); continue; }
      if (!/\.html?$/i.test(e.name)) continue;
      let s; try { if (fs.statSync(p).size > 30 * 1024 * 1024) continue; s = fs.readFileSync(p, 'utf8'); } catch { continue; }
      if (!s.includes(MARKER) && !ADSENSE.test(s)) continue;
      try {
        const r = stripInjected(s);
        if (r.html.includes(MARKER)) { bad.push(p + ' (marker survived)'); continue; }
        if (r.html === s) { leftovers.push(p.replace(/\\/g, '/') + '  (mentions AdSense but nothing matched a known unit)'); continue; }
        if (/sidebarad|ca-pub-/i.test(r.html)) leftovers.push(p.replace(/\\/g, '/') + '  (still mentions sidebarad / a ca-pub id after cleaning)');
        files++; bytes += s.length - r.html.length;
        console.log((write ? 'cleaned ' : 'would clean ') + p.replace(/\\/g, '/') + '  -' + (s.length - r.html.length) + ' B  [' + [...new Set(r.removed.map(x => x.replace(/\d+ B/, 'n B')))].join(', ') + ']');
        if (write) fs.writeFileSync(p, r.html, 'utf8');
      } catch (err) { bad.push(p + ' ' + err.message); }
    }
  };
  for (const d of dirs) walk(d, 0);
  console.log(`\n${files} file(s) ${write ? 'cleaned' : 'would change'}, ${(bytes / 1024).toFixed(0)} KB of ad code ${write ? 'removed' : 'to remove'}`);
  if (leftovers.length) { console.log('\nREVIEW BY HAND (' + leftovers.length + '):'); leftovers.forEach(l => console.log('  ' + l)); }
  if (bad.length) { console.log('PROBLEMS:'); bad.forEach(b => console.log('  ' + b)); process.exit(2); }
}
