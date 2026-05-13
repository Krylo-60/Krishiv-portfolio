import json
import os

apps = [
    {"name":"AI Prompt Lab","href":"ai-prompt-lab.html","tag":"AI","tier":"featured","description":"Refine and store prompt recipes for AI generators.","lead":"Save your best prompt recipes so you can get the same style every time.","cardKicker":"AI","searchTags":"ai prompt lab stable diffusion midjourney prompts","icon":"logo.svg"},
    {"name":"Daily Standup Bot","href":"daily-standup.html","tag":"Productivity","tier":"live","description":"Terminal-style logger for daily progress.","lead":"Run a quick daily standup for yourself so you never lose track of your work.","cardKicker":"Productivity","searchTags":"daily standup logger productivity work log","icon":"logo.svg"},
    {"name":"Code Syntax Library","href":"syntax-library.html","tag":"Learning","tier":"live","description":"Interactive cheat sheets for CSS and JS.","lead":"A quick library of code patterns so you don't have to search the same thing twice.","cardKicker":"Learning","searchTags":"code syntax css javascript cheat sheet","icon":"logo.svg"},
    {"name":"Portfolio Analytics","href":"site-stats-view.html","tag":"Utility","tier":"featured","description":"Visualize site growth and app data.","lead":"See the data behind your portfolio and track which apps are winning.","cardKicker":"Utility","searchTags":"portfolio analytics stats site growth data","icon":"logo.svg"},
    {"name":"Project Roadmap","href":"project-roadmap.html","tag":"Planning","tier":"live","description":"Timeline of upcoming builds and features.","lead":"Map out what you are building next and share your vision for the site.","cardKicker":"Planning","searchTags":"project roadmap timeline features upcoming","icon":"logo.svg"},
    {"name":"Creator Checklist","href":"creator-checklist.html","tag":"Creator","tier":"live","description":"Pre-stream and pre-video session checks.","lead":"Never forget to check your mic or recording settings again with this checklist.","cardKicker":"Creator","searchTags":"creator checklist streaming recording video","icon":"logo.svg"},
    {"name":"Thumbnail Design Board","href":"thumbnail-builder.html","tag":"Design","tier":"live","description":"Plan colors and layout for YouTube thumbnails.","lead":"Design better thumbnails by planning the hook, colors, and layout first.","cardKicker":"Design","searchTags":"thumbnail design youtube creator layout","icon":"logo.svg"},
    {"name":"Link Tree Pro","href":"link-tree-pro.html","tag":"Navigation","tier":"live","description":"Personalized link directory for all profiles.","lead":"One clean page for all your social links, projects, and creator profiles.","cardKicker":"Navigation","searchTags":"link tree directory profiles social links","icon":"logo.svg"},
    {"name":"Skill Level Tracker","href":"skill-tracker.html","tag":"Learning","tier":"featured","description":"Log progress in languages and frameworks.","lead":"Visualize your coding journey and track your levels in JS, CSS, and beyond.","cardKicker":"Learning","searchTags":"skill tracker level up coding progress","icon":"logo.svg"},
    {"name":"App Ideas Pitch Deck","href":"pitch-deck-maker.html","tag":"Creator","tier":"live","description":"Structure app ideas into professional pitches.","lead":"Turn a rough idea into a clear one-paragraph pitch that explains why it matters.","cardKicker":"Creator","searchTags":"app ideas pitch deck pitches creator","icon":"logo.svg"},
    {"name":"Devlog Journal","href":"devlog-journal.html","tag":"Writing","tier":"live","description":"Weekly progress notes and site devlogs.","lead":"Document the story of how you built this site, one week at a time.","cardKicker":"Writing","searchTags":"devlog journal progress writing building","icon":"logo.svg"},
    {"name":"UI Component Gallery","href":"component-gallery.html","tag":"Design","tier":"live","description":"Preview and copy reusable UI components.","lead":"Build faster by keeping all your best buttons, cards, and navs in one gallery.","cardKicker":"Design","searchTags":"ui components gallery css snippets design","icon":"logo.svg"},
    {"name":"Social Media Planner","href":"social-planner.html","tag":"Creator","tier":"live","description":"Schedule and plan content across platforms.","lead":"Plan your posts for YT and Discord in one visual content board.","cardKicker":"Creator","searchTags":"social media planner content schedule yt discord","icon":"logo.svg"},
    {"name":"Bug Tracker Lite","href":"bug-tracker.html","tag":"Utility","tier":"live","description":"Simple board to track and solve site bugs.","lead":"Capture site issues the moment you see them so you can fix them later.","cardKicker":"Utility","searchTags":"bug tracker issues site fix utility","icon":"logo.svg"},
    {"name":"User Feedback Board","href":"feedback-board.html","tag":"Feedback","tier":"live","description":"Organize and view user reviews.","lead":"Collect and sort feedback so you know what users really think about your apps.","cardKicker":"Feedback","searchTags":"user feedback board reviews ratings","icon":"logo.svg"},
    {"name":"Inspiration Vault","href":"inspiration-vault.html","tag":"Design","tier":"live","description":"Save links and screenshots of cool sites.","lead":"A vault for designs and ideas that make you want to build better things.","cardKicker":"Design","searchTags":"inspiration vault design ideas web gallery","icon":"logo.svg"},
    {"name":"Coding Challenge Log","href":"challenge-log.html","tag":"Learning","tier":"live","description":"Track progress on daily coding challenges.","lead":"Keep a log of every challenge you solve to show how you are improving.","cardKicker":"Learning","searchTags":"coding challenge log leetcode problems progress","icon":"logo.svg"},
    {"name":"Study Break Generator","href":"break-generator.html","tag":"Focus","tier":"live","description":"Quick ideas for study breaks.","lead":"Don't just scroll on your phone. Get a real break idea to stay fresh.","cardKicker":"Focus","searchTags":"study break generator focus refresh","icon":"logo.svg"},
    {"name":"Focus Session Stats","href":"focus-stats.html","tag":"Focus","tier":"live","description":"Charts and stats for work sessions.","lead":"See when you are most productive and track your focus minutes over time.","cardKicker":"Focus","searchTags":"focus session stats charts productivity","icon":"logo.svg"},
    {"name":"Achievement Unlocked","href":"achievement-wall.html","tag":"Motivation","tier":"featured","description":"Gamified wall for personal milestones.","lead":"Unlock achievements as you build more and reach new goals on the site.","cardKicker":"Motivation","searchTags":"achievement wall milestones gamification wins","icon":"logo.svg"}
]

