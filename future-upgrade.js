(() => {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MODE_KEY = "krishiv_future_mode_v1";
  const LAUNCH_KEY = "krishiv_app_launch_stats_v1";
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

  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const allowed = ["index.html", "games.html", ""];
  if (!allowed.includes(path)) return;

  let futureMode = safeGet(MODE_KEY, "");
  if (futureMode === null) {
    futureMode = "on";
    safeSet(MODE_KEY, futureMode);
  }
  if (!futureMode) {
    futureMode = "on";
    safeSet(MODE_KEY, futureMode);
  }

  function modeOn() {
    return futureMode === "on";
  }

  function applyMode() {
    document.body.classList.toggle("future-mode", modeOn());
    toggle.textContent = modeOn() ? "Future: ON" : "Future: OFF";
    toggle.setAttribute("aria-pressed", modeOn() ? "true" : "false");
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "future-toggle-btn";
  toggle.setAttribute("aria-label", "Toggle future interface mode");
  toggle.addEventListener("click", () => {
    futureMode = modeOn() ? "off" : "on";
    safeSet(MODE_KEY, futureMode);
    applyMode();
  });
  document.body.appendChild(toggle);
  applyMode();

  const futureClock = document.getElementById("futureClock");
  const futurePulse = document.getElementById("futurePulse");
  const futureLaunches = document.getElementById("futureLaunches");
  const futureQuality = document.getElementById("futureQuality");

  function getLaunchCount() {
    try {
      const raw = safeGet(LAUNCH_KEY, "{}");
      const parsed = raw ? JSON.parse(raw) : {};
      if (!parsed || typeof parsed !== "object") return 0;
      return Object.values(parsed).reduce((sum, value) => sum + Number(value || 0), 0);
    } catch {
      return 0;
    }
  }

  function getQuality() {
    const cc = document.getElementById("ccQualityScore");
    if (cc && cc.textContent) return cc.textContent.trim();
    const launches = getLaunchCount();
    const base = 72;
    const score = Math.min(100, base + Math.min(22, launches));
    return score + "/100";
  }

  function syncFuturePanel() {
    const now = new Date();
    if (futureClock) futureClock.textContent = "IST " + now.toLocaleTimeString("en-IN");
    if (futurePulse) {
      const phase = now.getSeconds() % 3;
      futurePulse.textContent = phase === 0 ? "surging" : phase === 1 ? "stable" : "charging";
    }
    if (futureLaunches) futureLaunches.textContent = String(getLaunchCount()) + " events";
    if (futureQuality) futureQuality.textContent = getQuality();
  }

  syncFuturePanel();
  setInterval(syncFuturePanel, 1000);

  window.addEventListener("keydown", (event) => {
    if (event.altKey && event.key.toLowerCase() === "f") {
      event.preventDefault();
      toggle.click();
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === MODE_KEY) {
      futureMode = safeGet(MODE_KEY, futureMode || "on") || "on";
      applyMode();
      return;
    }
    if (event.key === LAUNCH_KEY) {
      syncFuturePanel();
    }
  });

  if (REDUCED) return;

  const canvas = document.createElement("canvas");
  canvas.className = "future-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const points = [];
  let width = 0;
  let height = 0;
  let raf = 0;

  function resize() {
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    points.length = 0;
    const count = Math.max(22, Math.floor(width / 70));
    for (let i = 0; i < count; i += 1) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24
      });
    }
  }

  function draw() {
    if (!modeOn()) {
      ctx.clearRect(0, 0, width, height);
      raf = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(84, 224, 255, 0.62)";
    ctx.strokeStyle = "rgba(84, 224, 255, 0.14)";

    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < -20) a.x = width + 20;
      if (a.x > width + 20) a.x = -20;
      if (a.y < -20) a.y = height + 20;
      if (a.y > height + 20) a.y = -20;

      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < points.length; j += 1) {
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 120) continue;
        const alpha = 1 - dist / 120;
        ctx.strokeStyle = "rgba(84, 224, 255," + (alpha * 0.2).toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
})();
