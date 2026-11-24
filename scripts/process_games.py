import os
import sys
import shutil
import subprocess

GAMELIST_DIR = r"C:\Users\grrrp\OneDrive\Documents\GitHub\GameList.github.io"
TEMP_DIR = r"C:\Users\grrrp\OneDrive\Documents\GitHub\temp_games"

FILES_TO_DELETE = [
    'ads.txt', 'sw.js', 'appmanifest.json', 'manifest.json',
    'git-update.txt', '404.html', '408.html', 'games235.html',
    'ubg235.html', 'frame.html',
    'ahrefs_585f4691b0e399a160cb6e0c016b4fcd7b0c55de8ae4d7dc4c83d5d0761520b3',
]
TRACKING_JS = [
    'analytics_ubg_v1_4.js', 'ubg235_client_v1_1.js',
    'analytics_games235.js', 'slopegame-gitlab-io.js',
]

# Clean index.html for Raft Wars HTML5 (replaces bloated original)
RAFTWARS_INDEX = """\
<!DOCTYPE HTML>
<html>
<head>
    <title>Raft Wars</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }
        #game-container { position: absolute; width: 100%; height: 100%; }
        #game-container canvas {
            display: block; position: absolute;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
        }
        #banner { display: none !important; }
    </style>
    <script src="patch/js/poki-sdk.js"></script>
    <script src="js/phaser.min.js"></script>
    <script src="js/BitmapText.js"></script>
    <script src="js/phaser-spine.min.js"></script>
    <script src="js/box2d-plugin-full.min.js"></script>
    <script src="js/plugin-api-poki.js"></script>
    <script src="js/m.js"></script>
</head>
<body>
    <div id="game-container"></div>
    <div id="banner" style="display:none"></div>
</body>
</html>
"""

# (github_url, branch_or_None, gamelist_target_name, write_clean_index)
REPOS = [
    ("https://github.com/ubg98/RaftWars",                       "gh-pages", "Raft-Wars-HTML5",           True),
    ("https://github.com/ubg98/TunnelRush2",                    None,       "Tunnel-Rush-2",             False),
    ("https://github.com/ubg98/StickmanHook",                   None,       "Stickman-Hook",             False),
    ("https://github.com/ubg98/CrazyCars",                      None,       "Crazy-Cars",                False),
    ("https://github.com/ubg98/CrossyRoad",                     None,       "Crossy-Road",               False),
    ("https://github.com/ubg98/Vex8",                           None,       "Vex-8",                     False),
    ("https://github.com/ubg98/SnailBob",                       None,       "Snail-Bob",                 False),
    ("https://github.com/ubg98/SnailBob2",                      None,       "Snail-Bob-2",               False),
    ("https://github.com/ubg98/SnailBob3",                      None,       "Snail-Bob-3",               False),
    ("https://github.com/ubg98/SnailBob4",                      None,       "Snail-Bob-4",               False),
    ("https://github.com/ubg98/SnailBob5",                      None,       "Snail-Bob-5",               False),
    ("https://github.com/ubg98/SnailBob6",                      None,       "Snail-Bob-6",               False),
    ("https://github.com/ubg98/SnailBob7",                      None,       "Snail-Bob-7",               False),
    ("https://github.com/ubg98/SnailBob8",                      None,       "Snail-Bob-8",               False),
    ("https://github.com/ubg98/FishingFrenzy",                  None,       "Fishing-Frenzy",            False),
    ("https://github.com/ubg98/HappyFishing",                   None,       "Happy-Fishing",             False),
    ("https://github.com/ubg98/IdleBreakout",                   None,       "Idle-Breakout",             False),
    ("https://github.com/ubg98/HoopRoyale",                     None,       "Hoop-Royale",               False),
    ("https://github.com/ubg98/ClashOfTanks",                   None,       "Clash-Of-Tanks",            False),
    ("https://github.com/ubg98/SoccerMastersEuro2020",          None,       "Soccer-Masters-Euro-2020",  False),
    ("https://github.com/ubg98/SoccerRandom",                   None,       "Soccer-Random",             False),
    ("https://github.com/ubg98/PolyArt3D",                      None,       "Poly-Art-3D",               False),
    ("https://github.com/ubg98/FruitNinja",                     None,       "Fruit-Ninja",               False),
    ("https://github.com/ubg98/BasketballLine",                  None,       "Basketball-Line",           False),
    ("https://github.com/ubg98/MinecraftCaseSimulator",         None,       "Minecraft-Case-Simulator",  False),
    ("https://github.com/ubg98/SuperMarioWonder",               None,       "Super-Mario-Wonder",        False),
    ("https://github.com/ubg98/StickMerge",                     None,       "Stick-Merge",               False),
    ("https://github.com/ubg98/StickMerge2",                    None,       "Stick-Merge-2",             False),
    ("https://github.com/ubg98/LittleAlchemy2",                 None,       "Little-Alchemy-2",          False),
    ("https://github.com/ubg98/BasketChamps",                   None,       "Basket-Champs",             False),
    ("https://github.com/ubg98/BasketballLegends2020",          None,       "Basketball-Legends-2020",   False),
    ("https://github.com/ubg98/DriftBoss",                      None,       "Drift-Boss",                False),
    ("https://github.com/gold20099/Drift-Hunters",              None,       "Drift-Hunters",             False),
    ("https://github.com/SoBloxsy/rooftop-snipers",            None,       "Rooftop-Snipers",           False),
    ("https://github.com/PRXYBOSS101/monkey-mart",              None,       "Monkey-Mart",               False),
    ("https://github.com/ubg17/PaperIO2",                       None,       "Paper-IO-2",                False),
    ("https://github.com/ReznorsRevenge1/retro-bowl-college",   None,       "Retro-Bowl-College",        False),
    ("https://github.com/BasketballStarsUnblocked/BasketballStarsUnblocked.github.io", None, "Basketball-Stars", False),
    ("https://github.com/MajesticWafer/tiny-fishing",           None,       "Tiny-Fishing",              False),
]

