"""Batch upgrade all stub apps (< 6KB) to full functional apps."""
import os

PORTFOLIO = r"F:\Krishiv portfolio"

APPS = [
  ("achievement-wall.html","Achievement Wall","achievement_wall_v1","Track personal milestones and wins.","🏆","achievement","Name,Category,Date,How It Felt","Tech|School|Gaming|Creator|Personal"),
  ("ai-prompt-lab.html","AI Prompt Lab","ai_prompt_v1","Save your best AI prompts for any generator.","🤖","prompt","Prompt Title,Model,Style,Prompt Text","Midjourney|DALL-E|Stable Diffusion|ChatGPT|Gemini"),
  ("attendance-tracker.html","Attendance Tracker","attendance_v1","Track class attendance by subject.","📋","record","Subject,Date,Status,Note","Present|Absent|Late"),
  ("badge-maker-studio.html","Badge Maker Studio","badge_maker_v1","Design badge ideas and unlock rules.","🎖️","badge","Badge Name,Unlock Condition,Rarity,Icon","Common|Rare|Epic|Legendary"),
  ("break-generator.html","Study Break Generator","break_gen_v1","Get random ideas for meaningful study breaks.","☕","break idea","Activity,Duration,Energy,Type","Stretch|Walk|Snack|Creative|Rest"),
  ("bug-tracker.html","Bug Tracker Lite","bug_tracker_v1","Log, track and close site bugs fast.","🐛","bug","Bug Title,Page,Priority,Status","Critical|High|Medium|Low"),
  ("challenge-log.html","Coding Challenge Log","challenge_log_v1","Track coding challenges and solutions.","💻","challenge","Challenge,Platform,Difficulty,Solution","Easy|Medium|Hard"),
  ("class-notes-organizer.html","Class Notes Organizer","class_notes_v1","Keep class notes sorted by subject.","📓","note","Subject,Topic,Date,Notes","Maths|Science|English|History|CS|Other"),
  ("collab-tracker.html","Collab Tracker","collab_tracker_v1","Track collab ideas, roles and next steps.","🤝","collab","Project,Partner,My Role,Next Step","Planned|Active|Done|Paused"),
  ("component-gallery.html","UI Component Gallery","component_gallery_v1","Save and preview reusable UI snippets.","🧩","component","Component Name,Type,Snippet,Notes","Button|Card|Nav|Form|Layout|Other"),
  ("creator-brand-kit.html","Creator Brand Kit","brand_kit_v1","Collect brand notes and channel identity ideas.","🎨","element","Element,Value,Notes,Category","Colours|Typography|Catchphrases|Logo|Tone"),
  ("creator-checklist.html","Creator Checklist","creator_checklist_v1","Pre-stream and pre-video checklist.","✅","item","Item,Category,Required,Notes","Pre-Stream|Pre-Recording|Post|Upload"),
  ("daily-checkpoint.html","Daily Checkpoint","daily_checkpoint_v1","Log daily wins, blockers and next moves.","📍","checkpoint","Date,Win,Blocker,Next Move",""),
  ("daily-standup.html","Daily Standup Bot","daily_standup_v1","Quick standup log for what you did and what is next.","🖥️","standup","Date,Done,Next,Blocked",""),
  ("devlog-journal.html","Devlog Journal","devlog_journal_v1","Document your build journey one entry at a time.","📰","entry","Title,Date,What I Built,Learnings","Feature|Fix|Design|Research"),
  ("event-countdown-board.html","Event Countdown Board","event_countdown_v1","Track upcoming events with prep notes.","⏳","event","Event,Date,Prep Notes,Category","School|Gaming|Creator|Personal"),
  ("feedback-board.html","User Feedback Board","feedback_board_v1","Collect and organise user feedback.","💬","feedback","Feedback,Source,Category,Rating","Bug|Idea|Compliment|Question"),
  ("focus-room-builder.html","Focus Room Builder","focus_room_v1","Design your ideal focus setup.","🏠","item","Item,Category,Priority,Done","Environment|Tools|Rules|Mood"),
  ("focus-stats.html","Focus Session Stats","focus_stats_v1","Log focus sessions and track productivity.","📈","session","Date,Duration (min),Task,Rating","Deep Work|Study|Coding|Creative"),
  ("homework-hub.html","Homework Hub","homework_hub_v1","Track all homework tasks and due dates.","📚","task","Subject,Task,Due Date,Notes","Maths|Science|English|History|CS|Other"),
  ("homework-timer.html","Homework Timer","homework_timer_v1","Log homework sprints by subject.","⏱️","session","Subject,Duration (min),Date,Notes","Maths|Science|English|History|CS|Other"),
  ("inspiration-vault.html","Inspiration Vault","inspiration_vault_v1","Save links and ideas that inspire you.","💡","item","Title,URL,Why It Inspires,Category","Web Design|Gaming|Creator|Code|Art"),
  ("keyboard-shortcut-coach.html","Keyboard Shortcut Coach","keyboard_coach_v1","Save shortcuts you want to master.","⌨️","shortcut","Shortcut,App,What It Does,Mastered","VS Code|Chrome|Windows|Figma|Other"),
  ("link-locker.html","Link Locker","link_locker_v1","Save important links with labels and notes.","🔐","link","Label,URL,Category,Notes","Work|School|Gaming|Creator|Reference|Other"),
  ("link-tree-pro.html","Link Tree Pro","link_tree_v1","One page for all your social links.","🔗","link","Label,URL,Platform,Active","YouTube|Discord|GitHub|Twitter|Instagram|Other"),
  ("mini-habit-quest.html","Mini Habit Quest","mini_habit_quest_v1","Gamify habits with quest-style entries.","🎮","quest","Quest,Reward,Streak,Status","Daily|Weekly|Challenge"),
  ("mood-color-diary.html","Mood Color Diary","mood_diary_v1","Save daily mood snapshots with colours.","🌈","entry","Date,Mood,Color,Note","Happy|Neutral|Sad|Frustrated|Tired|Energised"),
  ("pack-list-planner.html","Pack List Planner","pack_list_v1","Build smart pack lists for trips.","🎒","item","Item,Category,Quantity,Packed","Clothes|Tech|School|Food|Hygiene|Other"),
  ("pitch-deck-maker.html","Pitch Deck Maker","pitch_deck_v1","Structure app ideas into clear pitches.","📊","pitch","App Name,Problem,Solution,Why It Matters","App|Game|Tool|Creator|School"),
  ("project-pitch-lab.html","Project Pitch Lab","project_pitch_v1","Write better pitches for your projects.","🔬","pitch","Project,Pitch,Audience,Status","App|Feature|Design|Game"),
  ("project-roadmap.html","Project Roadmap","project_roadmap_v1","Map out what you are building next.","🗺️","feature","Feature,Priority,Status,Target Date","Now|Next|Later|Someday"),
  ("quote-capsule.html","Quote Capsule","quote_capsule_v1","Keep the best quotes in one place.","💬","quote","Quote,Source,Category,Favourite","Life|Code|Creator|School|Gaming|Motivation"),
  ("scholarship-finder.html","Scholarship Finder","scholarship_v1","Track scholarships and application status.","🎓","scholarship","Scholarship,Deadline,Amount,Status","Applied|Researching|Won|Missed"),
  ("skill-tracker.html","Skill Level Tracker","skill_tracker_v1","Log progress in coding and creative skills.","📊","skill","Skill,Level (1-10),Hours Logged,Notes","HTML|CSS|JavaScript|Python|Design|Other"),
  ("social-planner.html","Social Media Planner","social_planner_v1","Plan content across your platforms.","📅","post","Content Idea,Platform,Date,Status","YouTube|Discord|Twitter|Instagram|TikTok"),
  ("streak-saver.html","Streak Saver","streak_saver_v1","Plan streak recovery so you never give up.","🔥","streak","Habit,Streak Before,Recovery Plan,Status","Active|Recovered|Lost"),
  ("stream-scene-planner.html","Stream Scene Planner","stream_scene_v1","Plan your stream scenes and overlays.","🎬","scene","Scene Name,Duration,Overlay Notes,Status","Intro|Game|Chat|BRB|Outro"),
  ("study-buddy-board.html","Study Buddy Board","study_buddy_v1","Organise shared study sessions.","👥","session","Session,Partner,Topic,Date","Maths|Science|English|CS|Other"),
  ("syntax-library.html","Code Syntax Library","syntax_lib_v1","Save code patterns you always look up.","📖","snippet","Title,Language,Snippet,Notes","HTML|CSS|JavaScript|Python|SQL|Other"),
  ("thumbnail-builder.html","Thumbnail Design Board","thumbnail_builder_v1","Plan colours and layouts for thumbnails.","🖼️","design","Video Title,Hook Text,Colours,Layout Notes","Gaming|Tutorial|Vlog|Challenge"),
  ("victory-wall.html","Victory Wall","victory_wall_v1","Keep your wins visible so progress feels real.","🏅","win","Win,Category,Date,How It Felt","School|Coding|Gaming|Creator|Personal"),
  ("video-idea-vault.html","Video Idea Vault","video_idea_v1","Store strong video ideas with hooks.","🎥","idea","Title Hook,Format,Platform,Status","Planned|Scripted|Filmed|Published"),
  ("weekend-challenge-generator.html","Weekend Challenge Generator","weekend_challenge_v1","Turn weekends into challenge mode.","🎯","challenge","Challenge,Type,Difficulty,Completed","Gaming|Creator|Coding|School|Physical"),
  ("poll-party.html","Poll Party","poll_party_v1","Create quick polls and log votes.","🗳️","poll","Question,Option A,Option B,Winner","Gaming|Creator|School|Fun"),
  ("site-stats-view.html","Portfolio Analytics","site_stats_v1","See which apps are winning.","📊","app","App Name,Category,My Rating,Notes","Productivity|Gaming|Creator|School|Fun"),
  ("screenshot-annotator.html","Screenshot Annotator","screenshot_annotator_v1","Log screenshot ideas and annotation plans.","🖼️","annotation","Title,Page,What To Show,Notes","Bug|Feature|Design|Tutorial"),
  ("stream-overlay-kit.html","Stream Overlay Kit","stream_overlay_v1","Plan and log stream overlay assets.","🎮","overlay","Name,Type,Purpose,Status","Starting|Game|Alert|Webcam|Outro"),
  ("upload-calendar.html","Upload Calendar","upload_calendar_v1","Plan your upload schedule.","📅","upload","Title,Platform,Scheduled Date,Status","YouTube|Discord|Shorts|Other"),
  ("script-planner.html","Script Planner","script_planner_v1","Plan and outline your video scripts.","📝","script","Title,Hook,Key Points,CTA","YouTube|Short|Tutorial|Vlog"),
  ("pomodoro-duel.html","Pomodoro Duel","pomodoro_duel_v1","Log pomodoro session duels and scores.","⏱️","duel","Task,Sessions,Score,Date","Study|Coding|Creative|Other"),
  ("revision-race.html","Revision Race","revision_race_v1","Track revision sprints before exams.","🏁","sprint","Subject,Topic,Duration,Score","Maths|Science|English|History|CS|Other"),
  ("emoji-story-maker.html","Emoji Story Maker","emoji_story_v1","Create emoji-powered micro stories.","😊","story","Title,Story Emojis,Mood,Date","Fun|Adventure|School|Gaming|Creator"),
  ("team-splitter.html","Team Splitter","team_splitter_v1","Log team split sessions and outcomes.","👥","session","Event,Teams,Winner,Date","Gaming|School|Sports|Creator"),
  ("exam-countdown.html","Exam Countdown","exam_countdown_v1","Track exams and revision deadlines.","📅","exam","Exam,Subject,Date,Prep Status","Maths|Science|English|History|CS|Other"),
  ("qr-generator-pro.html","QR Generator Pro","qr_gen_v1","Log URLs you have generated QR codes for.","📱","QR code","Label,URL,Purpose,Date","School|Creator|Business|Personal"),
  ("portfolio-asset-vault.html","Portfolio Asset Vault","asset_vault_v1","Store portfolio asset ideas and links.","📦","asset","Name,Type,URL,Notes","Image|Icon|Font|Color|Component"),
  ("focus-music-deck.html","Focus Music Deck","focus_music_v1","Log your best focus music playlists and tracks.","🎵","playlist","Title,Platform,Mood,Link","Lofi|Classical|Electronic|Nature|Gaming"),
  ("habit-heatmap.html","Habit Heatmap","habit_heatmap_v1","Log daily habit checks for heatmap tracking.","🟩","check","Habit,Date,Done,Note","Daily|Weekly|Custom"),
]

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

