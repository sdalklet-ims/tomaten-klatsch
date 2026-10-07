// Service Worker: macht Tomatenklatsch nach dem ersten Laden offline spielbar.
// Nach jeder Änderung an index.html o. Ä. VERSION hochzählen, damit Geräte die neue Fassung holen.
const VERSION = 'tk-v2';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Stale-while-revalidate: sofort aus dem Cache antworten, im Hintergrund aktualisieren.
// Eine neue Fassung ist damit ab dem übernächsten Start sichtbar.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const network = fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  });
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(cached => cached || network));
  e.waitUntil(network.then(() => {}, () => {}));
});
