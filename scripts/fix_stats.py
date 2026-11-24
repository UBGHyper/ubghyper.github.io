import re
with open('stats.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace everything from <script>\n// ── Theme  to </script>\n</body>
new_str = '<script src="assets/js/utils.js" defer></script>\n<script src="assets/js/stats.js" defer></script>\n</body>'
c = re.sub(r'<script>.*?// ── Theme.*?</script>\s*</body>', new_str, c, flags=re.DOTALL)

with open('stats.html', 'w', encoding='utf-8') as f:
    f.write(c)
