'use strict';
// (Re)writes the how-to-play box on the Melon Playground page and wires in ubg-autostart.js (idempotent).
// The web build only gets its map list/login from Melon's website; this copy has no such backend, so the one
// working route is the editor's own Preview Mode, which ubg-autostart.js now drives for the player.
const fs = require('fs'), path = require('path');
const f = path.resolve(__dirname, '..', '..', 'NewGames/SHARD/gamelist14.github.io/Melon-Playground/index.html');
let h = fs.readFileSync(f, 'utf8');

// drop any earlier version of the box (and its auto-hide script)
const start = h.indexOf('<div id="ubg-melon-hint"');
if (start >= 0) {
  const marker = '</script>';
  const timer = h.indexOf('getElementById(\'ubg-melon-hint\')', h.indexOf('<script>', start));
  const end = h.indexOf(marker, timer < 0 ? start : timer) + marker.length;
  h = h.slice(0, start) + h.slice(end);
}
h = h.replace(/<script src="ubg-autostart\.js"><\/script>\s*/g, '');

const hint = `
<div id="ubg-melon-hint" style="position:fixed;left:8px;bottom:8px;max-width:340px;z-index:99999;background:rgba(0,0,0,.85);color:#fff;font:13px/1.4 system-ui,'Segoe UI',sans-serif;padding:10px 12px;border:2px solid #88ad25;border-radius:6px">
<b>Offline copy.</b> Online maps, the store and multiplayer are not available. We open the editor's sandbox for you automatically.
<div id="ubg-melon-status" style="margin:6px 0;color:#c9e58a">Loading the game...</div>
<button id="ubg-melon-start" onclick="window.ubgStartSandbox&&window.ubgStartSandbox()" style="padding:3px 10px;cursor:pointer">Start sandbox</button>
<button onclick="document.getElementById('ubg-melon-hint').remove()" style="margin-left:6px;padding:3px 10px;cursor:pointer">Hide</button></div>
<script src="ubg-autostart.js"></script>
`;
if (!h.includes('</body>')) throw new Error('no </body>');
h = h.replace('</body>', hint + '</body>');
fs.writeFileSync(f, h);
console.log('hint + autostart wired | CSP present:', h.includes('connect-src'), '| hint boxes:', (h.match(/id="ubg-melon-hint"/g) || []).length);
