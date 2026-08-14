const CACHE = "daystw-v3";

/** 僅快取不常變的靜態資源；絕不攔截 HTML / JS / CSS 以免部署後白屏 */
const PRECACHE = ["/manifest.json", "/favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // HTML 導覽：只走網路，避免舊版首頁
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  // 不攔截程式碼與樣式，避免部署後 chunk 名稱不符導致打不開
  if (url.pathname.startsWith("/_next/") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
    return;
  }

  // 只快取 manifest / favicon
  if (!PRECACHE.includes(url.pathname)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
