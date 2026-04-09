const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
let PgPoolClass = null;
try {
  ({ Pool: PgPoolClass } = require("pg"));
} catch {
  PgPoolClass = null;
}

const PORT = Number(process.env.PORT || 3000);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const DATA_FILE = path.join(DATA_DIR, "reviews.json");
const IDEAS_DATA_FILE = path.join(DATA_DIR, "ideas.json");
const YT_NEXUS_DATA_FILE = path.join(DATA_DIR, "yt-nexus.json");
const PRIVATE_ADMIN_UI_FILE = path.join(ROOT_DIR, "admin.private.html");
const USAGE_ADMIN_UI_FILE = path.join(ROOT_DIR, "usage-admin.private.html");
const USAGE_DATA_FILE = path.join(DATA_DIR, "usage-analytics.json");
const GOOGLE_API_KEY = String(process.env.GOOGLE_API_KEY || "").trim();
const GOOGLE_API_KEYS = String(process.env.GOOGLE_API_KEYS || "")
  .split(/[,\r\n]+/)
  .map((key) => key.trim())
  .filter(Boolean);
const GOOGLE_MODEL = String(process.env.GOOGLE_MODEL || "gemini-2.5-flash").trim();
const REVIEW_STORAGE_KEY = String(process.env.REVIEW_STORAGE_KEY || "reviews:global:v1").trim();
const KV_REST_API_URL = String(process.env.KV_REST_API_URL || "").trim();
const KV_REST_API_TOKEN = String(process.env.KV_REST_API_TOKEN || "").trim();
const REVIEW_ADMIN_TOKEN = String(process.env.REVIEW_ADMIN_TOKEN || "").trim();
const FIREBASE_DB_URL = String(process.env.FIREBASE_DB_URL || "").trim().replace(/\/+$/, "");
const FIREBASE_DB_AUTH = String(process.env.FIREBASE_DB_AUTH || "").trim();
const FIREBASE_SERVICE_ACCOUNT_JSON_B64 = String(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64 || "").trim();
const REVIEW_DATABASE_URL = String(
  process.env.REVIEW_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  ""
).trim();
const YT_PORTFOLIO_SYNC_URL = String(
  process.env.YT_PORTFOLIO_SYNC_URL ||
  "https://my-yt-updater-default-rtdb.asia-southeast1.firebasedatabase.app/.json"
).trim();
const YT_PORTFOLIO_SYNC_AUTH = String(
  process.env.YT_PORTFOLIO_SYNC_AUTH ||
  ""
).trim();
const YOUTUBE_API_KEY = String(process.env.YOUTUBE_API_KEY || "").trim();
const YOUTUBE_API_KEYS = String(process.env.YOUTUBE_API_KEYS || "")
  .split(/[,\r\n]+/)
  .map((key) => key.trim())
  .filter(Boolean);
const YT_CHANNEL_ID = String(process.env.YT_CHANNEL_ID || "").trim();
const YT_CHANNEL_HANDLE = String(process.env.YT_CHANNEL_HANDLE || "").trim();
const YT_CHANNEL_HANDLES = String(process.env.YT_CHANNEL_HANDLES || "")
  .split(/[,\r\n]+/)
  .map((v) => v.trim())
  .filter(Boolean);
const YT_CHANNEL_USERNAME = String(process.env.YT_CHANNEL_USERNAME || "").trim();
const YT_AUTO_SYNC = !/^(0|false|no)$/i.test(String(process.env.YT_AUTO_SYNC || "true").trim());

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function fetchWithTimeout(resource, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(resource, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(timer));
}

let inMemoryReviews = [];
let inMemoryIdeas = [];
let storageBootstrapped = false;
let ideasBootstrapped = false;
let firebaseServiceAccount = null;
let firebaseAccessTokenCache = { token: "", expiresAt: 0 };
let pgPool = null;
let pgBootstrapped = false;
let ytNexusBootstrapped = false;
let ytLastSyncedAt = "";
let ytLastSyncSource = "local";
let usageBootstrapped = false;
let usageAnalytics = {
  totalEvents: 0,
  byEvent: {},
  byPage: {},
  uniqueSessions: {},
  timeline: []
};
let inMemoryYtNexus = {
  message: "Subscribe to Krylo-Blox",
  subs: 7,
  views: 7,
  uploads: 0
};
const writeRateWindowMs = 60_000;
const writeRateLimit = new Map();

function hasPostgresStorage() {
  return Boolean(REVIEW_DATABASE_URL) && Boolean(PgPoolClass);
}

function hasFirebaseStorage() {
  return Boolean(FIREBASE_DB_URL);
}

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function getFirebaseServiceAccount() {
  if (firebaseServiceAccount !== null) {
    return firebaseServiceAccount;
  }
  if (!FIREBASE_SERVICE_ACCOUNT_JSON_B64) {
    firebaseServiceAccount = undefined;
    return firebaseServiceAccount;
  }
  try {
    const json = Buffer.from(FIREBASE_SERVICE_ACCOUNT_JSON_B64, "base64").toString("utf8");
    firebaseServiceAccount = JSON.parse(json);
  } catch {
    firebaseServiceAccount = undefined;
  }
  return firebaseServiceAccount;
}