def build_page(fname, title, lsk, desc, emoji, item_word, fields_str, cats_str):
    fields = [f.strip() for f in fields_str.split(",")]
    cats = [c.strip() for c in cats_str.split("|")] if cats_str.strip() else []
    fc = min(4, len(fields))

    # Build field inputs
    inp = ""
    for i in range(fc):
        f = fields[i]
        fid = f"f{i}"
        is_ta = any(k in f.lower() for k in ("notes","snippet","pitch","solution","recovery plan","prompt","learnings","what i","key points"))
        if is_ta:
            inp += f'<div><label style="font-size:.8rem;color:#a9c6e7;">{f}</label><textarea id="{fid}" placeholder="{f}..." rows="2"></textarea></div>\n'
        else:
            inp += f'<div><label style="font-size:.8rem;color:#a9c6e7;">{f}</label><input id="{fid}" placeholder="{f}..."/></div>\n'

    cat_sel_html = ""
    filter_cat_html = ""
    if cats:
        opts = "".join(f"<option>{c}</option>" for c in cats)
        cat_sel_html = f'<div><label style="font-size:.8rem;color:#a9c6e7;">Category</label><select id="fcat">{opts}</select></div>'
        filter_cat_html = f'<select id="filterCat" style="max-width:160px;"><option value="">All categories</option>{opts}</select>'

    # JS strings - no curly brace issues since we use string concat
    reads = " + ',' + ".join([f"(document.getElementById('f{i}')||{{value:''}}).value.trim()" for i in range(fc)])
    js_collect = "[" + reads + "]"
    js_clear = " ".join([f"var e{i}=document.getElementById('f{i}');if(e{i})e{i}.value='';" for i in range(fc)])
    js_labels = str(fields[:fc]).replace("'", '"')
    filter_js = 'document.getElementById("filterCat").addEventListener("change",render);' if cats else ''
    filter_read = 'var fc=document.getElementById("filterCat")?document.getElementById("filterCat").value:"";' if cats else 'var fc="";'

    page = CSS_TOP.format(title=title, emoji=emoji, desc=desc)
    page += f"""
  <div class="stats">
    <div class="stat"><strong id="sTotal">0</strong><span>Total {item_word}s</span></div>
    <div class="stat"><strong id="sThis">0</strong><span>This week</span></div>
    <div class="stat"><strong id="sStar">0</strong><span>Starred ⭐</span></div>
  </div>
  <section class="card">
    <h2>Add {item_word.title()}</h2>
    <div class="grid2" style="margin-bottom:10px;">
      {inp}
      {cat_sel_html}
      <div><label style="font-size:.8rem;color:#a9c6e7;">Star?</label><select id="fstar"><option value="0">No</option><option value="1">Yes ⭐</option></select></div>
    </div>
    <button class="btn primary" id="addBtn">+ Add {item_word.title()}</button>
  </section>
  <section class="card">
    <div class="row" style="margin-bottom:10px;">
      <input id="sq" placeholder="Search..." style="flex:1;"/>
      {filter_cat_html}
      <button class="btn ghost sm" id="expBtn">Export</button>
      <button class="btn danger sm" id="clrBtn">Clear All</button>
    </div>
    <div id="list"></div>
  </section>
<script>
(function(){{
  var KEY='krishiv_{lsk}';
  var items=[];
  try{{items=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(items))items=[];}}catch(e){{items=[];}}
  function save(){{localStorage.setItem(KEY,JSON.stringify(items));}}
  function esc(s){{return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}}
  function ago(ts){{var d=Date.now()-ts;if(d<6e4)return'just now';if(d<36e5)return Math.floor(d/6e4)+'m ago';if(d<864e5)return Math.floor(d/36e5)+'h ago';return Math.floor(d/864e5)+'d ago';}}
  var labels={js_labels};
  document.getElementById('addBtn').addEventListener('click',function(){{
    var vals={js_collect};
    if(!vals[0]){{alert('Fill the first field!');return;}}
    var cat=document.getElementById('fcat')?document.getElementById('fcat').value:'';
    var star=document.getElementById('fstar')&&document.getElementById('fstar').value==='1';
    items.unshift({{id:Date.now().toString(36),vals:vals,cat:cat,star:star,ts:Date.now()}});
    save();render();
    {js_clear}
  }});
  {filter_js}
  document.getElementById('sq').addEventListener('input',render);
  document.getElementById('clrBtn').addEventListener('click',function(){{if(!confirm('Clear all?'))return;items=[];save();render();}});
  document.getElementById('expBtn').addEventListener('click',function(){{
    var rows=[labels.join(',')].concat(items.map(function(it){{return it.vals.map(function(v){{return '"'+String(v||'').replace(/"/g,'""')+'"';}}).join(',');}}));
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\\n')],{{type:'text/csv'}}));a.download='{lsk}.csv';a.click();
  }});
  function render(){{
    var q=document.getElementById('sq').value.toLowerCase();
    {filter_read}
    var vis=items.filter(function(it){{
      if(fc&&it.cat!==fc)return false;
      if(q&&it.vals.join(' ').toLowerCase().indexOf(q)<0)return false;
      return true;
    }});
    var week=Date.now()-7*864e5;
    document.getElementById('sTotal').textContent=items.length;
    document.getElementById('sThis').textContent=items.filter(function(it){{return it.ts>week;}}).length;
    document.getElementById('sStar').textContent=items.filter(function(it){{return it.star;}}).length;
    var el=document.getElementById('list');
    if(!vis.length){{el.innerHTML='<div class="empty">No {item_word}s yet. Add one above!</div>';return;}}
    el.innerHTML=vis.map(function(it){{
      var metas=it.vals.slice(1).map(function(v,i){{return v?'<span class="item-meta">'+labels[i+1]+': '+esc(v)+'</span>':''}}).join('');
      return '<div class="item">'+
        '<div style="font-size:1.6rem;flex:0 0 36px">{emoji}</div>'+
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
    }}).join('');
  }}
  window.dl=function(id){{if(!confirm('Delete?'))return;items=items.filter(function(x){{return x.id!==id;}});save();render();}};
  window.ts=function(id){{var it=items.find(function(x){{return x.id===id;}});if(it){{it.star=!it.star;save();render();}}}};
  render();
}})();
</script>
<script src="app-catalog.js"></script><script src="app-universe-shell.js" defer></script>
</main></body></html>"""
    return page

done = 0
skipped = 0
for row in APPS:
    fname, title, lsk, desc, emoji, item_word, fields_str, cats_str = row
    fpath = os.path.join(PORTFOLIO, fname)
    if os.path.exists(fpath) and os.path.getsize(fpath) > 6500:
        print(f"SKIP (full already): {fname}")
        skipped += 1
        continue
    content = build_page(fname, title, lsk, desc, emoji, item_word, fields_str, cats_str)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"UPGRADED: {fname} ({len(content)//1024}KB)")
    done += 1

print(f"\nDone: {done} upgraded, {skipped} already full.")
