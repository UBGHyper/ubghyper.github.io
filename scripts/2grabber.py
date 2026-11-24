#!/usr/bin/env python3
"""
Unblocked Games Emulator Site Builder (with Cover Art)
---------------------------------------------------------
Downloads ROMs from Archive.org, fetches box-art from the libretro-thumbnails
repository, and generates iframe-embeddable HTML pages powered by EmulatorJS.
"""

import json
import re
import time
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

# ─────────────────────────────────────────────
#  Optional dependencies (graceful fallback)
# ─────────────────────────────────────────────
try:
    import requests
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False
    print("[!] 'requests' not found — falling back to urllib (slower, no retries)")

try:
    from tqdm import tqdm
    HAS_TQDM = True
except ImportError:
    HAS_TQDM = False

# ─────────────────────────────────────────────
#  CONFIG
# ─────────────────────────────────────────────
OUTPUT_DIR     = Path("games")
LIBRETRO_BASE  = "https://raw.githubusercontent.com/libretro-thumbnails"

CORE_TO_LIBRETRO = {
    "gba":    "Nintendo_-_Game_Boy_Advance",
    "gbc":    "Nintendo_-_Game_Boy_Color",
    "gb":     "Nintendo_-_Game_Boy",
    "nes":    "Nintendo_-_Nintendo_Entertainment_System",
    "snes":   "Nintendo_-_Super_Nintendo_Entertainment_System",
    "segaMD": "Sega_-_Mega_Drive_-_Genesis",
    "n64":    "Nintendo_-_Nintendo_64",
    "nds":    "Nintendo_-_Nintendo_DS",
}

CORE_EXTS = {
    "gba":    [".gba"],
    "gb":     [".gb"],
    "gbc":    [".gbc"],
    "nes":    [".nes"],
    "snes":   [".sfc", ".smc"],
    "n64":    [".z64", ".n64"],
    "nds":    [".nds"],
    "segaMD": [".md", ".gen"],
}

# ─────────────────────────────────────────────
#  GAME LIST (With Fixed Links)
# ─────────────────────────────────────────────
GAMES = [
    {
        "slug": "pokemon-fire-red",
        "name": "Pokemon Fire Red",
        "core": "gba",
        "archive_id": "pokemon-fire-red-version-v1.1",
        "archive_file": "Pokemon - Fire Red Version (USA, Europe).gba",
        "tags": "GBA · Pokemon",
        "cover_name": "Pokemon - Fire Red Version (USA, Europe)",
    },
    {
        "slug": "pokemon-emerald",
        "name": "Pokemon Emerald",
        "core": "gba",
        "archive_id": "pokemon-emerald-version-usa-europe", # FIXED ID
        "archive_file": "Pokemon - Emerald Version (USA, Europe).gba",
        "tags": "GBA · Pokemon",
        "cover_name": "Pokemon - Emerald Version (USA, Europe)",
    },
    {
        "slug": "pokemon-ruby",
        "name": "Pokemon Ruby",
        "core": "gba",
        "archive_id": "Pokemon-Ruby-Version-GBA",
        "archive_file": "Pokemon - Ruby Version (USA, Europe) (Rev 2).gba",
        "tags": "GBA · Pokemon",
        "cover_name": "Pokemon - Ruby Version (USA, Europe) (Rev 2)",
    },
    {
        "slug": "pokemon-sapphire",
        "name": "Pokemon Sapphire",
        "core": "gba",
        "archive_id": "Pokemon-Sapphire-Version-GBA",
        "archive_file": "Pokemon - Sapphire Version (USA, Europe) (Rev 2).gba",
        "tags": "GBA · Pokemon",
        "cover_name": "Pokemon - Sapphire Version (USA, Europe) (Rev 2)",
    },
    {
        "slug": "pokemon-leaf-green",
        "name": "Pokemon Leaf Green",
        "core": "gba",
        "archive_id": "PokemonLeafGreenVersionUSA",
        "archive_file": "Pokemon - Leaf Green Version (USA, Europe).gba",
        "tags": "GBA · Pokemon",
        "cover_name": "Pokemon - Leaf Green Version (USA, Europe)",
    },
    {
        "slug": "pokemon-radical-red",
        "name": "Pokemon Radical Red",
        "core": "gba",
        "archive_id": "pokemon-radical-red-v4.1",
        "archive_file": "Pokemon Radical Red (v4.1).gba",
        "tags": "GBA · ROM Hack · Hard",
        "cover_name": "",
        "cover_color": "#c0392b",
        "description": "Brutal FireRed hack with Gen 8 Pokemon, mega evolutions, and punishing AI.",
    },
    {
        "slug": "super-mario-world",
        "name": "Super Mario World",
        "core": "snes",
        "archive_id": "super-mario-world-usa",
        "archive_file": "Super Mario World (USA).sfc",
        "tags": "SNES · Platformer",
        "cover_name": "Super Mario World (USA)",
    },
    {
        "slug": "super-mario-bros",
        "name": "Super Mario Bros",
        "core": "nes",
        "archive_id": "Super-Mario-Bros-NES",
        "archive_file": "Super Mario Bros. (World).nes",
        "tags": "NES · Platformer",
        "cover_name": "Super Mario Bros. (World)",
    },
    {
        "slug": "sonic-2",
        "name": "Sonic the Hedgehog 2",
        "core": "segaMD",
        "archive_id": "sonic-the-hedgehog-2-genesis",
        "archive_file": "Sonic The Hedgehog 2 (USA, Europe).md",
        "tags": "Genesis · Platformer",
        "cover_name": "Sonic The Hedgehog 2 (USA, Europe)",
    }
]

