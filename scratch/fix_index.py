import sys

path = r'f:\Krishiv portfolio\index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if 'Back to top</a>' in line:
        new_lines.append('    </div>\n')
        new_lines.append('  </footer>\n')
        new_lines.append('  <script>\n')
        new_lines.append('    (function() {\n')

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done")