# hd_fnaf is one repo with subdirs per game
FNAF_REPO = "https://github.com/irv77/hd_fnaf"
FNAF_SUBDIRS = {
    "1":   "FNAF-1",
    "2":   "FNAF-2",
    "3":   "FNAF-3",
    "4":   "FNAF-4",
    "5":   "FNAF-5",
    "ps":  "FNAF-Pizzeria-Simulator",
    "sl":  "FNAF-Sister-Location",
    "ucn": "FNAF-UCN",
    "w":   "FNAF-World",
}


def delete_junk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file in FILES_TO_DELETE or file in TRACKING_JS:
                filepath = os.path.join(root, file)
                print(f"  Deleted junk: {filepath}")
                os.remove(filepath)


def _force_remove(func, path, _exc):
    import stat
    os.chmod(path, stat.S_IWRITE)
    func(path)

def remove_git_dir(directory):
    git_dir = os.path.join(directory, '.git')
    if os.path.isdir(git_dir):
        shutil.rmtree(git_dir, onexc=_force_remove)


def clone_repo(url, branch, dest):
    cmd = ["git", "clone", "--depth", "1"]
    if branch:
        cmd += ["--branch", branch, "--single-branch"]
    cmd += [url, dest]
    print(f"  Cloning {url} (branch={branch}) -> {dest}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  FAILED: {result.stderr.strip()}")
        return False
    return True


def copy_to_gamelist(src, name):
    dest = os.path.join(GAMELIST_DIR, name)
    if os.path.exists(dest):
        print(f"  Removing existing: {dest}")
        shutil.rmtree(dest)
    shutil.copytree(src, dest)
    print(f"  -> GameList/{name}")


def process():
    os.makedirs(TEMP_DIR, exist_ok=True)
    failed = []

    for url, branch, target_name, write_clean in REPOS:
        print(f"\n[{target_name}]")
        clone_dest = os.path.join(TEMP_DIR, target_name)

        if not os.path.exists(clone_dest):
            ok = clone_repo(url, branch, clone_dest)
            if not ok:
                failed.append(target_name)
                continue

        remove_git_dir(clone_dest)
        delete_junk(clone_dest)

        if write_clean:
            idx = os.path.join(clone_dest, 'index.html')
            with open(idx, 'w', encoding='utf-8') as f:
                f.write(RAFTWARS_INDEX)
            print(f"  Wrote clean index.html")

        copy_to_gamelist(clone_dest, target_name)

    # FNAF - clone whole repo, then copy each subdir
    print(f"\n[FNAF - cloning monorepo]")
    fnaf_temp = os.path.join(TEMP_DIR, "hd_fnaf")
    if not os.path.exists(fnaf_temp):
        result = subprocess.run(
            ["git", "clone", "--depth", "1", FNAF_REPO, fnaf_temp],
            capture_output=True, text=True
        )
        if result.returncode != 0:
            print(f"  FAILED to clone FNAF repo: {result.stderr.strip()}")
            failed.append("hd_fnaf")
        else:
            print(f"  Cloned FNAF repo OK")
    else:
        print(f"  FNAF repo already cloned")

    if os.path.exists(fnaf_temp):
        for subdir, target_name in FNAF_SUBDIRS.items():
            print(f"\n[{target_name}]")
            src = os.path.join(fnaf_temp, subdir)
            if os.path.isdir(src):
                delete_junk(src)
                copy_to_gamelist(src, target_name)
            else:
                print(f"  Subdir not found: {subdir}")
                failed.append(target_name)

    print(f"\n{'='*40}")
    if failed:
        print(f"FAILED ({len(failed)}): {', '.join(failed)}")
    else:
        print("All games processed successfully.")


if __name__ == "__main__":
    process()
