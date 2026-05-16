const fs = require('fs');

// 1. Update index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(/v10\.2\.0/g, 'v13.0.0');
indexContent = indexContent.replace('Built by a kid who likes coding. Not perfect, but learning. &#x1F680;', 'Built by Krishiv PB (a kid who likes coding) &#x1F91D; Collabed with AI &#x1F916;. Not perfect, but learning fast! &#x1F680;');
fs.writeFileSync('index.html', indexContent, 'utf8');

// 2. Update app-universe-shell.js
let shellContent = fs.readFileSync('app-universe-shell.js', 'utf8');
const addon = `
  // Global Cursor Aura
  if (!document.getElementById('cursorAura')) {
    const aura = document.createElement('div');
    aura.id = 'cursorAura';
    aura.style.cssText = 'position: fixed; top: 0; left: 0; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(0,220,255,0.15) 0%, transparent 70%); pointer-events: none; transform: translate(-50%, -50%); z-index: 9999; mix-blend-mode: screen; transition: width 0.3s, height 0.3s; will-change: transform; opacity: 0;';
    document.body.appendChild(aura);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, auraX = mouseX, auraY = mouseY, auraVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!auraVisible) { aura.style.opacity = '1'; auraVisible = true; }
    }, { passive: true });

    window.addEventListener('mousedown', () => { aura.style.width = '400px'; aura.style.height = '400px'; });
    window.addEventListener('mouseup', () => { aura.style.width = '300px'; aura.style.height = '300px'; });

    function renderAura() {
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      aura.style.transform = 'translate(' + (auraX - 150) + 'px, ' + (auraY - 150) + 'px)';
      requestAnimationFrame(renderAura);
    }
    renderAura();
  }

  // Matrix Konami Code globally
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kIdx = 0;
  window.addEventListener('keydown', (e) => {
    if (e.key === konami[kIdx] || e.key.toLowerCase() === konami[kIdx].toLowerCase()) {
      kIdx++;
      if (kIdx === konami.length) {
        document.body.classList.toggle('matrix-mode');
        if (!document.getElementById('matrixStyle')) {
          const style = document.createElement('style');
          style.id = 'matrixStyle';
          style.textContent = 'body.matrix-mode { background: #000 !important; color: #0f0 !important; } body.matrix-mode * { border-color: #0f0 !important; box-shadow: none !important; } body.matrix-mode .card, body.matrix-mode .app-card, body.matrix-mode section { background: rgba(0,20,0,0.8) !important; backdrop-filter: none !important; } body.matrix-mode h1, body.matrix-mode h2, body.matrix-mode h3, body.matrix-mode p, body.matrix-mode a, body.matrix-mode span { color: #0f0 !important; text-shadow: 0 0 8px #0f0 !important; font-family: "JetBrains Mono", monospace !important; }';
          document.head.appendChild(style);
        }
        kIdx = 0;
      }
    } else {
      kIdx = 0;
    }
  });
})();`;
shellContent = shellContent.replace(/\}\)[\(\)]*;\s*$/, addon);
fs.writeFileSync('app-universe-shell.js', shellContent, 'utf8');

