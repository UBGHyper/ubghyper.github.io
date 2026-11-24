import re

# index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern_index = re.compile(
    r'<script src="assets/js/icons\.js"></script>\s*<script src="assets/js/camo\.js"></script>\s*<script>.*?</script>',
    re.DOTALL
)
replacement_index = '''<script src="assets/js/icons.js"></script>
<script src="assets/js/camo.js"></script>
<script src="assets/js/utils.js" defer></script>
<script src="assets/js/render.js" defer></script>
<script src="assets/js/app.js" defer></script>'''

html = pattern_index.sub(replacement_index, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# play.html
with open('play.html', 'r', encoding='utf-8') as f:
    html_play = f.read()

pattern_play = re.compile(
    r'<script src="assets/js/icons\.js"></script>\s*<script src="assets/js/camo\.js"></script>\s*<script>.*?</script>',
    re.DOTALL
)
replacement_play = '''<script src="assets/js/icons.js"></script>
<script src="assets/js/camo.js"></script>
<script src="assets/js/utils.js" defer></script>
<script src="assets/js/render.js" defer></script>
<script src="assets/js/play.js" defer></script>'''

html_play = pattern_play.sub(replacement_play, html_play)

with open('play.html', 'w', encoding='utf-8') as f:
    f.write(html_play)

print("Replacement complete")
