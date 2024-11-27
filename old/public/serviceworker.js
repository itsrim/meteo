const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// installation ServiceWorker SW : create a cache at the first open
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache)
      })
  )
});

// listen for requests / if we don't get the cache, get the offline.html page
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // if (!response || response.status !== 200 || response.type !== 'basic') {
        //   return response;
        // }
        return fetch(event.request)
          .catch(() => caches.match('offline.html'))
      })
  )
});


// Active the SW : lot of version of the cache :  remove all previous to keep only one
self.addEventListener('activate', (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  // if the cacheName is not include in the cacheWhiteList, we delete it, so you keep only one
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  )
});