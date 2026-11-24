#!/usr/bin/env node
// Resizes all game thumbnails to 200×200 JPEG and updates games.json.
// Originals are backed up to GameList.github.io/{url}/originals/{filename}
//
// Setup (run once):  cd scripts && npm install
// Run:               node scripts/optimize-images.js

const fs   = require('fs');
const path = require('path');
const Jimp = require('jimp');

// Detect real image type from file magic bytes (ignores extension)
function detectType(filePath) {
  const buf = Buffer.alloc(12);
  const fd  = fs.openSync(filePath, 'r');
  fs.readSync(fd, buf, 0, 12, 0);
  fs.closeSync(fd);
  // WebP: RIFF????WEBP
  if (buf[0]===0x52&&buf[1]===0x49&&buf[2]===0x46&&buf[3]===0x46&&
      buf[8]===0x57&&buf[9]===0x45&&buf[10]===0x42&&buf[11]===0x50) return 'webp';
  // AVIF/HEIF: ftyp box at offset 4
  if (buf[4]===0x66&&buf[5]===0x74&&buf[6]===0x79&&buf[7]===0x70) return 'avif';
  return null;
}

const ROOT       = path.join(__dirname, '..');
const GAMES_JSON = path.join(ROOT, 'assets', 'games.json');
const GAMELIST   = path.join(ROOT, '..', 'GameList.github.io');

if (!fs.existsSync(GAMELIST)) {
  console.error(`GameList repo not found at: ${GAMELIST}`);
  console.error('Clone it alongside UBGHyper.github.io and re-run.');
  process.exit(1);
}

const games = JSON.parse(fs.readFileSync(GAMES_JSON, 'utf8'));

async function run() {
  let converted = 0, skipped = 0, errors = 0;
  const updated = [];

  for (const game of games) {
    const { url, image } = game;
    if (!url || !image) { updated.push(game); continue; }

    const gameDir = path.join(GAMELIST, url);
    const srcPath = path.join(gameDir, image);

    if (!fs.existsSync(srcPath)) {
      console.warn(`SKIP  ${url}/${image} — not found`);
      updated.push(game);
      skipped++;
      continue;
    }

    // Output always at the game root (flatten any subdirs in the image path)
    const basename = path.basename(image, path.extname(image));
    const outName  = `${basename}.jpg`;
    const outPath  = path.join(gameDir, outName);

    // Back up the original (once, preserving any subdirectory structure)
    const originalsDir = path.join(gameDir, 'originals');
    const backupPath   = path.join(originalsDir, image);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(srcPath, backupPath);
    }

    // Skip if an up-to-date output already exists
    if (fs.existsSync(outPath)) {
      const outMtime = fs.statSync(outPath).mtimeMs;
      const srcMtime = fs.statSync(srcPath).mtimeMs;
      if (outMtime >= srcMtime) {
        updated.push({ ...game, image: outName });
        skipped++;
        continue;
      }
    }

    try {
      const img = await Jimp.read(srcPath);
      await img
        .cover(200, 200)
        .quality(85)
        .writeAsync(outPath);

      const srcKB = Math.round(fs.statSync(srcPath).size / 1024);
      const outKB = Math.round(fs.statSync(outPath).size / 1024);
      console.log(`OK    ${url}/${image}  ${srcKB}KB → ${outKB}KB`);
      updated.push({ ...game, image: outName });
      converted++;
    } catch (err) {
      if (err.message.includes('Unsupported MIME type')) {
        // File has wrong extension — detect real type and copy as-is
        const realType = detectType(srcPath);
        if (realType) {
          const fixedName = `${basename}.${realType}`;
          const fixedPath = path.join(gameDir, fixedName);
          if (!fs.existsSync(fixedPath)) fs.copyFileSync(srcPath, fixedPath);
          const kb = Math.round(fs.statSync(fixedPath).size / 1024);
          console.log(`COPY  ${url}/${image} → ${fixedName} (${realType}, ${kb}KB — resize skipped)`);
          updated.push({ ...game, image: fixedName });
          converted++;
        } else {
          console.error(`ERR   ${url}/${image}: ${err.message}`);
          updated.push(game);
          errors++;
        }
      } else {
        console.error(`ERR   ${url}/${image}: ${err.message}`);
        updated.push(game);
        errors++;
      }
    }
  }

  fs.writeFileSync(GAMES_JSON, JSON.stringify(updated, null, 2) + '\n');
  console.log(`\n${converted} converted, ${skipped} skipped, ${errors} errors`);
  console.log('games.json updated — commit both repos when done.');
}

run().catch(err => { console.error(err); process.exit(1); });
