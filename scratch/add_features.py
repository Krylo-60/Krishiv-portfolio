"""Add more features to ALL apps via an enhanced template."""
import os, glob

PORTFOLIO = r"F:\Krishiv portfolio"

# Extra feature block to inject into every app's CSS
EXTRA_CSS = """
    .progress-wrap{margin:10px 0;}
    .progress-bar{height:7px;border-radius:999px;background:rgba(255,255,255,.07);overflow:hidden;}
    .progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#79d8ff,#56d5a6);transition:width .5s;}
    .tag-row{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0;}
    .tag{padding:3px 9px;border-radius:999px;font-size:.7rem;font-family:"JetBrains Mono",monospace;background:rgba(121,216,255,.08);border:1px solid rgba(121,216,255,.2);color:#79d8ff;cursor:pointer;}
    .tag:hover{background:rgba(121,216,255,.18);}
    .sort-row{display:flex;gap:6px;align-items:center;font-size:.8rem;color:#a9c6e7;}
    .sort-btn{padding:4px 10px;border-radius:8px;border:1px solid #365f88;background:#0a1b31;color:#a9c6e7;cursor:pointer;font-size:.78rem;}
    .sort-btn.active{border-color:#79d8ff;color:#79d8ff;}
    .bulk-bar{display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:10px;background:rgba(121,216,255,.06);border:1px solid rgba(121,216,255,.15);margin-bottom:8px;font-size:.82rem;}
    .import-btn{cursor:pointer;padding:6px 12px;border-radius:8px;border:1px solid #365f88;background:#0a1b31;color:#a9c6e7;font-size:.8rem;}
"""

# Extra feature HTML to inject before </section> of the list section
EXTRA_HTML_TOOLBAR = """      <div class="sort-row" style="margin-bottom:8px;">
        Sort: <button class="sort-btn active" id="sortNew">Newest</button>
        <button class="sort-btn" id="sortOld">Oldest</button>
        <button class="sort-btn" id="sortAZ">A-Z</button>
        <span style="margin-left:auto;font-size:.78rem;" id="countLabel">0 items</span>
      </div>
      <div class="bulk-bar" id="bulkBar" style="display:none;">
        <span id="selCount">0 selected</span>
        <button class="btn danger sm" id="bulkDeleteBtn">Delete Selected</button>
        <button class="sort-btn" id="cancelSelBtn">Cancel</button>
      </div>"""

