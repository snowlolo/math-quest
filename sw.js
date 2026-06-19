var CACHE = 'math-quest-v6';
var FILES = [
  './index.html',
  './menu.html',
  './lessons.html',
  './game.html',
  './leaderboard.html',
  './theme.css',
  './theme.js',
  './scoring.js',
  './hints.js',
  './questionGenerator.js',
  './questionGeneratorHard.js',
  './manifest.json',
  './icon.svg',
  './fonts/outfit-latin.woff2',
  './fonts/outfit-latin-ext.woff2',
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).catch(function () { return cached; });
    })
  );
});
