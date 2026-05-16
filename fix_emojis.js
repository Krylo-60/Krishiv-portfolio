const fs = require('fs');
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = dir + '/' + f;
    if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== '.git') walk(p);
    else if (p.endsWith('.js') || p.endsWith('.html')) {
      let txt = fs.readFileSync(p, 'utf8');
      let changed = false;
      if (txt.includes('&#x2705;')) { txt = txt.replace(/&#x2705;/g, '&#x2705;'); changed = true; }
      if (txt.includes('&#x1F916;')) { txt = txt.replace(/&#x1F916;/g, '&#x1F916;'); changed = true; }
      if (txt.includes('&#x1F680;')) { txt = txt.replace(/&#x1F680;/g, '&#x1F680;'); changed = true; }
      if (txt.includes('&#x1F91D;')) { txt = txt.replace(/&#x1F91D;/g, '&#x1F91D;'); changed = true; }
      
      if (changed) {
        fs.writeFileSync(p, txt, 'utf8');
        console.log('Fixed emojis in ' + p);
      }
    }
  }
}
walk('.');
