const CACHE = 'cardstack-v2';
const ASSETS = [
  '/SCOPE-s-Easy-Flashcards/',
  '/SCOPE-s-Easy-Flashcards/index.html',
  '/SCOPE-s-Easy-Flashcards/manifest.json',
  '/SCOPE-s-Easy-Flashcards/icon-192.png',
  '/SCOPE-s-Easy-Flashcards/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/SCOPE-s-Easy-Flashcards/index.html')))
  );
});