// 3. Update idea-lab-ai.html
let ideaContent = fs.readFileSync('idea-lab-ai.html', 'utf8');
const newCSS = `
    :root{--bg:#071223;--line:rgba(121,216,255,0.15);--text:#eef7ff;--muted:#a9c6e7;--ok:#56d5a6;--acc:#79d8ff;}
    *{box-sizing:border-box;}body{margin:0;color:var(--text);background:radial-gradient(circle at 15% 50%, rgba(10,34,58,1), rgba(3,10,20,1) 80%);min-height:100vh;}
    .wrap{width:min(1020px,94%);margin:24px auto;position:relative;z-index:2;}
    .card{border:1px solid var(--line);border-radius:18px;padding:24px;background:linear-gradient(145deg,rgba(18,40,68,.6),rgba(9,22,41,.6));box-shadow:0 16px 40px rgba(0,0,0,0.4);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);margin-bottom:16px;}
    h1,h2,h3{margin:0 0 12px;font-family:"Orbitron",sans-serif;color:var(--acc);}
    p{color:var(--muted);margin:0 0 8px;line-height:1.6;}
    input,textarea,button,select{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(121,216,255,0.2);background:rgba(5,16,30,0.7);color:var(--text);font:inherit;transition:all .3s ease;}
    input:focus,textarea:focus,select:focus{outline:none;border-color:var(--acc);box-shadow:0 0 15px rgba(121,216,255,0.2);background:rgba(5,16,30,0.9);}
    textarea{min-height:140px;resize:vertical;}
    .btn{cursor:pointer;font-weight:700;transition:all .3s ease;display:inline-flex;align-items:center;justify-content:center;gap:8px;}
    .btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(121,216,255,0.25);}
    .btn.primary{border:none;background:linear-gradient(135deg,#79d8ff,#58d4a8);color:#032333;}
    .btn.sm{width:auto;padding:8px 14px;font-size:.85rem;background:rgba(121,216,255,0.1);color:var(--acc);border:1px solid rgba(121,216,255,0.2);}
    .btn.sm:hover{background:rgba(121,216,255,0.2);}
    .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
    .grid{display:grid;gap:20px;grid-template-columns:1fr 1fr;}
    .template-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;}
    .tmpl-tab{padding:10px 8px;border-radius:12px;border:1px solid rgba(121,216,255,0.15);background:rgba(5,16,30,0.5);color:var(--muted);cursor:pointer;text-align:center;font-size:.85rem;font-weight:600;transition:all .3s ease;}
    .tmpl-tab:hover,.tmpl-tab.active{background:rgba(121,216,255,.15);border-color:var(--acc);color:var(--acc);box-shadow:0 4px 12px rgba(121,216,255,0.1);}
    .result-area{position:relative;}
    .result-area textarea{min-height:220px;font-family:"Space Grotesk",sans-serif;font-size:1rem;line-height:1.6;}
    .wc-badge{font-size:.8rem;color:var(--muted);font-family:"JetBrains Mono",monospace;margin-top:6px;display:block;}
    .mode-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;background:rgba(121,216,255,.1);border:1px solid rgba(121,216,255,.25);font-size:.85rem;color:var(--acc);margin-top:12px;}
    .idea{border:1px solid rgba(121,216,255,.15);border-radius:14px;padding:16px;background:rgba(5,16,30,.6);margin-bottom:12px;transition:all .3s ease;backdrop-filter:blur(8px);}
    .idea:hover{border-color:var(--acc);transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.3);}
    .idea h3{font-size:1.1rem;margin:0 0 8px;}
    .idea p{font-size:.9rem;color:rgba(238,247,255,.85);white-space:pre-wrap;max-height:85px;overflow:hidden;position:relative;}
    .idea p::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:30px;background:linear-gradient(to bottom, transparent, rgba(5,16,30,0.9));pointer-events:none;transition:opacity 0.3s;}
    .idea p.expanded{max-height:none;}
    .idea p.expanded::after{opacity:0;}
    .idea-meta{font-size:.8rem;color:var(--muted);margin-top:10px;display:flex;gap:12px;flex-wrap:wrap;padding-top:10px;border-top:1px solid rgba(255,255,255,0.05);}
    .idea-actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;}
    .idea-actions button{padding:6px 12px;font-size:.8rem;border-radius:10px;}
    .suggestion-block{background:rgba(121,216,255,.08);border:1px solid rgba(121,216,255,.2);border-radius:14px;padding:16px;margin-bottom:12px;transition:transform 0.2s;}
    .suggestion-block:hover{transform:translateY(-2px);}
    .suggestion-block h4{font-size:.95rem;margin:0 0 8px;}
    .empty{color:var(--muted);border:2px dashed rgba(121,216,255,0.2);border-radius:14px;padding:24px;text-align:center;background:rgba(5,16,30,0.4);}
    a{color:#9edcff;text-decoration:none;transition:color 0.2s;}a:hover{color:#fff;}
    @keyframes brainPulse{0%,100%{transform:scale(1) rotate(0deg);opacity:0.04;}50%{transform:scale(1.15) rotate(6deg);opacity:0.12;}}
    @media(max-width:760px){.grid{grid-template-columns:1fr;}.template-tabs{grid-template-columns:repeat(2,1fr);}}
`;
ideaContent = ideaContent.replace(/<style>.*?@media\(max-width:760px\)\{.*?\}.*?<\/style>/s, "<style>\n" + newCSS + "\n  </style>");
ideaContent = ideaContent.replace('<title>', '<meta name="description" content="Idea Lab AI Pro - Generate and manage your best ideas for apps, games, videos, and projects using smart AI templating." />\n  <title>');
fs.writeFileSync('idea-lab-ai.html', ideaContent, 'utf8');

// 4. Update the other html files
const files = ['focus-timer.html', 'reading-tracker.html', 'habit-tracker.html'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('<meta name="description"')) {
      let desc = "Track your progress and stay productive with " + file + " - Krishiv Velocity.";
      if (file.includes('focus')) desc = "Pomodoro focus timer and productivity tracking.";
      if (file.includes('reading')) desc = "Track books, reading goals, and insights.";
      if (file.includes('habit')) desc = "Build daily habits with streak tracking.";
      content = content.replace('<title>', '<meta name="description" content="' + desc + '" />\n  <title>');
    }
    content = content.replace(/background:rgba\(5,16,30,\.72\)/g, 'background:rgba(5,16,30,0.6);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(121,216,255,0.15);');
    content = content.replace(/background:linear-gradient\(160deg,rgba\(18,40,68,\.96\),rgba\(9,22,41,\.96\)\)/g, 'background:linear-gradient(145deg,rgba(18,40,68,0.6),rgba(9,22,41,0.6));backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 16px 40px rgba(0,0,0,0.4);');
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log("Success!");
