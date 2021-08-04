var CACHE_KEY = 'cyword-cache-v-17';
var assetsToCache = [
  '/assets/css/card.min.css',
  '/assets/css/vendor.min.css',
  '/assets/css/styles.min.css',
  '/bootstrap/js/bootstrap.min.js',
  '/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/js/webviewbridge.js',
  '/js/jquery-3.5.1.slim.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => cache.addAll(assetsToCache))
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_KEY]

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(function (key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})
