path = r'f:\Krishiv portfolio\games.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The inline script starts with "const pageLoader = document.getElementById('pag"
old = "<script>\n    const pageLoader = document.getElementById('pag"
new = """<script>
    // CRITICAL: dismiss loader immediately
    (function() {
      var l = document.getElementById('pageLoader');
      if (l) { l.style.transition = 'opacity 0.5s ease'; l.style.opacity = '0'; setTimeout(function() { l.parentNode && l.parentNode.removeChild(l); }, 500); }
      document.body.classList.add('page-ready');
      document.body.classList.remove('preboot');
      window._loaderHandled = true;
    })();

    const pageLoader = document.getElementById('pag"""

if old in content:
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: games.html loader dismissal injected.')
else:
    print('ERROR: target not found')
    idx = content.find("const pageLoader")
    print(f"pageLoader const at: {idx}")
    print(repr(content[idx-30:idx+60]))