# Extra JS features to inject before the closing })();
EXTRA_JS = """
  // Sort state
  var sortMode='new';
  document.getElementById('sortNew').addEventListener('click',function(){sortMode='new';setSortActive('sortNew');render();});
  document.getElementById('sortOld').addEventListener('click',function(){sortMode='old';setSortActive('sortOld');render();});
  document.getElementById('sortAZ').addEventListener('click',function(){sortMode='az';setSortActive('sortAZ');render();});
  function setSortActive(id){['sortNew','sortOld','sortAZ'].forEach(function(s){var el=document.getElementById(s);if(el)el.classList.toggle('active',s===id);});};

  // Selection / bulk delete
  var selected=new Set();
  function toggleSelect(id){if(selected.has(id))selected.delete(id);else selected.add(id);updateBulkBar();}
  function updateBulkBar(){var bb=document.getElementById('bulkBar'),sc=document.getElementById('selCount');if(bb&&sc){bb.style.display=selected.size>0?'flex':'none';sc.textContent=selected.size+' selected';}}
  var bd=document.getElementById('bulkDeleteBtn');if(bd)bd.addEventListener('click',function(){if(!confirm('Delete '+selected.size+' items?'))return;items=items.filter(function(x){return!selected.has(x.id);});selected.clear();save();render();updateBulkBar();});
  var cs=document.getElementById('cancelSelBtn');if(cs)cs.addEventListener('click',function(){selected.clear();render();updateBulkBar();});

  // Patch render to use sort and show count
  var _origRender=render;
  render=function(){
    var q=document.getElementById('sq')?document.getElementById('sq').value.toLowerCase():'';
    var fc=document.getElementById('filterCat')?document.getElementById('filterCat').value:'';
    var vis=items.filter(function(it){
      if(fc&&it.cat!==fc)return false;
      if(q&&it.vals.join(' ').toLowerCase().indexOf(q)<0)return false;
      return true;
    });
    if(sortMode==='old')vis=vis.slice().reverse();
    else if(sortMode==='az')vis=vis.slice().sort(function(a,b){return(a.vals[0]||'').localeCompare(b.vals[0]||'');});
    var cl=document.getElementById('countLabel');if(cl)cl.textContent=vis.length+' of '+items.length+' items';
    var week=Date.now()-7*864e5;
    var st=document.getElementById('sTotal');if(st)st.textContent=items.length;
    var sw=document.getElementById('sThis');if(sw)sw.textContent=items.filter(function(it){return it.ts>week;}).length;
    var ss=document.getElementById('sStar');if(ss)ss.textContent=items.filter(function(it){return it.star;}).length;
    var el=document.getElementById('list');
    if(!el)return;
    if(!vis.length){el.innerHTML='<div style="color:#a9c6e7;border:1px dashed #365f88;border-radius:12px;padding:24px;text-align:center;">No items yet. Add one above!</div>';return;}
    var labels=el.dataset.labels?JSON.parse(el.dataset.labels):[];
    el.innerHTML=vis.map(function(it){
      var metas=it.vals.slice(1).map(function(v,i){return v?'<span class="item-meta">'+esc(v)+'</span>':'';}).join('');
      var selBox='<input type="checkbox" style="width:auto;margin-right:4px;" '+(selected.has(it.id)?'checked':'')+' onclick="toggleSelect(\''+it.id+'\')">';
      return '<div class="item" style="'+(selected.has(it.id)?'border-color:rgba(121,216,255,.5);background:rgba(121,216,255,.05);':'')+'">'+
        selBox+
        '<div class="item-info">'+
          '<p class="item-title">'+(it.star?'⭐ ':'')+esc(it.vals[0]||'Untitled')+'</p>'+
          metas+
          (it.cat?'<span class="badge">'+esc(it.cat)+'</span>':'')+
        '</div>'+
        '<div class="row" style="flex:0 0 auto">'+
          '<button class="btn ghost sm" onclick="ts(\''+it.id+'\')">'+(it.star?'★':'☆')+'</button>'+
          '<button class="btn danger sm" onclick="dl(\''+it.id+'\')">🗑</button>'+
        '</div>'+
      '</div>';
    }).join('');
  };
  render();
"""

def inject_features(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Skip if already has sort feature
    if 'sortMode' in html or 'sort-btn' in html:
        return False
    # Skip non-app pages
    if 'krishiv_' not in html or 'var items=' not in html:
        return False

    # Inject CSS before </style>
    html = html.replace('</style>', EXTRA_CSS + '\n  </style>', 1)

    # Inject sort toolbar before <div id="list">
    html = html.replace('<div id="list"></div>', EXTRA_HTML_TOOLBAR + '\n      <div id="list"></div>', 1)

    # Inject extra JS before closing })();
    html = html.replace('})();', EXTRA_JS + '\n})();', 1)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(html)
    return True

upgraded = 0
skipped = 0
for fpath in sorted(glob.glob(os.path.join(PORTFOLIO, '*.html'))):
    fname = os.path.basename(fpath)
    # Skip main pages and special pages
    skip_names = {'index.html','games.html','projects.html','contact.html','review-app.html',
                  '404.html','release-notes.html','all-links.html',
                  'owner.private.html','admin.private.html','usage-admin.private.html'}
    if fname in skip_names:
        skipped += 1
        continue
    try:
        result = inject_features(fpath)
        if result:
            print(f"UPGRADED: {fname}")
            upgraded += 1
        else:
            print(f"skip: {fname}")
            skipped += 1
    except Exception as e:
        print(f"ERROR {fname}: {e}")

print(f"\nDone: {upgraded} upgraded, {skipped} skipped.")
