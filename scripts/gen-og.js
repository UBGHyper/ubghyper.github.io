/*
 * gen-og.js — builds the social-share Open Graph card at assets/img/og.png (1200x630).
 *
 * Home / play / about previously used main.svg for og:image, which Discord, Reddit,
 * iMessage, Facebook and Twitter do NOT render — so every share showed a blank card.
 * This produces a real raster card those platforms display.
 *
 * Run manually after a rebrand or count change:  node scripts/gen-og.js
 * (No build step; same manual-generator pattern as the other scripts.)
 */
const Jimp = require('jimp');
const path = require('path');

const ORANGE = 0xf07220ff;
const DARK   = 0x0f0f0fff;
const W = 1200, H = 630;

const ICON = path.join(__dirname, '..', 'assets', 'img', 'icon', 'main.png');
const OUT  = path.join(__dirname, '..', 'assets', 'img', 'og.png');

// Site-wide count label — keep in sync with the generators' floor(active/10)*10.
const COUNT = '620+';

async function main() {
  const img = new Jimp(W, H, DARK);

  // Left accent bar + bottom brand band.
  img.composite(new Jimp(16, H, ORANGE), 0, 0);
  img.composite(new Jimp(W, 88, ORANGE), 0, H - 88);

  // Logo, left-centered in the upper area.
  const logo = await Jimp.read(ICON);
  logo.resize(300, 300);
  img.composite(logo, 96, 118);

  const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  const fontSub   = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const fontBand  = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const TX = 440; // text left edge (right of logo)

  img.print(fontTitle, TX, 150, 'UBGHyper');
  img.print(fontSub,   TX, 300, `${COUNT} Unblocked Games`);
  img.print(fontSmall, TX + 4, 382, 'Free · No downloads · Works at school');

  // Bottom band label, vertically centered in the 88px band.
  img.print(fontBand, 40, H - 88 + 26, 'ubghyper.github.io');
  img.print(fontBand, W - 40 - Jimp.measureText(fontBand, 'Play instantly'), H - 88 + 26, 'Play instantly');

  await img.writeAsync(OUT);
  console.log('Wrote', OUT, `(${W}x${H})`);
}

main().catch(e => { console.error(e); process.exit(1); });