async function getFirebaseAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (firebaseAccessTokenCache.token && firebaseAccessTokenCache.expiresAt > now + 60) {
    return firebaseAccessTokenCache.token;
  }

  const serviceAccount = getFirebaseServiceAccount();
  if (!serviceAccount?.client_email || !serviceAccount?.private_key || !serviceAccount?.token_uri) {
    return "";
  }

  const header = { alg: "RS256", typ: "JWT" };
  const scope = "https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email";
  const payload = {
    iss: serviceAccount.client_email,
    sub: serviceAccount.client_email,
    aud: serviceAccount.token_uri,
    scope,
    iat: now,
    exp: now + 3600
  };

  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signature = require("crypto")
    .createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(serviceAccount.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetchWithTimeout(serviceAccount.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    return "";
  }

  firebaseAccessTokenCache = {
    token: String(data.access_token),
    expiresAt: now + Number(data.expires_in || 3600)
  };
  return firebaseAccessTokenCache.token;
}

function sanitizeFirebaseNode(input) {
  return String(input || "reviews_global_v1")
    .replace(/[.#$\[\]/\\]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 120);
}

function getConfiguredReviewStorage() {
  if (hasPostgresStorage()) {
    return "postgres";
  }
  if (hasFirebaseStorage()) {
    return "firebase";
  }
  if (hasKvStorage()) {
    return "vercel-kv";
  }
  return "fallback";
}

function firebaseUrl(pathname) {
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const base = `${FIREBASE_DB_URL}${safePath}.json`;
  const usingServiceAccount = Boolean(getFirebaseServiceAccount());
  if (usingServiceAccount || !FIREBASE_DB_AUTH) {
    return base;
  }
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}auth=${encodeURIComponent(FIREBASE_DB_AUTH)}`;
}

async function getFirebaseHeaders(extra = {}) {
  const headers = { ...extra };
  const token = await getFirebaseAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function firebaseReadReviews() {
  const node = sanitizeFirebaseNode(REVIEW_STORAGE_KEY);
  const response = await fetchWithTimeout(firebaseUrl(`/${node}`), {
    method: "GET",
    headers: await getFirebaseHeaders()
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Firebase read failed: ${response.status} ${text}`);
  }
  const data = await response.json();
  if (!data) {
    return [];
  }
  if (Array.isArray(data)) {
    return data.filter(Boolean);
  }
  if (typeof data === "object") {
    return Object.values(data).filter(Boolean);
  }
  return [];
}

async function firebaseWriteReviews(reviews) {
  const node = sanitizeFirebaseNode(REVIEW_STORAGE_KEY);
  const response = await fetchWithTimeout(firebaseUrl(`/${node}`), {
    method: "PUT",
    headers: await getFirebaseHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(reviews)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Firebase write failed: ${response.status} ${text}`);
  }
}

async function getPgPool() {
  if (!hasPostgresStorage()) {
    return null;
  }
  if (!pgPool) {
    const useSsl = !/localhost|127\.0\.0\.1/i.test(REVIEW_DATABASE_URL);
    pgPool = new PgPoolClass({
      connectionString: REVIEW_DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false
    });
  }
  return pgPool;
}

async function ensurePostgresTable() {
  if (pgBootstrapped) {
    return;
  }
  const pool = await getPgPool();
  if (!pool) {
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      created_at TIMESTAMPTZ NOT NULL,
      delete_token TEXT NOT NULL
    )
  `);
  pgBootstrapped = true;
}

function hasKvStorage() {
  return Boolean(KV_REST_API_URL && KV_REST_API_TOKEN);
}

async function kvCommand(command, ...args) {
  const encoded = [command, ...args.map((arg) => encodeURIComponent(String(arg)))].join("/");
  const endpoint = `${KV_REST_API_URL.replace(/\/+$/, "")}/${encoded}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || data.result || `KV command failed: ${response.status}`;
    throw new Error(String(message));
  }
  return data.result;
}

async function bootstrapReviewStorage() {
  if (storageBootstrapped) {
    return;
  }
  storageBootstrapped = true;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    inMemoryReviews = Array.isArray(parsed) ? parsed : [];
  } catch {
    inMemoryReviews = [];
  }
}

async function bootstrapIdeaStorage() {
  if (ideasBootstrapped) {
    return;
  }
  ideasBootstrapped = true;
  try {
    const raw = await fs.readFile(IDEAS_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    inMemoryIdeas = Array.isArray(parsed) ? parsed : [];
  } catch {
    inMemoryIdeas = [];
  }
}

async function loadReviews() {
  if (hasPostgresStorage()) {
    try {
      const pool = await getPgPool();
      await ensurePostgresTable();
      const result = await pool.query(`
        SELECT
          id,
          name,
          category,
          message,
          rating,
          created_at AS "createdAt",
          delete_token AS "deleteToken"
        FROM reviews
        ORDER BY created_at DESC
      `);
      return result.rows.map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt).toISOString()
      }));
    } catch {
      // Fall through to other storage layers if DB is unavailable.
    }
  }

  if (hasFirebaseStorage()) {
    try {
      return await firebaseReadReviews();
    } catch {
      return [];
    }
  }

  if (hasKvStorage()) {
    try {
      const raw = await kvCommand("get", REVIEW_STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(String(raw));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  await bootstrapReviewStorage();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    inMemoryReviews = Array.isArray(parsed) ? parsed : inMemoryReviews;
  } catch {
    // On serverless/read-only runtimes, fallback to memory.
  }
  return inMemoryReviews;
}

async function saveReviews(reviews) {
  if (hasPostgresStorage()) {
    const normalized = Array.isArray(reviews) ? reviews : [];
    try {
      const pool = await getPgPool();
      await ensurePostgresTable();
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        await client.query("DELETE FROM reviews");
        for (const review of normalized) {
          await client.query(
            `INSERT INTO reviews (id, name, category, message, rating, created_at, delete_token)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              review.id,
              review.name,
              review.category,
              review.message,
              Number(review.rating),
              new Date(review.createdAt || Date.now()).toISOString(),
              String(review.deleteToken || "")
            ]
          );
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
      return;
    } catch {
      // Fall through to other storage layers if DB is unavailable.
    }
  }

  if (hasFirebaseStorage()) {
    const normalized = Array.isArray(reviews) ? reviews : [];
    await firebaseWriteReviews(normalized);
    return;
  }

  if (hasKvStorage()) {
    const normalized = Array.isArray(reviews) ? reviews : [];
    await kvCommand("set", REVIEW_STORAGE_KEY, JSON.stringify(normalized));
    return;
  }

  await bootstrapReviewStorage();
  inMemoryReviews = Array.isArray(reviews) ? reviews : inMemoryReviews;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(inMemoryReviews, null, 2), "utf8");
  } catch {
    // Ignore file-write errors in read-only environments.
  }
}

