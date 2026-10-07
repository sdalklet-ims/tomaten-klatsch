// Service Worker: macht Tomatenklatsch nach dem ersten Laden offline spielbar.
// Nach jeder Änderung an index.html o. Ä. VERSION hochzählen, damit Geräte die neue Fassung holen.
const VERSION = 'tk-v4';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
];
const NETWORK_TIMEOUT = 3000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network-first: mit Internet immer die aktuelle Fassung (und Cache auffrischen),
// ohne Internet oder bei langsamer Verbindung (> 3 s) aus dem Cache.
// cache: 'no-cache' fragt beim Server nach (ETag), statt GitHubs 10-Minuten-Zwischenspeicher zu nutzen.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      const res = await Promise.race([
        fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT)),
      ]);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      throw err;
    }
  })());
});
