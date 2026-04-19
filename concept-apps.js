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

  document.title = `${config.title} | Krishiv PB`;
  titleEl.textContent = config.title;
  categoryEl.textContent = config.category;
  leadEl.textContent = config.lead;
  helperEl.textContent = config.helper;
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

  let items = [];
  try {
    items = JSON.parse(localStorage.getItem(config.storageKey) || "[]");
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }

  function save() {
    localStorage.setItem(config.storageKey, JSON.stringify(items));
  }

  function updateStats() {
    totalEl.textContent = String(items.length);
    pinnedEl.textContent = String(items.filter((item) => item.pinned).length);
    doneEl.textContent = String(items.filter((item) => item.done).length);
  }

  function renderSeeds() {
    seedArea.innerHTML = config.seeds.map((seed, index) => {
      const label = typeof seed === "string" ? seed : seed.title;
      return `<button type="button" class="concept-seed concept-btn-secondary" data-seed="${index}">${label}</button>`;
    }).join("");
  }

  function renderList() {
    const q = String(searchInput.value || "").trim().toLowerCase();
    const filtered = items.filter((item) => {
      const hay = `${item.title} ${item.meta} ${item.notes} ${item.state}`.toLowerCase();
      return !q || hay.includes(q);
    });

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
          </div>
        </div>
        <p>${item.notes || "No notes added yet."}</p>
        <div class="concept-item-actions">
          <button type="button" data-action="pin">${item.pinned ? "Unpin" : "Pin"}</button>
          <button type="button" data-action="done">${item.done ? "Mark active" : "Mark done"}</button>
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
    items.unshift({
      id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      meta,
      notes,
      state,
      pinned: false,
      done: false
    });
    titleInput.value = "";
    metaInput.value = "";
    notesInput.value = "";
    stateInput.value = config.statuses[0];
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
    if (action === "pin") item.pinned = !item.pinned;
    if (action === "done") item.done = !item.done;
    if (action === "delete") items = items.filter((entry) => entry.id !== id);
    save();
    renderList();
  });

  searchInput.addEventListener("input", renderList);

  renderSeeds();
  renderList();

  if (!document.querySelector('script[src="premium-ui-injector.js"]')) {
    const pScript = document.createElement("script");
    pScript.src = "premium-ui-injector.js";
    pScript.defer = true;
    document.head.appendChild(pScript);
  }
})();
