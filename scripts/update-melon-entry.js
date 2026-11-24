'use strict';
// Melon-Playground: replace the old third-party copy's entry with the real 27 Studio build (gamelist14).
const fs = require('fs'), path = require('path');
const gp = path.join(__dirname, '..', 'assets/games.json');
const raw = fs.readFileSync(gp, 'utf8'), crlf = raw.includes('\r\n');
const g = JSON.parse(raw);
const e = g.find(x => x.url === 'Melon-Playground');
if (!e) throw new Error('Melon-Playground entry missing');
Object.assign(e, {
  image: 'melonplayground.jpg',
  new: true,
  credits: 'Developed by 27 Studio',
  tags: ['sandbox', 'physics', 'action'],
  gamedesc: "Spawn ragdoll fruit, weapons and gadgets and see what happens in this physics sandbox. Build a map in the editor, then smash, burn and blast to your heart's content.",
  status: 'buggy',
  statusnote: 'Online maps, the store and multiplayer do not work in this copy. To play: open Editor, then Maps, Create New, Default, then tap the eye button and choose Yes. The first load is large (about 80 MB).',
});
let out = JSON.stringify(g, null, 2);
if (crlf) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(gp, out + (raw.endsWith('\n') ? (crlf ? '\r\n' : '\n') : ''));
console.log('updated', e.name, '| image', e.image, '| status', e.status);

// ranking: slot it into the promoted picks (index 5 = about #13)
const pp = path.join(__dirname, 'promote-new-games.js');
let s = fs.readFileSync(pp, 'utf8');
if (!s.includes("'Melon-Playground'")) {
  s = s.replace("'Brotato', 'Apotheon',", "'Brotato', 'Apotheon', 'Melon-Playground',");
  fs.writeFileSync(pp, s);
  console.log('added Melon-Playground to the promoted picks');
}
