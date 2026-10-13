// Only the public app shell is cached. Never cache API responses or personal dialogue.
const CACHE = 'vik-phone-shell-20261013-4';
const SHELL = ['/vik/', '/vik/index.html', '/vik/app.css?v=20261013-4', '/vik/app.js?v=20261013-4', '/vik/voice.js?v=20261013-4', '/vik/icon-180.png', '/vik/icon-192.png', '/vik/icon-512.png', '/vik/manifest.webmanifest'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('vik-phone-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith('/vik/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put('/vik/', copy))); }
      return response;
    }).catch(() => caches.match('/vik/')));
  } else if (SHELL.includes(url.pathname + url.search)) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});
