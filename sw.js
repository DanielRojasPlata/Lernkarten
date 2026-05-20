const CACHE_NAME = 'lernkarten-v1';
const urlsToCache = [
  './Appli (1).html',
  './manifest.json',
  './icon.svg',
  './defaultCards.js'
];

// Instalar el Service Worker y almacenar recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que la app funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso en caché si existe, sino lo descarga
        return response || fetch(event.request);
      })
  );
});
