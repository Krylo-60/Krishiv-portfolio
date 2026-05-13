"""Upgrade remaining apps not covered by first batch."""
import os, re

PORTFOLIO = r"F:\Krishiv portfolio"

CSS_TOP = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>{title} | Krishiv PB</title>
  <link rel="stylesheet" href="app-universe-shell.css"/>
  <link rel="icon" href="logo.svg" type="image/svg+xml"/>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@400;500;700&family=Orbitron:wght@600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *{{box-sizing:border-box;}}body{{margin:0;font-family:"Space Grotesk",sans-serif;color:#eef7ff;background:linear-gradient(160deg,#030a14,#0a223a 48%,#123860);min-height:100vh;}}
    h1,h2{{font-family:"Orbitron",sans-serif;margin:0 0 10px;}}p{{color:#a9c6e7;margin:0 0 8px;}}
    .wrap{{width:min(960px,94%);margin:24px auto;}}
    .card{{border:1px solid #365f88;border-radius:14px;padding:20px;background:linear-gradient(160deg,rgba(18,40,68,.96),rgba(9,22,41,.96));margin-bottom:14px;}}
    input,select,textarea{{padding:10px;border-radius:10px;border:1px solid #365f88;background:#0a1b31;color:#eef7ff;font:inherit;width:100%;transition:border-color .2s;}}
    input:focus,select:focus,textarea:focus{{outline:none;border-color:#79d8ff;}}
    .btn{{cursor:pointer;font-weight:700;padding:10px 18px;border-radius:10px;border:none;font-family:inherit;transition:all .2s;}}
    .btn.primary{{background:linear-gradient(135deg,#79d8ff,#58d4a8);color:#032333;}}
    .btn.sm{{padding:6px 12px;font-size:.82rem;}}
    .btn.ghost{{background:transparent;border:1px solid #365f88;color:#a9c6e7;}}
    .btn.danger{{background:rgba(255,107,107,.12);border:1px solid rgba(255,107,107,.3);color:#ff9999;}}
    .btn:hover{{opacity:.85;transform:translateY(-1px);}}
    .row{{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}}
    .grid2{{display:grid;grid-template-columns:1fr 1fr;gap:12px;}}
    .item{{border:1px solid rgba(84,126,171,.3);border-radius:10px;padding:12px;margin-bottom:8px;background:rgba(5,16,30,.65);display:flex;align-items:flex-start;gap:12px;transition:border-color .2s;}}
    .item:hover{{border-color:rgba(121,216,255,.25);}}
    .item-info{{flex:1;min-width:0;}}
    .item-title{{font-weight:700;font-size:.9rem;margin:0 0 4px;}}
    .item-meta{{font-size:.75rem;color:#a9c6e7;font-family:"JetBrains Mono",monospace;display:block;margin-bottom:2px;}}
    .badge{{display:inline-block;padding:3px 9px;border-radius:999px;font-size:.7rem;font-family:"JetBrains Mono",monospace;background:rgba(121,216,255,.1);border:1px solid rgba(121,216,255,.25);color:#79d8ff;margin-top:4px;}}
    .empty{{color:#a9c6e7;border:1px dashed #365f88;border-radius:12px;padding:24px;text-align:center;}}
    .stats{{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;}}
    .stat{{border:1px solid #365f88;border-radius:12px;padding:12px;text-align:center;background:rgba(5,16,30,.6);}}
    .stat strong{{display:block;font-size:1.4rem;font-family:"JetBrains Mono",monospace;color:#79d8ff;}}
    .stat span{{font-size:.72rem;color:#a9c6e7;}}
    @media(max-width:600px){{.grid2{{grid-template-columns:1fr;}}.stats{{grid-template-columns:repeat(2,1fr);}}}}
  </style>
</head>
<body>
<main class="wrap">
  <section class="card">
    <h1>{emoji} {title}</h1>
    <p>{desc}</p>
    <a href="index.html" style="color:#9edcff;font-size:.85rem;">Back to portfolio</a>
  </section>'''

APPS = [
  ("code-snippets-vault.html","Code Snippets Vault","code_snippets_v2","Save and retrieve your most-used code snippets.","📋","snippet","Title,Language,Snippet,Tags","HTML|CSS|JavaScript|Python|SQL|Bash|Other"),
  ("color-palette-lab.html","Color Palette Lab","color_palette_v2","Build and save stunning colour palettes.","🎨","palette","Palette Name,Hex Codes,Mood,Use Case","UI|Brand|Game|Art|Dark|Light"),
  ("meal-planner.html","Meal Planner","meal_planner_v2","Plan meals, log recipes and track nutrition goals.","🍽️","meal","Meal Name,Day,Type,Calories","Breakfast|Lunch|Dinner|Snack"),
  ("mind-map-board.html","Mind Map Board","mind_map_v2","Log mind map ideas, topics and branches.","🧠","node","Topic,Branch,Sub-Ideas,Priority","Learning|Project|Creative|Planning"),
  ("presentation-planner.html","Presentation Planner","presentation_v2","Plan school presentations slide by slide.","🎤","slide","Title,Slide Topic,Key Point,Notes","Intro|Main|Example|Conclusion|Q&A"),
  ("resume-studio.html","Resume Studio","resume_studio_v2","Build your resume bullet-by-bullet.","📄","bullet","Role,Skill,Achievement,Date","Work|School|Project|Award|Volunteer"),
  ("budget-battle.html","Budget Battle","budget_battle_v2","Set budgets and track how well you stick to them.","💰","budget","Category,Budget (₹),Spent (₹),Notes","Food|Gaming|School|Tech|Fun|Other"),
  ("bazaar-blitz.html","Bazaar Blitz","bazaar_blitz_v2","Track marketplace items, prices and deals.","🛒","item","Item,Price,Source,Status","Wanted|Watching|Bought|Sold"),
]

# Bonus apps from app-catalog not yet upgraded
BONUS_APPS = [
  ("ai-prompt-lab.html","AI Prompt Lab","ai_prompt_v2","Save and organise your best AI prompts.","🤖","prompt","Prompt Title,Model,Style,Prompt","ChatGPT|Gemini|Midjourney|DALL-E|Other"),
  ("daily-standup.html","Daily Standup Bot","standup_v2","Quick standup log for what you did and what is next.","🖥️","standup","Date,Done,Next,Blocked",""),
  ("site-stats-view.html","Portfolio Analytics","site_stats_v2","Track which of your apps are used most.","📊","stat","App Name,Category,Stars,Notes","Productivity|Gaming|Creator|School|Fun"),
  ("portfolio-asset-vault.html","Portfolio Asset Vault","asset_vault_v2","Store portfolio asset ideas and links.","📦","asset","Name,Type,URL,Notes","Image|Icon|Font|Color|Component"),
  ("team-splitter.html","Team Splitter","team_splitter_v2","Log team split sessions and outcomes.","👥","session","Event,Teams,Winner,Date","Gaming|School|Sports|Creator"),
]

ALL_APPS = APPS + BONUS_APPS

def build_page(fname, title, lsk, desc, emoji, item_word, fields_str, cats_str):
    fields = [f.strip() for f in fields_str.split(",")]
    cats = [c.strip() for c in cats_str.split("|")] if cats_str.strip() else []
    fc = min(4, len(fields))

    inp = ""
    for i in range(fc):
        f = fields[i]
        fid = "f" + str(i)
        is_ta = any(k in f.lower() for k in ("notes","snippet","ideas","key point","prompt","achievements","hex","branches","sub-"))
        if is_ta:
            inp += '<div><label style="font-size:.8rem;color:#a9c6e7;">' + f + '</label><textarea id="' + fid + '" placeholder="' + f + '..." rows="2"></textarea></div>\n'
        else:
            inp += '<div><label style="font-size:.8rem;color:#a9c6e7;">' + f + '</label><input id="' + fid + '" placeholder="' + f + '..."/></div>\n'

    cat_opts = "".join("<option>" + c + "</option>" for c in cats) if cats else "<option>General</option>"
    cat_sel_html = '<div><label style="font-size:.8rem;color:#a9c6e7;">Category</label><select id="fcat">' + cat_opts + '</select></div>' if cats else ""
    filter_cat_html = '<select id="filterCat" style="max-width:160px;"><option value="">All</option>' + cat_opts + '</select>' if cats else ""

    reads = " + '||' + ".join(["(document.getElementById('f" + str(i) + "')||{value:''}).value.trim()" for i in range(fc)])
    js_collect = "[" + reads + "]"
    js_clear = " ".join(["var e" + str(i) + "=document.getElementById('f" + str(i) + "');if(e" + str(i) + ")e" + str(i) + ".value='';" for i in range(fc)])
    js_labels = str(fields[:fc]).replace("'", '"')
    filter_js = 'document.getElementById("filterCat").addEventListener("change",render);' if cats else ""
    filter_read = 'var fc=document.getElementById("filterCat")?document.getElementById("filterCat").value:"";' if cats else 'var fc="";'

    page = CSS_TOP.format(title=title, emoji=emoji, desc=desc)
    page += """
  <div class="stats">
    <div class="stat"><strong id="sTotal">0</strong><span>Total """ + item_word + """s</span></div>
    <div class="stat"><strong id="sThis">0</strong><span>This week</span></div>
    <div class="stat"><strong id="sStar">0</strong><span>Starred ⭐</span></div>
  </div>
  <section class="card">
    <h2>Add """ + item_word.title() + """</h2>
    <div class="grid2" style="margin-bottom:10px;">
      """ + inp + cat_sel_html + """
      <div><label style="font-size:.8rem;color:#a9c6e7;">Star?</label><select id="fstar"><option value="0">No</option><option value="1">Yes ⭐</option></select></div>
    </div>
    <button class="btn primary" id="addBtn">+ Add """ + item_word.title() + """</button>
  </section>
  <section class="card">
    <div class="row" style="margin-bottom:10px;">
      <input id="sq" placeholder="Search """ + item_word + """s..." style="flex:1;"/>
      """ + filter_cat_html + """
      <button class="btn ghost sm" id="expBtn">Export CSV</button>
      <button class="btn danger sm" id="clrBtn">Clear All</button>
    </div>
    <div id="list"></div>
  </section>
<script>
(function(){
  var KEY='krishiv_""" + lsk + """';
  var items=[];
  try{items=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(items))items=[];}catch(e){items=[];}
  function save(){localStorage.setItem(KEY,JSON.stringify(items));}
  function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function ago(ts){var d=Date.now()-ts;if(d<6e4)return'just now';if(d<36e5)return Math.floor(d/6e4)+'m ago';if(d<864e5)return Math.floor(d/36e5)+'h ago';return Math.floor(d/864e5)+'d ago';}
  var labels=""" + js_labels + """;
  document.getElementById('addBtn').addEventListener('click',function(){
    var vals=""" + js_collect + """;
    if(!vals[0]){alert('Fill the first field!');return;}
    var cat=document.getElementById('fcat')?document.getElementById('fcat').value:'';
    var star=document.getElementById('fstar')&&document.getElementById('fstar').value==='1';
    items.unshift({id:Date.now().toString(36),vals:vals,cat:cat,star:star,ts:Date.now()});
    save();render();
    """ + js_clear + """
  });
  """ + filter_js + """
  document.getElementById('sq').addEventListener('input',render);
  document.getElementById('clrBtn').addEventListener('click',function(){if(!confirm('Clear all?'))return;items=[];save();render();});
  document.getElementById('expBtn').addEventListener('click',function(){
    var rows=[labels.join(',')].concat(items.map(function(it){return it.vals.map(function(v){return '"'+String(v||'').replace(/"/g,'""')+'"';}).join(',');}));
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\\n')],{type:'text/csv'}));a.download='""" + lsk + """.csv';a.click();
  });
  function render(){
    var q=document.getElementById('sq').value.toLowerCase();
    """ + filter_read + """
    var vis=items.filter(function(it){
      if(fc&&it.cat!==fc)return false;
      if(q&&it.vals.join(' ').toLowerCase().indexOf(q)<0)return false;
      return true;
    });
    var week=Date.now()-7*864e5;
    document.getElementById('sTotal').textContent=items.length;
    document.getElementById('sThis').textContent=items.filter(function(it){return it.ts>week;}).length;
    document.getElementById('sStar').textContent=items.filter(function(it){return it.star;}).length;
    var el=document.getElementById('list');
    if(!vis.length){el.innerHTML='<div class="empty">No """ + item_word + """s yet. Add one above!</div>';return;}
    el.innerHTML=vis.map(function(it){
      var metas=it.vals.slice(1).map(function(v,i){return v?'<span class="item-meta">'+labels[i+1]+': '+esc(v)+'</span>':'';}).join('');
      return '<div class="item">'+
        '<div style="font-size:1.6rem;flex:0 0 36px">""" + emoji + """</div>'+
        '<div class="item-info">'+
          '<p class="item-title">'+(it.star?'⭐ ':'')+esc(it.vals[0]||'Untitled')+'</p>'+
          metas+
          (it.cat?'<span class="badge">'+esc(it.cat)+'</span>':'')+
          '<span style="font-size:.7rem;color:#6b8fad;margin-left:6px;font-family:monospace">'+ago(it.ts)+'</span>'+
        '</div>'+
        '<div class="row" style="flex:0 0 auto">'+
          '<button class="btn ghost sm" onclick="ts(\''+it.id+'\')">'+(it.star?'★':'☆')+'</button>'+
          '<button class="btn danger sm" onclick="dl(\''+it.id+'\')">🗑</button>'+
        '</div>'+
      '</div>';
    }).join('');
  }
  window.dl=function(id){if(!confirm('Delete?'))return;items=items.filter(function(x){return x.id!==id;});save();render();};
  window.ts=function(id){var it=items.find(function(x){return x.id===id;});if(it){it.star=!it.star;save();render();}};
  render();
})();
</script>
<script src="app-catalog.js"></script><script src="app-universe-shell.js" defer></script>
</main></body></html>"""
    return page

done = 0
for row in ALL_APPS:
    fname, title, lsk, desc, emoji, item_word, fields_str, cats_str = row
    fpath = os.path.join(PORTFOLIO, fname)
    # Force upgrade all (override size check for remaining batch)
    if os.path.exists(fpath) and os.path.getsize(fpath) > 20000:
        print(f"SKIP (very large/custom): {fname}")
        continue
    content = build_page(fname, title, lsk, desc, emoji, item_word, fields_str, cats_str)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"UPGRADED: {fname}")
    done += 1

print(f"\nDone: {done} apps upgraded.")
