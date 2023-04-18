const cacheName = 'TheProtonCountdown-v8';
const staticAssets = [
  './',
  './style.css',
  './script.js',
  './TPT.png',
  './icon.png',
  'https://kit.fontawesome.com/702d3d6642.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(staticAssets);
    })
  );
});



self.addEventListener('fetch', (event) => {
  // Check if the requested file is an HTML file
  if (event.request.headers.get('Accept').includes('text/html')) {
    // Fetch the HTML file directly from the server
    event.respondWith(fetch(event.request));
    return;
  }

  // Use the existing caching strategy for other files
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        const responseToCache = response.clone();

        const headers = new Headers(responseToCache.headers);
        headers.append('Cache-Control', 'max-age=3600');

        const updatedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers
        });

        caches.open(cacheName).then((cache) => {
          cache.put(event.request, updatedResponse);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const allowedCacheNames = ['TheProtonCountdown-v8'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!allowedCacheNames.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


