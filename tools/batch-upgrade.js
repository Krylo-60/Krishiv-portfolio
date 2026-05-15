const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDE = new Set([
  'index.html', 'games.html', 'projects.html', '404.html', 'robots.txt', 'sitemap.xml', 'manifest.webmanifest', 'owner.private.html', 'admin.private.html'
]);
const EXCLUDE_DIRS = new Set(['.git', 'node_modules', '.kilo', '.netlify', 'tools']);

function walk(dir) {
  const out = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (EXCLUDE_DIRS.has(it.name)) continue;
      out.push(...walk(p));
    } else if (it.isFile() && p.endsWith('.html')) {
      if (EXCLUDE_DIRS.has(path.basename(path.dirname(p)))) continue;
      out.push(p);
    }
  }
  return out;
}

function updateFile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (EXCLUDE.has(path.basename(rel))) return null;
  let s = fs.readFileSync(file, 'utf8');
  const bodyMatch = s.match(/<body\b([^>]*)>/i);
  if (!bodyMatch) return null;
  const bodyAttrs = bodyMatch[1];
  if (/app-theme-root/.test(bodyAttrs)) {
    // already has class
  } else {
    if (/class\s*=\s*"([^"]*)"/i.test(bodyAttrs)) {
      s = s.replace(/<body\b([^>]*)class\s*=\s*"([^"]*)"/i, (m, before, cls) => {
        const newCls = (cls + ' app-theme-root').trim();
        return `<body${before}class="${newCls}"`;
      });
    } else if (/class\s*=\s*'([^']*)'/i.test(bodyAttrs)) {
      s = s.replace(/<body\b([^>]*)class\s*=\s*'([^']*)'/i, (m, before, cls) => {
        const newCls = (cls + ' app-theme-root').trim();
        return `<body${before}class='${newCls}'`;
      });
    } else {
      s = s.replace(/<body\b([^>]*)>/i, `<body$1 class="app-theme-root">`);
    }
  }

  // remove any existing target script tags so we can append canonical set
  s = s.replace(/<script[^>]+src=\"?app-catalog\.js\"?[^>]*>[\s\S]*?<\/script>\s*/ig, '');
  s = s.replace(/<script[^>]+src=\"?app-universe-shell\.js\"?[^>]*>[\s\S]*?<\/script>\s*/ig, '');
  s = s.replace(/<script[^>]+src=\"?usage-tracker\.js\"?[^>]*>[\s\S]*?<\/script>\s*/ig, '');
  s = s.replace(/<script[^>]+src=\"?future-upgrade\.js\"?[^>]*>[\s\S]*?<\/script>\s*/ig, '');

  const scriptsBlock = `  <script src="app-catalog.js"></script>\n  <script src="app-universe-shell.js" defer></script>\n  <script src="usage-tracker.js" defer></script>\n  <script src="future-upgrade.js" defer></script>\n`;

  if (s.includes('</body>')) {
    s = s.replace(/\s*<\/body>/i, `\n${scriptsBlock}</body>`);
  } else {
    s += `\n${scriptsBlock}`;
  }

  fs.writeFileSync(file, s, 'utf8');
  return rel;
}

function main() {
  const files = walk(ROOT);
  const changed = [];
  for (const f of files) {
    const r = updateFile(f);
    if (r) changed.push(r);
  }
  console.log('Batch upgrade complete. Files updated:', changed.length);
  for (const c of changed) console.log('- ' + c);
}

main();