async function loadIdeas() {
  await bootstrapIdeaStorage();
  try {
    const raw = await fs.readFile(IDEAS_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    inMemoryIdeas = Array.isArray(parsed) ? parsed : inMemoryIdeas;
  } catch {
    // On serverless/read-only runtimes, fallback to memory.
  }
  return inMemoryIdeas;
}

async function saveIdeas(ideas) {
  await bootstrapIdeaStorage();
  inMemoryIdeas = Array.isArray(ideas) ? ideas : inMemoryIdeas;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(IDEAS_DATA_FILE, JSON.stringify(inMemoryIdeas, null, 2), "utf8");
  } catch {
    // Ignore file-write errors in read-only environments.
  }
}

function getAvailableGoogleKeys() {
  const keys = [];
  if (GOOGLE_API_KEY) {
    keys.push(GOOGLE_API_KEY);
  }
  for (const key of GOOGLE_API_KEYS) {
    if (!keys.includes(key)) {
      keys.push(key);
    }
  }
  return keys;
}

function getAvailableYouTubeKeys() {
  const keys = [];
  if (YOUTUBE_API_KEY) {
    keys.push(YOUTUBE_API_KEY);
  }
  for (const key of YOUTUBE_API_KEYS) {
    if (!keys.includes(key)) {
      keys.push(key);
    }
  }
  for (const key of getAvailableGoogleKeys()) {
    if (!keys.includes(key)) {
      keys.push(key);
    }
  }
  return keys;
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function isCreatorAuthorized(req) {
  if (!REVIEW_ADMIN_TOKEN) {
    return false;
  }
  const provided = String(req.headers["x-admin-token"] || "").trim();
  return Boolean(provided) && provided === REVIEW_ADMIN_TOKEN;
}

function isPrivateAdminAuthorized(req, urlObj) {
  if (!REVIEW_ADMIN_TOKEN) {
    return false;
  }
  const headerToken = String(req.headers["x-admin-token"] || "").trim();
  const queryToken = String((urlObj && urlObj.searchParams.get("token")) || "").trim();
  const provided = headerToken || queryToken;
  return Boolean(provided) && provided === REVIEW_ADMIN_TOKEN;
}

function getUserDeleteToken(req) {
  return String(req.headers["x-review-delete-token"] || "").trim();
}

function getClientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").trim();
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return String(req.socket?.remoteAddress || "unknown");
}

function isWriteRateLimited(key, limit, windowMs) {
  const now = Date.now();
  const state = writeRateLimit.get(key) || { count: 0, start: now };
  if (now - state.start >= windowMs) {
    writeRateLimit.set(key, { count: 1, start: now });
    return false;
  }
  state.count += 1;
  writeRateLimit.set(key, state);
  return state.count > limit;
}