# ─────────────────────────────────────────────
#  EMULATOR HTML TEMPLATE
# ─────────────────────────────────────────────
HTML_TEMPLATE = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{name}</title>
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    html, body {{
      width: 100%; height: 100%;
      background: #000;
      overflow: hidden;
    }}
    #game-container {{
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
    }}
    #game, #emulator {{ width: 100% !important; height: 100% !important; }}
  </style>
</head>
<body>
  <div id="game-container">
    <div id="game"></div>
  </div>
  <script>
    EJS_player        = "#game";
    EJS_core          = "{core}";
    EJS_gameUrl       = "rom{ext}";
    EJS_pathtodata    = "https://cdn.emulatorjs.org/stable/data/";
    EJS_color         = "#1a1a2e";
    EJS_startOnLoaded = false;
    EJS_gameName      = "{slug}";
    EJS_Buttons = {{
      playPause: true, restart: true, mute: true,
      settings: true, fullscreen: true,
      saveState: true, loadState: true,
      gamepad: true, volume: true, screenshot: true,
    }};
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>
</html>
"""

# ─────────────────────────────────────────────
#  SVG PLACEHOLDER (for ROM hacks / missing art)
# ─────────────────────────────────────────────
def make_svg_cover(game: dict) -> str:
    name  = game["name"]
    tags  = game["tags"]
    color = game.get("cover_color", "#2c2c54")

    words  = name.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        if len(test) <= 14:
            line = test
        else:
            if line: lines.append(line)
            line = word
    if line: lines.append(line)

    text_els = ""
    start_y  = 120 - (len(lines) - 1) * 14
    for j, l in enumerate(lines):
        y = start_y + j * 28
        text_els += (
            f'<text x="100" y="{y}" text-anchor="middle" '
            f'font-size="19" font-weight="700" fill="white" '
            f'font-family="system-ui,sans-serif">{l}</text>\n'
        )

    dots = ""
    for gx in range(10, 200, 18):
        for gy in range(10, 270, 18):
            dots += f'<circle cx="{gx}" cy="{gy}" r="1" fill="rgba(255,255,255,0.07)"/>'

    tag_short = tags.split("·")[0].strip()

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color}"/>
      <stop offset="100%" stop-color="#080810"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
  </defs>
  <rect width="200" height="280" fill="url(#bg)"/>
  <rect width="200" height="140" fill="url(#shine)"/>
  {dots}
  <circle cx="100" cy="80" r="50" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <circle cx="100" cy="80" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="50" y1="80" x2="150" y2="80" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <circle cx="100" cy="80" r="8" fill="rgba(255,255,255,0.25)"/>
  {text_els}
  <rect x="10" y="252" width="180" height="20" rx="5" fill="rgba(255,255,255,0.08)"/>
  <text x="100" y="266" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,0.6)"
        font-family="system-ui,sans-serif" letter-spacing="1.5">ROM HACK  ·  {tag_short}</text>
</svg>"""

