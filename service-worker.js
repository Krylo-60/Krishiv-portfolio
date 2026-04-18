const CACHE_NAME = "krishiv-velocity-v1003-1";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app-universe-shell.css",
  "/app-universe-shell.js",
  "/logo.svg",
  "/manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key === CACHE_NAME ? Promise.resolve() : caches.delete(key)))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const pathname = requestUrl.pathname.toLowerCase();
  if (requestUrl.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }
  if (pathname.includes(".private.") || pathname === "/admin" || pathname === "/owner" || pathname === "/usage-admin") {
    event.respondWith(fetch(event.request));
    return;
  }
  const destination = event.request.destination || "";
  const isNavigation = event.request.mode === "navigate" || destination === "document";
  const isCoreLive = destination === "document" || destination === "script" || destination === "style" || destination === "manifest";
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (!isSameOrigin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  if (isCoreLive && isSameOrigin) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return isNavigation ? caches.match("/index.html") : Response.error();
          })
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (isSameOrigin && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
          }
          return response;
        })
        .catch(() => cached || (isNavigation ? caches.match("/index.html") : Response.error()));
      return cached || networkFetch;
    })
  );
});