function toPublicReview(review) {
  if (!review || typeof review !== "object") {
    return review;
  }
  const { deleteToken, ...publicReview } = review;
  return publicReview;
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function buildFallbackSuggestion(reviewText, category, rating) {
  const safeText = String(reviewText || "").trim();
  const safeCategory = String(category || "General").trim();
  const safeRating = Number(rating || 0);

  if (!safeText) {
    return "Start with one clear point: what worked, what did not, and one suggestion to improve.";
  }

  const opening = safeRating >= 4
    ? "Great base review. Here is a sharper version:"
    : "Good start. Here is a clearer and more actionable version:";

  return `${opening}\n\nIn the ${safeCategory} section, I rated this ${safeRating || "N/A"}/5. ${safeText} I suggest focusing next on one specific improvement with an example result.`;
}

function buildFallbackIdea(goal, audience, constraints) {
  const safeGoal = String(goal || "").trim();
  const safeAudience = String(audience || "general users").trim();
  const safeConstraints = String(constraints || "").trim();
  const constraintLine = safeConstraints ? `Constraints: ${safeConstraints}.` : "";
  return [
    `App idea: "${safeGoal || "Productivity Booster"}"`,
    `Target audience: ${safeAudience}.`,
    `Core feature 1: Fast create-and-track workflow.`,
    `Core feature 2: Progress dashboard with simple analytics.`,
    `Core feature 3: Smart assistant hints for next actions.`,
    constraintLine,
    `Execution plan: Build MVP with one key workflow, test with 5 users, then improve based on feedback.`
  ].filter(Boolean).join("\n");
}

function buildFallbackIdeaSuite(goal, audience, constraints, count = 3) {
  const safeGoal = String(goal || "Smart Student App").trim();
  const safeAudience = String(audience || "students").trim();
  const safeConstraints = String(constraints || "mobile-first").trim();
  const templateIdeas = [
    {
      name: "Pulse Planner",
      angle: "Prioritize daily work with streak and rewards",
      features: ["Smart priority scoring", "Daily streak meter", "Auto reminder prompts"],
      stack: "HTML/CSS/JS + local storage",
      monetization: "Premium planner themes + study reports"
    },
    {
      name: "Flash Mentor",
      angle: "Adaptive revision app that changes by weak topics",
      features: ["Weak-topic detection", "Timed challenge rounds", "Progress heatmap"],
      stack: "Node API + question bank JSON",
      monetization: "School packs + challenge events"
    },
    {
      name: "Project Orbit",
      angle: "Plan school projects from idea to presentation",
      features: ["Milestone timeline", "Task board + due alerts", "Presentation checklist"],
      stack: "Kanban UI + export to PDF",
      monetization: "Template bundles + teacher dashboard"
    },
    {
      name: "Focus Forge",
      angle: "AI-guided focus sprints and break coaching",
      features: ["Custom sprint plans", "Smart interruption logging", "Daily focus score"],
      stack: "Web timer + analytics + AI suggestions",
      monetization: "Pro AI coaching plans"
    },
    {
      name: "Skill Quest",
      angle: "Gamified roadmap for coding and school goals",
      features: ["XP + level badges", "Quest generator", "Progress streak maps"],
      stack: "Interactive roadmap + cloud sync",
      monetization: "Quest packs + team mode"
    }
  ];
  const safeCount = Math.max(1, Math.min(6, Number(count) || 3));
  const ideas = templateIdeas.slice(0, safeCount);
  return [
    `Goal: ${safeGoal}`,
    `Audience: ${safeAudience}`,
    `Constraints: ${safeConstraints}`,
    "",
    ...ideas.map((idea, idx) => [
      `${idx + 1}. ${idea.name}`,
      `   ${idea.angle}.`,
      `   Features: ${idea.features.join(", ")}`,
      `   Stack: ${idea.stack}`,
      `   Monetization: ${idea.monetization}`
    ].join("\n"))
  ].join("\n");
}

function normalizeYtNexusPayload(input) {
  const source = input && typeof input === "object" ? input : {};
  return {
    message: String(source.message || "Subscribe to Krylo-Blox").trim() || "Subscribe to Krylo-Blox",
    subs: Math.max(0, Number(source.subs || source.subscribers || 7) || 7),
    views: Math.max(0, Number(source.views || source.totalViews || 7) || 7),
    uploads: Math.max(0, Number(source.uploads || source.videos || 0) || 0)
  };
}

function normalizeHandleValue(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const fromUrl = raw.match(/youtube\.com\/@([^/?#]+)/i);
  const candidate = fromUrl ? fromUrl[1] : raw.replace(/^@+/, "");
  return candidate.trim();
}

function getYouTubeTargets() {
  const targets = [];
  const pushUnique = (key, value) => {
    if (!value) return;
    const id = `${key}:${value}`;
    if (!targets.find((item) => item.id === id)) {
      targets.push({ id, key, value });
    }
  };

  pushUnique("id", YT_CHANNEL_ID);

  for (const handle of YT_CHANNEL_HANDLES) {
    const normalized = normalizeHandleValue(handle);
    pushUnique("forHandle", normalized);
  }

  const singleHandle = normalizeHandleValue(YT_CHANNEL_HANDLE);
  pushUnique("forHandle", singleHandle);

  // Safe defaults based on your two public channel handles.
  pushUnique("forHandle", "KryloBlox60");
  pushUnique("forHandle", "Krylo-60");

  if (YT_CHANNEL_USERNAME) {
    pushUnique("forUsername", YT_CHANNEL_USERNAME);
  }

  return targets;
}

async function fetchYouTubeChannelStats() {
  if (!YT_AUTO_SYNC) {
    return null;
  }

  const keys = getAvailableYouTubeKeys();
  const targets = getYouTubeTargets();
  if (!keys.length || !targets.length) {
    return null;
  }

  let totalSubs = 0;
  let totalViews = 0;
  let totalUploads = 0;
  let matchedChannels = 0;
  const seenChannelIds = new Set();

  for (const key of keys) {
    let matchedForKey = 0;
    for (const target of targets) {
      const params = new URLSearchParams();
      params.set("part", "statistics");
      params.set(target.key, target.value);
      params.set("key", key);
      const url = `https://www.googleapis.com/youtube/v3/channels?${params.toString()}`;
      try {
        const response = await fetchWithTimeout(url, { cache: "no-store" }, 5000);
        if (!response.ok) {
          continue;
        }
        const data = await response.json().catch(() => ({}));
        const channel = data?.items?.[0];
        const stats = channel?.statistics;
        if (!stats || typeof stats !== "object") {
          continue;
        }
        const channelId = String(channel?.id || target.id);
        if (seenChannelIds.has(channelId)) {
          continue;
        }
        seenChannelIds.add(channelId);
        totalSubs += Math.max(0, Number(stats.subscriberCount || 0) || 0);
        totalViews += Math.max(0, Number(stats.viewCount || 0) || 0);
        totalUploads += Math.max(0, Number(stats.videoCount || 0) || 0);
        matchedChannels += 1;
        matchedForKey += 1;
      } catch {
        // Continue target loop.
      }
    }
    if (matchedForKey > 0) {
      break;
    }
  }

  if (!matchedChannels) {
    return null;
  }

  return {
    subs: totalSubs,
    views: totalViews,
    uploads: totalUploads
  };
}

function buildYtSyncUrl() {
  const raw = String(YT_PORTFOLIO_SYNC_URL || "").trim();
  if (!raw) return "";

  let urlText = raw.replace(/\/+$/, "");
  if (!/\.json(?:\?|$)/i.test(urlText)) {
    urlText += ".json";
  }

  if (!YT_PORTFOLIO_SYNC_AUTH) {
    return urlText;
  }

  try {
    const urlObj = new URL(urlText);
    if (!urlObj.searchParams.get("auth")) {
      urlObj.searchParams.set("auth", YT_PORTFOLIO_SYNC_AUTH);
    }
    return urlObj.toString();
  } catch {
    const joiner = urlText.includes("?") ? "&" : "?";
    return `${urlText}${joiner}auth=${encodeURIComponent(YT_PORTFOLIO_SYNC_AUTH)}`;
  }
}

function pickYtSource(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  if (source.youtubePortfolio && typeof source.youtubePortfolio === "object") {
    return source.youtubePortfolio;
  }
  if (source.kryloBlox && typeof source.kryloBlox === "object") {
    return source.kryloBlox;
  }
  return source;
}

async function loadYtNexus() {
  if (ytNexusBootstrapped) {
    return inMemoryYtNexus;
  }
  try {
    const raw = await fs.readFile(YT_NEXUS_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    inMemoryYtNexus = normalizeYtNexusPayload(parsed);
  } catch {
    // Keep in-memory default when file does not exist in serverless/runtime.
  }
  ytNexusBootstrapped = true;
  return inMemoryYtNexus;
}

async function saveYtNexus(nextPayload) {
  const normalized = normalizeYtNexusPayload(nextPayload);
  inMemoryYtNexus = normalized;
  ytNexusBootstrapped = true;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(YT_NEXUS_DATA_FILE, JSON.stringify(normalized, null, 2), "utf8");
  } catch {
    // Ignore write failures on serverless/read-only runtimes.
  }
  return normalized;
}

function defaultUsageAnalytics() {
  return {
    totalEvents: 0,
    byEvent: {},
    byPage: {},
    uniqueSessions: {},
    timeline: []
  };
}

function normalizeUsageAnalytics(raw) {
  const safe = raw && typeof raw === "object" ? raw : {};
  return {
    totalEvents: Math.max(0, Number(safe.totalEvents || 0)),
    byEvent: safe.byEvent && typeof safe.byEvent === "object" ? safe.byEvent : {},
    byPage: safe.byPage && typeof safe.byPage === "object" ? safe.byPage : {},
    uniqueSessions: safe.uniqueSessions && typeof safe.uniqueSessions === "object" ? safe.uniqueSessions : {},
    timeline: Array.isArray(safe.timeline) ? safe.timeline.slice(-1200) : []
  };
}

async function loadUsageAnalytics() {
  if (!usageBootstrapped) {
    try {
      const raw = await fs.readFile(USAGE_DATA_FILE, "utf8");
      usageAnalytics = normalizeUsageAnalytics(JSON.parse(raw));
    } catch {
      usageAnalytics = defaultUsageAnalytics();
    }
    usageBootstrapped = true;
  }
  return usageAnalytics;
}

async function saveUsageAnalytics(next) {
  usageAnalytics = normalizeUsageAnalytics(next);
  usageBootstrapped = true;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(USAGE_DATA_FILE, JSON.stringify(usageAnalytics, null, 2), "utf8");
  } catch {
    // Ignore write failures in read-only environments.
  }
  return usageAnalytics;
}

function sanitizeUsageKey(value, fallback = "unknown") {
  const raw = String(value || "").trim().toLowerCase();
  const cleaned = raw.replace(/[^a-z0-9._:/#-]+/g, "_").slice(0, 120);
  return cleaned || fallback;
}

function dayKeyFromIso(isoString) {
  try {
    return new Date(isoString).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function summarizeUsage(data) {
  const safe = normalizeUsageAnalytics(data);
  const pages = Object.entries(safe.byPage || {})
    .map(([page, count]) => ({ page, count: Number(count || 0) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  const events = Object.entries(safe.byEvent || {})
    .map(([event, count]) => ({ event, count: Number(count || 0) }))
    .sort((a, b) => b.count - a.count);
  const uniqueTotal = Object.keys(safe.uniqueSessions || {}).length;
  const todayKey = new Date().toISOString().slice(0, 10);
  const uniqueToday = Object.values(safe.uniqueSessions || {}).filter((lastDay) => String(lastDay || "") === todayKey).length;
  const lastEvents = (safe.timeline || []).slice(-40).reverse();
  return {
    totalEvents: Number(safe.totalEvents || 0),
    uniqueSessionsTotal: uniqueTotal,
    uniqueSessionsToday: uniqueToday,
    byPage: pages,
    byEvent: events,
    lastEvents
  };
}

async function recordUsageEvent(input, req) {
  const source = input && typeof input === "object" ? input : {};
  const event = sanitizeUsageKey(source.event || "page_view", "page_view");
  const page = sanitizeUsageKey(source.page || "unknown-page", "unknown-page");
  const sessionId = sanitizeUsageKey(source.sessionId || "", "");
  const nowIso = new Date().toISOString();
  const dayKey = dayKeyFromIso(nowIso);

  const next = normalizeUsageAnalytics(await loadUsageAnalytics());
  next.totalEvents = Number(next.totalEvents || 0) + 1;
  next.byEvent[event] = Number(next.byEvent[event] || 0) + 1;
  next.byPage[page] = Number(next.byPage[page] || 0) + 1;
  if (sessionId) {
    next.uniqueSessions[sessionId] = dayKey;
  }
  next.timeline.push({
    at: nowIso,
    event,
    page,
    sessionId: sessionId || null,
    ua: String(req?.headers?.["user-agent"] || "").slice(0, 160)
  });
  next.timeline = next.timeline.slice(-1200);
  await saveUsageAnalytics(next);
}

async function callGoogleModel(prompt, systemInstruction = "") {
  const keys = getAvailableGoogleKeys();
  if (!keys.length) {
    throw new Error("No Google API key configured");
  }

  let lastError = null;
  for (const key of keys) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GOOGLE_MODEL)}:generateContent?key=${encodeURIComponent(key)}`;
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1200
      }
    };

    if (systemInstruction) {
      body.system_instruction = { parts: [{ text: systemInstruction }] };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || `Google API failed with status ${response.status}`);
      }

      const parts = data.candidates?.[0]?.content?.parts || [];
      const text = parts
        .map((part) => (typeof part.text === "string" ? part.text : ""))
        .join("")
        .trim();

      if (text) {
        return { text, keySource: "google" };
      }
      throw new Error("Google API returned empty response");
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("All Google keys failed");
}

function sanitizePath(urlPath) {
  let decoded = "/";
  try {
    decoded = decodeURIComponent(String(urlPath || "/").split("?")[0]);
  } catch {
    decoded = "/";
  }
  const relativePath = decoded === "/"
    ? "index.html"
    : decoded.replace(/^[/\\]+/, "");
  const normalized = path.normalize(relativePath).replace(/^(\.\.(?:[/\\]|$))+/, "");
  return path.join(ROOT_DIR, normalized || "index.html");
}

async function serveStatic(req, res) {
  const filePath = sanitizePath(req.url || "/");

  if (!filePath.startsWith(ROOT_DIR)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      sendText(res, 403, "Forbidden");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";
    const content = await fs.readFile(filePath);

    const baseName = path.basename(filePath).toLowerCase();
    const isSw = baseName === "service-worker.js";
    const isCoreTextAsset = extension === ".html" || extension === ".css" || extension === ".js" || extension === ".webmanifest" || extension === ".json";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": isCoreTextAsset || isSw ? "no-store, max-age=0" : "public, max-age=604800"
    });
    res.end(content);
  } catch {
    sendText(res, 404, "Not Found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const { pathname } = url;

    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        service: "review-backend",
        reviewStorage: getConfiguredReviewStorage()
      });
      return;
    }

    if (req.method === "GET" && pathname === "/admin.html") {
      sendText(res, 404, "Not Found");
      return;
    }

    if (req.method === "GET" && pathname === "/yt-admin") {
      const target = `/admin${url.search || ""}`;
      res.writeHead(307, { Location: target, "Cache-Control": "no-store" });
      res.end();
      return;
    }

    if (req.method === "GET" && pathname === "/admin") {
      if (!REVIEW_ADMIN_TOKEN) {
        sendText(res, 403, "Admin route is disabled: set REVIEW_ADMIN_TOKEN");
        return;
      }
      if (!isPrivateAdminAuthorized(req, url)) {
        sendText(res, 401, "Unauthorized");
        return;
      }
      try {
        const html = await fs.readFile(PRIVATE_ADMIN_UI_FILE);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store"
        });
        res.end(html);
      } catch {
        sendText(res, 404, "Not Found");
      }
      return;
    }

    if (req.method === "GET" && pathname === "/app-usage-admin") {
      const target = `/usage-admin${url.search || ""}`;
      res.writeHead(307, { Location: target, "Cache-Control": "no-store" });
      res.end();
      return;
    }

    if (req.method === "GET" && pathname === "/usage-admin") {
      if (!REVIEW_ADMIN_TOKEN) {
        sendText(res, 403, "Usage admin is disabled: set REVIEW_ADMIN_TOKEN");
        return;
      }
      if (!isPrivateAdminAuthorized(req, url)) {
        sendText(res, 401, "Unauthorized");
        return;
      }
      try {
        const html = await fs.readFile(USAGE_ADMIN_UI_FILE);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store"
        });
        res.end(html);
      } catch {
        sendText(res, 404, "Not Found");
      }
      return;
    }

    if (req.method === "GET" && pathname === "/api/usage/stats") {
      if (!isCreatorAuthorized(req) && !isPrivateAdminAuthorized(req, url)) {
        sendJson(res, 401, { error: "Creator authorization required" });
        return;
      }
      const data = await loadUsageAnalytics();
      sendJson(res, 200, { ok: true, generatedAt: new Date().toISOString(), ...summarizeUsage(data) });
      return;
    }

    if ((req.method === "GET" || req.method === "POST") && pathname === "/api/usage/track") {
      const writerId = `usage-track:${getClientIp(req)}`;
      if (isWriteRateLimited(writerId, 300, writeRateWindowMs)) {
        sendJson(res, 429, { error: "Too many tracking events" });
        return;
      }
      let payload = {};
      if (req.method === "GET") {
        payload = {
          event: url.searchParams.get("event") || "page_view",
          page: url.searchParams.get("page") || "unknown-page",
          sessionId: url.searchParams.get("sessionId") || ""
        };
      } else {
        try {
          payload = await parseBody(req);
        } catch {
          payload = {
            event: url.searchParams.get("event") || "page_view",
            page: url.searchParams.get("page") || "unknown-page",
            sessionId: url.searchParams.get("sessionId") || ""
          };
        }
      }

      await recordUsageEvent(payload, req);

      if (req.method === "GET") {
        res.writeHead(204, { "Cache-Control": "no-store" });
        res.end();
        return;
      }
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/reviews") {
      const reviews = await loadReviews();
      sendJson(res, 200, { reviews: reviews.map(toPublicReview) });
      return;
    }

    if (req.method === "POST" && pathname === "/api/reviews") {
      const body = await parseBody(req);
      const name = String(body.name || "").trim();
      const category = String(body.category || "Other").trim();
      const message = String(body.message || "").trim();
      const rating = Number(body.rating);

      if (name.length < 2 || message.length < 8 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
        sendJson(res, 400, { error: "Invalid review payload" });
        return;
      }

      const reviews = await loadReviews();
      const deleteToken = randomUUID();
      const review = {
        id: randomUUID(),
        name,
        category,
        message,
        rating,
        createdAt: new Date().toISOString(),
        deleteToken
      };
      reviews.unshift(review);
      await saveReviews(reviews);
      sendJson(res, 201, { review: toPublicReview(review), deleteToken });
      return;
    }

    if (req.method === "POST" && pathname === "/api/creator/verify") {
      if (isCreatorAuthorized(req)) {
        sendJson(res, 200, { ok: true });
      } else {
        sendJson(res, 401, { ok: false, error: "Invalid creator token" });
      }
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/reviews/")) {
      const id = pathname.split("/").pop();
      const reviews = await loadReviews();
      const target = reviews.find((item) => item.id === id);
      if (!target) {
        sendJson(res, 404, { error: "Review not found" });
        return;
      }

      const creatorAuthorized = isCreatorAuthorized(req);
      const userDeleteToken = getUserDeleteToken(req);
      const ownerAuthorized = Boolean(userDeleteToken) && userDeleteToken === String(target.deleteToken || "");

      if (!creatorAuthorized && !ownerAuthorized) {
        sendJson(res, 401, { error: "Not authorized to delete this review" });
        return;
      }

      const next = reviews.filter((item) => item.id !== id);
      await saveReviews(next);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "DELETE" && pathname === "/api/reviews") {
      if (!isCreatorAuthorized(req)) {
        sendJson(res, 401, { error: "Creator authorization required for delete" });
        return;
      }
      await saveReviews([]);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && pathname === "/api/ai/suggest") {
      const body = await parseBody(req);
      const reviewText = String(body.reviewText || "").trim();
      const category = String(body.category || "General").trim();
      const rating = Number(body.rating || 0);

      if (reviewText.length < 6) {
        sendJson(res, 400, { error: "reviewText must be at least 6 characters" });
        return;
      }

      let suggestion = "";
      let mode = "fallback";
      const aiPrompt = `Category: ${category || "General"}\nRating: ${rating || "N/A"}/5\nReview: ${reviewText}\n\nRewrite this review in under 120 words. Keep it specific, clear, and constructive.`;
      const aiSystem = "You rewrite short user reviews for quality and clarity. Keep a practical tone.";

      if (getAvailableGoogleKeys().length) {
        try {
          const aiResult = await callGoogleModel(aiPrompt, aiSystem);
          suggestion = aiResult.text;
          mode = "google";
        } catch (error) {
          suggestion = buildFallbackSuggestion(reviewText, category, rating);
          mode = "fallback";
        }
      } else {
        suggestion = buildFallbackSuggestion(reviewText, category, rating);
      }

      sendJson(res, 200, { suggestion, mode });
      return;
    }

    if (req.method === "GET" && pathname === "/api/ideas") {
      const ideas = await loadIdeas();
      sendJson(res, 200, { ideas });
      return;
    }

    if (req.method === "POST" && pathname === "/api/ideas") {
      const body = await parseBody(req);
      const title = String(body.title || "").trim();
      const content = String(body.content || "").trim();
      const source = String(body.source || "manual").trim();

      if (title.length < 3 || content.length < 8) {
        sendJson(res, 400, { error: "Invalid idea payload" });
        return;
      }

      const ideas = await loadIdeas();
      const idea = {
        id: randomUUID(),
        title,
        content,
        source,
        createdAt: new Date().toISOString()
      };
      ideas.unshift(idea);
      await saveIdeas(ideas);
      sendJson(res, 201, { idea });
      return;
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/ideas/")) {
      const id = pathname.split("/").pop();
      if (!id) {
        sendJson(res, 400, { error: "idea id is required" });
        return;
      }
      const ideas = await loadIdeas();
      const next = ideas.filter((item) => item.id !== id);
      await saveIdeas(next);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && pathname === "/api/ai/idea-suggest") {
      const body = await parseBody(req);
      const goal = String(body.goal || "").trim();
      const audience = String(body.audience || "").trim();
      const constraints = String(body.constraints || "").trim();
      const count = Math.max(1, Math.min(6, Number(body.count) || 3));

      if (goal.length < 5) {
        sendJson(res, 400, { error: "goal must be at least 5 characters" });
        return;
      }

      let suggestion = "";
      let suggestions = [];
      let mode = "fallback";
      const aiPrompt = `Goal: ${goal}\nAudience: ${audience || "General"}\nConstraints: ${constraints || "None"}\n\nGenerate ${count} practical web app ideas. For each idea include:\n1) app name\n2) one-line concept\n3) 3 core features\n4) MVP build steps in 3 bullets\n5) monetization in 1 bullet\n6) best-fit tech stack in 1 bullet\nKeep each idea concise and execution-focused.`;
      const aiSystem = "You are a product strategist for student developers. Give specific, practical app ideas with clear execution direction.";

      if (getAvailableGoogleKeys().length) {
        try {
          const aiResult = await callGoogleModel(aiPrompt, aiSystem);
          suggestion = aiResult.text;
          mode = "google";
        } catch {
          suggestion = buildFallbackIdeaSuite(goal, audience, constraints, count);
          mode = "fallback";
        }
      } else {
        suggestion = buildFallbackIdeaSuite(goal, audience, constraints, count);
      }

      if (suggestion) {
        suggestions = suggestion
          .split(/\n(?=\d+\.\s)/)
          .map((part) => part.trim())
          .filter(Boolean)
          .slice(0, count);
      }

      sendJson(res, 200, { suggestion, suggestions, mode, count });
      return;
    }

    if (req.method === "POST" && pathname === "/api/aether/chat") {
      const body = await parseBody(req);
      const prompt = String(body.prompt || "").trim();
      const systemPrompt = String(body.systemPrompt || "").trim();

      if (prompt.length < 1) {
        sendJson(res, 400, { error: "prompt is required" });
        return;
      }

      if (!getAvailableGoogleKeys().length) {
        sendJson(res, 503, {
          error: "Google backend is not configured",
          hint: "Set GOOGLE_API_KEY or GOOGLE_API_KEYS in environment variables"
        });
        return;
      }

      try {
        const response = await callGoogleModel(prompt, systemPrompt);
        sendJson(res, 200, {
          text: response.text,
          mode: response.keySource,
          model: GOOGLE_MODEL
        });
      } catch (error) {
        sendJson(res, 502, {
          error: "Google backend request failed",
          message: error instanceof Error ? error.message : "Unknown Google API error"
        });
      }
      return;
    }

    if (req.method === "GET" && pathname === "/api/yt-portfolio-sync") {
      try {
        const localFallback = await loadYtNexus();
        const fastMode = /^(1|true|yes)$/i.test(String(url.searchParams.get("fast") || "").trim());
        if (fastMode) {
          sendJson(res, 200, {
            ok: true,
            source: "local",
            autoSynced: false,
            syncedAt: ytLastSyncedAt || null,
            syncSource: ytLastSyncSource,
            ...localFallback
          });
          return;
        }
        let payload = localFallback;
        let source = "local";
        let autoSynced = false;

        const ytStats = await fetchYouTubeChannelStats();
        if (ytStats) {
          payload = normalizeYtNexusPayload({
            ...localFallback,
            ...ytStats
          });
          source = "youtube";
          autoSynced = true;
          ytLastSyncedAt = new Date().toISOString();
          ytLastSyncSource = source;
          await saveYtNexus(payload);
        }

        const syncUrl = buildYtSyncUrl();
        if (!syncUrl) {
          sendJson(res, 200, { ok: true, source, autoSynced, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
          return;
        }
        if (autoSynced) {
          try {
            await fetchWithTimeout(syncUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            }, 5000);
          } catch {
            // Ignore firebase sync errors during auto-sync.
          }
          sendJson(res, 200, { ok: true, source, autoSynced, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
          return;
        }

        const response = await fetchWithTimeout(syncUrl, { cache: "no-store" }, 5000);
        if (!response.ok) {
          sendJson(res, 200, { ok: true, source, autoSynced, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
          return;
        }
        const raw = await response.json().catch(() => ({}));
        payload = normalizeYtNexusPayload(pickYtSource(raw));
        source = "firebase";
        ytLastSyncedAt = new Date().toISOString();
        ytLastSyncSource = source;
        await saveYtNexus(payload);
        sendJson(res, 200, { ok: true, source, autoSynced, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
      } catch (error) {
        const payload = await loadYtNexus();
        sendJson(res, 200, { ok: true, source: "local", autoSynced: false, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
      }
      return;
    }

    if (req.method === "POST" && pathname === "/api/yt-portfolio-sync") {
      if (REVIEW_ADMIN_TOKEN && !isCreatorAuthorized(req)) {
        sendJson(res, 401, { error: "Creator authorization required for sync update" });
        return;
      }
      const writerId = `yt-sync:${getClientIp(req)}`;
      if (isWriteRateLimited(writerId, 15, writeRateWindowMs)) {
        sendJson(res, 429, { error: "Too many sync writes. Please wait a moment." });
        return;
      }
      const body = await parseBody(req);
      const payload = await saveYtNexus(body);
      ytLastSyncedAt = new Date().toISOString();
      ytLastSyncSource = "admin";
      let firebaseSynced = false;
      try {
        const syncUrl = buildYtSyncUrl();
        if (!syncUrl) {
          firebaseSynced = false;
        } else {
          const syncRes = await fetchWithTimeout(syncUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }, 5000);
          firebaseSynced = syncRes.ok;
        }
      } catch {
        firebaseSynced = false;
      }
      sendJson(res, 200, { ok: true, firebaseSynced, syncedAt: ytLastSyncedAt || null, syncSource: ytLastSyncSource, ...payload });
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, {
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
