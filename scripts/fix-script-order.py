import os
import re

def fix_html_file(filepath):
    # Skip files that shouldn't be touched
    basename = os.path.basename(filepath).lower()
    if basename in ['admin.private.html', 'usage-admin.private.html', 'old_index.html']:
        return

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Skipping {basename} due to encoding issues (likely not UTF-8)")
        return

    # 1. Ensure body has app-theme-root class
    # Match <body ... >
    body_match = re.search(r'<body([^>]*)>', content, re.IGNORECASE)
    if body_match:
        body_attrs = body_match.group(1)
        if 'app-theme-root' not in body_attrs:
            if 'class="' in body_attrs:
                # Append to existing class
                new_attrs = re.sub(r'class="([^"]*)"', r'class="\1 app-theme-root"', body_attrs)
                content = content.replace(f'<body{body_attrs}>', f'<body{new_attrs}>')
            else:
                # Add class attribute
                content = content.replace(f'<body{body_attrs}>', f'<body class="app-theme-root"{body_attrs}>')
    
    # 2. Remove existing script tags for the target scripts
    scripts_to_remove = [
        'app-catalog.js',
        'app-universe-shell.js',
        'usage-tracker.js',
        'future-upgrade.js',
        'premium-ui-injector.js' # Also check for this one just in case
    ]
    
    for script in scripts_to_remove:
        # Match <script ... src="script" ...></script> or <script ... src='script' ...></script>
        pattern = rf'<script[^>]*src=["\']{re.escape(script)}["\'][^>]*>\s*</script>'
        content = re.sub(pattern, '', content, flags=re.IGNORECASE)

    # 3. Add scripts back at the end of body
    scripts_to_add = [
        '<script src="app-catalog.js"></script>',
        '<script src="app-universe-shell.js" defer></script>',
        '<script src="usage-tracker.js" defer></script>'
    ]
    
    if basename == 'index.html':
        scripts_to_add.append('<script src="future-upgrade.js" defer></script>')
    
    scripts_block = '\n  ' + '\n  '.join(scripts_to_add) + '\n'
    
    if '</body>' in content:
        content = content.replace('</body>', scripts_block + '</body>')
    else:
        content += scripts_block

    # Clean up double newlines or spaces caused by removals
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    root_dir = '.'
    for filename in os.listdir(root_dir):
        if filename.endswith('.html'):
            print(f"Fixing {filename}...")
            fix_html_file(os.path.join(root_dir, filename))

if __name__ == "__main__":
    main()