template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="author" content="Krishiv PB" />
  <title>{name} | Krishiv PB</title>
  <link rel="stylesheet" href="concept-apps.css" />
  <link rel="stylesheet" href="app-universe-shell.css" />
  <link rel="icon" type="image/svg+xml" href="logo.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@400;500;700&family=Orbitron:wght@600;700;800&display=swap" rel="stylesheet" />
  <style id="codex-shared-fonts">
    body, button, input, select, textarea {{ font-family: "Space Grotesk", "Segoe UI", sans-serif !important; }}
    h1, h2, h3, h4, h5, h6, .brand, .site-title, .logo-text {{ font-family: "Orbitron", "Space Grotesk", sans-serif !important; }}
    code, pre, .mono, .eyebrow, .card-kicker, .mini-label {{ font-family: "JetBrains Mono", monospace !important; }}
  </style>
</head>
<body class="concept-app-root" data-theme="default" data-mode="dark">
  <main class="concept-wrap">
    <section class="concept-shell concept-hero">
      <span id="appCategory" class="concept-kicker"></span>
      <h1 id="appTitle" class="concept-title"></h1>
      <p id="appLead" class="concept-lead"></p>
      <div class="concept-meta">
        <span class="concept-pill">Future app page</span>
        <a class="concept-link" href="index.html#app-verse">Back to Apps Galaxy</a>
      </div>
    </section>
    <section class="concept-grid">
      <section class="concept-shell">
        <h2>Create Entry</h2>
        <div class="concept-form-grid">
          <div><label id="titleLabel" for="entryTitle"></label><input id="entryTitle" /></div>
          <div><label id="metaLabel" for="entryMeta"></label><input id="entryMeta" /></div>
          <div><label for="entryState">Stage</label><select id="entryState"></select></div>
          <div class="concept-full"><label id="notesLabel" for="entryNotes"></label><textarea id="entryNotes"></textarea></div>
        </div>
        <div class="concept-actions"><button id="addEntryBtn" class="concept-btn-primary" type="button"></button><button id="seedEntryBtn" class="concept-btn-secondary" type="button"></button></div>
      </section>
      <section class="concept-shell"><h2>Quick Ideas</h2><div id="seedChips" class="concept-seeds"></div><p id="helperCopy"></p></section>
    </section>
    <section class="concept-shell"><div class="concept-board-head"><h2 id="boardTitle"></h2><input id="searchInput" type="search" /></div><div class="concept-stats"><div class="concept-stat"><strong id="totalCount">0</strong><span>Total entries</span></div><div class="concept-stat"><strong id="pinnedCount">0</strong><span>Pinned</span></div><div class="concept-stat"><strong id="doneCount">0</strong><span>Done</span></div></div><div id="entryList" class="concept-list"></div></section>
  </main>
  <script id="app-config" type="application/json">{config}</script>
  <script src="concept-apps.js"></script>
  <script src="app-catalog.js"></script>
  <script src="app-universe-shell.js" defer></script>
</body>
</html>"""

for app in apps:
    config = {
        "title": app["name"],
        "category": f"Future App | {app['tag']}",
        "lead": app["lead"],
        "helper": "Use this board to track your " + app["name"].lower() + " ideas and progress.",
        "storageKey": "krishiv_" + app["href"].replace(".html", "").replace("-", "_") + "_v1",
        "boardTitle": app["name"] + " Board",
        "titleLabel": "Entry Name",
        "titlePlaceholder": "What are you adding?",
        "metaLabel": "Tag/Category",
        "metaPlaceholder": "Priority | Project | Tag",
        "notesLabel": "Notes",
        "notesPlaceholder": "Details and next steps...",
        "ctaLabel": "Save Entry",
        "seedLabel": "Load Example Ideas",
        "searchPlaceholder": "Search " + app["name"].lower() + "...",
        "emptyTitle": "Nothing saved yet.",
        "emptyLead": "Start building your " + app["name"].lower() + " board now.",
        "statuses": ["Draft", "Active", "Complete"],
        "seeds": [
            {"title": "First " + app["name"] + " idea", "state": "Draft", "meta": "Initial", "notes": "Getting started with " + app["name"]}
        ]
    }
    content = template.format(name=app["name"], config=json.dumps(config))
    with open(app["href"], "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {app['href']}")
