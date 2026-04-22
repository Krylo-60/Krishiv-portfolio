const fs = require("fs");
const path = require("path");
const { chromium, devices } = require("playwright");

const BASE_URL = "https://krishiv-new-portfoilo.vercel.app";
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "audit-output");

const MAIN_PAGES = [
  { name: "home", path: "/" },
  { name: "all-links", path: "/all-links.html" },
  { name: "release-notes", path: "/release-notes.html" },
  { name: "projects", path: "/projects.html" },
  { name: "games", path: "/games.html" },
  { name: "contact", path: "/contact.html" },
  { name: "review-app", path: "/review-app.html" },
  { name: "study-planner", path: "/study-planner.html" },
  { name: "quiz-zone", path: "/quiz-zone.html" },
  { name: "idea-lab-ai", path: "/idea-lab-ai.html" },
  { name: "aether-v110", path: "/aether-core-v110.html" }
];

const viewports = [
  { name: "desktop", options: { viewport: { width: 1440, height: 960 } } },
  { name: "mobile", options: { ...devices["iPhone 13"] } }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slug(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

async function collectPageState(page, pageMeta, viewportName) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || "failed"}`);
  });

  const response = await page.goto(BASE_URL + pageMeta.path, {
    waitUntil: "networkidle",
    timeout: 45000
  });

  const screenshotPath = path.join(OUTPUT_DIR, `${viewportName}-${slug(pageMeta.name)}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const title = await page.title();
  const bodyText = await page.locator("body").innerText().catch(() => "");
  const hasPlainButtonCluster = /Ctrl\/Cmd \+ K[\s\S]*Open Random Featured/.test(bodyText);

  return {
    url: BASE_URL + pageMeta.path,
    status: response ? response.status() : null,
    title,
    screenshotPath,
    consoleErrors,
    pageErrors,
    failedRequests,
    hasPlainButtonCluster
  };
}

async function runInteractionChecks(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();
  const results = [];

  await page.goto(`${BASE_URL}/all-links.html`, { waitUntil: "networkidle", timeout: 45000 });
  await page.click("#shellAppsBtn");
  const overlayVisible = await page.locator(".app-shell-overlay.is-open").isVisible().catch(() => false);
  results.push({
    name: "all-links overlay opens",
    ok: overlayVisible
  });
  if (overlayVisible) {
    const overlayPath = path.join(OUTPUT_DIR, "interaction-all-links-overlay.png");
    await page.screenshot({ path: overlayPath, fullPage: true });
  }

  await page.click("#shellCloseBtn").catch(() => {});
  const overlayClosed = !(await page.locator(".app-shell-overlay.is-open").isVisible().catch(() => false));
  results.push({
    name: "all-links overlay closes",
    ok: overlayClosed
  });

  await page.goto(`${BASE_URL}/review-app.html`, { waitUntil: "networkidle", timeout: 45000 });
  const reviewFields = await page.locator("input, textarea, button, select").count();
  results.push({
    name: "review-app interactive controls exist",
    ok: reviewFields >= 4,
    detail: `controls=${reviewFields}`
  });

  await page.goto(`${BASE_URL}/idea-lab-ai.html`, { waitUntil: "networkidle", timeout: 45000 });
  const ideaControls = await page.locator("textarea, button").count();
  results.push({
    name: "idea-lab-ai interactive controls exist",
    ok: ideaControls >= 3,
    detail: `controls=${ideaControls}`
  });

  await page.goto(`${BASE_URL}/aether-core-v110.html`, { waitUntil: "networkidle", timeout: 45000 });
  const composer = page.locator("textarea");
  const before = await composer.evaluate((el) => el.clientHeight).catch(() => 0);
  await composer.fill("short line\nsecond line\nthird line\nfourth line");
  await page.waitForTimeout(400);
  const after = await composer.evaluate((el) => el.clientHeight).catch(() => 0);
  results.push({
    name: "aether input auto-grows",
    ok: after > before,
    detail: `before=${before}, after=${after}`
  });

  await context.close();
  return results;
}

async function main() {
  ensureDir(OUTPUT_DIR);
  const browser = await chromium.launch({ headless: true });
  const audit = {
    generatedAt: new Date().toISOString(),
    visual: [],
    interactions: []
  };

  for (const viewport of viewports) {
    const context = await browser.newContext(viewport.options);
    for (const pageMeta of MAIN_PAGES) {
      const page = await context.newPage();
      const result = await collectPageState(page, pageMeta, viewport.name);
      audit.visual.push({ viewport: viewport.name, page: pageMeta.name, ...result });
      await page.close();
    }
    await context.close();
  }

  audit.interactions = await runInteractionChecks(browser);
  await browser.close();

  const reportPath = path.join(OUTPUT_DIR, "production-audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(audit, null, 2));
  console.log(reportPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
