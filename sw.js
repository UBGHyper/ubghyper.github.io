const CACHE = 'ubghyper-v8';
const SHELL = [
  '/',
  '/index.html',
  '/play.html',
  '/favorites.html',
  '/stats.html',
  '/saves.html',
  '/about.html',
  '/404.html',
  '/assets/css/redesign.css',
  '/assets/css/style.css',
  '/assets/js/icons.js',
  '/assets/js/camo.js',
  '/assets/js/utils.js',
  '/assets/js/render.js',
  '/assets/js/app.js',
  '/assets/js/play.js',
  '/assets/js/play-new.js',
  '/assets/img/icon/main.svg',
  '/assets/img/icon/main.png',
  '/assets/fonts/inter-latin.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Don't intercept cross-origin (game CDN, Google, fonts, etc.)
  if (url.origin !== self.location.origin) return;

  const p = url.pathname;

  // Cache-first only for images — they never change between deploys
  if (/\.(png|jpg|jpeg|gif|webp|ico|svg)(\?|$)/.test(p)) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Network-first for everything else (HTML, CSS, JS, JSON, etc.)
  // This ensures pushes are immediately visible without a hard refresh.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone(); // must clone synchronously before body is consumed
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
