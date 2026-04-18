(() => {
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const BLOCKED_PATHS = new Set(["index.html", "games.html", "admin.private.html"]);
  if (BLOCKED_PATHS.has(path)) return;

  const safeGet = (key, fallback = "") => {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };

  function getUsageSessionId() {
    const key = "krishiv_usage_session_v1";
    let value = "";
    try {
      value = String(safeGet(key, ""));
      if (!value) {
        value = "sess_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
        safeSet(key, value);
      }
    } catch {
      value = "sess_" + Math.random().toString(36).slice(2, 10);
    }
    return value;
  }

  function postUsage(eventName, pageName) {
    const params = new URLSearchParams({
      event: String(eventName || "event"),
      page: String(pageName || path || "unknown-page"),
      sessionId: getUsageSessionId()
    });
    try {
      const img = new Image();
      img.src = "/api/usage/track?" + params.toString();
    } catch {}
  }

  function installRuntimeGuard() {
    const seen = new Set();
    const toast = document.createElement("div");
    toast.className = "app-guard-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
    let toastTimer = 0;

    function show(message, isError) {
      toast.textContent = message;
      toast.classList.toggle("is-error", Boolean(isError));
      toast.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
    }

    window.addEventListener("error", (event) => {
      const msg = String((event && event.message) || "Unknown script error");
      if (seen.has(msg)) return;
      seen.add(msg);
      show("Recovered from minor app issue. You can continue.", true);
    });

    window.addEventListener("unhandledrejection", () => {
      show("A background task failed. Try refresh if needed.", true);
    });

    window.safeNotify = (message) => show(String(message || ""), false);
  }
  installRuntimeGuard();

  function installImageGuard() {
    const images = Array.from(document.querySelectorAll("img"));
    images.forEach((img) => {
      const src = String(img.getAttribute("src") || "");
      if (!src || /placeholder|dummy|temp-image|coming-soon/i.test(src)) {
        img.setAttribute("src", "logo.svg");
      }
      img.addEventListener("error", () => {
        if (img.getAttribute("src") !== "logo.svg") {
          img.setAttribute("src", "logo.svg");
        }
      }, { once: true });
    });
  }
  installImageGuard();

  const APPS = [
    { name: "Study Planner", href: "study-planner.html", tag: "Productivity", tier: "featured" },
    { name: "Quiz Zone", href: "quiz-zone.html", tag: "Learning" },
    { name: "Review App", href: "review-app.html", tag: "Feedback", tier: "featured" },
    { name: "Focus Timer", href: "focus-timer.html", tag: "Focus" },
    { name: "Habit Tracker", href: "habit-tracker.html", tag: "Discipline" },
    { name: "Idea Lab AI", href: "idea-lab-ai.html", tag: "AI", tier: "featured" },
    { name: "Expense Tracker", href: "expense-tracker.html", tag: "Finance" },
    { name: "Notes Vault", href: "notes-vault.html", tag: "Writing" },
    { name: "Flashcards", href: "flashcards.html", tag: "Memory" },
    { name: "Typing Test", href: "typing-test.html", tag: "Speed" },
    { name: "Task Kanban", href: "task-kanban.html", tag: "Workflow" },
    { name: "Unit Converter", href: "unit-converter.html", tag: "Utility" },
    { name: "Grade Calculator", href: "grade-calculator.html", tag: "Education" },
    { name: "Daily Journal", href: "daily-journal.html", tag: "Reflection" },
    { name: "Goal Planner", href: "goal-planner.html", tag: "Planning" },
    { name: "Reading Tracker", href: "reading-tracker.html", tag: "Learning" },
    { name: "Water Reminder", href: "water-reminder.html", tag: "Health" },
    { name: "Presentation Planner", href: "presentation-planner.html", tag: "School" },
    { name: "Code Snippets Vault", href: "code-snippets-vault.html", tag: "Developer" },
    { name: "Mind Map Board", href: "mind-map-board.html", tag: "Ideas" },
    { name: "BazaarBlitz Prime", href: "bazaar-blitz.html", tag: "Marketplace", tier: "featured" },
    { name: "VoteStorm Arena", href: "votestorm-arena.html", tag: "Community", tier: "featured" },
    { name: "Time Capsule Lab", href: "time-capsule-lab.html", tag: "Future" },
    { name: "StoryForge Studio", href: "storyforge-studio.html", tag: "Creative" },
    { name: "Meal Planner Pro", href: "meal-planner.html", tag: "Lifestyle" },
    { name: "Color Palette Lab", href: "color-palette-lab.html", tag: "Design" },
    { name: "Resume Studio Lite", href: "resume-studio.html", tag: "Career" },
    { name: "Budget Battle Sim", href: "budget-battle.html", tag: "Finance" },
    { name: "Games Hub", href: "games.html", tag: "Gaming" },
    { name: "Reaction Blitz", href: "reaction-blitz.html", tag: "Gaming" },
    { name: "Memory Matrix", href: "memory-matrix.html", tag: "Gaming" },
    { name: "Color Switch Rush", href: "color-switch-rush.html", tag: "Gaming" },
    { name: "Projects", href: "projects.html", tag: "Navigation" },
    { name: "Contact", href: "contact.html", tag: "Navigation" },
    { name: "All Links Directory", href: "all-links.html", tag: "Navigation", tier: "featured" },
    { name: "Release Notes", href: "release-notes.html", tag: "Updates", tier: "featured" },
    { name: "Master Nexus", href: "krylo-blox-master-nexus.html", tag: "Core", tier: "featured" },
    { name: "Aether v110", href: "aether-core-v110.html", tag: "Core", tier: "featured" },
    { name: "Aether v104", href: "aether-core-v104.html", tag: "Core" },
    { name: "Aether v55", href: "aether-core-v55.html", tag: "Core" },
    { name: "Aether v2.5", href: "aether-core-v25.html", tag: "Core" },
    { name: "Homework Hub", href: "homework-hub.html", tag: "App" },
    { name: "Attendance Tracker", href: "attendance-tracker.html", tag: "App" },
    { name: "Link Locker", href: "link-locker.html", tag: "App" },
    { name: "Habit Heatmap", href: "habit-heatmap.html", tag: "App" },
    { name: "Focus Music Deck", href: "focus-music-deck.html", tag: "App" },
    { name: "Thumbnail Idea Board", href: "thumbnail-idea-board.html", tag: "App" },
    { name: "Script Planner", href: "script-planner.html", tag: "App" },
    { name: "Upload Calendar", href: "upload-calendar.html", tag: "App" },
    { name: "Stream Overlay Kit", href: "stream-overlay-kit.html", tag: "App" },
    { name: "QR Generator Pro", href: "qr-generator-pro.html", tag: "App" },
    { name: "Pomodoro Duel", href: "pomodoro-duel.html", tag: "App" },
    { name: "Revision Race", href: "revision-race.html", tag: "App" },
    { name: "Scholarship Finder", href: "scholarship-finder.html", tag: "App" },
    { name: "Portfolio Asset Vault", href: "portfolio-asset-vault.html", tag: "App" },
    { name: "Poll Party", href: "poll-party.html", tag: "App" },
    { name: "Emoji Story Maker", href: "emoji-story-maker.html", tag: "App" },
    { name: "Team Splitter", href: "team-splitter.html", tag: "App" },
    { name: "Exam Countdown", href: "exam-countdown.html", tag: "App" },
    { name: "Screenshot Annotator", href: "screenshot-annotator.html", tag: "App" }
  ];

  const APP_ICONS = {
    "study-planner.html": "app-icon-study-planner.svg",
    "quiz-zone.html": "app-icon-quiz-zone.svg",
    "review-app.html": "app-icon-review-app.svg",
    "focus-timer.html": "app-icon-focus-timer.svg",
    "habit-tracker.html": "app-icon-habit-tracker.svg",
    "idea-lab-ai.html": "app-icon-idea-lab-ai.svg",
    "expense-tracker.html": "app-icon-expense-tracker.svg",
    "notes-vault.html": "app-icon-notes-vault.svg",
    "flashcards.html": "app-icon-flashcards.svg",
    "typing-test.html": "app-icon-typing-test.svg",
    "task-kanban.html": "app-icon-task-kanban.svg",
    "unit-converter.html": "app-icon-unit-converter.svg",
    "grade-calculator.html": "app-icon-grade-calculator.svg",
    "daily-journal.html": "app-icon-daily-journal.svg",
    "goal-planner.html": "app-icon-goal-planner.svg",
    "reading-tracker.html": "app-icon-reading-tracker.svg",
    "water-reminder.html": "app-icon-water-reminder.svg",
    "presentation-planner.html": "app-icon-presentation-planner.svg",
    "code-snippets-vault.html": "app-icon-code-snippets.svg",
    "mind-map-board.html": "app-icon-mind-map.svg",
    "bazaar-blitz.html": "app-icon-bazaar-blitz.svg",
    "votestorm-arena.html": "app-icon-votestorm.svg",
    "time-capsule-lab.html": "app-icon-time-capsule.svg",
    "storyforge-studio.html": "app-icon-storyforge.svg",
    "meal-planner.html": "app-icon-meal-planner.svg",
    "color-palette-lab.html": "app-icon-color-palette-lab.svg",
    "resume-studio.html": "app-icon-resume-studio.svg",
    "budget-battle.html": "app-icon-budget-battle.svg",
    "games.html": "app-icon-games-hub.svg",
    "reaction-blitz.html": "app-icon-reaction-blitz.svg",
    "memory-matrix.html": "app-icon-memory-matrix.svg",
    "color-switch-rush.html": "app-icon-color-switch-rush.svg",
    "projects.html": "app-icon-projects-page.svg",
    "contact.html": "app-icon-contact-page.svg",
    "all-links.html": "app-icon-all-links.svg",
    "release-notes.html": "logo.svg",
    "krylo-blox-master-nexus.html": "core-icon-master-nexus.svg",
    "aether-core-v110.html": "core-icon-aether-v110.svg",
    "aether-core-v104.html": "core-icon-aether-v104.svg",
    "aether-core-v55.html": "core-icon-aether-v55.svg",
    "aether-core-v25.html": "core-icon-aether-v25.svg",
    "homework-hub.html": "app-icon-homework-hub.svg",
    "attendance-tracker.html": "app-icon-attendance-tracker.svg",
    "link-locker.html": "app-icon-link-locker.svg",
    "habit-heatmap.html": "app-icon-habit-heatmap.svg",
    "focus-music-deck.html": "app-icon-focus-music-deck.svg",
    "thumbnail-idea-board.html": "app-icon-thumbnail-idea-board.svg",
    "script-planner.html": "app-icon-script-planner.svg",
    "upload-calendar.html": "app-icon-upload-calendar.svg",
    "stream-overlay-kit.html": "app-icon-stream-overlay-kit.svg",
    "qr-generator-pro.html": "app-icon-qr-generator-pro.svg",
    "pomodoro-duel.html": "app-icon-pomodoro-duel.svg",
    "revision-race.html": "app-icon-revision-race.svg",
    "scholarship-finder.html": "app-icon-scholarship-finder.svg",
    "portfolio-asset-vault.html": "app-icon-portfolio-asset-vault.svg",
    "poll-party.html": "app-icon-poll-party.svg",
    "emoji-story-maker.html": "app-icon-emoji-story-maker.svg",
    "team-splitter.html": "app-icon-team-splitter.svg",
    "exam-countdown.html": "app-icon-exam-countdown.svg",
    "screenshot-annotator.html": "app-icon-screenshot-annotator.svg"
  };

  const THEME_KEY = "krishiv_theme_mode_v1";
  const FAV_KEY = "krishiv_app_favorites_v1";
  const RECENT_KEY = "krishiv_app_recents_v1";
  const STATS_KEY = "krishiv_app_launch_stats_v1";
  const THEMES = [
    { key: "default", label: "Aurora" },
    { key: "neon", label: "Neon" },
    { key: "solar", label: "Solar" }
  ];

  function applyTheme(key) {
    const chosen = THEMES.find((item) => item.key === key) || THEMES[0];
    document.body.setAttribute("data-theme", chosen.key);
    document.documentElement.setAttribute("data-theme", chosen.key);
    document.body.classList.add("app-theme-root");
    return chosen;
  }

  let activeTheme = safeGet(THEME_KEY, "default");
  let favorites = [];
  let recents = [];
  let stats = {};
  try {
    favorites = JSON.parse(safeGet(FAV_KEY, "[]"));
    if (!Array.isArray(favorites)) favorites = [];
  } catch {
    favorites = [];
  }
  try {
    recents = JSON.parse(safeGet(RECENT_KEY, "[]"));
    if (!Array.isArray(recents)) recents = [];
  } catch {
    recents = [];
  }
  try {
    stats = JSON.parse(safeGet(STATS_KEY, "{}"));
    if (!stats || typeof stats !== "object") stats = {};
  } catch {
    stats = {};
  }

  applyTheme(activeTheme);
  document.body.setAttribute("data-mode", "dark");
  document.documentElement.setAttribute("data-mode", "dark");
  document.body.classList.add("app-theme-root");

  function trackCurrentAppLaunch() {
    if (!path || path === "index.html" || path === "admin.private.html") return;
    stats[path] = Number(stats[path] || 0) + 1;
    safeSet(STATS_KEY, JSON.stringify(stats));
    recents = [path, ...recents.filter((item) => item !== path)].slice(0, 8);
    safeSet(RECENT_KEY, JSON.stringify(recents));
    postUsage("page_view", path);
    postUsage("app_open", path);
  }
  trackCurrentAppLaunch();

  const dock = document.createElement("div");
  dock.className = "app-shell-dock";
  dock.innerHTML = `
    <button type="button" class="app-shell-btn" id="shellHomeBtn">Home</button>
    <button type="button" class="app-shell-btn" id="shellAppsBtn">Apps</button>
    <button type="button" class="app-shell-btn" id="shellThemeBtn">Theme</button>
    <span class="app-shell-pill">Ctrl/Cmd + K</span>
  `;

  const overlay = document.createElement("div");
  overlay.className = "app-shell-overlay";
  overlay.innerHTML = `
    <section class="app-shell-panel" role="dialog" aria-modal="true" aria-label="Apps Galaxy">
      <header class="app-shell-head">
        <div class="app-shell-head-copy">
          <h2 class="app-shell-title">Apps Galaxy</h2>
          <p class="app-shell-subtitle">Your fastest route to favorites, AI tools, and live builds.</p>
        </div>
        <input class="app-shell-search" id="shellSearchInput" type="search" placeholder="Search app..." />
        <button type="button" class="app-shell-btn" id="shellCloseBtn">Close</button>
      </header>
      <div class="app-shell-insights" id="shellInsights"></div>
      <div class="app-shell-actions">
        <button type="button" class="app-shell-quick" data-action="featured">Open Random Featured</button>
        <button type="button" class="app-shell-quick" data-action="top">Open Most Used</button>
        <button type="button" class="app-shell-quick" data-action="ai">Open AI Zone</button>
      </div>
      <div class="app-shell-grid" id="shellGrid"></div>
    </section>
  `;

  document.body.appendChild(dock);
  document.body.appendChild(overlay);

  const homeBtn = document.getElementById("shellHomeBtn");
  const appsBtn = document.getElementById("shellAppsBtn");
  const themeBtn = document.getElementById("shellThemeBtn");
  const closeBtn = document.getElementById("shellCloseBtn");
  const grid = document.getElementById("shellGrid");
  const searchInput = document.getElementById("shellSearchInput");
  const insights = document.getElementById("shellInsights");

  function saveFavs() {
    safeSet(FAV_KEY, JSON.stringify(favorites));
  }

  function resolveOrder(items) {
    const withRank = items.map((item) => {
      const isFav = favorites.includes(item.href);
      const recentIndex = recents.indexOf(item.href);
      const recentRank = recentIndex >= 0 ? recentIndex : 999;
      const launches = Number(stats[item.href] || 0);
      const tierRank = item.tier === "featured" ? 0 : 1;
      return { item, isFav, recentRank, launches, tierRank };
    });
    withRank.sort((a, b) => {
      if (a.isFav !== b.isFav) return Number(b.isFav) - Number(a.isFav);
      if (a.recentRank !== b.recentRank) return a.recentRank - b.recentRank;
      if (a.tierRank !== b.tierRank) return a.tierRank - b.tierRank;
      if (a.launches !== b.launches) return b.launches - a.launches;
      return a.item.name.localeCompare(b.item.name);
    });
    return withRank;
  }

  function renderInsightStrip() {
    const totalLaunches = Object.values(stats).reduce((sum, value) => sum + Number(value || 0), 0);
    if (!insights) return;
    insights.innerHTML = `
      <article class="app-shell-insight"><strong>${APPS.length}</strong><span>apps indexed</span></article>
      <article class="app-shell-insight"><strong>${APPS.filter((item) => item.tier === "featured").length}</strong><span>featured</span></article>
      <article class="app-shell-insight"><strong>${favorites.length}</strong><span>favorites</span></article>
      <article class="app-shell-insight"><strong>${recents.length}</strong><span>recents</span></article>
      <article class="app-shell-insight"><strong>${totalLaunches}</strong><span>launches</span></article>
    `;
  }

  function renderCard({ item, isFav, launches }) {
    const icon = APP_ICONS[item.href] || "logo.svg";
    const tierLabel = item.tier === "featured" ? "Featured build" : item.tag;
    return `
      <article class="app-shell-link" data-href="${item.href}">
        <div class="app-shell-link-row">
          <a href="${item.href}" style="color:inherit;text-decoration:none;display:block;flex:1;">
            <span style="display:flex;align-items:center;gap:0.7rem;">
              <img src="${icon}" alt="" width="28" height="28" style="width:28px;height:28px;border-radius:10px;flex:0 0 auto;" />
              <strong>${item.name}</strong>
            </span>
            <span>${tierLabel}</span>
            <span class="app-shell-meta">${item.href} | launches: ${launches}</span>
          </a>
          <button type="button" class="app-shell-fav ${isFav ? "is-on" : ""}" data-fav="${item.href}" aria-label="Toggle favorite">${isFav ? "Fav" : "+"}</button>
        </div>
      </article>
    `;
  }

  function renderSection(label, items, emptyText) {
    return `
      <section class="app-shell-section">
        <p class="app-shell-section-label">${label}</p>
        ${items.length ? items.map(renderCard).join("") : `<div class="app-shell-empty">${emptyText}</div>`}
      </section>
    `;
  }

  function launchHref(href) {
    if (!href) return;
    window.location.href = href;
  }

  function openRandomFeatured() {
    const featured = APPS.filter((item) => item.tier === "featured");
    if (!featured.length) return;
    launchHref(featured[Math.floor(Math.random() * featured.length)].href);
  }

  function openMostUsed() {
    const topEntry = Object.entries(stats)
      .sort((left, right) => Number(right[1] || 0) - Number(left[1] || 0))
      .find(([href, count]) => href && Number(count || 0) > 0);
    if (topEntry) {
      launchHref(topEntry[0]);
      return;
    }
    openRandomFeatured();
  }

  function openAiZone() {
    launchHref(path === "aether-core-v104.html" ? "idea-lab-ai.html" : "aether-core-v104.html");
  }

  function renderGrid(term) {
    const q = String(term || "").toLowerCase().trim();
    const filtered = APPS.filter((item) => !q || item.name.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q) || item.href.toLowerCase().includes(q));
    const ordered = resolveOrder(filtered);
    renderInsightStrip();

    if (q) {
      grid.innerHTML = renderSection("Search Results", ordered, "No matching apps yet.");
      return;
    }

    const favoriteSet = new Set(favorites);
    const recentSet = new Set(recents);
    const favoriteItems = ordered.filter(({ item }) => favoriteSet.has(item.href)).slice(0, 6);
    const recentItems = ordered.filter(({ item }) => recentSet.has(item.href)).slice(0, 6);
    const featuredItems = ordered.filter(({ item }) => item.tier === "featured").slice(0, 8);
    const trendingItems = ordered.filter(({ launches }) => launches > 0).sort((a, b) => b.launches - a.launches).slice(0, 6);
    const directoryItems = ordered.slice(0, 18);
    grid.innerHTML = [
      renderSection("Favorites", favoriteItems, "Star an app to pin it here."),
      renderSection("Recent Launches", recentItems, "Open a few apps and they will show up here."),
      renderSection("Featured Builds", featuredItems, "Featured builds are warming up."),
      renderSection("Trending in This Browser", trendingItems, "This appears after you launch apps."),
      renderSection("Directory Snapshot", directoryItems, "Directory unavailable.")
    ].join("");
  }

  function openOverlay() {
    overlay.classList.add("is-open");
    renderGrid("");
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
  }

  function closeOverlay() {
    overlay.classList.remove("is-open");
  }

  function refreshButtons() {
    const themeLabel = "Theme: " + applyTheme(activeTheme).label;
    if (themeBtn) themeBtn.textContent = themeLabel;
  }
  refreshButtons();

  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
  if (appsBtn) appsBtn.addEventListener("click", openOverlay);
  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeOverlay();
        return;
      }
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const quickAction = target.closest("[data-action]");
      if (!(quickAction instanceof HTMLButtonElement)) return;
      const action = String(quickAction.dataset.action || "");
      if (action === "featured") openRandomFeatured();
      if (action === "top") openMostUsed();
      if (action === "ai") openAiZone();
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", () => renderGrid(searchInput.value));
  }
  if (grid) {
    grid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const favBtn = target.closest("button[data-fav]");
      if (favBtn instanceof HTMLButtonElement) {
        const href = String(favBtn.dataset.fav || "");
        if (!href) return;
        if (favorites.includes(href)) {
          favorites = favorites.filter((item) => item !== href);
        } else {
          favorites.unshift(href);
        }
        saveFavs();
        renderGrid(searchInput ? searchInput.value : "");
      }
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const index = Math.max(0, THEMES.findIndex((item) => item.key === activeTheme));
      activeTheme = THEMES[(index + 1) % THEMES.length].key;
      safeSet(THEME_KEY, activeTheme);
      refreshButtons();
    });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === THEME_KEY) {
      activeTheme = safeGet(THEME_KEY, activeTheme);
      refreshButtons();
      return;
    }
    if (event.key === FAV_KEY) {
      try {
        favorites = JSON.parse(safeGet(FAV_KEY, "[]"));
        if (!Array.isArray(favorites)) favorites = [];
      } catch {
        favorites = [];
      }
      renderGrid(searchInput ? searchInput.value : "");
      return;
    }
    if (event.key === RECENT_KEY) {
      try {
        recents = JSON.parse(safeGet(RECENT_KEY, "[]"));
        if (!Array.isArray(recents)) recents = [];
      } catch {
        recents = [];
      }
      renderGrid(searchInput ? searchInput.value : "");
      return;
    }
    if (event.key === STATS_KEY) {
      try {
        stats = JSON.parse(safeGet(STATS_KEY, "{}"));
        if (!stats || typeof stats !== "object") stats = {};
      } catch {
        stats = {};
      }
      renderGrid(searchInput ? searchInput.value : "");
    }
  });

  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openOverlay();
      return;
    }
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });
})();


