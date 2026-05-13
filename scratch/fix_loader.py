path = r'f:\Krishiv portfolio\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The script tag we need to modify
old = '  <script>\n    (function() {'

# Add an immediate loader dismissal before the IIFE
new = '''  <script>
    // CRITICAL: dismiss loader first, before any other JS runs
    (function() {
      var l = document.getElementById('pageLoader');
      if (l) { l.style.transition = 'opacity 0.5s ease'; l.style.opacity = '0'; setTimeout(function() { l.parentNode && l.parentNode.removeChild(l); }, 500); }
      document.body.classList.add('page-ready');
      document.body.classList.remove('preboot');
      window._loaderHandled = true;
    })();

    (function() {'''

if old in content:
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: Loader dismissal injected at top of inline script.')
else:
    print('ERROR: Target string not found in index.html')
    # Show context
    idx = content.find('<script>\n    (function')
    print(f'Search result for script+function: pos={idx}')
    idx2 = content.find('<script>')
    print(f'First script tag at: {idx2}')
    # Find script near footer
    footer_idx = content.find('</footer>')
    script_idx = content.find('<script>', footer_idx)
    print(f'Script after footer at: {script_idx}')
    print(repr(content[script_idx:script_idx+80]))
