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
    try { localStorage.setItem(key, value); } catch {}
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
    { name: "Master Nexus", href: "krylo-blox-master-nexus.html", tag: "Core", tier: "featured" },
    { name: "Aether v104", href: "aether-core-v104.html", tag: "Core" },
    { name: "Aether v55", href: "aether-core-v55.html", tag: "Core" },
    { name: "Aether v2.5", href: "aether-core-v25.html", tag: "Core" },
    { name: "Homework Hub", href: "homework-hub.html", tag: "Concept" },
    { name: "Attendance Tracker", href: "attendance-tracker.html", tag: "Concept" },
    { name: "Link Locker", href: "link-locker.html", tag: "Concept" },
    { name: "Habit Heatmap", href: "habit-heatmap.html", tag: "Concept" },
    { name: "Focus Music Deck", href: "focus-music-deck.html", tag: "Concept" },
    { name: "Thumbnail Idea Board", href: "thumbnail-idea-board.html", tag: "Concept" },
    { name: "Script Planner", href: "script-planner.html", tag: "Concept" },
    { name: "Upload Calendar", href: "upload-calendar.html", tag: "Concept" },
    { name: "Stream Overlay Kit", href: "stream-overlay-kit.html", tag: "Concept" },
    { name: "QR Generator Pro", href: "qr-generator-pro.html", tag: "Concept" },
    { name: "Pomodoro Duel", href: "pomodoro-duel.html", tag: "Concept" },
    { name: "Revision Race", href: "revision-race.html", tag: "Concept" },
    { name: "Scholarship Finder", href: "scholarship-finder.html", tag: "Concept" },
    { name: "Portfolio Asset Vault", href: "portfolio-asset-vault.html", tag: "Concept" },
    { name: "Poll Party", href: "poll-party.html", tag: "Concept" },
    { name: "Emoji Story Maker", href: "emoji-story-maker.html", tag: "Concept" },
    { name: "Team Splitter", href: "team-splitter.html", tag: "Concept" },
    { name: "Exam Countdown", href: "exam-countdown.html", tag: "Concept" },
    { name: "Screenshot Annotator", href: "screenshot-annotator.html", tag: "Concept" }
  ];

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
  try { favorites = JSON.parse(safeGet(FAV_KEY, "[]")); if (!Array.isArray(favorites)) favorites = []; } catch { favorites = []; }
  try { recents = JSON.parse(safeGet(RECENT_KEY, "[]")); if (!Array.isArray(recents)) recents = []; } catch { recents = []; }
  try { stats = JSON.parse(safeGet(STATS_KEY, "{}")); if (!stats || typeof stats !== "object") stats = {}; } catch { stats = {}; }
  applyTheme(activeTheme);
  document.body.setAttribute("data-mode", "dark");
  document.documentElement.setAttribute("data-mode", "dark");
  document.body.classList.add("app-theme-root");

  function trackCurrentAppLaunch() {
    if (!path || path === "index.html" || path === "admin.private.html") return;
    stats[path] = Number(stats[path] || 0) + 1;
    safeSet(STATS_KEY, JSON.stringify(stats));
    const nextRecents = [path, ...recents.filter((item) => item !== path)].slice(0, 8);
    recents = nextRecents;
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
        <h2 class="app-shell-title">Apps Galaxy</h2>
        <input class="app-shell-search" id="shellSearchInput" type="search" placeholder="Search app..." />
        <button type="button" class="app-shell-btn" id="shellCloseBtn">Close</button>
      </header>
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

  function renderGrid(term) {
    const q = String(term || "").toLowerCase().trim();
    const filtered = APPS.filter((item) => !q || item.name.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q) || item.href.toLowerCase().includes(q));
    const ordered = resolveOrder(filtered);
    grid.innerHTML = ordered.map(({ item, isFav, launches }) => `
      <article class="app-shell-link" data-href="${item.href}">
        <div class="app-shell-link-row">
          <a href="${item.href}" style="color:inherit;text-decoration:none;display:block;flex:1;">
            <strong>${item.name}</strong>
            <span>${item.tag}${item.tier === "featured" ? " • Featured" : ""}</span>
            <span class="app-shell-meta">${item.href} | launches: ${launches}</span>
          </a>
          <button type="button" class="app-shell-fav ${isFav ? "is-on" : ""}" data-fav="${item.href}" aria-label="Toggle favorite">${isFav ? "Fav" : "+"}</button>
        </div>
      </article>
    `).join("");
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
      if (event.target === overlay) closeOverlay();
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
        if (favorites.includes(href)) favorites = favorites.filter((x) => x !== href);
        else favorites.unshift(href);
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
