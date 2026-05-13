(() => {
  const configNode = document.getElementById("app-config");
  if (!configNode) return;

  let config = {};
  try {
    config = JSON.parse(configNode.textContent || "{}");
  } catch {
    config = {};
  }

  const defaults = {
    title: "Concept App",
    category: "Concept",
    lead: "Starter app page.",
    helper: "Add entries and manage them here.",
    storageKey: "krishiv_concept_app",
    boardTitle: "Entries",
    titleLabel: "Title",
    titlePlaceholder: "Add a title",
    metaLabel: "Focus",
    metaPlaceholder: "Add a short focus",
    notesLabel: "Details",
    notesPlaceholder: "Add details",
    ctaLabel: "Save entry",
    seedLabel: "Load example",
    searchPlaceholder: "Search entries...",
    emptyTitle: "No entries yet.",
    emptyLead: "Add your first one using the form.",
    statuses: ["Draft", "Planned", "Active"],
    seeds: []
  };

  config = { ...defaults, ...config };

  const byId = (id) => document.getElementById(id);
  const titleEl = byId("appTitle");
  const categoryEl = byId("appCategory");
  const leadEl = byId("appLead");
  const helperEl = byId("helperCopy");
  const heroPill = document.querySelector(".concept-pill");
  const boardTitleEl = byId("boardTitle");
  const titleLabelEl = byId("titleLabel");
  const metaLabelEl = byId("metaLabel");
  const notesLabelEl = byId("notesLabel");
  const titleInput = byId("entryTitle");
  const metaInput = byId("entryMeta");
  const notesInput = byId("entryNotes");
  const stateInput = byId("entryState");
  const addBtn = byId("addEntryBtn");
  const seedBtn = byId("seedEntryBtn");
  const searchInput = byId("searchInput");
  const seedArea = byId("seedChips");
  const listEl = byId("entryList");
  const totalEl = byId("totalCount");
  const pinnedEl = byId("pinnedCount");
  const doneEl = byId("doneCount");
  let currentEditId = "";
  const DRAFT_KEY = config.storageKey + "_draft_v1";

  const toolBar = document.createElement("div");
  toolBar.className = "concept-tools";
  toolBar.innerHTML = `
    <select id="statusFilter"></select>
    <select id="viewFilter">
      <option value="live">Live board</option>
      <option value="all">All entries</option>
      <option value="archived">Archived only</option>
    </select>
    <select id="sortFilter">
      <option value="newest">Sort: Newest</option>
      <option value="oldest">Sort: Oldest</option>
      <option value="pinned">Sort: Pinned First</option>
      <option value="state">Sort: Status</option>
    </select>
    <button type="button" class="concept-btn-secondary" id="exportBtn">Export</button>
    <button type="button" class="concept-btn-secondary" id="importBtn">Import</button>
    <button type="button" class="concept-btn-secondary" id="restoreDraftBtn">Restore Draft</button>
    <button type="button" class="concept-btn-secondary" id="clearDoneBtn">Clear Done</button>
  `;
  const boardHead = document.querySelector(".concept-board-head");
  if (boardHead && boardHead.parentNode) {
    boardHead.parentNode.insertBefore(toolBar, boardHead.nextSibling);
  }

  const hero = document.querySelector(".concept-hero");
  const upgradePanel = document.createElement("section");
  upgradePanel.className = "concept-shell concept-upgrade-panel";
  upgradePanel.innerHTML = `
    <div class="concept-upgrade-grid">
      <article class="concept-upgrade-card">
        <strong id="activeCount">0</strong>
        <span>active items</span>
      </article>
      <article class="concept-upgrade-card">
        <strong id="todayCount">0</strong>
        <span>added today</span>
      </article>
      <article class="concept-upgrade-card">
        <strong id="lastEditStamp">none yet</strong>
        <span>last update</span>
      </article>
      <article class="concept-upgrade-card">
        <strong id="archivedCount">0</strong>
        <span>archived items</span>
      </article>
      <article class="concept-upgrade-card">
        <strong id="completionPercent">0%</strong>
        <span>completion score</span>
      </article>
    </div>
  `;
  if (hero && hero.parentNode) {
    hero.parentNode.insertBefore(upgradePanel, hero.nextSibling);
  }

  const statusFilter = byId("statusFilter");
  const viewFilter = byId("viewFilter");
  const sortFilter = byId("sortFilter");
  const exportBtn = byId("exportBtn");
  const importBtn = byId("importBtn");
  const restoreDraftBtn = byId("restoreDraftBtn");
  const clearDoneBtn = byId("clearDoneBtn");
  const activeCountEl = byId("activeCount");
  const todayCountEl = byId("todayCount");
  const lastEditStampEl = byId("lastEditStamp");
  const archivedCountEl = byId("archivedCount");
  const completionPercentEl = byId("completionPercent");

  document.title = `${config.title} | Krishiv PB`;
  titleEl.textContent = config.title;
  categoryEl.textContent = config.category;
  leadEl.textContent = config.lead;
  helperEl.textContent = config.helper;
  if (heroPill) heroPill.textContent = "Full app board";
  boardTitleEl.textContent = config.boardTitle;
  titleLabelEl.textContent = config.titleLabel;
  metaLabelEl.textContent = config.metaLabel;
  notesLabelEl.textContent = config.notesLabel;
  titleInput.placeholder = config.titlePlaceholder;
  metaInput.placeholder = config.metaPlaceholder;
  notesInput.placeholder = config.notesPlaceholder;
  addBtn.textContent = config.ctaLabel;
  seedBtn.textContent = config.seedLabel;
  searchInput.placeholder = config.searchPlaceholder;

  stateInput.innerHTML = config.statuses.map((status) => `<option value="${status}">${status}</option>`).join("");
  if (statusFilter) {
    statusFilter.innerHTML = [`<option value="all">All status</option>`]
      .concat(config.statuses.map((status) => `<option value="${status}">${status}</option>`))
      .join("");
  }

  let items = [];
  try {
    items = JSON.parse(localStorage.getItem(config.storageKey) || "[]");
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }
  items = items.map((item) => ({
    ...item,
    archived: Boolean(item.archived),
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString()
  }));

  function save() {
    localStorage.setItem(config.storageKey, JSON.stringify(items));
  }

  function saveDraft() {
    const payload = {
      title: titleInput.value,
      meta: metaInput.value,
      notes: notesInput.value,
      state: stateInput.value
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    if (restoreDraftBtn) {
      const hasDraft = Boolean(payload.title || payload.meta || payload.notes);
      restoreDraftBtn.disabled = !hasDraft;
    }
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    if (restoreDraftBtn) restoreDraftBtn.disabled = true;
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
      titleInput.value = draft.title || "";
      metaInput.value = draft.meta || "";
      notesInput.value = draft.notes || "";
      stateInput.value = draft.state || config.statuses[0];
      if (window.safeNotify) window.safeNotify("Draft restored.");
    } catch {}
  }

  function updateStats() {
    totalEl.textContent = String(items.length);
    pinnedEl.textContent = String(items.filter((item) => item.pinned).length);
    doneEl.textContent = String(items.filter((item) => item.done).length);
    if (activeCountEl) activeCountEl.textContent = String(items.filter((item) => !item.done && !item.archived).length);
    if (todayCountEl) {
      const today = new Date().toISOString().slice(0, 10);
      todayCountEl.textContent = String(items.filter((item) => String(item.createdAt || "").slice(0, 10) === today).length);
    }
    if (lastEditStampEl) {
      const latest = items
        .map((item) => item.updatedAt || item.createdAt || "")
        .filter(Boolean)
        .sort()
        .pop();
      lastEditStampEl.textContent = latest ? new Date(latest).toLocaleDateString() : "none yet";
    }
    if (archivedCountEl) archivedCountEl.textContent = String(items.filter((item) => item.archived).length);
    if (completionPercentEl) {
      const liveItems = items.filter((item) => !item.archived);
      const doneCount = liveItems.filter((item) => item.done).length;
      const percent = liveItems.length ? Math.round((doneCount / liveItems.length) * 100) : 0;
      completionPercentEl.textContent = `${percent}%`;
    }
  }

  function renderSeeds() {
    seedArea.innerHTML = config.seeds.map((seed, index) => {
      const label = typeof seed === "string" ? seed : seed.title;
      return `<button type="button" class="concept-seed concept-btn-secondary" data-seed="${index}">${label}</button>`;
    }).join("");
  }

  function renderList() {
    const q = String(searchInput.value || "").trim().toLowerCase();
    const statusValue = String(statusFilter?.value || "all");
    const viewValue = String(viewFilter?.value || "live");
    const sortValue = String(sortFilter?.value || "newest");
    let filtered = items.filter((item) => {
      const hay = `${item.title} ${item.meta} ${item.notes} ${item.state}`.toLowerCase();
      if (statusValue !== "all" && item.state !== statusValue) return false;
      if (viewValue === "live" && item.archived) return false;
      if (viewValue === "archived" && !item.archived) return false;
      return !q || hay.includes(q);
    });

    if (sortValue === "oldest") filtered = filtered.slice().reverse();
    if (sortValue === "pinned") {
      filtered = filtered.slice().sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
    }
    if (sortValue === "state") {
      filtered = filtered.slice().sort((a, b) => String(a.state).localeCompare(String(b.state)));
    }

    if (!filtered.length) {
      listEl.innerHTML = `<div class="concept-empty"><strong>${config.emptyTitle}</strong><p>${config.emptyLead}</p></div>`;
      updateStats();
      return;
    }

    listEl.innerHTML = filtered.map((item) => `
      <article class="concept-item ${item.done ? "is-done" : ""}" data-id="${item.id}">
        <div class="concept-item-head">
          <div>
            <h3 class="concept-item-title">${item.title}</h3>
            <p>${item.meta || "No extra detail yet."}</p>
          </div>
          <div class="concept-item-tags">
            <span class="concept-mini-pill">${item.state}</span>
            ${item.pinned ? '<span class="concept-mini-pill">Pinned</span>' : ""}
            ${item.done ? '<span class="concept-mini-pill is-done">Done</span>' : ""}
            ${item.archived ? '<span class="concept-mini-pill">Archived</span>' : ""}
          </div>
        </div>
        <p>${item.notes || "No notes added yet."}</p>
        <p class="concept-item-stamp">Updated ${new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleString()}</p>
        <div class="concept-item-actions">
          <button type="button" data-action="edit">Edit</button>
          <button type="button" data-action="duplicate">Duplicate</button>
          <button type="button" data-action="pin">${item.pinned ? "Unpin" : "Pin"}</button>
          <button type="button" data-action="done">${item.done ? "Mark active" : "Mark done"}</button>
          <button type="button" data-action="archive">${item.archived ? "Unarchive" : "Archive"}</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      </article>
    `).join("");
    updateStats();
  }

  function fillFromSeed(seed) {
    const value = typeof seed === "string" ? { title: seed, meta: "", notes: "", state: config.statuses[0] } : seed;
    titleInput.value = value.title || "";
    metaInput.value = value.meta || "";
    notesInput.value = value.notes || "";
    stateInput.value = value.state || config.statuses[0];
  }

  function addEntry() {
    const title = String(titleInput.value || "").trim();
    const meta = String(metaInput.value || "").trim();
    const notes = String(notesInput.value || "").trim();
    const state = String(stateInput.value || config.statuses[0]);
    if (title.length < 2) {
      alert(`Please enter a valid ${config.titleLabel.toLowerCase()}.`);
      return;
    }
    const now = new Date().toISOString();
    if (currentEditId) {
      items = items.map((entry) => entry.id === currentEditId
        ? { ...entry, title, meta, notes, state, updatedAt: now }
        : entry);
      currentEditId = "";
      addBtn.textContent = config.ctaLabel;
    } else {
      items.unshift({
        id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        title,
        meta,
        notes,
        state,
        pinned: false,
        done: false,
        archived: false,
        createdAt: now,
        updatedAt: now
      });
    }
    titleInput.value = "";
    metaInput.value = "";
    notesInput.value = "";
    stateInput.value = config.statuses[0];
    clearDraft();
    save();
    renderList();
    if (window.safeNotify) window.safeNotify(`${config.title} entry saved.`);
  }

  addBtn.addEventListener("click", addEntry);
  titleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addEntry();
    }
  });

  seedBtn.addEventListener("click", () => {
    if (!config.seeds.length) return;
    fillFromSeed(config.seeds[0]);
  });

  seedArea.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const index = Number(target.dataset.seed || -1);
    const seed = config.seeds[index];
    if (!seed) return;
    fillFromSeed(seed);
  });

  listEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const itemEl = target.closest(".concept-item");
    if (!itemEl) return;
    const id = itemEl.getAttribute("data-id");
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    const action = target.dataset.action;
    if (action === "edit") {
      fillFromSeed(item);
      currentEditId = item.id;
      addBtn.textContent = "Update entry";
    }
    if (action === "duplicate") {
      items.unshift({
        ...item,
        id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        title: `${item.title} copy`,
        archived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    if (action === "pin") item.pinned = !item.pinned;
    if (action === "done") item.done = !item.done;
    if (action === "archive") item.archived = !item.archived;
    if (action === "delete") items = items.filter((entry) => entry.id !== id);
    if (action === "pin" || action === "done" || action === "archive") item.updatedAt = new Date().toISOString();
    save();
    renderList();
  });

  searchInput.addEventListener("input", renderList);
  statusFilter?.addEventListener("change", renderList);
  viewFilter?.addEventListener("change", renderList);
  sortFilter?.addEventListener("change", renderList);
  exportBtn?.addEventListener("click", () => {
    const payload = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(payload).then(() => {
      if (window.safeNotify) window.safeNotify(`${config.title} exported to clipboard.`);
    }).catch(() => {
      alert(payload);
    });
  });
  importBtn?.addEventListener("click", () => {
    const raw = window.prompt("Paste exported JSON for this app:");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("bad import");
      items = parsed.map((item, index) => ({
        id: item.id || `${Date.now().toString(36)}_${index}`,
        title: String(item.title || "Imported entry"),
        meta: String(item.meta || ""),
        notes: String(item.notes || ""),
        state: String(item.state || config.statuses[0]),
        pinned: Boolean(item.pinned),
        done: Boolean(item.done),
        archived: Boolean(item.archived),
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || item.createdAt || new Date().toISOString()
      }));
      save();
      renderList();
      if (window.safeNotify) window.safeNotify(`${config.title} imported.`);
    } catch {
      alert("That import was not valid JSON.");
    }
  });
  restoreDraftBtn?.addEventListener("click", restoreDraft);
  clearDoneBtn?.addEventListener("click", () => {
    items = items.filter((entry) => !entry.done);
    save();
    renderList();
  });

  [titleInput, metaInput, notesInput, stateInput].forEach((input) => {
    input?.addEventListener("input", saveDraft);
    input?.addEventListener("change", saveDraft);
  });

  renderSeeds();
  if (!localStorage.getItem(DRAFT_KEY) && restoreDraftBtn) restoreDraftBtn.disabled = true;
  renderList();

  if (!document.querySelector('script[src="premium-ui-injector.js"]')) {
    const pScript = document.createElement("script");
    pScript.src = "premium-ui-injector.js";
    pScript.defer = true;
    document.head.appendChild(pScript);
  }
})();