# ─────────────────────────────────────────────
#  NETWORKING
# ─────────────────────────────────────────────
def make_session():
    if not HAS_REQUESTS: return None
    s = requests.Session()
    retry = Retry(total=5, backoff_factor=1.5, status_forcelist=[429, 500, 502, 503, 504])
    s.mount("https://", HTTPAdapter(max_retries=retry))
    s.mount("http://",  HTTPAdapter(max_retries=retry))
    s.headers["User-Agent"] = "Mozilla/5.0 (compatible; UnblockedGamesBuilder/1.0)"
    return s

def download_file(url: str, dest: Path, session=None, label: str = "", quiet: bool = False) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        if HAS_REQUESTS and session:
            with session.get(url, stream=True, timeout=60) as r:
                r.raise_for_status()
                total = int(r.headers.get("content-length", 0))
                if HAS_TQDM and total and not quiet:
                    with tqdm(total=total, unit="B", unit_scale=True, desc=label or dest.name, ncols=70) as bar:
                        with open(dest, "wb") as f:
                            for chunk in r.iter_content(8192):
                                f.write(chunk); bar.update(len(chunk))
                else:
                    with open(dest, "wb") as f:
                        for chunk in r.iter_content(8192):
                            f.write(chunk)
        else:
            urllib.request.urlretrieve(url, dest)
        return True
    except Exception as e:
        if dest.exists(): dest.unlink()
        if not quiet: print(f"    ERROR: {e}")
        return False

# ─────────────────────────────────────────────
#  COVER ART
# ─────────────────────────────────────────────
def libretro_url(core: str, cover_name: str) -> str:
    system  = CORE_TO_LIBRETRO.get(core, "")
    encoded = urllib.parse.quote(cover_name.replace("&", "_") + ".png")
    return f"{LIBRETRO_BASE}/{system}/master/Named_Boxarts/{encoded}"

def fetch_cover(game: dict, game_dir: Path, session) -> str:
    cover_png = game_dir / "cover.png"
    cover_svg = game_dir / "cover.svg"

    if cover_png.exists() and cover_png.stat().st_size > 500: return "cover.png"
    if cover_svg.exists(): return "cover.svg"

    candidates = []
    if game.get("cover_name"): candidates.append(game["cover_name"])

    derived = re.sub(r"^The\s+(.+)", r"\1, The", game["name"]).strip()
    if derived not in candidates: candidates.append(derived)

    for name_try in candidates:
        url = libretro_url(game["core"], name_try)
        ok  = download_file(url, cover_png, session, quiet=True)
        if ok and cover_png.stat().st_size > 500:
            print(f"  🖼  Box art found  ({name_try[:48]})")
            return "cover.png"

    cover_svg.write_text(make_svg_cover(game), encoding="utf-8")
    print(f"  🎨  SVG cover generated (not in libretro-thumbnails)")
    return "cover.svg"

# ─────────────────────────────────────────────
#  ROM DOWNLOAD
# ─────────────────────────────────────────────
def archive_url(item_id: str, filename: str) -> str:
    return f"https://archive.org/download/{item_id}/{urllib.parse.quote(filename)}"

