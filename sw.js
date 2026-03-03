const CACHE_NAME = "filiatron-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./aq.png",
  "./verde.jpg",
  "./municipios.json",
  "./nombres.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).catch(() => caches.match("./index.html")))
  );
});
