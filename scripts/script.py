import os
import sys

FILES_TO_DELETE = [
    'ads.txt',
    'sw.js',
    'appmanifest.json',
    'manifest.json',
    'git-update.txt',
    '404.html',
    '408.html',
    'games235.html',
    'ubg235.html',
    'frame.html',
    'ahrefs_585f4691b0e399a160cb6e0c016b4fcd7b0c55de8ae4d7dc4c83d5d0761520b3',
]

TRACKING_JS = [
    'analytics_ubg_v1_4.js',
    'ubg235_client_v1_1.js',
    'analytics_games235.js',
    'slopegame-gitlab-io.js',
]

CLEAN_INDEX = """\
<!DOCTYPE HTML>
<html>
<head>
    <title>Raft Wars</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #000;
            -webkit-user-select: none;
            user-select: none;
        }
        #game-container {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        #game-container canvas {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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

def delete_junk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            if file in FILES_TO_DELETE:
                print(f"Deleted: {filepath}")
                os.remove(filepath)
            elif file in TRACKING_JS:
                print(f"Deleted tracking JS: {filepath}")
                os.remove(filepath)

def write_clean_index(directory):
    path = os.path.join(directory, 'index.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(CLEAN_INDEX)
    print(f"Wrote clean index.html -> {path}")

def process(directory):
    print(f"Cleaning: {directory}")
    delete_junk(directory)
    write_clean_index(directory)
    print("Done.")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    if os.path.isdir(target):
        process(target)
    else:
        print(f"Directory not found: {target}")