def try_archive_download(game: dict, dest: Path, session) -> bool:
    url = archive_url(game["archive_id"], game["archive_file"])
    print(f"  ROM → {url}")
    
    # Critical delay to prevent Archive.org 503 Rate Limiting
    time.sleep(2)

    if download_file(url, dest, session, label=game["name"]):
        return True

    print("  Trying Archive.org metadata scan…")
    try:
        meta_url = f"https://archive.org/metadata/{game['archive_id']}"
        if HAS_REQUESTS and session:
            meta = session.get(meta_url, timeout=15).json()
        else:
            with urllib.request.urlopen(meta_url, timeout=15) as r:
                meta = json.loads(r.read())
        
        valid_exts = CORE_EXTS.get(game["core"], [])
        for f in meta.get("files", []):
            fname = f.get("name", "")
            if any(fname.lower().endswith(e) for e in valid_exts):
                new_dest = dest.parent / ("rom" + Path(fname).suffix)
                fallback  = archive_url(game["archive_id"], fname)
                print(f"  Fallback → {fname}")
                return download_file(fallback, new_dest, session, label=game["name"])
    except Exception as e:
        print(f"  Metadata error: {e}")
    return False

def write_html(game: dict, game_dir: Path, rom_ext: str):
    html = HTML_TEMPLATE.format(name=game["name"], slug=game["slug"], core=game["core"], ext=rom_ext)
    (game_dir / "index.html").write_text(html, encoding="utf-8")

# ─────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────
def main():
    print("=" * 62)
    print("  Unblocked Games Builder — EmulatorJS + libretro box art")
    print("=" * 62)
    print()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    session = make_session()
    results = {"ok": [], "skip": [], "fail": []}

    for i, game in enumerate(GAMES, 1):
        print(f"[{i:02d}/{len(GAMES)}]  {game['name']}  ({game['tags']})")
        game_dir = OUTPUT_DIR / game["slug"]
        game_dir.mkdir(parents=True, exist_ok=True)

        rom_ext  = Path(game["archive_file"]).suffix
        rom_dest = game_dir / f"rom{rom_ext}"

        # 1. Cover art
        fetch_cover(game, game_dir, session)
        
        # 2. ROM
        if rom_dest.exists() and rom_dest.stat().st_size > 10_000:
            print(f"  ROM cached ({rom_dest.stat().st_size // 1024} KB)")
            write_html(game, game_dir, rom_ext)
            results["skip"].append(game["slug"])
        else:
            ok = try_archive_download(game, rom_dest, session)
            roms = list(game_dir.glob("rom.*"))
            actual_ext = roms[0].suffix if roms else rom_ext
            write_html(game, game_dir, actual_ext)
            if ok:
                print(f"  Done → {game_dir}/index.html")
                results["ok"].append(game["slug"])
            else:
                print(f"  ROM download failed — add manually to {game_dir}/rom.*")
                results["fail"].append(game["slug"])
        print()

    # ── Summary ──────────────────────────────────────────────────────────
    print("=" * 62)
    print(f"  Downloaded : {len(results['ok'])}")
    print(f"  Cached     : {len(results['skip'])}")
    print(f"  Failed     : {len(results['fail'])}")
    if results["fail"]:
        print("\n  Add ROMs manually:")
        for slug in results["fail"]:
            print(f"    games/{slug}/rom.<ext>")
    print()

    # ── Manifest ─────────────────────────────────────────────────────────
    manifest = []
    for game in GAMES:
        game_dir = OUTPUT_DIR / game["slug"]
        roms     = list(game_dir.glob("rom.*"))
        covers   = list(game_dir.glob("cover.*"))
        manifest.append({
            "slug":        game["slug"],
            "name":        game["name"],
            "core":        game["core"],
            "tags":        game["tags"],
            "description": game.get("description", ""),
            "path":        f"games/{game['slug']}/index.html",
            "cover":       f"games/{game['slug']}/{covers[0].name}" if covers else "",
            "ready":       bool(roms),
        })

    Path("games_manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    print("  Manifest written → games_manifest.json")
    print("  Embed:  <iframe src='games/<slug>/index.html'>")
    print("=" * 62)

if __name__ == "__main__":
    main()