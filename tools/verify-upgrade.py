import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
EXCLUDE = {
    'index.html', 'games.html', 'projects.html', '404.html', 'robots.txt',
    'sitemap.xml', 'manifest.webmanifest', 'owner.private.html', 'admin.private.html'
}
EXCLUDE_DIRS = {'.git', 'node_modules', '.kilo', '.netlify', 'tools'}

issues = []
count = 0
for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
    for fname in files:
        if not fname.lower().endswith('.html'):
            continue
        if fname in EXCLUDE:
            continue
        count += 1
        path = os.path.join(dirpath, fname)
        text = open(path, 'r', encoding='utf-8').read()
        body = re.search(r'<body\b([^>]*)>', text, re.I)
        if not body:
            issues.append((fname, 'no-body'))
            continue
        if 'app-theme-root' not in body.group(1):
            issues.append((fname, 'missing-app-theme-root'))
        tail = text.lower()[-400:]
        if not re.search(r'<script\s+src=["\']?app-catalog\.js["\']?[^>]*>\s*</script>', tail, re.I):
            issues.append((fname, 'missing-app-catalog'))
        if not re.search(r'<script\s+src=["\']?app-universe-shell\.js["\']?[^>]*defer[^>]*>\s*</script>', tail, re.I):
            issues.append((fname, 'missing-shell'))
        if not re.search(r'<script\s+src=["\']?usage-tracker\.js["\']?[^>]*defer[^>]*>\s*</script>', tail, re.I):
            issues.append((fname, 'missing-usage-tracker'))
        if not re.search(r'<script\s+src=["\']?future-upgrade\.js["\']?[^>]*defer[^>]*>\s*</script>', tail, re.I):
            issues.append((fname, 'missing-future-upgrade'))

print('checked', count, 'html files')
print('issues', len(issues))
for fname, issue in issues[:50]:
    print(fname, issue)
